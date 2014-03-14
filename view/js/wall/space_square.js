(function($) {
    var Square = {
        relate: {
            following: false,
            follow_html: function(follow_id) {
                return '<span class="follow"><a href="javascript:;" onclick="SquareOfSpace.relate.follow(this , \'' + follow_id + '\');return false;" class="btn_follow" title="关注TA">&nbsp;</a></span>';
            },
            followed_html: function(follow_id) {
                return '<span class="follow"><span class="follow_state"><em>已关注</em><a onclick="SquareOfSpace.relate.cancel_follow(this , \'' + follow_id + '\');return false;" href="javascript:;">取消</a></span></span>';
            },
            is_login: function() {
                if (usr.user_id() == '') {
                    show_login();
                    return false;
                } else {
                    return true;
                }
            },
            follow: function(obj, follow_id) {
                if (!this.is_login()) return false;
                this.following = true;
                var user_id = usr.user_id(),
                    _that = this;
                $.getJSON("http://i.56.com/api/follow.php?callback=?", {
                    follow_id: follow_id,
                    type: 'jsonp'
                }, function(data) {
                    if (data) {
                        switch (data.status) {
                            case 'success':
                                if (typeof obj == 'object' && obj != null) {
                                    var parent_obj = $(obj).parent();
                                    parent_obj.replaceWith(_that.followed_html(follow_id));
                                } else {
                                    var op = {
                                        head: '关注成功',
                                        is_cover: false,
                                        top: 300,
                                        yes: {
                                            text: '确定'
                                        }
                                    };
                                    SpaceUI.alert(op);
                                }
                                break;
                            case 'error':
                                if (typeof obj == 'object' && obj != null) {
                                    var parent_obj = $(obj).parent();
                                    parent_obj.replaceWith(_that.followed_html(follow_id));
                                }
                                break;
                            case 'noupgrade':
                                var op = {
                                    title: '还没有升级空间,不能关注.',
                                    is_cover: false,
                                    top: 300,
                                    yes: {
                                        text: '马上升级',
                                        callback: function() {
                                            window.location.href = 'http://i.56.com/index.php?action=U&do=Upgrade';
                                        }
                                    },
                                    no: {
                                        text: '取消'
                                    }
                                };
                                SpaceUI.alert(op);
                                break;
                        }
                        _that.following = false;
                    }
                });
            },
            cancel_follow: function(obj, follow_id) {
                if (!this.is_login()) return false;
                this.following = true;
                var user_id = usr.user_id(),
                    _that = this;
                $.getJSON("http://i.56.com/api/cancelFollow.php?callback=?", {
                    follow_id: follow_id,
                    type: 'jsonp'
                }, function(data) {
                    if (data) {
                        switch (data.status) {
                            case 'success':
                                var parent_obj = $(obj).parent().parent();
                                parent_obj.replaceWith(_that.follow_html(follow_id));
                                break;
                            case 'error':
                                var op = {
                                    head: data.msg,
                                    is_cover: false,
                                    top: 300,
                                    yes: {
                                        text: '确定'
                                    }
                                };
                                SpaceUI.alert(op);
                                break;
                        }
                        _that.following = false;
                    }
                });
            }
        },
        videoList: {
            masonrySet: function() {
                $('#container').imagesLoaded(function() {
                    $('#container').masonry({
                        itemSelector: '.video_item',
                        columnWidth: 242
                    });
                });
            },
            append_video_list: function(page, callback) {
                AcolScrollPage.is_loading = true;
                var user_id = 'acoldog';
                if (usr.user_id() != '') user_id = usr.user_id();
                $('#show_loading').show();
                $.getJSON('http://i.56.com/api/controlSquareData.php?type=get_video_list&uid=' + user_id + '&page=' + page + '&rand=' + Math.random() + '&callback=?', function(back) {
                    if (back) {
                        var total_page = Math.ceil(back.total / 20);
                        if (AcolScrollPage.total_page != total_page) {
                            AcolScrollPage.total_page = total_page;
                            AcolScrollPage.total_screen = Math.ceil(AcolScrollPage.total_page / AcolScrollPage.per_page_screen);
                        }
                        var back = back.data;
                        var list = [];
                        for (var i in back) {
                            if (typeof back[i] != 'object' || typeof back[i].user_info != 'object' || back[i].user_info === null || typeof back[i].user_info.UserCount == 'undefined') continue;
                            list.push('<div class="video_item">');
                            list.push('    <div class="video_info">');
                            list.push('     <div class="user">');
                            list.push('      <div class="pic" is_show="0" onmouseover="$(this).find(\'.pop\').show();SquareOfSpace.videoList.load_follow_status(this , \'' + back[i].user_id + '\');"  onmouseout="$(this).find(\'.pop\').hide();">');
                            list.push('       <div class="pop">');
                            list.push('        <div class="pop_content">');
                            list.push('         <div class="pop_detail">');
                            list.push('          <div class="pop_pic"><a onclick="setStat(\'vzoneindex_16180755\')" href="http://i.56.com/u/' + back[i].user_id + '" target="_blank"><img src="' + back[i].user_info.Photo + '" width="60" height="60" alt="' + back[i].user_info.LastName + '"></a></div>');
                            list.push('          <div class="pop_txt">');
                            list.push('           <p class="title"><a onclick="setStat(\'vzoneindex_16180755\')" href="http://i.56.com/u/' + back[i].user_id + '" class="name" target="_blank">' + back[i].user_info.LastName + '</a>' + (back[i].user_info.user_type > 0 ? '<a onclick="setStat(\'vzoneindex_16180837\')" href="http://i.56.com/verify.html" class="' + (back[i].user_info.user_type == 1 ? 'icon_verify' : 'icon_verify_co') + '" target="_blank" title="56认证用户"></a>' : '') + '</p>');
                            list.push('           <p class="gender">性别：' + back[i].user_info.Gender + '</p>');
                            list.push('           <p class="number"><span>视频：' + back[i].user_info.UserCount.video + '</span><span>专辑：' + back[i].user_info.UserCount.album + '</span><span>粉丝：' + back[i].user_info.UserCount.fan + '</span></p>');
                            list.push('          </div>');
                            list.push('         </div>');
                            list.push('         <div class="button">');
                            list.push(SquareOfSpace.relate.follow_html(back[i].user_id));
                            list.push('          <span class="links">');
                            list.push('           <a href="javascript:;" onclick="SpaceUI.MsgBox.iniBox({to_user: \'' + back[i].user_id + '\'} );return false;">发私信</a> | <a onclick="setStat(\'vzoneindex_16180755\')" href="http://i.56.com/u/' + back[i].user_id + '" target="_blank">TA的空间</a>');
                            list.push('          </span>');
                            list.push('         </div>');
                            list.push('        </div>');
                            list.push('        <span class="pop_arrow"><em>◆</em><span>◆</span></span>');
                            list.push('       </div>');
                            list.push('       <!-- ./用户信息浮层 -->');
                            list.push('       <a onclick="setStat(\'vzoneindex_16180755\')" href="http://i.56.com/u/' + back[i].user_id + '" target="_blank"><img src="' + back[i].user_info.Photo + '" width="36" height="36" alt="' + back[i].user_info.LastName + '"></a>');
                            list.push('      </div>');
                            list.push('      <div class="txt">');
                            list.push('       <p class="title"><a onclick="setStat(\'vzoneindex_16180755\')" href="http://i.56.com/u/' + back[i].user_id + '" target="_blank" class="name" >' + back[i].user_info.LastName + '</a>' + (back[i].user_info.user_type > 0 ? '<a onclick="setStat(\'vzoneindex_16180837\')" href="http://i.56.com/verify.html" class="' + (back[i].user_info.user_type == 1 ? 'icon_verify' : 'icon_verify_co') + '" target="_blank" title="56认证用户"></a>' : '') + '</p>');
                            list.push('       <p class="time">上传于' + SpaceUI.Helper.format_time(back[i].save_time, 'lasttime') + '</p>');
                            list.push('      </div>');
                            list.push('     </div>');
                            list.push('     <div class="video">');
                            list.push('      <a onclick="SquareOfSpace.playVideo(' + back[i].vid + ');return false;" href="' + back[i].flvUrl + '" onclick="setStat(\'vzoneindex_16180748\')" onmouseover="$(this).find(\'.play\').show();" onmouseout="$(this).find(\'.play\').hide();"><img src="' + back[i].img + '" width="185" height="111" alt="' + back[i].Subject + '"><span class="play" title="播放"></span></a>');
                            if (back[i].hd == 1) {
                                list.push('      <span class="video_type icon_hd"></span>');
                            } else if (back[i].hd == 2) {
                                list.push('      <span class="video_type icon_sd"></span>');
                            }
                            list.push('     </div>');
                            list.push('     <div class="content">' + back[i].Subject + '</div>');
                            list.push('    </div>');
                            list.push('    <div class="comments">');
                            if (SpaceUI.Helper.count_obj_nums(back[i].comment) > 0) {
                                list.push('     <ul>');
                                var commentData = back[i].comment;
                                for (var j in commentData) {
                                    if (typeof commentData[j] != 'object') continue;
                                    list.push('      <li>');
                                    var site_logo = '',
                                        user_href = '',
                                        site_logo = '';
                                    switch (commentData[j].type) {
                                        case 'sina':
                                            user_href = 'href="http://www.weibo.com/u/' + commentData[j].comment_userid + '" target="_blank" ';
                                            site_logo = '<a class="rp_tsina" onclick="javascript:setStat(\'qita_6_14101749\');" title="来自新浪微博" target="_blank" href="http://weibo.com/">新浪微博</a>';
                                            break;
                                        case 'renren':
                                            user_href = 'href="http://www.renren.com/' + commentData[j].comment_userid + '" target="_blank" ';
                                            site_logo = '<a class="rp_renren" onclick="javascript:setStat(\'vod_0_03131341\');" title="来自人人网" target="_blank" href="http://www.renren.com/">人人网</a>';
                                            break;
                                        case 'tqq':
                                            user_href = 'href="http://t.qq.com/' + commentData[j].comment_userid + '" target="_blank" ';
                                            site_logo = '<a class="rp_tqq" onclick="javascript:setStat(\'vod_0_09173009\');" title="来自腾讯微博" target="_blank" href="http://t.qq.com/">腾讯微博</a>';
                                        default:
                                            if (commentData[j].comment_userid == '56com') {
                                                user_href = 'href="javascript:;"';
                                            } else {
                                                user_href = 'href="http://i.56.com/u/' + commentData[j].comment_userid + '" target="_blank" ';
                                            }
                                            break;
                                    }
                                    list.push('       <div class="pic"><a onclick="setStat(\'vzoneindex_16180755\')" ' + user_href + ' ><img src="' + commentData[j].commentUserInfo.photo + '" width="36" height="36" alt="' + commentData[j].commentUserInfo.nickname + '"></a></div>');
                                    /*list.push('       <div class="txt"><span class="author"><a onclick="setStat(\'vzoneindex_16180755\')" ' + user_href + ' class="name">' + commentData[j].commentUserInfo.nickname + '</a></span>' + site_logo + '：' + objcmt.ubb.decodeStr(commentData[j].content) + '</div>');*/
                                    list.push('      </li>');
                                }
                                list.push('     </ul>');
                                list.push('     <div class="view_all"><a onclick="SquareOfSpace.playVideo(' + back[i].vid + ');return false;" href="' + back[i].flvUrl + '" class="view_btn">查看全部</a></div>');
                            }
                            list.push('    </div>');
                            list.push('   </div>');
                        }
                        list = list.join('');
                        list = $(list);
                        $('#container').append(list).masonry('appended', list, true);
                        delete list;
                        $('#show_loading').hide();
                        AcolScrollPage.is_scroll = true;
                        AcolScrollPage.is_loading = false;
                        if (AcolScrollPage.is_bottom) {
                            AcolScrollPage.page_container.show();
                        }
                        if (typeof callback == 'function') callback();
                    }
                });
            },
            load_follow_status: function(obj, follow_id) {
                var is_show = $(obj).attr('is_show');
                if (is_show == 1) return false;
                $(obj).attr('is_show', '1');
                var user_id = usr.user_id();
                if (user_id == '' || typeof obj != 'object') return false;
                var btn_obj = $(obj).find('.pop').find('.button').find('.follow');
                if (btn_obj.find('.follow_state').length > 0) return false;
                $.getJSON('http://i.56.com/api/isFollowEachOther.php?uid=' + user_id + '&fid=' + follow_id + '&rand=' + Math.random(), function(back) {
                    if (back && back.status == 'yes') {
                        btn_obj.replaceWith(Square.relate.followed_html(follow_id));
                    }
                });
            }
        },
        identify: {
            container: $('#identify_container'),
            append_identify_data: function(type, title, page, rows, is_all, callback) {
                _that = this;
                var user_id = 'acoldog';
                if (usr.user_id() != '') user_id = usr.user_id();
                $('#show_loading').show();
                $.getJSON('http://i.56.com/api/getIdentifyForSquare.php?type=' + type + '&page=' + page + '&rows=' + rows + '&uid=' + user_id + '&rand=' + Math.random() + '&callback=?', function(back) {
                    if (back) {
                        var i_html = [];
                        var type_arr = type.split(',');
                        var title_arr = title.split(',');
                        for (var i in type_arr) {
                            if (typeof type_arr[i] != 'string') continue;
                            var list = [];
                            var data = back[type_arr[i]].data;
                            var total = back[type_arr[i]].total;
                            for (var j in data) {
                                if (typeof data[j] != 'object') continue;
                                if (typeof data[j].UserCount != 'object') continue;
                                list.push('<li>');
                                list.push('   <div class="pic">');
                                list.push('    <a href="javascript:;" onclick="SquareOfSpace.identify.choose_input(this);"><img src="' + data[j].Photo + '" width="50" height="50" alt="' + data[j].LastName + '"></a>');
                                list.push('    <input class="choose" type="checkbox" user_id="' + data[j].user_id + '">');
                                list.push('   </div>');
                                list.push('   <div class="txt">');
                                list.push('    <h6 class="user_name"><a onclick="setStat(\'vzoneindex_16180755\')" href="http://i.56.com/u/' + data[j].user_id + '" target="_blank">' + data[j].LastName + '</a></h6>');
                                list.push('    <p>' + data[j].Gender + '，' + data[j].Area + '</p>');
                                list.push('    <p>粉丝：' + data[j].UserCount.fan + '</p>');
                                list.push('   </div>');
                                list.push(' </li>');
                            }
                            list = list.join('');
                            i_html.push('<div class="' + (is_all ? 'user_space' : 'user_item') + '" id="' + type_arr[i] + '_list">');
                            i_html.push('   <div class="user_box_hd">');
                            i_html.push('    <div class="user_box_hd_title">' + title_arr[i] + '</div>');
                            i_html.push('    <div class="user_box_hd_extra">');
                            i_html.push('     <label><input name="checkAll" type="checkbox" onclick="SquareOfSpace.identify.select_all(\'' + type_arr[i] + '\' , this);">全选</label>');
                            i_html.push('     <a href="javascript:;" onclick="SquareOfSpace.identify.follow_selected(\'' + type_arr[i] + '\');setStat(\'vzoneindex_16180819\');return false;" class="btn_follow">关注所选</a>');
                            i_html.push('    </div>');
                            i_html.push('   </div>');
                            i_html.push('   <div class="user_box_bd">');
                            i_html.push('    <ul>');
                            i_html.push(list);
                            i_html.push('    </ul>');
                            i_html.push('   </div>');
                            if (!is_all) {
                                i_html.push('   <div class="user_box_ft">');
                                i_html.push('    <a href="javascript:;" onclick="SquareOfSpace.identify.page_identify_list(\'' + type_arr[i] + '\' , \'' + title_arr[i] + '\' , 1 , 25);return false;">全部</a>');
                                i_html.push('   </div>');
                            } else {
                                i_html.push('   <div class="mod56_page page_theme_0" style="margin-top:10px;">');
                                i_html.push('    <div class="mod56_page_pn" id="acolPageCt"></div>');
                                i_html.push('   </div>');
                            }
                            i_html.push('  </div>');
                        }
                        i_html = i_html.join('');
                        _that.container.prepend(i_html);
                        if (typeof callback == 'function') callback(total);
                        $('#show_loading').hide();
                    }
                });
            },
            choose_input: function(obj) {
                var input = $(obj).next('.choose');
                var checked = input.attr('checked');
                if (checked) {
                    input.removeAttr('checked');
                } else {
                    input.attr('checked', 'checked');
                }
            },
            select_all: function(type, obj) {
                var list_obj = $('#' + type + '_list');
                if ($(obj).attr('checked') == true) {
                    list_obj.find('input:checkbox').attr('checked', true);
                } else {
                    list_obj.find('input:checkbox').attr('checked', false);
                }
            },
            follow_selected: function(type) {
                if (SquareOfSpace.relate.following === true) return;
                var list_obj = $('#' + type + '_list');
                var user_id = [];
                $('#' + type + '_list').find('input:checked').each(function() {
                    $(this).removeAttr('checked');
                    var select_user_id = $(this).attr('user_id');
                    if (select_user_id != '') {
                        user_id.push(select_user_id);
                    }
                });
                user_id = user_id.join(',');
                if (user_id != '') {
                    SquareOfSpace.relate.follow(null, user_id);
                } else {
                    var op = {
                        head: '请至少选择1个用户',
                        is_cover: false,
                        top: 300,
                        yes: {
                            text: '确定'
                        }
                    };
                    SpaceUI.alert(op);
                }
            },
            page_identify_list: function(type, title, page, rows, obj) {
                _that = this;
                $('#identify_container').empty();
                if (typeof obj != 'object') {
                    var obj = $('#user_list_menu').find('li[tab=' + type + ']').find('a');
                }
                _that.switch_tab(obj);
                _that.append_identify_data(type, title, page, rows, true, function(total) {
                    var page_showNums = 3,
                        total_page = Math.ceil(total / rows),
                        page_option = {
                            container_ID: 'acolPageCt',
                            total_page: total_page,
                            page_showNums: page_showNums,
                            now_page: page,
                            obj_name: 'page1',
                            callback: function(now_page) {
                                _that.page_identify_list(type, title, now_page, rows);
                            }
                        };
                    page1 = new SpaceUI.Page(page_option);
                    if (total_page < 2)
                        $('#' + page_option.container_ID).hide();
                    else
                        $('#' + page_option.container_ID).show();
                });
            },
            switch_tab: function(obj) {
                $(obj).addClass('active').parent().siblings().find('.active').removeClass('active');
            }
        },
        userRank: {
            type: null,
            rtype: null,
            append_rank_data: function(op) {
                var _that = this;
                $('#show_loading').show();
                if (op) {
                    for (var i in op) {
                        if (typeof op[i] != 'undefined') {
                            this[i] = op[i];
                        }
                    }
                }
                if (this.rtype == 'month') {
                    $('#change_range').find('input').eq(0).attr('checked', 'checked');
                } else {
                    $('#change_range').find('input').eq(1).attr('checked', 'checked');
                }
                if (op.rtype == 'update_time') {
                    $('#change_range').hide();
                } else {
                    $('#change_range').show();
                }
                $.getJSON('http://i.56.com/api/controlSquareData.php?type=' + this.type + '&rtype=' + this.rtype + '&uid=acoldog&page=' + op.page + '&callback=?', function(back) {
                    if (back) {
                        var r_html = [],
                            n = (op.page - 1) * 20;
                        for (var i in back) {
                            if (typeof back[i] != 'object') continue;
                            n++;
                            var data = back[i];
                            if (typeof data.user_info.UserCount == 'undefined') continue;
                            if (data.user_info.LastName == 'null') data.user_info.LastName = data.user_id;
                            var show_text = '',
                                num = 0;
                            switch (_that.type) {
                                case 'get_upload_rank':
                                    num = SpaceUI.Helper.comma_split_nummber(data.user_info.UserCount.video);
                                    show_text = '<span>新增视频：<em>' + num + '</em></span>';
                                    break;
                                case 'get_popular_rank':
                                    num = SpaceUI.Helper.comma_split_nummber(data.visitor);
                                    show_text = '<span>新增人气：<em>' + num + '</em></span>';
                                    break;
                                case 'get_fans_rank':
                                    num = SpaceUI.Helper.comma_split_nummber(data.user_info.UserCount.fan);
                                    show_text = '<span>新增粉丝：<em>' + num + '</em></span>';
                                    break;
                            }
                            r_html.push('<li>');
                            r_html.push(' <div class="user_pic">');
                            r_html.push('  <a class="user_list_cover" title="' + data.user_info.LastName + '" target="_blank" href="http://i.56.com/u/' + data.user_id + '" onclick="setStat(\'vzoneindex_21150313\')">');
                            r_html.push('   <img width="50" height="50" src="' + data.user_info.Photo + '" alt="' + data.user_info.LastName + '">');
                            r_html.push('  </a>');
                            r_html.push('  <em class="rank_num">' + n + '</em>');
                            r_html.push(' </div>');
                            r_html.push(' <div class="user_txt">');
                            r_html.push('  <h6>');
                            r_html.push('   <a class="user_list_title" title="' + data.user_info.LastName + '" href="http://i.56.com/u/' + data.user_id + '" target="_blank" onclick="setStat(\'vzoneindex_21150313\')">' + data.user_info.LastName + '</a>');
                            var user_type = data.user_info.user_type
                            if (user_type >= 1) {
                                r_html.push('   <a href="http://i.56.com/verify.html" class="' + (user_type == 1 ? 'icon_verify' : 'icon_verify_co') + '" target="_blank" title="56认证用户"></a>');
                            }
                            r_html.push('  </h6>');
                            if (user_type >= 1 && data.user_info.desc) {
                                r_html.push('  <p>' + data.user_info.desc + '</p>');
                            }
                            r_html.push('  <p class="num">');
                            r_html.push(show_text);
                            r_html.push('  </p>');
                            r_html.push(' </div>');
                            if (data.is_followed == 1) {
                                r_html.push(Square.relate.followed_html(data.user_id));
                            } else {
                                r_html.push(' <div class="user_btn">');
                                r_html.push('  <a title="+关注TA" href="javascript:;" onclick="SquareOfSpace.relate.follow(this , \'' + data.user_id + '\');setStat(\'vzoneindex_21150221\');return false;" class="btn_follow">&nbsp;</a>');
                                r_html.push(' </div>');
                            }
                            r_html.push('</li>');
                        }
                        r_html = r_html.join('');
                        $('#user_rank_container').html(r_html);
                        $('#show_loading').hide();
                        if (op.page > 1) return;
                        var page_option = {
                            container_ID: 'acolRankPage',
                            h_btn: '...',
                            pre_btn: '上一页',
                            next_btn: '下一页',
                            total_page: 5,
                            page_showNums: 20,
                            is_ajax: true,
                            obj_name: 'page_rank',
                            now_page: op.page,
                            callback: function(now_page) {
                                $("html,body").animate({
                                    scrollTop: 290
                                }, "slow");
                                SquareOfSpace.userRank.append_rank_data({
                                    type: _that.type,
                                    rtype: _that.rtype,
                                    page: now_page
                                });
                            }
                        };
                        page_rank = new SpaceUI.Page(page_option);
                    }
                });
            },
            append_rank_data2: function(url, type, container) {
                var _that = this;
                $.getJSON(url + '&callback=?', function(back) {
                    if (back) {
                        var r_html = [],
                            n = 0;
                        for (var i in back) {
                            if (typeof back[i] != 'object') continue;
                            if (n >= 5) break;
                            n++;
                            var data = back[i];
                            if (typeof data.user_info == 'undefined') data.user_info = data.profile;
                            if (typeof data.user_info.UserCount == 'undefined' || typeof data.user_info.UserCount.video == 'undefined') continue;
                            data.user_info.Photo = data.user_info.Photo.replace('uface.56.com', 'uface.56img.com');
                            r_html.push('<li>');
                            r_html.push(' <div class="user_pic">');
                            r_html.push('  <a class="user_list_cover" title="' + data.user_info.LastName + '" target="_blank" href="http://i.56.com/u/' + data.user_id + '" onclick="setStat(\'vzoneindex_21150313\')">');
                            r_html.push('   <img width="50" height="50" src="' + data.user_info.Photo + '" alt="' + data.user_info.LastName + '">');
                            r_html.push('  </a>');
                            r_html.push(' </div>');
                            r_html.push(' <div class="user_txt">');
                            r_html.push('  <h6 style="margin-bottom: 0px;">');
                            r_html.push('   <a class="user_list_title" title="' + data.user_info.LastName + '" href="http://i.56.com/u/' + data.user_id + '" target="_blank" onclick="setStat(\'vzoneindex_21150313\')">' + data.user_info.LastName + '</a>');
                            var user_type = data.user_info.user_type;
                            if (typeof user_type == 'undefined') user_type = data.user_type;
                            if (user_type >= 1) {
                                r_html.push('   <a href="http://i.56.com/verify.html" class="' + (user_type == 1 ? 'icon_verify' : 'icon_verify_co') + '" target="_blank" title="56认证用户"></a>');
                            }
                            r_html.push('  </h6>');
                            if (user_type >= 1 && data.desc) {
                                r_html.push('  <p title="' + data.desc + '">' + SpaceUI.Helper.str_cut(data.desc, 26) + '</p>');
                            }
                            r_html.push('  <p class="num">');
                            r_html.push('   <span>视频：<em>' + data.user_info.UserCount.video + '</em></span><span>专辑：<em>' + data.user_info.UserCount.album + '</em></span>');
                            r_html.push('  </p>');
                            r_html.push(' </div>');
                            r_html.push(' <div class="user_btn">');
                            r_html.push('  <a title="+关注TA" href="javascript:;" onclick="SquareOfSpace.relate.follow(this , \'' + data.user_id + '\');setStat(\'vzoneindex_21150221\');return false;" class="btn_follow">&nbsp;</a>');
                            r_html.push(' </div>');
                            r_html.push('</li>');
                        }
                        r_html = r_html.join('');
                        $('#' + container).html(r_html);
                    }
                });
            },
            append_mm_data: function() {
                var _that = this;
                $.getJSON('http://i.56.com/api/controlSquareData.php?type=get_mm_data&uid=acoldog&r=' + Math.random() + '&callback=?', function(back) {
                    if (back) {
                        var r_html = [],
                            n = 0;
                        for (var i in back) {
                            if (typeof back[i] != 'object') continue;
                            n++;
                            var data = back[i];
                            data.photo = data.photo.replace('uface.56.com', 'uface.56img.com');
                            r_html.push('<li>');
                            r_html.push(' <div class="user_pic">');
                            r_html.push('  <a class="user_list_cover" title="' + data.nick + '" target="_blank" href="http://i.56.com/u/' + data.username + '" onclick="setStat(\'vzoneindex_21150313\')">');
                            r_html.push('   <img width="50" height="50" src="' + data.photo + '" alt="' + data.nick + '">');
                            r_html.push('  </a>');
                            r_html.push(' </div>');
                            r_html.push(' <div class="user_txt">');
                            r_html.push('  <h6>');
                            r_html.push('   <a class="user_list_title" title="' + data.nick + '" href="http://i.56.com/u/' + data.username + '" target="_blank" onclick="setStat(\'vzoneindex_21150313\')">' + data.nick + '</a>');
                            r_html.push('   <a href="http://i.56.com/verify.html" class="icon_verify" target="_blank" title="56认证用户"></a>');
                            r_html.push('  </h6>');
                            r_html.push('  <p class="num">');
                            r_html.push('   <span>视频：<em>' + data.videosnum + '</em></span><span>人气：<em>' + data.spaceviews + '</em></span>');
                            r_html.push('  </p>');
                            r_html.push(' </div>');
                            r_html.push(' <div class="user_btn">');
                            r_html.push('  <a title="+关注TA" href="javascript:;" onclick="SquareOfSpace.relate.follow(this , \'' + data.username + '\');setStat(\'vzoneindex_21150221\');return false;" class="btn_follow">&nbsp;</a>');
                            r_html.push(' </div>');
                            r_html.push('</li>');
                        }
                        r_html = r_html.join('');
                        $('#update_rank_container').html(r_html);
                    }
                });
            },
            set_active: function(obj) {
                var his_class = $(obj).attr('class'),
                    his_obj = $(obj);
                if (his_class != 'active') {
                    his_obj.addClass('active').parent().siblings().find('a').removeClass('active');
                }
            }
        },

        playVideo : function(vid){
            var html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="swf_ie_content" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="620" height="480"><param name="movie" value="http://player.56.com/v_'+ vid +'.swf"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="allowNetworking" value="all"><param name="FlashVars" value="ban_ad=on&ban_over_panel_auto_play=off&ban_over_panel=off&auto_start=on&pause_popup_page=off&from=backend"><param name="quality" value="high"><param name="wmode" value="transparent" /><embed id="swf_other_content" wmode="opaque" width="620" height="480" src="http://player.56.com/v_'+ vid +'.swf" flashvars="ban_ad=on&ban_over_panel_auto_play=off&ban_over_panel=off&auto_start=off&pause_popup_page=off&from=backend" allowscriptaccess="always" allowfullscreen="true" allowNetworking="all" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></object>';
            $('#playVideo').html(html).parent().show();
        }

    };
    window.SquareOfSpace = Square;
})(jQuery);