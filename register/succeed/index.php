<?php
if (!isset($_GET['tel']) || !isset($_GET['id'])) {  //验证get是否存在如不存在跳出错误页
    Header("Location: /404.html");
}
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>酷创青春—注册成功</title>
    <meta name="keywords" content="Open Lab,云平台,酷创,酷创青春科技,开放实验室管理系统,学生系统管理,毕业设计,选题系统,留言板,教育信息化,毕业设计选题系统">
    <meta name="description" content="Open Lab,云平台,酷创,酷创青春科技,开放实验室管理系统,广元市四川信息职业技术学院学生团队研发,学生管理-课题提交,留言互动">

    <link rel="shortcut icon" href="../img/logo.ico">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/max640.css">
    <link rel="stylesheet" href="https://at.alicdn.com/t/font_1268951_l2dsg7u5fkg.css">
    <script src="https://js.cxwt.xyz/jquery_min_3.4.1.js"></script>
    <script src="https://js.cxwt.xyz/jquery_cookie.js"></script>
    <script src="https://js.cxwt.xyz/jscook.min.js"></script>
    <script>
        objec = new Object();
        objec.id = "<?php echo $_GET['id'] ?>";
        objec.tel = "<?php echo $_GET['tel'] ?>";
    </script>
</head>

<body>
    <!-- hint消息头 -->
    <div id="hint_box">
        <i id="close_hint" class="iconfont hint_icon">&#xed23;</i>
        <span class="hint">
            <span class="hint_content"></span>
        </span>
    </div>
    <!-- hint消息尾 -->
    <!-- head头开始 -->
    <header>
        <span id="head_logo">
            <img src="../img/logo.png" alt="首页" onclick="home()">
        </span>
        <span id="head_text">
            <div class="logo_ZH">酷创青春—注册</div>
            <div class="logo_CH">COOL YOUTH REGISTER</div>
        </span>
    </header>
    <!-- head结束 -->
    <!-- content开始 -->
    <div id="main_content">
        <div id="okbox">
            <div id="okicon" class="iconfont">&#xe625;</div>
            <div id="oktext">注册成功</div>
        </div>
        <div class="welcome">
            终于等到你
        </div>
        <div class="motto">
            星辰大海，我们一直在这里等你^ v ^
        </div>
        <div id="usermes">
            <div class="userimg"><img src="img/K.png" alt=""></div>
            <div class="userid" id="zcid"></div>
            <div class="userid" id="xtid"></div>
            <div class="img"><img src="img/tree.png" alt=""></div>
            <div class="home">马上登录</div>
            <div class="identity"><a href="">高级身份认证>></a></div>
        </div>
        <div class="Tips">如遇注册成功却不能正常登录请与管理员联系</div>
    </div>
    <!-- content结束 -->
    <!-- footer开始 -->
    <footer>
        <div id="footer_QR">
            <div class="QR">
                <img src="../img/oaqr.jpg" alt="微信公众号">
                <div>微信公众号</div>
            </div>
            <div class="QR">
                <img src="../img/grwx.jpg" alt="管理员微信">
                <div>管理员微信</div>
            </div>
        </div>
        <div class="put">
            Copyright © 2019 <a href="/">酷创青春科技</a> 蜀ICP备19007129号
        </div>
    </footer>
    <!-- footer结束 -->
    <script src="js/index.js"></script>
</body>

</html>