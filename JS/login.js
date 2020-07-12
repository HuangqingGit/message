//公共变量
var documentWidth = $(window).width();
var documentHight = $(window).height();
var object = new Object();
var Cookie = new Object();
var Data = new Object();
var HTTP;
var Ret;
var cookieTime = 60 * 60 * 1000;    //设置身份有效时间
/**
 * 自动适应窗体大小
 */
window.onresize = function () {
    load();
}
/**
 * 初始化函数
 */
$(function () {
    initialize_set();
    load();
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
        $('#User').focus();
        return;
    }
    if (!pwd.length) {
        $('.pwd').html('请输入密码');
        $('.pwd').css('display', 'inline');
        $('#pwd').focus();
        return;
    }
    object.user = user;
    object.pwd = pwd;
    HTTP = 'php/login.php';
    $.ajax({
        url: HTTP,
        type: 'POST',
        data: object,
        dataType: 'json'
    })
        .done(function (code) {
            if (code.code) {
                var typ;
                switch (code.type) {
                    case "0": typ = "mes";
                        break;
                    case "1": typ = "mes";
                        break;
                    case "2": typ = "mes";
                        break;
                    case "3": typ = "mes";
                        break;
                    case "4": typ = "mes";
                        break;
                }
                var date = new Date();
                date.setTime(date.getTime() + cookieTime);
                $.cookie('username', code.user, { expires: date, path: '/' });
                $.cookie('password', code.pwd, { expires: date, path: '/' });
                setTimeout(function () {
                    $(location).attr('href', "/main?codetyp=" + zimu(40) + "&format=" + zimu(40) + "&future=" + zimu(40) + "&typ=" + encodestr(typ));
                }, 500);
            } else {
                $('.news-top').html('用户名或密码错误!');
                $('.windows').css('display', 'inline');
            }
        });
});
/**
 * 注册按键
 */
$('#register').click(function () {
    if (parseInt(Ret.Zhu_Ce)) {
        window.location.href = 'register/Tel-register/?Url=' + zimu(120) + '&id=&pd1=&pd2=';
    } else {
        $('.news-top').html('暂未开放个人注册！请联系系部管理员');
        $('.windows').css('display', 'inline');
    }
});
/**
 * 忘记密码
 */
$('#forget').click(function () {
    if (parseInt(Ret.Zhao_Hui)) {
        alert("可以找回！");
    } else {
        $('.news-top').html('未开放，如有疑问请联系系统管理员');
        $('.windows').css('display', 'inline');
    }
});

/**
 * 用户登录回车按键监听登录
 * windows弹窗遮罩层按键绑定
 */
$(document).keydown(function (event) {
    if (event.keyCode == 13) {  //Enter的keyCode键值是13
        if ($('.windows').css('display') === 'none') {
            $('#login').click();
        } else {
            $("#OK").click();
        }
    }
});
/**
 * input用户输入提示信息del
 */
$('#User').keydown(function () {
    $('.user').css('display', 'none');
});
$('#pwd').keydown(function () {
    $('.pwd').css('display', 'none');
});



/**
 * windows_size_set
 */
function load() {
    documentWidth = $(window).width();
    documentHight = $(window).height();
    $('.primary').css('height', documentHight);
    $('.Loaders').css('height', documentHight);
}
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
        $(location).attr('href', "/main?codetyp=" + zimu(40) + "&format=" + zimu(40) + "&future=" + zimu(40) + "&typ=" + encodestr("mes"));
    }
}
/**
 * System set initialize
 */
function initialize_set() {
    var HTTP = 'php/System_set.php';
    var SystemTime = setTimeout(() => {
        initialize_set();
    }, 1000);
    $.ajax({
        url: HTTP,
        type: 'POST',
        data: {},
        dataType: 'json'
    })
        .done(function (code) {
            Ret = code;
            clearTimeout(SystemTime);
        })
        .fail(function (error) {
            clearTimeout(SystemTime);
            console.log(error);
        });

}