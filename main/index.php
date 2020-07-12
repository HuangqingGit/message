<?php
if (!isset($_GET['typ'])) {  //验证get是否存在如不存在跳出错误页
    Header("Location: /404.html");
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset='UTF-8'>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8">
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>毕业设计选题系统</title>
    <link rel="shortcut icon" href="/img/logo2.png">
    <link rel='stylesheet' href='/css/style.css'>
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="https://at.alicdn.com/t/font_1268951_gjt497ew16.css">
    <link rel="stylesheet" href="https://js.cxwt.xyz/cropper.min.css">
    <script src="https://js.cxwt.xyz/jquery_min_3.4.1.js"></script>
    <script src='https://js.cxwt.xyz/jscook.min.js'></script>
    <script src="https://js.cxwt.xyz/ajaxfileupload.min.js"></script>
    <script src='https://js.cxwt.xyz/jquery_cookie.min.js'></script>
    <script src='https://js.cxwt.xyz/cropper.min.js'></script>
    <script src='https://js.cxwt.xyz/vue.min.js'></script>
    <script src="/JS/project-public.js"></script>
    <script>
        var userid = $.cookie('username');
        var userpwd = $.cookie('password');
        var typ = '<?php echo $_GET['typ'] ?>';
        if (userid == '' || userid == null || userpwd == '' || userpwd == null) {
            window.location.href = "/";
        }
        typ = decodestr(typ);
    </script>
</head>

<body>
    <!-- 文字提示 -->
    <div class="friendly">
        <div class="iconfont" id="friendly_icon"></div>
        <text class="friendly_text"></text>
    </div>
    <div class="newss">
        <!-- 操作提示 -->
        <div class="information"></div>
    </div>

    <!--图片裁剪框 start-->
    <div style="display: none" class="tailoring-container">
        <div class="black-cloth"></div>
        <div class="tailoring-content">
            <div class="tailoring-content-one">
                <label title="上传图片" for="chooseImg" class="l-btn choose-btn">
                    <input type="file" accept="image/jpg,image/jpeg,image/png" id="chooseImg" class="hidden" onchange="selectImg(this)">
                    选择图片
                </label>
                <div class="close-tailoring">×</div>
            </div>
            <div class="tailoring-content-two">
                <div class="tailoring-box-parcel">
                    <img id="tailoringImg">
                </div>
                <div class="preview-box-parcel">
                    <p>图片预览：</p>
                    <div class="square previewImg"></div>
                    <div class="circular previewImg"></div>
                </div>
            </div>
            <div class="tailoring-content-three">
                <button class="l-btn cropper-reset-btn">复位</button>
                <button class="l-btn cropper-rotate-btn">旋转</button>
                <button class="l-btn cropper-scaleX-btn">换向</button>
                <button class="l-btn sureCut" id="sureCut">确定</button>
            </div>
        </div>
    </div>

    <!-- Loaded遮罩层 -->
    <div class="Loaders">
        <div class="loader">
            <div class="loader-inner ball-spin-fade-loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="loader_text"></div>
        </div>
    </div>

    <!-- 弹窗提示确认框 -->
    <div class="masking">
        <div class="remind">
            <div class="log-icon">
                <text class="iconfont">&#xe727;</text>
                <text class="text">消息</text>
            </div>
            <div class="news"></div>
            <div class="buttonfun">
                <div class="but" id="butt1">
                    取消
                </div>
                <div class="butt"></div>
                <div class="but" id="butt2">
                    确认
                </div>
            </div>
        </div>
    </div>

    <!-- 长时间未操作锁定系统 -->
    <div class="lock_Windows">
        <div class="locklogo">
            <i class="iconfont">&#xe63b;</i>
        </div>
        <div class="locktext">
            <text>系统检测到您长时间未操作，现已将系统锁定！</text>
        </div>
        <div class="validate_pwd">
            <div class="validate_text"></div>
            <input type="password" autocomplete="off" id="validate_pwd">
            <div class="validate_but">
                <i class="iconfont">&#xe61a;</i>
            </div>
        </div>
    </div>

    <!-- 个人中心 -->
    <div class="personal_center">
        <div class="center">
            <div class="top_center">
                <!-- top关闭 -->
                <div class="top_img">
                    <img src="../img/x.png" alt="关闭">
                </div>
            </div>
            <div class="My_center">
                <div class="My_center_tow">
                    <div class="My_top">
                        <div class="My_img">
                            <img id="My_img_url">
                        </div>
                        <input type="file" id="chooseImg" class="hidden" name="My_file">
                        <div class="update_img">
                            <div>更换头像</div>
                        </div>
                    </div>
                    <div id="My_botton">
                        <div class="personal_data">
                            <div class="My_data_text">
                                <div id="text_t1">个人资料</div>
                                <div id="text_t2" class="text_grzl iconfont">&#xe6df;</div>
                            </div>
                            <div class="My_data_number">
                                <div id="number_t1">编号</div>
                                <div id="number_t2">
                                    <input type="text" id="number" disabled>
                                </div>
                            </div>
                            <div class="My_data_name">
                                <div id="name_t1">姓名</div>
                                <div id="name_t2">
                                    <input type="text" id="name" disabled>
                                </div>
                            </div>
                            <div class="My_data_email">
                                <div id="email_t1">邮箱</div>
                                <div id="email_t2">
                                    <input type="text" id="email" disabled>
                                </div>
                            </div>
                            <div class="My_data_phone">
                                <div id="phone_t1">电话</div>
                                <div id="phone_t2">
                                    <input type="text" id="phone" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="update_pwd">
                            <div class="update_pwd_text">
                                <div id="text_t1">修改密码</div>
                                <div id="text_t2" class="text_pwd iconfont">&#xe6df;</div>
                            </div>
                            <div class="update_pwd_new">
                                <div id="new_t1">新密码</div>
                                <div id="new_t2">
                                    <input type="password" id="new" disabled>
                                </div>
                            </div>
                            <div class="update_pwd_ok">
                                <div id="ok_t1">确认</div>
                                <div id="ok_t2">
                                    <input type="password" id="ok" disabled>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 模糊搜索遮罩层 -->
    <div id="fuzzy_searach_shade">
        <div class="searach_view">

        </div>
    </div>
    <!-- 主视图 -->
    <div class='bodydiv'>
        <div class='head'>
            <!-- 头部div -->
            <div class='headlogo'>
                <!-- logo和文字 -->
                <div class="logo-img">
                    <img src='../img/logo2.png'>
                </div>
                <div class="logo-text">酷创青春科技——毕业设计选题系统</div>
            </div>
            <div class='usermessage' v-cloak>
                <!-- 用户信息面板 -->
                <div class='help'>
                    <!-- 帮助 -->
                    你好，{{datas.User_name}}（{{datas.User_ID}}）
                </div>
                <div class='username'>
                    <!-- 用户 -->
                    <div class='headportrait'>
                        <!-- 用户头像 -->
                        <img class="userimg" :src="datas.User_img ? '../php' + datas.User_img : '../img/K.png'">
                    </div>
                    <div class='div' id="personal">个人中心</div>
                    <div class='div' id="">系统管理</div>
                    <div class='div' id="">消息中心</div>
                    <div class='div' id="logout">注销</div>
                </div>
            </div>
        </div>
        <div id='content'>
            <!-- 文章div -->
            <div id='menus'>
                <!-- 左div -->
                <!-- 菜单栏渲染列表 -->
                <div id='menu'>
                    <ul v-for='list,index in lists' :key="index">
                        <li :id="list.id" class='one-catalog' @click='curShow(list)'>
                            <i class="iconfont" v-html="list.icon"></i>
                            <i class='one-menu'>{{list.name}}
                                <b :class="list.flag? 'LIST_DOWN':'LIST_UP'">^</b>
                            </i>
                        </li>
                        <ul v-show='list.flag'>
                            <li class='two-catalog' v-for='sub in list.subLists' @click="liClick(sub.Url)">
                                <i class="iconfont" v-html="sub.icon"></i>
                                <i class='tow-menu' target="ifram">{{sub.name}}</i>
                            </li>
                        </ul>
                    </ul>
                </div>
            </div>
            <div id="pack">
                <i id="pack_icon" class="iconfont">&#xe660;</i>
            </div>
            <div id='article'>
                <!-- 右div -->
                <div class="articlesubset" id="Win_5">
                    <div class="plate">
                        <!-- 浮窗start -->
                        <div id="function_float">
                            <!-- font_style-->
                            <div class="font_float font_style" onmouseover="Font_float_Over('font_style')" onmouseout="Font_float_Out('font_style')">1</div>
                            <!-- font_color -->
                            <div class="font_float font_color" onmouseover="Font_float_Over('font_color')" onmouseout="Font_float_Out('font_color')">
                                <span>红海</span>
                                <span>黄撒</span>
                                <span>胜多负少</span>
                                <span>施工队</span>
                                <span>说的</span>
                            </div>
                            <!-- 表情标签 -->
                            <div class="font_float font_iconf" onmouseover="Font_float_Over('font_iconf')" onmouseout="Font_float_Out('font_iconf')">3</div>
                        </div>
                        <!-- 浮窗over -->
                        <div class="messagebodydiv">
                            <div id="message_content" v-cloak>
                                <div class="content_nest">
                                    <div class="Omnibox" id="Return_TOP" title="回到顶部">TOP</div>
                                    <div class="Omnibox iconfont" id="Vlookup" title="条件查找">&#xe617;</div>
                                    <header class="messagehead">
                                        酷留言
                                    </header>
                                    <div class="toast" v-for="list in messlists" :key="list.leave_ID">
                                        <div class="toast_top" :style="'background:' + list.LY_font_color">
                                            <div class="toast_img"><img :src="yzimg(list.User_img)"></div>
                                            <!-- list.User_img ? '../php' + list.User_img : '../img/K.png' -->
                                            <!-- '../php' + list.User_img 三目运算法-->
                                            <div class="toast_type">
                                                <div v-text="nametype(list.User_type)" :style="typecss(list.User_type)">
                                                </div>
                                            </div>
                                            <div class="toast_name">{{list.User_name}}</div>
                                        </div>
                                        <div class="toast_content" :style="'color:' + list.LY_font_color">
                                            {{list.LY_content}}</div>
                                        <div class="toast_T">
                                            <div class="toast_time" v-text="Timestamp(list.LY_time)" title="留言时间"></div>
                                            <i class="iconfont toast_icon" title="留言时间">&#xe60d;</i>
                                        </div>
                                        <div class="toast_function">
                                            <div class="toast_else" :id="list.leave_ID">
                                                <div class="leave" @click="fun_icon($event)">
                                                    <i class="iconfont leave_icon" title="查看评论">&#xe638;</i>
                                                    <span class="leave_num">{{list.LY_praise_num}}</span>
                                                </div>
                                                <div class="praise" @click="fun_icon($event)">
                                                    <i class="iconfont praise_icon" title="点赞">&#xe626;</i>
                                                    <!-- 点赞替换icon图标 -->
                                                    <span class="praise_num">{{list.LY_comment_num}}</span>
                                                </div>
                                                <div class="fun" @click="fun_icon($event)">
                                                    <i class="iconfont fun_icon" title="更多">&#xe610;</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="nonemessage" v-if="show">
                                        <div class="iconfont">&#xe6d0;</div>
                                        <div class="nonetext">还没有任何评论，快留下你的精彩发言吧！</div>
                                    </div>
                                </div>
                            </div>
                            <span class="messageline"></span>
                            <div class="face">
                                <div class="char_num"></div>
                                <div class="user_font">
                                    <i id="font_iconf" class="iconfont" title="选择表情" onmouseover="OnmouseOver(this)" onmouseout="OnmouseOut(this)">&#xec96;</i>
                                    <i id="font_color" class="iconfont" title="文字颜色" onmouseover="OnmouseOver(this)" onmouseout="OnmouseOut(this)">&#xec9d;</i>
                                    <i id="font_style" class="iconfont" title="文字样式" onmouseover="OnmouseOver(this)" onmouseout="OnmouseOut(this)">&#xec95;</i>
                                </div>
                            </div>
                            <div class="send_message">
                                <div class="input_box">
                                    <textarea class="send_input" onfocus="noFocus()" onblur="noBlur()" onkeydown="keySend(event)" v-focus></textarea>
                                </div>
                                <div class="send_box">
                                    <button @click="addmessage" class="send_but" title="发送留言">发送</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src='/JS/conf.js'></script>
    <script src='JS/index.js'></script>
    <script src='/JS/ImgCropper.js'></script>
    <script src='/JS/slide.js'></script>
    <script src="/JS/vuecook.js"></script>
</body>

</html>