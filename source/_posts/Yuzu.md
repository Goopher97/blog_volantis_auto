---
title: Switch模拟器Yuzu
author: GOOPHER
categories: 模拟器
tag:
  - Yuzu
  - 模拟器
  - 游戏
abbrlink: 50728
date: 2021-02-23 00:30:31
---
## 前言
玩腻了安卓模拟器，虚拟机的话可以尝试一下这款Switch模拟器。不过，这个对于配置的要求有一些高。
## 简介
Yuzu支持nps xci格式的Switch游戏包，不支持nsz等格式的游戏，要运行nsz格式需要将其转换为nps格式。nsz格式实际上就是nps的压缩包，但是并不能直接将其解压，需要使用转换工具才可以。并且，转换出的游戏不一定能运行。
### 下载地址
Yuzu： [点击下载](https://goopher.lanzous.com/ieVhjm2e0qj)
Keys： [点击下载](https://goopher.lanzous.com/iaKq1m2e0ra)
### 安装
下载好Yuzu Updater后将其解压，放在你喜欢的地方。  
在运行前，需要你将你的显卡驱动升级至最新，以确保正常运行。  
![升级显卡驱动](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223224819.jpg)
升级完成后，打开Yuzu Updater文件夹，运行里面的Yuzu Updater.exe程序。  
首次运行，需要进行安装操作。  
Version：版本 默认的Latest最新版就好。  
勾选下面的三个选择框。  
Auto-Launch：自动运行模拟器。  
Admin Mode：管理员模式。  
Auto-Close：自动关闭升级程序。  
之后点击Install下载安装即可。  
![下载安装中](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223225348.jpg)
安装完成后，首次运行Yuzu会报错，这是因为没有导入Keys。
### 导入Keys
点击文件，Open yuzu Folder。把下载好的Keys解压放入其中，此步骤重要。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223225928.jpg)
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223230116.jpg)
之后将模拟器关闭，再次运行Yuzu Updater.exe打开。经过上面的设置，以后每次都通过Yuzu Updater.exe运行即可保证自动将Yuzu更新到最新版。
### 导入游戏
双击添加游戏目录，选择nps格式的游戏所在目录即可。注意是选择目录，不是选择nps本体。
### 运行游戏前的设定
点击模拟，Configure。
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223230619.jpg)
取消运行速度限制，勾选多核仿真。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223230727.jpg)  
CPU精度设置为精确。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223230905.jpg)
图形根据你的显卡设置推荐使用OpenGL。  
设置完成后就可以双击游戏图标运行游戏了。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223231207.jpg)
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223231220.jpg)
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223231317.jpg)
### 游戏资源的下载地址
注意这里提供的网站有些游戏是收费的，不过也便宜，自己看着弄，我也没恰饭。我在想要不要买包含塞尔达旷野之息的那个包，售价9.9元，我这个电脑看着有点带不动这些复杂一点的游戏。  
游戏资源下载：[点击下载](http://www.iketian.com/html/switch/)
### 关于nsz转nps
需要工具转换，工具依赖Python、Framework 4.8  
下载地址：  
Python3.7win7及以上系统：[点击下载](https://goopher.lanzous.com/iwBVAjqbnkj)  
Framework 4.8：[点击下载](https://dhkcn.jb51.net/201904/tools/NETFramework4.8_jb51.rar)  
转换工具：[点击下载](https://goopher.lanzous.com/iwxVIm2g8fi)  
检查工具：[点击下载](https://goopher.lanzous.com/iAVfhm2g8le)
### 转换教程
先将Python和Framework安装好，然后解压转换工具和检查工具。  
运行NSCB.bat  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223233005.jpg)  
在弹出的窗口中输入8并回车  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223233031.jpg)
输入2并回车  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223233236.jpg)
将你要转换的nsz文件拖进去并回车  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223233352.jpg)
输入1回车  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223233447.jpg)
输入3回车  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223233540.jpg)
等待进度条完成，即可  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223233609.jpg)
转换完成的nps文件在NSCB_output文件夹内  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210223233732.jpg)
将其移动到其他目录下下导入模拟器即可。
