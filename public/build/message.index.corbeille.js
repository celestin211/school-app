(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["message.index.corbeille"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5pbmRleC5jb3JiZWlsbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBQSxDQUFDLENBQUMsWUFBWTtFQUNkO0VBQ0lBLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtJQUNwQyxJQUFJQyxNQUFNLEdBQUdGLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ0csSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxJQUFJRCxNQUFNLEVBQUU7TUFDUjtNQUNBRixDQUFDLENBQUMsMENBQTBDLENBQUMsQ0FBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQztNQUMvREosQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQ0ssV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUNDLFFBQVEsQ0FBQyxhQUFhLENBQUM7SUFDM0UsQ0FBQyxNQUFNO01BQ0g7TUFDQU4sQ0FBQyxDQUFDLDBDQUEwQyxDQUFDLENBQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUM7TUFDN0RKLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUNLLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLG1CQUFtQixDQUFDO0lBQzNFO0lBQ0FOLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ0csSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDRCxNQUFNLENBQUM7RUFDbkMsQ0FBQyxDQUFDO0VBRUZGLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtJQUNuQ00sTUFBTSxDQUFDQyxRQUFRLEdBQUdSLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ1MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2hELE9BQU8sS0FBSztFQUNoQixDQUFDLENBQUM7QUFDTixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY2hvb2wtYXBwLy4vYXNzZXRzL2pzL3BhZ2VzL21lc3NhZ2UuaW5kZXguY29yYmVpbGxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xyXG4vL0FjdGl2ZXIgbGEgZm9uY3Rpb25uYWxpdMOpIHPDqWxlY3Rpb25uZXIgb3UgZMOpLXPDqWxlY3Rpb25uZXIgdG91dFxyXG4gICAgJChcIi5jaGVja2JveC10b2dnbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjbGlja3MgPSAkKHRoaXMpLmRhdGEoJ2NsaWNrcycpO1xyXG4gICAgICAgIGlmIChjbGlja3MpIHtcclxuICAgICAgICAgICAgLy9VbmNoZWNrIGFsbCBjaGVja2JveGVzXHJcbiAgICAgICAgICAgICQoXCIubWFpbGJveC1tZXNzYWdlcyBpbnB1dFt0eXBlPSdjaGVja2JveCddXCIpLmlDaGVjayhcInVuY2hlY2tcIik7XHJcbiAgICAgICAgICAgICQoXCIuZmFcIiwgdGhpcykucmVtb3ZlQ2xhc3MoXCJmYS1jaGVjay1zcXVhcmUtb1wiKS5hZGRDbGFzcygnZmEtc3F1YXJlLW8nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL0NoZWNrIGFsbCBjaGVja2JveGVzXHJcbiAgICAgICAgICAgICQoXCIubWFpbGJveC1tZXNzYWdlcyBpbnB1dFt0eXBlPSdjaGVja2JveCddXCIpLmlDaGVjayhcImNoZWNrXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmZhXCIsIHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtc3F1YXJlLW9cIikuYWRkQ2xhc3MoJ2ZhLWNoZWNrLXNxdWFyZS1vJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQodGhpcykuZGF0YShcImNsaWNrc1wiLCAhY2xpY2tzKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCJ0ci50cl9jbGlxdWFibGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICQodGhpcykuZmluZChcImFcIikuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJuYW1lcyI6WyIkIiwiY2xpY2siLCJjbGlja3MiLCJkYXRhIiwiaUNoZWNrIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIndpbmRvdyIsImxvY2F0aW9uIiwiZmluZCIsImF0dHIiXSwic291cmNlUm9vdCI6IiJ9