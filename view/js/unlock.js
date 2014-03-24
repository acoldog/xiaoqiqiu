(function($){
	var Unlock = function(op){
		if(this instanceof Unlock){
			this.setOp(op);
		}else{
			return new Unlock(op);
		}
	}

	Unlock.prototype = {
		insert_html : function(zIndex){
			var u_html = [];
			u_html.push('<div class="unlock radius" id="acol_unlock" style="z-index:'+ zIndex +';"><em>滑动解锁 →</em></div>');
			u_html = u_html.join("");
			jQuery(document.body).append( u_html );
		},
		setOp : function(op){return false;  // 暂时屏蔽锁屏功能
			//	检查COOKIE状态，设定时间内不重复播放
			if($_Helper.getCookie('unlock_event') == 1){
				return false;
			}
			$(document.body).attr('style' , '-webkit-user-select:none;-moz-user-select: -moz-none;');
			SpaceUI.cover('unlock_cover' , {
				opacity : 8
			});
			var unlock_zIndex = $('#unlock_cover').css('zIndex') + 1;
			this.insert_html(unlock_zIndex);
			$('#acol_unlock').mousedown(function(e){
	          	SpaceUI.bind_move($(this) , e , {
	          		type:'self',
	          		limit_y:'fixed',
	          		limit_x:{min:300 , max:850}
	          	});
	      	}).mouseup(function(){
	      		var n_left = $(this).css('left');
	      		if(parseInt(n_left) >= 800){
	      			$('#unlock_cover , #acol_unlock').fadeOut('slow');
	      			$(document.body).removeAttr('style');
	      			$_Helper.setCookie('unlock_event' , 1 , 's3600');
	      		}else if(parseInt(n_left) < 800){
	      			$(this).css({'left':'300px'});
	      		}
	      	});
		}
	}

	setTimeout(function(){
		var a = new Unlock({});
	} , 5000);
	
})(jQuery);