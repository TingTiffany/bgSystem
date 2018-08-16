(function($){
	$.fn.loginFn = function(){
		var inp_nam = $('.login-cont input[name="loginName"]'), 
				inp_passwd = $('.login-cont input[name="loginPasswd"]'),
				check_nam = $('.login-cont input[name="rememberName"]'),
				check_passwd = $('.login-cont input[name="rememberPasswd"]');
		var init = function(){
			$('[data-toggle="tooltip"]').tooltip({placement:'bottom', trigger: 'manual'});
			$.formCheckFn.init({'isNull':[inp_nam, inp_passwd]});
			
			if($.cookie('loginPasswd')){
				inp_nam.val($.cookie('loginName'));
				inp_passwd.val($.cookie('loginPasswd'));
				check_nam.attr('checked', true);
				check_passwd.attr('checked', true);
			}else if($.cookie('loginName')){
				inp_nam.val($.cookie('loginName'));
				check_nam.attr('checked', true);
			}
			bindEvent();
		};
		var bindEvent = function(){
			$('.login-cont').off('click', '.box-line>.btn').on('click', '.box-line>.btn', function(){
				login();
			}).off('click', 'input[name="rememberPasswd"]').on('click', 'input[name="rememberPasswd"]', function(){
				check_nam[0].checked = this.checked;
			}).off('keydown', 'input[name="loginName"], input[name="loginPasswd"]')
			  .on('keydown', 'input[name="loginName"], input[name="loginPasswd"]', function(e){
				e = e || window.event;
		    if(e.keyCode == 13 || e.which == 13){
		    	$(this).blur();
		    	login();
		    }
			});
		};
		var login = function(){
			$('.loading-layer').removeClass('hidden').find('span').text('正在验证，请稍后...');
			
			var $box = $('.login-box'),
					data = {};
			if(!$.formCheckFn.isNull(inp_nam) && !$.formCheckFn.isNull(inp_passwd)){
				data['name'] = $.trim(inp_nam.val()),
				data['passwd'] = $.trim(inp_passwd.val());
				if(data['name'] == 'admin' && data['passwd'] == '123456'){
					$('.loading-layer').find('span').text('验证成功，正在进入...');
					if(check_passwd.is(':checked')){
						$.cookie('loginName', data['name']);
						$.cookie('loginPasswd', data['passwd']);
					}else if(check_nam.is(':checked')){
						$.cookie('loginName', data['name']);
					}
					$.cookie('isLogin', true);
					window.location.href = 'common.html';
				}else{
					$.toolFn.showTips('账号或密码错误，请重试。', 'alert-danger');
					$('.loading-layer').addClass('hidden');
				}
			}else{
				$('.loading-layer').addClass('hidden');
			}
		};
		init();
	}
	$(document).loginFn();
})(jQuery);
