
(function(){

	/**
	*	弹层遮罩(不能同时产生两个弹窗，会被覆盖)
	*/
	var Pop = {
		yes : function(){},
		no : function(){},
		timeout_T:undefined,
		//	op = {id , classname, title , head , text:[col1,col2,col3...] , yes:{text , callback} , no:{text , callback} ,timeout ,fadeTime ,style , is_draw , is_scroll , close_btn , css:{height,width,left,top}}
		/**
		 * [get_pop_html description]
		 * @param  {[object]} op [配置参数集合]
		 * @param  {[string]} op.id [容器的ID值]
		 * @param {[string]} op.classname [容器自定义的classname]
		 * @param {[string]} op.title [标题]
		 * @param  {[string]} op.head [字体较大居中部分文字]
		 * @param  {[string / array]} op.text	[字体较小主体部分文字]
		 * @param {[string / object]} op.yes [确认按钮]
		 * @param {[string / object]} op.no [取消按钮]
		 * @param {[int]} timeout [可以设置弹层自动消失时间]
		 * @param {[int]} fadeTime [可以设置遮罩淡出时间]
		 * @param {[string]} style [设置内容部分的容器样式，格式为CSS]
		 * @param {[boolean]} is_draw [是否允许拖动]
		 * @param {[string]} [close_btn] [默认显示，hide:隐藏]
		 * @param {[boolean]}[is_cover]		[是否显示遮罩，默认显示]
		 * @param {[int]}	op.top  [弹层top] 
		 * @return {[void]}    [description]
		 * 用例：
		 * SpaceUI.alert({
		 * 		title:'哈哈哈哈哈',
		 * 	 	is_scroll:false,
		 * 	  	css:{left:'100px',top:'10px'},
		 * 	   	yes:{text:'确定'}
		 * 	})
		 */
		get_pop_html : function(op){
			if(!op)return;
			
			this.yes = new Function(),this.no = new Function();
			//	自定义样式
			var style = width = height = '',
				is_scroll = true,
				left = false,
				top = 100;
			if(typeof op.style != 'undefined'){
				style = op.style;
			}
			if(typeof op.css != 'undefined'){
				if(typeof op.css.width != 'undefined'){
					width = 'width:'+ parseInt(op.css.width) +'px;';
				}
				if(typeof op.css.height != 'undefined'){
					height = 'height:'+ parseInt(op.css.height) +'px;';
				}
				if(typeof op.css.top != 'undefined'){
					top = op.css.top;
				}
				if(typeof op.css.left != 'undefined'){
					left = op.css.left;
				}
			}
			
			if(typeof op.is_scroll != 'undefined'){
				is_scroll = op.is_scroll;
			}
			var classname = this.check_str(op.classname)
			if( classname == ''){
				classname = 'confirm_pop';
			}

			var pop_html = [];
			pop_html.push('<div class="win_pop '+ classname +'" id="'+ this.check_str(op.id) +'" style="margin:0px;z-index:100000;'+ width +';">');
			pop_html.push('    <div id="spaceUI_container" class="win_pop_in" style="'+ height  + style +'">');
			//	头部
			if(typeof op.title != 'undefined' || typeof op.close_btn == 'undefined' || op.close_btn != 'hide'){
				pop_html.push('		   <div class="win_pop_hd">');
				if(typeof op.title != 'undefined'){
					pop_html.push('			   <h3>'+ op.title +'</h3>');
				}
				if(typeof op.close_btn == 'undefined' || op.close_btn != 'hide'){
					pop_html.push('			   <a id="spaceUI_del" href="javascript:;" onclick="SpaceUI.hide_pop();return false;" class="close" title="关闭">关闭</a>');
				}
				pop_html.push('		   </div>');
			}
			//	主体内容
			pop_html.push('        <div class="win_pop_bd">');
			if(typeof op.head != 'undefined'){
				pop_html.push('            <p class="remind">'+ this.check_str(op.head) +'</p>');
			}

			if(typeof op.text == 'string'){
				pop_html.push(op.text);
			}else if(typeof op.text == 'object' && typeof op.text.sort != 'undefined'){
				for(var i in op.text){
					if(typeof op.text[i] == 'function')continue;
					pop_html.push('            <p class="txt">'+ this.check_str(op.text[i]) +'</p>');
				}
			}
			pop_html.push('        </div>');
			//	底部
			pop_html.push('        <div class="win_pop_ft">');
			if(typeof op.yes != 'undefined' || typeof op.no != 'undefined'){
				if(typeof op.yes != 'undefined'){
					if(typeof op.yes == 'string'){
						pop_html.push('            <a id="spaceUI_yes_btn" class="btn_s1" href="javascript:;" onclick="SpaceUI.hide_pop();return false;"><span>'+ op.yes +'</span></a>');
					}else{
						this.check_func(op.yes.callback , 'y');
						pop_html.push('            <a id="spaceUI_yes_btn" class="btn_s1" href="javascript:;" onclick="SpaceUI.yes();SpaceUI.hide_pop();return false;"><span>'+ this.check_str(op.yes.text) +'</span></a>');
					}
				}

				if(typeof op.no != 'undefined'){
					if(typeof op.no == 'string'){
						pop_html.push('<a id="spaceUI_no_btn" class="btn_s2" href="javascript:;" onclick="SpaceUI.hide_pop();return false;"><span>'+ op.no +'</span></a>');
					}else{
						this.check_func(op.no.callback , 'n');
						pop_html.push('<a id="spaceUI_no_btn" class="btn_s2" href="javascript:;" onclick="SpaceUI.no();SpaceUI.hide_pop();return false;"><span>'+ this.check_str(op.no.text) +'</span></a>');
					}
				}
			}
			pop_html.push('        </div>');
			pop_html.push('    </div>');
			pop_html.push('    <div class="win_pop_bg"></div>');

			//加个iframe为了遮住flash或者其它iframe
			if( typeof op.iframe != 'undefined' ){
				pop_html.push(op.iframe);
			}

			pop_html.push('</div>');
			pop_html = pop_html.join('');

			if($('#'+ op.id).length > 0){
				$('#'+ op.id).remove();
			}else if($('#spaceUI_container').length > 0 && $('#spaceUI_container').parent().attr('class').indexOf('win_pop') != -1){
				$('#spaceUI_container').parent().remove();
			}
			
			//	生成遮罩
			if(op.is_cover !== false)
				this.cover('SpaceUI_cover');

			if(typeof op.container_id != 'undefined'){
				$('#'+ op.container_id).append(pop_html);
			}else{
				$(document.body).append(pop_html);
			}
			
			//	各种绑定
			$(document).bind('keydown' , SpaceUI.pop_keydown);	//	默认回车yes
			var pop_obj = $('#spaceUI_container').parent();
			//	设置left
			if(pop_obj.attr('class').indexOf('win_pop') != -1){
				if(!left){
					this.set_align_center(pop_obj);		//	居中
				}else{
					pop_obj.css('left' , left);
				}
			}
			//	设置top
			var top = top + $(window).scrollTop();
			pop_obj.css('top' , top);
			//	自动消失
			if(typeof op.timeout != 'undefined'){
				var fadeTime = typeof op.fadeTime!='undefined' ? op.fadeTime : 800;
				clearTimeout(SpaceUI.timeout_T);
				SpaceUI.timeout_T = setTimeout(function(){Pop.hide_pop(fadeTime);} , parseInt(op.timeout));
			}
			if(typeof op.is_draw != 'undefined' && op.is_draw){
				//	拖拽事件
				pop_obj.find('.win_pop_hd').css('cursor' , 'move').bind('mousedown' , function(e){
					Pop.bind_move(pop_obj ,e);
				});
			}
			// 随页面滚动
			if(is_scroll){
				this.bind_scroll(pop_obj);
			}
		},
		//校验返回字符串
		check_str : function(str){
			if(typeof str == 'string' && str != ''){
				return str;
			}else{
				return '';
			}
		},
		check_func : function(f , type){
			if(typeof f == 'function'){
				type == 'y' ? this.yes = f : this.no = f;
			}
			return '';
		},
		alert : function(op){
			if(typeof op == 'string'){
				op = {head:op , yes:{text:'确定'}};
			}
			this.get_pop_html(op);
		},
		//	通用弹层
		pop : function(op){
			this.get_pop_html(op);
		},
		//	隐藏去除当前弹窗
		hide_pop : function(fadeTime){
			var fadeTime = fadeTime || 0;
			var pop_obj = $('#spaceUI_container').parent();
			if( typeof pop_obj == 'object' && pop_obj.attr('class').indexOf('win_pop') != -1){
				pop_obj.remove();
				this.hide_cover(fadeTime);
			}
		},
		cover : function(id , op){
			var zIndex = 99999,
				color = '#000',
				opacity = 5;
			if(typeof op != 'undefined'){
				zIndex = op.zIndex || zIndex;
				color = op.color || color;
				opacity = op.opacity || opacity;
			}
			if(typeof id == 'undefined')id = 'acol_cover';

			if($('#'+ id).length > 0){
				$('#'+ id).css('height' , $(document).height()).show();
				return;
			}
			var pop_html = '<div id="'+ id +'" class="shade_div" style="position:fixed; top:0; left:0; width:100%; height:100%; background-color:'+ color +'; opacity:0.'+ opacity +'; filter:alpha(opacity='+ opacity +'0); z-index:'+ zIndex +'; _position:absolute; *zoom:1;">';
			pop_html += '<iframe scrolling="no" frameborder="0" src="about:blank" style="filter:Alpha(opacity=0);position: absolute; z-index: -3; right:0px; top:0px; width: 100px; height:100px;" id="'+ id +'_iframe"></iframe>';
			pop_html += '</div>';
			$(document.body).append(pop_html).find('#'+ id).css('height' , $(document).height()).find('#'+ id +'_iframe').css({'width':$(document).width() , 'height':$(document).height()});
		},
		hide_cover : function(fadeTime){
			if(fadeTime){
				$('#SpaceUI_cover').fadeOut(parseInt(fadeTime));
			}else{
				$('#SpaceUI_cover').hide();
			}
		},
		pop_keydown : function(e){
			var e = e || window.event;
			var k = e.keyCode || e.which || e.charCode;
			if(k == 13){
				var yes_btn = $('#spaceUI_yes_btn');
				if(yes_btn.length > 0){
					yes_btn.focus().click();
					$(document).unbind('keydown' , SpaceUI.pop_keydown);
				}
			}else if(k == 27){
				var del_btn = $('#spaceUI_del');
				if(del_btn.length > 0){
					del_btn.focus().click();
					$(document).unbind('keydown' , SpaceUI.pop_keydown);
				}
			}
		},
		//	设置元素垂直居中
		set_align_center : function(obj){
			var oLeft = ($(window).width() - $(obj).width()) / 2;
			var oTop = 100 + $(window).scrollTop();
			$(obj).css({position:'absolute',left:oLeft , top:oTop});
		},
		//	随滚动条滚动
		bind_scroll : function(obj){
			var _top = $(obj).offset().top;
			var _scrollTop = $(document).scrollTop();
			setTimeout(function(){
				$(window).bind('scroll' , function(){
					$(obj).css('top' , (_top - _scrollTop + $(this).scrollTop()));
				});
			}, 300);
		},
		/**
		 * 		设置拖拽
		 * 		可配置参数：op= {
		 * 			limit_x - 限制x坐标：max（默认）为页面最大值 ,fixed 为不可移动，obj{min:xx , max: xx}
		 * 			limit_y - 限制y坐标：max（默认）为页面最大值 ,fixed 为不可移动，obj{min:xx , max: xx}
		 * 			type    - 拖拽类型（self / shadow）
		 * 		}
		 */
	    bind_move : function(obj , e , op){
			var _that = this,
				mObj = obj,
				_left = mObj.offset().left,
				_top = mObj.offset().top,
				e = window.event || e,
				_pos = Helper.mouseP(e),
				_x = _pos.x - _left,
	        	_y = _pos.y - _top,
	        	d_width,
	        	d_height,
	        	e_x , e_y ,
	        	ex_op = {
	        		limit_x : 'max',
	        		limit_y : 'max',
	        		type    : 'shadow'
	        	};
	        var id_obj = mObj.get(0);
	        var zIndex = parseInt(obj.css('zIndex'));
	        if(zIndex < 1)zIndex = 1;
	        //	可选参数
	        if(typeof op != 'undefined'){
	        	for(var i in op){
	        		if(typeof op[i] != 'undefined'){
	        			ex_op[i] = op[i];
	        		}
	        	}
	        }
	        //	初始化拖动可选参数
	        if(ex_op.limit_x == 'max'){
	        	d_width = $(document).width();
	        }else if(typeof ex_op.limit_x == 'object'){
				d_width = ex_op.limit_x.max;
	        }
	        if(ex_op.limit_y == 'max'){
	        	d_height = $(document).height();
	        }else if(typeof ex_op.limit_y == 'object'){
	        	d_height = ex_op.limit_y.max;
	        }

	        mObj.css('-moz-user-select', '-moz-none');

	        if(ex_op.type == 'shadow'){
	        	if($('#acol_draw').length > 0)$('#acol_draw').remove();
	        	$(document.body).append('<div id="acol_draw"></div>').find('#acol_draw').css({position:'absolute', 'z-index':zIndex-1, left:_left, top:_top, border:'2px solid #ccc', width:mObj.width(), height:mObj.height()});
	        }
	        
	        if(id_obj.setCapture){
	        	//ie
	        	id_obj.setCapture();
	        }
			$(document).bind('mousemove' , function(e){
				SpaceUI.Helper.stopDefault(e);
				var e = e || window.event,
					pos = Helper.mouseP(e),
					//	滚动条高度
					scroll_h = $(document).scrollTop(),
					scroll_l = $(document).scrollLeft(),
					acol_draw = $('#acol_draw');
				e_x = pos.x - _x;
				e_y = pos.y - _y;
				if($_Helper.isIE){
					//	IE下要减去滚动高度
					e_x -= scroll_l;
					e_y -= scroll_h;
				}
				//	边界判断
				if(e_y < 0)e_y = 0;
				if(e_x < 0)e_x = 0;
				var limit_x = d_width - acol_draw.width() - 5;	//	额外减5防止撞边
				var limit_y = d_height - acol_draw.height() - 5;
				if(limit_x < 0)limit_x = 0;
				if(limit_y < 0)limit_y = 0;
				if(e_x > limit_x)e_x = limit_x;
				if(e_y > limit_y)e_y = limit_y;
				if(typeof ex_op.limit_x.min != 'undefined' && e_x < ex_op.limit_x.min)e_x = ex_op.limit_x.min;
				if(typeof ex_op.limit_y.min != 'undefined' && e_y < ex_op.limit_y.min)e_y = ex_op.limit_y.min;
				
				if(ex_op.type == 'shadow'){
					if(ex_op.limit_x == 'fixed'){
						acol_draw.css({'top':e_y});
					}else if(ex_op.limit_y == 'fixed'){
						acol_draw.css({'left':e_x});
					}else{
						acol_draw.css({'left':e_x , 'top':e_y});
					}
				}else{
					if(ex_op.limit_x == 'fixed'){
						mObj.css({position:'absolute' ,'top':e_y});
					}else if(ex_op.limit_y == 'fixed'){
						mObj.css({position:'absolute' ,'left':e_x});
					}else{
						mObj.css({position:'absolute' ,'left':e_x , 'top':e_y});
					}
				}

			}).bind('mouseup' , function(e){
				if(id_obj.releaseCapture){
					//ie
		        	id_obj.releaseCapture();
		        }
				$(document).unbind('mousemove');
				$(document).unbind('mouseup');

				if(ex_op.type == 'shadow'){
					$('#acol_draw').remove();
					if(ex_op.limit_x == 'fixed'){
						mObj.css({position:'absolute' , top:e_y});
					}else if(ex_op.limit_y == 'fixed'){
						mObj.css({position:'absolute' , left: e_x});
					}else{
						mObj.css({position:'absolute' , left: e_x, top:e_y});
					}
				}
			});
			return false;
		}
	};
	/**
	 * [Helper 常用功能封装]
	 * @type {Object}
	 */
	var Helper = {
		/**
		 * 	浏览器判断
		 */
		isIE : function(){
			if(typeof $.browser != 'undefined' && $.browser.msie)
				return $.browser.version;
			else
				return false;
		}(),
		isIE6 : function(){
			if(this.isIE && this.isIE.indexOf('6.0') != -1)
				return true;
			else
				return false;
		}(),
		isFF : function(){
			if(typeof $.browser != 'undefined' && $.browser.mozilla)
				return true;
			else
				return false;
		}(),
		isChrome : function(){
			if(typeof $.browser != 'undefined' && $.browser.safari && $.browser.webkit)
				return true;
			else
				return false;
		}(),
		/**
		 * 	字符串操作相关
		 */
		//	字符串截取，支持中文
	    str_cut: function (str, len) {
	      var is_cn = false;	//是否有汉字
	      var s_count = 0;
	      var len2 = this.str_len(str);
	      for (var i = 0; i < len2; i++) {
	        if (s_count >= len) {
	          return str.substring(0, i);
	          break;
	        } else if (is_cn && s_count >= (len - 1)) {
	          return str.substring(0, i - 1);
	          break;
	        }
	        if (str.charCodeAt(i) < 255) //非汉字
	        {
	          s_count++;
	        } else {
	          s_count += 2;
	        }
	      }
	      return str.substring(0, i);
	    },
	    //	字符串长度计算，支持中文
	    str_len: function (str) {
	      var intLength = 0;
	      for (var i = 0; i < str.length; i++) {
	        if ((str.charCodeAt(i) < 0) || (str.charCodeAt(i) > 255)) intLength = intLength + 2;
	        else intLength = intLength + 1;
	      }
	      return intLength;
	    },
	    //	限制Input框输入文字长度
	    limit_input : function(input_obj , len){
	    	$(input_obj).bind('keyup' , function(){
	    		if(Helper.str_len($(this).val()) > len){
	    			$(this).val( Helper.str_cut($(this).val() , len) );
	    		}
	    	});
	    },
	    //	去除字符串空格
	    trim : function(str){
	    	if(typeof str != 'string')return;
	    	return str.replace(/\s/g , '');
	    },
	    //	用逗号分割数字串
	    comma_split_nummber : function(num){
			var num_arr = num.toString().split('');
			var end = num_arr.length - 1;
			var back = '';
			while((end - 3) >= 0){
				back =  ','+ num_arr[end-2] + num_arr[end-1] + num_arr[end] + back;
				num_arr = num_arr.slice(0 , end-2);
				end -= 3;
			}
			back = num_arr.join('') + back;
			return back;
		},
		//	取0-i的随机数
		rand : function(i){
			return parseInt(Math.random()*(i+1));
		},
		//	给数组乱序
		messArray : function(arr){
			var len  = arr.length;
			for(var i=0;i<len;i++){
				var randNum = this.rand(len-1);
				if(i != randNum){
					var a = arr[i];
					arr[i] = arr[randNum];
					arr[randNum] = a;
				}
			}
			return arr;
		},
	    //	获取鼠标坐标
		mouseP : function(ev) { 
			if(ev.pageX || ev.pageY){
				return {x:ev.pageX, y:ev.pageY};
			} 
			return { 
				x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
				y:ev.clientY + document.body.scrollTop - document.body.clientTop 
			};
		},
		/**
		 * 相关辅助函数
		 */
		create_cssfile : function(cssflie){
			var style = document.createElement('link');
			style.href = cssflie;
			style.rel = 'stylesheet';
			style.type = 'text/css';
			document.getElementsByTagName('HEAD').item(0).appendChild(style);
		},
		
		replacejscssfile : function(oldfilename, newfilename, filetype){
			var targetelement = (filetype=="js")? "script" : (filetype=="css")? "link" : "none";
			var targetattr = (filetype=="js")? "src" : (filetype=="css")? "href" : "none";
			var allsuspects = document.getElementsByTagName(targetelement)
			for (var i=allsuspects.length; i>=0; i--){
				if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){
				   var newelement = this.createjscssfile(newfilename, filetype)
				   allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
				}
			}
		},
		createjscssfile : function(filename, filetype){
			if (filetype=="js"){
				var fileref=document.createElement('script');
				fileref.setAttribute("type","text/javascript");
				fileref.setAttribute("src", filename);
			}
			else if (filetype=="css"){
				var fileref=document.createElement("link");
				fileref.setAttribute("rel", "stylesheet");
				fileref.setAttribute("type", "text/css");
				fileref.setAttribute("href", filename);
			}
			return fileref;
		},
		/**
		 * 	对象相关操作
		 */
		//	检验对象是否为空
		is_empty_obj : function(obj){
			for(var i in obj){
				if(typeof obj[i] == 'object')
				return false;
			}
			return true;
		},
		//	计算对象元素数量
		count_obj_nums : function(obj){
			var num = 0;
			for(var i in obj){
				if(typeof obj[i] != 'undefined'){
					num++;
				}
			}
			return num;
		},
		/**
		 * 	cookie相关操作
		 */
		//	设置cookie 	time:num+time_type
		setCookie: function (name, value, time) {
			var strsec = this.getsec(time);
			var exp = new Date();
			exp.setTime(exp.getTime() + strsec * 1);
			document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
		},
		getsec: function (str) {
			var str1 = str.substring(1, str.length) * 1;
			var str2 = str.substring(0, 1);
			if (str2 == 's') {
			  return str1 * 1000;
			} else if (str2 == 'h') {
			  return str1 * 60 * 60 * 1000;
			} else if (str2 == 'd') {
			  return str1 * 24 * 60 * 60 * 1000;
			}
		},
		//读取cookies
		getCookie: function (name) {
			var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
			if (arr = document.cookie.match(reg)) return unescape(arr[2]);
			else return null;
		},
		//删除cookies
		delCookie: function (name) {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = this.getCookie(name);
			if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
		},
		//	阻止事件冒泡
		stop_bubble : function(e){
			if (window.event) {
	        	window.event.cancelBubble = true;
	        	return false;
	      	} else {
	        	e.stopPropagation();
	      	}
		},
		//	阻止浏览器默认事件
		stopDefault : function(e) { 
		    if (e && e.preventDefault) {//如果是FF下执行这个
		       e.preventDefault();
		    }else{ 
		       window.event.returnValue = false;//如果是IE下执行这个
		    }
		    return false;
		},
		//	tips鼠标滑过显示&隐藏，要求tips要放在触发层内部
		tips_toggle : function(container_id , tips_id){
			var over_obj = $('#'+ container_id);
			var tips_obj = $('#'+ tips_id);
			if(over_obj.length <= 0)return;
			if(over_obj.css('display') == 'none')return;

			over_obj.bind('mouseenter' , function(){
				tips_obj.show();
			});
			over_obj.bind('mouseleave' , function(){
				tips_obj.hide();
			});
		},
		//	过滤指定HTML标签，用法：strip_tags(content , '<span><p><img><br>'); 除了括号中标签之外其余全过滤
		strip_tags : function(input, allowed) {
			allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
			var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
			commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
			return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
				return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
			});
		},
		//	loading层显示
		loading : function(text){
			var text = text || '加载中，请稍候...';
			if($('#acol_loading').length > 0){
				$('#acol_loading').find('span').text(text).end().show();return;
			}
			var l_html = [];
			l_html.push('<div id="acol_loading" class="loading">');
		    l_html.push('	<p class="txt"><img src="http://s1.56img.com/style/i/v3/img/global/loading.gif" alt=""><span>'+ text +'</span></p>');
			l_html.push('</div>');
			l_html = l_html.join("");
			$(document.body).append(l_html);
		},
		//	关闭loading层
		load_done : function(){
			$('#acol_loading').hide();
		},
		//	获取now的时间戳	
		now : function(){
			return Math.round(new Date().getTime()/1000);	
		},
		//	将时间戳格式化成需要的形式
		format_time : function(time , type){
			if(time == '')return false;
			var d = new Date(time*1000);
			var type = type.toLowerCase() || 'y-m-d';
			switch(type){
				case 'y':
					return d.getFullYear();
				case 'm':
					return d.getMonth()+1;
				case 'd':
					return d.getDate();
				case 'y-m-d':
					return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
				case 'y-m-d h:i:s':
					return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
				case 'lasttime':
					if(this.now() < time) return '1秒前';
					var acrossTime = this.now() - time,
						days = Math.floor(acrossTime/86400),
						hours = Math.floor((acrossTime - days*86400)/3600),
						minites = Math.floor((acrossTime - days*86400 - hours*24)/60),
						result = '';
					if(days){
						if(days < 30){
							result = days + "天前";
						}else if(days > 30 && days <= 365){
							month = Math.floor(days / 30);
							result = month + "个月前";
						}else{
							result = this.format_time(time , 'Y-m-d');
						}
					}else if(hours){
						result = hours + "小时前";
					}else if(minites){
						result = minites + "分钟前";
					}else{
						result = "1分钟前";
					}
					return result;
			}
		}

	};
	var Page = function(op){
		//	不允许直接调用
		if(this instanceof Page){
			this.ini_page(op);
		}else{
			return new Page(op);
		}
	}
	Page.prototype = {
		container_ID : '',
		f_btn : '',				//	首页按钮
		l_btn : '',				//	尾页按钮
		pre_btn : '上一页',			//	上一页
		next_btn : '下一页',			//	下一页
		h_btn : '...',			//	省略页
		total_page : 20,		//	总页数
		page_showNums : 5,		//	显示页数
		now_page : 1,			//	当前页
		callback : function(){},	//	利用回调函数取指定数据
		is_ajax : true,				//	是否采用异步
		page_href : 'http://',
		obj_name : null,
		//
		//	初始化	option = {container_ID:容器ID , f_btn:首页 , l_btn:尾页 , h_btn:省略的页 , total_page:总页数 , page_showNums:显示几页 ,  callback:回调函数}
		//
		ini_page : function(option){
			var op = arguments[0];
			if(op){
				for(var i in op){
					if(typeof op[i] != 'undefined'){
						this[i] = op[i];
					}
				}
			}

			if(this.total_page < 1 || this.page_showNums < 1){
				$('#'+ this.container_ID).hide();
				return;
			}
			this.create_pagelist(this.container_ID);
		},

		create_pagelist : function(container_ID){
			var pagelist_html = '';
			pagelist_html += this.page_list_a(this.f_btn , container_ID);
			pagelist_html += this.page_list_a(this.pre_btn , container_ID);
			
			var pre_show = Math.ceil(this.page_showNums / 2) - 1;
			if(pre_show < 1)pre_show = 1;
			var start_page = this.now_page - pre_show;				//	前排始终显示pre_show页
			var last_page_start = this.total_page - this.page_showNums + 1;	//	最后一行页列表起始页
			if(start_page < 1)start_page = 1;
			if(last_page_start < 1)last_page_start = 1;
			if(start_page > last_page_start)start_page = last_page_start;

			if( start_page > 1){
				pagelist_html += this.page_list_a(1 , container_ID);
				if(start_page > 2){
					pagelist_html += this.page_list_a(this.h_btn , container_ID);
				}
			}

			for(var i=0; i<this.page_showNums; i++){
				if(start_page > this.total_page)break;
				pagelist_html += this.page_list_a(start_page++ , container_ID);
			}

			if( start_page <= this.total_page ){
				if( start_page < this.total_page ){
					pagelist_html += this.page_list_a(this.h_btn , container_ID);
				}
				pagelist_html += this.page_list_a(this.total_page , container_ID);
			}
			pagelist_html += this.page_list_a(this.next_btn , container_ID);
			pagelist_html += this.page_list_a(this.l_btn , container_ID);

			document.getElementById(this.container_ID).innerHTML = pagelist_html;

			$('#'+ this.container_ID).show();
		},

		page_list_a : function(c , container_ID){
			var f_classname = l_classname = 'mod56_page_pn';
			//	ajax
			var href = '';
			if(this.is_ajax){
				href = ' onclick="'+ this.obj_name +'.page_click(\''+ c +'\' , this);return false;" href="javascript:;" ';
			}else{
				href = ' href="'+ this.page_href + c +'" ';
			}
			var f_btn_href = l_btn_href = href;
			//	设置next,pre按钮是否可点 和 样式
			if(this.now_page <= 1){
				f_classname = 'mod56_page_pn_disabled';
				f_btn_href = ' onclick="return false;" href="javascript:;" ';
			}
			if(this.now_page >=  this.total_page){
				l_classname = 'mod56_page_pn_disabled';
				l_btn_href = ' onclick="return false;" href="javascript:;" ';
			}
			
			if(c == ''){
				return '';
			}else if(c == this.now_page){
				return '<span class="mod56_page_pn_current">'+ c +'</span>';
			}else if(c == this.f_btn){
				return '<a class="'+ f_classname +'" '+ f_btn_href +'>'+ c +'</a>';
			}else if(c == this.pre_btn){
				return '<a class="'+ f_classname +'" '+ f_btn_href +'>'+ c +'</a>';
			}else if(c == this.next_btn){
				return '<a class="'+ l_classname +'" '+ l_btn_href +'>'+ c +'</a>';
			}else if(c == this.h_btn){
				return '<span class="mod56_page_pn_ellipsis">'+ c +'</span>';
			}else if(c == this.l_btn){
				return '<a class="'+ l_classname +'" '+ l_btn_href +'>'+ c +'</a>';
			}else{
				return '<a '+ href +'>'+ c +'</a>';
			}
		},
		
		page_click : function(c , o){
			var page , container_ID = $(o).parent().attr('id');
			if(c == this.f_btn){
				page = 1;
			}else if(c == this.l_btn){
				page = this.total_page;
			}else if(c == this.pre_btn){
				page = this.now_page - 1;
			}else if(c == this.next_btn){
				page = (+this.now_page) + 1;
			}else{
				page = c;
			}
			page = page > this.total_page ? this.total_page : (page < 1 ? 1 : page);

			this.now_page = page;
			this.ini_page();
			//	AJAX
			if(typeof this.callback == 'function'){
				this.callback(this.now_page);
			}
		}
	
	};

	/**
	 * [EditPanel 修改信息]
	 * @type {Object}
	 */
	var EditPanel = function(){}
	EditPanel.prototype = {
		lastText_obj : null,
		last_text : '',
		submitBtn : '',
		limit_len : 40,
		single: function(op){
			var _that = this;
			var obox = $('#'+ op.old_box_id),
	            cbox = $('#'+ op.change_box_id),
	            modifyBtn = obox.find('a').eq(0),
	            submitBtn = cbox.find('a').eq(0),
	            lastText = obox.find('em').eq(0),
	            changeInput = cbox.find('input').eq(0);
	        if(typeof op.is_hover != 'undefined' && op.is_hover){
	        	obox.hover(
		            function(){
		                modifyBtn.show();
		            },
		            function(){
		                modifyBtn.hide();
		            }
		        );
	        }
	        modifyBtn.bind("click", function(){
	        	_that.lastText_obj = lastText;
	        	_that.last_text = lastText.text();
	        	_that.submitBtn = submitBtn;
	        	$(document).bind('keydown' , {obj:_that} , _that.enter_save);
	            obox.hide();$('#verify_extra_arrow').hide();
	            cbox.show();
	            changeInput.val(lastText.text()).select();
	            Helper.limit_input(changeInput , _that.limit_len);
	        });
	        submitBtn.bind("click", function(){
	        	var nText = encodeURIComponent(changeInput.val());
	            if(nText.length < 1){
	                SpaceUI.alert("不能为空！");
	                return false;
	            }
	            if(_that.last_text != nText && typeof op.save_callback == 'function')op.save_callback(nText);
	            obox.show();$('#verify_extra_arrow').show();
	            if(typeof op.is_hover != 'undefined' && op.is_hover)modifyBtn.hide();
	            cbox.hide();
	            lastText.text(decodeURIComponent(nText));
	        });
		},
		//	回车提交
		enter_save : function(e){
			var _that = e.data.obj;
			var e = e || window.event;
			var k = e.keyCode || e.which || e.charCode;
			if(k == 13){
				_that.submitBtn.click();
				$(document).unbind('keydown' , _that.enter_save);
			}
		},
		//	还原
		recover : function(){
			this.lastText_obj.text( this.last_text );
		}
	}
	/**
	 * [MsgBox 短信息发送框]
	 * @type {Object}
	 */
	var MsgBox = {
		to_user : false,
		content_editor : null,
		iniBox : function(op){
			//	判断是否是登陆装态
			if(usr.user_id() == ''){
				/*var op = {
						title:'请先登录56网.',
						yes:{
							text:'马上登录' ,
							callback:function(){
								window.location.href = 'http://user.56.com/login/';
							}
						},
						no : {
							text : '取消'
						}
					};
				SpaceUI.alert(op);*/
				show_login();
				return;
			}
			var to_user = this.to_user;
			if(typeof op.to_user != 'undefined')to_user = op.to_user;

			var msg_html = [];
			msg_html.push('');
			if(to_user){
				msg_html.push('            <label class="form_box">');
				msg_html.push('                <span>发给：</span>');
				msg_html.push('                <input id="sms_to" class="txtbox_current" type="text" value="'+ to_user +'">');
				msg_html.push('            </label>');
			}
			msg_html.push('            <div class="form_box">');
			msg_html.push('                <span>内容：</span>');
			//msg_html.push('                <div name="sms_contentEdit" id="sms_contentEdit"></div>');
			msg_html.push('                <textarea name="sms_contentEdit" id="sms_contentEdit"></textarea>');
			msg_html.push('                <em id="contentTip"></em>');
			msg_html.push('            </div>');
			msg_html = msg_html.join('');

			var pop_op = {
				classname:'send_msg',
				id : 'mPubMsgBox',
				title : '发送短消息',
				text : msg_html,
				//width : 530,
				height : 320,
				yes : {
					text:'发送',
					callback:function(){
						//MsgBox.send_msg(to_user , AcolEditor.get_html());
						MsgBox.send_msg(to_user ,$('#sms_contentEdit').val());
					}
				},
				no:{text:'取消'}
			};
			SpaceUI.alert(pop_op);

			//setTimeout(function(){
			//	AcolEditor.ini('sms_contentEdit' , {width:'400px', height:'98px'});
			//}, 500);
			//	统计
			setStat('nspace_msg_1');
		},
		send_msg : function(to_user ,msg){
			var msg = encodeURIComponent(msg);
			var to_user = to_user;
			if($('#sms_to').length > 0){
				if($('#sms_to').val() == ''){
					SpaceUI.alert('对方用户名不能为空');
					return;
				}
				to_user = $('#sms_to').val();
			}
			jLoader('http://msg.56.com/api/sendmsg.php?to='+ to_user +'&from='+ usr.user_id() +'&content='+ msg +'&callback=SpaceUI.MsgBox.send_back');
		},
		send_back : function(back){
			if(back.msg == 0){
				var op={
				    head:'私信发送成功啦',
				    timeout:1000
				}
				SpaceUI.alert(op);
			}else{
				SpaceUI.alert(back.msg);
			}
		}
	};

	//弹窗
	window.SpaceUI = Pop;
	//编辑面板
	window.SpaceUI.EditPanel = EditPanel;
	//短消息发送框
	window.SpaceUI.MsgBox = MsgBox;
	window.SpaceUI.Helper = Helper;
	//	分页
	window.SpaceUI.Page = Page;

})();