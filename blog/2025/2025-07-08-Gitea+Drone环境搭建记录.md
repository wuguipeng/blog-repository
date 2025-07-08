---
slug: gitea-drone-huangjingdajianjilu
title: 留档｜Gitea + Drone CI/CD 环境搭建记录
tags: [archive,vps]
---

## 环境选择
Gitlab + Jenkins 功能全面，但是非常占用资源，GitLab 官方推荐的最低内存配置是4GB，Jenkins 又是使用Java开发的，这两都是内存大户。  
Gitea + Drone 功能没有那么全，但是也够用了，在2G内存的服务器上也游刃有余。  

Gitlab + Jenkins 适合企业。  
Gitea + Drone 适合个人开发。  
<!-- truncate -->

## Gitea

```yaml
version: '3.8'

services:
  gitea:
    image: gitea/gitea:latest
    container_name: gitea
    restart: always
    environment:
      # 本地文件 UID/GID，保证文件权限正确
      USER_UID: 1000
      USER_GID: 1000

      # —— PostgreSQL 配置 —— 
      GITEA__database__DB_TYPE: postgres
      # 指向宿主机 PostgreSQL
      GITEA__database__HOST: 192.168.0.46:5432
      GITEA__database__NAME: gitea
      GITEA__database__USER: postgres
      GITEA__database__PASSWD: postgres
      # 如果不需要 SSL
      GITEA__database__SSL_MODE: disable

    volumes:
      - /home/app/app/gitea:/data
    ports:
      - "3000:3000"   # Web 界面
      - "222:22"      # SSH 服务
```

启动后创建OAuth2应用程序，填写Drone的登录地址。
![](https://oss.wuguipeng.com/image/2025/07/cd2c718245d58df6d3f5f47b0560acfa17a34315.jpg)
创建成功后复制**客户端ID**和**客户端密钥**

如果项目已经有其他网站进行托管，在原来的基础上加上gitea地址。
```bash
git remote -v # 查看远程地址
git remote add gitea  http://127.0.0.1:3000/wuguipeng/web-project.git # 添加远程地址
```

一般默认远程地址是**origin**。


## Drone
Drone 分为Server和Runner端，Server主要负责管理，Runner负责构建。

### Drone Server

1. **启动容器**  
```shell
docker run \
  --volume=/home/app/app/drone:/data \
  --env=DRONE_GITEA_SERVER=http://127.0.0.1:3000 \
  --env=DRONE_GITEA_CLIENT_ID=3315e71f-bb80-41b2-bd6e-43cff1bf484e \
  --env=DRONE_GITEA_CLIENT_SECRET=gto_c4uuasvd34m5eojhzj22rt43rm6yl5cuitzdc3ucnlvan3iltdoq \
  --env=DRONE_RPC_SECRET=cd3ecb42b840feb0d90fb7a425a68bdb \
  --env=DRONE_SERVER_HOST=127.0.0.1:4000 \
  --env=DRONE_SERVER_PROTO=http \
  --env=DRONE_USER_CREATE=username:giteauser,machine:false,admin:true,token:cd3ecb42b840feb0d90fb7a425a68bdb \
  --publish=4000:80 \
  --restart=always \
  --detach=true \
  --name=drone \
  drone/drone:latest
```

DRONE_GITEA_SERVER 填写 Gitea的地址。  
DRONE_GITEA_CLIENT_ID 填写上一步在Gitea创建的**客户端ID**。  
DRONE_GITEA_CLIENT_SECRET  填写上一步在Gitea创建的**客户端密钥**。  
DRONE_RPC_SECRET 填写 `openssl rand -hex 16` 输出的内容。  
DRONE_USER_CREATE 填写Gitea的用户，默认为管理员。  

2. **创建账户并授权**  
启动后访问 http://127.0.0.1:4000 创建用户，会自动弹出Gitea授权。Gitea的OAuth2应用中填写的回调地址没有错的话，正常授权并返回Drone页面。

3. **同步仓库**  
在Drone主页有*SYNC*按钮，会同步所有Gitea中的仓库。

进入仓库Settings，点击*ACTIVATE REPOSITORY* 激活仓库。后续提交代码在Gitea中，就会触发Drone构建。


### Drone Runner
```shell
docker run --detach \
  --volume=/var/run/docker.sock:/var/run/docker.sock \
  --volume=/home/app/app/drone/workspace:/drone/src \
  --env=DRONE_RPC_PROTO=http \
  --env=DRONE_RPC_HOST=127.0.0.1:4000 \
  --env=DRONE_RPC_SECRET=cd3ecb42b840feb0d90fb7a425a68bdb \
  --env=DRONE_RUNNER_CAPACITY=2 \
  --env=DRONE_RUNNER_NAME=my-first-runner \
  --publish=4001:3000 \
  --restart=always \
   --privileged \
  --name=drone-runner \
  drone/drone-runner-docker:latest
```

DRONE_RPC_HOST 填写Drone Server的地址。  
DRONE_RPC_SECRET 和Drone Server的值一样。  

启动后`docker logs drone-runner`查看日志，输出以下内容就说明没问题。
```text
time="2025-07-08T07:35:54Z" level=info msg="starting the server" addr=":3000"
time="2025-07-08T07:35:54Z" level=info msg="successfully pinged the remote server"
time="2025-07-08T07:35:54Z" level=info msg="polling the remote server" arch=amd64 capacity=2 endpoint="http://127.0.0.1:4000" kind=pipeline os=linux type=docker
```

## .drone.yml
### Vite + React 示例
```yml
kind: pipeline
type: docker
name: default

# 定义共享工作区
workspace:
  base: /drone/src
  path: .


steps:
  # 1. 恢复依赖缓存（可选）
  - name: restore-cache
    image: drillster/drone-volume-cache
    settings:
      restore: true
      mount:
        - ./node_modules

  # 2. 安装依赖
  - name: install
    image: node:23.5.0
    commands:
      - npm ci

  # 3. 保存依赖缓存（可选）
  - name: rebuild-cache
    image: drillster/drone-volume-cache
    settings:
      rebuild: true
      mount:
        - ./node_modules

  # 4. 单元测试（如果有）
  # - name: test
  #   image: node:16
  #   commands:
  #     - npm test -- --ci --reporters=default

  # 5. 生产环境打包
  - name: build
    image: node:23.5.0
    commands:
      - npm run build

  # 6. 检查docker
  - name: check-docker
    image: docker:20.10
    volumes:
      - name: dockersock
        path: /var/run/docker.sock
    commands:
      - ls -l /var/run/docker.sock
      - docker version

  # 7. 本地构建 Docker 镜像
  - name: build-image
    image: docker:20.10
    volumes:
      - name: dockersock
        path: /var/run/docker.sock
    commands:
      - docker build -t web-project:${DRONE_BUILD_NUMBER} .

  # 8. 部署：本地启动容器
  - name: deploy
    image: docker:20.10
    volumes:
      - name: dockersock
        path: /var/run/docker.sock
    commands:
      - docker rm -f web-project || true
      - docker run -d --name web-project -p 5173:80 web-project:${DRONE_BUILD_NUMBER}

# 定义用来缓存 node_modules 的临时卷
volumes:
  # 挂载宿主机 Docker Socket
  - name: dockersock
    host:
      path: /var/run/docker.sock
  # 将宿主机完整路径映射到 Step 容器的 /drone/src，以便在宿主机查看源码
  - name: node_modules
    temp: {}

trigger:
  event:
    - push
    - tag
```

如果找不到/var/run/docker.sock，说明没有Drone Server启动时没有配置`DRONE_USER_CREATE`
### Java Maven项目示例
```yml
# .drone.yml
kind: pipeline
type: docker
name: default

# 定义共享工作区
workspace:
  base: /drone/src
  path: .

steps:
  - name: build
    image: maven:3.8.5-openjdk-17
    volumes:
      - name: maven-cache
        path: /root/.m2
    commands:
      - mvn package -Dmaven.test.skip=true -Djooq.codegen.skip=true -pl admin -am

  # 6. 检查docker
  - name: check-docker
    image: docker:20.10
    volumes:
      - name: dockersock
        path: /var/run/docker.sock
    commands:
      - ls -l /var/run/docker.sock
      - docker version

  - name: build-image
    image: docker:20.10
    volumes:
      - name: dockersock
        path: /var/run/docker.sock
    commands:
      # 1) 准备 jar
      - cp ozon-admin/target/*.jar app.jar
      # 2) 构建镜像，打两个 tag
      - docker build -t java-project:${DRONE_BUILD_NUMBER} .

  # 8. 部署：本地启动容器
  - name: deploy
    image: docker:20.10
    volumes:
      - name: dockersock
        path: /var/run/docker.sock
    commands:
      - docker rm -f java-project || true
      - docker run -d --name java-project -p 8800:8800 java-project:${DRONE_BUILD_NUMBER}

# 挂载 Maven 缓存，加速依赖下载
volumes:
  # 挂载宿主机 Docker Socket
  - name: dockersock
    host:
      path: /var/run/docker.sock
  - name: maven-cache
    host:
      path: /var/lib/drone/cache/m2
```

maven构建会缓存在主机的```/var/lib/drone/cache/m2```目录，如果项目有依赖其他项目。例如依赖common项目，那么可以在common项目中配置一个.drone.yml，使用mvn install 安装在缓存目录中，就可以正常构建。
```yml
# .drone.yml
kind: pipeline
type: docker
name: default

# 定义共享工作区
workspace:
  base: /drone/src
  path: .

steps:
  - name: install
    image: maven:3.8.5-openjdk-17
    volumes:
      - name: maven-cache
        path: /root/.m2
    commands:
      - mvn --batch-mode clean install -DskipTests


# 挂载 Maven 缓存，加速依赖下载
volumes:
  # 挂载宿主机 Docker Socket
  - name: dockersock
    host:
      path: /var/run/docker.sock
  - name: maven-cache
    host:
      path: /var/lib/drone/cache/m2
```


参考：  
https://docs.drone.io/ 官方文档。  
https://www.cnblogs.com/netcore3/p/18325616 基于Drone实现CI/CD【0到1架构系列】。
