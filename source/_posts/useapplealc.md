---
title: 使用AppleALC快速仿冒声卡驱动
author: GOOPHER
categories: 黑苹果
tag:
  - 声卡
  - AppleALC
  - 黑苹果教程
abbrlink: 22869
date: 2020-12-29 19:08:31
---
#### 所需下载：
AppleALC：[点击下载](https://github.com/acidanthera/AppleALC/releases)
LiLu：[点击下载](https://github.com/acidanthera/Lilu/releases)  
Clover Configurator（旧版，适用于未r5120之前的版本）：[点击下载](https://goopher.lanzous.com/i56ijju7afg)  
Clover Configurator（适用于OpenClover）：[点击下载](https://goopher.lanzous.com/ihZfpju7aqh)  
OpenCore Configurator：[点击下载](https://www.macwk.com/soft/opencore-configurator)
---
## 首先需要确定声卡型号
在windows系统中打开Aida64查看or查看设备管理器里声卡的硬件ID。  
确定好声卡型号之后，[点击打开](https://github.com/acidanthera/AppleALC/tree/master/Resources) 该网站，找到自己的型号点击进去。  
以我的声卡为例，型号是ALC887。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201229-194528@2x.png)  
在layout后面的数字就是ID，每个型号的声卡都会有很多个ID，具体是哪一个，参看紧跟后面的注释。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201229-194807@2x.png)  
可以看到我的主板的声卡ID为50，当然，不是每个人的设备都会这么轻松，在后面注释中没有找到自己设备的，就需要每个ID都试一下。
---
### 驱动声卡
将applealc.kext、lilu.kext放到引导的对应文件夹中，打开config配置文件，注入ID：  
OC：  
方法一：  
在NVRAM-7开头-注入启动参数 alcid=50 50改成你自己的ID即可。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201229-195322@2x.png)  
方法二：  
在设备属性设置中注入，参看[OC简要配置说明（旧）已修正](https://goopher97.github.io/2020/12/27/OCjianyaopeizhishuom/)  
Clover:  
在设备设置，Audio下填写ID即可。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201229-195700@2x.png)
---
最后：  
每次注入完ID重启，打开系统偏好设置-声音-输出，切换输出看有无声音。要是输出里是空的，那就需要换下一个ID注入重启再试。  
声音输出不正常，爆音，也更换ID重启再试。试了多个ID无果先查看AppleAlc驱动是否加载了。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201229-200047@2x.png)  
主流设备一般都没有问题，另外使用过voodoohda那就先删除万能声卡驱动，重装一次系统再试。
