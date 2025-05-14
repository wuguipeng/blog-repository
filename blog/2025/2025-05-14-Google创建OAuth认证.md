---
slug: create-google-oauth
title: 文档｜创建Google OAuth
tags: [toss]
---

在使用CloudDrive挂载Google Drive时，通过网页认证，会出现**此应用已被阻止**的问题。所以需要第二种方式，自己申请Google OAuth。此方式也同样也适用于Rclone挂载。

<!-- truncate -->


![应用已被阻止](https://raw.wuguipeng.com/image/2025/05/4d714ae15283e21064083b6941b779b03905534c.png)

CloudDrive使用RefreshToken登录，需要有**ClientId**、**ClientSecret**和**RefreshToken**。其中ClientId、ClientSecret需要在Google Cloud Platform创建OAuth认证，RefreshToken需要调用接口获取。

## 创建OAuth认证
### 1.前往[Google API](https://console.cloud.google.com/apis/api/drive.googleapis.com/overview)。  

### 2.创建项目
![创建项目](https://raw.wuguipeng.com/image/2025/05/affa21abaad5b7cba4d69792e92c9f1465fd9d9e.png)
![输入项目名称](https://raw.wuguipeng.com/image/2025/05/ff2126111f9ca59a09c2ad9293d519ab30947bad.png)

等待项目创建完成，选择项目

### 3.配置权限请求页面
![配置权限请求页面](https://raw.wuguipeng.com/image/2025/05/2977c6d392a9f1e767af931eccea27789ca6cce5.png)
![开始](https://raw.wuguipeng.com/image/2025/05/4143c86656b8786b8119532c51c34a6f9c12370d.png)
![应用信息](https://raw.wuguipeng.com/image/2025/05/378cbd6d1a1e3ddacfe3e3f40cebfa9f684b644f.png)
![受众群体](https://raw.wuguipeng.com/image/2025/05/86030b58e1dc9e52fa2548ca0f20abaf5fce46d4.png)
![联系人](https://raw.wuguipeng.com/image/2025/05/b7b0bf1be598f760d872b4d601f44cb1e2b51906.png)
点击创建。



### 4.添加测试账号（没有添加不能登录）
![添加测试账号](https://raw.wuguipeng.com/image/2025/05/b2eb5a87abf7b024ba7c0da40da0037334e5678a.png)

### 5.回到[Google API](https://console.cloud.google.com/apis/api/drive.googleapis.com/overview)
如果这个项目没有启用Google Drive API，会提示启用。

![启用](https://raw.wuguipeng.com/image/2025/05/7ec602f376be1749847570c949a1bed42f865e54.png)

### 6.创建OAuth凭据
![创建OAuth](https://raw.wuguipeng.com/image/2025/05/360fda5bd0fbdccf250f8f4a6619a03eadde189e.png)

应用类型和应用名称随便填写，重定向URL按需求填写，可以填**http:\//127.0.0.1**，后面需要用上，点击创建。
![创建](https://raw.wuguipeng.com/image/2025/05/e86c9837051084e1a84f35b41f2a9833a04a50df.png)

复制**客户端 ID**和**客户端密钥**，点击完成。
![创建完成](https://raw.wuguipeng.com/image/2025/05/0684a4b59b717e0651010ef1f611af50c3684c3b.png)

## 获取RefreshToken

### 1.获取授权码

**client_id**和**redirect_uri**（**http:\//127.0.0.1**）填写上面获取到的。**scope**是Google Drive的访问权限，**https:\//www.googleapis.com/auth/drive** 包含用户的所有权限。
```shell
https://accounts.google.com/o/oauth2/auth?
    response_type=code&
    client_id={client_id}&
    redirect_uri={redirect_uri}&
    scope=https://www.googleapis.com/auth/drive&
    access_type=offline&
    prompt=consent
```

复制链接在浏览器中打开，选择Google账号，必须是上面添加的测试账号，否则无法登录。如果提示测试环境，点击继续即可。如果提示重定向地址不正确，检查一下**redirect_uri**是否正确。

登录成功后，会重定向到**redirect_uri**。
```
http://127.0.0.1/?code=4/0AUJR-x5CVM0xajQxXT-wKvvoa3oUjHcCT9tXyKUZLrnNgfSR5G9-BUYpZwMsR8Ua5nMw&scope=https://www.googleapis.com/auth/drive
```

获取到**code**，复制下来。

### 2.获取RefreshToken

替换下面命令中的```{code}```、```{client_id}```,```{client_secret}```和```{redirect_uri}```，执行命令。
```shell
curl -X "POST" "https://oauth2.googleapis.com/token?code={code}&client_id={client_id}&client_secret={client_secret}&redirect_uri={redirect_uri}&grant_type=authorization_code" \
     -H 'Content-Type: application/x-www-form-urlencoded'
```

返回结果中有```refresh_token```，复制下来。
```json
{
  "access_token": "ya29.a0AW4XtxhoyMG566cBv76sxE48O_t...",
  "expires_in": 3599,
  "refresh_token": "1//06WWNolWqcJc-CgYIARAAGAY....",
  "scope": "https://www.googleapis.com/auth/drive",
  "token_type": "Bearer",
  "refresh_token_expires_in": 604799
}
```

## 登录CloudDrive
将**client_id**、**client_secret**和**refresh_token**填入CloudDrive中，点击登录。


参考：
https://www.333rd.net/zh/posts/tech/%E5%88%9B%E5%BB%BA%E8%B0%B7%E6%AD%8Coauth-client-id/