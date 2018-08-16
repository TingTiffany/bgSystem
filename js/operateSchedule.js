(function($){
	$.fn.extend({
		operateScheduleFn: function(){
			var typ = $.toolFn.getParams('typ'),
				scheduleId = $.toolFn.getParams('scheduleId');
			var init = function(){
				initTitle();
				initCheck();
				bindEvent();
			};
			var initTitle = function(){
				var $box = $('.view-box'),
					iframe = $box.find('#cron')[0];
				if(typ == 'add'){
					$box.find('input[name="job_group"][value="default"]').attr('checked', true);
				}else{
					iframe.onload = function(){ 
						fillInfo();
					}; 
				}
			};
			var fillInfo = function(){
				var $box = $('.view-box');
				$.get('json/language.json', function(data){
					if(typ == 'edit'){
						$box.find('input[name="tasknam"]').val(data['jobName']).end()
								.find('input[name="job_group"][value="'+data['jobGroup']+'"]').attr('checked', true).end()
								.find('input[name="taskDescr"]').val(data['description']).end()
								.find('input[name="targetStr"]').val(data['invokeTarget']).end()
								.find('input[name="job_error_strategy"][value="'+data['misfireInstruction']+'"]').attr('checked', true).end()
								.find('input[name="is_concurrent_exc"][value="'+data['concurrent']+'"]').attr('checked', true).end()
								.find('textarea[name="descr"]').val($.toolFn.formatVal(data['remarks']).replace(/<br>/g,'\n'));
						
						$box.find('#cron').contents().find('#cron').val(data['cronExpression'])
							.parent().next('td').find('#btnFan').trigger('click');
					}
				});
			};
			var initCheck = function(){
				var $box = $('.view-box');
				$.formCheckFn.init({
					'isNull':[$box.find('input[name="tasknam"]'), $box.find('input[name="job_group"]'), $box.find('input[name="taskDescr"]'), 
										$box.find('input[name="targetStr"]'), $box.find('input[name="job_error_strategy"]'), $box.find('input[name="is_concurrent_exc"]')]
				});
			};
			var bindEvent = function(){
				$('.view-box').off('click', '.btn-save').on('click', '.btn-save', function(){
					var $box = $('.view-box'),
							tasknam = $box.find('input[name="tasknam"]'), 
							jobGroup = $box.find('input[name="job_group"]'), 
							taskDescr = $box.find('input[name="taskDescr"]'), 
							targetStr = $box.find('input[name="targetStr"]'), 
							strategy = $box.find('input[name="job_error_strategy"]'), 
							exc = $box.find('input[name="is_concurrent_exc"]');
					if( !$.formCheckFn.isNull(tasknam) && !$.formCheckFn.isNull(jobGroup) && !$.formCheckFn.isNull(taskDescr) && !$.formCheckFn.isNull(targetStr)
						&& !$.formCheckFn.isNull(strategy) && !$.formCheckFn.isNull(exc) ){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');		
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
			};
			init();
		}
	});
	$(document).operateScheduleFn();
})(jQuery);
