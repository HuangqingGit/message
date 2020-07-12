$(function () {
    var zcid = $('#zcid');                              //获取到注册ID这个DOM元素
    var xtid = $('#xtid');                              //获取到系统ID这个DOM元素
    var id = decodestr(objec.id);                       //将base64数据转换为字符串
    var tel = decodestr(objec.tel);
    zcid.html(tel);
    xtid.html('[ ID:' + id + ' ]');
    initialize_procedure();
});
/**
 * 窗体大小自动适应
 * 当窗体大小改变时执行
 */
$(window).resize(function () {
    initialize_procedure();
});
/**
 * div元素宽高改变值
 */
function initialize_procedure() {
    Width = $(window).width();                          //宽度
    Height = $(window).height();                        //高度
    $("body").css('height', Height);                    //主div
}


$('.home').click(function () {
    window.location.href = "/main?codetyp=" + zimu(40) + "&format=" + zimu(40) + "&future=" + zimu(40) + "&typ=" + encodestr("mes");
})
