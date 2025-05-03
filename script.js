document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('heroSection');
  const backToTopButton = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    // Hero section parallax effect
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    const opacity = 1 - Math.min(scrollY / heroHeight, 1);
    const translateY = Math.min(scrollY / 5, 60);
    heroSection.style.opacity = opacity;
    heroSection.style.transform = `translateY(-${translateY}px)`;

    // Back to top button visibility
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
