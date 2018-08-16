(function($){
	$.fn.extend({
		dictionaryFn: function(){
			var tdW = parseInt(($.toolFn.vw - 480) / 3);
			
			var init = function(){
				initTbl();
				bindEvent();
			};
			var initTbl = function(){
				tdW = tdW < 200 ? 200 : tdW;
				$.get('json/dictionary.json', function(res){
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
			      	title: '字典名称', 
			      	field: 'name', 
			      	width: tdW, 
			      	align: 'center'
			      }, {
			      	title: '字典类型', 
			      	field: 'type', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['type']);
						  }
			      }, {
			      	title: '系统字典', 
			      	field: 'isSystem', 
			      	width: 80, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return row['isSystem'] ? '是' : '否';
						  }
			      }, {
			      	title: '更新时间', 
			      	field: 'updTime', 
			      	width: 150, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['updTime'], 'datim', 'yyyy-MM-dd hh:mm');;
						  }
			      }, {
			      	title: '备注', 
			      	field: 'description', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['description']);
						  }
			      }, {
			      	title: '状态', 
			      	field: 'status', 
			      	width: 80, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return row['status'] ? '正常' : '停用';
						  }
			      }, { 
			      	title: '操作', 
			      	field: '', 
			      	width: 120, 
			      	align: 'center', 
			      	formatter: function(val, row, idx) {
							  var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑字典类型" href="javascript:;" data-url="operateDic.html?typ=edit&dicId='+row['id']+'" data-tab-id="editDic'+row['id']+'" data-back-id="tab7"><i class="fa fa-pencil"></i></a>'
							  						+ '<a class="td-btn btn-link" title="字典数据" href="javascript:;" data-url="dictionaryDeil.html?id='+row['id']+'" data-tab-id="dictionaryDeil'+row['id']+'" data-back-id="tab7"><i class="fa fa-bars"></i></a>'
							  						+ '<a class="td-btn btn-stop btn-red" title="停用字典类型" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-ban"></i></a>'
							  						+ '<a class="td-btn btn-del btn-red" title="删除字典类型" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>';
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
				}).off('keydown', 'input[name="dicname"], input[name="dictype"]')
					.on('keydown', 'input[name="dicname"], input[name="dictype"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-stop').on('click', '.btn-stop', function(){
					var dicId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定停用该字典类型吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				}).off('click', '.btn-del').on('click', '.btn-del', function(){
					var dicId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该字典类型吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						dicname = $.trim($div.find('input[name="dicname"]').val()),
						dictype = $.trim($div.find('input[name="dictype"]').val()),
						isSystem = $div.find('input[name="isSystem"]').data('data'),
						status = $div.find('input[name="status"]').data('data'),
						cond = {},
						data = [],
						flag = true;
				dicname != '' ? cond['name'] = dicname : null;
				dictype != '' ? cond['type'] = dictype : null;
				isSystem != undefined ? cond['isSystem'] = isSystem : null;
				status != undefined ? cond['status'] = status : null;
				
				$.get('json/dictionary.json', function(res){
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
	$(document).dictionaryFn();
})(jQuery);