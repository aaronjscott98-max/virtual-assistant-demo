/**
 * VA Dundee - Professional Website Logic
 * Version: 2.1 (Dundee Demo Edition)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navigation & Mobile Menu ---
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');

    // Toggle menu function
    window.toggleMenu = (btn) => {
        const isOpen = navLinks.classList.toggle('open');
        btn.classList.toggle('active');
        btn.setAttribute('aria-expanded', isOpen);
    };

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Dynamic Navbar Background (changes color/size on scroll)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.padding = '0.7rem 0';
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }
    });


    // --- 2. Smooth Scrolling Logic ---
    // Specifically for buttons like "Book a Discovery Call"
    window.scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        const navHeight = navbar.offsetHeight;
        const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };


    // --- 3. Scroll Reveal Animation ---
    // Makes sections slide up gracefully as the user scrolls down
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    // Targets cards, FAQ items, and the new About section
    document.querySelectorAll('.service-card, .price-card, .faq-item, .contact-wrapper, .reveal, .about-image, .about-text').forEach(el => {
        el.classList.add('reveal'); 
        revealObserver.observe(el);
    });


    // --- 4. Professional Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalHTML = btn.innerHTML;
            
            // Get form values (including phone field)
            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                phone: contactForm.querySelector('input[type="tel"]').value || "Not provided",
                message: contactForm.querySelector('textarea').value
            };

            // UI Feedback: Show loading state
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Simulate a network request
            setTimeout(() => {
                console.log("Form Submission Received for VA Dundee:", formData);
                
                // Hide form and show success message
                contactForm.classList.add('hidden');
                successMsg.classList.remove('hidden');

                // Reset the form after 5 seconds
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                    contactForm.classList.remove('hidden');
                    contactForm.reset();
                    btn.disabled = false;
                    btn.innerHTML = originalHTML;
                }, 5000);
            }, 1500);
        });
    }


    // --- 5. Cookie Consent Logic ---
    const banner = document.getElementById('cookieBanner');
    
    window.hideBanner = () => {
        if (banner) {
            banner.style.opacity = '0';
            setTimeout(() => banner.style.display = 'none', 300);
        }
    };

    window.acceptCookies = () => {
        localStorage.setItem('va_dundee_consent', 'accepted');
        hideBanner();
        console.log("Consent Accepted.");
    };

    window.rejectCookies = () => {
        localStorage.setItem('va_dundee_consent', 'declined');
        hideBanner();
    };

    // Check for existing consent on load
    const currentConsent = localStorage.getItem('va_dundee_consent');
    if (currentConsent) {
        if (banner) banner.style.display = 'none';
    } else {
        setTimeout(() => {
            if (banner) banner.style.opacity = '1';
        }, 1000);
    }

});