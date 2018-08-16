(function($){
	$.fn.extend({
		operateParamFn: function(){
			var typ = $.toolFn.getParams('typ'),
					paramId = $.toolFn.getParams('paramId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				if(typ == 'add'){
					$('.navbar-header>span').text('新增参数');
				}else if(typ == 'edit'){
					$('.navbar-header>span').text('编辑参数');
					fillInfo();
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/param.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == paramId){
							$box.find('input[name="paramname"]').val(res[i]['name']).end()
									.find('input[name="paramkey"]').val(res[i]['keyname']).end()
									.find('textarea[name="paramval"]').val(res[i]['key']).end()
									.find('textarea[name="descr"]').val(res[i]['description']);
							$box.find('input[name="isSystem"][value="'+res[i]['isSystem']+'"]').attr('checked', true);
							break;
						}
					}
				});
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="paramname"]'), $box.find('input[name="paramkey"]'), $box.find('textarea[name="paramval"]'), $box.find('input[name="isSystem"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							paramname = $box.find('input[name="paramname"]'), 
							paramkey = $box.find('input[name="paramkey"]'), 
							paramval = $box.find('textarea[name="paramval"]'),
							isSystem = $box.find('input[name="isSystem"]');
					if( !$.formCheckFn.isNull(paramname) && !$.formCheckFn.isNull(paramkey) && !$.formCheckFn.isNull(paramval) && !$.formCheckFn.isNull(isSystem) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateParamFn();
})(jQuery);
