// Enhanced TopBar Component with improved UI/UX
class TopBar {
    constructor() {
        this.cartCount = 0;
        this.cartItems = [];
        
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
                    <div class="cart-icon" role="button" tabindex="0" aria-label="Shopping Cart">
                        <span class="cart-count" aria-live="polite" aria-atomic="true">0</span>
                        <img src="/assets/images/cart.svg" alt="Shopping Cart">
                        <div class="cart-preview">
                            <div class="cart-preview-header">
                                <h3>Your Cart</h3>
                                <button class="close-preview" aria-label="Close cart preview">&times;</button>
                            </div>
                            <div class="cart-preview-items">
                                <!-- Cart items will be inserted here -->
                            </div>
                            <div class="cart-preview-footer">
                                <div class="cart-total">Total: $<span class="cart-total-amount">0.00</span></div>
                                <a href="/checkout.html" class="checkout-button">Checkout</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        `;
        this.isMobile = window.innerWidth < 768;
        this.handleResize = this.handleResize.bind(this);
        this.toggleCartPreview = this.toggleCartPreview.bind(this);
        this.closeCartPreview = this.closeCartPreview.bind(this);
        this.handleEscapeKey = this.handleEscapeKey.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    // Load cart from localStorage
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

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem('aubreyCart', JSON.stringify(this.cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }

    // Add item to cart
    addToCart(product) {
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

    // Remove item from cart
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

    // Update quantity of an item
    updateQuantity(productId, quantity) {
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

    // Update all cart-related displays
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

    // Show notification when item is added to cart
    showAddedToCartNotification(productName) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.add-to-cart-confirmation');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.classList.add('add-to-cart-confirmation');
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

    // Toggle cart preview visibility
    toggleCartPreview() {
        const cartPreview = document.querySelector('.cart-preview');
        if (cartPreview.classList.contains('active')) {
            this.closeCartPreview();
        } else {
            cartPreview.classList.add('active');
            // Add global event listeners
            document.addEventListener('keydown', this.handleEscapeKey);
            document.addEventListener('click', this.handleClickOutside);
        }
    }

    // Close cart preview
    closeCartPreview() {
        const cartPreview = document.querySelector('.cart-preview');
        cartPreview.classList.remove('active');
        // Remove global event listeners
        document.removeEventListener('keydown', this.handleEscapeKey);
        document.removeEventListener('click', this.handleClickOutside);
    }

    // Handle escape key press
    handleEscapeKey(event) {
        if (event.key === 'Escape') {
            this.closeCartPreview();
        }
    }

    // Handle clicks outside the cart preview
    handleClickOutside(event) {
        const cartPreview = document.querySelector('.cart-preview');
        const cartIcon = document.querySelector('.cart-icon');
        
        if (cartPreview.classList.contains('active') &&
            !cartPreview.contains(event.target) &&
            !cartIcon.contains(event.target)) {
            this.closeCartPreview();
        }
    }

    // Update cart preview contents
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
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
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

    // Highlight the current page in navigation
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

    // Create mobile navigation
    createMobileNav() {
        if (this.isMobile && !document.querySelector('.mobile-nav-toggle')) {
            const nav = document.querySelector('.nav-links');
            const mobileNavButton = document.createElement('button');
            mobileNavButton.classList.add('mobile-nav-toggle');
            mobileNavButton.setAttribute('aria-label', 'Toggle navigation menu');
            mobileNavButton.setAttribute('aria-expanded', 'false');
            mobileNavButton.innerHTML = '<span class="hamburger"></span>';
            
            document.querySelector('.nav-container').prepend(mobileNavButton);

            mobileNavButton.addEventListener('click', () => {
                const isExpanded = nav.classList.contains('nav-open');
                nav.classList.toggle('nav-open');
                mobileNavButton.classList.toggle('nav-open');
                mobileNavButton.setAttribute('aria-expanded', !isExpanded);
            });
        }
    }

    // Handle window resize
    handleResize() {
        const wasNotMobile = !this.isMobile;
        this.isMobile = window.innerWidth < 768;
        
        if (this.isMobile && wasNotMobile) {
            this.createMobileNav();
        } else if (!this.isMobile) {
            const mobileNavButton = document.querySelector('.mobile-nav-toggle');
            if (mobileNavButton) {
                mobileNavButton.remove();
                document.querySelector('.nav-links').classList.remove('nav-open');
            }
        }
    }

    // Render the TopBar
    render() {
        // Insert template into page
        document.body.insertAdjacentHTML('afterbegin', this.template);
        
        // Add ID to main content for skip link
        const main = document.querySelector('main');
        if (main) {
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
        }
    }

    // Clean up event listeners
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
    }
}