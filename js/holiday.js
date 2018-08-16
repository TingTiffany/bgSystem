(function($){
	$.fn.extend({
		numberFn: function(){
			var tdW = $.toolFn.vw - 430;
			
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
			      	title: '日期', 
			      	field: 'holidayDate', 
			      	width: 120, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['holidayDate'], 'datim', 'yyyy-MM-dd');
						  }
			      }, {
			      	title: '节日', 
			      	field: 'holidayNam', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['holidayNam']);
						  }
			      }, {
			      	title: '是否补班', 
			      	field: 'isUp', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['isUp']);
						  }
			      }, { 
			      	title: '操作', 
			      	field: '', 
			      	width: 60, 
			      	align: 'center', 
			      	formatter: function(val, row, idx) {
							  var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑假期" href="javascript:;" data-url="operateHoliday.html?typ=edit&holId='+row['id']+'" data-tab-id="editHoliday'+row['id']+'" data-back-id="tab10"><i class="fa fa-pencil"></i></a>'
							  						+ '<a class="td-btn btn-del btn-red" title="删除假期" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>';
							  return btnHtml;
							} 
			    	}]
					});
				});
			};
			var bindEvent = function(){
				$('.pannel-tbl').off('click', '.btn-del').on('click', '.btn-del', function(){
					var lanId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该假期吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				});
			};
			init();
		}
	});
	$(document).numberFn();
})(jQuery);