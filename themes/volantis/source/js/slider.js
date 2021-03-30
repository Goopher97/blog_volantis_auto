$(function ($) {

    function Slider(options) {
        this.options = {
            container: "slider", // 轮播容器
            imgs: [],
            link: [],
            duration: "normal", // 轮播时长
            delay: 2000, // 延迟
            direction: "left", // 自动轮播方向
            auto: true, // 是否自动轮播
            arrows: true, // 是否显示左右箭头
            width: 520, // 宽
            height: 300 // 高

        }
        this.options = $.extend(this.options, options);
        this.time = null;
        this.nowIndex = 0;
        this.liWidth = this.options.width;
        this.itemNum = this.options.imgs.length;
        this.id = this.options.container;
        this.init();
    }

    Slider.prototype.init = function () {
        this.createDom();
        this.bindEvent();
        this.autoMove();
    }
    Slider.prototype.createDom = function () { // 创建基本的DOM结构
        var _this = this;
        var imgs = this.options.imgs;
        var link = this.options.link;
        var imgX = $("<ul class='" + this.id + "-ul'></ul>");
        var imgLi = "";
        var circleX = $("<div class='" + this.id + "-circlex'><ul class='" + this.id + "-circlex-ul'></ul></div>");
        var circleLi = "";
        for (var i = 0; i < imgs.length; i++) {
            var active = i === 0 ? "active" : "";
            imgLi += "<li style='width: " + _this.liWidth + "px;' class='" + this.id + "-ul-li'><a class='" + this.id + "-ul-li-a' href='" + link[i] + "'>" +
                "<img class='" + this.id + "-ul-li-a-img' src='" + imgs[i] + "'>" +
                "</a></li>";
            if (i === imgs.length - 1) {
                imgLi += "<li class='" + this.id + "-ul-li'>" +
                    "<a class='" + this.id + "-ul-li-a' href='" + link[0] + "'><img class='" + this.id + "-ul-li-a-img' src='" + imgs[0] + "'>" +
                    "</a></li>";
            }
            circleLi += "<li class='" + this.id + "-circlex-ul-li " + active + "'></li>";
        }

        var prev = "<a class='" + this.id + "-btn-prev'><span class='" + this.id + "-btn-prev-span'></span></a>";
        var next = "<a class='" + this.id + "-btn-next'><span class='" + this.id + "-btn-next-span'></span></a>";
        var btnX = $("<div class='" + this.id + "-btn hide'>" + prev + next + "</div>");

        imgX.append(imgLi);
        circleX.children().append(circleLi);

        $("#" + this.id).css({
            width: _this.options.width,
            height: _this.options.height
        });
        $("#" + this.id).append(imgX).append(circleX).append(btnX);
    }
    Slider.prototype.changeStyle = function () {
        $("." + this.id + "-circlex-ul-li.active").removeClass("active");
        if (this.nowIndex === this.itemNum) {
            $("." + this.id + "-circlex-ul-li").eq(0).addClass("active");
        } else {
            $("." + this.id + "-circlex-ul-li").eq(this.nowIndex).addClass("active");
        }
    }
    Slider.prototype.move = function (dir) {
        if (dir === "left") {
            if (this.nowIndex === this.itemNum) {
                this.nowIndex = 0;
                $("." + this.id + "-ul").css("left", 0);
            }
            this.nowIndex++;
        } else if (dir === "right") {
            if (this.nowIndex === 0) {
                this.nowIndex = this.itemNum;
                $("." + this.id + "-ul").css("left", (-this.nowIndex * this.liWidth) + "px");
            }
            this.nowIndex--;
        } else {
            this.nowIndex = dir;
        }
        this.changeStyle();
        this.slider();
    }
    Slider.prototype.autoMove = function () {
        var _this = this;
        if (this.options.auto) {
            clearTimeout(_this.time);
            _this.time = setTimeout(function () {
                _this.move(_this.options.direction);
            }, _this.options.delay);
        }
    }
    Slider.prototype.slider = function () {
        var _this = this;
        $("." + this.id + "-ul").stop().animate({
            left: (-_this.nowIndex * _this.liWidth) + "px",
        }, _this.options.duration, function () {
            _this.autoMove(_this.options.direction);
        });
    }
    Slider.prototype.bindEvent = function () { // 绑定事件
        var _this = this;
        $("." + this.id + "-circlex-ul-li").on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
            _this.move($(this).index());
        });

        // 上一张
        $("." + this.id + "-btn-prev").on("click", function () {
            _this.move("right");
        });

        // 下一张
        $("." + this.id + "-btn-next").on("click", function () {
            _this.move("left");
        });

        if (_this.options.arrows) {
            $("#" + this.id).on("mouseenter", function () {
                $(this).find("." + this.id + "-btn").removeClass("hide");
            }).on("mouseleave", function () {
                $(this).find("." + this.id + "-btn").addClass("hide");
            });
        }
    }

    $.fn.extend({
        sliderImg: function (options) {
            new Slider(options);
        }
    });
}(jQuery))