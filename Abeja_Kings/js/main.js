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


/* Masquer uniquement les liens de navigation et éléments de menu contenant le mot "équipe"
   (évite de masquer d'autres contenus de la page). */
document.addEventListener('DOMContentLoaded', function(){
  try {
    var selectors = '.site-menu a, .js-clone-nav a, nav a, .site-navigation a';
    document.querySelectorAll(selectors).forEach(function(a){
      try {
        if(/\b[eEéÉ]quipe\b/.test(a.textContent.trim())){
          var li = a.closest('li');
          if(li) li.style.display = 'none'; else a.style.display = 'none';
        }
      } catch(e){ /* ignore */ }
    });
  } catch (err) {
    console.error('Masquage équipe ciblé failed', err);
  }
});

/* Générer la liste des catégories dynamiquement à partir des articles
   - Scanne les éléments `.post-entry[data-category]` présents sur la page
   - Pour chaque catégorie unique, crée un lien vers le premier article trouvé */
document.addEventListener('DOMContentLoaded', function(){
  try {
    var catList = document.getElementById('categories-list');
    if(!catList) return;

    var posts = document.querySelectorAll('.post-entry[data-category]');
    var map = {};
    posts.forEach(function(p){
      var cat = (p.getAttribute('data-category')||'').trim();
      if(!cat) return;
      var linkEl = p.querySelector('h3 a') || p.querySelector('a.img-link');
      var href = linkEl ? linkEl.getAttribute('href') : '#';
      if(!map[cat]) map[cat] = href;
    });

    // Remplir la liste
    catList.innerHTML = '';
    Object.keys(map).forEach(function(cat){
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = map[cat];
      a.textContent = cat;
      li.appendChild(a);
      catList.appendChild(li);
    });
  } catch (err) {
    console.error('Erreur génération catégories', err);
  }
});

/* Animation / affichage dynamique du bloc social sur la page contact */
function revealSocialPromo(){
  try {
    var promo = document.querySelector('.social-promo');
    if(!promo) return;
    setTimeout(function(){ promo.classList.add('visible'); }, 300);
    promo.setAttribute('aria-hidden','false');
  } catch(e){ console.error('social-promo init error', e); }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', revealSocialPromo);
} else {
  // document already ready
  revealSocialPromo();
}
