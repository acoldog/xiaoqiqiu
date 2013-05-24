<!--//--><![CDATA[//><!--
/*
*
*		pop_html			弹出层默认的容器HTML，主要表现是一个圆角外框
*		create_Pop			创建弹层函数
*		flash_down			弹层下落动画函数
*		close_flash			弹层和遮罩层关闭函数
*		bottom_item_num		当前存在的弹层数量
*		flash_to_bottom		弹层缩小到底部右下角动画函数
*		flash_revert_from_bottom	缩小的弹层恢复到原状态函数
*/
(function($){
	var $_Add = {
		acol_editor : {},
		upload_photo_src : {},
		upload_pop : null,
		rad : 0,
		ini : function(content_data , aid){
			if(typeof CKEDITOR == 'undefined'){
				$_Helper.require(['ckeditor']);			//	载入JS文件
			}

			if($('#file_upload').length > 0)return;		//	不能重复生成
			$('#top_loading').show();
			var _that = this,
				content_data = content_data || '',
				aid = aid || 0;
			if(typeof content_data != 'string')content_data = '';
			this.rad = Math.random();
			var add_html = '<input type="file" name="file_upload" id="file_upload" style="display:none;"/>\
				<div id="add_editor_'+ this.rad +'">'+ content_data +'</div><p style="margin-top:2px;"><button onclick="$_Add.submit('+ aid +');">提交</button></p>';
			//登陆框弹出层	
			$_Add.upload_pop = $_Pop.create_pop({
				title : '简简单单几行文字，一个视频，若干图片就很美',
				container : $(document.body) , 
				css_ini : {'z-index':'101','position':'absolute','width':'900px','top':'50px'} ,
				content : add_html,
				callback : function(){
					setTimeout(function(){
						$_Add.acol_editor = CKEDITOR.replace( 'add_editor_'+ _that.rad,
						{
							toolbar :
							[
								['Flash'],
								['Font', 'FontSize'],
								['Bold', 'Italic', 'Underline' , 'Strike', 'TextColor','BGColor' , '-', 'Outdent' , 'Indent' , 'JustifyLeft','JustifyCenter','JustifyRight', '-', 'RemoveFormat'],
								['Smiley','insertcode']
							],
							height : 400,
							width : 860,
							resize_enabled 	: false,
							//去掉左下角的body和p标签  
							removePlugins 	: 'elementspath',
							smiley_columns 	: 6,
							smiley_images  	: ['01.gif','02.gif','03.gif','04.gif','05.gif','06.gif'
							,'07.gif','08.gif','09.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif'
							,'16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif'
							,'24.gif','25.gif']
						});

						_that.upload_photo_src = {};
						$("#file_upload").uploadify({
			                'method'        : 'post',
			                'fileTypeExts' 	: '*.gif; *.jpg; *.png',
			                'formData'      : {'action' : 'upload'},
			                'buttonText' 	: '上传图片',
			                'width' 		: 80,
			                'height' 		: 30,
			                'swf'           : WEB_ROOT + 'plugin/uploadify/uploadify.swf',
			                'uploader'      : WEB_ROOT + 'api/index/add.php',
			                'onUploadSuccess' : function(file, data, response) {
			                	try{
			                		var data = eval('('+ data +')');
				                    $_Add.upload_photo_src[data.img_name] = data.compress_src;
				                    var img_html = '<img class="comp_img" title="点击查看原图" src="'+ data.compress_src +'"/>';
				                    $_Add.insert_editor(img_html);
			                	}catch(e){
			                		SpaceUI.alert('上传失败，请检查图片格式');
			                	}
			                }
			            });
			            $('#top_loading').hide();
					} , 2000);
				}
			});
			
		},
		//	写入编辑器
		insert_editor : function(html){
			this.acol_editor.document.getBody().appendHtml(html);
		},
		//	取编辑器内容	
		get_editor_content : function(){
			if( SpaceUI.Helper.is_empty_obj($_Add.acol_editor) )return;
			var editor_content =  $_Add.acol_editor.getData();
			editor_content = SpaceUI.Helper.strip_tags(editor_content , '<span><p><img><font><br><object><param><embed><b><i><u><s><font><em><strong><del><strike><a><pre>');
			//	过滤a标签留下a标签里的文字
			//editor_content = editor_content.replace(/<a[^>]*>/gi , '').replace(/<\/a>/ig,'');
			return editor_content;
		},
		flash_upload : function(){
			var _that = this;
			var add_html = '<input type="text" id="flash_url" style="width:360px;" />&nbsp;&nbsp;<button id="flash_url_btn">确认</button>';
			//登陆框弹出层	
			var now_Pop_obj = $_Pop.create_pop({
				title : '插入视频 - 每篇日记仅限一个',
				container : $(document.body) , 
				css_ini : {'z-index':'102','position':'absolute','width':'500px','top':'210px'} ,
				content : add_html,
				callback : function(obj){
					$('#flash_url').focus();
					$('#flash_url_btn').bind('click' , function(){
						var flash_url = $('#flash_url').val();
						var f_html = ParseSWF.parse_url('acol_flash_'+ _that.rad ,flash_url);
						if(f_html){
							var ed_html = _that.get_editor_content();
							if(/<object[^>]*>/.test(ed_html)){
								SpaceUI.alert('不能放置多个视频');
								return false;
							}
							_that.insert_editor(f_html);
							obj.remove();
						}
					});
				}
			});
		},
		submit : function(aid){
			var content = $_Add.get_editor_content(),
				photo_data = $_Helper.obj2str($_Add.upload_photo_src);
			if(SpaceUI.Helper.trim(content) == ''){
				SpaceUI.alert('不能提交空文');
				return false;
			}
			//	重置lazyload标识
			//content = content.replace(/lazyload="0"/ig , 'lazyload="1"');

			$_Pop.close_flash($_Add.upload_pop);
			$.post(WEB_ROOT + 'api/index/add.php' , {action:'submit', user:USER, photo:photo_data, content:content, aid:aid} , function(back){
				if(back){
					var data = eval('('+ back +')');
					if(data.status == 'success'){
						if(aid > 0){
							//	如果是修改，则移除原来的
							$('.circle[aid='+ aid +']').remove();
						}
						$_Add.insert_article(content , data.aid);
						SpaceUI.alert('发表成功');
					}else{
						SpaceUI.alert(data.msg);
					}
				}
			});
		},
		insert_article : function(content , aid){
			var a_html = [];
			a_html.push('<div class="circle radius" aid="'+ aid +'">');
			a_html.push('<a class="close" href="javascript:;" onfocus="this.blur();" onclick="$_Add.del_article('+ aid +');return false;"> × </a>');
			a_html.push('<a class="edit" href="javascript:;" onfocus="this.blur();" onclick="$_Add.edit_article('+ aid +');return false;"> + </a>');
			a_html.push('<div class="content">'+ content +'</div>');
			a_html.push('	<div class="comment_div">');
			a_html.push('		<span class="comment"><a href="javascript:;" alt="'+ aid +'" onclick="return false;" >我有想法(0)</a></span>');
			a_html.push('	</div>');
			a_html.push('</div>');
			a_html = a_html.join('');//console.log(a_html)
			$('#content').prepend(a_html);
		},

		/**
		*	删除文章
		*/
		del_article : function(aid){
			if(confirm('是否删除?')){
				$.getJSON(WEB_ROOT + 'api/index/add.php' , {action:'del', user:USER, aid:aid} , function(back){
					if(back){
						if(typeof back.status != 'undefined' && back.status == 'success'){
							var that_obj = $('#content').find('.circle[aid='+ aid +']');
							that_obj.next('.left_shadow').remove();
							that_obj.remove();
							SpaceUI.alert('删除成功');
						}
					}
				});
			}
		},
		/**
		*	修改文章
		*/
		edit_article : function(aid){
			var _that = this;
			if(confirm('是否修改?（含视频的暂不支持修改）')){
				$.getJSON(WEB_ROOT + 'api/index/add.php' , {action:'edit', user:USER , aid:aid} , function(back){
					if(back){
						_that.ini(back.data , aid);
					}
				});
			}
		}
	}
	window.$_Add = $_Add;
})(jQuery);

//--><!]]>