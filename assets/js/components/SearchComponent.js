/**
 * SearchComponent.js
 * Search component for Aubrey's RC Cars website
 */

import router from './core/router.js';

class SearchComponent {
  /**
   * Create a new SearchComponent instance
   * @param {Object} options - Configuration options
   * @param {HTMLElement} options.container - Container element for the search component
   * @param {Function} options.onSearch - Callback for when search is performed
   * @param {Function} options.onClose - Callback for when search is closed
   */
  constructor(options = {}) {
    this.container = options.container || document.createElement('div');
    this.onSearch = options.onSearch || (() => {});
    this.onClose = options.onClose || (() => {});
    this.isOpen = false;
    
    // Bind methods
    this.render = this.render.bind(this);
    this.toggle = this.toggle.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    
    // Add document event listeners
    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  /**
   * Render the search component
   * @returns {HTMLElement} - The rendered search component element
   */
  render() {
    // Create search component if it doesn't exist
    if (!this.container.querySelector('.search-container')) {
      this.container.innerHTML = this.getTemplate();
      this._setupEventListeners();
    }
    
    return this.container;
  }

  /**
   * Get the search component template
   * @returns {string} - HTML template
   */
  getTemplate() {
    return `
      <div class="search-container">
        <button type="button" class="search-toggle" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <div class="search-form-container">
          <form class="search-form" id="search-form">
            <input 
              type="search" 
              name="q" 
              placeholder="Search for products..." 
              aria-label="Search for products"
              autocomplete="off"
            >
            <button type="submit" aria-label="Submit search">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  /**
   * Set up event listeners
   * @private
   */
  _setupEventListeners() {
    // Toggle button
    const toggleBtn = this.container.querySelector('.search-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', this.handleToggleClick);
    }
    
    // Search form
    const searchForm = this.container.querySelector('.search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', this.handleSubmit);
    }
    
    // Search input
    const searchInput = this.container.querySelector('input[name="q"]');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.close();
        }
      });
    }
  }

  /**
   * Toggle the search form visibility
   * @param {boolean} [force] - Force specific state
   */
  toggle(force) {
    if (force !== undefined) {
      this.isOpen = force;
    } else {
      this.isOpen = !this.isOpen;
    }
    
    const searchFormContainer = this.container.querySelector('.search-form-container');
    if (searchFormContainer) {
      if (this.isOpen) {
        searchFormContainer.style.opacity = '1';
        searchFormContainer.style.visibility = 'visible';
        searchFormContainer.style.transform = 'translateY(0)';
        // Focus the input
        setTimeout(() => {
          this.container.querySelector('input[name="q"]')?.focus();
        }, 100);
      } else {
        searchFormContainer.style.opacity = '0';
        searchFormContainer.style.visibility = 'hidden';
        searchFormContainer.style.transform = 'translateY(10px)';
      }
    }
    
    if (!this.isOpen) {
      this.onClose();
    }
  }

  /**
   * Open the search form
   */
  open() {
    this.toggle(true);
  }

  /**
   * Close the search form
   */
  close() {
    this.toggle(false);
  }

  /**
   * Handle form submit
   * @param {Event} event - Submit event
   */
  handleSubmit(event) {
    event.preventDefault();
    
    const searchInput = this.container.querySelector('input[name="q"]');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;
    
    // Navigate to search results page
    router.navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    
    // Call onSearch callback
    this.onSearch(searchTerm);
    
    // Close the search form
    this.close();
    
    // Blur the input to hide mobile keyboard
    searchInput.blur();
  }

  /**
   * Handle toggle button click
   * @param {Event} event - Click event
   */
  handleToggleClick(event) {
    event.stopPropagation();
    this.toggle();
  }

  /**
   * Handle document clicks (close on click outside)
   * @param {Event} event - Click event
   */
  handleDocumentClick(event) {
    if (!this.isOpen) return;
    
    const searchContainer = this.container.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(event.target)) {
      this.close();
    }
  }

  /**
   * Handle escape key press
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleEscapeKey(event) {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  /**
   * Dispose the component and clean up
   */
  dispose() {
    // Remove document event listeners
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleEscapeKey);
    
    // Remove component event listeners
    const toggleBtn = this.container.querySelector('.search-toggle');
    if (toggleBtn) {
      toggleBtn.removeEventListener('click', this.handleToggleClick);
    }
    
    const searchForm = this.container.querySelector('.search-form');
    if (searchForm) {
      searchForm.removeEventListener('submit', this.handleSubmit);
    }
  }
}

export default SearchComponent;