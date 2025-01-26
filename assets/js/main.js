document.addEventListener('DOMContentLoaded', () => {
    // Shopping cart functionality
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Update cart count display
    const updateCartCount = () => {
        cartCountElement.textContent = cartCount;
        // Add animation class
        cartCountElement.classList.add('cart-update');
        setTimeout(() => {
            cartCountElement.classList.remove('cart-update');
        }, 300);
    };

    // Add to cart button click handler
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            cartCount++;
            updateCartCount();
            
            // Get product details
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Show confirmation message
            const confirmation = document.createElement('div');
            confirmation.classList.add('add-to-cart-confirmation');
            confirmation.textContent = `${productName} added to cart!`;
            document.body.appendChild(confirmation);
            
            // Remove confirmation after animation
            setTimeout(() => {
                confirmation.remove();
            }, 2000);
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Mobile navigation toggle
    const createMobileNav = () => {
        const nav = document.querySelector('.nav-links');
        const mobileNavButton = document.createElement('button');
        mobileNavButton.classList.add('mobile-nav-toggle');
        mobileNavButton.innerHTML = `
            <span class="hamburger"></span>
        `;
        
        document.querySelector('.nav-container').prepend(mobileNavButton);

        mobileNavButton.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            mobileNavButton.classList.toggle('nav-open');
        });
    };

    // Initialize mobile navigation if screen width is less than 768px
    if (window.innerWidth < 768) {
        createMobileNav();
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth < 768 && !document.querySelector('.mobile-nav-toggle')) {
                createMobileNav();
            } else if (window.innerWidth >= 768) {
                const mobileNavButton = document.querySelector('.mobile-nav-toggle');
                if (mobileNavButton) {
                    mobileNavButton.remove();
                    document.querySelector('.nav-links').classList.remove('nav-open');
                }
            }
        }, 250);
    });
});