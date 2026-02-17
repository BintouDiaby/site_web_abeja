// Configuration for the static frontend.
// Replace 'your-form-id' with your real Formspree form ID before deploying.
(function(window){
  // Default placeholder — change this value to your Formspree ID (e.g. "myniceid")
  window.FORMSPREE_ID = window.FORMSPREE_ID || 'your-form-id';
  // Computed URL (empty if ID not configured)
  window.FORMSPREE_URL = (window.FORMSPREE_ID && window.FORMSPREE_ID !== 'your-form-id') ? 'https://formspree.io/f/' + window.FORMSPREE_ID : '';
})(window);
