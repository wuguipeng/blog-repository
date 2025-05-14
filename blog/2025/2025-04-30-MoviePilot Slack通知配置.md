---
slug: moviepilot-slack
title: 折腾｜MoviePilot Slack通知配置
tags: [toss,mymedia]
---


MoviePilot官方支持的通知类型有**微信/Telegram/Slack/SynologyChat/VoceChat**。首选应该是Telegram，但是Telegram有网络要求，对于安装在国内的MP不太友好。可以使用代理，多了一层出故障的概率就越大，所以就pass掉Telegram。不想使用微信。SynologyChat和VoceChat不太熟悉。最后选了Slack。

<!-- truncate -->


MoviePilot的Wiki中对Slack的配置有说明，不太详细，而且Slack在2025年3月31日，弃用了Bots，相关教程也少，自己在配置Slack时踩了些坑，在此记录一下。

## 前置工作

1. 注册Slack账号。
2. https://slack.com/intl/zh-cn/ 创建工作区

## 创建应用
1. https://api.slack.com/apps 点击**Create New App**。
2. 选择创建类型 **From scratch**，输入应用名称和工作区名称，点击**Create App**。
3. 开启**Socket Mode** > **Enable Socket Mode**。
4. 赋予权限，**OAuth & Permissions** > **Bot Token Scopes**，添加*chat:write*、*im:read*、*im:history* 、*channels:read*、*commands*、*groups:read*权限。
5. 赋予权限。**Event Subscriptions** > **Subscribe to bot events**，添加*message.im*、*app_mention*权限。
6. 按需维护**Interactivity & Shortcuts**菜单，类型为**Global**，MoviePilot文档中说菜单Callback ID需与项目主页说明一致，我没看懂，自己随便填了一个。
7. 创建**App-level token**，**Basic Information** > **App-Level Tokens** > **Generate an app-level token**，输入*Token Name*，赋予*connections:write*权限，点击确认。
8. 创建Bots，**App Home** > **Your App’s Presence in Slack**，编辑*Bot Name*，在底部勾选*Allow users to send Slash commands and messages from the chat tab*，不勾选，无法在直接给Bot发送消息。会提示向此应用发送消息的功能已关闭。
9. 安装APP，**Install App**。
10. 复制**Install App**中的*Bot User OAuth Token*和**Basic Information**中的*App-Level Tokens*，粘贴到MoviePilot的配置文件中。


参考：
https://wiki.movie-pilot.org/zh/notification MoviePilot文档  
https://api.slack.com/quickstart Slack Api文档  
https://github.com/jxxghp/MoviePilot/issues/2672 Slack 无法发送消息问题


