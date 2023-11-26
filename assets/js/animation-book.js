import 'jquery';
function unLoader(e) {
	if(e.target.nodeName != '#document') {
		$('#pageBody').hide("fade", null, 5000).css('background', '');
		
		alert('ok');
	}
}
$(function() {
	$('#pageBody').show("fade",null,500).css('background','');
	window.onbeforeunload = unLoader;
});