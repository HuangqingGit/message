history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {   //禁止页面退回
    history.pushState(null, null, document.URL);
});
/**
 * 公共变量
 */
var Width = $(window).width();                          //宽度获取
var Height = $(window).height();                        //高度获取
var GetDS = new Object();                               //创建一个Object对象用于发送请求数据和接收
var UP = new Object();                                  //同上（这里是防止数据错乱）
var bench0, bench1, bench2, bench3, bench4;                     //用做验证更改信息状态
var Focustate;                                          //textarea焦点状态设置 {布尔值}
var Hellostr;                                           //Hello.Vue的data属性值 {对象}
var LIST;                                               //Vue菜单栏，用户类别菜单栏 {对象}
var userType;                                           //用户等级

//一级菜单Icon文字图标
var listicon = [
    "&#xeb90;", "&#xebda;", "&#xeb8e;", "&#xec84;", "&#xeb9b;", "&#xeb6e;", "&#xe620;"];
//二级菜单Icon文字图标
var subicon = [
    "&#xeb7a;", "&#xeb67;", "&#xed1c;", "&#xe646;", "&#xe67a;", "&#xe61b;",
    "&#xebf3;", "&#xebf2;", "&#xec90;", "&#xec71;", "&#xe62e;", "&#xe60b;",
    "&#xe618;", "&#xe70b;", "&#xe6e9;", "&#xeca9;", "&#xec3c;", "&#xe600;",
    "&#xe668;", "&#xe61e;"];

//菜单导航链接
var messageUrl = "/main?codetyp=" + zimu(40) + "&format=" + zimu(40) + "&future=" + zimu(40) + "&typ=" + encodestr('mes');      //留言板URL地址
var mes = "/unopen?codetyp=" + zimu(40) + "&format=" + zimu(40) + "&future=" + zimu(40) + "&typ=" + encodestr("mes");   //课题管理（测试用）
var taskman = "/unopen?codetyp=" + zimu(40) + "&format=" + zimu(40) + "&future=" + zimu(40) + "&typ=" + encodestr("taskman");   //课题管理（测试用）
var system = "/unopen?codetyp=" + zimu(40) + "&format=" + zimu(40) + "&future=" + zimu(40) + "&typ=" + encodestr("system");     //系统设置（测试用）
var stusel = "/unopen?codetyp=" + zimu(40) + "&format=" + zimu(40) + "&future=" + zimu(40) + "&typ=" + encodestr("stusel");     //学生选题（测试用）
var ideaut = "/unopen?codetyp=" + zimu(40) + "&format=" + zimu(40) + "&future=" + zimu(40) + "&typ=" + encodestr("ideaut");     //身份认证（测试用）
var xbman = "/unopen?codetyp=" + zimu(40) + "&format=" + zimu(40) + "&future=" + zimu(40) + "&typ=" + encodestr("xbman");       //系部管理（测试用）
var stu = "/unopen?codetyp=" + zimu(40) + "&format=" + zimu(40) + "&future=" + zimu(40) + "&typ=" + encodestr("studentman");    //学生管理（测试用）

//用户信息初始化与查询
function User_initialize(text) {
    var USER = $.cookie('username');
    var PWD = $.cookie('password');
    var DS = new Object();
    var dsurl = "../php/data_ds.php";
    DS.user = USER;
    DS.pwd = PWD;
    var iniTime = setTimeout(() => {    //3秒钟内执行成功就关闭定时器否则就重新请求
        User_initialize('加载用户信息');
    }, 4000);
    var loadiniTime = setTimeout(() => {        //如果在0.5秒内没有请求成功则显示loading动画
        loading_text(text);
    }, 500);
    $.ajax({
        url: dsurl,
        type: 'post',
        data: DS,
        dataType: 'json'
    })
        .done(function (code) {
            console.log(code);
            if (code.code) {
                clearTimeout(iniTime);          //关闭定时器
                clearTimeout(loadiniTime);      //同上
                loading_text('', 0);
                if (code.row == "" || code.row == null) {
                    $.cookie('username', '', { expires: -1, path: '/' });
                    $.cookie('password', '', { expires: -1, path: '/' });
                    alert('身份信息验证失败或用户已不存在！')
                    window.location.href = "/";
                } else {
                    User_list(code.row.User_type);
                    userType = code.row.User_type;
                    Hellostr = code.row;
                    Hello.datas = code.row;
                    $('.bodydiv').css('display', 'flex');
                }
            } else {
                clearTimeout(iniTime);          //关闭定时器
                clearTimeout(loadiniTime);      //同上
                loading_text('', 0);
                $('.bodydiv').css('display', 'flex');
                console.log(code.error);
                console.log(code.errno);
            }
        });
}
/**
 * 初始化函数在页面加载完成时执行
 */
$(function () {
    User_initialize('加载用户信息');
    initialize_procedure();
    main.typee = typ;
});
/**
 * 窗体大小自动适应
 * 当窗体大小改变时执行
 */
$(window).resize(function () {
    initialize_procedure();
});
/**
 * div元素宽高改变值
 */
function initialize_procedure() {
    Width = $(window).width();                          //宽度
    Height = $(window).height();                        //高度
    $(".bodydiv").css('height', Height);                //主div
    $('.lock_Windows').css('height', Height);           //系统锁定
    $('.masking').css('height', Height);                //确认提示框（确认取消键）
    $('.personal_center').css('height', Height);        //个人中心弹窗界面
    $('.Loaders').css('height', Height);                //懒加载弹窗
    $('#fuzzy_searach_shade').css('height', Height);    //模糊搜索遮罩层
    $('#menu').css('height', Height - 65);              //菜单height高度设置
}
/**
 * Vue.js
 */
var main = new Vue({
    el: '#menu',
    data: {
        lists: [],
        typee: ""
    },
    mounted() { //vue初始化执行函数
        window.User_list = this.User_list;      //将Vue中的User_list实例赋给window
        // setTimeout(() => {
        //     $('#mes').click();
        // }, 300);
    },
    methods: {
        //用户类型渲染列表
        User_list(Ret) {
            switch (Ret) {
                case '0': //系统管理员
                    this.lists = [
                        { id: 'system', name: '系统设置', flag: false, icon: listicon[0], subLists: [{ Url: system, name: '选题方式', icon: subicon[0] }, { Url: system, name: '限带人数', icon: subicon[1] }] },
                        { id: 'xbman', name: '系部管理', flag: false, icon: listicon[1], subLists: [{ Url: xbman, name: '添加管理员', icon: subicon[2] }, { Url: xbman, name: '管理员列表', icon: subicon[3] }] },
                        { id: 'mes', name: '留言板', flag: false, icon: listicon[4], subLists: [{ Url: messageUrl, name: '查看留言', icon: subicon[4] }, { Url: mes, name: '留言板设置', icon: subicon[5] }] }]
                    break;
                case '1': //系部管理员
                    this.lists = [
                        { id: 'xbman', name: '系部管理', flag: false, icon: listicon[1], subLists: [{ Url: xbman, name: '添加导师', icon: subicon[2] }, { Url: xbman, name: '导师列表', icon: subicon[3] }] },
                        {
                            id: 'studentman',
                            name: '学生管理', flag: false, icon: listicon[2], subLists: [
                                { Url: stu, name: '添加学生', icon: subicon[2] }, { Url: stu, name: '已选题学生', icon: subicon[6] },
                                { Url: stu, name: '未选题学生', icon: subicon[7] }, { Url: stu, name: '学生列表', icon: subicon[8] }, { Url: stu, name: '系部列表', icon: subicon[9] },
                                { Url: stu, name: '发布群通知', icon: subicon[11] }, { Url: stu, name: '发布系部通知', icon: subicon[10] }
                            ]
                        },
                        {
                            id: 'taskman',
                            name: '课题管理', flag: false, icon: listicon[3], subLists: [{ Url: taskman, name: '发布课题', icon: subicon[12] }, { Url: taskman, name: '我的题库', icon: subicon[13] },
                            { Url: taskman, name: '系部课题', icon: subicon[14] }]
                        },
                        { id: 'mes', name: '留言板', flag: false, icon: listicon[4], subLists: [{ Url: messageUrl, name: '查看留言', icon: subicon[4] }] }
                    ]
                    break;
                case '2': //指导老师
                    this.lists = [
                        {
                            id: 'studentman',
                            name: '学生管理', flag: false, icon: listicon[2], subLists: [{ Url: stu, name: '添加学生', icon: subicon[2] }, { Url: stu, name: '已选题学生', icon: subicon[6] },
                            { Url: stu, name: '未选题学生', icon: subicon[7] },
                            { Url: stu, name: '学生列表', icon: subicon[8] }, { Url: stu, name: '发布群通知', icon: subicon[11] }]
                        },
                        { id: 'taskman', name: '课题管理', flag: false, icon: listicon[3], subLists: [{ Url: taskman, name: '发布课题', icon: subicon[12] }, { Url: taskman, name: '我的题库', icon: subicon[13] }] },
                        { id: 'mes', name: '留言板', flag: false, icon: listicon[4], subLists: [{ Url: messageUrl, name: '查看留言', icon: subicon[4] }] }
                    ]
                    break;
                case '3': //学生
                    this.lists = [
                        { id: 'stusel', name: '学生选题', flag: false, icon: listicon[5], subLists: [{ Url: stusel, name: '选导师', icon: subicon[15] }, { Url: stusel, name: '去选题', icon: subicon[16] }, { Url: stusel, name: '联系导师', icon: subicon[17] }] },
                        { id: 'mes', name: '留言板', flag: false, icon: listicon[4], subLists: [{ Url: messageUrl, name: '查看留言', icon: subicon[4] }] }
                    ]
                    break;
                case '4': //游客登录
                    this.lists = [
                        { id: 'ideaut', name: '身份认证', flag: false, icon: listicon[6], subLists: [{ Url: ideaut, name: '教师认证', icon: subicon[18] }, { Url: ideaut, name: '学生认证', icon: subicon[19] }] },
                        { id: 'mes', name: '留言板', flag: false, icon: listicon[4], subLists: [{ Url: messageUrl, name: '查看留言', icon: subicon[4] }] }
                    ]
                    break;
            }
        },
        //菜单栏单选项动画处理 {*list标签ID值 必要参数}
        curShow(list) {
            this.lists.forEach(function (itme) {
                itme.flag = false;
            });
            list.flag = true;
        },
        //二级菜单导航链接跳转 {*Url跳转地址 必要参数}
        liClick(Url) {
            window.location.href = Url;
        }
    },
    watch: {    //初始化菜单栏
        lists: function () {
            this.$nextTick(function () {
                $("#" + this.typee).click();
            });
        }
    },
});
/**
 * 欢迎页..
 */
Hello = new Vue({
    el: '.usermessage',
    data: {
        datas: []
    }
});
/**
 * 多点弹窗提示或警告
 */
$('#butt2').click(function () { //button2确认按键
    switch ($('.masking').attr('id')) {
        case '1':   //注销登录
            for (var i = 0; i < 3; i++) {
                $.cookie('username', '', { expires: -1, path: '/' });
                $.cookie('password', '', { expires: -1, path: '/' });
            }
            window.location.href = "/";
            break;

        case '2':   //取消用户信息更改
            User_initialize();
            var Gitimg = '../php' + Hellostr.User_img;
            if (Hellostr.User_img == null || Hellostr.User_img == "") {
                Gitimg = '../img/K.png';
            }
            $('.userimg').attr('src', Gitimg);
            $('.text_grzl').removeClass('yes');
            $('.text_grzl').html('&#xe6df;');
            $('.text_pwd').removeClass('yes');
            $('.text_pwd').html('&#xe6df;');
            $('.personal_center').fadeOut();
            $('#new,#ok').attr('disabled', true);
            $('#email,#phone,#name').attr('disabled', true);
            $('.masking').fadeOut(200);
            break;
    }
});
$('#butt1').click(function () { //button1取消按键
    $('.masking').fadeOut(200);
});
/**
 * 用户主动注销
 */
$('#logout').click(function () {
    $('.news').html('确定退出当前用户吗？');
    $('.masking').attr('id', '1');
    $('.masking').fadeIn(200);
});
/**
 * 个人中心
 */
$('#personal').click(function () {
    $('.My_center_tow').animate({ scrollTop: '0px' }, 50);
    var Gitimg = '../php' + Hellostr.User_img;
    if (Hellostr.User_img == null || Hellostr.User_img == "") {
        Gitimg = '../img/K.png';
    }
    $('#My_img_url').attr('src', Gitimg);
    $('.userimg').attr('src', Gitimg);
    $('#number').val(Hellostr.User_ID);
    $('#name').val(Hellostr.User_name);
    $('#email').val(Hellostr.User_email);
    $('#phone').val(Hellostr.User_tel);
    $('.personal_center').fadeIn();
});
$('.top_img').click(function () {
    if ($('.text_grzl').hasClass('yes') || $('.text_pwd').hasClass('yes')) {
        $('.news').html('您的信息尚未保存确定退出吗？');
        $('.masking').attr('id', '2');
        $('.masking').css('display', 'inline');
    } else {
        User_initialize('正在更新信息');
        var Gitimg = '../php' + Hellostr.User_img;
        if (Hellostr.User_img == null || Hellostr.User_img == "") {
            Gitimg = '../img/K.png';
        }
        $('.userimg').attr('src', Gitimg);
        $('.personal_center').fadeOut();
    }
});
/**
 * 菜单收缩
 */
$('#pack').click(function () {
    if ($('#content').hasClass('PACK_UP')) {
        $('#content').removeClass('PACK_UP');
        $('#pack_icon').removeClass('LIST_DOWN');
    }
    else {
        $('#content').addClass('PACK_UP');
        $('#pack_icon').addClass('LIST_DOWN');
    }
});
/**
 * 个人信息编辑锁定和更新
 */
$('.text_grzl').click(function () {
    if ($('.text_grzl').hasClass('yes')) {
        var email = $('#email').val().trim();
        var phone = $('#phone').val().trim();
        var name = $('#name').val().trim();
        if (email == bench1 && phone == bench2 && name == bench0) {
            newss("信息未做更改", "#fff", "#009a61", "&#xe602;");
        } else {
            if (email != bench1) {
                //验证邮箱格式
                if (!regEmail(email)) {
                    newss("邮箱格式错误", "#fff", "#e24567", "&#xe607;");
                    return false;
                }
            }
            if (phone != bench2) {
                //验证电话号码格式
                if (!regPhone(phone)) {
                    newss("电话格式错误", "#fff", "#e24567", "&#xe607;");
                    return false;
                }
            }
            var dsurl = '../php/updateUser.php';
            name != "" ? name : name = 'KK';
            email != "" ? email : email = '未绑定';
            phone != "" ? phone : phone = '未绑定';
            UP.email = email;
            UP.phone = phone;
            UP.name = name;
            var UPTime = setTimeout(() => {
                $('.text_grzl').click();
            }, 2000);
            //发起更新信息请求
            loading_text('正在更新');
            $.ajax({
                url: dsurl,
                type: 'post',
                data: UP,
                dataType: 'json'
            })
                .done(function (code) {
                    if (code.state) {
                        clearTimeout(UPTime);
                        newss("更新成功", "#fff", "#009a61", "&#xe602;");
                    } else {
                        clearTimeout(UPTime);
                        switch (code.code) {
                            case 1:
                                $('#name').val(bench0);
                                $('#email').val(bench1);
                                $('#phone').val(bench2);
                                if (code.errno == 1062) {
                                    newss('E-mail已被绑定' + code.errno, "#fff", "#e24567", "&#xe607;");
                                } else {
                                    newss('ErrorCode: ' + code.errno, "#fff", "#e24567", "&#xe607;");
                                }
                                $('.text_grzl').click();
                                break;
                            case 2:
                                alert('身份认证已过期请重新登录！');
                                window.location = "/";
                                break;
                        }
                    }
                });
        }
        $('#email,#phone,#name').attr('disabled', true);
        $('.text_grzl').html('&#xe6df;');
        $('.text_grzl').removeClass('yes');
    } else {
        if (userType == "4") {
            $('#name').attr('disabled', false);
        }
        bench0 = $('#name').val().trim();
        bench1 = $('#email').val().trim();
        bench2 = $('#phone').val().trim();
        $('#email,#phone').attr('disabled', false);
        $('#email').focus();
        $('.text_grzl').html('&#xe602;');
        $('.text_grzl').addClass('yes');
    }
});
$('.text_pwd').click(function () {
    if ($('.text_pwd').hasClass('yes')) {
        var newpwd = $('#new').val().trim();
        var okpwd = $('#ok').val().trim();
        if (!regPwd(newpwd)) {
            //验证密码格式
            newss("6-18位数字和字母", "#fff", "#e24567", "&#xe607;");
            return false;
        }
        if (newpwd != okpwd) {
            //验证密码是否一致
            newss("两次密码不一致", "#fff", "#e24567", "&#xe607;");
            return false;
        }
        if (newpwd != "" || okpwd != "") {
            if (newpwd == $.cookie('password')) {
                newss("不能与原密码相同", "#fff", "#e24567", "&#xe608;");
                return false;
            }
            if (newpwd == bench3 || okpwd == bench4) {
                newss("信息未做更改", "#fff", "#009a61", "&#xe602;");
            } else {
                //验证是否做了信息更改
                //发起更新密码请求
                loading_text('正在更新');
                var dsurl = '../php/updateUser.php';
                UP.new = newpwd;
                UP = httpAjax(dsurl, UP);
                if (UP.state) {
                    var validate = new Date();
                    validate.setTime(validate.getTime() + cookieTime);
                    $.cookie('password', newpwd, { expires: validate, path: '/' });
                    cookpwd = $.cookie('password');
                    newss("更新成功", "#fff", "#009a61", "&#xe602;");
                } else {
                    switch (UP.code) {
                        case 1:
                            newss("更改失败", "#fff", "#e24567", "&#xe607;");
                            break;
                        case 2:
                            alert('身份认证已过期请重新登录！');
                            window.location = "/";
                            break;
                    }
                }
            }
        }
        $('#new,#ok').attr('disabled', true);
        $('.text_pwd').html('&#xe6df;');
        $('.text_pwd').removeClass('yes');
    } else {
        bench3 = $('#new').val().trim();
        bench4 = $('#ok').val().trim();
        $('#new,#ok').attr('disabled', false);
        $('#new').focus();
        $('.text_pwd').html('&#xe602;');
        $('.text_pwd').addClass('yes');
    }
});


/**
 * 系统锁定与解锁
 */
var oldTime = new Date().getTime();
var newTime = new Date().getTime();
var Timedate;
var outTime = 10 * 60 * 1000;               //设置超时时间： 10分钟
var cookieTime = 24 * 60 * 60 * 1000;       //设置身份有效时间  24H
var cookuser = $.cookie('username');        //读取到用户信息预存用户信息
var cookpwd = $.cookie('password');
var cooktype = $.cookie('usertype');
$(function () {
    /* 鼠标移动事件 */
    $(document).mousemove(function () {
        oldTime = new Date().getTime(); //鼠标移入重置停留的时间
    });

    $('.validate_but').click(function () { //解锁
        var pwd = $('#validate_pwd');
        var validate_pwd = pwd.val().trim();
        var unlockUrl = "../php/unlock.php";
        var obje = new Object();
        obje.id = cookuser;
        obje.pwd = validate_pwd;
        var unlockTime = setTimeout(() => {
            $('.validate_but').click();
        }, 2000);
        //向服务器发起验证密码请求
        $.ajax({
            url: unlockUrl,
            type: 'post',
            data: obje,
            dataType: 'json'
        })
            .done(function (code) {
                if (code.code) {
                    clearTimeout(unlockTime);
                    var validate = new Date().getTime();
                    Timedate = validate + cookieTime;
                    $.cookie('username', cookuser, { expires: Timedate, path: '/' });
                    $.cookie('password', cookpwd, { expires: Timedate, path: '/' });
                    var but = $('.validate_but');
                    var icon = $('.validate_but > i');
                    but.animate({ width: '50px', marginLeft: '-25px', }, 400, function () {
                        icon.html('&#xe62b;');
                        but.animate({
                            lineHeight: '100px',
                            width: '100px',
                            height: '100px',
                            marginTop: '5px',
                            marginLeft: '-50px',
                            opacity: 0
                        }, 600, function () {
                            $('.lock_Windows').fadeOut(600, function () {
                                but.css({
                                    'width': '200px',
                                    'height': '50px',
                                    'margin-top': '30px',
                                    'margin-left': '-100px',
                                    'line-height': '50px',
                                    'opacity': 1
                                });
                                pwd.val('');
                                icon.html('&#xe61a;');
                            });
                        })
                    });
                } else {
                    clearTimeout(unlockTime);
                    var text = $('.validate_text');
                    text.html('密码错误');
                    setTimeout(function () { text.html('') }, 3000);
                    $('#validate_pwd').val('');
                    $('#validate_pwd').focus();
                }
            });
    });
});

/**
 * 锁定操作
 */
function OutTime() {
    newTime = new Date().getTime(); //更新未进行操作的当前时间
    if (newTime - oldTime > outTime) { //判断是否超时不操作
        $.cookie('username', '', { expires: -1, path: '/' });
        $.cookie('password', '', { expires: -1, path: '/' });
        $('.lock_Windows').fadeIn(1000);
    }
}
/* 定时器  判断每1秒是否长时间未进行页面操作 */
window.setInterval(OutTime, 1000);
/**
 * 验证键盘事件监听器
 */
$(document).keydown(function (event) {
    if (event.keyCode == 27) {  //ESC的keyCode键值是27
        if ($('.lock_Windows').css('display') === 'none') {
            if ($('.masking').css('display') === 'none') {
                $('#logout').click();
            } else {
                $('#butt1').click();
            }
        }
    }
    if (event.keyCode == 13) {  //Enter的keyCode键值是13
        if ($('.lock_Windows').css('display') === 'block') {
            $('.validate_but').click();
        }
        else if ($('.masking').css('display') === 'block') {
            switch ($('.masking').attr('id')) {
                case '1':
                    $('#butt2').click();
                    break;
                case '2':
                    $('#butt1').click();
                    break;
            }
        }
    }
});

/**
 * textarea焦点状态设置
 */
function noFocus() {
    Focustate = true;
}
function noBlur() {
    Focustate = false;
}

/**
 * fontcss——float设置
 */
var font_overTime;
var font_outTime;
function OnmouseOver(scale) {
    font_overTime = setTimeout(function () {
        $('.' + scale.id).siblings().hide();
        $('.' + scale.id).show();
    }, 300);
}
function OnmouseOut(scale) {
    clearTimeout(font_overTime);
    if (eval(scale.id + '_state')) {
        $('.' + scale.id).siblings().hide();
        font_style_state = true;
        font_color_state = true;
        font_iconf_state = true;
        font_style_state = !eval(scale.id + '_state');
        font_color_state = !eval(scale.id + '_state');
        font_iconf_state = !eval(scale.id + '_state');
    } else {
        font_outTime = setTimeout(function () {
            $('.' + scale.id).hide();
        }, 150);
    }
}

/**
 * font_floatwindows设置
 */
function Font_float_Over(scale) {
    clearTimeout(font_outTime);
    $('.' + scale).show();
}
function Font_float_Out(scale) {
    $('.' + scale).hide();
}
/**
 * 
 * @param {* cookie的code对象} code 
 */
function cookieset(code) {

}