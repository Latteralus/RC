/**
 * Footer.js
 * Footer component for Aubrey's RC Cars website
 */

import router from '../core/router.js';

class Footer {
  /**
   * Create a new Footer instance
   */
  constructor() {
    // Bind methods to this
    this.render = this.render.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    
    // Current year for copyright notice
    this.currentYear = new Date().getFullYear();
  }

  /**
   * Render the footer
   * @returns {void}
   */
  render() {
    // Create the footer if it doesn't exist
    if (!document.querySelector('footer')) {
      // Insert the footer HTML
      const app = document.getElementById('app');
      app.insertAdjacentHTML('beforeend', this.getTemplate());
      
      // Set up event listeners
      this._setupEventListeners();
    }
  }

  /**
   * Get the footer HTML template
   * @returns {string} - HTML template
   */
  getTemplate() {
    return `
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h3>Contact Us</h3>
            <div class="footer-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>info@aubreysrc.com</span>
            </div>
            <div class="footer-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>(319) 595-8656</span>
            </div>
            <div class="footer-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Wellsburg, Iowa</span>
            </div>
          </div>
          
          <div class="footer-section">
            <h3>Quick Links</h3>
            <nav class="footer-nav">
              <a href="/products" data-navlink>Shop</a>
              <a href="/custom" data-navlink>Custom Builds</a>
              <a href="/videos" data-navlink>Media Gallery</a>
              <a href="/racing" data-navlink>Racing Events</a>
              <a href="/contact" data-navlink>Contact Us</a>
            </nav>
          </div>
          
          <div class="footer-section">
            <h3>About Us</h3>
            <p>Aubrey "Lee" Barnett has been racing RC cars and trucks since the late 1980s and continues today. We provide high-quality RC cars, parts, and custom builds for enthusiasts of all levels.</p>
            <div class="social-links">
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                Facebook
              </a>
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${this.currentYear} Aubrey's RC Cars. All rights reserved. | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
        </div>
      </footer>
    `;
  }

  /**
   * Set up event listeners
   * @private
   */
  _setupEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('footer [data-navlink]');
    navLinks.forEach(link => {
      link.addEventListener('click', this.handleLinkClick);
    });
  }

  /**
   * Handle navigation link clicks
   * @param {Event} event - Click event
   */
  handleLinkClick(event) {
    event.preventDefault();
    
    // Get the href attribute
    const href = event.currentTarget.getAttribute('href');
    
    // Use the router to navigate
    router.navigate(href);
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Remove event listeners
   * @private
   */
  _removeEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('footer [data-navlink]');
    navLinks.forEach(link => {
      link.removeEventListener('click', this.handleLinkClick);
    });
  }

  /**
   * Cleanup when component is destroyed
   */
  destroy() {
    this._removeEventListeners();
  }
}

export default Footer;