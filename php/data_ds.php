<?php
include "Server_php/Connect_Server.php";

$User = $_POST['user'];

$sql = "SELECT * from user_form where User_ID = '{$User}'";    //初始SQL查询语句

$result =  $db->query($sql);            //执行SQL查询语句
$row = $result->fetch_array();           //获取查询的数据集
$User_ID = $row['User_ID'];              //单独取出User_ID的值
$User_pwd = $row['User_pwd'];              //单独取出User_pwd的值
$User_type = $row['User_type'];              //单独取出User_type的值

$ary = array(
    'User_ID' => "$User_ID",
    'User_pwd' => "$User_pwd",
    'User_type' => "$User_type"
);

echo json_encode($row);
