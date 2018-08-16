(function($){
	$.toolFn = {
		vw: $('.pannel-view').width(),
		tblH: document.body.clientHeight - $('.pannel-navbar').outerHeight(true) - $('.pannel-search').outerHeight(true) - 20,
		
		/*建立bootstrap-table*/
		buildTbl: function(opt){
			parent.showLoading('正在加载，请稍后');
			
			$('.pannel-tbl').bootstrapTable({
		    data: opt['data'],
		    buttonsToolbar: 'hidden',
		    pagination: true,
		    paginationLoop: false,
		    sidePagination: 'client',
		    pageNumber: 1,
		    pageSize: 15,
		    pageList: [15, 25, 50, 100],
		    clickToSelect: true,
		    columns: opt['columns'],
		    onPostBody: function(){
					parent.hideLoading();	
		    }
			});
		},
		
		/*建立bootstrap-treeTable*/
		buildTreeTbl: function(opt){
			parent.showLoading('正在加载，请稍后');
			
			var $treeTbl = $('#tree-tbl');
			$treeTbl.bootstrapTable({
		    data: opt['data'],
		    idField: opt['idField'],
		    columns: opt['columns'],
		    treeShowField: opt['treeShowField'],
		    parentIdField: opt['parentIdField'],
		    onPostBody: function(data) {
					parent.hideLoading();	
		      $treeTbl.treegrid({
		        initialState: 'collapsed',
		        treeColumn: 0,
		        onChange: function() {
		          $treeTbl.bootstrapTable('resetWidth');
		        }
		      });
		    }
		  });
		},
		
		/*建立ztree*/
		buildZtree: function(opt){
			var setting = {
				callback: {
					onClick: opt['onClick']
				},
				check: {
					enable: true,
					chkStyle: 'checkbox'
				},
				data: {
					simpleData: {
						enable: true
					}
				}
			}, ztree, root;
			ztree = $.fn.zTree.init(opt['ele'], setting, opt['data']);
			root = ztree.getNodes()[0];
			//ztree.selectNode(root);
			ztree.expandNode(root);
			return ztree;
		},
		
		/*获取url参数*/
		getParams: function(nam){
			var url = window.location.search.slice(1),
					reg = new RegExp("(^|&)"+ nam +"=([^&]*)(&|$)"),
		   		r = url.match(reg);
		  if(r != null){
		   	return decodeURIComponent(r[2]);
		  }
		  return null;
		},
		
		/*设置单元格数据样式*/
		formatVal: function(val, typ, typStr){
			var res = '';
			if(val == undefined || val == 'undefined' || val == null || val == 'null' || val == '' || val.length == 0){
				res = '';
			}else{
				typStr = typStr ? typStr : '';
				switch(typ){
					case 'datim': res = new Date(val).Format(typStr); break;
					default: res = val + typStr; break;
				}
			}
			return res;
		},
		
		/*设置下拉列表滚动位置*/
		setSelectScroll: function($ele){
			if($ele.length == 1){
				var $ul = $ele.closest('ul'),
						st = ($ele.index() + 1) * $ele.outerHeight(true),
						lh = parseInt($ul.css('max-height'));
				if(st > lh){
					$ul.scrollTop(st-lh);
				}
			}
		},
		
		/*隐藏显示警告*/
		showTips: function(c, typ, fn){
			var $div = $('.alert-container', parent.document),
					fa = typ == 'alert-success' ? 'fa fa-check-circle' : 'fa fa-exclamation-triangle',
					$tip = $('<div class="alert ' + typ + ' fade in">'
						  		+'<a href="#" class="close" data-dismiss="alert">&times;</a>'
						 	 	  +'<i class="'+fa+'"></i>'
						  	  +c 
						  	  +'</div>');
			if($div.length == 0){
				$div = $('<div class="alert-container"></div>');
				$('body', parent.document).append($div);
			}
			$tip.appendTo($div);
			setTimeout(function(){
				$tip.alert('close');
			}, 2000);
			$tip.bind('closed.bs.alert', function () {
				if(fn){fn();}
        if($('.alert').length == 0){
					$div.remove();
				}
    	});
		}
	};
	
	Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
	};
})(jQuery);
