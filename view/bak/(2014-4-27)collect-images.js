(function(g, i) {
    g.d = {
        b: null,
        g: null,
        a: !1,
        e: function() {
            if (/xiaoqiqiu\.com/.test(window.location.href)) alert("\u8bf7\u4e0d\u8981\u91cd\u590d\u6293\u53d6\u56fe\u7247!");
            else {
                // if( document.getElementById('mt_container') != null ){
                //     if( document.getElementById('mt_container').style.display == 'none' )
                //         document.getElementById('mt_container').style.display = 'block';
                //     return;
                // }
                
                if (this.a) this.c.innerHTML = "", e = this.c, c = this.b;
                else {
                    var a = document.createElement("style");
                    a.type = "text/css";
                    try {
                        a.innerHTML = "#mt_container{} #mt_container ul li{background:#fff;list-style:none;width:160px;height:160px;text-align:center;float:left;border:1px solid #ccc;padding:3px;margin-right:10px;position:relative;} #mt_container ul li:hover .grub_cover{cursor:pointer;display:block;} .grub_cover{display:none;background:#000;position:absolute;top:0;left:0;width:166px;height:166px;opacity:.7;} .grub_cover a{color:#fff;font-size:24px;font-weight:bold;} #btn_close:hover{background:#999 !important;}.btn_grub{display:block;padding-top:40px;}.img_size{display:block;color:#fff;font-size:10px;}"
                    } catch (m) {
                        a.styleSheet.cssText = "#mt_container{} #mt_container ul li{background:#fff;width:160px;height:160px;text-align:center;float:left;border:1px solid #ccc;padding:3px;margin-right:10px;position:relative;} #mt_container ul li:hover .grub_cover{display:block;} .grub_cover{display:none;background:#000;position:absolute;top:0;left:0;width:166px;height:166px;opacity:.7;} .grub_cover a{color:#fff;font-size:24px;font-weight:bold;} #btn_close:hover{background:#999 !important;}.btn_grub{display:block;padding-top:40px;}.img_size{display:block;color:#fff;font-size:10px;}"
                    }
                    i.body.appendChild(a);
                    var c = this.b = document.createElement("div");
                    c.id = "mt_container";
                    a = document.createElement("div");
                    a.id = "btn_close";
                    a.style.cssText = "height:30px;background:#333;color:#fff;text-align:center;line-height:30px;cursor:pointer";
                    a.innerHTML = "\u5173\u95ed";
                    c.appendChild(a);
                    var e = this.c = document.createElement("ul");
                    e.style.cssText = "overflow:hidden;clear:both;padding:20px;"
                }
                var f = document.createElement("li");
                f.style.cssText = "background:url(http://static.xiaoqiqiu.com/default.jpg) center center no-repeat;";
                e.appendChild(f);
                f.innerHTML = '点击喜欢的图片进行采集 →';

                if(typeof limit_w == 'undefined')limit_w = 300;
                if(typeof limit_h == 'undefined')limit_h = 200;

                for (var j = f = 0, l = document.images.length; j < l; j++) {
                    var b = document.images[j];
                    if (limit_w < b.width && limit_h < b.height) {
                        f++;
                        var k = document.createElement("li"),
                            d = new Image;
                        d.src = b.src;
                        b.width > b.height ? (d.width = 160, d.height = 160 * b.height / b.width) : (d.height = 160, d.width = 160 * b.width / b.height);
                        var h = document.createElement("div");
                        h.className = "grub_cover";
                        h.innerHTML = '<a href="javascript:void 0;" class="btn_grub">\u91c7\u96c6</a><span class="img_size"> ' + b.width + "px X" + b.height + "px </span>";
                        h.onclick = function(a, b, c, d, e) {
                            return function() {
                                g.open("http://xiaoqiqiu.com/api/index/saveNetImg.php?netImg=" + encodeURIComponent(a) + "&img_title=" + encodeURIComponent(b) + "&imgAlt=" + encodeURIComponent(c) + "&doc_title=" + encodeURIComponent(d) + "&doc_url=" + encodeURIComponent(e), "", "status=no,resizable=no,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=340,height=120,left=0,top=0")
                            }
                        }(b.src, b.title, b.alt, i.title, g.location.href);
                        d.setAttribute("style", "");
                        k.appendChild(d);
                        k.appendChild(h);
                        e.appendChild(k)
                    }
                }

                if(f < 1){
                    alert('当前页面搜索不到图片，或者搜到的图片尺寸太小');
                }

                this.a ? c.style.display = "block" : (0 < f && (c.appendChild(e), c.style.cssText = "width:100%;height:100%;background:#f1f1f1;position:fixed;top:0;left:0;z-index:9999;", i.body.appendChild(c)), a.onclick = function() {
                    c.style.display = "none"
                }, this.a = !0)
            }
        },
        f: function() {
            var a = document.documentElement;
            return {
                width: window.innerWidth || a && a.clientWidth || document.body.clientWidth,
                height: window.innerHeight || a && a.clientHeight || document.body.clientHeight
            }
        }
    };
    g.d.e()
})(window, document);