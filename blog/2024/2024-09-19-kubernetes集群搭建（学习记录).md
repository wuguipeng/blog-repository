---
slug: study-k8s
title: 学习｜kubernetes集群搭建
authors: [wuguipeng]
tags: [study,k8s]
---


# 安装k8s

参考官网基于Debian的发行版的安装步骤。

[安装 kubeadm](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)

<!-- truncate -->


# 安装containerd容器

参考官网ubuntu安装步骤。

[Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

# 修改containerd容器配置

使用apt安装的containerd容器，在/etc/containerd/config.toml配置文件中，默认是禁用`cri`的，需要修改/etc/containerd/config.toml文件，并重启。

```toml
# /etc/containerd/config.toml

# disabled_plugins : ["cri"]
# 改成
disabled_plugins : [] # 去除cri
```

重启：

```bash
sudo systemctl restart containerd
```

# kubeadm初始化

## 配置文件

```yaml
# kubeadm-config.yaml

kind: ClusterConfiguration
apiVersion: kubeadm.k8s.io/v1beta4
kubernetesVersion: v1.31.1. # k8s版本
---
kind: KubeletConfiguration
apiVersion: kubelet.config.k8s.io/v1beta1
cgroupDriver: systemd # 使用systemd而不是cgroupfs
---
apiVersion: kubeadm.k8s.io/v1beta4
kind: InitConfiguration
localAPIEndpoint:
  advertiseAddress: 10.0.0.177 # ip地址
  bindPort: 6443 # 端口
nodeRegistration:
  criSocket: /var/run/containerd/containerd.sock # containerd容器位置
```

## 启动

```bash
sudo kubeadm init --config kubeadm-config.yaml # 指定上面的配置文件

# 或者使用
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

启动日志：

```
(base) ubuntu@23-7-31-1539:~$ sudo kubeadm init --config kubeadm-config.yaml
W0919 11:23:05.057648 2924945 initconfiguration.go:126] Usage of CRI endpoints without URL scheme is deprecated and can cause kubelet errors in the future. Automatically prepending scheme "unix" to the "criSocket" with value "/var/run/containerd/containerd.sock". Please update your configuration!
[init] Using Kubernetes version: v1.31.1
[preflight] Running pre-flight checks
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action beforehand using 'kubeadm config images pull'
W0919 11:23:05.195324 2924945 checks.go:846] detected that the sandbox image "registry.k8s.io/pause:3.6" of the container runtime is inconsistent with that used by kubeadm.It is recommended to use "registry.k8s.io/pause:3.10" as the CRI sandbox image.
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [23-7-31-1539 kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local] and IPs [10.96.0.1 10.0.0.177]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "front-proxy-ca" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "etcd/ca" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [23-7-31-1539 localhost] and IPs [10.0.0.177 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [23-7-31-1539 localhost] and IPs [10.0.0.177 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "sa" key and public key
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "super-admin.conf" kubeconfig file
[kubeconfig] Writing "kubelet.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
[control-plane] Creating static Pod manifest for "kube-scheduler"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Starting the kubelet
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests"
[kubelet-check] Waiting for a healthy kubelet at http://127.0.0.1:10248/healthz. This can take up to 4m0s
[kubelet-check] The kubelet is healthy after 504.699086ms
[api-check] Waiting for a healthy API server. This can take up to 4m0s
[api-check] The API server is healthy after 8.001822739s
[upload-config] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[kubelet] Creating a ConfigMap "kubelet-config" in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Skipping phase. Please see --upload-certs
[mark-control-plane] Marking the node 23-7-31-1539 as control-plane by adding the labels: [node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node 23-7-31-1539 as control-plane by adding the taints [node-role.kubernetes.io/control-plane:NoSchedule]
[bootstrap-token] Using token: 2v9nfc.rn3vhrt63xkixat5
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] Configured RBAC rules to allow Node Bootstrap tokens to get nodes
[bootstrap-token] Configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] Configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] Configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
[kubelet-finalize] Updating "/etc/kubernetes/kubelet.conf" to point to a rotatable kubelet client certificate and key
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  **mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config**

Alternatively, if you are the root user, you can run:

  **export KUBECONFIG=/etc/kubernetes/admin.conf**

You should now deploy a pod network to the cluster.
Run "**kubectl apply -f [podnetwork].yaml**" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

**kubeadm join 10.0.0.177:6443 --token 2v9nfc.rn3vhrt63xkixat5 \
        --discovery-token-ca-cert-hash sha256:a5f50d85f8c3d804b378657f43b471cecdd0fa917774aaa7cc588a94cb62016b**
```

按照上面提示，运行命令。

## 配置**kubectl（主节点）**

```bash
# 非root用户
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# root用户
export KUBECONFIG=/etc/kubernetes/admin.conf
```

## 安装网络插件**（主节点，需要在子节点加入后安装）**

```bash
# 不需要sudo
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

## 检查状态（主节点运行）

**这里前pods节点状态异常（查看问题排查）。**

```bash
(base) ubuntu@23-7-31-1539:~$ **kubectl get nodes**
NAME           STATUS   ROLES           AGE    VERSION
23-7-31-1539   Ready    control-plane   165m   v1.31.1
(base) ubuntu@23-7-31-1539:~$ **kubectl get pods --all-namespaces**
NAMESPACE      NAME                                   READY   STATUS              RESTARTS      AGE
kube-flannel   kube-flannel-ds-9tkl6                  0/1     CrashLoopBackOff    6 (43s ago)   6m35s
kube-system    coredns-7c65d6cfc9-s9h2g               0/1     ContainerCreating   0             165m
kube-system    coredns-7c65d6cfc9-t8zhp               0/1     ContainerCreating   0             165m
kube-system    etcd-23-7-31-1539                      1/1     Running             0             165m
kube-system    kube-apiserver-23-7-31-1539            1/1     Running             0             165m
kube-system    kube-controller-manager-23-7-31-1539   1/1     Running             0             165m
kube-system    kube-proxy-fx5nj                       1/1     Running             0             165m
kube-system    kube-scheduler-23-7-31-1539            1/1     Running             0             165m
(base) ubuntu@23-7-31-1539:~$ **kubectl get svc --all-namespaces**
NAMESPACE     NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)                  AGE
default       kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP                  166m
kube-system   kube-dns     ClusterIP   10.96.0.10   <none>        53/UDP,53/TCP,9153/TCP   166m
```

## 其他节点加入集群

```bash
sudo kubeadm join 10.0.0.177:6443 --token 2v9nfc.rn3vhrt63xkixat5 \
        --discovery-token-ca-cert-hash sha256:a5f50d85f8c3d804b378657f43b471cecdd0fa917774aaa7cc588a94cb62016b
```

或者使用下面命令生成join命令 

```bash
sudo kubeadm token create --print-join-command
```

## 问题排查

### CoreDNS异常

在第一次使用`kubeadm init`初始化的时候，没有配置`--pod-network-cidr=10.244.0.0/16` 参数，导致在**安装 Pod 网络附加组件**的时候，CoreDNS出现异常，不在 `Running` 状态。要再次运行 `kubeadm init`，必须首先[卸载集群](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#tear-down)。在重新初始化的时候，没有将iptables防火墙规则重置，导致节点状态错误，为`NotReady` ，以下为完整重置方法。

重置

```bash
(base) ubuntu@23-7-31-1539:~$ **sudo kubeadm reset**
[reset] Reading configuration from the cluster...
[reset] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
W0919 16:30:20.433585 3207403 preflight.go:56] [reset] WARNING: Changes made to this host by 'kubeadm init' or 'kubeadm join' will be reverted.
[reset] Are you sure you want to proceed? [y/N]: y
[preflight] Running pre-flight checks
[reset] Deleted contents of the etcd data directory: /var/lib/etcd
[reset] Stopping the kubelet service
[reset] Unmounting mounted directories in "/var/lib/kubelet"
[reset] Deleting contents of directories: [/etc/kubernetes/manifests /var/lib/kubelet /etc/kubernetes/pki]
[reset] Deleting files: [/etc/kubernetes/admin.conf /etc/kubernetes/super-admin.conf /etc/kubernetes/kubelet.conf /etc/kubernetes/bootstrap-kubelet.conf /etc/kubernetes/controller-manager.conf /etc/kubernetes/scheduler.conf]

The reset process does not clean CNI configuration. To do so, you must remove /etc/cni/net.d

The reset process does not reset or clean up iptables rules or IPVS tables.
If you wish to reset iptables, you must do so manually by using the "iptables" command.

If your cluster was setup to utilize IPVS, run ipvsadm --clear (or similar)
to reset your system's IPVS tables.

The reset process does not clean your kubeconfig files and you must remove them manually.
Please, check the contents of the $HOME/.kube/config file.
```

根据提示删除`/etc/cni/net.d`文件和`$HOME/.kube/config`文件

```bash
sudo rm -rf /etc/cni/net.d
rm -rf $HOME/.kube/config
```

重置`iptables`防火墙规则，如果不重重防火墙规则，后续节点会出现`container runtime network not ready: NetworkReady=false reason:NetworkPluginNotReady message:Network plugin returns error: cni plugin not initialized` 异常。

```bash
# 重置所有防火墙规则
sudo iptables -F
sudo iptables -t nat -F
sudo iptables -t mangle -F
sudo iptables -X

# 仅重置**kubeadm规则**
sudo iptables -t nat -F KUBE-SERVICES
sudo iptables -t nat -F KUBE-NODEPORTS
sudo iptables -t nat -F KUBE-POSTROUTING
sudo iptables -t filter -F KUBE-FIREWALL
```

修改 kubeadm-config.yaml 文件

确保你的配置文件包含以下内容（特别是 ClusterConfiguration 部分）：

```yaml
apiVersion: kubeadm.k8s.io/v1beta4
kind: ClusterConfiguration
kubernetesVersion: v1.31.1
networking:
  podSubnet: "10.244.0.0/16"   # 将 pod 网络设置为 Flannel 所需的 CIDR
```

重新初始化

```bash
sudo kubeadm init --config kubeadm-config.yaml
```

### etcd一直重启（所有主机）

我在本地搭建集群测试的时候，使用kubeadm初始化之后，发现6443端口一会可以用一会又不能用。使用sudo crictl ps -a查看发现etcd、kube-apiserver、kube-scheduler、kube-controller-manager、kube-proxy这几个组件一直在重启。

它们之间的依赖关系：

```bash
                   +------------------------+
                   |       etcd             |
                   +------------------------+
                            ↑
                            |
                            |
                   +------------------------+
                   |    kube-apiserver      |
                   +------------------------+
                            ↑
            +---------------+---------------+
            |                               |
+-----------------------+       +--------------------------+
| kube-controller-manager |       |    kube-scheduler       |
+-----------------------+       +--------------------------+
                            |
                            ↓
                   +------------------------+
                   |      kube-proxy        |
                   +------------------------+
```

最底层的是etcd，问题应该是出现在这里。

查看etcd日志```crictl logs <id>``` ，日志中并没有明显的error日志。问gpt半天也解决不了，最后找到一片[博客](https://blog.csdn.net/ldjjbzh626/article/details/128400797)。博客中提到【该问题为未正确设置cgroups导致，在containerd的配置文件`/etc/containerd/config.toml`中】，我安装博客中进行设置，发现还是不行，再按照官方的进行设置还是不行。

最后我在官网中找到，【如果你在初次安装集群后或安装 CNI 后遇到容器崩溃循环，则随软件包提供的 containerd 配置可能包含不兼容的配置参数。考虑按照 [getting-started.md](https://github.com/containerd/containerd/blob/main/docs/getting-started.md#advanced-topics) 中指定的 `containerd config default > /etc/containerd/config.toml` 重置 containerd 配置，然后相应地设置上述配置参数。】

安装官网重置配置参数，然后再找到`SystemdCgroup` 参数，将其改为ture。

```bash
[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
  ...
  [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
    SystemdCgroup = true
```

重启containerd

```bash
sudo systemctl restart containerd
```

查看是否生效

```bash
test@node1:/etc/kubernetes$ sudo crictl info | grep SystemdCgroup
[sudo] password for test: 
WARN[0000] runtime connect using default endpoints: [unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. As the default settings are now deprecated, you should set the endpoint instead. 
            "SystemdCgroup": true # true生效
```

参考：

[https://kubernetes.io/zh-cn/docs/setup/production-environment/container-runtimes/#containerd](https://kubernetes.io/zh-cn/docs/setup/production-environment/container-runtimes/#containerd)

[https://blog.sundayhk.com/post/kube-flannel-always-restarting/](https://blog.sundayhk.com/post/kube-flannel-always-restarting/)

### Flannel 插件报错（所有主机都需要配置）

```bash
test@node1:/etc/kubernetes$ kubectl **get pods --all-namespaces**
NAMESPACE      NAME                            READY   STATUS    RESTARTS      AGE
kube-flannel   kube-flannel-ds-bds75           0/1     Error     2 (22s ago)   27s
kube-system    coredns-7c65d6cfc9-bhsfd        0/1     Pending   0             45s
kube-system    coredns-7c65d6cfc9-x88w5        0/1     Pending   0             45s
kube-system    etcd-node1                      1/1     Running   65            51s
kube-system    kube-apiserver-node1            1/1     Running   97            52s
kube-system    kube-controller-manager-node1   1/1     Running   106           51s
kube-system    kube-proxy-gxmhs                1/1     Running   0             45s
kube-system    kube-scheduler-node1            1/1     Running   97            51s

test@node1:/etc/kubernetes$ **sudo crictl ps -a**
WARN[0000] runtime connect using default endpoints: [unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. As the default settings are now deprecated, you should set the endpoint instead. 
WARN[0000] image connect using default endpoints: [unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. As the default settings are now deprecated, you should set the endpoint instead. 
CONTAINER           IMAGE               CREATED              STATE               NAME                      ATTEMPT             POD ID              POD
12fce0592f4e4       f1f31f4a8d91a       17 seconds ago       Exited              kube-flannel              4                   d63150ad4e6fd       kube-flannel-ds-bds75
97b6e42125c78       f1f31f4a8d91a       About a minute ago   Exited              install-cni               0                   d63150ad4e6fd       kube-flannel-ds-bds75
a8c395bc960a1       fd38104bd1952       About a minute ago   Exited              install-cni-plugin        0                   d63150ad4e6fd       kube-flannel-ds-bds75
7a040300d828b       db596b4c91462       2 minutes ago        Running             kube-proxy                0                   0a3d14b374fad       kube-proxy-gxmhs
24939c4c03721       544482eaef8e2       2 minutes ago        Running             kube-controller-manager   106                 809005c11de90       kube-controller-manager-node1
096046a931b16       8bb1f68f41635       2 minutes ago        Running             kube-scheduler            97                  8bd4f5af02265       kube-scheduler-node1
6697a3eb5729b       d99a4d575ed24       2 minutes ago        Running             kube-apiserver            97                  f38cc460a0578       kube-apiserver-node1
b012edfe5fa8d       27e3830e14027       2 minutes ago        Running             etcd                      65                  5099c6e06b3a5       etcd-node1

test@node1:/etc/kubernetes$ **sudo crictl logs 12fce0592f4e4**
WARN[0000] runtime connect using default endpoints: [unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. As the default settings are now deprecated, you should set the endpoint instead. 
I1125 15:53:31.188436       1 main.go:212] CLI flags config: {etcdEndpoints:http://127.0.0.1:4001,http://127.0.0.1:2379 etcdPrefix:/coreos.com/network etcdKeyfile: etcdCertfile: etcdCAFile: etcdUsername: etcdPassword: version:false kubeSubnetMgr:true kubeApiUrl: kubeAnnotationPrefix:flannel.alpha.coreos.com kubeConfigFile: iface:[] ifaceRegex:[] ipMasq:true ifaceCanReach: subnetFile:/run/flannel/subnet.env publicIP: publicIPv6: subnetLeaseRenewMargin:60 healthzIP:0.0.0.0 healthzPort:0 iptablesResyncSeconds:5 iptablesForwardRules:true netConfPath:/etc/kube-flannel/net-conf.json setNodeNetworkUnavailable:true}
W1125 15:53:31.188523       1 client_config.go:618] Neither --kubeconfig nor --master was specified.  Using the inClusterConfig.  This might not work.
I1125 15:53:31.197120       1 kube.go:139] Waiting 10m0s for node controller to sync
I1125 15:53:31.197161       1 kube.go:469] Starting kube subnet manager
I1125 15:53:32.198266       1 kube.go:146] Node controller sync successful
I1125 15:53:32.198308       1 main.go:232] Created subnet manager: Kubernetes Subnet Manager - node1
I1125 15:53:32.198312       1 main.go:235] Installing signal handlers
I1125 15:53:32.198688       1 main.go:469] Found network config - Backend type: vxlan
E1125 15:53:32.198726       1 main.go:269] Failed to check br_netfilter: stat /proc/sys/net/bridge/bridge-nf-call-iptables: no such file or directory
```

询问GPT说是**br_netfilter**模块没有加载，还有相关内核参数没有设置。

**解决方法：**

1. 检查 br_netfilter 模块是否加载

```bash
lsmod | grep br_netfilter # 没有输出表示没有加载
```

1. 手动加载 br_netfilter 模块（临时）

```bash
sudo modprobe br_netfilter # 运行命令后，在使用上面的命令检查
```

1. 确保 br_netfilter 在启动时加载

```bash
echo "br_netfilter" | sudo tee -a /etc/modules-load.d/k8s.conf
```

1. 检查并启用相关内核参数

```bash
sudo tee /etc/sysctl.d/99-kubernetes-cri.conf <<EOF
net.bridge.bridge-nf-call-iptables = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF
```

应用修改

```bash
sudo sysctl --system
```

1. 重启相关服务

```bash
sudo systemctl restart containerd
sudo systemctl restart kubelet
```

# 部署应用

## **创建 Nginx Deployment**

```bash
kubectl create deployment nginx --image=nginx
```

## **验证 Deployment 和 Pod 的状态**

```bash
kubectl get deployments
kubectl get pods
```

看到 Nginx Deployment 和 Pod 处于 Running 状态表示一切正常。

## **暴露 Nginx 服务**

```bash
kubectl expose deployment nginx --port=80 --type=NodePort
```

## **查找分配的端口号**

```bash
(base) ubuntu@23-7-31-1539:~$ **kubectl get svc**
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP        83m
nginx        NodePort    10.107.90.14   <none>        80:32008/TCP   6s
```

注意输出中的 **32008**，这就是为外部访问分配的端口号。

## **访问 Nginx 应用**

```bash
http://<Node-IP>:<NodePort>
```

## **删除应用**

```bash
kubectl delete deployment nginx
kubectl delete svc nginx
```

# 总结

第一次部署k8s，只在单机上测试，没有尝试加入其他节点。很多原理还不是很清楚，所以在解决问题的时候走了很多弯路，这里做一个学习记录。