(function($){
	$.fn.extend({
		postFn: function(){
			var tdW = parseInt(($.toolFn.vw - 600) / 2);
			
			var init = function(){
				initTbl();
				bindEvent();
			};
			var initTbl = function(){
				tdW = tdW < 200 ? 200 : tdW;
				$.get('json/area.json', function(res){
					$.toolFn.buildTreeTbl({
						'data': res,
						'idField': 'id',
						'treeShowField': 'name',
						'parentIdField': 'pId',
						'columns': [{ 
			      	title: '区域名称', 
			      	field: 'name', 
			      	width: tdW, 
			      	align: 'left',
			    		formatter: function(val, row, idx){
			    			return '（' + row['code'] + '）' + row['name'];
			    		} 
			      }, {
			      	title: '区域类型', 
			      	field: 'type', 
			      	width: 200, 
			      	align: 'center'
			      }, {
			      	title: '备注', 
			      	field: 'description', 
			      	width: tdW, 
			      	align: 'center'
			      }, {
			      	title: '排序', 
			      	field: 'sn', 
			      	width: 50, 
			      	align: 'center'
			      }, {
			      	title: '状态', 
			      	field: 'status', 
			      	width: 80, 
			      	align: 'center',
			    		formatter: function(val, row, idx){
			    			return row['status'] ? '正常' : '停用';
			    		} 
			      }, {
			      	title: '更新时间', 
			      	field: 'updTime', 
			      	width: 150, 
			      	align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['updTime'], 'datim', 'yyyy-MM-dd hh:mm');
			    		} 
			      }, { 
			      	title: '操作', 
			      	field: '', 
			      	width: 120, 
			      	align: 'center', 
			      	formatter: function(val, row, idx) {
							  var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑区域" href="javascript:;" data-url="operateArea.html?typ=edit&areaId='+row['id']+'" data-tab-id="editArea'+row['id']+'" data-back-id="tab8"><i class="fa fa-pencil"></i></a>'
							  						+ '<a class="td-btn btn-stop btn-red" title="停用区域" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-ban"></i></a>'
							  						+ '<a class="td-btn btn-del btn-red" title="删除区域" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>'
							  						+ '<a class="td-btn btn-add" title="新增下级区域" href="javascript:;" data-url="operateArea.html?typ=addsub&areaId='+row['id']+'" data-tab-id="addArea'+row['id']+'" data-back-id="tab8"><i class="fa fa-plus-square"></i></a>';
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
				}).off('keydown', 'input[name="areacode"], input[name="areaname"]')
					.on('keydown', 'input[name="areacode"], input[name="areaname"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-stop').on('click', '.btn-stop', function(){
					var orgId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定停用该区域吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				}).off('click', '.btn-del').on('click', '.btn-del', function(){
					var orgId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该区域及其所有子区域吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						areacode = $.trim($div.find('input[name="areacode"]').val()),
						areaname = $.trim($div.find('input[name="areaname"]').val()),
						status = $div.find('input[name="status"]').data('data'),
						cond = {},
						data = [],
						flag = true;
				areacode != '' ? cond['code'] = areacode : null;
				areaname != '' ? cond['name'] = areaname : null;
				status != undefined ? cond['status'] = status : null;
				
				$.get('json/area.json', function(res){
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