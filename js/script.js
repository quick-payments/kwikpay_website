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
  
  // Testimonial Slider
  initTestimonialSlider();
  
  // Hero Image Slider
  initHeroImageSlider();
  
  // Contact and Complaint Forms
  initContactForms();
  
  // About Us Timeline Animation
  initTimelineAnimation();
  
  // Kwik Pass Demo
  initKwikPassDemo();
});

// Contact and Complaint Forms Functionality
function initContactForms() {
  const contactForm = document.getElementById('contactForm');
  const complaintForm = document.getElementById('complaintForm');
  const contactModal = document.getElementById('contactModal');
  const complaintModal = document.getElementById('complaintModal');
  
  // Create feedback container if it doesn't exist
  let feedbackContainer = document.querySelector('.form-feedback-container');
  if (!feedbackContainer) {
    feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'form-feedback-container';
    document.body.appendChild(feedbackContainer);
  }
  
  // Add animation to modal forms
  if (contactModal) {
    contactModal.addEventListener('shown.bs.modal', function() {
      animateFormFields(contactForm);
    });
  }
  
  if (complaintModal) {
    complaintModal.addEventListener('shown.bs.modal', function() {
      animateFormFields(complaintForm);
    });
  }
  
  // Handle contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = contactForm.querySelector('#name').value;
      const email = contactForm.querySelector('#email').value;
      const subject = contactForm.querySelector('#subject').value;
      const message = contactForm.querySelector('#message').value;
      
      // Validate form data
      if (!name || !email || !subject || !message) {
        showFormFeedback('Error', 'Please fill in all required fields', 'error');
        return;
      }
      
      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<div class="spinner-border spinner-border-sm me-2" role="status"><span class="visually-hidden">Loading...</span></div>Sending...';
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(contactModal);
        if (modal) {
          modal.hide();
        }
        
        // Show success message
        showFormFeedback('Success!', 'Your message has been sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }, 1500);
    });
  }
  
  // Handle complaint form submission
  if (complaintForm) {
    complaintForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = complaintForm.querySelector('#comp-name').value;
      const email = complaintForm.querySelector('#comp-email').value;
      const phone = complaintForm.querySelector('#comp-phone').value;
      const type = complaintForm.querySelector('#comp-type').value;
      const details = complaintForm.querySelector('#comp-details').value;
      const terms = complaintForm.querySelector('#comp-terms').checked;
      
      // Validate form data
      if (!name || !email || !phone || !type || !details || !terms) {
        showFormFeedback('Error', 'Please fill in all required fields and accept the terms', 'error');
        return;
      }
      
      // Simulate form submission
      const submitButton = complaintForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<div class="spinner-border spinner-border-sm me-2" role="status"><span class="visually-hidden">Loading...</span></div>Submitting...';
      
      // Generate reference number
      const refNumber = 'KP-' + Math.floor(100000 + Math.random() * 900000);
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Reset form
        complaintForm.reset();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(complaintModal);
        if (modal) {
          modal.hide();
        }
        
        // Show success message
        showFormFeedback('Complaint Submitted', `Your complaint has been submitted successfully! Reference #${refNumber}`, 'success');
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }, 1500);
    });
  }
  
  // Helper function to show feedback toast
  function showFormFeedback(title, message, type) {
    // Remove any existing feedback
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
      existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = 'form-feedback';
    feedback.innerHTML = `
      <div class="form-feedback-icon ${type}">
        <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      </div>
      <div class="form-feedback-content">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;
    
    // Add to container
    feedbackContainer.appendChild(feedback);
    
    // Show feedback with animation
    setTimeout(() => {
      feedback.classList.add('show');
    }, 100);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      feedback.classList.remove('show');
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback);
        }
      }, 500);
    }, 5000);
  }
  
  // Helper function to animate form fields
  function animateFormFields(form) {
    if (!form) return;
    
    const formElements = form.querySelectorAll('.form-floating, .form-check, .d-grid');
    
    formElements.forEach((element, index) => {
      // Reset initial state
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      
      // Animate with delay based on index
      setTimeout(() => {
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100 + (index * 100));
    });
  }
}

// Kwik Pass Professional Demo
function initKwikPassDemo() {
  const demoBtn = document.getElementById('kwikpass-demo-btn');
  const kwikpassTag = document.querySelector('.kwikpass-tag-pro');
  const kwikpassPhone = document.querySelector('.kwikpass-phone-pro');
  const approveBtn = document.querySelector('.payment-approve-btn');
  const declineBtn = document.querySelector('.payment-decline-btn');
  const rfidSignal = document.querySelector('.rfid-signal i');
  
  // Initial state
  let isAnimating = false;
  let animationTimeout;
  
  // Professional demo sequence
  function playDemo() {
    if (isAnimating) return;
    isAnimating = true;
    
    // Reset elements
    resetElements();
    
    // Step 1: Highlight the tag
    setTimeout(() => {
      if (kwikpassTag) {
        kwikpassTag.style.transform = 'rotateY(-5deg) rotateX(2deg) translateY(-10px)';
        kwikpassTag.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
      }
      
      // Activate RFID signal
      if (rfidSignal) {
        rfidSignal.style.animation = 'pulse 1s infinite';
        rfidSignal.style.opacity = '1';
      }
    }, 500);
    
    // Step 2: Highlight the phone
    setTimeout(() => {
      if (kwikpassPhone) {
        kwikpassPhone.style.transform = 'rotate(-3deg) translateY(-10px)';
        kwikpassPhone.style.boxShadow = '0 35px 70px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.2)';
      }
      
      // Highlight approve button
      if (approveBtn) {
        approveBtn.style.transform = 'scale(1.05)';
        approveBtn.style.boxShadow = '0 8px 20px rgba(9, 128, 255, 0.3)';
      }
    }, 1500);
    
    // Step 3: Show approval
    setTimeout(() => {
      if (approveBtn) {
        approveBtn.style.backgroundColor = '#10b981';
        approveBtn.textContent = 'Approved';
        approveBtn.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
      }
    }, 2500);
    
    // Reset after animation
    animationTimeout = setTimeout(() => {
      resetElements();
      isAnimating = false;
    }, 5000);
  }
  
  // Reset elements to initial state
  function resetElements() {
    if (kwikpassTag) {
      kwikpassTag.style.transform = '';
      kwikpassTag.style.boxShadow = '';
    }
    
    if (kwikpassPhone) {
      kwikpassPhone.style.transform = '';
      kwikpassPhone.style.boxShadow = '';
    }
    
    if (approveBtn) {
      approveBtn.style.transform = '';
      approveBtn.style.backgroundColor = '';
      approveBtn.textContent = 'Approve';
      approveBtn.style.boxShadow = '';
    }
    
    if (rfidSignal) {
      rfidSignal.style.animation = '';
      rfidSignal.style.opacity = '';
    }
  }
  
  // Add hover effects
  function addHoverEffects() {
    if (approveBtn) {
      approveBtn.addEventListener('mouseenter', () => {
        if (!isAnimating) {
          approveBtn.style.transform = 'translateY(-2px)';
          approveBtn.style.boxShadow = '0 8px 20px rgba(9, 128, 255, 0.3)';
        }
      });
      
      approveBtn.addEventListener('mouseleave', () => {
        if (!isAnimating) {
          approveBtn.style.transform = '';
          approveBtn.style.boxShadow = '';
        }
      });
    }
    
    if (declineBtn) {
      declineBtn.addEventListener('mouseenter', () => {
        declineBtn.style.transform = 'translateY(-2px)';
      });
      
      declineBtn.addEventListener('mouseleave', () => {
        declineBtn.style.transform = '';
      });
    }
  }
  
  // Auto-play demo when section is in view
  const kwikpassSection = document.getElementById('kwikpass');
  if (kwikpassSection) {
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
    }, { threshold: 0.5 });
    
    observer.observe(kwikpassSection);
  }
  
  // Add click event to demo button
  if (demoBtn) {
    demoBtn.addEventListener('click', function(e) {
      e.preventDefault();
      playDemo();
    });
  }
  
  // Initialize hover effects
  addHoverEffects();
}

// About Us Timeline Animation
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const valueCards = document.querySelectorAll('.value-card');
  const teamCards = document.querySelectorAll('.team-card');
  const aboutCards = document.querySelectorAll('.about-card');
  
  // Create intersection observer for timeline items
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Create intersection observer for value cards with delay
  const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
        valueObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Create intersection observer for team cards with delay
  const teamObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
        teamObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Create intersection observer for about cards
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Initialize timeline items
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
  });
  
  // Initialize value cards
  valueCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    valueObserver.observe(card);
  });
  
  // Initialize team cards
  teamCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    teamObserver.observe(card);
  });
  
  // Initialize about cards
  aboutCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    aboutObserver.observe(card);
  });
}

function initHeroImageSlider() {
  const sliderContainer = document.querySelector('.hero-slider-container');
  const slides = document.querySelectorAll('.hero-slide');
  
  if (!sliderContainer || slides.length === 0) return;
  
  let currentPosition = 0;
  let slideWidth = slides[0].offsetWidth;
  
  // Clone slides for infinite loop effect
  const firstSlideClone = slides[0].cloneNode(true);
  const secondSlideClone = slides[1].cloneNode(true);
  
  sliderContainer.appendChild(firstSlideClone);
  sliderContainer.appendChild(secondSlideClone);
  
  // Start continuous animation
  startContinuousSlide();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    slideWidth = slides[0].offsetWidth;
  });
  
  function startContinuousSlide() {
    let lastTime = 0;
    let speed = 2.5; // pixels per millisecond - adjust for desired speed
    
    function animate(currentTime) {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Move the slider continuously
      currentPosition += speed * deltaTime / 1000;
      
      // Reset position when all slides have been shown
      if (currentPosition >= slides.length * slideWidth) {
        currentPosition = 0;
        sliderContainer.style.transition = 'none';
      } else {
        sliderContainer.style.transition = 'transform 0.1s linear';
      }
      
      // Apply the transform
      sliderContainer.style.transform = `translateX(${-currentPosition}px)`;
      
      // Continue animation
      requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
  }
}

// Testimonial Slider Functionality
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  
  if (!slider || slides.length === 0) return;
  
  let currentIndex = 0;
  let slideWidth = slides[0].offsetWidth + 20; // slide width + gap
  let isAnimating = false;
  
  // Clone slides for infinite loop effect
  const firstSlideClone = slides[0].cloneNode(true);
  const secondSlideClone = slides[1].cloneNode(true);
  const lastSlideClone = slides[slides.length - 1].cloneNode(true);
  const secondLastSlideClone = slides[slides.length - 2].cloneNode(true);
  
  slider.appendChild(firstSlideClone);
  slider.appendChild(secondSlideClone);
  slider.insertBefore(lastSlideClone, slides[0]);
  slider.insertBefore(secondLastSlideClone, lastSlideClone);
  
  // Set initial position
  currentIndex = 2; // Start at the first real slide (after the clones)
  updateSliderPosition();
  
  slider.addEventListener('transitionend', handleTransitionEnd);
  
  window.addEventListener('resize', () => {
    slideWidth = slides[0].offsetWidth + 20;
    updateSliderPosition(false);
  });
  
  // Start continuous animation
  startContinuousSlide();
  
  // Functions
  function startContinuousSlide() {
    // Use requestAnimationFrame for smoother animation
    let lastTime = 0;
    let speed = 2.5; // pixels per millisecond
    
    function animate(currentTime) {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Move the slider continuously
      currentIndex += speed * deltaTime / slideWidth * 0.01;
      
      // If we've moved a whole slide, round to the nearest integer
      if (currentIndex >= slides.length + 2) {
        currentIndex = 2;
        slider.style.transition = 'none';
      } else {
        slider.style.transition = 'transform 0.1s linear';
      }
      
      updateSliderPosition();
      requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
  }
  
  function updateSliderPosition(withTransition = true) {
    if (!withTransition) {
      slider.style.transition = 'none';
    }
    slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
  }
  
  function handleTransitionEnd() {
    // Reset to the first real slide when we reach the end
    if (currentIndex >= slides.length + 2) {
      currentIndex = 2;
      slider.style.transition = 'none';
      updateSliderPosition();
    }
    
    // Reset to the last real slide when we go before the start
    if (currentIndex <= 1) {
      currentIndex = slides.length + 1;
      slider.style.transition = 'none';
      updateSliderPosition();
    }
  }
}


