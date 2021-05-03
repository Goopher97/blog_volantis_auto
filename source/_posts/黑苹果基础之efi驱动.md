---
title: 黑苹果基础之efi驱动
author: GOOPHER
date: 2021-2-27 22:50:00
tags:
  - 黑苹果基础
  - efi驱动
abbrlink: 32053
categories:
  - 黑苹果
keywords:
  - 黑苹果基础
  - EFI驱动
---

## 什么是 efi 驱动

即在 EFI/OC/Drivers 下的 efi 文件，在选用必要的 efi 驱动前需要先了解每个 efi 驱动的作用。  
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12715023/1614785549965-71c22adb-44ca-494f-925d-baf68374c3ca.png#align=left&display=inline&height=514&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1028&originWidth=1542&size=152799&status=done&style=none&width=771)
一般来说会用到的也就其中几个。

### 各个 efi 驱动的作用

AudioDxe.efi：UEFI 固件中的 HDA 音频驱动程序。即在 OC 界面时加载的音频驱动，用于开机时的 duang~声和朗读当前选择的启动项名称。实用意义不大，不推荐使用，启用后电脑开机速度会变慢 3 秒左右。  
CrScreenshotDxe.efi：截图驱动。启用后，按下  F10  将能够截图并保存在 EFI 分区根目录下。
HiiDatabase.efi：UEFI 字体渲染驱动，适用于 3 代酷睿和之前更老的设备。在 UEFI Shell 中文字体渲染出错时启用，之后的电脑都不需要。  
NvmExpressDxe.efi：NVMe 驱动程序。用于 4 代酷睿或更老的设备上，在安装了 nvme 协议的硬盘后 OC 读不到该硬盘启用。若在新平台上将 NVMe 转接至 PCIe，或许也需要该驱动。  
OpenCanopy.efi：OC 的图像驱动。要启用 OC 的主题，就需要该驱动。
OpenHfsPlus.efi：HFS 文件系统驱动。推荐使用 HFSPlus.efi 若制作好启动盘，替换引导后读不到 macOS 的启动项，或许是该驱动没有启用。同时在 bigsur 之前的系统，recovery 分区也是需要该驱动，bigsur 的 recovery 现在是 apfs 的。  
OpenPartitionDxe.efi：分区管理驱动程序。用于加载旧版 macOS 的 DMG 映像（如 macOS 10.9 的分区映像）。对于  2 代酷睿或者更早的 CPU，由于缺少  RDRAND  指令支持，应使用  PartitionDxeLegacy  驱动程序。  
OpenRuntime.efi：原名  FwRuntimeServices.efi，用于实现  OC_FIRMWARE_RUNTIME  协议，通过支持只读、只写 NVRAM 变量，提升了 OpenCore 和 Lilu 的安全性。有些 Quirk 如  RequestBootVarRouting  依赖此驱动程序。由于 Runtime 驱动的性质（与目标操作系统并行运行），因此它不能在 OpenCore 本身实现，而是与 OpenCore 捆绑在一起。必须启用。  
OpenUsbKbDxe.efi：USB 键盘驱动，在自定义 USB 键盘驱动程序的基础上新增了对  AppleKeyMapAggregator  协议的支持。这是内置的  KeySupport  的等效替代方案。根据固件不同，效果可能会更好或者更糟。启用苹果热键后需要该驱动，可能有些设备不用，未测试过。  
UsbMouseDxe.efi：USB 鼠标驱动。一般只有虚拟机（如 OVMF）的固件中可能不包含该驱动，这些虚拟机需要依赖该驱动才能在引导界面使用鼠标。  
Ps2KeyboardDxe.efi： PS/2 键盘驱动。OpenDuetPkg 和一些固件可能不包括这个驱动，但对于 PS/2 键盘来说该驱动是必须的。注意，和  OpenUsbKbDxe  不同，该驱动不提供对  AppleKeyMapAggregator  的支持、因此需要启用  KeySupport  这个 Quirk。  
Ps2MouseDxe.efi：PS/2 鼠标驱动。一些非常老旧的笔记本的固件中可能不包含该驱动，但是这些笔记本需要依赖该驱动才能在引导界面使用触控板。  
XhciDxe.efi：XHCI USB controller 驱动程序。从 2 代酷睿开始的大多数固件中都包含此驱动程序。在较早的固件或旧系统可以用于支持外部 USB 3.0 PCI 卡。
