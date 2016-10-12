var screen_w = 0;
var screen_h = 0;

function move_to(target_obj, offset) {

    var scroll_offset = target_obj.offset().top + offset;
    $('html, body').animate({
        scrollTop: scroll_offset
    }, 500);
}

function getQueryStrByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function start_loading(target_element, img_src, width, bg_color, opacity) {

    $('body').css('overflow', 'hidden');

    if (img_src) {
        target_element.find('.loading-effect-pic').attr('src', img_src);
    }

    target_element.find('.loading-effect-pic').css('width', width);
    target_element.find('.loading-effect-opacity').css('background-color', bg_color);
    target_element.find('.loading-effect-opacity').css('opacity', opacity);
    target_element.css('display', 'block');
}

function stop_loading(target_element) {

    $('body').css('overflow', 'auto');
    target_element.css('display', 'none');
}

function swap_bg_img(target_element, src_prefix, duration, limit, loop) {
    var num = 0;

    var stopInterval = setInterval(function() {
        num = (parseInt(num)) % limit;

        target_element.attr('src', src_prefix['name'] + num + '.' + src_prefix['format']);

        num++;

        if (loop == false) {
            if (num == limit) {
                clearInterval(stopInterval);
            }
        }
    }, duration);
}

// 確認fb sdk 已經載入
function fbEnsureInit(callback) {
    if (!window.fbApiInit) {
        setTimeout(function() { fbEnsureInit(callback); }, 50);
    } else {
        if (callback) {
            callback();
        }
    }
}

$(window).load(function() {

    if (navigator.userAgent.match(/line/i)) {
        alert('建議使用Chrome/Safari瀏覽器\n以獲得最佳使用體驗 !');
    }

    screen_w = $(window).innerWidth();
    screen_h = $(window).innerHeight();

    if ($('#orientation').length > 0) {
        if ($(window).width() > $(window).height()) {

            $('#orientation').css('display', 'block');
        } else {
            $('#orientation').css('display', 'none');
        }
    }
});

$(window).resize(function() {

    if ($('#orientation').length > 0) {
        if ($(window).width() > $(window).height()) {
            
            if ($(window).width() != screen_w) {
                $('#orientation').css('display', 'block');
            }
        } else {
            $('#orientation').css('display', 'none');
        }

    }
});

$(document).ready(function() {

    fbEnsureInit(function() {
        console.log("this will be run once FB is initialized");

        FB.getLoginStatus(function(response) {

            if (response.status === 'connected') {

                FB.api('/me', function(res) {
                    console.log(res);

                    fb_id = res['id'];
                    fb_name = res['name'];

                    window.user_fb = {
                        id: fb_id,
                        name: fb_name
                    };
                });
                FB.api("/me/picture?width=100&height=100", function(response) {

                    console.log(response.data.url);
                    var pic_element = '<img class="profile-pic" src="' + response.data.url + '" />'
                    $('.fbshare-area').html(pic_element);
                    $('.fbshare-area').addClass('profile-area');
                    $('.profile-area').removeClass('fbshare-area');
                    $('.profile-area').unbind('click');
                });
            }
        });
        // 登入臉書, 如果沒登入狀態不會有這個 fbshare-area
        $('.fbshare-area').click(function() {

            var redirect_uri = window.location;

            if (typeof $(this).attr('sid') != 'undefined') {
                redirect_uri = window.location.protocol + '//';
                redirect_uri += window.location.hostname;
                redirect_uri += window.location.pathname;
                redirect_uri += '?sid=' + $(this).attr('sid');
                redirect_uri = encodeURIComponent(redirect_uri);
            }
            var appId = '1582634928709967';
            var app_permissions = 'public_profile';
            var permissionUrl = "https://m.facebook.com/dialog/oauth?client_id=" + appId + "&response_type=code&redirect_uri=" + redirect_uri + "&scope=" + app_permissions;
            window.location = permissionUrl;
        });
    });
});
