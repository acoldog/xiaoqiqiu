<?php $data=array('db'=>array('0'=>array('id'=>'121','username'=>'acol','title'=>'','content'=>'<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	<span style="font-size:28px;"><strong>一些常用的linux命令：</strong></span></p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	&nbsp;</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	vim /etc/rc.local&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //开机自启动服务配置</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	&nbsp;</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	ps -ef | grep proftpd&nbsp;&nbsp;&nbsp; // 查看运行的服务</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	&nbsp;</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	<span style="font-size: 13px; font-family: Consolas, 'Lucida Console', monospace; color: rgb(34, 34, 34);">#/usr/local/php/bin/php test.php&nbsp;&nbsp; 执行PHP脚本</span></p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	&nbsp;</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	vim /etc/sysconfig/iptables&nbsp;&nbsp; // 防火墙配置</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	&nbsp;</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	<span style="font-size: 12px; line-height: 18px; font-family: 'Courier New', monospace; white-space: pre; background-color: rgb(247, 247, 247);">/etc/init.d/iptables&nbsp;stop&nbsp; // 开启防火墙服务</span></p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	&nbsp;</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	<span style="font-size: 12px; line-height: 18px; font-family: 'Courier New', monospace; white-space: pre; background-color: rgb(247, 247, 247);">&nbsp;tail error.log -f&nbsp;&nbsp; // 实时查看最新的log</span></p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	&nbsp;</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	&nbsp;</p>
<pre accuse="aContent" class="answer-text mb-10" id="answer-content-547509093" style="font-size: 14px; padding: 0px; margin-top: 0px; margin-bottom: 10px; line-height: 24px; font-family: arial, 'courier new', courier, 宋体, monospace; color: rgb(51, 51, 51); word-wrap: break-word;">
vim 命令模式下，输入 /word 后回车，即查找word，
按 n 查找下一个匹配单词，按 N 查找上一个匹配单词</pre>
<pre accuse="aContent" class="answer-text mb-10" style="font-size: 14px; padding: 0px; margin-top: 0px; margin-bottom: 10px; line-height: 24px; font-family: arial, 'courier new', courier, 宋体, monospace; color: rgb(51, 51, 51); word-wrap: break-word;">
</pre>
<pre accuse="aContent" class="answer-text mb-10" style="font-size: 14px; padding: 0px; margin-top: 0px; margin-bottom: 10px; line-height: 24px; font-family: arial, 'courier new', courier, 宋体, monospace; color: rgb(51, 51, 51); word-wrap: break-word;">
在当前目录里查找文件：  find -name 文件名</pre>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	copy文件： cp&nbsp; file&nbsp; file.bak</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	copy文件夹：cp&nbsp; -R file&nbsp; file.bak</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	强制删除文件： rm -ef file&nbsp; (-rf 是删除目录)</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	设置文件权限：chmod 777 file （最高权限</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	&nbsp;</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	<span style="color: rgb(51, 51, 51);"><span style="color: rgb(69, 69, 69);"><span style="line-height: 26px; font-family: Arial; color: rgb(0, 0, 0);">ps -ef&nbsp; | grep nginx&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查进程</span></span></span></p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	&nbsp;</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	查看所有端口占用：<span style="font-size: 13px; line-height: 24px; font-family: 'Microsoft YaHei', 微软雅黑, Arial, 'Lucida Grande', Tahoma, sans-serif; text-indent: 26px;">netstat -ntlp</span></p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	设置alias：vim /etc/bashrc&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source&nbsp;&nbsp;/etc/bashrc</p>
<p style="margin: 5px 0px; color: rgb(0, 0, 0); font-family: 微软雅黑; font-size: 14px;">
	&nbsp;</p>
<p>
	<img class="comp_img"  src="http://static.xiaoqiqiu.com/default.jpg"  title="点击查看原图" / data="http://xiaoqiqiu.com/upload/imgCompress/20140219190347_.jpg"  lazyload="1" /></p>
','sort_id'=>'0','time'=>'2014-02-19 19:05:55','ip'=>'113.107.234.109','cmt_num'=>'0','comment_num'=>'0',),'1'=>array('id'=>'120','username'=>'acol','title'=>'','content'=>'<p>
	&nbsp;</p>
<p>
	<img class="comp_img"  src="http://static.xiaoqiqiu.com/default.jpg"  title="点击查看原图" / data="http://xiaoqiqiu.com/upload/imgCompress/20140212183826_.JPG"  lazyload="1" /></p>
<p>
	<span style="font-size:48px;">奔跑的维尼</span></p>
<p>
	<font size="3">大图片上传有问题~~好像nginx配置没改对</font></p>
','sort_id'=>'0','time'=>'2014-02-12 18:57:08','ip'=>'113.107.234.109','cmt_num'=>'0','comment_num'=>'0',),'2'=>array('id'=>'113','username'=>'acol','title'=>'','content'=>'<p>
	<img class="comp_img"  src="http://static.xiaoqiqiu.com/default.jpg"  title="点击查看原图" / data="http://xiaoqiqiu.com/upload/imgCompress/20140122172208_.jpg"  lazyload="1" />新版你好~</p>
<p>
	维尼的表情 哈哈</p>
','sort_id'=>'0','time'=>'2014-01-24 18:05:18','ip'=>'113.107.234.109','cmt_num'=>'4','comment_num'=>'0',),'3'=>array('id'=>'119','username'=>'acol','title'=>'','content'=>'<p>
	<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" height="505" id="object_acol_flash_0.02186332060955465" width="600"><param name="movie" value="http://player.youku.com/player.php/sid/XMjMwNTA0MTYw/v.swf" /><param name="allowScriptAccess" value="always" /><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><embed allowfullscreen="true" allowscriptaccess="always" height="505" id="embed_acol_flash_0.02186332060955465" pluginspage="http://www.macromedia.com/go/getflashplayer" src="http://player.youku.com/player.php/sid/XMjMwNTA0MTYw/v.swf" type="application/x-shockwave-flash" width="600" wmode="opaque"></embed></object></p>

	&nbsp; &nbsp; &nbsp; &nbsp; Broken Angel的MV画面唯美，故事动人。

	理解MV的故事，听歌时更添丝丝感动...

	这是一个经典的三部曲

	第一个是《Arash》初见相恋

	第二个是《Pure Love》生死离别

	街上发生了车祸，Arash赶到现场，发现爱人Marianne Puglia受伤被送上救护车。

	他跟上车，握住爱人的手，回忆起甜蜜往事点点滴滴, 纯纯的爱

	医院中，Marianne Puglia在救护后醒来，Arash才发现自已已死去，只是灵魂留在了世上

	他悄然离去...

	第三个是《Broken Angel》

	Arash回来找恋人，看到Marianne Puglia已结婚，有丈夫、小孩和家。

	她回忆往事，深感孤独痛苦。人鬼之恋，缠绵悱恻。

	Marianne Puglia驱车来到悬崖，将旧照片洒向空中...
','sort_id'=>'0','time'=>'2014-01-24 18:04:10','ip'=>'113.107.234.109','cmt_num'=>'0','comment_num'=>'0',),'4'=>array('id'=>'116','username'=>'acol','title'=>'','content'=>'<p>
	&nbsp;</p>
<p>
	<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" height="505" id="object_acol_flash_0.17552793701179326" width="600"><param name="movie" value="http://player.youku.com/player.php/sid/XNjU5NTkyMjQ0/v.swf" /><param name="allowScriptAccess" value="always" /><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><embed allowfullscreen="true" allowscriptaccess="always" height="505" id="embed_acol_flash_0.17552793701179326" pluginspage="http://www.macromedia.com/go/getflashplayer" src="http://player.youku.com/player.php/sid/XNjU5NTkyMjQ0/v.swf" type="application/x-shockwave-flash" width="600" wmode="opaque"></embed></object></p>
','sort_id'=>'0','time'=>'2014-01-24 17:51:38','ip'=>'113.107.234.109','cmt_num'=>'0','comment_num'=>'0',),'5'=>array('id'=>'111','username'=>'acol','title'=>'','content'=>'<p>
	由于自己的html+css比较业余，所以想用 Bootstrap 做另一个版本的UI，而且不再考虑SEO，首屏内容也直接异步。<img alt="" height="96"  src="http://static.xiaoqiqiu.com/default.jpg"  title="" width="96" / data="http://xiaoqiqiu.com/ckeditor/plugins/smiley/images/22.gif"  lazyload="1" /></p>
','sort_id'=>'0','time'=>'2013-12-10 18:20:11','ip'=>'113.107.234.109','cmt_num'=>'0','comment_num'=>'0',),'6'=>array('id'=>'108','username'=>'acol','title'=>'','content'=>'<p>
	感谢涛锅大力协助，终于把小气球站的rewrite搞好了~~ 附上配置</p>
<pre class="brush:bash;">
server {
        ,,,,,

        rewrite ^/view/(.*)$ /view/$1 break;  #break 终止匹配, 不再匹配后面的规则
        rewrite ^/api/(.*)$ /api/$1 break;
        rewrite ^/plugin/(.*)$ /plugin/$1 break;
        rewrite ^/ckeditor/(.*)$ /ckeditor/$1 break;
        rewrite ^/upload/(.*)$ /upload/$1 break;

        rewrite ^/(.*)$ /index.php break;   #所有匹配到的都指向入口文件index.php
            
        error_page  404  /404.html;
  
        ......
  }</pre>
','sort_id'=>'0','time'=>'2013-11-29 11:31:34','ip'=>'113.107.234.109','cmt_num'=>'0','comment_num'=>'0',),'7'=>array('id'=>'107','username'=>'acol','title'=>'','content'=>'<p>
	按文章发布时间分类已做好~</p>
<p>
	下一步开始研究这个rewrite了</p>
','sort_id'=>'0','time'=>'2013-11-15 11:15:31','ip'=>'113.107.234.109','cmt_num'=>'0','comment_num'=>'0',),),'userInfo'=>array('0'=>'1','id'=>'1','1'=>'acol','username'=>'acol','2'=>'7d167d2061829b54eec7170420de558327546422','password'=>'7d167d2061829b54eec7170420de558327546422','3'=>'野生纯种程序猿一枚，求包养','desc'=>'野生纯种程序猿一枚，求包养','4'=>'http://xiaoqiqiu.com/view/img/1.jpg','face'=>'http://xiaoqiqiu.com/view/img/1.jpg','5'=>'<iframe frameborder="0" scrolling="no" src="http://show.v.t.qq.com/index.php?c=show&a=index&n=acolcat&w=180&h=552&fl=2&l=4&o=31&co=4&cs=29455F_29455F_238C1C_0B0B0D" width="180" height="552"></iframe>','tqq'=>'<iframe frameborder="0" scrolling="no" src="http://show.v.t.qq.com/index.php?c=show&a=index&n=acolcat&w=180&h=552&fl=2&l=4&o=31&co=4&cs=29455F_29455F_238C1C_0B0B0D" width="180" height="552"></iframe>','6'=>'<iframe width="100%" height="550" class="share_self"  frameborder="0" scrolling="no" src="http://widget.weibo.com/weiboshow/index.php?language=&width=0&height=550&fansRow=1&ptype=1&speed=0&skin=1&isTitle=1&noborder=1&isWeibo=1&isFans=1&uid=1879892684&verifier=6d797160&dpc=1"></iframe>','weibo'=>'<iframe width="100%" height="550" class="share_self"  frameborder="0" scrolling="no" src="http://widget.weibo.com/weiboshow/index.php?language=&width=0&height=550&fansRow=1&ptype=1&speed=0&skin=1&isTitle=1&noborder=1&isWeibo=1&isFans=1&uid=1879892684&verifier=6d797160&dpc=1"></iframe>','7'=>'1392790613','login_time'=>'1392790613','8'=>'113.107.234.109','login_ip'=>'113.107.234.109','9'=>'1362480155','reg_time'=>'1362480155','10'=>'1','status'=>'1','11'=>'1','version'=>'1',),'page'=>'1','last_page'=>'9','user'=>'acol','is_mine'=>'0',); ?><!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
	<title>维尼的小气球 - acol</title>
	<meta name="baidu-site-verification" content="QLZgvM8k8P" />
	<meta name="Keywords" content="小气球，维尼的小气球，acol的小气球，简单交互是我的追求" />
	<meta name="Description" content="小气球，维尼的小气球，acol的小气球，简单交互是我的追求" />
	<link rel="shortcut icon" href="weini.ico" type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <!-- <link rel="stylesheet" href="http://xiaoqiqiu.com/plugin/bootstrap2.x/css/bootstrap.min.css"> -->
	<link rel="stylesheet" href="http://cdn.bootcss.com/twitter-bootstrap/3.0.3/css/bootstrap.min.css">
	<link rel="stylesheet" href="http://xiaoqiqiu.com/plugin/grumble/css/grumble.min.css">

	<link href="http://xiaoqiqiu.com/plugin/uploadify/uploadify.css" rel="stylesheet" type="text/css" />
	<link type="text/css" rel="stylesheet" href="http://xiaoqiqiu.com/plugin/SyntaxHighlighter/Styles/shCore.css"/>
	<link type="text/css" rel="stylesheet" href="http://xiaoqiqiu.com/plugin/SyntaxHighlighter/Styles/shThemeDefault.css"/>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="http://cdn.bootcss.com/html5shiv/3.7.0/html5shiv.min.js"></script>
        <script src="http://cdn.bootcss.com/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="http://static.xiaoqiqiu.com/css/bootstrap/main.css">
	<link rel="stylesheet" href="http://static.xiaoqiqiu.com/css/global.css">

  </head>
  <body>
  	<div id="loading_bar" class="progress active progress-striped progress-success hide">
		<div class="progress-bar" style="width: 10%;">加载中</div>
	</div>

    <div id="container" class="container">
		<div class="row">
			<div class="col-md-12">
				
				<h3 class="text-center">
					<?php echo  $data['userInfo']['desc']; ?>
				</h3>

				<div id="top_menu" class="navbar navbar-inverse" role="navigation">
			        <div class="navbar-header">
			          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			            <span class="sr-only">Toggle navigation</span>
			            <span class="icon-bar"></span>
			            <span class="icon-bar"></span>
			            <span class="icon-bar"></span>
			          </button>
			          <a class="navbar-brand" href="">Home</a>
			        </div>
			        <div class="navbar-collapse collapse">

			          <ul class="nav navbar-nav">
			            <li><a href="/<?php echo  $data["user"]; ?>/wall">图片墙</a></li>
			            <li><a href="/<?php echo  $data["user"]; ?>/video">精彩视频墙</a></li>
			            <li>
			            	<a id="add_something" class="tooltip-acol" data-original-title="文章图片视频" href="#" <?php if($global['is_mine'] != 1){ ?> style="display:none;" <?php } ?> data-toggle="modal" data-target="#myModal">发表</a>
			            </li>
			            <li class="dropdown">
			              <a href="#" class="dropdown-toggle" data-toggle="dropdown">友情链接 <b class="caret"></b></a>
			              
			              <ul class="dropdown-menu">
			                <li><a href="http://www.56.com" target="_blank">56视频</a></li>
			                <li><a href="http://somoban.net/" target="_blank">海滨的搜模板</a></li>
			                <li class="divider"></li>
			                <li><a href="http://www.68waibo.com/" target="_blank">海滨的歪脖</a></li>
			                <li><a href="http://www.langag.net/" target="_blank">烂GAG</a></li>
							<li><a href="http://blogger.readplan.com/" target="_blank">小勇的blog</a></li>
			              </ul>

			            </li>
			          </ul>

			          <ul id="profile_ul" class="nav navbar-nav navbar-right">
			          <?php if( !isset($_SESSION['username']) ){ ?>
			            	<li class="active"><a id="login_btn" data-toggle="modal" data-target="#myModal" href="#" onclick="return false;">登录</a></li>
			            	<li><a id="reg_btn" data-toggle="modal" data-target="#myModal" href="#" onclick="return false;">注册</a></li>
			           <? }else{ ?>
							<li class="active"><a href="http://xiaoqiqiu.com/<?php echo  $_SESSION['username']; ?>">当前登录：<?php echo  $_SESSION['username']; ?></a></li>
			            	<li><a id="edit_btn" data-toggle="modal" data-target="#myModal" href="#" onclick="return false;">修改资料</a></li>
			            	<li><a id="logout_btn" data-toggle="modal" data-target="#myModal" href="#" onclick="return false;">退出</a></li>

			            	<?php if( $data["is_mine"] == 1 ){ ?>
			            		<li><a href="http://xiaoqiqiu.com/api/index/changeVer.php?action=change_version&user=acol&version=0">换版本</a></li>
			            	<?php } ?>
			           <?php } ?>
			          </ul>
			        </div><!--/.nav-collapse -->
			    </div>

			</div>
		</div>
		<div class="row">
			<div id="content" class="col-md-8">
				
				<?php foreach($data['db'] as $i=>$arr){ ?>
					<div class="circle radius" aid="<?php echo $arr['id']; ?>">
						<div class="comment-float"><em><a href="#" alt="<?php echo $arr['id']; ?>"><?php echo $arr['cmt_num']; ?></a></em></div>
						<?php if($data["is_mine"] == 1){ ?>
						<a class="acticle-close" href="#" onfocus="this.blur();" onclick="$_BsAdd.del_article(<?php echo $arr['id']; ?>);return false;"> × </a>
						<a class="acticle-edit" href="#" onfocus="this.blur();" onclick="$_BsAdd.edit_article(<?php echo $arr['id']; ?>);return false;"> + </a>
						<?php } ?>
						<div class="acticle-content">
							<?php echo $arr['content']; ?>
						</div>
						<div class="comment_div">
							<span class="author"> <?php echo $arr['username']; ?> 于 <?php echo $arr['time']; ?> 发表</span>
							<span class="comment"><a href="#" alt="<?php echo $arr['id']; ?>">我有想法(<?php echo $arr['cmt_num']; ?>)</a></span>
						</div>
					</div>
					<div class="left_shadow">
						<div class="right_shadow"></div>
					</div>
				<?php } ?>

			</div>
			<div class="col-md-4">
				
				<div>
					<img height="200px" width="200px" src="<?php echo  $data['userInfo']['face']; ?>" class="img-circle" />
					<p><label id="now_user"></label></p>
				</div>

				<div id="time_line" class="menu radius">
					<h4>时间轴</h4>
					<div class="slide_item" style="display:block;">
						<ul id="sort_ul" class="sort_ul"></ul>
					</div>
				</div>

				<div class="carousel slide" id="carousel-794314" data-ride="carousel">
					<ol class="carousel-indicators">
						<li class="active" data-slide-to="0" data-target="#carousel-794314">
						</li>
						<li data-slide-to="1" data-target="#carousel-794314">
						</li>
						<li data-slide-to="2" data-target="#carousel-794314">
						</li>
					</ol>
					<div class="carousel-inner">
						<div class="item active">
							<img width="360px" alt="" src="http://xiaoqiqiu.com/upload/imgCompress/20121111022246_.jpg" />
							<div class="carousel-caption">
								<p>由于自己的html+css比较业余，所以想用 Bootstrap 做另一个版本的UI，而且不再考虑SEO，首屏内容也直接异步。</p>
							</div>
						</div>
						<div class="item">
							<img width="360px" alt="" src="http://xiaoqiqiu.com/upload/imgCompress/20130804175202_.JPG" />
							<div class="carousel-caption">
								<p>感谢涛锅大力协助，终于把小气球站的rewrite搞好了~~ 附上配置</p>
							</div>
						</div>
						<div class="item">
							<img width="360px" alt="" src="http://xiaoqiqiu.com/upload/imgCompress/20130130223740_.jpg" />
							<div class="carousel-caption">
								<p>按文章发布时间分类已做好~ 下一步开始研究这个rewrite了</p>
							</div>
						</div>
					</div> <!-- <a data-slide="prev" href="#carousel-794314" class="left carousel-control">‹</a> <a data-slide="next" href="#carousel-794314" class="right carousel-control">›</a> -->
					<a class="left carousel-control" href="#carousel-794314" data-slide="prev">
			          <span class="glyphicon glyphicon-chevron-left"></span>
			        </a>
			        <a class="right carousel-control" href="#carousel-794314" data-slide="next">
			          <span class="glyphicon glyphicon-chevron-right"></span>
			        </a>
				</div>


				<?php if( !empty($data['userInfo']['weibo']) ){ ?>
				<div class="jumbotron" style="margin-top:10px">
					<!-- <h1>
						Hello, world!
					</h1>
					<p>
						这是一个可视化布局模板, 你可以点击模板里的文字进行修改, 也可以通过点击弹出的编辑框进行富文本修改. 拖动区块能实现排序.
					</p> -->
					
					<em class="weibo_logo">&nbsp;&nbsp;&nbsp;&nbsp;</em>新浪微博
					<div class="slide_item"><?php echo  $data['userInfo']['weibo']; ?></div>
					
					<p>
						<a class="btn btn-default btn-primary btn-lg" href="http://weibo.com" target="_blank">查看更多 »</a>
					</p>
				</div>
				<?php } ?>

				<!-- Modal -->
				<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				  <div class="modal-dialog">
				    <div class="modal-content">
				      <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
				      </div>
				      <div id="modal_body" class="modal-body">
				        ...
				      </div>
				      <div class="modal-footer">
				        <button id="modal_btn1" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				        <button id="modal_btn2" type="button" class="btn btn-primary">Save changes</button>
				      </div>
				    </div><!-- /.modal-content -->
				  </div><!-- /.modal-dialog -->
				</div><!-- /.modal -->

			</div>
		</div>
	</div>

	<div id="gotop" style="position: fixed; bottom: 50px; left: 1000px; cursor: pointer;display:none;" title="猛击我可以灰~">
		<img src="http://static.xiaoqiqiu.com/img/gotop.png" style="width:64px; height:64px;" />
	</div>
	<input id="nowpage" type="hidden" value="1" />
	
	<!--弹层hepler-->
	<a id="pop_helper" href="#" data-toggle="modal" data-target="#myModal"></a>

	<!--百度分享-->
	<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"2","bdPos":"right","bdTop":"110"}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>

	<script type="text/javascript" src="http://xiaoqiqiu.com/plugin/SyntaxHighlighter/Scripts/shCore.js"></script>
	<script type="text/javascript" src="http://xiaoqiqiu.com/plugin/SyntaxHighlighter/Scripts/shBrushes.js"></script>
	<script type="text/javascript">
		//	初始化
		var WEB_ROOT = '<?php echo  WEB_ROOT; ?>',
			STATIC_ROOT = '<?php echo  STATIC_ROOT; ?>',
			IS_MINE = <?php echo  $data["is_mine"]; ?>,
			USER = '<?php echo  $data["user"]; ?>';
		SyntaxHighlighter.config.clipboardSwf = WEB_ROOT +'plugin/SyntaxHighlighter/Scripts/clipboard.swf';
		SyntaxHighlighter.all();
	</script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <!--<script src="http://xiaoqiqiu.com/plugin/bootstrap2.x/js/bootstrap.min.js"></script>-->
	<script src="http://cdn.bootcss.com/twitter-bootstrap/3.0.3/js/bootstrap.min.js"></script>
	<script src="http://xiaoqiqiu.com/plugin/grumble/js/jquery.grumble.min.js"></script>
	<script src="http://xiaoqiqiu.com/plugin/jquery.pin/jquery.pin.min.js"></script>

	<script src="http://static.xiaoqiqiu.com/js/bootstrap/bspop.js"></script>
	<script type="text/javascript" src="http://static.xiaoqiqiu.com/js/helper.js"></script>
	<script type="text/javascript" src="http://static.xiaoqiqiu.com/js/space_ui_v2.js"></script>
	<script src="http://static.xiaoqiqiu.com/js/bootstrap/main.js"></script>
	<script type="text/javascript" src="http://static.xiaoqiqiu.com/js/curtain.js"></script>
	<script type="text/javascript" src="http://static.xiaoqiqiu.com/js/weather.js"></script>

	<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F2c99824a3757f51aecbd3546e2bf0724' type='text/javascript'%3E%3C/script%3E"));
</script>
  </body>
</html>
