(function($){
	var Weather = function(op){
		if(this instanceof Weather){
			this.setOp(op);
		}else{
			return new Weather(op);
		}
	}
	Weather.prototype = {
		w_html : function(){
			var rand_num = Math.floor(Math.random()*50);
			if(rand_num == 0)rand_num = 1;
			var w_html = [];
			w_html.push('<div class="weather" id="XQQ_weather">');
			w_html.push('<img src="'+ STATIC_ROOT +'img/weather/sketchy_weather_'+ rand_num +'.png" />');
			w_html.push('</div>');
			w_html = w_html.join("");
			$(document.body).append(w_html);
		},
		setOp : function(op){
			//	加载CSS
			$_Helper.loadCss(STATIC_ROOT +'css/weather.css');
			this.w_html();
		}
	}

	function getWeather() {
	    //request get current ip  
	    $.ajax({url: 'http://61.4.185.48:81/g/', dataType: "script", success: function(result){  
	        var weatherUrl;    //Current city url  
	        var provinceCode;    //Current province code  
	        var cityCode;    //Current city code  
	        var H_CITY = ["北京", "上海", "天津", "重庆"];  
	        if (ip){  
	            var new_ip = ip.replace("_", "").replace("_", "");  
	            //according to current ip get current city detail info  
	            $.ajax({url: ('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' + new_ip), dataType: "script", success: function(_result){  
	                if (typeof remote_ip_info == 'object' && remote_ip_info.ret == '1'){     
	                	var city = remote_ip_info.city;
						$.getScript("http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=2&city=" + city + "&dfc=3", function() {
				            if (typeof type != 'undefined' && type == 'js') {
				            	//echo(city);
                                console.log(SWther)
				            }
                            console.log(SWther)
				        });
	                }
	            }, timeout: "3000"});  
	        } else {     
	            $("#weatherContent").html("没有找到IP信息！");  
	        }  
	    }, timeout: "3000"});  
	}
	function dis_img(weather) {
        var style_img = "http://mj.588cy.com/img/s_13.png";
        if (weather.indexOf("多云") !== -1 || weather.indexOf("晴") !== -1) {
            style_img = "http://mj.588cy.com/img/s_1.png";
        } else if (weather.indexOf("多云") !== -1 && weather.indexOf("阴") !== -1) {
            style_img = "http://mj.588cy.com/img/s_2.png";
        } else if (weather.indexOf("阴") !== -1 && weather.indexOf("雨") !== -1) {
            style_img = "http://mj.588cy.com/img/s_3.png";
        } else if (weather.indexOf("晴") !== -1 && weather.indexOf("雨") !== -1) {
            style_img = "http://mj.588cy.com/img/s_12.png";
        } else if (weather.indexOf("晴") !== -1 && weather.indexOf("雾") !== -1) {
            style_img = "http://mj.588cy.com/img/s_12.png";
        } else if (weather.indexOf("晴") !== -1) {
            style_img = "http://mj.588cy.com/img/s_13.png";
        } else if (weather.indexOf("多云") !== -1) {
            style_img = "http://mj.588cy.com/img/s_2.png";
        } else if (weather.indexOf("阵雨") !== -1) {
            style_img = "http://mj.588cy.com/img/s_3.png";
        } else if (weather.indexOf("小雨") !== -1) {
            style_img = "http://mj.588cy.com/img/s_3.png";
        } else if (weather.indexOf("中雨") !== -1) {
            style_img = "http://mj.588cy.com/img/s_4.png";
        } else if (weather.indexOf("大雨") !== -1) {
            style_img = "http://mj.588cy.com/img/s_5.png";
        } else if (weather.indexOf("暴雨") !== -1) {
            style_img = "http://mj.588cy.com/img/s_5.png";
        } else if (weather.indexOf("冰雹") !== -1) {
            style_img = "http://mj.588cy.com/img/s_6.png";
        } else if (weather.indexOf("雷阵雨") !== -1) {
            style_img = "http://mj.588cy.com/img/s_7.png";
        } else if (weather.indexOf("小雪") !== -1) {
            style_img = "http://mj.588cy.com/img/s_8.png";
        } else if (weather.indexOf("中雪") !== -1) {
            style_img = "http://mj.588cy.com/img/s_9.png";
        } else if (weather.indexOf("大雪") !== -1) {
            style_img = "http://mj.588cy.com/img/s_10.png";
        } else if (weather.indexOf("暴雪") !== -1) {
            style_img = "http://mj.588cy.com/img/s_10.png";
        } else if (weather.indexOf("扬沙") !== -1) {
            style_img = "http://mj.588cy.com/img/s_11.png";
        } else if (weather.indexOf("沙尘") !== -1) {
            style_img = "http://mj.588cy.com/img/s_11.png";
        } else if (weather.indexOf("雾") !== -1) {
            style_img = "http://mj.588cy.com/img/s_12.png";
        } else {
            style_img = "http://mj.588cy.com/img/s_2.png";
        }
        return style_img;
    };

    function echo(city) {
        $('#city')
            .html(city);
        $('#weather')
            .html(window.SWther.w[city][0].s1);
        $('#temperature')
            .html(window.SWther.w[city][0].t1 + '°');
        $('#wind')
            .html(window.SWther.w[city][0].p1);
        $('#direction')
            .html(window.SWther.w[city][0].d1);
        $('#T_weather')
            .html(window.SWther.w[city][0].s1);

        var T_weather_img = dis_img(window.SWther.w[city][0].s1);
        $('#T_weather_img')
            .html("<img src='" + T_weather_img + "' title='" + window.SWther.w[city][0].s1 + "' alt='" + window.SWther.w[city][0].s1 + "' />");
        $('#T_temperature')
            .html(window.SWther.w[city][0].t1 + '~' + window.SWther.w[city][0].t2 + '°');
        $('#T_wind')
            .html(window.SWther.w[city][0].p1);
        $('#T_direction')
            .html(window.SWther.w[city][0].d1);
        $('#M_weather')
            .html(window.SWther.w[city][1].s1);

        var M_weather_img = dis_img(window.SWther.w[city][1].s1);
        $('#M_weather_img')
            .html("<img src='" + M_weather_img + "' title='" + window.SWther.w[city][1].s1 + "' alt='" + window.SWther.w[city][1].s1 + "' />");
        $('#M_temperature')
            .html(window.SWther.w[city][1].t1 + '~' + window.SWther.w[city][1].t2 + '°');
        $('#M_wind')
            .html(window.SWther.w[city][1].p1);
        $('#M_direction')
            .html(window.SWther.w[city][1].d1);
        $('#L_weather')
            .html(window.SWther.w[city][2].s1);

        var L_weather_img = dis_img(window.SWther.w[city][2].s1);
        $('#L_weather_img')
            .html("<img src='" + L_weather_img + "' title='" + window.SWther.w[city][2].s1 + "' alt='" + window.SWther.w[city][2].s1 + "' />");
        $('#L_temperature')
            .html(window.SWther.w[city][2].t1 + '~' + window.SWther.w[city][2].t2 + '°');
        $('#L_wind')
            .html(window.SWther.w[city][2].p1);
        $('#L_direction')
            .html(window.SWther.w[city][2].d1);
    }
	  

	var a = new Weather('');   //暂时做装饰用吧
	//getWeather();
})(jQuery);