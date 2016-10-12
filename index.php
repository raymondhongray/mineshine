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
    <link href="css/footer.css" rel="stylesheet" type="text/css" />
    <link href="css/popup_menu.css" rel="stylesheet" type="text/css" />
    <link href="css/school_menu.css" rel="stylesheet" type="text/css" />
    <link href="css/master_vision.css" rel="stylesheet" type="text/css" />
    <!-- 注意，先有school_menu 的全校資訊才有前三名 -->
    <link href="css/battlefield.css" rel="stylesheet" type="text/css" />
    <link href="css/step.css" rel="stylesheet" type="text/css" />
    <link href="css/activity_rule.css" rel="stylesheet" type="text/css" />
    <link href="css/popup_video.css" rel="stylesheet" type="text/css" />
    <link href="css/award_result.css" rel="stylesheet" type="text/css" />
    <link href="css/index_animation.css" rel="stylesheet" type="text/css" />  
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
        <p><?php echo $_SERVER['HTTP_USER_AGENT']; ?></p>
    </div>
    <?php
        } 
    ?>
    <div id="pre-load" class="loading-effect">
        <img class="loading-effect-pic" src="img/main/loading.gif" />
        <div class="loading-effect-opacity"></div>
    </div>
    <div class="popup-video">
        <img class="popup-video-share" src="img/popup_video/video-fb-share-icon.png" onclick="ga('send', 'event', '首頁', 'Click', '影片分享');"/>
        <div class="popup-video-close"></div>
        <div class="popup-video-box">
            <iframe id="youtube-iframe" type="text/html" src="" frameborder="0">
            </iframe>
        </div>
        <div class="popup-video-opacity"></div>
    </div>
    <div class="popup-award">
        <div class="popup-award-close"></div>
        <div class="popup-award-pic">
            <a href="https://www.facebook.com/uni.mineshine" target="_blank" onclick="ga('send', 'event', '首頁', 'Click', '得獎查詢(麥香粉絲團)');">
                <img src="" />
            </a>
        </div>
        <div class="popup-award-opacity"></div>
    </div>
    <div class="popup-menu">
        <div class="popup-menu-close"></div>
        <div class="popup-menu-pic">
            <nav>
                <ul>
                    <li class="menu-home mv-m" onclick="ga('send', 'event', 'menu', 'Click', '回首頁(mobile)');">
                        回首頁
                    </li>
                    <li class="menu-video" onclick="ga('send', 'event', 'menu', 'Click', '超友力預告片(mobile)');">
                        超友力預告片
                    </li>
                    <li class="menu-battle mv-m" onclick="ga('send', 'event', 'menu', 'Click', '即時戰況(mobile)');">
                        即時戰況
                    </li>
                    <li class="menu-play mv-m" onclick="ga('send', 'event', 'menu', 'Click', '校際卡位GO(mobile)');">
                        校際卡位 GO！
                    </li>
                    <li class="award-result" style="display: none;" onclick="ga('send', 'event', 'menu', 'Click', '得獎查詢(mobile)');">
                        得獎查詢
                    </li>
                    <li class="menu-rule mv-m" onclick="ga('send', 'event', 'menu', 'Click', '活動辦法(mobile)');">
                        活動辦法
                    </li>
                    <a style="color:#fff;" href="https://www.facebook.com/uni.mineshine" target="_blank" onclick="ga('send', 'event', 'menu', 'Click', '麥香粉絲團(mobile)');">
                        <li>
                            麥香粉絲團
                        </li>
                    </a>
                </ul>
            </nav>
        </div>
        <div class="popup-menu-opacity"></div>
    </div>
    <!-- 爆炸開始 -->
    <?php
        if(!$ismobile) { 
    ?>
    <div class="bomb-animation is-desktop">
        <img src="img/main/boom.gif" />
    </div>
    <?php
        }
    ?>
    <div class="bomb-animation is-mobile">
        <img src="img/main/boom_m.gif" />
    </div>
    <!-- 爆炸結束 -->
    <header>
        <div class="mineshine-menu-desktop">
            <div class="mineshine-logo mv-d" onclick="ga('send', 'event', 'menu', 'Click', '麥香logo');">
                <img src="img/main/mineshine_logo_mobile.png" />
            </div>
            <div class="menu-item menu-video" onclick="ga('send', 'event', 'menu', 'Click', '超友力預告片');">超友力預告片</div>
            <div class="menu-item menu-battle mv-d" onclick="ga('send', 'event', 'menu', 'Click', '即時戰況');">即時戰況</div>
            <div class="menu-item menu-play mv-d" onclick="ga('send', 'event', 'menu', 'Click', '校際卡位GO');">校際卡位 GO !</div>
            <div class="menu-item award-result" style="display: none;" onclick="ga('send', 'event', 'menu', 'Click', '得獎查詢');">得獎查詢</div>
            <div class="menu-item menu-rule mv-d" onclick="ga('send', 'event', 'menu', 'Click', '活動辦法');">活動辦法</div>
            <div class="menu-item fbshare-area" onclick="ga('send', 'event', 'menu', 'Click', 'FB登入');">
                <span>
                    <img class="fbshare-btn" src="img/main/fbshare_btn.png" />
                </span>
                <span>登入</span>
            </div>
        </div>
        <div class="mineshine-menu-mobile">
            <img class="mineshine-menu-icon" src="img/main/white_menu.png" onclick="ga('send', 'event', 'menu', 'Click', '漢堡(mobile)');"/>
            <img class="mineshine-logo mv-m" src="img/main/mineshine_logo_mobile.png" onclick="ga('send', 'event', 'menu', 'Click', '麥香logo(mobile)');"/>
            <div class="fbshare-area" onclick="ga('send', 'event', 'menu', 'Click', 'FB登入(mobile)');">
                <span>
                    <img class="fbshare-btn" src="img/main/fbshare_btn.png" />
                </span>
                <span>登入</span>
            </div>
        </div>
    </header>
    <img class="fb-share-index is-desktop" src="img/master_vision/fb-share-icon.png" onclick="ga('send', 'event', '首頁', 'Click', 'FB分享網站');"/>
    <img class="fb-share-index is-mobile" src="img/master_vision_mobile/fb-share-icon.png" onclick="ga('send', 'event', '首頁', 'Click', 'FB分享網站(mobile)');"/>
    <div class="wrap">
        <div class="container">
            <div class="header-space"></div>
            <?php
                if(!$ismobile) { 
            ?>
            <!-- 主視覺 desktop start -->
            <div id="maste-vision-bg" class="main-bg">
                <div class="row">
                    <img id="maste-vision-img" class="col-1" src="img/master_vision/bg_0.png">
                </div>
                <div class="row second-vision">
                    <img class="col-1 second-vision-img" src="img/master_vision/bubble-02-bg.png">
                </div>
                <div class="layer" data-id="1">
                    <div class="marquee-frame">
                        <div class="marquee">
                            <!-- 跑馬燈測試 -->
                            <marquee DIRECTION="left" BEHAVIOR="scroll"></marquee>
                        </div>
                    </div>
                    <img class="master-title" src="img/master_vision/title.png">
                    <img class="sub-title" src="img/master_vision/sub_title.png">
                    <img class="bubble-01" src="img/master_vision/bubble-01.png" onclick="ga('send', 'event', '首頁', 'Click', '校際卡位文字(主視覺)');">
                    <img class="go-icon" src="img/master_vision/go-icon.png" onclick="ga('send', 'event', '首頁', 'Click', '校際卡位Go(主視覺)');">
                    <img class="bubble-02" src="img/master_vision/bubble-02.png" onclick="ga('send', 'event', '首頁', 'Click', '第二彈(主視覺)');">
                    <img class="first-icon" src="img/master_vision/first-icon.png" onclick="ga('send', 'event', '首頁', 'Click', '搶先了解(主視覺)');">
                    <div class="mine-video" vid="Rydvsk7DQ-I" onclick="ga('send', 'event', '首頁', 'Click', '影片撥放');"></div>
                </div>
                <div class="layer" data-id="2">
                    <img class="master-vision-logo" src="img/master_vision/master_vision_logo.png">
                    <img class="hand-left" src="img/master_vision/hand-left.png">
                    <img class="hand-right" src="img/master_vision/hand-right.png">
                    <img class="cloud-left" src="img/master_vision/cloud-left.png">
                    <img class="cloud-right" src="img/master_vision/cloud-right.png">
                </div>
                <div class="layer" data-id="3">
                    <img class="master-girl" src="img/master_vision/girl-comic.png">
                    <img class="master-boy" src="img/master_vision/boy-comic.png">
                </div>
            </div>
            <!-- 主視覺 desktop end -->
            <?php
                }
            ?>
            <!-- 主視覺 mobile start -->
            <div id="maste-vision-m-bg" class="main-bg-m">
                <div class="row">
                    <img id="maste-vision-m-img" class="col-1" src="img/master_vision_mobile/bg_0.png">
                    <div class="layer">
                        <div class="marquee-frame">
                            <div class="marquee col-1">
                                <!-- 跑馬燈測試 -->
                                <marquee DIRECTION="left" BEHAVIOR="scroll"></marquee>
                            </div>
                        </div>
                        <img class="mine-2016" src="img/master_vision_mobile/mine-2016.png">
                        <img class="master-title" src="img/master_vision_mobile/title.png">
                        <img class="sub-title" src="img/master_vision_mobile/sub_title.png">
                        <img class="bubble-01" src="img/master_vision_mobile/bubble-01.png" onclick="ga('send', 'event', '首頁', 'Click', '校際卡位文字(主視覺-mobile)');">
                        <img class="go-icon" src="img/master_vision_mobile/go-icon.png" onclick="ga('send', 'event', '首頁', 'Click', '校際卡位Go(主視覺-mobile)');">
                    </div>
                </div>
                <div class="row">
                    <img class="col-1 bubble-02-bg" src="img/master_vision_mobile/bubble-02-bg.png">
                    <div class="layer">
                        <img class="bubble-02" src="img/master_vision_mobile/bubble-02.png" onclick="ga('send', 'event', '首頁', 'Click', '第二彈(主視覺-mobile)');">
                        <img class="first-icon" src="img/master_vision_mobile/first-icon.png" onclick="ga('send', 'event', '首頁', 'Click', '搶先了解(主視覺-mobile)');">
                    </div>
                </div>
                <div class="row">
                    <img class="col-1 mine-video" vid="Rydvsk7DQ-I" src="img/master_vision_mobile/mine_video.png" onclick="ga('send', 'event', '首頁', 'Click', '影片撥放(mobile)');">
                </div>
            </div>
            <!-- 主視覺 mobile end -->
            <img class="main-down marginTop" src="img/main/main_down.png">
            <?php
                if(!$ismobile) { 
            ?>
            <!-- 及時戰況 desktop start -->
            <div id="battlefield" class="main-bg">
                <div class="row battlefield-bg">
                    <div class="flower_area" style="position: absolute;top: 0;left: 0;width: 100%;height: 90%;">
                        <canvas id="flower-canvas" class="flower-canvas"></canvas>
                    </div>
                    <img class="col-1" src="img/battlefield/winner_bg_1.png">
                    <div class="layer" data-id="1">
                        <img class="battlefield-title" src="img/battlefield/winner-title.png">
                        <div class="marquee-frame">
                            <div class="marquee">
                                <!-- 跑馬燈測試 -->
                                <marquee DIRECTION="left" BEHAVIOR="scroll"></marquee>
                            </div>
                        </div>
                    </div>
                    <div class="layer" data-id="2">
                        <div class="white-board num-1" onclick="ga('send', 'event', '首頁', 'Click', '第一名');">
                            <div class="board-content">
                                <p class="school-name">麥香高中</p>
                                <p class="scores">- 積分</p>
                            </div>
                        </div>
                        <div class="white-board num-2" onclick="ga('send', 'event', '首頁', 'Click', '第二名');">
                            <div class="board-content">
                                <p class="school-name">麥麥高中</p>
                                <p class="scores">- 積分</p>
                            </div>
                        </div>
                        <div class="white-board num-3" onclick="ga('send', 'event', '首頁', 'Click', '第三名');">
                            <div class="board-content">
                                <p class="school-name">麥力高中</p>
                                <p class="scores">- 積分</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="battlefield-select-area">
                    <div class="battlefield-select-inline">
                        <img class="battlefield-select" data-id="1" src="img/battlefield/section_1_on.png">
                        <img class="battlefield-select" data-id="2" src="img/battlefield/section_2_off.png">
                        <img class="battlefield-select" data-id="3" src="img/battlefield/section_3_off.png">
                        <img class="battlefield-select" data-id="4" src="img/battlefield/section_4_off.png">
                    </div>
                    <div class="battlefield-select-opacity"></div>
                </div>
            </div>
            <!-- 及時戰況 desktop end -->
            <?php
                } 
            ?>
            <!-- 及時戰況 mobile start -->
            <div id="battlefield-mobile" class="main-bg">
                <div class="row battlefield-bg">
                    <img class="col-1" src="img/battlefield_mobile/winner_bg.png">
                    <div class="battlefield-cover">
                        <img class="title" src="img/battlefield_mobile/winner-title.png">
                        <div class="marquee-frame">
                            <div class="marquee">
                                <!-- 跑馬燈測試 -->
                                <marquee DIRECTION="left" BEHAVIOR="scroll"></marquee>
                            </div>
                        </div>
                        <img class="section-text" src="img/battlefield_mobile/school_1.png">
                        <div class="top-3-group">
                            <div class="top-3" data-id="1">
                                <img class="winner-icon" src="img/battlefield_mobile/school_winner_1_1.png">
                                <div class="winner-content-area" onclick="ga('send', 'event', '首頁', 'Click', '第一名(mobile)');">
                                    <div class="winner-content">
                                        <div class="winner-content-border">
                                            <p class="school-name">麥香高中</p>
                                            <p class="scores">- 積分</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="top-3" data-id="2">
                                <img class="winner-icon" src="img/battlefield_mobile/school_winner_1_1.png">
                                <div class="winner-content-area" onclick="ga('send', 'event', '首頁', 'Click', '第二名(mobile)');">
                                    <div class="winner-content">
                                        <div class="winner-content-border">
                                            <p class="school-name">麥麥高中</p>
                                            <p class="scores">- 積分</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="top-3" data-id="3">
                                <img class="winner-icon" src="img/battlefield_mobile/school_winner_1_1.png">
                                <div class="winner-content-area" onclick="ga('send', 'event', '首頁', 'Click', '第三名(mobile)');">
                                    <div class="winner-content">
                                        <div class="winner-content-border">
                                            <p class="school-name">麥力高中</p>
                                            <p class="scores">- 積分</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="battlefield-select-area">
                    <div class="battlefield-select-inline">
                        <img class="battlefield-select" data-id="1" src="img/battlefield/section_1_on.png" onclick="ga('send', 'event', '首頁', 'Click', '第一區學校(即時戰況)');">
                        <img class="battlefield-select" data-id="2" src="img/battlefield/section_2_off.png" onclick="ga('send', 'event', '首頁', 'Click', '第二區學校(即時戰況)');">
                        <img class="battlefield-select" data-id="3" src="img/battlefield/section_3_off.png" onclick="ga('send', 'event', '首頁', 'Click', '第三區學校(即時戰況)');">
                        <img class="battlefield-select" data-id="4" src="img/battlefield/section_4_off.png" onclick="ga('send', 'event', '首頁', 'Click', '第四區學校(即時戰況)');">
                    </div>
                </div>
            </div>
            <!-- 及時戰況 mobile end -->
            <p class="main-down-text">高校生戰起來！最後誰有資格搶下限量席位，你「玩」了算！</p>
            <img class="main-down go-icon" src="img/master_vision/go-white.png" onclick="ga('send', 'event', '首頁', 'Click', '校際卡位馬上GO');">
            <!-- 卡位三步驟 desktop start -->
            <div id="step-intro" class="main-bg">
                <div class="step-border">
                    <img class="step-bg" src="img/step/step-title.png">
                    <div class="step-area">
                        <div class="step-inline">
                            <img class="step-item" src="img/step/step-01.png">
                            <img class="step-item" src="img/step/step-02.png">
                            <img class="step-item" src="img/step/step-03.png">
                            <img class="step-item" src="img/step/step-04.png">
                        </div>
                    </div>
                </div>
            </div>
            <!-- 卡位三步驟 desktop end -->
            <div class="main-v-space"></div>
            <!-- 選擇學校 form start-->
            <form id="to-game" method="get" action="game.php" style="display: none;">
                <input type="text" name="sid" value="">
                <input type="submit" value="Go">
            </form>
            <!-- 選擇學校 form end-->
            <!-- 選擇學校 start-->
            <div id="play-go" class="school-menu">
                <div class="school-menu-select">
                    <img class="search-school-slogan" src="img/section_btn/search_school_slogan.png">
                    <div class="school-search-area">
                        <input class="school-search" placeholder="請在此輸入欲搜尋關鍵字 (如學校名稱)">
                        <img class="search-icon" src="img/section_btn/search_icon.png" onclick="ga('send', 'event', '首頁', 'Click', '搜尋(地區搜尋學校)');">
                    </div>
                    <div class="school-menu-content is-mobile" section-id="show_search_mobile">
                        <div class="content-title">
                            <span class="which-section">搜尋結果</span>
                        </div>
                        <div class="content-row clone-me">
                            <div class="content-sub-row">
                                <span class="which-section">第一區</span>
                                <span class="school-name">市立內湖高中</span>
                            </div>
                            <div class="content-sub-row flex">
                                <span class="scores">0 分</span>
                                <img class="play" src="img/section_btn/play.png" onclick="ga('send', 'event', '首頁', 'Click', '我要加分(mobile)');">
                            </div>
                        </div>
                    </div>
                    <img class="scroll-down-mobile search-area" src="img/section_btn/scroll-down.png">
                    <div class="row">
                        <div class="school-select" data-id="1" onclick="ga('send', 'event', '首頁', 'Click', '第一區學校(地區搜尋學校)');">
                            <img src="img/section_btn/section_1_on.png">
                        </div>
                        <div class="school-select" data-id="2" onclick="ga('send', 'event', '首頁', 'Click', '第二區學校(地區搜尋學校)');">
                            <img src="img/section_btn/section_2_off.png">
                        </div>
                    </div>
                    <div class="row">
                        <div class="school-select" data-id="3" onclick="ga('send', 'event', '首頁', 'Click', '第三區學校(地區搜尋學校)');">
                            <img src="img/section_btn/section_3_off.png">
                        </div>
                        <div class="school-select" data-id="4" onclick="ga('send', 'event', '首頁', 'Click', '第四區學校(地區搜尋學校)');">
                            <img src="img/section_btn/section_4_off.png">
                        </div>
                    </div>
                    <div class="school-menu-content is-mobile clone-me">
                        <div class="content-title">
                            <span class="which-section">第一區學校</span>
                            <span class="description">北北基、宜蘭、馬祖</span>
                        </div>
                        <div class="content-row clone-me">
                            <div class="content-sub-row">
                                <span class="which-section">第一區</span>
                                <span class="school-name">市立內湖高中</span>
                            </div>
                            <div class="content-sub-row flex">
                                <span class="scores">0 分</span>
                                <img class="play" src="img/section_btn/play.png" onclick="ga('send', 'event', '首頁', 'Click', '我要加分(mobile)');">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="school-menu-content normal clone-me">
                    <div class="content-title">
                        <span class="which-section">第一區學校</span>
                        <span class="description">北北基、宜蘭、馬祖</span>
                    </div>
                    <div class="content-row clone-me">
                        <div class="content-sub-row">
                            <span class="which-section">第一區</span>
                            <span class="school-name">市立內湖高中</span>
                        </div>
                        <div class="content-sub-row flex">
                            <span class="scores" style="position: relative;top: 15px;font-size: 18px;">0 分</span>
                            <img class="play" style="height: 70px;" src="img/section_btn/play.png" onclick="ga('send', 'event', '首頁', 'Click', '我要加分');">
                        </div>
                    </div>
                </div>
                <div class="school-menu-content normal" section-id="show_search">
                    <div class="content-title">
                        <span class="which-section">搜尋結果</span>
                    </div>
                    <div class="content-row clone-me">
                        <div class="content-sub-row">
                            <span class="which-section">第一區</span>
                            <span class="school-name">市立內湖高中</span>
                        </div>
                        <div class="content-sub-row flex">
                            <span class="scores" style="position: relative;top: 15px;font-size: 18px;">0 分</span>
                            <img class="play" style="height: 70px;" src="img/section_btn/play.png" onclick="ga('send', 'event', '首頁', 'Click', '我要加分');">
                        </div>
                    </div>
                </div>
            </div>
            <!-- 選擇學校 end-->
            <div class="main-v-space"></div>
            <?php
                if(!$ismobile) { 
            ?>
            <!-- 活動辦法 desktop start -->
            <div id="rule-intro" class="main-bg">
                <div class="rule-border">
                    <img class="rule-title" src="img/activity_rule/rule-title.png">
                    <img class="rule-btn off" data-id="1" src="img/activity_rule/explain-02.png" onclick="ga('send', 'event', '首頁', 'Click', '活動說明展開');">
                    <div class="rule-group">
                        <img class="rule-content on" data-id="1" src="img/activity_rule/explain-content.png" onclick="ga('send', 'event', '首頁', 'Click', '活動說明收起');">
                        <div class="rule-content-cover" data-id="1">
                            <div class="cover-relative">
                                <div class="rule-link" link-id="1" onclick="ga('send', 'event', '首頁', 'Click', '實體活動連結(活動說明)');"></div>
                                <div class="rule-link" link-id="2" onclick="ga('send', 'event', '首頁', 'Click', '麥香粉絲團(活動說明)');"></div>
                            </div>
                        </div>
                    </div>
                    <img class="rule-btn on" data-id="2" src="img/activity_rule/note-02.png" onclick="ga('send', 'event', '首頁', 'Click', '注意事項展開');">
                    <div class="rule-group">
                        <img class="rule-content off" data-id="2" src="img/activity_rule/note-content.png" onclick="ga('send', 'event', '首頁', 'Click', '注意事項收起');">
                        <div class="rule-content-cover" data-id="2">
                            <div class="cover-relative">
                                <div class="rule-link" link-id="1" onclick="ga('send', 'event', '首頁', 'Click', '麥香粉絲團(注意事項)');"></div>
                            </div>
                        </div>
                    </div>
                    <img class="rule-btn on" data-id="3" src="img/activity_rule/personal-information-02.png" onclick="ga('send', 'event', '首頁', 'Click', '個資條款展開');">
                    <div class="rule-group">
                        <img class="rule-content off" data-id="3" src="img/activity_rule/personal-information-content.png" onclick="ga('send', 'event', '首頁', 'Click', '個資條款收起');">
                        <div class="rule-content-cover" data-id="3">
                            <div class="cover-relative">
                                <div class="rule-link" link-id="1" onclick="ga('send', 'event', '首頁', 'Click', '麥香粉絲團(個資條款)');"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 活動辦法 desktop end -->
            <?php
                } 
            ?>
            <!-- 活動辦法 mobile start -->
            <div id="rule-intro-mobile" class="main-bg">
                <div class="rule-border">
                    <img class="rule-title" src="img/activity_rule_mobile/rule-title.png">
                    <img class="rule-btn off" data-id="1" src="img/activity_rule_mobile/explain-02.png" onclick="ga('send', 'event', '首頁', 'Click', '活動說明展開(mobile)');">
                    <div class="rule-group">
                        <img class="rule-content on" data-id="1" src="img/activity_rule_mobile/explain-content.png" onclick="ga('send', 'event', '首頁', 'Click', '活動說明收起(mobile)');">
                        <div class="rule-content-cover" data-id="1">
                            <div class="cover-relative">
                                <div class="rule-link" link-id="1" onclick="ga('send', 'event', '首頁', 'Click', '實體活動連結(活動說明-mobile)');"></div>
                                <div class="rule-link" link-id="2" onclick="ga('send', 'event', '首頁', 'Click', '麥香粉絲團(活動說明-mobile)');"></div>
                            </div>
                        </div>
                    </div>
                    <img class="rule-btn on" data-id="2" src="img/activity_rule_mobile/note-02.png" onclick="ga('send', 'event', '首頁', 'Click', '注意事項展開(mobile)');">
                    <div class="rule-group">
                        <img class="rule-content off" data-id="2" src="img/activity_rule_mobile/note-content.png" onclick="ga('send', 'event', '首頁', 'Click', '注意事項收起(mobile)');">
                        <div class="rule-content-cover" data-id="2">
                            <div class="cover-relative">
                                <div class="rule-link" link-id="1" onclick="ga('send', 'event', '首頁', 'Click', '麥香粉絲團(注意事項-mobile)');"></div>
                            </div>
                        </div>
                    </div>
                    <img class="rule-btn on" data-id="3" src="img/activity_rule_mobile/personal-information-02.png" onclick="ga('send', 'event', '首頁', 'Click', '個資條款展開(mobile)');">
                    <div class="rule-group">
                        <img class="rule-content off" data-id="3" src="img/activity_rule_mobile/personal-information-content.png" onclick="ga('send', 'event', '首頁', 'Click', '個資條款收起(mobile)');">
                        <div class="rule-content-cover" data-id="3">
                            <div class="cover-relative">
                                <div class="rule-link" link-id="1" onclick="ga('send', 'event', '首頁', 'Click', '麥香粉絲團(個資條款-mobile)');"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 活動辦法 mobile end -->
            <div class="main-v-space"></div>
        </div>
    </div>
    <footer>
        <img class="is-mobile" src="img/main/footer-new.png">
        <div class="is-desktop">
            <img class="uni-logo" src="img/main/uni-logo.png">
            <p>本網站內容均受著作權法保障，除非有特別聲明，其著作權屬於統一企業(股)公司或其他內容提供者所有，請勿將全部或部分圖文內容轉載於任何形式媒體</p>
            <p>Copyright© Uni-President Enterprises Corp., All rights reserved.</p>
        </div>
    </footer>
    <script type="text/javascript" src="js/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <!-- 包含了所有學校的請求 -->
    <script type="text/javascript" src="js/school_menu.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <!-- 注意，先有school_menu 的全校資訊才有前三名 -->
    <script type="text/javascript" src="js/battlefield.js"></script>
    <script type="text/javascript" src="js/activity_rule.js"></script>
    <script type="text/javascript" src="js/popup_video.js"></script>
    <script type="text/javascript" src="js/award_result.js"></script>
    <script type="text/javascript" src="js/marquee.js"></script>
    <?php
        if(!$ismobile) { 
    ?>
    <script type="text/javascript" src="js/flower_area.js"></script>
    <?php
        } 
    ?>
</body>

</html>
