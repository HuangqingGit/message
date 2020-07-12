<?php
    $host = '139.155.23.116';
    $dbuser = 'User';
    $pwd = 'Cai5201314..+';
    $dbname = 'bysj';

    $db = new mysqli( $host, $dbuser, $pwd, $dbname );//连接数据库
    if ($db->connect_errno <> 0) {  //判断数据库是否连接成功
        echo "数据库连接失败！";
        echo $db->connect_error;
    }
    //设定数据库数据传输编码
    $db->query("SET NAMES UTF8");
?>