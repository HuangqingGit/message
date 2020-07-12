$('#sendauth').click(function () {                      //发送验证码
    var id = userid.val().trim();
    recordTel = id;
    if (!regEmail(id)) {
        hint_con = "邮箱格式不合法";
        id_icon.html('&#xe623;');
        id_mesg.html(hint_con);
        userid.addClass('error').focus().select();
        hint(hint_con, -1);
        return false;
    } else {
        if (queryflag) {
            var emailsend = '../php/email_note.php';
            var code = new Object();
            code.email = id;
            $.ajax({
                url: emailsend,
                type: 'post',
                data: code,
                dataType: 'json'
            })
                .done(function (Get) {
                    if (Get.code) {
                        sendTime();
                        hint('发送成功');
                        Authcode(Get.aray);
                        auth.val('');
                    } else {
                        hint(Get.error, -1);
                    }
                })
        } else {
            id_icon.html('&#xe623;');
            id_mesg.html('发送被终止！邮箱已被注册');
            userid.addClass('error').focus().select();
        }
    }
});

$('#send').click(function () {                                  //提交注册信息
    var EmailURL = "../php/Email.php";                              //电话号码注册请求URL地址
    var EmailObj = new Object();
    EmailObj.Emailid = userid.val().trim();
    EmailObj.pwd = userpwd1.val().trim();
    if (checkinput(false)) {                                     //true为手机注册验证
        if (recordTel == EmailObj.Emailid) {
            if (queryflag) {
                $.ajax({
                    url: EmailURL,
                    type: 'post',
                    data: EmailObj,
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
                                window.location.href = '../succeed/?Url=' + zimu(120) + '&tel=' + encodestr(res.email) + '&id=' + encodestr(res.id);
                            }, 500);
                        } else {
                            if (res.Error == 1062) {
                                id_icon.html('&#xe623;');
                                id_mesg.html('邮箱已被注册啦，换一个试试吧');
                                userid.addClass('error').focus().select();
                            }
                        }
                    });
            } else {
                id_icon.html('&#xe623;');
                id_mesg.html('邮箱已被注册啦，换一个试试吧');
                userid.addClass('error').focus().select();
            }
        } else {
            id_icon.html('&#xe623;');
            id_mesg.html('邮箱效验失败，请使用注册邮箱');
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
        queryObj.type = false;
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
                        id_mesg.html('邮箱已被注册啦，换一个试试吧');
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