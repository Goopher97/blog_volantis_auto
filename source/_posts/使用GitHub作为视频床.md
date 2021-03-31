---
title: 使用GitHub作为视频床
author: GOOPHER
tags:
  - 白嫖GitHub
  - 撸资本主义羊毛
categories: GitHub玩法
abbrlink: 00002
date: 2021-3-31 16:41:31
---
## 效果预览

{% video https://cdn.jsdelivr.net/gh/Goopher97/videoff/text/index.m3u8 %}
由于Chrome原生还不支援m3u8视频的播放，所以在Chrome访问时，可能需要安装一个m3u8的插件，然后访问https://cdn.jsdelivr.net/gh/Goopher97/videoff/text/index.m3u8播放。
{% video https://cdn.jsdelivr.net/gh/Goopher97/videoff/text2/index.m3u8 %}
由于Chrome原生还不支援m3u8视频的播放，所以在Chrome访问时，可能需要安装一个m3u8的插件，然后访问https://cdn.jsdelivr.net/gh/Goopher97/videoff/text2/index.m3u8播放。
## 操作步骤
在新建一个公开的仓库，名称任意。这里省略了。
### 视频文件ts切片
这里使用的是ffmpeg工具，在macOS下，可以使用brew安装。其他操作系统请自行解决安装问题。
```
brew install ffmpeg
```
安装完成后，在终端中找到我们要上传的视频文件切片。
```
ffmpeg -i '视频文件名称' -c:v h264 -flags +cgop -g 30 -hls_time 5 -hls_list_size 0 -hls_segment_filename index%3d.ts 'index.m3u8'
```
注意这里的视频要h.264编码，然后-hls_time 5意为5秒作为一个切片，当视频文件比较小的时候可以设置10秒20秒等作为一个切片，注意切片的大小不能超过20m，要不然没法使用jsd加速。
### push到GitHub仓库
建议新建一个文件夹，把切片出来的放进去，再push到仓库中，方便管理。
例如：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210331-171755@2x.png)
{% endgallery %}
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210331-171846@2x.png)
{% endgallery %}
### 使用的链接
使用jsd加速的链接格式为：
```
https://cdn.jsdelivr.net/gh/用户名/仓库名/文件夹名/index.m3u8
```
### 插入视频到博客中
需要使用dplayer插件，安装
```
npm install hexo-tag-dplayer --save
```
之后再插入，如这篇文章中的示例视频：
```
{% dplayer "url=https://cdn.jsdelivr.net/gh/Goopher97/videoff/text/index.m3u8" "autoplay=false" %}
```