---
title: 为volantis主题添加图片轮播和热门文章二点零
author: GOOPHER
tags:
  - Volantis
  - Hexo主题
categories: Volantis主题
abbrlink: 00001
date: 2021-3-30 16:41:31
---
## 特别鸣谢
[黑石大佬的思路](https://www.heson10.com/posts/19736.html)  
[jQuery插件库提供的模板](https://www.jq22.com/jquery-info23463)  
[inkss大佬的修改](https://inkss.cn)
## 修复
修复了之前启用pjax后从其他页面切换回来图片轮播不显示了的问题,  
## 操作步骤
### 使用之前修改的
使用之前修改的需要按照之前的步骤反向,把添加的东西删除,再按照下面的方法重新添加,  
### 效果预览
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617109676000.png)
{% endgallery %}
### 添加设置项
打开_config.volantis.yml文件,搜索 plugins ,在其下面添加如下:  
```
  ########### 图片轮播 ##############
  slider:
    enable: false
    js: https://cdn.jsdelivr.net/gh/Goopher97/mycdn@1.5/slider.min.js
    img_1: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210312-022629@2x.png
    link_1: /posts/21510.html
    img_2: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210312-022959@2x.png
    link_2: /posts/50300.html
    img_3: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210312-023228@2x.png
    link_3: /posts/24004.html
    img_4: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E6%80%AA%E5%85%BD_c3e24bc3d29796c0593475a22f3a11e0_24823.png
    link_4: /posts/61617.html
    img_5: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/shiyongvolantisgengyouya.png
    link_5: /posts/16065.html

  ########### 热门文章 ##############
  hot_post:
    ###### 热门文章1 #####
    pic_one: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210312-022351@2x.png
    post_one: /posts/64658.html
    ###### 热门文章2 #####
    pic_two: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/%E5%9B%BE%E6%80%AA%E5%85%BD_bb872333f9b8822a09d329308f839556_24325.png
    post_two: /posts/52146.html
```
如图:  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617109849000.png)
{% endgallery %}
### 修改ejs
打开layout/_partial/scripts/index.ejs文件, 找到  
```
<%- partial('../../_third-party/analytics/script') %>
```
这一行,在其上面添加:
```
<% if (theme.plugins.slider.enable) { %>
  <%- js(theme.plugins.slider.js) %>
  <%- partial('../../_third-party/slider/script') %>
<% } %>
```
如图所示:  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617110069000.png)
{% endgallery %}
打开layout/_third-party/文件夹,在里面新建一个名为slider的文件夹,再在里面新建一个名为layout.ejs的文件,其文件内容为:
```
<div class="slider">
    <div id="slider" style="width: 520px; height: 300px;"></div>
    <div class="hot_post">
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
如图所示:  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617110244000.png)
{% endgallery %}
再新建一个名为script.ejs的文件,其内容如下:
```
<script>
    function pjax_slider() {
        if($('#slider')[0]) {
            $("#slider").sliderImg({
                imgs: ["<%- theme.plugins.slider.img_1 %>", "<%- theme.plugins.slider.img_2 %>", "<%- theme.plugins.slider.img_3 %>", "<%- theme.plugins.slider.img_4 %>", "<%- theme.plugins.slider.img_5 %>"],
                link: ["<%- theme.plugins.slider.link_1 %>", "<%- theme.plugins.slider.link_2 %>", "<%- theme.plugins.slider.link_3 %>", "<%- theme.plugins.slider.link_4 %>", "<%- theme.plugins.slider.link_5 %>"],
            });
        }
    }
    $(function () {
        pjax_slider();
    });
    volantis.pjax.push(pjax_slider)
</script>
```
如图所示:
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617110331000.png)
{% endgallery %}
之后打开layout/index.ejs文件,找到
```
<%- partial('_partial/archive') %>
```
这一行,并在这一行上面添加:
```
  <% if (theme.plugins.slider.enable) { %>
    <%- partial('_third-party/slider/layout') %>
  <% } %>
```
如图:
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617110468000.png)
{% endgallery %}
### 新建样式
打开source/css/_plugins/文件夹,在里面新建一个名为slider.styl的文件,其内容如下:
```
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
  margin-top: 15px
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
如图:
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617110610000.png)
{% endgallery %}
如后打开同目录下的index.styl文件,找到
```
if hexo-config('plugins.pjax.enable') and hexo-config('plugins.pjax.animation')
  @import 'pjaxanimate'
```
在这两行的下面添加:
```
if hexo-config('plugins.slider.enable')
  @import 'slider'
```
如图:
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@main/img/1617110729000.png)
{% endgallery %}
## 最后
```
hexo clean && hexo g && hexo s
```
预览效果
## 关于移动端不显示图片轮播
这是我故意设置的隐藏,如果你需要在移动端显示,则修改slider.styl文件即可,  
在第10行。
```
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
```
  display: none将图片轮播隐藏了,  
在第122行,
```
.hot_post
  display flex
  flex 1
  flex-direction column
  margin-left 10px
  @media screen and (max-width: 800px)
    display none
```
同样是display none将热门文章隐藏了,  
你可以直接将其删除或者修改为自己想要的样式即可。