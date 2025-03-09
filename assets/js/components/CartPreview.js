/**
 * CartPreview.js
 * Cart preview component for Aubrey's RC Cars website
 */

import state from '../core/state.js';
import router from '../core/router.js';

class CartPreview {
  /**
   * Create a new CartPreview instance
   * @param {Object} options - Configuration options
   * @param {HTMLElement} options.container - Container element for the cart preview
   * @param {Function} options.onClose - Callback for when the cart is closed
   */
  constructor(options = {}) {
    this.container = options.container || document.createElement('div');
    this.onClose = options.onClose || (() => {});
    
    // Bind methods
    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
    this.handleItemRemove = this.handleItemRemove.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
    this.handleViewCartClick = this.handleViewCartClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    
    // Subscribe to cart state changes
    this.stateSubscription = state.subscribe(this.update, 'cart');
  }

  /**
   * Render the cart preview
   * @returns {HTMLElement} - The rendered cart preview element
   */
  render() {
    // Create cart preview if it doesn't exist
    if (!this.container.querySelector('.cart-preview')) {
      this.container.innerHTML = this.getTemplate();
      this._setupEventListeners();
    }
    
    // Update with current cart data
    this.update(state.get('cart'));
    
    return this.container;
  }

  /**
   * Update the cart preview with new cart data
   * @param {Object} cart - Cart data
   */
  update(cart) {
    const itemsContainer = this.container.querySelector('.cart-preview-items');
    const totalPriceEl = this.container.querySelector('.cart-total-price');
    const emptyMessageEl = this.container.querySelector('.empty-cart-message');
    const cartActionsEl = this.container.querySelector('.cart-actions');
    
    // Update items
    if (cart.items.length === 0) {
      // Show empty cart message
      itemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
      if (emptyMessageEl) emptyMessageEl.style.display = 'block';
      if (cartActionsEl) cartActionsEl.style.display = 'none';
    } else {
      // Render cart items
      itemsContainer.innerHTML = this._renderCartItems(cart.items);
      if (emptyMessageEl) emptyMessageEl.style.display = 'none';
      if (cartActionsEl) cartActionsEl.style.display = 'flex';
      
      // Set up event listeners for the new items
      this._setupItemEventListeners();
    }
    
    // Update total price
    if (totalPriceEl) {
      totalPriceEl.textContent = `$${cart.totalPrice.toFixed(2)}`;
    }
  }

  /**
   * Get the cart preview template
   * @returns {string} - HTML template
   */
  getTemplate() {
    return `
      <div class="cart-preview">
        <div class="cart-preview-header">
          <h3>Your Cart</h3>
          <button type="button" class="cart-close" aria-label="Close cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="cart-preview-items">
          <div class="empty-cart-message">Your cart is empty</div>
        </div>
        <div class="cart-preview-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span class="cart-total-price">$0.00</span>
          </div>
          <div class="cart-actions" style="display: none;">
            <button type="button" class="btn btn-primary cart-view-btn">View Cart</button>
            <button type="button" class="btn btn-secondary cart-checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render the cart items
   * @param {Array} items - Cart items
   * @returns {string} - HTML for cart items
   * @private
   */
  _renderCartItems(items) {
    return items.map(item => `
      <div class="cart-item" data-product-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">
            <button type="button" class="quantity-btn quantity-decrease" data-product-id="${item.id}" aria-label="Decrease quantity">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button type="button" class="quantity-btn quantity-increase" data-product-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove" data-product-id="${item.id}" aria-label="Remove ${item.name} from cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');
  }

  /**
   * Set up event listeners
   * @private
   */
  _setupEventListeners() {
    // Close button
    const closeBtn = this.container.querySelector('.cart-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', this.handleCloseClick);
    }
    
    // Cart actions
    const viewCartBtn = this.container.querySelector('.cart-view-btn');
    if (viewCartBtn) {
      viewCartBtn.addEventListener('click', this.handleViewCartClick);
    }
    
    const checkoutBtn = this.container.querySelector('.cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', this.handleCheckoutClick);
    }
  }

  /**
   * Set up event listeners for cart items
   * @private
   */
  _setupItemEventListeners() {
    // Remove buttons
    const removeButtons = this.container.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(button => {
      button.addEventListener('click', this.handleItemRemove);
    });
    
    // Quantity buttons
    const decreaseButtons = this.container.querySelectorAll('.quantity-decrease');
    decreaseButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleQuantityChange(e, -1));
    });
    
    const increaseButtons = this.container.querySelectorAll('.quantity-increase');
    increaseButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleQuantityChange(e, 1));
    });
  }

  /**
   * Handle remove item button click
   * @param {Event} event - Click event
   */
  handleItemRemove(event) {
    const productId = event.currentTarget.getAttribute('data-product-id');
    this._removeCartItem(productId);
  }

  /**
   * Handle quantity change button click
   * @param {Event} event - Click event
   * @param {number} change - Quantity change amount
   */
  handleQuantityChange(event, change) {
    const productId = event.currentTarget.getAttribute('data-product-id');
    this._updateCartItemQuantity(productId, change);
  }

  /**
   * Handle view cart button click
   */
  handleViewCartClick() {
    router.navigate('/cart');
    this.onClose();
  }

  /**
   * Handle checkout button click
   */
  handleCheckoutClick() {
    router.navigate('/checkout');
    this.onClose();
  }

  /**
   * Handle close button click
   */
  handleCloseClick() {
    this.onClose();
  }

  /**
   * Remove an item from the cart
   * @param {string} productId - Product ID to remove
   * @private
   */
  _removeCartItem(productId) {
    const cart = state.get('cart');
    
    // Remove the item
    cart.items = cart.items.filter(item => item.id !== productId);
    
    // Update cart totals
    this._updateCartTotals(cart);
    
    // Update state
    state.set('cart', cart);
  }

  /**
   * Update a cart item's quantity
   * @param {string} productId - Product ID to update
   * @param {number} change - Quantity change amount
   * @private
   */
  _updateCartItemQuantity(productId, change) {
    const cart = state.get('cart');
    
    // Find the item
    const item = cart.items.find(item => item.id === productId);
    if (!item) return;
    
    // Update quantity
    item.quantity += change;
    
    // Remove if quantity becomes 0 or less
    if (item.quantity <= 0) {
      cart.items = cart.items.filter(item => item.id !== productId);
    }
    
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
   * Dispose the component and clean up
   */
  dispose() {
    // Unsubscribe from state
    if (this.stateSubscription) {
      state.unsubscribe(this.stateSubscription);
    }
    
    // Remove event listeners
    const closeBtn = this.container.querySelector('.cart-close');
    if (closeBtn) {
      closeBtn.removeEventListener('click', this.handleCloseClick);
    }
    
    const viewCartBtn = this.container.querySelector('.cart-view-btn');
    if (viewCartBtn) {
      viewCartBtn.removeEventListener('click', this.handleViewCartClick);
    }
    
    const checkoutBtn = this.container.querySelector('.cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.removeEventListener('click', this.handleCheckoutClick);
    }
  }
}

export default CartPreview;