(function($){
	$.fn.extend({
		postFn: function(){
			var tdW = parseInt(($.toolFn.vw - 440) / 3);
			
			var init = function(){
				initTbl();
				bindEvent();
			};
			var initTbl = function(){
				tdW = tdW < 200 ? 200 : tdW;
				$.get('json/post.json', function(res){
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
			      	title: '岗位名称', 
			      	field: 'postName', 
			      	width: tdW, 
			      	align: 'center'
			      }, {
			      	title: '岗位编码', 
			      	field: 'function', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['postCode']);
						  }
			      }, {
			      	title: '排序', 
			      	field: 'sn', 
			      	width: 80, 
			      	align: 'center'
			      }, {
			      	title: '更新时间', 
			      	field: 'sn', 
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
			      	width: 80, 
			      	align: 'center', 
			      	formatter: function(val, row, idx) {
							  var btnHtml = '<a class="td-btn btn-edit btn-green" title="编辑岗位" href="javascript:;" data-url="operatePost.html?typ=edit&postId='+row['postId']+'" data-tab-id="editPost'+row['postId']+'" data-back-id="tab3"><i class="fa fa-pencil"></i></a>'
							  						+ '<a class="td-btn btn-stop btn-red" title="停用岗位" href="javascript:;" data-param="'+row['postId']+'"><i class="fa fa-ban"></i></a>'
							  						+ '<a class="td-btn btn-del btn-red" title="删除岗位" href="javascript:;" data-param="'+row['postId']+'"><i class="fa fa-trash"></i></a>';
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
				}).off('keydown', 'input[name="code"], input[name="postname"]').on('keydown', 'input[name="code"], input[name="postname"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
				
				$('.pannel-tbl').off('click', '.btn-stop').on('click', '.btn-stop', function(){
					var postId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定停用该岗位吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				}).off('click', '.btn-del').on('click', '.btn-del', function(){
					var postId = $(this).attr('data-param');
					parent.showConfirms('<span class="tip-message">确定删除该岗位吗？</span>', function(){
						$.toolFn.showTips('演示模式，不允许操作！', 'alert-danger');
					});
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						code = $.trim($div.find('input[name="code"]').val()),
						postname = $.trim($div.find('input[name="postname"]').val()),
						status = $div.find('input[name="status"]').data('data'),
						cond = {},
						data = [],
						flag = true;
				code != '' ? cond['postCode'] = code : null;
				postname != '' ? cond['postName'] = postname : null;
				status != undefined ? cond['status'] = status : null;
				
				$.get('json/post.json', function(res){
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
	$(document).postFn();
})(jQuery);