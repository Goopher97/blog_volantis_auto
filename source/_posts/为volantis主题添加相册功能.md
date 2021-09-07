---
title: 为volantis主题添加瀑布流相册
author: GOOPHER
tags:
  - Volantis
  - Hexo主题
categories: Volantis主题
abbrlink: 00007
keywords:
  - Volantis主题修改
  - Volantis瀑布流相册
date: 2021-4-14 09:41:31
---
## 前言
功能参考自 [AIGISSS](https://www.aigisss.com/blog/posts/798ba833.html)  
效果查看本站更多中的相册页面  
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210414-102839@2x.png)
{% endgallery %}
目前已知的问题：  
1.不支持pjax  
2.分类功能无法使用  
3.懒加载无法使用，使用懒加载后图片不显示  
4.目前的样式可能稍显单调  
优势：  
1.可以使用GitHub action自动构建  
2.走jsd免费cdn加速，访问快
## 思路
利用image-size生成图片的json，然后图片存储在GitHub利用jsd加速访问（跟白嫖GitHub做图床一样）。然后通过js生成完整的图片链接信息，生成页面。
## 步骤
### 新建照片页面
执行命令新建页面
```
hexo new page photos
```
在source/photos/index.md中写入以下内容
```
---
layout: photos
comments: false
meta:
header: []
footer: []
sidebar: []
---

<div class="ImageGrid"></div>
```
### 修改主题配置文件
打开_config.volantis.yml文件，添加导航按钮：
```
        - name: 相册
          icon: fad fa-images # pro
          url: photos/
```
这里我使用的pro版图标，如果使用默认的图标请把icon改为fas fa-images  
pjax排除：  
搜索pjax并添加
```
       - /photos/        # 相册页面不支持pjax
```
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210414-100219@2x.png)
{% endgallery %}
### 处理照片信息
这里我选择跟博客共用一个仓库，方便action自动部署。当然你也可以使用单独的一个仓库来存储，示例：[photos](https://github.com/Goopher97/photos)  
在博客根目录新建一个photos文件夹，在里面新建一个tool.js文件，并把以下内容粘贴到tool.js中。  
```
const fs = require('fs-extra');
const path = require('path');
const imageSize = require('image-size');

const rootPath="photos/"

class PhotoExtension {
    constructor() {
        this.size = 64;
        this.offset = [0, 0];
    }
}

class Photo {
    constructor() {
        this.dirName = '';
        this.fileName = '';
        this.iconID = '';
        this.extension = new PhotoExtension();
    }
}

class PhotoGroup {
    constructor() {
        this.name = '';
        this.children = [];
    }
}

function createPlotIconsData() {
    let allPlots = [];
    let allPlotGroups = [];

    const plotJsonFile = path.join(__dirname, '../source/photos/photosInfo.json');
    const plotGroupJsonFile = path.join(__dirname, '../source/photos/photos.json');

    if (fs.existsSync(plotJsonFile)) {
        allPlots = JSON.parse(fs.readFileSync(plotJsonFile));
    }

    if (fs.existsSync(plotGroupJsonFile)) {
        allPlotGroups = JSON.parse(fs.readFileSync(plotGroupJsonFile));
    }

    fs.readdirSync(__dirname).forEach(function(dirName) {
        const stats = fs.statSync(path.join(__dirname, dirName));
        const isDir = stats.isDirectory();
        if (isDir) {
            const subfiles = fs.readdirSync(path.join(__dirname, dirName));
            subfiles.forEach(function(subfileName) {
                // 如果已经存在 则不再处理
                // if (allPlots.find(o => o.fileName === subfileName && o.dirName === dirName)) {
                //     return;
                // }

                // 新增标
                const plot = new Photo();
                plot.dirName = dirName;
                plot.fileName = subfileName;
                const imageInfo = imageSize(rootPath+dirName + "/" + subfileName);
                plot.iconID = imageInfo.width + '.' + imageInfo.height + ' ' + subfileName;
                allPlots.push(plot);
                console.log(`RD: createPlotIconsData -> new plot`, plot);

                // 为新增标添加分组 暂时以它所处的文件夹为分组
                let group = allPlotGroups.find(o => o.name === dirName);
                if (!group) {
                    group = new PhotoGroup();
                    group.name = dirName;
                    allPlotGroups.push(group);
                    console.log(`RD: createPlotIconsData -> new group`, group);
                }
                group.children.push(plot.iconID);
            });
        }
    });

    fs.writeJSONSync(plotJsonFile, allPlots);
    fs.writeJSONSync(plotGroupJsonFile, allPlotGroups);
}

createPlotIconsData();
```
这里的第5行
```
const rootPath="photos/"
```
这个是图片的路径
第34、35行
```
    const plotJsonFile = path.join(__dirname, '../source/photos/photosInfo.json');
    const plotGroupJsonFile = path.join(__dirname, '../source/photos/photos.json');
```
这个是json的输出路径，可以按需更改。  
之后在photos文件夹下新建任意名称的文件夹，再把照片放进去。示例：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210414-095342@2x.png)
{% endgallery %}
之后安装image-size
```
npm i -S image-size
```
之后执行命令
```
node photos/tool.js
```
查看source/photos/文件夹下是否生成json  
这里注意，如果是使用macOS的话，可能因为系统自动生成的.DS_Store文件报错，删除后.DS_Store后再执行一般就不会报错了。
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210414-100641@2x.png)
{% endgallery %}
删除命令
```
find ~ -name ".DS_Store" -delete
```
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210414-100810@2x.png)
{% endgallery %}
看到能正常生成后即可。  
### 修改GitHub action配置
编辑.github/workflows/下的yml文件，添加两个命令
```
rm -rf source/photos/*.json
node photos/tool.js
```
这个image-size有个弊端就是如果不删除之前生成json，删除照片后再生成的json里也会有已删除的照片信息，所以建议每次修改照片后生成json前都先删除之前生成的json。  
示例：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210414-101826@2x.png)
{% endgallery %}
### 添加ejs
在themes/volantis/layout/目录下新建photos.ejs,并粘贴以下内容：
```
<%- js(theme.plugins.jquery) %>
<link rel="stylesheet" href="https://cdn.staticfile.org/fancybox/3.5.7/jquery.fancybox.min.css">
<script src="https://cdn.staticfile.org/fancybox/3.5.7/jquery.fancybox.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/minigrid@3.1.1/dist/minigrid.min.js"></script>
<script src="../js/photos.js"></script>
<%- partial('_pre') %>
<% page.comments = false; %>
<div class='l_main<%- page.sidebar == false ? ' no_sidebar' : '' %>'>
    <%- partial('_partial/article', {post: page, index: false}) %>
</div>
<%- partial('_partial/side') %>
```
### 添加photos.js
在themes/volantis/source/js目录下新建photos.js，并粘贴以下内容：
```
var imgDataPath = "./photos.json"; //图片名称高宽信息json文件路径
var imgPath = "https://cdn.jsdelivr.net/gh/Goopher97/blog_volantis_auto@main/photos/"; //图片访问路径
var imgMaxNum = 50; //图片显示数量

var windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
if (windowWidth < 768) {
    var imageWidth = 145; //图片显示宽度(手机端)
} else {
    var imageWidth = 250; //图片显示宽度
}

const photo = {
    page: 1,
    offset: imgMaxNum,
    init: function () {
        var that = this;
        $.getJSON(imgDataPath, function (data) {
            that.render(that.page, data);
            //that.scroll(data);
            that.eventListen(data);
        });
    },
    constructHtml(options) {
        const {
            imageWidth,
            imageX,
            imageY,
            name,
            imgPath,
            imgName,
            imgNameWithPattern,
        } = options;
        const htmlEle = `<div class="card lozad" style="width:${imageWidth}px">
                  <div class="ImageInCard" style="height:${ (imageWidth * imageY) / imageX }px">
                    <a data-fancybox="gallery" href="${imgPath}${name}/${imgNameWithPattern}" data-caption="${imgName}" title="${imgName}">
                            <img src="${imgPath}${name}/${imgNameWithPattern}">
                    </a>
                  </div>
                </div>`;
        return htmlEle;
    },
    render: function (page, data = []) {
        this.data = data;
        if (!data.length) return;
        var html,
            imgNameWithPattern,
            imgName,
            imageSize,
            imageX,
            imageY,
            li = "";

        let liHtml = "";
        let contentHtml = "";

        data.forEach((item, index) => {
            const activeClass = index === 0 ? "active" : "";
            liHtml += `<li class="nav-item" role="presentation">
          <a class="nav-link ${activeClass} photo-tab" id="home-tab" photo-uuid="${item.name}" data-toggle="tab" href="#${item.name}"  role="tab" aria-controls="${item.name}" aria-selected="true">${item.name}</a>
        </li>`;
        });
        const [initData = {}] = data;
        const {children = [], name} = initData;
        children.forEach((item, index) => {
            imgNameWithPattern = item.split(" ")[1];
            imgName = imgNameWithPattern.split(".")[0];
            imageSize = item.split(" ")[0];
            imageX = imageSize.split(".")[0];
            imageY = imageSize.split(".")[1];
            let imgOptions = {
                imageWidth,
                imageX,
                imageY,
                name,
                imgName,
                imgPath,
                imgNameWithPattern,
            };
            li += this.constructHtml(imgOptions);
        });
        contentHtml += ` <div class="tab-pane fade show active"  role="tabpanel" aria-labelledby="home-tab">${li}</div>`;

        const ulHtml = `<ul class="nav nav-tabs" id="myTab" role="tablist">${liHtml}</ul>`;
        const tabContent = `<div class="tab-content" id="myTabContent">${contentHtml}</div>`;

        $("#imageTab").append(ulHtml);
        $(".ImageGrid").append(tabContent);
        this.minigrid();
    },
    eventListen: function (data) {
        let self = this;
        var html,
            imgNameWithPattern,
            imgName,
            imageSize,
            imageX,
            imageY,
            li = "";
        $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
            $(".ImageGrid").empty();
            const selectId = $(e.target).attr("photo-uuid");
            const selectedData = data.find((data) => data.name === selectId) || {};
            const {children, name} = selectedData;
            let li = "";
            children.forEach((item, index) => {
                imgNameWithPattern = item.split(" ")[1];
                imgName = imgNameWithPattern.split(".")[0];
                imageSize = item.split(" ")[0];
                imageX = imageSize.split(".")[0];
                imageY = imageSize.split(".")[1];
                let imgOptions = {
                    imageWidth,
                    imageX,
                    imageY,
                    name,
                    imgName,
                    imgPath,
                    imgNameWithPattern,
                };
                li += self.constructHtml(imgOptions);
            });
            $(".ImageGrid").append(li);
            self.minigrid();
        });
    },
    minigrid: function () {
        var grid = new Minigrid({
            container: ".ImageGrid",
            item: ".card",
            gutter: 12,
        });
        grid.mount();
        $(window).resize(function () {
            grid.mount();
        });
    },
};
photo.init();
```
这里注意第一二行，如果使用单独的仓库存放照片，记得修改加速的链接和json的链接。
### 添加photos.styl样式
在themes/volantis/source/css/_other目录下新建photos.styl文件，并粘贴以下内容：
```
.ImageGrid {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  text-align: center;
}
.card {
  display: flex;
  float: left;
  overflow: hidden;
  transition: .3s ease-in-out;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0);
  padding: 1.4px;
}
.ImageInCard {
  display block
}
.ImageInCard img {
  padding: 0;
  border-radius: 8px;
  width:100%;
  height:100%;
}
```
记得引入这个样式文件，在style.styl文件中添加：
```
@import '_other/*'
```
### 最后
如果大佬完善了，请给我留言，让我学习学习。