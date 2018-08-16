(function($){
	$.fn.extend({
		forgetPwdFn: function(){
			var init = function(){
				initCheck();
				bindEvent();
			};
			var initCheck = function(){
				var $box = $('.login-box'),
						inp_nam = $box.find('input[name="loginName"]'),
						inp_code = $box.find('input[name="code"]'),
						inp_phone = $box.find('input[name="phoneCode"]'),
						inp_email = $box.find('input[name="emailCode"]'),
						inp_pwd = $box.find('input[name="newPasswd"]'),
						inp_pwds = $box.find('input[name="newPasswds"]');
				$('[data-toggle="tooltip"]').tooltip({placement:'bottom', trigger: 'manual'});
				$.formCheckFn.init({'isNull':[inp_nam, inp_code, inp_phone, inp_email, inp_pwd, inp_pwds]});
			};
			var bindEvent = function(){
				$(document).on('mousedown', function(e){
					e = e || window.event;
					var ele = e.target || e.srcElement;
					if($(ele).closest('.control-select').length == 0){
						hideSelect($('.control-select'));
					}
				});
				
				/*下拉选择列表事件*/
				$('.control-select').off('click', '.select-val').on('click', '.select-val', function(){
					var $i = $(this).children('.fa'),
							$lst = $(this).next('.select-list');
					if($i.hasClass('fa-caret-down')){
						$i.removeClass('fa-caret-down').addClass('fa-caret-up');
						$lst.show();
						$.toolFn.setSelectScroll($lst.find('li.seld'));
					}else{
						hideSelect($lst.closest('.control-select'));
					}
				}).off('click', '.select-list li').on('click', '.select-list li', function(){
					var $li = $(this),
							$sel = $li.closest('.control-select'),
							$inp = $sel.find('.select-val>input'),
							val = $li.attr('val');
					$inp.val($li.text()).data('data', val);
					if($inp.attr('data-toggle')){
						$inp.tooltip('hide').closest('.box-line').removeClass('error');
					}
					$('.login-box>.row[val="'+val+'"]').removeClass('hidden').siblings('.row[val]').addClass('hidden');
					$li.addClass('seld').siblings('li').removeClass('seld');
					hideSelect($sel);
				});
				
				$('.forgetPwd').off('click', '.phoneCode>.btn').on('click', '.phoneCode>.btn', function(){
					$('.loading-layer').find('span').text('正在提交，请稍后...');
					var $btn = $(this),
							$box = $btn.closest('.login-box'),
							nam = $.trim($box.find('input[name="loginName"]').val()),
							code = $.trim($box.find('input[name="code"]').val());
					if((nam == '' && nam.length == 0) || nam.toLowerCase() != 'admin'){
						$('.loading-layer').addClass('hidden');
						$.toolFn.showTips('登录账号不正确', 'alert-warning');
					}else if((code == '' && code.length == 0) || code.toUpperCase() != 'FNA3'){
						$('.loading-layer').addClass('hidden');
						$.toolFn.showTips('验证码不正确', 'alert-warning');
					}else{
						$('.loading-layer').addClass('hidden');
						$btn.val('重新发送(60)').attr('disabled', true);
						$.toolFn.showTips('验证码已发送到“136****666”的手机号码，请尽快查收！', 'alert-success', countDown($btn));
					}
				}).off('click', '.emailCode>.btn').on('click', '.emailCode>.btn', function(){
					$('.loading-layer').find('span').text('正在提交，请稍后...');
					var $btn = $(this),
							$box = $btn.closest('.login-box'),
							nam = $.trim($box.find('input[name="loginName"]').val()),
							code = $.trim($box.find('input[name="code"]').val());
					if((nam == '' && nam.length == 0) || nam.toLowerCase() != 'admin'){
						$('.loading-layer').addClass('hidden');
						$.toolFn.showTips('登录账号不正确', 'alert-warning');
					}else if((code == '' && code.length == 0) || code.toUpperCase() != 'FNA3'){
						$('.loading-layer').addClass('hidden');
						$.toolFn.showTips('验证码不正确', 'alert-warning');
					}else{
						$('.loading-layer').addClass('hidden');
						$btn.val('重新发送(60)').attr('disabled', true);
						$.toolFn.showTips('验证码已发送到“9****8@qq.com”邮箱账号，请尽快查收！', 'alert-success', countDown($btn));
					}
				}).off('click', '.btn-primary').on('click', '.btn-primary', function(){
					save();
				}).off('click', '.btn-default').on('click', '.btn-default', function(){
					window.location.href = 'login.html';
				}).off('keydown', 'input[name="loginName"], input[name="code"], input[name="phoneCode"], input[name="emailCode"], input[name="newPasswd"], input[name="newPasswds"]')
				  .on('keydown', 'input[name="loginName"], input[name="code"], input[name="phoneCode"], input[name="emailCode"], input[name="newPasswd"], input[name="newPasswds"]', function(e){
					e = e || window.event;
			    if(e.keyCode == 13 || e.which == 13){
			    	$(this).blur();
			    	save();
			    }
				})
			};
			/*隐藏下拉选择列表选项*/
			var hideSelect = function($sel){
				$sel.find('.fa').removeClass('fa-caret-up').addClass('fa-caret-down').end()
					  .find('.select-list').hide();
			};
			/*倒计时重新发送验证码*/
			var countDown = function($btn){
				var tim,
						cnt = 59;
				tim = setInterval(function(){
					if(cnt <= 0){
						clearInterval(tim);
						$btn.val('获取验证码').attr('disabled', false);
					}else{
						$btn.val('重新发送('+cnt+')');
						cnt -= 1;
					}
				}, 1000);
			};
			/* 提交数据 */
			var save = function(){
				$('.loading-layer').removeClass('hidden').find('span').text('正在提交，请稍后...');
				
				var $box = $('.login-box'),
						inp_typ = $box.find('.control-select li.seld').attr('val'),
						inp_nam = $box.find('input[name="loginName"]'),
						inp_code = $box.find('input[name="code"]'),
						inp_phone = $box.find('input[name="phoneCode"]'),
						inp_email = $box.find('input[name="emailCode"]'),
						inp_pwd = $box.find('input[name="newPasswd"]'),
						inp_pwds = $box.find('input[name="newPasswds"]'),
						data = {};
				
				if((inp_typ == '1' && !$.formCheckFn.isNull(inp_nam) && !$.formCheckFn.isNull(inp_code) && !$.formCheckFn.isNull(inp_phone) && !$.formCheckFn.isNull(inp_pwd) && !$.formCheckFn.isNull(inp_pwds) && $.formCheckFn.isSame(inp_pwd, inp_pwds))
				  || (inp_typ == '2' && !$.formCheckFn.isNull(inp_nam) && !$.formCheckFn.isNull(inp_code) && !$.formCheckFn.isNull(inp_email) && !$.formCheckFn.isNull(inp_pwd) && !$.formCheckFn.isNull(inp_pwds) && $.formCheckFn.isSame(inp_pwd, inp_pwds))){
					$('.loading-layer').addClass('hidden');
					$.toolFn.showTips('设置成功，请重新登录', 'alert-success', function(){
						window.location.href = 'login.html';
					});
				}else{
					$('.loading-layer').addClass('hidden');
				}
			};
			init();
		}
	});
	$(document).forgetPwdFn();
})(jQuery);
