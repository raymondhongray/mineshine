function videoPopup(videoId, targetObj) {

    $('#youtube-iframe').attr('src', 'https://www.youtube.com/embed/' + videoId + '?rel=0&autoplay=1');
    $('.popup-video').css('display', 'block');
    $('body').css('overflow', 'hidden');

    $('.popup-video-share').click(function(event) {
        event.stopPropagation();
        console.log('in');
        targetObj.find('.fb-share-btn').click();
    });
}

function fbEnsureInit(callback) {
    if (!window.fbApiInit) {
        setTimeout(function() { fbEnsureInit(callback); }, 50);
    } else {
        if (callback) {
            callback();
        }
    }
}

$(document).ready(function() {

    $('.popup-video-close').click(function() {
       
        $('#youtube-iframe').attr('src', '');
        $('.popup-video').css('display', 'none');
        $('body').css('overflow', 'auto');
    });

    $('.mine-video').click(function() {
        var videoId = $(this).attr('vid');
        videoPopup(videoId, $(this).parent());
    });

    // fbEnsureInit(function() {
    //     console.log("this will be run once FB is initialized");

    //     $('.fb-share-btn').click(function() {

    //         var title = $(this).attr('v-title');
    //         var share_link = $(this).attr('v-share-link');
    //         var description = $(this).attr('v-description');
    //         var picture = $(this).attr('youtube-thumbnail-src');

    //         if (navigator.userAgent.match(/FBAV|FBAN|FB_IAB|FB4A/i) && /Android/i.test(navigator.userAgent)) {
    //             // for FB browser
    //             // 不用登入，因為已經在臉書瀏覽器了
    //             FB.ui({
    //                 method: 'feed',
    //                 display: 'touch',
    //                 name: title,
    //                 link: encodeURIComponent(share_link),
    //                 description: description,
    //                 picture: picture,
    //             }, function(response) {
    //                 window.location.href = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
    //             });
    //             return;

    //         } else {
    //             // 一般手機瀏覽器用重導方式實作分享
    //             var publish = {
    //                 name: title,
    //                 method: 'feed',
    //                 link: encodeURIComponent(share_link),
    //                 description: description,
    //                 picture: picture
    //             };

    //             var appId = '';
    //             var redirect_uri = encodeURI(window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?share_done=1');

    //             var permissionUrl = "https://m.facebook.com/dialog/feed?app_id=" + appId + "&display=touch&redirect_uri=" + redirect_uri + "&name=" + publish.name + "&description=" + publish.description + "&link=" + publish.link + "&picture=" + publish.picture;
    //             window.location = permissionUrl;
    //         }
    //     });
    // });
});