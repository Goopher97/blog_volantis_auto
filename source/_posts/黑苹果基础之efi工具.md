---
title: 黑苹果基础之efi工具
author: GOOPHER
date: 2021-2-27 22:50:00
tags:
  - 黑苹果基础
  - efi工具
abbrlink: 31708
categories:
  - 黑苹果
keywords:
  - 黑苹果基础
  - EFI工具
---

### 什么是 efi 工具

即 EFI/OC/Tools 目录下的 efi 文件。  
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12715023/1614787354126-95e19b69-ee7f-4e95-ae87-d9b65396e5a2.png#align=left&display=inline&height=514&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1028&originWidth=1542&size=142924&status=done&style=none&width=771)

### 各个 efi 工具的作用

BootKicker.efi：进入 Apple 的 BootPicker 菜单（仅 Mac 同款显卡才可以使用）。
ChipTune.efi：测试 BeepGen 协议，生成不同频率和长度的音频信号。
CleanNvram.efi：清空 NVRAM。常用  
GopStop.efi：用一个简单的场景测试 GraphicOutput 协议。
KeyTester.efi：在  SimpleText  模式下测试键盘输入。  
MmapDump.efi：丢弃内存映射对象。
OpenControl.efi：开启主控台。
OpenShell.efi：UEFI shell
ResetSystem.efi：系统重置。
RtcRw.efi：RTC（CMOS）读写。
VerifyMsrE2.efi：检查 CFG Lock。
