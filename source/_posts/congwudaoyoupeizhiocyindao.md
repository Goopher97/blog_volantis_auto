---
title: 从无到有配置OC引导
author: GOOPHER
pin: true
categories: 黑苹果
tag:
  - OC配置教程
  - 黑苹果
abbrlink: 64658
keywords:
  - 黑苹果
  - OpenCore配置教程
date: 2020-12-25 23:45:31
---
<p>相关阅读：
<br><q><a href="https://oc.skk.moe/7-kernel.html"><b>OpenCore中文手册</b></a></q>
<q><a href="https://ocbook.tlhub.cn"><b>OpenCore部件</b></a></q>
<q><a href="https://blog.xjn819.com/post/opencore-guide.html"><b>Xjn大佬的博客</b></a></q>
<q><a href="https://goopher97.github.io/links/"><b>拓展阅读</b></a></q>
</p>
<hr/>
<p>示例配置：
<br>CPU i5 7500
<br>主板 ASUS Prime B250-Plus 板载声卡 alc887 板载网卡 rtl8111H
<br>内存 FURY 8GB DDR4 2400 x4
<br>显卡 Sapphire Radeon NITRO+ RX 570 4G
<br>硬盘 WDC SN750
<br>无线网卡 BCM943602CS
<br>显示器 VX2478-4K-HD</p>
<br/><div style="text-align:center">
<img alt="" src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/62D312F18506E8EA800DEE4E271C2118.jpg"/>
</div>
<br><div style="text-align:center">鲁大师截图</div>
<hr/>
<p>相关下载：
<br>macOS镜像：<a href="https://cloud.189.cn/t/E7rAZbzqU36v"><mark>Big Sur</mark></a> <a href="https://cloud.189.cn/t/jm6FJfmUVrue"><mark>Catalina</mark></a> 
  <a href="https://cloud.189.cn/t/meMjayvyArUb"><mark>Mojave</mark></a> 
  <a href="https://cloud.189.cn/t/BVBBVjna2uMb"><mark>High Sierra</mark></a> 
  <q><a href="https://blog.daliansky.net/">来源于黑果小兵</a></q>
<br>写入工具Tranmac单文件破解版：<a href="https://goopher.lanzous.com/iJqvnjo4zuh"><mark>点击下载</mark></a>
<br>config编辑工具： <mark>(注意使用OpenCore Configurator要与OpenCore引导版本对应)</mark>
<br><a href="https://galada.gitee.io/opencoreconfiguratoronline/"><mark>OpenCore在线编辑器</mark></a> 优点：Mac/Win均适用，有网络就可以编辑，选项有中文提示。 
注意：要使用对应版本的OpenCore引导。
<br>PT for Win：<a href="https://goopher.lanzous.com/iU3KEjqbdih"><mark>点击下载</mark></a>
<br>PlistEdit Pro（Mac）：<a href="https://www.macwk.com/soft/plistedit"><mark>点击下载</mark></a>
<br>OpenCore Configurator（Mac）：<a href="https://www.macwk.com/soft/opencore-configurator"><mark>点击下载</mark></a>
<br>Maciasl（Mac）：<a href="https://goopher.lanzous.com/iwUXQjqb40f"><mark>点击下载</mark></a>
<br>Hackintool（Mac）：<a href="https://www.macwk.com/soft/hackintool"><mark>点击下载</mark></a>
<br>三码生成GenSMBIOS（Python）:<a href="https://goopher.lanzous.com/iPhadjqb0sj"><mark>点击下载</mark></a>
<q><a href="https://github.com/corpnewt/GenSMBIOS https://goopher.lanzous.com/iPhadjqb0sj">来源Github</a></q>
<br>Python3.7（Win7及以上系统）：<a href="https://goopher.lanzous.com/iwBVAjqbnkj"><mark>点击下载</mark></a>
<br>macOS在线安装：<a href="https://goopher.lanzous.com/in6qQjpqikd"><mark>点击下载</mark></a>
<br>gibmacOS：<a href="https://goopher.lanzous.com/inllUjqblyb"><mark>点击下载</mark></a>
<br>OpenCore引导：<a href="https://github.com/acidanthera/OpenCorePkg/releases"><mark>点击下载</mark></a>
</p>
<hr/><div style="text-align:center">正篇</div>
<p>下载OpenCore引导并解压，先简单了解OpenCore引导文件夹结构：
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/B7BDF378-C887-4D60-9AD6-C0274BE0EEEA.png"/>
我们接下来需要用到的EFI在OpenCore-0/X64/目录下
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-185540@2x.png"/>
在/EFI/OC/目录下主要有6个文件夹，一个OpenCore.efi（OC核心），<mark>缺少一个config.plist配置文件</mark>。
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-190144@2x.png"/>
<br>ACPI文件夹：用来存放DSDT/SSDT
<br>Bootstrap：OC引导项（后续手动添加OC引导项到BIOS时可以制定到该文件夹下的efi文件，也可以指定到/EFI/BOOT/下的efi文件）
<br>Drivers文件夹：用来放置efi驱动
<br>Kexts文件夹：用来放置kext驱动
<br>Resources文件夹：用来放置OC图形化主题、开机声音
<br>Tools文件夹：存放工具（常用CleanNVRAM清除NVRAM中的数据，与ResetNVRAM重置不同。）
</p>
<p>开始配置：
<br>将/OpenCore-0/Docs/目录下的Sample.plist文件复制，粘贴到/EFI/OC/中并将其重命名为config.plist
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-192320@2x.png"/>
<br>之后下载所需的kext驱动用于驱动电脑硬件，绝大部分都能在GitHub上下载到。
<br>VirtualSMC.kext 仿冒SMC，必须
<br>Lilu.kext 依赖，必须
<br>AppleALC.kext 声卡 绝大部分用这个就行了
<br>WhateverGreen.kext 显卡
<br>RealtekRTL8111.kext 有线网卡 不同型号的网卡需要不同的驱动
<br>USBInjectall.kext USB 这个不是万金油
<br>将这些都放入到/EFI/OC/Kexts/目录下
<br>打开在线编辑器，上传config配置文件。注意提示框中的提示，该编辑器仅适用0.6.4版本！
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-193613@2x.png"/>
<br>点击右上角的Open，选择/EFI/OC/config.plist文件上传。我们可以看到里面有一些预设，可以帮助我们减少一些操作。
点击左侧的Kernel，配置启用Kext驱动。
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-194310@2x.png"/>
<br>把我们之前放到/EFI/OC/Kexts/的驱动都添加上去，注意这里的顺序不能出错，<mark>Lilu-SMC-WEG-ALC-其他</mark>.
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-194829@2x.png"/>
<br>添加好后配置下面的Quirks,勾选XhciPortLimit去除USB限制。
</p>
<hr/>
<p>点击左侧的Booter，配置下面的Quirks。
<br>勾选AllowRelocationBlock
<br>勾选DevirtualiseMmio
<br>勾选ProtectSecureBoot
<br>勾选ProtectUefiServices
<br>取消ProvideCustomSlide
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-200242@2x.png"/>
<br>点击左侧NVRAM，选择4D1ED开头的，将右侧对应的UIScale的值从01改为02，用于开启引导第一屏时的hidpi。
<br>选择7C43开头的，将右侧对应的boot-args（启动参数）的值修改为alcid=50（注入声卡ID）。常用引导参数-v
（开启跑码除错，我不需要除错，建议你们先保留-v参数🤫）。修改prev-lang:kbd的值为7A682D48 616E743A 2D313638 3939 此项设置为语言设置，
默认为俄语，所以建议都修改。
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-201657@2x.png"/>
</p>
<hr/>
<p>点击左侧Platforminfo，配置机型相关参数。下载GenSMBIOS、Python
（Win系统默认不自带要自己安装，安装时别忘记勾选Add Python to PATH这个选项。）
运行GenSMBIOS，输入数字3（Generate SMBIOS/生成SMBIOS）并且回车。
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-202804@2x.png"/>
<br>再输入Mac的机型回车
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-203052@2x.png"/>
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-203100@2x.png"/>
<br>便得到了三码,将其对应填入。
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-203537@2x.png"/>
<br>还有一个ROM的空，可以直接把网卡的MAC地址抄过去。在win下按win键+R输入cmd回车，在命令提示符中输入命令ipconfig /all回车查看网卡MAC地址。
</p>
<hr/>
<p>点击左侧UEFI，将OpenCanopy.efi前的#去除，启用图形化驱动。
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-204600@2x.png"/>
<br>点击APFS，勾选JumpstartHotPlug
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-204810@2x.png"/>
<br>点击左侧Misc Boot，将PickerMode改为External以启用OC图形化界面。
<br>将HibernateMode睡眠模式改为Auto自动。
<br>将PickerAttributes改为0。
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-205431@2x.png"/>
<br>点击Security，将ExposeSensitiveData改为2。
<br><mark>将Vault改为Optional。（重要）</mark>
<br><mark>将ScanPolicy改为0。（0为自动）</mark>
<br>将BootProtect改为BootProtect。（将OC引导项锁定在BIOS的第一项）
<br><mark>将DmgLoading改为Any。</mark>
<br><mark>将SecureBootModel改为Disabled。</mark>
<br>勾选AllowNvramReset
<br>勾选AllowSetDefault 
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-210302@2x.png"/>
<br>点击Debug，将Target改为0。
</p>
<hr/>
<p>配置完成，点击右上角的Save，用下载到的config.plist去替换掉原/EFI/OC/下的config.plist文件。
<br>之后需要补全一下，下载OcBinaryData。<a href="https://github.com/acidanthera/OcBinaryData">点击跳转</a>
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-211133@2x.png"/>
<br>下载完成后，将Resources文件夹替换进去，再将Drivers文件夹中的HfsPlus.efi文件复制到/EFI/OC/Drivers/中。
缺少HfsPlus.efi这个hfs文件系统驱动会导致OC识别不到mac的启动盘。
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-211505@2x.png"/>
<br>至此，可以将EFI尝试用去引导macOS了。
</p>
<hr/>
<p><div style="text-align:center">后续完善</div>
<br>1，定制USB接口。使用Hackintool工具，用U盘拔插的方式将所有接口插过一遍，注意USB3的接口需要再用USB2的设备再拔插一次。删除多余未绿的接口，
给USB接口正确的定义（USB2.0 3.0 内建），将蓝牙所占用的接口内建，选择internal，再导出USBPorts.kext。
<img alt=" " src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-212245@2x.png"/>
导出的文件很多，只用USBPorts.kext就可以了。
<br>修改USBPorts.kext提升USB接口电流，给苹果设备12W快充。在USBPorts.kext上右键，显示包内容，点进Contents文件夹内，用PlistEdit Pro打开
这个Info.plist文件，修改电流相关。
```
<key>kUSBSleepPortCurrentLimit</key>
<integer>3000</integer>
<key>kUSBSleepPowerSupply</key>
<integer>5100</integer>
<key>kUSBWakePortCurrentLimit</key>
<integer>3000</integer>
<key>kUSBWakePowerSupply</key>
<integer>5100</integer>
```
<img src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-213002@2x.png"/>
<br>之后保存好，再将USBPorts.kext放入到/EFI/OC/Kexts/下。删除USBInjectAll.kext,并配置config相关参数。
<br>2，发现睡眠过程中有自动唤醒的问题，查看睡眠日志发现有RTC（Alarm）的问题，编辑config，点击Kernel Patch，
勾选第一个Disable RTC wake scheduling补丁。
<img src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-213820@2x.png"/>
<br>查看唤醒日志命令：
```
log show 1d | grep -i "Wake reason"
```
<br>3，制作SSDT-PLUG SSDT-PMCR补丁。参考<q><a href="https://ocbook.tlhub.cn">OC部件</a></q>
<br>下载<a href="https://github.com/daliansky/OC-little">OC-little</a>和Maciasl
<br>将这两个补丁保存为aml格式，放入/EFI/OC/ACPI/文件夹内，并且配置config ACPI中相关参数。
<img src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201226-215445@2x.png"/>
</p>
<br>注意与OC部件中的说明不同：在SSDT-PMCR中还需要自己加入PPMC，不加可能导致无法正常睡眠。
<br>具体如下：
```
/*
 * Intel ACPI Component Architecture
 * AML/ASL+ Disassembler version 20200925 (64-bit version)
 * Copyright (c) 2000 - 2020 Intel Corporation
 * 
 * Disassembling to symbolic ASL+ operators
 *
 * Disassembly of iASLGqDus3.aml, Fri Jan 29 00:17:25 2021
 *
 * Original Table Header:
 *     Signature        "SSDT"
 *     Length           0x0000008F (143)
 *     Revision         0x02
 *     Checksum         0x4B
 *     OEM ID           "APPLE"
 *     OEM Table ID     "APmc"
 *     OEM Revision     0x00000000 (0)
 *     Compiler ID      "INTL"
 *     Compiler Version 0x20200925 (538970405)
 */
DefinitionBlock ("", "SSDT", 2, "APPLE", "APmc", 0x00000000)
{
    External (_SB_.PCI0, DeviceObj)

    If (_OSI ("Darwin"))
    {
        Scope (_SB.PCI0)
        {
            Device (PPMC)
            {
                Name (_ADR, 0x001F0002)  // _ADR: Address
            }

            Device (PMCR)
            {
                Name (_HID, EisaId ("APP9876"))  // _HID: Hardware ID
                Name (_STA, 0x0B)  // _STA: Status
                Name (_CRS, ResourceTemplate ()  // _CRS: Current Resource Settings
                {
                    Memory32Fixed (ReadWrite,
                        0xFE000000,         // Address Base
                        0x00010000,         // Address Length
                        )
                })
            }
        }
    }
}


```
<hr/>
<p>至此我的OC完善结束，日常使用中未发现其他问题。
<br>附件<mark><b><q><a href="https://goopher.lanzous.com/ixxkelc9bmf">我的EFI版本0.6.6</a></q></b></mark> 
注意使用我的EFI时请先替换掉原有的三码。
</p>
