(function($) {
	$.fn.uploadFile = function(opts) {
		var opt = $.extend({}, opts),
				$list = $('.upload-list'),
				extensions = opt['extensions'] || 'xlsx,xls,doc,docx,ppt,pptx,gif,jpg,jpeg,bmp,png',
				uploader = WebUploader.create({ 
					swf: 'Uploader.swf', // swf文件路径
					server: opt['server'], // 文件接收服务端
					pick: {
						id: $('.upload-attach'),
						multiple: opt['multiple']
					},
					auto: true, //选择文件后是否自动上传
					runtimeOrder: 'html5,flash',
					fileNumLimit: opt['fileNumLimit'],
					fileSingleSizeLimit: 20971520, //单个文件最大不能超过20M
					accept: {
						title: 'File', //描述
						extensions: extensions, //类型
						mimeTypes: opt['mimeTypes'] || '.xlsx,.xls,.doc,.docx,.ppt,.pptx,.gif,.jpg,.jpeg,.bmp,.png' //mime类型
					},
					formData: opt['formData'] || {}
				});
		//当有文件被添加进队列的时候
		uploader.on('fileQueued', function(file) {
			$list.append('<li id="' + file.id + '" class="item">' +
				'<span class="title" title="'+file.name+'">' + file.name + '</span>' +
				'<div class="state"><img src="./img/loading.gif" title="等待上传..."/></div>' +
				'<i class="fa fa-trash-o btn-delFil"></i>' +
				'</li>');
		}).on('uploadProgress', function(file, percentage) { // 文件上传过程中创建进度条实时显示。
			var $li = $('#'+file.id),
					$percent = $li.find('.progress .progress-bar');
			if(!$percent.length) {
				$percent = $('<div class="progress progress-striped active">' +
					'<div class="progress-bar" role="progressbar" style="width: 0%">' +
					'</div>' +
					'</div>').appendTo($li).find('.progress-bar');
			}
			$li.find('.state').attr('title', '上传中');
			$percent.css('width', percentage * 100 + '%');
		}).on('uploadSuccess', function(file, res) { // 文件上传成功
			$('#'+file.id).find('.state').addClass('success').empty().append('<i class="fa fa-check"></i>').attr('title', '上传成功');
		}).on('uploadError', function(file, reason) { // 文件上传失败，显示上传出错
			$('#'+file.id).find('.state').addClass('error').empty().append('<i class="fa fa-exclamation-circle"></i>').attr('title', '上传出错');
		}).on('uploadComplete', function(file) { // 完成上传
			$('#'+file.id).find('.progress').fadeOut();
		}).on("error", function(type) {
			if(type == "Q_TYPE_DENIED") {
				$.toolFn.showDangerAlert("请上传" + extensions + "格式文件");
			} else if(type == "Q_EXCEED_NUM_LIMIT") {
				$.toolFn.showDangerAlert("只能上传" + opt['fileNumLimit'] + "个文件");
			} else if(type == "F_DUPLICATE") {
				$.toolFn.showDangerAlert("请勿重复上传文件！");
			} else {
				$.toolFn.showDangerAlert("上传出错！请检查后重新上传！错误代码" + type);
			}
		});
		//删除文件
		$('body').off('click', '.upload-list .item>.btn-delFil').on('click', '.upload-list .item>.btn-delFil', function() {
			var $file = $(this).closest('.item'),
				filId = $file.attr('id');
			uploader.removeFile(filId, true);
			$file.remove();
		});
	};


	$.fn.uploadImg = function(opts) {
		var opt = $.extend({}, opts),
				$list = $('.upload-list'),
				extensions = opt['extensions'] || 'gif,jpg,jpeg,bmp,png',
				uploader = WebUploader.create({
					swf: 'Uploader.swf',
					server: opt['server'],
					runtimeOrder: 'html5,flash',
					pick: {
						id: $('.upload-attach'),
						multiple: opt['multiple']
					},
					auto: true,
					fileNumLimit: opt['fileNumLimit'],
					fileSingleSizeLimit: opt['fileSingleSizeLimit'],
					accept: {
						title: 'Images',
						extensions: extensions,
						mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
					}
				});
	
		// 当有文件添加进来的时候
		uploader.on('fileQueued', function(file) {
			var $li = $(
					'<li id="' + file.id + '" class="item item-img">' +
					'<img>' +
					'<span class="title" title="'+file.name+'">' + file.name + '</span>' +
					'<div class="state"><img src="./img/loading.gif" title="等待上传..."/></div>' +
					'<i class="fa fa-trash-o btn-delFil"></i>' +
					'</li>'
				),
				$img = $li.find('img');
			$list.append($li);
			
			uploader.makeThumb(file, function(error, src) {
				if(error) {
					$img.replaceWith('<span>不能预览</span>');
					return;
				}
				$img.attr('src', src);
			}, opt['thumbWidth'], opt['thumbHeight']);
		}).on('uploadProgress', function(file, percentage) { // 文件上传过程中创建进度条实时显示。
			var $li = $('#'+file.id),
					$percent = $li.find('.progress .progress-bar');
			if(!$percent.length) {
				$percent = $('<div class="progress progress-striped active">' +
					'<div class="progress-bar" role="progressbar" style="width: 0%">' +
					'</div>' +
					'</div>').appendTo($li).find('.progress-bar');
			}
			$li.find('.state').attr('title', '上传中');
			$percent.css('width', percentage * 100 + '%');
		}).on('uploadSuccess', function(file, res) { // 文件上传成功，给item添加成功class, 用样式标记上传成功。
			$('#'+file.id).find('.state').addClass('success').empty().append('<i class="fa fa-check"></i>').attr('title', '上传成功');
		}).on('uploadError', function(file) { // 文件上传失败，显示上传出错。
			$('#'+file.id).find('.state').addClass('error').empty().append('<i class="fa fa-exclamation-circle"></i>').attr('title', '上传出错');
		}).on('uploadComplete', function(file) { // 完成上传完了，成功或者失败，先删除进度条。
			$('#'+file.id).find('.progress').remove();
		}).on("error", function(type) {
			if(type == "Q_TYPE_DENIED") {
				$.toolFn.showDangerAlert("请上传" + extensions + "格式文件");
			} else if(type == "Q_EXCEED_NUM_LIMIT") {
				$.toolFn.showDangerAlert("只能上传" + opt['fileNumLimit'] + "个文件");
			} else if(type == "F_DUPLICATE") {
				$.toolFn.showDangerAlert("请勿重复上传文件！");
			} else {
				$.toolFn.showDangerAlert("上传出错！请检查后重新上传！错误代码" + type);
			}
		});
		
		//删除文件
		$('body').off('click', '.upload-list .item>.btn-delFil').on('click', '.upload-list .item>.btn-delFil', function() {
			var $file = $(this).closest('.item'),
				filId = $file.attr('id');
			uploader.removeFile(filId, true);
			$file.remove();
		});
	};
})(jQuery);