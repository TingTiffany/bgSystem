(function($){
	$.formCheckFn = {
		init: function(opt){
			//opt = {'isNull':[], ...}
			var self = this;
			if(opt['isNull']){
				$.each(opt['isNull'], function(){
					var $this = $(this),
						typ = $this.attr('type');
					if(typ == 'radio' || typ == 'checkbox'){
						$this.on('click', function(){
							$this.tooltip('hide').closest('.box-line').removeClass('error');
						});
					}else{
						$this.on('focus', function(){
							$this.tooltip('hide').closest('.box-line').removeClass('error');
						}).on('blur', function(){
							var val = $this.val();
							if(val == undefined || val == null || val == '' || val.length == 0){
								$this.tooltip('show').closest('.box-line').addClass('error');
							}
						});
					}
				});
			}
			if(opt['isNumber']){
				$.each(opt['isNumber'], function(){
					var $this = $(this);
					$this.on('focus', function(){
						$this.tooltip('hide').closest('.box-line').removeClass('error');
					}).on('blur', function(e){
						self.isNumber($this);
					});
				});
			}
			if(opt['isMobile']){
				$.each(opt['isMobile'], function(){
					var $this = $(this);
					$this.on('focus', function(){
						$this.tooltip('hide').closest('.box-line').removeClass('error');
					}).on('blur', function(e){
						self.isMobile($this);
					});
				});
			}
			if(opt['isPhone']){
				$.each(opt['isPhone'], function(){
					var $this = $(this);
					$this.on('focus', function(){
						$this.tooltip('hide').closest('.box-line').removeClass('error');
					}).on('blur', function(e){
						self.isPhone($this);
					});
				});
			}
			if(opt['isTel']){
				$.each(opt['isTel'], function(){
					var $this = $(this);
					$this.on('focus', function(){
						$this.tooltip('hide').closest('.box-line').removeClass('error');
					}).on('blur', function(e){
						if(self.isMobile($this) && self.isPhone($this)){
							return true;
						}else{
							return false;
						}
					});
				});
			}
			if(opt['isEmail']){
				$.each(opt['isEmail'], function(){
					var $this = $(this);
					$this.on('focus', function(){
						$this.tooltip('hide').closest('.box-line').removeClass('error');
					}).on('blur', function(e){
						self.isEmail($this);
					});
				});
			}
		},
		isNull: function($ele){
			var typ = $ele.attr('type'),
					val = (typ == 'radio' || typ == 'checkbox') ? $ele.filter(':checked').val() : $.trim($ele.val());
			if(val == undefined || val == null || val == '' || val.length == 0){
				$ele.tooltip('show').closest('.box-line').addClass('error');
				return true;
			}
			return false;
		},
		isNumber: function($ele){
			var val = $.trim($ele.val());
			if(val && val.match(/^\d+$/) == null){
				$ele.tooltip('show').closest('.box-line').addClass('error');
				return false;
			}
			return true;
		},
		isMobile: function($ele){
			var val = $.trim($ele.val());
			if(val && val.match(/^1\d{10}$/) == null){
				$ele.tooltip('show').closest('.box-line').addClass('error');
				return false;
			}
			return true;
		},
		isPhone: function($ele){
			var val = $.trim($ele.val());
			if(val && val.match(/^(\d{3,4}-)?\d{7,8}(-\d{1,6})?$/) == null){
				$ele.tooltip('show').closest('.box-line').addClass('error');
				return false;
			}
			return true;
		},
		isEmail: function($ele){
			var val = $.trim($ele.val());
			if(val && val.match(/^([\w|\w.]+)@([a-zA-Z0-9]+).([a-zA-Z0-9]{2,})$/) == null){
				$ele.tooltip('show').closest('.box-line').addClass('error');
				return false;
			}
			return true;
		},
		isSame: function($ele, $eles){
			var val = $.trim($ele.val()),
					vals = $.trim($eles.val());
			if(val != vals){
				$ele.tooltip('show').closest('.box-line').addClass('error');
				return false;
			}
			return true;
		}
	};
})(jQuery);
