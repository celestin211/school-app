(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["photo.index"],{

/***/ "./assets/js/photo/photo.index.js":
/*!****************************************!*\
  !*** ./assets/js/photo/photo.index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
__webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
// Products gallery

var initPhotoSwipeFromDOM = function initPhotoSwipeFromDOM(gallerySelector) {
  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  var parseThumbnailElements = function parseThumbnailElements(el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;
    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element
      // include only element nodes
      if (figureEl.nodeType !== 1) {
        continue;
      }
      linkEl = figureEl.children[0]; // <a> element

      size = linkEl.getAttribute('data-size').split('x');

      // create slide object
      item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };
      if (figureEl.children.length > 1) {
        // <figcaption> content
        item.title = figureEl.children[1].innerHTML;
      }
      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute('src');
      }
      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }
    return items;
  };

  // find nearest parent element
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function onThumbnailsClick(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    var eTarget = e.target || e.srcElement;

    // find root element of slide
    var clickedListItem = closest(eTarget, function (el) {
      return el.tagName && el.tagName.toUpperCase() === 'FIGURE';
    });
    if (!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;
    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }
      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }
    if (index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function photoswipeParseHash() {
    var hash = window.location.hash.substring(1),
      params = {};
    if (hash.length < 5) {
      return params;
    }
    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split('=');
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }
    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }
    return params;
  };
  var openPhotoSwipe = function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
      gallery,
      options,
      items;
    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {
      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),
      getThumbBoundsFn: function getThumbBoundsFn(index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName('img')[0],
          // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
      }
    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    // exit if index not found
    if (isNaN(options.index)) {
      return;
    }
    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');

/***/ }),

/***/ "./node_modules/core-js/internals/array-set-length.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/array-set-length.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/does-not-exceed-safe-integer.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/internals/does-not-exceed-safe-integer.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/number-parse-int.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/number-parse-int.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var trim = (__webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js/internals/string-trim.js").trim);
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

var $parseInt = global.parseInt;
var Symbol = global.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var hex = /^[+-]?0x/i;
var exec = uncurryThis(hex.exec);
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails(function () { $parseInt(Object(ITERATOR)); }));

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(toString(string));
  return $parseInt(S, (radix >>> 0) || (exec(hex, S) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "./node_modules/core-js/internals/string-trim.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/string-trim.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/core-js/internals/to-string.js");
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

var replace = uncurryThis(''.replace);
var ltrim = RegExp('^[' + whitespaces + ']+');
var rtrim = RegExp('(^|[^' + whitespaces + '])[' + whitespaces + ']+$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '$1');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js/internals/to-string.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-string.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/whitespaces.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/whitespaces.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.push.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.push.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var setArrayLength = __webpack_require__(/*! ../internals/array-set-length */ "./node_modules/core-js/internals/array-set-length.js");
var doesNotExceedSafeInteger = __webpack_require__(/*! ../internals/does-not-exceed-safe-integer */ "./node_modules/core-js/internals/does-not-exceed-safe-integer.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 and Safari <= 15.4, FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.parse-int.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es.parse-int.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $parseInt = __webpack_require__(/*! ../internals/number-parse-int */ "./node_modules/core-js/internals/number-parse-int.js");

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt !== $parseInt }, {
  parseInt: $parseInt
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_export_js"], () => (__webpack_exec__("./assets/js/photo/photo.index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG8uaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUVBLElBQUlBLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBcUJBLENBQVlDLGVBQWUsRUFBRTtFQUVyRDtFQUNBO0VBQ0EsSUFBSUMsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUFzQkEsQ0FBWUMsRUFBRSxFQUFFO0lBQ3pDLElBQUlDLGFBQWEsR0FBR0QsRUFBRSxDQUFDRSxVQUFVO01BQ2hDQyxRQUFRLEdBQUdGLGFBQWEsQ0FBQ0csTUFBTTtNQUMvQkMsS0FBSyxHQUFHLEVBQUU7TUFDVkMsUUFBUTtNQUNSQyxNQUFNO01BQ05DLElBQUk7TUFDSkMsSUFBSTtJQUVMLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHUCxRQUFRLEVBQUVPLENBQUMsRUFBRSxFQUFFO01BRWxDSixRQUFRLEdBQUdMLGFBQWEsQ0FBQ1MsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUM3QjtNQUNBLElBQUlKLFFBQVEsQ0FBQ0ssUUFBUSxLQUFLLENBQUMsRUFBRTtRQUM1QjtNQUNEO01BRUFKLE1BQU0sR0FBR0QsUUFBUSxDQUFDTSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7TUFFL0JKLElBQUksR0FBR0QsTUFBTSxDQUFDTSxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUM7O01BRWxEO01BQ0FMLElBQUksR0FBRztRQUNOTSxHQUFHLEVBQUVSLE1BQU0sQ0FBQ00sWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNoQ0csQ0FBQyxFQUFFQyxRQUFRLENBQUNULElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDeEJVLENBQUMsRUFBRUQsUUFBUSxDQUFDVCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtNQUN4QixDQUFDO01BRUQsSUFBSUYsUUFBUSxDQUFDTSxRQUFRLENBQUNSLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDakM7UUFDQUssSUFBSSxDQUFDVSxLQUFLLEdBQUdiLFFBQVEsQ0FBQ00sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDUSxTQUFTO01BQzVDO01BRUEsSUFBSWIsTUFBTSxDQUFDSyxRQUFRLENBQUNSLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDL0I7UUFDQUssSUFBSSxDQUFDWSxJQUFJLEdBQUdkLE1BQU0sQ0FBQ0ssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxZQUFZLENBQUMsS0FBSyxDQUFDO01BQ25EO01BRUFKLElBQUksQ0FBQ1QsRUFBRSxHQUFHTSxRQUFRLENBQUMsQ0FBQztNQUNwQkQsS0FBSyxDQUFDaUIsSUFBSSxDQUFDYixJQUFJLENBQUM7SUFDakI7SUFFQSxPQUFPSixLQUFLO0VBQ2IsQ0FBQzs7RUFFRDtFQUNBLElBQUlrQixPQUFPLEdBQUcsU0FBU0EsT0FBT0EsQ0FBQ3ZCLEVBQUUsRUFBRXdCLEVBQUUsRUFBRTtJQUN0QyxPQUFPeEIsRUFBRSxLQUFLd0IsRUFBRSxDQUFDeEIsRUFBRSxDQUFDLEdBQUdBLEVBQUUsR0FBR3VCLE9BQU8sQ0FBQ3ZCLEVBQUUsQ0FBQ3lCLFVBQVUsRUFBRUQsRUFBRSxDQUFDLENBQUM7RUFDeEQsQ0FBQzs7RUFFRDtFQUNBLElBQUlFLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBaUJBLENBQVlDLENBQUMsRUFBRTtJQUNuQ0EsQ0FBQyxHQUFHQSxDQUFDLElBQUlDLE1BQU0sQ0FBQ0MsS0FBSztJQUNyQkYsQ0FBQyxDQUFDRyxjQUFjLEdBQUdILENBQUMsQ0FBQ0csY0FBYyxDQUFDLENBQUMsR0FBR0gsQ0FBQyxDQUFDSSxXQUFXLEdBQUcsS0FBSztJQUU3RCxJQUFJQyxPQUFPLEdBQUdMLENBQUMsQ0FBQ00sTUFBTSxJQUFJTixDQUFDLENBQUNPLFVBQVU7O0lBRXRDO0lBQ0EsSUFBSUMsZUFBZSxHQUFHWixPQUFPLENBQUNTLE9BQU8sRUFBRSxVQUFTaEMsRUFBRSxFQUFFO01BQ25ELE9BQVFBLEVBQUUsQ0FBQ29DLE9BQU8sSUFBSXBDLEVBQUUsQ0FBQ29DLE9BQU8sQ0FBQ0MsV0FBVyxDQUFDLENBQUMsS0FBSyxRQUFRO0lBQzVELENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQ0YsZUFBZSxFQUFFO01BQ3JCO0lBQ0Q7O0lBRUE7SUFDQTtJQUNBLElBQUlHLGNBQWMsR0FBR0gsZUFBZSxDQUFDVixVQUFVO01BQzlDdkIsVUFBVSxHQUFHaUMsZUFBZSxDQUFDVixVQUFVLENBQUN2QixVQUFVO01BQ2xEcUMsYUFBYSxHQUFHckMsVUFBVSxDQUFDRSxNQUFNO01BQ2pDb0MsU0FBUyxHQUFHLENBQUM7TUFDYkMsS0FBSztJQUVOLEtBQUssSUFBSS9CLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRzZCLGFBQWEsRUFBRTdCLENBQUMsRUFBRSxFQUFFO01BQ3ZDLElBQUlSLFVBQVUsQ0FBQ1EsQ0FBQyxDQUFDLENBQUNDLFFBQVEsS0FBSyxDQUFDLEVBQUU7UUFDakM7TUFDRDtNQUVBLElBQUlULFVBQVUsQ0FBQ1EsQ0FBQyxDQUFDLEtBQUt5QixlQUFlLEVBQUU7UUFDdENNLEtBQUssR0FBR0QsU0FBUztRQUNqQjtNQUNEO01BQ0FBLFNBQVMsRUFBRTtJQUNaO0lBSUEsSUFBSUMsS0FBSyxJQUFJLENBQUMsRUFBRTtNQUNmO01BQ0FDLGNBQWMsQ0FBQ0QsS0FBSyxFQUFFSCxjQUFjLENBQUM7SUFDdEM7SUFDQSxPQUFPLEtBQUs7RUFDYixDQUFDOztFQUVEO0VBQ0EsSUFBSUssbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFtQkEsQ0FBQSxFQUFjO0lBQ3BDLElBQUlDLElBQUksR0FBR2hCLE1BQU0sQ0FBQ2lCLFFBQVEsQ0FBQ0QsSUFBSSxDQUFDRSxTQUFTLENBQUMsQ0FBQyxDQUFDO01BQzNDQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRVosSUFBSUgsSUFBSSxDQUFDeEMsTUFBTSxHQUFHLENBQUMsRUFBRTtNQUNwQixPQUFPMkMsTUFBTTtJQUNkO0lBRUEsSUFBSUMsSUFBSSxHQUFHSixJQUFJLENBQUM5QixLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFCLEtBQUssSUFBSUosQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHc0MsSUFBSSxDQUFDNUMsTUFBTSxFQUFFTSxDQUFDLEVBQUUsRUFBRTtNQUNyQyxJQUFJLENBQUNzQyxJQUFJLENBQUN0QyxDQUFDLENBQUMsRUFBRTtRQUNiO01BQ0Q7TUFDQSxJQUFJdUMsSUFBSSxHQUFHRCxJQUFJLENBQUN0QyxDQUFDLENBQUMsQ0FBQ0ksS0FBSyxDQUFDLEdBQUcsQ0FBQztNQUM3QixJQUFJbUMsSUFBSSxDQUFDN0MsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNwQjtNQUNEO01BQ0EyQyxNQUFNLENBQUNFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHQSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFCO0lBRUEsSUFBSUYsTUFBTSxDQUFDRyxHQUFHLEVBQUU7TUFDZkgsTUFBTSxDQUFDRyxHQUFHLEdBQUdqQyxRQUFRLENBQUM4QixNQUFNLENBQUNHLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFDdEM7SUFFQSxPQUFPSCxNQUFNO0VBQ2QsQ0FBQztFQUVELElBQUlMLGNBQWMsR0FBRyxTQUFqQkEsY0FBY0EsQ0FBWUQsS0FBSyxFQUFFVSxjQUFjLEVBQUVDLGdCQUFnQixFQUFFQyxPQUFPLEVBQUU7SUFDL0UsSUFBSUMsV0FBVyxHQUFHQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUN0REMsT0FBTztNQUNQQyxPQUFPO01BQ1ByRCxLQUFLO0lBRU5BLEtBQUssR0FBR04sc0JBQXNCLENBQUNvRCxjQUFjLENBQUM7O0lBRTlDO0lBQ0FPLE9BQU8sR0FBRztNQUVUO01BQ0FDLFVBQVUsRUFBRVIsY0FBYyxDQUFDdEMsWUFBWSxDQUFDLGVBQWUsQ0FBQztNQUV4RCtDLGdCQUFnQixFQUFFLFNBQUFBLGlCQUFTbkIsS0FBSyxFQUFFO1FBQ2pDO1FBQ0EsSUFBSW9CLFNBQVMsR0FBR3hELEtBQUssQ0FBQ29DLEtBQUssQ0FBQyxDQUFDekMsRUFBRSxDQUFDOEQsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUU7VUFDL0RDLFdBQVcsR0FBR25DLE1BQU0sQ0FBQ29DLFdBQVcsSUFBSVQsUUFBUSxDQUFDVSxlQUFlLENBQUNDLFNBQVM7VUFDdEVDLElBQUksR0FBR04sU0FBUyxDQUFDTyxxQkFBcUIsQ0FBQyxDQUFDO1FBRXpDLE9BQU87VUFDTkMsQ0FBQyxFQUFFRixJQUFJLENBQUNHLElBQUk7VUFDWkMsQ0FBQyxFQUFFSixJQUFJLENBQUNLLEdBQUcsR0FBR1QsV0FBVztVQUN6Qi9DLENBQUMsRUFBRW1ELElBQUksQ0FBQ007UUFDVCxDQUFDO01BQ0Y7SUFFRCxDQUFDOztJQUVEO0lBQ0EsSUFBSXBCLE9BQU8sRUFBRTtNQUNaLElBQUlLLE9BQU8sQ0FBQ2dCLFdBQVcsRUFBRTtRQUN4QjtRQUNBO1FBQ0EsS0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUd0RSxLQUFLLENBQUNELE1BQU0sRUFBRXVFLENBQUMsRUFBRSxFQUFFO1VBQ3RDLElBQUl0RSxLQUFLLENBQUNzRSxDQUFDLENBQUMsQ0FBQ0MsR0FBRyxJQUFJbkMsS0FBSyxFQUFFO1lBQzFCaUIsT0FBTyxDQUFDakIsS0FBSyxHQUFHa0MsQ0FBQztZQUNqQjtVQUNEO1FBQ0Q7TUFDRCxDQUFDLE1BQU07UUFDTjtRQUNBakIsT0FBTyxDQUFDakIsS0FBSyxHQUFHeEIsUUFBUSxDQUFDd0IsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUM7TUFDeEM7SUFDRCxDQUFDLE1BQU07TUFDTmlCLE9BQU8sQ0FBQ2pCLEtBQUssR0FBR3hCLFFBQVEsQ0FBQ3dCLEtBQUssRUFBRSxFQUFFLENBQUM7SUFDcEM7O0lBRUE7SUFDQSxJQUFJb0MsS0FBSyxDQUFDbkIsT0FBTyxDQUFDakIsS0FBSyxDQUFDLEVBQUU7TUFDekI7SUFDRDtJQUVBLElBQUlXLGdCQUFnQixFQUFFO01BQ3JCTSxPQUFPLENBQUNvQixxQkFBcUIsR0FBRyxDQUFDO0lBQ2xDOztJQUVBO0lBQ0FyQixPQUFPLEdBQUcsSUFBSXNCLFVBQVUsQ0FBQ3pCLFdBQVcsRUFBRTBCLG9CQUFvQixFQUFFM0UsS0FBSyxFQUFFcUQsT0FBTyxDQUFDO0lBQzNFRCxPQUFPLENBQUN3QixJQUFJLENBQUMsQ0FBQztFQUNmLENBQUM7O0VBRUQ7RUFDQSxJQUFJQyxlQUFlLEdBQUczQixRQUFRLENBQUNDLGdCQUFnQixDQUFDMUQsZUFBZSxDQUFDO0VBRWhFLEtBQUssSUFBSVksQ0FBQyxHQUFHLENBQUMsRUFBRXlFLENBQUMsR0FBR0QsZUFBZSxDQUFDOUUsTUFBTSxFQUFFTSxDQUFDLEdBQUd5RSxDQUFDLEVBQUV6RSxDQUFDLEVBQUUsRUFBRTtJQUN2RHdFLGVBQWUsQ0FBQ3hFLENBQUMsQ0FBQyxDQUFDMEUsWUFBWSxDQUFDLGVBQWUsRUFBRTFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkR3RSxlQUFlLENBQUN4RSxDQUFDLENBQUMsQ0FBQzJFLE9BQU8sR0FBRzNELGlCQUFpQjtFQUMvQzs7RUFFQTtFQUNBLElBQUk0RCxRQUFRLEdBQUczQyxtQkFBbUIsQ0FBQyxDQUFDO0VBQ3BDLElBQUkyQyxRQUFRLENBQUNWLEdBQUcsSUFBSVUsUUFBUSxDQUFDcEMsR0FBRyxFQUFFO0lBQ2pDUixjQUFjLENBQUM0QyxRQUFRLENBQUNWLEdBQUcsRUFBRU0sZUFBZSxDQUFDSSxRQUFRLENBQUNwQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztFQUM1RTtBQUNELENBQUM7O0FBRUQ7QUFDQXJELHFCQUFxQixDQUFDLGFBQWEsQ0FBQzs7Ozs7Ozs7Ozs7QUMvTXZCO0FBQ2Isa0JBQWtCLG1CQUFPLENBQUMsaUZBQTBCO0FBQ3BELGNBQWMsbUJBQU8sQ0FBQywyRUFBdUI7O0FBRTdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsaUJBQWlCO0FBQzNELElBQUk7QUFDSjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osRUFBRTtBQUNGO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFCYTtBQUNiLDRCQUE0QixtQkFBTyxDQUFDLHFHQUFvQztBQUN4RSxpQkFBaUIsbUJBQU8sQ0FBQyxpRkFBMEI7QUFDbkQsaUJBQWlCLG1CQUFPLENBQUMsaUZBQTBCO0FBQ25ELHNCQUFzQixtQkFBTyxDQUFDLDZGQUFnQzs7QUFFOUQ7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxtQkFBbUI7O0FBRXBFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnQkFBZ0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0JhO0FBQ2I7QUFDQSx5Q0FBeUM7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNQYTtBQUNiLGNBQWMsbUJBQU8sQ0FBQyxpRkFBMEI7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUmE7QUFDYixhQUFhLG1CQUFPLENBQUMsdUVBQXFCO0FBQzFDLFlBQVksbUJBQU8sQ0FBQyxxRUFBb0I7QUFDeEMsa0JBQWtCLG1CQUFPLENBQUMscUdBQW9DO0FBQzlELGVBQWUsbUJBQU8sQ0FBQyw2RUFBd0I7QUFDL0MsV0FBVyw2R0FBd0M7QUFDbkQsa0JBQWtCLG1CQUFPLENBQUMsaUZBQTBCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1Qyw4QkFBOEI7O0FBRXJFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOzs7Ozs7Ozs7Ozs7QUN0Qlc7QUFDYixrQkFBa0IsbUJBQU8sQ0FBQyxxR0FBb0M7QUFDOUQsNkJBQTZCLG1CQUFPLENBQUMsMkdBQXVDO0FBQzVFLGVBQWUsbUJBQU8sQ0FBQyw2RUFBd0I7QUFDL0Msa0JBQWtCLG1CQUFPLENBQUMsaUZBQTBCOztBQUVwRDtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLCtDQUErQztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0EseUJBQXlCLG9CQUFvQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlCYTtBQUNiLHNCQUFzQixtQkFBTyxDQUFDLDZGQUFnQzs7QUFFOUQ7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDUmE7QUFDYixjQUFjLG1CQUFPLENBQUMseUVBQXNCOztBQUU1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUmE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0hhO0FBQ2IsUUFBUSxtQkFBTyxDQUFDLHVFQUFxQjtBQUNyQyxlQUFlLG1CQUFPLENBQUMsNkVBQXdCO0FBQy9DLHdCQUF3QixtQkFBTyxDQUFDLG1HQUFtQztBQUNuRSxxQkFBcUIsbUJBQU8sQ0FBQywyRkFBK0I7QUFDNUQsK0JBQStCLG1CQUFPLENBQUMsbUhBQTJDO0FBQ2xGLFlBQVksbUJBQU8sQ0FBQyxxRUFBb0I7O0FBRXhDO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsaUJBQWlCO0FBQzNELElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUksd0RBQXdEO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ3pDWTtBQUNiLFFBQVEsbUJBQU8sQ0FBQyx1RUFBcUI7QUFDckMsZ0JBQWdCLG1CQUFPLENBQUMsMkZBQStCOztBQUV2RDtBQUNBO0FBQ0EsSUFBSSw4Q0FBOEM7QUFDbEQ7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Nob29sLWFwcC8uL2Fzc2V0cy9qcy9waG90by9waG90by5pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2hvb2wtYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LXNldC1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vc2Nob29sLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLmpzIiwid2VicGFjazovL3NjaG9vbC1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9lcy1ub3QtZXhjZWVkLXNhZmUtaW50ZWdlci5qcyIsIndlYnBhY2s6Ly9zY2hvb2wtYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWFycmF5LmpzIiwid2VicGFjazovL3NjaG9vbC1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbnVtYmVyLXBhcnNlLWludC5qcyIsIndlYnBhY2s6Ly9zY2hvb2wtYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy10cmltLmpzIiwid2VicGFjazovL3NjaG9vbC1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwid2VicGFjazovL3NjaG9vbC1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLmpzIiwid2VicGFjazovL3NjaG9vbC1hcHAvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2hpdGVzcGFjZXMuanMiLCJ3ZWJwYWNrOi8vc2Nob29sLWFwcC8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkucHVzaC5qcyIsIndlYnBhY2s6Ly9zY2hvb2wtYXBwLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5wYXJzZS1pbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gUHJvZHVjdHMgZ2FsbGVyeVxyXG5cclxudmFyIGluaXRQaG90b1N3aXBlRnJvbURPTSA9IGZ1bmN0aW9uKGdhbGxlcnlTZWxlY3Rvcikge1xyXG5cdFxyXG5cdC8vIHBhcnNlIHNsaWRlIGRhdGEgKHVybCwgdGl0bGUsIHNpemUgLi4uKSBmcm9tIERPTSBlbGVtZW50c1xyXG5cdC8vIChjaGlsZHJlbiBvZiBnYWxsZXJ5U2VsZWN0b3IpXHJcblx0dmFyIHBhcnNlVGh1bWJuYWlsRWxlbWVudHMgPSBmdW5jdGlvbihlbCkge1xyXG5cdFx0dmFyIHRodW1iRWxlbWVudHMgPSBlbC5jaGlsZE5vZGVzLFxyXG5cdFx0XHRudW1Ob2RlcyA9IHRodW1iRWxlbWVudHMubGVuZ3RoLFxyXG5cdFx0XHRpdGVtcyA9IFtdLFxyXG5cdFx0XHRmaWd1cmVFbCxcclxuXHRcdFx0bGlua0VsLFxyXG5cdFx0XHRzaXplLFxyXG5cdFx0XHRpdGVtO1xyXG5cdFx0XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG51bU5vZGVzOyBpKyspIHtcclxuXHRcdFx0XHJcblx0XHRcdGZpZ3VyZUVsID0gdGh1bWJFbGVtZW50c1tpXTsgLy8gPGZpZ3VyZT4gZWxlbWVudFxyXG5cdFx0XHQvLyBpbmNsdWRlIG9ubHkgZWxlbWVudCBub2Rlc1xyXG5cdFx0XHRpZiAoZmlndXJlRWwubm9kZVR5cGUgIT09IDEpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0bGlua0VsID0gZmlndXJlRWwuY2hpbGRyZW5bMF07IC8vIDxhPiBlbGVtZW50XHJcblx0XHRcdFxyXG5cdFx0XHRzaXplID0gbGlua0VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zaXplJykuc3BsaXQoJ3gnKTtcclxuXHRcdFx0XHJcblx0XHRcdC8vIGNyZWF0ZSBzbGlkZSBvYmplY3RcclxuXHRcdFx0aXRlbSA9IHtcclxuXHRcdFx0XHRzcmM6IGxpbmtFbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcclxuXHRcdFx0XHR3OiBwYXJzZUludChzaXplWzBdLCAxMCksXHJcblx0XHRcdFx0aDogcGFyc2VJbnQoc2l6ZVsxXSwgMTApXHJcblx0XHRcdH07XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoZmlndXJlRWwuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdC8vIDxmaWdjYXB0aW9uPiBjb250ZW50XHJcblx0XHRcdFx0aXRlbS50aXRsZSA9IGZpZ3VyZUVsLmNoaWxkcmVuWzFdLmlubmVySFRNTDtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYgKGxpbmtFbC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0Ly8gPGltZz4gdGh1bWJuYWlsIGVsZW1lbnQsIHJldHJpZXZpbmcgdGh1bWJuYWlsIHVybFxyXG5cdFx0XHRcdGl0ZW0ubXNyYyA9IGxpbmtFbC5jaGlsZHJlblswXS5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpdGVtLmVsID0gZmlndXJlRWw7IC8vIHNhdmUgbGluayB0byBlbGVtZW50IGZvciBnZXRUaHVtYkJvdW5kc0ZuXHJcblx0XHRcdGl0ZW1zLnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBpdGVtcztcclxuXHR9O1xyXG5cdFxyXG5cdC8vIGZpbmQgbmVhcmVzdCBwYXJlbnQgZWxlbWVudFxyXG5cdHZhciBjbG9zZXN0ID0gZnVuY3Rpb24gY2xvc2VzdChlbCwgZm4pIHtcclxuXHRcdHJldHVybiBlbCAmJiAoZm4oZWwpID8gZWwgOiBjbG9zZXN0KGVsLnBhcmVudE5vZGUsIGZuKSk7XHJcblx0fTtcclxuXHRcclxuXHQvLyB0cmlnZ2VycyB3aGVuIHVzZXIgY2xpY2tzIG9uIHRodW1ibmFpbFxyXG5cdHZhciBvblRodW1ibmFpbHNDbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcclxuXHRcdGUucHJldmVudERlZmF1bHQgPyBlLnByZXZlbnREZWZhdWx0KCkgOiBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcblx0XHRcclxuXHRcdHZhciBlVGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xyXG5cdFx0XHJcblx0XHQvLyBmaW5kIHJvb3QgZWxlbWVudCBvZiBzbGlkZVxyXG5cdFx0dmFyIGNsaWNrZWRMaXN0SXRlbSA9IGNsb3Nlc3QoZVRhcmdldCwgZnVuY3Rpb24oZWwpIHtcclxuXHRcdFx0cmV0dXJuIChlbC50YWdOYW1lICYmIGVsLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0ZJR1VSRScpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdGlmICghY2xpY2tlZExpc3RJdGVtKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Ly8gZmluZCBpbmRleCBvZiBjbGlja2VkIGl0ZW0gYnkgbG9vcGluZyB0aHJvdWdoIGFsbCBjaGlsZCBub2Rlc1xyXG5cdFx0Ly8gYWx0ZXJuYXRpdmVseSwgeW91IG1heSBkZWZpbmUgaW5kZXggdmlhIGRhdGEtIGF0dHJpYnV0ZVxyXG5cdFx0dmFyIGNsaWNrZWRHYWxsZXJ5ID0gY2xpY2tlZExpc3RJdGVtLnBhcmVudE5vZGUsXHJcblx0XHRcdGNoaWxkTm9kZXMgPSBjbGlja2VkTGlzdEl0ZW0ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLFxyXG5cdFx0XHRudW1DaGlsZE5vZGVzID0gY2hpbGROb2Rlcy5sZW5ndGgsXHJcblx0XHRcdG5vZGVJbmRleCA9IDAsXHJcblx0XHRcdGluZGV4O1xyXG5cdFx0XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG51bUNoaWxkTm9kZXM7IGkrKykge1xyXG5cdFx0XHRpZiAoY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSAhPT0gMSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoY2hpbGROb2Rlc1tpXSA9PT0gY2xpY2tlZExpc3RJdGVtKSB7XHJcblx0XHRcdFx0aW5kZXggPSBub2RlSW5kZXg7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0bm9kZUluZGV4Kys7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHQvLyBvcGVuIFBob3RvU3dpcGUgaWYgdmFsaWQgaW5kZXggZm91bmRcclxuXHRcdFx0b3BlblBob3RvU3dpcGUoaW5kZXgsIGNsaWNrZWRHYWxsZXJ5KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9O1xyXG5cdFxyXG5cdC8vIHBhcnNlIHBpY3R1cmUgaW5kZXggYW5kIGdhbGxlcnkgaW5kZXggZnJvbSBVUkwgKCMmcGlkPTEmZ2lkPTIpXHJcblx0dmFyIHBob3Rvc3dpcGVQYXJzZUhhc2ggPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpLFxyXG5cdFx0XHRwYXJhbXMgPSB7fTtcclxuXHRcdFxyXG5cdFx0aWYgKGhhc2gubGVuZ3RoIDwgNSkge1xyXG5cdFx0XHRyZXR1cm4gcGFyYW1zO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR2YXIgdmFycyA9IGhhc2guc3BsaXQoJyYnKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoIXZhcnNbaV0pIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoJz0nKTtcclxuXHRcdFx0aWYgKHBhaXIubGVuZ3RoIDwgMikge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHBhcmFtc1twYWlyWzBdXSA9IHBhaXJbMV07XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmIChwYXJhbXMuZ2lkKSB7XHJcblx0XHRcdHBhcmFtcy5naWQgPSBwYXJzZUludChwYXJhbXMuZ2lkLCAxMCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBwYXJhbXM7XHJcblx0fTtcclxuXHRcclxuXHR2YXIgb3BlblBob3RvU3dpcGUgPSBmdW5jdGlvbihpbmRleCwgZ2FsbGVyeUVsZW1lbnQsIGRpc2FibGVBbmltYXRpb24sIGZyb21VUkwpIHtcclxuXHRcdHZhciBwc3dwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wc3dwJylbMF0sXHJcblx0XHRcdGdhbGxlcnksXHJcblx0XHRcdG9wdGlvbnMsXHJcblx0XHRcdGl0ZW1zO1xyXG5cdFx0XHJcblx0XHRpdGVtcyA9IHBhcnNlVGh1bWJuYWlsRWxlbWVudHMoZ2FsbGVyeUVsZW1lbnQpO1xyXG5cdFx0XHJcblx0XHQvLyBkZWZpbmUgb3B0aW9ucyAoaWYgbmVlZGVkKVxyXG5cdFx0b3B0aW9ucyA9IHtcclxuXHRcdFx0XHJcblx0XHRcdC8vIGRlZmluZSBnYWxsZXJ5IGluZGV4IChmb3IgVVJMKVxyXG5cdFx0XHRnYWxsZXJ5VUlEOiBnYWxsZXJ5RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHN3cC11aWQnKSxcclxuXHRcdFx0XHJcblx0XHRcdGdldFRodW1iQm91bmRzRm46IGZ1bmN0aW9uKGluZGV4KSB7XHJcblx0XHRcdFx0Ly8gU2VlIE9wdGlvbnMgLT4gZ2V0VGh1bWJCb3VuZHNGbiBzZWN0aW9uIG9mIGRvY3VtZW50YXRpb24gZm9yIG1vcmUgaW5mb1xyXG5cdFx0XHRcdHZhciB0aHVtYm5haWwgPSBpdGVtc1tpbmRleF0uZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLCAvLyBmaW5kIHRodW1ibmFpbFxyXG5cdFx0XHRcdFx0cGFnZVlTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcclxuXHRcdFx0XHRcdHJlY3QgPSB0aHVtYm5haWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdHg6IHJlY3QubGVmdCxcclxuXHRcdFx0XHRcdHk6IHJlY3QudG9wICsgcGFnZVlTY3JvbGwsXHJcblx0XHRcdFx0XHR3OiByZWN0LndpZHRoXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH07XHJcblx0XHRcclxuXHRcdC8vIFBob3RvU3dpcGUgb3BlbmVkIGZyb20gVVJMXHJcblx0XHRpZiAoZnJvbVVSTCkge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5nYWxsZXJ5UElEcykge1xyXG5cdFx0XHRcdC8vIHBhcnNlIHJlYWwgaW5kZXggd2hlbiBjdXN0b20gUElEcyBhcmUgdXNlZFxyXG5cdFx0XHRcdC8vIGh0dHA6Ly9waG90b3N3aXBlLmNvbS9kb2N1bWVudGF0aW9uL2ZhcS5odG1sI2N1c3RvbS1waWQtaW4tdXJsXHJcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBpdGVtcy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0aWYgKGl0ZW1zW2pdLnBpZCA9PSBpbmRleCkge1xyXG5cdFx0XHRcdFx0XHRvcHRpb25zLmluZGV4ID0gajtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIGluIFVSTCBpbmRleGVzIHN0YXJ0IGZyb20gMVxyXG5cdFx0XHRcdG9wdGlvbnMuaW5kZXggPSBwYXJzZUludChpbmRleCwgMTApIC0gMTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0b3B0aW9ucy5pbmRleCA9IHBhcnNlSW50KGluZGV4LCAxMCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8vIGV4aXQgaWYgaW5kZXggbm90IGZvdW5kXHJcblx0XHRpZiAoaXNOYU4ob3B0aW9ucy5pbmRleCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiAoZGlzYWJsZUFuaW1hdGlvbikge1xyXG5cdFx0XHRvcHRpb25zLnNob3dBbmltYXRpb25EdXJhdGlvbiA9IDA7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8vIFBhc3MgZGF0YSB0byBQaG90b1N3aXBlIGFuZCBpbml0aWFsaXplIGl0XHJcblx0XHRnYWxsZXJ5ID0gbmV3IFBob3RvU3dpcGUocHN3cEVsZW1lbnQsIFBob3RvU3dpcGVVSV9EZWZhdWx0LCBpdGVtcywgb3B0aW9ucyk7XHJcblx0XHRnYWxsZXJ5LmluaXQoKTtcclxuXHR9O1xyXG5cdFxyXG5cdC8vIGxvb3AgdGhyb3VnaCBhbGwgZ2FsbGVyeSBlbGVtZW50cyBhbmQgYmluZCBldmVudHNcclxuXHR2YXIgZ2FsbGVyeUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChnYWxsZXJ5U2VsZWN0b3IpO1xyXG5cdFxyXG5cdGZvciAodmFyIGkgPSAwLCBsID0gZ2FsbGVyeUVsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG5cdFx0Z2FsbGVyeUVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS1wc3dwLXVpZCcsIGkgKyAxKTtcclxuXHRcdGdhbGxlcnlFbGVtZW50c1tpXS5vbmNsaWNrID0gb25UaHVtYm5haWxzQ2xpY2s7XHJcblx0fVxyXG5cdFxyXG5cdC8vIFBhcnNlIFVSTCBhbmQgb3BlbiBnYWxsZXJ5IGlmIGl0IGNvbnRhaW5zICMmcGlkPTMmZ2lkPTFcclxuXHR2YXIgaGFzaERhdGEgPSBwaG90b3N3aXBlUGFyc2VIYXNoKCk7XHJcblx0aWYgKGhhc2hEYXRhLnBpZCAmJiBoYXNoRGF0YS5naWQpIHtcclxuXHRcdG9wZW5QaG90b1N3aXBlKGhhc2hEYXRhLnBpZCwgZ2FsbGVyeUVsZW1lbnRzW2hhc2hEYXRhLmdpZCAtIDFdLCB0cnVlLCB0cnVlKTtcclxuXHR9XHJcbn07XHJcblxyXG4vLyBleGVjdXRlIGFib3ZlIGZ1bmN0aW9uXHJcbmluaXRQaG90b1N3aXBlRnJvbURPTSgnLm15LWdhbGxlcnknKTsiLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIFNhZmFyaSA8IDEzIGRvZXMgbm90IHRocm93IGFuIGVycm9yIGluIHRoaXMgY2FzZVxudmFyIFNJTEVOVF9PTl9OT05fV1JJVEFCTEVfTEVOR1RIX1NFVCA9IERFU0NSSVBUT1JTICYmICFmdW5jdGlvbiAoKSB7XG4gIC8vIG1ha2VzIG5vIHNlbnNlIHdpdGhvdXQgcHJvcGVyIHN0cmljdCBtb2RlIHN1cHBvcnRcbiAgaWYgKHRoaXMgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHRydWU7XG4gIHRyeSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFtdLCAnbGVuZ3RoJywgeyB3cml0YWJsZTogZmFsc2UgfSkubGVuZ3RoID0gMTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBUeXBlRXJyb3I7XG4gIH1cbn0oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTSUxFTlRfT05fTk9OX1dSSVRBQkxFX0xFTkdUSF9TRVQgPyBmdW5jdGlvbiAoTywgbGVuZ3RoKSB7XG4gIGlmIChpc0FycmF5KE8pICYmICFnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgJ2xlbmd0aCcpLndyaXRhYmxlKSB7XG4gICAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJ0Nhbm5vdCBzZXQgcmVhZCBvbmx5IC5sZW5ndGgnKTtcbiAgfSByZXR1cm4gTy5sZW5ndGggPSBsZW5ndGg7XG59IDogZnVuY3Rpb24gKE8sIGxlbmd0aCkge1xuICByZXR1cm4gTy5sZW5ndGggPSBsZW5ndGg7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIENPUlJFQ1RfQVJHVU1FTlRTID0gY2xhc3NvZlJhdyhmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8gY2xhc3NvZlJhdyA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgdGFnLCByZXN1bHQ7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mICh0YWcgPSB0cnlHZXQoTyA9ICRPYmplY3QoaXQpLCBUT19TVFJJTkdfVEFHKSkgPT0gJ3N0cmluZycgPyB0YWdcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IENPUlJFQ1RfQVJHVU1FTlRTID8gY2xhc3NvZlJhdyhPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChyZXN1bHQgPSBjbGFzc29mUmF3KE8pKSA9PT0gJ09iamVjdCcgJiYgaXNDYWxsYWJsZShPLmNhbGxlZSkgPyAnQXJndW1lbnRzJyA6IHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gMHgxRkZGRkZGRkZGRkZGRjsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPiBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyAkVHlwZUVycm9yKCdNYXhpbXVtIGFsbG93ZWQgaW5kZXggZXhjZWVkZWQnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbi8vIGBJc0FycmF5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNhcnJheVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LWlzYXJyYXkgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoYXJndW1lbnQpID09PSAnQXJyYXknO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciB0cmltID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy10cmltJykudHJpbTtcbnZhciB3aGl0ZXNwYWNlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93aGl0ZXNwYWNlcycpO1xuXG52YXIgJHBhcnNlSW50ID0gZ2xvYmFsLnBhcnNlSW50O1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgSVRFUkFUT1IgPSBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIGhleCA9IC9eWystXT8weC9pO1xudmFyIGV4ZWMgPSB1bmN1cnJ5VGhpcyhoZXguZXhlYyk7XG52YXIgRk9SQ0VEID0gJHBhcnNlSW50KHdoaXRlc3BhY2VzICsgJzA4JykgIT09IDggfHwgJHBhcnNlSW50KHdoaXRlc3BhY2VzICsgJzB4MTYnKSAhPT0gMjJcbiAgLy8gTVMgRWRnZSAxOC0gYnJva2VuIHdpdGggYm94ZWQgc3ltYm9sc1xuICB8fCAoSVRFUkFUT1IgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHsgJHBhcnNlSW50KE9iamVjdChJVEVSQVRPUikpOyB9KSk7XG5cbi8vIGBwYXJzZUludGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXBhcnNlaW50LXN0cmluZy1yYWRpeFxubW9kdWxlLmV4cG9ydHMgPSBGT1JDRUQgPyBmdW5jdGlvbiBwYXJzZUludChzdHJpbmcsIHJhZGl4KSB7XG4gIHZhciBTID0gdHJpbSh0b1N0cmluZyhzdHJpbmcpKTtcbiAgcmV0dXJuICRwYXJzZUludChTLCAocmFkaXggPj4+IDApIHx8IChleGVjKGhleCwgUykgPyAxNiA6IDEwKSk7XG59IDogJHBhcnNlSW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgd2hpdGVzcGFjZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2hpdGVzcGFjZXMnKTtcblxudmFyIHJlcGxhY2UgPSB1bmN1cnJ5VGhpcygnJy5yZXBsYWNlKTtcbnZhciBsdHJpbSA9IFJlZ0V4cCgnXlsnICsgd2hpdGVzcGFjZXMgKyAnXSsnKTtcbnZhciBydHJpbSA9IFJlZ0V4cCgnKF58W14nICsgd2hpdGVzcGFjZXMgKyAnXSlbJyArIHdoaXRlc3BhY2VzICsgJ10rJCcpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW0sIHRyaW1TdGFydCwgdHJpbUVuZCwgdHJpbUxlZnQsIHRyaW1SaWdodCB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcykge1xuICAgIHZhciBzdHJpbmcgPSB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgaWYgKFRZUEUgJiAxKSBzdHJpbmcgPSByZXBsYWNlKHN0cmluZywgbHRyaW0sICcnKTtcbiAgICBpZiAoVFlQRSAmIDIpIHN0cmluZyA9IHJlcGxhY2Uoc3RyaW5nLCBydHJpbSwgJyQxJyk7XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS57IHRyaW1MZWZ0LCB0cmltU3RhcnQgfWAgbWV0aG9kc1xuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbXN0YXJ0XG4gIHN0YXJ0OiBjcmVhdGVNZXRob2QoMSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnsgdHJpbVJpZ2h0LCB0cmltRW5kIH1gIG1ldGhvZHNcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnRyaW1lbmRcbiAgZW5kOiBjcmVhdGVNZXRob2QoMiksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLnRyaW1gIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUudHJpbVxuICB0cmltOiBjcmVhdGVNZXRob2QoMylcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIHRlc3QgPSB7fTtcblxudGVzdFtUT19TVFJJTkdfVEFHXSA9ICd6JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdHJpbmcodGVzdCkgPT09ICdbb2JqZWN0IHpdJztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChjbGFzc29mKGFyZ3VtZW50KSA9PT0gJ1N5bWJvbCcpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGEgU3ltYm9sIHZhbHVlIHRvIGEgc3RyaW5nJyk7XG4gIHJldHVybiAkU3RyaW5nKGFyZ3VtZW50KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBhIHN0cmluZyBvZiBhbGwgdmFsaWQgdW5pY29kZSB3aGl0ZXNwYWNlc1xubW9kdWxlLmV4cG9ydHMgPSAnXFx1MDAwOVxcdTAwMEFcXHUwMDBCXFx1MDAwQ1xcdTAwMERcXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUyMDAwXFx1MjAwMVxcdTIwMDInICtcbiAgJ1xcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGJztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG52YXIgc2V0QXJyYXlMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc2V0LWxlbmd0aCcpO1xudmFyIGRvZXNOb3RFeGNlZWRTYWZlSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2VzLW5vdC1leGNlZWQtc2FmZS1pbnRlZ2VyJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIElOQ09SUkVDVF9UT19MRU5HVEggPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBbXS5wdXNoLmNhbGwoeyBsZW5ndGg6IDB4MTAwMDAwMDAwIH0sIDEpICE9PSA0Mjk0OTY3Mjk3O1xufSk7XG5cbi8vIFY4IGFuZCBTYWZhcmkgPD0gMTUuNCwgRkYgPCAyMyB0aHJvd3MgSW50ZXJuYWxFcnJvclxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MTI2ODFcbnZhciBwcm9wZXJFcnJvck9uTm9uV3JpdGFibGVMZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFtdLCAnbGVuZ3RoJywgeyB3cml0YWJsZTogZmFsc2UgfSkucHVzaCgpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIFR5cGVFcnJvcjtcbiAgfVxufTtcblxudmFyIEZPUkNFRCA9IElOQ09SUkVDVF9UT19MRU5HVEggfHwgIXByb3BlckVycm9yT25Ob25Xcml0YWJsZUxlbmd0aCgpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnB1c2hgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUucHVzaFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGFyaXR5OiAxLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gIHB1c2g6IGZ1bmN0aW9uIHB1c2goaXRlbSkge1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbiA9IGxlbmd0aE9mQXJyYXlMaWtlKE8pO1xuICAgIHZhciBhcmdDb3VudCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgZG9lc05vdEV4Y2VlZFNhZmVJbnRlZ2VyKGxlbiArIGFyZ0NvdW50KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ0NvdW50OyBpKyspIHtcbiAgICAgIE9bbGVuXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGxlbisrO1xuICAgIH1cbiAgICBzZXRBcnJheUxlbmd0aChPLCBsZW4pO1xuICAgIHJldHVybiBsZW47XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJHBhcnNlSW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL251bWJlci1wYXJzZS1pbnQnKTtcblxuLy8gYHBhcnNlSW50YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcGFyc2VpbnQtc3RyaW5nLXJhZGl4XG4kKHsgZ2xvYmFsOiB0cnVlLCBmb3JjZWQ6IHBhcnNlSW50ICE9PSAkcGFyc2VJbnQgfSwge1xuICBwYXJzZUludDogJHBhcnNlSW50XG59KTtcbiJdLCJuYW1lcyI6WyJpbml0UGhvdG9Td2lwZUZyb21ET00iLCJnYWxsZXJ5U2VsZWN0b3IiLCJwYXJzZVRodW1ibmFpbEVsZW1lbnRzIiwiZWwiLCJ0aHVtYkVsZW1lbnRzIiwiY2hpbGROb2RlcyIsIm51bU5vZGVzIiwibGVuZ3RoIiwiaXRlbXMiLCJmaWd1cmVFbCIsImxpbmtFbCIsInNpemUiLCJpdGVtIiwiaSIsIm5vZGVUeXBlIiwiY2hpbGRyZW4iLCJnZXRBdHRyaWJ1dGUiLCJzcGxpdCIsInNyYyIsInciLCJwYXJzZUludCIsImgiLCJ0aXRsZSIsImlubmVySFRNTCIsIm1zcmMiLCJwdXNoIiwiY2xvc2VzdCIsImZuIiwicGFyZW50Tm9kZSIsIm9uVGh1bWJuYWlsc0NsaWNrIiwiZSIsIndpbmRvdyIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJyZXR1cm5WYWx1ZSIsImVUYXJnZXQiLCJ0YXJnZXQiLCJzcmNFbGVtZW50IiwiY2xpY2tlZExpc3RJdGVtIiwidGFnTmFtZSIsInRvVXBwZXJDYXNlIiwiY2xpY2tlZEdhbGxlcnkiLCJudW1DaGlsZE5vZGVzIiwibm9kZUluZGV4IiwiaW5kZXgiLCJvcGVuUGhvdG9Td2lwZSIsInBob3Rvc3dpcGVQYXJzZUhhc2giLCJoYXNoIiwibG9jYXRpb24iLCJzdWJzdHJpbmciLCJwYXJhbXMiLCJ2YXJzIiwicGFpciIsImdpZCIsImdhbGxlcnlFbGVtZW50IiwiZGlzYWJsZUFuaW1hdGlvbiIsImZyb21VUkwiLCJwc3dwRWxlbWVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImdhbGxlcnkiLCJvcHRpb25zIiwiZ2FsbGVyeVVJRCIsImdldFRodW1iQm91bmRzRm4iLCJ0aHVtYm5haWwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInBhZ2VZU2Nyb2xsIiwicGFnZVlPZmZzZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwieCIsImxlZnQiLCJ5IiwidG9wIiwid2lkdGgiLCJnYWxsZXJ5UElEcyIsImoiLCJwaWQiLCJpc05hTiIsInNob3dBbmltYXRpb25EdXJhdGlvbiIsIlBob3RvU3dpcGUiLCJQaG90b1N3aXBlVUlfRGVmYXVsdCIsImluaXQiLCJnYWxsZXJ5RWxlbWVudHMiLCJsIiwic2V0QXR0cmlidXRlIiwib25jbGljayIsImhhc2hEYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==