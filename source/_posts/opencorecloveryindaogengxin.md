---
title: OpenCore和Clover引导更新
author: GOOPHER
categories: 黑苹果
tag:
  - 黑苹果
  - OC引导更新
  - Clover引导更新
abbrlink: 6350
keywords:
  - 引导更新
  - 黑苹果
date: 2020-12-27 15:48:31
---
OpenCore引导更新:
<br>推荐使用OpenCore Configurator工具 <a href="https://www.macwk.com/soft/opencore-configurator">[下载地址]</a>
<br>OpenCore <a href="https://github.com/acidanthera/OpenCorePkg/releases">[下载地址]</a>
<br>先挂载EFI，备份原有引导到U盘/别的地方，方便更新失败时恢复使用。
<br>打开<mark>旧引导</mark>的/EFI/OC/目录，按住command/win键多选上ACPI Kexts Resources及config.plist  
再按command/win键+c复制，到<mark>新引导</mark>的/EFI/OC/中command/win键+v粘贴覆盖。  
<img src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201227-160008@2x.png"/>
<br>再到旧引导的/EFI/OC/Drivers/中复制<mark>HfsPlus.efi</mark>文件到新引导的对应目录下。  
<br>PS：如果你有使用别的efi驱动也记得一同复制过去  
<br>之后再用OpenCore Configurator（新版本的，版本号看软件上边。）打开<mark>新引导</mark>中的config.plist文件，按command/win键+s保存一下。  
<br><mark>注意config.plist文件中每次升级都会新增or删除一些选项，需要看情况修改好再保存</mark>
<br>
<img src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201227-161149@2x.png"/>
<br>我使用的是MOD版的OC，切换OpenCore Configurator版本在其偏好设置中。另外OpenCore Configurator工具通常在OC更新后一段时间才会更新，所以每次看到OC更新了也不要着急，先等OpenCore Configurator更新了再更新也不迟。
如果你不愿意等，那推荐使用PlistEdit Pro软件，自行参考Sample.plist示例文件删除/增加相关参数。  
不知道示例文件是啥？<a href="https://goopher97.github.io/2020/12/25/congwudaoyoupeizhiocyindao/">[请看]</a>
<hr>
Clover引导更新:
<br>Clover引导：<a href="https://github.com/CloverHackyColor/CloverBootloader/releases">点击下载</a> 
下载zip格式的U盘版即可。
<img src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201229-202951@2x.png"/>
注意Clover从r5120版本开始引入了OC以支持big sur 从此开始变了。
旧版本：复制CLOVERX64.efi文件粘贴覆盖完事。
<img src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201229-205629@2x.png"/>
<br>新：需将ACPI kext先迁移到新引导的对应文件夹中，再选择需要用到的efi驱动（具体参看OC）从off文件夹中复制到UEFI文件夹中，再打开新的编辑器编辑config，配置Quirks（参看OC）。
<img src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201229-210059@2x.png"/>
<img src="https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20201229-210155@2x.png"/>

