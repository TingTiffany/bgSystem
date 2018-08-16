(function($){
	$.fn.extend({
		operateDicFn: function(){
			var typ = $.toolFn.getParams('typ'),
					dicId = $.toolFn.getParams('dicId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				if(typ == 'add'){
					$('.navbar-header>span').text('新增字典类型');
				}else if(typ == 'edit'){
					$('.navbar-header>span').text('编辑字典类型');
					fillInfo();
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/dictionary.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == dicId){
							$box.find('input[name="dicname"]').val(res[i]['name']).end()
									.find('input[name="dictype"]').val(res[i]['type']).end()
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
					'isNull':[$box.find('input[name="dicname"]'), $box.find('input[name="dictype"]'), $box.find('input[name="isSystem"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							dicname = $box.find('input[name="dicname"]'), 
							dictype = $box.find('input[name="dictype"]'), 
							isSystem = $box.find('input[name="isSystem"]');
					if( !$.formCheckFn.isNull(dicname) && !$.formCheckFn.isNull(dictype) && !$.formCheckFn.isNull(isSystem) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateDicFn();
})(jQuery);
