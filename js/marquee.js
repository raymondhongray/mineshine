$(document).ready(function() {

    var marqueeInterval = setInterval(function() {
        if (Object.keys(school_by_section).length > 0) {

            var top_school = [
                school_by_section[0][0]['school_name'],
                school_by_section[1][0]['school_name'],
                school_by_section[2][0]['school_name'],
                school_by_section[3][0]['school_name']
            ]

            var content = '最新戰況！第一區' + top_school[0];
            content += '、第二區' + top_school[1];
            content += '、第三區' + top_school[2];
            content += '、第四區' + top_school[3];
            content += '，取得積分領先！';

            var marquee = '<div class="marquee col-1">';
            marquee += '<marquee DIRECTION="left" BEHAVIOR="scroll">';
            marquee += content;
            marquee += '</marquee>';

            $('#maste-vision-bg .marquee-frame').html(marquee);
            $('#maste-vision-m-bg .marquee-frame').html(marquee);

            content = '超激戰！全台超友能量大噴發！不戰到最後一刻，不知誰能勝出為王？';
           
            marquee = '<div class="marquee col-1">';
            marquee += '<marquee DIRECTION="left" BEHAVIOR="scroll">';
            marquee += content;
            marquee += '</marquee>';

            $('#battlefield').find('.marquee-frame').html(marquee);
            $('#battlefield-mobile').find('.marquee-frame').html(marquee);

            clearInterval(marqueeInterval);
        }
    }, 200);
});
