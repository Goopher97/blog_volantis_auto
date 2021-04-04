---
title: 为volantis添加hls.js以在Chrome上播放m3u8视频
author: GOOPHER
tags:
  - Volantis
  - Hexo主题
categories: Volantis主题
abbrlink: 00004
date: 2021-4-1 16:41:31
---
## 前言
按照上一篇文章 https://goopher.tk/posts/2.html 所述，在md中插入视频要写很长一串，并且不支持主题的pjax，所以我就在想将主题原本的video标签改掉。  
## 操作
### 在header.ejs中引入hls.js
打开themes/volantis/layout/_partial/header.ejs文件，在</header>前添加：
```
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
```
图示：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210401-202045@2x.png)
{% endgallery %}
### 修改media.js
打开themes/volantis/scripts/tags/media.js文件，找到第十行：
```
return `<div class="video"><video controls preload><source src='${src}' type='video/mp4'>Your browser does not support the video tag.</video></div>`;
```
将其修改为：
```
return `<div class="video"><video controls preload id="m3u8video"></video></div><script>var hls = new Hls();var video = document.getElementById('m3u8video');hls.loadSource('${src}');hls.attachMedia(video)</script>`;
```
图示：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210404-235813@2x.png)
{% endgallery %}
### 使用
在md中按照原来的video标签插入即可，示例：
```
{% video https://cdn.jsdelivr.net/gh/Goopher97/videoff/text/index.m3u8 %}
```
hexo三连查看效果