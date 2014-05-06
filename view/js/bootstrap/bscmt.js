if( typeof XQQ == 'undefined' )XQQ = {};
XQQ.cmt = (function($){
	var Cmt = {
		rad : 0,
		acol_editor : {},
		//	评论html
		cmt_list_html : function(data, build, floors){
			if( typeof data == 'object' && typeof data.comment_user == 'undefined' ){
				//盖楼
				var comment_data_html = '',
					bnums = 0;
				
				for(var i in data){
					if(  typeof data == 'object'){
						bnums++;
						comment_data_html += this.cmt_list_html(data[i], true, bnums);	//递归盖楼
					}
				}
				for(var i=0; i<bnums; i++){
					comment_data_html += '</div>';
				}
				return comment_data_html;
			}

			var comment_data_html = [],
				floors = floors || 1;

			comment_data_html.push('<div class="comment_rows'+ (build ? '_build' : '') +' '+ (floors>5 ? 'fls-5' :'') +'">');
			comment_data_html.push('	<div class="comment_circle" style="text-align:left;">');
			if(IS_MINE != 0){
				if(typeof data.state != 'undefined' && data.state > 0){
					comment_data_html.push('	<em title="把它和谐掉，其它用户就看不到它了"><a href="javascript:;" onclick="XQQ.cmt.act_comment(this ,'+ data.id +', \'black\')">黑它</a></em>');
				}else{
					comment_data_html.push('	<em title="解除和谐"><a href="javascript:;" onclick="XQQ.cmt.act_comment(this ,'+ data.id +', \'light\')">(已被黑)亮它</a></em>');
				}
			}
			
			if(SpaceUI.Helper.trim(data.link) == ''){
				comment_data_html.push(floors +'.	[ '+ data.comment_user +' ]');
			}else{
				comment_data_html.push(floors +'.	[ <a href="'+ data.link +'" target="_blank">'+ data.comment_user +'</a> ]');
			}

			comment_data_html.push('	<span>'+ data.ip +'</span>');
			comment_data_html.push('	<span>'+ data.time +'</span>');

			//回复评论
			if( data.time != '刚刚' ){
				comment_data_html.push('	<a href="#cmt_name_'+ data.diary_id +'" onclick="XQQ.cmt.reply(\''+
				 data.comment_user +'\', '+ data.id +', '+ data.bid +', event)">回复该评论</a>');
			}

			comment_data_html.push('</div>');
			var color = '';
			if(typeof data.state != 'undefined' && data.state < 1){
				data.comment = '<strike>这条留言被河蟹咯</strike>';
				color = 'color:#00C;font-weight:bold;';
			}
			comment_data_html.push('<div class="comment_content radius" style="text-align: left;'+ color +'">'+ data.comment +'</div>');

			if( !build ){
				comment_data_html.push('</div>');
			}

			comment_data_html = comment_data_html.join('');
			return comment_data_html;

		},
		init : function(obj){
			//	加载CSS
			$_Helper.loadCss(STATIC_ROOT +'/css/comment.css');
			//if(!aid)return ;

			if($('#cmt_content_'+ aid).length > 0)return;

			$_Helper.bs_top_loading('努力加载中...');
			var obj = $(obj),
				aid = obj.attr('alt');
			//	拒绝显示相同评论窗
			/*if( $('#cmt_article_'+ aid).length > 0 ){
				return false;
			}*/
			this.rad = Math.random();
			var content_data = content_data || '',
				art_obj = obj.parent().parent().parent(),
				article = SpaceUI.Helper.str_cut(art_obj.find('.comment_content').text() , 100);
			var cmt_html = [];
				cmt_html.push('<div>');
				cmt_html.push('		<div id="cmt_article_'+ aid +'"><b title="'+ art_obj.find('.content').text() +'">'+ article +'</b></div>');
				cmt_html.push('	    <div id="cmt_content_'+ aid +'" class="cmt_content"><em>你是第一个留言的哦~</em></div>');
				cmt_html.push('		<div class="mod56_page page_theme_0">');
				cmt_html.push('			<div class="mod56_page_pn" id="acolPage_'+ aid +'" style="display:none;"></div>');
				cmt_html.push('		</div>');
				cmt_html.push('		<hr />');
				cmt_html.push('		<div style="text-align:left;margin: 5px 0;">');

				cmt_html.push('			<p><input onclick="XQQ.cmt.get_cmt_list(null , '+ aid +');" type="button" value="刷新评论"> <span class="float-right">引用<em id="quote_cmt"></em>的评论<a type="button" class="acticle-close" onclick="XQQ.cmt.cancel_reply();" title="取消对他的评论的引用">×</a></span> </p>');
				cmt_html.push('		<hr />');

				cmt_html.push('			昵称：<input id="cmt_name_'+ aid +'" class="span2" placeholder="您的昵称？必填" type="text" '+ (NICK_NAME != '' ? ' value="'+ NICK_NAME +'" ' : '') +' />');
				cmt_html.push('			网址：<input size="63" id="cmt_link_'+ aid +'" class="span2" placeholder="您的小站网址？可以在评论里外链，可不填" type="text" />');

				cmt_html.push('		<input type="hidden" id="reply_cmt" value="0" />');
				cmt_html.push('		<input type="hidden" id="reply_bid" value="0" />');

				cmt_html.push('		</div>');
				cmt_html.push('	<div id="comment_editor_'+ this.rad +'">'+ content_data +'</div>');
				cmt_html.push('		<button style="float:left;" onclick="XQQ.cmt.submit_cmt('+ aid +');">提交</button>');
				cmt_html.push('	</div>');
			cmt_html  = cmt_html.join('');
			//	取评论列表
			this.get_cmt_list(obj);
			var offset 	= obj.offset(),
				_that 	= this,
				cmt_top = offset.top - art_obj.height() - $(document).scrollTop();
			delete obj;
			delete art_obj;

			//登陆框弹出层	
			$('#pop_helper').click();
			$_BsPop.set({
				btn1 		: 'Close',
				title 		: '闲话多说~',
				content 	: cmt_html,
				style 		: {'width':700},
				callback 	: function(pop_obj){
					pop_obj.animate({
		                left	:'0px',
		                opacity	:'show'
		            }, 'slow');

		            $_Helper.require(['ckeditor'] , function(){

						//try{
							Cmt.acol_editor[aid] = CKEDITOR.replace( 'comment_editor_'+ _that.rad,
							{
								toolbar :
								[
									//['Flash'],
									['Bold', 'Italic', 'Underline' , 'Strike', 'TextColor','BGColor' , '-', 'RemoveFormat'],
									['Smiley','insertcode']
								],
								height : 200,
								width : 680,
								resize_enabled 	: false,
								//去掉左下角的body和p标签  
								removePlugins 	: 'elementspath',
								smiley_columns 	: 10,
								smiley_images  	: ['tuzki/tuzki_001.gif','tuzki/tuzki_002.gif','tuzki/tuzki_003.gif',
								'tuzki/tuzki_004.gif','tuzki/tuzki_005.gif','tuzki/tuzki_006.gif'
								,'tuzki/tuzki_007.gif','tuzki/tuzki_008.gif','tuzki/tuzki_009.gif','tuzki/tuzki_010.gif',
								'tuzki/tuzki_011.gif','tuzki/tuzki_012.gif','tuzki/tuzki_013.gif','tuzki/tuzki_014.gif',
								'tuzki/tuzki_015.gif','tuzki/tuzki_016.gif','tuzki/tuzki_017.gif','tuzki/tuzki_018.gif',
								'tuzki/tuzki_019.gif','tuzki/tuzki_020.gif','tuzki/tuzki_021.gif','tuzki/tuzki_022.gif',
								'tuzki/tuzki_023.gif','tuzki/tuzki_024.gif','tuzki/tuzki_025.gif','tuzki/tuzki_026.gif',
								'tuzki/tuzki_027.gif','tuzki/tuzki_028.gif','tuzki/tuzki_029.gif','tuzki/tuzki_030.gif',
								'tuzki/tuzki_031.gif','tuzki/tuzki_032.gif','tuzki/tuzki_033.gif','tuzki/tuzki_034.gif',
								'tuzki/tuzki_035.gif','tuzki/tuzki_036.gif','tuzki/tuzki_037.gif','tuzki/tuzki_038.gif',
								'tuzki/tuzki_039.gif','tuzki/tuzki_040.gif','tuzki/tuzki_041.gif','tuzki/tuzki_042.gif',
								'tuzki/tuzki_043.gif','tuzki/tuzki_044.gif','tuzki/tuzki_045.gif','tuzki/tuzki_046.gif',
								'tuzki/tuzki_047.gif','tuzki/tuzki_048.gif','tuzki/tuzki_049.gif','tuzki/tuzki_050.gif']
							});
						//}catch(e){}
			            $_Helper.bs_top_loading_done();
					});
				}

			});

		},
		//	评论列表
		get_cmt_list : function(obj, aid){
			var _that = this,
				obj = $(obj),
				row = 5,
				aid = aid || obj.attr('alt');
			//if($('#acolPage_'+ aid).length > 0)return;
			$.getJSON(WEB_ROOT + 'api/index/index.php' , {'action':'get_comment' , 'aid':aid , 'page':1, 'rows':row} , function(callback){
				if(callback){
					if(!callback)return;
					var comment_data_html = '';
					for(var i in callback.data){
						comment_data_html += _that.cmt_list_html(callback.data[i]);
					}
					/*var comment_html = comment_data_html;
					var pop_obj = $_Pop.create_pop({
						title : '评头论足',
						container : $('#container') , 
						css_ini : {'left':'40%','z-index':'101','position':'absolute','top':'240px'} ,
						content : comment_html
					});*/
					$('#cmt_content_'+ aid).html(comment_data_html);
					//	生成分页
					var page_option = {
	                    container_ID:'acolPage_'+ aid  , h_btn:'...' , f_btn:'首页' , l_btn:'尾页' , pre_btn:'上一页' , next_btn:'下一页' , 
	                    total_page:callback.max_page , page_showNums:3  , obj_name: 'acolPage_'+ aid ,
	                    callback:function(now_page){
	                    	$_Helper.bs_top_loading('努力加载中...');
	                        $.getJSON(WEB_ROOT + 'api/index/index.php' , {'action':'get_comment' , 'aid':aid , 'page': now_page, 'rows':row} , function(callback){
	                            if(callback){
	                                if(!callback)return;
									var comment_data_html = '';
									for(var i in callback.data){
										comment_data_html += _that.cmt_list_html(callback.data[i]);
									}
									$('#cmt_content_'+ aid).html(comment_data_html);
									$_Helper.bs_top_loading_done();
	                            }
	                        });
	                    }
	                };
	                window['acolPage_'+ aid] = new SpaceUI.Page(page_option);
				}
			});
		},

		//回复评论
		reply : function(user, pid, bid, e){
			//e.preventDefault();
			$('#reply_cmt').val(pid);
			$('#reply_bid').val(bid);
			$('#quote_cmt').text(user).parent().show();
		},

		//取消回复评论
		cancel_reply : function(){
			$('#reply_cmt').val(0);
			$('#reply_bid').val(0);
			$('#quote_cmt').text('').parent().hide();
		},

		//	取编辑器内容	
		get_editor_content : function(aid){
			if( SpaceUI.Helper.is_empty_obj(this.acol_editor[aid]) )return;
			var editor_content =  this.acol_editor[aid].getData();
			editor_content = SpaceUI.Helper.strip_tags(editor_content , '<span><p><img><font><br><object><param><embed><b><i><u><s><font><em><strong><del><strike><a><pre>');
			//	过滤a标签留下a标签里的文字
			//editor_content = editor_content.replace(/<a[^>]*>/gi , '').replace(/<\/a>/ig,'');
			return editor_content;
		},
		submit_cmt : function(aid){
			var content = this.get_editor_content(aid),
				_that = this;
			if(SpaceUI.Helper.trim(content) == ''){
				SpaceUI.alert('不能提交空文');
				return false;
			}
			//	字数限制
			if($_Helper.count_words(content) > 300){
				SpaceUI.alert('内容长度超过300字限制');
				return false;
			}
			var user = $('#cmt_name_'+ aid).val();
			if(SpaceUI.Helper.trim(user) == ''){
				SpaceUI.alert('昵称不能为空');
				return false;
			}

			var link = $('#cmt_link_'+ aid).val();
			var pid  = $('#reply_cmt').val();
			var bid  = $('#reply_bid').val();

			$.getJSON(WEB_ROOT + 'api/index/index.php' ,
			 {action:'insert_comment', aid:aid, pid:pid, bid:bid, link:link, content:content, user:user}
			  , function(back){
				if(back){
					if(back.status == 'success'){
						SpaceUI.alert({head:'评论成功' , timeout:1000 ,yes:{text:'确定'} ,is_cover:false});
						_that.acol_editor[aid].setData('');
						//	insert
						var data = {
							comment_user 	: user,
							ip 				: '',
							time 			: '刚刚',
							comment 		: content,
							link 			: link,
							state 			: 1
						};
						$('#cmt_content_'+ aid).append(_that.cmt_list_html(data));
					}else{
						SpaceUI.alert(back.msg);
					}
				}
			});
		},
		//	黑亮评论
		act_comment : function(obj , cid , act){
			$.getJSON(WEB_ROOT + 'api/index/index.php' , {action:'black_comment', cid:cid, act:act} , function(back){
				if(back){
					if(back.res){
						if(act == 'black'){
							$(obj).replaceWith('<a href="javascript:;" onclick="XQQ.cmt.act_comment(this ,'+ cid +', \'light\')">(已被黑)亮它</a>');
						}else{
							$(obj).replaceWith('<a href="javascript:;" onclick="XQQ.cmt.act_comment(this ,'+ cid +', \'black\')">黑它</a>');
						}
					}else{
						SpaceUI.alert('操作失败。。');
					}
				}
			});
		}
	};

	return Cmt;
})(jQuery);