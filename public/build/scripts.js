"use strict";
(self["webpackChunkschool_app"] = self["webpackChunkschool_app"] || []).push([["scripts"],{

/***/ "./assets/js/scripts.js":
/*!******************************!*\
  !*** ./assets/js/scripts.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_parse_float_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.parse-float.js */ "./node_modules/core-js/modules/es.parse-float.js");
/* harmony import */ var core_js_modules_es_parse_float_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_float_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_15__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
















(function ($) {
  'use strict';

  /*===================================*
  01. LOADING JS
  /*===================================*/
  $(window).on('load', function () {
    setTimeout(function () {
      $(".preloader").delay(700).fadeOut(700).addClass('loaded');
    }, 800);
  });

  /*===================================*
  02. BACKGROUND IMAGE JS
  *===================================*/
  /*data image src*/
  $(".background_bg").each(function () {
    var attr = $(this).attr('data-img-src');
    if (_typeof(attr) !== ( true ? "undefined" : 0) && attr !== false) {
      $(this).css('background-image', 'url(' + attr + ')');
    }
  });

  /*===================================*
  03. ANIMATION JS
  *===================================*/
  $(function () {
    function ckScrollInit(items, trigger) {
      items.each(function () {
        var ckElement = $(this),
          AnimationClass = ckElement.attr('data-animation'),
          AnimationDelay = ckElement.attr('data-animation-delay');
        ckElement.css({
          '-webkit-animation-delay': AnimationDelay,
          '-moz-animation-delay': AnimationDelay,
          'animation-delay': AnimationDelay,
          opacity: 0
        });
        var ckTrigger = trigger ? trigger : ckElement;
        ckTrigger.waypoint(function () {
          ckElement.addClass("animated").css("opacity", "1");
          ckElement.addClass('animated').addClass(AnimationClass);
        }, {
          triggerOnce: true,
          offset: '90%'
        });
      });
    }
    ckScrollInit($('.animation'));
    ckScrollInit($('.staggered-animation'), $('.staggered-animation-wrap'));
  });

  /*===================================*
  04. MENU JS
  *===================================*/
  //Main navigation scroll spy for shadow
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 150) {
      $('header.fixed-top').addClass('nav-fixed');
    } else {
      $('header.fixed-top').removeClass('nav-fixed');
    }
  });

  //Show Hide dropdown-menu Main navigation 
  $(document).ready(function () {
    $('.dropdown-menu a.dropdown-toggler').on('click', function () {
      //var $el = $( this );
      //var $parent = $( this ).offsetParent( ".dropdown-menu" );
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');
      $(this).parent("li").toggleClass('show');
      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function () {
        $('.dropdown-menu .show').removeClass("show");
      });
      return false;
    });
  });

  //Hide Navbar Dropdown After Click On Links
  var navBar = $(".header_wrap");
  var navbarLinks = navBar.find(".navbar-collapse ul li a.page-scroll");
  $.each(navbarLinks, function () {
    var navbarLink = $(this);
    navbarLink.on('click', function () {
      navBar.find(".navbar-collapse").collapse('hide');
      $("header").removeClass("active");
    });
  });

  //Main navigation Active Class Add Remove
  $('.navbar-toggler').on('click', function () {
    $("header").toggleClass("active");
    if ($('.search-overlay').hasClass('open')) {
      $(".search-overlay").removeClass('open');
      $(".search_trigger").removeClass('open');
    }
  });
  $(document).ready(function () {
    if ($('.header_wrap').hasClass("fixed-top") && !$('.header_wrap').hasClass("transparent_header") && !$('.header_wrap').hasClass("no-sticky")) {
      $(".header_wrap").before('<div class="header_sticky_bar d-none"></div>');
    }
  });
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 150) {
      $('.header_sticky_bar').removeClass('d-none');
      $('header.no-sticky').removeClass('nav-fixed');
    } else {
      $('.header_sticky_bar').addClass('d-none');
    }
  });
  var setHeight = function setHeight() {
    var height_header = $(".header_wrap").height();
    $('.header_sticky_bar').css({
      'height': height_header
    });
  };
  $(window).on('load', function () {
    setHeight();
  });
  $(window).on('resize', function () {
    setHeight();
  });
  $('.sidetoggle').on('click', function () {
    $(this).addClass('open');
    $('body').addClass('sidetoggle_active');
    $('.sidebar_menu').addClass('active');
    $("body").append('<div id="header-overlay" class="header-overlay"></div>');
  });
  $(document).on('click', '#header-overlay, .sidemenu_close', function () {
    $('.sidetoggle').removeClass('open');
    $('body').removeClass('sidetoggle_active');
    $('.sidebar_menu').removeClass('active');
    $('#header-overlay').fadeOut('3000', function () {
      $('#header-overlay').remove();
    });
    return false;
  });
  $(".categories_btn").on('click', function () {
    $('.side_navbar_toggler').attr('aria-expanded', 'false');
    $('#navbarSidetoggle').removeClass('show');
  });
  $(".side_navbar_toggler").on('click', function () {
    $('.categories_btn').attr('aria-expanded', 'false');
    $('#navCatContent').removeClass('show');
  });
  $(".pr_search_trigger").on('click', function () {
    $(this).toggleClass('show');
    $('.product_search_form').toggleClass('show');
  });
  var rclass = true;
  $("html").on('click', function () {
    if (rclass) {
      $('.categories_btn').addClass('collapsed');
      $('.categories_btn,.side_navbar_toggler').attr('aria-expanded', 'false');
      $('#navCatContent,#navbarSidetoggle').removeClass('show');
    }
    rclass = true;
  });
  $(".categories_btn,#navCatContent,#navbarSidetoggle .navbar-nav,.side_navbar_toggler").on('click', function () {
    rclass = false;
  });

  /*===================================*
  05. SMOOTH SCROLLING JS
  *===================================*/
  // Select all links with hashes

  var topheaderHeight = $(".top-header").innerHeight();
  var mainheaderHeight = $(".header_wrap").innerHeight();
  var headerHeight = mainheaderHeight - topheaderHeight - 20;
  $('a.page-scroll[href*="#"]:not([href="#"])').on('click', function () {
    $('a.page-scroll.active').removeClass('active');
    $(this).closest('.page-scroll').addClass('active');
    // On-page links
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      // Figure out element to scroll to
      var target = $(this.hash),
        speed = $(this).data("speed") || 800;
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - headerHeight
        }, speed);
      }
    }
  });
  $(window).on('scroll', function () {
    var lastId,
      // All list items
      menuItems = $(".header_wrap").find("a.page-scroll"),
      topMenuHeight = $(".header_wrap").innerHeight() + 20,
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function () {
        var items = $($(this).attr("href"));
        if (items.length) {
          return items;
        }
      });
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop) return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";
    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems.closest('.page-scroll').removeClass("active").end().filter("[href='#" + id + "']").closest('.page-scroll').addClass("active");
    }
  });
  $('.more_slide_open').slideUp();
  $('.more_categories').on('click', function () {
    $(this).toggleClass('show');
    $('.more_slide_open').slideToggle();
  });

  /*===================================*
  06. SEARCH JS
  *===================================*/

  $(".close-search").on("click", function () {
    $(".search_wrap,.search_overlay").removeClass('open');
    $("body").removeClass('search_open');
  });
  var removeClass = true;
  $(".search_wrap").after('<div class="search_overlay"></div>');
  $(".search_trigger").on('click', function () {
    $(".search_wrap,.search_overlay").toggleClass('open');
    $("body").toggleClass('search_open');
    removeClass = false;
    if ($('.navbar-collapse').hasClass('show')) {
      $(".navbar-collapse").removeClass('show');
      $(".navbar-toggler").addClass('collapsed');
      $(".navbar-toggler").attr("aria-expanded", false);
    }
  });
  $(".search_wrap form").on('click', function () {
    removeClass = false;
  });
  $("html").on('click', function () {
    if (removeClass) {
      $("body").removeClass('open');
      $(".search_wrap,.search_overlay").removeClass('open');
      $("body").removeClass('search_open');
    }
    removeClass = true;
  });

  /*===================================*
  07. SCROLLUP JS
  *===================================*/
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 150) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });
  $(".scrollup").on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  /*===================================*
  08. PARALLAX JS
  *===================================*/
  $(window).on('load', function () {
    $('.parallax_bg').parallaxBackground();
  });

  /*===================================*
  09. MASONRY JS
  *===================================*/
  $(window).on("load", function () {
    var $grid_selectors = $(".grid_container");
    var filter_selectors = ".grid_filter > li > a";
    if ($grid_selectors.length > 0) {
      $grid_selectors.imagesLoaded(function () {
        if ($grid_selectors.hasClass("masonry")) {
          $grid_selectors.isotope({
            itemSelector: '.grid_item',
            percentPosition: true,
            layoutMode: "masonry",
            masonry: {
              columnWidth: '.grid-sizer'
            }
          });
        } else {
          $grid_selectors.isotope({
            itemSelector: '.grid_item',
            percentPosition: true,
            layoutMode: "fitRows"
          });
        }
      });
    }

    //isotope filter
    $(document).on("click", filter_selectors, function () {
      $(filter_selectors).removeClass("current");
      $(this).addClass("current");
      var dfselector = $(this).data('filter');
      if ($grid_selectors.hasClass("masonry")) {
        $grid_selectors.isotope({
          itemSelector: '.grid_item',
          layoutMode: "masonry",
          masonry: {
            columnWidth: '.grid_item'
          },
          filter: dfselector
        });
      } else {
        $grid_selectors.isotope({
          itemSelector: '.grid_item',
          layoutMode: "fitRows",
          filter: dfselector
        });
      }
      return false;
    });
    $('.portfolio_filter').on('change', function () {
      $grid_selectors.isotope({
        filter: this.value
      });
    });
    $(window).on("resize", function () {
      setTimeout(function () {
        $grid_selectors.find('.grid_item').removeClass('animation').removeClass('animated'); // avoid problem to filter after window resize
        $grid_selectors.isotope('layout');
      }, 300);
    });
  });
  $('.link_container').each(function () {
    $(this).magnificPopup({
      delegate: '.image_popup',
      type: 'image',
      mainClass: 'mfp-zoom-in',
      removalDelay: 500,
      gallery: {
        enabled: true
      }
    });
  });

  /*===================================*
  10. SLIDER JS
  *===================================*/
  function carousel_slider() {
    $('.carousel_slider').each(function () {
      var $carousel = $(this);
      $carousel.owlCarousel({
        dots: $carousel.data("dots"),
        loop: $carousel.data("loop"),
        items: $carousel.data("items"),
        margin: $carousel.data("margin"),
        mouseDrag: $carousel.data("mouse-drag"),
        touchDrag: $carousel.data("touch-drag"),
        autoHeight: $carousel.data("autoheight"),
        center: $carousel.data("center"),
        nav: $carousel.data("nav"),
        rewind: $carousel.data("rewind"),
        navText: ['<i class="ion-ios-arrow-left"></i>', '<i class="ion-ios-arrow-right"></i>'],
        autoplay: $carousel.data("autoplay"),
        animateIn: $carousel.data("animate-in"),
        animateOut: $carousel.data("animate-out"),
        autoplayTimeout: $carousel.data("autoplay-timeout"),
        smartSpeed: $carousel.data("smart-speed"),
        responsive: $carousel.data("responsive")
      });
    });
  }
  function slick_slider() {
    $('.slick_slider').each(function () {
      var $slick_carousel = $(this);
      $slick_carousel.slick({
        arrows: $slick_carousel.data("arrows"),
        dots: $slick_carousel.data("dots"),
        infinite: $slick_carousel.data("infinite"),
        centerMode: $slick_carousel.data("center-mode"),
        vertical: $slick_carousel.data("vertical"),
        fade: $slick_carousel.data("fade"),
        cssEase: $slick_carousel.data("css-ease"),
        autoplay: $slick_carousel.data("autoplay"),
        verticalSwiping: $slick_carousel.data("vertical-swiping"),
        autoplaySpeed: $slick_carousel.data("autoplay-speed"),
        speed: $slick_carousel.data("speed"),
        pauseOnHover: $slick_carousel.data("pause-on-hover"),
        draggable: $slick_carousel.data("draggable"),
        slidesToShow: $slick_carousel.data("slides-to-show"),
        slidesToScroll: $slick_carousel.data("slides-to-scroll"),
        asNavFor: $slick_carousel.data("as-nav-for"),
        focusOnSelect: $slick_carousel.data("focus-on-select"),
        responsive: $slick_carousel.data("responsive")
      });
    });
  }
  $(document).ready(function () {
    carousel_slider();
    slick_slider();
  });
  /*===================================*
  11. CONTACT FORM JS
  *===================================*/
  $("#submitButton").on("click", function (event) {
    event.preventDefault();
    var mydata = $("form").serialize();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "contact.php",
      data: mydata,
      success: function success(data) {
        if (data.type === "error") {
          $("#alert-msg").removeClass("alert, alert-success");
          $("#alert-msg").addClass("alert, alert-danger");
        } else {
          $("#alert-msg").addClass("alert, alert-success");
          $("#alert-msg").removeClass("alert, alert-danger");
          $("#first-name").val("Enter Name");
          $("#email").val("Enter Email");
          $("#phone").val("Enter Phone Number");
          $("#subject").val("Enter Subject");
          $("#description").val("Enter Message");
        }
        $("#alert-msg").html(data.msg);
        $("#alert-msg").show();
      },
      error: function error(xhr, textStatus) {
        alert(textStatus);
      }
    });
  });

  /*===================================*
  12. POPUP JS
  *===================================*/
  $('.content-popup').magnificPopup({
    type: 'inline',
    preloader: true,
    mainClass: 'mfp-zoom-in'
  });
  $('.image_gallery').each(function () {
    // the containers for all your galleries
    $(this).magnificPopup({
      delegate: 'a',
      // the selector for gallery item
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  });
  $('.popup-ajax').magnificPopup({
    type: 'ajax',
    callbacks: {
      ajaxContentAdded: function ajaxContentAdded() {
        carousel_slider();
        slick_slider();
      }
    }
  });
  $('.video_popup, .iframe_popup').magnificPopup({
    type: 'iframe',
    removalDelay: 160,
    mainClass: 'mfp-zoom-in',
    preloader: false,
    fixedContentPos: false
  });

  /*===================================*
  13. Select dropdowns
  *===================================*/

  if ($('select').length) {
    // Traverse through all dropdowns
    $.each($('select'), function (i, val) {
      var $el = $(val);
      if ($el.val() === "") {
        $el.addClass('first_null');
      }
      if (!$el.val()) {
        $el.addClass('not_chosen');
      }
      $el.on('change', function () {
        if (!$el.val()) $el.addClass('not_chosen');else $el.removeClass('not_chosen');
      });
    });
  }

  /*==============================================================
     14. FIT VIDEO JS
     ==============================================================*/
  if ($(".fit-videos").length > 0) {
    $(".fit-videos").fitVids({
      customSelector: "iframe[src^='https://w.soundcloud.com']"
    });
  }

  /*==============================================================
     15. DROPDOWN JS
     ==============================================================*/
  if ($(".custome_select").length > 0) {
    $(document).ready(function () {
      $(".custome_select").msDropdown();
    });
  }

  /*===================================*
     16.MAP JS
     *===================================*/
  if ($("#map").length > 0) {
    google.maps.event.addDomListener(window, 'load', init);
  }
  var map_selector = $('#map');
  function init() {
    var mapOptions = {
      zoom: map_selector.data("zoom"),
      mapTypeControl: false,
      center: new google.maps.LatLng(map_selector.data("latitude"), map_selector.data("longitude")) // New York
    };

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(map_selector.data("latitude"), map_selector.data("longitude")),
      map: map,
      icon: map_selector.data("icon"),
      title: map_selector.data("title")
    });
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  /*===================================*
     17. COUNTDOWN JS
     *===================================*/
  $('.countdown_time').each(function () {
    var endTime = $(this).data('time');
    $(this).countdown(endTime, function (tm) {
      $(this).html(tm.strftime('<div class="countdown_box"><div class="countdown-wrap"><span class="countdown days">%D </span><span class="cd_text">Days</span></div></div><div class="countdown_box"><div class="countdown-wrap"><span class="countdown hours">%H</span><span class="cd_text">Hours</span></div></div><div class="countdown_box"><div class="countdown-wrap"><span class="countdown minutes">%M</span><span class="cd_text">Minutes</span></div></div><div class="countdown_box"><div class="countdown-wrap"><span class="countdown seconds">%S</span><span class="cd_text">Seconds</span></div></div>'));
    });
  });

  /*===================================*
  18. List Grid JS
  *===================================*/
  $('.shorting_icon').on('click', function () {
    if ($(this).hasClass('grid')) {
      $('.shop_container').removeClass('list').addClass('grid');
      $(this).addClass('active').siblings().removeClass('active');
    } else if ($(this).hasClass('list')) {
      $('.shop_container').removeClass('grid').addClass('list');
      $(this).addClass('active').siblings().removeClass('active');
    }
    $(".shop_container").append('<div class="loading_pr"><div class="mfp-preloader"></div></div>');
    setTimeout(function () {
      $('.loading_pr').remove();
      $container.isotope('layout');
    }, 800);
  });

  /*===================================*
  19. TOOLTIP JS
  *===================================*/
  $(function () {
    $('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  });
  $(function () {
    $('[data-toggle="popover"]').popover();
  });

  /*===================================*
  20. PRODUCT COLOR JS
  *===================================*/
  $('.product_color_switch span').each(function () {
    var get_color = $(this).attr('data-color');
    $(this).css("background-color", get_color);
  });
  $('.product_color_switch span,.product_size_switch span').on("click", function () {
    $(this).siblings(this).removeClass('active').end().addClass('active');
  });

  /*===================================*
  21. QUICKVIEW POPUP + ZOOM IMAGE + PRODUCT SLIDER JS
  *===================================*/
  var image = $('#product_img');
  //var zoomConfig = {};
  var zoomActive = false;
  zoomActive = !zoomActive;
  if (zoomActive) {
    if ($(image).length > 0) {
      $(image).elevateZoom({
        cursor: "crosshair",
        easing: true,
        gallery: 'pr_item_gallery',
        zoomType: "inner",
        galleryActiveClass: "active"
      });
    }
  } else {
    $.removeData(image, 'elevateZoom'); //remove zoom instance from image
    $('.zoomContainer:last-child').remove(); // remove zoom container from DOM
  }

  $.magnificPopup.defaults.callbacks = {
    open: function open() {
      $('body').addClass('zoom_image');
    },
    close: function close() {
      // Wait until overflow:hidden has been removed from the html tag
      setTimeout(function () {
        $('body').removeClass('zoom_image');
        $('body').removeClass('zoom_gallery_image');
        $('.zoomContainer:last-child').remove(); // remove zoom container from DOM
        $('.zoomContainer').slice(1).remove();
      }, 100);
    }
  };

  // Set up gallery on click
  var galleryZoom = $('#pr_item_gallery');
  galleryZoom.magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {
      enabled: true
    },
    callbacks: {
      elementParse: function elementParse(item) {
        item.src = item.el.attr('data-zoom-image');
      }
    }
  });

  // Zoom image when click on icon
  $('.product_img_zoom').on('click', function () {
    var atual = $('#pr_item_gallery a').attr('data-zoom-image');
    $('body').addClass('zoom_gallery_image');
    $('#pr_item_gallery .item').each(function () {
      if (atual == $(this).find('.product_gallery_item').attr('data-zoom-image')) {
        return galleryZoom.magnificPopup('open', $(this).index());
      }
    });
  });
  $('.plus').on('click', function () {
    if ($(this).prev().val()) {
      $(this).prev().val(+$(this).prev().val() + 1);
    }
  });
  $('.minus').on('click', function () {
    if ($(this).next().val() > 1) {
      if ($(this).next().val() > 1) $(this).next().val(+$(this).next().val() - 1);
    }
  });

  /*===================================*
  22. PRICE FILTER JS
  *===================================*/
  $('#price_filter').each(function () {
    var $filter_selector = $(this);
    var a = $filter_selector.data("min-value");
    var b = $filter_selector.data("max-value");
    var c = $filter_selector.data("price-sign");
    $filter_selector.slider({
      range: true,
      min: $filter_selector.data("min"),
      max: $filter_selector.data("max"),
      values: [a, b],
      slide: function slide(event, ui) {
        $("#flt_price").html(c + ui.values[0] + " - " + c + ui.values[1]);
        $("#price_first").val(ui.values[0]);
        $("#price_second").val(ui.values[1]);
      }
    });
    $("#flt_price").html(c + $filter_selector.slider("values", 0) + " - " + c + $filter_selector.slider("values", 1));
  });

  /*===================================*
  23. RATING STAR JS
  *===================================*/
  $(document).ready(function () {
    $('.star_rating span').on('click', function () {
      var onStar = parseFloat($(this).data('value'), 10); // The star currently selected
      var stars = $(this).parent().children('.star_rating span');
      for (var i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
      }
      for (i = 0; i < onStar; i++) {
        $(stars[i]).addClass('selected');
      }
    });
  });

  /*===================================*
  24. CHECKBOX CHECK THEN ADD CLASS JS
  *===================================*/
  $('.create-account,.different_address').hide();
  $('#createaccount:checkbox').on('change', function () {
    if ($(this).is(":checked")) {
      $('.create-account').slideDown();
    } else {
      $('.create-account').slideUp();
    }
  });
  $('#differentaddress:checkbox').on('change', function () {
    if ($(this).is(":checked")) {
      $('.different_address').slideDown();
    } else {
      $('.different_address').slideUp();
    }
  });

  /*===================================*
  25. Cart Page Payment option
  *===================================*/
  $(document).ready(function () {
    $('[name="payment_option"]').on('change', function () {
      var $value = $(this).attr('value');
      $('.payment-text').slideUp();
      $('[data-method="' + $value + '"]').slideDown();
    });
  });

  /*===================================*
  26. ONLOAD POPUP JS
  *===================================*/

  $(window).on('load', function () {
    setTimeout(function () {
      $("#onload-popup").modal('show', {}, 500);
    }, 3000);
  });
  jQuery(document).ready(function () {
    jQuery(window).load(function () {
      $(".loader").fadeOut(25000);
    });
  });
})(jQuery);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_export_js","vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_arra-9ca245","vendors-node_modules_core-js_modules_es_string_iterator_js-node_modules_core-js_modules_es_sy-0eab75","vendors-node_modules_core-js_internals_validate-arguments-length_js-node_modules_core-js_modu-f12916","vendors-node_modules_jquery_dist_jquery_js","vendors-node_modules_core-js_modules_es_array_filter_js-node_modules_core-js_modules_es_array-1a7999"], () => (__webpack_exec__("./assets/js/scripts.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDO01BQzVCNUUsQ0FBQyxDQUFDLGdCQUFnQixHQUFDaU8sTUFBTSxHQUFDLElBQUksQ0FBQyxDQUFDRCxTQUFTLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUM7RUFDSCxDQUFDLENBQUM7O0VBRUY7QUFDRDtBQUNBOztFQUVDaE8sQ0FBQyxDQUFDQyxNQUFNLENBQUMsQ0FBQ0MsRUFBRSxDQUFDLE1BQU0sRUFBQyxZQUFVO0lBQzdCQyxVQUFVLENBQUMsWUFBVztNQUNyQkgsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDa08sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDMUMsQ0FBQyxFQUFFLElBQUksQ0FBQztFQUVULENBQUMsQ0FBQztFQUVGQyxNQUFNLENBQUN6TSxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFlBQVc7SUFFakN3TSxNQUFNLENBQUNsTyxNQUFNLENBQUMsQ0FBQ21PLElBQUksQ0FBQyxZQUFXO01BQzlCcE8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDSyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUMsQ0FBQztFQUVILENBQUMsQ0FBQztBQUNILENBQUMsRUFBRThOLE1BQU0sQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NjaG9vbC1hcHAvLi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2pxdWVyeSc7XHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHRcclxuXHQvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09KlxyXG5cdDAxLiBMT0FESU5HIEpTXHJcblx0Lyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblx0JCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JChcIi5wcmVsb2FkZXJcIikuZGVsYXkoNzAwKS5mYWRlT3V0KDcwMCkuYWRkQ2xhc3MoJ2xvYWRlZCcpO1xyXG5cdFx0fSwgODAwKTtcclxuXHR9KTtcclxuXHJcblx0Lyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSpcclxuXHQwMi4gQkFDS0dST1VORCBJTUFHRSBKU1xyXG5cdCo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblx0LypkYXRhIGltYWdlIHNyYyovXHJcblx0JChcIi5iYWNrZ3JvdW5kX2JnXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgYXR0ciA9ICQodGhpcykuYXR0cignZGF0YS1pbWctc3JjJyk7XHJcblx0XHRpZiAodHlwZW9mIGF0dHIgIT09IHR5cGVvZiB1bmRlZmluZWQgJiYgYXR0ciAhPT0gZmFsc2UpIHtcclxuXHRcdFx0JCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKCcgKyBhdHRyICsgJyknKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRcclxuXHQvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09KlxyXG5cdDAzLiBBTklNQVRJT04gSlNcclxuXHQqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cdCQoZnVuY3Rpb24oKSB7XHJcblx0XHJcblx0XHRmdW5jdGlvbiBja1Njcm9sbEluaXQoaXRlbXMsIHRyaWdnZXIpIHtcclxuXHRcdFx0aXRlbXMuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgY2tFbGVtZW50ID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdEFuaW1hdGlvbkNsYXNzID0gY2tFbGVtZW50LmF0dHIoJ2RhdGEtYW5pbWF0aW9uJyksXHJcblx0XHRcdFx0XHRBbmltYXRpb25EZWxheSA9IGNrRWxlbWVudC5hdHRyKCdkYXRhLWFuaW1hdGlvbi1kZWxheScpO1xyXG5cdFxyXG5cdFx0XHRcdGNrRWxlbWVudC5jc3Moe1xyXG5cdFx0XHRcdFx0Jy13ZWJraXQtYW5pbWF0aW9uLWRlbGF5JzogQW5pbWF0aW9uRGVsYXksXHJcblx0XHRcdFx0XHQnLW1vei1hbmltYXRpb24tZGVsYXknOiBBbmltYXRpb25EZWxheSxcclxuXHRcdFx0XHRcdCdhbmltYXRpb24tZGVsYXknOiBBbmltYXRpb25EZWxheSxcclxuXHRcdFx0XHRcdG9wYWNpdHk6IDBcclxuXHRcdFx0XHR9KTtcclxuXHRcclxuXHRcdFx0XHR2YXIgY2tUcmlnZ2VyID0gKHRyaWdnZXIpID8gdHJpZ2dlciA6IGNrRWxlbWVudDtcclxuXHRcclxuXHRcdFx0XHRja1RyaWdnZXIud2F5cG9pbnQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRja0VsZW1lbnQuYWRkQ2xhc3MoXCJhbmltYXRlZFwiKS5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuXHRcdFx0XHRcdGNrRWxlbWVudC5hZGRDbGFzcygnYW5pbWF0ZWQnKS5hZGRDbGFzcyhBbmltYXRpb25DbGFzcyk7XHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0dHJpZ2dlck9uY2U6IHRydWUsXHJcblx0XHRcdFx0XHRvZmZzZXQ6ICc5MCUnLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcclxuXHRcdGNrU2Nyb2xsSW5pdCgkKCcuYW5pbWF0aW9uJykpO1xyXG5cdFx0Y2tTY3JvbGxJbml0KCQoJy5zdGFnZ2VyZWQtYW5pbWF0aW9uJyksICQoJy5zdGFnZ2VyZWQtYW5pbWF0aW9uLXdyYXAnKSk7XHJcblx0XHJcblx0fSk7XHJcblx0XHJcblx0Lyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSpcclxuXHQwNC4gTUVOVSBKU1xyXG5cdCo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblx0Ly9NYWluIG5hdmlnYXRpb24gc2Nyb2xsIHNweSBmb3Igc2hhZG93XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdCAgICBpZiAoc2Nyb2xsID49IDE1MCkge1xyXG5cdCAgICAgICAgJCgnaGVhZGVyLmZpeGVkLXRvcCcpLmFkZENsYXNzKCduYXYtZml4ZWQnKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgICQoJ2hlYWRlci5maXhlZC10b3AnKS5yZW1vdmVDbGFzcygnbmF2LWZpeGVkJyk7XHJcblx0ICAgIH1cclxuXHJcblx0fSk7XHJcblx0XHJcblx0Ly9TaG93IEhpZGUgZHJvcGRvd24tbWVudSBNYWluIG5hdmlnYXRpb24gXHJcblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cdFx0JCggJy5kcm9wZG93bi1tZW51IGEuZHJvcGRvd24tdG9nZ2xlcicgKS5vbiggJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvL3ZhciAkZWwgPSAkKCB0aGlzICk7XHJcblx0XHRcdC8vdmFyICRwYXJlbnQgPSAkKCB0aGlzICkub2Zmc2V0UGFyZW50KCBcIi5kcm9wZG93bi1tZW51XCIgKTtcclxuXHRcdFx0aWYgKCAhJCggdGhpcyApLm5leHQoKS5oYXNDbGFzcyggJ3Nob3cnICkgKSB7XHJcblx0XHRcdFx0JCggdGhpcyApLnBhcmVudHMoICcuZHJvcGRvd24tbWVudScgKS5maXJzdCgpLmZpbmQoICcuc2hvdycgKS5yZW1vdmVDbGFzcyggXCJzaG93XCIgKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgJHN1Yk1lbnUgPSAkKCB0aGlzICkubmV4dCggXCIuZHJvcGRvd24tbWVudVwiICk7XHJcblx0XHRcdCRzdWJNZW51LnRvZ2dsZUNsYXNzKCAnc2hvdycgKTtcclxuXHRcdFx0XHJcblx0XHRcdCQoIHRoaXMgKS5wYXJlbnQoIFwibGlcIiApLnRvZ2dsZUNsYXNzKCAnc2hvdycgKTtcclxuXHRcclxuXHRcdFx0JCggdGhpcyApLnBhcmVudHMoICdsaS5uYXYtaXRlbS5kcm9wZG93bi5zaG93JyApLm9uKCAnaGlkZGVuLmJzLmRyb3Bkb3duJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdCQoICcuZHJvcGRvd24tbWVudSAuc2hvdycgKS5yZW1vdmVDbGFzcyggXCJzaG93XCIgKTtcclxuXHRcdFx0fSApO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblx0XHJcblx0Ly9IaWRlIE5hdmJhciBEcm9wZG93biBBZnRlciBDbGljayBPbiBMaW5rc1xyXG5cdHZhciBuYXZCYXIgPSAkKFwiLmhlYWRlcl93cmFwXCIpO1xyXG5cdHZhciBuYXZiYXJMaW5rcyA9IG5hdkJhci5maW5kKFwiLm5hdmJhci1jb2xsYXBzZSB1bCBsaSBhLnBhZ2Utc2Nyb2xsXCIpO1xyXG5cclxuICAgICQuZWFjaCggbmF2YmFyTGlua3MsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdmFyIG5hdmJhckxpbmsgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICBuYXZiYXJMaW5rLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIG5hdkJhci5maW5kKFwiLm5hdmJhci1jb2xsYXBzZVwiKS5jb2xsYXBzZSgnaGlkZScpO1xyXG5cdFx0ICAkKFwiaGVhZGVyXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cdFxyXG5cdC8vTWFpbiBuYXZpZ2F0aW9uIEFjdGl2ZSBDbGFzcyBBZGQgUmVtb3ZlXHJcblx0JCgnLm5hdmJhci10b2dnbGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKFwiaGVhZGVyXCIpLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0aWYoJCgnLnNlYXJjaC1vdmVybGF5JykuaGFzQ2xhc3MoJ29wZW4nKSlcclxuXHRcdHtcclxuXHRcdFx0JChcIi5zZWFyY2gtb3ZlcmxheVwiKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG5cdFx0XHQkKFwiLnNlYXJjaF90cmlnZ2VyXCIpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0XHJcblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCQoJy5oZWFkZXJfd3JhcCcpLmhhc0NsYXNzKFwiZml4ZWQtdG9wXCIpICYmICEkKCcuaGVhZGVyX3dyYXAnKS5oYXNDbGFzcyhcInRyYW5zcGFyZW50X2hlYWRlclwiKSAmJiAhJCgnLmhlYWRlcl93cmFwJykuaGFzQ2xhc3MoXCJuby1zdGlja3lcIikpIHtcclxuXHRcdFx0JChcIi5oZWFkZXJfd3JhcFwiKS5iZWZvcmUoJzxkaXYgY2xhc3M9XCJoZWFkZXJfc3RpY2t5X2JhciBkLW5vbmVcIj48L2Rpdj4nKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRcclxuXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcblx0ICAgIGlmIChzY3JvbGwgPj0gMTUwKSB7XHJcblx0ICAgICAgICAkKCcuaGVhZGVyX3N0aWNreV9iYXInKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcblx0XHRcdCQoJ2hlYWRlci5uby1zdGlja3knKS5yZW1vdmVDbGFzcygnbmF2LWZpeGVkJyk7XHJcblx0XHRcdFxyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgJCgnLmhlYWRlcl9zdGlja3lfYmFyJykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cdCAgICB9XHJcblxyXG5cdH0pO1xyXG5cdFxyXG5cdHZhciBzZXRIZWlnaHQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBoZWlnaHRfaGVhZGVyID0gJChcIi5oZWFkZXJfd3JhcFwiKS5oZWlnaHQoKTtcclxuXHRcdCQoJy5oZWFkZXJfc3RpY2t5X2JhcicpLmNzcyh7J2hlaWdodCc6aGVpZ2h0X2hlYWRlcn0pO1xyXG5cdH07XHJcblx0XHJcblx0JCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblx0ICBzZXRIZWlnaHQoKTtcclxuXHR9KTtcclxuXHRcclxuXHQkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xyXG5cdCAgc2V0SGVpZ2h0KCk7XHJcblx0fSk7XHJcblx0XHJcblx0JCgnLnNpZGV0b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKHRoaXMpLmFkZENsYXNzKCdvcGVuJyk7XHJcblx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ3NpZGV0b2dnbGVfYWN0aXZlJyk7XHJcblx0XHQkKCcuc2lkZWJhcl9tZW51JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0JChcImJvZHlcIikuYXBwZW5kKCc8ZGl2IGlkPVwiaGVhZGVyLW92ZXJsYXlcIiBjbGFzcz1cImhlYWRlci1vdmVybGF5XCI+PC9kaXY+Jyk7XHJcblx0fSk7XHJcblx0XHJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNoZWFkZXItb3ZlcmxheSwgLnNpZGVtZW51X2Nsb3NlJyxmdW5jdGlvbigpIHtcclxuXHRcdCQoJy5zaWRldG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuXHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnc2lkZXRvZ2dsZV9hY3RpdmUnKTtcclxuXHRcdCQoJy5zaWRlYmFyX21lbnUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHQkKCcjaGVhZGVyLW92ZXJsYXknKS5mYWRlT3V0KCczMDAwJyxmdW5jdGlvbigpe1xyXG5cdFx0XHQkKCcjaGVhZGVyLW92ZXJsYXknKS5yZW1vdmUoKTtcclxuXHRcdH0pOyAgXHJcblx0XHQgcmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdFxyXG5cdCQoXCIuY2F0ZWdvcmllc19idG5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKCcuc2lkZV9uYXZiYXJfdG9nZ2xlcicpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcclxuXHRcdCQoJyNuYXZiYXJTaWRldG9nZ2xlJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHR9KTtcclxuXHRcclxuXHQkKFwiLnNpZGVfbmF2YmFyX3RvZ2dsZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHQkKCcuY2F0ZWdvcmllc19idG4nKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XHJcblx0XHQkKCcjbmF2Q2F0Q29udGVudCcpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0fSk7XHJcblx0XHJcblx0JChcIi5wcl9zZWFyY2hfdHJpZ2dlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdCQoJy5wcm9kdWN0X3NlYXJjaF9mb3JtJykudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcclxuXHR9KTtcclxuXHRcclxuXHR2YXIgcmNsYXNzID0gdHJ1ZTtcclxuXHRcclxuXHQkKFwiaHRtbFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAocmNsYXNzKSB7XHJcblx0XHRcdCQoJy5jYXRlZ29yaWVzX2J0bicpLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcclxuXHRcdFx0JCgnLmNhdGVnb3JpZXNfYnRuLC5zaWRlX25hdmJhcl90b2dnbGVyJykuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xyXG5cdFx0XHQkKCcjbmF2Q2F0Q29udGVudCwjbmF2YmFyU2lkZXRvZ2dsZScpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHR9XHJcblx0XHRyY2xhc3MgPSB0cnVlO1xyXG5cdH0pO1xyXG5cdFxyXG5cdCQoXCIuY2F0ZWdvcmllc19idG4sI25hdkNhdENvbnRlbnQsI25hdmJhclNpZGV0b2dnbGUgLm5hdmJhci1uYXYsLnNpZGVfbmF2YmFyX3RvZ2dsZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRyY2xhc3MgPSBmYWxzZTtcclxuXHR9KTtcclxuXHRcclxuXHQvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09KlxyXG5cdDA1LiBTTU9PVEggU0NST0xMSU5HIEpTXHJcblx0Kj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHQvLyBTZWxlY3QgYWxsIGxpbmtzIHdpdGggaGFzaGVzXHJcblx0XHJcblx0dmFyIHRvcGhlYWRlckhlaWdodCA9ICQoXCIudG9wLWhlYWRlclwiKS5pbm5lckhlaWdodCgpO1xyXG5cdHZhciBtYWluaGVhZGVySGVpZ2h0ID0gJChcIi5oZWFkZXJfd3JhcFwiKS5pbm5lckhlaWdodCgpO1xyXG5cdHZhciBoZWFkZXJIZWlnaHQgPSBtYWluaGVhZGVySGVpZ2h0IC0gdG9waGVhZGVySGVpZ2h0IC0gMjA7XHJcbiAgICAkKCdhLnBhZ2Utc2Nyb2xsW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnYS5wYWdlLXNjcm9sbC5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5wYWdlLXNjcm9sbCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAvLyBPbi1wYWdlIGxpbmtzXHJcbiAgICAgICAgaWYgKCBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpID09PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT09IHRoaXMuaG9zdG5hbWUgKSB7XHJcbiAgICAgICAgICAvLyBGaWd1cmUgb3V0IGVsZW1lbnQgdG8gc2Nyb2xsIHRvXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpLFxyXG4gICAgICAgICAgICAgIHNwZWVkPSAkKHRoaXMpLmRhdGEoXCJzcGVlZFwiKSB8fCA4MDA7XHJcbiAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyAnXScpO1xyXG5cclxuICAgICAgICAgIC8vIERvZXMgYSBzY3JvbGwgdGFyZ2V0IGV4aXN0P1xyXG4gICAgICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy8gT25seSBwcmV2ZW50IGRlZmF1bHQgaWYgYW5pbWF0aW9uIGlzIGFjdHVhbGx5IGdvbm5hIGhhcHBlblxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIC0gaGVhZGVySGVpZ2h0XHJcbiAgICAgICAgICAgIH0sIHNwZWVkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbGFzdElkLFxyXG5cdFx0XHQvLyBBbGwgbGlzdCBpdGVtc1xyXG5cdFx0XHRtZW51SXRlbXMgPSAkKFwiLmhlYWRlcl93cmFwXCIpLmZpbmQoXCJhLnBhZ2Utc2Nyb2xsXCIpLFxyXG5cdFx0XHR0b3BNZW51SGVpZ2h0ID0gJChcIi5oZWFkZXJfd3JhcFwiKS5pbm5lckhlaWdodCgpICsgMjAsXHJcblx0XHRcdC8vIEFuY2hvcnMgY29ycmVzcG9uZGluZyB0byBtZW51IGl0ZW1zXHJcblx0XHRcdHNjcm9sbEl0ZW1zID0gbWVudUl0ZW1zLm1hcChmdW5jdGlvbigpe1xyXG5cdFx0XHQgIHZhciBpdGVtcyA9ICQoJCh0aGlzKS5hdHRyKFwiaHJlZlwiKSk7XHJcblx0XHRcdCAgaWYgKGl0ZW1zLmxlbmd0aCkgeyByZXR1cm4gaXRlbXM7IH1cclxuXHRcdFx0fSk7XHJcblx0XHR2YXIgZnJvbVRvcCA9ICQodGhpcykuc2Nyb2xsVG9wKCkrdG9wTWVudUhlaWdodDtcclxuXHQgICBcclxuXHQgICAvLyBHZXQgaWQgb2YgY3VycmVudCBzY3JvbGwgaXRlbVxyXG5cdFx0dmFyIGN1ciA9IHNjcm9sbEl0ZW1zLm1hcChmdW5jdGlvbigpe1xyXG5cdFx0IGlmICgkKHRoaXMpLm9mZnNldCgpLnRvcCA8IGZyb21Ub3ApXHJcblx0XHQgICByZXR1cm4gdGhpcztcclxuXHQgICB9KTtcclxuXHQgICAvLyBHZXQgdGhlIGlkIG9mIHRoZSBjdXJyZW50IGVsZW1lbnRcclxuXHQgICBjdXIgPSBjdXJbY3VyLmxlbmd0aC0xXTtcclxuXHQgICB2YXIgaWQgPSBjdXIgJiYgY3VyLmxlbmd0aCA/IGN1clswXS5pZCA6IFwiXCI7XHJcblx0ICAgXHJcblx0ICAgaWYgKGxhc3RJZCAhPT0gaWQpIHtcclxuXHRcdCAgIGxhc3RJZCA9IGlkO1xyXG5cdFx0ICAgLy8gU2V0L3JlbW92ZSBhY3RpdmUgY2xhc3NcclxuXHRcdCAgIG1lbnVJdGVtcy5jbG9zZXN0KCcucGFnZS1zY3JvbGwnKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKS5lbmQoKS5maWx0ZXIoXCJbaHJlZj0nI1wiK2lkK1wiJ11cIikuY2xvc2VzdCgnLnBhZ2Utc2Nyb2xsJykuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0ICAgfSAgXHJcblx0XHRcclxuXHR9KTtcclxuXHRcclxuXHQkKCcubW9yZV9zbGlkZV9vcGVuJykuc2xpZGVVcCgpO1x0XHJcbiAgICAkKCcubW9yZV9jYXRlZ29yaWVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XHJcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHQkKCcubW9yZV9zbGlkZV9vcGVuJykuc2xpZGVUb2dnbGUoKTtcclxuICAgIH0pO1xyXG5cdFxyXG5cdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qXHJcblx0MDYuIFNFQVJDSCBKU1xyXG5cdCo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbiAgICBcclxuXHQkKFwiLmNsb3NlLXNlYXJjaFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0JChcIi5zZWFyY2hfd3JhcCwuc2VhcmNoX292ZXJsYXlcIikucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuXHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKCdzZWFyY2hfb3BlbicpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdHZhciByZW1vdmVDbGFzcyA9IHRydWU7XHJcblx0JChcIi5zZWFyY2hfd3JhcFwiKS5hZnRlcignPGRpdiBjbGFzcz1cInNlYXJjaF9vdmVybGF5XCI+PC9kaXY+Jyk7XHJcblx0JChcIi5zZWFyY2hfdHJpZ2dlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKFwiLnNlYXJjaF93cmFwLC5zZWFyY2hfb3ZlcmxheVwiKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG5cdFx0JChcImJvZHlcIikudG9nZ2xlQ2xhc3MoJ3NlYXJjaF9vcGVuJyk7XHJcblx0XHRyZW1vdmVDbGFzcyA9IGZhbHNlO1xyXG5cdFx0aWYoJCgnLm5hdmJhci1jb2xsYXBzZScpLmhhc0NsYXNzKCdzaG93JykpXHJcblx0XHR7XHJcblx0XHRcdCQoXCIubmF2YmFyLWNvbGxhcHNlXCIpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdCQoXCIubmF2YmFyLXRvZ2dsZXJcIikuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG5cdFx0XHQkKFwiLm5hdmJhci10b2dnbGVyXCIpLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIGZhbHNlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHQkKFwiLnNlYXJjaF93cmFwIGZvcm1cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRyZW1vdmVDbGFzcyA9IGZhbHNlO1xyXG5cdH0pO1xyXG5cdCQoXCJodG1sXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChyZW1vdmVDbGFzcykge1xyXG5cdFx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG5cdFx0XHQkKFwiLnNlYXJjaF93cmFwLC5zZWFyY2hfb3ZlcmxheVwiKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG5cdFx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcygnc2VhcmNoX29wZW4nKTtcclxuXHRcdH1cclxuXHRcdHJlbW92ZUNsYXNzID0gdHJ1ZTtcclxuXHR9KTtcclxuXHRcclxuXHQvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09KlxyXG5cdDA3LiBTQ1JPTExVUCBKU1xyXG5cdCo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMTUwKSB7XHJcblx0XHRcdCQoJy5zY3JvbGx1cCcpLmZhZGVJbigpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnLnNjcm9sbHVwJykuZmFkZU91dCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFxyXG5cdCQoXCIuc2Nyb2xsdXBcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuXHRcdFx0c2Nyb2xsVG9wOiAwXHJcblx0XHR9LCA2MDApO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qXHJcblx0MDguIFBBUkFMTEFYIEpTXHJcblx0Kj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHQkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcucGFyYWxsYXhfYmcnKS5wYXJhbGxheEJhY2tncm91bmQoKTtcclxuXHR9KTtcclxuXHRcclxuXHQvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09KlxyXG5cdDA5LiBNQVNPTlJZIEpTXHJcblx0Kj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHQkKCB3aW5kb3cgKS5vbiggXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyICRncmlkX3NlbGVjdG9ycyAgPSAkKFwiLmdyaWRfY29udGFpbmVyXCIpO1xyXG5cdFx0dmFyIGZpbHRlcl9zZWxlY3RvcnMgPSBcIi5ncmlkX2ZpbHRlciA+IGxpID4gYVwiO1xyXG5cdFx0aWYoICRncmlkX3NlbGVjdG9ycy5sZW5ndGggPiAwICkge1xyXG5cdFx0XHQkZ3JpZF9zZWxlY3RvcnMuaW1hZ2VzTG9hZGVkKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYgKCRncmlkX3NlbGVjdG9ycy5oYXNDbGFzcyhcIm1hc29ucnlcIikpe1xyXG5cdFx0XHRcdFx0JGdyaWRfc2VsZWN0b3JzLmlzb3RvcGUoe1xyXG5cdFx0XHRcdFx0XHRpdGVtU2VsZWN0b3I6ICcuZ3JpZF9pdGVtJyxcclxuXHRcdFx0XHRcdFx0cGVyY2VudFBvc2l0aW9uOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRsYXlvdXRNb2RlOiBcIm1hc29ucnlcIixcclxuXHRcdFx0XHRcdFx0bWFzb25yeToge1xyXG5cdFx0XHRcdFx0XHRcdGNvbHVtbldpZHRoOiAnLmdyaWQtc2l6ZXInXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9IFxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0JGdyaWRfc2VsZWN0b3JzLmlzb3RvcGUoe1xyXG5cdFx0XHRcdFx0XHRpdGVtU2VsZWN0b3I6ICcuZ3JpZF9pdGVtJyxcclxuXHRcdFx0XHRcdFx0cGVyY2VudFBvc2l0aW9uOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRsYXlvdXRNb2RlOiBcImZpdFJvd3NcIixcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHJcblx0XHQvL2lzb3RvcGUgZmlsdGVyXHJcblx0XHQkKGRvY3VtZW50KS5vbiggXCJjbGlja1wiLCBmaWx0ZXJfc2VsZWN0b3JzLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0JChmaWx0ZXJfc2VsZWN0b3JzKS5yZW1vdmVDbGFzcyhcImN1cnJlbnRcIik7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJjdXJyZW50XCIpO1xyXG5cdFx0XHR2YXIgZGZzZWxlY3RvciA9ICQodGhpcykuZGF0YSgnZmlsdGVyJyk7XHJcblx0XHRcdGlmICgkZ3JpZF9zZWxlY3RvcnMuaGFzQ2xhc3MoXCJtYXNvbnJ5XCIpKXtcclxuXHRcdFx0XHQkZ3JpZF9zZWxlY3RvcnMuaXNvdG9wZSh7XHJcblx0XHRcdFx0XHRpdGVtU2VsZWN0b3I6ICcuZ3JpZF9pdGVtJyxcclxuXHRcdFx0XHRcdGxheW91dE1vZGU6IFwibWFzb25yeVwiLFxyXG5cdFx0XHRcdFx0bWFzb25yeToge1xyXG5cdFx0XHRcdFx0XHRjb2x1bW5XaWR0aDogJy5ncmlkX2l0ZW0nXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZmlsdGVyOiBkZnNlbGVjdG9yXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gXHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdCRncmlkX3NlbGVjdG9ycy5pc290b3BlKHtcclxuXHRcdFx0XHRcdGl0ZW1TZWxlY3RvcjogJy5ncmlkX2l0ZW0nLFxyXG5cdFx0XHRcdFx0bGF5b3V0TW9kZTogXCJmaXRSb3dzXCIsXHJcblx0XHRcdFx0XHRmaWx0ZXI6IGRmc2VsZWN0b3JcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0JCgnLnBvcnRmb2xpb19maWx0ZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRncmlkX3NlbGVjdG9ycy5pc290b3BlKHtcclxuXHRcdFx0ICBmaWx0ZXI6IHRoaXMudmFsdWVcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHQkZ3JpZF9zZWxlY3RvcnMuZmluZCgnLmdyaWRfaXRlbScpLnJlbW92ZUNsYXNzKCdhbmltYXRpb24nKS5yZW1vdmVDbGFzcygnYW5pbWF0ZWQnKTsgLy8gYXZvaWQgcHJvYmxlbSB0byBmaWx0ZXIgYWZ0ZXIgd2luZG93IHJlc2l6ZVxyXG5cdFx0XHRcdCRncmlkX3NlbGVjdG9ycy5pc290b3BlKCdsYXlvdXQnKTtcclxuXHRcdFx0fSwgMzAwKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cdFxyXG5cdCQoJy5saW5rX2NvbnRhaW5lcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0JCh0aGlzKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdFx0ZGVsZWdhdGU6ICcuaW1hZ2VfcG9wdXAnLFxyXG5cdFx0XHR0eXBlOiAnaW1hZ2UnLFxyXG5cdFx0XHRtYWluQ2xhc3M6ICdtZnAtem9vbS1pbicsXHJcblx0XHRcdHJlbW92YWxEZWxheTogNTAwLFxyXG5cdFx0XHRnYWxsZXJ5OiB7XHJcblx0XHRcdFx0ZW5hYmxlZDogdHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHRcclxuXHQvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09KlxyXG5cdDEwLiBTTElERVIgSlNcclxuXHQqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cdGZ1bmN0aW9uIGNhcm91c2VsX3NsaWRlcigpIHtcclxuXHRcdCQoJy5jYXJvdXNlbF9zbGlkZXInKS5lYWNoKCBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyICRjYXJvdXNlbCA9ICQodGhpcyk7XHJcblx0XHRcdCRjYXJvdXNlbC5vd2xDYXJvdXNlbCh7XHJcblx0XHRcdFx0ZG90cyA6ICRjYXJvdXNlbC5kYXRhKFwiZG90c1wiKSxcclxuXHRcdFx0XHRsb29wIDogJGNhcm91c2VsLmRhdGEoXCJsb29wXCIpLFxyXG5cdFx0XHRcdGl0ZW1zOiAkY2Fyb3VzZWwuZGF0YShcIml0ZW1zXCIpLFxyXG5cdFx0XHRcdG1hcmdpbjogJGNhcm91c2VsLmRhdGEoXCJtYXJnaW5cIiksXHJcblx0XHRcdFx0bW91c2VEcmFnOiAkY2Fyb3VzZWwuZGF0YShcIm1vdXNlLWRyYWdcIiksXHJcblx0XHRcdFx0dG91Y2hEcmFnOiAkY2Fyb3VzZWwuZGF0YShcInRvdWNoLWRyYWdcIiksXHJcblx0XHRcdFx0YXV0b0hlaWdodDogJGNhcm91c2VsLmRhdGEoXCJhdXRvaGVpZ2h0XCIpLFxyXG5cdFx0XHRcdGNlbnRlcjogJGNhcm91c2VsLmRhdGEoXCJjZW50ZXJcIiksXHJcblx0XHRcdFx0bmF2OiAkY2Fyb3VzZWwuZGF0YShcIm5hdlwiKSxcclxuXHRcdFx0XHRyZXdpbmQ6ICRjYXJvdXNlbC5kYXRhKFwicmV3aW5kXCIpLFxyXG5cdFx0XHRcdG5hdlRleHQ6IFsnPGkgY2xhc3M9XCJpb24taW9zLWFycm93LWxlZnRcIj48L2k+JywgJzxpIGNsYXNzPVwiaW9uLWlvcy1hcnJvdy1yaWdodFwiPjwvaT4nXSxcclxuXHRcdFx0XHRhdXRvcGxheSA6ICRjYXJvdXNlbC5kYXRhKFwiYXV0b3BsYXlcIiksXHJcblx0XHRcdFx0YW5pbWF0ZUluIDogJGNhcm91c2VsLmRhdGEoXCJhbmltYXRlLWluXCIpLFxyXG5cdFx0XHRcdGFuaW1hdGVPdXQ6ICRjYXJvdXNlbC5kYXRhKFwiYW5pbWF0ZS1vdXRcIiksXHJcblx0XHRcdFx0YXV0b3BsYXlUaW1lb3V0IDogJGNhcm91c2VsLmRhdGEoXCJhdXRvcGxheS10aW1lb3V0XCIpLFxyXG5cdFx0XHRcdHNtYXJ0U3BlZWQ6ICRjYXJvdXNlbC5kYXRhKFwic21hcnQtc3BlZWRcIiksXHJcblx0XHRcdFx0cmVzcG9uc2l2ZTogJGNhcm91c2VsLmRhdGEoXCJyZXNwb25zaXZlXCIpXHJcblx0XHRcdH0pO1x0XHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gc2xpY2tfc2xpZGVyKCkge1xyXG5cdFx0JCgnLnNsaWNrX3NsaWRlcicpLmVhY2goIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgJHNsaWNrX2Nhcm91c2VsID0gJCh0aGlzKTtcclxuXHRcdFx0JHNsaWNrX2Nhcm91c2VsLnNsaWNrKHtcclxuXHRcdFx0XHRhcnJvd3M6ICRzbGlja19jYXJvdXNlbC5kYXRhKFwiYXJyb3dzXCIpLFxyXG5cdFx0XHRcdGRvdHM6ICRzbGlja19jYXJvdXNlbC5kYXRhKFwiZG90c1wiKSxcclxuXHRcdFx0XHRpbmZpbml0ZTogJHNsaWNrX2Nhcm91c2VsLmRhdGEoXCJpbmZpbml0ZVwiKSxcclxuXHRcdFx0XHRjZW50ZXJNb2RlOiAkc2xpY2tfY2Fyb3VzZWwuZGF0YShcImNlbnRlci1tb2RlXCIpLFxyXG5cdFx0XHRcdHZlcnRpY2FsOiAkc2xpY2tfY2Fyb3VzZWwuZGF0YShcInZlcnRpY2FsXCIpLFxyXG5cdFx0XHRcdGZhZGU6ICRzbGlja19jYXJvdXNlbC5kYXRhKFwiZmFkZVwiKSxcclxuXHRcdFx0XHRjc3NFYXNlOiAkc2xpY2tfY2Fyb3VzZWwuZGF0YShcImNzcy1lYXNlXCIpLFxyXG5cdFx0XHRcdGF1dG9wbGF5OiAkc2xpY2tfY2Fyb3VzZWwuZGF0YShcImF1dG9wbGF5XCIpLFxyXG5cdFx0XHRcdHZlcnRpY2FsU3dpcGluZzogJHNsaWNrX2Nhcm91c2VsLmRhdGEoXCJ2ZXJ0aWNhbC1zd2lwaW5nXCIpLFxyXG5cdFx0XHRcdGF1dG9wbGF5U3BlZWQ6ICRzbGlja19jYXJvdXNlbC5kYXRhKFwiYXV0b3BsYXktc3BlZWRcIiksXHJcblx0XHRcdFx0c3BlZWQ6ICRzbGlja19jYXJvdXNlbC5kYXRhKFwic3BlZWRcIiksXHJcblx0XHRcdFx0cGF1c2VPbkhvdmVyOiAkc2xpY2tfY2Fyb3VzZWwuZGF0YShcInBhdXNlLW9uLWhvdmVyXCIpLFxyXG5cdFx0XHRcdGRyYWdnYWJsZTogJHNsaWNrX2Nhcm91c2VsLmRhdGEoXCJkcmFnZ2FibGVcIiksXHJcblx0XHRcdFx0c2xpZGVzVG9TaG93OiAkc2xpY2tfY2Fyb3VzZWwuZGF0YShcInNsaWRlcy10by1zaG93XCIpLFxyXG5cdFx0XHRcdHNsaWRlc1RvU2Nyb2xsOiAkc2xpY2tfY2Fyb3VzZWwuZGF0YShcInNsaWRlcy10by1zY3JvbGxcIiksXHJcblx0XHRcdFx0YXNOYXZGb3I6ICRzbGlja19jYXJvdXNlbC5kYXRhKFwiYXMtbmF2LWZvclwiKSxcclxuXHRcdFx0XHRmb2N1c09uU2VsZWN0OiAkc2xpY2tfY2Fyb3VzZWwuZGF0YShcImZvY3VzLW9uLXNlbGVjdFwiKSxcclxuXHRcdFx0XHRyZXNwb25zaXZlOiAkc2xpY2tfY2Fyb3VzZWwuZGF0YShcInJlc3BvbnNpdmVcIilcclxuXHRcdFx0fSk7XHRcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHRcclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblx0XHRjYXJvdXNlbF9zbGlkZXIoKTtcclxuXHRcdHNsaWNrX3NsaWRlcigpO1xyXG5cdH0pO1xyXG5cdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qXHJcblx0MTEuIENPTlRBQ1QgRk9STSBKU1xyXG5cdCo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblx0JChcIiNzdWJtaXRCdXR0b25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xyXG5cdCAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdCAgICB2YXIgbXlkYXRhID0gJChcImZvcm1cIikuc2VyaWFsaXplKCk7XHJcblx0ICAgICQuYWpheCh7XHJcblx0ICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuXHQgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuXHQgICAgICAgIHVybDogXCJjb250YWN0LnBocFwiLFxyXG5cdCAgICAgICAgZGF0YTogbXlkYXRhLFxyXG5cdCAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG5cdCAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09IFwiZXJyb3JcIikge1xyXG5cdCAgICAgICAgICAgICAgICAkKFwiI2FsZXJ0LW1zZ1wiKS5yZW1vdmVDbGFzcyhcImFsZXJ0LCBhbGVydC1zdWNjZXNzXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAkKFwiI2FsZXJ0LW1zZ1wiKS5hZGRDbGFzcyhcImFsZXJ0LCBhbGVydC1kYW5nZXJcIik7XHJcblx0ICAgICAgICAgICAgfSBlbHNlIHtcclxuXHQgICAgICAgICAgICAgICAgJChcIiNhbGVydC1tc2dcIikuYWRkQ2xhc3MoXCJhbGVydCwgYWxlcnQtc3VjY2Vzc1wiKTtcclxuXHQgICAgICAgICAgICAgICAgJChcIiNhbGVydC1tc2dcIikucmVtb3ZlQ2xhc3MoXCJhbGVydCwgYWxlcnQtZGFuZ2VyXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAkKFwiI2ZpcnN0LW5hbWVcIikudmFsKFwiRW50ZXIgTmFtZVwiKTtcclxuXHQgICAgICAgICAgICAgICAgJChcIiNlbWFpbFwiKS52YWwoXCJFbnRlciBFbWFpbFwiKTtcclxuXHRcdFx0XHRcdCQoXCIjcGhvbmVcIikudmFsKFwiRW50ZXIgUGhvbmUgTnVtYmVyXCIpO1xyXG5cdCAgICAgICAgICAgICAgICAkKFwiI3N1YmplY3RcIikudmFsKFwiRW50ZXIgU3ViamVjdFwiKTtcclxuXHQgICAgICAgICAgICAgICAgJChcIiNkZXNjcmlwdGlvblwiKS52YWwoXCJFbnRlciBNZXNzYWdlXCIpO1xyXG5cclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgICAgJChcIiNhbGVydC1tc2dcIikuaHRtbChkYXRhLm1zZyk7XHJcblx0ICAgICAgICAgICAgJChcIiNhbGVydC1tc2dcIikuc2hvdygpO1xyXG5cdCAgICAgICAgfSxcclxuXHQgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHRleHRTdGF0dXMpIHtcclxuXHQgICAgICAgICAgICBhbGVydCh0ZXh0U3RhdHVzKTtcclxuXHQgICAgICAgIH1cclxuXHQgICAgfSk7XHJcblx0fSk7XHJcblx0XHJcblx0Lyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSpcclxuXHQxMi4gUE9QVVAgSlNcclxuXHQqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cdCQoJy5jb250ZW50LXBvcHVwJykubWFnbmlmaWNQb3B1cCh7XHJcblx0XHR0eXBlOiAnaW5saW5lJyxcclxuXHRcdHByZWxvYWRlcjogdHJ1ZSxcclxuXHRcdG1haW5DbGFzczogJ21mcC16b29tLWluJyxcclxuXHR9KTtcclxuXHRcclxuXHQkKCcuaW1hZ2VfZ2FsbGVyeScpLmVhY2goZnVuY3Rpb24oKSB7IC8vIHRoZSBjb250YWluZXJzIGZvciBhbGwgeW91ciBnYWxsZXJpZXNcclxuXHRcdCQodGhpcykubWFnbmlmaWNQb3B1cCh7XHJcblx0XHRcdGRlbGVnYXRlOiAnYScsIC8vIHRoZSBzZWxlY3RvciBmb3IgZ2FsbGVyeSBpdGVtXHJcblx0XHRcdHR5cGU6ICdpbWFnZScsXHJcblx0XHRcdGdhbGxlcnk6IHtcclxuXHRcdFx0ICBlbmFibGVkOiB0cnVlLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblx0XHJcblx0JCgnLnBvcHVwLWFqYXgnKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdHR5cGU6ICdhamF4JyxcclxuXHRcdGNhbGxiYWNrczoge1xyXG5cdFx0XHRhamF4Q29udGVudEFkZGVkOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjYXJvdXNlbF9zbGlkZXIoKTtcclxuXHRcdFx0XHRzbGlja19zbGlkZXIoKTtcclxuXHRcdFx0IH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHRcclxuXHQkKCcudmlkZW9fcG9wdXAsIC5pZnJhbWVfcG9wdXAnKS5tYWduaWZpY1BvcHVwKHtcclxuXHRcdHR5cGU6ICdpZnJhbWUnLFxyXG5cdFx0cmVtb3ZhbERlbGF5OiAxNjAsXHJcblx0XHRtYWluQ2xhc3M6ICdtZnAtem9vbS1pbicsXHJcblx0XHRwcmVsb2FkZXI6IGZhbHNlLFxyXG5cdFx0Zml4ZWRDb250ZW50UG9zOiBmYWxzZVxyXG5cdH0pO1xyXG5cdFxyXG5cdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qXHJcblx0MTMuIFNlbGVjdCBkcm9wZG93bnNcclxuXHQqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cdFxyXG5cdGlmICgkKCdzZWxlY3QnKS5sZW5ndGgpIHtcclxuXHQvLyBUcmF2ZXJzZSB0aHJvdWdoIGFsbCBkcm9wZG93bnNcclxuXHQkLmVhY2goJCgnc2VsZWN0JyksIGZ1bmN0aW9uIChpLCB2YWwpIHtcclxuXHRcdHZhciAkZWwgPSAkKHZhbCk7XHJcblx0XHRcclxuXHRcdGlmICgkZWwudmFsKCk9PT1cIlwiKXsgXHJcblx0XHRcdCRlbC5hZGRDbGFzcygnZmlyc3RfbnVsbCcpOyBcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKCEkZWwudmFsKCkpIHtcclxuXHRcdFx0JGVsLmFkZENsYXNzKCdub3RfY2hvc2VuJyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdCRlbC5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoISRlbC52YWwoKSlcclxuXHRcdFx0XHQkZWwuYWRkQ2xhc3MoJ25vdF9jaG9zZW4nKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdCRlbC5yZW1vdmVDbGFzcygnbm90X2Nob3NlbicpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHQgIH0pO1xyXG5cdH1cclxuXHRcclxuXHQvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAxNC4gRklUIFZJREVPIEpTXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbiAgICBpZiAoJChcIi5maXQtdmlkZW9zXCIpLmxlbmd0aCA+IDApe1xyXG5cdFx0JChcIi5maXQtdmlkZW9zXCIpLmZpdFZpZHMoeyBcclxuXHRcdFx0Y3VzdG9tU2VsZWN0b3I6IFwiaWZyYW1lW3NyY149J2h0dHBzOi8vdy5zb3VuZGNsb3VkLmNvbSddXCJcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHQvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAxNS4gRFJPUERPV04gSlNcclxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHRpZiAoJChcIi5jdXN0b21lX3NlbGVjdFwiKS5sZW5ndGggPiAwKXtcclxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JChcIi5jdXN0b21lX3NlbGVjdFwiKS5tc0Ryb3Bkb3duKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0Lyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSpcclxuICAgIDE2Lk1BUCBKU1xyXG4gICAgKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cdFxyXG5cdGlmICgkKFwiI21hcFwiKS5sZW5ndGggPiAwKXtcclxuXHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBpbml0KTtcclxuXHR9XHJcblx0XHJcblx0dmFyIG1hcF9zZWxlY3RvciA9ICQoJyNtYXAnKTtcclxuXHRmdW5jdGlvbiBpbml0KCkge1xyXG5cdFx0XHJcblx0XHR2YXIgbWFwT3B0aW9ucyA9IHtcclxuXHRcdFx0em9vbTogbWFwX3NlbGVjdG9yLmRhdGEoXCJ6b29tXCIpLFxyXG5cdFx0XHRtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcblx0XHRcdGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhtYXBfc2VsZWN0b3IuZGF0YShcImxhdGl0dWRlXCIpLCBtYXBfc2VsZWN0b3IuZGF0YShcImxvbmdpdHVkZVwiKSksIC8vIE5ldyBZb3JrXHJcblx0XHQgIH07XHJcblx0XHR2YXIgbWFwRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKTtcclxuXHRcdHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcEVsZW1lbnQsIG1hcE9wdGlvbnMpO1xyXG5cdFx0dmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG5cdFx0XHRwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhtYXBfc2VsZWN0b3IuZGF0YShcImxhdGl0dWRlXCIpLCBtYXBfc2VsZWN0b3IuZGF0YShcImxvbmdpdHVkZVwiKSksXHJcblx0XHRcdG1hcDogbWFwLFxyXG5cdFx0XHRpY29uOiBtYXBfc2VsZWN0b3IuZGF0YShcImljb25cIiksXHJcblx0XHRcdFxyXG5cdFx0XHR0aXRsZTogbWFwX3NlbGVjdG9yLmRhdGEoXCJ0aXRsZVwiKSxcclxuXHRcdH0pO1xyXG5cdFx0bWFya2VyLnNldEFuaW1hdGlvbihnb29nbGUubWFwcy5BbmltYXRpb24uQk9VTkNFKTtcclxuXHR9XHRcclxuXHJcblx0XHJcblx0Lyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSpcclxuICAgIDE3LiBDT1VOVERPV04gSlNcclxuICAgICo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcbiAgICAkKCcuY291bnRkb3duX3RpbWUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbmRUaW1lID0gJCh0aGlzKS5kYXRhKCd0aW1lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5jb3VudGRvd24oZW5kVGltZSwgZnVuY3Rpb24odG0pIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5odG1sKHRtLnN0cmZ0aW1lKCc8ZGl2IGNsYXNzPVwiY291bnRkb3duX2JveFwiPjxkaXYgY2xhc3M9XCJjb3VudGRvd24td3JhcFwiPjxzcGFuIGNsYXNzPVwiY291bnRkb3duIGRheXNcIj4lRCA8L3NwYW4+PHNwYW4gY2xhc3M9XCJjZF90ZXh0XCI+RGF5czwvc3Bhbj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiY291bnRkb3duX2JveFwiPjxkaXYgY2xhc3M9XCJjb3VudGRvd24td3JhcFwiPjxzcGFuIGNsYXNzPVwiY291bnRkb3duIGhvdXJzXCI+JUg8L3NwYW4+PHNwYW4gY2xhc3M9XCJjZF90ZXh0XCI+SG91cnM8L3NwYW4+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImNvdW50ZG93bl9ib3hcIj48ZGl2IGNsYXNzPVwiY291bnRkb3duLXdyYXBcIj48c3BhbiBjbGFzcz1cImNvdW50ZG93biBtaW51dGVzXCI+JU08L3NwYW4+PHNwYW4gY2xhc3M9XCJjZF90ZXh0XCI+TWludXRlczwvc3Bhbj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiY291bnRkb3duX2JveFwiPjxkaXYgY2xhc3M9XCJjb3VudGRvd24td3JhcFwiPjxzcGFuIGNsYXNzPVwiY291bnRkb3duIHNlY29uZHNcIj4lUzwvc3Bhbj48c3BhbiBjbGFzcz1cImNkX3RleHRcIj5TZWNvbmRzPC9zcGFuPjwvZGl2PjwvZGl2PicpKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cdFxyXG5cdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qXHJcblx0MTguIExpc3QgR3JpZCBKU1xyXG5cdCo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblx0JCgnLnNob3J0aW5nX2ljb24nKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2dyaWQnKSkge1xyXG5cdFx0XHQkKCcuc2hvcF9jb250YWluZXInKS5yZW1vdmVDbGFzcygnbGlzdCcpLmFkZENsYXNzKCdncmlkJyk7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZigkKHRoaXMpLmhhc0NsYXNzKCdsaXN0JykpIHtcclxuXHRcdFx0JCgnLnNob3BfY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ2dyaWQnKS5hZGRDbGFzcygnbGlzdCcpO1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHRcdCQoXCIuc2hvcF9jb250YWluZXJcIikuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibG9hZGluZ19wclwiPjxkaXYgY2xhc3M9XCJtZnAtcHJlbG9hZGVyXCI+PC9kaXY+PC9kaXY+Jyk7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoJy5sb2FkaW5nX3ByJykucmVtb3ZlKCk7XHJcblx0XHRcdCRjb250YWluZXIuaXNvdG9wZSgnbGF5b3V0Jyk7XHJcblx0XHR9LCA4MDApO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qXHJcblx0MTkuIFRPT0xUSVAgSlNcclxuXHQqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cdCQoZnVuY3Rpb24gKCkge1xyXG5cdFx0JCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe1xyXG5cdFx0XHR0cmlnZ2VyOiAnaG92ZXInLFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblx0JChmdW5jdGlvbiAoKSB7XHJcblx0XHQkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qXHJcblx0MjAuIFBST0RVQ1QgQ09MT1IgSlNcclxuXHQqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cdCQoJy5wcm9kdWN0X2NvbG9yX3N3aXRjaCBzcGFuJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdHZhciBnZXRfY29sb3IgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtY29sb3InKTtcclxuXHRcdCQodGhpcykuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBnZXRfY29sb3IpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdCQoJy5wcm9kdWN0X2NvbG9yX3N3aXRjaCBzcGFuLC5wcm9kdWN0X3NpemVfc3dpdGNoIHNwYW4nKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzKS5zaWJsaW5ncyh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZW5kKCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qXHJcblx0MjEuIFFVSUNLVklFVyBQT1BVUCArIFpPT00gSU1BR0UgKyBQUk9EVUNUIFNMSURFUiBKU1xyXG5cdCo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblx0dmFyIGltYWdlID0gJCgnI3Byb2R1Y3RfaW1nJyk7XHJcblx0Ly92YXIgem9vbUNvbmZpZyA9IHt9O1xyXG5cdHZhciB6b29tQWN0aXZlID0gZmFsc2U7XHJcblx0XHJcbiAgICB6b29tQWN0aXZlID0gIXpvb21BY3RpdmU7XHJcblx0aWYoem9vbUFjdGl2ZSkge1xyXG5cdFx0aWYgKCQoaW1hZ2UpLmxlbmd0aCA+IDApe1xyXG5cdFx0XHQkKGltYWdlKS5lbGV2YXRlWm9vbSh7XHJcblx0XHRcdFx0Y3Vyc29yOiBcImNyb3NzaGFpclwiLFxyXG5cdFx0XHRcdGVhc2luZyA6IHRydWUsIFxyXG5cdFx0XHRcdGdhbGxlcnk6J3ByX2l0ZW1fZ2FsbGVyeScsXHJcblx0XHRcdFx0em9vbVR5cGU6IFwiaW5uZXJcIixcclxuXHRcdFx0XHRnYWxsZXJ5QWN0aXZlQ2xhc3M6IFwiYWN0aXZlXCJcclxuXHRcdFx0fSk7IFxyXG5cdFx0fVxyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdCQucmVtb3ZlRGF0YShpbWFnZSwgJ2VsZXZhdGVab29tJyk7Ly9yZW1vdmUgem9vbSBpbnN0YW5jZSBmcm9tIGltYWdlXHJcblx0XHQkKCcuem9vbUNvbnRhaW5lcjpsYXN0LWNoaWxkJykucmVtb3ZlKCk7Ly8gcmVtb3ZlIHpvb20gY29udGFpbmVyIGZyb20gRE9NXHJcblx0fVxyXG5cdFxyXG5cdCQubWFnbmlmaWNQb3B1cC5kZWZhdWx0cy5jYWxsYmFja3MgPSB7XHJcbiAgICBvcGVuOiBmdW5jdGlvbigpIHtcclxuICAgICAgJCgnYm9keScpLmFkZENsYXNzKCd6b29tX2ltYWdlJyk7XHJcbiAgICB9LFxyXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyBXYWl0IHVudGlsIG92ZXJmbG93OmhpZGRlbiBoYXMgYmVlbiByZW1vdmVkIGZyb20gdGhlIGh0bWwgdGFnXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCd6b29tX2ltYWdlJyk7XHJcblx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3pvb21fZ2FsbGVyeV9pbWFnZScpO1xyXG5cdFx0JCgnLnpvb21Db250YWluZXI6bGFzdC1jaGlsZCcpLnJlbW92ZSgpOy8vIHJlbW92ZSB6b29tIGNvbnRhaW5lciBmcm9tIERPTVxyXG5cdFx0JCgnLnpvb21Db250YWluZXInKS5zbGljZSgxKS5yZW1vdmUoKTtcclxuICAgICAgXHR9LCAxMDApO1xyXG4gICAgICB9XHJcbiAgXHR9O1xyXG5cdFxyXG5cdC8vIFNldCB1cCBnYWxsZXJ5IG9uIGNsaWNrXHJcblx0dmFyIGdhbGxlcnlab29tID0gJCgnI3ByX2l0ZW1fZ2FsbGVyeScpO1xyXG5cdGdhbGxlcnlab29tLm1hZ25pZmljUG9wdXAoe1xyXG5cdFx0ZGVsZWdhdGU6ICdhJyxcclxuXHRcdHR5cGU6ICdpbWFnZScsXHJcblx0XHRnYWxsZXJ5OntcclxuXHRcdFx0ZW5hYmxlZDogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdGNhbGxiYWNrczoge1xyXG5cdFx0XHRlbGVtZW50UGFyc2U6IGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0XHRpdGVtLnNyYyA9IGl0ZW0uZWwuYXR0cignZGF0YS16b29tLWltYWdlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHRcclxuXHQvLyBab29tIGltYWdlIHdoZW4gY2xpY2sgb24gaWNvblxyXG5cdCQoJy5wcm9kdWN0X2ltZ196b29tJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBhdHVhbCA9ICQoJyNwcl9pdGVtX2dhbGxlcnkgYScpLmF0dHIoJ2RhdGEtem9vbS1pbWFnZScpO1xyXG5cdFx0JCgnYm9keScpLmFkZENsYXNzKCd6b29tX2dhbGxlcnlfaW1hZ2UnKTtcclxuXHRcdCQoJyNwcl9pdGVtX2dhbGxlcnkgLml0ZW0nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdGlmKCBhdHVhbCA9PSAkKHRoaXMpLmZpbmQoJy5wcm9kdWN0X2dhbGxlcnlfaXRlbScpLmF0dHIoJ2RhdGEtem9vbS1pbWFnZScpICkge1xyXG5cdFx0XHRcdHJldHVybiBnYWxsZXJ5Wm9vbS5tYWduaWZpY1BvcHVwKCdvcGVuJywgJCh0aGlzKS5pbmRleCgpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblx0XHJcblx0JCgnLnBsdXMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkKHRoaXMpLnByZXYoKS52YWwoKSkge1xyXG5cdFx0XHQkKHRoaXMpLnByZXYoKS52YWwoKyQodGhpcykucHJldigpLnZhbCgpICsgMSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0JCgnLm1pbnVzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoJCh0aGlzKS5uZXh0KCkudmFsKCkgPiAxKSB7XHJcblx0XHRcdGlmICgkKHRoaXMpLm5leHQoKS52YWwoKSA+IDEpICQodGhpcykubmV4dCgpLnZhbCgrJCh0aGlzKS5uZXh0KCkudmFsKCkgLSAxKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRcclxuXHQgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSpcclxuXHQyMi4gUFJJQ0UgRklMVEVSIEpTXHJcblx0Kj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHQkKCcjcHJpY2VfZmlsdGVyJykuZWFjaCggZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgJGZpbHRlcl9zZWxlY3RvciA9ICQodGhpcyk7XHJcblx0XHR2YXIgYSA9ICRmaWx0ZXJfc2VsZWN0b3IuZGF0YShcIm1pbi12YWx1ZVwiKTtcclxuXHRcdHZhciBiID0gJGZpbHRlcl9zZWxlY3Rvci5kYXRhKFwibWF4LXZhbHVlXCIpO1xyXG5cdFx0dmFyIGMgPSAkZmlsdGVyX3NlbGVjdG9yLmRhdGEoXCJwcmljZS1zaWduXCIpO1xyXG5cdFx0JGZpbHRlcl9zZWxlY3Rvci5zbGlkZXIoe1xyXG5cdFx0XHRyYW5nZTogdHJ1ZSxcclxuXHRcdFx0bWluOiAkZmlsdGVyX3NlbGVjdG9yLmRhdGEoXCJtaW5cIiksXHJcblx0XHRcdG1heDogJGZpbHRlcl9zZWxlY3Rvci5kYXRhKFwibWF4XCIpLFxyXG5cdFx0XHR2YWx1ZXM6IFsgYSwgYiBdLFxyXG5cdFx0XHRzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuXHRcdFx0XHQkKCBcIiNmbHRfcHJpY2VcIiApLmh0bWwoIGMgKyB1aS52YWx1ZXNbIDAgXSArIFwiIC0gXCIgKyBjICsgdWkudmFsdWVzWyAxIF0gKTtcclxuXHRcdFx0XHQkKCBcIiNwcmljZV9maXJzdFwiICkudmFsKHVpLnZhbHVlc1sgMCBdKTtcclxuXHRcdFx0XHQkKCBcIiNwcmljZV9zZWNvbmRcIiApLnZhbCh1aS52YWx1ZXNbIDEgXSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JCggXCIjZmx0X3ByaWNlXCIgKS5odG1sKCBjICsgJGZpbHRlcl9zZWxlY3Rvci5zbGlkZXIoIFwidmFsdWVzXCIsIDAgKSArIFwiIC0gXCIgKyBjICsgJGZpbHRlcl9zZWxlY3Rvci5zbGlkZXIoIFwidmFsdWVzXCIsIDEgKSApO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qXHJcblx0MjMuIFJBVElORyBTVEFSIEpTXHJcblx0Kj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblx0ICAkKCcuc3Rhcl9yYXRpbmcgc3BhbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBvblN0YXIgPSBwYXJzZUZsb2F0KCQodGhpcykuZGF0YSgndmFsdWUnKSwgMTApOyAvLyBUaGUgc3RhciBjdXJyZW50bHkgc2VsZWN0ZWRcclxuXHRcdFx0dmFyIHN0YXJzID0gJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignLnN0YXJfcmF0aW5nIHNwYW4nKTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdGFycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdCQoc3RhcnNbaV0pLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBvblN0YXI7IGkrKykge1xyXG5cdFx0XHRcdCQoc3RhcnNbaV0pLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHRcclxuXHQvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09KlxyXG5cdDI0LiBDSEVDS0JPWCBDSEVDSyBUSEVOIEFERCBDTEFTUyBKU1xyXG5cdCo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblx0JCgnLmNyZWF0ZS1hY2NvdW50LC5kaWZmZXJlbnRfYWRkcmVzcycpLmhpZGUoKTtcclxuXHQkKCcjY3JlYXRlYWNjb3VudDpjaGVja2JveCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG5cdFx0aWYoJCh0aGlzKS5pcyhcIjpjaGVja2VkXCIpKSB7XHJcblx0XHRcdCQoJy5jcmVhdGUtYWNjb3VudCcpLnNsaWRlRG93bigpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnLmNyZWF0ZS1hY2NvdW50Jykuc2xpZGVVcCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdCQoJyNkaWZmZXJlbnRhZGRyZXNzOmNoZWNrYm94Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcblx0XHRpZigkKHRoaXMpLmlzKFwiOmNoZWNrZWRcIikpIHtcclxuXHRcdFx0JCgnLmRpZmZlcmVudF9hZGRyZXNzJykuc2xpZGVEb3duKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcuZGlmZmVyZW50X2FkZHJlc3MnKS5zbGlkZVVwKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0XHJcblx0Lyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSpcclxuXHQyNS4gQ2FydCBQYWdlIFBheW1lbnQgb3B0aW9uXHJcblx0Kj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cdFxyXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHRcdCQoJ1tuYW1lPVwicGF5bWVudF9vcHRpb25cIl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciAkdmFsdWUgPSAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyk7XHJcblx0XHRcdCQoJy5wYXltZW50LXRleHQnKS5zbGlkZVVwKCk7XHJcblx0XHRcdCQoJ1tkYXRhLW1ldGhvZD1cIicrJHZhbHVlKydcIl0nKS5zbGlkZURvd24oKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qXHJcblx0MjYuIE9OTE9BRCBQT1BVUCBKU1xyXG5cdCo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblx0XHJcblx0JCh3aW5kb3cpLm9uKCdsb2FkJyxmdW5jdGlvbigpe1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0JChcIiNvbmxvYWQtcG9wdXBcIikubW9kYWwoJ3Nob3cnLCB7fSwgNTAwKTtcclxuXHRcdH0sIDMwMDApO1xyXG5cdFx0XHJcblx0fSk7XHJcblx0XHJcblx0alF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdFxyXG5cdFx0alF1ZXJ5KHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcclxuXHRcdFx0JChcIi5sb2FkZXJcIikuZmFkZU91dCgyNTAwMCk7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdH0pO1xyXG59KShqUXVlcnkpOyJdLCJuYW1lcyI6WyIkIiwid2luZG93Iiwib24iLCJzZXRUaW1lb3V0IiwiZGVsYXkiLCJmYWRlT3V0IiwiYWRkQ2xhc3MiLCJlYWNoIiwiYXR0ciIsIl90eXBlb2YiLCJ1bmRlZmluZWQiLCJjc3MiLCJja1Njcm9sbEluaXQiLCJpdGVtcyIsInRyaWdnZXIiLCJja0VsZW1lbnQiLCJBbmltYXRpb25DbGFzcyIsIkFuaW1hdGlvbkRlbGF5Iiwib3BhY2l0eSIsImNrVHJpZ2dlciIsIndheXBvaW50IiwidHJpZ2dlck9uY2UiLCJvZmZzZXQiLCJzY3JvbGwiLCJzY3JvbGxUb3AiLCJyZW1vdmVDbGFzcyIsImRvY3VtZW50IiwicmVhZHkiLCJuZXh0IiwiaGFzQ2xhc3MiLCJwYXJlbnRzIiwiZmlyc3QiLCJmaW5kIiwiJHN1Yk1lbnUiLCJ0b2dnbGVDbGFzcyIsInBhcmVudCIsIm5hdkJhciIsIm5hdmJhckxpbmtzIiwibmF2YmFyTGluayIsImNvbGxhcHNlIiwiYmVmb3JlIiwic2V0SGVpZ2h0IiwiaGVpZ2h0X2hlYWRlciIsImhlaWdodCIsImFwcGVuZCIsInJlbW92ZSIsInJjbGFzcyIsInRvcGhlYWRlckhlaWdodCIsImlubmVySGVpZ2h0IiwibWFpbmhlYWRlckhlaWdodCIsImhlYWRlckhlaWdodCIsImNsb3Nlc3QiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicmVwbGFjZSIsImhvc3RuYW1lIiwidGFyZ2V0IiwiaGFzaCIsInNwZWVkIiwiZGF0YSIsImxlbmd0aCIsInNsaWNlIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJ0b3AiLCJsYXN0SWQiLCJtZW51SXRlbXMiLCJ0b3BNZW51SGVpZ2h0Iiwic2Nyb2xsSXRlbXMiLCJtYXAiLCJmcm9tVG9wIiwiY3VyIiwiaWQiLCJlbmQiLCJmaWx0ZXIiLCJzbGlkZVVwIiwic2xpZGVUb2dnbGUiLCJhZnRlciIsImZhZGVJbiIsImUiLCJwYXJhbGxheEJhY2tncm91bmQiLCIkZ3JpZF9zZWxlY3RvcnMiLCJmaWx0ZXJfc2VsZWN0b3JzIiwiaW1hZ2VzTG9hZGVkIiwiaXNvdG9wZSIsIml0ZW1TZWxlY3RvciIsInBlcmNlbnRQb3NpdGlvbiIsImxheW91dE1vZGUiLCJtYXNvbnJ5IiwiY29sdW1uV2lkdGgiLCJkZnNlbGVjdG9yIiwidmFsdWUiLCJtYWduaWZpY1BvcHVwIiwiZGVsZWdhdGUiLCJ0eXBlIiwibWFpbkNsYXNzIiwicmVtb3ZhbERlbGF5IiwiZ2FsbGVyeSIsImVuYWJsZWQiLCJjYXJvdXNlbF9zbGlkZXIiLCIkY2Fyb3VzZWwiLCJvd2xDYXJvdXNlbCIsImRvdHMiLCJsb29wIiwibWFyZ2luIiwibW91c2VEcmFnIiwidG91Y2hEcmFnIiwiYXV0b0hlaWdodCIsImNlbnRlciIsIm5hdiIsInJld2luZCIsIm5hdlRleHQiLCJhdXRvcGxheSIsImFuaW1hdGVJbiIsImFuaW1hdGVPdXQiLCJhdXRvcGxheVRpbWVvdXQiLCJzbWFydFNwZWVkIiwicmVzcG9uc2l2ZSIsInNsaWNrX3NsaWRlciIsIiRzbGlja19jYXJvdXNlbCIsInNsaWNrIiwiYXJyb3dzIiwiaW5maW5pdGUiLCJjZW50ZXJNb2RlIiwidmVydGljYWwiLCJmYWRlIiwiY3NzRWFzZSIsInZlcnRpY2FsU3dpcGluZyIsImF1dG9wbGF5U3BlZWQiLCJwYXVzZU9uSG92ZXIiLCJkcmFnZ2FibGUiLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImFzTmF2Rm9yIiwiZm9jdXNPblNlbGVjdCIsIm15ZGF0YSIsInNlcmlhbGl6ZSIsImFqYXgiLCJkYXRhVHlwZSIsInVybCIsInN1Y2Nlc3MiLCJ2YWwiLCJodG1sIiwibXNnIiwic2hvdyIsImVycm9yIiwieGhyIiwidGV4dFN0YXR1cyIsImFsZXJ0IiwicHJlbG9hZGVyIiwiY2FsbGJhY2tzIiwiYWpheENvbnRlbnRBZGRlZCIsImZpeGVkQ29udGVudFBvcyIsImkiLCIkZWwiLCJmaXRWaWRzIiwiY3VzdG9tU2VsZWN0b3IiLCJtc0Ryb3Bkb3duIiwiZ29vZ2xlIiwibWFwcyIsImFkZERvbUxpc3RlbmVyIiwiaW5pdCIsIm1hcF9zZWxlY3RvciIsIm1hcE9wdGlvbnMiLCJ6b29tIiwibWFwVHlwZUNvbnRyb2wiLCJMYXRMbmciLCJtYXBFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJNYXAiLCJtYXJrZXIiLCJNYXJrZXIiLCJwb3NpdGlvbiIsImljb24iLCJ0aXRsZSIsInNldEFuaW1hdGlvbiIsIkFuaW1hdGlvbiIsIkJPVU5DRSIsImVuZFRpbWUiLCJjb3VudGRvd24iLCJ0bSIsInN0cmZ0aW1lIiwic2libGluZ3MiLCIkY29udGFpbmVyIiwidG9vbHRpcCIsInBvcG92ZXIiLCJnZXRfY29sb3IiLCJpbWFnZSIsInpvb21BY3RpdmUiLCJlbGV2YXRlWm9vbSIsImN1cnNvciIsImVhc2luZyIsInpvb21UeXBlIiwiZ2FsbGVyeUFjdGl2ZUNsYXNzIiwicmVtb3ZlRGF0YSIsImRlZmF1bHRzIiwib3BlbiIsImNsb3NlIiwiZ2FsbGVyeVpvb20iLCJlbGVtZW50UGFyc2UiLCJpdGVtIiwic3JjIiwiZWwiLCJhdHVhbCIsImluZGV4IiwicHJldiIsIiRmaWx0ZXJfc2VsZWN0b3IiLCJhIiwiYiIsImMiLCJzbGlkZXIiLCJyYW5nZSIsIm1pbiIsIm1heCIsInZhbHVlcyIsInNsaWRlIiwidWkiLCJvblN0YXIiLCJwYXJzZUZsb2F0Iiwic3RhcnMiLCJjaGlsZHJlbiIsImhpZGUiLCJpcyIsInNsaWRlRG93biIsIiR2YWx1ZSIsIm1vZGFsIiwialF1ZXJ5IiwibG9hZCJdLCJzb3VyY2VSb290IjoiIn0=