document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('main-nav');
    const header = document.querySelector('.main-header');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            header.classList.toggle('menu-active');
            
            // Prevent scrolling when menu is open on mobile
            document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                header.classList.remove('menu-active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes to sections and cards
    const animElements = document.querySelectorAll('.menu-card, .about-text, .about-image, .booking-content, .booking-form');
    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Add CSS dynamically for the animation
    const styleAttr = document.createElement('style');
    styleAttr.innerHTML = `
        .animate-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleAttr);

    // Form Submission Handling
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate submission
            const submitBtn = reservationForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            setTimeout(() => {
                alert('Thank you for choosing Chai Bliss! Your table has been reserved. We will contact you shortly.');
                reservationForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 5px 25px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
    });

    // Simple Newsletter Simulation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Subscribed! Get ready for aromatic updates.');
            newsletterForm.reset();
        });
    }
});