// Smooth scrolling and behavior
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if(targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const navbarHeight = document.querySelector('.navbar').offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
              
              // Close mobile menu if open
              const navbarCollapse = document.querySelector('.navbar-collapse');
              if(navbarCollapse.classList.contains('show')){
                  const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: true});
                  bsCollapse.hide();
              }
          }
      });
  });

  // 2. Scroll Animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up'); // Use the CSS animation class
        entry.target.style.opacity = '1'; // Ensure it stays visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe specific elements
  document.querySelectorAll('.feature-card, .timeline-item, .accordion-item').forEach(el => {
    el.style.opacity = '0'; // Hide initially
    el.classList.remove('fade-in-up'); // Remove class to trigger animation later if added via JS (safeguard)
    observer.observe(el);
  });


  // 3. Release Notes Logic
  const releaseContainer = document.getElementById('release-content');
  const versionLinks = document.querySelectorAll('#release-versions a');
  
  if (releaseContainer && versionLinks.length > 0) {
    const loadReleaseNotes = async (url) => {
        // Show loader
        releaseContainer.innerHTML = `
            <div class="d-flex justify-content-center align-items-center h-100" style="min-height: 200px;">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const content = await response.text();
            
            // Extract body content if it's a full HTML page, otherwise use as is
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            // Try to find a specific container in the loaded page, or just dump body
            const mainContent = tempDiv.querySelector('main') || tempDiv.querySelector('body') || tempDiv;
            
            releaseContainer.innerHTML = mainContent.innerHTML;
        } catch (error) {
            releaseContainer.innerHTML = `
                <div class="alert alert-danger border-0 bg-danger bg-opacity-10 text-danger">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Error al cargar las notas. Intenta de nuevo.
                </div>`;
            console.error('Error:', error);
        }
    };

    // Load initial
    const firstLink = versionLinks[0];
    if(firstLink) loadReleaseNotes(firstLink.getAttribute('href'));

    // Handle clicks
    versionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            versionLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            loadReleaseNotes(this.getAttribute('href'));
        });
    });
  }


  // 4. Theme Toggler Logic
  const themeToggler = document.getElementById('theme-toggler');
  const htmlElement = document.documentElement;
  const moonIcon = 'bi-moon-stars-fill';
  const sunIcon = 'bi-sun-fill';

  const setTheme = (theme) => {
      htmlElement.setAttribute('data-bs-theme', theme);
      localStorage.setItem('theme', theme);
      
      const icon = themeToggler.querySelector('i');
      if (theme === 'dark') {
          icon.classList.remove(sunIcon);
          icon.classList.add(moonIcon);
      } else {
          icon.classList.remove(moonIcon);
          icon.classList.add(sunIcon);
      }
  };

  // Check saved preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggler) {
      themeToggler.addEventListener('click', () => {
          const currentTheme = htmlElement.getAttribute('data-bs-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          setTheme(newTheme);
      });
  }

});