(function($){
	$.fn.extend({
		onlineUserFn: function(){
			var tdW = parseInt(($.toolFn.vw - 430) / 4);
			
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
			      	title: '用户名称', 
			      	field: '', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['']);
							}
		      	}, { 
			      	title: '创建时间', 
			      	field: '', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row[''], 'datim', 'yyyy-MM-dd HH:mm:ss');
							}
		      	}, { 
			      	title: '最后访问', 
			      	field: '', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row[''], 'datim', 'yyyy-MM-dd HH:mm:ss');
							}
		      	}, {
			      	title: '超时时间', 
			      	field: '', 
			      	width: 150, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['']);
							}
		      	}, {
			      	title: '客户主机', 
			      	field: '', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['']);
							}
		      	}, {
			      	title: '用户类型', 
			      	field: '', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['']);
							}
		      	}, {
			      	title: '设备类型', 
			      	field: '', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['']);
							}
		      	}, {
			      	title: '操作', 
			      	field: '', 
			      	width: 30, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return '<a class="td-btn btn-del btn-red" title="踢出在线用户" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>';
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
				
				$('.pannel-tbl').off('click', '.btn-del').on('click', '.btn-del', function(){
					var empId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定踢出该在线用户吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
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
	$(document).onlineUserFn();
})(jQuery);