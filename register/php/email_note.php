<?php

$email = $_POST['email'];
//$email = '1666385076@qq.com';
$aray = rand(111111, 999999);
/**
 * @param {*收件人地址-必须} $to 
 * @param {*邮件主题-必须} $title 
 * @param {*邮件正文-必须} $content
 * @param {*添加附件-可选} $accessory
 */
function sendMail($to, $title, $content, $accessory)
{
    // 这个PHPMailer 就是之前从 Github上下载下来的那个项目
    require './PHPMailer/PHPMailerAutoload.php';
    // 实例化PHPMailer核心类
    $mail = new PHPMailer();
    // 使用smtp鉴权方式发送邮件
    $mail->isSMTP();
    // smtp需要鉴权 这个必须是true
    $mail->SMTPAuth = true;
    // 链接域名邮箱的服务器地址
    $mail->Host = 'smtp.163.com';
    // 设置使用ssl加密方式登录鉴权
    $mail->SMTPSecure = 'ssl';
    // 设置ssl连接smtp服务器的远程服务器端口号
    $mail->Port = 465;
    // 设置发送的邮件的编码
    $mail->CharSet = 'UTF-8';
    // 设置发件人昵称 显示在收件人邮件的发件人邮箱地址前的发件人姓名
    $mail->FromName = '酷创青春科技';
    // smtp登录的账号 QQ邮箱即可
    $mail->Username = 'kcqckj@163.com';
    // smtp登录的密码 使用生成的授权码
    $mail->Password = 'Cai13419067820';
    // 设置发件人邮箱地址 同登录账号
    $mail->From = 'kcqckj@163.com';
    // 邮件正文是否为html编码 注意此处是一个方法
    $mail->isHTML(true);
    // 设置收件人邮箱地址
    $mail->addAddress($to);
    // 添加该邮件的主题
    $mail->Subject = $title;
    // 添加邮件正文
    $mail->Body = $content;
    // 为该邮件添加附件
    $mail->addAttachment($accessory);

    //调用send发送邮件并返回结果
    if (!$mail->send()) {
        return false;
    } else {
        return true;
    }
}

// 调用发送方法，并在页面上输出发送邮件的状态
$res = sendMail($email, "酷创青春注册激活邮箱", "
<!DOCTYPE html>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport'
        content='width=device-width, user-scalable=no, initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <script src='https://js.cxwt.xyz/jquery_min_3.4.1.js'></script>
    <link rel='shortcut icon' href='../img/logo.ico'>

    <style>
        * {
            padding: 0;
            margin: 0;
            text-decoration: none;
        }

        #headerbox,
        #head_logo,
        #head_text,
        .logo_CH,
        .logo_ZH {
            transition: all 0.3s;
        }

        #mainbox {
            display: flex;
            flex-direction: column;
            height: 600px;
            background: url(https://bk.cxwt.xyz/main/img/messageimg.png);
        }

        #headerbox {
            height: 80px;
            background-color: #fcfcfc;
            border-bottom: 1px solid #e6e6e6;
        }

        #footerbox {
            background-color: #fcfcfc;
            border-top: 1px solid #e6e6e6;
        }

        #head_logo,
        #head_text {
            display: inline-block;
            height: 60px;
            padding: 10px;
        }

        #head_logo {
            float: left;
            margin-left: 100px;
        }

        #head_text {
            float: left;
            text-align: center;
        }

        #head_logo img {
            height: 60px;
        }

        .logo_ZH {
            width: 100%;
            height: 40px;
            font-size: 27px;
            letter-spacing: 3px;
            color: #000;
            font-family: 'STXinwei';
            line-height: 40px;

        }

        .logo_CH {
            width: 100%;
            height: 20px;
            font-size: 14px;
            color: #000;
            font-family: 'STXinwei';
            line-height: 20px;
        }

        #main_content {
            flex: 1;
            width: 1000px;
            margin: 30px auto;
            padding: 20px;
            background: #ffffff;
            border: 1px solid #eeeeee;
            border-radius: 8px;
            box-shadow: #e6e6e6 3px 3px 15px 1px;
        }

        #footer_QR {
            width: 200px;
            height: 100px;
            margin: 0 auto;
            margin-top: 5px;
            margin-bottom: 15px;
        }

        .QR {
            width: 100px;
            height: 100px;
            float: left;
            text-align: center;
        }

        .QR img {
            width: 80px;
        }

        .QR div {
            font-weight: initial;
            font-size: 12px;
        }

        .put {
            text-align: center;
            font-size: 14px;
        }

        .put a {
            font-size: 14px;
        }

        #main_content h3 {
            font-weight: lighter;
            padding: 3px;
            margin-bottom: 10px;
        }

        #main_content h4 {
            padding: 10px;
            margin-bottom: 10px;
        }

        #main_content p {
            padding: 10px;
            margin-bottom: 60px;
        }

        #main_content div {
            padding: 5px;
            font-size: 13px;
            text-align: center;
        }

        @media (max-width:640px) {
            #headerbox {
                height: 60px;
            }

            #head_logo {
                margin-left: 30px;
                height: 40px;
            }

            #head_logo img {
                height: 40px;
            }

            #head_text {
                height: 50px;
            }

            .logo_ZH {
                font-size: 20px;
                height: 30px;
                line-height: 30px;
            }

            .logo_CH {
                font-size: 12px;
                height: auto;
            }
        }

        @media (max-width:1000px) {
            #main_content {
                width: 85%;
            }
        }
    </style>
</head>

<body>
    <div id='mainbox'>
        <!-- hint消息尾 -->
        <!-- head头开始 -->
        <header id='headerbox'>
            <span id='head_logo'>
                <img src='https://bk.cxwt.xyz/register/img/logo.png' alt='首页' onclick='home()'>
            </span>
            <span id='head_text'>
                <div class='logo_ZH'>酷创青春科技</div>
                <div class='logo_CH'>COOL YOUTH TECHNOLOGY</div>
            </span>
        </header>
        <!-- head结束 -->
        <!-- content开始 -->
        <div id='main_content'>
            <h3>尊敬的用户您好！</h3>
            <h4>验证码：$aray</h4>
            <p>&emsp;&emsp;您正在使用<a href='mailto:$email' style='color: #7263f3;' title='E-mail地址'>$email</a>邮箱注册
                <a href='https://bk.cxwt.xyz' style='font-size: 14px; color: #7263f3;' title='首页'>酷创青春科技</a>
                请您在5分钟内输入以上6位数字码进行验证，请勿告诉他人，如非本人操作请忽略！
            </p>

            <div>系统邮件请勿回复！<a href='#' style='font-size: 12px; color: #7263f3;' title='退订'>取消订阅</a></div>
        </div>
        <!-- content结束 -->
        <!-- footer开始 -->
        <footer id='footerbox'>
            <div id='footer_QR'>
                <div class='QR'>
                    <img src='https://bk.cxwt.xyz/register/img/oaqr.jpg' alt='微信公众号'>
                    <div>微信公众号</div>
                </div>
                <div class='QR'>
                    <img src='https://bk.cxwt.xyz/register/img/grwx.jpg' alt='管理员微信'>
                    <div>管理员微信</div>
                </div>
            </div>
            <div class='put'>
                Copyright © 2019 <a href='https://bk.cxwt.xyz' title='首页'>酷创青春科技</a> 蜀ICP备19007129号
            </div>
        </footer>
        <!-- footer结束 -->
    </div>
</body>

</html>
", "");

$result = array(
    'aray' => $aray,
    'code' => $res
);

echo json_encode($result);
