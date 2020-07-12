/**
 * 正则表达式验证密码格式
 * @param {*需要验证的密码-必须} pwd 
 */
function regPwd(pwd) {
    var reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
    return reg.test(pwd);
}

/**
 * 正则表达式验证邮箱格式
 * @param {*需要验证的邮箱-必须} email 
 */
function regEmail(email) {
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(email);
}

/**
 * 正则表达式验证电话格式
 * @param {*需要验证的电话-必须} phone 
 */
function regPhone(phone) {
    var reg = /^1[3456789]\d{9}$/;
    return reg.test(phone);
}
/**
 * Ajax请求接口
 * @param {*要请求的地址-必须} Url 
 * @param {*请求参数Oobject格式-可选} Data 
 * @param {*请求方式-可选} Type   默认POST
 * @param {*请求数据格式-可选} Daty  默认Json
 * @param {*同步请求还是异步-可选} Async  默认false
 * @param {*注意格式严格要求}
 */
function httpAjax(Url, Data, Type, Daty, Async) {
    if (!Url.length || typeof Url === undefined || typeof Url === null) {
        // 验证URL地址是否为空
        // 新建一个array对象
        var array = {
            code: '',    // 状态码
            start: false,   // 可执行状态
            text: 'URl地址不能为空!'    //返回提示
        }
        return array;
    }
    /**
     * 三目运算法：验证是否携带参数
     */
    Data = Data ? Data : {};
    Type = Type ? Type : "POST";
    Daty = Daty ? Daty : "JSON";
    Async = Async ? Async : false;
    $.ajax({
        url: Url,
        type: Type,
        data: Data,
        dataType: Daty,
        async: Async,
        success: function (code) {
            res = code;
        },
        error: function (error) {
            res = error;
        }
    });
    return res;
}

/**
 * 对字符串进行加密  
 * @param {*需要加密的字符串} code 
 * 此加密与decode函数对应
 */
function encode(code) {
    if (code.length) {
        var c = String.fromCharCode(code.charCodeAt(0) + code.length);
        for (var i = 1; i < code.length; i++) {
            c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
        }
        return escape(c);
    }
    return
}

/**
 * 字符串进行解密
 * @param {*需要解密的字符串} code 
 * 此解密与encrypt函数对应
 */
function decode(code) {
    if (code.length) {
        code = unescape(code);
        var c = String.fromCharCode(code.charCodeAt(0) - code.length);
        for (var i = 1; i < code.length; i++) {
            c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
        }
        return c;
    }
    return
}

/**
 * 字符串转base64
 * @param {*需要转换成base64的字符串} str 
 * 该方法与decodestr()函数对应
 */
function encodestr(str) {
    // 对字符串进行编码
    var encode = encodeURI(str);
    // 对编码的字符串转化base64
    var base64 = btoa(encode);
    return base64;
}

/**
 * base64转字符串
 * @param {*需要转成字符串的base64编码字符} base64 
 * 该方法与encodestr()函数对应
 */
function decodestr(base64) {
    // 对base64转编码
    var decode = atob(base64);
    // 编码转字符串
    var str = decodeURI(decode);
    return str;
}

/**
 * 随机字符串生成
 * @param {*指定生成字符个数} len 
 */
function zimu(len) {
    len = len || 1;
    var $chars = 'ADEFGHefI23JKLM\PQRSTUV789WXYZBCabc_`dghiNOjkp-+qrstuvz145lmno60/=wxy~^?><';
    var maxPos = $chars.length;
    var res = '';
    for (i = 0; i < len; i++) {
        res += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return res;
}
/**
 * 获取URL的参数
 * @param {*参数名} variable 
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}