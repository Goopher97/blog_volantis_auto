---
title: OC设置白果开机duang～
author: GOOPHER
tags:
  - OC配置教程
  - OpenCore配置
categories: 黑苹果
abbrlink: 61617
date: 2021-03-10 12:41:31
---
## 步骤
### 下载与替换
与上一篇为OC启用图形化一致， [点击跳转](https://goopher.tk/2021/03/10/为OC启用图形化or修改主题/)  
注意看一下Resources/Audio/目录下是否有声音文件。  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615347579000.png)  
{% endgallery %}
### 修改配置
打开Hackintool工具，点击PCIe，找到声卡。声卡一般子类型为Audio device，右键，copy device path  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615347803000.png)  
{% endgallery %}
使用OCC打开config，找到UEFI-UEFI设置--->开机声音，AudioDevice这里粘贴进去：  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615347916000.png)  
{% endgallery %}
PlayChime设置为Auto自动，OC则会从NVRAM读取是否播放开机声音，即可以通过系统内的系统偏好设置-声音-启动时播放声音这个选择来控制，更贴近白果。设置为Enable启用，则每次开机都会播放声音，不受系统偏好设置的控制。  
勾选AudioSupport，MinimumVolume是声音的大小，可填0-100，VolumeAmplifier是系统音量到原始音量的线性换算的乘法系数，可填0-1000，SetupDelay为音频编解码器重新配置的延迟，单位为微秒。  
这里比较需要注意的是AudioCodec和AudioOut，AudioCodec这两个，我的之前看过知道是一个0一个1了。  
```
OCAU: 2/3 PciRoot(0x0)/Pci(0x3,0x0)/VenMsg(<redacted>,00000000) (1 outputs)
```
如果不是这样的还需要自己查看：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615348943000.png)  
{% endgallery %}
AudioOut的话可以暴力一点从0开始试一试。也可以去找调试日志。
即：  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615349094000.png)  
{% endgallery %}
最后不要忘了启用音频驱动，找到AudioDxe.efi，拖动到UEFI驱动里。
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615349184000.png)
{% endgallery %}
## 最后
Misc里面的PickerAudioAssist语言辅助，这个还是不要启用了，每次都朗读启动项名称很烦。
还有ResetTrafficClass这个是legacy HDA上将TCSEL重置为T0，一般用不上，不管。  
启用开机声音之后，每次开机加载都会被这个拖慢，所以要不要这个还是看自己选择。