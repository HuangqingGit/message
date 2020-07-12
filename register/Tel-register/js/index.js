
$('#sendauth').click(function () {                      //发送验证码
    var id = userid.val().trim();
    recordTel = id;
    if (!regPhone(id)) {
        hint_con = "手机号码不合法";
        id_icon.html('&#xe623;');
        id_mesg.html('手机号码不合法');
        userid.addClass('error').focus().select();
        hint(hint_con, -1);
        return false;
    } else {
        if (queryflag) {
            var Telsend = '../php/phone_note.php';
            var code = new Object();
            code.Telnum = id;
            $.ajax({
                url: Telsend,
                type: 'post',
                data: code,
                dataType: 'json'
            })
                .done(function (Get) {
                    if (Get.code == 0) {
                        sendTime();
                        hint('发送成功');
                        Authcode(Get.aray);
                        auth.val('');
                    } else {
                        hint(Get.message, -1);
                    }
                })
        } else {
            id_icon.html('&#xe623;');
            id_mesg.html('发送被终止！手机号已被注册');
            userid.addClass('error').focus().select();
        }
    }
});

$('#send').click(function () {                                  //提交注册信息
    var TelURL = "../php/Tel.php";                              //电话号码注册请求URL地址
    var TelObj = new Object();
    TelObj.Telid = userid.val().trim();
    TelObj.pwd = userpwd1.val().trim();
    if (checkinput(true)) {                                     //true为手机注册验证
        if (recordTel == TelObj.Telid) {
            if (queryflag) {
                $.ajax({
                    url: TelURL,
                    type: 'post',
                    data: TelObj,
                    dataType: 'json'
                })
                    .done(function (res) {
                        if (res.code) {
                            var date = new Date();
                            var cookieTime = 60 * 60 * 1000;//身份有效时间
                            date.setTime(date.getTime() + cookieTime);
                            $.cookie('username', res.id, { expires: date, path: '/' });
                            $.cookie('password', res.pwd, { expires: date, path: '/' });
                            setTimeout(function () {
                                window.location.href = '../succeed/?Url=' + zimu(120) + '&tel=' + encodestr(res.Tel) + '&id=' + encodestr(res.id);
                            }, 500);
                        } else {
                            if (rescode.Error == 1062) {
                                id_icon.html('&#xe623;');
                                id_mesg.html('该手机号已被注册啦，换一个试试吧');
                                userid.addClass('error').focus().select();
                            }
                        }
                    });
            } else {
                id_icon.html('&#xe623;');
                id_mesg.html('该手机号已被注册啦，换一个试试吧');
                userid.addClass('error').focus().select();
            }
        } else {
            id_icon.html('&#xe623;');
            id_mesg.html('手机号效验失败，请使用注册手机');
            userid.addClass('error').focus().select();
        }
    }
});

/**
 * 用户查询集
 */
function User_query() {
    var id = userid.val().trim();
    var queryUrl = "../php/User_query.php";
    if (id != "" && id != null) {
        var queryObj = new Object();
        queryObj.id = id;
        queryObj.type = true;
        $.ajax({
            url: queryUrl,
            type: 'post',
            data: queryObj,
            dataType: 'json'
        })
            .done(function (code) {
                if (code.code) {
                    if (parseInt(code.row)) {
                        queryflag = false;
                        id_icon.html('&#xe623;');
                        id_mesg.html('该手机号已被注册啦，换一个试试吧');
                    } else {
                        queryflag = true;
                        id_icon.html('');
                        id_mesg.html('');
                    }
                } else {

                }
            })
    } else {
        id_icon.html('');
        id_mesg.html('');
    }
}