(function($){
	$.fn.extend({
		operateMenuFn: function(){
			var typ = $.toolFn.getParams('typ'),
					menuId = $.toolFn.getParams('menuId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				if(typ == 'add'){
					$('.navbar-header>span').text('新增菜单');
				}else if(typ == 'edit'){
					$('.navbar-header>span').text('编辑菜单');
					fillInfo();
				}else if(typ == 'addsub'){
					$('.navbar-header>span').text('新增菜单');
					fillInfo();
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/menu.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == menuId){
							if(typ == 'edit'){
								$box.find('input[name="menu"]').val(res[i]['pname']).data('node', {'id':res[i]['pId']}).end()
										.find('input[name="menuname"]').val(res[i]['name']).end()
										.find('input[name="menulink"]').val(res[i]['link']).end()
										.find('input[name="target"]').val('').end()
										.find('input[name="powerflag"]').val('').end()
										.find('input[name="menuicon"]').val(res[i]['menuicon']).prev('.input-group-addon').empty().append('<i class="'+res[i]['menuicon']+'"></i>').end()
										.find('input[name="sn"]').val(res[i]['sn']).end()
										.find('textarea[name="descr"]').val(res[i]['description']);
								$box.find('input[name="menutype"][value="'+res[i]['type']+'"]').attr('checked', true).end()
										.find('input[name="canSee"][value="'+res[i]['canSee']+'"]').attr('checked', true);
							}else{
								$box.find('input[name="menu"]').val(res[i]['name']).data('node', {'id':res[i]['id']});
							}
							break;
						}
					}
				});
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="menutype"]'), $box.find('input[name="menuname"]'), $box.find('input[name="menulink"]'), $box.find('input[name="canSee"]')],
					'isNumber':[$box.find('input[name="sn"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.treeselect[name="menu"]>.input-group-btn').on('click', '.treeselect[name="menu"]>.input-group-btn', function(){
					parent.showZtreeLayer({
						'btn': $(this),
						'title': '上级菜单',
						'url': 'json/menu.json'
					});
				}).off('click', '.iconselect>.input-group-btn').on('click', '.iconselect>.input-group-btn', function(){
					parent.showMenuIcon($(this).closest('.iconselect'));
				}).off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							menutype = $box.find('input[name="menutype"]'), 
							menuname = $box.find('input[name="menuname"]'),
							menulink = $box.find('input[name="menulink"]'),
							sn = $box.find('input[name="sn"]'), 
							canSee = $box.find('input[name="canSee"]');
					if( !$.formCheckFn.isNull(menutype) && !$.formCheckFn.isNull(menuname) && !$.formCheckFn.isNull(menulink) && $.formCheckFn.isNumber(sn) && !$.formCheckFn.isNull(canSee) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateMenuFn();
})(jQuery);