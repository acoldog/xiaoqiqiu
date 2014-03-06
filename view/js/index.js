<!--//--><![CDATA[//><!--
/*
*
*		web_root			当前程序相对路径（主要提供准确的AJAX请求）
*		ini					初始化函数
*		logout				退出登陆函数
*		switch_div			切换内容的DIV移动动画函数
*		loading_cover		加载显示遮罩层
*		loading_hide		隐藏遮罩层
*		comment				查看评论相关操作
*		comment_pageClick	评论页列表事件
*		body_flash			进站的入场动画
*/
$_Helper.require(['comment']);

$(document).ready(function(){
	//$_Index.ini();
	//$_Index.body_flash();
	//	设置bottom位置随滚动条变化
	$(window).bind('scroll' , function(){
		var _top = $(this).height() - 50 + $(document).scrollTop();
		$('.bottom').css('top' , _top);
	});
	//	编辑器事件
	$(document).delegate('#add_something' , 'click' , $_Add.ini);
	//	图片浏览事件
	$(document).delegate('.comp_img' , 'click' , function(){
		$_Helper.zoom_img($(this));
	});
	//	图片浏览事件
	$(document).delegate('.circle' , 'mouseover' , function(){
		$(this).find('.content').css('background-color','#E7E7E7');
	}).delegate('.circle' , 'mouseout' , function(){
		$(this).find('.content').css('background-color','#F7F7F7');
	});
	/*$('.comp_img').live('click' , function(){
		$_Index.zoom_img($(this));
	});*/
	// 返回顶部	
	$("#gotop").click(function(){
		$("html,body").animate({ scrollTop : 0 },"fast");        	     
	})	    
	$(window).bind("scroll", function(){
		var gleft = $('#content').offset().left + $('#content').width() - 15;
		($(document).scrollTop() > 0) ? 
		$("#gotop").css('left' , gleft).show() : 
		$("#gotop").fadeOut('normal');
	});	
	//	lazyload
	setInterval($_Helper.lazyload , 1000);
	//$_Helper.loading('正在加载');
	/*$('#photoWall').fadeTo("slow", 0.4, function(){
		$(this).fadeTo("slow", 1, function(){
			$(this).fadeTo("slow", 0.4, function(){
				$(this).fadeTo("slow", 1);
			});
		});
	});*/
	//	评论
	$('#content').find('.comment , .comment-float').live('click' , function(){
		XQQ.cmt.init($(this).find('a'));
	});

	//	展示tqq
	$('#right_menu').find('.menu_click').click(function(){
		$(this).find('.slide_item').stop(false , true).slideDown('slow');
	}).mouseleave(function(){
		$(this).find('.slide_item').stop(false , true).slideUp('fast');
	});

	$('#right_menu').find('.menu_over').mouseenter(function(){
		$(this).find('.slide_item').stop(false , true).slideDown('slow');
	}).mouseleave(function(){
		$(this).find('.slide_item').stop(false , true).slideUp('fast');
	});
	//	友情提示IE6用户
	if($.browser.msie && $.browser.version == 6.0){
		var op = {
			head:'IE6什么的都OUT了！建议您升级浏览器获得更好的体验',
			yes:{
				text:'确定'
			},
			close_btn:'hide',
			css : {width : '500px'},
			timeout : 5000
		};
		SpaceUI.alert(op);
	}
	//	分页按钮hover
	$('#page_btn , #page_back').mouseenter(function(){
		$(this).css({'background-color':'#ccc' , opacity:'0.6'});
	}).mouseleave(function(){
		$(this).css({'background-color':'' , opacity:'1'});
	});
	//	折叠content
	$(document).delegate('#hide_content' , 'click' , function(){
		$('#content').toggle("slow");
	});

	//	comment float
	$(window).scroll(comment_float);
	//	body recover
	setTimeout(function(){
		$(document.body).css('-webkit-transform' , 'none');
	} , 1000);
	
	//	sort list
	$_Index.load_sort_list();

	//prepare ck
	$_Helper.require(['ckeditor']);
});

/**
 * [$_Index 首页功能类]
 * @type {Object}
 */
var $_Index = {
	page 			: 0,
	last_page 		: 0,
	switch_T 		: null,
	request_url 	: 'http://lua.xiaoqiqiu.com/api/get_article?callback=?',
	request_action 	: 'index',
	
	ini : function(){
		
		var login_html = '<p style="margin:10px;"><label>账号：</label><input type="text" id="username" style="border:0px;border-bottom:dotted;background:white;" /></p>\
			<p style="margin:10px;"><label>密码：</label><input type="password" id="password" style="border:0px;border-bottom:dotted;background:white;" /></p>\
			<p style="margin:10px 30px;"><input type="button" id="login_submit" style="float:right;border:dotted;cursor:pointer;" value="登陆" /></p>';
		//登陆框弹出层	
		var now_Pop_obj = $_Pop.create_pop({
			title : '登陆入口',
			container : $(document.body) , 
			css_ini : {'left':'40%','z-index':'101','position':'absolute',width:'240px'} , 
			flash_ini : {'position':'240' , 'sec':'300', 'times':2} , 
			content : login_html
		});
		$('#username').focus();

		//AJAX登陆操作
		$('#login_submit').click(function(){
			var username = $('#username').val();
			var password = $('#password').val();
			//验证
			var regExp = /[a-zA-Z0-9]+/ig;
			if(regExp.test(username))
			{
				$.post(WEB_ROOT + 'api/index/login.php' , {'action':'login' , 'username':username , 'password':password} , function(back){
					if(back == 'success')
					{
						$_Pop.close_flash(now_Pop_obj);
						var welcome_html = '<h1 style="margin:20px 40px;"> '+ username +'   欢迎回来！  </h1>';
						$_Pop.create_pop({
							title : 'welcome!',
							container : $('#container') , 
							css_ini : {'left':'40%','z-index':'101','position':'absolute','top':'240px'} , 
							content : welcome_html , 
							close_time : 1000,
							close_callback : function(){
								setTimeout(function(){
									window.location.reload();		//	如果cache文件reload暂时没用
								}, 2000);
							}
						});
						$('#login_top').html('当前用户：'+ username +'。<a href="javascript:;" onclick="$_Index.logout();return false;">退出</a>？');
						$('#add_something').show();
					}else{
						SpaceUI.alert('用户名或密码错误..亲！');
						$('#username').val('');
						$('#password').val('');
						$('#username').focus();
					}
				});
			}
		});
		//	回车监听
		$(document).bind('keydown' , this.enter_save);
	},
	//	回车提交
	enter_save : function(e){
		var e = e || window.event;
		var k = e.keyCode || e.which || e.charCode;
		if(k == 13){
			$('#login_submit').click();
			$(document).unbind('keydown' , this.enter_save);
		}
	},

	// 退出登陆
	logout : function(){
		$.post(WEB_ROOT + 'api/index/login.php' , {'action':'logout'} , function(back){
			if(back == 'success')
			{
				var welcome_html = '<h1 style="margin:20px 40px;">   下回还要来哦，亲！  </h1>';
				$_Pop.create_pop({
					title : 'bye!',
					container : $('#container') , 
					css_ini : {'left':'40%','z-index':'101','position':'absolute','top':'240px'} , 
					content : welcome_html , 
					close_time : 1000,
					close_callback : function(){
						setTimeout(function(){
							window.location.reload();
						}, 2000);
					}
				});
				$('#add_something').hide();
				$('#login_top').html('<span id="login_top">未登录，现在<a href="javascript:;" onclick="$_Index.ini();return false;">登录</a>？</span>');
			}else{
				SpaceUI.alert('亲！退出失败，再试一次吧..');
			}
		});
	},

	//	拼接文章结构
	article_html : function(data){
		var content_html = [];
		content_html.push('<div class="circle radius"  aid="'+ data.id +'">');
		content_html.push('<div class="comment-float"><em><a href="javascript:;" alt="'+ data.id +'">'+ data.cmt_num +'</a></em></div>');
		if(typeof IS_MINE != 'undefined' && IS_MINE == 1){
			content_html.push('<a class="close" href="javascript:;" onfocus="this.blur();" onclick="$_Add.del_article('+ data.id +');return false;">×</a>');
			content_html.push('<a class="edit" href="javascript:;" onfocus="this.blur();" onclick="$_Add.edit_article('+ data.id +');return false;"> + </a>');
		}
		content_html.push('<div class="content">'+ data.content +'</div>');
		content_html.push('<div class="comment_div">');
		content_html.push('	<span class="comment_div">');
		content_html.push('		<span class="author"> '+ data.username +' 于 '+ data.time +' 发表</span>');
		content_html.push('		<span class="comment"><a href="javascript:;" alt="'+ data.id +'">我有想法('+ data.cmt_num +')</a></span>');
		content_html.push('	</span>');
		content_html.push('</div></div>');
		content_html.push('<div class="left_shadow">');
		content_html.push('	<div class="right_shadow"></div>');
		content_html.push('</div>');
		return content_html.join('');
	},
	
	//	切换内容动画
	switch_div : function(obj_name , type , direction){
		var _that = this;
		clearTimeout(this.switch_T);
		//	获取下一页数据
		//var now_page = (this.page == 0) ? +$('#now_page').text() : this.page;
		var now_page = +$('#now_page').text();
		var last_page = (this.last_page == 0) ? +$('#page_btn').attr('last_page') : this.last_page;

		if(type == 'next')
		{
			if(now_page >= last_page)
				now_page = 1;
			else
				now_page ++;
		}else if(type == 'pre'){
			if(now_page <= 1)
				now_page = last_page;
			else
				now_page --;
		}else if(type == 'goto'){
			//
		}
		//修改当前页
		//$('#page_btn').html('<label id="now_page">'+ now_page +'</label>/'+ last_page);
		$('#now_page').text( +now_page );

		//	内容切换动画的参数
		var start_pos = {'left':'-750px', 'right':document.body.clientWidth},
			obj = $('#' + obj_name),
			former_left = obj.offset().left,
			direction = direction || 'left',
			other_dir = '';
		if(direction == 'left'){
			other_dir = 'right';
		}else{
			other_dir = 'left';
		}
		
		this.switch_T = setTimeout(function(){
			//遮罩
			//$('#top_loading').show();
			$_Helper.top_loading('努力加载图文中...');
			//this.loading_cover();
			obj.css({'position':'absolute'}).animate({
			   left: start_pos[direction], opacity: 'hide'
			}, 600 , function(){
				$(this).css({'position':''});
				obj.empty();

				//	清空当前页数据
				$("#gotop").click();

				//var request_url = WEB_ROOT + 'api/index/index.php';
				//var request_url = 'http://lua.xiaoqiqiu.com/api/get_article?callback=?';	//改成撸啊接口
				$.getJSON(_that.request_url , {'user':USER , 'action':_that.request_action , 'page':now_page} , function(callback){
					if(callback){
						var content_html 	= '',
							last_page 		= callback['last_page'],
							callback 		= callback['data'];

						$('#page_btn').attr('last_page' , last_page);

						for(var i in callback){
							if(typeof callback[i].id == 'undefined')continue;
							content_html += _that.article_html(callback[i]);
						}

						var next_obj = obj.clone();
						delete obj;
						next_obj.css({'position':'absolute' , 'display':'none' , 'left':start_pos[other_dir]});
						next_obj.html(content_html);

						$('#total_page').text( +last_page );

						$('#' + obj_name).remove();
						$('#header').after(next_obj);
						next_obj.animate({
						   left: former_left, opacity: 'show'
						}, 600 ,function(){
							$(this).css({'position':'','opacity':'1'});
							//$('#top_loading').hide();
							//$_Index.loading_hide();
							$_Helper.top_loading_done();
						});		//动画完成后，去除position属性
						//	代码高亮
						if(typeof SyntaxHighlighter == 'object'){
							SyntaxHighlighter.highlight();
						}
					}
				});
			});
			
		} , 300);

	},		//end func
	
	//	遮罩层
	loading_cover : function(){
		if($('#cover').attr('id') != 'cover'){
			$(document.body).prepend('<div id="cover"></div>');
		}
		$('#cover').show();
	},
	
	//	关闭遮罩
	loading_hide : function(){
		if($('#cover').attr('id') == 'cover'){
			$('#cover').hide().remove();
		}
	},

	//	评论	
	comment : function(obj){
		SpaceUI.alert('此功能开发中。');return;

		var obj = $(obj),
			content_id = obj.attr('alt');
		if($('#acolPage_'+ content_id).length > 0)return;
		$.getJSON(WEB_ROOT + 'api/index/index.php' , {'action':'get_comment' , 'content_id':content_id , 'page':1, 'rows':2} , function(callback){
			if(callback){
				if(!callback)return;
				var comment_data_html = '';
				for(var i in callback.data){
					comment_data_html += '<p style="text-align:left;margin:10px;">['+ callback.data[i].comment_user +'] '+ callback.data[i].comment +'</p>';
				}
				var comment_html = comment_data_html;
				var pop_obj = $_Pop.create_pop({
					title : '评头论足',
					container : $('#container') , 
					css_ini : {'left':'40%','z-index':'101','position':'absolute','top':'240px'} ,
					content : comment_html
				});
				pop_obj.find('#acolPage').attr('id' , 'acolPage_'+ content_id);
				//	生成分页
				var page_option = {
                    container_ID:'acolPage_'+ content_id  , h_btn:'...' , f_btn:'首页' , l_btn:'尾页' , pre_btn:'上一页' , next_btn:'下一页' , 
                    total_page:callback.max_page , page_showNums:3  , obj_name: 'acolPage_'+ content_id ,
                    callback:function(now_page){
                         $.getJSON(WEB_ROOT + 'api/index/index.php' , {'action':'get_comment' , 'content_id':content_id , 'page': now_page, 'rows':2} , function(callback){
                            if(callback){
                                if(!callback)return;
								var comment_data_html = '';
								for(var i in callback.data){
									comment_data_html += '<p style="text-align:left;margin:10px;">['+ callback.data[i].comment_user +'] '+ callback.data[i].comment +'</p>';
								}
								pop_obj.find('.content').html(comment_data_html);
                            }
                         });
                    }
                };
                window['acolPage_'+ content_id] = new SpaceUI.Page(page_option);
			}
		});
	},

	//	进站动画播放
	body_flash : function(){
		//	检查COOKIE状态，设定时间内不重复播放
		if($_Helper.getCookie('body_flash') == 1){
			return false;
		}

		var body_obj = $(document.body);
		body_obj.prepend('<div id="body_flash"></div>');
		var oheight = body_obj.height();
		var owidth = body_obj.width();
		
		var body_flash = $('#body_flash');
		body_flash.css({'position':'absolute','height':oheight,'width':owidth,'top':-oheight});
		
		body_flash.animate({
		   top: 0
		}, 300 ,function(){
			body_flash.animate({
			   top: -(oheight/4)
			}, 500 ,function(){
				body_flash.animate({
				   top: 0
				}, 700 ,function(){
					body_flash.animate({
					   top: -(oheight/8)
					}, 900 ,function(){
						body_flash.animate({
						   top: 0
						}, 1000 ,function(){
							window.setTimeout(function(){
								body_flash.animate({
								   top: -oheight
								}, 100 ,function(){
									body_flash.remove();
									//	播放结束，状态存COOKIE，设置过期时间60秒
									$_Helper.setCookie('body_flash' , 1 , 'h10');
								});
							} , 2000);
						});
					});
				});
			});
		});
		
	},
	//	注册
	reg : function(){
		//$_Helper.require(['profile']);
		if( typeof XQQ.profile == 'function'){
			XQQ.profile().reg();
		}
	},
	//	修改资料
	edit : function(){
		if( typeof XQQ.profile == 'function'){
			XQQ.profile().edit();
		}
	},
	//	加载分类列表
	load_sort_list : function(){
		$.getJSON('http://lua.xiaoqiqiu.com/api/get_sort?action=time&user='+ USER +'&callback=?' 
			, function(back){
				var li_html = [];
					//last_one = back.pop();

				/*for(var i in back){
					if(typeof back[i] == 'object'){
						li_html.push('<li><a href="javascript:;" onclick="$_Index.sort_list_event(\''+
							back[i].name +'\');return false;">'+ back[i].name +'月 （'+ back[i].num +'条）</a></li>');
					}
				}*/
				for(var i in back){
					if( typeof i != 'undefined' && typeof back[i][0] == 'object' ){
						li_html.push('<li><em>'+ back[i][0].year +'年</em><ul>');

						for(var j in back[i]){
							if(typeof back[i][j] == 'object'){
								li_html.push('<li><a class="tooltip-acol" data-original-title="点击查看'+ back[i][j].name +'月发表的文章"  href="javascript:;" onclick="$_Index.sort_list_event(\''+
									back[i][j].year +'-'+ back[i][j].name +'\');return false;">'+ back[i][j].name +'月 （'+ back[i][j].num +'）</a></li>');
							}
						}
						li_html.push('</ul></li>');
					}
				}

				//li_html.push('<li><a href="javascript:;" onclick="$_Index.sort_list_event(\''+
				//			last_one.name +'\' , \'more\');return false;" title="更早的">...&nbsp;&nbsp;&nbsp; </a></li>');
				li_html.push('<li><a href="">全部文笔 >>> </a></li>');
				li_html = li_html.join('');

				$('#sort_ul').html(li_html);
			});
	},
	// 分类列表事件
	sort_list_event : function(time , other){
		var other = other || '';

		$_Index.request_url 		= 'http://lua.xiaoqiqiu.com/api/get_article?callback=?&time='+ time +'&other='+ other;
		$_Index.request_action 		= 'sort';
		//$_Index.page 				= 1;
		$('#now_page').text(1);

		$_Index.switch_div('content','goto','right');
	}

};		//end object

function comment_float(){
	var  _parent = $('.comment-float').parent('.circle');
	$('.comment-float').each(function(i){
		var _top = $(this).offset().top,
			play = false,
			_thatObj = $(this),
			_parent_top = _parent.eq(i).offset().top,
			_parent_height = _parent.eq(i).height(),
			_scrollTop 	= $(document).scrollTop(),
			winHeight 	= $(window).height();

		if((_parent_top + _parent_height) > _scrollTop 
			&& ( _parent_height > winHeight || (_parent_top + _parent_height) < (_scrollTop + winHeight)) ){
				if(_parent_top < _scrollTop){
					_thatObj.stop().animate({'top' : (_scrollTop - _parent_top)} , 'fast');
					//_thatObj.css('top' , (_scrollTop - _parent_top));
					play = true;
				}else if( parseInt(_thatObj.css('top')) > 0 ){
					_thatObj.css('top' , 0);
				}
		}

		if(play){
			return false;
		}
	});
	
}


//--><!]]>