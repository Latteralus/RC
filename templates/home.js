/**
 * Home page template for Aubrey's RC Cars
 * This module exports the HTML content and initialization function for the homepage
 */

/**
 * Renders the home page HTML
 * @returns {string} The HTML content for the home page
 */
export default function() {
    return `
        <!-- Hero Section with transform-based background video -->
        <section class="hero">
            <div class="video-background">
                <iframe
                    src="https://www.youtube.com/embed/fn02DjC0gok?autoplay=1&mute=1&start=25&loop=1&playlist=fn02DjC0gok&controls=0&showinfo=0&rel=0&modestbranding=1"
                    allow="autoplay; encrypted-media"
                    allowfullscreen>
                </iframe>
            </div>

            <div class="hero-overlay"></div>

            <div class="hero-content">
                <h1>Custom RC Cars & Trucks</h1>
                <p>Handcrafted in Iowa, built to ignite your passion for RC adventures.</p>
                <a href="/products" class="cta-button">Build your Custom RC</a>
            </div>
        </section>

        <!-- Featured Products -->
        <section class="featured-products">
            <h2>Featured RC Cars</h2>
            <div class="product-grid">
                <div class="product-card">
                    <div class="product-card-image">
                        <img src="/assets/images/products/car1.jpg" alt="Traxxas Rustler" loading="lazy">
                        <span class="product-badge bestseller">Bestseller</span>
                        <div class="product-actions">
                            <button class="action-button quick-view-button" aria-label="Quick view Traxxas Rustler"></button>
                            <button class="action-button wishlist-button" aria-label="Add Traxxas Rustler to wishlist"></button>
                        </div>
                    </div>
                    <div class="product-card-content">
                        <span class="product-category">Trucks</span>
                        <h3>Traxxas Rustler</h3>
                        <p>High-performance electric stadium truck</p>
                        <span class="price">$299.99</span>
                        <div class="add-to-cart-area">
                            <button class="add-to-cart" data-id="traxxas-rustler" data-name="Traxxas Rustler" data-price="299.99" data-image="/assets/images/products/car1.jpg">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-card-image">
                        <img src="/assets/images/products/car2.jpg" alt="Arrma Kraton" loading="lazy">
                        <span class="product-badge new">New</span>
                        <div class="product-actions">
                            <button class="action-button quick-view-button" aria-label="Quick view Arrma Kraton"></button>
                            <button class="action-button wishlist-button" aria-label="Add Arrma Kraton to wishlist"></button>
                        </div>
                    </div>
                    <div class="product-card-content">
                        <span class="product-category">Trucks</span>
                        <h3>Arrma Kraton</h3>
                        <p>1/8 Scale Monster Truck</p>
                        <span class="price">$549.99</span>
                        <div class="add-to-cart-area">
                            <button class="add-to-cart" data-id="arrma-kraton" data-name="Arrma Kraton" data-price="549.99" data-image="/assets/images/products/car2.jpg">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-card-image">
                        <img src="/assets/images/products/car3.jpg" alt="Losi Mini-T" loading="lazy">
                        <span class="product-badge sale">Sale</span>
                        <div class="product-actions">
                            <button class="action-button quick-view-button" aria-label="Quick view Losi Mini-T"></button>
                            <button class="action-button wishlist-button" aria-label="Add Losi Mini-T to wishlist"></button>
                        </div>
                    </div>
                    <div class="product-card-content">
                        <span class="product-category">Trucks</span>
                        <h3>Losi Mini-T</h3>
                        <p>Compact racing truck</p>
                        <span class="price"><span class="original-price">$229.99</span> $199.99 <span class="discount-percentage">-13%</span></span>
                        <div class="add-to-cart-area">
                            <button class="add-to-cart" data-id="losi-mini-t" data-name="Losi Mini-T" data-price="199.99" data-image="/assets/images/products/car3.jpg">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Custom Builds -->
        <section class="custom-builds">
            <h2>Custom Builds</h2>
            <div class="builds-showcase">
                <div class="build-card">
                    <img src="/assets/images/custom/build1.jpg" alt="Performance Upgrades" loading="lazy">
                    <h3>Performance Upgrades</h3>
                    <p>Boost your RC car's speed and handling</p>
                    <a href="/custom" class="cta-button secondary">Learn More</a>
                </div>
                <div class="build-card">
                    <img src="/assets/images/custom/build2.jpg" alt="Visual Customization" loading="lazy">
                    <h3>Visual Customization</h3>
                    <p>Stand out with unique paint and body mods</p>
                    <a href="/custom" class="cta-button secondary">Learn More</a>
                </div>
            </div>
        </section>

        <!-- Racing Events -->
        <section class="racing-events">
            <h2>Racing Events</h2>
            <div class="events-grid">
                <div class="event-card">
                    <div class="event-date">
                        <span class="month">FEB</span>
                        <span class="day">15</span>
                    </div>
                    <div class="event-details">
                        <h3>Weekend Race Series</h3>
                        <p>Join us every Saturday for exciting RC races</p>
                        <span class="date">Every Saturday @ 2PM</span>
                        <a href="/racing" class="cta-button accent">View Details</a>
                    </div>
                </div>
                <div class="event-card">
                    <div class="event-date">
                        <span class="month">FEB</span>
                        <span class="day">22</span>
                    </div>
                    <div class="event-details">
                        <h3>Beginner's Workshop</h3>
                        <p>Learn the basics of RC racing</p>
                        <span class="date">Sundays @ 11AM</span>
                        <a href="/racing" class="cta-button accent">View Details</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

/**
 * Initializes the home page functionality
 * This function is called after the HTML is rendered to the page
 */
export function init() {
    // Initialize product interactions
    initializeProductCards();
    
    // Initialize animations
    initializeAnimations();
}

/**
 * Initializes product card functionality
 */
function initializeProductCards() {
    // Setup "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image
            };
            
            // Add to cart if topBar exists
            if (window.topBar) {
                window.topBar.addToCart(product);
            }
        });
    });
    
    // Setup quick view buttons
    document.querySelectorAll('.quick-view-button').forEach(button => {
        button.addEventListener('click', function() {
            // Get product card data
            const productCard = this.closest('.product-card');
            if (productCard) {
                // Show product quick view (example)
                showQuickView(productCard);
            }
        });
    });
}

/**
 * Show quick view for a product
 * @param {HTMLElement} productCard - The product card element
 */
function showQuickView(productCard) {
    // Implementation for quick view functionality
    // This would typically create a modal with product details
    console.log('Quick view for:', productCard);
}

/**
 * Initialize animations for the home page
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
        
        // Observe all sections for animations
        document.querySelectorAll('section').forEach(element => {
            if (!element.classList.contains('hero')) {
                element.classList.add('fade-in-section');
                animationObserver.observe(element);
            }
        });
    }
}