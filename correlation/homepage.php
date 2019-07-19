<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>毕业设计选题系统</title>
    <link rel="shortcut icon" href="../img/logo2.png">
    <link rel='stylesheet' href='../css/style.css'>
    <link rel="stylesheet" href="http://at.alicdn.com/t/font_1268951_63ty03yf59u.css">
    <link rel="stylesheet" href="http://js.cxwt.xyz/cropper.min.css">
    <script src='http://js.cxwt.xyz/jquery-3.4.0.js'></script>
    <script src="http://js.cxwt.xyz/ajaxfileupload.js"></script>
    <script src='http://js.cxwt.xyz/jquery_cookie.js'></script>
    <script src='http://js.cxwt.xyz/cropper.min.js'></script>
    <script src='http://js.cxwt.xyz/vue.js'></script>
    <script type="text/javascript">
        //局部js用于输出php数据到js处理
        USER = $.cookie('username');
        PWD = $.cookie('password');
        TYPE = $.cookie('usertype');
        if (USER == null && PWD == null) {
            window.location = "../login.html";
        } else {
            Ret = TYPE;
        }
    </script>
</head>

<body>
    <!-- 文字提示 -->
    <div class="friendly">
        <div class="iconfont friendly_icon">&#xe6e9;</div>
        <text class="friendly_text"></text>
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
                                <div id="number_t2"></div>
                            </div>
                            <div class="My_data_name">
                                <div id="name_t1">姓名</div>
                                <div id="name_t2"></div>
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
            <div class='usermessage'>
                <!-- 用户信息面板 -->
                <div class='help' v-cloak>
                    <!-- 帮助 -->
                    你好！{{US}}
                </div>
                <div class='username'>
                    <!-- 用户 -->
                    <div class='headportrait'>
                        <!-- 用户头像 -->
                        <img class="userimg">
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
                <div id='menu' v-cloak>
                    <ul v-for='list in lists'>
                        <li class='one-catalog' @click='curShow(list)'>
                            <i class="iconfont" v-html="list.icon"></i>
                            <a class='one-menu'>{{list.name}}
                                <b :class="list.flag? 'LIST_DOWN':'LIST_UP'">^</b>
                            </a>
                        </li>
                        <ul v-show='list.flag'>
                            <li class='two-catalog' v-for='sub in list.subLists' @click="liClick(sub.id)">
                                <i class="iconfont" v-html="sub.icon"></i>
                                <a class='tow-menu' :href="getGoodsHref(sub.URL)" target="ifram" :id="sub.id">{{sub.name}}</a>
                            </li>
                        </ul>
                    </ul>
                </div>
            </div>
            <div id="pack">
                <img class="pack_img" src="../img/right.png">
            </div>
            <div id='article'>
                <!-- 右div -->
                <div class="articlesubset">
                    <iframe name="ifram" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </div>
    <script src='../JS/ImgCropper.js'></script>
    <script src='../JS/homepage.js'></script>
    <script src='../JS/jscook.js'></script>
    <script>
        //图像上传
        function selectImg(file) {
            if (!file.files || !file.files[0]) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function(evt) {
                var replaceSrc = evt.target.result;
                //更换cropper的图片
                $('#tailoringImg').cropper('replace', replaceSrc, false); //默认false，适应高度，不失真
            }
            reader.readAsDataURL(file.files[0]);
        }
    </script>
</body>

</html>