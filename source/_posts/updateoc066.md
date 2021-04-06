---
title: 升级OpenCore066
author: GOOPHER
categories: 黑苹果
tag:
  - OC引导升级
  - 黑苹果教程
abbrlink: 52146
keywords:
  - OC引导升级
  - 黑苹果教程
date: 2021-02-04 16:57:31
---
## 注意
从低版本的OC升级上来都应该手动配置（推荐），查看更新日志，比对与旧版本的不同进而修改，能减少许多问题。
## 下载
[OC066下载](https://github.com/acidanthera/OpenCorePkg/releases)  
[OcBinaryData](https://github.com/acidanthera/OcBinaryData)  
常用驱动：  
[AppleALC](https://github.com/acidanthera/AppleALC/releases)  
[VirtualSMC](https://github.com/acidanthera/VirtualSMC/releases)  
[Lilu](https://github.com/acidanthera/Lilu/releases)  
[WhateverGreen](https://github.com/acidanthera/WhateverGreen/releases)
## 替换
解压下载好的OpenCore-0.6.6-RELEASE.zip文件，进到OpenCore-0.6.6-RELEASE/X64/EFI/OC/中。
另开一个文件窗口，将AppleAlc等驱动全部解压出来，并将kext驱动复制到刚才的OC/Kexts文件夹中，如图所示：  
![复制更新的kext驱动](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-171949@2x.png)  
挂载EFI，打开旧的OC文件夹。打开旧OC的Kexts文件夹，把没有更新的kext驱动复制过去。  
![复制未更新的Kext驱动](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-172432@2x.png)  
打开旧OC的ACPI文件夹，把里面的文件复制到新的OC的ACPI文件夹中。
![复制SSDT](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-172634@2x.png)  
返回上一级目录，把config文件从旧OC复制到新的OC文件夹中。  
![复制config文件](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-172923@2x.png)  
066去掉了启动保护，所以新的OC文件夹中没有Bootstrap这个文件夹。  
解压OcBinaryData-master.zip文件，将Resources文件夹复制到新的OC文件夹中替换覆盖。  
![覆盖Resources文件夹](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-173414@2x.png)
## 修改config文件
使用PlistEdit Pro软件打开OpenCore-0.6.6-RELEASE/Docs/Sample.plist示例文件和OpenCore-0.6.6-RELEASE/X64/EFI/OC/config.plist文件。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-173944@2x.png)  
比对这两个文件里不同，并将不同的地方改进config文件中。这一步要求细心，要是懒得比对的话可以使用OCC066版本打开config保存一下即可。  
经过比对，在Kernel-Quirks下新增了SetApfsTrimTimeout一项，手动加进config文件中：  
![新增SetApfsTrimTimeout](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-175027@2x.png)  
在Misc-Boot中新增LauncherOption和LauncherPath两项：  
![新增LauncherOption和LauncherPath](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-175343@2x.png)  
在Misc-Security中去掉了BootProtect这项：  
![去掉BootProtect](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-175901@2x.png)  
在PlatformInfo-Generic下新增MaxBIOSVersion这项：  
![新增MaxBIOSVersion](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-180339@2x.png)  
在PlatformInfo下新增UseRawUuidEncoding这项：  
![新增UseRawUuidEncoding](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-180435@2x.png)  
修改UEFI-Drivers里的HfsPlus.efi为OpenHfsPlus.efi：  
![HfsPlus.efi改为OpenHfsPlus.efi](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-180757@2x.png)  
当然你想继续使用HfsPlus.efi的话也可以，记得将这个efi驱动复制到对应文件夹。  
在UEFI-Quirks下新增DisableSecurityPolicy这项：  
![新增DisableSecurityPolicy](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-181159@2x.png)  
修改完成后保存config，打开EFI分区里的EFI文件夹，将BOOT和OC文件夹删除，再把新的BOOT和OC文件夹复制过去，重启电脑。（不推荐，容易翻车。）  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-181714@2x.png)
推荐：将新的OC复制到U盘中，从U盘启动确认没有问题再替换硬盘EFI分区中的文件。
## 查看更新是否成功
打开Hackintool查看引导和内核拓展即可。
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-183124@2x.png)
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-183132@2x.png)
## 可能会遇到的问题
Q1：更新后OC的引导丢失。  
这是因为之前使用的OC的启动保护，而066去掉了启动保护，所以需要重新添加引导项，启动文件指定到EFI/BOOT/BOOTx64.efi这个文件或者将启动文件指定到EFI/OC/OpenCore.efi这个文件，OC066可以直接从OpenCore.efi启动了。  
Q2:以前的启动保护没了，有没有替代？（为什么需要使用启动保护：使用/EFI/BOOT/BOOTx64.efi的时候，容易被win10或者其他系统在安装/升级时替换掉，导致OC引导项丢失。）  
打开config编辑，在Misc-Boot下将LauncherOption的值改为Full，将UEFI-Quirks下的RequestBootVarRouting的值改为Yes/True。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-221707@2x.png)
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210204-221719@2x.png)
重启电脑之后重置一下NVRAM，OC便会将启动项改为OpenCore.efi并锁定在第一个。  
Q3：我之前都没有升级OC，跳版本升级怎么办？  
跳版本升级也是与上面的步骤一致，不同的就是config中需要修改的项更多，需要更仔细一些，当然你也可以直接用OCC066对应版本打开config保存一下，OCC便会自动升级config，但是需要注意的地方就是新增的项有一些也是需要看自己配置做修改的。

### 关于这些设置具体是干嘛的不做过多阐述，自行查阅中文说明。[OC中文手册](https://oc.skk.moe/7-kernel.html)  
