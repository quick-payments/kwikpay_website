/*
TemplateMo 595 3d coverflow - Adapted for Kwik Pay
https://templatemo.com/tm-595-3d-coverflow
*/

// Coverflow functionality
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.coverflow-item');
    const dotsContainer = document.getElementById('dots');
    const currentTitle = document.getElementById('current-title');
    const currentDescription = document.getElementById('current-description');
    const container = document.querySelector('.coverflow-container');
    let currentIndex = 3;
    let isAnimating = false;

    // Image data with titles and descriptions
    const imageData = [
        {
            title: "Kwik Pay Wallet",
            description: "No more fumbling for cash or cards—just drive through and pay automatically."
        },
        {
            title: "Fleet Management",
            description: "Efficient fleet management for businesses."
        },
        {
            title: "Lake Reflection",
            description: "Serene waters mirroring the surrounding landscape"
        },
        {
            title: "Ocean Sunset",
            description: "Golden hour over endless ocean waves"
        },
        {
            title: "Desert Dunes",
            description: "Rolling sand dunes under vast blue skies"
        },
        {
            title: "Starry Night",
            description: "Countless stars illuminating the dark sky"
        },
        {
            title: "Waterfall",
            description: "Cascading water through lush green forest"
        }
    ];

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.onclick = () => goToIndex(index);
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');
    let autoplayInterval = null;
    let isPlaying = true;
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');

    function updateCoverflow() {
        if (isAnimating) return;
        isAnimating = true;

        items.forEach((item, index) => {
            let offset = index - currentIndex;
            
            if (offset > items.length / 2) {
                offset = offset - items.length;
            }
            else if (offset < -items.length / 2) {
                offset = offset + items.length;
            }
            
            const absOffset = Math.abs(offset);
            const sign = Math.sign(offset);
            
            let translateX = offset * 220;
            let translateZ = -absOffset * 200;
            let rotateY = -sign * Math.min(absOffset * 60, 60);
            let opacity = 1 - (absOffset * 0.2);
            let scale = 1 - (absOffset * 0.1);

            if (absOffset > 3) {
                opacity = 0;
                translateX = sign * 800;
            }

            item.style.transform = `
                translateX(${translateX}px) 
                translateZ(${translateZ}px) 
                rotateY(${rotateY}deg)
                scale(${scale})
            `;
            item.style.opacity = opacity;
            item.style.zIndex = 100 - absOffset;

            item.classList.toggle('active', index === currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        const currentData = imageData[currentIndex];
        currentTitle.textContent = currentData.title;
        currentDescription.textContent = currentData.description;
        
        currentTitle.style.animation = 'none';
        currentDescription.style.animation = 'none';
        setTimeout(() => {
            currentTitle.style.animation = 'fadeIn 0.6s forwards';
            currentDescription.style.animation = 'fadeIn 0.6s forwards';
        }, 10);

        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    window.navigate = function(direction) {
        if (isAnimating) return;
        
        currentIndex = currentIndex + direction;
        
        if (currentIndex < 0) {
            currentIndex = items.length - 1;
        } else if (currentIndex >= items.length) {
            currentIndex = 0;
        }
        
        updateCoverflow();
    }

    function goToIndex(index) {
        if (isAnimating || index === currentIndex) return;
        currentIndex = index;
        updateCoverflow();
    }

    // Keyboard navigation
    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    // Click on items to select
    items.forEach((item, index) => {
        item.addEventListener('click', () => goToIndex(index));
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let isSwiping = false;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwiping = true;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        
        const currentX = e.changedTouches[0].screenX;
        const diff = currentX - touchStartX;
        
        if (Math.abs(diff) > 10) {
            e.preventDefault();
        }
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
        isSwiping = false;
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 30;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            handleUserInteraction();
            
            if (diffX > 0) {
                navigate(1);
            } else {
                navigate(-1);
            }
        }
    }

    // Initialize images and reflections
    items.forEach((item) => {
        const img = item.querySelector('img');
        const reflection = item.querySelector('.reflection');
        
        img.onload = function() {
            this.parentElement.classList.remove('image-loading');
            reflection.style.setProperty('--bg-image', `url(${this.src})`);
            reflection.style.backgroundImage = `url(${this.src})`;
            reflection.style.backgroundSize = 'cover';
            reflection.style.backgroundPosition = 'center';
        };
        
        img.onerror = function() {
            this.parentElement.classList.add('image-loading');
        };
    });

    // Autoplay functionality
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCoverflow();
        }, 4000);
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }

    window.toggleAutoplay = function() {
        if (isPlaying) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    }

    function handleUserInteraction() {
        stopAutoplay();
    }

    // Add event listeners to stop autoplay on manual navigation
    items.forEach((item) => {
        item.addEventListener('click', handleUserInteraction);
    });

    document.querySelector('.nav-button.prev').addEventListener('click', handleUserInteraction);
    document.querySelector('.nav-button.next').addEventListener('click', handleUserInteraction);
    
    dots.forEach((dot) => {
        dot.addEventListener('click', handleUserInteraction);
    });

    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            handleUserInteraction();
        }
    });

    // Initialize
    updateCoverflow();
    container.focus();
    startAutoplay();
});

/* CSS for 3D Coverflow */
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Home Section with Coverflow */
        .coverflow-wrapper {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 80px;
        }

        .coverflow-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            perspective: 1200px;
            position: relative;
        }

        .coverflow {
            display: flex;
            align-items: center;
            justify-content: center;
            transform-style: preserve-3d;
            position: relative;
            width: 100%;
            height: 400px;
        }

        .coverflow-item {
            position: absolute;
            width: 300px;
            height: 300px;
            transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            cursor: pointer;
            user-select: none;
        }

        .coverflow-item .cover {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
            position: relative;
            overflow: hidden;
            transform-style: preserve-3d;
            background: #333;
        }

        .coverflow-item .cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }

        /* Reflection */
        .coverflow-item .reflection {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            transform: scaleY(-1);
            opacity: 0.2;
            filter: blur(2px);
            background: linear-gradient(to bottom, 
                rgba(0, 0, 0, 0) 0%, 
                rgba(0, 0, 0, 0.8) 50%, 
                rgba(0, 0, 0, 1) 100%);
            overflow: hidden;
        }

        /* Active item (center) */
        .coverflow-item.active {
            z-index: 100;
            transform: translateX(0) translateZ(0) rotateY(0deg);
        }

        .coverflow-item.active .cover {
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.9);
        }

        /* Navigation */
        .nav-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            z-index: 200;
        }

        .nav-button:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-50%) scale(1.1);
        }

        .nav-button.prev {
            left: 50px;
        }

        .nav-button.next {
            right: 50px;
        }

        /* Dots indicator */
        .dots-container {
            position: absolute;
            bottom: 60px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 200;
        }

        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .dot.active {
            background: rgba(255, 255, 255, 0.8);
            transform: scale(1.3);
        }

        /* Info display */
        .info {
            position: absolute;
            top: 120px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            text-align: center;
            z-index: 200;
        }

        .info h2 {
            font-size: 32px;
            margin-bottom: 10px;
            opacity: 0;
            animation: fadeIn 0.6s forwards;
        }

        .info p {
            font-size: 16px;
            opacity: 0.7;
        }

        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }

        /* Play/Pause Button */
        .play-pause-button {
            position: absolute;
            bottom: 120px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            z-index: 200;
        }

        .play-pause-button:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(-50%) scale(1.1);
        }

        .play-pause-button .pause-icon {
            font-size: 16px;
            letter-spacing: 2px;
        }

        /* Smooth image loading */
        .image-loading {
            background: linear-gradient(45deg, #333, #555);
            position: relative;
        }

        .image-loading::after {
            content: '📷';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48px;
            opacity: 0.5;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .coverflow-item {
                width: 200px;
                height: 200px;
            }

            .nav-button {
                width: 40px;
                height: 40px;
                font-size: 18px;
            }

            .nav-button.prev {
                left: 20px;
            }

            .nav-button.next {
                right: 20px;
            }

            .info h2 {
                font-size: 24px;
            }

            .info p {
                font-size: 14px;
            }
        }

        @media (max-width: 480px) {
            .coverflow-item {
                width: 180px;
                height: 180px;
            }
        }
    `;
    document.head.appendChild(style);
});
