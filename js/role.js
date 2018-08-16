(function($){
	$.fn.extend({
		roleFn: function(){
			var tdW = parseInt(($.toolFn.vw - 560) / 3);
			
			var init = function(){
				initTbl();
				bindEvent();
			};
			var initTbl = function(){
				tdW = tdW < 200 ? 200 : tdW;
				$.get('json/role.json', function(res){
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
			      	title: '角色名称', 
			      	field: 'name', 
			      	width: tdW, 
			      	align: 'center'
			      }, {
			      	title: '角色编码', 
			      	field: 'code', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['code']);
						  }
			      }, {
			      	title: '排序', 
			      	field: 'sn', 
			      	width: 80, 
			      	align: 'center'
			      }, {
			      	title: '系统角色', 
			      	field: 'isRole', 
			      	width: 80, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return row['isRole'] ? '是' : '否';
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
							  var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑角色" href="javascript:;" data-url="operateRole.html?typ=edit&roleId='+row['id']+'" data-tab-id="editRole'+row['id']+'" data-back-id="tab5"><i class="fa fa-pencil"></i></a>'
							  						+ '<a class="td-btn btn-stop btn-red" title="停用角色" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-ban"></i></a>'
							  						+ '<a class="td-btn btn-del btn-red" title="删除角色" href="javascript:;" data-param="'+row['id']+'"><i class="fa fa-trash"></i></a>'
							  						+ '<a class="td-btn btn-more" title="更多操作" href="javascript:;"><i class="fa fa-chevron-circle-right"></i></a>'
							  						+ '<div class="td-morebtn">'
							  						+ '<a class="btn btn-default" title="角色分配功能权限" href="javascript:;" data-url="roleMenu.html?roleId='+row['id']+'" data-tab-id="roleMenu'+row['id']+'" data-back-id="tab5"><i class="fa fa-check-square-o pull-left"></i><span class="pull-left">功能菜单</span></a>'
							  						+ '<a class="btn btn-default btn-resetPasswd" title="角色分配用户" href="javascript:;" data-url="roleUser.html?roleId='+row['id']+'" data-tab-id="roleUser'+row['id']+'" data-back-id="tab5"><i class="fa fa-user pull-left"></i><span class="pull-left">分配用户</span></a>';
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
				}).off('keydown', 'input[name="rolename"], input[name="rolecode"]')
					.on('keydown', 'input[name="rolename"], input[name="rolecode"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-stop').on('click', '.btn-stop', function(){
					var roleId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定停用该角色吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				}).off('click', '.btn-del').on('click', '.btn-del', function(){
					var roleId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该角色吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						rolename = $.trim($div.find('input[name="rolename"]').val()),
						rolecode = $.trim($div.find('input[name="rolecode"]').val()),
						isSystem = $div.find('input[name="isSystem"]').data('data'),
						status = $div.find('input[name="status"]').data('data'),
						cond = {},
						data = [],
						flag = true;
				rolename != '' ? cond['name'] = rolename : null;
				rolecode != '' ? cond['code'] = rolecode : null;
				isSystem != undefined ? cond['isRole'] = isSystem : null;
				status != undefined ? cond['status'] = status : null;
				
				$.get('json/role.json', function(res){
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
	$(document).roleFn();
})(jQuery);