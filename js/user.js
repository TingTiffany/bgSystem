(function($){
	$.fn.extend({
		userFn: function(){
			var tdW = parseInt(($.toolFn.vw - 910) / 3),
					ztree;
			
			var init = function(){
				initTbl();
				initTree();
				bindEvent();
			};
			
			var initTbl = function(){
				tdW = tdW < 200 ? 200 : tdW;
				$.get('json/user.json', function(res){
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
			    		title: '登录账号', 
			    		field: 'empNumber', 
			    		width: 100, 
			    		align: 'center', 
			    		sortable: true, 
			    		order: 'asc',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['empNumber']);
			    		}  
			    	}, { 
			    		title: '用户昵称', 
			    		field: 'empName', 
			    		width: 100, 
			    		align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['empName']);
			    		}  
			    	}, { 
			    		title: '员工姓名', 
			    		field: 'empName', 
			    		width: 100, 
			    		align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['empName']);
			    		}  
			    	}, { 
			    		title: '归属机构', 
			    		field: 'orgName', 
			    		width: tdW, 
			    		align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['orgName']);
			    		}   
			    	}, { 
			    		title: '归属公司', 
			    		field: 'compName', 
			    		width: tdW, 
			    		align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['compName']);
			    		}    
			    	}, { 
			    		title: '电子邮箱', 
			    		field: 'email', 
			    		width: tdW, 
			    		align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['email']);
			    		}     
						}, { 
			    		title: '移动电话', 
			    		field: 'mobile', 
			    		width: 120, 
			    		align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['mobile']);
			    		}     
			    	}, { 
			    		title: '办公电话', 
			    		field: 'tel', 
			    		width: 120, 
			    		align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['tel']);
			    		} 
			    	}, { 
			    		title: '更新时间', 
			    		field: 'updTime', 
			    		width: 120, 
			    		align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['updTime'], 'datim', 'yyyy-MM-dd hh:mm');
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
								var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑用户" href="javascript:;" data-url="operateUser.html?typ=edit&userId='+row['empId']+'" data-tab-id="editUser'+row['empId']+'" data-back-id="tab1"><i class="fa fa-pencil"></i></a>';
								if(row['status']){
									btnHtml += '<a class="td-btn btn-stop btn-red" title="停用用户" href="javascript:;" data-param="'+row['empId']+'"><i class="fa fa-ban"></i></a>';
								}else{
									btnHtml += '<a class="td-btn btn-start btn-green" title="启用用户" href="javascript:;" data-param="'+row['empId']+'"><i class="fa fa-check-circle-o"></i></a>';
								}
							  	btnHtml += '<a class="td-btn btn-del btn-red" title="删除用户" href="javascript:;" data-param="'+row['empId']+'"><i class="fa fa-trash"></i></a>'
						  						+ '<a class="td-btn btn-more" title="更多操作" href="javascript:;"><i class="fa fa-chevron-circle-right"></i></a>'
						  						+ '<div class="td-morebtn">'
						  						+ '<a class="btn btn-default" title="用户分配角色" href="javascript:;" data-url="userRole.html?userId='+row['empId']+'" data-tab-id="userRole'+row['empId']+'" data-back-id="tab1"><i class="fa fa-check-square-o pull-left"></i><span class="pull-left">分配角色</span></a>'
						  						+ '<a class="btn btn-default btn-resetPasswd" title="用户密码重置" href="javascript:;" data-param="'+row['empId']+'"><i class="fa fa-unlock pull-left"></i><span class="pull-left">重置密码</span></a>'
						  						+ '</div>';
							  return btnHtml;
							} 
						}]
					});
				});
			};
			
			var initTree = function(){
				$.get('json/org-user.json', function(res){
					ztree = $.toolFn.buildZtree({
						'ele': $("#tree-org"),
						'data': res,
						'onClick': function(e, treeId, treeNode){
							$('.pannel-search input[name="org"]').val(treeNode['name']).data('node', treeNode);
							$.get('json/user.json', function(res){
								var data = [];
								if(treeNode['name'] == '杰科集团'){
									data = res;
								}else{
									for(var i = 0, len = res.length; i < len; i++){
										if(res[i]['orgName'] == treeNode['name']){
											data.push(res[i]);
										}
									}
								}
								$('.pannel-tbl').bootstrapTable('load', data);
							});
						}
					});
				});
			};
			
			var bindEvent = function(){
				$('.pannel-navbar').off('click', '.btn-collapseTree').on('click', '.btn-collapseTree', function(){
					var $i = $(this);
					if($i.hasClass('clicked')){
						$i.toggleClass('clicked fa-chevron-down fa-chevron-up').attr('title', '展开');
						ztree.expandAll(false);
					}else{
						$i.toggleClass('clicked fa-chevron-down fa-chevron-up').attr('title', '折叠');
						ztree.expandAll(true);
					}
				});
				
				$('.pannel-search').off('click', '.treeselect[name="org"]>.input-group-btn').on('click', '.treeselect[name="org"]>.input-group-btn', function(){
					parent.showZtreeLayer({
						'btn': $(this),
						'title': '机构选择',
						'url': 'json/org-user.json',
						'type': 'apart'
					});
				}).off('click', '.treeselect[name="comp"]>.input-group-btn').on('click', '.treeselect[name="comp"]>.input-group-btn', function(){
					parent.showZtreeLayer({
						'btn': $(this),
						'title': '公司选择',
						'url': 'json/org-user.json',
						'type': 'comp'
					});
				}).off('click', '.btn-search').on('click', '.btn-search', function(){
					findData($(this));
				}).off('click', '.btn-reset').on('click', '.btn-reset', function(){
					var $tree = $.fn.zTree.getZTreeObj('tree-org'),
							$div = $(this).closest('.pannel-search');
					$div.find('input').val('').removeData().end()
							.find('.select-list li.seld').removeClass('seld');
					$tree.cancelSelectedNode();
				}).off('keydown', 'input[name="account"], input[name="nickname"], input[name="email"], input[name="mobile"], input[name="tel"], input[name="username"]')
					.on('keydown', 'input[name="account"], input[name="nickname"], input[name="email"], input[name="mobile"], input[name="tel"], input[name="username"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-stop').on('click', '.btn-stop', function(){
					var empId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定停用该用户吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				}).off('click', '.btn-start').on('click', '.btn-start', function(){
					var empId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定启用该用户吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				}).off('click', '.btn-del').on('click', '.btn-del', function(){
					var empId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该用户吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				}).off('click', '.btn-resetPasswd').on('click', '.btn-resetPasswd', function(){
					var $btn = $(this),
							empId = $btn.attr('data-param');
					parent.showConfirms('<span class="tip-message">确定将该用户密码重置到初始状态吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
						$btn.closest('.td-morebtn').toggle().prev('.btn-more').removeClass('active');
					});
				});
			};
			
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						account = $.trim($div.find('input[name="account"]').val()),
						nickname = $.trim($div.find('input[name="nickname"]').val()),
						email = $.trim($div.find('input[name="email"]').val()),
						mobile = $.trim($div.find('input[name="mobile"]').val()),
						tel = $.trim($div.find('input[name="tel"]').val()),
						username = $.trim($div.find('input[name="username"]').val()),
						org = $div.find('input[name="org"]').data('node'),
						comp = $div.find('input[name="comp"]').data('node'),
						post = $div.find('input[name="post"]').data('data'),
						status = $div.find('input[name="status"]').data('data'),
						cond = {},
						data = [],
						flag = true;
				account != '' ? cond['empNumber'] = account : null;
				nickname != '' ? cond['empName'] = nickname : null;
				email != '' ? cond['email'] = email : null;
				mobile != '' ? cond['mobile'] = mobile : null;
				tel != '' ? cond['tel'] = tel : null;
				username != '' ? cond['empName'] = username : null;
				org != undefined ? cond['orgName'] = org['name'] : null;
				comp != undefined ? cond['compName'] = comp['name'] : null;
				post != undefined ? cond['postId'] = post : null;
				status != undefined ? cond['status'] = status : null;
				
				$.get('json/user.json', function(res){
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
	$(document).userFn();
})(jQuery);


