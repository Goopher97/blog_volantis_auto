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