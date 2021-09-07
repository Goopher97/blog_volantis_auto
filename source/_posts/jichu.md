---
title: 黑苹果基础（一）
author: GOOPHER
categories: 黑苹果
tag:
  - 黑苹果基础
  - 启动盘制作
abbrlink: 21510
keywords:
  - 黑苹果基础
  - 黑苹果启动盘制作
date: 2021-02-11 00:30:31
---

## UEFI启动的简要流程

![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210211013533.png)
在这里先不讨论传统BIOS引导，传统引导方式需要模拟UEFI，推荐使用Clover模拟，OC模拟还有很多问题。

明白这个之后，我们可以知道对于黑苹果来说重要的就是EFI分区内的引导。常用的Clover和OC目前都有很多可以白嫖的案例，当然也可以自己配置一个引导，教程博客内有。

## 创建黑苹果启动盘

推荐使用Transmac软件写入，下载链接在[从无到有配置OC引导](https://goopher97-github-io.vercel.app/2020/12/25/congwudaoyoupeizhiocyindao/) 这篇文章中。镜像推荐使用黑果小兵打包的，创建Big Sur之前的启动盘应使用至少8G的U盘，创建Big Sur的启动盘应至少16G。

将下载好的Transmac软件加压出来，之后右键--》以管理员方式运行。

![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210210234555.png)

找到U盘，右键--》选择第二项Format Disk for Mac，在弹出的选项框中选择Yes--》OK，稍等片刻，将U盘格式化为Mac的格式。

![格式化U盘](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210210234739.png)

![选择Yes](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210210234944.png)

![选择OK](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210210235107.png)

![格式化中](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210210235134.png)

看到Format Complete后点击OK，格式化完成。

![格式化完成](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210210235223.png)

格式化之后win10可能弹出提示框，可直接关闭，这是win10无法读取Mac分区弹出的提示。

格式化完成后写入镜像，在U盘上右键，选择第三项Restore with Disk Image。

![写入镜像](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210210235526.png)

选择Yes。

![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210210235634.png)

点击红框内按钮，选择镜像。

![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210210235723.png)

在弹出的文件浏览里选择要写入的镜像，我这里写入的是我自己打包的镜像。

![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210210235818.png)

![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210210235945.png)

点击OK开始写入。

![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210211000016.png)

![写入中](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210211000045.png)

写入会比较慢，具体看U盘的写入速度和镜像的大小。

看到Restore Complete时点击OK，写入完成。

![写入完成](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210211001201.png)

关闭Transmac软件。

### 检查

下载[DiskGenius](https://www.diskgenius.cn/download.php)软件打开，选择U盘。

![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210211001552.png)

可以看到U盘上有两个分区，第一个EFI分区就是引导（Clover、OC）存放的分区，第二个HFS+的分区就是mac镜像存放的分区（win下无法正常读取）。

如果你是写入的黑果小兵打包的镜像，应该在EFI分区下还会有一个微PE的分区，方便在win10无法进入时急救。

选择EFI分区，点击浏览文件，在这里就可以看到引导的目录。在这里可以将里面的引导复制出来，也可以删除，如果要将文件放入可直接拖拽进去。

![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210211002324.png)  
