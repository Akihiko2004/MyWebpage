document.addEventListener('DOMContentLoaded', () => {
  const sections = [
    document.getElementById('heroSection'),
    document.getElementById('about'),
    document.getElementById('projects'),
    document.getElementById('footer')
  ];
  const backToTopButton = document.querySelector('.back-to-top');
  let currentSectionIndex = 0;
  let isScrolling = false;

  // Initialize sections: set all except the first to off-screen
  sections.forEach((section, index) => {
    if (index !== 0) {
      section.style.opacity = '0';
    } else {
      section.style.opacity = '1';
    }
  });

  // Function to scroll to a specific section with smooth transition
  const scrollToSection = (index) => {
    if (index >= 0 && index < sections.length && !isScrolling) {
      isScrolling = true;

      // Fade out current section
      sections[currentSectionIndex].style.transition = 'opacity 0.8s ease';
      sections[currentSectionIndex].style.opacity = '0';

      // Fade in new section
      sections[index].style.transition = 'opacity 0.8s ease';
      sections[index].style.opacity = '1';

      // Scroll to the section
      sections[index].scrollIntoView({ behavior: 'smooth' });

      currentSectionIndex = index;

      // Reset isScrolling after animation completes
      setTimeout(() => {
        isScrolling = false;
        // Reset other sections to off-screen
        sections.forEach((section, i) => {
          if (i !== currentSectionIndex) {
            section.style.opacity = '0';
          }
        });
      }, 800);
    }
  };

  // Handle wheel scroll with throttling
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (!isScrolling) {
      const direction = e.deltaY > 0 ? 'down' : 'up';
      if (direction === 'down' && currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      } else if (direction === 'up' && currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }
  }, { passive: false });

  // Handle scroll for parallax effect and back-to-top button
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    // Hero section parallax effect
    const heroHeight = sections[0].offsetHeight;
    const opacity = 1 - Math.min(currentScrollY / heroHeight, 1);
    const translateY = Math.min(currentScrollY / 5, 60);
    sections[0].style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    sections[0].style.opacity = opacity;
    sections[0].style.transform = `translateY(-${translateY}px)`;

    // Back to top button visibility
    backToTopButton.style.display = currentScrollY > 300 ? 'block' : 'none';
  });

  // Handle back-to-top button click
  backToTopButton.addEventListener('click', () => {
    scrollToSection(0);
  });

  // Handle navigation link clicks
  document.querySelectorAll('nav a').forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection(index);
    });
  });
});
