<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>酷创青春—用户注册</title>
    <meta name="keywords" content="Open Lab,云平台,酷创,酷创青春科技,开放实验室管理系统,学生系统管理,毕业设计,选题系统,留言板,教育信息化,毕业设计选题系统">
    <meta name="description" content="Open Lab,云平台,酷创,酷创青春科技,开放实验室管理系统,广元市四川信息职业技术学院学生团队研发,学生管理-课题提交,留言互动">

    <link rel="shortcut icon" href="../img/logo.ico">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="https://at.alicdn.com/t/font_1268951_l2dsg7u5fkg.css">
    <script src="https://js.cxwt.xyz/jquery_min_3.4.1.js"></script>
    <script src="https://js.cxwt.xyz/jquery_cookie.js"></script>
    <script src="https://js.cxwt.xyz/jscook.min.js"></script>
    <script>
        objec = new Object();
        objec.id = "<?php echo $_GET['id'] ?>";
        objec.pwd1 = "<?php echo $_GET['pd1'] ?>";
        objec.pwd2 = "<?php echo $_GET['pd2'] ?>";
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
        <!-- content_head -->
        <div id="content_head">
            <div class="cont_head_zh">欢迎注册</div>
            <div class="cont_head_ch">━━━REGLSTER━━━</div>
        </div>
        <div id="zc_type">
            <div class="zc_box">
                <div id="tel" class="box_div" title="手机注册">电话注册</div>
                <div id="email" class="box_div" title="邮箱注册">邮箱注册</div>
            </div>
        </div>
        <div id="form">

            <div class="in">
                <div class="ic">
                    <i class="iconfont id_icon"></i>
                    <span class="text_mesg id_mesg"></span>
                </div>
                <input id="userid" onkeydown="remove(event,'')" type="text" class="input_text" placeholder=" 请输入电话号码" maxlength="30" oninput="User_query()">
            </div>
            <div class="in">
                <div class="ic">
                    <i class="iconfont pwd1_icon"></i>
                    <span class="text_mesg pwd1_mesg"></span>
                </div>
                <input id="userpwd1" onkeydown="remove(event,'pwd1')" type="password" class="input_text" placeholder=" 请输入密码" maxlength="16">
            </div>
            <div class="in">
                <div class="ic">
                    <i class="iconfont pwd2_icon"></i>
                    <span class="text_mesg pwd2_mesg"></span>
                </div>
                <input id="userpwd2" onkeydown="remove(event,'pwd1')" type="password" class="input_text" placeholder=" 请再次输入密码" maxlength="16">
            </div>
            <div class="in">
                <div class="ic">
                    <i class="iconfont auth_icon"></i>
                    <span class="text_mesg auth_mesg"></span>
                </div>
                <div class="yz">
                    <input id="auth" onkeydown="remove(event,'auht')" type="text" class="input_text" placeholder=" 请输入验证码" maxlength="6">
                    <button id="sendauth" class="the">发送验证码</button>
                </div>
            </div>
            <div class="in ini">
                <div class="yz">
                    <i id="accept" class="iconfont">&#xe61d;</i>
                    <span class="accept_text">我已认真阅读并同意酷创青春科技的</span>
                    <a id="clause" href="" class="the">《服务条款》</a>
                </div>
            </div>
            <div class="in">
                <button id="send" class="the input_text">提交注册</button>
            </div>
            <div class="in">
                <a id="login" class="the" href="/">已有账号，立即登录</a>
            </div>
        </div>
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
    <script src="../js/conf.js"></script>
</body>

</html>