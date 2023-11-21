(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["message.index.reception"],{

/***/ "./assets/js/pages/message.index.reception.js":
/*!****************************************************!*\
  !*** ./assets/js/pages/message.index.reception.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
$(function () {
  var action = $('#message_update_favoris').data('action');
  $(".checkbox-toggle").click(function () {
    //Activer la fonctionnalité sélectionner ou dé-sélectionner tout
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

  //Cliquer sur l'étoile pour ajouter un message aux favoris
  $(".mailbox-star").click(function (e) {
    e.preventDefault();
    //detect type
    var $this = $(this).find("a > i");
    var glyph = $this.hasClass("glyphicon");
    var fa = $this.hasClass("fa");
    var idMessage = $this.attr('id');

    //Switch states
    if (glyph) {
      $this.toggleClass("glyphicon-star");
      $this.toggleClass("glyphicon-star-empty");
    }
    if (fa) {
      $this.toggleClass("fa-star");
      $this.toggleClass("fa-star-o");
    }

    //Faire une requête ajax, pour ajouter ou retirer un message des favoris
    $.ajax({
      url: action,
      data: {
        "idMessage": idMessage
      },
      method: "POST"
    });
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_core-js_modules_es_object_-19aadf1"], () => (__webpack_exec__("./assets/js/pages/message.index.reception.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5pbmRleC5yZWNlcHRpb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBQSxDQUFDLENBQUMsWUFBWTtFQUNWLElBQUlDLE1BQU0sR0FBR0QsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUNFLElBQUksQ0FBQyxRQUFRLENBQUM7RUFFeERGLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDRyxLQUFLLENBQUMsWUFBWTtJQUNwQztJQUNBLElBQUlDLE1BQU0sR0FBR0osQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLElBQUlFLE1BQU0sRUFBRTtNQUNSO01BQ0FKLENBQUMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDSyxNQUFNLENBQUMsU0FBUyxDQUFDO01BQy9ETCxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDTSxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLGFBQWEsQ0FBQztJQUMzRSxDQUFDLE1BQU07TUFDSDtNQUNBUCxDQUFDLENBQUMsMENBQTBDLENBQUMsQ0FBQ0ssTUFBTSxDQUFDLE9BQU8sQ0FBQztNQUM3REwsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQ00sV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7SUFDM0U7SUFDQVAsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUNFLE1BQU0sQ0FBQztFQUNuQyxDQUFDLENBQUM7O0VBR0Y7RUFDQUosQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDRyxLQUFLLENBQUMsVUFBVUssQ0FBQyxFQUFFO0lBQ2xDQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCO0lBQ0EsSUFBSUMsS0FBSyxHQUFHVixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNXLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDakMsSUFBSUMsS0FBSyxHQUFHRixLQUFLLENBQUNHLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDdkMsSUFBSUMsRUFBRSxHQUFHSixLQUFLLENBQUNHLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFN0IsSUFBSUUsU0FBUyxHQUFHTCxLQUFLLENBQUNNLElBQUksQ0FBQyxJQUFJLENBQUM7O0lBRWhDO0lBQ0EsSUFBSUosS0FBSyxFQUFFO01BQ1BGLEtBQUssQ0FBQ08sV0FBVyxDQUFDLGdCQUFnQixDQUFDO01BQ25DUCxLQUFLLENBQUNPLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQztJQUM3QztJQUVBLElBQUlILEVBQUUsRUFBRTtNQUNKSixLQUFLLENBQUNPLFdBQVcsQ0FBQyxTQUFTLENBQUM7TUFDNUJQLEtBQUssQ0FBQ08sV0FBVyxDQUFDLFdBQVcsQ0FBQztJQUNsQzs7SUFFQTtJQUNBakIsQ0FBQyxDQUFDa0IsSUFBSSxDQUFDO01BQ0hDLEdBQUcsRUFBRWxCLE1BQU07TUFDWEMsSUFBSSxFQUFFO1FBQUMsV0FBVyxFQUFHYTtNQUFTLENBQUM7TUFDL0JLLE1BQU0sRUFBRTtJQUNaLENBQUMsQ0FBQztFQUVOLENBQUMsQ0FBQztBQUVOLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NjaG9vbC1hcHAvLi9hc3NldHMvanMvcGFnZXMvbWVzc2FnZS5pbmRleC5yZWNlcHRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgYWN0aW9uID0gJCgnI21lc3NhZ2VfdXBkYXRlX2Zhdm9yaXMnKS5kYXRhKCdhY3Rpb24nKTtcclxuXHJcbiAgICAkKFwiLmNoZWNrYm94LXRvZ2dsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9BY3RpdmVyIGxhIGZvbmN0aW9ubmFsaXTDqSBzw6lsZWN0aW9ubmVyIG91IGTDqS1zw6lsZWN0aW9ubmVyIHRvdXRcclxuICAgICAgICB2YXIgY2xpY2tzID0gJCh0aGlzKS5kYXRhKCdjbGlja3MnKTtcclxuICAgICAgICBpZiAoY2xpY2tzKSB7XHJcbiAgICAgICAgICAgIC8vVW5jaGVjayBhbGwgY2hlY2tib3hlc1xyXG4gICAgICAgICAgICAkKFwiLm1haWxib3gtbWVzc2FnZXMgaW5wdXRbdHlwZT0nY2hlY2tib3gnXVwiKS5pQ2hlY2soXCJ1bmNoZWNrXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmZhXCIsIHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtY2hlY2stc3F1YXJlLW9cIikuYWRkQ2xhc3MoJ2ZhLXNxdWFyZS1vJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9DaGVjayBhbGwgY2hlY2tib3hlc1xyXG4gICAgICAgICAgICAkKFwiLm1haWxib3gtbWVzc2FnZXMgaW5wdXRbdHlwZT0nY2hlY2tib3gnXVwiKS5pQ2hlY2soXCJjaGVja1wiKTtcclxuICAgICAgICAgICAgJChcIi5mYVwiLCB0aGlzKS5yZW1vdmVDbGFzcyhcImZhLXNxdWFyZS1vXCIpLmFkZENsYXNzKCdmYS1jaGVjay1zcXVhcmUtbycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKHRoaXMpLmRhdGEoXCJjbGlja3NcIiwgIWNsaWNrcyk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy9DbGlxdWVyIHN1ciBsJ8OpdG9pbGUgcG91ciBham91dGVyIHVuIG1lc3NhZ2UgYXV4IGZhdm9yaXNcclxuICAgICQoXCIubWFpbGJveC1zdGFyXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIC8vZGV0ZWN0IHR5cGVcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLmZpbmQoXCJhID4gaVwiKTtcclxuICAgICAgICB2YXIgZ2x5cGggPSAkdGhpcy5oYXNDbGFzcyhcImdseXBoaWNvblwiKTtcclxuICAgICAgICB2YXIgZmEgPSAkdGhpcy5oYXNDbGFzcyhcImZhXCIpO1xyXG5cclxuICAgICAgICB2YXIgaWRNZXNzYWdlID0gJHRoaXMuYXR0cignaWQnKTtcclxuXHJcbiAgICAgICAgLy9Td2l0Y2ggc3RhdGVzXHJcbiAgICAgICAgaWYgKGdseXBoKSB7XHJcbiAgICAgICAgICAgICR0aGlzLnRvZ2dsZUNsYXNzKFwiZ2x5cGhpY29uLXN0YXJcIik7XHJcbiAgICAgICAgICAgICR0aGlzLnRvZ2dsZUNsYXNzKFwiZ2x5cGhpY29uLXN0YXItZW1wdHlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZmEpIHtcclxuICAgICAgICAgICAgJHRoaXMudG9nZ2xlQ2xhc3MoXCJmYS1zdGFyXCIpO1xyXG4gICAgICAgICAgICAkdGhpcy50b2dnbGVDbGFzcyhcImZhLXN0YXItb1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vRmFpcmUgdW5lIHJlcXXDqnRlIGFqYXgsIHBvdXIgYWpvdXRlciBvdSByZXRpcmVyIHVuIG1lc3NhZ2UgZGVzIGZhdm9yaXNcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGFjdGlvbixcclxuICAgICAgICAgICAgZGF0YToge1wiaWRNZXNzYWdlXCIgOiBpZE1lc3NhZ2V9LFxyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSk7Il0sIm5hbWVzIjpbIiQiLCJhY3Rpb24iLCJkYXRhIiwiY2xpY2siLCJjbGlja3MiLCJpQ2hlY2siLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiZSIsInByZXZlbnREZWZhdWx0IiwiJHRoaXMiLCJmaW5kIiwiZ2x5cGgiLCJoYXNDbGFzcyIsImZhIiwiaWRNZXNzYWdlIiwiYXR0ciIsInRvZ2dsZUNsYXNzIiwiYWpheCIsInVybCIsIm1ldGhvZCJdLCJzb3VyY2VSb290IjoiIn0=