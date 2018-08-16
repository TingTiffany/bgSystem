(function($){
	$.fn.extend({
		operatePostFn: function(){
			var typ = $.toolFn.getParams('typ'),
					postId = $.toolFn.getParams('postId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				if(typ == 'add'){
					$('.navbar-header>span').text('新增岗位');
				}else if(typ == 'edit'){
					$('.navbar-header>span').text('编辑岗位');
					fillInfo();
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/post.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['postId'] == postId){
							$box.find('input[name="postname"]').val(res[i]['postName']).end()
									.find('input[name="postcode"]').val(res[i]['postCode']).end()
									.find('input[name="sn"]').val(res[i]['sn']).end()
									.find('textarea[name="descr"]').val(res[i]['description']);
							break;
						}
					}
				});
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="postname"]'), $box.find('input[name="postcode"]')],
					'isNumber':[$box.find('input[name="sn"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							postname = $box.find('input[name="postname"]'), 
							postcode = $box.find('input[name="postcode"]'), 
							sn = $box.find('input[name="sn"]');
					if( !$.formCheckFn.isNull(postname) && !$.formCheckFn.isNull(postcode) && $.formCheckFn.isNumber(sn) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operatePostFn();
})(jQuery);
