(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["message.show.favoris"],{

/***/ "./assets/js/pages/message.show.favoris.js":
/*!*************************************************!*\
  !*** ./assets/js/pages/message.show.favoris.js ***!
  \*************************************************/
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_core-js_modules_es_array_m-8c4f6a2"], () => (__webpack_exec__("./assets/js/pages/message.show.favoris.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zaG93LmZhdm9yaXMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQUEsQ0FBQyxDQUFDLFlBQVk7RUFDVixJQUFJQyxNQUFNLEdBQUdELENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDO0VBQ25ELElBQUlDLE1BQU0sR0FBR0gsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUNFLElBQUksQ0FBQyxRQUFRLENBQUM7RUFDeERELE1BQU0sQ0FBQ0csR0FBRyxDQUFDLFVBQVVDLEVBQUUsRUFBRztJQUV0QkwsQ0FBQyxDQUFDSyxFQUFFLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFlBQVk7TUFDcEJDLE1BQU0sQ0FBQ0MsUUFBUSxHQUFHUixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNTLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxJQUFJLENBQUMsTUFBTSxDQUFDO01BQ3RELE9BQU8sS0FBSztJQUNoQixDQUFDLENBQUM7SUFFRlgsQ0FBQyxDQUFDSyxFQUFFLENBQUMsQ0FBQ08sS0FBSyxDQUFDLFlBQVk7TUFDcEJaLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ2EsR0FBRyxDQUFDO1FBQUMsUUFBUSxFQUFFO01BQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUNGO0VBQ0FiLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQ00sS0FBSyxDQUFDLFVBQVVRLENBQUMsRUFBRTtJQUNsQ0EsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztJQUNsQjtJQUNBLElBQUlDLEtBQUssR0FBR2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ1MsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxJQUFJUSxLQUFLLEdBQUdELEtBQUssQ0FBQ0UsUUFBUSxDQUFDLFdBQVcsQ0FBQztJQUN2QyxJQUFJQyxFQUFFLEdBQUdILEtBQUssQ0FBQ0UsUUFBUSxDQUFDLElBQUksQ0FBQztJQUU3QixJQUFJRSxTQUFTLEdBQUdKLEtBQUssQ0FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQzs7SUFFaEM7SUFDQSxJQUFJTSxLQUFLLEVBQUU7TUFDUEQsS0FBSyxDQUFDSyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7TUFDbkNMLEtBQUssQ0FBQ0ssV0FBVyxDQUFDLHNCQUFzQixDQUFDO0lBQzdDO0lBRUEsSUFBSUYsRUFBRSxFQUFFO01BQ0pILEtBQUssQ0FBQ0ssV0FBVyxDQUFDLFNBQVMsQ0FBQztNQUM1QkwsS0FBSyxDQUFDSyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQ2xDOztJQUVBO0lBQ0FyQixDQUFDLENBQUNzQixJQUFJLENBQUM7TUFDSEMsR0FBRyxFQUFFcEIsTUFBTTtNQUNYRCxJQUFJLEVBQUU7UUFBQyxXQUFXLEVBQUVrQjtNQUFTLENBQUM7TUFDOUJJLE1BQU0sRUFBRTtJQUNaLENBQUMsQ0FBQztFQUVOLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NjaG9vbC1hcHAvLi9hc3NldHMvanMvcGFnZXMvbWVzc2FnZS5zaG93LmZhdm9yaXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgcGllY2VzID0gJCgnI3BpZWNlcy1qb2ludGVzLWlkJykuZGF0YSgncGllY2VzJyk7XHJcbiAgICBsZXQgYWN0aW9uID0gJCgnI21lc3NhZ2UtdXBkYXRlLWZhdm9yaXMnKS5kYXRhKCdhY3Rpb24nKTtcclxuICAgIHBpZWNlcy5tYXAoZnVuY3Rpb24gKGlkLCkge1xyXG5cclxuICAgICAgICAkKGlkKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICQodGhpcykuZmluZChcImFcIikuZXEoMCkuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChpZCkuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcyh7J2N1cnNvcic6ICdwb2ludGVyJ30pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAvL0NsaXF1ZXIgc3VyIGwnw6l0b2lsZSBwb3VyIGFqb3V0ZXIgdW4gbWVzc2FnZSBhdXggZmF2b3Jpc1xyXG4gICAgJChcIi5tYWlsYm94LXN0YXJcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgLy9kZXRlY3QgdHlwZVxyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcykuZmluZChcImEgPiBpXCIpO1xyXG4gICAgICAgIHZhciBnbHlwaCA9ICR0aGlzLmhhc0NsYXNzKFwiZ2x5cGhpY29uXCIpO1xyXG4gICAgICAgIHZhciBmYSA9ICR0aGlzLmhhc0NsYXNzKFwiZmFcIik7XHJcblxyXG4gICAgICAgIHZhciBpZE1lc3NhZ2UgPSAkdGhpcy5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgICAvL1N3aXRjaCBzdGF0ZXNcclxuICAgICAgICBpZiAoZ2x5cGgpIHtcclxuICAgICAgICAgICAgJHRoaXMudG9nZ2xlQ2xhc3MoXCJnbHlwaGljb24tc3RhclwiKTtcclxuICAgICAgICAgICAgJHRoaXMudG9nZ2xlQ2xhc3MoXCJnbHlwaGljb24tc3Rhci1lbXB0eVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmYSkge1xyXG4gICAgICAgICAgICAkdGhpcy50b2dnbGVDbGFzcyhcImZhLXN0YXJcIik7XHJcbiAgICAgICAgICAgICR0aGlzLnRvZ2dsZUNsYXNzKFwiZmEtc3Rhci1vXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9GYWlyZSB1bmUgcmVxdcOqdGUgYWpheCwgcG91ciBham91dGVyIG91IHJldGlyZXIgdW4gbWVzc2FnZSBkZXMgZmF2b3Jpc1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogYWN0aW9uLFxyXG4gICAgICAgICAgICBkYXRhOiB7XCJpZE1lc3NhZ2VcIjogaWRNZXNzYWdlfSxcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyIkIiwicGllY2VzIiwiZGF0YSIsImFjdGlvbiIsIm1hcCIsImlkIiwiY2xpY2siLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImZpbmQiLCJlcSIsImF0dHIiLCJob3ZlciIsImNzcyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiR0aGlzIiwiZ2x5cGgiLCJoYXNDbGFzcyIsImZhIiwiaWRNZXNzYWdlIiwidG9nZ2xlQ2xhc3MiLCJhamF4IiwidXJsIiwibWV0aG9kIl0sInNvdXJjZVJvb3QiOiIifQ==