if( typeof XQQ == 'undefined' )XQQ = {};
XQQ.bsProfile = (function($){
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
			if($('#reg_container').length > 0)return;		//	不能重复生成

			$_Helper.bs_top_loading('努力加载中...');
			var _that = this;
			var r_html = [];
			r_html.push('<div id="reg_container" class="reg_container">');
			r_html.push('    <div class="reg_right" style="text-align: left;">');

			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <div class="input-append">');
			r_html.push('      <input id="r_username" class="span2" placeholder="请输入用户名,用户名只支持字母和数字" type="text">');
			r_html.push('      <span class="add-on hide">^_^</span>');
			r_html.push('    </div>');
			r_html.push('  </div>');
			r_html.push('</div>');
			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <div class="input-append">');
			r_html.push('      <input id="r_pass" class="span2" placeholder="请输入密码" type="password">');
			r_html.push('      <span class="add-on hide">^_^</span>');
			r_html.push('    </div>');
			r_html.push('  </div>');
			r_html.push('</div>');
			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <div class="input-append">');
			r_html.push('      <input id="r_desc" class="span2" placeholder="请输入小站简介" type="text">');
			r_html.push('      <span class="add-on hide">^_^</span>');
			r_html.push('    </div>');
			r_html.push('  </div>');
			r_html.push('</div>');
			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label" for="input01"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <input id="r_weibo" type="text" placeholder="新浪微博组件代码。没有，或者不会弄可不填" class="input-xlarge">');
			r_html.push('  </div>');
			r_html.push('</div>');
			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label" for="input01"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <input id="r_tqq" type="text" placeholder="腾讯微博组件代码。没有，或者不会弄可不填" class="input-xlarge">');
			r_html.push('  </div>');
			r_html.push('</div>');
			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label" for="input01"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <input id="r_xiami" type="text" placeholder="虾米播放器代码。没有，或者不会弄可不填" class="input-xlarge">');
			r_html.push('  </div>');
			r_html.push('</div>');

			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label" for="input01"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <input id="r_face" name="r_face" type="file" style="display:none;" />');
			r_html.push('    <p class="help-block"><img id="r_face_src" src="" style="width: 150px;height: 150px;"></p>');
			r_html.push('	 <p>说明：新浪微博和腾讯微博为选填，获取外接代码地址为：<a href="http://open.weibo.com/widgets?cat=wb" target="_blank">http://open.weibo.com/widgets?cat=wb</a> 和 <a href="http://dev.t.qq.com/websites/show/" target="_blank">http://dev.t.qq.com/websites/show/</a></p>');
			r_html.push('  </div>');
			r_html.push('</div>');

			r_html.push('    </div>');

			r_html.push('</div>');
			r_html = r_html.join('');
			
			//登陆框弹出层	
			$_BsPop.set({
				btn1 		: 'Close',
				btn2		: '提交注册信息',
				title 		: 'welcome to Join!',
				content 	: r_html,
				btn2_click  : XQQ.bsProfile().submit_reg
			});

			$_Helper.loadCss(WEB_ROOT +'plugin/uploadify/uploadify.css');

			$_Helper.require([WEB_ROOT +'plugin/uploadify/jquery.uploadify-3.1.min.js'] , function(){

				_that.upload_photo_src = {};
				$("#r_face").uploadify({
	                'method'        : 'post',
	                'fileTypeExts' 	: '*.gif; *.jpg; *.png',
	                'formData'      : {'action' : 'upload'},
	                'buttonText' 	: '上传头像',
	                'width' 		: 70,
	                'height' 		: 25,
	                'swf'           : WEB_ROOT + 'plugin/uploadify/uploadify.swf',
	                'uploader'      : WEB_ROOT + 'api/index/add.php',
	                'onUploadSuccess' : function(file, data, response) {
	                	try{
	                		var data = eval('('+ data +')');
	                		//$('#r_face').val(data.compress_src);
	                		$('#r_face_src').attr('src' , data.compress_src);
	                	}catch(e){
	                		SpaceUI.alert('上传失败，请检查图片格式');
	                	}
	                }
	            });
			});

			$_Helper.bs_top_loading_done();

			//绑定验证事件
			$('#reg_container').find('input').bind('blur', function(){
				CheckProfile.reg_submit_check($(this));
			});
		},

		//	提交注册
		submit_reg : function(){
			var _that = this,
				username = $('#r_username').val();
			
			var r_tqq 	= $('#r_tqq').val(),
				r_weibo = $('#r_weibo').val(),
				r_xiami = $('#r_xiami').val();
			/*if( r_tqq == '微博主键代码，没有可不填' ){
				r_tqq = '';
			}
			if( r_weibo == '微博主键代码，没有可不填' ){
				r_weibo = '';
			}*/

			var data = {
				action		:'reg',
				username 	: username,
				password 	: $('#r_pass').val(),
				desc 		: $('#r_desc').val(),
				face 		: $('#r_face_src').attr('src'),
				tqq 		: r_tqq,
				weibo 		: r_weibo,
				xiami 		: r_xiami
			};
			$.post(WEB_ROOT + 'api/index/profile.php' , data , function(back){
				if(back){
					var back = eval('('+ back +')');

					if(back.status == 'success'){
						$_BsPop.set({
							btn1 		: 'Close',
							title 		: '闲话多说~',
							content 	: '<h1 style="margin:20px 40px;"> '+ username +'  <br /> 恭喜注册成功，登陆账号吧~  </h1>',
							callback    : function(){
								setTimeout(function(){
									$('#login_btn').click();
								} , 2000);
							}
						});
					}else{
						SpaceUI.alert(back.msg);
					}
				}
			});
		},


		//	修改资料
		edit : function(){
			if($('.reg_container').length > 0)return;		//	不能重复生成

			$_Helper.bs_top_loading('努力加载中...');
			var _that = this;

			var r_html = [];
			r_html.push('<div class="tabbable" id="tabs-edit">');
			r_html.push('  <ul class="nav nav-tabs">');
			r_html.push('    <li class="active">');
			r_html.push('      <a href="#panel-867432" data-toggle="tab">修改基本资料</a>');
			r_html.push('    </li>');
			r_html.push('    <li>');
			r_html.push('      <a href="#panel-392875" data-toggle="tab">开发中</a>');
			r_html.push('    </li>');
			r_html.push('  </ul>');
			r_html.push('  <div class="tab-content">');
			r_html.push('  <div class="tab-pane active" id="panel-867432">');
			
			r_html.push('<b>修改内容即时保存无需提交，修改好请刷新小站页面</b>');
			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <div class="input-append">');
			r_html.push('      <input size="60" id="r_nickname" class="span2" placeholder="添加昵称后可以使用昵称进行登录" type="text">');
			r_html.push('      <span class="add-on hide">^_^</span>');
			r_html.push('    </div>');
			r_html.push('  </div>');
			r_html.push('</div>');
			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <div class="input-append">');
			r_html.push('      <input size="60" id="r_pass" class="span2" placeholder="请输入新密码" type="password">');
			r_html.push('      <span class="add-on hide">^_^</span>');
			r_html.push('    </div>');
			r_html.push('  </div>');
			r_html.push('</div>');
			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <div class="input-append">');
			r_html.push('      <input size="60" id="r_desc" class="span2" placeholder="修改小站简介" type="text">');
			r_html.push('      <span class="add-on hide">^_^</span>');
			r_html.push('    </div>');
			r_html.push('  </div>');
			r_html.push('</div>');
			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <div class="input-append">');
			r_html.push('      <input size="60" id="r_weibo" class="span2" placeholder="修改新浪微博组件代码" type="text">');
			r_html.push('      <span class="add-on hide">^_^</span>');
			r_html.push('    </div>');
			r_html.push('  </div>');
			r_html.push('</div>');
			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <div class="input-append">');
			r_html.push('      <input size="60" id="r_tqq" class="span2" placeholder="修改腾讯微博组件代码" type="text">');
			r_html.push('      <span class="add-on hide">^_^</span>');
			r_html.push('    </div>');
			r_html.push('  </div>');
			r_html.push('</div>');
			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <div class="input-append">');
			r_html.push('      <input size="60" id="r_xiami" class="span2" placeholder="修改虾米播放器代码" type="text">');
			r_html.push('      <span class="add-on hide">^_^</span>');
			r_html.push('    </div>');
			r_html.push('  </div>');
			r_html.push('</div>');

			r_html.push('<div class="control-group">');
			r_html.push('  <label class="control-label" for="input01"></label>');
			r_html.push('  <div class="controls">');
			r_html.push('    <input size="60" id="r_face" name="r_face" type="file" style="display:none;" />');
			r_html.push('    <p class="help-block"><img id="r_face_src" src="" style="width: 150px;height: 150px;"></p>');
			r_html.push('	 <p>说明：新浪微博和腾讯微博为选填，获取外接代码地址为：<a href="http://open.weibo.com/widgets?cat=wb" target="_blank">http://open.weibo.com/widgets?cat=wb</a> 和 <a href="http://dev.t.qq.com/websites/show/" target="_blank">http://dev.t.qq.com/websites/show/</a></p>');
			r_html.push('  </div>');
			r_html.push('</div>');


			r_html.push('  </div>');
			r_html.push('  <div class="tab-pane" id="panel-392875">');
			r_html.push('    <p>');
			r_html.push('      开发中.');
			r_html.push('    </p>');
			r_html.push('  </div>');
			r_html.push('</div>');
			r_html = r_html.join('');

			//登陆框弹出层	
			$_BsPop.set({
				btn1 		: 'Close',
				title 		: '修改个人资料~想改啥就填啥',
				content 	: r_html
			});

			$_Helper.loadCss(WEB_ROOT +'plugin/uploadify/uploadify.css');

			$_Helper.require([WEB_ROOT +'plugin/uploadify/jquery.uploadify-3.1.min.js'] , function(){

				_that.upload_photo_src = {};
				$("#r_face").uploadify({
	                'method'        : 'post',
	                'fileTypeExts' 	: '*.gif; *.jpg; *.png',
	                'formData'      : {'action' : 'upload'},
	                'buttonText' 	: '上传头像',
	                'width' 		: 70,
	                'height' 		: 25,
	                'swf'           : WEB_ROOT + 'plugin/uploadify/uploadify.swf',
	                'uploader'      : WEB_ROOT + 'api/index/add.php',
	                'onUploadSuccess' : function(file, data, response) {
	                	try{
	                		var data = eval('('+ data +')');
	                		//$('#r_face').val(data.compress_src);
	                		$('#r_face_src').attr('src' , data.compress_src);
	                		//直接发请求保存
	                		$.getJSON(WEB_ROOT + 'api/index/profile.php?action=edit', {face:data.compress_src});
	                	}catch(e){
	                		SpaceUI.alert('上传失败，请检查图片格式');
	                	}
	                }
	            });
			});

			
			//绑定验证事件
			$('#tabs-edit').find('input').bind('blur', function(){
				CheckProfile.reg_submit_check($(this), 'edit');
			});

			$_Helper.bs_top_loading_done();

		},
		//	提交修改
		/*submit_edit : function(){
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
		},*/
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

					$('#pop_helper').click();
					//$('.modal-backdrop').remove();
					//$(document.body).removeClass('modal-open');

					_that.reg_Pop_obj = $_BsPop.set({
						title 		: '新注册用户~',
						content 	: '<div id="lRMContainer" style="text-align:left;"></div>',
						style 		: {'z-index':'101','position':'fixed','_position':'absolute','width':'300px','height':'200px','top':'500px','right':'50px'},
						callback : function(pop_obj){

							var op = {
								f_container : $('#lRMContainer'),
								content : lr_html,
								direction:'left',
								c_id : 'lastRegMarquee',
								speed : 3,
								c_height		:'100px' ,				//	外层容器样式
								c_width			:'260px',				//	外层容器样式
								c_top			:'48px',				//	外层容器样式
								c_left			:'20px'
							}

							$_Helper.require(['marquee'] , function(){
								XQQ.marquee(op).init();
							});
							
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

	//验证表单事件
	var CheckProfile = {

		reg_submit_check : function(obj, exec){
			var ipt_obj  	= $(obj),
				sign_obj 	= ipt_obj.parent().find('.add-on'),
				check_type 	= ipt_obj.attr('id'),
				check_text 	= ipt_obj.val();

			switch(check_type){
				case 'r_weibo':
				case 'r_tqq':
				case 'r_xiami':

					if(exec && exec == 'edit'){
						//直接发请求保存
		                $.post(WEB_ROOT + 'api/index/profile.php?action=edit&'+ check_type
		                		+'='+ encodeURIComponent(check_text), function(){
		                			sign_obj.removeClass('hide');
		                		});
		            }
					break;
				default:
					if( typeof this['check_'+ check_type] == 'function' 
						&& this['check_'+ check_type]( check_text ) ){
						sign_obj.removeClass('hide');

						if(exec && exec == 'edit'){
							//直接发请求保存
	                		$.getJSON(WEB_ROOT + 'api/index/profile.php?action=edit&'+ check_type
	                			+'='+ check_text);
						}
					}else{
						sign_obj.addClass('hide');
					}
					break;
			}

		},

		//######验证方法
		check_r_nickname : function(t){
			return SpaceUI.Helper.str_len(t) < 50;
		},
		//验证用户名
		check_r_username : function(t){
			if(t == '请输入用户名,用户名只支持字母和数字')return false;

			return /[a-zA-Z0-9]+/.test(t) && SpaceUI.Helper.str_len(t) <= 8;
		},
		check_r_pass : function(t){
			if(t == '请输入密码')return false;

			return /[a-zA-Z0-9]+/.test(t) && SpaceUI.Helper.str_len(t) <= 12;
		},
		check_r_desc : function(t){
			if(t == '请输入小站简介')return false;

			return SpaceUI.Helper.str_len(t) > 0 && SpaceUI.Helper.str_len(t) <= 50;
		}
	};
	
	/*if( $_Helper.getCookie('newRegPop') != 1 ){
		Profile().lastReg();
	}*/
	//	global
	return Profile;
})(jQuery);