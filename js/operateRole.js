(function($){
	$.fn.extend({
		operateRoleFn: function(){
			var typ = $.toolFn.getParams('typ'),
					postId = $.toolFn.getParams('postId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				if(typ == 'add'){
					$('.navbar-header>span').text('新增角色');
				}else if(typ == 'edit'){
					$('.navbar-header>span').text('编辑角色');
					fillInfo();
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/role.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['postId'] == postId){
							$box.find('input[name="rolename"]').val(res[i]['name']).end()
									.find('input[name="rolecode"]').val(res[i]['code']).end()
									.find('input[name="sn"]').val(res[i]['sn']).end()
									.find('textarea[name="descr"]').val(res[i]['description']);
							$box.find('input[name="isSystem"][value="'+res[i]['isRole']+'"]').attr('checked', true);
							break;
						}
					}
				});
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="rolename"]'), $box.find('input[name="rolecode"]'), $box.find('input[name="isSystem"]')],
					'isNumber':[$box.find('input[name="sn"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							rolename = $box.find('input[name="rolename"]'), 
							rolecode = $box.find('input[name="rolecode"]'), 
							sn = $box.find('input[name="sn"]'),
							isSystem = $box.find('input[name="isSystem"]');
					if( !$.formCheckFn.isNull(rolename) && !$.formCheckFn.isNull(rolecode) && !$.formCheckFn.isNull(isSystem) && $.formCheckFn.isNumber(sn) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateRoleFn();
})(jQuery);
