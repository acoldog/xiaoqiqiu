<!--//--><![CDATA[//><!--

var $_BsPop = {
	/**
	 * [set description]
	 * @param {[type]} op [description]
	 * 
	 */
	_enterBtn : 'btn2',

	set : function(op){
		var _that   	= this,
			btn1_obj 	= $('#modal_btn1'),
			btn2_obj 	= $('#modal_btn2'),
			title_obj 	= $('#myModalLabel'),
			body_obj 	= $('#modal_body');

		//初始化赋值
		op.btn1 ? (btn1_obj.text(op.btn1) && btn1_obj.show()) : btn1_obj.hide();
		op.btn2 ? (btn2_obj.text(op.btn2) && btn2_obj.show()) : btn2_obj.hide();
		op.title ? title_obj.text(op.title) :'';
		op.content ? body_obj.html(op.content) :'';

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
	}

}	//class end


//--><!]]>