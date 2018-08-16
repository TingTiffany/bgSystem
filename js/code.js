(function($){
	$.fn.extend({
		codeFn: function(){
			var tdW = parseInt(($.toolFn.vw - 590) / 2);
			
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
			      	title: '表名', 
			      	field: 'tblName', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['tblName']);
							}
		      	}, { 
			      	title: '表说明', 
			      	field: 'tblDescr', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['tblDescr']);
							}
		      	}, { 
			      	title: '子表数', 
			      	field: 'subTbl', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['subTbl']);
							}
		      	}, {
			      	title: '功能作者', 
			      	field: 'author', 
			      	width: 200, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['author']);
							}
		      	}, {
			      	title: '创建时间', 
			      	field: 'createDate', 
			      	width: 150, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
								return $.toolFn.formatVal(row['createDate'], 'datim', 'yyyy-MM-dd HH:mm');
							}
		      	}, {
			      	title: '操作', 
			      	field: '', 
			      	width: 90, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
			        	var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑生成配置" href="javascript:;" data-url="operateCode.html?typ=edit&tblId='+row['id']+'" data-tab-id="editTbl'+row['id']+'" data-back-id="tab16"><i class="fa fa-pencil"></i></a>'
			        							+ '<a class="td-btn btn-del btn-red" title="删除生成配置" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>'
			        							+ '<a class="td-btn btn-make btn-red" title="生成代码" href="javascript:;" data-url="operateCode.html?typ=edit&tblId='+row['id']+'" data-tab-id="editTbl'+row['id']+'" data-back-id="tab16"><i class="fa fa-trash"></i></a>';
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
					$div.find('input').val('');
				}).off('keydown', 'input[name="tblNam"], input[name="tblDescr"]').on('keydown', 'input[name="tblNam"], input[name="tblDescr"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-del').on('click', '.btn-del', function(){
					var empId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该生成配置吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						tblNam = $.trim($div.find('input[name="tblNam"]').val()),
						tblDescr = $.trim($div.find('input[name="tblDescr"]').val()),
						cond = {},
						data = [],
						flag = true;
				tblNam != '' ? cond['tblNam'] = tblNam : null;
				tblDescr != '' ? cond['tblDescr'] = tblDescr : null;
				
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
	$(document).codeFn();
})(jQuery);