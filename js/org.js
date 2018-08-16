(function($){
	$.fn.extend({
		postFn: function(){
			var tdW = parseInt(($.toolFn.vw - 550) / 3);
			
			var init = function(){
				initTbl();
				bindEvent();
			};
			var initTbl = function(){
				tdW = tdW < 200 ? 200 : tdW;
				$.get('json/org.json', function(res){
					$.toolFn.buildTreeTbl({
						'data': res,
						'idField': 'id',
						'parentIdField': 'pId',
						'treeShowField': 'name',
						'columns': [{ 
			      	title: '机构名称', 
			      	field: 'name', 
			      	width: tdW, 
			      	align: 'left'
			      }, {
			      	title: '机构全称', 
			      	field: 'fullname', 
			      	width: tdW, 
			      	align: 'center'
			      }, {
			      	title: '排序', 
			      	field: 'sn', 
			      	width: 80, 
			      	align: 'center'
			      }, {
			      	title: '机构类型', 
			      	field: 'type', 
			      	width: 100, 
			      	align: 'center',
			    		formatter: function(val, row, idx){
			    			return row['type'] ? '部门' : '公司';
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
			      	title: '备注', 
			      	field: 'description', 
			      	width: tdW, 
			      	align: 'center'
			      }, {
			      	title: '状态', 
			      	field: 'status', 
			      	width: 100, 
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
							  var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑机构" href="javascript:;" data-url="operateOrg.html?typ=edit&orgId='+row['id']+'" data-tab-id="editOrg'+row['id']+'" data-back-id="tab2"><i class="fa fa-pencil"></i></a>'
							  						+ '<a class="td-btn btn-stop btn-red" title="停用机构" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-ban"></i></a>'
							  						+ '<a class="td-btn btn-del btn-red" title="删除机构" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>'
							  						+ '<a class="td-btn btn-add" title="新增下级机构" href="javascript:;" data-url="operateOrg.html?typ=addsub&orgId='+row['id']+'" data-tab-id="addOrg'+row['id']+'" data-back-id="tab2"><i class="fa fa-plus-square"></i></a>';
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
				}).off('keydown', 'input[name="code"], input[name="orgname"], input[name="fullname"]')
					.on('keydown', 'input[name="code"], input[name="orgname"], input[name="fullname"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-stop').on('click', '.btn-stop', function(){
					var orgId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定停用该机构吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				}).off('click', '.btn-del').on('click', '.btn-del', function(){
					var orgId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该机构及其所有子机构吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						code = $.trim($div.find('input[name="code"]').val()),
						orgname = $.trim($div.find('input[name="orgname"]').val()),
						fullname = $.trim($div.find('input[name="fullname"]').val()),
						orgtype = $div.find('input[name="orgtype"]').data('data'),
						status = $div.find('input[name="status"]').data('data'),
						cond = {},
						data = [],
						flag = true;
				code != '' ? cond['id'] = code : null;
				orgname != '' ? cond['name'] = orgname : null;
				fullname != '' ? cond['fullname'] = fullname : null;
				orgtype != undefined ? cond['type'] = orgtype : null;
				status != undefined ? cond['status'] = status : null;
				
				$.get('json/org.json', function(res){
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
								if(!isIn){res[i]['pId'] = 0;}
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