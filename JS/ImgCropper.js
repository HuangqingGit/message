//图像上传
function selectImg(file) {
    if (!file.files || !file.files[0]) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (evt) {
        var replaceSrc = evt.target.result;
        //更换cropper的图片
        $('#tailoringImg').cropper('replace', replaceSrc, false); //默认false，适应高度，不失真
    }
    reader.readAsDataURL(file.files[0]);
}
$(function () {
    //弹出框水平垂直居中
    (window.onresize = function () {
        var win_height = $(window).height();
        var win_width = $(window).width();
        if (win_width <= 768) {
            $(".tailoring-content").css({
                "top": (win_height - $(".tailoring-content").outerHeight()) / 2,
                "left": 0
            });
        } else {
            $(".tailoring-content").css({
                "top": (win_height - $(".tailoring-content").outerHeight()) / 2,
                "left": (win_width - $(".tailoring-content").outerWidth()) / 2
            });
        }
    })();

    //弹出图片裁剪框
    $(".update_img > div").click(function () {
        $(".tailoring-container").toggle();
    });
    //cropper图片裁剪
    $('#tailoringImg').cropper({
        aspectRatio: 1 / 1,//默认比例
        preview: '.previewImg',//预览视图
        guides: true,  //裁剪框的虚线(九宫格)
        autoCropArea: 1,  //0-1之间的数值，定义自动剪裁区域的大小，默认1
        movable: false, //是否允许移动图片
        dragCrop: true,  //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
        movable: true,  //是否允许移动剪裁框
        resizable: true,  //是否允许改变裁剪框的大小
        zoomable: false,  //是否允许缩放图片大小
        mouseWheelZoom: false,  //是否允许通过鼠标滚轮来缩放图片
        touchDragZoom: false,  //是否允许通过触摸移动来缩放图片
        rotatable: true,  //是否允许旋转图片
        crop: function (e) {
            // 输出结果数据裁剪图像。
        }
    });
    //旋转
    $(".cropper-rotate-btn").click(function () {
        $('#tailoringImg').cropper("rotate", 45);
    });
    //复位
    $(".cropper-reset-btn").click(function () {
        $('#tailoringImg').cropper("reset");
    });
    //换向
    var flagX = true;
    $(".cropper-scaleX-btn").click(function () {
        if (flagX) {
            $('#tailoringImg').cropper("scaleX", -1);
            flagX = false;
        } else {
            $('#tailoringImg').cropper("scaleX", 1);
            flagX = true;
        }
        flagX != flagX;
    });

    //裁剪后的确认处理
    $("#sureCut").click(function () {
        loading_text('正在更新头像');
        var User = $.cookie('username');
        //验证cookie是否过期
        if (User == null) {
            User = "";
        }
        if ($("#tailoringImg").attr("src") == null) {
            return false;
        } else {
            var cas = $('#tailoringImg').cropper('getCroppedCanvas');//获取被裁剪后的canvas
            var base64url = cas.toDataURL('image/jpg', 0.1); //转换为base64地址形式

            var obj = Object();
            obj.file = base64url;
            obj.user = User;
            var imgUpTime = setTimeout(() => {
                $("#sureCut").click();
            }, 2000);
            $.ajax({
                type: "post",
                url: '../php/UserImg.php',
                data: obj,
                dataType: 'json'
            })
                .done(function (data) {
                    if (data.state) {
                        clearTimeout(imgUpTime);
                        $('.close-tailoring').click();  //关闭裁剪框
                        $('.Loaders').stop(true, true);
                        loading_text('', 0);
                        $('.friendly').fadeToggle();
                        $('#friendly_icon').html("&#xe602;");
                        $('#friendly_icon , .friendly_text').css("color", "#fff");
                        $('.friendly_text').html("上传成功");
                        $('.friendly').css('background', '#009a61');
                        $('.friendly').fadeToggle(2000);
                        $("#My_img_url , .userimg").prop("src", base64url);//显示为图片的形式
                        User_initialize();
                    }
                    else {
                        clearTimeout(imgUpTime);
                        switch (data.code) {
                            case 1:
                                $('.Loaders').stop(true, true);
                                $('.Loaders').fadeToggle(600);
                                $('.friendly').fadeToggle();
                                $('#friendly_icon').html("&#xec78;");
                                $('#friendly_icon , .friendly_text').css("color", "#fff");
                                $('.friendly_text').html("更新失败");
                                $('.friendly').css('background', '#e24567');
                                $('.friendly').fadeToggle(2000);
                                break;
                            case 2:
                                $('.Loaders').stop(true, true);
                                $('.Loaders').fadeToggle(600);
                                $('.friendly').fadeToggle();
                                $('#friendly_icon').html("&#xe66d;");
                                $('#friendly_icon , .friendly_text').css("color", "#fff");
                                $('.friendly_text').html("请求超时");
                                $('.friendly').css('background', '#e24567');
                                $('.friendly').fadeToggle(2000);
                                break;
                            case 3: alert('身份认证过期请重新登录！');
                                window.location = "http://bk.cxwt.xyz";
                                break;
                        }
                    }
                })
                .fail(function () {
                    clearTimeout(imgUpTime);
                    $('.Loaders').stop(true, true);
                    $('.Loaders').fadeToggle(600);
                    $('.friendly').fadeToggle();
                    $('#friendly_icon').html("&#xe66d;");
                    $('#friendly_icon , .friendly_text').css("color", "#fff");
                    $('.friendly_text').html("文件过大");
                    $('.friendly').css('background', '#e24567');
                    $('.friendly').fadeToggle(2000);
                });

        }
    });
    //关闭裁剪框
    $('.close-tailoring').click(function () {
        $(".tailoring-container").fadeOut();
    });
    $('.black-cloth').click(function () {
        $(".tailoring-container").fadeOut();
    });
});