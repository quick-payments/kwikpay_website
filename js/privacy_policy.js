/**
 * Privacy Policy Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Add data-aos attributes to privacy sections for animation
  const privacySections = document.querySelectorAll('.privacy-section');
  privacySections.forEach((section, index) => {
    section.setAttribute('data-aos', 'fade-up');
    section.setAttribute('data-aos-delay', (index * 100).toString());
    section.setAttribute('data-aos-duration', '800');
  });

  // Handle active state for TOC links
  const tocLinks = document.querySelectorAll('.toc-list a');
  const sections = document.querySelectorAll('.privacy-section');
  
  // Intersection Observer for sections
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -70% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        tocLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding link
        const id = entry.target.getAttribute('id');
        const correspondingLink = document.querySelector(`.toc-list a[href="#${id}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });

  // Add scroll to top button functionality
  const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="bi bi-arrow-up"></i>';
    button.classList.add('scroll-top-btn');
    button.setAttribute('aria-label', 'Scroll to top');
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = '1000';
    button.style.width = '40px';
    button.style.height = '40px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = 'var(--bs-primary)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    button.style.opacity = '0';
    button.style.transition = 'opacity 0.3s ease';
    button.style.cursor = 'pointer';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        button.style.opacity = '1';
      } else {
        button.style.opacity = '0';
      }
    });
    
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  
  createScrollTopButton();
  
  // Add active class to TOC links on click
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      tocLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Style active TOC links
  const style = document.createElement('style');
  style.textContent = `
    .toc-list a.active {
      color: var(--bs-primary);
      font-weight: 600;
    }
    
    .toc-list a.active::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: var(--bs-primary);
      margin-top: 2px;
    }
  `;
  document.head.appendChild(style);
});
