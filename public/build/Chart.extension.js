(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["Chart.extension"],{

/***/ "./assets/js/plugins/Chart.extension.js":
/*!**********************************************!*\
  !*** ./assets/js/plugins/Chart.extension.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");
__webpack_require__(/*! core-js/modules/es.array.fill.js */ "./node_modules/core-js/modules/es.array.fill.js");
//
// Chart extension for making the bars rounded
// Code from: https://codepen.io/jedtrow/full/ygRYgo
//

Chart.elements.Rectangle.prototype.draw = function () {
  var ctx = this._chart.ctx;
  var vm = this._view;
  var left, right, top, bottom, signX, signY, borderSkipped, radius;
  var borderWidth = vm.borderWidth;
  // Set Radius Here
  // If radius is large enough to cause drawing errors a max radius is imposed
  var cornerRadius = 6;
  if (!vm.horizontal) {
    // bar
    left = vm.x - vm.width / 2;
    right = vm.x + vm.width / 2;
    top = vm.y;
    bottom = vm.base;
    signX = 1;
    signY = bottom > top ? 1 : -1;
    borderSkipped = vm.borderSkipped || 'bottom';
  } else {
    // horizontal bar
    left = vm.base;
    right = vm.x;
    top = vm.y - vm.height / 2;
    bottom = vm.y + vm.height / 2;
    signX = right > left ? 1 : -1;
    signY = 1;
    borderSkipped = vm.borderSkipped || 'left';
  }

  // Canvas doesn't allow us to stroke inside the width so we can
  // adjust the sizes to fit if we're setting a stroke on the line
  if (borderWidth) {
    // borderWidth shold be less than bar width and bar height.
    var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
    borderWidth = borderWidth > barSize ? barSize : borderWidth;
    var halfStroke = borderWidth / 2;
    // Adjust borderWidth when bar top position is near vm.base(zero).
    var borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
    var borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
    var borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
    var borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
    // not become a vertical line?
    if (borderLeft !== borderRight) {
      top = borderTop;
      bottom = borderBottom;
    }
    // not become a horizontal line?
    if (borderTop !== borderBottom) {
      left = borderLeft;
      right = borderRight;
    }
  }
  ctx.beginPath();
  ctx.fillStyle = vm.backgroundColor;
  ctx.strokeStyle = vm.borderColor;
  ctx.lineWidth = borderWidth;

  // Corner points, from bottom-left to bottom-right clockwise
  // | 1 2 |
  // | 0 3 |
  var corners = [[left, bottom], [left, top], [right, top], [right, bottom]];

  // Find first (starting) corner with fallback to 'bottom'
  var borders = ['bottom', 'left', 'top', 'right'];
  var startCorner = borders.indexOf(borderSkipped, 0);
  if (startCorner === -1) {
    startCorner = 0;
  }
  function cornerAt(index) {
    return corners[(startCorner + index) % 4];
  }

  // Draw rectangle from 'startCorner'
  var corner = cornerAt(0);
  ctx.moveTo(corner[0], corner[1]);
  for (var i = 1; i < 4; i++) {
    corner = cornerAt(i);
    nextCornerId = i + 1;
    if (nextCornerId == 4) {
      nextCornerId = 0;
    }
    nextCorner = cornerAt(nextCornerId);
    width = corners[2][0] - corners[1][0];
    height = corners[0][1] - corners[1][1];
    x = corners[1][0];
    y = corners[1][1];
    var radius = cornerRadius;

    // Fix radius being too large
    if (radius > height / 2) {
      radius = height / 2;
    }
    if (radius > width / 2) {
      radius = width / 2;
    }
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }
  ctx.fill();
  if (borderWidth) {
    ctx.stroke();
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-fill.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-fill.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this-clause.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this-clause.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "./node_modules/core-js/internals/v8-prototype-define-bug.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.fill.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.fill.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var fill = __webpack_require__(/*! ../internals/array-fill */ "./node_modules/core-js/internals/array-fill.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.index-of.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.index-of.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js/internals/function-uncurry-this-clause.js");
var $indexOf = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var nativeIndexOf = uncurryThis([].indexOf);

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
var FORCED = NEGATIVE_ZERO || !arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: FORCED }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf(this, searchElement, fromIndex) || 0
      : $indexOf(this, searchElement, fromIndex);
  }
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_export_js"], () => (__webpack_exec__("./assets/js/plugins/Chart.extension.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7QUFDQTtBQUNBLElBQUksOENBQThDO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NjaG9vbC1hcHAvLi9hc3NldHMvanMvcGx1Z2lucy9DaGFydC5leHRlbnNpb24uanMiLCJ3ZWJwYWNrOi8vc2Nob29sLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vc2Nob29sLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1maWxsLmpzIiwid2VicGFjazovL3NjaG9vbC1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWlzLXN0cmljdC5qcyIsIndlYnBhY2s6Ly9zY2hvb2wtYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy1jbGF1c2UuanMiLCJ3ZWJwYWNrOi8vc2Nob29sLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwid2VicGFjazovL3NjaG9vbC1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly9zY2hvb2wtYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9zY2hvb2wtYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLmpzIiwid2VicGFjazovL3NjaG9vbC1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZpbGwuanMiLCJ3ZWJwYWNrOi8vc2Nob29sLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaW5kZXgtb2YuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIENoYXJ0IGV4dGVuc2lvbiBmb3IgbWFraW5nIHRoZSBiYXJzIHJvdW5kZWRcbi8vIENvZGUgZnJvbTogaHR0cHM6Ly9jb2RlcGVuLmlvL2plZHRyb3cvZnVsbC95Z1JZZ29cbi8vXG5cbkNoYXJ0LmVsZW1lbnRzLlJlY3RhbmdsZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciBjdHggPSB0aGlzLl9jaGFydC5jdHg7XG4gIHZhciB2bSA9IHRoaXMuX3ZpZXc7XG4gIHZhciBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20sIHNpZ25YLCBzaWduWSwgYm9yZGVyU2tpcHBlZCwgcmFkaXVzO1xuICB2YXIgYm9yZGVyV2lkdGggPSB2bS5ib3JkZXJXaWR0aDtcbiAgLy8gU2V0IFJhZGl1cyBIZXJlXG4gIC8vIElmIHJhZGl1cyBpcyBsYXJnZSBlbm91Z2ggdG8gY2F1c2UgZHJhd2luZyBlcnJvcnMgYSBtYXggcmFkaXVzIGlzIGltcG9zZWRcbiAgdmFyIGNvcm5lclJhZGl1cyA9IDY7XG5cbiAgaWYgKCF2bS5ob3Jpem9udGFsKSB7XG4gICAgLy8gYmFyXG4gICAgbGVmdCA9IHZtLnggLSB2bS53aWR0aCAvIDI7XG4gICAgcmlnaHQgPSB2bS54ICsgdm0ud2lkdGggLyAyO1xuICAgIHRvcCA9IHZtLnk7XG4gICAgYm90dG9tID0gdm0uYmFzZTtcbiAgICBzaWduWCA9IDE7XG4gICAgc2lnblkgPSBib3R0b20gPiB0b3AgPyAxIDogLTE7XG4gICAgYm9yZGVyU2tpcHBlZCA9IHZtLmJvcmRlclNraXBwZWQgfHwgJ2JvdHRvbSc7XG4gIH0gZWxzZSB7XG4gICAgLy8gaG9yaXpvbnRhbCBiYXJcbiAgICBsZWZ0ID0gdm0uYmFzZTtcbiAgICByaWdodCA9IHZtLng7XG4gICAgdG9wID0gdm0ueSAtIHZtLmhlaWdodCAvIDI7XG4gICAgYm90dG9tID0gdm0ueSArIHZtLmhlaWdodCAvIDI7XG4gICAgc2lnblggPSByaWdodCA+IGxlZnQgPyAxIDogLTE7XG4gICAgc2lnblkgPSAxO1xuICAgIGJvcmRlclNraXBwZWQgPSB2bS5ib3JkZXJTa2lwcGVkIHx8ICdsZWZ0JztcbiAgfVxuXG4gIC8vIENhbnZhcyBkb2Vzbid0IGFsbG93IHVzIHRvIHN0cm9rZSBpbnNpZGUgdGhlIHdpZHRoIHNvIHdlIGNhblxuICAvLyBhZGp1c3QgdGhlIHNpemVzIHRvIGZpdCBpZiB3ZSdyZSBzZXR0aW5nIGEgc3Ryb2tlIG9uIHRoZSBsaW5lXG4gIGlmIChib3JkZXJXaWR0aCkge1xuICAgIC8vIGJvcmRlcldpZHRoIHNob2xkIGJlIGxlc3MgdGhhbiBiYXIgd2lkdGggYW5kIGJhciBoZWlnaHQuXG4gICAgdmFyIGJhclNpemUgPSBNYXRoLm1pbihNYXRoLmFicyhsZWZ0IC0gcmlnaHQpLCBNYXRoLmFicyh0b3AgLSBib3R0b20pKTtcbiAgICBib3JkZXJXaWR0aCA9IGJvcmRlcldpZHRoID4gYmFyU2l6ZSA/IGJhclNpemUgOiBib3JkZXJXaWR0aDtcbiAgICB2YXIgaGFsZlN0cm9rZSA9IGJvcmRlcldpZHRoIC8gMjtcbiAgICAvLyBBZGp1c3QgYm9yZGVyV2lkdGggd2hlbiBiYXIgdG9wIHBvc2l0aW9uIGlzIG5lYXIgdm0uYmFzZSh6ZXJvKS5cbiAgICB2YXIgYm9yZGVyTGVmdCA9IGxlZnQgKyAoYm9yZGVyU2tpcHBlZCAhPT0gJ2xlZnQnID8gaGFsZlN0cm9rZSAqIHNpZ25YIDogMCk7XG4gICAgdmFyIGJvcmRlclJpZ2h0ID0gcmlnaHQgKyAoYm9yZGVyU2tpcHBlZCAhPT0gJ3JpZ2h0JyA/IC1oYWxmU3Ryb2tlICogc2lnblggOiAwKTtcbiAgICB2YXIgYm9yZGVyVG9wID0gdG9wICsgKGJvcmRlclNraXBwZWQgIT09ICd0b3AnID8gaGFsZlN0cm9rZSAqIHNpZ25ZIDogMCk7XG4gICAgdmFyIGJvcmRlckJvdHRvbSA9IGJvdHRvbSArIChib3JkZXJTa2lwcGVkICE9PSAnYm90dG9tJyA/IC1oYWxmU3Ryb2tlICogc2lnblkgOiAwKTtcbiAgICAvLyBub3QgYmVjb21lIGEgdmVydGljYWwgbGluZT9cbiAgICBpZiAoYm9yZGVyTGVmdCAhPT0gYm9yZGVyUmlnaHQpIHtcbiAgICAgIHRvcCA9IGJvcmRlclRvcDtcbiAgICAgIGJvdHRvbSA9IGJvcmRlckJvdHRvbTtcbiAgICB9XG4gICAgLy8gbm90IGJlY29tZSBhIGhvcml6b250YWwgbGluZT9cbiAgICBpZiAoYm9yZGVyVG9wICE9PSBib3JkZXJCb3R0b20pIHtcbiAgICAgIGxlZnQgPSBib3JkZXJMZWZ0O1xuICAgICAgcmlnaHQgPSBib3JkZXJSaWdodDtcbiAgICB9XG4gIH1cblxuICBjdHguYmVnaW5QYXRoKCk7XG4gIGN0eC5maWxsU3R5bGUgPSB2bS5iYWNrZ3JvdW5kQ29sb3I7XG4gIGN0eC5zdHJva2VTdHlsZSA9IHZtLmJvcmRlckNvbG9yO1xuICBjdHgubGluZVdpZHRoID0gYm9yZGVyV2lkdGg7XG5cbiAgLy8gQ29ybmVyIHBvaW50cywgZnJvbSBib3R0b20tbGVmdCB0byBib3R0b20tcmlnaHQgY2xvY2t3aXNlXG4gIC8vIHwgMSAyIHxcbiAgLy8gfCAwIDMgfFxuICB2YXIgY29ybmVycyA9IFtcbiAgICBbbGVmdCwgYm90dG9tXSxcbiAgICBbbGVmdCwgdG9wXSxcbiAgICBbcmlnaHQsIHRvcF0sXG4gICAgW3JpZ2h0LCBib3R0b21dXG4gIF07XG5cbiAgLy8gRmluZCBmaXJzdCAoc3RhcnRpbmcpIGNvcm5lciB3aXRoIGZhbGxiYWNrIHRvICdib3R0b20nXG4gIHZhciBib3JkZXJzID0gWydib3R0b20nLCAnbGVmdCcsICd0b3AnLCAncmlnaHQnXTtcbiAgdmFyIHN0YXJ0Q29ybmVyID0gYm9yZGVycy5pbmRleE9mKGJvcmRlclNraXBwZWQsIDApO1xuICBpZiAoc3RhcnRDb3JuZXIgPT09IC0xKSB7XG4gICAgc3RhcnRDb3JuZXIgPSAwO1xuICB9XG5cbiAgZnVuY3Rpb24gY29ybmVyQXQoaW5kZXgpIHtcbiAgICByZXR1cm4gY29ybmVyc1soc3RhcnRDb3JuZXIgKyBpbmRleCkgJSA0XTtcbiAgfVxuXG4gIC8vIERyYXcgcmVjdGFuZ2xlIGZyb20gJ3N0YXJ0Q29ybmVyJ1xuICB2YXIgY29ybmVyID0gY29ybmVyQXQoMCk7XG4gIGN0eC5tb3ZlVG8oY29ybmVyWzBdLCBjb3JuZXJbMV0pO1xuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgNDsgaSsrKSB7XG4gICAgY29ybmVyID0gY29ybmVyQXQoaSk7XG4gICAgbmV4dENvcm5lcklkID0gaSArIDE7XG4gICAgaWYgKG5leHRDb3JuZXJJZCA9PSA0KSB7XG4gICAgICBuZXh0Q29ybmVySWQgPSAwXG4gICAgfVxuXG4gICAgbmV4dENvcm5lciA9IGNvcm5lckF0KG5leHRDb3JuZXJJZCk7XG5cbiAgICB3aWR0aCA9IGNvcm5lcnNbMl1bMF0gLSBjb3JuZXJzWzFdWzBdO1xuICAgIGhlaWdodCA9IGNvcm5lcnNbMF1bMV0gLSBjb3JuZXJzWzFdWzFdO1xuICAgIHggPSBjb3JuZXJzWzFdWzBdO1xuICAgIHkgPSBjb3JuZXJzWzFdWzFdO1xuXG4gICAgdmFyIHJhZGl1cyA9IGNvcm5lclJhZGl1cztcblxuICAgIC8vIEZpeCByYWRpdXMgYmVpbmcgdG9vIGxhcmdlXG4gICAgaWYgKHJhZGl1cyA+IGhlaWdodCAvIDIpIHtcbiAgICAgIHJhZGl1cyA9IGhlaWdodCAvIDI7XG4gICAgfVxuICAgIGlmIChyYWRpdXMgPiB3aWR0aCAvIDIpIHtcbiAgICAgIHJhZGl1cyA9IHdpZHRoIC8gMjtcbiAgICB9XG5cbiAgICBjdHgubW92ZVRvKHggKyByYWRpdXMsIHkpO1xuICAgIGN0eC5saW5lVG8oeCArIHdpZHRoIC0gcmFkaXVzLCB5KTtcbiAgICBjdHgucXVhZHJhdGljQ3VydmVUbyh4ICsgd2lkdGgsIHksIHggKyB3aWR0aCwgeSArIHJhZGl1cyk7XG4gICAgY3R4LmxpbmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQgLSByYWRpdXMpO1xuICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCwgeCArIHdpZHRoIC0gcmFkaXVzLCB5ICsgaGVpZ2h0KTtcbiAgICBjdHgubGluZVRvKHggKyByYWRpdXMsIHkgKyBoZWlnaHQpO1xuICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHkgKyBoZWlnaHQsIHgsIHkgKyBoZWlnaHQgLSByYWRpdXMpO1xuICAgIGN0eC5saW5lVG8oeCwgeSArIHJhZGl1cyk7XG4gICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCwgeSwgeCArIHJhZGl1cywgeSk7XG5cbiAgfVxuXG4gIGN0eC5maWxsKCk7XG4gIGlmIChib3JkZXJXaWR0aCkge1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxudmFyIFVOU0NPUEFCTEVTID0gd2VsbEtub3duU3ltYm9sKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmlmIChBcnJheVByb3RvdHlwZVtVTlNDT1BBQkxFU10gPT09IHVuZGVmaW5lZCkge1xuICBkZWZpbmVQcm9wZXJ0eShBcnJheVByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGNyZWF0ZShudWxsKVxuICB9KTtcbn1cblxuLy8gYWRkIGEga2V5IHRvIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5maWxsYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbGxcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmlsbCh2YWx1ZSAvKiAsIHN0YXJ0ID0gMCwgZW5kID0gQGxlbmd0aCAqLykge1xuICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICB2YXIgbGVuZ3RoID0gbGVuZ3RoT2ZBcnJheUxpa2UoTyk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoYXJndW1lbnRzTGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgbGVuZ3RoKTtcbiAgdmFyIGVuZCA9IGFyZ3VtZW50c0xlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG4gIHZhciBlbmRQb3MgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHRvQWJzb2x1dGVJbmRleChlbmQsIGxlbmd0aCk7XG4gIHdoaWxlIChlbmRQb3MgPiBpbmRleCkgT1tpbmRleCsrXSA9IHZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH0sIDEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuICAvLyBOYXNob3JuIGJ1ZzpcbiAgLy8gICBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTEyOFxuICAvLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xMTMwXG4gIGlmIChjbGFzc29mUmF3KGZuKSA9PT0gJ0Z1bmN0aW9uJykgcmV0dXJuIHVuY3VycnlUaGlzKGZuKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbCBBY3RpdmVYT2JqZWN0IC0tIG9sZCBJRSwgV1NIICovXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG5cbnZhciBHVCA9ICc+JztcbnZhciBMVCA9ICc8JztcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBTQ1JJUFQgPSAnc2NyaXB0JztcbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcblxudmFyIEVtcHR5Q29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cbnZhciBzY3JpcHRUYWcgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICByZXR1cm4gTFQgKyBTQ1JJUFQgKyBHVCArIGNvbnRlbnQgKyBMVCArICcvJyArIFNDUklQVCArIEdUO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIEFjdGl2ZVggT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYID0gZnVuY3Rpb24gKGFjdGl2ZVhEb2N1bWVudCkge1xuICBhY3RpdmVYRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCcnKSk7XG4gIGFjdGl2ZVhEb2N1bWVudC5jbG9zZSgpO1xuICB2YXIgdGVtcCA9IGFjdGl2ZVhEb2N1bWVudC5wYXJlbnRXaW5kb3cuT2JqZWN0O1xuICBhY3RpdmVYRG9jdW1lbnQgPSBudWxsOyAvLyBhdm9pZCBtZW1vcnkgbGVha1xuICByZXR1cm4gdGVtcDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgSlMgPSAnamF2YScgKyBTQ1JJUFQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzQ3NVxuICBpZnJhbWUuc3JjID0gU3RyaW5nKEpTKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJ2RvY3VtZW50LkY9T2JqZWN0JykpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICByZXR1cm4gaWZyYW1lRG9jdW1lbnQuRjtcbn07XG5cbi8vIENoZWNrIGZvciBkb2N1bWVudC5kb21haW4gYW5kIGFjdGl2ZSB4IHN1cHBvcnRcbi8vIE5vIG5lZWQgdG8gdXNlIGFjdGl2ZSB4IGFwcHJvYWNoIHdoZW4gZG9jdW1lbnQuZG9tYWluIGlzIG5vdCBzZXRcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0vaXNzdWVzLzE1MFxuLy8gdmFyaWF0aW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9raXRjYW1icmlkZ2UvZXM1LXNoaW0vY29tbWl0LzRmNzM4YWMwNjYzNDZcbi8vIGF2b2lkIElFIEdDIGJ1Z1xudmFyIGFjdGl2ZVhEb2N1bWVudDtcbnZhciBOdWxsUHJvdG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgYWN0aXZlWERvY3VtZW50ID0gbmV3IEFjdGl2ZVhPYmplY3QoJ2h0bWxmaWxlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGlnbm9yZSAqLyB9XG4gIE51bGxQcm90b09iamVjdCA9IHR5cGVvZiBkb2N1bWVudCAhPSAndW5kZWZpbmVkJ1xuICAgID8gZG9jdW1lbnQuZG9tYWluICYmIGFjdGl2ZVhEb2N1bWVudFxuICAgICAgPyBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYKGFjdGl2ZVhEb2N1bWVudCkgLy8gb2xkIElFXG4gICAgICA6IE51bGxQcm90b09iamVjdFZpYUlGcmFtZSgpXG4gICAgOiBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYKGFjdGl2ZVhEb2N1bWVudCk7IC8vIFdTSFxuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBOdWxsUHJvdG9PYmplY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIE51bGxQcm90b09iamVjdCgpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtY3JlYXRlIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eUNvbnN0cnVjdG9yKCk7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBOdWxsUHJvdG9PYmplY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXNNb2R1bGUuZihyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydGllcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyAmJiAhVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIHByb3BzID0gdG9JbmRleGVkT2JqZWN0KFByb3BlcnRpZXMpO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIHByb3BzW2tleV0pO1xuICByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1rZXlzIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZpbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZmlsbCcpO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmlsbGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maWxsXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSB9LCB7XG4gIGZpbGw6IGZpbGxcbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKCdmaWxsJyk7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1hcnJheS1wcm90b3R5cGUtaW5kZXhvZiAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZScpO1xudmFyICRpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIG5hdGl2ZUluZGV4T2YgPSB1bmN1cnJ5VGhpcyhbXS5pbmRleE9mKTtcblxudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUluZGV4T2YgJiYgMSAvIG5hdGl2ZUluZGV4T2YoWzFdLCAxLCAtMCkgPCAwO1xudmFyIEZPUkNFRCA9IE5FR0FUSVZFX1pFUk8gfHwgIWFycmF5TWV0aG9kSXNTdHJpY3QoJ2luZGV4T2YnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiAsIGZyb21JbmRleCA9IDAgKi8pIHtcbiAgICB2YXIgZnJvbUluZGV4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gbmF0aXZlSW5kZXhPZih0aGlzLCBzZWFyY2hFbGVtZW50LCBmcm9tSW5kZXgpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgZnJvbUluZGV4KTtcbiAgfVxufSk7XG4iXSwibmFtZXMiOlsiQ2hhcnQiLCJlbGVtZW50cyIsIlJlY3RhbmdsZSIsInByb3RvdHlwZSIsImRyYXciLCJjdHgiLCJfY2hhcnQiLCJ2bSIsIl92aWV3IiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwic2lnblgiLCJzaWduWSIsImJvcmRlclNraXBwZWQiLCJyYWRpdXMiLCJib3JkZXJXaWR0aCIsImNvcm5lclJhZGl1cyIsImhvcml6b250YWwiLCJ4Iiwid2lkdGgiLCJ5IiwiYmFzZSIsImhlaWdodCIsImJhclNpemUiLCJNYXRoIiwibWluIiwiYWJzIiwiaGFsZlN0cm9rZSIsImJvcmRlckxlZnQiLCJib3JkZXJSaWdodCIsImJvcmRlclRvcCIsImJvcmRlckJvdHRvbSIsImJlZ2luUGF0aCIsImZpbGxTdHlsZSIsImJhY2tncm91bmRDb2xvciIsInN0cm9rZVN0eWxlIiwiYm9yZGVyQ29sb3IiLCJsaW5lV2lkdGgiLCJjb3JuZXJzIiwiYm9yZGVycyIsInN0YXJ0Q29ybmVyIiwiaW5kZXhPZiIsImNvcm5lckF0IiwiaW5kZXgiLCJjb3JuZXIiLCJtb3ZlVG8iLCJpIiwibmV4dENvcm5lcklkIiwibmV4dENvcm5lciIsImxpbmVUbyIsInF1YWRyYXRpY0N1cnZlVG8iLCJmaWxsIiwic3Ryb2tlIl0sInNvdXJjZVJvb3QiOiIifQ==