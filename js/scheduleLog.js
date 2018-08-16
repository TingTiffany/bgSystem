(function($){
	$.fn.extend({
		scheduleLogFn: function(){
			var tdW = parseInt(($.toolFn.vw - 580) / 2);
			
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
								return $.toolFn.checkDictNull(dicts, 'obj', 'job_group', row['jobGroup']);
							}
		      	}, { 
			      	title: '日志类型', 
			      	field: 'jobType', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.checkDictNull(dicts, 'obj', 'job_log_type', row['jobType']);
							}
		      	}, {
			      	title: '日志事件', 
			      	field: 'jobEvent', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.checkDictNull(dicts, 'obj', 'job_log_event', row['jobEvent']);
							}
		      	}, {
			      	title: '日志信息', 
			      	field: 'jobMessage', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['jobMessage']);
							}
		      	}, {
			      	title: '是否异常', 
			      	field: 'isException', 
			      	width: 80, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.checkDictNull(dicts, 'obj', 'is_sys', row['isException']);
							}
		      	}, {
			      	title: '发生时间', 
			      	field: 'createDate', 
			      	width: 150, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['createDate'], 'datim', 'yyyy-MM-dd hh:mm:ss');
							}
		      	}]
					});
				});
			};
			var bindEvent = function(){
				$('.pannel-search').off('click', '.btn-search').on('click', '.btn-search', function(){
					findData($(this));
				}).off('click', '.btn-reset').on('click', '.btn-reset', function(){
					var $div = $(this).closest('.pannel-search');
					$div.find('input').val('').removeData().end()
							.find('.select-list li.seld').removeClass('seld');
				}).off('keydown', 'input[name="taskNam"], input[name="groupNam"], input[name="logInfo"]')
				  .on('keydown', 'input[name="taskNam"], input[name="groupNam"], input[name="logInfo"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						taskNam = $.trim($div.find('input[name="taskNam"]').val()),
						groupNam = $.trim($div.find('input[name="groupNam"]').val()),
						logTyp = $div.find('input[name="logTyp"]').data('data') || '',
						logEvent = $div.find('input[name="logEvent"]').data('data') || '',
						logInfo = $.trim($div.find('input[name="logInfo"]').val()),
						isNormal = $div.find('input[name="isNormal"]').data('data') || '',
						cond = {},
						data = [],
						flag = true;
				taskNam != '' ? cond['taskNam'] = taskNam : null;
				groupNam != '' ? cond['groupNam'] = groupNam : null;
				logTyp != '' ? cond['logTyp'] = logTyp : null;
				logEvent != '' ? cond['logEvent'] = logEvent : null;
				logInfo != '' ? cond['logInfo'] = logInfo : null;
				isNormal != '' ? cond['isNormal'] = isNormal : null;
				
				$.get('json/language.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						flag = true;
						for(var j in cond){
							if(res[i][j] != cond[j]){
								flag = false;
								break;
							}
						}
						if(flag){ data.push(res[i]); }
					}
					$('.pannel-tbl').bootstrapTable('load', data);
				});
			};
			init();
		}
	});
	$(document).scheduleLogFn();
})(jQuery);