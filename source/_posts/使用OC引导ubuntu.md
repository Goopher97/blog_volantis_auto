---
title: 使用OC引导ubuntu
author: GOOPHER
categories: 黑苹果
tag:
  - OpenCore配置
  - OC引导多系统
abbrlink: 00006
keywords:
  - OpenCore配置
  - OC引导多系统
date: 2021-4-08 08:30:00
---
## 步骤
### 启用UEFI Shell工具
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617842045000.png)
{% endgallery %}
### 查找GRUB引导所在分区
之后重启电脑,选择UEFI Shell进入.
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617842123000.png)
{% endgallery %}
进入后屏幕上会显示一些FS0、FS1等等的信息,这个就是硬盘上分区的信息.  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617842214000.png)
{% endgallery %}
按任意键进入输入模式,然后我们需要找到ubuntu的grub引导所在的分区.  
直接输入 FS0: 回车,就能进入这个分区,然后再输入ls回车,查看里面的文件,看这个是不是存grub引导的地方.  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617843209000.png)
{% endgallery %}
可以看到这里ubuntu引导就在FS1里,记下这个FS1.
### 保存map信息
之后输入map > maptable_linux.txt回车,信息就会保存在maptable_linux.txt这个文件里.  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617843376000.png)
{% endgallery %}
### 添加自定义引导项
重启电脑进入系统,挂载EFI分区,打开刚才生成的maptable_linux.txt文件,找到我们刚才记住的FS1,然后复制对应的整串信息.  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617843549000.png)
{% endgallery %}
之后打开config,在自定义条目录里新增,然后把刚才复制的粘贴进去,再在路径后面加上grub的路径,注意这里的写法,需要先/再\
即:
```
粘贴的信息/\EFI\ubuntu\grubx64.efi
```
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617843735000.png)
{% endgallery %}
保存重启后就可以通过OC引导Grub再进入ubuntu了.
### 修改GRUB引导,跳过GURB界面直接进入ubuntu系统
重启进入ubuntu系统后,打开终端,输入命令:
```
sudo gedit /etc/default/grub
```
输入你系统的密码回车,在弹出的编辑器里找到GRUB_TIMEOUT=10,这个就是grub的倒计时,默认的10s太久了,直接把10改成0跳过.  
保存后关闭编辑器,然后再执行以下命令使刚才的设置生效:
```
sudo update-grub
```