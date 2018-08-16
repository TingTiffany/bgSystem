(function($){
	$.fn.extend({
		operateAreaFn: function(){
			var typ = $.toolFn.getParams('typ'),
					areaId = $.toolFn.getParams('areaId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				if(typ == 'add'){
					$('.navbar-header>span').text('新增区域');
				}else if(typ == 'edit'){
					$('.navbar-header>span').text('编辑区域');
					fillInfo();
				}else if(typ == 'addsub'){
					$('.navbar-header>span').text('新增区域');
					fillInfo();
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/area.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == areaId){
							if(typ == 'edit'){
								$box.find('input[name="area"]').val(res[i]['pname']).data('node', {'id':res[i]['pId']}).end()
										.find('input[name="areacode"]').val(res[i]['code']).end()
										.find('input[name="areaname"]').val(res[i]['name']).end()
										.find('input[name="sn"]').val(res[i]['sn']).end()
										.find('textarea[name="descr"]').val(res[i]['description']);
								$box.find('input[name="areatype"][value="'+res[i]['type']+'"]').attr('checked', true);
							}else{
								$box.find('input[name="area"]').val(res[i]['name']).data('node', {'id':res[i]['id']});
							}
							break;
						}
					}
				});
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="areacode"]'), $box.find('input[name="areaname"]'), $box.find('input[name="areatype"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.treeselect[name="area"]>.input-group-btn').on('click', '.treeselect[name="area"]>.input-group-btn', function(){
					parent.showZtreeLayer({
						'btn': $(this),
						'title': '上级区域',
						'url': 'json/area.json'
					});
				}).off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							areacode = $box.find('input[name="areacode"]'), 
							areaname = $box.find('input[name="areaname"]'), 
							areatype = $box.find('input[name="areatype"]');
					if( !$.formCheckFn.isNull(areacode) && !$.formCheckFn.isNull(areaname) && !$.formCheckFn.isNull(areatype) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateAreaFn();
})(jQuery);
