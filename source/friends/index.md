---
title: 友情链接
layout: friends
meta:
header: []
footer: []
sidebar: []
---
{% issues sites | api=https://gitee.com/api/v5/repos/goopher998/friends/issues?state=all&sort=created&direction=desc&page=1&per_page=100 | group=group:来自Gitee的朋友 %}

{% issues sites | api=https://api.github.com/repos/Goopher97/friends/issues?sort=updated&state=open&page=1&per_page=100 | group=group:来自GitHub的朋友 %}  

{% tabs tab-id %}

<!-- tab 添加我的友链 -->

```
标题： GOOPHER's Blog  
链接： https://goopher.tk
简介： 记录折腾的生活。  
头像： https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/18DAD281896408F73F4EF594111BECA2.jpg
截图： https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210228-110252@2x.png  
```

<!-- endtab -->

<!-- tab 手动提交 -->

由于Gitee的api最近经常403，所以增加了这一个手动添加的分组，可以直接在评论区按照一下格式给我留言，我会在有时间的时候添加到数据里。  

```json
- title:  # 名称
  avatar:  # 头像
  url:  # 链接
  screenshot:  # 截图
  keywords: # 关键词
  description:  # 描述
```

<!-- endtab -->

<!-- tab Gitee自助提交 -->

[点击进入](https://gitee.com/goopher998/friends/issues) 我的friends仓库，新建并按格式提交ISSUES即可，标题请写上博客的网址。提交完成返回友链页刷新即有。

![提交友链](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210302-001523@2x.png)

<!-- endtab -->

<!-- tab Github自助提交 -->

[点击进入](https://github.com/Goopher97/friends/issues) 我的friends仓库，新建并按格式提交ISSUES即可，标题请写上博客的网址。提交完成返回友链页刷新即有。

![提交友链](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210226-004320@2x.png)  

<!-- endtab -->

<!-- tab 自助提交格式 -->

```json
{
    "title": "", //博客名称
    "description": "",  //简介
    "screenshot": "",  //截图
    "url": "",  //网址
    "avatar": "",  //头像
    "group": "来自GitHub的朋友"  //分组，请不要修改此项
}
```

<!-- endtab -->

{% endtabs %}

以下是链接失效的友链，已删除：
```
    - title: Bryce's Club # 名称
      avatar: https://riris.cn/img/blog/kenan.jpeg # 头像
      url: https://riris.cn # 链接
      screenshot: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210228-105102@2x.png # 截图
      keywords: # 关键词
      description: 啥都想学的程序员。 # 描述
```
```
    - title: 随性のBlog # 名称
      avatar: https://hanxea.gitee.io/img/image.jpg # 头像
      url: https://hanxea.gitee.io/random/ # 链接
      screenshot: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210228-104100@2x.png # 截图
      keywords: # 关键词
      description: 一个经常咕咕咕的Blog。 # 描述
```
```
    - title: SAM's BLOG # 名称
      avatar: https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3216471116,1483332883&fm=26&gp=0.jpg # 头像
      url: http://sam1314.xyz:1314/ # 链接
      screenshot:  # 截图
      keywords: # 关键词
      description:  # 描述
```
```
    - title: leader755 Blogs # 名称
      avatar: https://gitee.com/leader755/imagehost/raw/master/blog/wx_avatar.png # 头像
      url: https://www.leader755.com/ # 链接
      screenshot: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210228-103107@2x.png # 截图
      keywords: # 关键词
      description: 分享web前端相关的技术文章，会记录日常生活中的琐事和大家一起分享。 # 描述
```
请以上朋友在恢复访问后给我留言加回友链。