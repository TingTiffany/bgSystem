(function($){
	$.fn.extend({
		operateHolidayFn: function(){
			var typ = $.toolFn.getParams('typ'),
					holId = $.toolFn.getParams('holId');
			var init = function(){
				initDatim();
				initTitle();
				initCheck();
				bindEvent();
			};
			var initDatim = function(){
				laydate.render({
					elem: '.datim',
					theme: '#00c2de',
					done: function(){
						$(this.elem[0]).tooltip('hide').closest('.box-line').removeClass('error');
					}
				});
			};
			var initTitle = function(){
				if(typ == 'add'){
					$('.navbar-header>span').text('新增假期');
				}else if(typ == 'edit'){
					$('.navbar-header>span').text('编辑假期');
					fillInfo();
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/language.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == holId){
							$box.find('input[name="holidayDate"]').val(res[i]['holidayDate']).end()
									.find('input[name="holidayNam"]').val(res[i]['holidayNam']);
							$box.find('input[name="isUp"][value="'+res[i]['isUp']+'"]').attr('checked', true);
							break;
						}
					}
				});
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="holidayDate"]'), $box.find('input[name="holidayNam"]'), $box.find('input[name="isUp"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							holidayDate = $box.find('input[name="holidayDate"]'), 
							holidayNam = $box.find('input[name="holidayNam"]'), 
							isUp = $box.find('input[name="isUp"]');
					if( !$.formCheckFn.isNull(holidayDate) && !$.formCheckFn.isNull(holidayNam) && !$.formCheckFn.isNull(isUp) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateHolidayFn();
})(jQuery);
