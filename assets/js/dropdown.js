//dropdown on  click //
$(".dropdown_click .selected").on('click', function() {
	$(".dropdown_click .drop-content ul").slideToggle();
});

$(".dropdown_click .drop-content ul li span").on('click', function() {
	// var bindText = $(this).html();
	$(".dropdown_click .selected  span").html($(this).html());
	$(".dropdown_click .drop-content ul").slideUp();
});

//dropdown on  hover //
$(".dropdown_hover ").on({
	mouseenter: function () {
		$(".drop-content .drop-hover").slideDown();
	},
	mouseleave: function () {
		$(".drop-content .drop-hover").slideUp();
	}
});

$(".dropdown_hover .drop-content .drop-hover li span").on('click', function() {
	$(".dropdown_hover .selected  span").html($(this).html());
	$(".dropdown_hover .drop-content .drop-hover").slideUp();
});

$(document).bind('click', function(e) {
	var $clickhide = $(e.target);
	if (! $clickhide.parents().hasClass("dropdown_c"))
		$(".dropdown_c .drop-content ul").slideUp();
});
