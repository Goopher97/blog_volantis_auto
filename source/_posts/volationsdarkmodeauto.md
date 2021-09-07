---
title: Volantis实现自动夜间和日间模式切换
author: GOOPHER
tag:
  - Volantis
  - Hexo
  - darkmode
categories: Volantis主题
abbrlink: 16065
keywords:
  - Volantis主题修改
  - 自动切换暗黑模式
  - 问好提示
date: 2021-02-28 12:30:30
---
## 大佬弄好了一个我问什么要改
 [大佬弄的](https://colsrch.cn/posts/9eae9d7b/) 这个实现了在没有暗黑模式的系统里的切换，如果像iOS或者macOS或者新的win10和安卓都实现了系统级别的暗黑模式。  
如果还按照大佬的弄，就会造成在启用暗黑模式的系统中切换夜间/日间模式切反的情况，所以我才对其进行了修改。  
## 如何使用
使用方法与大佬的一致，目前适用于Volantis4及以下。  
1.在_config.volantis.yml中启用暗黑模式并添加切换按钮。  
2.添加弹窗和样式，按照[大佬的](https://colsrch.cn/posts/72bb5148/) 操作即可。  
3.修改 layout/_partial/scripts/darkmode.ejs 文件  
在文件开头添加如下：  
```javascript
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Colsrch/CDN@master/judge_time/js.js"></script>
```
将下列代码复制添加至该文件的末尾（script）标签前面：
```
// 自动夜间模式
if (navigator.geolocation) {   //获取地理位置 用于判断日出日落时间
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var res = computeSunRiseSunSet(position.coords.latitude, position.coords.longitude, 8);
        console.log(res.str)
        adjust_time(res.strSunRise, res.strSunSet, "08:00", "12:00", "14:00", "23:00")
      },
      function (e) {
        adjust_time("7:00", "17:30", "08:00", "12:00", "14:00", "23:00")  //未允许获取地理位置时，使用默认时间
        console.log("未允许获取地理位置，使用默认配置时间")
        throw (e.message);
      }
    )
  }
function adjust_time(beginTime, endTime, morningTime, noonTime, afternoonTime, nightTime) {
  const rootElement = document.documentElement;
  var strb = beginTime.split(":");
  if (strb.length != 2) {
    return false;
  }
  var stre = endTime.split(":");
  if (stre.length != 2) {
    return false;
  }
  var strmorning = morningTime.split(":");   //12点
  if (stre.length != 2) {
    return false;
  }
  var strnoon = noonTime.split(":");   //12点
  if (stre.length != 2) {
    return false;
  }
  var strafternoon = afternoonTime.split(":");   //13点
  if (stre.length != 2) {
    return false;
  }
  var strnight = nightTime.split(":");   //23点
  if (stre.length != 2) {
    return false;
  }
  var b = new Date();
  var e = new Date();
  var n = new Date();
  var morning = new Date();
  var noon = new Date();
  var afternoon = new Date();
  var night = new Date();
  b.setHours(strb[0]);
  b.setMinutes(strb[1]);
  e.setHours(stre[0]);
  e.setMinutes(stre[1]);
  morning.setHours(strmorning[0]);
  morning.setMinutes(strmorning[1]);
  noon.setHours(strnoon[0]);
  noon.setMinutes(strnoon[1]);
  afternoon.setHours(strafternoon[0]);
  afternoon.setMinutes(strafternoon[1]);
  night.setHours(strnight[0]);
  night.setMinutes(strnight[1]);
  $.getJSON("https://v1.hitokoto.cn", function (hitokoto) {
    //在这里面处理获得的数据
    if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
      var daytimetitle = ''
      var daytimemessage = ''
      if (n.getTime() - morning.getTime() < 0) {
        // 早上
        daytimetitle = '早安'
      }
      else if (n.getTime() - noon.getTime() < 0) {
        // 上午
        daytimetitle = '上午好'
      }
      else if (n.getTime() - afternoon.getTime() < 0) {
        // 中午
        daytimetitle = '中午好'
        daytimemessage = '<br>要注意休息哦~'
      }
      else {
        // 下午
        daytimetitle = '下午好'
      }
      // 判断是否已经开启夜间模式
      if (rootElement.getAttribute('data-user-color-scheme', 'dark')) {
        // 已开启夜间模式，修改按钮状态
        $.message({ title: '操作通知', message: daytimetitle + '，已自动为您切换为日间模式。<br>' + hitokoto.hitokoto + daytimemessage, type: 'success' });
        const mode = toggleCustomDarkMode();
        applyCustomDarkModeSettings(mode);
      }
      if (rootElement.getAttribute('data-user-color-scheme', 'light')) {
        // 未开启夜间模式，不执行操作
        $.message({ title: daytimetitle, message: hitokoto.hitokoto + daytimemessage, type: 'info' });
        return true;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // 已开启夜间模式，修改按钮状态
        $.message({ title: '操作通知', message: daytimetitle + '，已自动为您切换为日间模式。<br>' + hitokoto.hitokoto + daytimemessage, type: 'success' });
        const mode = toggleCustomDarkMode();
        applyCustomDarkModeSettings(mode);
      } else {
        // 未开启夜间模式，不执行操作
        $.message({ title: daytimetitle, message: hitokoto.hitokoto + daytimemessage, type: 'info' });
        return true;
      }
    } else {
      // 晚上
      var nighttitle = ''
      var nightmessage = ''
      if (night.getTime() - n.getTime() < 0 || n.getTime() - b.getTime() < 0) {
        nighttitle = '夜深了'
        nightmessage = '<br>该睡觉啦~'
      } else {
        nighttitle = '晚上好'
        nightmessage = '<br>吃晚饭了吗？要注意眼睛哦。'
      }
      // 判断是否已经开启夜间模式
      if (rootElement.getAttribute('data-user-color-scheme', 'light')) {
        // 未开启夜间模式，修改按钮状态
        $.message({ title: '操作通知', message: nighttitle + '，已自动为您切换为夜间模式。<br>' + hitokoto.hitokoto + nightmessage, type: 'success' });
        const mode = toggleCustomDarkMode();
        applyCustomDarkModeSettings(mode);
      }
      if (rootElement.getAttribute('data-user-color-scheme', 'dark')) {
        // 已开启夜间模式，不执行操作
        $.message({ title: nighttitle, message: hitokoto.hitokoto + nightmessage, type: 'info' });
        return true;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // 已开启夜间模式，不执行操作
        $.message({ title: nighttitle, message: hitokoto.hitokoto + nightmessage, type: 'info' });
        return true;
      } else {
        // 未开启夜间模式，修改按钮状态
        $.message({ title: '操作通知', message: nighttitle + '，已自动为您切换为夜间模式。<br>' + hitokoto.hitokoto + nightmessage, type: 'success' });
        const mode = toggleCustomDarkMode();
        applyCustomDarkModeSettings(mode);
      }
    }
  });
}
```
## 说明
原本的暗黑模式标示为"data-user-color-scheme=dark"  
如果启用了系统级别的暗黑模式则标示为"(prefers-color-scheme: dark)"  
因为多出了一个标示，固会导致原来大佬的在系统级暗黑下变反。  
这里增加了对prefers-color-scheme: dark的监听，新增了对系统级暗黑的判断，使得在系统级暗黑下不会出现弄反的情况。  
监听prefers-color-scheme: dark
```javascript
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    
} else {
    
}
```
在系统级暗黑的情况下，日间模式标示变为"data-user-color-scheme=light"  
## 最后
修复了时间在夜晚的时候，系统级暗黑的情况下自动切换切反的问题。  
修复了时间在夜晚的时候，系统未开启暗黑的情况下，自动切换两个模式轮切的问题。  
修复了时间在白天的时候，系统级暗黑的情况下自动切换切反的问题。 
修复了时间在白天的时候，系统未开启暗黑的情况下，自动切换两个模式轮切的问题。  
