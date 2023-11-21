"use strict";
(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["toggle.menu"],{

/***/ "./assets/js/toggle/toggle.menu.js":
/*!*****************************************!*\
  !*** ./assets/js/toggle/toggle.menu.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

var menuBtn = document.getElementById("menuBtn");
var sideNav = document.getElementById("sideNav");
var menu = document.getElementById("menu");
sideNav.style.right == "-250px";
menuBtn.onclick = function () {
  if (sideNav.style.right == "-350px") {
    sideNav.style.right = "0";
    menu.src = "https://i.postimg.cc/cJRss6PP/close.png";
  } else {
    sideNav.style.right = "-350px";
    menu.src = "https://i.postimg.cc/j5RRCtb2/menu.png";
  }
};
$(document).ready(function () {
  $("a").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_jquery_dist_jquery_js"], () => (__webpack_exec__("./assets/js/toggle/toggle.menu.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLm1lbnUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQWdCO0FBRWhCLElBQUlBLE9BQU8sR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsU0FBUyxDQUFDO0FBQ2hELElBQUlDLE9BQU8sR0FBR0YsUUFBUSxDQUFDQyxjQUFjLENBQUMsU0FBUyxDQUFDO0FBQ2hELElBQUlFLElBQUksR0FBR0gsUUFBUSxDQUFDQyxjQUFjLENBQUMsTUFBTSxDQUFDO0FBRTFDQyxPQUFPLENBQUNFLEtBQUssQ0FBQ0MsS0FBSyxJQUFJLFFBQVE7QUFFL0JOLE9BQU8sQ0FBQ08sT0FBTyxHQUFHLFlBQVc7RUFDNUIsSUFBSUosT0FBTyxDQUFDRSxLQUFLLENBQUNDLEtBQUssSUFBSSxRQUFRLEVBQUU7SUFDcENILE9BQU8sQ0FBQ0UsS0FBSyxDQUFDQyxLQUFLLEdBQUcsR0FBRztJQUN6QkYsSUFBSSxDQUFDSSxHQUFHLEdBQUcseUNBQXlDO0VBQ3JELENBQUMsTUFBTTtJQUNOTCxPQUFPLENBQUNFLEtBQUssQ0FBQ0MsS0FBSyxHQUFHLFFBQVE7SUFDOUJGLElBQUksQ0FBQ0ksR0FBRyxHQUFHLHdDQUF3QztFQUNwRDtBQUNELENBQUM7QUFFREMsQ0FBQyxDQUFDUixRQUFRLENBQUMsQ0FBQ1MsS0FBSyxDQUFDLFlBQVc7RUFFNUJELENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQ0UsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFTQyxLQUFLLEVBQUU7SUFFbEMsSUFBSSxJQUFJLENBQUNDLElBQUksS0FBSyxFQUFFLEVBQUU7TUFFckJELEtBQUssQ0FBQ0UsY0FBYyxDQUFDLENBQUM7TUFDdEIsSUFBSUQsSUFBSSxHQUFHLElBQUksQ0FBQ0EsSUFBSTtNQUVwQkosQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDTSxPQUFPLENBQUM7UUFDdkJDLFNBQVMsRUFBRVAsQ0FBQyxDQUFDSSxJQUFJLENBQUMsQ0FBQ0ksTUFBTSxDQUFDLENBQUMsQ0FBQ0M7TUFDN0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxZQUFXO1FBQ2xCQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ1AsSUFBSSxHQUFHQSxJQUFJO01BQzVCLENBQUMsQ0FBQztJQUNIO0VBQ0QsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Nob29sLWFwcC8uL2Fzc2V0cy9qcy90b2dnbGUvdG9nZ2xlLm1lbnUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdqcXVlcnknO1xyXG5cclxubGV0IG1lbnVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnVCdG5cIilcclxubGV0IHNpZGVOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZGVOYXZcIilcclxubGV0IG1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnVcIilcclxuXHJcbnNpZGVOYXYuc3R5bGUucmlnaHQgPT0gXCItMjUwcHhcIjtcclxuXHJcbm1lbnVCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG5cdGlmIChzaWRlTmF2LnN0eWxlLnJpZ2h0ID09IFwiLTM1MHB4XCIpIHtcclxuXHRcdHNpZGVOYXYuc3R5bGUucmlnaHQgPSBcIjBcIjtcclxuXHRcdG1lbnUuc3JjID0gXCJodHRwczovL2kucG9zdGltZy5jYy9jSlJzczZQUC9jbG9zZS5wbmdcIjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c2lkZU5hdi5zdHlsZS5yaWdodCA9IFwiLTM1MHB4XCI7XHJcblx0XHRtZW51LnNyYyA9IFwiaHR0cHM6Ly9pLnBvc3RpbWcuY2MvajVSUkN0YjIvbWVudS5wbmdcIjtcclxuXHR9XHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdCQoXCJhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmhhc2ggIT09IFwiXCIpIHtcclxuXHRcdFx0XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdHZhciBoYXNoID0gdGhpcy5oYXNoO1xyXG5cdFx0XHRcclxuXHRcdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdHNjcm9sbFRvcDogJChoYXNoKS5vZmZzZXQoKS50b3BcclxuXHRcdFx0fSwgODAwLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2g7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTsiXSwibmFtZXMiOlsibWVudUJ0biIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzaWRlTmF2IiwibWVudSIsInN0eWxlIiwicmlnaHQiLCJvbmNsaWNrIiwic3JjIiwiJCIsInJlYWR5Iiwib24iLCJldmVudCIsImhhc2giLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJ3aW5kb3ciLCJsb2NhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=