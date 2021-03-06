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
	var Add = {
		acol_editor : {},
		upload_photo_src : {},
		upload_pop : null,
		rad : 0,
		ini : function(content_data , aid){
			var _that = this,
				content_data = content_data || '',
				aid = aid || 0;
			if(typeof content_data != 'string')content_data = '';
			content_data = content_data.replace('\"', '"');
			content_data = content_data.replace('\/', '/');

			if($('#file_upload').length > 0){
				if( typeof $_BsAdd.acol_editor.document != 'undefined' ){
					this.insert_editor(content_data);
				}
				return;		//	不能重复生成
			}

			$_Helper.bs_top_loading();

			this.rad = Math.random();
			var add_html = '<input type="file" name="file_upload" id="file_upload" style="display:none;"/>\
				<div id="add_editor_'+ this.rad +'">'+ content_data +'</div>';

			var e_width 		= 860,
				e_height 		= 400;
			$_BsPop.set({
				btn1 		: 'Close',
				btn2		: '提交',
				btn2_click  : function(){
					$_BsAdd.submit(aid);
				},
				title 		: '原图欣赏',
				content 	: add_html,
				width 		: e_width,
				callback 	: function(){
					$('#myModal').off('click.dismiss.bs.modal');	//层外点击关闭事件去掉

					$_Helper.require(['ckeditor'] , function(){
						$_BsAdd.acol_editor = CKEDITOR.replace( 'add_editor_'+ _that.rad,
						{
							toolbar :
							[
								['Flash'],
								['Link', 'Font', 'FontSize'],
								['Bold', 'Italic', 'Underline' , 'Strike', 'TextColor','BGColor' , '-', 'Outdent' , 'Indent' , 'JustifyLeft','JustifyCenter','JustifyRight', '-', 'RemoveFormat'],
								['Smiley','insertcode']
							],
							height : e_height,
							width : e_width,
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

						$_Helper.require([WEB_ROOT +'plugin/uploadify/jquery.uploadify-3.1.min.js'] , function(){

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
					                    $_BsAdd.upload_photo_src[data.img_name] = data.compress_src;
					                    var img_html = '<img class="comp_img" title="点击查看原图" src="'+ data.compress_src +'"/>';
					                    $_BsAdd.append_editor(img_html);
				                	}catch(e){
				                		SpaceUI.alert('上传失败，请检查图片格式');
				                	}
				                }
				            });
				        });

			            $_Helper.bs_top_loading_done();
					});
				}	
			});
			
		},
		//	写入编辑器
		append_editor : function(html){
			this.acol_editor.document.getBody().appendHtml(html);
		},
		//	写入编辑器
		insert_editor : function(html){
			this.acol_editor.document.getBody().setHtml(html);
		},

		//	取编辑器内容	
		get_editor_content : function(){
			if( SpaceUI.Helper.is_empty_obj($_BsAdd.acol_editor) )return;
			var editor_content =  $_BsAdd.acol_editor.getData();
			editor_content = SpaceUI.Helper.strip_tags(editor_content , '<span><p><img><font><br><object><param><embed><b><i><u><s><font><em><strong><del><strike><a><pre>');
			//	过滤a标签留下a标签里的文字
			//editor_content = editor_content.replace(/<a[^>]*>/gi , '').replace(/<\/a>/ig,'');
			return editor_content;
		},
		flash_upload : function(){
			var _that = this;

			//var flash_url = window.prompt("插入视频","请在此输入视频地址");
			SpaceUI.pop({
				text:'<p>请在此输入视频地址: <input type="text" size="60" id="acol_flv_url" /></p>',
				yes:{
					'text':'确定',
					callback:function(){
						var flash_url = $('#acol_flv_url').val();
						if( flash_url ){
							var f_html = ParseSWF.parse_url('acol_flash_'+ _that.rad ,flash_url);
							if(f_html){
								var ed_html = _that.get_editor_content();
								if(/<object[^>]*>/.test(ed_html)){
									SpaceUI.alert('不能放置多个视频');
									return false;
								}
								_that.append_editor(f_html);
							}
						}

					}
				},
				css:{width:'500px'},
				container_id:'myModal',
				is_cover:false,
				iframe:'<iframe scrolling="no" frameborder="0" src="about:blank" style="filter:Alpha(opacity=0);position: absolute; z-index: -1; right:0px; top:0px; width: 700px; height: 300px;" id="pop_iframe'+ Math.random() +'"></iframe>'
			});
			
		},
		submit : function(aid){
			var content = $_BsAdd.get_editor_content(),
				photo_data = $_Helper.obj2str($_BsAdd.upload_photo_src);
			if(SpaceUI.Helper.trim(content) == ''){
				SpaceUI.alert('不能提交空文');
				return false;
			}
			//	重置lazyload标识
			//content = content.replace(/lazyload="0"/ig , 'lazyload="1"');

			$.post(WEB_ROOT + 'api/index/add.php' , {action:'submit', user:USER, photo:photo_data, content:content, aid:aid} , function(back){
				if(back){
					var data = eval('('+ back +')');
					if(data.status == 'success'){
						if(aid > 0){
							//	如果是修改，则移除原来的
							$('.circle[aid='+ aid +']').remove();
						}
						$_BsAdd.insert_article(content , data.aid);

						$_BsAdd.acol_editor.document.getBody().appendHtml('');
						SpaceUI.alert('发表成功');
					}else{
						SpaceUI.alert(data.msg);
					}

					$_BsPop.close();
				}
			});
		},
		insert_article : function(content , aid){
			var a_html = [];
			a_html.push('<div class="circle radius" aid="'+ aid +'">');
			a_html.push('<a class="acticle-close" href="javascript:;" onfocus="this.blur();" onclick="$_BsAdd.del_article('+ aid +');return false;"> × </a>');
			a_html.push('<a class="acticle-edit" href="javascript:;" onfocus="this.blur();" onclick="$_BsAdd.edit_article('+ aid +');return false;"> + </a>');
			a_html.push('<div class="acticle-content">'+ content +'</div>');
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
						$('#pop_helper').click();
						_that.ini(back.data , aid);
					}
				});
			}
		}
	}
	window.$_BsAdd = Add;
})(jQuery);

//--><!]]>