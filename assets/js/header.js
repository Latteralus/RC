/**
 * header.js - Header functionality for Aubrey's RC website
 * Part of the simplified file structure approach for www.aubreysrc.com
 */

class Header {
    constructor() {
        // Initialize cart data from localStorage if available
        this.cart = JSON.parse(localStorage.getItem('aubreysrc_cart')) || [];
        this.cartCount = this.calculateCartCount();
    }

    render() {
        // Create header HTML
        const headerHTML = `
            <header class="main-header">
                <nav class="nav-container">
                    <div class="logo">
                        <h1>Aubrey's RC</h1>
                    </div>
                    
                    <button class="mobile-nav-toggle" aria-label="Toggle navigation">
                        <span>☰</span>
                    </button>
                    
                    <ul class="nav-links">
                        <li><a href="/index.html">Home</a></li>
                        <li><a href="/products.html">Shop</a></li>
                        <li><a href="/custom.html">Custom Builds</a></li>
                        <li><a href="/videos.html">Media</a></li>
                        <li><a href="/racing.html">Racing</a></li>
                        <li><a href="/contact.html">Contact</a></li>
                    </ul>
                    
                    <div class="cart-icon" id="cart-icon">
                        <span class="cart-count">${this.cartCount}</span>
                        <img src="/assets/images/cart.svg" alt="Shopping Cart" style="width: 24px; height: 24px; filter: invert(1);">
                    </div>
                </nav>
            </header>
        `;
        
        // Insert header at the beginning of the #app div
        document.getElementById('app').insertAdjacentHTML('afterbegin', headerHTML);
        
        // Add event listeners
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        // Toggle mobile navigation
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        if (mobileNavToggle) {
            mobileNavToggle.addEventListener('click', () => {
                document.querySelector('.nav-links').classList.toggle('active');
            });
        }
        
        // Cart icon click handler - navigate to cart page
        const cartIcon = document.getElementById('cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', () => {
                window.location.href = '/cart.html';
            });
        }
    }
    
    addToCart(product) {
        // Check if product already exists in cart
        const existingProductIndex = this.cart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex >= 0) {
            // Increment quantity if product already in cart
            this.cart[existingProductIndex].quantity = (this.cart[existingProductIndex].quantity || 1) + 1;
        } else {
            // Add new product to cart with quantity 1
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        // Update localStorage
        localStorage.setItem('aubreysrc_cart', JSON.stringify(this.cart));
        
        // Update cart count display
        this.updateCartCount();
        
        // Show confirmation message
        this.showAddToCartConfirmation(product.name);
    }
    
    updateCartCount() {
        this.cartCount = this.calculateCartCount();
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.cartCount;
        }
    }
    
    calculateCartCount() {
        // Sum up quantities of all items in cart
        return this.cart.reduce((total, item) => total + (item.quantity || 1), 0);
    }
    
    showAddToCartConfirmation(productName) {
        // Create and show a confirmation message
        const confirmation = document.createElement('div');
        confirmation.style.position = 'fixed';
        confirmation.style.bottom = '20px';
        confirmation.style.right = '20px';
        confirmation.style.backgroundColor = 'var(--primary-color)';
        confirmation.style.color = 'white';
        confirmation.style.padding = '1rem';
        confirmation.style.borderRadius = '5px';
        confirmation.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        confirmation.style.zIndex = '1050';
        confirmation.textContent = `${productName} added to cart!`;
        
        document.body.appendChild(confirmation);
        
        // Remove after 3 seconds
        setTimeout(() => {
            confirmation.style.opacity = '0';
            confirmation.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(confirmation);
            }, 500);
        }, 3000);
    }
}

// Make the Header class available globally
window.Header = Header;

// Initialize header when the DOM is ready if this script is loaded directly
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.headerInitialized === 'undefined') {
        const header = new Header();
        header.render();
        window.header = header;
        window.headerInitialized = true;
    }
});