/**
 * Ajax请求接口
 * @param {*要请求的地址-必须} Url 
 * @param {*请求参数Oobject格式-可选} Data 
 * @param {*请求方式-可选} Type 
 * @param {*请求数据格式-可选} Daty 
 * @param {*同步还是异步-可选} Async 
 * @param {*注意格式严格要求}
 */
function httpAjax(Url, Data, Type, Daty, Async) {
    var Code = new Object();
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
    Type = Type ? Type : "post";
    Daty = Daty ? Daty : "json";
    Async = Async ? Async : false;
    $.ajax({
        type: Type,
        url: Url,
        data: Data,
        dataType: Daty,
        async: Async,
        success: function (str) {
            Code = str;
        },
        error: function (error) {
            Code = error;
        }
    });
    return Code;    //返回最终结果
}