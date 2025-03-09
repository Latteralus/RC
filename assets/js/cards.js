/**
 * cards.js - Product cards data and rendering for Aubrey's RC website
 * Part of the simplified file structure approach for www.aubreysrc.com
 * UPDATED: Made products available as a prototype property for sharing with other scripts
 */

class ProductCards {
    constructor() {
        // Using products from prototype to allow sharing between instances
        this.products = ProductCards.prototype.products;
        
        // Current position in carousel
        this.currentPosition = 0;
        
        // Number of cards to display at once (will be updated based on screen size)
        this.cardsToShow = 3;
        
        // Auto-scroll interval ID (for clearing)
        this.autoScrollInterval = null;
    }
    
    // Initialize product carousel
    initialize(containerId = 'product-carousel', autoScroll = true, interval = 5000) {
        // Get container element
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        // Create carousel structure
        this.createCarouselStructure();
        
        // Render initial cards
        this.updateCardsToShow();
        this.renderCards();
        
        // Add event listeners for navigation
        this.attachEventListeners();
        
        // Add window resize listener to handle responsive changes
        window.addEventListener('resize', () => {
            this.updateCardsToShow();
            this.renderCards();
        });
        
        // Set up auto-scroll if enabled
        if (autoScroll) {
            this.startAutoScroll(interval);
        }
    }
    
    // Create the carousel structure
    createCarouselStructure() {
        const carouselHTML = `
            <div class="carousel-container">
                <button class="carousel-button prev" aria-label="Previous products">❮</button>
                <div class="carousel-track-container">
                    <div class="carousel-track"></div>
                </div>
                <button class="carousel-button next" aria-label="Next products">❯</button>
            </div>
            <div class="carousel-nav">
                <div class="carousel-indicators"></div>
            </div>
        `;
        
        this.container.innerHTML = carouselHTML;
        
        // Store references to carousel elements
        this.track = this.container.querySelector('.carousel-track');
        this.prevButton = this.container.querySelector('.carousel-button.prev');
        this.nextButton = this.container.querySelector('.carousel-button.next');
        this.indicators = this.container.querySelector('.carousel-indicators');
    }
    
    // Update the number of cards to show based on screen width
    updateCardsToShow() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth < 576) {
            this.cardsToShow = 1;
        } else if (windowWidth < 992) {
            this.cardsToShow = 2;
        } else {
            this.cardsToShow = 3;
        }
    }
    
    // Render product cards in the carousel
    renderCards() {
        if (!this.track) return;
        
        // Get featured products or all products
        const productsToShow = this.products.filter(product => product.featured);
        
        // Clear existing cards
        this.track.innerHTML = '';
        
        // Create product cards
        productsToShow.forEach((product, index) => {
            const card = this.createProductCard(product);
            this.track.appendChild(card);
        });
        
        // Update the indicators
        this.updateIndicators(productsToShow.length);
        
        // Position the track to show current position
        this.updateTrackPosition();
    }
    
    // Create a single product card
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.image}">
                    Add to Cart
                </button>
            </div>
        `;
        
        // Add event listener for the add to cart button
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', (e) => {
            this.addToCart(product);
        });
        
        return card;
    }
    
    // Update carousel indicators
    updateIndicators(totalProducts) {
        if (!this.indicators) return;
        
        // Clear existing indicators
        this.indicators.innerHTML = '';
        
        // Calculate number of pages
        const pages = Math.ceil(totalProducts / this.cardsToShow);
        
        // Create indicator for each page
        for (let i = 0; i < pages; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `Go to page ${i + 1}`);
            
            if (Math.floor(this.currentPosition / this.cardsToShow) === i) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                this.currentPosition = i * this.cardsToShow;
                this.updateTrackPosition();
                this.updateIndicatorStatus();
            });
            
            this.indicators.appendChild(indicator);
        }
    }
    
    // Update which indicator is active
    updateIndicatorStatus() {
        const indicators = this.indicators.querySelectorAll('.carousel-indicator');
        const currentPage = Math.floor(this.currentPosition / this.cardsToShow);
        
        indicators.forEach((indicator, index) => {
            if (index === currentPage) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Update the position of the track to show current cards
    updateTrackPosition() {
        // Get all cards
        const cards = this.track.querySelectorAll('.product-card');
        
        // Get featured products
        const featuredProducts = this.products.filter(product => product.featured);
        
        // Calculate maximum position
        const maxPosition = Math.max(0, featuredProducts.length - this.cardsToShow);
        
        // Ensure current position is valid
        this.currentPosition = Math.min(Math.max(0, this.currentPosition), maxPosition);
        
        // Update cards visibility and position
        cards.forEach((card, index) => {
            // Calculate card position
            const cardWidth = 100 / this.cardsToShow;
            
            // Apply positioning
            card.style.flex = `0 0 ${cardWidth}%`;
            
            // Set transform to show current cards
            this.track.style.transform = `translateX(-${this.currentPosition * (100 / this.cardsToShow)}%)`;
        });
        
        // Update button states
        this.updateNavigationButtons(maxPosition);
    }
    
    // Update button enabled/disabled state
    updateNavigationButtons(maxPosition) {
        if (this.currentPosition <= 0) {
            this.prevButton.classList.add('disabled');
        } else {
            this.prevButton.classList.remove('disabled');
        }
        
        if (this.currentPosition >= maxPosition) {
            this.nextButton.classList.add('disabled');
        } else {
            this.nextButton.classList.remove('disabled');
        }
    }
    
    // Attach event listeners for navigation
    attachEventListeners() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.navigate(-1);
            });
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.navigate(1);
            });
        }
        
        // Add touch support
        if (this.track) {
            let startX = 0;
            let endX = 0;
            
            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                
                // Pause auto-scroll when user interacts
                this.pauseAutoScroll();
            });
            
            this.track.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                
                // Detect swipe direction
                if (startX - endX > 50) {
                    // Swipe left, go next
                    this.navigate(1);
                } else if (endX - startX > 50) {
                    // Swipe right, go previous
                    this.navigate(-1);
                }
                
                // Resume auto-scroll
                this.resumeAutoScroll();
            });
        }
    }
    
    // Navigate the carousel
    navigate(direction) {
        this.currentPosition += direction;
        
        // Get featured products
        const featuredProducts = this.products.filter(product => product.featured);
        
        // Calculate maximum position
        const maxPosition = Math.max(0, featuredProducts.length - this.cardsToShow);
        
        // Ensure position is within bounds
        this.currentPosition = Math.min(Math.max(0, this.currentPosition), maxPosition);
        
        // Update position
        this.updateTrackPosition();
        
        // Update indicators
        this.updateIndicatorStatus();
    }
    
    // Start auto-scrolling
    startAutoScroll(interval) {
        // Clear any existing interval
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
        
        // Set up new interval
        this.autoScrollInterval = setInterval(() => {
            // Get featured products
            const featuredProducts = this.products.filter(product => product.featured);
            
            // Calculate maximum position
            const maxPosition = Math.max(0, featuredProducts.length - this.cardsToShow);
            
            // If at the end, go back to start
            if (this.currentPosition >= maxPosition) {
                this.currentPosition = 0;
            } else {
                // Otherwise, advance by 1
                this.currentPosition++;
            }
            
            this.updateTrackPosition();
            this.updateIndicatorStatus();
        }, interval);
    }
    
    // Pause auto-scrolling (for user interaction)
    pauseAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }
    
    // Resume auto-scrolling
    resumeAutoScroll() {
        this.startAutoScroll(5000); // Resume with 5 second interval
    }
    
    // Add a product to the cart
    addToCart(product) {
        // Use existing cart system from header.js or cart.js
        if (window.cart && typeof window.cart.addItem === 'function') {
            window.cart.addItem(product);
        } else if (window.header && typeof window.header.addToCart === 'function') {
            window.header.addToCart(product);
        } else {
            // Fallback if neither is available
            console.log(`Added to cart: ${product.name} - $${product.price}`);
            
            // Update cart count display as a visual cue
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const currentCount = parseInt(cartCount.textContent || '0');
                cartCount.textContent = currentCount + 1;
            }
        }
    }
}

// Define the centralized product data on the prototype so it can be shared
ProductCards.prototype.products = [
    {
        id: "traxxas-rustler",
        name: "Traxxas Rustler",
        description: "High-performance electric stadium truck",
        price: 299.99,
        image: "/assets/images/products/car1.jpg",
        featured: true,
        category: "trucks"
    },
    {
        id: "arrma-kraton",
        name: "Arrma Kraton",
        description: "1/8 Scale Monster Truck",
        price: 549.99,
        image: "/assets/images/products/car2.jpg",
        featured: true,
        category: "trucks"
    },
    {
        id: "losi-mini-t",
        name: "Losi Mini-T",
        description: "Compact racing truck",
        price: 199.99,
        image: "/assets/images/products/car3.jpg",
        featured: true,
        category: "trucks"
    },
    {
        id: "traxxas-slash",
        name: "Traxxas Slash",
        description: "Short Course Racing Truck",
        price: 329.99,
        image: "/assets/images/products/car4.jpg",
        featured: true,
        category: "trucks"
    },
    {
        id: "tamiya-tt02",
        name: "Tamiya TT-02",
        description: "Versatile touring car chassis",
        price: 189.99,
        image: "/assets/images/products/car5.jpg",
        featured: true,
        category: "cars"
    },
    {
        id: "axial-scx10",
        name: "Axial SCX10 III",
        description: "Scale crawler with realistic details",
        price: 399.99,
        image: "/assets/images/products/car6.jpg",
        featured: false,
        category: "crawlers"
    },
    {
        id: "hpi-rs4-sport",
        name: "HPI RS4 Sport 3",
        description: "Ready-to-run touring car with realistic drift action",
        price: 279.99,
        image: "/assets/images/products/car7.jpg",
        featured: false,
        category: "cars"
    },
    {
        id: "team-associated-dr10",
        name: "Team Associated DR10",
        description: "Competition-grade drag racing RC car with realistic wheelie bar",
        price: 359.99,
        image: "/assets/images/products/car8.jpg",
        featured: false,
        category: "cars"
    },
    {
        id: "traxxas-trx4",
        name: "Traxxas TRX-4",
        description: "Trail and scale crawler with portal axles",
        price: 449.99,
        image: "/assets/images/products/car9.jpg",
        featured: false,
        category: "crawlers"
    },
    {
        id: "arrma-typhon",
        name: "Arrma Typhon",
        description: "High-speed 4WD buggy built for extreme bashing",
        price: 379.99,
        image: "/assets/images/products/car10.jpg",
        featured: false,
        category: "cars"
    },
    {
        id: "traxxas-batteries",
        name: "Traxxas Power Cell LiPo Battery",
        description: "High-capacity 5000mAh LiPo battery for extended runtime",
        price: 89.99,
        image: "/assets/images/products/accessory1.jpg",
        featured: false,
        category: "accessories"
    },
    {
        id: "spektrum-dx5c",
        name: "Spektrum DX5C Controller",
        description: "5-channel surface transmitter with programmable mixing",
        price: 219.99,
        image: "/assets/images/products/accessory2.jpg",
        featured: false,
        category: "accessories"
    }
];

// Make ProductCards available globally
window.ProductCards = ProductCards;

// Initialize product cards when the DOM is ready if this script is loaded directly
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.productCardsInitialized === 'undefined') {
        // Initialize product cards if the container exists
        if (document.getElementById('product-carousel')) {
            const productCards = new ProductCards();
            productCards.initialize();
            window.productCards = productCards;
            window.productCardsInitialized = true;
        }
    }
});