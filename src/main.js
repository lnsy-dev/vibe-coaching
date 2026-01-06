// Cookie banner functionality
window.acceptCookies = function() {
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
  }
};

// Hide cookie banner if already accepted
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  if (banner && localStorage.getItem('cookiesAccepted')) {
    banner.style.display = 'none';
  }
});

// Add any additional JavaScript functionality here
console.log('Site loaded successfully!');
