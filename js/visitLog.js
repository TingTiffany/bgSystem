(function($){
	$.fn.extend({
		visitLogFn: function(){
			var tdW = parseInt(($.toolFn.vw - 1040) / 2);
			
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
			      	title: '日志标题', 
			      	field: 'logTitle', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['logTitle']);
						  }
			      }, {
			      	title: '请求地址', 
			      	field: 'requestUri', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['requestUri']);
						  }
			      }, {
			      	title: '日志类型', 
			      	field: 'logType', 
			      	width: 120, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['logType']);
						  }
			      }, {
			      	title: '操作用户', 
			      	field: 'createByName', 
			      	width: 120, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['createByName']);
						  }
			      }, {
			      	title: '异常', 
			      	field: 'isException', 
			      	width: 80, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
			        	return $.toolFn.formatVal(row['isException']);
							}
		      	}, {
			      	title: '业务类型', 
			      	field: 'bizType', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['bizType']);
							}
		      	}, {
			      	title: '操作时间', 
			      	field: 'createDate', 
			      	width: 120, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['createDate'], 'datim', 'yyyy-MM-dd hh:mm');
							}
		      	}, {
			      	title: '客户端IP', 
			      	field: 'remoteAddr', 
			      	width: 120, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['remoteAddr']);
							}
		      	}, {
			      	title: '设备名称', 
			      	field: 'deviceName', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['deviceName']);
							}
		      	}, {
			      	title: '浏览器名', 
			      	field: 'browserName', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['browserName']);
							}
		      	}, {
			      	title: '响应时间(毫秒)', 
			      	field: 'executeTime', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['executeTime']);
							}
		      	}, { 
			      	title: '操作', 
			      	field: '', 
			      	width: 30, 
			      	align: 'center', 
			      	formatter: function(val, row, idx) {
							  return '<a class="td-btn btn-deil" title="日志详情" href="javascript:;" data-url="visitDeil.html?id='+row['id']+'" data-tab-id="visitDeil'+row['id']+'"><i class="fa fa-ellipsis-h"></i></a>';
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
				}).off('keydown', 'input[name="logTitle"], input[name="LogUrl"], input[name="serviceTyp"], input[name="clientIP"]')
				  .on('keydown', 'input[name="logTitle"], input[name="LogUrl"], input[name="serviceTyp"], input[name="clientIP"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						logTitle = $.trim($div.find('input[name="logTitle"]').val()),
						LogUrl = $.trim($div.find('input[name="LogUrl"]').val()),
						LogTyp = $div.find('input[name="LogTyp"]').data('data') || '',
						isNormal = $div.find('input[name="isNormal"]').data('data') || '',
						serviceTyp = $.trim($div.find('input[name="serviceTyp"]').val()),
						clientIP = $.trim($div.find('input[name="clientIP"]').val()),
						cond = {},
						data = [],
						flag = true;
				logTitle != '' ? cond['logTitle'] = logTitle : null;
				LogUrl != '' ? cond['LogUrl'] = LogUrl : null;
				LogTyp != '' ? cond['LogTyp'] = LogTyp : null;
				isNormal != '' ? cond['isNormal'] = isNormal : null;
				serviceTyp != '' ? cond['serviceTyp'] = serviceTyp : null;
				clientIP != '' ? cond['clientIP'] = clientIP : null;
				
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
	$(document).visitLogFn();
})(jQuery);