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
    }, 60000 * 5);
});