---
title: OC简要配置说明（旧）已修正
author: GOOPHER
pin: true
categories: 黑苹果
tag:
  - 黑苹果教程
  - OpenCore配置
abbrlink: 4815
keywords:
  - 黑苹果教程
  - OC配置教程
date: 2020-12-27 21:22:31
---
注意事项：OC对于有依赖的SSDT/KEXT加载顺序有严格要求，注意在config配置中的顺序。
主要适用于UEFI启动的电脑。  
本文当前写作时OC正式版为0.5.9，0.6.0测试版。以下的配置适用于这两个版本，后续OC的更新可能会有些许改动，到时候应该再参考官方文档进行修改。
## 第一小节，OC目录结构的简要说明
我们从GitHub或者其他地方下载到OpenCore之后解压，会得到如下三个文件夹：
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%201.png)  
其中第一个Docs里面有当前版本的英文说明和config配置示例文件（Sample.plist和SampleFull.plist），我们主要使用其中之一并将其重命名为config.plist作为OC的配置文件。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%202.png)  
我们主要使用的是EFI文件夹的内容。在EFI文件夹中有BOOT和OC两个子文件夹，我们接下来的配置也主要在OC文件夹中进行。  
如下图所示：  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%203.png)
---
### ★我的OC配置五步曲：
第一步将前面Docs文件夹中的Sample.plist文件重命名为config.plist并拷贝到OC文件夹中；  
第二步在Kexts文件夹中放入所需要的Kext驱动；  
第三步在Drivers文件夹中放入补充性的efi驱动；  
第四部在ACPI文件夹中放入SSDT；  
第五部编辑配置config文件。
---
接下来将以我的电脑为例，带大家一步步配置OC，吃上黑苹果。  
我电脑的配置如下：  
（X86组装机）  
CPU：i5 7500  
主板：华硕Prime B250 Plus（支持原生NVRAM，原生电源管理等）  
硬盘：西数SN750 1T 西数机械黑盘 1T  
显卡：蓝宝石RX580超白金4G  
内存：金士顿骇客神条DDR4 2400 8G*4  
显示器：优派VX2478-4K-HD（支持MAC模式，默认自动开启HIDPI）  
电源：振华750W（方便日后升级）  
键盘：客制化GK61 81键热插拔机械键盘Cherry轴  
鼠标：ROG GLADIUS II CORE  
主板自带声卡：ALC887 （通过查询可知仿冒ID为50）  
主板自带网卡：RTL8111H  
无线网卡：白果拆机BCM943602CS三天线（2.4GWi-Fi与蓝牙干扰严重，我日常使用5GWi-Fi和蓝牙没有问题，支持接力隔空等功能）
---
了解完电脑的配置，接下来还需要对BIOS进行如下设置：  
关闭：CSM兼容模块 快速启动 串口 VT-d CFG-LOCK RC6节能（在核显设置那）  
开启：核显 VT-x 大于4G地址空间解码  
设置系统类型为other 核显显存为64M（主要是之前使用核显的时候驱动方便，如果只作加速使用设置多大是无所谓的）首选显卡Auto（自动模式）  
注意电脑之间存在差别，设置BIOS的时候要灵活处理。  
接着我们对OC继续配置，在Kexts文件夹中放入所需要的Kext驱动：  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%204.png)  
说明：  
RealtekRTL8111.kext为主板自带网卡的驱动。  
WhateverGreen.kext为显卡所需要的驱动。  
USBInjectAll.kext为USB所需要的驱动。  
AppleALC.kext为声卡驱动。  
VirtualSMC.kext为仿冒SMC的驱动。  
Lilu.kext为依赖性驱动。  
了解每个驱动的作用是重要的一步，能避免放置多余/错误的驱动导致额外的问题。
---
在Drivers文件夹中放入补充性的efi驱动：  
目前我只在其中补充性得放入了HFSPlus.efi，这个从Clover那边嫖一个过来就行。（大概是用来识别HFS文件系统的，也就是识别macOS安装盘的时候会用上。关于APFS文件系统，OC目前自带的已经可以识别只是需要开启，后续编辑和配置config的时候会讲到。）  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%205.png)  
在ACPI文件夹中放入SSDT：  
这一步所需要用到的工具：maciasl（群文件）  
需要用到的辅助文件OC-little（GitHub，群文件均有下载）  
最好是先提取一份原机未修改的DSDT，提取的方法有很多种，我是使用的Clover进行提取的。在Clover引导界面按下F4稍等一会儿，过程中没有提示，大概多等个十几秒就可以了，重启挂载EFI后便可在Clover的ACPI文件夹下的origin文件夹中看到。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%206.png)  
我们使用maciasl打开原机提取的DSDT.aml这个文件，之后参考OC-little中的02-仿冒设备中的第一个仿冒EC。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%207.png)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%209.png)  
通过阅读README.md说明文档，我们得知，需要在DSDT中搜索PNP0C09这个关键词。查询之后发现我的机器EC名称不是直接叫EC，而是叫H_EC。正常情况下应该是要使用到该补丁了，但是继续阅读DSDT发现，我这个机器关于EC的返回为：Return (Zero)，则略过了这一步，跳到下一阶段。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2010.png)  
我们打开OC-little的05-注入设备，进入第一个文件夹注入X86，注入X86主要为了实现CPU的电源管理。通过阅读README.md说明文档可知，我们需要在DSDT中搜索Processor关键词。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2011.png)  
对比说明文档可知，我的电脑属于第一种情况，则使用SSDT-PLUG-_PR.CPU0.dsl文件，用maciasl打开后编译，另存为SSDT-PLUG.aml文件放入到OC对应文件夹。  
接下来是弄一个SSDT-PMC.aml或者~~SSDT-APMC.aml~~来实现节能五项，直接嫖就可以了。要是一个不好用就换另外一个即可，把maciasl软件打开新建一个，然后复制内容进去保存为aml文件就好了。   
PS：此处SSDT-APMC已修正为SSDT-PMCR，具体请查看《从无到有配置OC引导》中后续完善部分。  
至此对于这部分已经基本结束，台式机嘛，弄的东西少点。如果你是笔记本，你还需要参照OC-little制作电池补丁等等，这些东西已经基本成熟，只要认真阅读说明文档，基本不会有什么问题。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2012.png)  
我对我这里的没有讲到的几个说一下，SSDT-DTGP.aml和SSDT-GRAPHICS.aml这两个文件是我从论坛嫖来的，主要用来给RX580注入白果的显卡信息，伪装成白果580X显卡。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2013.png)  
~~剩下的一个文件SSDT-UIAC.aml，这个是我用来定义USB接口的，为什么这里不讲怎么弄这个，主要是因为不建议大家使用ACPI定制USB端口，强烈建议大家先试试用Hackintool工具定制。如果说，你像我一样，使用Hackintool工具定制后容易出现别的问题，譬如我的，睡眠后蓝牙会挂掉。在考虑使用ACPI定制USB口。关于这一个部分的内容，OC-little中亦有详细的说明。~~  
PS：此处我已改用USBPorts.kext，具体请查看《从无到有配置OC引导》中后续完善部分。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2014.png)  
重要说明：以上制作的SSDT中并没有添加一个操作系统类型的判断，如果说你跟我一样是macOS单系统用户便可以不加。假如你还需要使用OC来引导你的Windows系统实现双系统或者多系统，那么你就必须加入判断操作系统的语句，因为OC并不像Clover那样，它会傻傻得把你的SSDT也给Windows或是其他系统加载上，这样就会导致Windows和其他系统出现异常，这一点上感觉Clover会方便很多。  
判断系统类型基本语句If (_OSI("Darwin"))，macOS系统内核名称Darwin，所以我们DSDT中判断语句是写Darwin而不是写macOS。  
与Kext驱动一样，我们应该对我们自己放进去的SSDT心中有数，明白其作用，不要什么都瞎往里面塞，我认为一个好的引导配置应该紧贴机器配置，精简但功能齐全。  
接下来就需要编辑配置config文件了：  
所需要到的工具：OpenCore Configurator~~（注意这个只是用做参考，不要用它来编辑config，有时候它会破坏config的结构。）~~ProperTree（推荐！轻量化。）Xcode（选用，安装包太大了，感觉没必要。）Hackintool（黑苹果的瑞士军刀）Clover Configurator（用来摇三码的，OCC也可以摇，但是没CC好用。）  
在使用OpenCore Configurator请注意对应OC引导版本。  
用ProperTree打开EFI/OC/config.plist配置文件，并将所有下拉收回，可得到如下：  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2015.png)  
上边的WARNING我个人觉得没啥好看的，直接进入正题，我们可以看到config主要分为了8个块。其中对应的内容如下：
---
ACPI：这里的话主要是用来配置SSDT的，其中又有4个子集，分别为Add Delete Patch Quirks。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2016.png)  
我们主要用到的是Add（添加）这一项，其下面子集中需要我们自行填写我们放入的SSDT的信息，如上图所示。结合之前，我的配置中我使用了5个SSDT文件，则需要0-4子集（它的计数是从0开始的）。我们将SSDT的文件名填入到Path一项后面对应的位置，如上所示，并且将Enabled后对应的填为True（表示启用这个SSDT）。在Comment一项对应的是填写这个SSDT的备注，可以写写它是干什么的，也可以不写，为方便后期维护我建议还是将用途写清楚标明白，直观上一眼就能看出来。  
我们每个人机器配置不同，所需要的SSDT数量也不同，这样就可能0-4不够用或者多几个的情况。我比较野，大家也可以学我这样做，直接选中0-4其中之一，然后键盘com+c复制，再选中一下Add，再按com+v粘贴，之后修改其内容即可。如果多了，需要删除的，先选中要删除的那个，然后鼠标右键，Remove删除完事。  
重要：对于有依赖的SSDT，OC这里的配置有严格的顺序要求，比如我这里有注入白果显卡信息的SSDT两个，其要求为DTGP在之前就要加载。我们就要把它放在前面，这一点我感觉还是Clover省心一点。关于其他的SSDT的顺序要求，在OC-little中有很详细的说明，大家仔细阅读就可以搞定了。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2017.png)  
之后是Delete，如字面意思一样，禁用一些SSDT，个人觉得没啥用，不需要配置这里。  
再往下是Patch，这里是热补丁设置。我自己的机器倒是没有用得上这个，不过还是给大家提供两个：   
1.在10.15中，一些资料指出我们需要把EC控制器(EC0)改名为EC来确保能进入10.15系统：
```
Comment: EC0 to EC
Count:0
Enabled:YES
Find:<4543305F>
Limit:0
Mask:<>
OemTable:<>
Replace:<45435F5F>
ReplaceMask:<>
Skip:0
TableLength:0
TableSignature:<>
```
需要注意的是EC的这个名称，前面我就有讲到了在原始DSDT中搜索关键词PNP0C09来获取EC控制器的名称。  
2.华擎、华硕、微星主板可能会遇到RTC问题而无法进入系统，这同样需要添加hotpatch补丁来解决：
```
Comment: RTC fix
Count:0
Enabled:YES
Find:<A00A9353 54415301>
Limit:0
Mask:<>
OemTable:<>
Replace:<A00A910A FF0BFFFF>
ReplaceMask:<>
Skip:0
TableLength:0
TableSignature:<>
```
往下走是Quirks，里面的东西感觉都用不上，我全部选的False，如果你有需要，改为True启用即可。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2018.png)  
FadtEnableReset：一些旧的主板需要对FADT进行标记来激活电脑的开机和关机功能，这里我们不许要启动它（如果你遇到关机变重启，可以打开试试，我们之后也会在nvram中将这个问题修复）。  
NormalizeHeaders：清理ACPI头，一些主板的ACPI表需要打开这个修复启动。  
RebaseRegions：换硬件、升级BIOS等对硬件的操作会对ACPI表产生影响，一般不需要打开，若发现卡PCI Configuraion Begin，请尝试打开。  
ResetHwSig：休眠相关项，台式机不需要。  
ResetLogoStatus：重置logo什么的？感觉没啥用。
---
Booter：主要是一些内存的相关设置。  
MmioWhitelist：默认的第一项是为Haswell芯片提供的内存寻址修复，如果此类芯片碰到内存相关问题，请开启它(enable选择yes)。  
默认第二项是开机卡PCI Configuration这里。ACPI、PCI device同时释放到内存时发生0x1000内存地址被占用而卡在PCI Configration.如果碰到此类问题，请开启它。
这个我的电脑用不上，就不设置了。你们需要用到的就把Enabled对应的False改为True启用就好了。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2019.png)  
接下来是Quirks，OC这个每项下面都有个Quirks，应该是搞了一些奇奇怪怪的难以分类的玩意，理解为补充性的功能就好了，需要就启用，不需要就禁用。  
另外说明一下此项与OpenRuntime.efi有关。在aptiomemoryfix停更后，此补丁已经更名为Openruntime, 并将一些功能与OC合并、模块化。对于无法原生nvram的主板来说，这里的选项需要格外注意。当然我也会把像300系列、x299、c422这样支持原生nvram的选择方法一并写进去（这个OpenRuntime是什么，不要急往下看着走）。  
AvoidRuntimeDefrag：大部分UEFI都会写入时间、电源管理等信息，这个所有黑苹果主板都应该选择True启用它。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2020.png)  
DevirtualiseMmio：内存注入方式包括KASLR方式(分布式注射到各个内存地址中）以及连续性方式。在使用KASLR时，PCIE加载到内存，可能会占据所有avaliable值而导致OC的内核以及内核缓存无法注入，导致启动失败。此项目前建议选择True，并且在下一项ProtectUefiServices中也选择True。  
备注：KASLR是更加高效的内存注入方式，但不代表每台机器都能使用这种方案，这里我提供两种关于内存的设置：  
1：DevirtualiseMmio选择True, ProtectUefiServices选择True 并删除NVRAM-Add-7C开头下面的boot-args（启动参数）里面的slide=1,以及删除Drivers文件夹下的Memoryallocations.efi。即开启KASLR内存注入方式。（这里我选用方式一）  
2：DevirtualiseMmio选择True, ProtectUefiServices选择False保留NVRAM-Add-7C开头下面的boot-args（启动参数）里面的slide=1,以及保留Drivers文件夹下的Memoryallocations.efi文件。即开启连续性内存注入方式。  
（找不到启动参数？别急，下面会讲到的。）  
DisableSingleUser：是否开启单用户，我觉得我不用，我选False。  
DisableVariableWrite：非原生NVRAM主板需要模拟nvram.plist进而写入variable值，因此我们要禁止此项来防止其他程序对nvram进行写入。简单说，就是主板支持原生NVRAM选False就好了。  
DiscardHibernateMap：当电脑从休眠(hibernation)中唤醒时,硬盘里的资料会恢复到内存中去，但这个时候OC的内核以及内核缓存等也会写入，这样可能导致冲突，这个选项是帮助我们解决这个问题的。而目前来看，除了原生NVRAM都无法进行休眠（注意睡眠sleep和休眠hibernation是两个概念），台式机的话就更不需要休眠功能了，这里我选择False。  
EnableSafeModeSlide：安全模式下是否启用连续性的内存注入方式。我选择True，与正常情况下保持一致。  
EnableWriteUnprotector：保证nvram能正常写入而不受到UEFI内的一些服务的影响，无论什么主板都建议要选择True。  
ForceExitBootServices：这个选项是让那些非常老旧的主板也能使用内存寻址，正常情况下选False。  
ProtectMemoryRegions：官方对此项目的解释与AvoidRuntimeDefrag类似，除非你明白这是什么，不然选择False，其实我也不明白。  
ProtectSecureBoot：保护uefi安全启动被写入，我选择True。  
ProtectUefiServices：解决Z390系列主板卡开机卡++++的问题，这个与memoryallocation.efi功能类似。  
ProvideCustomSlide：此选项执行固件的内存映射分析并检查所有的 slide 值(1 – 255)是否可用。由于 boot.efi 生成的这个值是利用 rdrand 指令随机生成的或者伪随机指令 rdtsc 随机生成的，因此当其选择了 一个冲突的 slide 值时有可能启动失败。由于这种潜在的冲突存在，此选项强制 macOS 在可用的值中使用一个伪随机值，这也确保了 slide= 启动参数不会因为安全原因传递给操作系统。  
是否需要此选项由信息 OCABC (Only N/256 slide values are usable!) 是否存在于调试日 志中决定。如果存在此信息，则需要启用此 Quriks 选项。我选择False。如果你对KASLR有一定的认知并会运用，请注意这个值。  
RebuildAppleMemoryMap：重新生成内存地图来匹配苹果系统。苹果的内核有很多缺陷，比如单张的内存地图不能超过4K，一旦超过就可能无法开机；又比如一些硬件会直接把读写权限写进内存里，而苹果却不能给与写入权限。如果你遇到此类的问题，请尝试开启它。注意此项目与EnableWriteUnprotector存在冲突关系，确保开启这个的时候，另一个是关闭的。另外，此项又需要与SyncRuntimePermissions项搭配使用。一般情况下请选择False。  
SetupVirtualMap：是否建立虚拟内存并对物理内存进行映射。我们在开机时，OC的程序需要一块连续性的内存进行存放内核等东西，而实际的物理内存一般都是分散的。因此，我们通过虚拟内存建立连续性内存供OC使用，并映射到分散的物理内存中。这里我们选择True。  
SignalAppleOS：通知同一台电脑上的设备mac上的硬件选择，此项应该是给白苹果用的。如果你的mac开启了核显，但是win下核显不能开启，请打开。我选择False。  
SyncRuntimePermissions：修正硬件在注入内存时无法注入权限的问题。一般此类问题存在2018年后的主板。一般我们选择False。
---
DeviceProperties：主要用来注入用的，比如注入声卡ID，核显ID。  
以我自己电脑为例，我需要注入一个声卡ID50，核显的话我只是开启作加速用，实际测试注不注入这个加速ID我的核显都可以实现加速，应该是whatevergreen自动注入了，这里就偷个懒，只注入声卡ID。  
OC这个注入有点麻烦，我们需要借助Hackintool这个工具。打开Hackintool，点击到PCIE一项，找到我们的声卡，复制下设备地址，再把这个地址填写到Add下。  
下面以我的为例：  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2021.png)  
找到声卡的设备地址为PciRoot(0x0)/Pci(0x1F,0x3)，复制到Add下，然后layout-id对应的Type类型改为Number（数字），再在后面填写上对应的ID 50。需要注意的是这里的这个Type类型，默认不是Number的要记得改。然后这个声卡的设备名一般是叫做HDEF或者HDAS，我这个就是叫HDEF，一眼就找到了。  
对于用核显输出的，我这里就不讲了，真的太多了，建议大家到XJN的博客看看。  
接下来是Delete，这个是禁用一些设备的，个人感觉没有用，不对其修改了。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2022.png)
---
Kernel：如字面意思，内核相关的设置。Kext驱动也是在这里设置。  
第一项Add参考ACPI的Add不同的只是这里填的是kext驱动了，需要注意的点：BundlePath对应填写kext驱动的名称；Enable对应True才启用这个驱动；ExecutablePath这一项填写的是二进制文件路径，PlistPath这个是plist文件路径，ExecutablePath和PlistPath不会填写的，打开OpenCore Configurator，点击kernel内核设置一项，把驱动拖进去看看再填写。注意不要使用OCC直接编辑config，会炸。  
MaxKernel和MinKernel是最大/最小内核，这个一般不做设置。  
注意Kext驱动之间也是存在依赖性的，比如Lilu.kext这个就要放到前面。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2023.png)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2024.png)  
接下来是Block，这里是禁用kext的好像，没啥用。  
接下来是Emulate，此选项帮助Ivy Bridge 和一些不受支持的CPU加载电源管理的，我们这里不做此方面讨论（我没这么老的CPU）。所有选项按默认即可。  
接下来是Patch，这里是给kext打补丁用的。  
我们可以看到样本里面有四个补丁，都是关闭着的，其中有两个是关于APPLE RTC的，这对于华硕主板来说相对比较重要，这里我们需要对appleRTC相关的两个补丁一一测试，打开—–Enabled—YES其中一个，即可。如果不行，关闭一个打开另一个。这样能解决华硕主板重启丢失BIOS设置以及需要按F1跳过安全模式。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2025.png)  
如上图我这个华硕主板，启用了第一个AppleRTC补丁。  
接下来是Quirks：  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2026.png)  
这里的这些我感觉就后边三个有点用，  
PowerTimeoutKernelPanic：10.15系统中存在一些设备自身的电源管理无法让系统进入睡眠而超时，导致内核奔溃，我没有这个问题选择False。  
ThirdPartyDrives：开启Sata类SSD的trim功能，我没有sata类的ssd，我选择False。  
XhciPortLimit：解除15口限制的，这个比较有用。但是我对USB定制过了，此项我选False。
---
Misc：开机引导设置的。  
BlessOverride：这个选项是帮助我们寻找一些不寻常的EFI位置的，除非你有这种情况，不然我们不需要填写任何东西。  
Boot：  
ConsoleAttributes: 设置开机选择界面的颜色，默认直接填0。使用方法为填入字体颜色和背景颜色的值的16进制之和例如蓝色字（0x01)+红色背景（0x40)=0x41。  
HibernateMode: 检测休眠模式。我们的机器一般都不支持休眠，选none。如果你的主板支持原生nvram、并想测试休眠，可以考虑填auto。  
HideAuxiliary:在开机选择画面隐藏一些辅助项目，比如recovery盘，clean NVRAM等。一般我们选择False。  
PickerAttributes:当你使用OC主题时，你可以通过计算以下数值之和来配合使用OC主题，OC主题至今还在测试阶段，默认填0。  
PickerAudioAssist：是否开启开机朗读文字功能，一般选择False。  
PickerMode: 是否使用OC的开机启动盘选项，如果我们填Builtin就是不使用任何主题；如果我们填External就会调用第三方主题。  
这些主题设置什么的，我感觉用不上，花里胡哨。  
PollAppleHotKeys:是否开启一些热键功能，包括Cmd+K;Cmd+S。我选的是True。如果你开机发现键盘无法选择，选False。  
ShowPicker: 是否显示开机启动盘选项，比如MAC,WINDOWS那些。我们选择True。后期配置成熟稳定后可以将此项改为False，快速进入系统，效果类似于Clover的Fast。  
TakeoffDelay:开机热键延时，如果你按热键老是老不急按，你可以设置5000到10000之间的值让你有更多时间按热键。  
Timeout: 倒计时进入指定硬盘，这里我们按需求填写，我填写5，代表5秒钟进入指定硬盘。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2027.png)  
接下来是Debug，这个我们用不上，不用管它。  
Entries：这里是帮助我们添加一些你希望的引导路径。我用不上，没做设置。  
Security：  
AllowNvramReset: 是否在开机引导项中加入重置nvram缓存功能的选项，我选True。  
AllowSetDefault:选择True后即可在开机选择系统页面中通过Ctrl+enter键设置默认启动盘。   
AuthRestart：filevault相关项，选择False。  
BootProtect：请填写Bootstrap。此选项能保证OPENCORE.EFI的永久性而免遭到其他操作系统对开机顺位的破坏。说人话就是OC会自己创建一个名字叫OpenCore的启动项，并保持顺序在BIOS中的第一位。个人觉得还是挺好的，建议设置。  
ExposeSensitiveData: 因为要使用到模拟nvram，这个数值我们必须填3。如果我们是原生nvram，填写2。  
HaltLevel: 按默认设置即可。  
ScanPolicy: 这个大概是扫描文件系统的，我建议设置成~~17760515~~ 0，自动扫描。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2028.png)  
Vault: 黑苹果的vault加密方式，我们不需要这个功能，填Optional。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2029.png)  
下一个是Tool工具，感觉没啥用，有点用的重置NVRAM在OC默认就放最后一个了。
---
★NVRAM：这里主要是设置启动参数之类的。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2030.png)  
如图我的配置中，Add下面第一个4D144D..下面对应的是我开启了启动时的Hidpi，让启动过程中苹果logo大小保持一致。  
下面的7C436110..这个下面对应的boot-args这一项就是填启动参数的。  
更详细的讲解：
```
4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14
UIScale          Data            <02>      //这里填写01为普通的UI显示模式，02为开启HIDPI的UI显示模式，我选择02
DefaultBackgroundColor   Data      <00000000>  //默认开机背景色为黑色
```
```
7C436110-AB2A-4BBB-A880-FE41995C9F82
boot-args      String        Slide=1 darkwake=0 -v //slide=1表示从第一组内存开始连续注入；darkwake=0代表一键唤醒机器并偏好设置中节能选项的小憩功能。如果你要用小憩功能请填8； -v是跑代码，在没装好稳定的黑果前我建议加上，方便定位错误，弄完后再删除-v
bootercfg      String       log=0 debug=0 level=0  //这条自己添加进去，是关闭开机时的代码的。
csr-active-config        Data          <e7030000>            //关闭SIP保护
nvda_drv                 Data          <31>                  //对10.13系统之前的N卡的相关设置。
prev-lang:kbd            Data          <7a68 2d48 616e 733a 3235 32>  //语言设置相关，记得改成这个，这个是中文
```
接下来是Delete，这个是禁用设置的，没啥用。  
LegacyEnable：如果你的主板不支持原生NVRAM，请一定要选择True，如果你的主板支持原生nvram的，填False。  
LegacyOverwrite：写入覆盖什么的，直接False吧。  
LegacySchema：这里是nvram的变量设置，大部分默认已经填好，我感觉够了。  
WriteFlash：如果你的主板bios因为nvram导入垃圾内容，请关闭它，一般都是选择False。不过你要是跟我一样想要使用启动磁盘设置的，则True启用它。
---
PlatformInfo：这里设置的是机型，我们可以用Clover Configurator，摇一个三码然后对应信息填入。在选取机型的时候，我们应该综合考虑，选取一个配置接近的机型为佳。我的配置综合考虑之后选择了iMac18，2 。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2031.png)  
摇好之后对应填入即可。  
DataHub PlatformNVRAM SMBIOS这三项非必须的，可以不填。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2032.png)  
这里第一项Automatic是自动填充，我开启它，让他自己补全不重要的信息，省事。  
剩下的UpdateDataHub UpdateNVRAM UpdateSMBIOS UpdateSMBIOSMode这几项照着我的设置就好了。
---
UEFI：填写一些UEFI相关的设置。
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2033.png)  
★APFS：这个部分如果设置不好会导致OC识别不了安装好的系统，建议参考我的设置。  
EnableJumpstart: 从APFS容器中加载内置APFS驱动，建议开启True。此选项仍然依据你的Scanpolicy来做出决定，请确保在Scanpolicy中放开APFS格式。  
HideVerbose：是否隐藏啰嗦模式，一般我们需要看日志的时候才开启，所以我们选择隐藏，选择True。  
JumpstartHotPlug：是否加载APFS格式的热插设备，一般我们选择True。  
MinDate：加载最低发行的APFS格式。一些旧的apfs可能会危害电脑，我们填0。如果你想加载旧的发行日期的APFS格式硬盘，请填-1。  
MinVersion：加载最低版本的APFS格式。填0代表从HIGH SIERRA开始加载。填-1代表所有版本，建议填0。  
Audio：这个主要是设置开机时候duang一下那个开机音的，我没搞。  
ConnectDrivers：是否加载补丁，选True。  
★Drivers：设置加载efi驱动的。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2034.png)  
这个看需要吧，我设置加载的这三个也算是比较基础的。  
Input：这个主要是原生Apple开机热键的设置，我默认，没改过。  
Output：  
ClearScreenOnModeSwitch:消除开机时从图形模式转换到文本时出现残影的问题，如果没有这个问题我们选择False。  
ConsoleMode:这里填主机的输出方式，一般情况下填MAX，或者留空  
DirectGopRendering:是否使用内置显卡直接渲染开机画面，建议选择False。  
IgnoreTextInGraphics: 修复在不使用-v跑马模式时候，开机日志导致的苹果logo显示不正确的问题。如果有这种情况选择True，一般我们选择False。  
ProvideConsoleGop:调用显卡gop，我选择True。  
ReconnectOnResChange: 一些固件在 GOP 分辨率改变后会重新连接显示器才能输出，一般情况下选择False。  
ReplaceTabWithSpace:一些固件在UEFI Shell下TAB功能键不生效。开启这个会用空格键代替。一般我们选择False。  
Resolution:开机分辨率。比如我的显示器是4K、16：9的，我就填写3840×2160。这个你根据情况填写或者不填。  
SanitiseClearScreen: 修复4k及以上显示器的输出问题，选择True。  
TextRenderer:OC开机代码字体渲染方式，我这里填BuiltinGraphics。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2035.png)  
ProtocolOverrides：  
AppleAudio: 如果你想要开启如同白苹果一样的开机DUANG的声音等，请开启它，并且还需要配合UEFI—-Audio的正确设置。  
AppleBootPolicy: 虚拟机的mac需要用的，我们选择False。  
AppleDebugLog:重新安装苹果错误日志界面，一般选择False。  
AppleEvent: 虚拟机并具有vault的mac需要用的，我们选择False。  
AppleImageConversion: 重建apple图标，选择False。  
AppleKeyMap: 重建苹果功能键，选择False。  
AppleRtcRam：重装applertc协议。一般选择False。  
AppleSmcIo:代替之前的VirtualSMC.efi,请选择True  
AppleUserInterfaceTheme: 重新安装 Apple User Interface Theme 协议，选择False。  
DataHub:重建datahub，这里我们选False。  
DeviceProperties: 虚拟机或者老款的电脑需要选择True才能注入device property，我选False。如果你发现你注入device property无效，请选择True。  
FirmwareVolume: VAULT相关项，我选False。  
HashServices: VAULT相关项，我选False。  
OSInfo: 通知主板以及一些程序关于MAC引导的信息，一般情况选择False。  
UnicodeCollation: 旧的主板需要，我们选False。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2036.png)  
Quirks：  
DeduplicateBootOrder：当RequestBootVarRouting选项为开启时，一些其他的操作系统（e.g.windows)可能在某些主板(e.g.ASUS)中会找不到自己的引导而重新创建,最终导致黑果在没有清理NVRAM的情况下是无法进入系统的，请选择True。  
ExitBootServicesDelay:旧主板需要给予主板退出时间（单位为微秒），较新的主板直接填0。旧的主板比如Z87pro，填3000000-5000000。  
IgnoreInvalidFlexRatio：如果你没有在bios中解锁MSR0x194，一定要选True。  
ReleaseUsbOwnership:大部分的主板都有自动释放USB所有权的功能，我们选False。如果你开机键盘鼠标卡死了，或者USB失灵，试试选True。  
RequestBootVarRouting: 增加”启动磁盘” 的可靠性，这里选择True。  
TscSyncTimeout：帮助一些X99 X299的主板开启全核同步功能。此选项旨在代替TSCAdjustReset.kext等类似补丁，推荐的值是500000。但是此选项并不能在睡眠唤醒后生效，所以请填写默认值0，并使用TSCAdjustReset.kext来做全核同步。  
UnblockFsConnect:惠普笔记本可能会让OC无法扫描到启动项，一般选择False，如果你是惠普笔记本，请选择True。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2037.png)  
ReservedMemory：此项为保留内存所用。一些硬件会把硬件EFI写进内存过程中占据必要的UEFI运行空间，所以我们可以通过此项来预留内存来保证UEFI的运行。填写方式可以参考小兵的文章。来寻找指定内存的起始位置，以4K为一个节点。  
一般情况下，此项我们并不需要理会，我这里没有设置。  
到这里我们就GET到了一个自己配置的OC，我建议，先找一个U盘，用黑果小兵提供的镜像做一个macOS的启动盘。然后，我们将U盘的EFI分区里的内容删除，并将我们配置好的OC放进去，先从U盘启动，做好调试，没有问题了再复制到硬盘，从硬盘启动。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2038.png)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2039.png)  
这个就是我做好的启动盘。  
目前在我自己电脑上使用的OC非常稳定。目前来说没有发现什么大的问题了，下面总结一下：  
要清楚自己配置时放进去的每一个SSDT、Kext驱动的作用，不要冗杂配置。  
Config配置文件编辑的时候，建议使用PT、Xcode，防止配置文件结构损坏。  
一个好的EFI引导要配置得精简干练，启动速度才快，亦更稳定。  
完成展示：  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2040.png)
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2041.png)
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2042.png)
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2043.png)
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E7%89%87%2044.png)
