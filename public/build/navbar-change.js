(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["navbar-change"],{

/***/ "./assets/js/navbar-change.js":
/*!************************************!*\
  !*** ./assets/js/navbar-change.js ***!
  \************************************/
/***/ (() => {

(function () {
  function toggleNav() {
    // Define targets
    var target = document.querySelector('.main');
    var button = document.querySelector('.burger-button');
    var navigation = document.querySelector('.navigation');

    // click-touch event
    if (button) {
      button.addEventListener('click', function (e) {
        target.classList.toggle('is-opened');
        navigation.focus();
        e.preventDefault();
      }, false);
    }
  } // end toggleNav()

  toggleNav();
})();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./assets/js/navbar-change.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2YmFyLWNoYW5nZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFDLGFBQVc7RUFDWCxTQUFTQSxTQUFTQSxDQUFBLEVBQUc7SUFDdEI7SUFDRSxJQUFJQyxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQztJQUM1QyxJQUFJQyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBQ3JELElBQUlFLFVBQVUsR0FBR0gsUUFBUSxDQUFDQyxhQUFhLENBQUMsYUFBYSxDQUFDOztJQUV4RDtJQUNFLElBQUtDLE1BQU0sRUFBRztNQUNiQSxNQUFNLENBQUNFLGdCQUFnQixDQUFDLE9BQU8sRUFDOUIsVUFBVUMsQ0FBQyxFQUFFO1FBQ1pOLE1BQU0sQ0FBQ08sU0FBUyxDQUFDQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3BDSixVQUFVLENBQUNLLEtBQUssQ0FBQyxDQUFDO1FBQ2xCSCxDQUFDLENBQUNJLGNBQWMsQ0FBQyxDQUFDO01BQ25CLENBQUMsRUFBRSxLQUFNLENBQUM7SUFDWjtFQUNELENBQUMsQ0FBQzs7RUFFRlgsU0FBUyxDQUFDLENBQUM7QUFDWixDQUFDLEVBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NjaG9vbC1hcHAvLi9hc3NldHMvanMvbmF2YmFyLWNoYW5nZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcblx0ZnVuY3Rpb24gdG9nZ2xlTmF2KCkge1xyXG4vLyBEZWZpbmUgdGFyZ2V0c1xyXG5cdFx0dmFyIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XHJcblx0XHR2YXIgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1cmdlci1idXR0b24nKTtcclxuXHRcdHZhciBuYXZpZ2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmlnYXRpb24nKTtcclxuXHJcbi8vIGNsaWNrLXRvdWNoIGV2ZW50XHJcblx0XHRpZiAoIGJ1dHRvbiApIHtcclxuXHRcdFx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcclxuXHRcdFx0XHRmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2lzLW9wZW5lZCcpO1xyXG5cdFx0XHRcdFx0bmF2aWdhdGlvbi5mb2N1cygpO1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH0sIGZhbHNlICk7XHJcblx0XHR9XHJcblx0fSAvLyBlbmQgdG9nZ2xlTmF2KClcclxuXHRcclxuXHR0b2dnbGVOYXYoKTtcclxufSgpKTsiXSwibmFtZXMiOlsidG9nZ2xlTmF2IiwidGFyZ2V0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYnV0dG9uIiwibmF2aWdhdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiZm9jdXMiLCJwcmV2ZW50RGVmYXVsdCJdLCJzb3VyY2VSb290IjoiIn0=