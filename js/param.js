(function($){
	$.fn.extend({
		paramFn: function(){
			var tdW = parseInt(($.toolFn.vw - 190) / 3);
			
			var init = function(){
				initTbl();
				bindEvent();
			};
			var initTbl = function(){
				tdW = tdW < 200 ? 200 : tdW;
				$.get('json/param.json', function(res){
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
			      	title: '参数名称', 
			      	field: 'name', 
			      	width: tdW, 
			      	align: 'center'
			      }, {
			      	title: '参数键名', 
			      	field: 'keyname', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['keyname']);
						  }
			      }, {
			      	title: '参数键值', 
			      	field: 'key', 
			      	width: tdW, 
			      	align: 'center'
			      }, {
			      	title: '系统参数', 
			      	field: 'isSystem', 
			      	width: 80, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return row['isSystem'] ? '是' : '否';
						  }
			      }, { 
			      	title: '操作', 
			      	field: '', 
			      	width: 60, 
			      	align: 'center', 
			      	formatter: function(val, row, idx) {
							  var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑参数" href="javascript:;" data-url="operateParam.html?typ=edit&paramId='+row['id']+'" data-tab-id="editParam'+row['id']+'" data-back-id="tab6"><i class="fa fa-pencil"></i></a>'
							  						+ '<a class="td-btn btn-del btn-red" title="删除参数" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>';
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
				}).off('keydown', 'input[name="paramnam"], input[name="keyname"]')
					.on('keydown', 'input[name="paramnam"], input[name="keyname"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-del').on('click', '.btn-del', function(){
					var paramId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该参数吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						paramnam = $.trim($div.find('input[name="paramnam"]').val()),
						keyname = $.trim($div.find('input[name="keyname"]').val()),
						isSystem = $div.find('input[name="isSystem"]').data('data'),
						cond = {},
						data = [],
						flag = true;
				paramnam != '' ? cond['name'] = paramnam : null;
				keyname != '' ? cond['keyname'] = keyname : null;
				isSystem != undefined ? cond['isSystem'] = isSystem : null;
				
				$.get('json/param.json', function(res){
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
	$(document).paramFn();
})(jQuery);