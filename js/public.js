(function($){
	$.fn.extend({
		publicFn: function(){
			var bindEvent = function(){
				$('[data-toggle="tooltip"]').tooltip({placement:'bottom', trigger: 'manual'});
				
				$(document).on('mousedown', function(e){
					e = e || window.event;
					var ele = e.target || e.srcElement;
					if(e.which != 3){
						$('.right-menu', parent.document).hide();
					}
					if($(ele).closest('.control-select').length == 0){
						hideSelect($('.control-select'));
					}
					$('.main-header li.dropdown.open', parent.document).removeClass('open').children('[data-toggle="dropdown"]').attr('aria-expanded', false);
				});
				
				/*工具栏按钮事件*/
				$('.pannel-navbar').off('click', '.btn-showHide').on('click', '.btn-showHide', function(){
					var $btn = $(this),
							$cont = $btn.closest('.pannel-cont'),
							$sear = $cont.find('.pannel-search'),
							$tbl = $cont.find('.fixed-table-container');
					if($btn.hasClass('clicked')){
						$sear.show();
						$btn.removeClass('clicked').children('span').text('隐藏');
					}else{
						$sear.hide();
						$btn.addClass('clicked').children('span').text('查询');
					}
				}).off('click', '.btn-expandTbl').on('click', '.btn-expandTbl', function(){
					$('#tree-tbl').treegrid('expandAll');
				}).off('click', '.btn-collapseTbl').on('click', '.btn-collapseTbl', function(){
					$('#tree-tbl').treegrid('collapseAll');
				});
				
				/*页面所有链接的跳转动作*/
				$('.pannel-cont').off('click', '[data-url]').on('click', '[data-url]', function(){
					parent.showNavTab($(this));
				});
				
				/*展开收起左侧树形结构*/
				$('.cont-resizer').off('click', '.resizer-toggler').on('click', '.resizer-toggler', function(){
					var $i = $(this).children('.fa'),
							$div = $(this).closest('.cont-resizer'),
							$lcont = $div.siblings('.cont-left'),
							$rcont = $div.siblings('.cont-right');
					if($i.hasClass('fa-caret-left')){
						$lcont.width(0);
						$div.css('left', '0px');
						$rcont.css('padding-left', '8px');
					}else{
						$lcont.width(180);
						$div.css('left', '180px');
						$rcont.css('padding-left', '188px');
					}
					$i.toggleClass('fa-caret-left fa-caret-right');
				});
				
				/*展开收起表格中的更多操作*/
				$('.pannel-tbl').off('click', '>tbody>tr>td>.btn-more').on('click', '>tbody>tr>td>.btn-more', function(){
					var $a = $(this),
							$td = $a.closest('td'),
							$tr = $td.closest('tr'),
							$item = $a.next('.td-morebtn'),
							aw = 0;
					$tr.siblings('tr').find('.btn-more').removeClass('active').next('.td-morebtn').hide();
					$a.toggleClass('active').prevAll().each(function(){
						aw += $(this).outerWidth(true);
					});
					$item.css({
						'top': $td.outerHeight(true) * $tr.index() + 40,
						'right': $td.outerWidth(true) - aw
					}).toggle();
				});
				
				/*下拉选择列表事件*/
				$('.control-select').off('click', '.select-val').on('click', '.select-val', function(){
					var $i = $(this).children('.fa'),
							$lst = $(this).next('.select-list');
					if($i.hasClass('fa-caret-down')){
						$i.removeClass('fa-caret-down').addClass('fa-caret-up');
						$lst.show();
						$.toolFn.setSelectScroll($lst.find('li.seld'));
					}else{
						hideSelect($lst.closest('.control-select'));
					}
				}).off('click', '.select-list li').on('click', '.select-list li', function(){
					var $li = $(this),
							$sel = $li.closest('.control-select'),
							$inp = $sel.find('.select-val>input');
					$inp.val($li.text()).data('data', $li.attr('val'));
					if($inp.attr('data-toggle')){
						$inp.tooltip('hide').closest('.box-line').removeClass('error');
					}
					$li.addClass('seld').siblings('li').removeClass('seld');
					hideSelect($sel);
				}).off('keyup', '.select-list>input').on('keyup', '.select-list>input', function(){
					var $inp = $(this),
							val = $inp.val().toLowerCase();
					$inp.next('ul').children('li').hide().each(function(){
						if($(this).text().toLowerCase().indexOf(val) != -1){
							$(this).show();
						}
					});
				});
			};
			
			/*隐藏下拉选择列表选项*/
			var hideSelect = function($sel){
				$sel.find('.fa').removeClass('fa-caret-up').addClass('fa-caret-down').end()
					  .find('.select-list').hide();
			};
			bindEvent();
		}
	});
	$(document).publicFn();
})(jQuery);






