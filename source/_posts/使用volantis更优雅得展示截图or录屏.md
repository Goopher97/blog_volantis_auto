---
title: 使用volantis更优雅地展示截图/录屏
author: GOOPHER
tags:
  - Volantis
  - Hexo主题
categories: Volantis主题
abbrlink: 24004
date: 2021-03-07 12:41:31
---
### 初衷
我的博客上面大多数时候都是写的一些搞机类文章，所以自然少不了许多的截图展示，以后也想要加入一些相关的视频教学。  但是如果咱直接使用md的插入图片的方法，看多了之后我就觉得缺少点什么，感觉缺少一丢丢B格。之后我在翻阅主题文档的时候，偶然间看见了类似带壳截图这样的展示，豁然开朗，决定立马搞起。[相关文档](https://volantis.js.org/v4/tag-plugins/)  第21条frame。
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615093647000.png)
可惜的是volantis仅给我们提供了一个iPhone11的框架图，要使用其他设备的我们还需要自己引入调整。  
### 操作步骤
1.下载需要的框架图  
2.引入我们自己的框架图  
3.往需要的地方插入标签  
4.修改css调整框架图和截图的位置使之匹配  
#### 下载框架图
虽然文档中说需要svg格式的，但是实际测试下来，png格式的也是可以使用的。所以在我找了好多网站之后，找到了一个有提供各种设备框架图的，重点还是免费的。 [点击前往](https://design.facebook.com/toolsandresources/devices/) 
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615093733000.png)  
在这个网站上不仅仅有苹果iPhone Mac 之类的，安卓手机，平板，dell电脑等等都有。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615093769000.png) 
下载好我们需要的框架图，将其上传至图床中，以方便后续引用。  
### 修改css
打开themes/volantis/source/css/_tag-plugins/目录下的frame.styl文件。  
我们可以看到默认为我们提供的iPhone11相关的样式代码，接下来我们对其仿写，引入我们需要的框架图。  
示例：  
在第45行（iPhone11之后）插入一下仿写的代码 ：  
```css
&#iphone8SG // iphone8深空灰,这里是对引入的frame命名，一定要改
    img,video // 这里是对插入的图片或者视频的大小调整
      width: 188px
      margin-top: 70px
      margin-bottom: 70px
    .frame
      background-image: url(https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/Apple%20iPhone%208%20Space%20Grey.png); //这里是我们自己引入的框架图，从图床复制链接过来即可。
      width: 237.5px // 这里是对我们自己引入的框架的大小进行调整
      height: 473.5px
  &[part='top'] // 这里是用作仅显示上半部分，我们不改
    img,video
      margin-bottom: 0 !important
  &:not([part='bottom'])
    .frame
      top: 0
  &[part='bottom'] // 这里是用作显示下半部分，也不改
    img,video
      bottom: 0
      margin-top: 0 !important
    .frame
      bottom: 0
```
之后我们还需要找到  
```css
@media screen and (max-width: $device-mobile) // 这里标示下面的是为移动端的样式
```
在iPhone11相关的结束之后加上我们自己仿写的。  
示例：  
在第77行加入我仿写的:  
```css
    &#iphone8SG // iphone8深空灰
      img,video // 移动端 图片或者视频的大小
        width: 188px
        margin-top: 70px
        margin-bottom: 70px
      .frame // 移动端 框架图的大小
        width: 237.5px
        height: 473.5px
```
之后我们就可以在需要的文章插入标签引用了。  
### 在文章中引用
打开需要引用的文章的md文件，在需要的地方插入:  
```md
{% frame iphone8SG | img=https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/1E0B6D95-B12F-4B7C-8285-D8415F982909_L0_001_origin.IMG_0456.PNG %}
```
解释：  
这里的iphone8SG就是我们上面css里的名称，后面的img=就是我们要插入的图片或者用video=插入视频。如果只需要上半部分或者下班部分就按照官方的再往后面加part=top/bottom（可选）也可以加上描述之类的alt=描述。  
这里值得注意的一个地方就是在插入上半部分或者下半部分的图片的时候，我们需要先对图片裁切，仅保留我们需要的上班部分或者下半部分再引用，否则会因图片大，超限不显示而报错。  
### 生成并在本地预览调整位置
做完上面的，我们就可以hexo g && hexo s在本地预览了。在预览的时候推荐使用谷歌浏览器，并且按F12打开开发者模式。找到我们插入的文章进入，我们会看到框架图和图片是错位的情况，需要我们对其手动调整。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615093943000.png) 
点一下这里标示的图标，再点击一下错位的地方，就可以快速定位我们需要改的参数了。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615093972000.png)  
改完之后我们就可以立马看见效果。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615093989000.png) 
没有问题，我们就把这个参数改进到上面说的frame.styl文件里。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615094031000.png) 
然后再返回Chrome浏览器多刷新两次看看改动是否成功。同理调整移动端，我们只需要用Chrome浏览器的这个功能： 
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615094100000.png) 
调整完成改进frame.styl文件里即可。 
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615094139000.png) 
#### 完成后的效果展示
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615094166000.png) 
#### 发散性思维
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615094192000.png)
在使用电脑的例如iMac的框架图时，显然手机的上半部分和下半部分的展示就感觉补胎合理，so我们可以仿写，将其改为左右两个半边的展示。使用margin-left、margin-right都行，就留给大家自己弄了。