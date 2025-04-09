// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hero section animations
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTl.from('.hero-title span', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    })
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8
    }, '-=0.4')
    .from('.hero-section a', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    }, '-=0.4')
    .from('.hero-image', {
        x: 50,
        opacity: 0,
        duration: 1
    }, '-=0.8');

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8
        });
    });

    // Section subtitles animation
    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.from(subtitle, {
            scrollTrigger: {
                trigger: subtitle,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2
        });
    });

    // Feature cards animation
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2
        });
    });

    // Service cards animation
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1
        });
    });

    // CTA section animation
    const ctaSection = document.querySelector('.cta-title');
    if (ctaSection) {
        const ctaTl = gsap.timeline({
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        ctaTl.from('.cta-title', {
            y: 50,
            opacity: 0,
            duration: 0.8
        })
        .from('.cta-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from('.cta-section a', {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, '-=0.5');
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Fade in animations
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((element) => {
        gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Float animation for icons
    const floatingElements = document.querySelectorAll('.float-animation');
    floatingElements.forEach((element) => {
        gsap.to(element, {
            y: -10,
            duration: 1.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });
    });

    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Hero title animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        gsap.from(heroTitle, {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.5,
            ease: "power3.out"
        });
    }

    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat-card .text-4xl');
    statsNumbers.forEach((number) => {
        const value = number.textContent;
        gsap.from(number, {
            textContent: 0,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: number,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            snap: { textContent: 1 },
            stagger: {
                amount: 0.5
            }
        });
    });

    // Team member card hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member) => {
        const image = member.querySelector('img');
        
        member.addEventListener('mouseenter', () => {
            gsap.to(member, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
            if (image) {
                gsap.to(image, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        member.addEventListener('mouseleave', () => {
            gsap.to(member, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            if (image) {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
}); 