var imgDataPath = 'https://cdn.jsdelivr.net/gh/Goopher97/Goopher97.github.io/photos/photos.json'; //图片名称高宽信息json文件路径
var imgPath = 'https://cdn.jsdelivr.net/gh/Goopher97/blog_volantis_auto/photos/';  //图片访问路径
var imgMaxNum = 50; //图片显示数量

photo = {
    page: 1,
    offset: imgMaxNum,
    init: function () {
        var that = this;
        $.getJSON(imgDataPath, function (data) {
            that.render(that.page, data);
            //that.scroll(data);
        });
    },
    render: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
            imgNameWithPattern = data[i].split(' ')[1];
            imgName = imgNameWithPattern.split('.')[0]
            imageSize = data[i].split(' ')[0];
            imageX = imageSize.split('.')[0];
            imageY = imageSize.split('.')[1];
            li += '<div class="card">' +
                '<img src="' + imgPath + imgNameWithPattern + ' ">' +
                '</div>'
        }
        $(".photos").append(li);
        this.minigrid();
    },
    minigrid: function() {
        var grid = new Minigrid({
            container: '.photos',
            item: '.card',
            gutter: 12
        });
        grid.mount();
        $(window).resize(function() {
            grid.mount();
        });
    }
}
photo.init();