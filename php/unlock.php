<?php
include('Server_php/Connect_Server.php'); //引入外部php文件

$User = $_POST['id'];
$Pwd = md5($_POST['pwd']);
$Utype = usertype($User);
/**
 * 用户类型验证
 * @param[* $verifyUser] 验证字段
 */
function usertype($verifyUser)
{
    if (preg_match('/^(1(([35789][0-9])|(47)))\d{8}$/', $verifyUser)) {
        return 'User_tel';
    }
    if (preg_match('|^\d{8}$|', $verifyUser)) {
        return 'User_ID';
    }
    // $pattern = '/^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/';
    //@前面的字符可以是英文字母和._- ，._-不能放在开头和结尾，且不能连续出现
    if (preg_match('/^[a-z0-9]+([._-][a-z0-9]+)*@([0-9a-z]+\.[a-z]{2,14}(\.[a-z]{2})?)$/i', $verifyUser)) {
        return 'User_email';
    }
    return false;
}

/**
 * 验证用户类型是否合法
 */
if (!$Utype) {
    $code = false;
} else {
    $sql = "SELECT count(*) from user_form where {$Utype} = '{$User}' and User_pwd= '{$Pwd}'";    //初始SQL查询语句
    $result =  $db->query($sql);            //执行SQL查询语句
    $row = $result->fetch_array();          //获取查询的数据集
    $count = $row['count(*)'];
}


if ($count == 1) {
    $ary = array(
        "code" => true
    );
} else {
    $ary = array(
        "code" => false
    );
}

echo json_encode($ary);
