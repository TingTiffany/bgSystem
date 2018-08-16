(function($){
	$.fn.extend({
		jobScheduleFn: function(){
			var tdW = parseInt(($.toolFn.vw - 580) / 3);
			
			var init = function(){
				initTbl();
				bindEvent();
			};
			var initTbl = function(){
				tdW = tdW < 200 ? 200 : tdW;
				$.get('json/language.json', function(res){
					$.toolFn.buildTbl({
						'data': res,
						'columns': [{
			        title: '', 
			        field: '', 
			        width: 50, 
			        align: 'center', 
			        formatter: function(val, row, idx){
						    return idx + 1;  
						  }
			      }, { 
			      	title: '任务名称', 
			      	field: 'jobName', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['jobName']);
							}
		      	}, { 
			      	title: '任务分组', 
			      	field: 'jobGroup', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['jobGroup']);
							}
		      	}, { 
			      	title: '任务描述', 
			      	field: 'description', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['description']);
							}
		      	}, {
			      	title: '调用目标字符串', 
			      	field: 'invokeTarget', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['invokeTarget']);
							}
		      	}, {
			      	title: '周期表达式', 
			      	field: 'cronExpression',
			      	width: 200, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['cronExpression']);
							}
		      	}, {
			      	title: '状态', 
			      	field: 'status', 
			      	width: 80, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['status']);
							}
		      	}, {
			      	title: '操作', 
			      	field: '', 
			      	width: 150, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
			        	var btnHtml = '';
			        	if(row['status'] == 0){
			        		btnHtml += '<a class="td-btn btn-recovery" title="恢复作业" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-play"></i></a>'
			        						+ '<a class="td-btn btn-play" title="立即运行一次" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-forward"></i></a>';
			        	}else{
			        		btnHtml += '<a class="td-btn btn-stop" title="暂停作业" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-stop"></i></a>';
			        	}
			        	btnHtml += '<a class="td-btn btn-edit btn-green" title="编辑作业" href="javascript:;" data-url="operateSchedule.html?typ=edit&scheduleId='+row['id']+'" data-tab-id="editSchedule'+row['id']+'" data-back-id="tab15"><i class="fa fa-pencil"></i></a>'
		        						+ '<a class="td-btn btn-del btn-red" title="删除作业" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>'
		        						+ '<a class="td-btn" title="监控调度日志" href="javascript:;" data-url="scheduleLog.html?taskNam='+row['jobName']+'&groupNam='+$.toolFn.formatVal(row['jobGroup'])+'" data-tab-id="scheduleLog'+row['id']+'" data-back-id="tab15"><i class="fa fa-file-text-o"></i></a>';
			        	return btnHtml;
							}
		      	}]
					});
				});
			};
			var bindEvent = function(){
				$('.navbar-btns').off('click', '.btn-startTimer').on('click', '.btn-startTimer', function(){
					$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
				}).off('click', '.btn-stopTimer').on('click', '.btn-stopTimer', function(){
					$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
				});
			};
			init();
		}
	});
	$(document).jobScheduleFn();
})(jQuery);