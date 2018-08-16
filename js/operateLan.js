(function($){
	$.fn.extend({
		operateLanFn: function(){
			var typ = $.toolFn.getParams('typ'),
					lanId = $.toolFn.getParams('lanId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				if(typ == 'add'){
					$('.navbar-header>span').text('新增语言');
				}else if(typ == 'edit'){
					$('.navbar-header>span').text('编辑语言');
					fillInfo();
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/language.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == lanId){
							$box.find('input[name="lanCode"]').val(res[i]['code']).end()
									.find('input[name="lanPage"]').val(res[i]['page']).end()
									.find('textarea[name="descr"]').val(res[i]['descr']);
							$box.find('input[name="lanTyp"][value="'+res[i]['lanTyp']+'"]').attr('checked', true);
							break;
						}
					}
				});
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="lanCode"]'), $box.find('input[name="lanPage"]'), $box.find('input[name="lanTyp"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							lanCode = $box.find('input[name="lanCode"]'), 
							lanPage = $box.find('input[name="lanPage"]'), 
							lanTyp = $box.find('input[name="lanTyp"]');
					if( !$.formCheckFn.isNull(lanCode) && !$.formCheckFn.isNull(lanPage) && !$.formCheckFn.isNull(lanTyp) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateLanFn();
})(jQuery);
