(function() {
	function toggleNav() {
// Define targets
		var target = document.querySelector('.main');
		var button = document.querySelector('.burger-button');
		var navigation = document.querySelector('.navigation');

// click-touch event
		if ( button ) {
			button.addEventListener('click',
				function (e) {
					target.classList.toggle('is-opened');
					navigation.focus();
					e.preventDefault();
				}, false );
		}
	} // end toggleNav()
	
	toggleNav();
}());