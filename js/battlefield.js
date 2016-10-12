// 切換選擇學校區域的圖片 
function switch_battlefield_img(section_id, is_mobile) {
    var src = '';
    var img_src = {
        prefix: 'img/battlefield/',
        format: 'png'
    }

    for (var i = 1; i <= 4; i++) {

        src = img_src['prefix'] + 'section_' + i + ((i == section_id) ? '_on.' : '_off.') + img_src['format'];
        $('.battlefield-select[data-id="' + i + '"]').attr('src', src);
    }

    if (!is_mobile) {
        $('#battlefield > .battlefield-bg > img').attr('src', 'img/battlefield/winner_bg_' + section_id + '.png');
    }
}

function set_top_three(section_id, is_mobile) {

    if (typeof school_by_section !== 'undefined' && Object.keys(school_by_section).length > 0) {

        var school = school_by_section[section_id - 1];

        for (var i = 0; i < 3; i++) {

            var num_index = i + 1;

            if (is_mobile) {

                $('.battlefield-cover > .section-text').attr('src', 'img/battlefield_mobile/school_' + section_id + '.png');

                var src_prefix = 'img/battlefield_mobile/school_winner_';
                var src = src_prefix + section_id + '_' + num_index + '.png';

                $('#battlefield-mobile').find('.top-3[data-id="' + num_index + '"]').find('.winner-icon').attr('src', src);
                $('#battlefield-mobile').find('.top-3[data-id="' + num_index + '"]').find('.school-name').text(school[i]['school_name']);
                $('#battlefield-mobile').find('.top-3[data-id="' + num_index + '"]').find('.scores').text(school[i]['scores'] + ' 積分');
            } else {
                $('#battlefield').find('.num-' + num_index).find('.school-name').text(school[i]['school_name']);
                $('#battlefield').find('.num-' + num_index).find('.scores').text(school[i]['scores'] + ' 積分');
            }
        }
    } else {
        console.log('school_by_section not ready...');
    }
}

$(document).ready(function() {

    // 設定前三名資訊
    // 確定 school_by_section 存在
    var check_schools_ready = setInterval(function() {
        if (typeof school_by_section !== 'undefined' && Object.keys(school_by_section).length > 0) {

            if ($(window).width() >= 640) {

                set_top_three(1, false);
                set_top_three(1, true);
            } else {
                set_top_three(1, true);
            }

            clearInterval(check_schools_ready);
        }
    }, 50);

    $('.battlefield-select').click(function() {

        start_loading($('#pre-load'), 'img/main/loading.gif', '300px', '#d10a27', '0.8');

        var section_id = $(this).attr('data-id');

        if ($(window).width() >= 640) {
            // 切換選擇學校區域的圖片
            switch_battlefield_img(section_id, false);
            // 設定前三名學校資訊
            set_top_three(section_id, false);
        } else {
            // 切換選擇學校區域的圖片
            switch_battlefield_img(section_id, true);
            // 設定前三名學校資訊
            set_top_three(section_id, true);
        }

        setTimeout(function() {
            stop_loading($('#pre-load'));

            if ($(window).width() < 640) {
                var obj = $('#battlefield-mobile');
                move_to(obj, -($('header').height() + 10));
            }
        }, 1000);
    });
});
