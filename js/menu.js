(function($){
	$.fn.extend({
		postFn: function(){
			var tdW = parseInt(($.toolFn.vw - 310) / 3);
			
			var init = function(){
				initTbl();
				bindEvent();
			};
			var initTbl = function(){
				tdW = tdW < 200 ? 200 : tdW;
				$.get('json/menu.json', function(res){
					$.toolFn.buildTreeTbl({
						'data': res,
						'idField': 'id',
						'treeShowField': 'name',
						'parentIdField': 'pId',
						'columns': [{ 
			      	title: '菜单名称', 
			      	field: 'name', 
			      	width: tdW, 
			      	align: 'left'
			      }, {
			      	title: '链接', 
			      	field: 'link', 
			      	width: tdW, 
			      	align: 'left'
			      }, {
			      	title: '排序', 
			      	field: 'sn', 
			      	width: 50, 
			      	align: 'center'
			      }, {
			      	title: '类型', 
			      	field: 'type', 
			      	width: 80, 
			      	align: 'center',
			    		formatter: function(val, row, idx){
			    			return row['type'] ? '菜单' : '权限';
			    		} 
			      }, {
			      	title: '可见', 
			      	field: 'canSee', 
			      	width: 80, 
			      	align: 'center',
			    		formatter: function(val, row, idx){
			    			return row['canSee'] ? '显示' : '隐藏';
			    		} 
			      }, {
			      	title: '权限标识', 
			      	field: 'identity', 
			      	width: tdW, 
			      	align: 'center'
			      }, { 
			      	title: '操作', 
			      	field: '', 
			      	width: 100, 
			      	align: 'center', 
			      	formatter: function(val, row, idx) {
							  var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑菜单" href="javascript:;" data-url="operateMenu.html?typ=edit&menuId='+row['id']+'" data-tab-id="editMenu'+row['id']+'" data-back-id="tab4"><i class="fa fa-pencil"></i></a>'
							  						+ '<a class="td-btn btn-del btn-red" title="删除菜单" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>'
							  						+ '<a class="td-btn btn-add" title="新增下级菜单" href="javascript:;" data-url="operateMenu.html?typ=addsub&menuId='+row['id']+'" data-tab-id="addMenu'+row['id']+'" data-back-id="tab4"><i class="fa fa-plus-square"></i></a>';
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
					$(this).closest('.pannel-search').find('input').val('');
				}).off('keydown', 'input[name="menuname"]').on('keydown', 'input[name="menuname"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-del').on('click', '.btn-del', function(){
					var menuId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该菜单及其所有子菜单吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						menuname = $.trim($div.find('input[name="menuname"]').val()),
						cond = {},
						data = [],
						flag = true;
				menuname != '' ? cond['name'] = menuname : null;
				
				$.get('json/menu.json', function(res){
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
	$(document).postFn();
})(jQuery);