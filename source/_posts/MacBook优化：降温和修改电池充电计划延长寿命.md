---
title: MacBook优化：降温和修改电池充电计划延长寿命
author: GOOPHER
tags:
 - MacBook降温
 - MacBook充电计划修改
categories: MacBook优化
abbrlink: 00009
keywords:
 - MacBook降温
 - MacBook充电计划修改
date: 2021-5-2 14:00:00
---
## 给MacBook降温
这里使用的方法是禁用睿频，当然，这会让CPU性能大打折扣。。。
不过，我觉得对于笔记本来说没有睿频也还行，毕竟不指望用笔记本跑什么编译什么的，只要能看看网页文档就够了。
这里使用的软件是Turbo Boost Switcher Pro这个软件，[下载地址](https://www.macwk.com/soft/turbo-boost-switcher-pro)  
这个软件也有免费版的，但是免费的没有动态禁用睿频功能，所以还是建议使用破解的pro版，可以根据温度禁用睿频，等温度降低后还可以自动启用睿频，使用体验更好。  
注意，这个软件破解的需要在hosts里屏蔽它的正版检测地址，但是对于使用小猫咪的用户hosts屏蔽的方法会失效，需要自己修改小猫咪的配置。  
hosts屏蔽:
```
# Turbo Boost Switcher Pro
127.0.0.1 api.rugarciap.com
```
小猫咪屏蔽规则：
```
- DOMAIN-SUFFIX,api.rugarciap.com,🛑 全球拦截
```
如图所示：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210502-142843@2x.png)
{% endgallery %}
如果没有屏蔽好，这个软件就会弹出盗版检测，导致破解失效。  
当然你也可以使用防火墙软件，禁止它联网。
之后打开软件，在最顶栏上设置自动模式，温度太高时禁用睿频，温度降低后又重新启用睿频。
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210502-143242@2x.png)
{% endgallery %}
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210502-143407@2x.png)
{% endgallery %}
我这里设置的温度是达到80后禁用，温度降低到60后启用。  
我们可以使用Intel® Power Gadget 这个软件查看效果。[下载地址](https://software.intel.com/content/www/us/en/develop/articles/intel-power-gadget.html)  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/5DDC043CB1053DA03BCBE6A23EE540C3.jpg)
{% endgallery %}
当然你也可以使用物理降温，散热支架之类，不过我觉得那样就要多带东西了，不符合便携的要求。当然加钱买M1的新本子或许才是最优解。
## 修改充电计划
有时候我们把电插上后就忘记拔或者是懒得拔，但是macOS旧版本又没有限制充电至合理额度的功能，新版本的macOS虽然也加入了电池学习，但是蜜汁触发，搞不懂它是怎么想的，所以就打算自己限制一下。  
将锂电池的电量限制在20%-80%更有利于寿命。  
下载我编译好的 [smc](https://goopher.lanzous.com/iSkpvoq63dc)  
解压后打开终端，cd切换至smc目录：
```
cd smc
```
```
sudo ./smc -k BCLM -w <你需要的充电限制的16进制值>
```
注意这里不要带尖括号，如我设置的
```
sudo ./smc -k BCLM -w 50
```
16进制的50就是10进至的80，可以自己找个在线的转换一下，如果要恢复充电到100%就把50改成64。  
之后使用下面这个命令查看是否生效：
```
./smc -k BCLM -r
```
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210502-145849@2x.png)
{% endgallery %}
实际上这个可能会略有偏差，不过也够了。
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210502-150008@2x.png)
{% endgallery %}
可以看到我这个到85%就不再继续充电了，偏差一点问题不大。  
如果你在使用10.15或者更新的big sur的话也可以试试AlDente这个app，应该要比上面这个容易使用一点。[点击跳转](https://github.com/davidwernhart/AlDente)  
## 写在最后
根据温度动态禁用睿频后温度基本在可接受范围了，使用上更加舒适了，没有出现C面都烤手的情况。