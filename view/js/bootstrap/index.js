<!--//--><![CDATA[//><!--
/**
 * [$_BsIndex 首页功能类]
 * @type {Object}
 */
var $_BsIndex = {
	_page 			: 1,
	_last_page 		: 0,
	_request_url 	: 'http://xiaoqiqiu.com:8081/api/get_article?callback=?',
	_request_action 	: 'index',
	
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
//		content_html.push('<div class="pin-wrapper" style="height: 25px;">');
		content_html.push('		<div class="comment-float"><em><a href="javascript:;" alt="'+ data.id +'">'+ data.cmt_num +'</a></em></div>');
//		content_html.push('</div>');
		if(typeof IS_MINE != 'undefined' && IS_MINE == 1){
			content_html.push('<a class="acticle-close" href="javascript:;" onfocus="this.blur();" onclick="$_BsAdd.del_article('+ data.id +');return false;">×</a>');
			content_html.push('<a class="acticle-edit" href="javascript:;" onfocus="this.blur();" onclick="$_BsAdd.edit_article('+ data.id +');return false;"> + </a>');
		}
		content_html.push('<div class="acticle-content">'+ data.content +'</div>');
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
		var _that 		= this,
			obj 		= $('#' + obj_name);

		//遮罩
		$_Helper.bs_top_loading('努力加载图文中...');

		$.getJSON(this._request_url , {'user':USER , 'action':this._request_action , 'page':this._page} , function(callback){
			if(callback){
				var content_html 	= '',
					last_page 		= callback['last_page'],
					callback 		= callback['data'];

				$('#page_btn').attr('last_page' , last_page);

				for(var i in callback){
					if(typeof callback[i].id == 'undefined')continue;
					content_html += _that.article_html(callback[i]);
				}

				obj.html(content_html);

				//$('#total_page').text( +last_page );

				$_Helper.bs_top_loading_done();
				//	代码高亮
				if(typeof SyntaxHighlighter == 'object'){
					SyntaxHighlighter.highlight();
				}

				$("#gotop").click();
			}
		});
			

	},		//end func


	//	注册
	reg : function(){
		$_Helper.require(['bootstrap/bsprofile'] , function(){
			if( typeof XQQ.bsProfile == 'function'){
				XQQ.bsProfile().reg();
			}
		});
	},
	//	修改资料
	edit : function(){
		$_Helper.require(['bootstrap/bsprofile'] , function(){
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
						li_html.push('<li><a href="javascript:;" onclick="$_BsIndex.sort_list_event(\''+
							back[i].name +'\');return false;">'+ back[i].name +'月 （'+ back[i].num +'条）</a></li>');
					}
				}

				li_html.push('<li><a href="javascript:;" onclick="$_BsIndex.sort_list_event(\''+
							last_one.name +'\' , \'more\');return false;" title="更早的">...&nbsp;&nbsp;&nbsp; </a></li>');
				li_html.push('<li><a href="">全部文笔 >>> </a></li>');
				li_html = li_html.join('');

				$('#sort_ul').html(li_html);
			});
	},
	// 分类列表事件
	sort_list_event : function(time , other){
		var other = other || '';

		$_BsIndex._request_url 		= 'http://xiaoqiqiu.com:8081/api/get_article?callback=?&time='+ time +'&other='+ other;
		$_BsIndex._request_action 		= 'sort';
		$_BsIndex._page 				= 1;

		$_BsIndex.switch_div('content','goto','right');
	}

};		//end object

//--><!]]>