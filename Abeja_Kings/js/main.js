/* ================================
   AOS INIT
================================ */
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

  // Clone menu desktop vers mobile
  $('.js-clone-nav').each(function() {
    var $this = $(this);
    $this.clone().attr('class', 'site-nav-wrap')
      .appendTo('.site-mobile-menu-body');
  });

  // Ouvrir / Fermer menu
  $('body').on('click', '.js-menu-toggle', function(e) {
    e.preventDefault();
    $('body').toggleClass('offcanvas-menu');
  });

  // Fermer menu si clic extérieur
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
  $(".js-sticky-header").sticky({ topSpacing: 0 });
};
siteSticky();


/* ================================
   SMART NAVIGATION FIX
================================ */

var NavigationFix = function() {

  $("body").on("click", "a", function(e) {

    var href = $(this).attr("href");

    if (!href) return;

    // Smooth scroll uniquement pour vraies sections
    if (href.startsWith("#") && href.length > 1) {

      var target = $(href);

      if (target.length) {
        e.preventDefault();

        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600, 'easeInOutExpo');

        // Fermer menu mobile après clic
        $('body').removeClass('offcanvas-menu');
      }
    }

    // Sinon → laisser Django rediriger normalement

  });

};
NavigationFix();


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

  if(skip){
    skip.addEventListener('click', hideSplash);
  }

  setTimeout(hideSplash, 2200);

});
