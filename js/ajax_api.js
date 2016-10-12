function get_school() {
    $.ajax({
        type: 'POST',
        url: '../program/api/get_school.php',
        data: { 
            section: 'all',
        },
        dataType: "json",
        success: function(res) {
            console.log(res);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        },
    });
}

function get_question() {
    $.ajax({
        type: 'POST',
        url: '../program/api/get_question.php',
        dataType: "json",
        success: function(res) {
            console.log(res);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        },
    });
}

$(document).ready(function() {
    // 取得學校資訊
    get_school();

    // 取得題目
    get_question()
});