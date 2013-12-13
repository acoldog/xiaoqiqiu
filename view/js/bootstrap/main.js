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
	$('.tooltip-acol').tooltip();

	//加载时间轴
	$.getJSON('http://xiaoqiqiu.com:8081/api/get_sort?action=time&user='+ USER +'&callback=?', function(back){
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

	//钉子
	$(".comment-float").pin({
	      containerSelector: ".circle"
	});

});


//--><!]]>