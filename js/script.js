document.addEventListener('DOMContentLoaded', function () {
  // Load Lottie library dynamically
  function loadLottieLibrary() {
    return new Promise((resolve, reject) => {
      if (window.lottie) {
        resolve(window.lottie);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
      script.onload = () => resolve(window.lottie);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Check if running locally and show warning
  function checkLocalEnvironment() {
    if (window.location.protocol === 'file:') {
      console.warn('⚠️ Running from file:// protocol. Lottie animations may not work due to CORS restrictions.');
      console.warn('💡 Solution: Use a local server instead:');
      console.warn('   - Python: python -m http.server 8000');
      console.warn('   - Node.js: npx http-server -p 8000');
      console.warn('   - VS Code: Use Live Server extension');
      
      // Show user-friendly warning
      const warning = document.createElement('div');
      warning.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        max-width: 300px;
        font-family: Arial, sans-serif;
      `;
      warning.innerHTML = `
        <strong>⚠️ CORS Issue Detected</strong><br>
        Animations won't work with file:// protocol.<br>
        <a href="http://localhost:8000" style="color: white; text-decoration: underline;">Click here to use local server</a>
      `;
      document.body.appendChild(warning);
      
      // Auto-remove warning after 10 seconds
      setTimeout(() => {
        if (warning.parentNode) {
          warning.parentNode.removeChild(warning);
        }
      }, 10000);
    }
  }

  // Initialize Lottie animations
  async function initializeLottieAnimations() {
    try {
      const lottie = await loadLottieLibrary();
      
      // Initialize Scene animation
      const sceneContainer = document.getElementById('lottie-scene');
      if (sceneContainer) {
        const sceneAnimation = lottie.loadAnimation({
          container: sceneContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          // path: 'assets/Scene.json'
          path: 'assets/Showreel_-Mobile-screens-[remix].json'
        });
        
        // Store animation reference for control
        window.sceneAnimation = sceneAnimation;
      }

      // Initialize Hero Animation with professional sequence
      const heroAnimationContainer = document.getElementById('lottie-hero-animation');
      if (heroAnimationContainer) {
        const heroAnimation = lottie.loadAnimation({
          container: heroAnimationContainer,
          renderer: 'svg',
          loop: false, // Play once for professional presentation
          autoplay: true,
          path: 'assets/Showreel_-Mobile-screens-[remix].json'
        });
        
        // Store animation reference for control
        window.heroAnimation = heroAnimation;
        
        // Professional animation sequence
        heroAnimation.addEventListener('complete', function() {
          // Show overlay content after animation completes
          const overlayContent = document.getElementById('hero-overlay-content');
          if (overlayContent) {
            setTimeout(() => {
              overlayContent.classList.add('show');
            }, 800); // Slightly longer delay for professional feel
          }
          
          // Show feature grid after overlay
          const featureGrid = document.getElementById('hero-feature-grid');
          if (featureGrid) {
            setTimeout(() => {
              featureGrid.classList.add('show');
            }, 2000); // Longer delay for better pacing
          }
        });
        
        // Professional reset function
        window.resetHeroShowcase = function() {
          const overlayContent = document.getElementById('hero-overlay-content');
          const featureGrid = document.getElementById('hero-feature-grid');
          
          if (overlayContent) overlayContent.classList.remove('show');
          if (featureGrid) featureGrid.classList.remove('show');
          
          // Restart animation
          heroAnimation.goToAndPlay(0);
        };
      }

      // Initialize Showreel Grid Mobile animation
      const showreelContainer = document.getElementById('lottie-showreel');
      if (showreelContainer) {
        const showreelAnimation = lottie.loadAnimation({
          container: showreelContainer,
          renderer: 'svg',
          loop: true,
          autoplay: false, // Don't autoplay by default
          path: 'assets/Showreel-Grid-Mobile.json'
        });
        
        // Store animation reference for control
        window.showreelAnimation = showreelAnimation;
        
        // Play animation when container comes into view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              showreelAnimation.play();
            } else {
              showreelAnimation.pause();
            }
          });
        });
        
        observer.observe(showreelContainer);
      }

      console.log('✅ Professional Lottie animations initialized successfully');
    } catch (error) {
      console.error('❌ Failed to load Lottie animations:', error);
      // Show fallback content if animations fail
      showAnimationFallback();
    }
  }

  // Professional fallback for when animations fail
  function showAnimationFallback() {
    const heroAnimationDisplay = document.getElementById('hero-animation-display');
    if (heroAnimationDisplay) {
      heroAnimationDisplay.innerHTML = `
        <div class="animation-fallback">
          <div class="fallback-content">
            <i class="bi bi-phone display-1 text-primary mb-3"></i>
            <h3 class="text-dark mb-2">Modern Digital Wallet</h3>
            <p class="text-muted">Experience seamless payments with Kwikpay</p>
          </div>
        </div>
      `;
    }
  }

  // Function to create a Lottie animation container
  function createLottieContainer(id, className = 'lottie-container') {
    const container = document.createElement('div');
    container.id = id;
    container.className = className;
    return container;
  }

  // Function to load and display a Lottie animation
  async function loadLottieAnimation(containerId, jsonPath, options = {}) {
    try {
      const lottie = await loadLottieLibrary();
      const container = document.getElementById(containerId);
      
      if (!container) {
        console.error(`Container with id '${containerId}' not found`);
        return null;
      }

      const defaultOptions = {
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: jsonPath
      };

      const animation = lottie.loadAnimation({
        ...defaultOptions,
        ...options
      });

      return animation;
    } catch (error) {
      console.error(`Failed to load Lottie animation from ${jsonPath}:`, error);
      return null;
    }
  }

  // Check environment and initialize Lottie animations when DOM is loaded
  checkLocalEnvironment();
  initializeLottieAnimations();

  // Handle loading screen
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    // Wait for all images to load
    Promise.all([
      // Wait for images
      Promise.all(
        Array.from(document.images)
          .filter(img => !img.complete)
          .map(img => new Promise(resolve => {
            img.onload = img.onerror = resolve;
          }))
      ),
      // Wait for Lottie library
      loadLottieLibrary()
    ]).then(() => {
      // Add small delay for smoother transition
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        // Remove from DOM after animation
        setTimeout(() => {
          loadingScreen.remove();
        }, 300);
      }, 500);
    });
  }

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();
      const top = targetEl.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Pay by Car Interactive Demo
  const pbcPlayBtn = document.getElementById('pbc-play');
  const pbcResetBtn = document.getElementById('pbc-reset');
  const pbcCar = document.getElementById('pbc-car');
  const pbcScanner = document.getElementById('pbc-scanner');
  const pbcScannerLight = document.getElementById('pbc-scanner-light');
  const pbcScanWaves = document.getElementById('pbc-scan-waves');
  const pbcGateArm = document.getElementById('pbc-gate-arm');
  const pbcMobile = document.getElementById('pbc-mobile');
  const pbcNotification = document.getElementById('pbc-notification');
  const pbcSuccess = document.getElementById('pbc-success');
  const pbcApproveBtn = document.getElementById('pbc-approve-btn');
  const pbcFlowSteps = document.querySelectorAll('.pbc-flow-step');

  let isAnimating = false;
  let currentStep = 0;

  function activateStep(stepNumber) {
    // Remove active class from all steps
    pbcFlowSteps.forEach(step => step.classList.remove('active'));
    
    // Add active class to current step
    if (pbcFlowSteps[stepNumber - 1]) {
      pbcFlowSteps[stepNumber - 1].classList.add('active');
    }
  }

  function updateProgress(step, total = 5) {
    const progressFill = document.querySelector('.pbc-progress-fill');
    const progress = (step / total) * 100;
    progressFill.style.width = `${progress}%`;
  }

  function playDemo() {
    if (isAnimating) return;
    isAnimating = true;
    currentStep = 0;

    // Reset all elements
    resetDemo();

    // Step 1: Car arrives at scanner (1.5s delay)
    setTimeout(() => {
      currentStep = 1;
      activateStep(1);
      updateProgress(1);
      pbcCar.classList.add('at-scanner');
      document.querySelector('.scanner-station').classList.add('active');
    }, 1500);

    // Step 2: Scanner detects tag (2.5s delay)
    setTimeout(() => {
      currentStep = 2;
      activateStep(2);
      updateProgress(2);
      pbcScanner.classList.add('show');
      pbcScanWaves.classList.add('active');
    }, 2500);

    // Step 3: Mobile notification appears (3.5s delay)
    setTimeout(() => {
      currentStep = 3;
      activateStep(3);
      updateProgress(3);
      document.querySelector('.scanner-station').classList.remove('active');
      document.querySelector('.mobile-station').classList.add('show');
    }, 3500);

    // Step 4: Payment approved & gate opens (5s delay)
    setTimeout(() => {
      currentStep = 4;
      activateStep(4);
      updateProgress(4);
      if (pbcApproveBtn) {
        pbcApproveBtn.classList.add('approved');
        pbcApproveBtn.innerHTML = '<i class="bi bi-check-lg"></i> Approved';
      }
      document.querySelector('.mobile-station').classList.remove('show');
      document.querySelector('.gate-station').classList.add('active');
      pbcGateArm.classList.add('open');
      pbcCar.classList.add('at-gate');
    }, 5000);

    // Step 5: Car exits & success (6.5s delay)
    setTimeout(() => {
      currentStep = 5;
      activateStep(5);
      updateProgress(5);
      document.querySelector('.gate-station').classList.remove('active');
      pbcCar.classList.add('exit');
      document.querySelector('.success-station').classList.add('show');
    }, 6500);

    // Hide elements (8s delay)
    setTimeout(() => {
      document.querySelector('.success-station').classList.remove('show');
    }, 8000);

    // Reset for next play (9s delay)
    setTimeout(() => {
      isAnimating = false;
    }, 9000);
  }

  function resetDemo() {
    // Remove all animation classes from car
    pbcCar.classList.remove('at-scanner', 'at-gate', 'exit');
    
    // Reset scanner
    pbcScanner.classList.remove('show');
    pbcScanWaves.classList.remove('active');
    document.querySelector('.scanner-station').classList.remove('active');
    
    // Reset gate
    pbcGateArm.classList.remove('open');
    document.querySelector('.gate-station').classList.remove('active');
    
    // Reset mobile notification
    document.querySelector('.mobile-station').classList.remove('show');
    
    // Reset success message
    document.querySelector('.success-station').classList.remove('show');
    
    // Reset button state
    if (pbcApproveBtn) {
      pbcApproveBtn.classList.remove('approved');
      pbcApproveBtn.innerHTML = '<i class="bi bi-check-lg"></i> Approve';
    }

    // Reset flow steps
    pbcFlowSteps.forEach(step => step.classList.remove('active', 'complete'));

    // Reset progress bar
    updateProgress(0);

    // Reset car position with transition disabled
    pbcCar.style.transition = 'none';
    pbcCar.style.transform = 'translateX(0)';
    // Force reflow
    void pbcCar.offsetHeight;
    // Re-enable transitions
    pbcCar.style.transition = '';
  }

  // Event listeners
  if (pbcPlayBtn) {
    pbcPlayBtn.addEventListener('click', playDemo);
  }

  if (pbcResetBtn) {
    pbcResetBtn.addEventListener('click', () => {
      isAnimating = false;
      resetDemo();
    });
  }

  // Auto-play demo when section comes into view
  const pbcSection = document.getElementById('pay-by-car');
  if (pbcSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isAnimating) {
          // Auto-play after a short delay when section is visible
          setTimeout(() => {
            if (!isAnimating) {
              playDemo();
            }
          }, 1000);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(pbcSection);
  }

  // Professional brand element animation
  const brandLogo = document.querySelector('.brand-logo');
  if (brandLogo) {
    // Subtle animation trigger
    setInterval(() => {
      brandLogo.style.transform = 'scale(1.1)';
      setTimeout(() => {
        brandLogo.style.transform = 'scale(1)';
      }, 1000);
    }, 8000);
  }

  // Mobile Carousel Functionality
  const mobileCarousel = document.getElementById('mobileCarousel');
  const mobileScreens = document.querySelectorAll('.mobile-screen');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  let currentSlide = 0;
  const totalSlides = mobileScreens.length;

  function showSlide(index) {
    // Remove active class from all screens and dots
    mobileScreens.forEach(screen => screen.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    mobileScreens[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
    
    // Update button states
    if (prevBtn) prevBtn.style.opacity = index === 0 ? '0.5' : '1';
    if (nextBtn) nextBtn.style.opacity = index === totalSlides - 1 ? '0.5' : '1';
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    showSlide(prevIndex);
  }

  // Event listeners for navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (mobileCarousel) {
    mobileCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    mobileCarousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        prevSlide();
      }
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Auto-advance slides (optional)
  let autoAdvanceInterval;
  
  function startAutoAdvance() {
    autoAdvanceInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  function stopAutoAdvance() {
    if (autoAdvanceInterval) {
      clearInterval(autoAdvanceInterval);
    }
  }

  // Pause auto-advance on hover
  if (mobileCarousel) {
    mobileCarousel.addEventListener('mouseenter', stopAutoAdvance);
    mobileCarousel.addEventListener('mouseleave', startAutoAdvance);
  }

  // Initialize carousel
  if (mobileScreens.length > 0) {
    showSlide(0);
    // Start auto-advance after a delay
    setTimeout(startAutoAdvance, 2000);
  }
});


