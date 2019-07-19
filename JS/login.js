//公共变量
var documentWidth = $(window).width();
var documentHight = $(window).height();
var httpRequest = new XMLHttpRequest();//创建对象
var object = new Object();
var Cookie = new Object();
var Data = new Object();
var HTTP;
var cookieTime = 60 * 60 * 1000;    //设置身份有效时间
/**
 * 自动适应窗体大小
 */
window.onresize = function () {
    load();
    if (documentWidth < 500) {
        $('.marq').css('display', 'none');
    }
}
function load() {
    documentWidth = $(window).width();
    documentHight = $(window).height();
    $('.primary').css({
        'height': documentHight
    });
}
/**
 * 初始化函数
 */
$(function () {
    load();
    $('#User').focus();
    verifyUser();
});
/**
 * 提示弹窗确认键
 */
$('#OK').click(function () {
    $('.windows').css('display', 'none');
});
/**
 * 提示弹窗取消键
 */
$('#cancel').click(function () {
    $('.windows').css('display', 'none');
});
/**
 * 登录按键
 */
$('#login').click(function () {
    var user = $('#User').val().trim();
    var pwd = $('#pwd').val().trim();
    if (!user.length) {
        $('.user').html('请输入用户名');
        $('.user').css('display', 'inline');
        return;
    }
    if (!pwd.length) {
        $('.pwd').html('请输入密码');
        $('.pwd').css('display', 'inline');
        return;
    }
    object.user = user;
    object.pwd = pwd;
    HTTP = 'php/login.php';
    httpAjax(object);

    if (Data.login) {
        var date = new Date();
        date.setTime(date.getTime() + cookieTime);
        $.cookie('username', Data.user, { expires: date, path: '/' });
        $.cookie('password', Data.pwd, { expires: date, path: '/' });
        $.cookie('usertype', Data.type, { expires: date, path: '/' })
        window.location="../correlation/homepage.php";
    } else {
        $('.news-top').html('用户名或密码错误!');
        $('.windows').css('display', 'inline');
    }

});
/**
 * cookie登录验证
 */
function verifyUser() {
    var user = $.cookie('username');
    var pwd = $.cookie('password');
    Cookie.user = user;
    Cookie.pwd = pwd;
    if (user == "" || user == null && pwd == "" || pwd == null) {

    } else {
        //post('../correlation/homepage.php', Cookie);
        window.location="../correlation/homepage.php";
    }
}
/**
 * 注册按键
 */
$('#register').click(function () {
    $('.news-top').html('暂未开放个人注册！请联系系部管理员');
    $('.windows').css('display', 'inline');
});
/**
 * 忘记密码
 */
$('#forget').click(function () {
    $('.news-top').html('未开放，如有疑问请联系系统管理员');
    $('.windows').css('display', 'inline');
});
/**
 * Enter按键绑定登陆事件
 */
function loginclick() {
    $('.user').css('display', 'none');
    $('.pwd').css('display', 'none');
    if (event.which == 13) {
        $('#login').click();
    }
}
/**
 * 公共Ajax请求接口
 */
function httpAjax(ajobj) {
    $.ajax({
        type: "POST",
        url: HTTP,
        data: ajobj,
        dataType: "json",        //数据类型json
        async: false,             //同步还是一步，false是同步，true是异步
        success: function (data) {
            Data = data;
        },
        error: function (error) {
            Data = error;
        }
    });
}