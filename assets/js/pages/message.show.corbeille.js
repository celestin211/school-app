$(function() {
    let pieces = $('#pieces-jointes-id').data('pieces');
    pieces.map(function (id) {
        $(id).click(function () {
            window.location = $(this).find("a").eq(0).attr("href");
            return false;
        });

        $(id).hover(function () {
            $(this).css({'cursor': 'pointer'});
        });
    });


});