/**
 * Main JavaScript for Aubrey's RC Cars
 * Enhances site functionality and user experience
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize TopBar if not already done in the page
    if (typeof TopBar !== 'undefined' && !window.topBarInitialized) {
        window.topBar = new TopBar();
        window.topBar.render();
        window.topBarInitialized = true;
    }

    // Product functionality
    initializeProducts();
    
    // Smooth scroll for navigation links
    initializeSmoothScroll();
    
    // Initialize Intersection Observer for animations
    initializeAnimations();
});

/**
 * Initialize product related functionality
 */
function initializeProducts() {
    // Setup product filters if they exist
    const filterControls = document.querySelectorAll('.filter-controls select');
    
    if (filterControls.length > 0) {
        filterControls.forEach(select => {
            select.addEventListener('change', filterProducts);
        });
        
        // Initial filter
        filterProducts();
    }
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
}

/**
 * Filter products based on selected filters
 */
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const brandFilter = document.getElementById('brand-filter');
    
    if (!categoryFilter && !priceFilter && !brandFilter) return;
    
    const productCards = document.querySelectorAll('.product-card');
    
    // Show loading indicator
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) loadingIndicator.classList.add('active');
    
    // Delay filtering to show loading effect (in real app, this might be an API call)
    setTimeout(() => {
        productCards.forEach(card => {
            // Get product data
            const category = card.dataset.category || '';
            const price = parseFloat(card.dataset.price || 0);
            const brand = card.dataset.brand || '';
            
            // Check filters
            let showProduct = true;
            
            if (categoryFilter && categoryFilter.value !== 'all') {
                showProduct = showProduct && category.toLowerCase() === categoryFilter.value.toLowerCase();
            }
            
            if (priceFilter && priceFilter.value !== 'all') {
                const priceRange = priceFilter.value.split('-');
                if (priceRange.length === 1 && priceRange[0].endsWith('+')) {
                    // Price is above a certain value (e.g. "500+")
                    const minPrice = parseFloat(priceRange[0]);
                    showProduct = showProduct && price >= minPrice;
                } else if (priceRange.length === 2) {
                    // Price is between two values (e.g. "200-500")
                    const minPrice = parseFloat(priceRange[0]);
                    const maxPrice = parseFloat(priceRange[1]);
                    showProduct = showProduct && price >= minPrice && price <= maxPrice;
                }
            }
            
            if (brandFilter && brandFilter.value !== 'all') {
                showProduct = showProduct && brand.toLowerCase() === brandFilter.value.toLowerCase();
            }
            
            // Show or hide product
            if (showProduct) {
                card.style.display = 'block';
                // Add fade-in animation
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });
        
        // Update results count if it exists
        const resultsCount = document.querySelector('.results-count');
        if (resultsCount) {
            const visibleProducts = document.querySelectorAll('.product-card[style="display: block;"]').length;
            resultsCount.textContent = visibleProducts;
            
            // Update results text
            const resultsText = document.querySelector('.results-text');
            if (resultsText) {
                resultsText.textContent = visibleProducts === 1 ? 'product' : 'products';
            }
        }
        
        // Hide loading indicator
        if (loadingIndicator) loadingIndicator.classList.remove('active');
    }, 300);
}

/**
 * Add product to cart
 * @param {Event} e - Click event
 */
function addToCart(e) {
    const productCard = e.target.closest('.product-card');
    if (!productCard) return;
    
    // Get product details
    const productId = productCard.dataset.id || `product-${Math.random().toString(36).substr(2, 9)}`;
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));
    const productImage = productCard.querySelector('img').src;
    
    // Create product object
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
    };
    
    // Add to cart using TopBar's method
    if (window.topBar) {
        window.topBar.addToCart(product);
    } else {
        console.error('TopBar not initialized');
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile navigation if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('nav-open')) {
                    navLinks.classList.remove('nav-open');
                    const mobileNavButton = document.querySelector('.mobile-nav-toggle');
                    if (mobileNavButton) {
                        mobileNavButton.classList.remove('nav-open');
                        mobileNavButton.setAttribute('aria-expanded', 'false');
                    }
                }
                
                // Scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });
}

/**
 * Initialize animations based on scroll position
 */
function initializeAnimations() {
    // Only apply animations if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        // Create observer for fade-in animations
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all sections and elements with fade-in-section class
        document.querySelectorAll('section, .fade-in-section').forEach(element => {
            if (!element.classList.contains('fade-in-section')) {
                element.classList.add('fade-in-section');
            }
            animationObserver.observe(element);
        });
        
        // Create observer for lazy-loaded images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, observerOptions);
        
        // Observe all images with lazy-load class
        document.querySelectorAll('img.lazy-load').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('section, .fade-in-section').forEach(element => {
            element.classList.add('fade-in');
        });
        
        document.querySelectorAll('img.lazy-load').forEach(img => {
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
            img.classList.add('loaded');
        });
    }
}

/**
 * Add accessible tooltip to an element
 * @param {HTMLElement} element - Element to add tooltip to
 * @param {string} text - Tooltip text
 */
function addTooltip(element, text) {
    if (!element) return;
    
    element.setAttribute('role', 'tooltip');
    element.setAttribute('aria-label', text);
    element.setAttribute('tabindex', '0');
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    
    element.appendChild(tooltip);
    
    // Show tooltip on hover/focus
    element.addEventListener('mouseenter', () => {
        tooltip.classList.add('visible');
    });
    
    element.addEventListener('focus', () => {
        tooltip.classList.add('visible');
    });
    
    // Hide tooltip on mouse leave/blur
    element.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
    
    element.addEventListener('blur', () => {
        tooltip.classList.remove('visible');
    });
}

/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Add close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 300);
    });
    
    // Auto-remove after duration
    if (duration > 0) {
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);
    }
    
    return notification;
}