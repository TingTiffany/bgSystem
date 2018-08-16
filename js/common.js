var $tab = $('.main-cont .tab-cont'),
		$tul = $tab.children('ul');

var sidebarW = $('.main-sidebar').outerWidth(),
		tabLiW = $tul.children('li:eq(0)').outerWidth(true),
		tabW = 0,
		resizeTimer;

(function($){
	$.fn.extend({
		commonFn: function(){
			var init = function(){
				isLogin();
				initHeight();
				initTabWidth();
				bindEvent();
			};
			
			/*判断是否登录*/
			var isLogin = function(){
				if(!$.cookie('isLogin')){
					signOut();
				}
			};
			
			/*退出系统*/
			var signOut = function(){
				$.cookie('isLogin', '', {expires: -1});
				window.location.href = 'login.html';
			};
			
			/*设置页面高度*/
			var initHeight = function(){
				var hh = $('.main-header').outerHeight(),
					th = $('.main-cont>.nav-tab').outerHeight();
				$('.main-cont>.tab-pannel').height(document.body.clientHeight - hh - th);
			};
			
			var bindEvent = function(){
				/*菜单缩小放大*/
				$('.main-header').off('click', '>.logo>.fa-bars').on('click', '>.logo>.fa-bars', function(){
					$(this).closest('.main-header').next('.main-sidebar').toggleClass('slim');
				});
				
		    /*退出系统*/
				$('.main-header').off('click', '#signOut').on('click', '#signOut', function(){
					signOut();
				});
				
		    /*切换主题*/
				$('.main-header').off('click', '#theme').on('click', '#theme', function(){
					var $lst = $('.themeLst'),
							opt = {};
					opt = {
						'title': '切换主题', 
						'content': '<div class="themeLst"><ul class="clearfix"><li class="pull-left blue"><div class="sample"><div class="top"></div><div class="left"></div></div><div class="text-center">蓝</div></li><li class="pull-left green"><div class="sample"><div class="top"></div><div class="left"></div></div><div class="text-center">绿</div></li><li class="pull-left purple"><div class="sample"><div class="top"></div><div class="left"></div></div><div class="text-center">紫</div></li><li class="pull-left blue-gray"><div class="sample"><div class="top"></div><div class="left"></div></div><div class="text-center">蓝灰</div></li><li class="pull-left green-gray"><div class="sample"><div class="top"></div><div class="left"></div></div><div class="text-center">绿灰</div></li><li class="pull-left purple-gray"><div class="sample"><div class="top"></div><div class="left"></div></div><div class="text-center">紫灰</div></li></ul></div>',
						'button': [{
							value: "清除",
							callback: function(){
								$lst.find('li.seld').removeClass('seld');
								return false;
							}
						},{
							value: "确定",
							autofocus: true,
							callback: function(){
								var clas = $lst.find('li.seld').attr('class').replace('pull-left ', '');
								$('body').removeAttr('class').addClass('sk-'+clas);
							}
						}],
						'onshow': function(){
							var ww = $(window).width();
							$lst = $('.themeLst');
							if(ww < 632){
								$lst.width(ww-32);
							}
						}
					};
					dialog(opt).showModal();
				});
				
				/*菜单选中后展示在右侧导航栏*/
				$('.main-sidebar').off('click', 'a').on('click', 'a', function(){
					var $a = $(this),
						$li = $a.closest('li'),
						$bar = $a.closest('.main-sidebar');
					if($li.hasClass('menu-leaf')){
						$bar.find('li.active').removeClass('active');
						$li.addClass('active').parents('li').addClass('menu-open active');
						showNavTab($a);
						
					}else{
						$li.toggleClass('menu-open').siblings('li').removeClass('menu-open');
					}
				});
				
				/*导航栏箭头左右切换*/
				$('.nav-tab').off('click', '>.tab-arrow').on('click', '>.tab-arrow', function(){
					var $t = $(this);
					if(!$t.hasClass('disabled')){
						var oml = parseInt($tul.css('margin-left'));
						oml = $t.hasClass('tab-arrow-left') ? (oml + tabLiW) : (oml - tabLiW);
						setNavTabLeft(oml);
					}
				});
				
				/*导航栏菜单右键打开菜单，点击切换页面，点击按钮关闭页面*/
				$('.nav-tab').off('mousedown', 'li').on('mousedown', 'li', function(e){
					if(e.which == 3){
						var $rmenu = $('.right-menu'),
							maxL = document.body.clientWidth - $rmenu.outerWidth(true);
						$rmenu.show().css({
							'top': e.clientY,
							'left': e.clientX > maxL ? maxL : e.clientX
						}).attr('data-id', $(this).attr('id'));
					}
				}).off('click', 'li').on('click', 'li', function(){
					var $li = $(this),
						tabId = $li.attr('id');
					$li.addClass('active').siblings('li.active').removeClass('active');
					$('.tab-pannel iframe#iframe-'+tabId).show().siblings('iframe').hide();
					moveNavTab(tabId);
					
				}).off('click', 'li i.fa-close').on('click', 'li i.fa-close', function(e){
					e = e || window.event;
					e.stopPropagation();
					removeNavTab($(this).closest('li'));
				});
				
				/*禁用右键默认菜单*/
				$(document).on('contextmenu', function(){
		      return false;
		    }).on('mousedown', function(e){
		    	e = e || window.event;
		    	var $src = $(e.target) || $(e.srcElement);
		    	if($src.closest('.right-menu').length == 0 && e.which != 3){
		    		$('.right-menu').hide();
		    	}
		    });
		    
				/*选中右键菜单选项*/
		    $('.right-menu').off('click', 'li').on('click', 'li', function(){
		    	var $li = $(this),
		    		$rmenu = $li.closest('.right-menu'),
		    		typ = $li.attr('typ'),
		    		tabId = $rmenu.attr('data-id'),
		    		$tabLi = $tul.children('li#' + tabId),
		    		$tabLis,
		    		$frame = $('#iframe-'+tabId),
		    		ml = 0;
		    		
		    	if(typ == 'refresh'){
		    		$frame.attr('src', $frame.attr('src'));
		    		moveNavTab(tabId);
		    	}else{
		    		ml = parseInt($tul.css('margin-left'));
		    		if(typ == 'closeLeft'){
			    		$tabLis = $tabLi.prevAll('li:not(#tab)');
			    		ml += tabLiW * $tabLis.length;
			    		$tabLis.remove();
			    		$frame.prevAll('iframe:not(#iframe-tab)').remove();
			    	}else if(typ == 'closeRight'){
			    		$tabLis = $tabLi.nextAll('li:not(#tab)');
			    		ml += tabLiW * $tabLis.length;
			    		$tabLis.remove();
			    		$frame.nextAll('iframe:not(#iframe-tab)').remove();
			    	}else if(typ == 'closeOthers'){
			    		$tabLis = $tabLi.siblings('li:not(#tab)');
			    		ml += tabLiW * $tabLis.length;
			    		$tabLis.remove();
			    		$frame.siblings('iframe:not(#iframe-tab)').remove();
			    	}
						setNavTabLeft(ml);
						showTabArrow();
		    	}
		    	$tabLi.addClass('active').siblings('li').removeClass('active');
	    		$frame.show().siblings('iframe').hide();
		    	$rmenu.hide();
		    });
		    
		    /*菜单图标选择事件、选择主题选择事件*/
		    $('body').off('click', '.iconLst>div').on('click', '.iconLst>div', function(){
			   	$(this).addClass('seld').siblings('.seld').removeClass('seld');
		    }).off('click', '.themeLst li').on('click', '.themeLst li', function(){
			   	$(this).addClass('seld').siblings('.seld').removeClass('seld');
		    });
		    
				/*监听窗口大小变化*/
		    $(window).resize(function(){
		    	clearTimeout(resizeTimer);
		    	resizeTimer = setTimeout(function(){
		    		initHeight();
		    	}, 40);
		    });
		    
			};
			init();
		}
	});
	$(document).commonFn();
})(jQuery);

/*设置导航栏宽度*/
function initTabWidth(){
	var aw = $('.main-cont .tab-arrow:not(.hidden)').outerWidth(true) * 2,
			bodyW = document.body.clientWidth;
	tabW = bodyW < 768 ? (bodyW - aw) : (bodyW - sidebarW - aw);
	$('.main-cont>.nav-tab>.tab-cont').width(tabW);
}

/*左侧菜单点击后生成右侧页面*/
function showNavTab($a){
	var tabId = $a.attr('data-tab-id'),
		title = $a.attr('title'),
		url = $a.attr('data-url'),
		backId = $a.attr('data-back-id') || '',
		backStr = backId ? 'backid="'+backId+'"' : '',
		$pannel = $('.main-cont .tab-pannel');
	$tul.children('.active').removeClass('active');
	$pannel.children('iframe').hide();
		if($tul.children('li#'+tabId).length == 0){
			$tul.append('<li class="pull-left active" id="'+tabId+'" '+backStr+'>'
								 +'<div class="title pull-left" title="'+title+'">'
								 + title
								 +'</div>'
								 +'<i class="fa fa-close text-center"></i>'
								 +'</li>');
			$pannel.append('<iframe id="iframe-'+tabId+'" '+backStr+' src="'+url+'" width="100%" height="100%" frameborder="0"></iframe>');
			showTabArrow();
		}else{
			$tul.children('li#'+tabId).addClass('active');
			$pannel.children('iframe#iframe-'+tabId).show();
		}
		moveNavTab(tabId);
}

/*关闭右侧页面*/
function removeNavTab($ele){
	var id = $ele.attr('id'),
			bid = $ele.attr('backid'),
			tabId = $ele.prev().attr('id'),
			ml = parseInt($tul.css('margin-left')) + tabLiW;
	if(bid && $tul.children('li#'+bid).length == 1){
		tabId = bid;
	}
	$tul.children('li#'+tabId).addClass('active').siblings('li').removeClass('active');
	$('.tab-pannel iframe#iframe-'+tabId).show().siblings('iframe').hide();
	$('.tab-pannel iframe#iframe-'+id).remove();
	$tul.children('li#'+id).remove();
	setNavTabLeft(ml);
	showTabArrow();
}

/*导航栏左右按钮显示隐藏*/
function showTabArrow(){
	if($tul.children().length > parseInt(tabW / tabLiW)){
		$tab.addClass('move').siblings().removeClass('hidden');
		initTabWidth();
	}else{
		$tab.removeClass('move').siblings().addClass('hidden');
		initTabWidth();
	}
}

/*导航栏左右移动*/
function moveNavTab(tabId){
	var $li = $tul.find('li#'+tabId),
		lol = $li[0].offsetLeft,
		lml = parseInt($tul.css('margin-left')),
		ml = lol + tabLiW + Math.abs(parseInt(lml));
		
	if(lol < 0){
		setNavTabLeft(lml-lol);
	}else if(ml > tabW){
		setNavTabLeft(tabW-ml);
	}
}

/*导航栏左右箭头显示隐藏*/
function setNavTabLeft(left){
	var $div = $('.main-cont .nav-tab'),
		len = $tul.children().length,
		maxl = len * tabLiW - tabW;
	$div.children('.tab-arrow').removeClass('disabled');
	if(left >= 0){
		left = 0;
		$div.children('.tab-arrow-left').addClass('disabled');
	}else if(-left >= maxl){
		left = -maxl;
		$div.children('.tab-arrow-right').addClass('disabled');
	}
	$tul.css('margin-left', left);
}

/*展示隐藏页面加载动画*/
function showLoading(txt){
	$('.loading-layer').removeClass('hidden').find('span').text(txt);
}
function hideLoading(){
	$('.loading-layer').addClass('hidden');
}

/*弹出层信息提示*/
function showConfirms(c, fn){
	dialog({
		title: '提示信息',
		content: '<i class="fa fa-question-circle-o"></i>' + c,
		button: [{
			value: "取消"
		},{
			value: "确定",
			autofocus: true,
			callback: fn
		}]
	}).showModal();
}

/*弹出层展示*/
function showDialog(opt, fn, fns){
	if(fn){
		opt['button'] = [{
			value: "取消"
		},{
			value: "确定",
			autofocus: true,
			callback: fn
		}];
	}
	if(fns){
		opt['onshow'] = fns;
	}
	dialog(opt).showModal();
}

/*弹出层上传文件展示*/
function showUploadFileLayer(opt, fn, opts, fns){
	if(fn){
		opt['button'] = [{
			value: "取消"
		},{
			value: "确定",
			autofocus: true,
			callback: fn
		}];
	}
	opt['onshow'] = function(){
		var ww = $(window).width();
		if(ww < 632){
			$('.upload-list').width(ww-50);
		}
		if(fns){fns();}
		$.fn.uploadFile(opts);
	}
	dialog(opt).showModal();
}

/*弹出层上传图片展示*/
function showUploadImgLayer(opt, fn, opts, fns){
	if(fn){
		opt['button'] = [{
			value: "取消"
		},{
			value: "确定",
			autofocus: true,
			callback: fn
		}];
	}
	opt['onshow'] = function(){
		var ww = $(window).width();
		if(ww < 632){
			$('.upload-list').width(ww-50);
		}
		if(fns){fns();}
		$.fn.uploadImg(opts);
	}
	dialog(opt).showModal();
}

/*弹出层展示树形结构*/
function showZtreeLayer(opts){
	var $btn = opts['btn'],
			$inp = $btn.siblings('.form-control'),
			ztree, node,
			opt = {};
	opt = {
		'title': opts['title'], 
		'content': '<div><span>关键字：</span><input type="text" id="tree-search" /></div><div class="layer-tree"><ul id="tree" class="ztree"></ul></div>',
		'button': [{
			value: "清除",
			callback: function(){
				$inp.val('').removeData('node');
				ztree.cancelSelectedNode();
				return false;
			}
		},{
			value: "确定",
			autofocus: true,
			callback: function(){
				node = ztree.getSelectedNodes();
				if(opts['type'] == 'apart' && node[0]['type'] != 1){
					$.toolFn.showTips('请选择部门！', 'alert-warning');
					return false;
				}else{
					$inp.val(node[0]['name']).data('node', node[0])
							.tooltip('hide').closest('.box-line').removeClass('error');
				}
			}
		}],
		'onshow': function(){
			$.get(opts['url'], function(res){
				var data = [];
				if(opts['type'] == 'comp'){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['type'] == 0){
							data.push(res[i]);
						}
					}
				}else if(opts['type'] == 'dictionary'){
					for(var i = 0, len = res.length; i < len; i++){
						if(res[i]['id'] == opts['param']){
							data = res[i]['child']; break;
						}
					}
				}else{
					data = res;
				}
				ztree = $.toolFn.buildZtree({'ele': $('#tree'), 'data':data});
				if($inp.val() != ''){ ztree.selectNode(ztree.getNodeByParam('id', $inp.data('node')['id'], null)); }
				fuzzySearch('tree', '#tree-search', null, true);
			});
		}
	};
	dialog(opt).showModal();
}

/*弹出层展示菜单图标结构*/
function showMenuIcon($ele){
	var $lst,
			arr = ['fa fa-address-book', 'fa fa-address-book-o', 'fa fa-address-card', 'fa fa-address-card-o', 
						'fa fa-anchor', 'fa fa-asterisk', 'fa fa-balance-scale', 'fa fa-ban', 
						'fa fa-bank', 'fa fa-bar-chart', 'fa fa-bar-chart-o', 'fa fa-barcode', 
						'fa fa-bars', 'fa fa-bell', 'fa fa-bell-o', 'fa fa-bell-slash', 
						'fa fa-bell-slash-o', 'fa fa-book', 'fa fa-bookmark', 'fa fa-bookmark-o', 
						'fa fa-bug', 'fa fa-calendar', 'fa fa-calendar-check-o', 'fa fa-calendar-minus-o', 
						'fa fa-calendar-o', 'fa fa-calendar-plus-o', 'fa fa-calendar-times-o', 'fa fa-camera', 
						'fa fa-camera-retro', 'fa fa-cart-plus', 'fa fa-certificate', 'fa fa-check', 
						'fa fa-check-circle', 'fa fa-check-circle-o', 'fa fa-check-square', 'fa fa-check-square-o', 
						'fa fa-clock-o', 'fa fa-close', 'fa fa-cloud', 'fa fa-cloud-download', 
						'fa fa-cloud-upload', 'fa fa-code', 'fa fa-code-fork', 'fa fa-cog', 
						'fa fa-cogs', 'fa fa-cube', 'fa fa-cubes', 'fa fa-dashboard', 
						'fa fa-database', 'fa fa-desktop', 'fa fa-edit', 'fa fa-eye', 
						'fa fa-envelope', 'fa fa-envelope-o', 'fa fa-envelope-open', 'fa fa-envelope-open-o', 
						'fa fa-fire', 'fa fa-flag', 'fa fa-flag-checkered', 'fa fa-flag-o', 
						'fa fa-folder', 'fa fa-folder-o', 'fa fa-folder-open', 'fa fa-folder-open-o', 
						'fa fa-gavel', 'fa fa-gear', 'fa fa-gears', 'fa fa-gift', 
						'fa fa-globe', 'fa fa-hdd-o', 'fa fa-home', 'fa fa-inbox', 
						'fa fa-heart', 'fa fa-heart-o', 'fa fa-heartbeat', 'fa fa-info-circle', 
						'fa fa-id-card', 'fa fa-id-card-o', 'fa fa-leaf', 'fa fa-legal', 
						'fa fa-lock', 'fa fa-map', 'fa fa-map-o', 'fa fa-mobile', 
						'fa fa-navicon', 'fa fa-newspaper-o', 'fa fa-paper-plane', 'fa fa-paper-plane-o', 
						'fa fa-pencil', 'fa fa-pencil-square', 'fa fa-pencil-square-o', 'fa fa-phone', 
						'fa fa-phone-square', 'fa fa-power-off', 'fa fa-qrcode', 'fa fa-reorder', 
						'fa fa-search', 'fa fa-send', 'fa fa-send-o', 'fa fa-shopping-cart', 
						'fa fa-sign-in', 'fa fa-sign-out', 'fa fa-sitemap', 'fa fa-snowflake-o', 
						'fa fa-star', 'fa fa-sun-o', 'fa fa-tree', 'fa fa-trophy', 
						'fa fa-unlock', 'fa fa-unlock-alt', 'fa fa-user', 'fa fa-user-circle', 
						'fa fa-user-circle-o', 'fa fa-user-o', 'fa fa-user-plus', 'fa fa-users', 
						'fa fa-vcard', 'fa fa-vcard-o', 'fa fa-wrench'
						],
			str = '',
			opt = {};
	for(var i = 0, len = arr.length; i < len; i++){
		str += '<div class="col-md-4 col-sm-12"><i class="'+arr[i]+'"></i>'+arr[i]+'</div>';
	}
	opt = {
		'title': '图标选择', 
		'content': '<div class="row iconLst">'+str+'</div>',
		'button': [{
			value: "清除",
			callback: function(){
				$lst.find('>.seld').removeClass('seld');
				return false;
			}
		},{
			value: "确定",
			autofocus: true,
			callback: function(){
				var $div = $lst.find('>.seld');
				$ele.find('>.input-group-addon:eq(0)').empty().append($div.children('i')[0].outerHTML).end()
					.find('>.form-control').val($div.text());
			}
		}],
		'onshow': function(){
			var wh = $(window).height();
			$lst = $('.iconLst');
			if(wh < 600){
				$lst.height(wh - 120);
			}
		}
	};
	dialog(opt).showModal();
}
