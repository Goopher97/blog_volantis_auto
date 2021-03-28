---
title: 为volantis主题添加图片滚动和热门文章
author: GOOPHER
tags:
  - volantis
  - Hexo主题
categories: Volantis主题
abbrlink: 16539
date: 2021-03-17 12:41:31
---
## 前言
参考了黑石的教程 https://www.heson10.com/posts/19736.html  
模板参考了 https://www.jq22.com/jquery-info23463  
目前已知的问题：不支持Pjax。
## 效果展示
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@main/img/1615963506000.jpg)
{% endgallery %}
## 步骤
### 修改_config.volantis.yml主题配置文件
```yml
pjax: 
   enable: false
```
关闭pjax后，再找到Plugins。再Plugins下新增：
```yml
plugins:
########### 图片轮播DIY ##############
  slider:
    enable: true
    img_1: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210312-022629@2x.png
    link_1: https://goopher.tk/21510.html
    img_2: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210312-022959@2x.png
    link_2: https://goopher.tk/50300.html
    img_3: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210312-023228@2x.png
    link_3: https://goopher.tk/24004.html
    img_4: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E6%80%AA%E5%85%BD_c3e24bc3d29796c0593475a22f3a11e0_24823.png
    link_4: https://goopher.tk/61617.html
    img_5: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/shiyongvolantisgengyouya.png
    link_5: https://goopher.tk/29954.html

  ########### 热门帖子 ##############
  hot_post:
    ###### 热门1 #####
    pic_one: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210312-022351@2x.png
    post_one: https://goopher.tk/64658.html
    ###### 热门2 #####
    pic_two: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E6%80%AA%E5%85%BD_bb872333f9b8822a09d329308f839556_24325.png
    post_two: https://goopher.tk/52146.html
```
### 为图片轮播新建styl样式
在/themes/volantis/source/css/_colsrch/下新建slider.styl这个文件，没有_colsrch文件夹的话自己新建一个。
再往slider.styl里粘贴以下内容：
```css
.hide{
  display: none;
}
.slider
  display flex
  align-items center

#slider{
  @media screen and (max-width: 800px){
    display: none
  }
  border-radius:10px
  position: relative;
  overflow: hidden;
  max-height:400px
  margin-top:auto;
}
.slider-ul{
  position: absolute;
  width: 999999999px;
  height: 100%;
}
.slider-ul-li{
  width: 520px;
  height: 100%;
  display: inline-block;
}
.slider-ul-li-a, .slider-ul-li-a-img{
  width: 100%;
  height: 100%;
}
.slider-circlex{
  position: absolute;
  bottom: 20px;
  right: 0;
  left: 0;
  text-align: center;
}
.slider-circlex-ul{
  display: inline-block;
  border-radius: 8px;
  background-color: red;
  background: rgba(0, 0, 0, 0.3);
  padding: 2px;
  font-size: 0;
}
.slider-circlex-ul-li{
  display: inline-block;
  width: 7px;
  height: 7px;
  background-color: #FFF;
  border-radius: 50%;
  margin: 0 4px;
  cursor: pointer;
}
.slider-circlex-ul-li.active{
  background-color: red;
}
.slider-btn{
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  margin-top: -15px;
}
.slider-btn a{
  position: absolute;
  width: 30px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, .5);
}
.slider-btn-next{
  right: -5px;
  border-radius: 50% 0 0 50%;
}
.slider-btn-prev{
  left: -5px;
  border-radius: 0 50% 50% 0;
}
.slider-btn-prev-span, .slider-btn-next-span{
  display: inline-block;
  width: 10px;
  height: 20px;
  margin-top: 4px;
  position: relative;
}
.slider-btn-prev-span::after, .slider-btn-next-span::after{
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 7px;
  height: 7px;
  margin-top: -3.5px;
}
.slider-btn-prev-span::after{
  border-left: 2px solid #FFF;
  border-top: 2px solid #FFF;
  transform: rotate(-45deg);
  margin-left: -2px;
}
.slider-btn-next-span::after{
  border-right: 2px solid #FFF;
  border-bottom: 2px solid #FFF;
  transform: rotate(-45deg);
  margin-left: -7px;
}
.l_main .post-list {
  margin-top: 10px
  @media screen and (max-width: 800px) {
    margin-top: 0px
  }
}
.hot_post
  display flex
  flex 1
  flex-direction column
  margin-left 10px
  @media screen and (max-width: 800px)
    display none

.index-banner
  flex 1
  font-size 0
  &.forpadding
    margin-top 10px

.hot_post img
  display inline-block
  width 100%
  border-radius 10px
  height 145px
```
之后修改/themes/volantis/source/css/style.styl文件，引入我们刚才新建的样式。  
再里面添加以下内容：
```css
if hexo-config('plugins.slider.enable')
    @import '_colsrch/slider.styl'
```
意为在_config.volantis.yml中  
```yml
  slider:
    enable: true
```
时，启用刚才新建的样式。  
### 新建ejs
在/themes/volantis/layout/_widget/目录下新建slider.ejs文件，再粘贴以下内容进去。  
```layout
<!--图片轮播-->
<div class="slider">
    <script src="https://cdn.jsdelivr.net/gh/Goopher97/mycdn@1.1/jquery-1.10.2.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/Goopher97/mycdn@1.1/jquery.slider.js"></script>
    <div id="slider" style="width: 520px; height: 300px;"></div>
    <script>
        $("#slider").sliderImg({
            imgs: ["<%- theme.plugins.slider.img_1 %>", "<%- theme.plugins.slider.img_2 %>", "<%- theme.plugins.slider.img_3 %>", "<%- theme.plugins.slider.img_4 %>", "<%- theme.plugins.slider.img_5 %>"],
            link: ["<%- theme.plugins.slider.link_1 %>", "<%- theme.plugins.slider.link_2 %>", "<%- theme.plugins.slider.link_3 %>", "<%- theme.plugins.slider.link_4 %>", "<%- theme.plugins.slider.link_5 %>"],
        });
    </script>
    <div class="hot_post">
        <!--热门文章&图片-->
        <div class="index-banner">
            <a href="<%- theme.plugins.hot_post.post_one %>" target="_self">
                <img src="<%- theme.plugins.hot_post.pic_one %>">
            </a>
        </div>
        <div class="index-banner forpadding">
            <a href="<%- theme.plugins.hot_post.post_two %>" target="_self">
                <img src="<%- theme.plugins.hot_post.pic_two %>">
            </a>
        </div>
    </div>
</div>
```
之后修改/themes/volantis/layout/index.ejs文件，在
```layout
<div class='l_main<%- page.sidebar == false ? ' no_sidebar' : '' %>'>
```
这一行的下面添加
```layout
<% if (theme.plugins.slider.enable == true) { %>
<%- partial('_widget/slider') %>
<% } %>
```
之后保存，再hexo clean && hexo g && hexo s就可以看到效果了。
## 最后
如果有大佬修复了问题，记得跟我说一下，我搞不定了emmm