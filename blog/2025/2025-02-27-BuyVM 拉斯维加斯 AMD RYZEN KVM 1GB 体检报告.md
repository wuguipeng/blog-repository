---
slug: buyvm-lasvegas-amd-ryzen-kvm-1gb-tijianbaogao
title: 留档｜BuyVM 拉斯维加斯 AMD RYZEN KVM 1GB 体检报告
tags: [archive,vps]
---
<!-- truncate -->

![](https://oss.wuguipeng.com/image/2025/02/7e572405084462a5646591d1350399ae8705fe6e.png)

融合怪
```shell
--------------------- A Bench Script By spiritlhl ----------------------
                   测评频道: https://t.me/vps_reviews                    
VPS融合怪版本：2025.02.12
Shell项目地址：https://github.com/spiritLHLS/ecs
Go项目地址：https://github.com/oneclickvirt/ecs
---------------------基础信息查询--感谢所有开源项目---------------------
 CPU 型号          : AMD Ryzen 9 3900X 12-Core Processor
 CPU 核心数        : 1
 CPU 频率          : 3792.840 MHz
 CPU 缓存          : L1: 64.00 KB / L2: 512.00 KB / L3: 16.00 MB
 AES-NI指令集      : ✔ Enabled
 VM-x/AMD-V支持    : ✔ Enabled
 内存              : 347.30 MiB / 960.72 MiB
 Swap              : 721.63 MiB / 2.00 GiB
 硬盘空间          : 10.61 GiB / 19.59 GiB
 启动盘路径        : /dev/vda1
 系统在线时间      : 9 days, 20 hour 30 min
 负载              : 0.34, 0.15, 0.08
 系统              : Debian GNU/Linux 12 (bookworm) (x86_64)
 架构              : x86_64 (64 Bit)
 内核              : 6.1.0-20-amd64
 TCP加速方式       : bbr
 虚拟化架构        : KVM
 NAT类型           : Full Cone
 IPV4 ASN          : AS53667 FranTech Solutions
 IPV4 位置         : Las Vegas / Nevada / US
----------------------CPU测试--通过sysbench测试-------------------------
 -> CPU 测试中 (Fast Mode, 1-Pass @ 5sec)
 1 线程测试(单核)得分:          1724 Scores
---------------------内存测试--感谢lemonbench开源-----------------------
 -> 内存测试 Test (Fast Mode, 1-Pass @ 5sec)
 单线程读测试:          44183.86 MB/s
 单线程写测试:          19189.91 MB/s
------------------磁盘dd读写测试--感谢lemonbench开源--------------------
 -> 磁盘IO测试中 (4K Block/1M Block, Direct Mode)
 测试操作               写速度                                  读速度
 100MB-4K Block         74.9 MB/s (18.30 IOPS, 1.40s))          91.5 MB/s (22348 IOPS, 1.15s)
 1GB-1M Block           1.7 GB/s (1580 IOPS, 0.63s)             1.7 GB/s (1644 IOPS, 0.61s)
---------------------磁盘fio读写测试--感谢yabs开源----------------------
Block Size | 4k            (IOPS) | 64k           (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 233.15 MB/s  (58.2k) | 1.30 GB/s    (20.4k)
Write      | 233.76 MB/s  (58.4k) | 1.31 GB/s    (20.5k)
Total      | 466.91 MB/s (116.7k) | 2.62 GB/s    (40.9k)
           |                      |                     
Block Size | 512k          (IOPS) | 1m            (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 1.54 GB/s     (3.0k) | 1.44 GB/s     (1.4k)
Write      | 1.62 GB/s     (3.1k) | 1.54 GB/s     (1.5k)
Total      | 3.16 GB/s     (6.1k) | 2.99 GB/s     (2.9k)
----------------三网回程--基于oneclickvirt/backtrace开源----------------
北京电信 219.141.140.10  电信163    [普通线路] 
北京联通 202.106.195.68  联通4837   [普通线路] 
北京移动 221.179.155.161 移动CMI    [普通线路] 
上海电信 202.96.209.133  电信163    [普通线路] 
上海联通 210.22.97.1     联通4837   [普通线路] 
上海移动 211.136.112.200 移动CMI    [普通线路] 
广州电信 58.60.188.222   电信163    [普通线路] 
广州联通 210.21.196.6    联通4837   [普通线路] 
广州移动 120.196.165.24  移动CMI    [普通线路] 
成都电信 61.139.2.69     电信163    [普通线路] 
成都联通 119.6.6.6       联通4837   [普通线路] 
成都移动 211.137.96.205  移动CMI    [普通线路] 
准确线路自行查看详细路由，本测试结果仅作参考
同一目标地址多个线路时，可能检测已越过汇聚层，除了第一个线路外，后续信息可能无效
---------------------回程路由--感谢fscarmen开源及PR---------------------
依次测试电信/联通/移动经过的地区及线路，核心程序来自nexttrace，请知悉!
广州电信 58.60.188.222
0.40 ms         AS53667 [PONYNET-03] 美国 内华达州 拉斯维加斯 frantech.ca
0.97 ms         * RFC1918
58.75 ms        AS6939 [HURRICANE-11] 美国 加利福尼亚 洛杉矶 he.net
8.96 ms         AS6939 [HURRICANE-11] 美国 加利福尼亚 洛杉矶 he.net
10.11 ms        AS4134 [CHINANET-US] 美国 加利福尼亚 洛杉矶 www.chinatelecom.com.cn
186.41 ms       AS4134 [CHINANET-BB] 中国 广东 广州 www.chinatelecom.com.cn 电信
170.57 ms       AS4134 [CHINANET-BB] 中国 广东 广州 www.chinatelecom.com.cn 电信
188.36 ms       AS4134 [CHINANET-BB] 中国 广东 广州 www.chinatelecom.com.cn 电信
179.91 ms       AS4134 中国 广东 深圳 福田区 www.chinatelecom.com.cn 电信
广州联通 210.21.196.6
0.29 ms         AS53667 [PONYNET-03] 美国 内华达州 拉斯维加斯 frantech.ca
1.12 ms         * RFC1918
58.60 ms        AS6939 [HURRICANE-11] 美国 加利福尼亚 洛杉矶 he.net
10.20 ms        AS6939 美国 加利福尼亚 洛杉矶 HE-CU-POP-100GE he.net
172.67 ms       AS4837 [CU169-BACKBONE] 中国 广东 广州 chinaunicom.cn 联通
169.93 ms       AS4837 [CU169-BACKBONE] 中国 广东 广州 X-I chinaunicom.cn 联通
162.17 ms       AS17816 [APNIC-AP] 中国 广东 深圳 chinaunicom.cn 联通
171.98 ms       AS17623 [APNIC-AP] 中国 广东 深圳 chinaunicom.cn 联通
168.46 ms       AS17623 中国 广东 深圳 宝安区 chinaunicom.cn 联通
广州移动 120.196.165.24
0.44 ms         AS53667 [PONYNET-03] 美国 内华达州 拉斯维加斯 frantech.ca
1.12 ms         * RFC1918
58.53 ms        AS6939 [HURRICANE-11] 美国 加利福尼亚 洛杉矶 he.net
8.14 ms         AS6939 美国 加利福尼亚 费利蒙 he.net
8.44 ms         AS58453 [CMI-INT] 美国 加利福尼亚 洛杉矶 cmi.chinamobile.com 移动
171.39 ms       AS58453 [CMI-INT] 中国 广东 广州 cmi.chinamobile.com 移动
185.06 ms       AS9808 [CMNET] 中国 广东 广州 chinamobileltd.com 移动
183.83 ms       AS9808 [CMNET] 中国 广东 广州 I-C chinamobileltd.com 移动
184.86 ms       AS9808 [CMNET] 中国 广东 广州 chinamobileltd.com 移动
179.08 ms       AS9808 [CMNET] 中国 广东 广州 chinamobileltd.com 移动
165.40 ms       AS56040 [APNIC-AP] 中国 广东 深圳 gd.10086.cn 移动
--------------------自动更新测速节点列表--本脚本原创--------------------
位置             上传速度        下载速度        延迟     丢包率
Speedtest.net    1015.93 Mbps    976.01 Mbps     0.27     0.0%
洛杉矶           939.47 Mbps     938.27 Mbps     8.48     0.0%
联通上海5G       660.93 Mbps     460.61 Mbps     234.92   0.0%
移动Chengdu      1122.84 Mbps    482.57 Mbps     199.60   NULL
------------------------------------------------------------------------
 总共花费      : 4 分 17 秒
 时间          : Thu Feb 27 02:58:16 PST 2025
------------------------------------------------------------------------
```