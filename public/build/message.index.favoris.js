(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["message.index.favoris"],{

/***/ "./assets/js/pages/message.index.favoris.js":
/*!**************************************************!*\
  !*** ./assets/js/pages/message.index.favoris.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
$(function () {
  var action = $('#message_update_favoris').data('action');
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

    //L'id du message à enlever des favoris
    var id = "#".concat(idMessage);
    //Retirer le message de l'affichage
    $(id).remove();

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
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_core-js_modules_es_object_-19aadf2"], () => (__webpack_exec__("./assets/js/pages/message.index.favoris.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5pbmRleC5mYXZvcmlzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQUEsQ0FBQyxDQUFDLFlBQVk7RUFDVixJQUFJQyxNQUFNLEdBQUdELENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDO0VBQ3hEO0VBQ0FGLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDRyxLQUFLLENBQUMsWUFBWTtJQUNwQyxJQUFJQyxNQUFNLEdBQUdKLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxJQUFJRSxNQUFNLEVBQUU7TUFDUjtNQUNBSixDQUFDLENBQUMsMENBQTBDLENBQUMsQ0FBQ0ssTUFBTSxDQUFDLFNBQVMsQ0FBQztNQUMvREwsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQ00sV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUNDLFFBQVEsQ0FBQyxhQUFhLENBQUM7SUFDM0UsQ0FBQyxNQUFNO01BQ0g7TUFDQVAsQ0FBQyxDQUFDLDBDQUEwQyxDQUFDLENBQUNLLE1BQU0sQ0FBQyxPQUFPLENBQUM7TUFDN0RMLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUNNLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLG1CQUFtQixDQUFDO0lBQzNFO0lBQ0FQLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDRSxNQUFNLENBQUM7RUFDbkMsQ0FBQyxDQUFDOztFQUVGO0VBQ0FKLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQ0csS0FBSyxDQUFDLFVBQVVLLENBQUMsRUFBRTtJQUNsQ0EsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztJQUNsQjtJQUNBLElBQUlDLEtBQUssR0FBR1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDVyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2pDLElBQUlDLEtBQUssR0FBR0YsS0FBSyxDQUFDRyxRQUFRLENBQUMsV0FBVyxDQUFDO0lBQ3ZDLElBQUlDLEVBQUUsR0FBR0osS0FBSyxDQUFDRyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRTdCLElBQUlFLFNBQVMsR0FBR0wsS0FBSyxDQUFDTSxJQUFJLENBQUMsSUFBSSxDQUFDOztJQUVoQztJQUNBLElBQUlKLEtBQUssRUFBRTtNQUNQRixLQUFLLENBQUNPLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztNQUNuQ1AsS0FBSyxDQUFDTyxXQUFXLENBQUMsc0JBQXNCLENBQUM7SUFDN0M7SUFFQSxJQUFJSCxFQUFFLEVBQUU7TUFDSkosS0FBSyxDQUFDTyxXQUFXLENBQUMsU0FBUyxDQUFDO01BQzVCUCxLQUFLLENBQUNPLFdBQVcsQ0FBQyxXQUFXLENBQUM7SUFDbEM7O0lBR0E7SUFDQSxJQUFJQyxFQUFFLEdBQUcsR0FBRyxDQUFDQyxNQUFNLENBQUNKLFNBQVMsQ0FBQztJQUM5QjtJQUNBZixDQUFDLENBQUNrQixFQUFFLENBQUMsQ0FBQ0UsTUFBTSxDQUFDLENBQUM7O0lBRWQ7SUFDQXBCLENBQUMsQ0FBQ3FCLElBQUksQ0FBQztNQUNIQyxHQUFHLEVBQUVyQixNQUFNO01BQ1hDLElBQUksRUFBRTtRQUFDLFdBQVcsRUFBRWE7TUFBUyxDQUFDO01BQzlCUSxNQUFNLEVBQUU7SUFDWixDQUFDLENBQUM7RUFHTixDQUFDLENBQUM7QUFFTixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY2hvb2wtYXBwLy4vYXNzZXRzL2pzL3BhZ2VzL21lc3NhZ2UuaW5kZXguZmF2b3Jpcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBhY3Rpb24gPSAkKCcjbWVzc2FnZV91cGRhdGVfZmF2b3JpcycpLmRhdGEoJ2FjdGlvbicpO1xyXG4gICAgLy9BY3RpdmVyIGxhIGZvbmN0aW9ubmFsaXTDqSBzw6lsZWN0aW9ubmVyIG91IGTDqS1zw6lsZWN0aW9ubmVyIHRvdXRcclxuICAgICQoXCIuY2hlY2tib3gtdG9nZ2xlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2xpY2tzID0gJCh0aGlzKS5kYXRhKCdjbGlja3MnKTtcclxuICAgICAgICBpZiAoY2xpY2tzKSB7XHJcbiAgICAgICAgICAgIC8vVW5jaGVjayBhbGwgY2hlY2tib3hlc1xyXG4gICAgICAgICAgICAkKFwiLm1haWxib3gtbWVzc2FnZXMgaW5wdXRbdHlwZT0nY2hlY2tib3gnXVwiKS5pQ2hlY2soXCJ1bmNoZWNrXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmZhXCIsIHRoaXMpLnJlbW92ZUNsYXNzKFwiZmEtY2hlY2stc3F1YXJlLW9cIikuYWRkQ2xhc3MoJ2ZhLXNxdWFyZS1vJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9DaGVjayBhbGwgY2hlY2tib3hlc1xyXG4gICAgICAgICAgICAkKFwiLm1haWxib3gtbWVzc2FnZXMgaW5wdXRbdHlwZT0nY2hlY2tib3gnXVwiKS5pQ2hlY2soXCJjaGVja1wiKTtcclxuICAgICAgICAgICAgJChcIi5mYVwiLCB0aGlzKS5yZW1vdmVDbGFzcyhcImZhLXNxdWFyZS1vXCIpLmFkZENsYXNzKCdmYS1jaGVjay1zcXVhcmUtbycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKHRoaXMpLmRhdGEoXCJjbGlja3NcIiwgIWNsaWNrcyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL0NsaXF1ZXIgc3VyIGwnw6l0b2lsZSBwb3VyIGFqb3V0ZXIgdW4gbWVzc2FnZSBhdXggZmF2b3Jpc1xyXG4gICAgJChcIi5tYWlsYm94LXN0YXJcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgLy9kZXRlY3QgdHlwZVxyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcykuZmluZChcImEgPiBpXCIpO1xyXG4gICAgICAgIHZhciBnbHlwaCA9ICR0aGlzLmhhc0NsYXNzKFwiZ2x5cGhpY29uXCIpO1xyXG4gICAgICAgIHZhciBmYSA9ICR0aGlzLmhhc0NsYXNzKFwiZmFcIik7XHJcblxyXG4gICAgICAgIHZhciBpZE1lc3NhZ2UgPSAkdGhpcy5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgICAvL1N3aXRjaCBzdGF0ZXNcclxuICAgICAgICBpZiAoZ2x5cGgpIHtcclxuICAgICAgICAgICAgJHRoaXMudG9nZ2xlQ2xhc3MoXCJnbHlwaGljb24tc3RhclwiKTtcclxuICAgICAgICAgICAgJHRoaXMudG9nZ2xlQ2xhc3MoXCJnbHlwaGljb24tc3Rhci1lbXB0eVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmYSkge1xyXG4gICAgICAgICAgICAkdGhpcy50b2dnbGVDbGFzcyhcImZhLXN0YXJcIik7XHJcbiAgICAgICAgICAgICR0aGlzLnRvZ2dsZUNsYXNzKFwiZmEtc3Rhci1vXCIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vTCdpZCBkdSBtZXNzYWdlIMOgIGVubGV2ZXIgZGVzIGZhdm9yaXNcclxuICAgICAgICBsZXQgaWQgPSBcIiNcIi5jb25jYXQoaWRNZXNzYWdlKTtcclxuICAgICAgICAvL1JldGlyZXIgbGUgbWVzc2FnZSBkZSBsJ2FmZmljaGFnZVxyXG4gICAgICAgICQoaWQpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAvL0ZhaXJlIHVuZSByZXF1w6p0ZSBhamF4LCBwb3VyIGFqb3V0ZXIgb3UgcmV0aXJlciB1biBtZXNzYWdlIGRlcyBmYXZvcmlzXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBhY3Rpb24sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcImlkTWVzc2FnZVwiOiBpZE1lc3NhZ2V9LFxyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9KTtcclxuXHJcbn0pOyJdLCJuYW1lcyI6WyIkIiwiYWN0aW9uIiwiZGF0YSIsImNsaWNrIiwiY2xpY2tzIiwiaUNoZWNrIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiR0aGlzIiwiZmluZCIsImdseXBoIiwiaGFzQ2xhc3MiLCJmYSIsImlkTWVzc2FnZSIsImF0dHIiLCJ0b2dnbGVDbGFzcyIsImlkIiwiY29uY2F0IiwicmVtb3ZlIiwiYWpheCIsInVybCIsIm1ldGhvZCJdLCJzb3VyY2VSb290IjoiIn0=