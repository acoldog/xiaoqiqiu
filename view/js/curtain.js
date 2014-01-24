(function($){
	var Curtain = function(op){
		if(this instanceof Curtain){
			this.setOp(op);
		}else{
			return new Curtain(op);
		}
	}
	Curtain.prototype = {
		containter_id : 'XQQCurtain',
		img_w : 300,
		img_h : 140,
		times : 2,		//	放大倍数
		img_num : 5,
		img_margin : 8,
		_cObj : false,
		is_hide_preview : false,
		//	 取容器对象
		cObj : function(){
			if(!this._cObj || this._cObj.length <= 0){
				return this._cObj = $('#'+ this.containter_id);
			}else{
				return this._cObj;
			}
		},
		insert_html : function(img_data){
			var _that = this,
				c_html = [],
				img_html = [];
			for(var i in img_data){
				img_html.push('<li><img width="'+ this.img_w +'" height="'+ this.img_h +'" src="'+ img_data[i] +'"/></li>');
			}
			if(this.cObj().length > 0){
				this.cObj().append( img_html.join("") );
				return ;
			}

			c_html.push('<div class="curtain" id="'+ this.containter_id +'" style="display:none;">');
			c_html.push('		<ul>');
			c_html = c_html.concat(img_html);
			c_html.push('		</ul>');
			c_html.push('</div>');
			c_html = c_html.join('');

			$(document.body).append( c_html );
			setTimeout(function(){
				$('#'+ _that.containter_id).show();
			} , 2000);
		},
		setOp : function(op){
			this.insert_html(op.img_data);
			this.initCss();
		},

		initCss : function(){
			//	加载CSS
			$_Helper.loadCss(STATIC_ROOT +'css/curtain.css');
			var _that = this;
			//	居中
			setTimeout(function(){
				_that.setPos();
				//	加载事件
				_that.bindEvent();
			} , 500);
		},
		setPos : function(){
			var obj = $('#'+ this.containter_id),
				win_w = $(window).width(),
				ulObj = obj.find('ul');
			this.img_num = ulObj.find('li').length;

			obj.css({height: this.img_h , width:(this.img_w + this.img_margin) * (this.img_num+1)});
			var oLeft = (win_w - (this.img_w + this.img_margin) * this.img_num ) / 2;
			//if(oLeft < 0)oLeft = 0;
			ulObj.css('left' , oLeft).show();
		},
		//	图片预览
		preview : function(eq){
			var _that = this;
			var p_html = [],
				pre_obj = $('#curtain-preview');
			
			if($('#'+ this.containter_id).find('ul > li').eq(eq).length < 1)return false;
			$_Helper.top_loading('努力加载图片中...');

			if(eq < 0)eq = 0;
			p_html.push('      <a class="l-btn" href="javascript:;" onclick="XXQ.curtain.preview('+ (eq-1) +');return false;">《 </a>');
			p_html.push('      <img id="curtain_prv_img" src="" />    ');
			p_html.push('      <a class="r-btn" href="javascript:;" onclick="XXQ.curtain.preview('+ (eq+1) +');return false;"> 》 </a>');
			p_html = p_html.join('');
			if( pre_obj.length < 1 ){
				$(document.body).append('<div class="curtain-preview" id="curtain-preview"></div>').find('#curtain-preview').css({height:$(document).height()}).html(p_html).show();
			}else{
				pre_obj.html(p_html).show();
			}

			var img_src = $('#'+ this.containter_id).find('ul > li').eq(eq).find('img').attr('src').replace('imgCompress' , 'img'),
				img_obj = $('#curtain_prv_img');
			img_obj.onload = true;
			img_obj.attr('src' , img_src);
			img_obj.load(function(){
				$_Helper.top_loading_done();
			});

			pre_obj.find('.l-btn ,.r-btn ,#curtain_prv_img').hover(
				function(){
					_that.is_hide_preview = false;
				},
				function(){
					_that.is_hide_preview = true;
				}
			);
			
			delete p_html;
			delete pre_obj;
			delete img_obj;
		},
		//	check loading
		checkLoading : function(){
			if( $('#top_loading').css('display') == 'none' ){
				return false;
			}else{
				return true;
			}
		}(),

		bindEvent : function(){
			var _that = this,
				obj = $('#'+ this.containter_id),
				obj_w = (this.img_w + this.img_margin) * this.img_num;

			obj.mouseenter(function(){
				obj.stop(true).animate({'opacity' :'1' , bottom:'8px'} , 'slow');
			}).mouseleave(function(){
				obj.stop(true).animate({'opacity' :'0.3' , bottom:'-120px'} , 'slow');
			});
			obj.find('li').mouseenter(function(){
				var imgObj = $(this).find('img');
				imgObj.css('opacity' , '1');
				imgObj.css('position' , 'relative').stop(true).animate({
					width:_that.img_w*_that.times, 
					height:_that.img_h*_that.times,
					top:'-'+ _that.img_h +'px'
				} , 'slow');
			}).mouseleave(function(){
				var imgObj = $(this).find('img');
				imgObj.css('opacity' , '0.4');
				imgObj.stop(true).animate({
					width:_that.img_w , 
					height:_that.img_h,
					top:0
				} , 'slow');
			}).click(function(){
				_that.preview( $(this).index() );
				var pre_obj = $('#curtain-preview');
				pre_obj.bind('click' , function(){
					if(_that.is_hide_preview)$(this).hide();
				});
				
				$(document).delegate('#curtain_prv_img' ,'click' , function(){
					var big_img_src = $(this).attr('src').replace('imgCompress' , 'img');
					$(document.body).css({
						'background-image' : 'url('+ big_img_src +')',
						'background-repeat' : 'no-repeat',
						'background-attachment' : 'fixed',		// fixed-跟滚动条一起动
						'background-position' : 'center top'
					});
				});
				/*var big_img_src = $(this).find('img').attr('src').replace('imgCompress' , 'img');
				$(document.body).css({
					'background-image' : 'url('+ big_img_src +')',
					'background-repeat' : 'no-repeat',
					'background-attachment' : 'fixed',		// fixed-跟滚动条一起动
					'background-position' : 'center top'
				});*/
			});
			//	获取鼠标位置，移动图层
			obj.bind('mousemove' , function(e){
				var pos = SpaceUI.Helper.mouseP(e);
				var pos_x = pos.x;
				var win_w = $(window).width();
				if(obj_w <= win_w)return;
				obj.find('ul').css('left' , -(obj_w - win_w) * (pos_x / win_w));
			});
			
			//	居中
			$(window).resize(function(){
				_that.setPos();
			});
		}
	}

	$.getJSON('http://xiaoqiqiu.com/api/imgWall/wall.php?action=imgList&user='+ USER +'&page=1&rows=30' , function(back){
		if(back){
			var img_data = [];
			for(var i in back.data){
				img_data.push(back.data[i].src);
			}
			if(typeof XXQ != 'object')XXQ = {};
			XXQ.curtain = new Curtain({
				img_data : img_data
			});
		}
	});
	
})(jQuery);