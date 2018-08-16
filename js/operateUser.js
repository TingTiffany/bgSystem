(function($){
	$.fn.extend({
		operateUserFn: function(){
			var typ = $.toolFn.getParams('typ'),
					userId = $.toolFn.getParams('userId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				if(typ == 'add'){
					$('.navbar-header>span').text('新增用户');
				}else if(typ == 'edit'){
					$('.navbar-header>span').text('编辑用户');
					fillInfo();
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/user.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['empId'] == userId){
							$box.find('input[name="org"]').val(res[i]['orgName']).data('node', {'id':res[i]['orgId']}).end()
									.find('input[name="comp"]').val(res[i]['compName']).data('node', {'id':res[i]['compId']}).end()
									.find('input[name="account"]').val(res[i]['empNumber']).end()
									.find('input[name="nickname"]').val(res[i]['empName']).end()
									.find('input[name="email"]').val(res[i]['email']).end()
									.find('input[name="mobile"]').val(res[i]['mobile']).end()
									.find('input[name="tel"]').val(res[i]['tel']).end()
									.find('input[name="sn"]').val(res[i]['sn']).end()
									.find('input[name="empno"]').val(res[i]['empNumber']).end()
									.find('input[name="empname"]').val(res[i]['empName']).end()
									.find('input[name="post"]').val(res[i]['postName']).data('data', res[i]['postId']).end()
									.find('textarea[name="descr"]').val(res[i]['description']);
							break;
						}
					}
				});
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="org"]'), $box.find('input[name="comp"]'), $box.find('input[name="account"]'), $box.find('input[name="nickname"]'), 
										$box.find('input[name="nickname"]'), $box.find('input[name="email"]'), $box.find('input[name="mobile"]'), 
										$box.find('input[name="empno"]'), $box.find('input[name="empname"]'), $box.find('input[name="post"]')],
					'isEmail':[$box.find('input[name="email"]')],
					'isMoible':[$box.find('input[name="mobile"]')],
					'isPhone':[$box.find('input[name="tel"]')],
					'isNumber':[$box.find('input[name="sn"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.treeselect[name="org"]>.input-group-btn').on('click', '.treeselect[name="org"]>.input-group-btn', function(){
					parent.showZtreeLayer({
						'btn': $(this),
						'title': '机构选择',
						'url': 'json/org-user.json',
						'type': 'apart'
					});
				}).off('click', '.treeselect[name="comp"]>.input-group-btn').on('click', '.treeselect[name="comp"]>.input-group-btn', function(){
					parent.showZtreeLayer({
						'btn': $(this),
						'title': '公司选择',
						'url': 'json/org-user.json',
						'type': 'comp'
					});
				}).off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							org = $box.find('input[name="org"]'), 
							comp = $box.find('input[name="comp"]'), 
							account = $box.find('input[name="account"]'), 
							nickname = $box.find('input[name="nickname"]'),
							email = $box.find('input[name="email"]'), 
							mobile = $box.find('input[name="mobile"]'),
							tel = $box.find('input[name="tel"]'),
							sn = $box.find('input[name="sn"]'),
							empno = $box.find('input[name="empno"]'), 
							empname = $box.find('input[name="empname"]'), 
							post = $box.find('input[name="post"]');
					if( !$.formCheckFn.isNull(org) && !$.formCheckFn.isNull(comp) && !$.formCheckFn.isNull(account) && !$.formCheckFn.isNull(nickname)
							&& !$.formCheckFn.isNull(email) && $.formCheckFn.isEmail(email)	&& !$.formCheckFn.isNull(mobile) && $.formCheckFn.isMobile(mobile)
							&& $.formCheckFn.isPhone(tel) && $.formCheckFn.isNumber(sn) && !$.formCheckFn.isNull(empno) && !$.formCheckFn.isNull(empname)
							&& !$.formCheckFn.isNull(post) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateUserFn();
})(jQuery);
