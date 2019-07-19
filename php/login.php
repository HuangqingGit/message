<?php

include('Server_php/Connect_Server.php'); //引入外部php文件

$User = $_POST['user'];
$Pwd = $_POST['pwd'];

$sql = "SELECT * from user_form where User_ID = '{$User}' and User_pwd= '{$Pwd}'";    //初始SQL查询语句

$result =  $db->query($sql);            //执行SQL查询语句
$row = $result->fetch_array();           //获取查询的数据集
$User_ID = $row['User_ID'];              //单独取出User_ID的值
$User_pwd = $row['User_pwd'];              //单独取出User_pwd的值
$User_type = $row['User_type'];              //单独取出User_type的值
if ($User_ID == $User && $User_pwd == $Pwd) {                       //验证登录返回值如果为 1 则登录成功 为 0 或其他则登录失败
    $login = true;
} else {
    $login = false;
}


$ary = array(
    'login' => "$login",
    'user' => "$User",
    'pwd' => "$Pwd",
    'type' => "$User_type"
);

echo json_encode($ary);
