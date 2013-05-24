if( typeof XQQ == 'undefined' )XQQ = {};
XQQ.profile = (function($){
	var Profile  = function(op){
		if(this instanceof Profile){
			this.setOp(op);
		}else{
			return new Profile(op);
		}
	}
	Profile.prototype = {
		upload_photo_src : {},
		reg_Pop_obj : null,
		setOp : function(op){
			return this;
		},
		//	注册
		reg : function(){
			if($('.reg_container').length > 0)return;		//	不能重复生成

			$_Helper.top_loading('努力加载中...');
			var _that = this;
			var r_html = [];
			r_html.push('<div class="reg_container">');
			r_html.push('    <div class="reg_left" style="text-align: left;">');
			r_html.push('      <ul>');
			r_html.push('        <li>用户名：</li>');
			r_html.push('        <li>密码：</li>');
			r_html.push('        <li>简介：</li>');
			r_html.push('        <li>（选填）腾讯微博代码：</li>');
			r_html.push('        <li>（选填）新浪微博代码：</li>');
			r_html.push('        <li>头像：</li>');
			r_html.push('      </ul>  ');
			r_html.push('    </div>');
			r_html.push('    <div class="reg_right" style="text-align: left;">');
			r_html.push('      <ul>');
			r_html.push('        <li><input type="text" id="r_username" /></li>');
			r_html.push('        <li><input type="password" id="r_pass" /></li>');
			r_html.push('        <li><input type="text" id="r_desc" /></li>');
			r_html.push('        <li><input type="text" id="r_tqq" /></li>');
			r_html.push('        <li><input type="text" id="r_weibo" /></li>');
			r_html.push('		 <li><input type="file" id="r_face" name="r_face" style="display:none;" /><span id="r_face_src"></span></li>');
			r_html.push('      </ul>  ');
			r_html.push('    </div>');
			r_html.push('    <input type="button" class="r_submit" style="width:200px;" value="提交注册信息" />');
			r_html.push('</div>');
			r_html = r_html.join('');
			//登陆框弹出层	
			setTimeout(function(){
				_that.reg_Pop_obj = $_Pop.create_pop({
					title : '注册填写必要资料~',
					container : $(document.body) , 
					css_ini : {'z-index':'101','position':'absolute','width':'700px','top':'-500px','left':'0px'} ,
					content : r_html,
					callback : function(pop_obj){
						pop_obj.animate({
			                top		:'0px',
			                opacity	:'show'
			            }, 'slow');
					}
				});

				_that.upload_photo_src = {};
				$("#r_face").uploadify({
	                'method'        : 'post',
	                'fileTypeExts' 	: '*.gif; *.jpg; *.png',
	                'formData'      : {'action' : 'upload'},
	                'buttonText' 	: '上传头像',
	                'width' 		: 60,
	                'height' 		: 15,
	                'swf'           : WEB_ROOT + 'plugin/uploadify/uploadify.swf',
	                'uploader'      : WEB_ROOT + 'api/index/add.php',
	                'onUploadSuccess' : function(file, data, response) {
	                	try{
	                		var data = eval('('+ data +')');
	                		$('#r_face_src').text(data.compress_src);
	                	}catch(e){
	                		SpaceUI.alert('上传失败，请检查图片格式');
	                	}
	                }
	            });

	            //	绑定提交事件
	            $('.reg_container').delegate('.r_submit' , 'click' , function(){
	            	_that.submit_reg();
	            });
	            $_Helper.top_loading_done();
			} , 800);
			
		},
		//	提交注册
		submit_reg : function(){
			var _that = this,
				username = $('#r_username').val();

			//	验证用户名
			if( !/[a-zA-Z0-9]+/.test(username) ){
				SpaceUI.alert('用户名只支持字母和数字');
				return false;
			}
			var data = {
				action		:'reg',
				username 	: username,
				password 	: $('#r_pass').val(),
				desc 		: $('#r_desc').val(),
				face 		: $('#r_face_src').text(),
				tqq 		: $('#r_tqq').val(),
				weibo 		: $('#r_weibo').val()
			};
			$.post(WEB_ROOT + 'api/index/profile.php' , data , function(back){
				if(back){
					$_Pop.close_flash(_that.reg_Pop_obj);
					$_Pop.create_pop({
						title : '闲话多说~',
						container : $(document.body) , 
						css_ini : {'z-index':'101','position':'absolute','width':'700px','top':'200px'} ,
						content : '恭喜注册成功，登陆账号吧~',
						close_time : 2000,
						show_min : false,
						show_close : false,
						close_callback : function(pop_obj){
							if( typeof $_Index == 'object' ){
								$_Index.ini();
							}
						}
					});
				}
			});
		},
		//	修改资料
		edit : function(){
			if($('.reg_container').length > 0)return;		//	不能重复生成

			$_Helper.top_loading('努力加载中...');
			var _that = this;
			var r_html = [];
			r_html.push('<div class="reg_container">');
			r_html.push('    <div class="reg_left" style="text-align: left;">');
			r_html.push('      <ul>');
			r_html.push('        <li>密码：</li>');
			r_html.push('        <li>简介：</li>');
			r_html.push('        <li>腾讯微博代码（选填）：</li>');
			r_html.push('        <li>新浪微博代码（选填）：</li>');
			r_html.push('        <li>头像：</li>');
			r_html.push('      </ul>  ');
			r_html.push('    </div>');
			r_html.push('    <div class="reg_right" style="text-align: left;">');
			r_html.push('      <ul>');
			r_html.push('        <li><input type="password" id="r_pass" /></li>');
			r_html.push('        <li><input type="text" id="r_desc" /></li>');
			r_html.push('        <li><input type="text" id="r_tqq" /></li>');
			r_html.push('        <li><input type="text" id="r_weibo" /></li>');
			r_html.push('		 <li><input type="file" id="r_face" name="r_face" style="display:none;" /><span id="r_face_src"></span></li>');
			r_html.push('      </ul>  ');
			r_html.push('    </div>');
			r_html.push('    <input type="button" class="e_submit" style="width:200px;" value="提交个人信息" />');
			r_html.push('</div>');
			r_html = r_html.join('');
			//登陆框弹出层	
			setTimeout(function(){
				_that.reg_Pop_obj = $_Pop.create_pop({
					title : '修改个人资料~想改啥就填啥',
					container : $(document.body) , 
					css_ini : {'z-index':'101','position':'absolute','width':'700px','top':'-500px','left':'0px'} ,
					content : r_html,
					callback : function(pop_obj){
						pop_obj.animate({
			                top		:'0px',
			                opacity	:'show'
			            }, 'slow');
					}
				});

				_that.upload_photo_src = {};
				$("#r_face").uploadify({
	                'method'        : 'post',
	                'fileTypeExts' 	: '*.gif; *.jpg; *.png',
	                'formData'      : {'action' : 'upload'},
	                'buttonText' 	: '上传头像',
	                'width' 		: 60,
	                'height' 		: 15,
	                'swf'           : WEB_ROOT + 'plugin/uploadify/uploadify.swf',
	                'uploader'      : WEB_ROOT + 'api/index/add.php',
	                'onUploadSuccess' : function(file, data, response) {
	                	try{
	                		var data = eval('('+ data +')');
	                		$('#r_face_src').text(data.compress_src);
	                	}catch(e){
	                		SpaceUI.alert('上传失败，请检查图片格式');
	                	}
	                }
	            });

	            //	绑定提交事件
	            $('.reg_container').delegate('.e_submit' , 'click' , function(){
	            	_that.submit_edit();
	            });
	            $_Helper.top_loading_done();
			} , 800);
		},
		//	提交修改
		submit_edit : function(){
			var _that = this;
			var data = {
				action		:'edit',
				password 	: $('#r_pass').val(),
				desc 		: $('#r_desc').val(),
				face 		: $('#r_face_src').text(),
				tqq 		: $('#r_tqq').val(),
				weibo 		: $('#r_weibo').val()
			};
			$.post(WEB_ROOT + 'api/index/profile.php' , data , function(back){
				if(back){
					$_Pop.close_flash(_that.reg_Pop_obj);
					//window.location.reload();
					$_Pop.create_pop({
						title : '闲话多说~',
						container : $(document.body) , 
						css_ini : {'z-index':'101','position':'absolute','width':'200px','top':'200px'} ,
						content : '恭喜注册成功，登陆账号吧~',
						close_time : 2000,
						show_min : false,
						show_close : false,
						close_callback : function(pop_obj){
							if( typeof $_Index == 'object' ){
								$_Index.ini();
							}
						}
					});
				}
			});
		},
		/**
		 * 	取最新注册用户
		 */
		JoinLastRegHtml : function(data){
			var l_html = [];
			l_html.push('<div style="text-align:left;margin-top:2px;background:#E3E3E3;width:260px;overflow:hidden;">');
			l_html.push('      <ul>');
			l_html.push('        <li>用户：<a href="http://xiaoqiqiu.com/'+ data.username +'" target="_blank"><img src="'+ data.face +'" width="35px" height="30px"/>'+ data.username +'</a></li>');
			l_html.push('        <li>自我介绍：'+ data.desc +'</li>');
			l_html.push('        <li>注册时间：'+ SpaceUI.Helper.format_time(data.reg_time , 'lasttime') +'</li>');
			l_html.push('      </ul>');
			l_html.push('</div>');
			l_html = l_html.join('');
			return l_html;
		},
		lastReg : function(){
			var _that = this;
			$.getJSON(WEB_ROOT +'api/index/profile.php?action=lastReg&num=10' , function(back){
				if(back){
					if(typeof back != 'object')return;
					var lr_html = '';
					for(var i in back){
						if(typeof back[i].username == 'undefined')continue;
						lr_html += _that.JoinLastRegHtml(back[i]);
					}

					_that.reg_Pop_obj = $_Pop.create_pop({
						title : '新注册用户~',
						container : $(document.body) , 
						css_ini : {'z-index':'101','position':'fixed','_position':'absolute','width':'300px','height':'150px','bottom':'-100px','right':'0px'} ,
						content : '<div id="lRMContainer" style="text-align:left;"></div>',
						move_type 	:'self',
						is_move		:false,
						show_min	:false,
						callback : function(pop_obj){
							var op = {
								f_container : $('#lRMContainer'),
								content : lr_html,
								direction:'left',
								c_id : 'lastRegMarquee',
								speed : 3,
								c_height		:'80px' ,				//	外层容器样式
								c_width			:'260px',				//	外层容器样式
								c_top			:'48px',				//	外层容器样式
								c_left			:'20px'
							}
							XQQ.marquee(op).init();

							pop_obj.animate({
				                bottom	:'30px',
				                opacity	:'show'
				            }, 'slow');
						},
						close_callback : function(){
							$_Helper.setCookie('newRegPop', 1, 'h6');
						}
					});
				}
			});
		}
	};
	
	if( $_Helper.getCookie('newRegPop') != 1 ){
		Profile().lastReg();
	}
	//	global
	return Profile;
})(jQuery);