<!--//--><![CDATA[//><!--
/*
*
*		setCookie			创建设置COOKIE
*		getsec				解析出COOKIE设置的过期时间
*		getCookie			获取指定名字的COOKIE
*		delCookie			删除指定名字COOKIE
*		str_cut				截取指定长度字符串（支持汉字）
*		str_len				获取字符长度（支持汉字）
*		
*/

var $_Helper = {

	load_obj : null,
	//	判断浏览器类型
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
	},
	isFF : function(){
		if(typeof $.browser != 'undefined' && $.browser.mozilla)
			return true;
		else
			return false;
	}(),
	/**
	*	导入JS包
	*	option - 是个带js文件名的数组（文件名和对象名对应的）
	*	callback - 加载成功后执行的回调
	*/
	require : function(option , callback){
		var option = option || {};
		for(var i in option)
		{
			if(typeof option[i] == 'string')
			{
				/*var objname = option[i],
					f_val = objname.substring(0 , 1),
					l_val = objname.substring(1 , objname.length);
				objname = f_val.toUpperCase() + l_val;

				var obj = '$_'+ objname;alert(obj)
				if(!window.hasOwnProperty(obj) || typeof obj == 'object')
				{*/
					//$_Helper.load(STATIC_ROOT +'js/'+ option[i] +'.js');
				//}
				if( option[i].indexOf('xiaoqiqiu.com') != -1 ){
					scriptLoader.load(option[i] , callback);
				}else{
					scriptLoader.load(STATIC_ROOT +'js/'+ option[i] +'.js' , callback);
				}
			}
		}
	},
	//	动态插入CSS
	loadCss : function(url){
		if (!url) return;
        var a = document.createElement('link');
        var b = document.getElementsByTagName('HEAD')
            .item(0);
        a.rel = "stylesheet";
        a.type = "text/css";
        a.href = url;
        b.appendChild(a, null);
	},
	//load js file
	load : function(src){
		var scpt = document.createElement("SCRIPT");
		scpt.type = "text/javascript";
		scpt.src = src;
		document.getElementsByTagName("HEAD")[0].appendChild(scpt);
	},
	/*************
		操作COOKIE
		//这是有设定过期时间的使用示例：
		//s20是代表20秒
		//h是指小时，如12小时则是：h12
		//d是天数，30天则：d30
		//暂时只写了这三种
		setCookie(”name”,”hayden”,”s20″);
	**************/
	setCookie : function(name,value,time){
		var strsec = this.getsec(time);
		var exp = new Date();
		exp.setTime(exp.getTime() + strsec*1);
		document.cookie = name + '='+ escape (value) + ';expires=' + exp.toGMTString();
	},
	getsec : function(str){
		var str1=str.substring(1,str.length)*1; 
		var str2=str.substring(0,1); 
		if(str2=='s')
		{
			return str1*1000;
		}else if (str2=='h'){
			return str1*60*60*1000;
		}else if (str2=='d'){
			return str1*24*60*60*1000;
		}
	},
	//读取cookies
	getCookie : function(name){
		var arr,reg=new RegExp('(^| )'+name+'=([^;]*)(;|$)');
		if(arr=document.cookie.match(reg)) return unescape(arr[2]);
		else return null;
	},
	//删除cookies
	delCookie : function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if(cval!=null) document.cookie= name + '='+cval+';expires='+exp.toGMTString();
	},

	/*
	*	截取指定长度字符串
	*/
	str_cut : function(str,clen){
		var slice_end = 0;
		var s_count = 0;
		var len = this.str_len(str);
		for(var i=0;i<len;i++)
		{
			if(s_count == clen)
			{
				return str.substring(0 , i);
				break;
			}else if(s_count == (clen-1))
			{
				return str.substring(0 , i-1);
				break;
			}
			if(str.charCodeAt(i)<255)	//非汉字
			{
				s_count++;
			}else{
				s_count += 2;
			}
		}
		return str.substring(0 , i);
	},
	str_len : function(str){
		var intLength=0;
		for (var i=0;i<str.length;i++) {
			if ((str.charCodeAt(i) < 0) || (str.charCodeAt(i) > 255))
				intLength=intLength+2;
			else
				intLength=intLength+1;
		}
		return intLength;
	},
	//	计算字数
	count_words : function(text){
		return Math.floor( text.replace(/[^\x00-\xff]/g, "**").length / 2);
	},
	/**
	*	鼠标拖动元素运动事件
	+	obj - 要移动的对象
	*	evObj - 移动事件作用域
	*/
	move : function(obj , evObj){
		this.mousePos = function(ev)
		{
			if(ev.pageX || ev.pageY)
			{ 
			  return {x:ev.pageX, y:ev.pageY}; 
			} 
			return { 
				   x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
				   y:ev.clientY + document.body.scrollTop  - document.body.clientTop 
			}; 
		}
		var getMousePos = this.mousePos;

		var pop_obj = $(obj);
		var evObj = $('.mover');			//	触发弹层移动的节点对象（也就是class=mover的元素）
		evObj.css('cursor','move');
		evObj.mousedown(function(ev){
			
			var ev = ev || window.event;
			//	鼠标点击时弹层的坐标，大小
			var d_top = pop_obj.offset().top || 0;
			var d_left = pop_obj.offset().left || 0;
			var mousePos = getMousePos(ev);
			var offset_top = mousePos.y - d_top;
			var offset_left = mousePos.x - d_left;
			var is_move = true;
			$(document).mousemove(function(ev){
				if(is_move == true)
				{
					var ev = ev || window.event;
					var mousePos = getMousePos(ev); 
					var ntop = mousePos.y;
					var nleft = mousePos.x;
					pop_obj.css({"top":ntop - offset_top, "left":nleft - offset_left});
				}
			});
			$(document).mouseup(function(){
				is_move = false;
			});
		});

	},
	/**
	 * 对象操作相关
	 */
	obj_Pop : function(obj , key){
		for(var i in obj){
			if(i == key)delete obj[i];
		}
	},
	obj2str:function(o){
      if (o == undefined) {
        return "";
      }
      if (typeof o == "object") {
        if (typeof o.sort == 'undefined') {
          var str = '{';
          for (var i in o) {
            if (typeof o[i] == 'function') continue;
            //o[i] = encodeURIComponent(o[i]);
            if (typeof o[i] != 'object') {
              str += '\'' + i + '\':\'' + o[i] + '\',';
            } else {
              str += '\'' + i + '\':' + this.obj2str(o[i]) + ',';
            }
          }
          if(str != '{')str = str.slice(0, -1);
          str += '}';
        } else {
          var str;
          if (o.length == 0) {
            str = '[]';
          } else {
            str = '[';
            for (var i in o) {
              if (typeof o[i] == 'function') continue;
              if (typeof o[i] != 'object') {
                str += '' + o[i] + ',';
              } else {
                str += this.obj2str(o[i]) + ',';
              }
            }
            str = str.slice(0, -1);
            str += ']';
          }
        }
        return str;
      }
    },
    //	加载中
    loading : function(title){
    	var loading_html = '<img src="'+ STATIC_ROOT +'loading.gif" />';
		//登陆框弹出层	
		var title = title || '正在努力加载中...';
		this.load_obj = $_Pop.create_pop({
			title : title,
			container : $('#container') , 
			css_ini : {'z-index':'100001','position':'absolute',width:'370px',height:'180px'} , 
			content : loading_html,
			show_min : false
		});
    },
    //	加载完成
    load_done : function(){
    	$_Pop.close_flash(this.load_obj);
    },
    //	top loading
    top_loading : function(title){
    	var title = title || '加载中...',
    		lobj = $('#top_loading');
    	if(lobj.length > 0){
    		lobj.html('<img src="'+ STATIC_ROOT +'/top_loading.gif"/> '+ title).stop(false, true).slideDown();
    		return false;
    	}
    	var loading_html = '<div id="top_loading" class="top_loading floater radius"><img src="'+ STATIC_ROOT +'top_loading.gif"/> '+ title +' </div>';
    	$(document.body).prepend(loading_html).find('#top_loading').stop(false, true).slideDown();
    },
    top_loading_done : function(){
    	$('#top_loading').stop(false, true).slideUp();
    },

    //bootstrap loading
    bs_top_loading : function(title){
    	var title 	= title || '加载中...',
    		bar_obj = $('#loading_bar');

    	bar_obj.find('.progress-bar').css({width:'10%'}).delay(500);
    	bar_obj.removeClass('hide').find('.progress-bar').text(title).animate({
    		width : "100%"
    	} , 'slow');
    },
    bs_top_loading_done : function(){
    	$('#loading_bar').addClass('hide').find('.progress-bar').stop(false, true);
    },
    
    //	图片展示效果
	zoom_img : function(obj){
		var comp_img_src = $(obj).attr('src'),
			big_img_src = comp_img_src.replace('imgCompress' , 'img'),
			zoom_html = '<img src="'+ big_img_src +'"/>';
		var pop_obj = $_Pop.create_pop({
			title : '原图欣赏',
			container : $(document.body) , 
			css_ini : {'z-index':'101','position':'absolute','top':'30px','left':'100px'} ,
			content : zoom_html,
			callback : function(pop_obj){
				$_Helper.top_loading('正在加载原图...');
				pop_obj.hide();
				pop_obj.find('img').load(function(){
					var oLeft = ($(window).width() - pop_obj.width()) / 2;
					pop_obj.css('left' , oLeft).fadeIn('fast');
					$_Helper.top_loading_done();
				});
			},
			move_type : 'self'
		});	
	},
	lazyload : function(){
		var imgs_obj = $('img[lazyload=1]');
		if(imgs_obj.length < 1)return;
		for(var i in imgs_obj){
			if(typeof imgs_obj[i] != 'object' || imgs_obj[i].length < 1)continue;
			var obj = $(imgs_obj[i]);
			try{
				if(typeof obj.attr('src') == 'undefined')continue;
			}catch(e){continue;}
			var _top = obj.offset().top,
				_scrollTop 	= $(document).scrollTop(),
				winHeight 	= $(window).height();
			if(_top > _scrollTop && _top < (_scrollTop + winHeight)){
				var nsrc = obj.attr('data');
				if(nsrc){
					obj.attr('src' , nsrc).attr('lazyload' , '0');
					//	如果有瀑布流的
					var masObj = $('.box');
					if(masObj.length > 0){
						var $container = masObj.parent();
						$container.imagesLoaded( function(){
						  	$container.masonry({
						  		itemSelector : '.box'
						  	});
						});
					}

				}
			}
		}
	}

};		//	end class

/**
*	flash地址解析和生成相关
*/
var ParseSWF = {
	parse_url : function(obj_id , url){
		var url = url.replace(/\s/g,''),
			swf_url = false;
		if(url == ''){
			SpaceUI.alert('链接地址不能为空');
			return false;
		}
		if(url.toLowerCase().indexOf('http://www.56.com/') != -1 || url.toLowerCase().indexOf('http://player.56.com/') != -1){
			var swf_url;
			var arr = url.match(/http:\/\/www\.56\.com\/(.+)\.swf/i);
			if(arr){
				swf_url = arr[0];
			}
			arr = url.match(/http:\/\/player\.56\.com\/(.+?)\.swf/i);
			if(arr){
				swf_url = arr[0];
			}

			arr = url.match(/http:\/\/www\.56\.com\/([a-z])\d+\/v_([a-z0-9]+)\.html/i);
			if(arr){
				if(arr[1] == 'p' && typeof arr[2] != 'undefined'){
					swf_url = 'http://player.56.com/deux_'+ arr[2] +'.swf';
				}else if(arr[1] == 'u' && typeof arr[2] != 'undefined'){
					swf_url = 'http://player.56.com/v_'+ arr[2] +'.swf';
				}
			}else{
				arr = url.match(/http:\/\/www\.56\.com\/([a-z])\d+\/play_[\-_a-z0-9]+vid\-([a-z0-9]+)\.html/i);
				if(arr[1] == 'w' && typeof arr[2] != 'undefined'){
					swf_url = 'http://player.56.com/v_'+ arr[2] +'.swf';
				}
			}
		}else if(url.toLowerCase().indexOf('http://player.youku.com/') != -1 || url.toLowerCase().indexOf('http://v.youku.com/v_show/')!=-1){//优酷
			var arr = url.match(/http:\/\/player\.youku\.com\/player\.php\/([a-z0-9=\/]+?)?sid\/[a-z0-9=]+\/v\.swf/i);
			if(arr){
				swf_url = arr[0];
			}else {
				arr = url.match(/^http:\/\/v\.youku\.com\/v_show\/id_([a-z0-9=]+)\.html$/i);
				if(arr){
					swf_url = 'http://player.youku.com/player.php/sid/'+arr[1]+'/v.swf';
				}
			}
			
		}else if(url.toLowerCase().indexOf('http://www.tudou.com/') != -1){//土豆
			var arr = url.match(/http:\/\/www\.tudou\.com\/[a-z0-9]\/[\w-]+/i);
			if(arr){
				swf_url = arr[0];
			}
		
		}else if(url.toLowerCase().indexOf('http://player.ku6.com/refer/') != -1){//酷6
			var arr = url.match(/http:\/\/player\.ku6\.com\/refer\/[\w-]+\/v\.swf/i);
			if(arr){
				swf_url = arr[0];
			}
		}else if(url.toLowerCase().indexOf('http://6.cn/p/') != -1){//6间房
			var arr = url.match(/http:\/\/6\.cn\/p\/[\w\-\/]+\.swf/i);
			if(arr){
				swf_url = arr[0];
			}
		}else if(url.toLowerCase().indexOf('http://client.joy.cn/flvplayer/') != -1){//激动网
			var arr = url.match(/http:\/\/client\.joy\.cn\/flvplayer\/[\w]+\.swf/i);
			if(arr){
				swf_url = arr[0];
			}
		}else if(url.toLowerCase().indexOf('video.sina.com.cn') != -1 || url.toLowerCase().indexOf('http://vhead.blog.sina.com.cn/') != -1){//新浪视频
			var arr = url.match(/(http:\/\/vhead\.blog|http:\/\/p\.you\.video)\.sina\.com\.cn\/player\/outer_player\.swf\?[a-z0-9&=]+/i);
			if(arr){
				swf_url = arr[0];
			}
		}else if(url.toLowerCase().indexOf('http://v.ifeng.com/') != -1){//凤凰
			var arr = url.match(/http:\/\/v\.ifeng\.com\/include\/exterior\.swf\?guid=[a-z0-9\-_]+/i);
			if(arr){
				swf_url = arr[0];
			}else {
				arr = url.match(/http:\/\/v\.ifeng\.com\/[\w\/]+\/([a-z0-9\-_]+)\.shtml/i);
				if(arr){
					swf_url = 'http://v.ifeng.com/include/exterior.swf?guid='+arr[1];
				}
			}
			
			arr = url.match(/http:\/\/v\.ifeng\.com\/include\/niuexcerpt\.swf\?xmlurl=http:\/\/v\.ifeng\.com\/[\w\/]+\/\d+\.xml/i);
			if(arr){
				swf_url = arr[0];
			}else {
				arr = url.match(/(http:\/\/v\.ifeng\.com\/[\w\/]+\/\d+)\/index\.shtml/i);
				if(arr){
					swf_url = 'http://v.ifeng.com/include/niuexcerpt.swf?xmlurl='+arr[1]+'.xml';
				}
			}
		}else if(url.toLowerCase().indexOf('http://video.cctv.com/') != -1){//cctv
			var arr = url.match(/http:\/\/video\.cctv\.com\/flash\/cctv_player\.swf\?VideoID=\d+[\w&=]*/i);
			if(arr){
				swf_url = arr[0];
			}else {
				arr = url.match(/http:\/\/video\.cctv\.com\/opus\/(\d+)\.html/i);
				if(arr){
					swf_url = 'http://video.cctv.com/flash/cctv_player.swf?VideoID='+arr[1]+'&autoStart=false';
				}
			}
		}else if(url.toLowerCase().indexOf('http://vblog.hunantv.com/') != -1){//金鹰网
			var arr = url.match(/http:\/\/vblog\.hunantv\.com\/source\/flash\/hunantv_share_player\.swf\?m=[a-z0-9]+&d=\d+&b=[\w-]+[\w&=]*/i);
			if(arr){
				swf_url = arr[0];
			}
		}

		if(swf_url){
			return this.loadSwf(obj_id ,swf_url , '505' , '600');
		}else{
			SpaceUI.alert('你填写的地址无法识别');
			return false;
		}
	},
	loadSwf : function(obj_id ,swf_url ,height , width , wmode){
		id = obj_id || "flash_player";
		height = height || '100%';
		width = width || '100%';
		wmode = wmode || "opaque";

		var h = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="object_'+id+'" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" height="'+ height +'" width="'+ width +'">';
		h += '<param name="movie" value="'+swf_url+'">';
		h += '<param name="allowScriptAccess" value="always">';
		h += '<param name="wmode" value="'+wmode+'">';
		h += '<param value="always" name="allowScriptAccess">';
		h += '<param name="allowFullScreen" value="true">';
		h += '<embed src="'+swf_url+'" id="embed_'+id+'" allowScriptAccess = "always" wmode="'+wmode+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowfullscreen="true" height="'+ height +'" width="'+ width +'">';
		h += '</object>';
		return h;
	}
};

// IE10同时支持两种事件，但是当JS有缓存的时候，会先触发onreadystatechange再执行JS程序
var scriptOnloadEvent = 'onload' in document.createElement('script') ?
	'onload' : 'onreadystatechange';
// 脚本读取器
var scriptLoader = {
	// script的父节点
	_scriptParent: document.getElementsByTagName('head')[0],
	
	// 标注加载中（1）或已加载（2）的url
	_loaded: { },

	_config : {charset : 'utf-8'},
	
	// 获取当前运行的脚本所在的script标签
	getExecutingScript: function() {
		if (this._currentlyAddingScript) {
			return this._currentlyAddingScript;
		}

		var executingScript = this._executingScript;
		if (executingScript && executingScript.readyState === 'interactive') {
			return executingScript;
		}

		var scripts = this._scriptParent.getElementsByTagName('script'), script;
		for (var i = 0; i < scripts.length; i++) {
			script = scripts[i];
			if (script.readyState === 'interactive') {
				return (this._executingScript = script);
			}
		}
	},

	// 加载script文件
	load: function(src, onload, attrs) {
		var self = this, state = self._loaded[src];

		if (state) {
			// state为1时表示此文件加载中，无须二次加载
			// state为2时表示文件加载完成，直接执行回调
			if (state === 2 && onload) { onload(script); }
		} else {
			var script = document.createElement('script');
			script.src = src;
			self._loaded[src] = 1;
			if (self._config.charset) { script.charset = self._config.charset; }
			script.async = 'async';
			if (attrs) {
				// 设置附加属性
				for (var key in attrs) {
					script.setAttribute(key, attrs[key]);
				}
			}
			script[scriptOnloadEvent] = script.onerror = function() {			
				if (!script.readyState ||
					'loaded' === script.readyState || 'complete' === script.readyState
				) {
					self._loaded[src] = 2;
					self._executingScript = null;
				
					script[scriptOnloadEvent] = script.onerror = null;
					onload && onload(script);
					script.parentNode.removeChild(script);
					script = null;
				}
			};

			this._currentlyAddingScript = script;
			self._scriptParent.insertBefore(script, self._scriptParent.firstChild);
			this._currentlyAddingScript = null;
		}
	}
};
//--><!]]>