---
title: OC屏蔽多余启动项
author: GOOPHER
tags:
  - OC配置教程
  - OpenCore配置
categories: 黑苹果
abbrlink: 10085
date: 2021-03-10 10:41:31
---
## 效果
屏蔽前：  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615344869000.png)  
屏蔽后：
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615344882000.png)  
## 步骤
打开OCC挂载EFI，打开config。  
点击Misc-其它设置--->Boot里勾选隐藏辅助条目即可。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615345090000.png) 
隐藏Tools附加工具，只需要勾选辅助即可。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615345175000.png)  
还有一些启动项可能设置完这些还屏蔽不了，则可以点击Security设置scan policy。设置为0为自动，或者仅勾选需要扫描的启动项即可。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615345363000.png) 
### 其他
隐藏后的启动项可以在OC界面按空格显示，但是scan policy屏蔽掉的按空格也是不会显示的。