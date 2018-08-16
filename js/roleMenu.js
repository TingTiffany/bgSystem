(function($){
	$.fn.extend({
		roleMenuFn: function(){
			var roleId = $.toolFn.getParams('roleId'),
					ztree;
			var init = function(){
				fillInfo();
				buildRole();
				bindEvent();
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/role.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == roleId){
							$box.find('input[name="rolename"]').val(res[i]['name']).end()
									.find('input[name="rolecode"]').val(res[i]['code']);
							break;
						}
					}
				});
			};
			var buildRole = function(){
				$.get('json/menu.json', function(res){
					ztree = $.toolFn.buildZtree({
						'ele': $("#tree-menu"),
						'data': res,
						'check': {
							enable: true,
							chkStyle: 'checkbox'
						}
					});
				});
				
			};
			var bindEvent = function(){
				$('.view-box').off('click', '#all').on('click', '#all', function(){
					ztree.checkAllNodes(this.checked);
				}).off('click', '.btn-expand').on('click', '.btn-expand', function(){
					ztree.expandAll(true);
				}).off('click', '.btn-collapse').on('click', '.btn-collapse', function(){
					ztree.expandAll(false);
				}).off('click', '.btn-save').on('click', '.btn-save', function(){
					$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).roleMenuFn();
})(jQuery);
