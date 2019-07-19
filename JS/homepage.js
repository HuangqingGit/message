history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {   //禁止页面退回
    history.pushState(null, null, document.URL);
});
/**
 * 公共变量
 */
var Width = $(window).width();
var Height = $(window).height();
var LIST = new Object();
var DS = new Object();
var suer;
var pwd;
var listicon = ["&#xeb90;", "&#xebda;", "&#xeb8e;", "&#xec84;", "&#xeb9b;", "&#xeb6e;"];
var subicon = [
    "&#xeb7a;", "&#xeb67;", "&#xed1c;", "&#xe646;", "&#xe67a;", "&#xe61b;",
    "&#xebf3;", "&#xebf2;", "&#xec90;", "&#xec71;", "&#xe62e;", "&#xe60b;",
    "&#xe618;", "&#xe70b;", "&#xe6e9;", "&#xeca9;", "&#xec3c;", "&#xe600;"];
/**
 * 窗体大小自动适应
 */
window.onresize = function () {
    Width = $(window).width();
    Height = $(window).height();
    $(".bodydiv").css('height', Height);
    $('.articlesubset > iframe').css('height', Height - 104);
    $('.masking').css('height', Height);
    $('.personal_center').css('height', Height);
    $('.Loaders').css('height',Height);
}
/**
 * 初始化用户信息
 */
function usermessage() {
    dsurl = "../php/data_ds.php";
    DS.user = USER;
    DS = httpAjax(dsurl, DS);
}
/**
 * 初始化函数在页面加载完成时执行
 */
$(function () {
    usermessage();
    $('.userimg').attr('src', '../php' + DS.User_img);
    $(".bodydiv").css('height', Height);
    $('.articlesubset > iframe').css('height', Height - 104);
    $('.masking').css('height', Height);
    $('.personal_center').css('height', Height);
    $('.Loaders').css('height',Height);
    /**
     * 用户目录
     */
    switch (Ret) {
        case '0': //系统管理员,URL:""
            LIST = [
                { name: '系统设置', flag: true, icon: listicon[0], subLists: [{ id: 1, name: '选题方式', URL: "", icon: subicon[0] }, { id: 2, name: '限带人数', URL: "", icon: subicon[1] }] },
                { name: '系部管理', flag: false, icon: listicon[1], subLists: [{ id: 3, name: '添加管理员', URL: "", icon: subicon[2] }, { id: 4, name: '管理员列表', URL: "", icon: subicon[3] }] },
                { name: '留言板', flag: false, icon: listicon[4], subLists: [{ id: 5, name: '查看留言', URL: "", icon: subicon[4] }, { id: 6, name: '留言板设置', URL: "", icon: subicon[5] }] }]
            break;
        case '1': //系部管理员
            LIST = [
                { name: '系部管理', flag: false, icon: listicon[1], subLists: [{ id: 1, name: '添加导师', URL: "", icon: subicon[2] }, { id: 2, name: '导师列表', URL: "", icon: subicon[3] }] },
                {
                    name: '学生管理', flag: true, icon: listicon[2], subLists: [
                        { id: 3, name: '添加学生', URL: "", icon: subicon[2] }, { id: 4, name: '已选题学生', URL: "", icon: subicon[6] },
                        { id: 5, name: '未选题学生', URL: "", icon: subicon[7] }, { id: 6, name: '我的学生列表', URL: "", icon: subicon[8] }, { id: 7, name: '系部学生列表', URL: "", icon: subicon[9] },
                        { id: 8, name: '发布群通知', URL: "", icon: subicon[11] }, { id: 9, name: '发布系部通知', URL: "", icon: subicon[10] }
                    ]
                },
                {
                    name: '题目管理', flag: false, icon: listicon[3], subLists: [{ id: 10, name: '发布题目', URL: "", icon: subicon[12] }, { id: 11, name: '我的题库', URL: "", icon: subicon[13] },
                    { id: 12, name: '系部题库', URL: "", icon: subicon[14] }]
                },
                { name: '留言板', flag: false, icon: listicon[4], subLists: [{ id: 13, name: '查看留言', URL: "", icon: subicon[4] }] }
            ]
            break;
        case '2': //指导老师
            LIST = [
                {
                    name: '学生管理', flag: true, icon: listicon[2], subLists: [{ id: 1, name: '添加学生', URL: "", icon: subicon[2] }, { id: 2, name: '已选题学生', URL: "", icon: subicon[6] },
                    { id: 3, name: '未选题学生', URL: "", icon: subicon[7] },
                    { id: 4, name: '我的学生列表', URL: "", icon: subicon[8] }, { id: 5, name: '发布群通知', URL: "", icon: subicon[11] }]
                },
                { name: '题目管理', flag: false, icon: listicon[3], subLists: [{ id: 6, name: '发布题目', URL: "", icon: subicon[12] }, { id: 7, name: '我的题库', URL: "", icon: subicon[13] }] },
                { name: '留言板', flag: false, icon: listicon[4], subLists: [{ id: 8, name: '查看留言', URL: "", icon: subicon[4] }] }
            ]
            break;
        case '3': //学生
            LIST = [
                { name: '学生选题', flag: true, icon: listicon[5], subLists: [{ id: 1, name: '选导师', URL: "", icon: subicon[15] }, { id: 2, name: '去选题', URL: "", icon: subicon[16] }, { id: 3, name: '联系导师', URL: "", icon: subicon[17] }] },
                { name: '留言板', flag: false, icon: listicon[4], subLists: [{ id: 4, name: '查看留言', URL: "", icon: subicon[4] }] }
            ]
            break;
    }
    /**
     * Vue.js
     */
    new Vue({
        el: '#menu',
        data: {
            lists: LIST
        },
        methods: {
            curShow: function (list) {
                /**菜单栏单选项动画处理 */
                this.lists.forEach(function (itme) {
                    itme.flag = false;
                });
                list.flag = true;
            },
            getGoodsHref: function (URL) {
                /**a标签的url地址 */
                return URL;
            },
            liClick: function (id) {
                /**a标签的父元素点击事件 */
                document.getElementById(id).click();
            }
        }
    });
    /**
     * 欢迎页..
     */
    new Vue({
        el: '.help',
        data: {
            US: DS.User_name
        }
    })
    /**
     * 多点弹窗提示或警告
     */
    $('#butt2').click(function () {
        var id = $('.masking').attr('id');
        switch (id) {
            case '1':   //注销登录
                $('.masking').css('display', 'none');
                $.cookie('username', '', { expires: -1, path: '/' });
                $.cookie('password', '', { expires: -1, path: '/' });
                window.location.href = "../login.html";
                break;

            case '2':   //取消用户信息更改
                usermessage();
                $('.text_grzl').removeClass('yes');
                $('.text_grzl').html('&#xe6df;');
                $('.text_grzl').removeClass('yes');
                $('#email,#phone').attr('disabled', true);
                $('.text_pwd').removeClass('yes');
                $('.text_pwd').html('&#xe6df;');
                $('.text_pwd').removeClass('yes');
                $('#new,#ok').attr('disabled', true);
                $('.userimg').attr('src', '../php' + DS.User_img);
                $('.personal_center').css('display', 'none');
                $('.masking').css('display', 'none');
                break;
        }
    });
    $('#butt1').click(function () {
        $('.masking').css('display', 'none');
    });
    /**
     * 用户主动注销
     */
    $('#logout').click(function () {
        $('.news').html('确定退出当前用户吗？');
        $('.masking').attr('id', '1');
        $('.masking').css('display', 'inline');
    });
    /**
     * 个人中心
     */
    $('#personal').click(function () {
        $('#My_img_url').attr('src', '../php' + DS.User_img);
        $('#number_t2').html(DS.User_ID);
        $('#name_t2').html(DS.User_name);
        $('#email').val(DS.User_email);
        $('#phone').val(DS.User_tel);
        $('.personal_center').css('display', 'inline');
    });
    $('.top_img').click(function () {
        if ($('.text_grzl').hasClass('yes') || $('.text_pwd').hasClass('yes')) {
            $('.news').html('您的信息尚未保存确定退出吗？');
            $('.masking').attr('id', '2');
            $('.masking').css('display', 'inline');
        } else {
            $('.personal_center').css('display', 'none');
            usermessage();
            $('.userimg').attr('src', '../php' + DS.User_img);
        }
    });
    /**
     * 菜单收缩
     */
    $('#pack').click(function () {
        if ($('#content').hasClass('PACK_UP')) {
            $('#content').removeClass('PACK_UP');
            $('.pack_img').removeClass('LIST_DOWN');
        }
        else {
            $('#content').addClass('PACK_UP');
            $('.pack_img').addClass('LIST_DOWN');
        }
    });
    /**
     * 个人信息编辑锁定
     */
    $('.text_grzl').click(function () {
        if ($('.text_grzl').hasClass('yes')) {
            $('#email,#phone').attr('disabled', true);
            $('.text_grzl').html('&#xe6df;');
            $('.text_grzl').removeClass('yes');
        } else {
            $('#email,#phone').attr('disabled', false);
            $('#email').focus();
            $('.text_grzl').html('&#xe602;');
            $('.text_grzl').addClass('yes');
        }
    });
    $('.text_pwd').click(function () {
        if ($('.text_pwd').hasClass('yes')) {
            $('#new,#ok').attr('disabled', true);
            $('.text_pwd').html('&#xe6df;');
            $('.text_pwd').removeClass('yes');
        } else {
            $('#new,#ok').attr('disabled', false);
            $('#new').focus();
            $('.text_pwd').html('&#xe602;');
            $('.text_pwd').addClass('yes');
        }
    });
});
