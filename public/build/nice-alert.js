(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["nice-alert"],{

/***/ "./assets/js/pages/message.index.corbeille.js":
/*!****************************************************!*\
  !*** ./assets/js/pages/message.index.corbeille.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
$(function () {
  //Activer la fonctionnalité sélectionner ou dé-sélectionner tout
  $(".checkbox-toggle").click(function () {
    var clicks = $(this).data('clicks');
    if (clicks) {
      //Uncheck all checkboxes
      $(".mailbox-messages input[type='checkbox']").iCheck("uncheck");
      $(".fa", this).removeClass("fa-check-square-o").addClass('fa-square-o');
    } else {
      //Check all checkboxes
      $(".mailbox-messages input[type='checkbox']").iCheck("check");
      $(".fa", this).removeClass("fa-square-o").addClass('fa-check-square-o');
    }
    $(this).data("clicks", !clicks);
  });
  $("tr.tr_cliquable").click(function () {
    window.location = $(this).find("a").attr("href");
    return false;
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_core-js_modules_es_object_-19aadf0"], () => (__webpack_exec__("./assets/js/pages/message.index.corbeille.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmljZS1hbGVydC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUFBLENBQUMsQ0FBQyxZQUFZO0VBQ2Q7RUFDSUEsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0lBQ3BDLElBQUlDLE1BQU0sR0FBR0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLElBQUlELE1BQU0sRUFBRTtNQUNSO01BQ0FGLENBQUMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDO01BQy9ESixDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDSyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLGFBQWEsQ0FBQztJQUMzRSxDQUFDLE1BQU07TUFDSDtNQUNBTixDQUFDLENBQUMsMENBQTBDLENBQUMsQ0FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQztNQUM3REosQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQ0ssV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7SUFDM0U7SUFDQU4sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUNELE1BQU0sQ0FBQztFQUNuQyxDQUFDLENBQUM7RUFFRkYsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0lBQ25DTSxNQUFNLENBQUNDLFFBQVEsR0FBR1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDUyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDaEQsT0FBTyxLQUFLO0VBQ2hCLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NjaG9vbC1hcHAvLi9hc3NldHMvanMvcGFnZXMvbWVzc2FnZS5pbmRleC5jb3JiZWlsbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XHJcbi8vQWN0aXZlciBsYSBmb25jdGlvbm5hbGl0w6kgc8OpbGVjdGlvbm5lciBvdSBkw6ktc8OpbGVjdGlvbm5lciB0b3V0XHJcbiAgICAkKFwiLmNoZWNrYm94LXRvZ2dsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNsaWNrcyA9ICQodGhpcykuZGF0YSgnY2xpY2tzJyk7XHJcbiAgICAgICAgaWYgKGNsaWNrcykge1xyXG4gICAgICAgICAgICAvL1VuY2hlY2sgYWxsIGNoZWNrYm94ZXNcclxuICAgICAgICAgICAgJChcIi5tYWlsYm94LW1lc3NhZ2VzIGlucHV0W3R5cGU9J2NoZWNrYm94J11cIikuaUNoZWNrKFwidW5jaGVja1wiKTtcclxuICAgICAgICAgICAgJChcIi5mYVwiLCB0aGlzKS5yZW1vdmVDbGFzcyhcImZhLWNoZWNrLXNxdWFyZS1vXCIpLmFkZENsYXNzKCdmYS1zcXVhcmUtbycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vQ2hlY2sgYWxsIGNoZWNrYm94ZXNcclxuICAgICAgICAgICAgJChcIi5tYWlsYm94LW1lc3NhZ2VzIGlucHV0W3R5cGU9J2NoZWNrYm94J11cIikuaUNoZWNrKFwiY2hlY2tcIik7XHJcbiAgICAgICAgICAgICQoXCIuZmFcIiwgdGhpcykucmVtb3ZlQ2xhc3MoXCJmYS1zcXVhcmUtb1wiKS5hZGRDbGFzcygnZmEtY2hlY2stc3F1YXJlLW8nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCh0aGlzKS5kYXRhKFwiY2xpY2tzXCIsICFjbGlja3MpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcInRyLnRyX2NsaXF1YWJsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJCh0aGlzKS5maW5kKFwiYVwiKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxufSk7Il0sIm5hbWVzIjpbIiQiLCJjbGljayIsImNsaWNrcyIsImRhdGEiLCJpQ2hlY2siLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwid2luZG93IiwibG9jYXRpb24iLCJmaW5kIiwiYXR0ciJdLCJzb3VyY2VSb290IjoiIn0=