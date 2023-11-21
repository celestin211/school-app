"use strict";
(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["ajax-loader"],{

/***/ "./assets/js/lib/ajax-loader.js":
/*!**************************************!*\
  !*** ./assets/js/lib/ajax-loader.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AjaxLoader)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
/* harmony import */ var core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_to_primitive_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
/* harmony import */ var core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_primitive_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_14__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }















function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Affiche et enlève l'attente AJAX.
 */
var AjaxLoader = /*#__PURE__*/function () {
  function AjaxLoader() {
    _classCallCheck(this, AjaxLoader);
  }
  _createClass(AjaxLoader, null, [{
    key: "show",
    value:
    /**
     * Affiche l'attente AJAX.
     *
     * @param {HTMLElement|null} container (optionnel) Le panneau dans lequel sera affichée l'attente AJAX (body si aucun paramètre)
     */
    function show(container) {
      var $container = $(typeof container === "undefined" ? "body" : container);
      container = $container.get(0);
      var top = container.clientTop - parseInt($container.css("paddingTop")) + "px",
        left = container.clientLeft - parseInt($container.css("paddingLeft")) + "px";
      var height = container.clientHeight,
        width = container.clientWidth;
      if (height === 0) {
        height = $container.height();
      }
      if (width === 0) {
        width = $container.width();
      }
      container.insertAdjacentHTML("afterbegin", '<div class="theme-loader-container" style="display: none;"><div class="theme-loader" style="position: absolute;top: ' + top + ";left: " + left + ";height: " + height + "px;width: " + width + 'px;">' + '<div class="ball-scale' + (height < 60 || width < 60 ? " petit" : "") + '">' + '<div class="contain"><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div><div class="ring"><div class="frame"></div></div></div>' + "</div>" + "</div></div>");
      $container.find(".theme-loader-container").fadeIn("slow");
    }

    /**
     * Enlève l'attente AJAX.
     *
     * @param {HTMLElement|null} container (optionnel) Le panneau dans lequel enlever l'attente AJAX (toutes si aucun paramètre)
     */
  }, {
    key: "hide",
    value: function hide(container) {
      var $themeLoader = null;
      if (typeof container === "undefined") {
        $themeLoader = $(".theme-loader");
      } else {
        $themeLoader = $(container).find(".theme-loader");
      }
      $themeLoader.fadeOut("fast", function () {
        $themeLoader.closest(".theme-loader-container").remove();
      });
    }
  }]);
  return AjaxLoader;
}();


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_arra-9ca245","vendors-node_modules_core-js_modules_es_string_iterator_js-node_modules_core-js_modules_es_sy-0eab75","vendors-node_modules_core-js_modules_es_error_cause_js-node_modules_core-js_modules_es_error_-f2dd87","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_core-js_modules_es_date_to-aba4c9"], () => (__webpack_exec__("./assets/js/lib/ajax-loader.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWpheC1sb2FkZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUZBLElBR3FCQSxVQUFVO0VBQUEsU0FBQUEsV0FBQTtJQUFBQyxlQUFBLE9BQUFELFVBQUE7RUFBQTtFQUFBRSxZQUFBLENBQUFGLFVBQUE7SUFBQUcsR0FBQTtJQUFBQyxLQUFBO0lBQzdCO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7SUFDRSxTQUFBQyxLQUFZQyxTQUFTLEVBQUU7TUFDckIsSUFBSUMsVUFBVSxHQUFHQyxDQUFDLENBQUMsT0FBT0YsU0FBUyxLQUFLLFdBQVcsR0FBRyxNQUFNLEdBQUdBLFNBQVMsQ0FBQztNQUN6RUEsU0FBUyxHQUFHQyxVQUFVLENBQUNFLEdBQUcsQ0FBQyxDQUFDLENBQUM7TUFFN0IsSUFBTUMsR0FBRyxHQUNMSixTQUFTLENBQUNLLFNBQVMsR0FBR0MsUUFBUSxDQUFDTCxVQUFVLENBQUNNLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLElBQUk7UUFDckVDLElBQUksR0FDRlIsU0FBUyxDQUFDUyxVQUFVLEdBQUdILFFBQVEsQ0FBQ0wsVUFBVSxDQUFDTSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxJQUFJO01BQ3pFLElBQUlHLE1BQU0sR0FBR1YsU0FBUyxDQUFDVyxZQUFZO1FBQ2pDQyxLQUFLLEdBQUdaLFNBQVMsQ0FBQ2EsV0FBVztNQUUvQixJQUFJSCxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hCQSxNQUFNLEdBQUdULFVBQVUsQ0FBQ1MsTUFBTSxDQUFDLENBQUM7TUFDOUI7TUFFQSxJQUFJRSxLQUFLLEtBQUssQ0FBQyxFQUFFO1FBQ2ZBLEtBQUssR0FBR1gsVUFBVSxDQUFDVyxLQUFLLENBQUMsQ0FBQztNQUM1QjtNQUVBWixTQUFTLENBQUNjLGtCQUFrQixDQUMxQixZQUFZLEVBQ1osc0hBQXNILEdBQ3BIVixHQUFHLEdBQ0gsU0FBUyxHQUNUSSxJQUFJLEdBQ0osV0FBVyxHQUNYRSxNQUFNLEdBQ04sWUFBWSxHQUNaRSxLQUFLLEdBQ0wsT0FBTyxHQUNQLHdCQUF3QixJQUN2QkYsTUFBTSxHQUFHLEVBQUUsSUFBSUUsS0FBSyxHQUFHLEVBQUUsR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDLEdBQzNDLElBQUksR0FDSix1Z0JBQXVnQixHQUN2Z0IsUUFBUSxHQUNSLGNBQ0osQ0FBQztNQUNEWCxVQUFVLENBQUNjLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzNEOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFKRTtJQUFBbkIsR0FBQTtJQUFBQyxLQUFBLEVBS0EsU0FBQW1CLEtBQVlqQixTQUFTLEVBQUU7TUFDckIsSUFBSWtCLFlBQVksR0FBRyxJQUFJO01BQ3ZCLElBQUksT0FBT2xCLFNBQVMsS0FBSyxXQUFXLEVBQUU7UUFDcENrQixZQUFZLEdBQUdoQixDQUFDLENBQUMsZUFBZSxDQUFDO01BQ25DLENBQUMsTUFBTTtRQUNMZ0IsWUFBWSxHQUFHaEIsQ0FBQyxDQUFDRixTQUFTLENBQUMsQ0FBQ2UsSUFBSSxDQUFDLGVBQWUsQ0FBQztNQUNuRDtNQUVBRyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsWUFBTTtRQUNqQ0QsWUFBWSxDQUFDRSxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLENBQUM7TUFDMUQsQ0FBQyxDQUFDO0lBQ0o7RUFBQztFQUFBLE9BQUEzQixVQUFBO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY2hvb2wtYXBwLy4vYXNzZXRzL2pzL2xpYi9hamF4LWxvYWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyoqXG4gKiBBZmZpY2hlIGV0IGVubMOodmUgbCdhdHRlbnRlIEFKQVguXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXhMb2FkZXIge1xuICAvKipcbiAgICogQWZmaWNoZSBsJ2F0dGVudGUgQUpBWC5cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxudWxsfSBjb250YWluZXIgKG9wdGlvbm5lbCkgTGUgcGFubmVhdSBkYW5zIGxlcXVlbCBzZXJhIGFmZmljaMOpZSBsJ2F0dGVudGUgQUpBWCAoYm9keSBzaSBhdWN1biBwYXJhbcOodHJlKVxuICAgKi9cbiAgc3RhdGljIHNob3coY29udGFpbmVyKSB7XG4gICAgbGV0ICRjb250YWluZXIgPSAkKHR5cGVvZiBjb250YWluZXIgPT09IFwidW5kZWZpbmVkXCIgPyBcImJvZHlcIiA6IGNvbnRhaW5lcik7XG4gICAgY29udGFpbmVyID0gJGNvbnRhaW5lci5nZXQoMCk7XG5cbiAgICBjb25zdCB0b3AgPVxuICAgICAgICBjb250YWluZXIuY2xpZW50VG9wIC0gcGFyc2VJbnQoJGNvbnRhaW5lci5jc3MoXCJwYWRkaW5nVG9wXCIpKSArIFwicHhcIixcbiAgICAgIGxlZnQgPVxuICAgICAgICBjb250YWluZXIuY2xpZW50TGVmdCAtIHBhcnNlSW50KCRjb250YWluZXIuY3NzKFwicGFkZGluZ0xlZnRcIikpICsgXCJweFwiO1xuICAgIGxldCBoZWlnaHQgPSBjb250YWluZXIuY2xpZW50SGVpZ2h0LFxuICAgICAgd2lkdGggPSBjb250YWluZXIuY2xpZW50V2lkdGg7XG5cbiAgICBpZiAoaGVpZ2h0ID09PSAwKSB7XG4gICAgICBoZWlnaHQgPSAkY29udGFpbmVyLmhlaWdodCgpO1xuICAgIH1cblxuICAgIGlmICh3aWR0aCA9PT0gMCkge1xuICAgICAgd2lkdGggPSAkY29udGFpbmVyLndpZHRoKCk7XG4gICAgfVxuXG4gICAgY29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgIFwiYWZ0ZXJiZWdpblwiLFxuICAgICAgJzxkaXYgY2xhc3M9XCJ0aGVtZS1sb2FkZXItY29udGFpbmVyXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjxkaXYgY2xhc3M9XCJ0aGVtZS1sb2FkZXJcIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTt0b3A6ICcgK1xuICAgICAgICB0b3AgK1xuICAgICAgICBcIjtsZWZ0OiBcIiArXG4gICAgICAgIGxlZnQgK1xuICAgICAgICBcIjtoZWlnaHQ6IFwiICtcbiAgICAgICAgaGVpZ2h0ICtcbiAgICAgICAgXCJweDt3aWR0aDogXCIgK1xuICAgICAgICB3aWR0aCArXG4gICAgICAgICdweDtcIj4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJiYWxsLXNjYWxlJyArXG4gICAgICAgIChoZWlnaHQgPCA2MCB8fCB3aWR0aCA8IDYwID8gXCIgcGV0aXRcIiA6IFwiXCIpICtcbiAgICAgICAgJ1wiPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImNvbnRhaW5cIj48ZGl2IGNsYXNzPVwicmluZ1wiPjxkaXYgY2xhc3M9XCJmcmFtZVwiPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJyaW5nXCI+PGRpdiBjbGFzcz1cImZyYW1lXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInJpbmdcIj48ZGl2IGNsYXNzPVwiZnJhbWVcIj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicmluZ1wiPjxkaXYgY2xhc3M9XCJmcmFtZVwiPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJyaW5nXCI+PGRpdiBjbGFzcz1cImZyYW1lXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInJpbmdcIj48ZGl2IGNsYXNzPVwiZnJhbWVcIj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicmluZ1wiPjxkaXYgY2xhc3M9XCJmcmFtZVwiPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJyaW5nXCI+PGRpdiBjbGFzcz1cImZyYW1lXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInJpbmdcIj48ZGl2IGNsYXNzPVwiZnJhbWVcIj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicmluZ1wiPjxkaXYgY2xhc3M9XCJmcmFtZVwiPjwvZGl2PjwvZGl2PjwvZGl2PicgK1xuICAgICAgICBcIjwvZGl2PlwiICtcbiAgICAgICAgXCI8L2Rpdj48L2Rpdj5cIlxuICAgICk7XG4gICAgJGNvbnRhaW5lci5maW5kKFwiLnRoZW1lLWxvYWRlci1jb250YWluZXJcIikuZmFkZUluKFwic2xvd1wiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmzDqHZlIGwnYXR0ZW50ZSBBSkFYLlxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fG51bGx9IGNvbnRhaW5lciAob3B0aW9ubmVsKSBMZSBwYW5uZWF1IGRhbnMgbGVxdWVsIGVubGV2ZXIgbCdhdHRlbnRlIEFKQVggKHRvdXRlcyBzaSBhdWN1biBwYXJhbcOodHJlKVxuICAgKi9cbiAgc3RhdGljIGhpZGUoY29udGFpbmVyKSB7XG4gICAgbGV0ICR0aGVtZUxvYWRlciA9IG51bGw7XG4gICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICR0aGVtZUxvYWRlciA9ICQoXCIudGhlbWUtbG9hZGVyXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkdGhlbWVMb2FkZXIgPSAkKGNvbnRhaW5lcikuZmluZChcIi50aGVtZS1sb2FkZXJcIik7XG4gICAgfVxuXG4gICAgJHRoZW1lTG9hZGVyLmZhZGVPdXQoXCJmYXN0XCIsICgpID0+IHtcbiAgICAgICR0aGVtZUxvYWRlci5jbG9zZXN0KFwiLnRoZW1lLWxvYWRlci1jb250YWluZXJcIikucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJBamF4TG9hZGVyIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJzaG93IiwiY29udGFpbmVyIiwiJGNvbnRhaW5lciIsIiQiLCJnZXQiLCJ0b3AiLCJjbGllbnRUb3AiLCJwYXJzZUludCIsImNzcyIsImxlZnQiLCJjbGllbnRMZWZ0IiwiaGVpZ2h0IiwiY2xpZW50SGVpZ2h0Iiwid2lkdGgiLCJjbGllbnRXaWR0aCIsImluc2VydEFkamFjZW50SFRNTCIsImZpbmQiLCJmYWRlSW4iLCJoaWRlIiwiJHRoZW1lTG9hZGVyIiwiZmFkZU91dCIsImNsb3Nlc3QiLCJyZW1vdmUiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==