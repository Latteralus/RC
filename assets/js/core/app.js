/**
 * app.js
 * Main application entry point for Aubrey's RC Cars website
 */

import router from './router.js';
import state from './state.js';
import pageRenderer from './PageRenderer.js';
import TopBar from '../components/TopBar.js';
import Footer from '../components/Footer.js';

class App {
  /**
   * Create a new App instance
   */
  constructor() {
    // Store component references
    this.components = {
      topBar: null,
      footer: null
    };
    
    // Initialize the app
    this._initialize();
  }
  
  /**
   * Initialize the application
   * @private
   */
  _initialize() {
    console.log('Initializing application...');
    
    // Create TopBar
    this.components.topBar = new TopBar();
    this.components.topBar.render();
    
    // Create Footer
    this.components.footer = new Footer();
    this.components.footer.render();
    
    // Make the topBar instance available globally for other components
    window.topBar = this.components.topBar;
    
    // Remove the loading indicator after TopBar is rendered
    this._removeLoadingIndicator();
    
    // Initialize router
    this._initializeRouter();
    
    // Register event listeners
    this._setupEventListeners();
    
    console.log('Application initialized');
  }
  
  /**
   * Remove all loading indicators from the page
   * @private
   */
  _removeLoadingIndicator() {
    // Remove the full-page loading indicator
    const pageLoader = document.querySelector('.loading-indicator');
    if (pageLoader) {
      pageLoader.classList.remove('active');
      setTimeout(() => {
        pageLoader.style.display = 'none';
      }, 300);
    }
    
    // Remove content loading indicator
    const contentLoader = document.querySelector('.page-loading');
    if (contentLoader) {
      contentLoader.style.display = 'none';
    }
  }
  
  /**
   * Initialize the router and register routes
   * @private
   */
  _initializeRouter() {
    // Register routes
    router
      .register('/', this._renderHomePage.bind(this))
      .register('/products', this._renderProductsPage.bind(this))
      .register('/custom', this._renderCustomPage.bind(this))
      .register('/videos', this._renderVideosPage.bind(this))
      .register('/racing', this._renderRacingPage.bind(this))
      .register('/contact', this._renderContactPage.bind(this))
      .register('/cart', this._renderCartPage.bind(this))
      .register('/checkout', this._renderCheckoutPage.bind(this))
      .setNotFoundHandler(this._renderNotFoundPage.bind(this))
      .init();
  }
  
  /**
   * Set up global event listeners
   * @private
   */
  _setupEventListeners() {
    // Listen for route changes to update active navigation
    document.addEventListener('routeChanged', this._handleRouteChange.bind(this));
    
    // Listen for cart changes to update cart preview
    state.subscribe(this._handleCartChange.bind(this), 'cart');
  }
  
  /**
   * Handle route changes
   * @param {CustomEvent} event - Route change event
   * @private
   */
  _handleRouteChange(event) {
    const path = event.detail.path;
    
    // Update current route in state
    state.set('app.currentRoute', path);
    
    // Update active navigation link
    this._updateActiveNavLink(path);
  }
  
  /**
   * Update the active navigation link
   * @param {string} path - Current path
   * @private
   */
  _updateActiveNavLink(path) {
    // Remove active class from all links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to matching link
    const activeLink = document.querySelector(`.nav-links a[href="${path}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  
  /**
   * Handle cart changes
   * @param {Object} cart - Updated cart state
   * @private
   */
  _handleCartChange(cart) {
    if (this.components.topBar) {
      this.components.topBar._renderCartItems();
    }
  }
  
  /**
   * Render the home page
   * @returns {string} - Page HTML
   * @private
   */
  _renderHomePage() {
    return `
      <section class="hero">
        <div class="video-background">
          <iframe
            src="https://www.youtube.com/embed/fn02DjC0gok?autoplay=1&mute=1&start=25&loop=1&playlist=fn02DjC0gok&controls=0&showinfo=0&rel=0&modestbranding=1"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="RC Car video background">
          </iframe>
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1>Custom RC Cars & Trucks</h1>
          <p>Handcrafted in Iowa, built to ignite your passion for RC adventures.</p>
          <a href="/products" class="cta-button">Build your Custom RC</a>
        </div>
      </section>
      
      <section style="padding: 4rem 2rem; max-width: 1200px; margin: 0 auto;">
        <h2 style="text-align: center; margin-bottom: 2rem; font-size: 2.5rem; color: #1A1A1A; font-family: 'Rajdhani', sans-serif;">Featured RC Cars</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          <div style="background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <img src="/assets/images/products/car1.jpg" alt="Traxxas Rustler" style="width: 100%; height: 250px; object-fit: cover;">
            <div style="padding: 1.5rem;">
              <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; font-family: 'Rajdhani', sans-serif;">Traxxas Rustler</h3>
              <p style="margin-bottom: 1rem;">High-performance electric stadium truck</p>
              <span style="display: block; font-weight: 600; color: #FF4D00; font-size: 1.4rem; margin-bottom: 1rem;">$299.99</span>
              <button style="width: 100%; padding: 0.75rem; background-color: #00B8FF; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;" class="add-to-cart-btn" data-id="traxxas-rustler" data-name="Traxxas Rustler" data-price="299.99" data-image="/assets/images/products/car1.jpg">Add to Cart</button>
            </div>
          </div>
          <div style="background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <img src="/assets/images/products/car2.jpg" alt="Arrma Kraton" style="width: 100%; height: 250px; object-fit: cover;">
            <div style="padding: 1.5rem;">
              <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; font-family: 'Rajdhani', sans-serif;">Arrma Kraton</h3>
              <p style="margin-bottom: 1rem;">1/8 Scale Monster Truck</p>
              <span style="display: block; font-weight: 600; color: #FF4D00; font-size: 1.4rem; margin-bottom: 1rem;">$549.99</span>
              <button style="width: 100%; padding: 0.75rem; background-color: #00B8FF; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;" class="add-to-cart-btn" data-id="arrma-kraton" data-name="Arrma Kraton" data-price="549.99" data-image="/assets/images/products/car2.jpg">Add to Cart</button>
            </div>
          </div>
          <div style="background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <img src="/assets/images/products/car3.jpg" alt="Losi Mini-T" style="width: 100%; height: 250px; object-fit: cover;">
            <div style="padding: 1.5rem;">
              <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; font-family: 'Rajdhani', sans-serif;">Losi Mini-T</h3>
              <p style="margin-bottom: 1rem;">Compact racing truck</p>
              <span style="display: block; font-weight: 600; color: #FF4D00; font-size: 1.4rem; margin-bottom: 1rem;">$199.99</span>
              <button style="width: 100%; padding: 0.75rem; background-color: #00B8FF; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;" class="add-to-cart-btn" data-id="losi-mini-t" data-name="Losi Mini-T" data-price="199.99" data-image="/assets/images/products/car3.jpg">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }
  
  /**
   * Render placeholder pages
   * @private
   */
  _renderProductsPage() {
    return `
      <div class="container py-5">
        <h1 class="mb-5">Shop RC Cars & Trucks</h1>
        <p>Product listings coming soon...</p>
      </div>
    `;
  }
  
  _renderCustomPage() {
    return `
      <div class="container py-5">
        <h1 class="mb-5">Custom Builds</h1>
        <p>Custom builds content coming soon...</p>
      </div>
    `;
  }
  
  _renderVideosPage() {
    return `
      <div class="container py-5">
        <h1 class="mb-5">Media Gallery</h1>
        <p>Videos and media content coming soon...</p>
      </div>
    `;
  }
  
  _renderRacingPage() {
    return `
      <div class="container py-5">
        <h1 class="mb-5">Racing Events</h1>
        <p>Racing events information coming soon...</p>
      </div>
    `;
  }
  
  _renderContactPage() {
    return `
      <div class="container py-5">
        <h1 class="mb-5">Contact Us</h1>
        <p>Contact form coming soon...</p>
      </div>
    `;
  }
  
  _renderCartPage() {
    return `
      <div class="container py-5">
        <h1 class="mb-5">Your Cart</h1>
        <p>Full cart page coming soon...</p>
      </div>
    `;
  }
  
  _renderCheckoutPage() {
    return `
      <div class="container py-5">
        <h1 class="mb-5">Checkout</h1>
        <p>Checkout process coming soon...</p>
      </div>
    `;
  }
  
  _renderNotFoundPage() {
    return `
      <div class="container text-center py-5">
        <h1 class="mb-4">Page Not Found</h1>
        <p class="lead mb-4">The page you are looking for doesn't exist or has been moved.</p>
        <a href="/" class="btn btn-primary">Return to Home</a>
      </div>
    `;
  }
}

// Create and initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});

export default App;