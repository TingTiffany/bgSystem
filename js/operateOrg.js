(function($){
	$.fn.extend({
		operateOrgFn: function(){
			var typ = $.toolFn.getParams('typ'),
					orgId = $.toolFn.getParams('orgId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				if(typ == 'add'){
					$('.navbar-header>span').text('新增机构');
				}else if(typ == 'edit'){
					$('.navbar-header>span').text('编辑机构');
					fillInfo();
				}else if(typ == 'addsub'){
					$('.navbar-header>span').text('新增机构');
					fillInfo();
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/org.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == orgId){
							if(typ == 'edit'){
								$box.find('input[name="org"]').val(res[i]['pname']).data('node', {'id':res[i]['pId']}).end()
										.find('input[name="orgname"]').val(res[i]['name']).end()
										.find('input[name="orgcode"]').val('').end()
										.find('input[name="fullname"]').val(res[i]['fullname']).end()
										.find('input[name="sn"]').val(res[i]['sn']).end()
										.find('input[name="principal"]').val('').end()
										.find('input[name="tel"]').val(res[i]['tel']).end()
										.find('input[name="adr"]').val('').end()
										.find('input[name="zipcode"]').val('').end()
										.find('input[name="email"]').val(res[i]['email']).end()
										.find('textarea[name="descr"]').val(res[i]['description']);
								
								$box.find('input[name="orgtyp"]').val(res[i]['typeVal']).data('data', res[i]['type'])
										.parent().siblings('.select-list').find('li[val="'+res[i]['type']+'"]').addClass('seld').siblings('li').removeClass('seld');
							}else{
								$box.find('input[name="org"]').val(res[i]['name']).data('node', {'id':res[i]['id']});
							}
							break;
						}
					}
				});
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="orgname"]'), $box.find('input[name="orgcode"]'), $box.find('input[name="fullname"]'), $box.find('input[name="orgtyp"]')],
					'isEmail':[$box.find('input[name="email"]')],
					'isPhone':[$box.find('input[name="tel"]')],
					'isNumber':[$box.find('input[name="sn"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.treeselect[name="org"]>.input-group-btn').on('click', '.treeselect[name="org"]>.input-group-btn', function(){
					parent.showZtreeLayer({
						'btn': $(this),
						'title': '机构选择',
						'url': 'json/org-user.json'
					});
				}).off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							orgname = $box.find('input[name="orgname"]'), 
							orgcode = $box.find('input[name="orgcode"]'), 
							fullname = $box.find('input[name="fullname"]'), 
							orgtyp = $box.find('input[name="orgtyp"]'),
							email = $box.find('input[name="email"]'), 
							tel = $box.find('input[name="tel"]'),
							sn = $box.find('input[name="sn"]');
					if( !$.formCheckFn.isNull(orgname) && !$.formCheckFn.isNull(orgcode) && !$.formCheckFn.isNull(fullname) && !$.formCheckFn.isNull(orgtyp)
							&& $.formCheckFn.isEmail(email) && $.formCheckFn.isPhone(tel) && $.formCheckFn.isNumber(sn) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateOrgFn();
})(jQuery);
