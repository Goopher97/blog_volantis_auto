---
title: 使用Hexo+Next主题搭建Blog
author: GOOPHER
categories: Hexo
tag:
  - Hexo
  - Hexo主题
  - Next
  - Blog
abbrlink: 6096
keywords:
  - Next主题
  - Hexo博客搭建
  - Next主题添加友链
date: 2021-01-27 22:09:31
---
## 前言
之前试过了很多Hexo主题，但是都不太合胃口，就又又又转回了Next这种简单简约的主题。我的博客搭建在GitHub上，使用Vercel加速，完全白嫖真的快乐。
### 新建博客
```
hexo init 博客主目录名
```
![新建博客](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210127-221909@2x.png)  
新建完成后，切换工作目录至博客的主目录中。
```
cd 博客主目录名 //mac or linux，win我不会。
```
![切换工作目录](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210127-222302@2x.png)  
安装Next主题。
```
npm install hexo-theme-next
```
![安装Next主题](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210127-222725@2x.png)  
使用WebStorm打开博客的目录。
![示例](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210127-223011@2x.png)  
在博客根目录新建一个文件名为_config.next.yml的文件，该文件就是主题的配置文件。打开node_modules文件夹，找到安装好的主题，打开里面的_config.yml配置文件，将里面的内容全选复制到_config.next.yml文件中保存。  
![示例](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210127-223528@2x.png)
### 开始配置
打开根目录下的_config.yml配置文件，配置博客名，作者，时区等。
```
# Site
title: //博客名
subtitle: //博客副标题
description: //描述
keywords: //关键字
author: //作者
language: //语言
timezone: //时区
```
![示例](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210127-224309@2x.png)  
修改域名等。
```
# URL
## If your site is put in a subdirectory, set url as 'http://example.com/child' and root as '/child/'
url: http://example.com //此处网址修改为自己的
root: /  //博客根目录，一般不修改
```
![示例](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210127-224802@2x.png)  
启用next主题。
```
theme: next
```
配置git参数。
```
deploy:
  type: git
  repo: https://github.com/GOOPHER97/Goopher97.github.io.git //此处修改为你自己的
  branch: master
```
### 配置主题
打开_config.next.yml文件，搜索menu，配置导航栏。需要哪个删除前面的#即可，注意#删除后要加一个空格。  
举例：
```
menu:
 home: / || fa fa-home
```
搜索creative_commons配置创作共用许可。
```
creative_commons:
  license: by-nc-nd //署名-非商业用途-禁止演绎,其他的自己查。
  sidebar: true
  post: true
  language: zh-CN
```
启用JS,CSS压缩。
```
minify: true
```
配置布局样式。
```
# Schemes
#scheme: Muse
#scheme: Mist
#scheme: Pisces
scheme: Gemini //去掉前面#号为启用
```
启用黑色模式
```
darkmode: true
```
设置社交链接，注意要有个空格。
```
social:
 GitHub: https://github.com/Goopher97 || fab fa-github
 E-Mail: mailto:1520396767@qq.com || fa fa-envelope
```
启用pjax局部刷新。
```
pjax: true
```
启用懒加载，适合多图。
```
lazyload: true
```
启用代码块复制按钮。
```
copy_button:
    enable: true
    show_result: true
```
配置Gitalk,需要自己去注册。
```
gitalk:
  enable: true
  github_id: 
  repo: 
  client_id: 
  client_secret: 
  admin_user: 
  distraction_free_mode: true # Facebook-like distraction free mode
  # Gitalk's display language depends on user's browser or system environment
  # If you want everyone visiting your site to see a uniform language, you can set a force language value
  # Available values: en | es-ES | fr | ru | zh-CN | zh-TW
  language: zh-CN
```
启用搜索。
```
local_search:
  enable: true
  # If auto, trigger search by changing input.
  # If manual, trigger search by pressing enter key or search button.
  trigger: auto
  # Show top n results per article, show all results by setting to -1
  top_n_per_article: 1
  # Unescape html strings to the readable one.
  unescape: false
  # Preload the search data when the page loads.
  preload: true
```
安装搜索插件。
```
npm install hexo-generator-searchdb --save
```
在根目录的配置文件_config.yml中加入搜索配置。
```
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```
![示例](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210127-233136@2x.png)  
创建about等页面。
```
hexo new page about
```
同时要记得修改对应md文件。
```
---
title: 关于
date: 2021-01-27 23:26:40
type: about
---
```
## 为Next-v8.2.0主题添加友链页面
在_config.next.yml配置文件中的menu下添加友链选项。
```
menu:
 xxxx
 links: /links/ || fa fa-heartbeat
```
修改主题文件夹中的语言配置文件node_models/hexo-theme-next/languages/zh-CN.yml。
```
menu:
  links: 友链
```
下载我写好的links.njk文件，放置在node_models/hexo-theme-next/layout/目录下。  
下载地址： [点击前往](https://goopher.lanzous.com/ij9RFnk54xa)  
记得解压。。。  
修改同目录下的page.njk文件，在
```
  {%- elif page.type === 'tags' and not page.title %}
    {{- __('title.tag') + page_title_suffix }}
```
下一行插入：
```
  {%- elif page.type === 'links' and not page.title %}
    {{- __('title.links') + page_title_suffix }}
```
![示例](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210127-235236@2x.png)  
之后在
```
        {% elif page.type === 'categories' %}
          {%- include '_partials/page/categories.njk' -%}
```
下一行插入：
```
        {% elif page.type === 'links' %}
          {% include 'links.njk' %}
```
引入links.njk文件。  
![示例](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210127-235955@2x.png)  
新建友链页面。
```
hexo new page links
```
修改md文件。
```
---
title: 友链
date: 2021-01-28 00:02:39
type: links
---
```
在_config.next.yml文件中加入友链配置。
```
mylinks:
- nickname: GOOPHER's Blog #友链名称
  avatar: https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/IMG_2199.JPG #友链头像
  site: https://goopher97-github-io.vercel.app #友链地址
  info: 记录折腾的生活。 #友链说明
```
查看效果。
```
hexo clean && hexo g && hexo s
```
![效果](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/QQ20210128-000702@2x.png)
### 其他
开启赞赏。
```
reward_settings:
  enable: true
reward:
  wechatpay: /images/wechatpay.png
  alipay: /images/alipay.png
```
添加站点地图：  
在_config.yml中添加：
```
# sitemap
sitemap:
  path: sitemap.xml
```
安装插件。
```
npm install hexo-generator-sitemap --save
```
neat压缩css,js。
```
npm install hexo-neat --save
```
在_config.yml中添加：
```
# hexo-neat
# md博文压缩
neat_enable: true
# 压缩html（ejs，swig等也属于html格式片段）
neat_html:
  enable: true
  exclude:
# 压缩css
neat_css:
  enable: true
  exclude:
    - '*.min.css'
    - '**/*.min.css'
    - 'jquery.fancybox.min.css'
    - '**/live2d-widget/waifu.css'
# 压缩js
neat_js:
  enable: true
  mangle: true #打印日志
  output:
  compress:
  exclude: #排除文件
    - '*.min.js'
    - '**/*.min.js'
    - 'jquery.fancybox.min.js'
    - '**/live2d-widget/*.js'
    - '**/live2d-widget/*.min.js'
```
安装hexo-deployer-git。
```
npm install --save hexo-deployer-git
```
开启阅读进度百分比。
```
  scrollpercent: true
```
修改圆角，在\source\css\_variables\Gemini.styl文件中添加：
```
// 修改主题页面布局为圆角
$border-radius-inner = 15px 15px 15px 15px;
$border-radius = 15px;
```
