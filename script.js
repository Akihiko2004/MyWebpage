const heroSection = document.getElementById('heroSection');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = heroSection.offsetHeight;
  const opacity = 1 - Math.min(scrollY / heroHeight, 1);
  const translateY = Math.min(scrollY / 5, 60);

  heroSection.style.opacity = opacity;
  heroSection.style.transform = `translateY(-${translateY}px)`;
});
