(function($){
	$.fn.extend({
		roleUserFn: function(){
			var tdW = $.toolFn.vw - 1015,
					roleId = $.toolFn.getParams('roleId');
			
			var init = function(){
				initTitle();
				initTbl();
				bindEvent();
			};
			
			var initTitle = function(){
				$.get('json/role.json', function(res){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == roleId){
							$('.navbar-header>span').text('角色授权用户（'+res[i]['name']+'-'+res[i]['code']+'-员工）');
							break;
						}
					}
				});
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
			    		width: 35, 
			    		align: 'center', 
			    		checkbox: true 
			    	}, { 
			    		title: '登录账号', 
			    		field: 'empNumber', 
			    		width: 200, 
			    		align: 'center', 
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['empNumber']);
			    		}  
			    	}, { 
			    		title: '用户昵称', 
			    		field: 'empName', 
			    		width: 200, 
			    		align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['empName']);
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
			    		width: 150, 
			    		align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['mobile']);
			    		}     
			    	}, { 
			    		title: '办公电话', 
			    		field: 'tel', 
			    		width: 150, 
			    		align: 'center',
			    		formatter: function(val, row, idx){
			    			return $.toolFn.formatVal(row['tel']);
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
							width: 40, 
							align: 'center', 
							clickToSelect: false,
							formatter: function(val, row, idx) {
								var btnHtml = '<a class="td-btn btn-cancel" title="取消授权" href="javascript:;" data-param="'+row['empId']+'"><i class="fa fa-times"></i></a>';
							  return btnHtml;
							} 
						}]
					});
				});
			};
			
			var bindEvent = function(){
				$('.pannel-navbar').off('click', '.btn-add').on('click', '.btn-add', function(){
					var $tbl,
							sel_arr = [],
							opt = {
								'title': '用户选择', 
								'content': '<div class="pannel-body"><div class="pannel-search clearfix"><div class="search-group pull-left"><span class="pull-left">账号：</span><input type="text" class="pull-left" name="account" autocomplete="off" /></div><div class="search-group pull-left"><span class="pull-left">昵称：</span><input type="text" class="pull-left" name="nickname" autocomplete="off" /></div><div class="search-group pull-left"><span class="pull-left">邮箱：</span><input type="text" class="pull-left" name="email" autocomplete="off" /></div><div class="search-group pull-left"><span class="pull-left">手机：</span><input type="text" class="pull-left" name="mobile" autocomplete="off" /></div><div class="search-group pull-left"><span class="pull-left">电话：</span><input type="text" class="pull-left" name="tel" autocomplete="off" /></div><div class="search-group pull-left"><button class="btn btn-primary btn-search pull-left">查询</button><button class="btn btn-default btn-reset pull-left">重置</button></div></div><div class="pannel-view"><table class="pannel-tbl"></table></div></div>'
							};
					parent.showDialog(opt, function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					}, function(){
						var ww = $(window).width();
						$tbl = $(this.node).find('.pannel-tbl');
						if(ww < 1000) {$tbl.closest('.pannel-view').width(ww-30);}
						$.get('json/user.json', function(res){
							$tbl.bootstrapTable({
						    data: res,
						    height: 500,
						    buttonsToolbar: 'hidden',
						    pagination: true,
						    paginationLoop: false,
						    sidePagination: 'client',
						    pageNumber: 1,
						    pageSize: 15,
						    pageList: [15, 25, 50, 100],
						    clickToSelect: true,
						    columns: [{ 
					    		width: 50, 
					    		align: 'center', 
					    		formatter: function(val, row, idx){
							    	return idx + 1;  
							  	} 
					    	}, { 
					    		field: 'state', 
					    		width: 35, 
					    		align: 'center', 
					    		checkbox: true, 
					    		formatter: function(val, row, idx){
					    			return $.inArray(row['empId'], sel_arr) != -1;
					    		}
					    	}, { 
					    		title: '登录账号', 
					    		field: 'empNumber', 
					    		width: 100, 
					    		align: 'center', 
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
					    		title: '电子邮箱', 
					    		field: 'email', 
					    		width: 180, 
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
					    		width: 50, 
					    		align: 'center',
					    		formatter: function(val, row, idx){
					    			return row['status'] ? '正常' : '停用';
					    		} 
					    	}]
							});
						});
						$tbl.off('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table')
				    		.on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) {
				    		var state = rows['state'],
				    				idx = $.inArray(rows['empId'], sel_arr);
				    		if(state && idx == -1){
				    			sel_arr.push(rows['empId']);
				    		}else if(!state && idx != -1){
				    			sel_arr.splice(idx, 1);
				    		}
			      });
			      $tbl.closest('.pannel-body').off('click', '.btn-search').on('click', '.btn-search', function(){
							findData($(this));
						}).off('click', '.btn-reset').on('click', '.btn-reset', function(){
							var $div = $(this).closest('.pannel-search');
							$div.find('input').val('');
						}).off('keydown', 'input[name="account"], input[name="nickname"], input[name="email"], input[name="mobile"], input[name="tel"]')
							.on('keydown', 'input[name="account"], input[name="nickname"], input[name="email"], input[name="mobile"], input[name="tel"]', function(e){
								e = e || window.event;
								if(e.which == 13){
									findData($(this));
								}
						});
					});
				}).off('click', '.btn-cancels').on('click', '.btn-cancels', function(){
					if($('.pannel-tbl').bootstrapTable('getSelections').length == 0){
						$.toolFn.showTips('请在列表中选中要取消角色的用户', 'alert-info');
					}else{
						parent.showConfirms('<span class="tip-message">确定取消列表中选中的用户角色权限吗？</span>', function(){
							$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
						});
					}
				}).off('click', '.btn-close').on('click', '.btn-close', function(){
					parent.removeNavTab($('.tab-cont li.active', parent.document));
				});
				
				$('.pannel-search').off('click', '.btn-search').on('click', '.btn-search', function(){
					findData($(this));
				}).off('click', '.btn-reset').on('click', '.btn-reset', function(){
					var $div = $(this).closest('.pannel-search');
					$div.find('input').val('').removeData();
				}).off('keydown', 'input[name="account"], input[name="nickname"], input[name="email"], input[name="mobile"], input[name="tel"]')
					.on('keydown', 'input[name="account"], input[name="nickname"], input[name="email"], input[name="mobile"], input[name="tel"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-cancel').on('click', '.btn-cancel', function(){
					var empId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定取消该用户角色吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
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
						cond = {},
						data = [],
						flag = true;
				account != '' ? cond['empNumber'] = account : null;
				nickname != '' ? cond['empName'] = nickname : null;
				email != '' ? cond['email'] = email : null;
				mobile != '' ? cond['mobile'] = mobile : null;
				tel != '' ? cond['tel'] = tel : null;
				
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
					$div.closest('.pannel-body').find('.pannel-tbl').bootstrapTable('load', data);
				});
			};
			
			init();
		}
	});
	$(document).roleUserFn();
})(jQuery);


