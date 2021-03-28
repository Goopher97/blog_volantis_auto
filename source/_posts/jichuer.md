---
title: 黑苹果基础（二）
author: GOOPHER
categories: 黑苹果
tag:
  - 黑苹果基础
  - PE
  - win引导修复
  - 分区教程
abbrlink: 50300
date: 2021-02-16 00:30:31
---
## 在没有WEPE的U盘上创建分区并导入WEPE
众所周知，搞机容易系统容易崩，如果没有一个PE则可能会陷入困境，所以PE这个还是非常有必要的。一般来说，如果你写入的是黑果小兵打包的系统镜像则一般带有WEPE，用DiskGenius分区软件则可以看到。有PE的可以跳过这看下面了。
### 创建放置WEPE的分区
先插上U盘，打开DiskGenius软件，点击选中U盘。  
我们可以看到U盘后部有空闲的，在空闲上右键，建立ESP分区（一般来说建Fat32格式的分区也是可以的，不过建议用ESP隐藏。）。  
![右键ESP分区](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216205841.png)  
取消勾选MSR分区。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216210003.png)  
点击确定后点击左上角的保存。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216210119.png)  
选择是。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216210145.png)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216210156.png)  
我们可以看到多出一个ESP（2），就建好了。  
之后打开微PE软件，选择导出为ISO镜像文件。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216210436.png)  
win10可以直接双击，会自动挂载打开。win7可以使用winrar等或者软碟通第三方软件打开。  
winrar打开后需要先解压。  
在桌面上或者你喜欢的地方新建一个文件夹并打开，然后解压放进去。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216210808.png)  
然后使用DiskGenius软件，选中ESP（2）分区，点击浏览文件。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216210922.png)  
将解压出来的WEPE直接拖动到ESP（2）里。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216211028.png)  
选择是，复制完成后点击完成按钮。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216211109.png)
### 使用
使用：U盘插电脑上，开机亮屏时按F8呼出启动菜单（不同主板呼出启动菜单的快捷键不同，建议自己查看一下主板说明。），选择“UEFI：xxxxxU盘型号”这样的第二个（排第二个说明是主板读取到的U盘上的第二个分区，也就是ESP2，虽然它前面有一个mac的分区，但是主板读取不了mac的分区，所以忽略。因此，如果你的wepe在U盘的第一个分区里，OC、Clover在第二或者第三个分区里，就要对应选择第几个。）
## 黑苹果安装前必要的分区设置
使用一颗单独的硬碟则可忽略此步骤。
### 为什么需要先对硬盘分区
macOS系统安装对分区的要求不同于Windows系统，一般默认能安装win的分区类型却安装不了mac，所以需要先对硬盘进行分区。同时，有一些硬盘macOS并不支援，不能拿来安装使用，需要避坑。
### 要点
安装mac系统的硬盘分区类型应为GPT（也就是GUID，如果你进入mac的安装，发现提示硬盘不是GUID类型，则是此步骤没有操作）。  
安装mac系统的硬盘上的ESP分区（也叫EFI分区）需要大于等于300兆最佳，如果你进入mac的安装发现抹盘失败，则是此步骤出现问题。
### 开始操作
在开始操作前，我们需要先重启电脑，进入PE环境下操作。  
打开PE内的DiskGenius软件。  
找到我们需要安装macos的硬盘并选中，先查看硬盘的分区表类型。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216212929.png)  
例如我这个分区表类型MBR，就不行，需要转为GUID。如果你这里显示GPT，则跳过往下看。  在左边硬盘上右键，转换分区表类型为GUID格式。（注意注意，此操作会导致win的引导失效，导致开机进不去win系统，需要修复引导才可以正常进入win系统，所以教程一定要细心看，看完整，另外win的激活也可能会掉，需要自行再激活一次。）  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216213128.png)  
之后点击左上角保存按钮，在弹出的对话框中选择是。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216213529.png)  
硬盘的分区表类型就改为GPT了。
### 压缩出空闲，新建ESP分区。
这里注意了，原先硬盘分区表类型就是GPT的也需要对EFI分区扩容操作，所请仔细看一下这一步骤。  
在原先的分区上右键，调整分区大小。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216213959.png)  
在分区前部填入300m保持空闲，对于扩容EFI分区的这里填入100m即可。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216214038.png)  
点击开始，确认是，完成后点击完成。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216214645.png)  
我们便在硬盘头部得到了300m的空闲，在上面右键建立ESP分区。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216214747.png)  
取消勾选MSR分区。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216214843.png)  
点击确认，点击左上角保存按钮并在弹出的对话框中选择是即可。300m大小的EFI分区就建好了。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216214959.png)  
对于需要扩容EFI分区的，则在原本的EFI分区上右键，选择调整分区大小，将后部空闲的100m扩进去即可。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216215250.png)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216215311.png)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216215341.png)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216215404.png)
### 创建安装mac用的分区
由于mac特性，安装后很难对分区扩容，所以建议在安装前就给够大小，以免以后难弄。  
在需要分给mac的分区上右键，调整分区大小，建议越大越好。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216215816.png)  
在分区后输入你需要的大小，点击开始。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216215853.png)  
便得到了空闲，在空闲上右键，新建分区。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216215946.png)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216220031.png)  
文件系统类型选择exfat，mac（HFS+）之类都行，无所谓这个，之后安装mac时也是要抹掉的，自己好认这个分区就行。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216220130.png)  
最后点击保存。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216220343.png)
## 修复Windows引导
MBR转GPT要修复win的引导。  
MBR转GPT要修复win的引导。  
MBR转GPT要修复win的引导。  
重要的事情说三遍！  
打开dism++工具。先选中要修复的系统，再选则工具箱，选择里面的引导修复，在弹出的对话框中默认选择是即可。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216220608.png)  
最后打开DiskGenius软件，点击EFI分区，查看文件，里面有win的引导文件即可。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ%E6%88%AA%E5%9B%BE20210216220817.png)  
