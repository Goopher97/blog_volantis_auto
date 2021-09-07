---
title: 华硕Prime B250-Plus魔改BIOS支持89代CPU
author: GOOPHER
categories: BIOS魔改
tag:
  - BIOS魔改
  - 教程
abbrlink: 10040
keywords:
  - BIOS魔改
  - B250主板上89代U
date: 2021-02-02 21:11:31
---
理论上也支持Prime B250M-Plus主板，未测试。
首先需要将BIOS升级至最新的1205版本，[下载地址](https://goopher.lanzous.com/iptXxl8homh) 下载好后将其解压，将解压出来的CAP文件放置在U盘或者NTFS/EXFAT格式的硬盘中。  
重启电脑，看见华硕logo亮屏时连续点按F2或者del键进入BIOS，在BIOS界面按F7，找到easyflash进入，选择该CAP文件升级。  
注意升级过程中不要断电，不要做其他的操作，升级大约3—5分钟结束。
## 开始魔改
准备一个U盘，将其格式化为Fat32格式，下载所需工具并解压。[下载地址](https://goopher.lanzous.com/iThcVl8ho5a)  
将解压出来的efi和bios fpt这两个文件夹复制到U盘中。  
重启电脑，看见亮屏时连续点按F8进入启动菜单，选择UEFI：xxx xxx为你U盘型号的这一项，进入GRUB。  
输入命令并回车解锁ME：
```
setup_var 0x8E5 0x0
```
![成功解锁ME](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E6%88%90%E5%8A%9F%E8%A7%A3%E9%94%81ME%E5%9B%BE%E7%89%87.jpg)  
之后输入命令重启电脑：
```
reboot
```
重启后连续点按F2/del进入BIOS设置，按F7进入高级设置，找到（advanced）——pch-fw configuration——me operation mode下选择temporary disabled，电脑会黑屏重启。  
进入系统后，打开bios fpt文件夹，找到FLASH.bat。右键，以管理员身份运行。等待BIOS刷入，看到fpt operation successful时，就说明刷入成功了。  
重启一下电脑，第一次机箱风扇会呼呼转两次，之后屏幕上提示按F1进入BIOS，更改一下自己需要改的设置再F10回车保存即可。
## 更换CPU
区分B0步进和其他：看CPU上的两颗大电容，是横着的则为B0，可以直接上机。如果两颗大电容是竖着的则需要屏蔽触电，不屏蔽的话会烧坏针脚。  
![示例](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210202-220243@2x.jpg)  
这块主板理论上可以安装最高9700k，具体需要屏蔽的触点如果不理解建议问一下护舒宝的卖家。
## BIOS刷死后的急救
症状：开机后风扇一直转，灯亮，屏不亮。  
虽然华硕这块主板支持CrashFree BIOS 3，但是这玩意好像就只存在于传说中，急救还是得使用编程器，所以有一些麻烦。  
建议使用支持直接写入CAP的，然后使用华硕的SPI线，这样方便一些。  
编程器接线，注意这个不能接错，要不然可能导致BIOS芯片烧毁。  
SPI线的1234针脚是对应锁定杆那一边的。  
![示例](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210202-215808@2x.jpg)  
标白那一端与主板上的针脚对应。
![主板针脚](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210202-220635@2x.png)  
注意查看BIOS芯片型号，在刷写软件中手动选择。  
![芯片型号选择](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/IMG_3186.JPG)  
之后先点 读出 识别出BIOS芯片里原有的内容，再点击擦除，清空BIOS芯片。之后再点击读出，看一下所有数据都是FF 则擦除完成，再点击打开，打开BIOS文件，点击写入，写入完成后即可拔掉编程器，不需要校验。  
![刷写示例](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/IMG_318asf5.jpg)  
最后附上这个刷写软件和驱动[点击下载](https://goopher.lanzous.com/i3grJl8lofe) 注意安装驱动时需要禁用签名。
