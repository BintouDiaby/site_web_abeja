AOS.init({
  duration: 800,
  easing: 'slide',
  once: true
});

jQuery(document).ready(function($) {

"use strict";

/* ================================
   MOBILE MENU
================================ */

var siteMenuClone = function() {

  $('.js-clone-nav').each(function() {
    var $this = $(this);
    $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
  });

  $('body').on('click', '.js-menu-toggle', function(e) {
    e.preventDefault();
    $('body').toggleClass('offcanvas-menu');
  });

  $(document).mouseup(function(e) {
    var container = $(".site-mobile-menu");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('body').removeClass('offcanvas-menu');
    }
  });

};
siteMenuClone();


/* ================================
   CAROUSEL
================================ */

var siteCarousel = function () {

  $('.slide-one-item, .with-dots').owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    autoplay: true,
    smartSpeed: 1000,
    nav: false,
    dots: true
  });

};
siteCarousel();


/* ================================
   STICKY HEADER
================================ */

var siteSticky = function() {
  $(".js-sticky-header").sticky({topSpacing:0});
};
siteSticky();


/* ================================
   SMOOTH SCROLL (SECTIONS ONLY)
================================ */

var OnePageNavigation = function() {

  $("body").on("click", "a[href^='#']", function(e) {

    var hash = this.hash;

    if ($(hash).length) {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 600, 'easeInOutExpo');
    }

  });

};
OnePageNavigation();


/* ================================
   SCROLL EFFECT
================================ */

var siteScroll = function() {

  $(window).scroll(function() {

    var st = $(this).scrollTop();

    if (st > 100) {
      $('.js-sticky-header').addClass('shrink');
    } else {
      $('.js-sticky-header').removeClass('shrink');
    }

    if (st > 200) {
      $('.gototop').addClass('active');
    } else {
      $('.gototop').removeClass('active');
    }

  });

};
siteScroll();

});


/* ================================
   SPLASH SCREEN
================================ */

document.addEventListener('DOMContentLoaded', function(){
  var splash = document.getElementById('splash-overlay');
  if(!splash) return;

  var skip = document.getElementById('splash-skip');

  function hideSplash(){
    splash.classList.add('hidden');
    setTimeout(function(){ splash.remove(); }, 500);
  }

  skip && skip.addEventListener('click', hideSplash);

  setTimeout(hideSplash, 2200);
});
