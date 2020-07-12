var DataUrl = "../php/message.php";
var Date_ds = Object();
$(function () {
    main = new Vue({
        el: '.messagebodydiv', //vue绑定元素
        data: { //vuedata数据和变量
            messlists: [],
            praiselists: [],
            show: true,
        },
        mounted() { //vue初始化执行函数
            this.initialize();
        },
        methods: {  //vue内置函数
            moveErrorImg(event) {
                event.currentTarget.src = "../img/K.png";
            },
            /**
             * 初始化执行函数获取所有留言
             */
            initialize() {
                Date_ds.code = 'empty'; //请求识别代码
                $.ajax({
                    url: DataUrl,
                    type: 'psot',
                    data: Date_ds,
                    dataType: 'json'
                })
                    .done(function (code) {
                        if (code.retdata.length) {
                            this.show = false;
                            this.messlists = code.retdata;
                            this.praiselists = code.praise;
                            //打印数据必要时打开
                            // console.log(Data.retdata);
                            // console.log(Data.praise);
                        }
                        else {
                            this.show = true;
                        }
                    })
            },
            update_praise(code) {  //点赞板块
                var keynum = $('#' + code[1] + '> .praise > .praise_num');
                var keyid = $('#' + code[1] + '> .praise > i');
                Date_ds.code = 'praise';//请求识别代码
                Date_ds.leave_Id = code[1];
                if (code[0]) {
                    Date_ds.up_Type = 1;
                    $.ajax({
                        url: DataUrl,
                        type: 'psot',
                        data: Date_ds,
                        dataType: 'json'
                    })
                        .done(function (code) {
                            if (code.code) {
                                keynum.html(Number(keynum.text()) + 1);
                            } else {
                                news('ErrorCode: ' + code.errno, '#fff', '#f40');
                                keyid.html('&#xe626;');
                                keyid.removeClass('fun_icon_code'); //删除class
                            }
                        })

                } else {
                    Date_ds.up_Type = 0;
                    $.ajax({
                        url: DataUrl,
                        type: 'psot',
                        data: Date_ds,
                        dataType: 'json'
                    })
                        .done(function (code) {
                            if (code.code) {
                                keynum.html(Number(keynum.text()) - 1);
                            } else {
                                news('ErrorCode: ' + code.errno, '#fff', '#f40');
                                keyid.html('&#xe626;');
                                keyid.removeClass('fun_icon_code'); //删除class
                            }
                        })
                }
            },
            Timestamp(timestamp) {  //留言时间转换
                var Time = new Date(timestamp - 0);
                var yy = Time.getFullYear();      //年
                var mm = Time.getMonth() + 1;     //月
                var dd = Time.getDate();          //日
                var hh = Time.getHours();         //时
                var ii = Time.getMinutes();       //分
                var ss = Time.getSeconds();       //秒
                mm = mm >= 10 ? mm : '0' + mm;
                dd = dd >= 10 ? dd : '0' + dd;
                hh = hh >= 10 ? hh : '0' + hh;
                ii = ii >= 10 ? ii : '0' + ii;
                ss = ss >= 10 ? ss : '0' + ss;
                return yy + '年' + mm + '月' + dd + '日 ' + hh + ':' + ii + ':' + ss;
            },
            typecss(type) {  //用户类型颜色标示
                switch (type) {
                    case '0':
                        return "background:#db3f35";
                    case '1':
                        return "background:#F4bf20";
                    case '2':
                        return "background:#03aa4e";
                    case '3':
                        return "background:#00cdf3";
                    case '4':
                        return "background:#65acda";
                }
            },
            nametype(type) {  //用户类型
                switch (type) {
                    case '0':
                        return "系统管理";
                    case '1':
                        return "系部管理";
                    case '2':
                        return "老师";
                    case '3':
                        return "学生";
                    case '4':
                        return "游客（未认证）";
                }
            },
            addmessage() {  //发送留言
                var input = $('.send_input');
                var charnum = $('.char_num');
                var value = input.val().trim().length;
                if (value != 0) {
                    if (value <= 230) {
                        var Time = (new Date()).valueOf();  //获取时间戳
                        Date_ds.code = "Insert";    //请求识别码
                        Date_ds.leaveContent = input.val().trim();
                        Date_ds.timestamp = Time;
                        Date_ds.fontColor = "#009a61";
                        Date_ds.typeFace = "FZYaoti";

                        $.ajax({
                            url: DataUrl,
                            type: 'psot',
                            data: Date_ds,
                            dataType: 'json'
                        })
                            .done(function (code) {
                                if (code.code) {
                                    news('发送成功', '#fff', '#03aa4e');
                                    input.val(null);
                                    charnum.html('0/230');
                                    input.focus();
                                    $('#Return_TOP').click();
                                    this.initialize();
                                } else {
                                    news('发送失败', '#fff', '#f40');
                                    input.focus();
                                }
                            })
                    } else {
                        news('留言字数不能超过230个', '#fff', '#f40');
                        input.focus();
                    }
                }
                else {
                    news('不能发送空白留言', '#fff', '#f40');
                    input.focus();
                }
            },
            fun_icon(ds) {  //点赞评论删除等
                // console.log(ds.currentTarget.parentElement.id);
                var fun_id = ds.currentTarget.parentElement.id;
                switch (ds.currentTarget._prevClass) {
                    // 更多
                    case 'fun':
                        console.log('更多功能' + fun_id);
                        break;
                    // 点赞
                    case 'praise':
                        var keyid = $('#' + fun_id + '> .praise > i');
                        var code = ['', fun_id];
                        if (!keyid.hasClass('fun_icon_code')) {//判断class是否存在
                            keyid.html('&#xe616;');
                            keyid.addClass('fun_icon_code');//添加class
                            code[0] = true;
                            this.update_praise(code);
                        } else {
                            keyid.html('&#xe626;');
                            keyid.removeClass('fun_icon_code');//删除class
                            code[0] = false;
                            this.update_praise(code);
                        }

                        break;
                    // 留言
                    case 'leave':
                        console.log('查看留言' + fun_id);
                }
            },
            Parise_verify(lea_id) {
                // while(this.praiselists.lea_ID==lea_id.currentTarget.parentElement.parentElement.id){
                //     console.log('you');
                // }
                console.log(lea_id);
            }
        }
    });
});

function praise(pra) {
    console.log(pra);

}
/**
 * dom元素事件初始化
 */
$(function () {  //input文字计数器
    var input = $('.send_input');
    var charnum = $('.char_num');
    var value = input.val();
    Char_Num();
    charnum.html(value.length + '/230');
    input.keyup(function () {
        Char_Num();
    });
    function Char_Num() {
        value = input.val().trim();
        charnum.html(value.length + '/230');
        if (value.length <= 230) {
            charnum.css({
                'color': '#777',
                'fontWeight': 'normal'
            });
        } else {
            charnum.css({
                'color': '#f40',
                'fontWeight': 'bold'
            });
        }
    };
    /**
     * input消息输入框颜色
     */
    input.focus(function () {      //获得焦点时触发
        input.css({
            'boxShadow': '0px 0px 6px .1px #00ccf3'
        })
    });
    input.blur(function () {       //失去焦点时触发
        input.css({
            'boxShadow': '0px 0px 0px 0px #00ccf3'
        })
    });
});

/**
 * content-input自动调整
 * 留言内视图高度
 */
function contentheight() {
    if (Width > 1000) {
        $('.content_nest').css('height', Height - 230);
    }
    if (Width > 768 && Width < 1000) {
        $('.content_nest').css('height', Height - 175);
    }
    if (Width < 768) {
        $('.content_nest').css('height', Height - 145);
    }
}


/**
 * 字体浮窗事件
 */
$(function () {
    font_style_state = false;
    font_color_state = false;
    font_iconf_state = false;
    setInterval(function () {
        var font_style_left = $('#font_style').offset().left;
        var font_style_top = $('#font_style').offset().top;
        var font_color_left = $('#font_color').offset().left;
        var font_color_top = $('#font_color').offset().top;
        var font_iconf_left = $('#font_iconf').offset().left;
        var font_iconf_top = $('#font_iconf').offset().top;
        $('.font_style').css({
            'top': font_style_top - 180 + "px",
            'left': font_style_left - 113 + "px"
        })
        $('.font_color').css({
            'top': font_color_top - 180 + "px",
            'left': font_color_left - 113 + "px"
        })
        $('.font_iconf').css({
            'top': font_iconf_top - 180 + "px",
            'left': font_iconf_left - 113 + "px"
        })
    }, 10);
    $('#font_style').click(function () {
        Function($(this).attr('id'));
        font_style_state = !font_style_state;
    });
    $('#font_color').click(function () {
        Function($(this).attr('id'));
        font_color_state = !font_color_state;
    });
    $('#font_iconf').click(function () {
        Function($(this).attr('id'));
        font_iconf_state = !font_iconf_state;
    });
    function Function(ctid) {/**子处理函数 */
        var fontname = $('.' + ctid);
        fontname.toggle();
        fontname.siblings().hide();
    }
})
/**
 * 元素click事件
 */
$(function () {
    $('#Return_TOP').click(function () {     //留言内容返回顶部
        $('.content_nest').animate({ scrollTop: '0px' }, 500);
    });
    $('#Vlookup').click(function () {     //条件筛选留言and条件查找 遮罩层 显示
        $('#fuzzy_searach_shade').css('display', 'inline');
    });
    $('#fuzzy_searach_shade').click(function () {     //条件筛选留言and条件查找 遮罩层 隐藏
        $('#fuzzy_searach_shade').css('display', 'none');
    });
})
/**
 * heid_font_windows_port_setting
 * 关闭字体窗口接口设置
 */
function Hidewindows() {
    font_style_state = false;
    font_color_state = false;
    font_iconf_state = false;
    $('.font_style').hide();
    $('.font_color').hide();
    $('.font_iconf').hide();
}

/**
 * Ctrl+Enter发送留言
 */
function keySend(event) {
    if (event.ctrlKey && event.keyCode == 13) {
        main.addmessage();
    }
}