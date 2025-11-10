// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const animatedElements = document.querySelectorAll(
        '.description-block, .example-block, .feature-card, .guarantee-card, .payment-card, .partnership-box'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Add hover effects to contact buttons
    const contactButtons = document.querySelectorAll('.contact-button');
    contactButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click handlers for contact buttons (you can add actual links later)
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default if href is "#"
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                // Here you can add actual contact links
                console.log('Contact button clicked:', this.querySelector('span').textContent);
            }
        });
    });

    // Parallax effect for hero section (optional)
    let lastScrollTop = 0;
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (hero && scrollTop < window.innerHeight) {
            const parallaxValue = scrollTop * 0.2;
            hero.style.transform = `translateY(${parallaxValue}px)`;
            hero.style.transition = 'transform 0.1s ease-out';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add number counter animation for stats
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                const value = Math.floor(current);
                if (element.textContent.includes('+')) {
                    element.textContent = value + '+';
                } else if (element.textContent.includes('%')) {
                    element.textContent = value + '%';
                } else {
                    element.textContent = value;
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (element.textContent.includes('+')) {
                    element.textContent = target + '+';
                } else if (element.textContent.includes('%')) {
                    element.textContent = target + '%';
                } else {
                    element.textContent = target;
                }
            }
        };

        updateCounter();
    };

    // Observe stats and animate when visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                
                if (text.includes('6+')) {
                    animateCounter(statNumber, 6);
                } else if (text.includes('500+')) {
                    animateCounter(statNumber, 500);
                } else if (text.includes('98%')) {
                    animateCounter(statNumber, 98);
                }
            }
        });
    }, { threshold: 0.5 });

    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });

    // Add smooth scroll behavior for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});



