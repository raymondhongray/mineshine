<?php
/* USER-AGENTS
================================================== */
function check_user_agent ( $type = NULL ) {
    $user_agent = strtolower ( $_SERVER['HTTP_USER_AGENT'] );
    if ( $type == 'bot' ) {
            // matches popular bots
            if ( preg_match ( "/googlebot|adsbot|yahooseeker|yahoobot|msnbot|watchmouse|pingdom\.com|feedfetcher-google/", $user_agent ) ) {
                    return true;
                    // watchmouse|pingdom\.com are "uptime services"
            }
    } else if ( $type == 'browser' ) {
            // matches core browser types
            if ( preg_match ( "/mozilla\/|opera\//", $user_agent ) ) {
                    return true;
            }
    } else if ( $type == 'mobile' ) {
            // matches popular mobile devices that have small screens and/or touch inputs
            // mobile devices have regional trends; some of these will have varying popularity in Europe, Asia, and America
            // detailed demographics are unknown, and South America, the Pacific Islands, and Africa trends might not be represented, here
            if ( preg_match ( "/phone|iphone|itouch|ipod|symbian|android|htc_|htc-|palmos|blackberry|opera mini|iemobile|windows ce|nokia|fennec|hiptop|kindle|mot |mot-|webos\/|samsung|sonyericsson|^sie-|nintendo/", $user_agent ) ) {
                    // these are the most common
                    if (preg_match ( "/nexus|ipad/", $user_agent )) {
                        return false;
                    } else {
                        return true;
                    } 
            } else if ( preg_match ( "/mobile|pda;|avantgo|eudoraweb|minimo|netfront|brew|teleca|lg;|lge |wap;| wap /", $user_agent ) ) {
                    // these are less common, and might not be worth checking
                    if (preg_match ( "/nexus|ipad/", $user_agent )) {
                        return false;
                    } else {
                        return true;
                    } 
            }
    }
    return false;
}
?>
<!DOCTYPE html>
<html lang="zh-tw">

<head>
    <meta charset="utf-8">
    <title>麥香2016超友力擂台賽</title>
    <meta name="keywords" content="">
    <meta name="description" content="麥香超友力擂台賽，晉級沒友你，就不型！">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="麥香2016超友力擂台賽" />
    <meta property="og:image" content="" />
    <meta property="og:image" content="" />
    <meta property="og:image" content="" />
    <meta property="og:description" content="" />
    <link rel="shortcut icon" href="img/main/mine_favicon.ico">
    <!-- CSS -->
    <link href="css/reset.css" rel="stylesheet" type="text/css" />
    <link href="css/main.css" rel="stylesheet" type="text/css" />
    <link href="css/game.css" rel="stylesheet" type="text/css" />
    <?php
        $ismobile = check_user_agent('mobile');
    ?>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-43292110-19', 'auto');
      ga('send', 'pageview');
      ga('require', 'linkid');
      ga('require', 'displayfeatures');
    </script>
</head>

<body>
    <script>
    window.fbAsyncInit = function() {
        FB.init({
            appId: '1582634928709967',
            xfbml: true,
            version: 'v2.7'
        });

        fbApiInit = true; //init flag
        user_fb = {}; //user fbid, name
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    </script>
    <button type="button" id="fb-share-btn" style="display: none;">FB share button</button>
    <?php
        if($ismobile) { 
    ?>
    <div id="orientation" class="orientation-effect">
        <img class="orientation-effect-pic" src="img/main/orientation_icon.png" />
        <div class="orientation-effect-opacity"></div>
    </div>
    <?php
        } 
    ?>
    <div id="pre-load" class="loading-effect">
        <img class="loading-effect-pic" src="img/main/loading.gif" />
        <div class="loading-effect-opacity"></div>
    </div>
    <header>
        <div class="mineshine-menu-desktop game">
            <div class="menu-item">
                <img class="home-icon" src="img/main/home_icon.png" onclick="ga('send', 'event', 'menu', 'Click', '回首頁');"/>
            </div>
            <div class="menu-item">
                <img class="mineshine-logo" src="img/main/mineshine_logo_mobile.png" />
            </div>
            <div class="menu-item fbshare-area" sid="">
                <span>
                    <img class="fbshare-btn" src="img/main/fbshare_btn.png" />
                </span>
                <span>登入</span>
            </div>
        </div>
        <div class="mineshine-menu-mobile">
            <img class="home-icon" src="img/main/home_icon.png" onclick="ga('send', 'event', 'menu', 'Click', '回首頁(mobile)');"/>
            <img class="mineshine-logo" src="img/main/mineshine_logo_mobile.png" />
            <div class="fbshare-area" sid="">
                <span>
                    <img class="fbshare-btn" src="img/main/fbshare_btn.png" />
                </span>
                <span>登入</span>
            </div>
        </div>
    </header>
    <div class="wrap">
        <div class="container">
            <div class="header-space"></div>
            <?php
                if(!$ismobile) { 
            ?>
            <!-- desktop start -->
            <div id="game-bg" class="main-bg game-bg">
                <div class="row">
                    <img class="col-1 game-bg-img" src="img/game/game_bg0.png">
                    <div class="play-info game-cover">
                        <img class="game-title" src="img/game/game_catch.png">
                        <!-- 每日首次禮 -->
                        <div class="game-content first-gift">
                            <img class="first-msg" src="img/game/game_sub1.png">
                            <img class="add-one" src="img/game/game_bw1.png">
                            <div class="btn-g">
                                <img class="go-play" src="img/game/game_btn1.png" onclick="ga('send', 'event', '遊戲', 'Click', '確認領取(首次登入禮)');">
                                <img class="back-home" src="img/game/game_btn2.png" onclick="ga('send', 'event', '遊戲', 'Click', '重選學校(首次登入禮)');">
                            </div>
                        </div>
                        <!-- 遊戲規則說明 -->
                        <div class="game-content info">
                            <img class="info-msg" src="img/game/game_bw2.png">
                            <img class="ready-go" src="img/game/game_btn3.png" onclick="ga('send', 'event', '遊戲', 'Click', '挑戰極限Go(遊戲開始)');">
                        </div>
                        <!-- 遊戲完成 -->
                        <div class="game-content game-done">
                            <img class="add-scores" src="img/game/game_bw3_0.png">
                            <p class="which-school">
                                <span class="school-name">中山高中</span>
                                <span class="sign">+</span>
                                <span class="scores">3</span>
                            </p>
                            <div class="btn-g">
                                <img class="share-fb" src="img/game/game_btn4.png" onclick="ga('send', 'event', '遊戲', 'Click', '分享好友(遊戲結果)');">
                                <img class="done-home" src="img/game/game_btn5.png" onclick="ga('send', 'event', '遊戲', 'Click', '查看積分(遊戲結果)');">
                            </div>
                        </div>
                    </div>
                    <!-- 抽獎畫面 desktop start -->
                    <div class="play-award game-cover">
                        <div class="layer" data-id="1">
                            <img class="award-title" src="img/award/lucky-draw.png">  
                            <img class="bomb" src="img/award/bomb-0.png">
                        </div>
                        <div class="layer" data-id="2">
                            <img class="prize" src="">
                            <img class="msg" src="img/award/Continue-to-challenge.png">
                        </div>
                        <div class="layer" data-id="3">
                            <img class="people" src="img/award/people.png">
                        </div>
                        <div class="layer" data-id="4">
                            <img class="confirm-icon" src="img/award/confirm-icon.png" onclick="ga('send', 'event', '遊戲', 'Click', '確認(友力抽)');">
                        </div>
                    </div>
                    <!-- 抽獎畫面 desktop end -->
                    <!-- 遊戲範圍 desktop start -->
                    <div class="play-game game-cover">
                        <div class="test-group">
                            <div class="timer">
                                <p class="timer-text">Time:</p>
                                <p class="timer-num">3</p>
                            </div>
                            <div class="test-text" data-id="1">
                                <img src="img/game/game_test1.png">
                            </div>
                            <div class="test-text" data-id="2">
                                <img src="img/game/game_test2_2.png">
                            </div>
                            <div class="test-text" data-id="3">
                                <img src="img/game/game_test3_2.png">
                            </div>
                        </div>
                        <div class="mine-ques">
                            <img src="">
                        </div>
                        <div class="mine-ans-group">
                            <div class="game-miss">
                                <img src="img/game/game_miss.png">
                            </div>
                            <div class="mine-ans is-answer" data-id="1">
                                <img src="">
                            </div>
                            <div class="mine-ans" data-id="2">
                                <img src="">
                            </div>
                            <div class="mine-ans" data-id="3">
                                <img src="">
                            </div>
                            <div class="mine-ans" data-id="4">
                                <img src="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- desktop end -->
            <?php
                }
            ?>
            <!-- mobile start -->
            <div id="game-mobile-bg" class="main-bg game-bg">
                <div class="row">
                    <img class="col-1 game-bg-img" src="img/game_mobile/game_bg0.png">
                    <div class="play-info game-cover">
                        <img class="game-title" src="img/game/game_catch.png">
                        <!-- 每日首次禮 -->
                        <div class="game-content first-gift">
                            <img class="first-msg" src="img/game/game_sub1.png">
                            <img class="add-one" src="img/game/game_bw1.png">
                            <div class="btn-g">
                                <img class="go-play" src="img/game/game_btn1.png" onclick="ga('send', 'event', '遊戲', 'Click', '確認領取(首次登入禮-mobile)');">
                                <img class="back-home" src="img/game/game_btn2.png" onclick="ga('send', 'event', '遊戲', 'Click', '重選學校(首次登入禮-mobile)');">
                            </div>
                        </div>
                        <!-- 遊戲規則說明 -->
                        <div class="game-content info">
                            <img class="info-msg" src="img/game/game_bw2.png">
                            <img class="ready-go" src="img/game/game_btn3.png" onclick="ga('send', 'event', '遊戲', 'Click', '挑戰極限Go(遊戲開始-mobile)');">
                        </div>
                        <!-- 遊戲完成 -->
                        <div class="game-content game-done">
                            <img class="add-scores" src="img/game/game_bw3_0.png">
                            <p class="which-school">
                                <span class="school-name">中山高中</span>
                                <span class="sign">+</span>
                                <span class="scores">3</span>
                            </p>
                            <div class="btn-g">
                                <img class="share-fb" src="img/game/game_btn4.png" onclick="ga('send', 'event', '遊戲', 'Click', '分享好友(遊戲結果-mobile)');">
                                <img class="done-home" src="img/game/game_btn5.png" onclick="ga('send', 'event', '遊戲', 'Click', '查看積分(遊戲結果-mobile)');">
                            </div>
                        </div>
                    </div>
                    <!-- 抽獎畫面 mobile start -->
                    <div class="play-award game-cover">
                        <div class="layer" data-id="1">
                            <img class="award-title" src="img/award/lucky-draw.png">  
                            <img class="bomb" src="img/award/bomb-0.png">
                        </div>
                        <div class="layer" data-id="2">
                            <img class="prize" src="">
                            <img class="msg" src="img/award/Continue-to-challenge.png">
                        </div>
                        <div class="layer" data-id="3">
                            <img class="people" src="img/award/people.png">
                        </div>
                        <div class="layer" data-id="4">
                            <img class="confirm-icon" src="img/award/confirm-icon.png" onclick="ga('send', 'event', '遊戲', 'Click', '確認(友力抽-mobile)');">
                        </div>
                    </div>
                    <!-- 抽獎畫面 mobile end -->
                    <!-- 遊戲範圍 start -->
                    <div class="play-game game-cover">
                        <div class="test-group">
                            <div class="timer">
                                <p class="timer-text">Time</p>
                                <p class="timer-num">3</p>
                                <div class="timer-opacity"></div>
                            </div>
                            <div class="test-text" data-id="1">
                                <img src="img/game/game_test1.png">
                            </div>
                            <div class="test-text" data-id="2">
                                <img src="img/game/game_test2_2.png">
                            </div>
                            <div class="test-text" data-id="3">
                                <img src="img/game/game_test3_2.png">
                            </div>
                        </div>
                        <div class="mine-ques">
                            <img src="">
                        </div>
                        <div class="mine-ans-group">
                            <div class="game-miss">
                                <img src="img/game/game_miss.png">
                            </div>
                            <div class="mine-ans is-answer" data-id="1">
                                <img src="">
                            </div>
                            <div class="mine-ans" data-id="2">
                                <img src="">
                            </div>
                            <div class="mine-ans" data-id="3">
                                <img src="">
                            </div>
                            <div class="mine-ans" data-id="4">
                                <img src="">
                            </div>
                        </div>
                    </div>
                    <!-- 遊戲範圍 start -->
                </div>
            </div>
            <!-- mobile end -->
        </div>
    </div>
    <script type="text/javascript" src="js/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/game.js"></script>
</body>

</html>
