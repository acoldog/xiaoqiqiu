<!--//--><![CDATA[//><!--

$(document).ready(function(){
	//气泡
	$('#acol_tips').grumble(
		{
			text: 'haha acol!', 
			angle: 150, 
			distance: 0, 
			type: 'alt-',
			showAfter: 1000,
			hideAfter: 2000
		}
	);

	//气泡2
	setTimeout(function(){
		$('.tooltip-acol').tooltip();
	} , 2000);

	//加载时间轴
	$.getJSON('http://xiaoqiqiu.com:8081/api/get_sort?action=time&user='+ USER +'&callback=?', function(back){
		var li_html = [],
			last_one = back.pop();

		for(var i in back){
			if(typeof back[i] == 'object'){
				li_html.push('<li><a class="tooltip-acol" data-original-title="点击查看'+ back[i].name +'发表的文章"  href="javascript:;" onclick="$_BsIndex.sort_list_event(\''+
					back[i].name +'\');return false;">'+ back[i].name +'月 （'+ back[i].num +'）</a></li>');
			}
		}

		li_html.push('<li><a href="javascript:;" onclick="$_BsIndex.sort_list_event(\''+
					last_one.name +'\' , \'more\');return false;" class="tooltip-acol" data-original-title="更早的" title="更早的">...&nbsp;&nbsp;&nbsp; </a></li>');
		li_html.push('<li><a href="">全部文笔 >>> </a></li>');
		li_html = li_html.join('');

		$('#sort_ul').html(li_html);
	});

	//钉子
	$(".comment-float").pin({
	      containerSelector: ".circle"
	});

	// 返回顶部	
	$("#gotop").click(function(){
		$("html,body").animate({ scrollTop : 0 },"fast");        	     
	});
	$(window).bind("scroll", function(){
		var gleft = $('#content').offset().left + $('#content').width();
		($(document).scrollTop() > 0) ? 
		$("#gotop").css('left' , gleft).show() : 
		$("#gotop").fadeOut('normal');
	});

	//	lazyload
	setInterval($_Helper.lazyload , 1000);

	//	图片浏览事件
	$(document).delegate('.comp_img' , 'click' , function(){
		$_Helper.zoom_img($(this));
	});

	//article mouseover
	$(document).delegate('.circle' , 'mouseover' , function(){
		$(this).find('.acticle-content').css('background-color','#E7E7E7');
	}).delegate('.circle' , 'mouseout' , function(){
		$(this).find('.acticle-content').css('background-color','#F7F7F7');
	});

	//load index.js
	$_Helper.require(['bootstrap/index'] , function(){

		$(document).delegate('#login_btn', 'click' ,function(e){
			e.preventDefault();
			$_BsIndex.login();
		});

		$(document).delegate('#logout_btn', 'click' ,function(e){
			e.preventDefault();
			$_BsIndex.logout();
		});

		$('#reg_btn').bind('click' , function(e){
			e.preventDefault();
			$_BsIndex.reg();
		});
		/*$('#edit_btn').bind('click' , function(e){
			e.preventDefault();
			$_BsIndex.edit();
		});*/
	});


});


//--><!]]>