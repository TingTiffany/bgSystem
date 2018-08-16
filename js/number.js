(function($){
	$.fn.extend({
		numberFn: function(){
			var tdW = parseInt(($.toolFn.vw - 280) / 2);
			
			var init = function(){
				initTbl();
				bindEvent();
			};
			var initTbl = function(){
				tdW = tdW < 200 ? 200 : tdW;
				$.get('json/language.json', function(res){
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
			      	title: '编号名称', 
			      	field: 'numNam', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['numNam']);
						  }
			      }, {
			      	title: '模式', 
			      	field: 'numPattern', 
			      	width: tdW, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['numPattern']);
						  }
			      }, {
			      	title: '计数模式', 
			      	field: 'numModel', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['numModel']);
						  }
			      }, {
			      	title: '下一个值', 
			      	field: 'nextValue', 
			      	width: 100, 
			      	align: 'center', 
			        formatter: function(val, row, idx){
						    return $.toolFn.formatVal(row['nextValue']);
						  }
			      }, { 
			      	title: '操作', 
			      	field: '', 
			      	width: 30, 
			      	align: 'center', 
			      	formatter: function(val, row, idx) {
							  return '<a class="td-btn btn-edit btn-green" title="编辑编号" href="javascript:;" data-url="operateNum.html?typ=edit&numId='+row['id']+'" data-tab-id="editNum'+row['id']+'" data-back-id="tab10"><i class="fa fa-pencil"></i></a>';
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
				}).off('keydown', 'input[name="numNam"]').on('keydown', 'input[name="numNam"]', function(e){
						e = e || window.event;
						if(e.which == 13){
							findData($(this));
						}
				});
			};
			var findData = function($this){
				var $div = $this.closest('.pannel-search'),
						numNam = $.trim($div.find('input[name="numNam"]').val()),
						cond = {},
						data = [],
						flag = true;
				numNam != '' ? cond['numNam'] = numNam : null;
				
				$.get('json/language.json', function(res){
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
	$(document).numberFn();
})(jQuery);