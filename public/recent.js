$(document).ready(function() {
    $.ajax({
        url: '/recent',
        method: 'GET',
        success: function(data) {
            $('.recent-posts').html(data);
        },
        error: function() {
        }
    });
    setInterval(function() {
        $.ajax({
            url: '/recent',
            method: 'GET',
            success: function(data) {
                $('.recent-posts').html(data);
            },
            error: function() {
            }
        });
        console.log("Refreshing Recent!");
    }, 60000 * 5);
});