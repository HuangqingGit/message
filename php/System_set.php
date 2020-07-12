<?php
include "Server_php/Connect_Server.php";        //引入MySQL配置

$sql = "SELECT * from System_set";    //初始SQL查询语句

$result =  $db->query($sql);            //执行SQL查询语句
$row = $result->fetch_assoc();           //获取查询的数据集

echo json_encode($row);
