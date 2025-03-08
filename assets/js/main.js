/**
 * Main JavaScript for Aubrey's RC Cars
 * Enhances site functionality and user experience
 */

/**
 * Collection of utility functions that are used across all pages
 */
const Utilities = {
    /**
     * Show loading indicator
     */
    showLoading() {
        let loader = document.querySelector('.loading-indicator');
        
        if (!loader) {
            loader = document.createElement('div');
            loader.className = 'loading-indicator';
            loader.innerHTML = '<div class="loader"></div>';
            document.body.appendChild(loader);
        }
        
        loader.classList.add('active');
    },

    /**
     * Hide loading indicator
     */
    hideLoading() {
        const loader = document.querySelector('.loading-indicator');
        if (loader) {
            loader.classList.remove('active');
        }
    },

    /**
     * Show notification to user
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, info)
     * @param {number} duration - Duration in milliseconds
     */
    showNotification(message, type = 'info', duration = 3000) {
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
    },

    /**
     * Format currency amount
     * @param {number} amount - Amount to format
     * @returns {string} Formatted currency string
     */
    formatCurrency(amount) {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
    },

    /**
     * Debounce function to limit how often a function can be called
     * @param {Function} func - Function to debounce
     * @param {number} wait - Milliseconds to wait
     * @returns {Function} Debounced function
     */
    debounce(func, wait = 300) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
};

/**
 * Product operations that are used across multiple pages
 */
const ProductOperations = {
    /**
     * Add product to cart
     * @param {Object} product - Product object with id, name, price, and image
     */
    addToCart(product) {
        if (!product || !product.id || !product.name || !product.price) {
            console.error('Invalid product data:', product);
            return;
        }
        
        if (window.topBar) {
            window.topBar.addToCart(product);
            return true;
        } else {
            console.error('TopBar not available');
            return false;
        }
    },

    /**
     * Show quick view for a product
     * @param {HTMLElement} productCard - Product card element
     */
    showQuickView(productCard) {
        if (!productCard) return;
        
        // Get product details
        const id = productCard.dataset.id || '';
        const name = productCard.querySelector('h3').textContent;
        const price = productCard.querySelector('.price').textContent;
        const image = productCard.querySelector('img').src;
        const description = productCard.querySelector('p').textContent;
        const specs = Array.from(productCard.querySelectorAll('.specs li')).map(li => li.textContent);
        
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'product-quick-view';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'quick-view-title');
        
        modal.innerHTML = `
            <div class="quick-view-content">
                <button class="close-quick-view" aria-label="Close quick view">&times;</button>
                <div class="quick-view-image">
                    <img src="${image}" alt="${name}" loading="lazy">
                </div>
                <div class="quick-view-details">
                    <h3 id="quick-view-title">${name}</h3>
                    <p class="quick-view-desc">${description}</p>
                    <div class="quick-view-specs">
                        <h4>Specifications</h4>
                        <ul>
                            ${specs.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="quick-view-price">${price}</div>
                    <button class="button add-to-cart-quick-view" data-id="${id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        // Add modal to DOM
        document.body.appendChild(modal);
        document.body.classList.add('modal-open');
        
        // Focus on modal
        setTimeout(() => {
            modal.classList.add('active');
            modal.querySelector('.close-quick-view').focus();
        }, 10);
        
        // Close button event listener
        modal.querySelector('.close-quick-view').addEventListener('click', () => {
            this.closeQuickView(modal);
        });
        
        // Add to cart button event listener
        modal.querySelector('.add-to-cart-quick-view').addEventListener('click', () => {
            // Extract product price
            const productPriceValue = parseFloat(price.replace(/[^0-9.]/g, ''));
            
            // Create product object
            const product = {
                id: id,
                name: name,
                price: productPriceValue,
                image: image
            };
            
            // Add to cart
            this.addToCart(product);
            
            // Close modal
            this.closeQuickView(modal);
        });
        
        // Close on ESC key
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                this.closeQuickView(modal);
            }
        };
        
        document.addEventListener('keydown', handleEscKey);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeQuickView(modal);
            }
        });
    },

    /**
     * Close quick view modal
     * @param {HTMLElement} modal - Quick view modal element
     */
    closeQuickView(modal) {
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // Remove modal after animation
        setTimeout(() => {
            if (document.body.contains(modal)) {
                modal.remove();
            }
        }, 300);
    }
};

/**
 * Handles animations and scroll effects
 */
const AnimationController = {
    /**
     * Initialize animations based on scroll position
     */
    initScrollAnimations() {
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
};

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
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
            }
        });
    });
}

// Initialize page-independent functionality on all pages
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scroll behavior
    initSmoothScroll();
    
    // Expose utility functions to global scope
    window.Utilities = Utilities;
    window.ProductOperations = ProductOperations;
    window.AnimationController = AnimationController;
});