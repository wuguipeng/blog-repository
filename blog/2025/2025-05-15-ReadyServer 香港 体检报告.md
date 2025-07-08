---
slug: readyserver-xiang-gang-ti-jian-bao-gao
title: 留档｜ReadyServer 香港 性能测试
tags: [archive,vps]
---
<!-- truncate -->

![](https://report.check.place/ip/3H7IN0VS8.svg)


```shell
--------------------- A Bench Script By spiritlhl ----------------------
                   测评频道: https://t.me/vps_reviews                    
VPS融合怪版本：2025.04.12
Shell项目地址：https://github.com/spiritLHLS/ecs
Go项目地址 [推荐]：https://github.com/oneclickvirt/ecs
---------------------基础信息查询--感谢所有开源项目---------------------
 CPU 型号          : AMD EPYC 7713P 64-Core Processor
 CPU 核心数        : 1
 CPU 频率          : 1999.999 MHz
 CPU 缓存          : L1: 0.00 KB / L2: 0.00 KB / L3: 0.00 KB
 AES-NI指令集      : ✔ Enabled
 VM-x/AMD-V支持    : ✔ Enabled
 内存              : 185.95 MiB / 3.58 GiB
 Swap              : [ no swap partition or swap file detected ]
 硬盘空间          : 4.49 GiB / 99.99 GiB
 启动盘路径        : /dev/vda1
 系统在线时间      : 0 days, 2 hour 16 min
 负载              : 0.18, 0.05, 0.07
 系统              : AlmaLinux 8.10 (Cerulean Leopard) (x86_64)
 架构              : x86_64 (64 Bit)
 内核              : 4.18.0-553.el8_10.x86_64
 TCP加速方式       : cubic
 虚拟化架构        : KVM
 NAT类型           : Port Restricted Cone
 IPV4 ASN          : AS38001 NewMedia Express Pte Ltd
 IPV4 位置         : Tai Wo Hau / Kwai Tsing / HK
----------------------CPU测试--通过sysbench测试-------------------------
 -> CPU 测试中 (Fast Mode, 1-Pass @ 5sec)
 1 线程测试(单核)得分:          3466 Scores
---------------------内存测试--感谢lemonbench开源-----------------------
 -> 内存测试 Test (Fast Mode, 1-Pass @ 5sec)
 单线程读测试:          41823.98 MB/s
 单线程写测试:          21145.29 MB/s
------------------磁盘dd读写测试--感谢lemonbench开源--------------------
 -> 磁盘IO测试中 (4K Block/1M Block, Direct Mode)
 测试操作               写速度                                  读速度
 100MB-4K Block         20.9 MB/s (5092 IOPS, 5.03s)            20.9 MB/s (5099 IOPS, 5.02s)
 1GB-1M Block           551 MB/s (525 IOPS, 1.90s)              552 MB/s (526 IOPS, 1.90s)
---------------------磁盘fio读写测试--感谢yabs开源----------------------
Block Size | 4k            (IOPS) | 64k           (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 10.01 MB/s    (2.5k) | 160.82 MB/s   (2.5k)
Write      | 10.04 MB/s    (2.5k) | 161.66 MB/s   (2.5k)
Total      | 20.06 MB/s    (5.0k) | 322.48 MB/s   (5.0k)
           |                      |                     
Block Size | 512k          (IOPS) | 1m            (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 252.48 MB/s    (493) | 250.84 MB/s    (244)
Write      | 265.90 MB/s    (519) | 267.54 MB/s    (261)
Total      | 518.39 MB/s   (1.0k) | 518.39 MB/s    (505)
------------流媒体解锁--基于oneclickvirt/CommonMediaTests开源-----------
以下测试的解锁地区是准确的，但是不是完整解锁的判断可能有误，这方面仅作参考使用
----------------Netflix-----------------
[IPV4]
您的出口IP完整解锁Netflix，支持非自制剧的观看
NF所识别的IP地域信息：中国香港
[IPV6]
您的网络可能没有正常配置IPv6，或者没有IPv6网络接入
----------------Youtube-----------------
[IPV4]
连接方式: Youtube Video Server
视频缓存节点地域: 美国  洛杉机(LAX17S56)
Youtube识别地域: 中国香港(HK)
[IPV6]
Youtube在您的出口IP所在的国家不提供服务
---------------DisneyPlus---------------
[IPV4]
当前IPv4出口所在地区即将开通DisneyPlus
[IPV6]
DisneyPlus在您的出口IP所在的国家不提供服务
解锁Netflix，Youtube，DisneyPlus上面和下面进行比较，不同之处自行判断
----------------流媒体解锁--感谢RegionRestrictionCheck开源--------------
 以下为IPV4网络测试，若无IPV4网络则无输出
============[ Multination ]============
 Dazn:                                  Yes (Region: HK)
 Disney+:                               No
 Netflix:                               Yes (Region: HK)
 YouTube Premium:                       Yes (Region: HK)
 Amazon Prime Video:                    Yes (Region: HK)
 TVBAnywhere+:                          No
 Spotify Registration:                  No
 OneTrust Region:                       HK [Unknown]
 iQyi Oversea Region:                   HK
 Bing Region:                           HK
 Apple Region:                          CN
 YouTube CDN:                           Los Angeles, CA
 Netflix Preferred CDN:                 Hong Kong
 ChatGPT:                               No (Only Available with Mobile APP)
 Google Gemini:                         No
 Claude:                                No
 Wikipedia Editability:                 No
 Google Play Store:                     Hong Kong 
 Google Search CAPTCHA Free:            Yes
 Steam Currency:                        HKD
 ---Forum---
 Reddit:                                Yes
 ---Game---
 SD Gundam G Generation Eternal:        Yes
=======================================
 以下为IPV6网络测试，若无IPV6网络则无输出
---------------TikTok解锁--感谢lmc999的源脚本及fscarmen PR--------------
 Tiktok Region:         Failed
-------------IP质量检测--基于oneclickvirt/securityCheck使用-------------
数据仅作参考，不代表100%准确，如果和实际情况不一致请手动查询多个数据库比对
以下为各数据库编号，输出结果后将自带数据库来源对应的编号
ipinfo数据库  [0] | scamalytics数据库 [1] | virustotal数据库   [2] | abuseipdb数据库   [3] | ip2location数据库    [4]
ip-api数据库  [5] | ipwhois数据库     [6] | ipregistry数据库   [7] | ipdata数据库      [8] | db-ip数据库          [9]
ipapiis数据库 [A] | ipapicom数据库    [B] | bigdatacloud数据库 [C] | cheervision数据库 [D] | ipqualityscore数据库 [E]
IPV4:
安全得分:
声誉(越高越好): 0 [2] 
信任得分(越高越好): 13 [8] 
VPN得分(越低越好): 96 [8] 
代理得分(越低越好): 100 [8] 
社区投票-无害: 0 [2] 
社区投票-恶意: 0 [2] 
威胁得分(越低越好): 66 [8] 
欺诈得分(越低越好): 0 [1] 65 [E]
滥用得分(越低越好): 0 [3] 
ASN滥用得分(越低越好): 0.0011 (Low) [A] 
公司滥用得分(越低越好): 0.0001 (Very Low) [A] 
威胁级别: low [9] 
黑名单记录统计:(有多少黑名单网站有记录):
无害记录数: 0 [2]  恶意记录数: 0 [2]  可疑记录数: 0 [2] 无记录数: 94 [2]  
安全信息:
使用类型: corporate [9] unknown [C] hosting [0 7 A] business [8] DataCenter/WebHosting/Transit [3]
公司类型: hosting [0] isp [7 A]
是否云提供商: Yes [7 D]
是否数据中心: No [8 A C] Yes [0 1 5 6]
是否移动设备: Yes [E] No [5 A C]
是否代理: Yes [E] No [0 1 4 5 6 7 8 9 A C D]
是否VPN: Yes [A E] No [0 1 6 7 C D]
是否TorExit: No [1 7 D] 
是否Tor出口: No [1 7 D] 
是否网络爬虫: No [9 A E] 
是否匿名: No [1 6 7 8 D] 
是否攻击者: No [7 8 D] 
是否滥用者: No [7 8 A C D E] 
是否威胁: No [7 8 C D] 
是否中继: No [0 7 8 C D] 
是否Bogon: No [7 8 A C D] 
是否机器人: No [E] 
DNS-黑名单: 313(Total_Check) 0(Clean) 8(Blacklisted) 18(Other) 
Google搜索可行性：NO
-------------邮件端口检测--基于oneclickvirt/portchecker开源-------------
Platform  SMTP  SMTPS POP3  POP3S IMAP  IMAPS
LocalPort ✔     ✔     ✔     ✔     ✔     ✔    
QQ        ✘     ✘     ✔     ✘     ✔     ✘    
163       ✘     ✘     ✔     ✘     ✔     ✘    
Sohu      ✘     ✘     ✔     ✘     ✘     ✘    
Yandex    ✘     ✘     ✔     ✘     ✔     ✘    
Gmail     ✘     ✘     ✘     ✘     ✘     ✘    
Outlook   ✘     ✘     ✔     ✘     ✔     ✘    
Office365 ✘     ✘     ✔     ✘     ✔     ✘    
Yahoo     ✘     ✘     ✘     ✘     ✘     ✘    
MailCOM   ✘     ✘     ✔     ✘     ✔     ✘    
MailRU    ✘     ✘     ✘     ✘     ✔     ✘    
AOL       ✘     ✘     ✘     ✘     ✘     ✘    
GMX       ✘     ✘     ✔     ✘     ✔     ✘    
Sina      ✘     ✘     ✔     ✘     ✔     ✘    
Apple     ✘     ✘     ✘     ✘     ✘     ✘    
FastMail  ✘     ✘     ✘     ✘     ✘     ✘    
ProtonMail✘     ✘     ✘     ✘     ✘     ✘    
MXRoute   ✘     ✘     ✔     ✘     ✔     ✘    
Namecrane ✘     ✘     ✔     ✘     ✔     ✘    
XYAMail   ✘     ✘     ✘     ✘     ✘     ✘    
ZohoMail  ✘     ✘     ✘     ✘     ✘     ✘    
Inbox_eu  ✘     ✘     ✔     ✘     ✘     ✘    
Free_fr   ✘     ✘     ✔     ✘     ✔     ✘    
----------------三网回程--基于oneclickvirt/backtrace开源----------------
北京电信v4 219.141.140.10  检测不到回程路由节点的IPV4地址
北京联通v4 202.106.195.68           联通4837   [普通线路] 
北京移动v4 221.179.155.161          移动CMI    [普通线路] 
上海电信v4 202.96.209.133  检测不到回程路由节点的IPV4地址
上海联通v4 210.22.97.1              联通4837   [普通线路] 
上海移动v4 211.136.112.200          移动CMI    [普通线路] 
广州电信v4 58.60.188.222            电信163    [普通线路] 
广州联通v4 210.21.196.6             联通4837   [普通线路] 
广州移动v4 120.196.165.24           移动CMI    [普通线路] 
成都电信v4 61.139.2.69              电信163    [普通线路] 
成都联通v4 119.6.6.6                联通4837   [普通线路] 
成都移动v4 211.137.96.205           移动CMI    [普通线路] 
准确线路自行查看详细路由，本测试结果仅作参考
同一目标地址多个线路时，可能检测已越过汇聚层，除了第一个线路外，后续信息可能无效
---------------------回程路由--感谢fscarmen开源及PR---------------------
依次测试电信/联通/移动经过的地区及线路，核心程序来自nexttrace，请知悉!
广州电信 58.60.188.222
0.15 ms         * RFC1918
0.90 ms         * RFC1918
0.27 ms         * RFC1918
0.32 ms         * RFC1918
21.08 ms        AS2914 [NTTA-192] 中国 香港 gin.ntt.net
34.44 ms        AS2914 [NTT-BACKBONE] 新加坡 gin.ntt.net
38.04 ms        AS2914 [NTT-BACKBONE] 新加坡 gin.ntt.net
248.12 ms       AS4134 [APNIC-AP] 新加坡 www.chinatelecom.com.cn
148.41 ms       AS4134 [CHINANET-BB] 中国 广东 广州 www.chinatelecom.com.cn
249.62 ms       AS4134 中国 广东 深圳 福田区 www.chinatelecom.com.cn 电信
广州联通 210.21.196.6
0.17 ms         * RFC1918
1.01 ms         * RFC1918
0.29 ms         * RFC1918
1.30 ms         * 新加坡
149.67 ms       AS3491 [PCCW-BACKBONE] 中国 香港 pccwglobal.com
149.30 ms       AS3491 [PCCW-BACKBONE] 美国 加利福尼亚 圣何塞 pccwglobal.com
154.90 ms       * [NSFNET-T3] 美国 加利福尼亚 洛杉矶
225.04 ms       AS701 [UUNETCUSTB40] 瑞典 斯德哥尔摩省 斯德哥尔摩 verizon.com
229.01 ms       AS4837 [CU169-BACKBONE] 中国 广东 广州 chinaunicom.cn 联通
223.30 ms       AS4837 [CU169-BACKBONE] 中国 广东 广州 X-I chinaunicom.cn 联通
226.88 ms       AS17816 [APNIC-AP] 中国 广东 深圳 chinaunicom.cn 联通
227.65 ms       AS17623 [APNIC-AP] 中国 广东 深圳 chinaunicom.cn 联通
224.75 ms       AS17623 中国 广东 深圳 宝安区 chinaunicom.cn 联通
广州移动 120.196.165.24
0.17 ms         * RFC1918
1.49 ms         * RFC1918
0.31 ms         * RFC1918
0.64 ms         * 新加坡
89.57 ms        AS3491 [PCCW-BACKBONE] 中国 香港 pccwglobal.com
45.38 ms        AS58453 [CMI-INT] 新加坡 cmi.chinamobile.com 移动
92.02 ms        AS58453 [CMI-INT] 中国 香港 cmi.chinamobile.com 移动
47.51 ms        AS58453 [CMI-INT] 中国 广东 广州 cmi.chinamobile.com 移动
47.33 ms        AS9808 [CMNET] 中国 广东 广州 X-I chinamobileltd.com 移动
47.48 ms        AS9808 [CMNET] 中国 广东 广州 I-C chinamobileltd.com 移动
48.83 ms        AS9808 [CMNET] 中国 广东 广州 chinamobileltd.com 移动
50.71 ms        AS9808 [CMNET] 中国 广东 广州 chinamobileltd.com 移动
51.06 ms        AS56040 [APNIC-AP] 中国 广东 深圳 gd.10086.cn 移动
--------------------自动更新测速节点列表--本脚本原创--------------------
位置             上传速度        下载速度        延迟
Speedtest.net    1849.04Mbps     2766.62Mbps     889.591.002.00ms
中国香港         0.13Mbps        0.01Mbps        1.3560.001.00ms
新加坡           95.50Mbps       212.39Mbps      36.1740.0036.00ms
联通上海5G       17.67Mbps       48.12Mbps       206.85207.00201.00ms
电信Suzhou5G     0.00Mbps        0.00Mbps        756.65927.001678.00ms
电信Zhenjiang5G  0.00Mbps        0.00Mbps        471.081609.000.00ms
移动杭州5G       124.41Mbps      116.74Mbps      61.0961.0063.00ms
移动Chengdu      31.93Mbps       50.71Mbps       207.55234.00233.00ms
------------------------------------------------------------------------
 总共花费      : 8 分 58 秒
 时间          : kam cax 15  2:53:07 saaku GMT 2025
------------------------------------------------------------------------
```