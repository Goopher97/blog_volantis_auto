---
title: 黑苹果基础（三）
author: GOOPHER
categories: 黑苹果
tag:
  - 黑苹果基础
  - 脱离U盘引导
abbrlink: 51205
date: 2021-02-17 17:30:30
---
## 将OC、Clover引导安装至硬盘脱离U盘引导
需要DiskGenius软件、EasyUEFI或者其他可以管理UEFI启动项的软件，这里以EasyUEFI为例。  
注意EasyUEFI要下载破解版的，这里提供一个，点击[直达下载](https://goopher.lanzous.com/i66bXlrl4eh)
首先准备好要安装至硬盘的引导，如果在U盘里面需要先打开DiskGenius软件将U盘的EFI复制出来。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210217163848.png)  
选中，将其复制到桌面或者其他地方。
### OC的安装
打开准备好的EFI，打开DiskGenius软件，点击硬盘的ESP分区，点击浏览文件，看到EFI文件夹点击进去。然后将/OC文件夹复制进去。注意只用复制OC文件即可。BOOT文件夹可以不用，要是都复制进去了，BOOT文件夹被替换，需要修复Windows引导。关于修复引导请看上一篇。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210217164146.png)  
复制进去之后我们打开EasyUEFI软件，添加引导项。  
OC0.6.6版本，将启动文件指定到EFI/OC/OpenCore.efi即可，启动项名称随意。  
OC0.6.5及其之前的版本，将启动项指定到EFI/OC/Bootstrap/Bootstrap.efi文件即可。
### Clover的安装
同理，只将EFI目录下的CLover文件夹复制到硬盘ESP分区EFI目录下即可。Boot文件夹不要动，动了就要修复win的引导。  
然后打开EasyUEFI添加启动项，启动文件指定到EFI/Clover/Clover.efi即可。  
搞机最忌懒，麻烦大家多看教程，多查资料。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E5%9B%BE%E7%89%8720210217162240.png)