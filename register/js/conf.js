//input ID 变量名
var userid = $('#userid');          //用户ID
var userpwd1 = $('#userpwd1');      //pwd1
var userpwd2 = $('#userpwd2');      //pwd2
var auth = $('#auth');              //验证码

//元素变量义名
var accept = $('#accept');          //协议单选
var send = $('#send');              //提交表单
var sendauth = $('#sendauth');      //发送验证码
var tel = $('#tel');                //手机注册
var email = $('#email');            //邮箱注册
var id_icon = $('.id_icon');          //id icon图标
var pwd1_icon = $('.pwd1_icon');      //pwd1 icon图标
var pwd2_icon = $('.pwd2_icon');      //pwd2 icon图标
var auth_icon = $('.auth_icon');      //auth icon图标
var id_mesg = $('.id_mesg');          //id text 信息
var pwd1_mesg = $('.pwd1_mesg');      //pwd1 text 信息
var pwd2_mesg = $('.pwd2_mesg');      //pwd2 text 信息
var auth_mesg = $('.auth_mesg');      //auth text 信息

//其他全局变量
var authcode = '4814e25ad040ec4a021bd9f7821d391d';      //验证码初始乱码
var Time;                                               //消息定时器义名
var recordTel;                                          //发送验证码的手机号或者邮箱记录
var overdue = false;                                    //验证码过期状态
var queryflag = false;                                   //用户ID查询登录允许

/**
 * 程序初始化
 */
$(function () {
    objec.id ? userid.val(decodestr(objec.id)) : userid.val('');
    objec.pwd1 ? userpwd1.val(decodestr(objec.pwd1)) : userpwd1.val('');
    objec.pwd2 ? userpwd2.val(decodestr(objec.pwd2)) : userpwd2.val('');

    initialize_procedure();
    $('#close_hint').click(function () {
        clearInterval(Time);
        $('#close_hint').hide();
        $('#hint_box').animate({
            top: '-35px'
        }, 500);
    });
});

//窗体大小自动适应、当窗体大小改变时执行
$(window).resize(function () {
    initialize_procedure();
});

//div元素宽高改变值
function initialize_procedure() {
    Width = $(window).width();                          //宽度
    Height = $(window).height();                        //高度
    $("body").css('height', Height);                    //主div
}

/**
 * logo返回首页
 */
function home() {
    window.location.href = '/';
}
/**
 * 回车按键监听确认
 */
$(document).keydown(function (event) {
    if (event.keyCode == 13) {  //Enter的keyCode键值是13
        $('#send').click();
    }
});

/**
 * 同意用户协议单选框
 */
accept.click(function () {
    if (send.hasClass('forbidden')) {
        send.removeClass('forbidden');
        send.attr('disabled', false);
        accept.html('&#xe61d;');
    } else {
        send.addClass('forbidden');
        send.attr('disabled', true);
        accept.html('&#xe681;');
    }
});

/**
 * 验证码从发倒计时
 */
function sendTime() {
    sendauth.attr('disabled', true);
    var num = 30;
    var time = setInterval(() => {
        sendauth.html(num + 's 后重试');
        num == 0 ? stop() : num--;
    }, 1000);
    function stop() {
        clearInterval(time)
        sendauth.html('发送验证码');
        sendauth.attr('disabled', false);
    }
}
/**
 * 切换注册类型
 */
tel.click(function () {
    var obj = jump();
    window.location.href = '../Tel-register/?Url=' + zimu(120) + '&id=' + obj.userid + '&pd1=' + obj.userpwd1 + '&pd2=' + obj.userpwd2;
})
email.click(function () {
    var obj = jump();
    window.location.href = '../Email-register/?Url=' + zimu(120) + '&id=' + obj.userid + '&pd1=' + obj.userpwd1 + '&pd2=' + obj.userpwd2;
})
/**
 *页面切换参数传递初始
 */
function jump() {
    var Obj = new Object();
    var id = $("#userid").val();
    var pwd1 = $("#userpwd1").val();
    var pwd2 = $("#userpwd2").val();
    id.length ? Obj.userid = encodestr(id) : Obj.userid = '';
    pwd1.length ? Obj.userpwd1 = encodestr(pwd1) : Obj.userpwd1 = '';
    pwd2.length ? Obj.userpwd2 = encodestr(pwd2) : Obj.userpwd2 = '';
    return Obj;
};

/**
 * @param {*消息内容} 默认：发送成功    Content 
 * @param {*背景颜色 选填yes 、 0 、自定义颜色 } 默认：#0ab827     bjColor 
 * @param {*字体颜色} 默认：#FFFFFF     fontColor 
 */
function hint(Content, bjColor, fontColor) {
    //绿色、红色、蓝色
    var color = ['#0ab827', '#df0909', '#c1def0', '#ffffff'];
    var hint = $('.hint');
    var hint_box = $('#hint_box');
    var close_hint = $('#close_hint');
    var hint_content = $('.hint_content');
    clearInterval(Time);
    $('#close_hint').hide();
    hint_box.animate({
        top: '-35px'
    }, 250, () => {
        bjColor == 0 ? bjColor = color[0] : bjColor;//成功的
        bjColor == -1 ? bjColor = color[1] : bjColor;//错误的
        bjColor == 1 ? bjColor = color[2] : bjColor;//正常的
        bjColor ? bjColor : bjColor = color[0];//为空默认值
        Content ? Content : Content = '操作成功';
        fontColor ? fontColor : fontColor = color[3];
        hint.css('background', bjColor);
        hint_content.css('color', fontColor);
        hint_content.html(Content)
        hint_box.animate({
            top: '100px'
        }, 500, () => {     //es6函数写法 ()=>{};
            close_hint.show();
            Time = setTimeout(() => {
                hint_box.animate({
                    top: '-35px'
                }, 500, () => {
                    close_hint.hide();
                });
            }, 3000);
        });
    });
}
/**
 * 验证表单是否填写完整以及信息是否合法
 * @param {*注册方式 true为手机注册false为邮箱注册} zctype 
 */
function checkinput(zctype) {
    var flag = false;
    var hint_con = '提交成功';
    if (auth.val().trim() == "" || auth.val().trim() == null) {
        auth.addClass('error');
        auth.focus();
        flag = true;
    };
    if (userpwd2.val().trim() == "" || userpwd2.val().trim() == null) {
        userpwd2.addClass('error');
        userpwd2.focus();
        flag = true;
    };
    if (userpwd1.val().trim() == "" || userpwd1.val().trim() == null) {
        userpwd1.addClass('error');
        userpwd1.focus();
        flag = true;
    };
    if (userid.val().trim() == "" || userid.val().trim() == null) {
        userid.addClass('error');
        userid.focus();
        flag = true;
    }
    if (flag) {
        hint('请填写完整信息', -1);
        return false;
    } else {
        if (zctype) {   //如果为真就是手机注册否则就是邮箱注册
            if (!regPhone(userid.val())) {
                id_icon.html('&#xe623;');
                id_mesg.html('手机号格式不合法');
                userid.addClass('error').focus().select();
                return false;
            }
        } else {
            if (!regEmail(userid.val())) {
                id_icon.html('&#xe623;');
                id_mesg.html('邮箱格式不合法');
                userid.addClass('error').focus().select();
                return false;
            }
        }
        if (!regPwd(userpwd1.val())) {
            pwd1_icon.html('&#xe623;');
            pwd1_mesg.html('密码格式错误，至少有6位以上且包含字母和数字');
            $('#userpwd1,#userpwd2').addClass('error');
            userpwd1.focus().select();
            return false;
        }
        if (userpwd1.val() != userpwd2.val()) {
            pwd1_icon.html('&#xe623;');
            pwd1_mesg.html('两次输入的密码不一致');
            $('#userpwd1,#userpwd2').addClass('error');
            userpwd1.focus().select();
            return false;
        }
        if (auth.val() == '' || auth.val() == null) {
            auth_icon.html('&#xe623;');
            auth_mesg.html('请输入验证码');
            auth.addClass('error').focus().select();
            return false;
        }
        if (auth.val() == overdue) {
            auth_icon.html('&#xe623;');
            auth_mesg.html('验证码已过期，请重新获取验证码');
            auth.addClass('error').focus().select();
            return false;
        }
        if (auth.val() != authcode) {
            auth_icon.html('&#xe623;');
            auth_mesg.html('验证码效验失败');
            auth.addClass('error').focus().select();
            return false;
        }

    }
    return true;
}
/**
 * 
 * @param {*清除error样式} event 
 */
function remove(event, id) {
    var inputid = $('#' + event.srcElement.id);
    var icon = $('.' + id + '_icon');
    var mesg = $('.' + id + '_mesg');
    inputid.removeClass('error');
    icon.html('');
    mesg.html('');
}
/**
 * 验证码有效时间
 * @param {*验证码————必须} code 
 */
function Authcode(code) {
    authcode = code;
    var Time = new Date();                    //new一个Data时间对象
    var T = 1000 * 60 * 5;                    //验证码有效时间
    var pastTime = Time.getTime() + T;        //验证码过期时间
    var myVar = setInterval(() => {
        var newTime = new Date();             //new一个Data时间对象
        var sendTime = newTime.getTime();     //当前时间
        if (sendTime > pastTime) {
            clearInterval(myVar);
            overdue = authcode;
            authcode = '4814e25ad040ec4a021bd9f7821d391d';
        }
    }, 1000);
}