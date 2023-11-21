(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["message.show.reception"],{

/***/ "./assets/js/pages/message.show.reception.js":
/*!***************************************************!*\
  !*** ./assets/js/pages/message.show.reception.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
$(function () {
  var pieces = $('#pieces-jointes-id').data('pieces');
  var action = $('#message-update-favoris').data('action');
  pieces.map(function (id) {
    $(id).click(function () {
      window.location = $(this).find("a").eq(0).attr("href");
      return false;
    });
    $(id).hover(function () {
      $(this).css({
        'cursor': 'pointer'
      });
    });
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_core-js_modules_es_array_m-8c4f6a0"], () => (__webpack_exec__("./assets/js/pages/message.show.reception.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zaG93LnJlY2VwdGlvbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBQSxDQUFDLENBQUMsWUFBWTtFQUNOLElBQUlDLE1BQU0sR0FBR0QsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUNFLElBQUksQ0FBQyxRQUFRLENBQUM7RUFDbkQsSUFBSUMsTUFBTSxHQUFHSCxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQztFQUN4REQsTUFBTSxDQUFDRyxHQUFHLENBQUMsVUFBVUMsRUFBRSxFQUFHO0lBRXRCTCxDQUFDLENBQUNLLEVBQUUsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtNQUNwQkMsTUFBTSxDQUFDQyxRQUFRLEdBQUdSLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ1MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQyxNQUFNLENBQUM7TUFDdEQsT0FBTyxLQUFLO0lBQ2hCLENBQUMsQ0FBQztJQUVGWCxDQUFDLENBQUNLLEVBQUUsQ0FBQyxDQUFDTyxLQUFLLENBQUMsWUFBWTtNQUNwQlosQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDYSxHQUFHLENBQUM7UUFBQyxRQUFRLEVBQUU7TUFBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0VBRU4sQ0FBQyxDQUFDOztFQUVGO0VBQ0FiLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQ00sS0FBSyxDQUFDLFVBQVVRLENBQUMsRUFBRTtJQUNsQ0EsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztJQUNsQjtJQUNBLElBQUlDLEtBQUssR0FBR2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ1MsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxJQUFJUSxLQUFLLEdBQUdELEtBQUssQ0FBQ0UsUUFBUSxDQUFDLFdBQVcsQ0FBQztJQUN2QyxJQUFJQyxFQUFFLEdBQUdILEtBQUssQ0FBQ0UsUUFBUSxDQUFDLElBQUksQ0FBQztJQUU3QixJQUFJRSxTQUFTLEdBQUdKLEtBQUssQ0FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQzs7SUFFaEM7SUFDQSxJQUFJTSxLQUFLLEVBQUU7TUFDUEQsS0FBSyxDQUFDSyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7TUFDbkNMLEtBQUssQ0FBQ0ssV0FBVyxDQUFDLHNCQUFzQixDQUFDO0lBQzdDO0lBRUEsSUFBSUYsRUFBRSxFQUFFO01BQ0pILEtBQUssQ0FBQ0ssV0FBVyxDQUFDLFNBQVMsQ0FBQztNQUM1QkwsS0FBSyxDQUFDSyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQ2xDOztJQUVBO0lBQ0FyQixDQUFDLENBQUNzQixJQUFJLENBQUM7TUFDSEMsR0FBRyxFQUFFcEIsTUFBTTtNQUNYRCxJQUFJLEVBQUU7UUFBQyxXQUFXLEVBQUVrQjtNQUFTLENBQUM7TUFDOUJJLE1BQU0sRUFBRTtJQUNaLENBQUMsQ0FBQztFQUVOLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NjaG9vbC1hcHAvLi9hc3NldHMvanMvcGFnZXMvbWVzc2FnZS5zaG93LnJlY2VwdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgcGllY2VzID0gJCgnI3BpZWNlcy1qb2ludGVzLWlkJykuZGF0YSgncGllY2VzJyk7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9ICQoJyNtZXNzYWdlLXVwZGF0ZS1mYXZvcmlzJykuZGF0YSgnYWN0aW9uJyk7XHJcbiAgICAgICAgcGllY2VzLm1hcChmdW5jdGlvbiAoaWQsKSB7XHJcblxyXG4gICAgICAgICAgICAkKGlkKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAkKHRoaXMpLmZpbmQoXCJhXCIpLmVxKDApLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoaWQpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKHsnY3Vyc29yJzogJ3BvaW50ZXInfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9DbGlxdWVyIHN1ciBsJ8OpdG9pbGUgcG91ciBham91dGVyIHVuIG1lc3NhZ2UgYXV4IGZhdm9yaXNcclxuICAgICAgICAkKFwiLm1haWxib3gtc3RhclwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIC8vZGV0ZWN0IHR5cGVcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKS5maW5kKFwiYSA+IGlcIik7XHJcbiAgICAgICAgICAgIHZhciBnbHlwaCA9ICR0aGlzLmhhc0NsYXNzKFwiZ2x5cGhpY29uXCIpO1xyXG4gICAgICAgICAgICB2YXIgZmEgPSAkdGhpcy5oYXNDbGFzcyhcImZhXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlkTWVzc2FnZSA9ICR0aGlzLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgICAgICAgICAvL1N3aXRjaCBzdGF0ZXNcclxuICAgICAgICAgICAgaWYgKGdseXBoKSB7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy50b2dnbGVDbGFzcyhcImdseXBoaWNvbi1zdGFyXCIpO1xyXG4gICAgICAgICAgICAgICAgJHRoaXMudG9nZ2xlQ2xhc3MoXCJnbHlwaGljb24tc3Rhci1lbXB0eVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGZhKSB7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy50b2dnbGVDbGFzcyhcImZhLXN0YXJcIik7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy50b2dnbGVDbGFzcyhcImZhLXN0YXItb1wiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9GYWlyZSB1bmUgcmVxdcOqdGUgYWpheCwgcG91ciBham91dGVyIG91IHJldGlyZXIgdW4gbWVzc2FnZSBkZXMgZmF2b3Jpc1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XCJpZE1lc3NhZ2VcIjogaWRNZXNzYWdlfSxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4iXSwibmFtZXMiOlsiJCIsInBpZWNlcyIsImRhdGEiLCJhY3Rpb24iLCJtYXAiLCJpZCIsImNsaWNrIiwid2luZG93IiwibG9jYXRpb24iLCJmaW5kIiwiZXEiLCJhdHRyIiwiaG92ZXIiLCJjc3MiLCJlIiwicHJldmVudERlZmF1bHQiLCIkdGhpcyIsImdseXBoIiwiaGFzQ2xhc3MiLCJmYSIsImlkTWVzc2FnZSIsInRvZ2dsZUNsYXNzIiwiYWpheCIsInVybCIsIm1ldGhvZCJdLCJzb3VyY2VSb290IjoiIn0=