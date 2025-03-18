---
slug: windows-change-cmd-title
title: 文档｜Windows 常用 CMD 命令
tags: [docs,windows]
---
<!-- truncate -->

## **1. 系统信息相关**
| 命令 | 作用 |
|------|------|
| `systeminfo` | 查看详细的系统信息，如 Windows 版本、CPU、内存等 |
| `wmic os get caption` | 获取 Windows 版本 |
| `wmic cpu get name` | 查看 CPU 详细信息 |
| `wmic bios get serialnumber` | 查看 BIOS 序列号 |
| `hostname` | 显示计算机名称 |
| `ver` | 查看 Windows 版本号 |
| `echo %username%` | 查看当前用户 |

---

## **2. 目录和文件管理**
| 命令 | 作用 |
|------|------|
| `dir` | 查看当前目录下的文件和文件夹 |
| `cd 目录路径` | 进入指定目录（例：`cd C:\Windows`） |
| `cd ..` | 返回上一级目录 |
| `mkdir 目录名` | 创建新文件夹 |
| `rmdir 目录名 /s /q` | 删除文件夹（`/s` 递归删除，`/q` 静默删除） |
| `del 文件名` | 删除指定文件 |
| `copy 文件1 目标路径` | 复制文件到目标路径 |
| `move 文件 目标路径` | 移动文件到目标路径 |
| `ren 旧文件名 新文件名` | 重命名文件 |
| `echo %cd%` | 类似PWD |
| `mklink /H 目标链接路径 原始文件路径` | 创建硬连接 |
| `fsutil hardlink list 文件路径` | 查看硬连接 |
| `del 目标链接路径` | 删除硬连接 |
| `mklink 目标链接路径 原始文件路径` | 创建硬连接 |


---

## **3. 进程和任务管理**
| 命令 | 作用 |
|------|------|
| `tasklist` | 显示当前运行的进程 |
| `taskkill /f /im 进程名.exe` | 强制终止进程（如：`taskkill /f /im notepad.exe`） |
| `wmic process where name="进程名.exe" delete` | 终止进程 |
| `start 程序名.exe` | 打开应用（如：`start notepad.exe`） |
| `shutdown /s /t 0` | 立即关机 |
| `shutdown /r /t 0` | 立即重启 |

---

## **4. 网络相关**
| 命令 | 作用 |
|------|------|
| `ipconfig` | 查看本机 IP 地址 |
| `ipconfig /all` | 查看详细的网络配置信息 |
| `ipconfig /release` | 释放 IP 地址 |
| `ipconfig /renew` | 重新获取 IP 地址 |
| `ping 目标IP或域名` | 测试网络连通性（例：`ping google.com`） |
| `tracert 目标IP或域名` | 跟踪数据包到目标的路径 |
| `netstat -an` | 查看当前所有网络连接和端口状态 |
| `netsh wlan show profiles` | 查看已保存的 Wi-Fi 连接 |
| `netsh wlan show profile name="WiFi名" key=clear` | 查看 Wi-Fi 密码 |
| `arp -a` | 显示本机 ARP 缓存表 |

---

## **5. 磁盘管理**
| 命令 | 作用 |
|------|------|
| `chkdsk C:` | 检查 C 盘是否有错误 |
| `chkdsk C: /f` | 修复 C 盘上的错误 |
| `diskpart` | 进入磁盘分区管理工具 |
| `format X: /fs:ntfs` | 格式化 X 盘为 NTFS |
| `wmic logicaldisk get name` | 显示所有本地磁盘 |

---

## **6. 用户管理**
| 命令 | 作用 |
|------|------|
| `net user` | 查看本机所有用户 |
| `net user 用户名` | 查看指定用户详细信息 |
| `net user 用户名 /add` | 添加新用户 |
| `net user 用户名 /del` | 删除用户 |
| `net localgroup administrators 用户名 /add` | 将用户提升为管理员 |
| `whoami` | 显示当前登录的用户名 |
| `echo %USERDOMAIN%\%USERNAME%` | 查看完整的用户信息 |

---

## **7. 远程管理**
| 命令 | 作用 |
|------|------|
| `mstsc` | 打开远程桌面连接（RDP） |
| `mstsc /v:IP地址` | 连接远程 Windows 计算机 |
| `shutdown /m \\远程IP /s` | 远程关机 |
| `shutdown /m \\远程IP /r` | 远程重启 |

---

## **8. 进阶命令（管理员权限）**
| 命令 | 作用 |
|------|------|
| `sfc /scannow` | 修复系统文件 |
| `gpupdate /force` | 强制更新组策略 |
| `bcdedit` | 修改 Windows 启动配置 |
| `powercfg /batteryreport` | 生成电池健康报告（笔记本适用） |
| `wmic product get name` | 查看已安装的软件列表 |
| `wmic diskdrive get model,serialnumber,size` | 获取硬盘信息 |

---

## **9. PowerShell 常用命令**
| 命令 | 作用 |
|------|------|
| `Get-Process` | 查看所有进程 |
| `Get-Service` | 查看所有服务 |
| `Restart-Computer` | 重新启动计算机 |
| `Get-WmiObject Win32_BIOS` | 获取 BIOS 信息 |
| `Get-NetIPAddress` | 获取本机 IP 地址 |

---

## **10. 快捷技巧**
| 组合键 | 作用 |
|--------|------|
| `Ctrl + C` | 终止当前执行的命令 |
| `Ctrl + A` | 选中 CMD 窗口中的所有文本 |
| `Ctrl + M` | 启用 CMD 窗口的文本选择模式 |
| `Alt + Enter` | 全屏 CMD 窗口 |

---

## **🔥 总结**
- **日常管理**：`dir`、`cd`、`mkdir`、`del`
- **系统信息**：`systeminfo`、`wmic os get caption`
- **网络调试**：`ipconfig`、`ping`、`netstat`
- **磁盘管理**：`chkdsk`、`diskpart`
- **进程管理**：`tasklist`、`taskkill`
- **用户管理**：`net user`、`whoami`
- **远程操作**：`mstsc`、`shutdown /m`
- **高级命令**：`sfc /scannow`、`gpupdate /force`

---