(function($){
	$.fn.extend({
		dictionaryDeilFn: function(){
			var tdW = parseInt(($.toolFn.vw - 510) / 3);
			
			var init = function(){
				initTbl();
				bindEvent();
			};
			var initTbl = function(){
				tdW = tdW < 200 ? 200 : tdW;
				$.get('json/dictionary.json', function(res){
					var id = $.toolFn.getParams('id'),
							dataUrl = $('.navbar-btns>button[data-url]').attr('data-url');
					$('.navbar-btns>button[data-url]').attr('data-url', dataUrl + '&parId=' + id).attr('data-back-id', 'dictionaryDeil'+id);
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == id){
							$('.navbar-header>span').text('字典数据（' + res[i]['type'] + '）');
							$.toolFn.buildTreeTbl({
								'data': res[i]['child'],
								'idField': 'id',
								'treeShowField': 'name',
								'parentIdField': 'pId',
								'columns': [{ 
					      	title: '字典标签', 
					      	field: 'name', 
					      	width: tdW, 
					      	align: 'left'
					      }, {
					      	title: '字典键值', 
					      	field: 'type', 
					      	width: tdW, 
					      	align: 'center', 
					        formatter: function(val, row, idx){
								    return row['type'];
								  }
					      }, {
					      	title: '排序', 
					      	field: 'sn', 
					      	width: 80, 
					      	align: 'center', 
					        formatter: function(val, row, idx){
								    return $.toolFn.formatVal(row['sn']);
								  }
					      }, {
					      	title: '系统内置', 
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
									  var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑字典数据" href="javascript:;" data-url="operateDicDeil.html?typ=edit&parId='+id+'&dicId='+row['id']+'" data-tab-id="editDicDeil'+row['id']+'" data-back-id="dictionaryDeil'+id+'"><i class="fa fa-pencil"></i></a>'
									  						+ '<a class="td-btn btn-stop btn-red" title="停用字典数据" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-ban"></i></a>'
									  						+ '<a class="td-btn btn-del btn-red" title="删除字典数据" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>'
									  						+ '<a class="td-btn btn-add" title="新增下级字典数据" href="javascript:;" data-url="operateDicDeil.html?typ=addsub&parId='+id+'&dicId='+row['id']+'" data-tab-id="addDicDeil'+row['id']+'" data-back-id="dictionaryDeil'+id+'"><i class="fa fa-plus-square"></i></a>';
									  return btnHtml;
									} 
					    	}]
							});
							break;
						}
					}
				});
			};
			var bindEvent = function(){
				$('.pannel-search').off('click', '.btn-search').on('click', '.btn-search', function(){
					findData($(this));
				}).off('click', '.btn-reset').on('click', '.btn-reset', function(){
					$(this).closest('.pannel-search').find('input').val('');
				}).off('keydown', 'input[name="dicname"], input[name="keyname"]')
				  .on('keydown', 'input[name="dicname"], input[name="keyname"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-stop').on('click', '.btn-stop', function(){
					var dicId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定停用该字典数据吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				}).off('click', '.btn-del').on('click', '.btn-del', function(){
					var dicId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该字典数据及其所有子字典数据吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						dicname = $.trim($div.find('input[name="dicname"]').val()),
						keyname = $.trim($div.find('input[name="keyname"]').val()),
						isSystem = $div.find('input[name="isSystem"]').data('data'),
						status = $div.find('input[name="status"]').data('data'),
						cond = {},
						data = [],
						flag = true;
				dicname != '' ? cond['name'] = dicname : null;
				keyname != '' ? cond['type'] = keyname : null;
				isSystem != undefined ? cond['isSystem'] = isSystem : null;
				status != undefined ? cond['status'] = status : null;
				
				$.get('json/dictionary.json', function(res){
					var id = $.toolFn.getParams('id');
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == id){
							res = res[i]['child'];
							break;
						}
					}
					for(var i = 0, len = res.length; i < len; i++){
						flag = true;
						for(var j in cond){
							if(res[i][j] != cond[j]){
								flag = false;
								break;
							}
						}
						if(flag){ 
							if($.inArray(res[i], data) == -1){ data.push(res[i]); }
							if(!$.isEmptyObject(cond)){
								var isIn = false;
								for(var j = 0, lens = data.length; j < lens; j++){
									if(data[j]['id'] == res[i]['pId']){
										isIn = true; break;
									}
								}
								if(!isIn){ res[i]['pId'] = 0; }
								findDatas(res, res[i]['id'], data);
							}
						}
					}
					$('.pannel-tbl').bootstrapTable('load', data);
				});
			};
			var findDatas = function(res, pId, arr){
				for(var i = 0, len = res.length; i < len; i++){
					if(pId == res[i]['pId']){
						if($.inArray(res[i], arr) == -1){ arr.push(res[i]); }
						findDatas(res, res[i]['id'], arr);
					}
				}
				return arr;
			};
			init();
		}
	});
	$(document).dictionaryDeilFn();
})(jQuery);