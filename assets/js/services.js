// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true });
  }

  // Handle scroll to anchor when navigating from another page
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const targetElement = document.getElementById(hash);

    if (targetElement) {
      // Small delay to ensure page is fully loaded
      setTimeout(function () {
        // Center element vertically in viewport
        const viewportHeight = window.innerHeight;
        const elementRect = targetElement.getBoundingClientRect();
        const elementTop = elementRect.top + window.pageYOffset;
        const elementHeight = elementRect.height;

        // Calculate position to center element vertically
        // Center = element top + (element height / 2) - (viewport height / 2)
        const centerPosition = elementTop + (elementHeight / 2) - (viewportHeight / 2);

        window.scrollTo({
          top: centerPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});

// Also handle hash change (if user clicks another anchor link on the same page)
window.addEventListener('hashchange', function () {
  const hash = window.location.hash.substring(1);
  const targetElement = document.getElementById(hash);

  if (targetElement) {
    setTimeout(function () {
      // Center element vertically in viewport
      const viewportHeight = window.innerHeight;
      const elementRect = targetElement.getBoundingClientRect();
      const elementTop = elementRect.top + window.pageYOffset;
      const elementHeight = elementRect.height;

      // Calculate position to center element vertically
      const centerPosition = elementTop + (elementHeight / 2) - (viewportHeight / 2);

      window.scrollTo({
        top: centerPosition,
        behavior: 'smooth'
      });
    }, 100);
  }
});

