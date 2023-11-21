"use strict";
(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["assets_js_video-calling_video-call_index_js"],{

/***/ "./assets/js/video-calling/video-call.index.js":
/*!*****************************************************!*\
  !*** ./assets/js/video-calling/video-call.index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ "./node_modules/core-js/modules/es.array.push.js");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.error.to-string.js */ "./node_modules/core-js/modules/es.error.to-string.js");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.regexp.test.js */ "./node_modules/core-js/modules/es.regexp.test.js");
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ "./node_modules/core-js/modules/es.error.cause.js");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var twilio_video__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! twilio-video */ "./node_modules/twilio-video/es5/index.js");
/* harmony import */ var twilio_video__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(twilio_video__WEBPACK_IMPORTED_MODULE_21__);




















function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var Chat = function Chat() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_20__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    roomName = _useState2[0],
    setRoomName = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_20__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    hasJoinedRoom = _useState4[0],
    setHasJoinedRoom = _useState4[1];
  var connectToRoom = function connectToRoom(token) {
    var connect = (twilio_video__WEBPACK_IMPORTED_MODULE_21___default().connect),
      createLocalVideoTrack = (twilio_video__WEBPACK_IMPORTED_MODULE_21___default().createLocalVideoTrack);
    var connectOption = {
      name: roomName
    };
    connect(token, connectOption).then(function (room) {
      console.log("Successfully joined a Room: ".concat(room));
      var videoChatWindow = document.getElementById('video-chat-window');
      var muteAudio = document.getElementById('muteAudio');
      var stopVideo = document.getElementById('stopVideo');
      var unmuteAudio = document.getElementById('unmuteAudio');
      var startVideo = document.getElementById('startVideo');
      startVideo.addEventListener('click', function () {
        room.localParticipant.videoTracks.forEach(function (track) {
          track.enable();
        });
      });
      unmuteAudio.addEventListener('click', function () {
        room.localParticipant.audioTracks.forEach(function (track) {
          track.enable();
        });
      });
      stopVideo.addEventListener('click', function () {
        room.localParticipant.videoTracks.forEach(function (track) {
          track.disable();
        });
      });
      muteAudio.addEventListener('click', function () {
        room.localParticipant.audioTracks.forEach(function (track) {
          track.disable();
        });
      });
      createLocalVideoTrack().then(function (track) {
        videoChatWindow.appendChild(track.attach());
      });
      createLocalVideoTrack().then(function (localVideoTrack) {
        return room.localParticipant.publishTrack(localVideoTrack);
      }).then(function (publication) {
        console.log('Successfully unmuted your video:', publication);
      });
      room.on('disconnected', function (room) {
        // Detach the local media elements
        room.localParticipant.tracks.forEach(function (publication) {
          var attachedElements = publication.track.detach();
          attachedElements.forEach(function (element) {
            return element.remove();
          });
        });
      });

      // To disconnect from a Room
      room.disconnect();
      room.localParticipant.audioTracks.forEach(function (publication) {
        publication.track.disable();
      });
      room.localParticipant.videoTracks.forEach(function (publication) {
        publication.track.disable();
      });
      room.localParticipant.audioTracks.forEach(function (publication) {
        publication.track.enable();
      });
      room.localParticipant.videoTracks.forEach(function (publication) {
        publication.track.enable();
      });
      room.localParticipant.videoTracks.forEach(function (publication) {
        publication.track.stop();
        publication.unpublish();
      });
      function handleTrackDisabled(track) {
        track.on('disabled', function () {
          /* Hide the associated <video> element and show an avatar image. */
        });
      }
      room.participants.forEach(function (participant) {
        participant.tracks.forEach(function (publication) {
          if (publication.isSubscribed) {
            handleTrackDisabled(publication.track);
          }
          publication.on('subscribed', handleTrackDisabled);
        });
      });
      room.participants.forEach(function (participant) {
        participant.tracks.forEach(function (publication) {
          publication.on('subscribed', function () {
            /* Hide the avatar image and show the associated <video> element. */
          });
        });
      });
      function handleTrackEnabled(track) {
        track.on('enabled', function () {
          /* Hide the avatar image and show the associated <video> element. */
        });
      }
      room.participants.forEach(function (participant) {
        participant.tracks.forEach(function (publication) {
          if (publication.isSubscribed) {
            handleTrackEnabled(publication.track);
          }
          publication.on('subscribed', handleTrackEnabled);
        });
      });
      room.on('participantConnected', function (participant) {
        console.log("Participant \"".concat(participant.identity, "\" connected"));
        participant.tracks.forEach(function (publication) {
          if (publication.isSubscribed) {
            var track = publication.track;
            videoChatWindow.appendChild(track.attach());
          }
        });
        participant.on('trackSubscribed', function (track) {
          videoChatWindow.appendChild(track.attach());
          console.log(participant, length);
        });
      });
    }, function (error) {
      console.error("Unable to connect to Room: ".concat(error.message));
    });
  };
  var joinChat = function joinChat(event) {
    event.preventDefault();
    if (roomName) {
      axios__WEBPACK_IMPORTED_MODULE_22__["default"].post('access_token', {
        roomName: roomName
      }).then(function (response) {
        connectToRoom(response.data.token);
        setHasJoinedRoom(true);
        setRoomName('');
      })["catch"](function (error) {
        console.log(error);
      });
    } else {
      alert("You need to enter a room name");
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "row justify-content-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "container-enter"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "card z-index-0 mb-7"
  }, !hasJoinedRoom && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("form", {
    className: "form-inline",
    onSubmit: joinChat
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("input", {
    type: "text",
    name: 'roomName',
    className: "form-control",
    id: "roomName",
    placeholder: "Enter a room name",
    value: roomName,
    onChange: function onChange(event) {
      return setRoomName(event.target.value);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("button", {
    type: "submit",
    className: "btn bg-gradient-dark btn-lg w-100 my-4 mb-2"
  }, "Entrer"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    id: "video-chat-window",
    className: "\trow-video"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("nav", {
    className: "tools-kit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("ul", {
    className: "items-video"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("li", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/L8zxQBhv/live.png",
    className: "active"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("li", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/JnggC78Q/video.png"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("li", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/vmb3JgVy/message.png"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("li", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/qR7Q7PwZ/notification.png"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("li", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/k4DZH604/users.png"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("li", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/v84Fqkyz/setting.png"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "container-video"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "row-video"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "col-1-video"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/521rVkhD/image.png",
    className: "host-img"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "contarols"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/3NVtVtgf/chat.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/BQPYHG0r/disconnect.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/fyJH8G00/call.png",
    className: "call-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/bJFgSmFY/mic.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/Y2sDvCJN/cast.png"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "col-2-video"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "joined"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("p", null, "People Joined"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/WzFnG0QG/people-1.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/fRhGbb92/people-2.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/02mgxSbK/people-3.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/K8rd3y7Z/people-4.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/HWFGfzsC/people-5.png"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", {
    className: "invite"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("p", null, "Invite More People"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/7LHjgQXS/user-1.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/q71SQXZS/user-2.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/h4kwCGpD/user-3.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/GtyfL0hn/user-4.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_20___default().createElement("img", {
    src: "https://i.postimg.cc/FFd8gSbC/user-5.png"
  })))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Chat);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzX2pzX3ZpZGVvLWNhbGxpbmdfdmlkZW8tY2FsbF9pbmRleF9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7QUFDZDtBQUNPO0FBR2pDLElBQU1JLElBQUksR0FBRyxTQUFQQSxJQUFJQSxDQUFBLEVBQVM7RUFFbEIsSUFBQUMsU0FBQSxHQUFnQ0osZ0RBQVEsQ0FBQyxFQUFFLENBQUM7SUFBQUssVUFBQSxHQUFBQyxjQUFBLENBQUFGLFNBQUE7SUFBckNHLFFBQVEsR0FBQUYsVUFBQTtJQUFFRyxXQUFXLEdBQUFILFVBQUE7RUFDNUIsSUFBQUksVUFBQSxHQUEwQ1QsZ0RBQVEsQ0FBQyxLQUFLLENBQUM7SUFBQVUsVUFBQSxHQUFBSixjQUFBLENBQUFHLFVBQUE7SUFBbERFLGFBQWEsR0FBQUQsVUFBQTtJQUFFRSxnQkFBZ0IsR0FBQUYsVUFBQTtFQUV0QyxJQUFNRyxhQUFhLEdBQUcsU0FBaEJBLGFBQWFBLENBQUlDLEtBQUssRUFBSztJQUNoQyxJQUFRQyxPQUFPLEdBQTRCYiw4REFBNUI7TUFBRWMscUJBQXFCLEdBQUtkLDRFQUFMO0lBRXRDLElBQUllLGFBQWEsR0FBRztNQUFFQyxJQUFJLEVBQUVYO0lBQVMsQ0FBQztJQUV0Q1EsT0FBTyxDQUFFRCxLQUFLLEVBQUVHLGFBQWEsQ0FBQyxDQUFDRSxJQUFJLENBQUMsVUFBQUMsSUFBSSxFQUFJO01BRTNDQyxPQUFPLENBQUNDLEdBQUcsZ0NBQUFDLE1BQUEsQ0FBZ0NILElBQUksQ0FBRSxDQUFDO01BRWxELElBQU1JLGVBQWUsR0FBR0MsUUFBUSxDQUFDQyxjQUFjLENBQUMsbUJBQW1CLENBQUM7TUFDcEUsSUFBTUMsU0FBUyxHQUFJRixRQUFRLENBQUNDLGNBQWMsQ0FBQyxXQUFXLENBQUM7TUFDdkQsSUFBTUUsU0FBUyxHQUFJSCxRQUFRLENBQUND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SUFBSytFLEdBQUcsRUFBQztFQUE0QyxDQUFNLENBQUMsZUFDNUQvRSwyREFBQTtJQUFLK0UsR0FBRyxFQUFDO0VBQTRDLENBQU0sQ0FBQyxlQUM1RC9FLDJEQUFBO0lBQUsrRSxHQUFHLEVBQUM7RUFBNEMsQ0FBTSxDQUFDLGVBQzVEL0UsMkRBQUE7SUFBSytFLEdBQUcsRUFBQztFQUE0QyxDQUFNLENBQUMsZUFDNUQvRSwyREFBQTtJQUFLK0UsR0FBRyxFQUFDO0VBQTRDLENBQU0sQ0FDdkQsQ0FDRCxDQUFDLGVBQ04vRSwyREFBQTtJQUFLdUUsU0FBUyxFQUFDO0VBQVEsZ0JBQ3RCdkUsMkRBQUEsWUFBRyxvQkFBcUIsQ0FBQyxlQUN6QkEsMkRBQUEsMkJBQ0NBLDJEQUFBO0lBQUsrRSxHQUFHLEVBQUM7RUFBMEMsQ0FBTSxDQUFDLGVBQzFEL0UsMkRBQUE7SUFBSytFLEdBQUcsRUFBQztFQUEwQyxDQUFNLENBQUMsZUFDMUQvRSwyREFBQTtJQUFLK0UsR0FBRyxFQUFDO0VBQTBDLENBQU0sQ0FBQyxlQUMxRC9FLDJEQUFBO0lBQUsrRSxHQUFHLEVBQUM7RUFBMEMsQ0FBTSxDQUFDLGVBQzFEL0UsMkRBQUE7SUFBSytFLEdBQUcsRUFBQztFQUEwQyxDQUFNLENBQ3JELENBQ0QsQ0FDRCxDQUNELENBQ0QsQ0FDQSxDQUFNLENBQU0sQ0FBQztBQUVuQixDQUFDO0FBRUQsaUVBQWUzRSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2Nob29sLWFwcC8uL2Fzc2V0cy9qcy92aWRlby1jYWxsaW5nL3ZpZGVvLWNhbGwuaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IFZpZGVvIGZyb20gXCJ0d2lsaW8tdmlkZW9cIjtcclxuXHJcblxyXG5jb25zdCBDaGF0ID0gKCkgPT4ge1xyXG5cclxuXHRjb25zdCBbcm9vbU5hbWUsIHNldFJvb21OYW1lXSA9IHVzZVN0YXRlKCcnKTtcclxuXHRjb25zdCBbaGFzSm9pbmVkUm9vbSwgc2V0SGFzSm9pbmVkUm9vbV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblx0XHJcblx0Y29uc3QgY29ubmVjdFRvUm9vbSA9ICh0b2tlbikgPT4ge1xyXG5cdFx0Y29uc3QgeyBjb25uZWN0LCBjcmVhdGVMb2NhbFZpZGVvVHJhY2sgfSA9IFZpZGVvO1xyXG5cdFx0XHJcblx0XHRsZXQgY29ubmVjdE9wdGlvbiA9IHsgbmFtZTogcm9vbU5hbWUgfTtcclxuXHRcdFxyXG5cdFx0Y29ubmVjdCggdG9rZW4sIGNvbm5lY3RPcHRpb24pLnRoZW4ocm9vbSA9PiB7XHJcblx0XHRcdFxyXG5cdFx0XHRjb25zb2xlLmxvZyhgU3VjY2Vzc2Z1bGx5IGpvaW5lZCBhIFJvb206ICR7cm9vbX1gKTtcclxuXHRcdFx0XHJcblx0XHRcdGNvbnN0IHZpZGVvQ2hhdFdpbmRvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlby1jaGF0LXdpbmRvdycpO1xyXG5cdFx0XHRjb25zdCBtdXRlQXVkaW8gPSBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXRlQXVkaW8nKTtcclxuXHRcdFx0Y29uc3Qgc3RvcFZpZGVvID0gXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RvcFZpZGVvJyk7XHJcblx0XHRcdGNvbnN0IHVubXV0ZUF1ZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VubXV0ZUF1ZGlvJyk7XHJcblx0XHRcdGNvbnN0IHN0YXJ0VmlkZW8gPSBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydFZpZGVvJyk7XHJcblx0XHRcdFxyXG5cdFx0XHRzdGFydFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRcdHJvb20ubG9jYWxQYXJ0aWNpcGFudC52aWRlb1RyYWNrcy5mb3JFYWNoKHRyYWNrID0+IHtcclxuXHRcdFx0XHRcdHRyYWNrLmVuYWJsZSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdFxyXG5cdFx0XHR1bm11dGVBdWRpby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0XHRyb29tLmxvY2FsUGFydGljaXBhbnQuYXVkaW9UcmFja3MuZm9yRWFjaCh0cmFjayA9PiB7XHJcblx0XHRcdFx0XHR0cmFjay5lbmFibGUoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHN0b3BWaWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0XHRyb29tLmxvY2FsUGFydGljaXBhbnQudmlkZW9UcmFja3MuZm9yRWFjaCh0cmFjayA9PiB7XHJcblx0XHRcdFx0XHR0cmFjay5kaXNhYmxlKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0XHRcdG11dGVBdWRpby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0XHRyb29tLmxvY2FsUGFydGljaXBhbnQuYXVkaW9UcmFja3MuZm9yRWFjaCh0cmFjayA9PiB7XHJcblx0XHRcdFx0XHR0cmFjay5kaXNhYmxlKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjcmVhdGVMb2NhbFZpZGVvVHJhY2soKS50aGVuKHRyYWNrID0+IHtcclxuXHRcdFx0XHR2aWRlb0NoYXRXaW5kb3cuYXBwZW5kQ2hpbGQodHJhY2suYXR0YWNoKCkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdGNyZWF0ZUxvY2FsVmlkZW9UcmFjaygpLnRoZW4obG9jYWxWaWRlb1RyYWNrID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gcm9vbS5sb2NhbFBhcnRpY2lwYW50LnB1Ymxpc2hUcmFjayhsb2NhbFZpZGVvVHJhY2spO1xyXG5cdFx0XHR9KS50aGVuKHB1YmxpY2F0aW9uID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnU3VjY2Vzc2Z1bGx5IHVubXV0ZWQgeW91ciB2aWRlbzonLCBwdWJsaWNhdGlvbik7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdFx0cm9vbS5vbignZGlzY29ubmVjdGVkJywgcm9vbSA9PiB7XHJcblx0XHRcdFx0Ly8gRGV0YWNoIHRoZSBsb2NhbCBtZWRpYSBlbGVtZW50c1xyXG5cdFx0XHRcdHJvb20ubG9jYWxQYXJ0aWNpcGFudC50cmFja3MuZm9yRWFjaChwdWJsaWNhdGlvbiA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBhdHRhY2hlZEVsZW1lbnRzID0gcHVibGljYXRpb24udHJhY2suZGV0YWNoKCk7XHJcblx0XHRcdFx0XHRhdHRhY2hlZEVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnJlbW92ZSgpKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG4vLyBUbyBkaXNjb25uZWN0IGZyb20gYSBSb29tXHJcblx0XHRcdHJvb20uZGlzY29ubmVjdCgpO1xyXG5cdFx0XHRyb29tLmxvY2FsUGFydGljaXBhbnQuYXVkaW9UcmFja3MuZm9yRWFjaChwdWJsaWNhdGlvbiA9PiB7XHJcblx0XHRcdFx0cHVibGljYXRpb24udHJhY2suZGlzYWJsZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdHJvb20ubG9jYWxQYXJ0aWNpcGFudC52aWRlb1RyYWNrcy5mb3JFYWNoKHB1YmxpY2F0aW9uID0+IHtcclxuXHRcdFx0XHRwdWJsaWNhdGlvbi50cmFjay5kaXNhYmxlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdFx0cm9vbS5sb2NhbFBhcnRpY2lwYW50LmF1ZGlvVHJhY2tzLmZvckVhY2gocHVibGljYXRpb24gPT4ge1xyXG5cdFx0XHRcdHB1YmxpY2F0aW9uLnRyYWNrLmVuYWJsZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdHJvb20ubG9jYWxQYXJ0aWNpcGFudC52aWRlb1RyYWNrcy5mb3JFYWNoKHB1YmxpY2F0aW9uID0+IHtcclxuXHRcdFx0XHRwdWJsaWNhdGlvbi50cmFjay5lbmFibGUoKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0XHRyb29tLmxvY2FsUGFydGljaXBhbnQudmlkZW9UcmFja3MuZm9yRWFjaChwdWJsaWNhdGlvbiA9PiB7XHJcblx0XHRcdFx0cHVibGljYXRpb24udHJhY2suc3RvcCgpO1xyXG5cdFx0XHRcdHB1YmxpY2F0aW9uLnVucHVibGlzaCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdGZ1bmN0aW9uIGhhbmRsZVRyYWNrRGlzYWJsZWQodHJhY2spIHtcclxuXHRcdFx0XHR0cmFjay5vbignZGlzYWJsZWQnLCAoKSA9PiB7XHJcblx0XHRcdFx0XHQvKiBIaWRlIHRoZSBhc3NvY2lhdGVkIDx2aWRlbz4gZWxlbWVudCBhbmQgc2hvdyBhbiBhdmF0YXIgaW1hZ2UuICovXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJvb20ucGFydGljaXBhbnRzLmZvckVhY2gocGFydGljaXBhbnQgPT4ge1xyXG5cdFx0XHRcdHBhcnRpY2lwYW50LnRyYWNrcy5mb3JFYWNoKHB1YmxpY2F0aW9uID0+IHtcclxuXHRcdFx0XHRcdGlmIChwdWJsaWNhdGlvbi5pc1N1YnNjcmliZWQpIHtcclxuXHRcdFx0XHRcdFx0aGFuZGxlVHJhY2tEaXNhYmxlZChwdWJsaWNhdGlvbi50cmFjayk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRwdWJsaWNhdGlvbi5vbignc3Vic2NyaWJlZCcsIGhhbmRsZVRyYWNrRGlzYWJsZWQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cm9vbS5wYXJ0aWNpcGFudHMuZm9yRWFjaChwYXJ0aWNpcGFudCA9PiB7XHJcblx0XHRcdFx0cGFydGljaXBhbnQudHJhY2tzLmZvckVhY2gocHVibGljYXRpb24gPT4ge1xyXG5cdFx0XHRcdFx0cHVibGljYXRpb24ub24oJ3N1YnNjcmliZWQnLCAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdC8qIEhpZGUgdGhlIGF2YXRhciBpbWFnZSBhbmQgc2hvdyB0aGUgYXNzb2NpYXRlZCA8dmlkZW8+IGVsZW1lbnQuICovXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGZ1bmN0aW9uIGhhbmRsZVRyYWNrRW5hYmxlZCh0cmFjaykge1xyXG5cdFx0XHRcdHRyYWNrLm9uKCdlbmFibGVkJywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0LyogSGlkZSB0aGUgYXZhdGFyIGltYWdlIGFuZCBzaG93IHRoZSBhc3NvY2lhdGVkIDx2aWRlbz4gZWxlbWVudC4gKi9cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cm9vbS5wYXJ0aWNpcGFudHMuZm9yRWFjaChwYXJ0aWNpcGFudCA9PiB7XHJcblx0XHRcdFx0cGFydGljaXBhbnQudHJhY2tzLmZvckVhY2gocHVibGljYXRpb24gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKHB1YmxpY2F0aW9uLmlzU3Vic2NyaWJlZCkge1xyXG5cdFx0XHRcdFx0XHRoYW5kbGVUcmFja0VuYWJsZWQocHVibGljYXRpb24udHJhY2spO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cHVibGljYXRpb24ub24oJ3N1YnNjcmliZWQnLCBoYW5kbGVUcmFja0VuYWJsZWQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cm9vbS5vbigncGFydGljaXBhbnRDb25uZWN0ZWQnLCBwYXJ0aWNpcGFudCA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coYFBhcnRpY2lwYW50IFwiJHtwYXJ0aWNpcGFudC5pZGVudGl0eX1cIiBjb25uZWN0ZWRgKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRwYXJ0aWNpcGFudC50cmFja3MuZm9yRWFjaChwdWJsaWNhdGlvbiA9PiB7XHJcblx0XHRcdFx0XHRpZiAocHVibGljYXRpb24uaXNTdWJzY3JpYmVkKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHRyYWNrID0gcHVibGljYXRpb24udHJhY2s7XHJcblx0XHRcdFx0XHRcdHZpZGVvQ2hhdFdpbmRvdy5hcHBlbmRDaGlsZCh0cmFjay5hdHRhY2goKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cGFydGljaXBhbnQub24oJ3RyYWNrU3Vic2NyaWJlZCcsIHRyYWNrID0+IHtcclxuXHRcdFx0XHRcdHZpZGVvQ2hhdFdpbmRvdy5hcHBlbmRDaGlsZCh0cmFjay5hdHRhY2goKSk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhwYXJ0aWNpcGFudCwgbGVuZ3RoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LCBlcnJvciA9PiB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoYFVuYWJsZSB0byBjb25uZWN0IHRvIFJvb206ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFxyXG5cdGNvbnN0IGpvaW5DaGF0ID0gZXZlbnQgPT4ge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGlmIChyb29tTmFtZSkge1xyXG5cdFx0XHRheGlvcy5wb3N0KCdhY2Nlc3NfdG9rZW4nLCB7IHJvb21OYW1lIH0sICkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHRjb25uZWN0VG9Sb29tKHJlc3BvbnNlLmRhdGEudG9rZW4pO1xyXG5cdFx0XHRcdHNldEhhc0pvaW5lZFJvb20odHJ1ZSk7XHJcblx0XHRcdFx0c2V0Um9vbU5hbWUoJycpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XHJcblx0XHRcdH0pXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhbGVydChcIllvdSBuZWVkIHRvIGVudGVyIGEgcm9vbSBuYW1lXCIpXHJcblx0XHR9XHJcblx0fTtcclxuXHRcclxuXHRyZXR1cm4oXHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXCI+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWVudGVyXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjYXJkIHotaW5kZXgtMCBtYi03XCI+XHJcblx0XHRcdFx0eyFoYXNKb2luZWRSb29tICYmIChcclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcblx0XHRcdFx0XHQ8Zm9ybSBjbGFzc05hbWU9XCJmb3JtLWlubGluZVwiIG9uU3VibWl0PXtqb2luQ2hhdH0+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWItM1wiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPXsncm9vbU5hbWUnfSBjbGFzc05hbWU9e1wiZm9ybS1jb250cm9sXCJ9IGlkPVwicm9vbU5hbWVcIlxyXG5cdFx0XHRcdFx0XHRcdCAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgYSByb29tIG5hbWVcIiB2YWx1ZT17cm9vbU5hbWV9IG9uQ2hhbmdlPXtldmVudCA9PiBzZXRSb29tTmFtZShldmVudC50YXJnZXQudmFsdWUpfS8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJnLWdyYWRpZW50LWRhcmsgYnRuLWxnIHctMTAwIG15LTQgbWItMlwiPkVudHJlcjwvYnV0dG9uPjwvZGl2PlxyXG5cdFx0XHRcdFx0PC9mb3JtPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0KX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFxyXG5cdDxkaXYgaWQ9XCJ2aWRlby1jaGF0LXdpbmRvd1wiIGNsYXNzTmFtZT1cIlx0cm93LXZpZGVvXCI+XHJcblx0PG5hdiBjbGFzc05hbWU9XCJ0b29scy1raXRcIj5cclxuXHRcdFxyXG5cdFx0PHVsIGNsYXNzTmFtZT1cIml0ZW1zLXZpZGVvXCI+XHJcblx0XHRcdDxsaSBjbGFzc05hbWU9XCJpdGVtXCI+PGltZyBzcmM9XCJodHRwczovL2kucG9zdGltZy5jYy9MOHp4UUJodi9saXZlLnBuZ1wiIGNsYXNzTmFtZT1cImFjdGl2ZVwiPjwvaW1nPjwvbGk+XHJcblx0XHRcdDxsaSBjbGFzc05hbWU9XCJcIj48aW1nIHNyYz1cImh0dHBzOi8vaS5wb3N0aW1nLmNjL0puZ2dDNzhRL3ZpZGVvLnBuZ1wiPjwvaW1nPjwvbGk+XHJcblx0XHRcdDxsaSBjbGFzc05hbWU9XCJpdGVtXCI+PGltZyBzcmM9XCJodHRwczovL2kucG9zdGltZy5jYy92bWIzSmdWeS9tZXNzYWdlLnBuZ1wiPjwvaW1nPjwvbGk+XHJcblx0XHRcdDxsaSBjbGFzc05hbWU9XCJpdGVtXCI+PGltZyBzcmM9XCJodHRwczovL2kucG9zdGltZy5jYy9xUjdRN1B3Wi9ub3RpZmljYXRpb24ucG5nXCI+PC9pbWc+PC9saT5cclxuXHRcdFx0PGxpIGNsYXNzTmFtZT1cIml0ZW1cIj48aW1nIHNyYz1cImh0dHBzOi8vaS5wb3N0aW1nLmNjL2s0RFpINjA0L3VzZXJzLnBuZ1wiPjwvaW1nPjwvbGk+XHJcblx0XHRcdDxsaSBjbGFzc05hbWU9XCJpdGVtXCI+PGltZyBzcmM9XCJodHRwczovL2kucG9zdGltZy5jYy92ODRGcWt5ei9zZXR0aW5nLnBuZ1wiPjwvaW1nPjwvbGk+XHJcblx0XHQ8L3VsPlxyXG5cdDwvbmF2PlxyXG5cdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLXZpZGVvXCI+XHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdy12aWRlb1wiPlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC0xLXZpZGVvXCI+XHJcblx0XHRcdFx0PGltZyBzcmM9XCJodHRwczovL2kucG9zdGltZy5jYy81MjFyVmtoRC9pbWFnZS5wbmdcIiBjbGFzc05hbWU9XCJob3N0LWltZ1wiPjwvaW1nPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YXJvbHNcIj5cclxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCJodHRwczovL2kucG9zdGltZy5jYy8zTlZ0VnRnZi9jaGF0LnBuZ1wiPjwvaW1nPlxyXG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaHR0cHM6Ly9pLnBvc3RpbWcuY2MvQlFQWUhHMHIvZGlzY29ubmVjdC5wbmdcIj48L2ltZz5cclxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCJodHRwczovL2kucG9zdGltZy5jYy9meUpIOEcwMC9jYWxsLnBuZ1wiIGNsYXNzTmFtZT1cImNhbGwtaWNvblwiPjwvaW1nPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cImh0dHBzOi8vaS5wb3N0aW1nLmNjL2JKRmdTbUZZL21pYy5wbmdcIj48L2ltZz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cImh0dHBzOi8vaS5wb3N0aW1nLmNjL1kyc0R2Q0pOL2Nhc3QucG5nXCI+PC9pbWc+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLTItdmlkZW9cIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImpvaW5lZFwiPlxyXG5cdFx0XHRcdFx0PHA+UGVvcGxlIEpvaW5lZDwvcD5cclxuXHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaHR0cHM6Ly9pLnBvc3RpbWcuY2MvV3pGbkcwUUcvcGVvcGxlLTEucG5nXCI+PC9pbWc+XHJcblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaHR0cHM6Ly9pLnBvc3RpbWcuY2MvZlJoR2JiOTIvcGVvcGxlLTIucG5nXCI+PC9pbWc+XHJcblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaHR0cHM6Ly9pLnBvc3RpbWcuY2MvMDJtZ3hTYksvcGVvcGxlLTMucG5nXCI+PC9pbWc+XHJcblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaHR0cHM6Ly9pLnBvc3RpbWcuY2MvSzhyZDN5N1ovcGVvcGxlLTQucG5nXCI+PC9pbWc+XHJcblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaHR0cHM6Ly9pLnBvc3RpbWcuY2MvSFdGR2Z6c0MvcGVvcGxlLTUucG5nXCI+PC9pbWc+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImludml0ZVwiPlxyXG5cdFx0XHRcdFx0PHA+SW52aXRlIE1vcmUgUGVvcGxlPC9wPlxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCJodHRwczovL2kucG9zdGltZy5jYy83TEhqZ1FYUy91c2VyLTEucG5nXCI+PC9pbWc+XHJcblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaHR0cHM6Ly9pLnBvc3RpbWcuY2MvcTcxU1FYWlMvdXNlci0yLnBuZ1wiPjwvaW1nPlxyXG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz1cImh0dHBzOi8vaS5wb3N0aW1nLmNjL2g0a3dDR3BEL3VzZXItMy5wbmdcIj48L2ltZz5cclxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCJodHRwczovL2kucG9zdGltZy5jYy9HdHlmTDBobi91c2VyLTQucG5nXCI+PC9pbWc+XHJcblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaHR0cHM6Ly9pLnBvc3RpbWcuY2MvRkZkOGdTYkMvdXNlci01LnBuZ1wiPjwvaW1nPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0PC9kaXY+XHJcblx0PC9kaXY+PC9kaXY+PC9kaXY+XHJcbilcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoYXQ7Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJheGlvcyIsIlZpZGVvIiwiQ2hhdCIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInJvb21OYW1lIiwic2V0Um9vbU5hbWUiLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsImhhc0pvaW5lZFJvb20iLCJzZXRIYXNKb2luZWRSb29tIiwiY29ubmVjdFRvUm9vbSIsInRva2VuIiwiY29ubmVjdCIsImNyZWF0ZUxvY2FsVmlkZW9UcmFjayIsImNvbm5lY3RPcHRpb24iLCJuYW1lIiwidGhlbiIsInJvb20iLCJjb25zb2xlIiwibG9nIiwiY29uY2F0IiwidmlkZW9DaGF0V2luZG93IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm11dGVBdWRpbyIsInN0b3BWaWRlbyIsInVubXV0ZUF1ZGlvIiwic3RhcnRWaWRlbyIsImFkZEV2ZW50TGlzdGVuZXIiLCJsb2NhbFBhcnRpY2lwYW50IiwidmlkZW9UcmFja3MiLCJmb3JFYWNoIiwidHJhY2siLCJlbmFibGUiLCJhdWRpb1RyYWNrcyIsImRpc2FibGUiLCJhcHBlbmRDaGlsZCIsImF0dGFjaCIsImxvY2FsVmlkZW9UcmFjayIsInB1Ymxpc2hUcmFjayIsInB1YmxpY2F0aW9uIiwib24iLCJ0cmFja3MiLCJhdHRhY2hlZEVsZW1lbnRzIiwiZGV0YWNoIiwiZWxlbWVudCIsInJlbW92ZSIsImRpc2Nvbm5lY3QiLCJzdG9wIiwidW5wdWJsaXNoIiwiaGFuZGxlVHJhY2tEaXNhYmxlZCIsInBhcnRpY2lwYW50cyIsInBhcnRpY2lwYW50IiwiaXNTdWJzY3JpYmVkIiwiaGFuZGxlVHJhY2tFbmFibGVkIiwiaWRlbnRpdHkiLCJsZW5ndGgiLCJlcnJvciIsIm1lc3NhZ2UiLCJqb2luQ2hhdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJwb3N0IiwicmVzcG9uc2UiLCJkYXRhIiwiYWxlcnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwib25TdWJtaXQiLCJ0eXBlIiwiaWQiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJzcmMiXSwic291cmNlUm9vdCI6IiJ9