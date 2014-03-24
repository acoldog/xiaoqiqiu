(function($) {
    var ScrollPage = {
        page_container: $('#acolScrollPage'),
        content_container: $('#content'),
        per_page_screen: 3,
        per_page_scroll: 1,
        now_page: 1,
        now_screen: 1,
        total_page: 50,
        total_screen: 0,
        hide_page: '...',
        pre_page: '上一页',
        next_page: '下一页',
        show_page_list: 3,
        test_content: '<p>我是测试内容！！</p><p>我是测试内容！！</p><p>我是测试内容！！</p>',
        scroll_delay: 1000,
        is_scroll: true,
        scroll_T: null,
        is_bottom: false,
        scroll_height: 100,
        is_loading: false,
        auto_show_page_list: true,
        init: function(op) {
            if (op) {
                for (var i in op) {
                    if (typeof op[i] != 'undefined') {
                        this[i] = op[i];
                    }
                }
            }
            var _that = ScrollPage;
            this.total_screen = Math.ceil(this.total_page / this.per_page_screen);
            $(window).scroll(function() {
                if (_that.now_page >= _that.total_page) {
                    _that.createPageList(_that.now_screen);
                    _that.page_container.show();
                    return false;
                }
                if (!_that.is_bottom && _that.is_scroll && (($(document).scrollTop() + $(window).height()) > ($(document).height() - _that.scroll_height))) {
                    _that.nextPage();
                }
            });
            this.page_container.delegate('a' ,'mousedown', function() {
                var now_screen = $(this).text();
                if (now_screen == _that.pre_page) {
                    if (_that.now_screen <= 1) return;
                    _that.now_screen -= 1;
                    now_screen = _that.now_screen;
                } else if (now_screen == _that.next_page) {
                    if (_that.now_screen >= _that.total_screen) return;
                    _that.now_screen += 1;
                    now_screen = _that.now_screen;
                } else {
                    _that.now_screen = parseInt(now_screen);
                }
                _that.now_page = (now_screen - 1) * _that.per_page_screen;
                _that.content_container.empty().css('height', '0px');
                _that.page_container.hide();
                _that.is_bottom = false;
                _that.nextPage();
            });
        },
        nextPage: function() {
            this.is_scroll = false;
            if (this.scroll_delay > 0) {
                this.scroll_T = setTimeout(function() {
                    this.is_scroll = true;
                }, this.scroll_delay);
            }
            this.now_page = this.now_page + this.per_page_scroll;
            if (this.now_page > this.now_screen * this.per_page_screen) this.now_page = this.now_screen * this.per_page_screen;
            if (this.now_page % this.per_page_screen == 0) {
                this.createPageList(this.now_screen);
                this.is_bottom = true;
            }
        },
        createPageList: function(screen) {
            var href = ' href="javascript:;" ',
                list_html = [];
            total_screen = this.total_screen;
            if (screen > total_screen) screen = total_screen;
            if (screen < 1) screen = 1;
            this.now_screen = screen;
            var pre_screen = screen - 1;
            list_html.push('<a ' + href + ' onclick="AcolScrollPage.createPageList(' + (screen - 1) + ');return false;">' + this.pre_page + '</a>');
            if (pre_screen > 1) {
                list_html.push('<a ' + href + ' onclick="AcolScrollPage.createPageList(1);return false;">1</a>');
                if (pre_screen > 2)
                    list_html.push('<span class="mod56_page_pn_ellipsis">' + this.hide_page + '</span>');
            }
            for (var i = pre_screen; i < (pre_screen + this.show_page_list); i++) {
                if (i < 1) i = 1;
                if (i >= total_screen) break;
                if (i == screen) {
                    list_html.push('<span class="mod56_page_pn_current">' + i + '</span>');
                } else {
                    list_html.push('<a ' + href + ' onclick="AcolScrollPage.createPageList(' + i + ');return false;">' + i + '</a>');
                }
            }
            if (i < total_screen) {
                list_html.push('<span class="mod56_page_pn_ellipsis">' + this.hide_page + '</span>');
            }
            if (total_screen == screen) {
                list_html.push('<span class="mod56_page_pn_current">' + total_screen + '</span>');
            } else {
                list_html.push('<a ' + href + ' onclick="AcolScrollPage.createPageList(' + total_screen + ');return false;">' + total_screen + '</a>');
            }
            list_html.push('<a ' + href + ' onclick="AcolScrollPage.createPageList(' + ((+screen) + 1) + ');return false;">' + this.next_page + '</a>');
            list_html = list_html.join('');
            this.page_container.html(list_html);
            if (this.auto_show_page_list) {
                this.page_container.show();
            }
        }
    };
    window.AcolScrollPage = ScrollPage;
})(jQuery);