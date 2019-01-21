// 下拉
function select(){
	$('.select').on('click', '.placeholder', function(e) {
		var parent = $(this).closest('.select');
		if (!parent.hasClass('is-open')) {
			parent.addClass('is-open');
			$('.select.is-open').not(parent).removeClass('is-open');
		} else {
			parent.removeClass('is-open');
		}
		e.stopPropagation();
	}).on('click', 'ul>li', function() {
		var parent = $(this).closest('.select');
		var dataId = $(this).attr('data-id');
		parent.find('.placeholder').attr('data-id', dataId);
		parent.removeClass('is-open').find('.placeholder').text($(this).text());
	});
	
	$('body').on('click', function() {
		$('.select.is-open').removeClass('is-open');
	});
}
// 单选复选框
function check(){
	// 设置
	$(("[type='checkbox'],[type='radio']")).iCheck({
		checkboxClass: 'icheckbox_square-aero',
		radioClass: 'iradio_square-aero'
	});
	// 全选反选
	$('#allcheck').on('ifClicked', function(event){
		if($(this).is(':checked')){
			$('.careinput input').iCheck('uncheck');
		}else{
			$('.careinput input').iCheck('check');
		}
	});
	//默认勾选
	$('.careinput input').on('ifChecked', function(event){
		var checkLenght = $('.careinput input:checked').length;
		var inputLenght = $('.careinput input').length;
		if(checkLenght==inputLenght){
			$('#allcheck').iCheck('check');
		}
	});
	$('.careinput input').on('ifUnchecked', function(event){
		var checkLenght = $('.careinput input:checked').length;
		var inputLenght = $('.careinput input').length;
		if(checkLenght<inputLenght){
			$('#allcheck').iCheck('uncheck');
		}
	});
}
// 弹出层-提示
function alert(msg){
	layer.open({
		type: 1,
		skin: 'layui-layer-molv',
		move: false,
		btn:'确定',
		btnAlign: 'c',
		area: '420px', //宽高
		content: '<p style="text-align:center; font-size:14px; color:#555; padding:10px; line-height:2">' + msg + '</p>',
		yes:function(index){
			layer.close(index);
		}
	});
}
// 弹出层-询问
function confirm(msg,back) {
	layer.open({
		type:1,
		skin: 'layui-layer-molv',
		move: false,
		btn:["确定", "取消"],
		btnAlign: "c",
		area:'420px',
		tipsMore: true,
		closeBtn: 0,
		content: '<p style="text-align:center; font-size:14px; color:#555; padding:10px; line-height:2">' + msg + '</p>',
		btn1: function(index) {
			layer.close(index);
			back();
		},
		btn2: function(index) {
			layer.close(index);
		}
	});
}
//ajax封装函数
var main = {};

/**
 * ajax请求
 * @param {Object} _url  请求地址   默认return
 * @param {Object} _type 请求类型   默认get
 * @param {Object} _data 上送消息   默认为空
 * @param {Object} _dataType 预计返回类型    默认为json
 * @param {Object} _cache   是否缓存   默认为 true
 */
main.ajax = function(_url, _type, back, _data, _error, _dataType, sync, _cache) {
	var prefix = "";
	var type = "";
	if (null == _url || _url == undefined || "" == _url) return;
	if (null == _data || _data == undefined || "" == _data) _data = "";
	if (null == _cache || _cache == undefined || "" == _cache) _cache = true;
	if (null == _dataType || _dataType == undefined || "" == _dataType) _dataType = "json";
	if (null == sync || sync == undefined || "" === sync) sync = true;
	_url = prefix + _url + type;
//		console.log(_url);
		console.log("request:" + _data);
	$.ajax({
		url: _url,
		type: _type,
		data: _data,
		dataType: _dataType,
		async: sync,
		cache: _cache,
		success: function(res) {
			console.log("response:" + JSON.stringify(res));
			if ("AAAAAAA" == res.retCode){
				back(res);
			} else if("FRNF009" == res.retCode){
				alert("登录超时！");
				return false;
			}
		},
		error: function() {
			if (_error == undefined || _error == "" || _error == null) {
				alert("网络请求失败，请稍后再试！");
				return false;
			} else {
				_error;
			}
		},beforeSend:function() {
			$("#covering").show();
		},complete:function(){
			$("#covering").hide();
		}
	});
}
//校验
//案例：$.checkout.isMobile("12131231212");
//返回值：true or false
$(function($) {
	$.checkout = $.checkout || {};
	$.fn.extend($.checkout, {
		/*
		 * 常量
		 */
		REGEXP_MOBILE: new RegExp(/^(1[1-9])[0-9]{9}$/),
		REGEXP_PHONE: new RegExp(/^(((((0\d{2,3})-)(\d{7,8})(-(\d{1,6})))|((0\d{2,3})-)(\d{7,8}))|(([2-9][0-9]{6,7})+(\-[0-9]{1,4}))|(([2-9][0-9]{6,7}))|((1[1-9])[0-9]{9})|(\d{7,15}))?$/),
		REGEXP_CHAR_TYPE: new RegExp(/[a-zA-Z]+/),
		REGEXP_ISINTCHAR: new RegExp(/^[a-zA-Z0-9]+$/),
		REGEXP_EMAIL: new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/),
		REGEXP_INTEGER: new RegExp(/^[0-9]*$/),
		REGEXP_INTEGERS: new RegExp(/^([1-9])[0-9]*$/),
		//纯数字
		isInteger: function(s) {
			return $.checkout.REGEXP_INTEGER.test(s);
		},
		//第一位不为0的正整数
		isIntegers: function(s) {
			return $.checkout.REGEXP_INTEGERS.test(s);
		},
		//手机号校验
		isMobile: function(s) {
			return $.checkout.REGEXP_MOBILE.test(s);
		},
		//固定电话校验
		isPhone: function(s) {
			return $.checkout.REGEXP_PHONE.test(s);
		},
		//纯英文校验
		isChar: function(s) {
			return $.checkout.REGEXP_CHAR_TYPE.test(s);
		},
		//英文+数字
		isCharNum: function(s) {
			return $.checkout.REGEXP_ISINTCHAR.test(s);
		},
		//纯中文
		isChinese: function(s) {
			for (var index = 0; index < s.length; index++) {
				var charCode = s.charCodeAt(index);
				if ((charCode < 19968) || (charCode > 40869)) {
					return false;
				}
			}
			return true;
		},
		//邮箱地址
		isEmail: function(s) {
			if (s.length > 122) {
				return false;
			}
			return ($.checkout.REGEXP_EMAIL.test(s));
		},
		//单个值校验是否为空
		isEmpty: function(s) {
			if (s == "" || s == null || s == undefined) {
				return true;
			}
			return false;
		},
		strLength: function(s) {
			var str = $(s).val();
			var l = str.length;
			if (l == 0 || l == NaN || l == undefined) return 0;
			var n = l;
			for (var i = 0; i < l; i++) {
				if (str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255) n++;
			}
			return n;
		}
	});
});
// 日期格式时间戳互转
// 例子
//将时间转化为时间戳
// 	var noHis = "2017-06-22";
// 	var haveHis = "2017-06-22 00:00:01";
// 	var oNoHis = $.myTime.DateToUnix(noHis); // 1498060800
// 	var ohaveHis = $.myTime.DateToUnix(haveHis); // 1498123193
// 	console.log(oNoHis);
// 	console.log(ohaveHis);
	//将时间戳转化为时间对象
// 	var HisBack = "1498060800";
// 	var HaveHisBack = "1498123193";
// 	var oHisBack = $.myTime.UnixToDate(HisBack);
// 	var oHaveHisBack = $.myTime.UnixToDate(HaveHisBack);
// 	console.log(oHisBack);
// 	console.log(oHaveHisBack);
$.extend({
    myTime:{
        CurTime: function(){
            return Date.parse(new Date())/1000;
        },
        DateToUnix: function(string) {
            var f = string.split(' ', 2);
            var d = (f[0] ? f[0] : '').split('-', 3);
            var t = (f[1] ? f[1] : '').split(':', 3);
            return (new Date(
                parseInt(d[0], 10) || null,
                (parseInt(d[1], 10) || 1) - 1,
                parseInt(d[2], 10) || null,
                parseInt(t[0], 10) || null,
                parseInt(t[1], 10) || null,
                parseInt(t[2], 10) || null
                )).getTime() / 1000;
        },
        UnixToDate: function(unixTime, isFull, timeZone) {
            if (typeof (timeZone) == 'number'){
                unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
            }
            var time = new Date(unixTime * 1000);
            var ymdhis = "";
            ymdhis += time.getUTCFullYear() + "-";
            ymdhis += (time.getUTCMonth()+1) + "-";
            ymdhis += time.getUTCDate();
            if (isFull === true){
                ymdhis += "" + time.getUTCHours() + ":";
                ymdhis += time.getUTCMinutes() + ":";
                ymdhis += time.getUTCSeconds();
            }
            return ymdhis;
        }
    }
});
// 打印方法
(function($) {
    var opt;

    $.fn.jqprint = function (options) {
        opt = $.extend({}, $.fn.jqprint.defaults, options);

        var $element = (this instanceof jQuery) ? this : $(this);
        
        if (opt.operaSupport && $.browser.opera) 
        { 
            var tab = window.open("","jqPrint-preview");
            tab.document.open();

            var doc = tab.document;
        }
        else 
        {
            var $iframe = $("<iframe  />");
        
            if (!opt.debug) { $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" }); }

            $iframe.appendTo("body");
            var doc = $iframe[0].contentWindow.document;
        }
        
        if (opt.importCSS)
        {
            if ($("link[media=print]").length > 0) 
            {
                $("link[media=print]").each( function() {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
                });
            }
            else 
            {
                $("link").each( function() {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
                });
            }
        }
        
        if (opt.printContainer) { doc.write($element.outer()); }
        else { $element.each( function() { doc.write($(this).html()); }); }
        
        doc.close();
        
        (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
        setTimeout( function() { (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print(); if (tab) { tab.close(); } }, 1000);
    }
    
    $.fn.jqprint.defaults = {
		debug: false,
		importCSS: true, 
		printContainer: true,
		operaSupport: true
	};

    // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
    jQuery.fn.outer = function() {
      return $($('<div></div>').html(this.clone())).html();
    } 
})(jQuery);

//公共接口地址
//var pubUrl = location.protocol + "//" + location.host + "/coim/COIMServlet";//统一




