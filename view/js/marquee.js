/**
 * [XQQ description]
 * @type {[type]}
 * 可配置参数是 speed , step , cObj
 */
if( typeof XQQ == 'undefined' )XQQ = {};
XQQ.marquee = (function($){
	var Marquee = function(op){
		if(this instanceof Marquee){
			this.setOp(op);
		}else{
			return new Marquee(op);
		}
	}
	Marquee.prototype = {
		c_height		:'65px' ,				//	外层容器样式
		c_width			:'100px',				//	外层容器样式
		c_top			:'300px',				//	外层容器样式
		c_left			:'300px',				//	外层容器样式
		content			:'<div>维尼的小气球1</div><div>维尼的小气球2</div><div>维尼的小气球1</div><div>维尼的小气球2</div>',
		f_container		:$(document.body),		//	容器的容器=。=

		direction 		:'down',
		delay			:1,						//	动画时间单位秒
		speed			:0.5,					//	单位秒
		step			:0,						//	一次动画移动的step，默认是平均值
		c_id			:'marquee',				//	外层容器ID
		cObj			:{},					//	外层容器obj
		o_top			:0,						//	要play的内部元素初始top
		o_left			:0,						//	初始left
		play_T 			:null,
		is_hide			:false,					//	是否在初始时隐藏
		pause			:false,					//	暂停标识

		setOp : function(op){
			var op = arguments[0];
			if(op){
				for(var i in op){
					if(typeof op[i] != 'undefined'){
						this[i] = op[i];
					}
				}
			}
			return this;
		},
		insert_html : function(){
			var m_html = [];
			m_html.push('<div id="'+ this.c_id +'" class="marquee" style="position:absolute;overflow:hidden;display:none;">');
			m_html.push('      <div class="marquee-move" style="overflow: hidden;zoom: 1;width: 30000px;position:absolute">');
			m_html.push('        <div class="marquee-cover" style="overflow: hidden;zoom: 1;float: left;">');
			
			m_html.push( this.content );

			m_html.push('        </div>');
			m_html.push('      </div>');
			m_html.push('    </div>');
			m_html = m_html.join('');

			this.f_container.append(m_html).find('#'+ this.c_id).css({
				height:this.c_height,
				width:this.c_width,
				left:this.c_left,
				top:this.c_top
			});
		},
		init : function(){
			$_Helper.loadCss(WEB_ROOT +'view/css/marquee.css');

			var _that = this;
			this.insert_html();

			setTimeout(function(){
				_that.cObj = $('#'+ _that.c_id);
				if(!_that.is_hide)_that.cObj.show();
				var	ul_obj = _that.cObj.find('.marquee-move').css('position' , 'absolute'),
					li_nums = ul_obj.find('.marquee-cover').children('div').length,
					clone_li = ul_obj.find('.marquee-cover').children('div').clone();
				
				//	根据direction设置li排列方向
				_that.reset_float();

				_that.obj_h = ul_obj.find('.marquee-cover').height();
				_that.obj_w = ul_obj.find('.marquee-cover').width();
				// clone
				//clone_ul.addClass('_clone');
				ul_obj.find('.marquee-cover').append(clone_li);
				//	根据direction设置li排列方向
				_that.reset_float();
				switch(_that.direction){
					case 'up':
						ul_obj.css('top' , 0);
						break;
					case 'down':
						ul_obj.css('top' , -_that.obj_h);
						break;
					case 'left':
						ul_obj.css('left' , 0);
						break;
					case 'right':
						ul_obj.css('left' , -_that.obj_w);
						break;
				}
				//	计算步长
				if( _that.step == 0 ){
					if( _that.direction == 'up' || _that.direction == 'down' ){
						_that.step = _that.obj_h / li_nums;
						_that.o_top = ul_obj.css('top') == 'auto' ? 0 : parseInt(ul_obj.css('top'));
					}else{
						_that.step = _that.obj_w / li_nums;
						_that.o_left = ul_obj.css('left') == 'auto' ? 0 : parseInt(ul_obj.css('left'));
					}
				}

				_that.play();
				_that.hover();
			} , 800);
			
		},
		//	绑定事件
		hover : function(){
			var _that = this;
			$('#'+ this.c_id).hover(
				function(){
					_that.pause = true;
				},
				function(){
					_that.pause = false;
				}
			);
		},
		//	重置排列方向
		reset_float : function(){
			var ul_obj = this.cObj.find('.marquee-move');
			if( this.direction == 'up' || this.direction == 'down' ){
				ul_obj.find('.marquee-cover').children('div').css({'float':'none'});
			}else{
				ul_obj.find('.marquee-cover').children('div').css({'float':'left' , 'margin-left':'8px'});
			}
		},
		play : function(){
			var _that = this,
				direc = null,
				step = 0,
				animate = {},
				ul_obj = this.cObj.find('.marquee-move');

			switch(this.direction){
				case 'up':
					if( Math.abs(parseInt(ul_obj.css('top')) - this.o_top) >= this.obj_h ){
						ul_obj.css('top' , 0);
					}
					direc = 'top';
					step = parseInt(ul_obj.css('top')) - this.step;
					animate = {'top' : step +'px'};
					break;
				case 'down':
					if( Math.abs(parseInt(ul_obj.css('top')) - this.o_top) >= this.obj_h ){
						ul_obj.css('top' , -this.obj_h);
					}
					direc = 'top';
					step = parseInt(ul_obj.css('top')) + this.step;
					animate = {'top' : step +'px'};
					break;
				case 'left':
					if( Math.abs(parseInt(ul_obj.css('left')) - this.o_left) >= this.obj_w ){
						ul_obj.css('left' , 0);
					}
					direc = 'left';
					step = parseInt(ul_obj.css('left')) - this.step;
					animate = {'left' : step +'px'};
					break;
				case 'right':
					if( Math.abs(parseInt(ul_obj.css('left')) - this.o_left) >= this.obj_w ){
						ul_obj.css('left' , -this.obj_w);
					}
					direc = 'left';
					step = parseInt(ul_obj.css('left')) + this.step;
					animate = {'left' : step +'px'};
					break;
			}

			this.play_T = setTimeout(function(){
				if( _that.pause ){
					_that.play();
				}else{
					ul_obj.animate(animate , _that.delay*1000 , function(){
						_that.play();
					});
				}
			} , this.speed*1000);
		}
	};

	//Marquee().init();
	return Marquee;
})(jQuery);