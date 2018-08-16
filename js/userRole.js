(function($){
	$.fn.extend({
		userRoleFn: function(){
			var userId = $.toolFn.getParams('userId');
			var init = function(){
				fillInfo();
				buildRole();
				bindEvent();
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/user.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['empId'] == userId){
							$box.find('input[name="account"]').val(res[i]['empNumber']).end()
									.find('input[name="nickname"]').val(res[i]['empName']);
							break;
						}
					}
				});
			};
			var buildRole = function(){
				$.get('json/role.json', function(res){
					$('.pannel-tbl').bootstrapTable({
				    data: res,
				    buttonsToolbar: 'hidden',
				    pagination: false,
				    clickToSelect: true,
				    columns: [{
			    		width: 50, 
			    		align: 'center', 
			    		formatter: function(val, row, idx){
					    	return idx + 1;  
					  	}
				    }, { 
			    		width: 50, 
			    		align: 'center', 
			    		checkbox: true 
			    	}, { 
			    		title: '角色名称', 
			    		field: 'name', 
			    		width: '50%', 
			    		align: 'center', 
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['name']);
			    		}  
			    	}, { 
			    		title: '角色编码', 
			    		field: 'code', 
			    		width: '50%', 
			    		align: 'center', 
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['code']);
			    		}  
			    	}]
					});
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.btn-save').on('click', '.btn-save', function(){
					$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).userRoleFn();
})(jQuery);
