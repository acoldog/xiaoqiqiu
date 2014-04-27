/**
*
*	照片墙
*/
(function($){
	$(document).ready(function(){
		window.WallObj = new Wall();
		//WallObj.init_wall();
		//	图片浏览事件
		$(document).delegate('.comp_img' , 'click' , function(){
			$_Helper.zoom_img($(this));
		});
		// 返回顶部	
		$("#gotop").click(function(){
			$("html,body").animate({ scrollTop : 0 },"fast");        	     
		})	    
		$(window).bind("scroll", function(){
			($(document).scrollTop() > 0) ? $("#gotop").show() : $("#gotop").hide();
		});
		//	设置bottom位置随滚动条变化
		$(window).bind('scroll' , function(){
			var _top = $(this).height() - 50 + $(document).scrollTop();
			$('.bottom').css('top' , _top);
		});
		//	lazyload
		setInterval($_Helper.lazyload , 1500);
	});




	var getWall = function(page , rows){
		AcolScrollPage.is_loading = true;
		$('#loading').show();
		//$_Helper.loading();
		$.getJSON('http://lua.xiaoqiqiu.com/api/get_imgList?callback=?', {'action':'imgList', user:USER, page:page, rows:rows} , function(back){
			if(back){
				var p_html = [];
				var data 	= back.data;
				var total_page = Math.ceil(back.total / rows);
                if (AcolScrollPage.total_page != total_page) {
                    AcolScrollPage.total_page = total_page;
                    AcolScrollPage.total_screen = Math.ceil(AcolScrollPage.total_page / AcolScrollPage.per_page_screen);
                }
				for(var i in data){
					var rand_h = Math.floor(Math.random()*100) + 150;
					p_html.push('<div class="box" pid="'+ data[i].id +'">');
					if(IS_MINE == 1){
						p_html.push('<a class="del_img" href="javascript:;" onclick="WallObj.del_img('+ data[i].id +')">x</a>');
					}
					p_html.push('<img lazyload="1" style="height:'+ rand_h +'px;" class="comp_img" src="'+ STATIC_ROOT +'default.jpg" data="'+ data[i].src +'"/>');

					if( SpaceUI.Helper.trim(data[i].introduce) != '' ){
						p_html.push('<p>'+ data[i].introduce +'</p>');
					}
					p_html.push('</div>');
				}
				p_html = p_html.join('');
				p_html = $(p_html);
				$('#container').append(p_html).masonry('appended', p_html, true);

				AcolScrollPage.is_scroll = true;
                AcolScrollPage.is_loading = false;
                $('#loading').fadeOut(2000);
				/*var container = $('#container');
				container.masonry('destroy');
	            $('#container').imagesLoaded(function() {
	            	setTimeout(function(){
	            		$('#container').masonry({
		                    itemSelector: '.box',
		                    columnWidth: 360
		                });
	            	} , 3000)
	                
	            });*/
				//$_Helper.load_done();
			}
		});
	}



	var Wall = function(op) {
        // 不允许直接调用
        if (this instanceof Wall) {
            this.init_wall(op);
        } else {
            return new Wall(op);
        }
    }
    Wall.prototype = {
    	init_wall : function(option){
    		var show_rows = 18;
			var op = {
				page_container : $('#acolScrollPage'),
				content_container : $('#container'),
				per_page_screen : 5,
				scroll_delay : 0,
				scroll_height : 200,
				auto_show_page_list : true,
				now_page : 1
			};
			AcolScrollPage.init(op);
			$(window).scroll(function(){
				AcolScrollPage.content_container.blur();
				if(AcolScrollPage.is_scroll === false && AcolScrollPage.is_loading === false){
					//console.log(AcolScrollPage.now_page)
					getWall(AcolScrollPage.now_page , show_rows);
					//SquareOfSpace.videoList.append_video_list(AcolScrollPage.now_page);
				}
			});

			AcolScrollPage.page_container.delegate('a' ,'mousedown' , function(){
				$("html,body").scrollTop(0);
				//	在首页和末页时禁用上/下一页按钮
				var page_text = $(this).text();
				if((page_text == AcolScrollPage.pre_page && AcolScrollPage.now_page == AcolScrollPage.per_page_screen) || 
					(page_text == AcolScrollPage.next_page && AcolScrollPage.now_page == AcolScrollPage.total_page))return false;
				//$('#container').masonry('destroy');
	    		//SquareOfSpace.videoList.masonrySet();
	    		//getWall(AcolScrollPage.now_page , 2);
	    		AcolScrollPage.content_container.masonry('destroy');
	    		AcolScrollPage.content_container.css('height','800px');
			});
			//	加载首页
			getWall(1 , show_rows);
    	},
    	del_img : function(pid){
    		if(confirm('是否删除?')){
    			$.getJSON(WEB_ROOT + 'api/imgWall/wall.php' , {action:'delImg', user:USER , pid:pid} , function(back){
					if(back){
						if(back.status == 'success'){
							$('#container').find('div[pid='+ pid +']').remove();
							SpaceUI.alert('删除成功');
						}else{
							SpaceUI.alert(back.msg);
						}
					}
				});
    		}
    	}
    }

})(jQuery);