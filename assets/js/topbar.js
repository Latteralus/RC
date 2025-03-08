/**
 * Enhanced TopBar Component for Aubrey's RC Cars
 * Provides navigation, cart functionality, and responsive behavior
 */
class TopBar {
    constructor() {
        this.cartCount = 0;
        this.cartItems = [];
        this.isCartOpen = false;
        
        // Use absolute paths for consistent navigation from any page depth
        this.template = `
            <header class="main-header">
                <div class="skip-link">
                    <a href="#main-content" class="visually-hidden focusable">Skip to main content</a>
                </div>
                <nav class="nav-container" aria-label="Main Navigation">
                    <div class="logo">
                        <h1><a href="/index.html" aria-label="Aubrey's RC Cars Home">Aubrey's RC Cars</a></h1>
                    </div>
                    <ul class="nav-links" role="menubar">
                        <li role="none"><a href="/products/index.html" role="menuitem">Shop</a></li>
                        <li role="none"><a href="/custom/index.html" role="menuitem">Custom Builds</a></li>
                        <li role="none"><a href="/videos.html" role="menuitem">Media</a></li>
                        <li role="none"><a href="/racing/index.html" role="menuitem">Racing</a></li>
                        <li role="none"><a href="/contact.html" role="menuitem">Contact</a></li>
                    </ul>
                    <div class="user-actions">
                        <button class="search-toggle" aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                        <div class="cart-icon" role="button" tabindex="0" aria-label="Shopping Cart" aria-expanded="false" aria-controls="cart-preview">
                            <span class="cart-count" aria-live="polite" aria-atomic="true">0</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <div id="cart-preview" class="cart-preview" aria-hidden="true">
                                <div class="cart-preview-header">
                                    <h3>Your Cart</h3>
                                    <button class="close-preview" aria-label="Close cart preview">&times;</button>
                                </div>
                                <div class="cart-preview-items">
                                    <!-- Cart items will be inserted here -->
                                </div>
                                <div class="cart-preview-footer">
                                    <div class="cart-total">Total: $<span class="cart-total-amount">0.00</span></div>
                                    <div class="cart-actions">
                                        <a href="/checkout.html" class="checkout-button">Checkout</a>
                                        <button class="view-cart-button">View Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div class="search-container" aria-hidden="true">
                    <form class="search-form" role="search">
                        <input type="search" placeholder="Search products..." aria-label="Search products">
                        <button type="submit" aria-label="Submit search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                        <button type="button" class="close-search" aria-label="Close search">&times;</button>
                    </form>
                </div>
            </header>
        `;
        this.isMobile = window.innerWidth < 768;
        
        // Bind methods to this instance
        this.handleResize = this.handleResize.bind(this);
        this.toggleCartPreview = this.toggleCartPreview.bind(this);
        this.closeCartPreview = this.closeCartPreview.bind(this);
        this.handleEscapeKey = this.handleEscapeKey.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
    }

    /**
     * Load cart from localStorage
     */
    loadCart() {
        try {
            const savedCart = localStorage.getItem('aubreyCart');
            if (savedCart) {
                this.cartItems = JSON.parse(savedCart);
                this.cartCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
                this.updateCartDisplay();
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            // Reset cart if there's an error
            this.cartItems = [];
            this.cartCount = 0;
        }
    }

    /**
     * Save cart to localStorage
     */
    saveCart() {
        try {
            localStorage.setItem('aubreyCart', JSON.stringify(this.cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }

    /**
     * Add item to cart
     * @param {Object} product - Product to add to cart
     * @returns {number} - New cart count
     */
    addToCart(product) {
        // Validate product object
        if (!product || !product.id || !product.name || !product.price) {
            console.error('Invalid product object:', product);
            return this.cartCount;
        }

        const existingItem = this.cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cartItems.push({
                ...product,
                quantity: 1
            });
        }
        
        this.cartCount += 1;
        this.updateCartDisplay();
        this.saveCart();
        
        // Show add to cart confirmation
        this.showAddedToCartNotification(product.name);
        
        return this.cartCount;
    }

    /**
     * Remove item from cart
     * @param {string} productId - Product ID to remove
     * @returns {number} - New cart count
     */
    removeFromCart(productId) {
        const itemIndex = this.cartItems.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            const item = this.cartItems[itemIndex];
            this.cartCount -= item.quantity;
            this.cartItems.splice(itemIndex, 1);
            this.updateCartDisplay();
            this.saveCart();
        }
        
        return this.cartCount;
    }

    /**
     * Update quantity of an item
     * @param {string} productId - Product ID to update
     * @param {number} quantity - New quantity
     * @returns {number} - New cart count
     */
    updateQuantity(productId, quantity) {
        // Validate input
        if (quantity < 0) {
            console.error('Invalid quantity:', quantity);
            return this.cartCount;
        }

        // If quantity is 0, remove item
        if (quantity === 0) {
            return this.removeFromCart(productId);
        }

        const item = this.cartItems.find(item => item.id === productId);
        
        if (item) {
            const oldQuantity = item.quantity;
            item.quantity = quantity;
            this.cartCount = this.cartCount - oldQuantity + quantity;
            this.updateCartDisplay();
            this.saveCart();
        }
        
        return this.cartCount;
    }

    /**
     * Update all cart-related displays
     */
    updateCartDisplay() {
        // Update counter
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.cartCount;
            cartCountElement.classList.add('cart-update');
            setTimeout(() => {
                cartCountElement.classList.remove('cart-update');
            }, 300);
        }
        
        // Update cart preview
        this.updateCartPreview();
    }

    /**
     * Show notification when item is added to cart
     * @param {string} productName - Name of product added to cart
     */
    showAddedToCartNotification(productName) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.add-to-cart-confirmation');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'add-to-cart-confirmation';
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">✓</div>
                <div class="notification-message">
                    <p><strong>${productName}</strong> added to cart!</p>
                </div>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
            <div class="notification-actions">
                <button class="continue-shopping">Continue Shopping</button>
                <button class="view-cart">View Cart</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Setup event listeners
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        notification.querySelector('.continue-shopping').addEventListener('click', () => {
            notification.remove();
        });
        
        notification.querySelector('.view-cart').addEventListener('click', () => {
            notification.remove();
            this.toggleCartPreview();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    /**
     * Toggle cart preview visibility
     */
    toggleCartPreview() {
        const cartPreview = document.querySelector('.cart-preview');
        const cartIcon = document.querySelector('.cart-icon');
        
        if (!cartPreview || !cartIcon) return;
        
        this.isCartOpen = !this.isCartOpen;
        
        if (this.isCartOpen) {
            // First, close search if open
            this.closeSearch();
            
            // Open cart preview
            cartPreview.classList.add('active');
            cartIcon.setAttribute('aria-expanded', 'true');
            cartPreview.setAttribute('aria-hidden', 'false');
            
            // Add global event listeners
            document.addEventListener('keydown', this.handleEscapeKey);
            document.addEventListener('click', this.handleClickOutside);
            
            // Focus on close button for accessibility
            const closeButton = cartPreview.querySelector('.close-preview');
            if (closeButton) {
                setTimeout(() => closeButton.focus(), 100);
            }
        } else {
            this.closeCartPreview();
        }
    }

    /**
     * Close cart preview
     */
    closeCartPreview() {
        const cartPreview = document.querySelector('.cart-preview');
        const cartIcon = document.querySelector('.cart-icon');
        
        if (!cartPreview || !cartIcon) return;
        
        cartPreview.classList.remove('active');
        cartIcon.setAttribute('aria-expanded', 'false');
        cartPreview.setAttribute('aria-hidden', 'true');
        
        // Remove global event listeners
        document.removeEventListener('keydown', this.handleEscapeKey);
        document.removeEventListener('click', this.handleClickOutside);
        
        // Return focus to cart icon
        cartIcon.focus();
        
        this.isCartOpen = false;
    }

    /**
     * Toggle search bar visibility
     */
    toggleSearch() {
        const searchContainer = document.querySelector('.search-container');
        const searchToggle = document.querySelector('.search-toggle');
        
        if (!searchContainer || !searchToggle) return;
        
        // Close cart preview if open
        if (this.isCartOpen) {
            this.closeCartPreview();
        }
        
        // Toggle search visibility
        const isSearchVisible = searchContainer.classList.toggle('active');
        searchContainer.setAttribute('aria-hidden', !isSearchVisible);
        
        if (isSearchVisible) {
            // Focus search input
            const searchInput = searchContainer.querySelector('input[type="search"]');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
            
            // Add escape key listener
            document.addEventListener('keydown', this.handleEscapeKey);
        } else {
            // Remove escape key listener if cart is also closed
            if (!this.isCartOpen) {
                document.removeEventListener('keydown', this.handleEscapeKey);
            }
            
            // Return focus to search toggle
            searchToggle.focus();
        }
    }

    /**
     * Close search bar
     */
    closeSearch() {
        const searchContainer = document.querySelector('.search-container');
        if (!searchContainer) return;
        
        searchContainer.classList.remove('active');
        searchContainer.setAttribute('aria-hidden', 'true');
        
        // Remove escape key listener if cart is also closed
        if (!this.isCartOpen) {
            document.removeEventListener('keydown', this.handleEscapeKey);
        }
    }

    /**
     * Handle escape key press
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleEscapeKey(event) {
        if (event.key === 'Escape') {
            // Close cart preview if open
            if (this.isCartOpen) {
                this.closeCartPreview();
            }
            
            // Close search if open
            this.closeSearch();
        }
    }

    /**
     * Handle clicks outside the cart preview
     * @param {MouseEvent} event - Mouse event
     */
    handleClickOutside(event) {
        const cartPreview = document.querySelector('.cart-preview');
        const cartIcon = document.querySelector('.cart-icon');
        
        if (cartPreview && cartIcon && this.isCartOpen && 
            !cartPreview.contains(event.target) && 
            !cartIcon.contains(event.target)) {
            this.closeCartPreview();
        }
    }

    /**
     * Update cart preview contents
     */
    updateCartPreview() {
        const cartItemsContainer = document.querySelector('.cart-preview-items');
        const cartTotalElement = document.querySelector('.cart-total-amount');
        
        if (!cartItemsContainer || !cartTotalElement) return;
        
        // Clear existing items
        cartItemsContainer.innerHTML = '';
        
        if (this.cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            cartTotalElement.textContent = '0.00';
            return;
        }
        
        // Add each item to the preview
        let total = 0;
        
        this.cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image || '/assets/images/placeholder.jpg'}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-decrease" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}" aria-label="Remove ${item.name} from cart">&times;</button>
            `;
            
            cartItemsContainer.appendChild(itemElement);
        });
        
        // Update total
        cartTotalElement.textContent = total.toFixed(2);
        
        // Add event listeners
        cartItemsContainer.querySelectorAll('.quantity-decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const item = this.cartItems.find(item => item.id === productId);
                if (item && item.quantity > 1) {
                    this.updateQuantity(productId, item.quantity - 1);
                }
            });
        });
        
        cartItemsContainer.querySelectorAll('.quantity-increase').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const item = this.cartItems.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity + 1);
                }
            });
        });
        
        cartItemsContainer.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                this.removeFromCart(productId);
            });
        });
    }

    /**
     * Highlight the current page in navigation
     */
    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.nav-links a');
        
        links.forEach(link => {
            // Compare pathnames, accounting for index.html
            const linkPath = link.pathname;
            if (linkPath === currentPath || 
                (currentPath.endsWith('/') && linkPath === currentPath + 'index.html') ||
                (linkPath.endsWith('/index.html') && linkPath.replace('/index.html', '/') === currentPath)) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    /**
     * Create mobile navigation
     */
    createMobileNav() {
        if (this.isMobile && !document.querySelector('.mobile-nav-toggle')) {
            const nav = document.querySelector('.nav-links');
            const mobileNavButton = document.createElement('button');
            mobileNavButton.classList.add('mobile-nav-toggle');
            mobileNavButton.setAttribute('aria-label', 'Toggle navigation menu');
            mobileNavButton.setAttribute('aria-expanded', 'false');
            mobileNavButton.setAttribute('aria-controls', 'mobile-nav');
            mobileNavButton.innerHTML = '<span class="hamburger"></span>';
            
            // Add ID to nav for aria-controls
            if (nav) {
                nav.id = 'mobile-nav';
            }
            
            document.querySelector('.nav-container').prepend(mobileNavButton);

            mobileNavButton.addEventListener('click', () => {
                const isExpanded = nav.classList.contains('nav-open');
                nav.classList.toggle('nav-open');
                mobileNavButton.classList.toggle('nav-open');
                mobileNavButton.setAttribute('aria-expanded', !isExpanded);
                
                // Close cart and search if open when toggling menu
                if (!isExpanded) {
                    if (this.isCartOpen) {
                        this.closeCartPreview();
                    }
                    this.closeSearch();
                }
            });
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        const wasNotMobile = !this.isMobile;
        this.isMobile = window.innerWidth < 768;
        
        if (this.isMobile && wasNotMobile) {
            this.createMobileNav();
        } else if (!this.isMobile) {
            const mobileNavButton = document.querySelector('.mobile-nav-toggle');
            const nav = document.querySelector('.nav-links');
            
            if (mobileNavButton) {
                mobileNavButton.remove();
            }
            
            if (nav) {
                nav.classList.remove('nav-open');
            }
        }
    }

    /**
     * Render the TopBar
     */
    render() {
        // Insert template into page
        document.body.insertAdjacentHTML('afterbegin', this.template);
        
        // Add ID to main content for skip link
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main-content';
        }
        
        // Setup event listeners
        window.addEventListener('resize', this.handleResize);
        this.createMobileNav();
        
        // Initialize current page highlight
        this.highlightCurrentPage();
        
        // Load cart from localStorage
        this.loadCart();
        
        // Setup cart functionality
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', this.toggleCartPreview);
            
            // Setup cart preview close button
            const closeButton = document.querySelector('.close-preview');
            if (closeButton) {
                closeButton.addEventListener('click', this.closeCartPreview);
            }
            
            // Setup view cart button
            const viewCartButton = document.querySelector('.view-cart-button');
            if (viewCartButton) {
                viewCartButton.addEventListener('click', () => {
                    window.location.href = '/cart.html';
                });
            }
        }
        
        // Setup search functionality
        const searchToggle = document.querySelector('.search-toggle');
        if (searchToggle) {
            searchToggle.addEventListener('click', this.toggleSearch);
            
            // Setup search close button
            const closeSearchButton = document.querySelector('.close-search');
            if (closeSearchButton) {
                closeSearchButton.addEventListener('click', this.closeSearch);
            }
            
            // Setup search form
            const searchForm = document.querySelector('.search-form');
            if (searchForm) {
                searchForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const searchInput = searchForm.querySelector('input[type="search"]');
                    if (searchInput && searchInput.value.trim()) {
                        window.location.href = `/search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
                    }
                });
            }
        }
    }

    /**
     * Clean up event listeners
     */
    cleanup() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleEscapeKey);
        document.removeEventListener('click', this.handleClickOutside);
        
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.removeEventListener('click', this.toggleCartPreview);
        }
        
        const closeButton = document.querySelector('.close-preview');
        if (closeButton) {
            closeButton.removeEventListener('click', this.closeCartPreview);
        }
        
        const searchToggle = document.querySelector('.search-toggle');
        if (searchToggle) {
            searchToggle.removeEventListener('click', this.toggleSearch);
        }
        
        const closeSearchButton = document.querySelector('.close-search');
        if (closeSearchButton) {
            closeSearchButton.removeEventListener('click', this.closeSearch);
        }
    }
}