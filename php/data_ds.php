<?php
include "Server_php/Connect_Server.php";

$User = $_POST['user'];
$Pwd = $_POST['pwd'];

$sql = "SELECT * from user_form where User_ID = '{$User}'and User_pwd = '{$Pwd}'";    //初始SQL查询语句

$result =  $db->query($sql);            //执行SQL查询语句
$row = $result->fetch_assoc();           //获取查询的数据集

if ($result) {
    $code = true;
    $error = '';
    $errno = '';
} else {
    $code = false;
    $error = $db->error;
    $errno = $db->errno;
}

$ary = array(
    'code' => $code,
    'row' => $row,
    'error' => $error,
    'errno' => $errno
);
echo json_encode($ary);
