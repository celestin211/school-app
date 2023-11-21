(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["bootstrap-notify"],{

/***/ "./assets/js/plugins/bootstrap-notify.js":
/*!***********************************************!*\
  !*** ./assets/js/plugins/bootstrap-notify.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");
__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
__webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.function.bind.js */ "./node_modules/core-js/modules/es.function.bind.js");
__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*



     Creative Tim Modifications

     Lines: 238, 239 was changed from top: 5px to top: 50% and we added margin-top: -13px. In this way the close button will be aligned vertically
     Line:222 - modified when the icon is set, we add the class "alert-with-icon", so there will be enough space for the icon.




*/

/*
 * Project: Bootstrap Notify = v3.1.5
 * Description: Turns standard Bootstrap alerts into "Growl-like" notifications.
 * Author: Mouse0270 aka Robert McIntosh
 * License: MIT License
 * Website: https://github.com/mouse0270/bootstrap-growl
 */

/* global define:false, require: false, jQuery:false */

(function (factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  // Create the defaults once
  var defaults = {
    element: 'body',
    position: null,
    type: "info",
    allow_dismiss: true,
    allow_duplicates: true,
    newest_on_top: false,
    showProgressbar: false,
    placement: {
      from: "top",
      align: "right"
    },
    offset: 20,
    spacing: 10,
    z_index: 1060,
    delay: 5000,
    timer: 1000,
    url_target: '_blank',
    mouse_over: null,
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    onShow: null,
    onShown: null,
    onClose: null,
    onClosed: null,
    onClick: null,
    icon_type: 'class',
    template: '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="tim-icons icon-simple-remove"></i></button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
  };
  String.format = function () {
    var args = arguments;
    var str = arguments[0];
    return str.replace(/(\{\{\d\}\}|\{\d\})/g, function (str) {
      if (str.substring(0, 2) === "{{") return str;
      var num = parseInt(str.match(/\d/)[0]);
      return args[num + 1];
    });
  };
  function isDuplicateNotification(notification) {
    var isDupe = false;
    $('[data-notify="container"]').each(function (i, el) {
      var $el = $(el);
      var title = $el.find('[data-notify="title"]').html().trim();
      var message = $el.find('[data-notify="message"]').html().trim();

      // The input string might be different than the actual parsed HTML string!
      // (<br> vs <br /> for example)
      // So we have to force-parse this as HTML here!
      var isSameTitle = title === $("<div>" + notification.settings.content.title + "</div>").html().trim();
      var isSameMsg = message === $("<div>" + notification.settings.content.message + "</div>").html().trim();
      var isSameType = $el.hasClass('alert-' + notification.settings.type);
      if (isSameTitle && isSameMsg && isSameType) {
        //we found the dupe. Set the var and stop checking.
        isDupe = true;
      }
      return !isDupe;
    });
    return isDupe;
  }
  function Notify(element, content, options) {
    // Setup Content of Notify
    var contentObj = {
      content: {
        message: _typeof(content) === 'object' ? content.message : content,
        title: content.title ? content.title : '',
        icon: content.icon ? content.icon : '',
        url: content.url ? content.url : '#',
        target: content.target ? content.target : '-'
      }
    };
    options = $.extend(true, {}, contentObj, options);
    this.settings = $.extend(true, {}, defaults, options);
    this._defaults = defaults;
    if (this.settings.content.target === "-") {
      this.settings.content.target = this.settings.url_target;
    }
    this.animations = {
      start: 'webkitAnimationStart oanimationstart MSAnimationStart animationstart',
      end: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
    };
    if (typeof this.settings.offset === 'number') {
      this.settings.offset = {
        x: this.settings.offset,
        y: this.settings.offset
      };
    }

    //if duplicate messages are not allowed, then only continue if this new message is not a duplicate of one that it already showing
    if (this.settings.allow_duplicates || !this.settings.allow_duplicates && !isDuplicateNotification(this)) {
      this.init();
    }
  }
  $.extend(Notify.prototype, {
    init: function init() {
      var self = this;
      this.buildNotify();
      if (this.settings.content.icon) {
        this.setIcon();
      }
      if (this.settings.content.url != "#") {
        this.styleURL();
      }
      this.styleDismiss();
      this.placement();
      this.bind();
      this.notify = {
        $ele: this.$ele,
        update: function update(command, _update) {
          var commands = {};
          if (typeof command === "string") {
            commands[command] = _update;
          } else {
            commands = command;
          }
          for (var cmd in commands) {
            switch (cmd) {
              case "type":
                this.$ele.removeClass('alert-' + self.settings.type);
                this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass('progress-bar-' + self.settings.type);
                self.settings.type = commands[cmd];
                this.$ele.addClass('alert-' + commands[cmd]).find('[data-notify="progressbar"] > .progress-bar').addClass('progress-bar-' + commands[cmd]);
                break;
              case "icon":
                var $icon = this.$ele.find('[data-notify="icon"]');
                if (self.settings.icon_type.toLowerCase() === 'class') {
                  $icon.removeClass(self.settings.content.icon).addClass(commands[cmd]);
                } else {
                  if (!$icon.is('img')) {
                    $icon.find('img');
                  }
                  $icon.attr('src', commands[cmd]);
                }
                self.settings.content.icon = commands[command];
                break;
              case "progress":
                var newDelay = self.settings.delay - self.settings.delay * (commands[cmd] / 100);
                this.$ele.data('notify-delay', newDelay);
                this.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', commands[cmd]).css('width', commands[cmd] + '%');
                break;
              case "url":
                this.$ele.find('[data-notify="url"]').attr('href', commands[cmd]);
                break;
              case "target":
                this.$ele.find('[data-notify="url"]').attr('target', commands[cmd]);
                break;
              default:
                this.$ele.find('[data-notify="' + cmd + '"]').html(commands[cmd]);
            }
          }
          var posX = this.$ele.outerHeight() + parseInt(self.settings.spacing) + parseInt(self.settings.offset.y);
          self.reposition(posX);
        },
        close: function close() {
          self.close();
        }
      };
    },
    buildNotify: function buildNotify() {
      var content = this.settings.content;
      this.$ele = $(String.format(this.settings.template, this.settings.type, content.title, content.message, content.url, content.target));
      this.$ele.attr('data-notify-position', this.settings.placement.from + '-' + this.settings.placement.align);
      if (!this.settings.allow_dismiss) {
        this.$ele.find('[data-notify="dismiss"]').css('display', 'none');
      }
      if (this.settings.delay <= 0 && !this.settings.showProgressbar || !this.settings.showProgressbar) {
        this.$ele.find('[data-notify="progressbar"]').remove();
      }
    },
    setIcon: function setIcon() {
      this.$ele.addClass('alert-with-icon');
      if (this.settings.icon_type.toLowerCase() === 'class') {
        this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon);
      } else {
        if (this.$ele.find('[data-notify="icon"]').is('img')) {
          this.$ele.find('[data-notify="icon"]').attr('src', this.settings.content.icon);
        } else {
          this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />');
        }
      }
    },
    styleDismiss: function styleDismiss() {
      this.$ele.find('[data-notify="dismiss"]').css({
        position: 'absolute',
        right: '10px',
        top: '50%',
        marginTop: '-13px',
        zIndex: this.settings.z_index + 2
      });
    },
    styleURL: function styleURL() {
      this.$ele.find('[data-notify="url"]').css({
        backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: this.settings.z_index + 1
      });
    },
    placement: function placement() {
      var self = this,
        offsetAmt = this.settings.offset.y,
        css = {
          display: 'inline-block',
          margin: '0px auto',
          position: this.settings.position ? this.settings.position : this.settings.element === 'body' ? 'fixed' : 'absolute',
          transition: 'all .5s ease-in-out',
          zIndex: this.settings.z_index
        },
        hasAnimation = false,
        settings = this.settings;
      $('[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
        offsetAmt = Math.max(offsetAmt, parseInt($(this).css(settings.placement.from)) + parseInt($(this).outerHeight()) + parseInt(settings.spacing));
      });
      if (this.settings.newest_on_top === true) {
        offsetAmt = this.settings.offset.y;
      }
      css[this.settings.placement.from] = offsetAmt + 'px';
      switch (this.settings.placement.align) {
        case "left":
        case "right":
          css[this.settings.placement.align] = this.settings.offset.x + 'px';
          break;
        case "center":
          css.left = 0;
          css.right = 0;
          break;
      }
      this.$ele.css(css).addClass(this.settings.animate.enter);
      $.each(Array('webkit-', 'moz-', 'o-', 'ms-', ''), function (index, prefix) {
        self.$ele[0].style[prefix + 'AnimationIterationCount'] = 1;
      });
      $(this.settings.element).append(this.$ele);
      if (this.settings.newest_on_top === true) {
        offsetAmt = parseInt(offsetAmt) + parseInt(this.settings.spacing) + this.$ele.outerHeight();
        this.reposition(offsetAmt);
      }
      if ($.isFunction(self.settings.onShow)) {
        self.settings.onShow.call(this.$ele);
      }
      this.$ele.one(this.animations.start, function () {
        hasAnimation = true;
      }).one(this.animations.end, function () {
        self.$ele.removeClass(self.settings.animate.enter);
        if ($.isFunction(self.settings.onShown)) {
          self.settings.onShown.call(this);
        }
      });
      setTimeout(function () {
        if (!hasAnimation) {
          if ($.isFunction(self.settings.onShown)) {
            self.settings.onShown.call(this);
          }
        }
      }, 600);
    },
    bind: function bind() {
      var self = this;
      this.$ele.find('[data-notify="dismiss"]').on('click', function () {
        self.close();
      });
      if ($.isFunction(self.settings.onClick)) {
        this.$ele.on('click', function (event) {
          if (event.target != self.$ele.find('[data-notify="dismiss"]')[0]) {
            self.settings.onClick.call(this, event);
          }
        });
      }
      this.$ele.mouseover(function () {
        $(this).data('data-hover', "true");
      }).mouseout(function () {
        $(this).data('data-hover', "false");
      });
      this.$ele.data('data-hover', "false");
      if (this.settings.delay > 0) {
        self.$ele.data('notify-delay', self.settings.delay);
        var timer = setInterval(function () {
          var delay = parseInt(self.$ele.data('notify-delay')) - self.settings.timer;
          if (self.$ele.data('data-hover') === 'false' && self.settings.mouse_over === "pause" || self.settings.mouse_over != "pause") {
            var percent = (self.settings.delay - delay) / self.settings.delay * 100;
            self.$ele.data('notify-delay', delay);
            self.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', percent).css('width', percent + '%');
          }
          if (delay <= -self.settings.timer) {
            clearInterval(timer);
            self.close();
          }
        }, self.settings.timer);
      }
    },
    close: function close() {
      var self = this,
        posX = parseInt(this.$ele.css(this.settings.placement.from)),
        hasAnimation = false;
      this.$ele.attr('data-closing', 'true').addClass(this.settings.animate.exit);
      self.reposition(posX);
      if ($.isFunction(self.settings.onClose)) {
        self.settings.onClose.call(this.$ele);
      }
      this.$ele.one(this.animations.start, function () {
        hasAnimation = true;
      }).one(this.animations.end, function () {
        $(this).remove();
        if ($.isFunction(self.settings.onClosed)) {
          self.settings.onClosed.call(this);
        }
      });
      setTimeout(function () {
        if (!hasAnimation) {
          self.$ele.remove();
          if (self.settings.onClosed) {
            self.settings.onClosed(self.$ele);
          }
        }
      }, 600);
    },
    reposition: function reposition(posX) {
      var self = this,
        notifies = '[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])',
        $elements = this.$ele.nextAll(notifies);
      if (this.settings.newest_on_top === true) {
        $elements = this.$ele.prevAll(notifies);
      }
      $elements.each(function () {
        $(this).css(self.settings.placement.from, posX);
        posX = parseInt(posX) + parseInt(self.settings.spacing) + $(this).outerHeight();
      });
    }
  });
  $.notify = function (content, options) {
    var plugin = new Notify(this, content, options);
    return plugin.notify;
  };
  $.notifyDefaults = function (options) {
    defaults = $.extend(true, {}, defaults, options);
    return defaults;
  };
  $.notifyClose = function (selector) {
    if (typeof selector === "undefined" || selector === "all") {
      $('[data-notify]').find('[data-notify="dismiss"]').trigger('click');
    } else if (selector === 'success' || selector === 'info' || selector === 'warning' || selector === 'danger') {
      $('.alert-' + selector + '[data-notify]').find('[data-notify="dismiss"]').trigger('click');
    } else if (selector) {
      $(selector + '[data-notify]').find('[data-notify="dismiss"]').trigger('click');
    } else {
      $('[data-notify-position="' + selector + '"]').find('[data-notify="dismiss"]').trigger('click');
    }
  };
  $.notifyCloseExcept = function (selector) {
    if (selector === 'success' || selector === 'info' || selector === 'warning' || selector === 'danger') {
      $('[data-notify]').not('.alert-' + selector).find('[data-notify="dismiss"]').trigger('click');
    } else {
      $('[data-notify]').not(selector).find('[data-notify="dismiss"]').trigger('click');
    }
  };
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_arra-9ca245","vendors-node_modules_core-js_modules_es_string_iterator_js-node_modules_core-js_modules_es_sy-0eab75","vendors-node_modules_core-js_internals_validate-arguments-length_js-node_modules_core-js_modu-f12916","vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_modules_es_array_find_js-node_modules_core-js_modules_es_functio-9daa37"], () => (__webpack_exec__("./assets/js/plugins/bootstrap-notify.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDMEYsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUMvRixDQUFDLE1BQU07TUFDTHpJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQzJJLEdBQUcsQ0FBQ0gsUUFBUSxDQUFDLENBQUN6RixJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQzBGLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDbkY7RUFDRixDQUFDO0FBR0gsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Nob29sLWFwcC8uL2Fzc2V0cy9qcy9wbHVnaW5zL2Jvb3RzdHJhcC1ub3RpZnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcblxuXG5cbiAgICAgQ3JlYXRpdmUgVGltIE1vZGlmaWNhdGlvbnNcblxuICAgICBMaW5lczogMjM4LCAyMzkgd2FzIGNoYW5nZWQgZnJvbSB0b3A6IDVweCB0byB0b3A6IDUwJSBhbmQgd2UgYWRkZWQgbWFyZ2luLXRvcDogLTEzcHguIEluIHRoaXMgd2F5IHRoZSBjbG9zZSBidXR0b24gd2lsbCBiZSBhbGlnbmVkIHZlcnRpY2FsbHlcbiAgICAgTGluZToyMjIgLSBtb2RpZmllZCB3aGVuIHRoZSBpY29uIGlzIHNldCwgd2UgYWRkIHRoZSBjbGFzcyBcImFsZXJ0LXdpdGgtaWNvblwiLCBzbyB0aGVyZSB3aWxsIGJlIGVub3VnaCBzcGFjZSBmb3IgdGhlIGljb24uXG5cblxuXG5cbiovXG5cblxuLypcbiAqIFByb2plY3Q6IEJvb3RzdHJhcCBOb3RpZnkgPSB2My4xLjVcbiAqIERlc2NyaXB0aW9uOiBUdXJucyBzdGFuZGFyZCBCb290c3RyYXAgYWxlcnRzIGludG8gXCJHcm93bC1saWtlXCIgbm90aWZpY2F0aW9ucy5cbiAqIEF1dGhvcjogTW91c2UwMjcwIGFrYSBSb2JlcnQgTWNJbnRvc2hcbiAqIExpY2Vuc2U6IE1JVCBMaWNlbnNlXG4gKiBXZWJzaXRlOiBodHRwczovL2dpdGh1Yi5jb20vbW91c2UwMjcwL2Jvb3RzdHJhcC1ncm93bFxuICovXG5cbi8qIGdsb2JhbCBkZWZpbmU6ZmFsc2UsIHJlcXVpcmU6IGZhbHNlLCBqUXVlcnk6ZmFsc2UgKi9cblxuKGZ1bmN0aW9uKGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gTm9kZS9Db21tb25KU1xuICAgIGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgfVxufShmdW5jdGlvbigkKSB7XG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgZWxlbWVudDogJ2JvZHknLFxuICAgIHBvc2l0aW9uOiBudWxsLFxuICAgIHR5cGU6IFwiaW5mb1wiLFxuICAgIGFsbG93X2Rpc21pc3M6IHRydWUsXG4gICAgYWxsb3dfZHVwbGljYXRlczogdHJ1ZSxcbiAgICBuZXdlc3Rfb25fdG9wOiBmYWxzZSxcbiAgICBzaG93UHJvZ3Jlc3NiYXI6IGZhbHNlLFxuICAgIHBsYWNlbWVudDoge1xuICAgICAgZnJvbTogXCJ0b3BcIixcbiAgICAgIGFsaWduOiBcInJpZ2h0XCJcbiAgICB9LFxuICAgIG9mZnNldDogMjAsXG4gICAgc3BhY2luZzogMTAsXG4gICAgel9pbmRleDogMTA2MCxcbiAgICBkZWxheTogNTAwMCxcbiAgICB0aW1lcjogMTAwMCxcbiAgICB1cmxfdGFyZ2V0OiAnX2JsYW5rJyxcbiAgICBtb3VzZV9vdmVyOiBudWxsLFxuICAgIGFuaW1hdGU6IHtcbiAgICAgIGVudGVyOiAnYW5pbWF0ZWQgZmFkZUluRG93bicsXG4gICAgICBleGl0OiAnYW5pbWF0ZWQgZmFkZU91dFVwJ1xuICAgIH0sXG4gICAgb25TaG93OiBudWxsLFxuICAgIG9uU2hvd246IG51bGwsXG4gICAgb25DbG9zZTogbnVsbCxcbiAgICBvbkNsb3NlZDogbnVsbCxcbiAgICBvbkNsaWNrOiBudWxsLFxuICAgIGljb25fdHlwZTogJ2NsYXNzJyxcbiAgICB0ZW1wbGF0ZTogJzxkaXYgZGF0YS1ub3RpZnk9XCJjb250YWluZXJcIiBjbGFzcz1cImNvbC14cy0xMSBjb2wtc20tNCBhbGVydCBhbGVydC17MH1cIiByb2xlPVwiYWxlcnRcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCI+PGkgY2xhc3M9XCJ0aW0taWNvbnMgaWNvbi1zaW1wbGUtcmVtb3ZlXCI+PC9pPjwvYnV0dG9uPjxzcGFuIGRhdGEtbm90aWZ5PVwiaWNvblwiPjwvc3Bhbj4gPHNwYW4gZGF0YS1ub3RpZnk9XCJ0aXRsZVwiPnsxfTwvc3Bhbj4gPHNwYW4gZGF0YS1ub3RpZnk9XCJtZXNzYWdlXCI+ezJ9PC9zcGFuPjxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiIGRhdGEtbm90aWZ5PVwicHJvZ3Jlc3NiYXJcIj48ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci17MH1cIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbm93PVwiMFwiIGFyaWEtdmFsdWVtaW49XCIwXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiIHN0eWxlPVwid2lkdGg6IDAlO1wiPjwvZGl2PjwvZGl2PjxhIGhyZWY9XCJ7M31cIiB0YXJnZXQ9XCJ7NH1cIiBkYXRhLW5vdGlmeT1cInVybFwiPjwvYT48L2Rpdj4nXG4gIH07XG5cbiAgU3RyaW5nLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBzdHIgPSBhcmd1bWVudHNbMF07XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXFx7XFx7XFxkXFx9XFx9fFxce1xcZFxcfSkvZywgZnVuY3Rpb24oc3RyKSB7XG4gICAgICBpZiAoc3RyLnN1YnN0cmluZygwLCAyKSA9PT0gXCJ7e1wiKSByZXR1cm4gc3RyO1xuICAgICAgdmFyIG51bSA9IHBhcnNlSW50KHN0ci5tYXRjaCgvXFxkLylbMF0pO1xuICAgICAgcmV0dXJuIGFyZ3NbbnVtICsgMV07XG4gICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNEdXBsaWNhdGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uKSB7XG4gICAgdmFyIGlzRHVwZSA9IGZhbHNlO1xuXG4gICAgJCgnW2RhdGEtbm90aWZ5PVwiY29udGFpbmVyXCJdJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xuICAgICAgdmFyICRlbCA9ICQoZWwpO1xuICAgICAgdmFyIHRpdGxlID0gJGVsLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInRpdGxlXCJdJykuaHRtbCgpLnRyaW0oKTtcbiAgICAgIHZhciBtZXNzYWdlID0gJGVsLmZpbmQoJ1tkYXRhLW5vdGlmeT1cIm1lc3NhZ2VcIl0nKS5odG1sKCkudHJpbSgpO1xuXG4gICAgICAvLyBUaGUgaW5wdXQgc3RyaW5nIG1pZ2h0IGJlIGRpZmZlcmVudCB0aGFuIHRoZSBhY3R1YWwgcGFyc2VkIEhUTUwgc3RyaW5nIVxuICAgICAgLy8gKDxicj4gdnMgPGJyIC8+IGZvciBleGFtcGxlKVxuICAgICAgLy8gU28gd2UgaGF2ZSB0byBmb3JjZS1wYXJzZSB0aGlzIGFzIEhUTUwgaGVyZSFcbiAgICAgIHZhciBpc1NhbWVUaXRsZSA9IHRpdGxlID09PSAkKFwiPGRpdj5cIiArIG5vdGlmaWNhdGlvbi5zZXR0aW5ncy5jb250ZW50LnRpdGxlICsgXCI8L2Rpdj5cIikuaHRtbCgpLnRyaW0oKTtcbiAgICAgIHZhciBpc1NhbWVNc2cgPSBtZXNzYWdlID09PSAkKFwiPGRpdj5cIiArIG5vdGlmaWNhdGlvbi5zZXR0aW5ncy5jb250ZW50Lm1lc3NhZ2UgKyBcIjwvZGl2PlwiKS5odG1sKCkudHJpbSgpO1xuICAgICAgdmFyIGlzU2FtZVR5cGUgPSAkZWwuaGFzQ2xhc3MoJ2FsZXJ0LScgKyBub3RpZmljYXRpb24uc2V0dGluZ3MudHlwZSk7XG5cbiAgICAgIGlmIChpc1NhbWVUaXRsZSAmJiBpc1NhbWVNc2cgJiYgaXNTYW1lVHlwZSkge1xuICAgICAgICAvL3dlIGZvdW5kIHRoZSBkdXBlLiBTZXQgdGhlIHZhciBhbmQgc3RvcCBjaGVja2luZy5cbiAgICAgICAgaXNEdXBlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAhaXNEdXBlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlzRHVwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIE5vdGlmeShlbGVtZW50LCBjb250ZW50LCBvcHRpb25zKSB7XG4gICAgLy8gU2V0dXAgQ29udGVudCBvZiBOb3RpZnlcbiAgICB2YXIgY29udGVudE9iaiA9IHtcbiAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgbWVzc2FnZTogdHlwZW9mIGNvbnRlbnQgPT09ICdvYmplY3QnID8gY29udGVudC5tZXNzYWdlIDogY29udGVudCxcbiAgICAgICAgdGl0bGU6IGNvbnRlbnQudGl0bGUgPyBjb250ZW50LnRpdGxlIDogJycsXG4gICAgICAgIGljb246IGNvbnRlbnQuaWNvbiA/IGNvbnRlbnQuaWNvbiA6ICcnLFxuICAgICAgICB1cmw6IGNvbnRlbnQudXJsID8gY29udGVudC51cmwgOiAnIycsXG4gICAgICAgIHRhcmdldDogY29udGVudC50YXJnZXQgPyBjb250ZW50LnRhcmdldCA6ICctJ1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIGNvbnRlbnRPYmosIG9wdGlvbnMpO1xuICAgIHRoaXMuc2V0dGluZ3MgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udGVudC50YXJnZXQgPT09IFwiLVwiKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmNvbnRlbnQudGFyZ2V0ID0gdGhpcy5zZXR0aW5ncy51cmxfdGFyZ2V0O1xuICAgIH1cbiAgICB0aGlzLmFuaW1hdGlvbnMgPSB7XG4gICAgICBzdGFydDogJ3dlYmtpdEFuaW1hdGlvblN0YXJ0IG9hbmltYXRpb25zdGFydCBNU0FuaW1hdGlvblN0YXJ0IGFuaW1hdGlvbnN0YXJ0JyxcbiAgICAgIGVuZDogJ3dlYmtpdEFuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kIE1TQW5pbWF0aW9uRW5kIGFuaW1hdGlvbmVuZCdcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzLm9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3Mub2Zmc2V0ID0ge1xuICAgICAgICB4OiB0aGlzLnNldHRpbmdzLm9mZnNldCxcbiAgICAgICAgeTogdGhpcy5zZXR0aW5ncy5vZmZzZXRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy9pZiBkdXBsaWNhdGUgbWVzc2FnZXMgYXJlIG5vdCBhbGxvd2VkLCB0aGVuIG9ubHkgY29udGludWUgaWYgdGhpcyBuZXcgbWVzc2FnZSBpcyBub3QgYSBkdXBsaWNhdGUgb2Ygb25lIHRoYXQgaXQgYWxyZWFkeSBzaG93aW5nXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYWxsb3dfZHVwbGljYXRlcyB8fCAoIXRoaXMuc2V0dGluZ3MuYWxsb3dfZHVwbGljYXRlcyAmJiAhaXNEdXBsaWNhdGVOb3RpZmljYXRpb24odGhpcykpKSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gIH1cblxuICAkLmV4dGVuZChOb3RpZnkucHJvdG90eXBlLCB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuYnVpbGROb3RpZnkoKTtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRlbnQuaWNvbikge1xuICAgICAgICB0aGlzLnNldEljb24oKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRlbnQudXJsICE9IFwiI1wiKSB7XG4gICAgICAgIHRoaXMuc3R5bGVVUkwoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3R5bGVEaXNtaXNzKCk7XG4gICAgICB0aGlzLnBsYWNlbWVudCgpO1xuICAgICAgdGhpcy5iaW5kKCk7XG5cbiAgICAgIHRoaXMubm90aWZ5ID0ge1xuICAgICAgICAkZWxlOiB0aGlzLiRlbGUsXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24oY29tbWFuZCwgdXBkYXRlKSB7XG4gICAgICAgICAgdmFyIGNvbW1hbmRzID0ge307XG4gICAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb21tYW5kc1tjb21tYW5kXSA9IHVwZGF0ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tbWFuZHMgPSBjb21tYW5kO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKHZhciBjbWQgaW4gY29tbWFuZHMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoY21kKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJ0eXBlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlLnJlbW92ZUNsYXNzKCdhbGVydC0nICsgc2VsZi5zZXR0aW5ncy50eXBlKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwicHJvZ3Jlc3NiYXJcIl0gPiAucHJvZ3Jlc3MtYmFyJykucmVtb3ZlQ2xhc3MoJ3Byb2dyZXNzLWJhci0nICsgc2VsZi5zZXR0aW5ncy50eXBlKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNldHRpbmdzLnR5cGUgPSBjb21tYW5kc1tjbWRdO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5hZGRDbGFzcygnYWxlcnQtJyArIGNvbW1hbmRzW2NtZF0pLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInByb2dyZXNzYmFyXCJdID4gLnByb2dyZXNzLWJhcicpLmFkZENsYXNzKCdwcm9ncmVzcy1iYXItJyArIGNvbW1hbmRzW2NtZF0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwiaWNvblwiOlxuICAgICAgICAgICAgICAgIHZhciAkaWNvbiA9IHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJpY29uXCJdJyk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2V0dGluZ3MuaWNvbl90eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdjbGFzcycpIHtcbiAgICAgICAgICAgICAgICAgICRpY29uLnJlbW92ZUNsYXNzKHNlbGYuc2V0dGluZ3MuY29udGVudC5pY29uKS5hZGRDbGFzcyhjb21tYW5kc1tjbWRdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKCEkaWNvbi5pcygnaW1nJykpIHtcbiAgICAgICAgICAgICAgICAgICAgJGljb24uZmluZCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAkaWNvbi5hdHRyKCdzcmMnLCBjb21tYW5kc1tjbWRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5jb250ZW50Lmljb24gPSBjb21tYW5kc1tjb21tYW5kXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcInByb2dyZXNzXCI6XG4gICAgICAgICAgICAgICAgdmFyIG5ld0RlbGF5ID0gc2VsZi5zZXR0aW5ncy5kZWxheSAtIChzZWxmLnNldHRpbmdzLmRlbGF5ICogKGNvbW1hbmRzW2NtZF0gLyAxMDApKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZGF0YSgnbm90aWZ5LWRlbGF5JywgbmV3RGVsYXkpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJwcm9ncmVzc2JhclwiXSA+IGRpdicpLmF0dHIoJ2FyaWEtdmFsdWVub3cnLCBjb21tYW5kc1tjbWRdKS5jc3MoJ3dpZHRoJywgY29tbWFuZHNbY21kXSArICclJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJ1cmxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGUuZmluZCgnW2RhdGEtbm90aWZ5PVwidXJsXCJdJykuYXR0cignaHJlZicsIGNvbW1hbmRzW2NtZF0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwidGFyZ2V0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInVybFwiXScpLmF0dHIoJ3RhcmdldCcsIGNvbW1hbmRzW2NtZF0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCInICsgY21kICsgJ1wiXScpLmh0bWwoY29tbWFuZHNbY21kXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBwb3NYID0gdGhpcy4kZWxlLm91dGVySGVpZ2h0KCkgKyBwYXJzZUludChzZWxmLnNldHRpbmdzLnNwYWNpbmcpICsgcGFyc2VJbnQoc2VsZi5zZXR0aW5ncy5vZmZzZXQueSk7XG4gICAgICAgICAgc2VsZi5yZXBvc2l0aW9uKHBvc1gpO1xuICAgICAgICB9LFxuICAgICAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgfSxcbiAgICBidWlsZE5vdGlmeTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY29udGVudCA9IHRoaXMuc2V0dGluZ3MuY29udGVudDtcbiAgICAgIHRoaXMuJGVsZSA9ICQoU3RyaW5nLmZvcm1hdCh0aGlzLnNldHRpbmdzLnRlbXBsYXRlLCB0aGlzLnNldHRpbmdzLnR5cGUsIGNvbnRlbnQudGl0bGUsIGNvbnRlbnQubWVzc2FnZSwgY29udGVudC51cmwsIGNvbnRlbnQudGFyZ2V0KSk7XG4gICAgICB0aGlzLiRlbGUuYXR0cignZGF0YS1ub3RpZnktcG9zaXRpb24nLCB0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5mcm9tICsgJy0nICsgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuYWxpZ24pO1xuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmFsbG93X2Rpc21pc3MpIHtcbiAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImRpc21pc3NcIl0nKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgfVxuICAgICAgaWYgKCh0aGlzLnNldHRpbmdzLmRlbGF5IDw9IDAgJiYgIXRoaXMuc2V0dGluZ3Muc2hvd1Byb2dyZXNzYmFyKSB8fCAhdGhpcy5zZXR0aW5ncy5zaG93UHJvZ3Jlc3NiYXIpIHtcbiAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInByb2dyZXNzYmFyXCJdJykucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRJY29uOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsZS5hZGRDbGFzcygnYWxlcnQtd2l0aC1pY29uJyk7XG5cbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmljb25fdHlwZS50b0xvd2VyQ2FzZSgpID09PSAnY2xhc3MnKSB7XG4gICAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJpY29uXCJdJykuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5jb250ZW50Lmljb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJpY29uXCJdJykuaXMoJ2ltZycpKSB7XG4gICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImljb25cIl0nKS5hdHRyKCdzcmMnLCB0aGlzLnNldHRpbmdzLmNvbnRlbnQuaWNvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImljb25cIl0nKS5hcHBlbmQoJzxpbWcgc3JjPVwiJyArIHRoaXMuc2V0dGluZ3MuY29udGVudC5pY29uICsgJ1wiIGFsdD1cIk5vdGlmeSBJY29uXCIgLz4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc3R5bGVEaXNtaXNzOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJykuY3NzKHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIHJpZ2h0OiAnMTBweCcsXG4gICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgIG1hcmdpblRvcDogJy0xM3B4JyxcbiAgICAgICAgekluZGV4OiB0aGlzLnNldHRpbmdzLnpfaW5kZXggKyAyXG4gICAgICB9KTtcbiAgICB9LFxuICAgIHN0eWxlVVJMOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJ1cmxcIl0nKS5jc3Moe1xuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3KScsXG4gICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICB6SW5kZXg6IHRoaXMuc2V0dGluZ3Muel9pbmRleCArIDFcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcGxhY2VtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgb2Zmc2V0QW10ID0gdGhpcy5zZXR0aW5ncy5vZmZzZXQueSxcbiAgICAgICAgY3NzID0ge1xuICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgIG1hcmdpbjogJzBweCBhdXRvJyxcbiAgICAgICAgICBwb3NpdGlvbjogdGhpcy5zZXR0aW5ncy5wb3NpdGlvbiA/IHRoaXMuc2V0dGluZ3MucG9zaXRpb24gOiAodGhpcy5zZXR0aW5ncy5lbGVtZW50ID09PSAnYm9keScgPyAnZml4ZWQnIDogJ2Fic29sdXRlJyksXG4gICAgICAgICAgdHJhbnNpdGlvbjogJ2FsbCAuNXMgZWFzZS1pbi1vdXQnLFxuICAgICAgICAgIHpJbmRleDogdGhpcy5zZXR0aW5ncy56X2luZGV4XG4gICAgICAgIH0sXG4gICAgICAgIGhhc0FuaW1hdGlvbiA9IGZhbHNlLFxuICAgICAgICBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XG5cbiAgICAgICQoJ1tkYXRhLW5vdGlmeS1wb3NpdGlvbj1cIicgKyB0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5mcm9tICsgJy0nICsgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuYWxpZ24gKyAnXCJdOm5vdChbZGF0YS1jbG9zaW5nPVwidHJ1ZVwiXSknKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBvZmZzZXRBbXQgPSBNYXRoLm1heChvZmZzZXRBbXQsIHBhcnNlSW50KCQodGhpcykuY3NzKHNldHRpbmdzLnBsYWNlbWVudC5mcm9tKSkgKyBwYXJzZUludCgkKHRoaXMpLm91dGVySGVpZ2h0KCkpICsgcGFyc2VJbnQoc2V0dGluZ3Muc3BhY2luZykpO1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5uZXdlc3Rfb25fdG9wID09PSB0cnVlKSB7XG4gICAgICAgIG9mZnNldEFtdCA9IHRoaXMuc2V0dGluZ3Mub2Zmc2V0Lnk7XG4gICAgICB9XG4gICAgICBjc3NbdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbV0gPSBvZmZzZXRBbXQgKyAncHgnO1xuXG4gICAgICBzd2l0Y2ggKHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmFsaWduKSB7XG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgIGNzc1t0aGlzLnNldHRpbmdzLnBsYWNlbWVudC5hbGlnbl0gPSB0aGlzLnNldHRpbmdzLm9mZnNldC54ICsgJ3B4JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNlbnRlclwiOlxuICAgICAgICAgIGNzcy5sZWZ0ID0gMDtcbiAgICAgICAgICBjc3MucmlnaHQgPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy4kZWxlLmNzcyhjc3MpLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZS5lbnRlcik7XG4gICAgICAkLmVhY2goQXJyYXkoJ3dlYmtpdC0nLCAnbW96LScsICdvLScsICdtcy0nLCAnJyksIGZ1bmN0aW9uKGluZGV4LCBwcmVmaXgpIHtcbiAgICAgICAgc2VsZi4kZWxlWzBdLnN0eWxlW3ByZWZpeCArICdBbmltYXRpb25JdGVyYXRpb25Db3VudCddID0gMTtcbiAgICAgIH0pO1xuXG4gICAgICAkKHRoaXMuc2V0dGluZ3MuZWxlbWVudCkuYXBwZW5kKHRoaXMuJGVsZSk7XG5cbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLm5ld2VzdF9vbl90b3AgPT09IHRydWUpIHtcbiAgICAgICAgb2Zmc2V0QW10ID0gKHBhcnNlSW50KG9mZnNldEFtdCkgKyBwYXJzZUludCh0aGlzLnNldHRpbmdzLnNwYWNpbmcpKSArIHRoaXMuJGVsZS5vdXRlckhlaWdodCgpO1xuICAgICAgICB0aGlzLnJlcG9zaXRpb24ob2Zmc2V0QW10KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uU2hvdykpIHtcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5vblNob3cuY2FsbCh0aGlzLiRlbGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRlbGUub25lKHRoaXMuYW5pbWF0aW9ucy5zdGFydCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGhhc0FuaW1hdGlvbiA9IHRydWU7XG4gICAgICB9KS5vbmUodGhpcy5hbmltYXRpb25zLmVuZCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuJGVsZS5yZW1vdmVDbGFzcyhzZWxmLnNldHRpbmdzLmFuaW1hdGUuZW50ZXIpO1xuICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKHNlbGYuc2V0dGluZ3Mub25TaG93bikpIHtcbiAgICAgICAgICBzZWxmLnNldHRpbmdzLm9uU2hvd24uY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghaGFzQW5pbWF0aW9uKSB7XG4gICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uU2hvd24pKSB7XG4gICAgICAgICAgICBzZWxmLnNldHRpbmdzLm9uU2hvd24uY2FsbCh0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIDYwMCk7XG4gICAgfSxcbiAgICBiaW5kOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cImRpc21pc3NcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICgkLmlzRnVuY3Rpb24oc2VsZi5zZXR0aW5ncy5vbkNsaWNrKSkge1xuICAgICAgICB0aGlzLiRlbGUub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9IHNlbGYuJGVsZS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJylbMF0pIHtcbiAgICAgICAgICAgIHNlbGYuc2V0dGluZ3Mub25DbGljay5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRlbGUubW91c2VvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmRhdGEoJ2RhdGEtaG92ZXInLCBcInRydWVcIik7XG4gICAgICB9KS5tb3VzZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5kYXRhKCdkYXRhLWhvdmVyJywgXCJmYWxzZVwiKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kZWxlLmRhdGEoJ2RhdGEtaG92ZXInLCBcImZhbHNlXCIpO1xuXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5kZWxheSA+IDApIHtcbiAgICAgICAgc2VsZi4kZWxlLmRhdGEoJ25vdGlmeS1kZWxheScsIHNlbGYuc2V0dGluZ3MuZGVsYXkpO1xuICAgICAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGVsYXkgPSBwYXJzZUludChzZWxmLiRlbGUuZGF0YSgnbm90aWZ5LWRlbGF5JykpIC0gc2VsZi5zZXR0aW5ncy50aW1lcjtcbiAgICAgICAgICBpZiAoKHNlbGYuJGVsZS5kYXRhKCdkYXRhLWhvdmVyJykgPT09ICdmYWxzZScgJiYgc2VsZi5zZXR0aW5ncy5tb3VzZV9vdmVyID09PSBcInBhdXNlXCIpIHx8IHNlbGYuc2V0dGluZ3MubW91c2Vfb3ZlciAhPSBcInBhdXNlXCIpIHtcbiAgICAgICAgICAgIHZhciBwZXJjZW50ID0gKChzZWxmLnNldHRpbmdzLmRlbGF5IC0gZGVsYXkpIC8gc2VsZi5zZXR0aW5ncy5kZWxheSkgKiAxMDA7XG4gICAgICAgICAgICBzZWxmLiRlbGUuZGF0YSgnbm90aWZ5LWRlbGF5JywgZGVsYXkpO1xuICAgICAgICAgICAgc2VsZi4kZWxlLmZpbmQoJ1tkYXRhLW5vdGlmeT1cInByb2dyZXNzYmFyXCJdID4gZGl2JykuYXR0cignYXJpYS12YWx1ZW5vdycsIHBlcmNlbnQpLmNzcygnd2lkdGgnLCBwZXJjZW50ICsgJyUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRlbGF5IDw9IC0oc2VsZi5zZXR0aW5ncy50aW1lcikpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgc2VsZi5zZXR0aW5ncy50aW1lcik7XG4gICAgICB9XG4gICAgfSxcbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHBvc1ggPSBwYXJzZUludCh0aGlzLiRlbGUuY3NzKHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmZyb20pKSxcbiAgICAgICAgaGFzQW5pbWF0aW9uID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuJGVsZS5hdHRyKCdkYXRhLWNsb3NpbmcnLCAndHJ1ZScpLmFkZENsYXNzKHRoaXMuc2V0dGluZ3MuYW5pbWF0ZS5leGl0KTtcbiAgICAgIHNlbGYucmVwb3NpdGlvbihwb3NYKTtcblxuICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uQ2xvc2UpKSB7XG4gICAgICAgIHNlbGYuc2V0dGluZ3Mub25DbG9zZS5jYWxsKHRoaXMuJGVsZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuJGVsZS5vbmUodGhpcy5hbmltYXRpb25zLnN0YXJ0LCBmdW5jdGlvbigpIHtcbiAgICAgICAgaGFzQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICAgIH0pLm9uZSh0aGlzLmFuaW1hdGlvbnMuZW5kLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihzZWxmLnNldHRpbmdzLm9uQ2xvc2VkKSkge1xuICAgICAgICAgIHNlbGYuc2V0dGluZ3Mub25DbG9zZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghaGFzQW5pbWF0aW9uKSB7XG4gICAgICAgICAgc2VsZi4kZWxlLnJlbW92ZSgpO1xuICAgICAgICAgIGlmIChzZWxmLnNldHRpbmdzLm9uQ2xvc2VkKSB7XG4gICAgICAgICAgICBzZWxmLnNldHRpbmdzLm9uQ2xvc2VkKHNlbGYuJGVsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCA2MDApO1xuICAgIH0sXG4gICAgcmVwb3NpdGlvbjogZnVuY3Rpb24ocG9zWCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBub3RpZmllcyA9ICdbZGF0YS1ub3RpZnktcG9zaXRpb249XCInICsgdGhpcy5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSArICctJyArIHRoaXMuc2V0dGluZ3MucGxhY2VtZW50LmFsaWduICsgJ1wiXTpub3QoW2RhdGEtY2xvc2luZz1cInRydWVcIl0pJyxcbiAgICAgICAgJGVsZW1lbnRzID0gdGhpcy4kZWxlLm5leHRBbGwobm90aWZpZXMpO1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubmV3ZXN0X29uX3RvcCA9PT0gdHJ1ZSkge1xuICAgICAgICAkZWxlbWVudHMgPSB0aGlzLiRlbGUucHJldkFsbChub3RpZmllcyk7XG4gICAgICB9XG4gICAgICAkZWxlbWVudHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5jc3Moc2VsZi5zZXR0aW5ncy5wbGFjZW1lbnQuZnJvbSwgcG9zWCk7XG4gICAgICAgIHBvc1ggPSAocGFyc2VJbnQocG9zWCkgKyBwYXJzZUludChzZWxmLnNldHRpbmdzLnNwYWNpbmcpKSArICQodGhpcykub3V0ZXJIZWlnaHQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgJC5ub3RpZnkgPSBmdW5jdGlvbihjb250ZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIHBsdWdpbiA9IG5ldyBOb3RpZnkodGhpcywgY29udGVudCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHBsdWdpbi5ub3RpZnk7XG4gIH07XG4gICQubm90aWZ5RGVmYXVsdHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgZGVmYXVsdHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIHJldHVybiBkZWZhdWx0cztcbiAgfTtcblxuICAkLm5vdGlmeUNsb3NlID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwidW5kZWZpbmVkXCIgfHwgc2VsZWN0b3IgPT09IFwiYWxsXCIpIHtcbiAgICAgICQoJ1tkYXRhLW5vdGlmeV0nKS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJykudHJpZ2dlcignY2xpY2snKTtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdG9yID09PSAnc3VjY2VzcycgfHwgc2VsZWN0b3IgPT09ICdpbmZvJyB8fCBzZWxlY3RvciA9PT0gJ3dhcm5pbmcnIHx8IHNlbGVjdG9yID09PSAnZGFuZ2VyJykge1xuICAgICAgJCgnLmFsZXJ0LScgKyBzZWxlY3RvciArICdbZGF0YS1ub3RpZnldJykuZmluZCgnW2RhdGEtbm90aWZ5PVwiZGlzbWlzc1wiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgfSBlbHNlIGlmIChzZWxlY3Rvcikge1xuICAgICAgJChzZWxlY3RvciArICdbZGF0YS1ub3RpZnldJykuZmluZCgnW2RhdGEtbm90aWZ5PVwiZGlzbWlzc1wiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJ1tkYXRhLW5vdGlmeS1wb3NpdGlvbj1cIicgKyBzZWxlY3RvciArICdcIl0nKS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJykudHJpZ2dlcignY2xpY2snKTtcbiAgICB9XG4gIH07XG5cbiAgJC5ub3RpZnlDbG9zZUV4Y2VwdCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cbiAgICBpZiAoc2VsZWN0b3IgPT09ICdzdWNjZXNzJyB8fCBzZWxlY3RvciA9PT0gJ2luZm8nIHx8IHNlbGVjdG9yID09PSAnd2FybmluZycgfHwgc2VsZWN0b3IgPT09ICdkYW5nZXInKSB7XG4gICAgICAkKCdbZGF0YS1ub3RpZnldJykubm90KCcuYWxlcnQtJyArIHNlbGVjdG9yKS5maW5kKCdbZGF0YS1ub3RpZnk9XCJkaXNtaXNzXCJdJykudHJpZ2dlcignY2xpY2snKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnW2RhdGEtbm90aWZ5XScpLm5vdChzZWxlY3RvcikuZmluZCgnW2RhdGEtbm90aWZ5PVwiZGlzbWlzc1wiXScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgfVxuICB9O1xuXG5cbn0pKTsiXSwibmFtZXMiOlsiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsImV4cG9ydHMiLCJfdHlwZW9mIiwicmVxdWlyZSIsImpRdWVyeSIsIiQiLCJkZWZhdWx0cyIsImVsZW1lbnQiLCJwb3NpdGlvbiIsInR5cGUiLCJhbGxvd19kaXNtaXNzIiwiYWxsb3dfZHVwbGljYXRlcyIsIm5ld2VzdF9vbl90b3AiLCJzaG93UHJvZ3Jlc3NiYXIiLCJwbGFjZW1lbnQiLCJmcm9tIiwiYWxpZ24iLCJvZmZzZXQiLCJzcGFjaW5nIiwiel9pbmRleCIsImRlbGF5IiwidGltZXIiLCJ1cmxfdGFyZ2V0IiwibW91c2Vfb3ZlciIsImFuaW1hdGUiLCJlbnRlciIsImV4aXQiLCJvblNob3ciLCJvblNob3duIiwib25DbG9zZSIsIm9uQ2xvc2VkIiwib25DbGljayIsImljb25fdHlwZSIsInRlbXBsYXRlIiwiU3RyaW5nIiwiZm9ybWF0IiwiYXJncyIsImFyZ3VtZW50cyIsInN0ciIsInJlcGxhY2UiLCJzdWJzdHJpbmciLCJudW0iLCJwYXJzZUludCIsIm1hdGNoIiwiaXNEdXBsaWNhdGVOb3RpZmljYXRpb24iLCJub3RpZmljYXRpb24iLCJpc0R1cGUiLCJlYWNoIiwiaSIsImVsIiwiJGVsIiwidGl0bGUiLCJmaW5kIiwiaHRtbCIsInRyaW0iLCJtZXNzYWdlIiwiaXNTYW1lVGl0bGUiLCJzZXR0aW5ncyIsImNvbnRlbnQiLCJpc1NhbWVNc2ciLCJpc1NhbWVUeXBlIiwiaGFzQ2xhc3MiLCJOb3RpZnkiLCJvcHRpb25zIiwiY29udGVudE9iaiIsImljb24iLCJ1cmwiLCJ0YXJnZXQiLCJleHRlbmQiLCJfZGVmYXVsdHMiLCJhbmltYXRpb25zIiwic3RhcnQiLCJlbmQiLCJ4IiwieSIsImluaXQiLCJwcm90b3R5cGUiLCJzZWxmIiwiYnVpbGROb3RpZnkiLCJzZXRJY29uIiwic3R5bGVVUkwiLCJzdHlsZURpc21pc3MiLCJiaW5kIiwibm90aWZ5IiwiJGVsZSIsInVwZGF0ZSIsImNvbW1hbmQiLCJjb21tYW5kcyIsImNtZCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCIkaWNvbiIsInRvTG93ZXJDYXNlIiwiaXMiLCJhdHRyIiwibmV3RGVsYXkiLCJkYXRhIiwiY3NzIiwicG9zWCIsIm91dGVySGVpZ2h0IiwicmVwb3NpdGlvbiIsImNsb3NlIiwicmVtb3ZlIiwiYXBwZW5kIiwicmlnaHQiLCJ0b3AiLCJtYXJnaW5Ub3AiLCJ6SW5kZXgiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJoZWlnaHQiLCJsZWZ0Iiwid2lkdGgiLCJvZmZzZXRBbXQiLCJkaXNwbGF5IiwibWFyZ2luIiwidHJhbnNpdGlvbiIsImhhc0FuaW1hdGlvbiIsIk1hdGgiLCJtYXgiLCJBcnJheSIsImluZGV4IiwicHJlZml4Iiwic3R5bGUiLCJpc0Z1bmN0aW9uIiwiY2FsbCIsIm9uZSIsInNldFRpbWVvdXQiLCJvbiIsImV2ZW50IiwibW91c2VvdmVyIiwibW91c2VvdXQiLCJzZXRJbnRlcnZhbCIsInBlcmNlbnQiLCJjbGVhckludGVydmFsIiwibm90aWZpZXMiLCIkZWxlbWVudHMiLCJuZXh0QWxsIiwicHJldkFsbCIsInBsdWdpbiIsIm5vdGlmeURlZmF1bHRzIiwibm90aWZ5Q2xvc2UiLCJzZWxlY3RvciIsInRyaWdnZXIiLCJub3RpZnlDbG9zZUV4Y2VwdCIsIm5vdCJdLCJzb3VyY2VSb290IjoiIn0=