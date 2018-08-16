(function($){
	$.fn.extend({
		languageFn: function(){
			var tdW = parseInt(($.toolFn.vw - 310) / 3);
			
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
			      	title: '语言编码', 
			      	field: 'code', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['code']);
						  }
			      }, {
			      	title: '语言译文', 
			      	field: 'page', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['page']);
						  }
			      }, {
			      	title: '语言类型', 
			      	field: 'lanTyp', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['lanTyp']);
						  }
			      }, {
			      	title: '更新时间', 
			      	field: 'updDate', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['updDate'], 'datim', 'yyyy-MM-dd');
						  }
			      }, {
			      	title: '备注信息', 
			      	field: 'descr', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['descr']);
						  }
			      }, { 
			      	title: '操作', 
			      	field: '', 
			      	width: 60, 
			      	align: 'center', 
			      	formatter: function(val, row, idx) {
							  var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑语言" href="javascript:;" data-url="operateLan.html?typ=edit&lanId='+row['id']+'" data-tab-id="editLan'+row['id']+'" data-back-id="tab9"><i class="fa fa-pencil"></i></a>'
							  						+ '<a class="td-btn btn-del btn-red" title="删除语言" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>';
							  return btnHtml;
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
				}).off('keydown', 'input[name="lanCode"], input[name="lanPage"]')
					.on('keydown', 'input[name="lanCode"], input[name="lanPage"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-del').on('click', '.btn-del', function(){
					var lanId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该语言吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						lanCode = $.trim($div.find('input[name="lanCode"]').val()),
						lanPage = $.trim($div.find('input[name="lanPage"]').val()),
						lanTyp = $div.find('input[name="lanTyp"]').data('data'),
						cond = {},
						data = [],
						flag = true;
				lanCode != '' ? cond['code'] = lanCode : null;
				lanPage != '' ? cond['page'] = lanPage : null;
				lanTyp != undefined ? cond['lanTyp'] = lanTyp : null;
				
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
	$(document).languageFn();
})(jQuery);