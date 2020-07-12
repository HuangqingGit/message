<?php
include "Server_php/Connect_Server.php";
header('Content-Type:application/json; charset=utf-8');
$Data = $_POST;
/**
 * 身份验证
 */
function verify()
{
    if (!isset($_COOKIE['username'])) {
        return false;
    } else {
        return true;
    }
}
/**
 * 全局字段变量
 */
$student_name = "User_name";
$student_id = "LY_ID";
$Department_id = "belong_Department";
$class_id = "belong_Class";
$Tinme_quantum = "LY_time";

/**
 * 公共查询全局查询接口
 * @param{*数据库操作必要参数} $db
 */
function ds_getData($db, $name)
{
    //预定义查询语句
    $ds_sql_0 = "SELECT user_leave.*,user_form.User_name,user_form.User_type,user_form.User_img from user_leave 
        RIGHT JOIN user_form ON user_leave.LY_ID = user_form.User_ID WHERE LY_ID != '' ORDER BY ID DESC";   //LIMIT num 设置查询限制 需放在命令最后

    $ds_sql_1 = "SELECT * FROM praise_form WHERE praise_ID='{$name}'";

    //内容查询
    $result_0 =  $db->query($ds_sql_0);
    $res0 = [];
    while ($row0 = $result_0->fetch_array(MYSQLI_ASSOC)) {
        $res0[] = $row0;
    }

    //赞查询
    $result_1 =  $db->query($ds_sql_1);
    $res1 = [];
    while ($row1 = $result_1->fetch_array(MYSQLI_ASSOC)) {
        $res1[] = $row1;
    }
    $array1[0] = $res0;
    $array1[1] = $res1;
    return $array1;
}

/**
 * 条件查询
 * @param{*数据库操作必要参数} $db
 * @param{*需要查询的字段名} $field
 * @param{*需要查询的条件参数} $name
 */
function where_getData($db, $field, $name)
{
    //预定义查询语句
    $where_sql = "SELECT user_leave.*,user_form.User_name,user_form.User_img from user_leave
        RIGHT JOIN user_form ON user_leave.LY_ID = user_form.User_ID where {$field} = '{$name}' ORDER BY ID DESC ";

    $result =  $db->query($where_sql);
    $res = [];
    while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $res[] = $row;
    }
    return $res;
}

/**
 * @param{*数据库操作必要参数} $db
 * @param{*用户ID} $UserId
 * @param{*添加内容} $Content
 * @param{*字体颜色} $fontColor
 * @param{*字体样式} $font
 */
function Insert_setData($db, $UserId, $Content, $fontColor, $Time, $font)
{
    $leaveID = $UserId . '_' . $Time;
    $insert_sql = "INSERT INTO user_leave (LY_ID,leave_ID,LY_content,LY_font_color,LY_time,LY_font_face,LY_praise_num,LY_comment_num) 
        VALUES ('{$UserId}','{$leaveID}','{$Content}','{$fontColor}','{$Time}','{$font}',0,0)";

    $result =  $db->query($insert_sql);
    return $result;
}

/**
 * @param{*数据库操作必要参数} $db
 * @param{*点赞用户的ID} $UserId
 * @param{*要修改的留言ID} $Leave_Id
 * @param{*要修改的类型} $Up_Type
 */
function Update_setData($db, $UserId, $Leave_Id, $Up_Type)
{
    $sql = "SELECT count(*) FROM praise_form WHERE praise_ID='{$UserId}' and lea_ID='{$Leave_Id}'";
    $res_c =  $db->query($sql);
    $row = $res_c->fetch_array();
    if ((int) $Up_Type) { //为真就 加 反之就 减
        $update_sql[0] = "UPDATE user_leave SET LY_comment_num = LY_comment_num+1 WHERE leave_ID='{$Leave_Id}'";
        $update_sql[1] = "UPDATE praise_form SET state = 1 WHERE praise_ID='{$UserId}' and lea_ID='{$Leave_Id}'";
    } else {
        $update_sql[0] = "UPDATE user_leave SET LY_comment_num = LY_comment_num-1 WHERE leave_ID='{$Leave_Id}'";
        $update_sql[1] = "UPDATE praise_form SET state = 0 WHERE praise_ID='{$UserId}' and lea_ID='{$Leave_Id}'";
    }
    if (!$row['count(*)']) {
        $update_sql[1] = "INSERT INTO praise_form (praise_ID,lea_ID,state) VALUES ('{$UserId}','{$Leave_Id}',1)";
    }
    $res_z =  $db->query($update_sql[0]);
    $res_s =  $db->query($update_sql[1]);
    if ($res_z && $res_s) {
        $result = true;
    } else {
        $result = false;
    }
    return $result;
}

if (verify()) { //验证身份
    switch ($Data['code']) {
        case 'empty': //全局查询
            $ret = ds_getData($db, $_COOKIE['username']);
            $arr = array(
                'retdata' => $ret[0],
                'praise' => $ret[1]
            );
            echo json_encode($arr);
            break;
        case 'Insert': //添加留言
            if (Insert_setData($db, $_COOKIE['username'], $Data['leaveContent'], $Data['fontColor'], $Data['timestamp'], $Data['typeFace'])) {
                $code = true;
            } else {
                $code = false;
            }
            $arr = array(
                'code' => $code
            );
            echo json_encode($arr);
            break;
        case 'condition': //条件查询
            $ret = where_getData($db, $student_id, '17206099');
            if (!$res) {
                $code = false;
            } else {
                $code = true;
            }
            $arr = array(
                'code' => $code
            );
            echo json_encode($ret);
            break;
        case 'praise': //修改点赞
            if (Update_setData($db, $_COOKIE['username'], $Data['leave_Id'], $Data['up_Type'])) {
                $arr = array(
                    'code' => true
                );
            } else {
                $arr = array(
                    'code' => false,
                    'error' => $db->error,
                    'errno' => $db->errno
                );
            }

            echo json_encode($arr);
            break;
    }
} else {
    $arr = array(
        'code' => false
    );
    echo json_encode($arr);
}
