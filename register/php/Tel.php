<?php
include "Server_php/Connect_Server.php";
$code = $_POST;


function Insertsuer($db, $Telid, $pwd)
{
    $ar = rand(3, 5);
    $b = '';
    for ($i = 0; $i < $ar; $i++) {
        // 使用chr()函数拼接双字节汉字，前一个chr()为高位字节，后一个为低位字节
        $a = chr(mt_rand(0xB0, 0xD0)) . chr(mt_rand(0xA1, 0xF0));
        // 转码
        $b .= iconv('GB2312', 'UTF-8', $a);
    }
    $aray = rand(10000000, 99999999);                               //rand()函数生成随机生成ID号
    $insert_sql = "INSERT INTO user_form (User_type,User_ID,User_pwd,User_name,User_tel) 
        VALUES ('4','{$aray}','{$pwd}','{$b}','{$Telid}')";

    $result =  $db->query($insert_sql);
    $arry = array(
        "res" => $result,
        "aray" => $aray,
        "pwd" => $pwd,
        "name" => $b
    );
    return $arry;
}
start: //$res = Insertsuer($db, '18206016', '21232f297a57a5a743894a0e4a801fc3');
$res = Insertsuer($db, $code['Telid'], md5($code['pwd']));
if ($res['res']) {
    $result = array(
        "code" => true,
        "name" => $res['name'],
        "Tel" => $code['Telid'],
        "id" => $res['aray'],
        "pwd" => $res['pwd']
    );
} else {
    if ($db->error == "Duplicate entry '" . $res['aray'] . "' for key 'User_ID'") {
        goto start;
    } else {
        $result = array(
            "code" => false,
            "Error" => $db->errno
        );
    }
}
echo json_encode($result);
