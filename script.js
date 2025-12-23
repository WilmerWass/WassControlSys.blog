// Smooth scrolling for navigation links
document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// All logic that needs to run after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // --- Scroll-to-reveal animation ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Stop observing after it's visible
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
  });

  // --- Release Notes Loader ---
  const releaseContainer = document.getElementById('release-content');
  const versionLinks = document.querySelectorAll('#release-versions a');
  
  // Check if we are on a page with release notes
  if (releaseContainer && versionLinks.length > 0) {
    const defaultVersion = versionLinks[0].getAttribute('href'); // Get the first link as default

    // Function to load content
    const loadReleaseNotes = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            releaseContainer.innerHTML = content;
        } catch (error) {
            releaseContainer.innerHTML = `<div class="alert alert-danger">Error al cargar las notas de la versión. Por favor, intente más tarde.</div>`;
            console.error('Fetch error:', error);
        }
    };

    // Load the default version on initial page load
    loadReleaseNotes(defaultVersion);

    // Handle clicks on the version links
    versionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Update active state
            versionLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const url = this.getAttribute('href');
            loadReleaseNotes(url);
        });
    });
  }
});
