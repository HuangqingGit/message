<?php
include "Server_php/Connect_Server.php";
$code = $_POST;


/**
 * 手机号注册用户查询
 */
function TEL($db, $id)
{
    $sql = "SELECT count(*) FROM user_form where User_tel = '{$id}'";
    $result = $db->query($sql);
    return $result;
}
/**
 * 邮箱注册用户查询
 */
function Email($db, $id)
{
    $sql = "SELECT count(*) FROM user_form where User_email = '{$id}'";
    $res = $db->query($sql);
    return $res;
}


if ($code['type'] == 'true') {
    $res = TEL($db, $code['id']);
} else {
    $res = Email($db, $code['id']);
}
$row = $res->fetch_array();
$ary = array(
    'code' => true,
    'row' => $row['count(*)']
);
echo json_encode($ary);
