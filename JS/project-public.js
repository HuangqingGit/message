var textsetTime;    //loading动画定时器
var newssTime;      //newss消息定时器
var loadTimeflag = false;   //loading定时器标志位
var newssTimeflag = false;   //newss定时器标志位
/**
 * loading文字加载动画
 * @param {*show_text   文字参数 非必要 默认为 “正在加载”} show_text 
 * @param {*show        显示还是隐藏true为显示false为隐藏 非必要  默认为true} show 
 */
function loading_text(show_text, show) {
    if (loadTimeflag) {
        clearInterval(textsetTime);   //如果定时器处于工作状态就先关闭定时器
        loadTimeflag = false;
    }
    show_text == '' || show_text == null ? show_text = '正在加载' : show_text;
    show == false || show == 0 ? $('.Loaders').fadeOut(0) : $('.Loaders').fadeIn(0);//如果show为false或者为0就隐藏，否则就显示
    $('.loader_text').html(show_text);
    loadTimeflag = true;
    textsetTime = setInterval(function () {
        var text = $('.loader_text').html();
        var reg = (text.split('·')).length - 1;
        switch (reg) {
            case 0:
                $('.loader_text').html(show_text + " ·");
                break;
            case 1:
                $('.loader_text').html(show_text + " · ·");
                break;
            case 2:
                $('.loader_text').html(show_text + " · · ·");
                break;
            case 3:
                $('.loader_text').html(show_text);
                break;
        }
    }, 500);
}

/**
 * news消息执行函数
 * @param{* 需要显示的内容} cont
 * @param{* 字体颜色} fontcolor
 * @param{* 背景颜色} backcolor
 */
function news(cont, fontcolor, backcolor) {
    var Newsbox = $('.newss');
    var News = $('.information');
    News.stop();
    News.html(cont);
    News.css({
        'color': fontcolor,
        'background': backcolor
    });
    Newsbox.slideDown();
    setTimeout(function () {
        Newsbox.slideUp();
    }, 3000);
    return;
}

/**
 * newss消息执行函数
 * @param{* 需要显示的内容} cont
 * @param{* 字体颜色} fontcolor
 * @param{* 背景颜色} backcolor
 * @param{* icon文字图} icon
 */
function newss(cont, fontcolor, backcolor, icon) {
    if (newssTimeflag) {
        clearTimeout(newssTime);   //如果定时器处于工作状态就先关闭定时器
        newssTimeflag = false;
    }
    var friendly = $('.friendly');
    var friendly_icon = $('#friendly_icon');
    var friendly_text = $('.friendly_text');
    Timeflog = true;
    loading_text('', 0);
    friendly.stop(true, true);
    friendly.fadeToggle();
    friendly_icon.html(icon);
    $('#friendly_icon , .friendly_text').css("color", fontcolor);
    friendly_text.html(cont);
    friendly.css('background', backcolor);
    newssTime = setTimeout(() => {
        friendly.fadeToggle(1000);
        Timeflog = false;
    }, 2500);
}