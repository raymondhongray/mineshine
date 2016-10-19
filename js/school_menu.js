var school_menu_init_done = false;
var check_mobile = ($('.school-menu-select').width() / $('.school-menu').width() > 0.5) ? true : false;
// 確認目前點擊狀態
var section_status = 1;
var school_by_section = [];
var content_title = {
    'which_section': ['第一區學校', '第二區學校', '第三區學校', '第四區學校'],
    'description': ['<span class="f-btn" cid="1">基隆</span><span class="f-btn" cid="2">台北</span><span class="f-btn" cid="3">新北</span><span class="f-btn" cid="4">宜蘭</span><span class="f-btn" cid="5">馬祖</span>',
        '<span class="f-btn" cid="6">桃</span><span class="f-btn" cid="7">竹</span><span class="f-btn" cid="9">苗</span><span class="f-btn" cid="10">台中</span><span class="f-btn" cid="11">金門</span>',
        '<span class="f-btn" cid="12">彰</span><span class="f-btn" cid="13">投</span><span class="f-btn" cid="14">雲</span><span class="f-btn" cid="15">嘉</span><span class="f-btn" cid="17">台南</span><span class="f-btn" cid="18">澎湖</span>',
        '<span class="f-btn" cid="19">高</span><span class="f-btn" cid="20">屏</span><span class="f-btn" cid="21">花蓮</span><span class="f-btn" cid="22">台東</span>'
    ]
};
var city_table = {
    "基隆市": 1,
    "台北市": 2,
    "新北市": 3,
    "宜蘭縣": 4,
    "連江縣": 5,
    "桃園市": 6,
    "新竹縣": 7,
    "新竹市": 8,
    "苗栗縣": 9,
    "台中市": 10,
    "金門縣": 11,
    "彰化縣": 12,
    "南投縣": 13,
    "雲林縣": 14,
    "嘉義市": 15,
    "嘉義縣": 16,
    "台南市": 17,
    "澎湖縣": 18,
    "高雄市": 19,
    "屏東縣": 20,
    "花蓮縣": 21,
    "台東縣": 22
}

function filter_by_city(filter_obj) {
    var content_obj = filter_obj.parents('.school-menu-content');
    var section_id = content_obj.attr('section-id');
    var cid = filter_obj.attr('cid');

    content_obj.find('.content-row').css('display', 'none');

    if (cid == 'all') {

        content_obj.find('.content-row').css('display', 'block');
        content_obj.find('.content-row.clone-me').css('display', 'none');
    } else {

        content_obj.find('.content-row[cid="' + cid + '"]').css('display', 'block');
        if (cid == 7) {
            content_obj.find('.content-row[cid="8"]').css('display', 'block');
        }
        if (cid == 15) {
            content_obj.find('.content-row[cid="16"]').css('display', 'block');
        }
    }

    content_obj.find('.f-btn').removeClass('active');
    filter_obj.addClass('active');
}

// 切換選擇學校區域的圖片 
function switch_section_img(section_id) {
    var src = '';
    var img_src = {
        prefix: 'img/section_btn/',
        format: 'png'
    }

    for (var i = 1; i <= 4; i++) {

        src = img_src['prefix'] + 'section_' + i + ((i == section_id) ? '_on.' : '_off.') + img_src['format'];
        $('.school-select[data-id="' + i + '"]').find('img').attr('src', src);
    }
}

function get_schools_by_search(words) {

    // 模糊字串搜尋結果
    var search_schools = [];

    var total_section = school_by_section.length;

    if (total_section) {

        for (var i = 0; i < total_section; i++) {

            var schools = school_by_section[i]

            for (var j = 0; j < schools.length; j++) {

                var school = schools[j];

                if (school['school_name'].match(words) != null) {
                    search_schools.push(school);
                }
            }
        }
    }

    return search_schools;
}

function scroll_down_issue() {

    if (check_mobile) {

        if (section_status == 'show_search') {

            $('.scroll-down-mobile.search-area').css('display', 'block');
            $('.scroll-down-mobile.sections-area').css('display', 'none');
        } else {
            $('.scroll-down-mobile.sections-area').css('display', 'block');
            $('.scroll-down-mobile.search-area').css('display', 'none');
        }
    } else {
        $('.scroll-down-mobile').css('display', 'none');
    }
}

function check_mobile_timely() {

    return ($('.school-menu-select').width() / $('.school-menu').width() > 0.5) ? true : false;
}

// 本地端用資料初始化 
function get_schools_localhost() {
    $.ajax({
        type: 'GET',
        url: './json_file/section_all.json',
        dataType: "json",
        success: function(res) {
            console.log(res);
            for (var i = 0; i < 4; i++) {

                var section_id = i + 1;
                school_by_section[i] = res['section' + section_id];
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        },
    });
}

// 上線用資料初始化 
function get_school() {
    var data = {};

    if (window.fbApiInit && Object.keys(window.user_fb).length > 0) {
        var fb_id = window.user_fb['id'];
        data = {
            fbid: fb_id
        }
    }

    $.ajax({
        type: 'POST',
        url: '../program/api/get_school.php',
        data: data,
        dataType: "json",
        success: function(res) {
            console.log('get_school', res);

            for (var i = 0; i < 4; i++) {

                var section_id = i + 1;
                school_by_section[i] = res['section' + section_id];
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        },
    });
}

function schools_ensure_init(callback) {
    if (school_by_section[0] && school_by_section[1] && school_by_section[2] && school_by_section[3]) {
        if (callback) {
            callback();
        }
    } else {
        setTimeout(function() { schools_ensure_init(callback); }, 50);
    }
}

function set_school_menu() {
    var total_section = school_by_section.length;

    for (var i = 1; i <= total_section; i++) {

        var section_id = i;
        clone_school_content(section_id, true);
        clone_school_content(section_id, false);
    }

    // is_mobile && section_id = 1 ~ 4
    var element = '<img class="scroll-down-mobile sections-area" src="img/section_btn/scroll-down.png">';
    $(element).appendTo('.school-menu');

    // 把所有 clone-me 關閉
    $('.clone-me').css('display', 'none');
    // 把所有 menu-content 關閉, 然後初始化會預設用 section-id = 1
    $('.school-menu-content').css('display', 'none');

    // 確認是不是手機版本
    if (check_mobile) {

        $('.school-menu-content.is-mobile[section-id="1"]').css('display', 'block');

        scroll_down_issue();
    } else {
        $('.school-menu-content.normal[section-id="1"]').css('display', 'inline-block');
    }

    // 處理重複的和美高中
    $('.content-row[sid="291"]').remove();

    school_menu_init_done = true;
}

function clone_school_content(section_id, is_mobile) {

    var suffix_class = '';
    if (is_mobile) {
        suffix_class = 'is-mobile'
    } else {
        suffix_class = 'normal'
    }

    var content_obj = $('.school-menu-content.' + suffix_class + '.clone-me');
    content_obj.clone().removeClass('clone-me').attr('section-id', section_id).appendTo('.school-menu');

    var school_section = school_by_section[section_id - 1];

    content_title_obj = $('.school-menu-content.' + suffix_class + '[section-id="' + section_id + '"] > .content-title');

    content_title_obj.find('.which-section').text(content_title['which_section'][section_id - 1]);

    var filter_btn = content_title['description'][section_id - 1];
    filter_btn = filter_btn + '<span class="f-btn active" cid="all">全部</span>';
    content_title_obj.find('.description').html(filter_btn);

    content_row_obj = $('.school-menu-content.' + suffix_class + '[section-id="' + section_id + '"] > .content-row');

    set_each_school_content(school_section, section_id, is_mobile);
}

function set_each_school_content(school_section, section_id, is_mobile) {

    if (is_mobile) {
        suffix_class = 'is-mobile'
    } else {
        suffix_class = 'normal'
    }

    for (var j = 0; j < school_section.length; j++) {

        var each_school = school_section[j];
        var sid = each_school['sid'];
        var cid = city_table[each_school['city']];
        var row_section_id = section_id;

        // 方便追蹤每個 row 屬於哪個 section_id
        if (!(section_id == 'show_search' || section_id == 'show_search_mobile')) {
            row_section_id = suffix_class + '_' + row_section_id;
        }

        var obj = {};
        obj = $('.school-menu-content.' + suffix_class + '[section-id="' + section_id + '"] > .content-row.clone-me');
        obj.clone().removeClass('clone-me').attr('section-id', row_section_id).attr('sid', sid).attr('cid', cid).appendTo('.school-menu-content.' + suffix_class + '[section-id="' + section_id + '"]');

        var target = $('.school-menu-content.' + suffix_class + '[section-id="' + section_id + '"] > .content-row[sid="' + sid + '"]');
        // target.find('.which-section').text('第' + each_school['section_id'] + '區');
        target.find('.which-section').text(each_school['city']);
        target.find('.school-name').text(each_school['school_name']);
        target.find('.scores').text(each_school['scores'] + ' 分');

        if (each_school['today'] == 1) {
            target.find('.play').addClass('play-done');
            target.find('.play').attr('src', 'img/section_btn/play_off.png');
            target.find('.play-done').removeClass('play');
        }
    }

    if (is_expired == 1) {
        var game_code = getQueryStrByName('play_game')

        if (!(game_code != null && game_code != '')) {
            $('.play').addClass('play-done');
            $('.play').attr('src', 'img/section_btn/play_off.png');
            $('.play-done').removeClass('play');
        }

    }
}

function initialize_schoolMenu() {
    // 選校區的內容高,會依據那四個方塊區域的高來決定
    $('.school-menu-content').css('height', $('.school-menu-select').height());
    $('.school-menu-content.is-mobile').css('height', '320');

    setTimeout(function() {
        // 本地端用資料初始化 
        // get_schools_localhost();

        // 上線用資料初始化 
        get_school();

        schools_ensure_init(set_school_menu);

    }, 1500);
}

$(window).load(function() {

    initialize_schoolMenu();
});

$(document).ready(function() {

    $('.school-select').click(function() {

        start_loading($('#pre-load'), 'img/main/loading.gif', '300px', '#d10a27', '0.8');

        var section_id = $(this).attr('data-id');
        // 確認目前點擊狀態
        section_status = section_id;

        // 切換選擇學校區域的圖片
        switch_section_img(section_id);

        // 確認是不是手機版本
        if (check_mobile) {

            // 把所有 menu-content 關閉, show by section-id
            $('.school-menu-content').css('display', 'none');
            $('.school-menu-content.is-mobile[section-id="' + section_id + '"]').css('display', 'block');

            scroll_down_issue();
        } else {

            // 把所有 menu-content 關閉, show by section-id
            $('.school-menu-content').css('display', 'none');
            $('.school-menu-content.normal[section-id="' + section_id + '"]').css('display', 'inline-block');
        }

        setTimeout(function() {
            stop_loading($('#pre-load'));
            // 確認是不是手機版本
            if (check_mobile) {
                var obj = $('.school-menu-content.is-mobile[section-id="' + section_id + '"]');
                move_to(obj, -($('header').height() + 10));
            }
        }, 1000);
    });

    $('.school-search-area > .search-icon').click(function() {

        start_loading($('#pre-load'), 'img/main/loading.gif', '#000', '0.7');

        // 確認是不是手機版本
        section_status = 'show_search';

        var words = $('.school-search-area > input').val();
        var school_search = [];

        if (words) {
            school_search = get_schools_by_search(words);
        }

        // 確認是不是手機版本
        if (check_mobile) {

            // 清除上一次搜尋
            $('.school-menu-content[section-id="show_search_mobile"]').find('.content-row[section-id="show_search_mobile"]').remove();

            set_each_school_content(school_search, 'show_search_mobile', true);

            $('.school-menu-content[section-id="show_search_mobile"] > .content-row').css('display', 'block');
            // 把所有 menu-content 關閉, show school-search-area
            $('.school-menu-content').css('display', 'none');
            $('.school-menu-content[section-id="show_search_mobile"]').css('display', 'block');

            scroll_down_issue();
        } else {

            // 清除上一次搜尋
            $('.school-menu-content[section-id="show_search"]').find('.content-row[section-id="show_search"]').remove();

            set_each_school_content(school_search, 'show_search', false);

            $('.school-menu-content[section-id="show_search"] > .content-row').css('display', 'block');
            // 把所有 menu-content 關閉, show school-search-area
            $('.school-menu-content').css('display', 'none');
            $('.school-menu-content[section-id="show_search"]').css('display', 'inline-block');
        }

        // 把所有 clone-me 關閉
        $('.clone-me').css('display', 'none');

        if ($('.content-row[sid="291"]').length == 1) {
            // 處理重複的和美高中
            $('.content-row[sid="291"]').remove();
        }

        setTimeout(function() {
            stop_loading($('#pre-load'));

            setTimeout(function() {
                //沒搜尋到結果
                if (school_search.length == 0) {
                    alert('沒有符合的搜尋結果');
                }
            }, 500);
        }, 1000);
    });

    // 我要加分
    $('body').on('click', '.play', function() {
        var sid = $(this).parents('.content-row').attr('sid');
        console.log('sid', sid);
        $('#to-game > input[name="sid"]').val(sid);
        $('#to-game').submit();
    });

    // city filter
    $('body').on('click', '.f-btn', function() {
        filter_by_city($(this));
    });
});

$(window).resize(function() {

    // 確認是不是手機版本
    check_mobile = check_mobile_timely();
    var suffix = '';

    scroll_down_issue();

    if (check_mobile) {
        // 手機版本 show_search 的 section-id 多了 suffix: _mobile
        if (section_status == 'show_search') {
            suffix = '_mobile';
        }

        $('.school-menu-content.normal').css('display', 'none');

        $('.school-menu-content.is-mobile').css('height', '320');
        $('.school-menu-content.is-mobile[section-id="' + section_status + suffix + '"]').css('display', 'block');
    } else {

        $('.school-menu-content.is-mobile').css('display', 'none');

        // 選校區的內容高,會依據那四個方塊區域的高來決定
        $('.school-menu-content.normal').css('height', $('.school-menu-select').height());
        $('.school-menu-content.normal[section-id="' + section_status + '"]').css('display', 'inline-block');
    }
});
