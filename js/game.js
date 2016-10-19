// 三題的答題記錄
var answer = {
    finished: [0, 0, 0],
    correct: [0, 0, 0]
};
var game_school_name = '中山女中';
var game_sid = '';
// 遊戲玩完是否中獎
// var check_award = 0;

// 高度修正
function adjust_game_height() {
    // 將遊戲區塊因高度改變
    if ($(window).width() >= 640) {

        var win_height = $(window).innerHeight();
        // (視窗高度 - padding 和 top) * 圖片寬高比
        var width_change = (win_height - (win_height * 0.016 + 50)) * (135 / 94);
        // 超出則縮小至100%
        if (width_change > $(window).innerWidth()) {
            width_change = '100%';
        }
        $('#game-bg').css('width', width_change);
    } else {
        var win_height = $(window).innerHeight();
        // (視窗高度 - padding 和 top) * 圖片寬高比
        var width_change = (win_height - 50) * (60 / 94);
        // 超出則縮小至100%
        if (width_change > $(window).innerWidth()) {
            width_change = '100%';
        }
        $('#game-mobile-bg').css('width', width_change);
    }
}

// 臉書分享
function share_fb(fb_id) {
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
        redirect_uri += '?share_game=1&game_id=' + fb_id;
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

// 遊戲分享
function call_share_game(fb_id) {

    if (is_expired == 1) {

        var redirect_uri = window.location.protocol + '//';
        redirect_uri += window.location.hostname;
        redirect_uri += window.location.pathname;
        redirect_uri += '?play_done=1&prize=0';
        window.location.href = redirect_uri;

    } else {
        $.ajax({
            type: 'POST',
            url: '../program/api/share_game.php',
            data: {
                fbid: fb_id,
            },
            dataType: "json",
            success: function(res) {
                console.log('share_game', res);

                if (res['code'] == 0 || res['code'] == 99) {

                    var prize = res['award'];

                    var redirect_uri = window.location.protocol + '//';
                    redirect_uri += window.location.hostname;
                    redirect_uri += window.location.pathname;
                    redirect_uri += '?play_done=1&prize=' + prize;
                    window.location.href = redirect_uri;
                } else {
                    if (res['code'] == 1) {
                        alert('share_game, 錯誤回報\nFB ID 錯誤');
                    }

                    if (res['code'] == 2) {
                        alert('share_game, 錯誤回報\n分享超出今日遊戲次數');
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
        });
    }
}

// 顯示抽獎畫面
function show_award(check_award) {

    $('#game-bg .game-bg-img').attr('src', 'img/award/game_bg0.png');
    $('#game-mobile-bg .game-bg-img').attr('src', 'img/award_mobile/game_bg_m_0.png');
    $('.play-award.game-cover').find('.prize').attr('src', 'img/award/prize_' + check_award + '/0.png');
    // 背景線會動
    // target_obj = $('#game-bg .game-bg-img');
    // src_prefix = {
    //     name: 'img/award/game_bg',
    //     format: 'png'
    // };
    // swap_bg_img(target_obj, src_prefix, 1000, 2, true);

    // target_obj = $('#game-mobile-bg .game-bg-img');
    // src_prefix = {
    //     name: 'img/award_mobile/game_bg_m_',
    //     format: 'png'
    // };
    // swap_bg_img(target_obj, src_prefix, 1000, 2, true);

    setTimeout(function() {
        target_obj = $('.play-award.game-cover').find('.prize');
        src_prefix = {
            name: 'img/award/prize_' + check_award + '/',
            format: 'png'
        };
        swap_bg_img(target_obj, src_prefix, 100, 8, false);

        target_obj = $('.play-award.game-cover > .layer[data-id="1"] > .bomb');
        src_prefix = {
            name: 'img/award/bomb-',
            format: 'png'
        };
        swap_bg_img(target_obj, src_prefix, 150, 3, false);

        if (is_expired == 1) {
            swal({
                title: '大會報告',
                text: '「麥香超友力擂台賽」校際卡位戰活動已截止。',
                type: 'warning',
                confirmButtonText: 'OK'
            });
        }
    }, 500);

    $('.play-info.game-cover').css('display', 'none');
    $('.play-award.game-cover').css('display', 'block');

    $('.play-award.game-cover > .layer[data-id="4"] > .confirm-icon').click(function() {
        // window.location.href = 'index.html?play_go=1';
        window.location.href = '/?play_go=1';
    })
}

function get_school_name(sid) {
    $.ajax({
        type: 'POST',
        url: '../program/api/get_sid_name.php',
        data: {
            sid: sid
        },
        dataType: "json",
        success: function(res) {
            console.log('get_sid_name', res);
            game_school_name = res['school_name'];

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        },
    });
}

// 寫入分數
// 上線用
function add_scores(fb_id, sid, scores) {

    if (is_expired == 1) {
        swal({
            title: '大會報告',
            text: '「麥香超友力擂台賽」校際卡位戰積分已停止統計。',
            type: 'warning',
            confirmButtonText: 'OK'
        });
        game_done(game_school_name, scores);

    } else {

        $.ajax({
            type: 'POST',
            url: '../program/api/add_score.php',
            data: {
                fbid: fb_id,
                sid: sid,
                scores: scores
            },
            dataType: "json",
            success: function(res) {
                console.log('add_score', res);

                if (res['code'] == 0 || res['code'] == 99) {

                    game_done(game_school_name, scores);
                } else {
                    alert('add_score, 錯誤回報');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
        });
    }
}

function first_gift() {
    $('.game-content.first-gift').css('display', 'block');
    $('.game-content.first-gift').find('.go-play').click(function() {
        game_info();
    });
    $('.game-content.first-gift').find('.back-home').click(function() {
        // window.location.href = 'index.html';
        window.location.href = '/';
    });
}

function game_info() {
    $('.game-content.first-gift').css('display', 'none');
    $('.game-content.info').css('display', 'block');
    $('.game-content.info').find('.ready-go').click(function() {

        $('.game-content.info').css('display', 'none');
        $('.play-info.game-cover').css('display', 'none');
        $('.play-game.game-cover').css('display', 'block');

        // 遊戲開始隱藏home icon
        $('.home-icon').css('display', 'none');

        // 本地端用 
        // get_question_localhost(0, 3000, 'start');
        // 上線用
        get_question(0, 3000, 'start');
    });
}

function game_done(school_name, scores) {

    var sign = '+';
    var src = 'img/game/game_bw3_' + scores + '.png';

    if (scores == 0) {
        school_name = '不要放棄治療';
        sign = '~';
        scores = '我挺你';
    }

    $('.game-content.game-done').find('.add-scores').attr('src', src);
    $('.game-content.game-done').find('.which-school > .school-name').text(school_name);
    $('.game-content.game-done').find('.which-school > .sign').text(sign);
    $('.game-content.game-done').find('.which-school > .scores').text(scores);

    $('.play-game.game-cover').css('display', 'none');
    $('.play-info.game-cover').css('display', 'block');
    $('.game-content.game-done').css('display', 'block');

    $('.game-content.game-done').find('.done-home').click(function() {
        // window.location.href = 'index.html?play_go=1';
        window.location.href = '/?play_go=1';
    });

    $('.game-content.game-done').find('.share-fb').click(function() {
        // 觸發臉書分享
        share_fb(fb_id);
        $('#fb-share-btn').click();
    });
}

// 是否本日已經玩過這間學校
function check_today_score(fb_id, sid) {
    $.ajax({
        type: 'POST',
        url: '../program/api/check_today_score.php',
        data: {
            fbid: fb_id,
            sid: sid
        },
        dataType: "json",
        success: function(res) {
            console.log('check_today_score', res);

            if (res['code'] == 0 || res['code'] == 99) {

                if (res['today'] == 1) {
                    alert('每間學校當天只能玩一次唷 !');
                    // window.location.href = 'index.html';
                    window.location.href = '/';
                }
            } else {
                alert('check_today_score, FB ID 錯誤');
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        },
    });
}

// 本地端用
// 遊戲起始
function game_init_localhost() {
    first_gift();
}

// 上線用
// 遊戲起始
function game_init() {

    start_loading($('#pre-load'), 'img/main/loading.gif', '300px', '#d10a27', '1.0');

    var sid = getQueryStrByName('sid');

    game_sid = sid;

    if (sid != null && sid != '') {

        get_school_name(sid);

        if (window.fbApiInit && Object.keys(window.user_fb).length > 0) {
            console.log(window.user_fb);

            // 是否本日已經玩過這間學校
            check_today_score(window.user_fb['id'], sid);

            // 是否本日首次玩
            $.ajax({
                type: 'POST',
                url: '../program/api/get_fb_times.php',
                data: {
                    fbid: window.user_fb['id'],
                },
                dataType: "json",
                success: function(res) {
                    console.log('get_fb_times', res);

                    if (res['code'] == 0 || res['code'] == 99) {
                        if (res['times'] == 0) {

                            first_gift();
                        } else {
                            game_info();
                        }
                    } else {
                        alert('get_fb_times, FB ID 錯誤');
                    }

                    setTimeout(function() {
                        stop_loading($('#pre-load'));

                        if (is_expired == 1) {
                            swal({
                                title: '大會報告',
                                text: '「麥香超友力擂台賽」校際卡位戰積分已停止統計。',
                                type: 'warning',
                                confirmButtonText: 'OK'
                            });
                        }
                    }, 1000);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("Status: " + textStatus);
                    console.log("Error: " + errorThrown);
                },
            });
        } else {
            // alert('登入以後才可以玩遊戲唷!\n即將導回首頁...');
            // window.location.href = 'index.html';
            $('.fbshare-area').attr('sid', sid);
            $('.fbshare-area').click();
        }
    } else {
        alert('不合法的學校代碼');
        // window.location.href = 'index.html';
        window.location.href = '/';
    }
}

function set_ques_text(index) {
    for (var i = 1; i <= 3; i++) {

        var suffix = '';
        if (index == i) {

            $('.test-text[data-id="' + i + '"] > img').attr('src', 'img/game/game_test' + i + suffix + '.png');
        } else {

            suffix = '_2';
            $('.test-text[data-id="' + i + '"] > img').attr('src', 'img/game/game_test' + i + suffix + '.png')
        }
    }
}

function next_question(q_id, func_data) {

    setTimeout(function() {

        $('.game-miss').css('display', 'none');
        $('.game-yes').remove();
        $('.game-no').remove();

        set_ques_text(q_id + 1);

        if (func_data['is_localhost']) {
            get_question_localhost(func_data['next_id'], func_data['duration'], func_data['status']);
        } else {
            get_question(func_data['next_id'], func_data['duration'], func_data['status']);
        }

    }, 1000);
}

// 本地端用 
function get_question_localhost(q_id, timeout, status) {

    if (q_id < 3) {

        $('.mine-ques > img').attr('src', 'img/game/questions/grey_1.jpg');

        for (var i = 1; i <= 4; i++) {
            $('.mine-ans[data-id="' + i + '"] > img').attr('src', 'img/game/answers/normal_' + i + '.jpg');
        }

        var lock = 0
        var next_id = q_id + 1;

        var duration = timeout / 1000;

        // 時間到進下一題
        var stop_count = setInterval(function() {
            console.log(q_id + '_' + status, duration);

            $('.play-game.game-cover > .test-group > .timer > .timer-num').text(duration);

            if (duration == 0) {

                if (answer['finished'][q_id] == 0) {

                    $('.game-miss').css('display', 'block');
                    func_data = {
                        is_localhost: 1,
                        next_id: next_id,
                        duration: 3000,
                        status: 'timeout'
                    }
                    next_question(next_id, func_data);
                    clearInterval(stop_count);
                    lock = 1;
                }
            } else {
                duration--;
            }
        }, 1000);

        //點擊進下一題
        $('.mine-ans').click(function(event) {
            event.stopPropagation();

            if (lock == 0) {
                console.log('mine-ans', q_id);

                if (answer['finished'][q_id] == 0) {
                    if ($(this).hasClass('is-answer')) {

                        $('<div class="game-yes"><img src="img/game/game_yes.png"></div>').appendTo($(this));
                        answer['correct'][q_id] = 1;
                    } else {
                        $('<div class="game-no"><img src="img/game/game_no.png"></div>').appendTo($(this));
                    }
                    answer['finished'][q_id] = 1;

                    func_data = {
                        is_localhost: 1,
                        next_id: next_id,
                        duration: 3000,
                        status: 'answer_click'
                    }
                    next_question(next_id, func_data);
                    clearInterval(stop_count);
                    lock = 1;
                }
            }
        });
    }

    if (q_id == 3) {
        var total_correct = 0;

        for (var i = 0; i < 3; i++) {
            total_correct = total_correct + parseInt(answer['correct'][i]);
        }
        game_done(game_school_name, total_correct);

        // 遊戲結束打開home icon
        // $('.home-icon').css('display', 'block');
    }
}

// 上線用
function get_question(q_id, timeout, status) {

    if (q_id < 3) {

        start_loading($('#pre-load'), 'img/game/game_load.gif', '100px', '#7f0013', '1.0');

        $.ajax({
            type: 'POST',
            url: '../program/api/get_question.php',
            dataType: "json",
            success: function(res) {
                console.log(res);

                $('.mine-ques > img').attr('src', res['title']);

                for (var i = 1; i <= 4; i++) {
                    $('.mine-ans[data-id="' + i + '"] > img').attr('src', res['q' + i]);
                }

                var ans_index = res['answer'];

                $('.is-answer').removeClass('is-answer');
                $('.mine-ans[data-id="' + ans_index + '"]').addClass('is-answer');

                var lock = 0
                var next_id = q_id + 1;
                var duration = timeout / 1000;

                // 時間到進下一題
                var stop_count = setInterval(function() {
                    console.log(q_id + '_' + status, duration);

                    $('.play-game.game-cover > .test-group > .timer > .timer-num').text(duration);

                    if (duration == 0) {

                        if (answer['finished'][q_id] == 0) {

                            $('.game-miss').css('display', 'block');

                            func_data = {
                                is_localhost: 0,
                                next_id: next_id,
                                duration: 3000,
                                status: 'timeout'
                            }
                            next_question(next_id, func_data);
                            clearInterval(stop_count);
                            lock = 1;
                        }
                    } else {
                        duration--;
                    }
                }, 1000);

                //點擊進下一題
                $('.mine-ans').click(function(event) {

                    event.stopPropagation();
                    if (lock == 0) {
                        console.log('mine-ans', q_id);

                        if (answer['finished'][q_id] == 0) {
                            if ($(this).hasClass('is-answer')) {

                                $('<div class="game-yes"><img src="img/game/game_yes.png"></div>').appendTo($(this));
                                answer['correct'][q_id] = 1;
                            } else {
                                $('<div class="game-no"><img src="img/game/game_no.png"></div>').appendTo($(this));
                            }
                            answer['finished'][q_id] = 1;

                            func_data = {
                                is_localhost: 0,
                                next_id: next_id,
                                duration: 3000,
                                status: 'answer_click'
                            }

                            next_question(next_id, func_data);
                            clearInterval(stop_count);
                            lock = 1;
                        }
                    }
                });

                setTimeout(function() {
                    stop_loading($('#pre-load'));
                }, 800);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
        });
    }

    if (q_id == 3) {
        var total_correct = 0;

        for (var i = 0; i < 3; i++) {
            total_correct = total_correct + parseInt(answer['correct'][i]);
        }
        // 寫入分數
        if (game_sid == '') {
            alert('不合法的學校代碼');
        } else {
            add_scores(window.user_fb['id'], game_sid, total_correct);
        }

        // 遊戲結束打開home icon
        // $('.home-icon').css('display', 'block');
    }
}

function redir_share_game() {
    // share_game & game_id 是呼叫抽獎api的參數
    var share_game = getQueryStrByName('share_game');
    var game_id = getQueryStrByName('game_id');
    var is_executed = 0;

    // 取消分享
    var error_code = getQueryStrByName('error_code')

    if (error_code != null && error_code != '') {
        // window.location.href = 'index.html';
        window.location.href = '/';
    } else {

        if (share_game != null && share_game != '') {
            if (game_id != null && game_id != '') {
                // play_done & prize 是呼叫抽獎畫面的參數
                // 兩個參數防止換面被隨意叫出
                // 遊戲分享
                call_share_game(game_id);
                is_executed = 1;
            }
        }
    }
    return is_executed;
}

function is_from_share_game() {
    // play_done & prize 是呼叫抽獎畫面的參數
    var play_done = getQueryStrByName('play_done');
    var prize = getQueryStrByName('prize');
    var is_executed = 0;

    if (play_done != null && play_done != '') {
        if (prize != null && prize != '') {
            // 呼叫抽獎畫面
            show_award(prize);

            stop_loading($('#pre-load'));
            is_executed = 1;
        }
    }
    return is_executed;
}

$(window).load(function() {
    // 高度修正
    adjust_game_height();

    var mode = redir_share_game();

    mode += is_from_share_game();

    if (mode == 0) {

        setTimeout(function() {

            stop_loading($('#pre-load'));

            // 遊戲起始
            // 本地端用
            // game_init_localhost();
            // 上線用
            game_init();
        }, 1500);
    }
});

$(document).ready(function() {

    start_loading($('#pre-load'), 'img/main/loading.gif', '300px', '#d10a27', '1.0');

    $('.home-icon').click(function() {

        if (confirm('你決定要離開遊戲嗎?') == true) {
            // window.location.href = 'index.html';
            window.location.href = '/';
        }
    });
});

$(window).resize(function() {
    // 高度修正
    adjust_game_height();
});
