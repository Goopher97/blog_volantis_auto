---
title: 使用Scriptable创建小组件
author: GOOPHER
categories:
  - iOS小组件
tag:
  - Scriptable
  - iOS小组件
abbrlink: 29954
keywords:
  - IOS小组件
  - 电信小组件
date: 2021-02-25 00:30:31
---
## 安装
打开app store搜索Scriptable下载安装即可，是免费的。
![安装](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/CA68EF62-52DD-48E8-8749-D31EE2E57F45_L0_001_origin.IMG_0426.PNG)  
### 寻找需要的小组件代码
一般去github搜就有了，这里先以一个知乎热榜小组件为例。  
我们先阅读说明。  
![说明](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/3FC302D3-E92F-4A6B-9FE8-85B09F58FFD9_L0_001_origin.IMG_0431.PNG)  
可以看到，需要先安装Env。点击他给的跳转。  
然后全选复制代码。  
![全选复制](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/FFB7650D-0D11-45E1-91F5-7F2DB3CBB9F1_L0_001_origin.IMG_0432.PNG)  
打开Scriptable软件，点击右上角的➕号，然后将代码粘贴进去。  
![点击➕新建](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/FE077715-13C8-470A-A19A-F7780B7C9109_L0_001_origin.IMG_0434.PNG)  
![粘贴代码](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/53882DE5-767F-4392-8BB6-2E837CEA35C6_L0_001_origin.IMG_0435.PNG)  
粘贴后点击左下角的设置按钮，重命名为Env。  
![重命名为Env](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/B2108239-E7DF-40F1-8A3A-C2EDD691CDF0_L0_001_origin.IMG_0436.PNG)  
之后依次点击左上角的close done保存退出。  
再打开之前的说明，找到要安装的小组件"知乎热榜"。  
![说明](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/80382C34-4C5E-4928-B46D-2F4A6897B0A1_L0_001_origin.IMG_0437.PNG)  
全选复制代码。  
![复制](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/4A40536B-4776-4624-B69D-84C6E14DE218_L0_001_origin.IMG_0438.PNG)  
之后再打开Scriptable，点击➕新建，将代码粘贴进去，再点击左下角设置，重命名为"知乎热榜"。  
![粘贴代码新建知乎热搜](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/043D404C-C921-40F6-AFCB-6A7AEDF6E14B_L0_001_origin.IMG_0440.PNG)  
完成后就可以点击右下角的运行按钮预览一下效果。  
![预览效果](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/09F00EF2-49DB-42B0-B7AB-9E3305FDF1F3_L0_001_origin.IMG_0441.PNG)  
新建小组件
在新建的时候选择Scriptable这个软件，然后选择合适的大小。  
然后再点击一下反转，选择知乎热搜，然后就好了。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/EE4B1F97-485C-4436-8C96-065D75910E93_L0_001_origin.IMG_0443.PNG)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/BC18539B-A089-4D65-ADCF-D89F9848E4BD_L0_001_origin.IMG_0444.PNG)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/4A25C6CA-FC04-4252-9785-B657F6FCBCA7_L0_001_origin.IMG_0445.PNG)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/95870162-DCBA-4397-916D-60941EE81868_L0_001_origin.IMG_0446.PNG)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/934800A2-6213-4F35-991A-386D64DFE9F2_L0_001_origin.IMG_0447.PNG)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/1AEE7603-DB69-4DA7-B350-E076F3C19746_L0_001_origin.IMG_0448.PNG)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/0E4FDEF5-259F-48CC-A723-8DABF1A9D0F5_L0_001_origin.IMG_0449.PNG)  
## 电信小组件
同理，我们可以添加更实用的电信流量话费组件。  
### 安装依赖
复制以下代码去新建名为DmYY的依赖。 
~~~
/*
 * Author: 2Ya
 * Github: https://github.com/dompling
 */

class DmYY {
  constructor(arg) {
    this.arg = arg;
    this._actions = {};
    this.init();
    this.isNight = Device.isUsingDarkAppearance();
  }

  BACKGROUND_NIGHT_KEY;
  widgetColor;
  backGroundColor;
  useBoxJS = true;
  isNight;

  // 获取 Request 对象
  getRequest = (url = '') => {
    return new Request(url);
  };

  // 发起请求
  http = async (options = { headers: {}, url: '' }, type = 'JSON') => {
    try {
      let request;
      if (type !== 'IMG') {
        request = this.getRequest();
        Object.keys(options).forEach((key) => {
          request[key] = options[key];
        });
        request.headers = { ...this.defaultHeaders, ...options.headers };
      } else {
        request = this.getRequest(options.url);
        return (await request.loadImage()) || SFSymbol.named('photo').image;
      }
      if (type === 'JSON') {
        return await request.loadJSON();
      }
      if (type === 'STRING') {
        return await request.loadString();
      }
      return await request.loadJSON();
    } catch (e) {
      console.log('error:' + e);
      if (type === 'IMG') return SFSymbol.named('photo').image;
    }
  };

  //request 接口请求
  $request = {
    get: async (url = '', options = {}, type = 'JSON') => {
      let params = { ...options, method: 'GET' };
      if (typeof url === 'object') {
        params = { ...params, ...url };
      } else {
        params.url = url;
      }
      let _type = type;
      if (typeof options === 'string') _type = options;
      return await this.http(params, _type);
    },
    post: async (url = '', options = {}, type = 'JSON') => {
      let params = { ...options, method: 'POST' };
      if (typeof url === 'object') {
        params = { ...params, ...url };
      } else {
        params.url = url;
      }
      let _type = type;
      if (typeof options === 'string') _type = options;
      return await this.http(params, _type);
    },
  };

  // 获取 boxJS 缓存
  getCache = async (key) => {
    try {
      const url = 'http://' + this.prefix + '/query/boxdata';
      const boxdata = await this.$request.get(url);
      console.log(boxdata.datas[key]);
      if (key) return boxdata.datas[key];
      return boxdata.datas;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  transforJSON = (str) => {
    if (typeof str == 'string') {
      try {
        return JSON.parse(str);
      } catch (e) {
        console.log(e);
        return str;
      }
    }
    console.log('It is not a string!');
  };

  // 选择图片并缓存
  chooseImg = async () => {
    return await Photos.fromLibrary();
  };

  // 设置 widget 背景图片
  getWidgetBackgroundImage = async (widget) => {
    const backgroundImage = this.getBackgroundImage();
    if (backgroundImage) {
      const opacity = Device.isUsingDarkAppearance()
        ? Number(this.settings.darkOpacity)
        : Number(this.settings.lightOpacity);
      widget.backgroundImage = await this.shadowImage(
        backgroundImage,
        '#000',
        opacity,
      );
      return true;
    } else {
      if (this.backGroundColor.colors) {
        widget.backgroundGradient = this.backGroundColor;
      } else {
        widget.backgroundColor = this.backGroundColor;
      }
      return false;
    }
  };

  /**
   * 验证图片尺寸： 图片像素超过 1000 左右的时候会导致背景无法加载
   * @param img Image
   */
  verifyImage = async (img) => {
    try {
      const { width, height } = img.size;
      const direct = true;
      if (width > 1000) {
        const options = ['取消', '打开图像处理'];
        const message =
          '您的图片像素为' +
          width +
          ' x ' +
          height +
          '\n' +
          '请将图片' +
          (direct ? '宽度' : '高度') +
          '调整到 1000 以下\n' +
          (!direct ? '宽度' : '高度') +
          '自动适应';
        const index = await this.generateAlert(message, options);
        if (index === 1)
          Safari.openInApp('https://www.sojson.com/image/change.html', false);
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * 获取截图中的组件剪裁图
   * 可用作透明背景
   * 返回图片image对象
   * 代码改自：https://gist.github.com/mzeryck/3a97ccd1e059b3afa3c6666d27a496c9
   * @param {string} title 开始处理前提示用户截图的信息，可选（适合用在组件自定义透明背景时提示）
   */
  async getWidgetScreenShot(title = null) {
    // Crop an image into the specified rect.
    function cropImage(img, rect) {
      let draw = new DrawContext();
      draw.size = new Size(rect.width, rect.height);

      draw.drawImageAtPoint(img, new Point(-rect.x, -rect.y));
      return draw.getImage();
    }

    // Pixel sizes and positions for widgets on all supported phones.
    function phoneSizes() {
      return {
        // 12 and 12 Pro
        2532: {
          small: 474,
          medium: 1014,
          large: 1062,
          left: 78,
          right: 618,
          top: 231,
          middle: 819,
          bottom: 1407,
        },

        // 11 Pro Max, XS Max
        2688: {
          small: 507,
          medium: 1080,
          large: 1137,
          left: 81,
          right: 654,
          top: 228,
          middle: 858,
          bottom: 1488,
        },

        // 11, XR
        1792: {
          small: 338,
          medium: 720,
          large: 758,
          left: 54,
          right: 436,
          top: 160,
          middle: 580,
          bottom: 1000,
        },

        // 11 Pro, XS, X
        2436: {
          small: 465,
          medium: 987,
          large: 1035,
          left: 69,
          right: 591,
          top: 213,
          middle: 783,
          bottom: 1353,
        },

        // Plus phones
        2208: {
          small: 471,
          medium: 1044,
          large: 1071,
          left: 99,
          right: 672,
          top: 114,
          middle: 696,
          bottom: 1278,
        },

        // SE2 and 6/6S/7/8
        1334: {
          small: 296,
          medium: 642,
          large: 648,
          left: 54,
          right: 400,
          top: 60,
          middle: 412,
          bottom: 764,
        },

        // SE1
        1136: {
          small: 282,
          medium: 584,
          large: 622,
          left: 30,
          right: 332,
          top: 59,
          middle: 399,
          bottom: 399,
        },

        // 11 and XR in Display Zoom mode
        1624: {
          small: 310,
          medium: 658,
          large: 690,
          left: 46,
          right: 394,
          top: 142,
          middle: 522,
          bottom: 902,
        },

        // Plus in Display Zoom mode
        2001: {
          small: 444,
          medium: 963,
          large: 972,
          left: 81,
          right: 600,
          top: 90,
          middle: 618,
          bottom: 1146,
        },
      };
    }

    let message =
      title || '开始之前，请先前往桌面，截取空白界面的截图。然后回来继续';
    let exitOptions = ['我已截图', '前去截图 >'];
    let shouldExit = await this.generateAlert(message, exitOptions);
    if (shouldExit) return;

    // Get screenshot and determine phone size.
    let img = await Photos.fromLibrary();
    let height = img.size.height;
    let phone = phoneSizes()[height];
    if (!phone) {
      message = '好像您选择的照片不是正确的截图，请先前往桌面';
      await this.generateAlert(message, ['我已知晓']);
      return;
    }

    // Prompt for widget size and position.
    message = '截图中要设置透明背景组件的尺寸类型是？';
    let sizes = ['小尺寸', '中尺寸', '大尺寸'];
    let size = await this.generateAlert(message, sizes);
    let widgetSize = sizes[size];

    message = '要设置透明背景的小组件在哪个位置？';
    message +=
      height === 1136
        ? ' （备注：当前设备只支持两行小组件，所以下边选项中的「中间」和「底部」的选项是一致的）'
        : '';

    // Determine image crop based on phone size.
    let crop = { w: '', h: '', x: '', y: '' };
    if (widgetSize === '小尺寸') {
      crop.w = phone.small;
      crop.h = phone.small;
      let positions = [
        '左上角',
        '右上角',
        '中间左',
        '中间右',
        '左下角',
        '右下角',
      ];
      let _posotions = [
        'Top left',
        'Top right',
        'Middle left',
        'Middle right',
        'Bottom left',
        'Bottom right',
      ];
      let position = await this.generateAlert(message, positions);

      // Convert the two words into two keys for the phone size dictionary.
      let keys = _posotions[position].toLowerCase().split(' ');
      crop.y = phone[keys[0]];
      crop.x = phone[keys[1]];
    } else if (widgetSize === '中尺寸') {
      crop.w = phone.medium;
      crop.h = phone.small;

      // Medium and large widgets have a fixed x-value.
      crop.x = phone.left;
      let positions = ['顶部', '中间', '底部'];
      let _positions = ['Top', 'Middle', 'Bottom'];
      let position = await this.generateAlert(message, positions);
      let key = _positions[position].toLowerCase();
      crop.y = phone[key];
    } else if (widgetSize === '大尺寸') {
      crop.w = phone.medium;
      crop.h = phone.large;
      crop.x = phone.left;
      let positions = ['顶部', '底部'];
      let position = await this.generateAlert(message, positions);

      // Large widgets at the bottom have the "middle" y-value.
      crop.y = position ? phone.middle : phone.top;
    }

    // Crop image and finalize the widget.
    return cropImage(img, new Rect(crop.x, crop.y, crop.w, crop.h));
  }

  setLightAndDark = async (title, desc, light, dark) => {
    try {
      const a = new Alert();
      a.title = '白天和夜间' + title;
      a.message = !desc ? '请自行去网站上搜寻颜色（Hex 颜色）' : desc;
      a.addTextField('白天', (this.settings[light] || '') + '');
      a.addTextField('夜间', (this.settings[dark] || '') + '');
      a.addAction('确定');
      a.addCancelAction('取消');
      const id = await a.presentAlert();
      if (id === -1) return;
      this.settings[light] = a.textFieldValue(0);
      this.settings[dark] = a.textFieldValue(1);
      // 保存到本地
      this.saveSettings();
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * 弹出输入框
   * @param title 标题
   * @param desc  描述
   * @param opt   属性
   * @returns {Promise<void>}
   */
  setAlertInput = async (title, desc, opt = {}, isSave = true) => {
    const a = new Alert();
    a.title = title;
    a.message = !desc ? '' : desc;
    Object.keys(opt).forEach((key) => {
      a.addTextField(opt[key], this.settings[key]);
    });
    a.addAction('确定');
    a.addCancelAction('取消');
    const id = await a.presentAlert();
    if (id === -1) return;
    const data = {};
    Object.keys(opt).forEach((key, index) => {
      data[key] = a.textFieldValue(index);
    });
    // 保存到本地
    if (isSave) {
      this.settings = { ...this.settings, ...data };
      return this.saveSettings();
    }
    return data;
  };

  /**
   * 设置当前项目的 boxJS 缓存
   * @param opt key value
   * @returns {Promise<void>}
   */
  setCacheBoxJSData = async (opt = {}) => {
    const options = ['取消', '确定'];
    const message = '代理缓存仅支持 BoxJS 相关的代理！';
    const index = await this.generateAlert(message, options);
    if (index === 0) return;
    try {
      const boxJSData = await this.getCache();
      Object.keys(opt).forEach((key) => {
        this.settings[key] = boxJSData[opt[key]] || '';
      });
      // 保存到本地
      this.saveSettings();
    } catch (e) {
      console.log(e);
      this.notify(
        this.name,
        'BoxJS 缓存读取失败！点击查看相关教程',
        'https://chavyleung.gitbook.io/boxjs/awesome/videos',
      );
    }
  };

  /**
   * 设置组件内容
   * @returns {Promise<void>}
   */
  setWidgetConfig = async () => {
    const alert = new Alert();
    alert.title = '内容配置';
    alert.message = '主题设置、刷新时间等';
    alert.addAction('刷新时间');
    alert.addAction('主题设置');
    if (this.useBoxJS) alert.addAction('BoxJS域名');
    alert.addAction('重置所有');
    alert.addCancelAction('取消');
    const actions = [
      async () => {
        await this.setAlertInput(
          '刷新时间（分）',
          '默认刷新时间 30 分钟刷新一次，也可自行手动运行',
          { refreshAfterDate: '分钟' },
        );
      },
      async () => {
        const a = new Alert();
        a.title = '主题设置';
        a.addAction('背景设置');
        a.addAction('背景颜色');
        a.addAction('字体颜色');
        a.addAction('透明背景');
        a.addAction('蒙层透明');
        a.addAction('清空背景');
        a.addCancelAction('取消');
        let i = await a.presentSheet();
        if (i === -1) return;
        const _action = [
          async () => {
            const message = '白天和夜间背景';
            const options = ['白天', '夜间', '取消'];
            const index = await this.generateAlert(message, options);
            if (index === 2) return;
            const backImage = await this.chooseImg();
            if (!backImage || !(await this.verifyImage(backImage))) return;
            if (index === 0) await this.setBackgroundImage(backImage, true);
            if (index === 1)
              await this.setBackgroundNightImage(backImage, true);
          },
          async () =>
            await this.setLightAndDark(
              '背景颜色',
              false,
              'lightBgColor',
              'darkBgColor',
            ),
          async () =>
            await this.setLightAndDark(
              '字体颜色',
              false,
              'lightColor',
              'darkColor',
            ),
          async () => {
            const message =
              '请自行搭配相应的字体颜色。\n' +
              '白天蒙层透明设置为 0\n' +
              '夜间请自行调整参考值 0.26\n' +
              '夜间开启了（深色外观下调暗壁纸）参考值 0.35';
            const options = ['取消', '确定'];
            const index = await this.generateAlert(message, options);
            if (index === 0) return;
            const backImage = await this.getWidgetScreenShot();
            if (backImage) {
              await this.setBackgroundImage(backImage, true);
              await this.setBackgroundNightImage(backImage, true);
            }
          },
          async () => {
            await this.setLightAndDark(
              '透明',
              '若是设置了透明背景，请自行调整',
              'lightOpacity',
              'darkOpacity',
            );
          },
          async () => {
            await this.setBackgroundImage(false, false);
            await this.setBackgroundNightImage(false, true);
          },
        ];
        _action[i] && _action[i].call(this);
      },
      ...(this.useBoxJS
        ? [
            async () => {
              const a = new Alert();
              a.title = 'BoxJS 域名';
              a.addTextField('域名', this.settings.boxjsDomain);
              a.addAction('确定');
              a.addCancelAction('取消');
              const id = await a.presentAlert();
              if (id === -1) return;
              this.settings.boxjsDomain = a.textFieldValue(0);
              // 保存到本地
              this.saveSettings();
            },
          ]
        : []),
      async () => {
        const options = ['取消', '确定'];
        const message = '该操作不可逆，会清空所有组件配置！';
        const index = await this.generateAlert(message, options);
        if (index === 0) return;
        this.settings = {};
        // 保存到本地
        await this.setBackgroundImage(false, false);
        this.saveSettings();
      },
    ];
    const id = await alert.presentAlert();
    if (id === -1) return;
    actions[id] && actions[id].call(this);
  };

  init(widgetFamily = config.widgetFamily) {
    // 组件大小：small,medium,large
    this.widgetFamily = widgetFamily;
    this.SETTING_KEY = this.md5(Script.name());
    //用于配置所有的组件相关设置

    // 文件管理器
    // 提示：缓存数据不要用这个操作，这个是操作源码目录的，缓存建议存放在local temp目录中
    this.FILE_MGR = FileManager[
      module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local'
    ]();
    // 本地，用于存储图片等
    this.FILE_MGR_LOCAL = FileManager.local();
    this.BACKGROUND_KEY = this.FILE_MGR_LOCAL.joinPath(
      this.FILE_MGR_LOCAL.documentsDirectory(),
      'bg_' + this.SETTING_KEY + '.jpg',
    );

    this.BACKGROUND_NIGHT_KEY = this.FILE_MGR_LOCAL.joinPath(
      this.FILE_MGR_LOCAL.documentsDirectory(),
      'bg_' + this.SETTING_KEY + 'night.jpg',
    );

    this.settings = this.getSettings();
    this.settings.lightColor = this.settings.lightColor || '#000';
    this.settings.darkColor = this.settings.darkColor || '#fff';
    this.settings.boxjsDomain = this.settings.boxjsDomain || 'boxjs.net';
    this.settings.refreshAfterDate = this.settings.refreshAfterDate || '30';
    this.settings.lightOpacity = this.settings.lightOpacity || '0.4';
    this.settings.darkOpacity = this.settings.darkOpacity || '0.7';
    this.prefix = this.settings.boxjsDomain;

    const lightBgColor = this.getColors(this.settings.lightBgColor);
    const darkBgColor = this.getColors(this.settings.darkBgColor);
    if (lightBgColor.length > 1 || darkBgColor.length > 1) {
      this.backGroundColor = !Device.isUsingDarkAppearance()
        ? this.getBackgroundColor(lightBgColor || '#fff')
        : this.getBackgroundColor(darkBgColor || '#000');
    } else {
      this.backGroundColor = Color.dynamic(
        new Color(this.settings.lightBgColor || '#fff'),
        new Color(this.settings.darkBgColor || '#000'),
      );
    }
    this.widgetColor = Color.dynamic(
      new Color(this.settings.lightColor),
      new Color(this.settings.darkColor),
    );
  }

  getColors = (color = '') => {
    const colors = color.split(',');
    return colors;
  };

  getBackgroundColor = (colors) => {
    const locations = [];
    const linearColor = new LinearGradient();
    const cLen = colors.length;
    linearColor.colors = colors.map((item, index) => {
      locations.push(Math.floor(((index + 1) / cLen) * 100) / 100);
      return new Color(item, 1);
    });
    linearColor.locations = locations;
    return linearColor;
  };

  /**
   * 注册点击操作菜单
   * @param {string} name 操作函数名
   * @param {func} func 点击后执行的函数
   */
  registerAction(name, func) {
    this._actions[name] = func.bind(this);
  }

  /**
   * base64 编码字符串
   * @param {string} str 要编码的字符串
   */
  base64Encode(str) {
    const data = Data.fromString(str);
    return data.toBase64String();
  }

  /**
   * base64解码数据 返回字符串
   * @param {string} b64 base64编码的数据
   */
  base64Decode(b64) {
    const data = Data.fromBase64String(b64);
    return data.toRawString();
  }

  /**
   * md5 加密字符串
   * @param {string} str 要加密成md5的数据
   */
  md5(str) {
    function d(n, t) {
      var r = (65535 & n) + (65535 & t);
      return (((n >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
    }

    function f(n, t, r, e, o, u) {
      return d(((c = d(d(t, n), d(e, u))) << (f = o)) | (c >>> (32 - f)), r);
      var c, f;
    }

    function l(n, t, r, e, o, u, c) {
      return f((t & r) | (~t & e), n, t, o, u, c);
    }

    function v(n, t, r, e, o, u, c) {
      return f((t & e) | (r & ~e), n, t, o, u, c);
    }

    function g(n, t, r, e, o, u, c) {
      return f(t ^ r ^ e, n, t, o, u, c);
    }

    function m(n, t, r, e, o, u, c) {
      return f(r ^ (t | ~e), n, t, o, u, c);
    }

    function i(n, t) {
      var r, e, o, u;
      (n[t >> 5] |= 128 << t % 32), (n[14 + (((t + 64) >>> 9) << 4)] = t);
      for (
        var c = 1732584193,
          f = -271733879,
          i = -1732584194,
          a = 271733878,
          h = 0;
        h < n.length;
        h += 16
      )
        (c = l((r = c), (e = f), (o = i), (u = a), n[h], 7, -680876936)),
          (a = l(a, c, f, i, n[h + 1], 12, -389564586)),
          (i = l(i, a, c, f, n[h + 2], 17, 606105819)),
          (f = l(f, i, a, c, n[h + 3], 22, -1044525330)),
          (c = l(c, f, i, a, n[h + 4], 7, -176418897)),
          (a = l(a, c, f, i, n[h + 5], 12, 1200080426)),
          (i = l(i, a, c, f, n[h + 6], 17, -1473231341)),
          (f = l(f, i, a, c, n[h + 7], 22, -45705983)),
          (c = l(c, f, i, a, n[h + 8], 7, 1770035416)),
          (a = l(a, c, f, i, n[h + 9], 12, -1958414417)),
          (i = l(i, a, c, f, n[h + 10], 17, -42063)),
          (f = l(f, i, a, c, n[h + 11], 22, -1990404162)),
          (c = l(c, f, i, a, n[h + 12], 7, 1804603682)),
          (a = l(a, c, f, i, n[h + 13], 12, -40341101)),
          (i = l(i, a, c, f, n[h + 14], 17, -1502002290)),
          (c = v(
            c,
            (f = l(f, i, a, c, n[h + 15], 22, 1236535329)),
            i,
            a,
            n[h + 1],
            5,
            -165796510,
          )),
          (a = v(a, c, f, i, n[h + 6], 9, -1069501632)),
          (i = v(i, a, c, f, n[h + 11], 14, 643717713)),
          (f = v(f, i, a, c, n[h], 20, -373897302)),
          (c = v(c, f, i, a, n[h + 5], 5, -701558691)),
          (a = v(a, c, f, i, n[h + 10], 9, 38016083)),
          (i = v(i, a, c, f, n[h + 15], 14, -660478335)),
          (f = v(f, i, a, c, n[h + 4], 20, -405537848)),
          (c = v(c, f, i, a, n[h + 9], 5, 568446438)),
          (a = v(a, c, f, i, n[h + 14], 9, -1019803690)),
          (i = v(i, a, c, f, n[h + 3], 14, -187363961)),
          (f = v(f, i, a, c, n[h + 8], 20, 1163531501)),
          (c = v(c, f, i, a, n[h + 13], 5, -1444681467)),
          (a = v(a, c, f, i, n[h + 2], 9, -51403784)),
          (i = v(i, a, c, f, n[h + 7], 14, 1735328473)),
          (c = g(
            c,
            (f = v(f, i, a, c, n[h + 12], 20, -1926607734)),
            i,
            a,
            n[h + 5],
            4,
            -378558,
          )),
          (a = g(a, c, f, i, n[h + 8], 11, -2022574463)),
          (i = g(i, a, c, f, n[h + 11], 16, 1839030562)),
          (f = g(f, i, a, c, n[h + 14], 23, -35309556)),
          (c = g(c, f, i, a, n[h + 1], 4, -1530992060)),
          (a = g(a, c, f, i, n[h + 4], 11, 1272893353)),
          (i = g(i, a, c, f, n[h + 7], 16, -155497632)),
          (f = g(f, i, a, c, n[h + 10], 23, -1094730640)),
          (c = g(c, f, i, a, n[h + 13], 4, 681279174)),
          (a = g(a, c, f, i, n[h], 11, -358537222)),
          (i = g(i, a, c, f, n[h + 3], 16, -722521979)),
          (f = g(f, i, a, c, n[h + 6], 23, 76029189)),
          (c = g(c, f, i, a, n[h + 9], 4, -640364487)),
          (a = g(a, c, f, i, n[h + 12], 11, -421815835)),
          (i = g(i, a, c, f, n[h + 15], 16, 530742520)),
          (c = m(
            c,
            (f = g(f, i, a, c, n[h + 2], 23, -995338651)),
            i,
            a,
            n[h],
            6,
            -198630844,
          )),
          (a = m(a, c, f, i, n[h + 7], 10, 1126891415)),
          (i = m(i, a, c, f, n[h + 14], 15, -1416354905)),
          (f = m(f, i, a, c, n[h + 5], 21, -57434055)),
          (c = m(c, f, i, a, n[h + 12], 6, 1700485571)),
          (a = m(a, c, f, i, n[h + 3], 10, -1894986606)),
          (i = m(i, a, c, f, n[h + 10], 15, -1051523)),
          (f = m(f, i, a, c, n[h + 1], 21, -2054922799)),
          (c = m(c, f, i, a, n[h + 8], 6, 1873313359)),
          (a = m(a, c, f, i, n[h + 15], 10, -30611744)),
          (i = m(i, a, c, f, n[h + 6], 15, -1560198380)),
          (f = m(f, i, a, c, n[h + 13], 21, 1309151649)),
          (c = m(c, f, i, a, n[h + 4], 6, -145523070)),
          (a = m(a, c, f, i, n[h + 11], 10, -1120210379)),
          (i = m(i, a, c, f, n[h + 2], 15, 718787259)),
          (f = m(f, i, a, c, n[h + 9], 21, -343485551)),
          (c = d(c, r)),
          (f = d(f, e)),
          (i = d(i, o)),
          (a = d(a, u));
      return [c, f, i, a];
    }

    function a(n) {
      for (var t = '', r = 32 * n.length, e = 0; e < r; e += 8)
        t += String.fromCharCode((n[e >> 5] >>> e % 32) & 255);
      return t;
    }

    function h(n) {
      var t = [];
      for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1)
        t[e] = 0;
      for (var r = 8 * n.length, e = 0; e < r; e += 8)
        t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32;
      return t;
    }

    function e(n) {
      for (var t, r = '0123456789abcdef', e = '', o = 0; o < n.length; o += 1)
        (t = n.charCodeAt(o)),
          (e += r.charAt((t >>> 4) & 15) + r.charAt(15 & t));
      return e;
    }

    function r(n) {
      return unescape(encodeURIComponent(n));
    }

    function o(n) {
      return a(i(h((t = r(n))), 8 * t.length));
      var t;
    }

    function u(n, t) {
      return (function (n, t) {
        var r,
          e,
          o = h(n),
          u = [],
          c = [];
        for (
          u[15] = c[15] = void 0,
            16 < o.length && (o = i(o, 8 * n.length)),
            r = 0;
          r < 16;
          r += 1
        )
          (u[r] = 909522486 ^ o[r]), (c[r] = 1549556828 ^ o[r]);
        return (
          (e = i(u.concat(h(t)), 512 + 8 * t.length)), a(i(c.concat(e), 640))
        );
      })(r(n), r(t));
    }

    function t(n, t, r) {
      return t ? (r ? u(t, n) : e(u(t, n))) : r ? o(n) : e(o(n));
    }

    return t(str);
  }

  /**
   * 渲染标题内容
   * @param {object} widget 组件对象
   * @param {string} icon 图标地址
   * @param {string} title 标题内容
   * @param {bool|color} color 字体的颜色（自定义背景时使用，默认系统）
   */
  async renderHeader(widget, icon, title, color = false) {
    let header = widget.addStack();
    header.centerAlignContent();
    try {
      const image = await this.$request.get(icon, 'IMG');
      let _icon = header.addImage(image);
      _icon.imageSize = new Size(14, 14);
      _icon.cornerRadius = 4;
    } catch (e) {
      console.log(e);
    }
    header.addSpacer(10);
    let _title = header.addText(title);
    if (color) _title.textColor = color;
    _title.textOpacity = 0.7;
    _title.font = Font.boldSystemFont(12);
    _title.lineLimit = 1;
    widget.addSpacer(15);
    return widget;
  }

  /**
   * @param message 描述内容
   * @param options 按钮
   * @returns {Promise<number>}
   */

  async generateAlert(message, options) {
    let alert = new Alert();
    alert.message = message;

    for (const option of options) {
      alert.addAction(option);
    }
    return await alert.presentAlert();
  }

  /**
   * 弹出一个通知
   * @param {string} title 通知标题
   * @param {string} body 通知内容
   * @param {string} url 点击后打开的URL
   */
  async notify(title, body, url, opts = {}) {
    let n = new Notification();
    n = Object.assign(n, opts);
    n.title = title;
    n.body = body;
    if (url) n.openURL = url;
    return await n.schedule();
  }

  /**
   * 给图片加一层半透明遮罩
   * @param {Image} img 要处理的图片
   * @param {string} color 遮罩背景颜色
   * @param {float} opacity 透明度
   */
  async shadowImage(img, color = '#000000', opacity = 0.7) {
    if (!img) return;
    if (opacity === 0) return img;
    let ctx = new DrawContext();
    // 获取图片的尺寸
    ctx.size = img.size;

    ctx.drawImageInRect(
      img,
      new Rect(0, 0, img.size['width'], img.size['height']),
    );
    ctx.setFillColor(new Color(color, opacity));
    ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']));
    return await ctx.getImage();
  }

  /**
   * 获取当前插件的设置
   * @param {boolean} json 是否为json格式
   */
  getSettings(json = true) {
    let res = json ? {} : '';
    let cache = '';
    if (Keychain.contains(this.SETTING_KEY)) {
      cache = Keychain.get(this.SETTING_KEY);
    }
    if (json) {
      try {
        res = JSON.parse(cache);
      } catch (e) {}
    } else {
      res = cache;
    }

    return res;
  }

  /**
   * 存储当前设置
   * @param {bool} notify 是否通知提示
   */
  saveSettings(notify = true) {
    let res =
      typeof this.settings === 'object'
        ? JSON.stringify(this.settings)
        : String(this.settings);
    Keychain.set(this.SETTING_KEY, res);
    if (notify) this.notify('设置成功', '桌面组件稍后将自动刷新');
  }

  /**
   * 获取当前插件是否有自定义背景图片
   * @reutrn img | false
   */
  getBackgroundImage() {
    let result = null;
    if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
      result = Image.fromFile(this.BACKGROUND_KEY);
    }
    if (
      Device.isUsingDarkAppearance() &&
      this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_NIGHT_KEY)
    ) {
      result = Image.fromFile(this.BACKGROUND_NIGHT_KEY);
    }
    return result;
  }

  /**
   * 设置当前组件的背景图片
   * @param {Image} img
   */
  setBackgroundImage(img, notify = true) {
    if (!img) {
      // 移除背景
      if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
        this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY);
      }
      if (notify)
        this.notify('移除成功', '小组件白天背景图片已移除，稍后刷新生效');
    } else {
      // 设置背景
      // 全部设置一遍，
      this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY, img);
      if (notify)
        this.notify('设置成功', '小组件白天背景图片已设置！稍后刷新生效');
    }
  }

  setBackgroundNightImage(img, notify = true) {
    if (!img) {
      // 移除背景
      if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_NIGHT_KEY)) {
        this.FILE_MGR_LOCAL.remove(this.BACKGROUND_NIGHT_KEY);
      }
      if (notify)
        this.notify('移除成功', '小组件夜间背景图片已移除，稍后刷新生效');
    } else {
      // 设置背景
      // 全部设置一遍，
      this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_NIGHT_KEY, img);
      if (notify)
        this.notify('设置成功', '小组件夜间背景图片已设置！稍后刷新生效');
    }
  }

  getRandomArrayElements(arr, count) {
    let shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp,
      index;
    min = min > 0 ? min : 0;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }

  textFormat = {
    defaultText: { size: 14, font: 'regular', color: this.widgetColor },
    battery: { size: 10, font: 'bold', color: this.widgetColor },
    title: { size: 16, font: 'semibold', color: this.widgetColor },
    SFMono: { size: 12, font: 'SF Mono', color: this.widgetColor },
  };

  provideFont = (fontName, fontSize) => {
    const fontGenerator = {
      ultralight: function () {
        return Font.ultraLightSystemFont(fontSize);
      },
      light: function () {
        return Font.lightSystemFont(fontSize);
      },
      regular: function () {
        return Font.regularSystemFont(fontSize);
      },
      medium: function () {
        return Font.mediumSystemFont(fontSize);
      },
      semibold: function () {
        return Font.semiboldSystemFont(fontSize);
      },
      bold: function () {
        return Font.boldSystemFont(fontSize);
      },
      heavy: function () {
        return Font.heavySystemFont(fontSize);
      },
      black: function () {
        return Font.blackSystemFont(fontSize);
      },
      italic: function () {
        return Font.italicSystemFont(fontSize);
      },
    };

    const systemFont = fontGenerator[fontName];
    if (systemFont) {
      return systemFont();
    }
    return new Font(fontName, fontSize);
  };

  provideText = (string, container, format) => {
    const textItem = container.addText(string);
    const textFont = format.font;
    const textSize = format.size;
    const textColor = format.color;

    textItem.font = this.provideFont(textFont, textSize);
    textItem.textColor = textColor;
    return textItem;
  };
}

// @base.end
const Runing = async (Widget, default_args = '', isDebug = true, extra) => {
  let M = null;
  // 判断hash是否和当前设备匹配
  if (config.runsInWidget) {
    M = new Widget(args.widgetParameter || '');

    if (extra) {
      Object.keys(extra).forEach((key) => {
        M[key] = extra[key];
      });
    }
    const W = await M.render();
    try {
      if (M.settings.refreshAfterDate) {
        W.refreshAfterDate = new Date(
          new Date() + 1000 * 60 * parseInt(M.settings.refreshAfterDate),
        );
      }
    } catch (e) {
      console.log(e);
    }
    if (W) {
      Script.setWidget(W);
      Script.complete();
    }
  } else {
    let { act, data, __arg, __size } = args.queryParameters;
    M = new Widget(__arg || default_args || '');
    if (extra) {
      Object.keys(extra).forEach((key) => {
        M[key] = extra[key];
      });
    }
    if (__size) M.init(__size);
    if (!act || !M['_actions']) {
      // 弹出选择菜单
      const actions = M['_actions'];
      const _actions = [
        // 预览组件
        async (debug = false) => {
          let a = new Alert();
          a.title = '预览组件';
          a.message = '测试桌面组件在各种尺寸下的显示效果';
          a.addAction('小尺寸 Small');
          a.addAction('中尺寸 Medium');
          a.addAction('大尺寸 Large');
          a.addAction('全部 All');
          a.addCancelAction('取消操作');
          const funcs = [];
          if (debug) {
            for (let _ in actions) {
              a.addAction(_);
              funcs.push(actions[_].bind(M));
            }
            a.addDestructiveAction('停止调试');
          }
          let i = await a.presentSheet();
          if (i === -1) return;
          let w;
          switch (i) {
            case 0:
              M.widgetFamily = 'small';
              w = await M.render();
              w && (await w.presentSmall());
              break;
            case 1:
              M.widgetFamily = 'medium';
              w = await M.render();
              w && (await w.presentMedium());
              break;
            case 2:
              M.widgetFamily = 'large';
              w = await M.render();
              w && (await w.presentLarge());
              break;
            case 3:
              M.widgetFamily = 'small';
              w = await M.render();
              w && (await w.presentSmall());
              M.widgetFamily = 'medium';
              w = await M.render();
              w && (await w.presentMedium());
              M.widgetFamily = 'large';
              w = await M.render();
              w && (await w.presentLarge());
              break;
            default:
              const func = funcs[i - 4];
              if (func) await func();
              break;
          }

          return i;
        },
      ];
      const alert = new Alert();
      alert.title = M.name;
      alert.message = M.desc;
      alert.addAction('预览组件');
      for (let _ in actions) {
        alert.addAction(_);
        _actions.push(actions[_]);
      }
      alert.addCancelAction('取消操作');
      const idx = await alert.presentSheet();
      if (_actions[idx]) {
        const func = _actions[idx];
        await func();
      }
      return;
    }
    let _tmp = act
      .split('-')
      .map((_) => _[0].toUpperCase() + _.substr(1))
      .join('');
    let _act = 'action' + _tmp;
    if (M[_act] && typeof M[_act] === 'function') {
      const func = M[_act].bind(M);
      await func(data);
    }
  }
};

module.exports = { DmYY, Runing };
~~~
如图所示。  
![DmYY](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/E610F3A6-F706-4C52-ADED-47D674BA380B_L0_001_origin.IMG_0451.PNG)  
### 新建电信小组件
之后复制下面的代码去新建电信流量话费信息小组件。  
~~~
// 添加require，是为了vscode中可以正确引入包，以获得自动补全等功能
if (typeof require === 'undefined') require = importModule;
const {DmYY, Runing} = require('./DmYY');

// @组件代码开始
class Widget extends DmYY {
  constructor(arg) {
    super(arg);
    this.name = '中国电信';
    this.en = 'ChinaTelecom';
    this.Run();
  }

  cookie = '';
  authToken = '';
  fgCircleColor = Color.dynamic(new Color('#dddef3'), new Color('#fff'));
  percentColor = this.widgetColor;
  textColor1 = Color.dynamic(new Color('#333'), new Color('#fff'));
  textColor2 = this.widgetColor;

  circleColor1 = new Color('#ffbb73');
  circleColor2 = new Color('#ff0029');
  circleColor3 = new Color('#00b800');
  circleColor4 = new Color('#8376f9');
  iconColor = new Color('#827af1');

  format = (str) => {
    return parseInt(str) >= 10 ? str : `0${str}`;
  };

  date = new Date();
  arrUpdateTime = [
    this.format(this.date.getMonth() + 1),
    this.format(this.date.getDate()),
    this.format(this.date.getHours()),
    this.format(this.date.getMinutes()),
  ];

  // percent 的计算方式，剩余/总量 * 100 = 百分比| 百分比 * 3.6 ，为显示进度。
  phoneBill = {
    percent: 0,
    label: '话费剩余',
    count: 0,
    unit: '元',
    icon: 'yensign.circle',
    circleColor: this.circleColor1,
  };

  flow = {
    percent: 0,
    label: '流量剩余',
    count: 0,
    unit: 'M',
    icon: 'waveform.path.badge.minus',
    circleColor: this.circleColor2,
  };

  voice = {
    percent: 0,
    label: '语音剩余',
    count: 0,
    unit: '分钟',
    icon: 'mic',
    circleColor: this.circleColor3,
  };

  updateTime = {
    percent: 0,
    label: '更新时间',
    count: `${this.arrUpdateTime[2]}:${this.arrUpdateTime[3]}`,
    unit: '',
    urlIcon: 'https://raw.githubusercontent.com/Orz-3/mini/master/10000.png',
    circleColor: this.circleColor4,
  };

  canvSize = 100;
  canvWidth = 4; // circle thickness
  canvRadius = 100; // circle radius
  dayRadiusOffset = 63;
  canvTextSize = 38;

  options = {
    headers: {
      // type: "alipayMiniApp",
      // "User-Agent": "TYUserCenter/2.8 (iPhone; iOS 14.0; Scale/3.00)",
    },
    // body: "t=tysuit",
    method: 'POST',
  };

  fetchUri = {
    detail: 'https://e.189.cn/store/user/package_detail.do',
    balance: 'https://e.189.cn/store/user/balance_new.do',
  };

  init = async () => {
    try {
      const nowHours = this.date.getHours();
      const updateHours = nowHours > 12 ? 24 : 12;
      this.updateTime.percent = Math.floor((nowHours / updateHours) * 100);
      await this.getData();
    } catch (e) {
      console.log(e);
    }
  };

  // MB 和 GB 自动转换
  formatFlow(number) {
    const n = number / 1024;
    if (n < 1024) {
      return {count: n.toFixed(2), unit: 'M'};
    }
    return {count: (n / 1024).toFixed(2), unit: 'G'};
  }

  getData = async () => {
    const detail = await this.http({
      url: this.fetchUri.detail,
      ...this.options,
    });
    console.log(detail);
    const balance = await this.http({
      url: this.fetchUri.balance,
      ...this.options,
    });

    if (detail.result === 0) {
      // 套餐分钟数
      this.voice.percent = Math.floor(
          (parseInt(detail.voiceBalance) / parseInt(detail.voiceAmount)) * 100,
      );
      this.voice.count = detail.voiceBalance;
      console.log(detail.items);
      if (!detail.count && !detail.total) {
        detail.items.forEach((data) => {
          if (data.offerType !== 19) {
            data.items.forEach((item) => {
              if (item.unitTypeId === '3') {
                if (item.usageAmount !== '0' && item.balanceAmount !== '0') {
                  this.flow.percent = Math.floor(
                      (item.balanceAmount / (item.ratableAmount || 1)) * 100,
                  );
                  const flow = this.formatFlow(item.balanceAmount);
                  this.flow.count = flow.count;
                  this.flow.unit = flow.unit;
                  this.flow.max = item.ratableAmount;
                }
              }
            });
          }
        });
      } else {
        this.flow.percent = Math.floor(
            (detail.balance / (detail.total || 1)) * 100,
        );
        const flow = this.formatFlow(detail.balance);
        this.flow.count = flow.count;
        this.flow.unit = flow.unit;
        this.flow.max = detail.total;
      }

    }
    if (balance.result === 0) {
      // 余额
      this.phoneBill.count = parseFloat(
          parseInt(balance.totalBalanceAvailable) / 100).toFixed(2)
    }
    this.phoneBill.percent = Math.floor((this.phoneBill.count / 100) * 100);
  };

  makeCanvas() {
    const canvas = new DrawContext();
    canvas.opaque = false;
    canvas.respectScreenScale = true;
    canvas.size = new Size(this.canvSize, this.canvSize);
    return canvas;
  }

  makeCircle(canvas, radiusOffset, degree, color) {
    let ctr = new Point(this.canvSize / 2, this.canvSize / 2);
    // Outer circle
    const bgx = ctr.x - (this.canvRadius - radiusOffset);
    const bgy = ctr.y - (this.canvRadius - radiusOffset);
    const bgd = 2 * (this.canvRadius - radiusOffset);
    const bgr = new Rect(bgx, bgy, bgd, bgd);
    canvas.setStrokeColor(this.fgCircleColor);
    canvas.setLineWidth(3);
    canvas.strokeEllipse(bgr);
    // Inner circle
    canvas.setFillColor(color);
    for (let t = 0; t < degree; t++) {
      const rect_x =
          ctr.x +
          (this.canvRadius - radiusOffset) * this.sinDeg(t) -
          this.canvWidth / 2;
      const rect_y =
          ctr.y -
          (this.canvRadius - radiusOffset) * this.cosDeg(t) -
          this.canvWidth / 2;
      const rect_r = new Rect(rect_x, rect_y, this.canvWidth, this.canvWidth);
      canvas.fillEllipse(rect_r);
    }
  }

  drawText(txt, canvas, txtOffset, fontSize) {
    const txtRect = new Rect(
        this.canvTextSize / 2.6 - 20,
        txtOffset - this.canvTextSize / 1.4,
        this.canvSize,
        this.canvTextSize,
    );
    canvas.setTextColor(this.percentColor);
    canvas.setFont(Font.boldSystemFont(fontSize));
    canvas.setTextAlignedCenter();
    canvas.drawTextInRect(`${txt}`, txtRect);
  }

  drawPointText(txt, canvas, txtPoint, fontSize) {
    canvas.setTextColor(this.percentColor);
    canvas.setFont(Font.boldSystemFont(fontSize));
    canvas.drawText(txt, txtPoint);
  }

  sinDeg(deg) {
    return Math.sin((deg * Math.PI) / 180);
  }

  cosDeg(deg) {
    return Math.cos((deg * Math.PI) / 180);
  }

  setCircleText = (stack, data) => {
    const stackCircle = stack.addStack();
    const canvas = this.makeCanvas();
    stackCircle.size = new Size(73, 73);//上下两组数据间隔
    this.makeCircle(
        canvas,
        this.dayRadiusOffset,
        data.percent * 3.6,
        data.circleColor,
    );

    this.drawText(data.percent, canvas, 75, 17);
    this.drawPointText(`%`, canvas, new Point(60, 50), 14);//百分号上下大小调节
    stackCircle.backgroundImage = canvas.getImage();

    stackCircle.setPadding(20, 0, 0, 0);
    stackCircle.addSpacer();
    const icon = data.urlIcon
        ? {image: data.icon}
        : SFSymbol.named(data.icon);
    const imageIcon = stackCircle.addImage(icon.image);
    imageIcon.tintColor = this.iconColor;
    imageIcon.imageSize = new Size(14, 13);
    // canvas.drawImageInRect(icon.image, new Rect(110, 80, 60, 60));
    stackCircle.addSpacer();

    stack.addSpacer(5);
    const stackDesc = stack.addStack();
    stackDesc.size = new Size(74, 69);//横向间隔调整
    stackDesc.centerAlignContent();
    stackDesc.layoutVertically();
    stackDesc.addSpacer(10);
    const textLabel = this.textFormat.defaultText;
    textLabel.size = 13;
    textLabel.color = this.textColor2;
    this.provideText(data.label, stackDesc, textLabel);
    stackDesc.addSpacer(10);

    const stackDescFooter = stackDesc.addStack();
    stackDescFooter.centerAlignContent();
    const textCount = this.textFormat.title;
    textCount.size = 16;
    textCount.color = this.textColor1;
    this.provideText(`${data.count}`, stackDescFooter, textCount);
    stackDescFooter.addSpacer(2);
    this.provideText(data.unit, stackDescFooter, textLabel);
  };

  renderSmall = async (w) => {
    w.setPadding(5, 5, 5, 5);
    const stackBody = w.addStack();
    stackBody.layoutVertically();
    const stackTop = stackBody.addStack();
    this.setCircleText(stackTop, this.phoneBill);
    const stackBottom = stackBody.addStack();
    this.setCircleText(stackBottom, this.flow);

    const stackFooter = stackBody.addStack();
    stackFooter.addSpacer();
    const text = this.textFormat.defaultText;
    text.color = new Color('#aaa');
    this.provideText(
        `电信更新：${this.arrUpdateTime[2]}:${this.arrUpdateTime[3]}`,
        stackFooter,
        text,
    );
    stackFooter.addSpacer();
    return w;
  };

  renderMedium = async (w) => {
    const stackBody = w.addStack();
    stackBody.layoutVertically();
    const stackTop = stackBody.addStack();
    this.setCircleText(stackTop, this.phoneBill);
    this.setCircleText(stackTop, this.flow);
    const stackBottom = stackBody.addStack();
    this.setCircleText(stackBottom, this.voice);
    this.updateTime.icon = await this.$request.get(
        this.updateTime.urlIcon,
        'IMG',
    );
    this.setCircleText(stackBottom, this.updateTime);
    return w;
  };

  renderLarge = async (w) => {
    return await this.renderMedium(w);
  };

  renderWebView = async () => {
    const webView = new WebView();
    const url = 'https://e.189.cn/index.do';
    await webView.loadURL(url);
    await webView.present(false);

    const request = new Request(this.fetchUri.detail);
    request.method = 'POST';
    const response = await request.loadJSON();
    console.log(response);
    if (response.result === -10001) {
      const index = await this.generateAlert('未获取到用户信息', [
        '取消',
        '重试',
      ]);
      if (index === 0) return;
      await this.renderWebView();
    } else {
      const cookies = request.response.cookies;
      let cookie = [];
      cookie = cookies.map((item) => `${item.name}=${item.value}`);
      cookie = cookie.join('; ');
      this.settings.cookie = cookie;
      this.saveSettings();
    }
  };

  Run() {
    if (config.runsInApp) {
      const widgetInitConfig = {cookie: 'china_telecom_cookie'};
      this.registerAction('颜色配置', async () => {
        await this.setAlertInput(
            `${this.name}颜色配置`,
            '进度条颜色|底圈颜色\n图标颜色|比值颜色|值颜色',
            {
              step1: '进度颜色 1',
              step2: '进度颜色 2',
              step3: '进度颜色 3',
              step4: '进度颜色 4',
              inner: '底圈颜色',
              icon: '图标颜色',
              percent: '比值颜色',
              value: '值颜色',
            },
        );
      });
      this.registerAction('账号设置', async () => {
        const index = await this.generateAlert('设置账号信息', [
          '取消',
          '网站登录',
        ]);
        if (index === 0) return;
        await this.renderWebView();
      });
      this.registerAction('代理缓存', async () => {
        await this.setCacheBoxJSData(widgetInitConfig);
      });
      this.registerAction('基础设置', this.setWidgetConfig);
    }
    const {
      step1,
      step2,
      step3,
      step4,
      inner,
      icon,
      percent,
      value,
      // authToken,
      cookie,
    } = this.settings;
    this.fgCircleColor = inner ? new Color(inner) : this.fgCircleColor;
    this.textColor1 = value ? new Color(value) : this.textColor1;
    this.phoneBill.circleColor = step1 ? new Color(step1) : this.circleColor1;
    this.flow.circleColor = step2 ? new Color(step2) : this.circleColor2;
    this.voice.circleColor = step3 ? new Color(step3) : this.circleColor3;
    this.updateTime.circleColor = step4 ? new Color(step4) : this.circleColor4;

    this.iconColor = icon ? new Color(icon) : this.iconColor;
    this.percentColor = percent ? new Color(percent) : this.percentColor;

    this.cookie = cookie;
    if (this.cookie) this.options.headers.cookie = this.cookie;
    // this.authToken = authToken;
    // if (this.authToken) this.options.headers.authToken = this.authToken;
  }

  /**
   * 渲染函数，函数名固定
   * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
   */
  async render() {
    await this.init();
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    await this.getWidgetBackgroundImage(widget);
    if (this.widgetFamily === 'medium') {
      return await this.renderMedium(widget);
    } else if (this.widgetFamily === 'large') {
      return await this.renderLarge(widget);
    } else {
      return await this.renderSmall(widget);
    }
  }
}

// @组件代码结束
// await Runing(Widget, "", false); // 正式环境
await Runing(Widget, args.widgetParameter, false); //远程开发环境
~~~
![如图所示](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/A822A1B2-80E7-46B3-B3EC-AD2142797155_L0_001_origin.IMG_0452.PNG)  
新建完成后点击运行，先登录你的天翼账号，然后它就会自动获取登录信息。注意登录信息有时效性，电信的一次登录可以用一星期，时间还算比较长，比较实用。移动和联通也有，但是移动和联通用不了两天又要重新登录。有时候早上登录晚上就又要重新弄，所以不太适合。  
点击账号设置，登录天翼账号。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/894DB470-A312-4C87-B9D4-C3D6B49DF266_L0_001_origin.IMG_0453.PNG)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/4F1A6420-AFA8-41BB-954F-B904E3803555_L0_001_origin.IMG_0454.PNG)  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/230D9AFD-6309-4AAD-8E49-0E994730602B_L0_001_origin.IMG_0455.PNG)  
### 完成
成功获取到登录信息后就可以添加小组件了。  
![](https://cdn.jsdelivr.net/gh/Goopher97/tuchuang@master/img/1E0B6D95-B12F-4B7C-8285-D8415F982909_L0_001_origin.IMG_0456.PNG)  
