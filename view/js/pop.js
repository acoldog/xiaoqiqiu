<!--//--><![CDATA[//><!--
/*
*
*		pop_html			弹出层默认的容器HTML，主要表现是一个圆角外框
*		create_pop			创建弹层函数
*		flash_down			弹层下落动画函数
*		close_flash			弹层和遮罩层关闭函数
*		bottom_item_num		当前存在的弹层数量
*		flash_to_bottom		弹层缩小到底部右下角动画函数
*		flash_revert_from_bottom	缩小的弹层恢复到原状态函数
*		
*		Version 2:2012-7-23	acol	重写缩放动画
*
* 		调用示例：
* 		var now_Pop_obj = $_Pop.create_pop({
				title : '闲话多说~',
				container : $(document.body) , 
				css_ini : {'z-index':'101','position':'absolute','width':'700px','top':'10px','left':'-700px'} ,
				content : cmt_html,
				callback : function(pop_obj){
					pop_obj.animate({
		                left	:'0px',
		                opacity	:'show'
		            }, 'slow');
				}
			});
*/

$_Pop = {
	//	是否有动画在播放
	playing : false,
	//弹出层HTML
	pop_html : function(op){
		var html = [];

		html.push('<table border="0" id="global_pop" class="global_pop">');
		html.push('		<tbody>');
		html.push('			<tr>');
		html.push('				<td class="pop_topleft"></td>');
		html.push('				<td class="pop_border"></td>');
		html.push('				<td class="pop_topright"></td>');
		html.push('			</tr>');
		html.push('			<tr>');
		html.push('				<td class="pop_border"></td>');
		html.push('				<td class="pop_content" valign="top" >');
		html.push('					<div id="pop_content" style="overflow:hidden;">');
		html.push('						<div class="mover" onselectstart="return false">');
		html.push('							<span class="pop_title">'+ op.title +'</span>');
		html.push('							<span class="pop_ctl">');
		if(op.show_min){
			html.push('							<a class="min_pop" href="javascript:;" onfocus="this.blur();" onclick="$_Pop.flash_to_bottom('+ op.pop_number +');return false;"> - </a>');
		}
		if(op.show_close){
			html.push('							<a class="close_pop" href="javascript:;" onfocus="this.blur();" onclick="$_Pop.close_flash($(\'#global_pop_'+ op.pop_number +'\'));return false;">×</a>');
		}
		html.push('							</span>');

		html.push('						</div>');
		html.push('						<div class="content">'+ op.content +'</div>');
		html.push('						<div class="mod56_page page_theme_1" style="margin-top:10px;">');
		html.push('							<div class="mod56_page_pn" id="acolPage">');
		html.push('							</div>');
		html.push('						</div>');
		html.push('					</div>');
		html.push('				</td>');
		html.push('				<td class="pop_border"></td>');
		html.push('			</tr>');
		html.push('			<tr>');
		html.push('				<td class="pop_bottomleft"></td>');
		html.push('				<td class="pop_border"></td>');
		html.push('				<td class="pop_bottomright"></td>');
		html.push('			</tr>');
		html.push('		</tbody>');
		html.push('	</table>');
		return html.join('');
	},
	//	为动画设置的影子层
	flash_shadow_div : '<div id="flash_shadow_div" style="display:none;">\
							<div class="mover" style="cursor: move;">\
								<span class="pop_title"></span><span class="close">×</span><span class="min_pop"> - </span>\
							</div>\
								<p></p>\
						</div>',
	//	弹层缩小的数据存储
	min_pop_data : {},
	//	弹层序号
	pop_number : 0,
	//	缩小层参数
	min_pop : {
		width : '40px',
		height : '20px'
	},
	//	关闭执行函数
	close_callback : '',
	/**
	 * 	title  标题
	*	container - 弹出层的父节点，也就是要把弹出层插入的节点对象
	*	content - 弹出层内容
	*	css_ini	- 弹出层自定义CSS参数（对象）：例：{'top':'0','left':'0'}
	*	flash_ini - 动画效果的参数(对象)：例：{'obj':$('#global_pop') , 'position':'200' , 'sec':'1000'}
	*	close_time - 动画播放结束后的多少时间关闭动画及相关弹层
	*	close_callback - 关闭后执行
	*	show_min - 是否隐藏缩小按钮
	*	show_close - 是否隐藏x按钮
	*	callback - 弹出后执行
	*	move_type - shadow / self
	*	is_move   - true / false 是否可以移动
	*/
	create_pop : function(pop_op){

		if(typeof pop_op.content == 'undefined')pop_op.content = '';
		this.cover();

		//	写入内容
		var pop_nums = this.pop_number;
		this.pop_number++;

		if(typeof pop_op.show_min == 'undefined')pop_op.show_min = true;
		if(typeof pop_op.show_close == 'undefined')pop_op.show_close = true;
		if(typeof pop_op.move_type == 'undefined')pop_op.move_type = 'shadow';
		if(typeof pop_op.is_move == 'undefined')pop_op.is_move = true;
		if(typeof pop_op.close_callback == 'function')this.close_callback = pop_op.close_callback;

		var pop_html_op = {
			'title':pop_op.title,
			'pop_number':pop_nums,
			'content':pop_op.content,
			'show_min':pop_op.show_min,
			'show_close':pop_op.show_close
		};
		var pop_html = this.pop_html(pop_html_op);
		pop_op.container.append(pop_html);

		//	给弹层重新分配ID值		
		var pop_id = 'global_pop_' + pop_nums;
		var pop_content_id = 'pop_content_' + pop_nums;
		//	避免重复插入
		if($('#'+ pop_id).length > 0)$('#'+ pop_id).remove();
		$('#global_pop').attr('id',pop_id);
		$('#pop_content').attr('id',pop_content_id);
		var pop_obj = $('#' + pop_id).hide();

		$('#cover').show();
		//	设置高度加上滚动高度
		if(typeof pop_op.css_ini != 'undefined'){
			if(typeof pop_op.css_ini.top == 'undefined' && typeof pop_op.css_ini.bottom == 'undefined')pop_op.css_ini.top = '240px';
			pop_op.css_ini.top = (parseInt(pop_op.css_ini.top) + $(document).scrollTop()) +'px';
		}
		pop_obj.css(pop_op.css_ini);

		//	下落动画
		var flash_ini = pop_op.flash_ini;
		if(typeof flash_ini == 'object')
		{
			this.flash_down(pop_obj , flash_ini.position , flash_ini.sec , flash_ini.times);
		}
		
		// 弹出层定时自动关闭
		if(typeof pop_op.close_time != 'undefined')
		{	
			setTimeout(function(){
				$_Pop.close_flash(pop_obj , true);
				//if(typeof pop_op.close_callback == 'function')pop_op.close_callback(pop_obj);
			} , (+pop_op.close_time));
		}

		//	操作结束返回当前弹层对象，以便后续操作
		//$_Helper.move(pop_obj);
		if( pop_op.is_move ){
			pop_obj.find('.mover').css('cursor' , 'move').bind('mousedown' , function(e){
				SpaceUI.bind_move(pop_obj , e , {type:pop_op.move_type});
				$(document.body).attr('style' , '-webkit-user-select:none;-moz-user-select: -moz-none;');
				$(document).bind('mouseup' , function(){
					$(document.body).removeAttr('style');
					return false;
				})
			});
		}

		//设置关闭弹出层事件
		/*$(".close").bind('click' , function(e){
			$_Pop.close_flash(pop_obj);
		});*/
		//	运行callback
		if(typeof pop_op.callback == 'function')pop_op.callback(pop_obj);
		//	设置居中
		if(typeof pop_op.css_ini != 'undefined' && (typeof pop_op.css_ini.left == 'undefined' && typeof pop_op.css_ini.right == 'undefined')){
			setTimeout(function(){
				pop_obj.hide();
				var oLeft = ($(window).width() - pop_obj.width()) / 2;
				pop_obj.css('left' , oLeft).fadeIn('fast');
			} , 500);
		}
		
		return pop_obj;
	},
	//	遮罩层
	cover : function(){
		if(typeof $('#cover') == 'undefined'){
			$(document.body).prepend('<div id="cover"></div>').find('#cover').css('height', $(document).height()).show();
		}else{
			$('#cover').css('height', $(document).height()).show();
		}
	},
	/*
	*	下落动画	
	*	pop_obj		弹层对象
	*	position	弹层最终下落停止处的top值
	*	sec			第一次下落到指定position处所花的时间（后几次下落时间在这个基础上减少）
	*	times       动画次数
	*/
	flash_down : function(pop_obj , position , sec , times){
		pop_obj.show();
		var sec = (typeof sec == 'number' ? sec : (+sec));
		pop_obj.css({'position':'absolute','top':'-100px'});
		pop_obj.animate({top: position+'px'}, sec);
		var po = position/3;
		var per = position/6;
		var per_sec = sec/5;
		var play_times = 0;
		
		//鼠标移到弹出层上，层移到最低端，动画结束
		pop_obj.mouseover(function(){
			clearInterval(T);
			pop_obj.animate({top: position+'px'}, 100).unbind('mouseover');		//	这里注意移除这个事件啊，不然以后层没法自由移动 -。-
		});
		var T = setInterval(function(){
			po += per;
			play_times++;
			sec -= per_sec;
			if((times && play_times >= times) || po >= position)
			{
				clearInterval(T);
			}
			pop_obj.animate({top: po+'px'}, sec);
			pop_obj.animate({top: position+'px'}, sec);
		} , sec);
	},
	//	关闭动画和弹出层	 , slow = true时，渐变关闭
	close_flash : function(pop_obj , slow){
		var slow = slow || false;
		if(typeof pop_obj != 'object')
			var pop_obj = $('#' + pop_obj);
		if(pop_obj.length < 1)return;
		//	检查是否存在对应的min_pop配置，有的话清除
		var pop_tb_id = pop_obj.attr('id');
		delete this.min_pop_data[pop_tb_id];
		//	移除缩小层
		$('#'+ pop_tb_id.replace('global_pop', 'min_pop')).remove();
		//	删除预览层
		$('#'+ pop_tb_id.replace('global_pop', 'preview_pop')).remove();

		if(slow)
		{
			$('#cover').hide();
			pop_obj.fadeTo("slow", 0.4).fadeTo("slow", 0.8).fadeTo("slow", 0.2).fadeTo("slow", 0.6 , function(){
				pop_obj.hide().remove();
			});
		}else{
			$('#cover').hide();
			pop_obj.fadeOut('normal' , function(){
				$(this).remove();
			});
		}
		this.pop_number--;
		//	关闭执行函数
		if(typeof this.close_callback == 'function')this.close_callback(pop_obj);
	},

	//	将弹出层缩小并移动到底部的动画（控制页面中同时只能有一个弹出层显示在中间！）
	flash_to_bottom : function(num){
		var old_min_pop = $('#min_pop_'+ num);
		if(old_min_pop.length > 0)old_min_pop.remove();
		//	存储缩放前的弹层状态
		var target_tb_id = 'global_pop_'+ num,
			target_content_obj = $('#pop_content_'+ num),
			target_tb_obj = $('#'+ target_tb_id),
			target_css = {
				position : 'absolute',
				left : target_tb_obj.css('left'),
				top : target_tb_obj.css('top'),
				width : target_content_obj.width(),
				height : target_content_obj.height(),
				scrollTop : $(document).scrollTop()
			};
		//	对left值特殊处理
		if(target_css.left.indexOf('40%') != -1){
			target_css.left = $(window).width()*2/5;
		}
		//	保存状态
		this.min_pop_data[target_tb_id] = target_css;
		//	隐藏原始层
		target_content_obj.animate({width:'0px' , height:'0px'} , 'slow' , function(){
			
		});
		target_tb_obj.animate({width:'0px' , height:'0px'}, 'slow' , function(){
			$(this).hide();
		});
		
		var title = target_content_obj.find('.pop_title').text();
		$('#bottom').prepend('<span id="min_pop_'+ num +'" class="bottom_min_pop" style="width:0px;height:0px;" title="'+ title +'">'+ title +'</span>')
		.children('span').eq(0).animate({width: this.min_pop.width , height:this.min_pop.height} , 'slow');


		//	绑定min_pop层的点击事件
		$('#bottom').find('.bottom_min_pop').bind('click' , function(){
			if($_Pop.playing)return false;
			$_Pop.click_min_pop($(this));
		});
		//	绑定min_pop层的hover
		$('#bottom').find('.bottom_min_pop').mouseenter(function(){
			var pop_content_id = $(this).attr('id').replace('min_pop' , 'pop_content'),
				pop_num        = pop_content_id.replace('pop_content_' , ''),
				pre_pop 	   = $('#preview_pop_'+ pop_num);

			var mobj 		= $(this),
				mleft 		= mobj.offset().left,
				mtop 		= mobj.offset().top;
			//	缩略图是否已存在
			if(pre_pop.length > 0){
				pre_pop.css({left:mleft-140, top:mtop-162}).show();
				return false;
			}
			//	查看content里有图片就拿来做缩略图
			var pop_content_img_obj = $('#'+ pop_content_id).find('.content').find('img');
			if(pop_content_img_obj.length > 0){
				var pop_img_obj = $(pop_content_img_obj[0]).clone();	//	取第一张
			}else{
				//return false;
			}
			//	
			pre_pop = $(document.body).append('<div id="preview_pop_'+ pop_num +'" style="display:none;"></div>')
			.find('#preview_pop_'+ pop_num).html(pop_img_obj).css({position:'absolute' , left:mleft-140 
				, top:mtop-162}).find('img').css({width:'200px' , height:'160px'}).end().show();
		}).mouseleave(function(){
			var pop_content_id = $(this).attr('id').replace('min_pop' , 'pop_content'),
				pop_num        = pop_content_id.replace('pop_content_' , ''),
				pre_pop 	   = $('#preview_pop_'+ pop_num);
			pre_pop.hide();
		});

	},
	//	迷你层点击事件
	click_min_pop : function(obj){
		$_Pop.playing = true;
		var num = obj.attr('id').replace('min_pop_' , ''),
			target_css = this.min_pop_data['global_pop_'+ num],
			target_tb_obj = $('#global_pop_'+ num),
			target_content_obj = $('#pop_content_'+ num);
		//	动画开始
		var bottom_offset = $('#bottom').offset();
		var left = parseInt(target_css.left) - bottom_offset.left,
			top = parseInt(target_css.top) - bottom_offset.top;

		target_content_obj.find('.mover').hide();
		//if($_Helper.isIE6){
			var min_pop_left = obj.offset().left - this.min_pop.width;
			obj.css({'position':'absolute' , left:min_pop_left});
		/*}else{
			obj.css({'position':'absolute'});
		}*/
		obj.animate({
			'width' : target_css.width , 
			'height' : target_css.height ,
			'top':  top,
			'left': left 
		} , 'slow').fadeOut('fast' , function(){
			target_tb_obj.fadeIn('normal' , function(){
				target_content_obj.animate({width: target_css.width , height: target_css.height} , 'slow' , function(){
					$("html,body").animate({scrollTop:target_css.scrollTop},"fast");
					$_Pop.playing = false;
				});
				target_content_obj.find('.mover').show();
				// table不会自己动，要手动改下
				target_tb_obj.animate({width: target_css.width+12 , height: target_css.height+12} , 'slow');
			});
		});
	}

};		//	end class

//--><!]]>