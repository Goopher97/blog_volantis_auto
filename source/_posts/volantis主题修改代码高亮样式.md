---
title: volantis主题修改代码高亮样式
author: GOOPHER
tags:
  - volantis
  - Hexo主题
categories: Volantis主题
abbrlink: 00003
date: 2021-3-31 16:41:31
---
## 前言
hexo默认的代码高亮样式有时候不够好看，而highlightjs可以自己引用很多好看的样式，比如vs样式。但是它却不支持行号，因此有了这篇修改教程。  
## 步骤
### 修改ejs以支持行号显示
打开themes/volantis/layout/_third-party/highlistjs/目录下的script.ejs文件，  
这里偷个懒，直接删除原来的内容后，复制下载的代码粘贴进去。
```
<% if (theme.plugins.highlightjs.js) { %>
<%- js(theme.plugins.highlightjs.js) %>
<script src="https://cdn.jsdelivr.net/npm/highlightjs-line-numbers.js@2.8.0/dist/highlightjs-line-numbers.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
<script>hljs.initLineNumbersOnLoad({ singleLine: true });</script>
<% } %>
<script>
volantis.pjax.push(()=>{
	document.querySelectorAll('pre code').forEach((block) => {
	  hljs.highlightBlock(block);
      hljs.lineNumbersBlock(block, { singleLine: true });
	});
},"highlightjs")
</script>

```
### 为其创建样式文件
在themes/volantis/source/css/目录下创建_other文件夹，并在里面创建一个名为codeblock.styl的文件，其内容如下：
```
/* for block of numbers */
.hljs-ln-numbers {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  text-align: center;
  color: #ccc;
  border-right: 1px solid #CCC;
  vertical-align: top;
  padding-right: 5px;

  /* your custom style here */
}

/* for block of code */
.hljs-ln-code {
  padding-left: 10px;
}
```
其主要是让行号和代码有个明显分界，看起来不粘在一起。  
引入样式：打开source/css/目录下的style.styl文件，添加以下内容：
```
@import '_other/*'
```
### 禁用默认的高亮设置
打开_config.yml文件，将highlight禁用：
```
highlight:
  enable: false
```
### 启用highlightjs并设置样式
打开_config.volantis.yml文件，启用highlightjs（即删除true前面的#号）。并设置css样式，如下：
```
  # highlight.js
  highlightjs:
    enable: true # Please set hexo.config.highlight.enable = false !!!
    js: https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10/build/highlight.min.js
    css: https://cdn.jsdelivr.net/npm/highlight.js@10.6.0/styles/vs2015.css
    # more: https://www.jsdelivr.com/package/npm/highlight.js?path=styles
```
## 最后
hexo三连查看效果。  
效果示例：
{% gallery center, 1 %}
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang2@master/img/QQ20210401-012851@2x.png)
{% endgallery %}