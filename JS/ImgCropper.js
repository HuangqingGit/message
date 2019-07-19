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
        autoCropArea: 0.97,  //0-1之间的数值，定义自动剪裁区域的大小，默认1
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
        //关闭裁剪框
        $('.close-tailoring').click();
        var User = $.cookie('username');
        //验证cookie是否过期
        if (User == null) {
            User = "";
        }
        if ($("#tailoringImg").attr("src") == null) {
            return false;
        } else {
            var cas = $('#tailoringImg').cropper('getCroppedCanvas');//获取被裁剪后的canvas
            var base64url = cas.toDataURL('image/png'); //转换为base64地址形式
            $('.loader_text').html("加载中");
            $('.Loaders').css('display', 'inline');
            $("#My_img_url").prop("src", base64url);//显示为图片的形式
            $('.userimg').prop("src", base64url);

            var obj = Object();
            obj.file = base64url;
            obj.user = User;
            
            $.ajax({
                type: "post",
                url: '../php/UserImg.php',
                data: obj,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (data.state) {
                        $('.Loaders').css('display', 'none');
                        $('.friendly').css('display','inline');
                        $('.friendly_icon').html("&#xe602;");
                        $('.friendly_icon').css("color","#1afa29");
                        $('.friendly_text').html("上传成功");
                        $('.friendly_text').css('background-color','#00ccf3');
                        setTimeout(function(){
                            $('.friendly').css('display','none');
                        },2000);
                    }
                    else {
                        switch (data.code) {
                            case 1: alert('更新失败'); break;
                            case 2: alert('请求超时!'); break;
                            case 3: alert('身份认证过期请重新登录！');
                                window.location = "http://bk.cxwt.xyz";
                                break;
                        }
                    }
                },
                error: function () {
                    alert('网络错误');
                }
            })
        }
    });
    //关闭裁剪框
    $('.close-tailoring').click(function () {
        $(".tailoring-container").toggle();
    });
    $('.black-cloth').click(function () {
        $(".tailoring-container").toggle();
    });
});