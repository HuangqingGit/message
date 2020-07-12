<?php
include "Server_php/Connect_Server.php";
header('Content-Type:application/json; charset=utf-8');
$data = $_POST;     //接收所有数据

function updataUser($Data)  //验证更新参数
{
    if (!isset($_COOKIE['username'])) {
        //读取cookie身份验证是否过期
        return false;
    }
    $user = $_COOKIE['username'];
    if (isset($Data['email'])) {
        $sql = "UPDATE user_form SET User_email = '{$Data['email']}',User_tel='{$Data['phone']}',User_name='{$Data['name']}' WHERE User_ID = '{$user}'";
        return $sql;
    } else {
        $newpwd = md5($Data['new']);
        $sql = "UPDATE user_form SET User_pwd = '{$newpwd}' WHERE User_ID = '{$user}'";
        return $sql;
    }
}

if ($ret = updataUser($data)) {  //调用函数验证更新参数，data是接收到的数据集
    $result = $db->query($ret);
    if ($result) {
        $ary = array(
            'code' => 0,
            'state' => true
        );
    } else {
        $ary = array(
            'code' => 1,
            'state' => false,
            'error' => $db->error,
            'errno' => $db->errno
        );
    }
} else {
    $ary = array(
        'code' => 2,
        'state' => false
    );
}
echo json_encode($ary);
