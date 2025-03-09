/**
 * Router.js
 * Core SPA routing implementation for Aubrey's RC Cars website
 * Handles client-side routing with History API, route registration, and navigation
 */

class Router {
    /**
     * Create a new Router instance
     */
    constructor() {
      // Routes storage - maps URL patterns to handler functions
      this.routes = new Map();
      
      // Default route (404 page)
      this.notFoundHandler = () => {
        console.error('No route handler found for this path');
        return `
          <div class="container text-center py-5">
            <h1 class="mb-4">Page Not Found</h1>
            <p class="lead mb-4">The page you are looking for doesn't exist or has been moved.</p>
            <a href="/" class="btn btn-primary">Return to Home</a>
          </div>
        `;
      };
      
      // Current route info
      this.currentPath = window.location.pathname;
      
      // Event listeners for navigation
      this._setupEventListeners();
    }
    
    /**
     * Set up all event listeners for the router
     * @private
     */
    _setupEventListeners() {
      // Handle browser back/forward navigation
      window.addEventListener('popstate', (event) => {
        this._handleRouteChange(window.location.pathname, false);
      });
      
      // Intercept link clicks for SPA navigation
      document.addEventListener('click', (event) => {
        // Find closest anchor tag if the click was on a child element
        const anchor = event.target.closest('a');
        
        // If no anchor was clicked or it has a special modifier, let the browser handle it
        if (!anchor || event.ctrlKey || event.shiftKey || event.metaKey || event.altKey) {
          return;
        }
        
        const href = anchor.getAttribute('href');
        
        // Skip if it's an external link, anchor link, or download
        if (!href || 
            href.startsWith('http') || 
            href.startsWith('#') || 
            href.startsWith('tel:') || 
            href.startsWith('mailto:') || 
            anchor.hasAttribute('download') || 
            anchor.getAttribute('target') === '_blank') {
          return;
        }
        
        // Prevent default browser navigation
        event.preventDefault();
        
        // Navigate to the clicked link
        this.navigate(href);
      });
    }
    
    /**
     * Initialize the router and handle the initial route
     */
    init() {
      console.log('Router initialized');
      
      // Handle the initial route
      this._handleRouteChange(window.location.pathname, false);
      
      // Return this for method chaining
      return this;
    }
    
    /**
     * Register a route
     * @param {string} path - URL path to match
     * @param {Function} handler - Callback function to handle the route
     * @returns {Router} - Returns this for method chaining
     */
    register(path, handler) {
      // Trim trailing slashes for consistency
      const normalizedPath = this._normalizePath(path);
      
      // Store the route handler
      this.routes.set(normalizedPath, handler);
      
      // Return this for method chaining
      return this;
    }
    
    /**
     * Set a custom 404 handler
     * @param {Function} handler - Callback function for 404 pages
     * @returns {Router} - Returns this for method chaining
     */
    setNotFoundHandler(handler) {
      this.notFoundHandler = handler;
      return this;
    }
    
    /**
     * Navigate to a specific URL
     * @param {string} path - URL path to navigate to
     * @param {boolean} updateHistory - Whether to update browser history
     * @returns {boolean} - Whether navigation was successful
     */
    navigate(path, updateHistory = true) {
      // Don't navigate if it's the current path
      if (this.currentPath === this._normalizePath(path)) {
        return false;
      }
      
      return this._handleRouteChange(path, updateHistory);
    }
    
    /**
     * Handle route changes
     * @param {string} path - URL path to navigate to
     * @param {boolean} updateHistory - Whether to update browser history
     * @returns {boolean} - Whether navigation was successful
     * @private
     */
    _handleRouteChange(path, updateHistory) {
      // Normalize the path for consistent matching
      const normalizedPath = this._normalizePath(path);
      
      // Update current path
      this.currentPath = normalizedPath;
      
      // Update browser history if requested
      if (updateHistory) {
        window.history.pushState(null, '', normalizedPath);
      }
      
      // Find the matching route handler
      const handler = this._findRouteHandler(normalizedPath);
      
      // Get the content container
      const contentEl = document.getElementById('content');
      
      // Show loading state
      contentEl.innerHTML = `
        <div class="page-loading">
          <div class="loader"></div>
          <p>Loading content...</p>
        </div>
      `;
      
      // Execute the route handler
      try {
        // Execute the handler and get the result
        // (using Promise.resolve to handle both synchronous and asynchronous handlers)
        Promise.resolve(handler(this._extractRouteParams(normalizedPath)))
          .then(content => {
            // Update the content container
            contentEl.innerHTML = content;
            
            // Scroll to top of page
            window.scrollTo(0, 0);
            
            // Dispatch a custom event for route change
            this._dispatchRouteChangeEvent(normalizedPath);
            
            return true;
          })
          .catch(error => {
            console.error('Error handling route:', error);
            contentEl.innerHTML = this._generateErrorTemplate(error);
            return false;
          });
      } catch (error) {
        console.error('Error handling route:', error);
        contentEl.innerHTML = this._generateErrorTemplate(error);
        return false;
      }
      
      return true;
    }
    
    /**
     * Find the appropriate route handler for a given path
     * @param {string} path - URL path to find handler for
     * @returns {Function} - Route handler function
     * @private
     */
    _findRouteHandler(path) {
      // First try exact match
      if (this.routes.has(path)) {
        return this.routes.get(path);
      }
      
      // Then try pattern matching for dynamic routes
      for (const [routePath, handler] of this.routes.entries()) {
        if (this._isPatternMatch(routePath, path)) {
          return handler;
        }
      }
      
      // Fall back to 404 handler if no match is found
      return this.notFoundHandler;
    }
    
    /**
     * Check if a path matches a route pattern
     * @param {string} pattern - Route pattern to match against
     * @param {string} path - URL path to check
     * @returns {boolean} - Whether the path matches the pattern
     * @private
     */
    _isPatternMatch(pattern, path) {
      // If pattern doesn't contain dynamic segments, it's not a match
      if (!pattern.includes(':')) {
        return false;
      }
      
      // Convert pattern to regex
      const escapedPattern = pattern
        .replace(/\//g, '\\/') // Escape forward slashes
        .replace(/:\w+/g, '([^/]+)'); // Replace :param with capture group
      
      const regex = new RegExp(`^${escapedPattern}$`);
      
      // Test the path against the regex
      return regex.test(path);
    }
    
    /**
     * Extract route parameters from a path
     * @param {string} path - URL path to extract parameters from
     * @returns {Object} - Object containing route parameters
     * @private
     */
    _extractRouteParams(path) {
      // Find matching route pattern
      for (const routePath of this.routes.keys()) {
        if (!routePath.includes(':')) {
          continue;
        }
        
        // Convert pattern to regex with named capture groups
        const paramNames = [];
        const escapedPattern = routePath
          .replace(/\//g, '\\/') // Escape forward slashes
          .replace(/:\w+/g, (match) => {
            const paramName = match.substring(1); // Remove the : prefix
            paramNames.push(paramName);
            return '([^/]+)'; // Replace with capture group
          });
        
        const regex = new RegExp(`^${escapedPattern}$`);
        const match = path.match(regex);
        
        if (match) {
          // Extract parameters
          const params = {};
          paramNames.forEach((name, index) => {
            params[name] = match[index + 1]; // +1 because match[0] is the full match
          });
          
          return params;
        }
      }
      
      // No parameters found
      return {};
    }
    
    /**
     * Normalize a path by removing trailing slashes (except for root path)
     * @param {string} path - URL path to normalize
     * @returns {string} - Normalized path
     * @private
     */
    _normalizePath(path) {
      // Return / for root path
      if (path === '/' || path === '') {
        return '/';
      }
      
      // Remove trailing slash
      return path.endsWith('/') ? path.slice(0, -1) : path;
    }
    
    /**
     * Dispatch a custom event for route changes
     * @param {string} path - Current path after navigation
     * @private
     */
    _dispatchRouteChangeEvent(path) {
      const event = new CustomEvent('routeChanged', {
        detail: {
          path,
          timestamp: Date.now()
        },
        bubbles: true
      });
      
      document.dispatchEvent(event);
    }
    
    /**
     * Generate an error template for route handling errors
     * @param {Error} error - Error that occurred
     * @returns {string} - HTML template for the error page
     * @private
     */
    _generateErrorTemplate(error) {
      return `
        <div class="container text-center py-5">
          <h1 class="mb-4">Something Went Wrong</h1>
          <p class="lead mb-4">We're having trouble loading this page.</p>
          <div class="alert alert-danger mb-4">
            ${error.message || 'Unknown error'}
          </div>
          <a href="/" class="btn btn-primary">Return to Home</a>
        </div>
      `;
    }
  }
  
  // Export the Router as a singleton
  export default new Router();