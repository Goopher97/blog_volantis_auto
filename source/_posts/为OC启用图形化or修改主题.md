---
title: 为OC启用图形化/修改主题
author: GOOPHER
tags:
  - OC配置教程
  - OpenCore配置
categories: 黑苹果
abbrlink: 51040
keywords:
  - OC配置教程
  - 启用图形化
  - 修改OC主题
date: 2021-03-10 10:41:31
---
## 前言
其实这个早在之前的配置过程中就写过了，但是还是有好多人爱问，所以单独拿出来写一下。  
## 步骤
### 下载主题
这里仅提供一个官方的主题，需要其他主题的可以自己去下载，但是在使用的时候请注意有些主题需要一个额外的设置，麻烦自行查看主题的说明修改。  
[点击前往](https://github.com/acidanthera/OcBinaryData) 打开后点击Code--->Download zip下载。  ![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615343085000.png) 下载完成后将其解压。  
可能有的朋友下载会很慢，这里提供一个加速的下载链接， [点击前往](https://github.91chifun.workers.dev//https://github.com/acidanthera/OcBinaryData/archive/master.zip)  
### 挂载EFI修改
打开OCC编辑器，点击顶栏的工具---->挂载EFI，然后打开打开分区。  
然后先将原本EFI/OC/目录下的Resources文件夹删除，再把刚才下载好的打开，找到Resources文件夹，把它拖进去EFI/OC/目录下。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615343537000.png)  
### 使用OCC打开config配置文件修改
点击UEFI-UEFI设置--->UEFI驱动，然后打开EFI/OC/Drivers/，找到OpenCanopy.efi文件，将其拖动到OCC里面添加。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615343756000.png)  
之后点击Misc-其它设置，修改启动界面模式为External，其他默认即可。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615343917000.png)  
### 注意
这里的PickerVariant一般情况下我们使用Auto自动就可以了，可能有些主题需要改动，其相关释义如下：
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615344075000.png)