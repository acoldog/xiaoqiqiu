<!--//--><![CDATA[//><!--

var $_BsPop = {
	/**
	 * [set description]
	 * @param {[type]} op [description]
	 * 
	 */
	_enterBtn : 'btn2',

	set : function(op){
		var _that   		= this,
			btn1_obj 		= $('#modal_btn1'),
			btn2_obj 		= $('#modal_btn2'),
			title_obj 		= $('#myModalLabel'),
			body_obj 		= $('#modal_body'),
			container_obj 	= $('#modal_body').parent().parent('.modal-dialog'),
			extra_width 	= 40;	//校准边框需要额外加多点

		//初始化赋值
		op.btn1 ? (btn1_obj.text(op.btn1) && btn1_obj.show()) : btn1_obj.hide();
		op.btn2 ? (btn2_obj.text(op.btn2) && btn2_obj.show()) : btn2_obj.hide();
		op.title ? title_obj.text(op.title) :'';
		op.content ? body_obj.html(op.content) :'';
		//	加载图片成功后重置弹层尺寸
		if( op.type && op.type == 'img' && typeof op.content == 'object' ){

			container_obj.css('width' , 1300);	//展示图片的时候初始设置大一点，为了好看~
			$_Helper.bs_top_loading('努力加载图片中...');
			//	图片加载成功后重置cotainer的宽度
			op.content.onload = function(){
				container_obj.css('width' , this.width + extra_width);
				$_Helper.bs_top_loading_done();
			}
		}
		
		//set style
		if( typeof op.style == 'object' ){
			container_obj.css(op.style);
		}else{
			container_obj.removeAttr('style');
			op.width ? container_obj.css('width' , op.width + extra_width) : container_obj.css('width' , 600);
			op.height ? container_obj.css('height' , op.height) : '';
		}

		//绑定按钮事件
		typeof op.btn1_click == 'function' ? (
				btn1_obj.unbind('click').bind('click' , op.btn1_click )
			) : '';

		typeof op.btn2_click == 'function' ? (
				btn2_obj.unbind('click').bind('click' , op.btn2_click )
			) : '';

		if( op.btn2 ){
			_that._enterBtn = 'btn2';
		}else{
			_that._enterBtn = 'btn1';
		}
		//	回车监听
		$(document).bind('keydown' , _that.enter_event);
		//	运行callback
		if(typeof op.callback == 'function')op.callback(body_obj);
		//auto close
		if( op.close_time ){
			setTimeout($_BsPop.close , parseInt(op.close_time) );
		}
	},

	//	回车事件
	enter_event : function(){
		var _that = this;
		//if( $_BsPop._enterBtn != '' ){
			var e = e || window.event;
			var k = e.keyCode || e.which || e.charCode;

			if(k == 13){
				if( $_BsPop._enterBtn == 'btn1' ){
					$('#modal_btn1').click();
				}else{
					$('#modal_btn2').click();
				}

				$(document).unbind('keydown' , _that.enter_event);
			}
		//}
	},

	//关闭弹层
	close : function(){
		$('#modal_body').parent().parent('.modal-dialog').find('.close').click();
	}

}	//class end


//--><!]]>