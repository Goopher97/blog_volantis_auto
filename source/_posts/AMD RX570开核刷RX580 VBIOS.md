---
title: 蓝宝石RX570开核成RX580
author: GOOPHER
tags:
  - BIOS魔改
  - 教程
categories: BIOS魔改
abbrlink: 00008 #短链接
keywords:
  - BIOS魔改
  - 开核
date: 2021-4-16 22:50:00
---
## 前言
在开始之前，需要知道刷BIOS的风险，刷入了错误的VBIOS可能导致开机花屏、不显示等问题。刷入错误的VBIOS后需要切换双BIOS为好的那个再进入系统再在开机状态下切换回刷坏的VBIOS再刷回，如果没有双BIOS就需要使用核显或者其他好的独显进入系统后刷回。当然也可以使用编程器刷回。  
确认了风险之后，就可以开始操作了，本教程同样适用黑苹果玩家残血580刷570，步骤是一样的。  
先在显卡官网查询显卡信息，如下图所示：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/C3BD2AEA27ECF0C17FFA535C49A343B3.png)
{% endgallery %}
目前我只知道我手里的这款RX570 4G 海外版双8pin供电的可以开核成RX580，其他显卡应该都不行了。
## 步骤
### 查看显卡信息保存原来的VBIOS
打开GPUZ工具，查看信息：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ%E6%88%AA%E5%9B%BE20210415005858.jpg)
{% endgallery %}
可以看到这里的着色器单元是2048SP，开核后这里就会变成2304SP，即满血的RX580。
保存原本的BIOS：  
点击AMD LOGO下的分享按钮，选择保存路径保存备份正常的VBIOS。  
### 下载刷写工具和VBIOS
打开 [techpowerup](https://www.techpowerup.com/vgabios/) 这个网站，我们可以看到这里有很多的分类，我们按照信息检索，查找出我们需要的VBIOS：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ%E6%88%AA%E5%9B%BE20210415005802.jpg)
{% endgallery %}
到这里之后我们需要特别注意所刷写的VBIOS所支持的显存、还有显卡接口顺序等是否符合自己的显卡。以我这个为例，刚才通过GPUZ查看到显存是海力士显存，则我们需要下载的VBIOS就是支持海力士的这个。不能使用三星显存的这个，众所周知，三星的显存性能更好，基础频率更高，刷入后肯定是会花屏的。  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ%E6%88%AA%E5%9B%BE20210415005833.jpg)
{% endgallery %}
下载好VBIOS之后，就到这个网站下载刷写工具： [atiflash](https://www.techpowerup.com/download/ati-atiflash/)
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210416-230023@2x.png)
{% endgallery %}
### 开始写入VBIOS
打开atiflash这个工具：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ%E6%88%AA%E5%9B%BE20210415005946.jpg)
{% endgallery %}
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ%E6%88%AA%E5%9B%BE20210415005955.jpg)
{% endgallery %}
点击载入图像，选择到我们下载好的VBIOS打开。
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ%E6%88%AA%E5%9B%BE20210415010007.jpg)
{% endgallery %}
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ%E6%88%AA%E5%9B%BE20210415010022.jpg)
{% endgallery %}
点击程序按钮，稍等片刻
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ%E6%88%AA%E5%9B%BE20210415010032.jpg)
{% endgallery %}
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ%E6%88%AA%E5%9B%BE20210415010036.jpg)
{% endgallery %}
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ%E6%88%AA%E5%9B%BE20210415010043.jpg)
{% endgallery %}
完成后重启电脑，RX570和RX580用的驱动都是同一个所以不用重装驱动。
### 最后
打开GPUZ查看开核是否成。
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ%E6%88%AA%E5%9B%BE20210415010302.jpg)
{% endgallery %}
我们可以看到显示的型号变成了RX580，着色器单元也变成了2304SP满血的，在黑苹果里免驱。
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210416-231121@2x.png)
{% endgallery %}