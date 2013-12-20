<!--//--><![CDATA[//><!--
/**
 * [$_Index 首页功能类]
 * @type {Object}
 */
var $_BsIndex = {
	page 			: 0,
	last_page 		: 0,
	switch_T 		: null,
	request_url 	: 'http://xiaoqiqiu.com:8081/api/get_article?callback=?',
	request_action 	: 'index',
	
	login : function(){
		
		var login_html = '<p style="margin:10px;"><label>账号：</label><input type="text" id="username" style="border:0px;border-bottom:dotted;background:white;" /></p>\
			<p style="margin:10px;"><label>密码：</label><input type="password" id="password" style="border:0px;border-bottom:dotted;background:white;" /></p>';
		//登陆框弹出层	
		
		$_BsPop.set({
			btn2 			: '登陆',
			title			: '请登录~',
			content 		: login_html,
			btn2_click		: function(){
				var username = $('#username').val();
				var password = $('#password').val();
				//验证
				var regExp = /[a-zA-Z0-9]+/ig;
				if(regExp.test(username))
				{
					$.post(WEB_ROOT + 'api/index/login.php' , {'action':'login' , 'username':username , 'password':password} , function(back){
						if(back == 'success')
						{
							var welcome_html = '<h1 style="margin:20px 40px;"> '+ username +'   欢迎回来！  </h1>';
							$_BsPop.set({
								btn1 		: 'Close',
								title 		: 'welcome!',
								content 	: welcome_html
							});

							$('#add_something').show();
							$('#profile_ul').html('<li class="active"><a href="http://xiaoqiqiu.com/'+ username +'">当前登录：'+ username +'</a></li><li><a id="edit_btn" data-toggle="modal" data-target="#myModal" href="#" onclick="return false;">修改资料</a></li><li><a id="logout_btn" data-toggle="modal" data-target="#myModal" href="#" onclick="return false;">退出</a></li>');
						}else{
							SpaceUI.alert('用户名或密码错误..亲！');
							$('#username').val('');
							$('#password').val('');
							$('#username').focus();
						}
					});
				}
			}
		});

	},

	// 退出登陆
	logout : function(){
		$.post(WEB_ROOT + 'api/index/login.php' , {'action':'logout'} , function(back){
			if(back == 'success')
			{
				var welcome_html = '<h1 style="margin:20px 40px;">   下回还要来哦，亲！  </h1>';
				$_BsPop.set({
						btn1 		: 'Close',
						title 		: 'welcome!',
						content 	: welcome_html
					});
				$('#profile_ul').html('<li class="active"><a id="login_btn" data-toggle="modal" data-target="#myModal" href="#">登录</a></li><li><a id="reg_btn" data-toggle="modal" data-target="#myModal" href="#" onclick="return false;">注册</a></li>');

				$('#add_something').hide();
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
				//var request_url = 'http://xiaoqiqiu.com:8081/api/get_article?callback=?';	//改成撸啊接口
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


	//	注册
	reg : function(){
		$_Helper.require(['bootstrap/profile'] , function(){
			if( typeof XQQ.bsProfile == 'function'){
				XQQ.bsProfile().reg();
			}
		});
	},
	//	修改资料
	edit : function(){
		$_Helper.require(['bootstrap/profile'] , function(){
			if( typeof XQQ.profile == 'function'){
				XQQ.profile().edit();
			}
		});
	},
	//	加载分类列表
	load_sort_list : function(){
		$.getJSON('http://xiaoqiqiu.com:8081/api/get_sort?action=time&user='+ USER +'&callback=?' 
			, function(back){
				var li_html = [],
					last_one = back.pop();

				for(var i in back){
					if(typeof back[i] == 'object'){
						li_html.push('<li><a href="javascript:;" onclick="$_Index.sort_list_event(\''+
							back[i].name +'\');return false;">'+ back[i].name +'月 （'+ back[i].num +'条）</a></li>');
					}
				}

				li_html.push('<li><a href="javascript:;" onclick="$_Index.sort_list_event(\''+
							last_one.name +'\' , \'more\');return false;" title="更早的">...&nbsp;&nbsp;&nbsp; </a></li>');
				li_html.push('<li><a href="">全部文笔 >>> </a></li>');
				li_html = li_html.join('');

				$('#sort_ul').html(li_html);
			});
	},
	// 分类列表事件
	sort_list_event : function(time , other){
		var other = other || '';

		$_Index.request_url 		= 'http://xiaoqiqiu.com:8081/api/get_article?callback=?&time='+ time +'&other='+ other;
		$_Index.request_action 		= 'sort';
		//$_Index.page 				= 1;
		$('#now_page').text(1);

		$_Index.switch_div('content','goto','right');
	}

};		//end object

//--><!]]>