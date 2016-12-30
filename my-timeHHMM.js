/*
 * timeHHMM v0.1
 * Date: 2016-12-21
 * timeHHMM为时间控件，时间格式为00:00，在需要时间的input框中添加class=".xxx",在scirpt中添加$(".xxx").timeHHMM();即可，本插件依赖jquery
 */
(function ($) {//生成modal

    var modalHtml = '<div>' +
        '<div class="modalTime" style="position: absolute;background: white;z-index: 99;padding: 5px;border: 1px solid #D5D5D5;border-radius: 4px;width: 135px;display: none;">' +
        '<div style="padding: 5px;">' +
        '小时：<select class="hours" style="min-width: 80px;width: 80px;"></select>' +
        '</div>' +
        '<div style="padding: 5px;">' +
        '分钟：<select class="min" style="min-width: 80px;width: 80px;"></select>' +
        '</div>' +
        '<div style="padding: 5px;">' +
        '<button type="button" class="btn btn-sm cancelTime btn-default" style="margin-right: 8px">关闭</button>' +
        '<button type="button" class="btn btn-sm sureTime btn-primary">确定</button>' +
        '</div>' +
        '</div>' +
        '</div>';

    var modalObj = $(modalHtml);

    //生成时间下拉选项模态框
    var hourHtml = '';
    for (var i = 0; i <= 23; i++) {
        if (i < 10) {
            hourHtml += "<option value='" + "0" + i + "'>" + "0" + i + "</option>";
        } else {
            hourHtml += "<option value='" + i + "'>" + i + "</option>";
        }
    }
    var minHtml = '';
    for (var j = 0; j <= 59; j++) {
        if (j < 10) {
            minHtml += "<option value='" + "0" + j + "'>" + "0" + j + "</option>";
        }
        else {
            minHtml += "<option value='" + j + "'>" + j + "</option>";
        }
    }
    modalObj.find(".hours").html(hourHtml);
    modalObj.find(".min").html(minHtml);

    $.fn.timeHHMM = function () {
	this.each(function(){
	        var INPUT = $(this);
	        var MODEL = null;
	        var ifShow = false;
	
	        //插件实现代码
	        $(":ROOT").click(function (event) {
	            if (MODEL !== null) {
	                if (ifShow && !MODEL.find(event.target).length && !INPUT.is(event.target)) {
	                    hide();
	                }
	            }
	        });
	        INPUT.on('click', function (event) {
	            if (MODEL === null) {
	                INPUT.after(modalObj.html());
	                MODEL = INPUT.next('.modalTime');
	                bindModelEvent();
	            }
	            show();
	        });
	
	
	        function bindModelEvent() {
	
	            //点击确定时
	            MODEL.on('click', ".sureTime", function () {
	                var chooseHour = MODEL.find(".hours").val();
	                var chooseMin = MODEL.find(".min").val();
	                var chooseTime = chooseHour + ":" + chooseMin;
	                INPUT.val(chooseTime);
	                hide();
	            });
	
	            //点击取消时间
	            MODEL.on('click', ".cancelTime", function () {
	                hide();
	            });
	
	        }
	
	        function show() {
	            MODEL.show();
	            ifShow = true;
	        }
	
	        function hide() {
	            MODEL.hide();
	            ifShow = false;
	        }
	    });
    };
})(jQuery);
