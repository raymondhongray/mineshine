// 臉書分享
function share_fb_index() {

    $('#fb-share-btn').click(function() {

        var title = '麥香超友力擂台賽回來啦！';
        var description = '快來幫學校投票，與麥香一起玩超友力體感擂台！';

        var share_link = window.location.protocol + '//';
        share_link += window.location.hostname;

        // var picture = window.location.protocol + '//';
        // picture += window.location.hostname + '/img/main/fb_share_600.jpg';
        var picture = 'https://its.ptt.com.tw/demo/mineshine/fb_share_1910.jpg';

        var redirect_uri = window.location.protocol + '//';
        redirect_uri += window.location.hostname;
        redirect_uri += window.location.pathname;
        redirect_uri = encodeURIComponent(redirect_uri);

        if (navigator.userAgent.match(/FBAV|FBAN|FB_IAB|FB4A/i) && /Android/i.test(navigator.userAgent)) {
            // for FB browser
            // 不用登入，因為已經在臉書瀏覽器了
            FB.ui({
                method: 'feed',
                display: 'touch',
                name: title,
                link: encodeURIComponent(share_link),
                description: description,
                picture: picture,
            }, function(response) {
                window.location.href = redirect_uri;
            });
            return;

        } else {
            // 一般手機瀏覽器用重導方式實作分享
            var publish = {
                name: title,
                method: 'feed',
                link: encodeURIComponent(share_link),
                description: description,
                picture: picture
            };

            var appId = '1582634928709967';

            var permissionUrl = "https://m.facebook.com/dialog/feed?app_id=" + appId;
            permissionUrl += "&display=touch&redirect_uri=" + redirect_uri;
            permissionUrl += "&name=" + publish.name;
            permissionUrl += "&description=" + publish.description;
            permissionUrl += "&link=" + publish.link;
            permissionUrl += "&picture=" + publish.picture;
            window.location = permissionUrl;
        }
    });
}

// 首頁分享 暫時沒用
function call_share_index(fb_id) {
    $.ajax({
        type: 'POST',
        url: '../program/api/share_index.php',
        data: {
            fbid: fb_id,
        },
        dataType: "json",
        success: function(res) {
            console.log('share_index', res);

            if (res['code'] == 0 || res['code'] == 99) {
                // do nothing
            } else {
                alert('share_game, 錯誤回報');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        },
    });
}

// 動畫開始
function animation_mobile_init() {
    $('#maste-vision-m-bg .layer > .master-title').css('display', 'none');
    $('#maste-vision-m-bg .layer > .sub-title').css('display', 'none');
    $('#maste-vision-m-bg .layer > .bubble-01').css('display', 'none');

    $('#maste-vision-m-bg .layer > .go-icon').css('display', 'none');
    $('#maste-vision-m-bg .layer > .bubble-02').css('display', 'none');
    $('#maste-vision-m-bg .layer > .first-icon').css('display', 'none');

    $('#maste-vision-m-bg .layer > .master-title').addClass('active');
    $('#maste-vision-m-bg .layer > .master-title').css('display', 'block');
    setTimeout(function() {
        $('#maste-vision-m-bg .layer > .master-title').removeClass('active');

        $('#maste-vision-m-bg .layer > .sub-title').addClass('active');
        $('#maste-vision-m-bg .layer > .sub-title').css('display', 'block');
        setTimeout(function() {
            $('#maste-vision-m-bg .layer > .sub-title').removeClass('active');

            $('#maste-vision-m-bg .layer > .bubble-01').addClass('active');
            $('#maste-vision-m-bg .layer > .bubble-01').css('display', 'block');
            setTimeout(function() {
                $('#maste-vision-m-bg .layer > .bubble-01').removeClass('active');

                $('#maste-vision-m-bg .layer > .go-icon').css('display', 'block');
                $('#maste-vision-m-bg .layer > .bubble-02').css('display', 'block');
                $('#maste-vision-m-bg .layer > .first-icon').css('display', 'block');
            }, 500);
        }, 500);
    }, 500);
}

// 動畫開始
function animation_init() {
    $('#maste-vision-bg > .layer[data-id="1"] > .master-title').css('display', 'none');
    $('#maste-vision-bg > .layer[data-id="1"] > .sub-title').css('display', 'none');
}

// 合體動畫
function people_fit() {

    $('#maste-vision-bg > .layer[data-id="3"]').css('z-index', '1000');
    $('#maste-vision-bg > .layer[data-id="3"] > .master-girl').addClass('active');
    $('#maste-vision-bg > .layer[data-id="3"] > .master-boy').addClass('active');
    $('#maste-vision-bg > .layer[data-id="3"] > .master-girl').removeClass('start-pos');
    $('#maste-vision-bg > .layer[data-id="3"] > .master-boy').removeClass('start-pos');

    setTimeout(function() {
        $('#maste-vision-bg > .layer[data-id="3"] > .master-girl').removeClass('active');
        $('#maste-vision-bg > .layer[data-id="3"] > .master-boy').removeClass('active');
        $('#maste-vision-bg > .layer[data-id="3"] > .master-girl').addClass('end-pos');
        $('#maste-vision-bg > .layer[data-id="3"] > .master-boy').addClass('end-pos');

        var src = 'img/master_vision/girl-true.png';
        $('#maste-vision-bg > .layer[data-id="3"] > .master-girl').attr('src', src);
        src = 'img/master_vision/boy-true.png';
        $('#maste-vision-bg > .layer[data-id="3"] > .master-boy').attr('src', src);

        $('#maste-vision-bg > .layer[data-id="3"]').css('z-index', '100');
    }, 2000);

    setTimeout(function() {
        // 標題進場
        title_larger();
    }, 500);
}

// 標題進場
function title_larger() {
    $('#maste-vision-bg > .layer[data-id="1"] > .master-title').css('display', 'block');
    $('#maste-vision-bg > .layer[data-id="1"] > .master-title').addClass('active');

    setTimeout(function() {
        $('#maste-vision-bg > .layer[data-id="1"] > .master-title').removeClass('active');
    }, 500);

    setTimeout(function() {
        // 標題進場
        sub_title_up();
    }, 200);
}

// 副標題進場
function sub_title_up() {
    $('#maste-vision-bg > .layer[data-id="1"] > .sub-title').css('display', 'block');
    $('#maste-vision-bg > .layer[data-id="1"] > .sub-title').addClass('active');

    setTimeout(function() {

        $('#maste-vision-bg > .layer[data-id="1"] > .sub-title').removeClass('active');
    }, 500);
}

function bomb_animation(is_mobile) {

    if (is_mobile) {
        $('.bomb-animation.is-mobile').css('display', 'block');
    } else {
        $('.bomb-animation.is-desktop').css('display', 'block');
    }
}

function animation_group() {

    if ($(window).width() >= 640) {

        bomb_animation(false);

        setTimeout(function() {

            $('.bomb-animation').fadeOut('slow');
        }, 1000);
        setTimeout(function() {
            animation_init();
            // 合體動畫
            people_fit();
        }, 500);
    } else {

        bomb_animation(true);

        setTimeout(function() {
            $('.bomb-animation').fadeOut('slow');
            // 手機動畫初始化
            animation_mobile_init();
        }, 1000);
    }

    if ($('#maste-vision-bg').css('display') == 'block') {

        var src_prefix = {
            name: 'img/master_vision/bg_',
            format: 'png'
        };
        // 背景切換
        // swap_bg_img($('#maste-vision-img'), src_prefix, 800, 2, true);
    } else {

        var src_prefix = {
            name: 'img/master_vision_mobile/bg_',
            format: 'png'
        };
        // 背景切換
        // swap_bg_img($('#maste-vision-m-img'), src_prefix, 800, 2, true);
    }
}

$(window).load(function() {

    var refreshIntervalId = setInterval(function() {
        if (school_menu_init_done) {

            stop_loading($('#pre-load'));

            animation_group();

            if (is_expired == 1) {

                setTimeout(function() {
                    swal({
                        title: '大會報告',
                        text: '「麥香超友力擂台賽」\n各區冠軍已出爐！\n校際卡位戰積分已停止統計。',
                        type: 'warning',
                        confirmButtonText: 'OK'
                    }, function() {

                        if ($('#battle-final-mobile').css('display') == 'none') {
                            move_to($('#battle-final'), -($('header').height() + 10));
                        } else {
                            move_to($('#battle-final-mobile'), -($('header').height() + 10));
                        }
                    });
                }, 3000);
            }

            clearInterval(refreshIntervalId);
        }
    }, 50);

    // 校際卡位 GO 按鈕
    $('.bubble-01, .go-icon, .winner-content-area, .white-board').click(function() {
        move_to($('#play-go'), -($('header').height() + 10));
    });
    // 搶先了解 按鈕
    $('.bubble-02, .first-icon').click(function() {
        window.open('rule/rule.html', '_blank');
    });

    $('.mineshine-logo.mv-d').click(function() {
        move_to($('#maste-vision-bg'), -($('header').height() + 10));
    });

    $('.mineshine-logo.mv-m, .menu-home.mv-m').click(function() {

        if ($('#maste-vision-m-bg').css('display') == 'none') {
            move_to($('#maste-vision-bg'), -($('header').height() + 10));
        } else {
            move_to($('#maste-vision-m-bg'), -($('header').height() + 10));
        }
    });

    $('.menu-battle.mv-d').click(function() {
        move_to($('#battlefield'), -($('header').height() + 10));
    });

    $('.menu-battle.mv-m').click(function() {

        if ($('#battlefield-mobile').css('display') == 'none') {
            move_to($('#battlefield'), -($('header').height() + 10));
        } else {
            move_to($('#battlefield-mobile'), -($('header').height() + 10));
        }
    });

    $('.menu-play.mv-d, .menu-play.mv-m').click(function() {
        move_to($('#play-go'), -($('header').height() + 10));
    });

    $('.menu-rule.mv-d').click(function() {
        move_to($('#rule-intro'), -($('header').height() + 10));
    });

    $('.menu-rule.mv-m').click(function() {

        if ($('#rule-intro-mobile').css('display') == 'none') {
            move_to($('#rule-intro'), -($('header').height() + 10));
        } else {
            move_to($('#rule-intro-mobile'), -($('header').height() + 10));
        }
    });

    if (getQueryStrByName('play_go') != null && getQueryStrByName('play_go') != '') {
        move_to($('#play-go'), -($('header').height() + 10));
    }

    $('footer > .is-desktop, footer > .is-mobile').click(function() {
        window.open('http://www.uni-president.com.tw/', '_blank');
    });
});

$(document).ready(function() {

    start_loading($('#pre-load'), 'img/main/loading.gif', '300px', '#d10a27', '1.0');

    $('.menu-video').click(function() {
        $('.mine-video').click();
    });

    $('.mineshine-menu-icon').click(function() {
        $('.popup-menu').css('display', 'block');
    });

    $('.popup-menu-close, .popup-menu-pic li').click(function() {
        $('.popup-menu').css('display', 'none');
    });

    var shareindexInterval = setInterval(function() {
        if (window.fbApiInit) {

            $('.popup-video-share, .fb-share-index').click(function() {
                share_fb_index();
                $('#fb-share-btn').click();
            });
            clearInterval(shareindexInterval);
        }
    }, 200);

});
