function get_fb_award(fb_id) {

    // 得獎查詢
    $.ajax({
        type: 'POST',
        url: '../program/api/get_fb_award.php',
        data: {
            fbid: fb_id
        },
        dataType: "json",
        success: function(res) {
            console.log('get_fb_award', res);

            if (res['code'] == 0 || res['code'] == 99) {

                var src = '';

                if (res['award'] == 1) {

                    src = 'img/main/result-winner.png';
                } else {
                    src = 'img/main/result-no-winner.png';
                }
                $('.popup-award-pic img').attr('src', src);
                $('.popup-award').css('display', 'block');

            } else {
                alert('get_fb_award, 錯誤回報');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        },
    });
}

$(document).ready(function() {

    var awardResultInterval = setInterval(function() {
        console.log('award result init...');
        if (window.fbApiInit) {

            FB.getLoginStatus(function(response) {
            	
                if (response.status === 'connected') {

                    FB.api('/me', function(res) {

                        var fb_id = res['id'];
                        $('.award-result').css('display', 'block');
                        $('.award-result').click(function() {
                            get_fb_award(fb_id);
                        });
                    });

                    if (Object.keys(window.user_fb).length > 0) {
                        console.log('in...');
                        
                    }
                }
                clearInterval(awardResultInterval);
            });
        }
    }, 200);

    $('.popup-award-close, .popup-award-opacity').click(function() {
        $('.popup-award').css('display', 'none');
    });
});
