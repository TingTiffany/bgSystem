(function($){
	$.fn.extend({
		operateNumFn: function(){
			var typ = $.toolFn.getParams('typ'),
					numId = $.toolFn.getParams('numId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				if(typ == 'add'){
					$('.navbar-header>span').text('新增编号');
				}else if(typ == 'edit'){
					$('.navbar-header>span').text('编辑编号');
					fillInfo();
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/language.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == numId){
							$box.find('input[name="numNam"]').val(res[i]['numNam']).end()
									.find('input[name="numId"]').val(res[i]['numId']).attr('disabled', 'disabled').end()
									.find('input[name="numPattern"]').val(res[i]['numPattern']).end()
									.find('input[name="nextVal"]').val(res[i]['nextVal']).closest('.row').removeClass('hidden').end()
									.find('textarea[name="descr"]').val(res[i]['descr']);
							$box.find('input[name="numModel"][value="'+res[i]['numModel']+'"]').attr('checked', true);
							break;
						}
					}
				});
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="numNam"]'), $box.find('input[name="numPattern"]'), $box.find('input[name="nextVal"]'), $box.find('input[name="numModel"]')],
					'isNumber': [$box.find('input[name="numId"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							numNam = $box.find('input[name="numNam"]'), 
							numId = $box.find('input[name="numId"]'), 
							numPattern = $box.find('input[name="numPattern"]'), 
							nextVal = $box.find('input[name="nextVal"]'), 
							numModel = $box.find('input[name="numModel"]');
					if( !$.formCheckFn.isNull(numNam) && !$.formCheckFn.isNull(numId) && $.formCheckFn.isNumber(numId) && !$.formCheckFn.isNull(numPattern) && !$.formCheckFn.isNull(numModel) ){
						if(typ == 'add' || (typ == 'edit' && !$.formCheckFn.isNull(nextVal) )){
							$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');					
						}
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateNumFn();
})(jQuery);
