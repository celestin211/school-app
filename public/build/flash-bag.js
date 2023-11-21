(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["flash-bag"],{

/***/ "./assets/js/flash-bag.js":
/*!********************************!*\
  !*** ./assets/js/flash-bag.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
__webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
__webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");
__webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");
__webpack_require__(/*! core-js/modules/es.symbol.to-primitive.js */ "./node_modules/core-js/modules/es.symbol.to-primitive.js");
__webpack_require__(/*! core-js/modules/es.date.to-primitive.js */ "./node_modules/core-js/modules/es.date.to-primitive.js");
__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
__webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
__webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
__webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
__webpack_require__(/*! core-js/modules/es.object.define-property.js */ "./node_modules/core-js/modules/es.object.define-property.js");
__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
var flashNotice;
var flashError;
var wrapperNode;
var templateNode;
var hiddenFlashOffset;
var CLASSES = {
  CONTAINER: 'flash-container',
  FLASH: 'flash-message',
  FLASH_CONTENT: 'flash-message__content',
  CLOSE_BUTTON: 'flash-message__close-button',
  ERROR: 'flash-message--error',
  ANIMATE_IN: 'flash-message--is-animating-in',
  ANIMATE_OUT: 'flash-message--is-animating-out',
  ANIMATE_DOWN: 'flash-message--is-animating-down'
};
var ATTRIBUTES = {
  STYLE: 'style',
  CSS_VARIABLE: '--element-height',
  ROLE: 'role',
  ROLE_ALERT: 'alert',
  ROLE_STATUS: 'status'
};
var EVENTS = {
  CLICK: 'click',
  ANIMATION_END: 'animationend',
  FLASH_HIDING: 'flash:hiding',
  DOM_READY: 'DOMContentLoaded'
};
var flash_messages = [];
var flash_helpers = {
  removeMessage: function removeMessage(hiddenMessage) {
    flash_messages.slice(hiddenMessage.index + 1).forEach(function (flash) {
      flash_helpers.shiftMessageDown(flash.node, hiddenMessage.height);
    });
    if (hiddenMessage.index !== -1) {
      flash_messages.splice(hiddenMessage.index, 1);
    }
  },
  shiftMessageDown: function shiftMessageDown(node, height) {
    node.classList.add(CLASSES.ANIMATE_DOWN);
    node.style.setProperty(ATTRIBUTES.CSS_VARIABLE, height);
    node.addEventListener(EVENTS.ANIMATION_END, function () {
      node.removeAttribute(ATTRIBUTES.STYLE);
      node.classList.remove(CLASSES.ANIMATE_DOWN);
    });
  },
  setHiddenFlashOffset: function setHiddenFlashOffset(node) {
    var height = node.offsetHeight;
    if (node.nextSibling) {
      var siblingMargin = parseFloat(window.getComputedStyle(node.nextSibling).marginBottom);
      hiddenFlashOffset = "".concat(height + siblingMargin, "px");
    }
  }
};
var Flash = /*#__PURE__*/function () {
  "use strict";

  function Flash(message) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      isError: false,
      noticeDuration: 4000
    };
    _classCallCheck(this, Flash);
    this.message = message;
    this.node = templateNode.cloneNode(true);
    this.isError = options.isError;
    this.contentNode = this.node.querySelector(".".concat(CLASSES.FLASH_CONTENT));
    this.closeButton = this.node.querySelector(".".concat(CLASSES.CLOSE_BUTTON));
    this.wrapperNode = wrapperNode;
    this.lastFocusedElement = document.activeElement || document.body;
    this.timeout = null;
    if (this.isError) {
      this.duration = null;
    } else {
      this.duration = options.noticeDuration;
    }
  }
  _createClass(Flash, [{
    key: "show",
    value: function show() {
      var _this = this;
      flash_messages.push(this);
      this.closeButton.addEventListener(EVENTS.CLICK, function () {
        _this.hide();
      });
      if (this.isError) {
        this.node.classList.add(CLASSES.ERROR);
        this.contentNode.setAttribute(ATTRIBUTES.ROLE, ATTRIBUTES.ROLE_ALERT);
      } else {
        this.contentNode.setAttribute(ATTRIBUTES.ROLE, ATTRIBUTES.ROLE_STATUS);
        this.timeout = setTimeout(function () {
          return _this.hide();
        }, this.duration);
      }
      this.contentNode.textContent = this.message;
      this.wrapperNode.appendChild(this.node);
      this.contentNode.focus();
      this.node.classList.add(CLASSES.ANIMATE_IN);
      this.node.addEventListener(EVENTS.ANIMATION_END, function () {
        _this.node.classList.remove(CLASSES.ANIMATE_IN);
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;
      flash_helpers.setHiddenFlashOffset(this.node);
      document.dispatchEvent(new CustomEvent(EVENTS.FLASH_HIDING, {
        detail: {
          index: flash_messages.indexOf(this),
          height: hiddenFlashOffset
        }
      }));
      this.node.classList.add(CLASSES.ANIMATE_OUT);
      this.node.addEventListener(EVENTS.ANIMATION_END, function () {
        _this2.node.classList.remove(CLASSES.ANIMATE_OUT);
        _this2.wrapperNode.removeChild(_this2.node);
        if (_this2.wrapperNode.children.length) {
          _this2.wrapperNode.lastChild.querySelector(".".concat(CLASSES.FLASH_CONTENT)).focus();
        } else {
          _this2.lastFocusedElement.focus();
        }
      });
    }
  }]);
  return Flash;
}(); // document.addEventListener(EVENTS.DOM_READY, () => {
wrapperNode = document.querySelector(".".concat(CLASSES.CONTAINER));
templateNode = document.querySelector(".".concat(CLASSES.FLASH));
document.addEventListener(EVENTS.FLASH_HIDING, function (event) {
  var hiddenMessage = {
    index: event.detail.index,
    height: event.detail.height
  };
  flash_helpers.removeMessage(hiddenMessage);
});
// });

(function () {
  var DEMO = {
    ERROR_BUTTON: 'js-activates-error',
    ERROR_MESSAGE: 'There was an error processing your request',
    NOTICE_BUTTON: 'js-activates-notice',
    NOTICE_MESSAGE: 'Photo uploaded'
  };
  var demoNoticeButton = document.querySelector(".".concat(DEMO.NOTICE_BUTTON));
  var demoErrorButton = document.querySelector(".".concat(DEMO.ERROR_BUTTON));
  demoNoticeButton.addEventListener(EVENTS.CLICK, function () {
    flashNotice = new Flash(DEMO.NOTICE_MESSAGE);
    flashNotice.show();
  });
  demoErrorButton.addEventListener(EVENTS.CLICK, function () {
    flashError = new Flash(DEMO.ERROR_MESSAGE, {
      isError: true
    });
    flashError.show();
  });
})();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_arra-9ca245","vendors-node_modules_core-js_modules_es_string_iterator_js-node_modules_core-js_modules_es_sy-0eab75","vendors-node_modules_core-js_modules_es_error_cause_js-node_modules_core-js_modules_es_error_-f2dd87","vendors-node_modules_core-js_modules_es_array_for-each_js-node_modules_core-js_modules_es_arr-697ddc"], () => (__webpack_exec__("./assets/js/flash-bag.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxDQUFDRSxhQUFhLEVBQUU7TUFBRXBDLE9BQU8sRUFBRTtJQUFLLENBQUMsQ0FBQztJQUM3RDFELFVBQVUsQ0FBQzBFLElBQUksQ0FBQyxDQUFDO0VBQ2xCLENBQUMsQ0FBQztBQUNILENBQUMsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Nob29sLWFwcC8uL2Fzc2V0cy9qcy9mbGFzaC1iYWcuanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGZsYXNoTm90aWNlO1xyXG5sZXQgZmxhc2hFcnJvcjtcclxubGV0IHdyYXBwZXJOb2RlO1xyXG5sZXQgdGVtcGxhdGVOb2RlO1xyXG5sZXQgaGlkZGVuRmxhc2hPZmZzZXQ7XHJcbmNvbnN0IENMQVNTRVMgPSB7XHJcblx0Q09OVEFJTkVSOiAnZmxhc2gtY29udGFpbmVyJyxcclxuXHRGTEFTSDogJ2ZsYXNoLW1lc3NhZ2UnLFxyXG5cdEZMQVNIX0NPTlRFTlQ6ICdmbGFzaC1tZXNzYWdlX19jb250ZW50JyxcclxuXHRDTE9TRV9CVVRUT046ICdmbGFzaC1tZXNzYWdlX19jbG9zZS1idXR0b24nLFxyXG5cdEVSUk9SOiAnZmxhc2gtbWVzc2FnZS0tZXJyb3InLFxyXG5cdEFOSU1BVEVfSU46ICdmbGFzaC1tZXNzYWdlLS1pcy1hbmltYXRpbmctaW4nLFxyXG5cdEFOSU1BVEVfT1VUOiAnZmxhc2gtbWVzc2FnZS0taXMtYW5pbWF0aW5nLW91dCcsXHJcblx0QU5JTUFURV9ET1dOOiAnZmxhc2gtbWVzc2FnZS0taXMtYW5pbWF0aW5nLWRvd24nLFxyXG59O1xyXG5jb25zdCBBVFRSSUJVVEVTID0ge1xyXG5cdFNUWUxFOiAnc3R5bGUnLFxyXG5cdENTU19WQVJJQUJMRTogJy0tZWxlbWVudC1oZWlnaHQnLFxyXG5cdFJPTEU6ICdyb2xlJyxcclxuXHRST0xFX0FMRVJUOiAnYWxlcnQnLFxyXG5cdFJPTEVfU1RBVFVTOiAnc3RhdHVzJyxcclxufTtcclxuY29uc3QgRVZFTlRTID0ge1xyXG5cdENMSUNLOiAnY2xpY2snLFxyXG5cdEFOSU1BVElPTl9FTkQ6ICdhbmltYXRpb25lbmQnLFxyXG5cdEZMQVNIX0hJRElORzogJ2ZsYXNoOmhpZGluZycsXHJcblx0RE9NX1JFQURZOiAnRE9NQ29udGVudExvYWRlZCcsXHJcbn07XHJcbmNvbnN0IGZsYXNoX21lc3NhZ2VzID0gW107XHJcbmNvbnN0IGZsYXNoX2hlbHBlcnMgPSB7XHJcblx0cmVtb3ZlTWVzc2FnZTogZnVuY3Rpb24oaGlkZGVuTWVzc2FnZSkge1xyXG5cdFx0KGZsYXNoX21lc3NhZ2VzLnNsaWNlKGhpZGRlbk1lc3NhZ2UuaW5kZXggKyAxKSkuZm9yRWFjaCgoZmxhc2gpID0+IHtcclxuXHRcdFx0Zmxhc2hfaGVscGVycy5zaGlmdE1lc3NhZ2VEb3duKGZsYXNoLm5vZGUsIGhpZGRlbk1lc3NhZ2UuaGVpZ2h0KTtcclxuXHRcdH0pXHJcblx0XHRpZiAoaGlkZGVuTWVzc2FnZS5pbmRleCAhPT0gLTEpIHtcclxuXHRcdFx0Zmxhc2hfbWVzc2FnZXMuc3BsaWNlKGhpZGRlbk1lc3NhZ2UuaW5kZXgsIDEpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0XHJcblx0c2hpZnRNZXNzYWdlRG93bjogZnVuY3Rpb24obm9kZSwgaGVpZ2h0KSB7XHJcblx0XHRub2RlLmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5BTklNQVRFX0RPV04pO1xyXG5cdFx0bm9kZS5zdHlsZS5zZXRQcm9wZXJ0eShBVFRSSUJVVEVTLkNTU19WQVJJQUJMRSwgaGVpZ2h0KTtcclxuXHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVFMuQU5JTUFUSU9OX0VORCwgKCkgPT4ge1xyXG5cdFx0XHRub2RlLnJlbW92ZUF0dHJpYnV0ZShBVFRSSUJVVEVTLlNUWUxFKTtcclxuXHRcdFx0bm9kZS5jbGFzc0xpc3QucmVtb3ZlKENMQVNTRVMuQU5JTUFURV9ET1dOKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0XHJcblx0c2V0SGlkZGVuRmxhc2hPZmZzZXQ6IGZ1bmN0aW9uKG5vZGUpIHtcclxuXHRcdGNvbnN0IGhlaWdodCA9IG5vZGUub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0aWYgKG5vZGUubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0Y29uc3Qgc2libGluZ01hcmdpbiA9IChwYXJzZUZsb2F0KFxyXG5cdFx0XHRcdHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUubmV4dFNpYmxpbmcpLm1hcmdpbkJvdHRvbVxyXG5cdFx0XHQpKTtcclxuXHRcdFx0aGlkZGVuRmxhc2hPZmZzZXQgPSBgJHtoZWlnaHQgKyBzaWJsaW5nTWFyZ2lufXB4YDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEZsYXNoIHtcclxuXHRjb25zdHJ1Y3RvcihtZXNzYWdlLCBvcHRpb25zID0geyBpc0Vycm9yOiBmYWxzZSwgbm90aWNlRHVyYXRpb246IDQwMDAgfSkge1xyXG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuXHRcdHRoaXMubm9kZSA9IHRlbXBsYXRlTm9kZS5jbG9uZU5vZGUodHJ1ZSk7XHJcblx0XHR0aGlzLmlzRXJyb3IgPSBvcHRpb25zLmlzRXJyb3I7XHJcblx0XHR0aGlzLmNvbnRlbnROb2RlID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoYC4ke0NMQVNTRVMuRkxBU0hfQ09OVEVOVH1gKTtcclxuXHRcdHRoaXMuY2xvc2VCdXR0b24gPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcihgLiR7Q0xBU1NFUy5DTE9TRV9CVVRUT059YCk7XHJcblx0XHR0aGlzLndyYXBwZXJOb2RlID0gd3JhcHBlck5vZGU7XHJcblx0XHR0aGlzLmxhc3RGb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keTtcclxuXHRcdHRoaXMudGltZW91dCA9IG51bGw7XHJcblx0XHRpZiAodGhpcy5pc0Vycm9yKSB7XHJcblx0XHRcdHRoaXMuZHVyYXRpb24gPSBudWxsO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5kdXJhdGlvbiA9IG9wdGlvbnMubm90aWNlRHVyYXRpb247XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHNob3coKSB7XHJcblx0XHRmbGFzaF9tZXNzYWdlcy5wdXNoKHRoaXMpO1xyXG5cdFx0dGhpcy5jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKEVWRU5UUy5DTElDSywgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuaXNFcnJvcikge1xyXG5cdFx0XHR0aGlzLm5vZGUuY2xhc3NMaXN0LmFkZChDTEFTU0VTLkVSUk9SKTtcclxuXHRcdFx0dGhpcy5jb250ZW50Tm9kZS5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFUy5ST0xFLCBBVFRSSUJVVEVTLlJPTEVfQUxFUlQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb250ZW50Tm9kZS5zZXRBdHRyaWJ1dGUoQVRUUklCVVRFUy5ST0xFLCBBVFRSSUJVVEVTLlJPTEVfU1RBVFVTKTtcclxuXHRcdFx0dGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgdGhpcy5kdXJhdGlvbik7XHJcblx0XHR9XHJcblx0XHR0aGlzLmNvbnRlbnROb2RlLnRleHRDb250ZW50ID0gdGhpcy5tZXNzYWdlO1xyXG5cdFx0dGhpcy53cmFwcGVyTm9kZS5hcHBlbmRDaGlsZCh0aGlzLm5vZGUpO1xyXG5cdFx0dGhpcy5jb250ZW50Tm9kZS5mb2N1cygpO1xyXG5cdFx0dGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5BTklNQVRFX0lOKTtcclxuXHRcdHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKEVWRU5UUy5BTklNQVRJT05fRU5ELCAoKSA9PiB7XHJcblx0XHRcdHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKENMQVNTRVMuQU5JTUFURV9JTik7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0aGlkZSgpIHtcclxuXHRcdGZsYXNoX2hlbHBlcnMuc2V0SGlkZGVuRmxhc2hPZmZzZXQodGhpcy5ub2RlKTtcclxuXHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KEVWRU5UUy5GTEFTSF9ISURJTkcsIHtcclxuXHRcdFx0ZGV0YWlsOiB7XHJcblx0XHRcdFx0aW5kZXg6IGZsYXNoX21lc3NhZ2VzLmluZGV4T2YodGhpcyksXHJcblx0XHRcdFx0aGVpZ2h0OiBoaWRkZW5GbGFzaE9mZnNldCxcclxuXHRcdFx0fSxcclxuXHRcdH0pKTtcclxuXHRcdHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKENMQVNTRVMuQU5JTUFURV9PVVQpO1xyXG5cdFx0dGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRTLkFOSU1BVElPTl9FTkQsICgpID0+IHtcclxuXHRcdFx0dGhpcy5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NFUy5BTklNQVRFX09VVCk7XHJcblx0XHRcdHRoaXMud3JhcHBlck5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcclxuXHRcdFx0aWYgKHRoaXMud3JhcHBlck5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy53cmFwcGVyTm9kZS5sYXN0Q2hpbGQucXVlcnlTZWxlY3RvcihgLiR7Q0xBU1NFUy5GTEFTSF9DT05URU5UfWApLmZvY3VzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5sYXN0Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKEVWRU5UUy5ET01fUkVBRFksICgpID0+IHtcclxud3JhcHBlck5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtDTEFTU0VTLkNPTlRBSU5FUn1gKTtcclxudGVtcGxhdGVOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Q0xBU1NFUy5GTEFTSH1gKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRTLkZMQVNIX0hJRElORywgKGV2ZW50KSA9PiB7XHJcblx0Y29uc3QgaGlkZGVuTWVzc2FnZSA9IHtcclxuXHRcdGluZGV4OiBldmVudC5kZXRhaWwuaW5kZXgsXHJcblx0XHRoZWlnaHQ6IGV2ZW50LmRldGFpbC5oZWlnaHQsXHJcblx0fTtcclxuXHRmbGFzaF9oZWxwZXJzLnJlbW92ZU1lc3NhZ2UoaGlkZGVuTWVzc2FnZSk7XHJcbn0pO1xyXG4vLyB9KTtcclxuXHJcbigoKSA9PiB7XHJcblx0Y29uc3QgREVNTyA9IHtcclxuXHRcdEVSUk9SX0JVVFRPTjogJ2pzLWFjdGl2YXRlcy1lcnJvcicsXHJcblx0XHRFUlJPUl9NRVNTQUdFOiAnVGhlcmUgd2FzIGFuIGVycm9yIHByb2Nlc3NpbmcgeW91ciByZXF1ZXN0JyxcclxuXHRcdE5PVElDRV9CVVRUT046ICdqcy1hY3RpdmF0ZXMtbm90aWNlJyxcclxuXHRcdE5PVElDRV9NRVNTQUdFOiAnUGhvdG8gdXBsb2FkZWQnLFxyXG5cdH07XHJcblx0Y29uc3QgZGVtb05vdGljZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke0RFTU8uTk9USUNFX0JVVFRPTn1gKTtcclxuXHRjb25zdCBkZW1vRXJyb3JCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtERU1PLkVSUk9SX0JVVFRPTn1gKTtcclxuXHRkZW1vTm90aWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRTLkNMSUNLLCAoKSA9PiB7XHJcblx0XHRmbGFzaE5vdGljZSA9IG5ldyBGbGFzaChERU1PLk5PVElDRV9NRVNTQUdFKTtcclxuXHRcdGZsYXNoTm90aWNlLnNob3coKTtcclxuXHR9KTtcclxuXHRkZW1vRXJyb3JCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihFVkVOVFMuQ0xJQ0ssICgpID0+IHtcclxuXHRcdGZsYXNoRXJyb3IgPSBuZXcgRmxhc2goREVNTy5FUlJPUl9NRVNTQUdFLCB7IGlzRXJyb3I6IHRydWUgfSk7XHJcblx0XHRmbGFzaEVycm9yLnNob3coKTtcclxuXHR9KTtcclxufSkoKTtcclxuIl0sIm5hbWVzIjpbImZsYXNoTm90aWNlIiwiZmxhc2hFcnJvciIsIndyYXBwZXJOb2RlIiwidGVtcGxhdGVOb2RlIiwiaGlkZGVuRmxhc2hPZmZzZXQiLCJDTEFTU0VTIiwiQ09OVEFJTkVSIiwiRkxBU0giLCJGTEFTSF9DT05URU5UIiwiQ0xPU0VfQlVUVE9OIiwiRVJST1IiLCJBTklNQVRFX0lOIiwiQU5JTUFURV9PVVQiLCJBTklNQVRFX0RPV04iLCJBVFRSSUJVVEVTIiwiU1RZTEUiLCJDU1NfVkFSSUFCTEUiLCJST0xFIiwiUk9MRV9BTEVSVCIsIlJPTEVfU1RBVFVTIiwiRVZFTlRTIiwiQ0xJQ0siLCJBTklNQVRJT05fRU5EIiwiRkxBU0hfSElESU5HIiwiRE9NX1JFQURZIiwiZmxhc2hfbWVzc2FnZXMiLCJmbGFzaF9oZWxwZXJzIiwicmVtb3ZlTWVzc2FnZSIsImhpZGRlbk1lc3NhZ2UiLCJzbGljZSIsImluZGV4IiwiZm9yRWFjaCIsImZsYXNoIiwic2hpZnRNZXNzYWdlRG93biIsIm5vZGUiLCJoZWlnaHQiLCJzcGxpY2UiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUF0dHJpYnV0ZSIsInJlbW92ZSIsInNldEhpZGRlbkZsYXNoT2Zmc2V0Iiwib2Zmc2V0SGVpZ2h0IiwibmV4dFNpYmxpbmciLCJzaWJsaW5nTWFyZ2luIiwicGFyc2VGbG9hdCIsIndpbmRvdyIsImdldENvbXB1dGVkU3R5bGUiLCJtYXJnaW5Cb3R0b20iLCJjb25jYXQiLCJGbGFzaCIsIm1lc3NhZ2UiLCJvcHRpb25zIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiaXNFcnJvciIsIm5vdGljZUR1cmF0aW9uIiwiX2NsYXNzQ2FsbENoZWNrIiwiY2xvbmVOb2RlIiwiY29udGVudE5vZGUiLCJxdWVyeVNlbGVjdG9yIiwiY2xvc2VCdXR0b24iLCJsYXN0Rm9jdXNlZEVsZW1lbnQiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJib2R5IiwidGltZW91dCIsImR1cmF0aW9uIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJzaG93IiwiX3RoaXMiLCJwdXNoIiwiaGlkZSIsInNldEF0dHJpYnV0ZSIsInNldFRpbWVvdXQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwiZm9jdXMiLCJfdGhpczIiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJpbmRleE9mIiwicmVtb3ZlQ2hpbGQiLCJjaGlsZHJlbiIsImxhc3RDaGlsZCIsImV2ZW50IiwiREVNTyIsIkVSUk9SX0JVVFRPTiIsIkVSUk9SX01FU1NBR0UiLCJOT1RJQ0VfQlVUVE9OIiwiTk9USUNFX01FU1NBR0UiLCJkZW1vTm90aWNlQnV0dG9uIiwiZGVtb0Vycm9yQnV0dG9uIl0sInNvdXJjZVJvb3QiOiIifQ==