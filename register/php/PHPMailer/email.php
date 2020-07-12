<?php

/*发送邮件方法
 *@param $to：接收者 $title：标题 $content：邮件内容
 *@return bool true:发送成功 false:发送失败
 */
$email = $_POST['urlemail'];

$aray = "发送成功！";

function sendMail($to,$title,$content) {
    // 这个PHPMailer 就是之前从 Github上下载下来的那个项目
    require './PHPMailer/PHPMailerAutoload.php';


// 实例化PHPMailer核心类
$mail = new PHPMailer();
// 使用smtp鉴权方式发送邮件
$mail->isSMTP();
// smtp需要鉴权 这个必须是true
$mail->SMTPAuth = true;
// 链接qq域名邮箱的服务器地址
$mail->Host = 'smtp.qq.com';
// 设置使用ssl加密方式登录鉴权
$mail->SMTPSecure = 'ssl';
// 设置ssl连接smtp服务器的远程服务器端口号
$mail->Port = 465;
// 设置发送的邮件的编码
$mail->CharSet = 'UTF-8';
// 设置发件人昵称 显示在收件人邮件的发件人邮箱地址前的发件人姓名
$mail->FromName = '微笑';
// smtp登录的账号 QQ邮箱即可
$mail->Username = '1666385075@qq.com';
// smtp登录的密码 使用生成的授权码
$mail->Password = 'iczvvxnmmtalddia';
// 设置发件人邮箱地址 同登录账号
$mail->From = '1666385075@qq.com';
// 邮件正文是否为html编码 注意此处是一个方法
$mail->isHTML(true);
// 设置收件人邮箱地址
$mail->addAddress($to);
// 添加该邮件的主题
$mail->Subject = $title;
// 添加邮件正文
$mail->Body = $content;
// 为该邮件添加附件
//$mail->addAttachment("Material/11.png");

    // 使用 send() 方法发送邮件
    if(!$mail->send()) {
        echo $aray;
       // return '发送失败: ' . $mail->ErrorInfo;
    } else {
        echo $aray;
    }
}

// 调用发送方法，并在页面上输出发送邮件的状态
sendMail("$email",'邮件测试','邮箱服务器测试内容');
