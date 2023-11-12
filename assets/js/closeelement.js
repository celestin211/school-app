$(function() {
	$(".popup-onload").show();
	$(".close").click(function() {
		$(".popup-onload").hide();
		return false;
	});
	$(".x").click(function() {
		$(".popup-onload").hide();
		return false;
	});
	$(".popup-wrapper").click(function() {
		$(".popup-onload").hide();
		return false;
	});
});
