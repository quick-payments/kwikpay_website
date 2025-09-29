/**
 * Terms & Conditions Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Handle smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('.toc-list a');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Scroll to the target section with offset for fixed navbar
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Adjust based on navbar height
          behavior: 'smooth'
        });
        
        // Update URL without page reload
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Add active class to current section based on scroll position
  window.addEventListener('scroll', highlightCurrentSection);
  
  function highlightCurrentSection() {
    const sections = document.querySelectorAll('.terms-section');
    const navLinks = document.querySelectorAll('.toc-list a');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // Adjust based on navbar height
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = '#' + section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  // Back to top functionality
  const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="bi bi-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.display = 'none';
    button.style.backgroundColor = 'var(--bs-primary)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '50%';
    button.style.width = '40px';
    button.style.height = '40px';
    button.style.fontSize = '20px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '1000';
    button.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    });
    
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  
  createBackToTopButton();
  
  // Print functionality
  const addPrintButton = () => {
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="bi bi-printer"></i> Print Terms & Conditions';
    printButton.className = 'btn btn-outline-primary mt-4';
    
    const termsContainer = document.querySelector('.terms-container');
    if (termsContainer) {
      termsContainer.appendChild(printButton);
    }
    
    printButton.addEventListener('click', () => {
      window.print();
    });
  };
  
  addPrintButton();
});
