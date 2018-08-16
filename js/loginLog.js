(function($){
	$.fn.extend({
		loginLogFn: function(){
			var tdW = $.toolFn.vw - 840;
			
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
			      	title: '来访时间', 
			      	field: 'accessTime', 
			      	width: 180, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['accessTime'], 'datim', 'yyyy-MM-dd hh:mm:ss');
							}
		      	}, { 
			      	title: '离开时间', 
			      	field: 'leaveTime', 
			      	width: 180, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['leaveTime'], 'datim', 'yyyy-MM-dd hh:mm:ss');
							}
		      	}, {
			      	title: '来访ip', 
			      	field: 'ip', 
			      	width: 180, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['ip']);
							}
		      	}, {
			      	title: '来访者系统信息', 
			      	field: 'systemInfo', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['systemInfo']);
							}
		      	}, {
			      	title: '用户', 
			      	field: 'createByName', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['createByName']);
							}
		      	}, {
			      	title: '登录区域', 
			      	field: 'loginArea', 
			      	width: 150, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['loginArea']);
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
				}).off('keydown', 'input[name="usernam"]').on('keydown', 'input[name="usernam"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						usernam = $.trim($div.find('input[name="usernam"]').val()),
						cond = {},
						data = [],
						flag = true;
				usernam != '' ? cond['usernam'] = usernam : null;
				
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
	$(document).loginLogFn();
})(jQuery);