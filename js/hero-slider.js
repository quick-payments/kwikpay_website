/**
 * Hero Slider Gallery Functionality
 * Controls the hero section slides with navigation
 */
document.addEventListener('DOMContentLoaded', function() {
  // Hero Slider Elements
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroNavDots = document.querySelectorAll('.hero-nav-dot');
  const heroNavPrev = document.getElementById('heroNavPrev');
  const heroNavNext = document.getElementById('heroNavNext');
  
  // Current slide index
  let currentSlideIndex = 0;
  let slidesCount = heroSlides.length;
  let autoplayInterval = null;
  const autoplayDelay = 8000; // 8 seconds between slides
  
  // Initialize slider
  function initSlider() {
    // Set initial slide
    showSlide(currentSlideIndex);
    
    // Add click events to navigation dots
    heroNavDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoplay();
      });
    });
    
    // Add click events to navigation arrows
    if (heroNavPrev) {
      heroNavPrev.addEventListener('click', () => {
        showPrevSlide();
        resetAutoplay();
      });
    }
    
    if (heroNavNext) {
      heroNavNext.addEventListener('click', () => {
        showNextSlide();
        resetAutoplay();
      });
    }
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay on hover
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', pauseAutoplay);
      heroSection.addEventListener('mouseleave', startAutoplay);
      
      // Pause on touch devices
      heroSection.addEventListener('touchstart', pauseAutoplay);
      heroSection.addEventListener('touchend', startAutoplay);
    }
  }
  
  // Show specific slide
  function showSlide(index) {
    // Validate index
    if (index < 0) index = slidesCount - 1;
    if (index >= slidesCount) index = 0;
    
    // Update current index
    currentSlideIndex = index;
    
    // Update slides
    heroSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    // Update navigation dots
    heroNavDots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    // Reset animations for the current slide
    resetSlideAnimations(heroSlides[index]);
  }
  
  // Show next slide
  function showNextSlide() {
    showSlide(currentSlideIndex + 1);
  }
  
  // Show previous slide
  function showPrevSlide() {
    showSlide(currentSlideIndex - 1);
  }
  
  // Start autoplay
  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(showNextSlide, autoplayDelay);
  }
  
  // Pause autoplay
  function pauseAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
  
  // Reset autoplay (after user interaction)
  function resetAutoplay() {
    pauseAutoplay();
    startAutoplay();
  }
  
  // Reset animations for a slide
  function resetSlideAnimations(slide) {
    // For Kwik Pass professional animations
    const kwikpassTag = slide.querySelector('.kwikpass-tag-pro');
    const kwikpassPhone = slide.querySelector('.kwikpass-phone');
    const notification = slide.querySelector('.kwikpass-notification');
    const approveBtn = slide.querySelector('.kwikpass-approve-btn');
    
    if (kwikpassTag) {
      kwikpassTag.style.animation = 'none';
      setTimeout(() => {
        kwikpassTag.style.animation = 'float-tag 4s ease-in-out infinite';
      }, 10);
    }
    
    if (kwikpassPhone) {
      kwikpassPhone.style.animation = 'none';
      setTimeout(() => {
        kwikpassPhone.style.animation = 'float-phone 4s ease-in-out infinite 1s';
      }, 10);
    }
    
    if (notification) {
      notification.style.animation = 'none';
      setTimeout(() => {
        notification.style.animation = 'notification-pulse 2s ease-in-out infinite';
      }, 10);
    }
    
    if (approveBtn) {
      approveBtn.style.animation = 'none';
      setTimeout(() => {
        approveBtn.style.animation = 'button-pulse 2s ease-in-out infinite';
      }, 10);
    }
    
    // For Security animations
    const securityPulse = slide.querySelector('.security-pulse');
    if (securityPulse) {
      securityPulse.style.animation = 'none';
      setTimeout(() => {
        securityPulse.style.animation = 'pulse 2s ease-out infinite';
      }, 10);
    }
  }
  
  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      showPrevSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      showNextSlide();
      resetAutoplay();
    }
  });
  
  // Initialize slider when DOM is loaded
  if (heroSlides.length && heroNavDots.length) {
    initSlider();
    console.log('✅ Hero slider initialized successfully');
  }
});
