---
title: OpenCore更新0.6.7
author: GOOPHER
date: 2021-2-27 22:50:00
tags:
  - OpenCore更新
  - 黑苹果
abbrlink: 31033
categories:
  - 黑苹果
keywords:
  - OC引导更新
  - OC0.6.7
---

### 更新步骤

与上一次更新步骤一致，此处就不过多赘述。如果不懂，请参看上一篇更新文章: [升级 OC066](https://goopher.tk/posts/52146.html)

### 相关下载

OpenCore0.6.7：[点击下载](https://github.com/acidanthera/OpenCorePkg/releases/download/0.6.7/OpenCore-0.6.7-RELEASE.zip) 
AppleAlc1.5.8：[点击下载](https://github.com/acidanthera/AppleALC/releases/download/1.5.8/AppleALC-1.5.8-RELEASE.zip)

### 开始更新

##### 挂载 EFI

首先随便打开一个能挂载 EFI 分区的工具挂载 EFI 分区，像 OCC 之类的都可以。  
![截屏2021-03-02 23.10.49.png](https://cdn.nlark.com/yuque/0/2021/png/12715023/1614697859368-929f5116-6081-4436-bbe6-2906ba888aee.png#align=left&display=inline&height=174&margin=%5Bobject%20Object%5D&name=%E6%88%AA%E5%B1%8F2021-03-02%2023.10.49.png&originHeight=174&originWidth=1268&size=195627&status=done&style=none&width=1268)
![WX20210302-231134@2x.png](https://cdn.nlark.com/yuque/0/2021/png/12715023/1614697905503-0f664645-41d3-4e58-9a19-c0747a907905.png#align=left&display=inline&height=276&margin=%5Bobject%20Object%5D&name=WX20210302-231134%402x.png&originHeight=276&originWidth=1932&size=79421&status=done&style=none&width=1932)

##### 备份 EFI

挂载之后先打开分区，备份原来的 EFI 至 U 盘或是别的地方，以便更新失败后恢复使用。  
![QQ20210302-231507@2x.png](https://cdn.nlark.com/yuque/0/2021/png/12715023/1614698115768-4d34730c-bf6c-4445-afe6-ca3dc20396bc.png#align=left&display=inline&height=210&margin=%5Bobject%20Object%5D&name=QQ20210302-231507%402x.png&originHeight=210&originWidth=278&size=24789&status=done&style=none&width=278)

##### 解压复制替换和修改 config

过程不再赘述。  
修改 config，对照 Sample 示例文件修改。  
此次升级变动如下：  
UEFI-Audio 下新增 ResetTrafficClass  
UEFI-Input 下移除 KeyMergeThreshold  
UEFI-Output 下新增 GopPassThrough
UEFI-Quirks 下新增 ActivateHpetSupport

##### 查看更新是否成功

![QQ20210302-233840@2x.png](https://cdn.nlark.com/yuque/0/2021/png/12715023/1614699526513-cab3b313-78ab-4af1-9d29-0629e3f52fe2.png#align=left&display=inline&height=340&margin=%5Bobject%20Object%5D&name=QQ20210302-233840%402x.png&originHeight=340&originWidth=702&size=32104&status=done&style=none&width=702)
备注：有时候这个版本号没更新的话需要重置一下 NVRAM。

### 相关阅读

[OC 中文手册](https://oc.skk.moe) 
备注：文档也会更新不及时，在你不了解更新确切意义时建议暂不更新，或做好备份，做好准备再更新。
