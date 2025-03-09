/**
 * TopBar.js
 * Navigation, search, and cart management for Aubrey's RC Cars website
 */

import state from '../core/state.js';
import router from '../core/router.js';
import CartPreview from './CartPreview.js';
import SearchComponent from './SearchComponent.js';

class TopBar {
  /**
   * Create a new TopBar instance
   */
  constructor() {
    // Element references 
    this.elements = {
      topBar: null,
      mobileToggle: null,
      navLinks: null,
      navActionsContainer: null,
      cartCount: null,
      searchToggle: null,
      cartToggle: null,
      cartPreview: null,
      searchForm: null
    };

    // Component instances
    this.components = {
      searchComponent: null,
      cartPreview: null
    };

    // State
    this.state = {
      mobileMenuOpen: false,
      searchOpen: false,
      cartPreviewOpen: false
    };

    // Bind methods to this
    this.render = this.render.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleCartPreview = this.toggleCartPreview.bind(this);
    this.closeAllMenus = this.closeAllMenus.bind(this);
    this.closeOtherMenus = this.closeOtherMenus.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.updateCartCount = this.updateCartCount.bind(this);
    this._renderCartItems = this._renderCartItems.bind(this);
    
    // Subscribe to state changes
    this.stateSubscriptions = [
      state.subscribe(this.updateCartCount, 'cart.totalItems')
    ];

    console.log('TopBar initialized');
  }

  /**
   * Render the TopBar
   * @returns {void}
   */
  render() {
    // Create the TopBar if it doesn't exist
    if (!document.querySelector('.main-header')) {
      // Insert the TopBar HTML
      const app = document.getElementById('app');
      app.insertAdjacentHTML('afterbegin', this.getTemplate());
      
      // Add padding to body to account for fixed header
      document.body.style.paddingTop = '70px';
      
      // Cache element references
      this._cacheElements();
      
      // Initialize components
      this._initializeComponents();
      
      // Set up event listeners
      this._setupEventListeners();
      
      // Initialize cart count
      this.updateCartCount(state.get('cart.totalItems'));
      
      // Set active navigation link based on current path
      this.updateActiveNavLink(window.location.pathname);
    } else {
      console.warn('TopBar already exists in the DOM');
    }
  }

  /**
   * Get the TopBar HTML template
   * @returns {string} - HTML template
   * @private
   */
  getTemplate() {
    return `
      <header class="main-header">
        <nav class="nav-container">
          <div class="mobile-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="logo">
            <h1><a href="/" data-navlink>Aubrey's RC Cars</a></h1>
          </div>
          <div class="nav-wrapper">
            <ul class="nav-links">
              <li><a href="/products" data-navlink>Shop</a></li>
              <li><a href="/custom" data-navlink>Custom Builds</a></li>
              <li><a href="/videos" data-navlink>Media</a></li>
              <li><a href="/racing" data-navlink>Racing</a></li>
              <li><a href="/contact" data-navlink>Contact</a></li>
            </ul>
          </div>
          <div class="nav-actions">
            <!-- Search component will be rendered here -->
            <div id="search-container"></div>
            
            <!-- Cart component will be rendered here -->
            <div id="cart-container" class="cart-container">
              <button type="button" class="cart-toggle" aria-label="Shopping cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span class="cart-count">0</span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    `;
  }

  /**
   * Cache element references
   * @private
   */
  _cacheElements() {
    this.elements.topBar = document.querySelector('.main-header');
    this.elements.mobileToggle = document.querySelector('.mobile-toggle');
    this.elements.navLinks = document.querySelector('.nav-links');
    this.elements.navActionsContainer = document.querySelector('.nav-actions');
    this.elements.cartCount = document.querySelector('.cart-count');
    this.elements.searchToggle = document.querySelector('.search-toggle');
    this.elements.cartToggle = document.querySelector('.cart-toggle');
    this.elements.cartPreview = document.querySelector('.cart-preview');
  }

  /**
   * Initialize components
   * @private
   */
  _initializeComponents() {
    // Initialize search component
    const searchContainer = document.getElementById('search-container');
    if (searchContainer) {
      this.components.searchComponent = new SearchComponent({
        container: searchContainer,
        onSearch: (searchTerm) => {
          console.log(`Search performed: ${searchTerm}`);
        },
        onClose: () => {
          this.elements.topBar.classList.remove('search-open');
        }
      });
      this.components.searchComponent.render();
    }
    
    // Initialize cart preview component
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      this.components.cartPreview = new CartPreview({
        container: cartContainer,
        onClose: () => {
          this.elements.topBar.classList.remove('cart-open');
        }
      });
      this.components.cartPreview.render();
    }
  }
  
  /**
   * Set up event listeners
   * @private
   */
  _setupEventListeners() {
    // Mobile menu toggle
    this.elements.mobileToggle.addEventListener('click', this.toggleMobileMenu);

    // Cart toggle
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
      cartToggle.addEventListener('click', () => {
        this.toggleCartPreview();
      });
    }

    // Handle document clicks (for closing menus)
    document.addEventListener('click', this.handleDocumentClick);

    // Handle escape key presses
    document.addEventListener('keydown', this.handleEscapeKey);

    // Handle navigation links
    const navLinks = document.querySelectorAll('[data-navlink]');
    navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // Use the router to navigate
        router.navigate(href);
        
        // Close mobile menu when a link is clicked
        if (this.state.mobileMenuOpen) {
          this.toggleMobileMenu(null, false);
        }
      });
    });
    
    // Listen for route changes to update active navigation
    document.addEventListener('routeChanged', this.handleRouteChange);
  }
  
  /**
   * Toggle mobile menu
   * @param {Event} event - Click event
   * @param {boolean} [force] - Force open or closed
   */
  toggleMobileMenu(event, force = null) {
    const isOpen = force !== null ? force : !this.state.mobileMenuOpen;
    
    // Update state
    this.state.mobileMenuOpen = isOpen;
    
    // Toggle classes
    this.elements.topBar.classList.toggle('menu-open', isOpen);
    this.elements.mobileToggle.classList.toggle('active', isOpen);
    
    // Close other menus
    if (isOpen) {
      this.closeOtherMenus('mobile');
    }
    
    // Prevent page scrolling when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  
  /**
   * Toggle search form
   * @param {Event} event - Click event
   * @param {boolean} [force] - Force open or closed
   */
  toggleSearch(event, force = null) {
    const isOpen = force !== null ? force : !this.state.searchOpen;
    
    // Update state
    this.state.searchOpen = isOpen;
    
    // Toggle classes
    this.elements.topBar.classList.toggle('search-open', isOpen);
    
    // Focus the search input when opened
    if (isOpen) {
      setTimeout(() => {
        const searchInput = document.querySelector('.search-form input');
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
      
      // Close other menus
      this.closeOtherMenus('search');
    }
  }
  
  /**
   * Toggle cart preview
   * @param {Event} event - Click event
   * @param {boolean} [force] - Force open or closed
   */
  toggleCartPreview(event, force = null) {
    const isOpen = force !== null ? force : !this.state.cartPreviewOpen;
    
    // Update state
    this.state.cartPreviewOpen = isOpen;
    
    // Toggle classes
    this.elements.topBar.classList.toggle('cart-open', isOpen);
    
    // Close other menus
    if (isOpen) {
      this.closeOtherMenus('cart');
    }
  }
  
  /**
   * Close menus other than the specified one
   * @param {string} exceptMenu - Menu to exclude from closing
   */
  closeOtherMenus(exceptMenu) {
    if (exceptMenu !== 'mobile' && this.state.mobileMenuOpen) {
      this.toggleMobileMenu(null, false);
    }
    
    if (exceptMenu !== 'search' && this.state.searchOpen && this.components.searchComponent) {
      this.toggleSearch(null, false);
    }
    
    if (exceptMenu !== 'cart' && this.state.cartPreviewOpen) {
      this.toggleCartPreview(null, false);
    }
  }
  
  /**
   * Close all menus
   */
  closeAllMenus() {
    this.toggleMobileMenu(null, false);
    if (this.components.searchComponent) {
      this.toggleSearch(null, false);
    }
    this.toggleCartPreview(null, false);
  }
  
  /**
   * Handle clicks on the document to close menus when clicking outside
   * @param {Event} event - Click event
   */
  handleDocumentClick(event) {
    // Mobile menu
    if (this.state.mobileMenuOpen && 
        !this.elements.mobileToggle.contains(event.target) && 
        !this.elements.navLinks.contains(event.target)) {
      this.toggleMobileMenu(null, false);
    }
    
    // Cart preview
    if (this.state.cartPreviewOpen && 
        this.elements.cartToggle &&
        !this.elements.cartToggle.contains(event.target) && 
        this.elements.cartPreview &&
        !this.elements.cartPreview.contains(event.target)) {
      this.toggleCartPreview(null, false);
    }
  }
  
  /**
   * Handle escape key presses to close menus
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this.closeAllMenus();
    }
  }
  
  /**
   * Add an item to the cart
   * @param {Object} product - Product to add to cart
   * @param {string} product.id - Product ID
   * @param {string} product.name - Product name
   * @param {number} product.price - Product price
   * @param {string} product.image - Product image URL
   * @param {number} [quantity=1] - Quantity to add
   */
  addToCart(product, quantity = 1) {
    // Get current cart
    const cart = state.get('cart');
    
    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Update existing item
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        ...product,
        quantity
      });
    }
    
    // Update cart totals
    this._updateCartTotals(cart);
    
    // Update state
    state.set('cart', cart);
    
    // Open cart preview
    this.toggleCartPreview(null, true);
  }
  
  /**
   * Remove an item from the cart
   * @param {string} productId - ID of the product to remove
   */
  removeFromCart(productId) {
    // Get current cart
    const cart = state.get('cart');
    
    // Remove the item
    cart.items = cart.items.filter(item => item.id !== productId);
    
    // Update cart totals
    this._updateCartTotals(cart);
    
    // Update state
    state.set('cart', cart);
  }
  
  /**
   * Update cart totals
   * @param {Object} cart - Cart object
   * @private
   */
  _updateCartTotals(cart) {
    // Calculate total items
    cart.totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    
    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  /**
   * Update the cart count display
   * @param {number} count - Number of items in cart
   */
  updateCartCount(count) {
    if (this.elements.cartCount) {
      this.elements.cartCount.textContent = count;
      this.elements.cartCount.classList.toggle('hidden', count === 0);
    }
  }
  
  /**
   * Render cart items in the cart preview
   * @private
   */
  _renderCartItems() {
    if (!this.components.cartPreview) return;
    
    // Get cart items
    const cart = state.get('cart');
    const cartItemsContainer = document.querySelector('.cart-preview-items');
    
    if (!cartItemsContainer) return;
    
    // If cart is empty, show empty message
    if (cart.items.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
      return;
    }
    
    // Render cart items
    let itemsHTML = '';
    
    cart.items.forEach(item => {
      itemsHTML += `
        <div class="cart-item" data-product-id="${item.id}">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
              <span>Qty: ${item.quantity}</span>
            </div>
          </div>
          <button type="button" class="cart-item-remove" data-product-id="${item.id}" aria-label="Remove ${item.name} from cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `;
    });
    
    // Update cart items
    cartItemsContainer.innerHTML = itemsHTML;
    
    // Update total price
    const totalPriceEl = document.querySelector('.cart-total-price');
    if (totalPriceEl) {
      totalPriceEl.textContent = `$${cart.totalPrice.toFixed(2)}`;
    }
    
    // Add event listeners to remove buttons
    const removeButtons = cartItemsContainer.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        this.removeFromCart(productId);
      });
    });
  }

  /**
   * Handle route change events
   * @param {CustomEvent} event - Route change event
   */
  handleRouteChange(event) {
    // Get the new path from the event
    const path = event.detail.path;
    
    // Update active navigation link
    this.updateActiveNavLink(path);
    
    // Close any open menus
    this.closeAllMenus();
  }
  
  /**
   * Update the active navigation link
   * @param {string} path - Current path
   */
  updateActiveNavLink(path) {
    // Remove active class from all links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to matching link
    // Exact match for home page
    if (path === '/') {
      const homeLink = document.querySelector('.nav-links a[href="/"]');
      if (homeLink) {
        homeLink.classList.add('active');
      }
      return;
    }
    
    // For other pages, find the link that has the path as its href or has a href that starts with the path
    let activeLink = document.querySelector(`.nav-links a[href="${path}"]`);
    
    // If no exact match, look for a partial match (for nested routes)
    if (!activeLink) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href !== '/' && path.startsWith(href)) {
          activeLink = link;
        }
      });
    }
    
    // Add active class to the matched link
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  
  /**
   * Cleanup when component is destroyed
   */
  destroy() {
    // Clean up components
    if (this.components.searchComponent) {
      this.components.searchComponent.dispose();
    }
    
    if (this.components.cartPreview) {
      this.components.cartPreview.dispose();
    }
    
    // Remove document event listeners
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleEscapeKey);
    document.removeEventListener('routeChanged', this.handleRouteChange);
    
    // Unsubscribe from state changes
    this.stateSubscriptions.forEach(subscription => {
      state.unsubscribe(subscription);
    });
  }
}

export default TopBar;