// Central API base for frontend to call backend
(function(window){
  // By default use the same origin as the site so Django can serve both front+API
  window.API_BASE = window.API_BASE || window.location.origin;
})(window);
