/**
 * products.js - Products page functionality for Aubrey's RC website
 * Part of the simplified file structure approach for www.aubreysrc.com
 */

class ProductsPage {
    constructor() {
        // DOM elements
        this.productsGrid = document.getElementById('products-grid');
        this.productCountDisplay = document.getElementById('product-count');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.sortSelect = document.getElementById('sort-select');
        
        // State
        this.activeFilter = 'all';
        this.activeSort = 'featured';
        
        // Get products data from the ProductCards class in cards.js
        // This ensures we maintain a single source of truth for product data
        if (window.ProductCards) {
            // If ProductCards is already initialized, use its products
            this.products = window.ProductCards.prototype.products || [];
        } else {
            // If ProductCards isn't loaded yet, we'll check again when DOM is ready
            this.products = [];
        }
        
        // Initialize products page
        this.initialize();
    }
    
    initialize() {
        // Check if we need to wait for ProductCards to load
        if (this.products.length === 0) {
            // Show loading indicator
            this.productsGrid.innerHTML = `
                <div class="loading-products">
                    <div class="loader"></div>
                    <p>Loading products...</p>
                </div>
            `;
            
            // Try to get products data again when DOM is fully loaded
            window.addEventListener('load', () => {
                if (window.ProductCards) {
                    this.products = window.ProductCards.prototype.products || [];
                }
                
                // If still no products, log a warning
                if (this.products.length === 0) {
                    this.loadFallbackProducts();
                }
                
                // Now render products (even if empty)
                this.renderProducts();
            });
        } else {
            // Products already loaded, render them
            this.renderProducts();
        }
        
        // Add event listeners
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active filter
                this.activeFilter = button.dataset.category;
                
                // Update button states
                this.filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                // Re-render products
                this.renderProducts();
            });
        });
        
        // Sort select
        this.sortSelect.addEventListener('change', () => {
            this.activeSort = this.sortSelect.value;
            this.renderProducts();
        });
    }
    
    renderProducts() {
        // Clear loading indicator
        this.productsGrid.innerHTML = '';
        
        // Filter products
        let filteredProducts = this.activeFilter === 'all' 
            ? [...this.products]
            : this.products.filter(product => product.category === this.activeFilter);
        
        // Sort products
        filteredProducts = this.sortProducts(filteredProducts);
        
        // Update count display
        this.updateProductCount(filteredProducts.length);
        
        // Check if any products match the filter
        if (filteredProducts.length === 0) {
            this.renderNoProductsMessage();
            return;
        }
        
        // Render each product
        filteredProducts.forEach(product => {
            const productCard = this.createProductCard(product);
            this.productsGrid.appendChild(productCard);
        });
    }
    
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;
        card.dataset.category = product.category;
        
        // Create HTML structure
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
        
        // Add event listener for the Add to Cart button
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            this.addToCart(product);
        });
        
        return card;
    }
    
    renderNoProductsMessage() {
        const noProductsMessage = document.createElement('div');
        noProductsMessage.className = 'no-products';
        
        // Different message depending on whether we have products at all or just no matches for the filter
        if (this.products.length === 0) {
            noProductsMessage.innerHTML = `
                <h3>No products available</h3>
                <p>Our product catalog is currently being updated. Please check back soon.</p>
            `;
        } else {
            noProductsMessage.innerHTML = `
                <h3>No products found</h3>
                <p>Try changing your filter criteria or check back later for new products.</p>
                <button class="filter-btn" data-category="all">View All Products</button>
            `;
            
            // Add event listener to the "View All Products" button
            const viewAllBtn = noProductsMessage.querySelector('.filter-btn');
            viewAllBtn.addEventListener('click', () => {
                // Update active filter
                this.activeFilter = 'all';
                
                // Update button states
                this.filterButtons.forEach(btn => {
                    if (btn.dataset.category === 'all') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                
                // Re-render products
                this.renderProducts();
            });
        }
        
        this.productsGrid.appendChild(noProductsMessage);
    }
    
    sortProducts(products) {
        switch (this.activeSort) {
            case 'price-low':
                return products.sort((a, b) => a.price - b.price);
            case 'price-high':
                return products.sort((a, b) => b.price - a.price);
            case 'name-az':
                return products.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-za':
                return products.sort((a, b) => b.name.localeCompare(a.name));
            case 'featured':
            default:
                // Featured products first, then alphabetically
                return products.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return a.name.localeCompare(b.name);
                });
        }
    }
    
    updateProductCount(count) {
        if (count === 1) {
            this.productCountDisplay.textContent = `Showing 1 product`;
        } else {
            this.productCountDisplay.textContent = `Showing ${count} products`;
        }
        
        if (this.activeFilter !== 'all') {
            // Capitalize first letter of category
            const categoryName = this.activeFilter.charAt(0).toUpperCase() + this.activeFilter.slice(1);
            this.productCountDisplay.textContent += ` in ${categoryName}`;
        }
    }
    
    addToCart(product) {
        // Use existing cart system
        if (window.cart && typeof window.cart.addItem === 'function') {
            window.cart.addItem(product);
        } else if (window.header && typeof window.header.addToCart === 'function') {
            window.header.addToCart(product);
        } else {
            // Fallback if neither cart method is available
            console.log(`Added to cart: ${product.name} - ${product.price}`);
            
            // Update cart count display as a visual cue
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const currentCount = parseInt(cartCount.textContent || '0');
                cartCount.textContent = currentCount + 1;
            }
            
            // Show a simple confirmation message
            alert(`${product.name} added to cart!`);
        }
    }
    
    // Method to handle case when no products are found
    loadFallbackProducts() {
        this.products = [];
        console.warn('ProductsPage: No products data available. Make sure cards.js is properly loaded.');
    }
}

// Load script dependency if not already loaded
if (typeof ProductCards === 'undefined' && !window.productCardsLoading) {
    window.productCardsLoading = true;
    
    const cardsScript = document.createElement('script');
    cardsScript.src = '/assets/js/cards.js';
    cardsScript.onload = () => {
        // Once cards.js is loaded, initialize products page
        window.productsPage = new ProductsPage();
    };
    document.head.appendChild(cardsScript);
} else {
    // Initialize products page when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        window.productsPage = new ProductsPage();
    });
}