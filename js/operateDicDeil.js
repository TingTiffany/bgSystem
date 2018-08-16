(function($){
	$.fn.extend({
		operateDicDeilFn: function(){
			var typ = $.toolFn.getParams('typ'),
					parId = $.toolFn.getParams('parId'),
					dicId = $.toolFn.getParams('dicId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				$.get('json/dictionary.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == parId){
							if(typ == 'add'){
								$('.navbar-header>span').text('新增字典（' + res[i]['type'] + '）');
							}else if(typ == 'edit'){
								$('.navbar-header>span').text('编辑字典（' + res[i]['type'] + '）');
								fillInfo(res[i]['child']);
							}else if(typ == 'addsub'){
								$('.navbar-header>span').text('新增字典（' + res[i]['type'] + '）');
								fillInfo(res[i]['child']);
							}
						}
					}
				});		
			};
			var fillInfo = function(res){
				var $box = $('.view-box');
				for(var i = 0, len = res.length; i < len; i++){
					if(res[i]['id'] == dicId){
						if(typ == 'edit'){
							$box.find('input[name="dic"]').val(res[i]['pname']).data('node', {'id':res[i]['pId']}).end()
									.find('input[name="dicname"]').val(res[i]['name']).end()
									.find('input[name="keyval"]').val(res[i]['type']).end()
									.find('input[name="sn"]').val(res[i]['sn']).end()
									.find('textarea[name="descr"]').val(res[i]['description']);
							$box.find('input[name="isSystem"][value="'+res[i]['isSystem']+'"]').attr('checked', true);
						}else{
							$box.find('input[name="dic"]').val(res[i]['name']).data('node', {'id':res[i]['id']});
						}
						break;
					}
				}
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="dicname"]'), $box.find('input[name="keyval"]'), $box.find('input[name="isSystem"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.treeselect[name="dic"]>.input-group-btn').on('click', '.treeselect[name="dic"]>.input-group-btn', function(){
					parent.showZtreeLayer({
						'btn': $(this),
						'title': '上级字典',
						'url': 'json/dictionary.json',
						'type': 'dictionary',
						'param': parId
					});
				}).off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							dicname = $box.find('input[name="dicname"]'), 
							keyval = $box.find('input[name="keyval"]'), 
							isSystem = $box.find('input[name="isSystem"]');
					if( !$.formCheckFn.isNull(dicname) && !$.formCheckFn.isNull(keyval) && !$.formCheckFn.isNull(isSystem) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateDicDeilFn();
})(jQuery);
