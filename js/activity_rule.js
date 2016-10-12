 
$(document).ready(function() {
	
	$('.rule-btn').click(function() {
		var data_id = $(this).attr('data-id');

		if ($(this).hasClass('on')) {

			$(this).removeClass('on');
			$(this).addClass('off');

			$('.rule-content[data-id="' + data_id + '"]').removeClass('off');
			$('.rule-content[data-id="' + data_id + '"]').addClass('on');
			
		} else {
			$(this).removeClass('off');
			$(this).addClass('on');

			$('.rule-content[data-id="' + data_id + '"]').removeClass('on');
			$('.rule-content[data-id="' + data_id + '"]').addClass('off');
		}

	});

	$('.rule-content').click(function() {
		var data_id = $(this).attr('data-id');

		if ($(this).hasClass('on')) {

			$(this).removeClass('on');
			$(this).addClass('off');

			$('.rule-btn[data-id="' + data_id + '"]').removeClass('off');
			$('.rule-btn[data-id="' + data_id + '"]').addClass('on');
			
		} else {
			$(this).removeClass('off');
			$(this).addClass('on');

			$('.rule-btn[data-id="' + data_id + '"]').removeClass('on');
			$('.rule-btn[data-id="' + data_id + '"]').addClass('off');
		}
	});

	$('.rule-content-cover[data-id=1] .rule-link[link-id=1]').click(function() {
        window.open('rule/rule.html','_blank');
    });

    $('.rule-content-cover[data-id=1] .rule-link[link-id=2]').click(function() {
        window.open('https://www.facebook.com/uni.mineshine/','_blank');
    });

    $('.rule-content-cover[data-id=2] .rule-link[link-id=1]').click(function() {
        window.open('https://www.facebook.com/uni.mineshine/','_blank');
    });

    $('.rule-content-cover[data-id=3] .rule-link[link-id=1]').click(function() {
        window.open('https://www.facebook.com/uni.mineshine/','_blank');
    });
});