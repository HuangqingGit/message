<?php
include "Server_php/Connect_Server.php";    //引入Mysqli配置
header('Content-Type:application/json; charset=utf-8');

$base64_image = $_POST['file'];     //得到文件对象和用户名
$username = $_POST['user'];
$time = time();
$Wjjoint = $username . '_' . $time;
if (empty($username)) {
    $arr = array(
        'code' => 3,
        'state' => false
    );
    exit(json_encode($arr));
}
//匹配出图片的格式
if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image, $result)) {
    $type = $result[2];
    $new_file_path = "./UserImg/";
    if (!file_exists($new_file_path)) {
        //检查是否有该文件夹，如果没有就创建，并给予最高权限
        mkdir($new_file_path, 0700);
    }
    //拼接文件
    $new_file = $new_file_path . $Wjjoint . ".{$type}";
    //解码图片并且保存
    $results = file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image)));
    //验证保存是否成功
    if ($results) {
        $sql = "SELECT * from user_form where User_ID = '{$username}'";
        $result =  $db->query($sql);            //执行SQL查询语句
        $row = $result->fetch_array();           //获取查询的数据集
        $User_img = $row['User_img'];
        if(strlen($User_img)){
            unlink($User_img);
        }
        $sql = "UPDATE user_form SET User_img = '{$new_file}' WHERE User_ID = '{$username}'";
        $result = $db->query($sql); //执行SQL语句
        if ($result) {
            $arr = array(
                'code' => 0,
                'state' => true,
                'url' => "$new_file"
            );
        } else {
            $arr = array(
                'code' => 1,
                'state' => false
            );
        }
    } else {
        $arr = array(
            'code' => 2,
            'state' => false
        );
    }
    echo json_encode($arr);
}
