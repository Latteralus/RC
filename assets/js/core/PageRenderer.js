/**
 * PageRenderer.js
 * Component-based page rendering system for Aubrey's RC Cars website
 * Handles component lifecycle, template rendering, and transitions
 */

import state from './state.js';

class PageRenderer {
  /**
   * Create a new PageRenderer instance
   * @param {string} containerId - ID of the container element where pages will be rendered
   */
  constructor(containerId = 'content') {
    // Store reference to the container element
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container element with ID '${containerId}' not found`);
    }
    
    // Store active component instances for lifecycle management
    this.activeComponents = new Map();
    
    // Create a transition container for smooth page transitions
    this.transitionContainer = document.createElement('div');
    this.transitionContainer.className = 'page-transition-container';
    
    // Default transition options
    this.defaultTransition = {
      duration: 300, // milliseconds
      type: 'fade', // fade, slide, none
      easing: 'ease-in-out'
    };
    
    // Flag to prevent simultaneous transitions
    this.isTransitioning = false;
    
    // Initialize
    this._initialize();
    
    console.log('PageRenderer initialized');
  }
  
  /**
   * Initialize the PageRenderer
   * @private
   */
  _initialize() {
    // Add the transition container to the DOM
    this.container.appendChild(this.transitionContainer);
    
    // Set initial state
    this.transitionContainer.style.opacity = '1';
    this.transitionContainer.style.transition = `opacity ${this.defaultTransition.duration}ms ${this.defaultTransition.easing}`;
    
    // Listen for window resize events to notify active components
    window.addEventListener('resize', this._handleResize.bind(this));
  }
  
  /**
   * Render a page component
   * @param {Object|Function} component - Component class or object to render
   * @param {Object} [props={}] - Props to pass to the component
   * @param {Object} [options={}] - Rendering options
   * @returns {Promise<Object>} - Promise resolving to the component instance
   */
  async render(component, props = {}, options = {}) {
    // Merge options with defaults
    const renderOptions = {
      transition: this.defaultTransition,
      updateState: true,
      ...options
    };
    
    // Set loading state
    if (renderOptions.updateState) {
      state.set('app.isLoading', true);
    }
    
    try {
      // Wait for any ongoing transitions to complete
      if (this.isTransitioning) {
        await this._waitForTransition();
      }
      
      // Start transition
      this.isTransitioning = true;
      
      // Clean up existing components if needed
      if (renderOptions.cleanupExisting !== false) {
        await this._cleanupActiveComponents();
      }
      
      // Create component instance if component is a class
      const componentInstance = typeof component === 'function' 
        ? new component(props) 
        : component;
      
      // Execute beforeRender lifecycle method if it exists
      if (typeof componentInstance.beforeRender === 'function') {
        await Promise.resolve(componentInstance.beforeRender());
      }
      
      // Get the component's HTML content
      let html = '';
      
      if (typeof componentInstance.render === 'function') {
        // If the component has a render method, call it
        html = await Promise.resolve(componentInstance.render());
      } else if (typeof componentInstance.template === 'string') {
        // If the component has a template property, use it
        html = componentInstance.template;
      } else {
        throw new Error('Component must have either a render method or a template property');
      }
      
      // Transition out current content
      await this._transitionOut(renderOptions.transition);
      
      // Update the DOM
      this.transitionContainer.innerHTML = html;
      
      // Store the component instance for lifecycle management
      const componentId = componentInstance.id || this._generateComponentId();
      this.activeComponents.set(componentId, componentInstance);
      
      // Execute afterRender lifecycle method if it exists
      if (typeof componentInstance.afterRender === 'function') {
        // Use setTimeout to ensure the DOM has been updated
        setTimeout(() => {
          componentInstance.afterRender(this.transitionContainer);
        }, 0);
      }
      
      // Transition in new content
      await this._transitionIn(renderOptions.transition);
      
      // Update state
      if (renderOptions.updateState) {
        state.set('app.isLoading', false);
      }
      
      // End transition
      this.isTransitioning = false;
      
      return componentInstance;
    } catch (error) {
      // Handle errors
      console.error('Error rendering component:', error);
      
      // Reset loading state
      if (renderOptions.updateState) {
        state.set('app.isLoading', false);
      }
      
      // End transition
      this.isTransitioning = false;
      
      // Display error message
      this.transitionContainer.innerHTML = this._generateErrorTemplate(error);
      
      throw error;
    }
  }
  
  /**
   * Update a specific component
   * @param {string} componentId - ID of the component to update
   * @param {Object} [props={}] - New props to pass to the component
   * @returns {Promise<Object>} - Promise resolving to the component instance
   */
  async updateComponent(componentId, props = {}) {
    // Check if component exists
    if (!this.activeComponents.has(componentId)) {
      throw new Error(`Component with ID '${componentId}' not found`);
    }
    
    const component = this.activeComponents.get(componentId);
    
    // Update props
    if (component.props) {
      component.props = { ...component.props, ...props };
    } else {
      component.props = props;
    }
    
    // Execute beforeUpdate lifecycle method if it exists
    if (typeof component.beforeUpdate === 'function') {
      await Promise.resolve(component.beforeUpdate());
    }
    
    // Get updated HTML
    let html = '';
    
    if (typeof component.render === 'function') {
      html = await Promise.resolve(component.render());
    } else if (typeof component.template === 'string') {
      html = component.template;
    } else {
      throw new Error('Component must have either a render method or a template property');
    }
    
    // Find component's root element
    const componentElement = this._findComponentElement(componentId);
    
    if (componentElement) {
      // Update the DOM
      componentElement.innerHTML = html;
      
      // Execute afterUpdate lifecycle method if it exists
      if (typeof component.afterUpdate === 'function') {
        // Use setTimeout to ensure the DOM has been updated
        setTimeout(() => {
          component.afterUpdate(componentElement);
        }, 0);
      }
    } else {
      // If component element not found, re-render the entire page
      await this.render(component, props, { cleanupExisting: false });
    }
    
    return component;
  }
  
  /**
   * Find a component's root element in the DOM
   * @param {string} componentId - ID of the component to find
   * @returns {HTMLElement|null} - Component's root element or null if not found
   * @private
   */
  _findComponentElement(componentId) {
    // Look for an element with the component's ID
    let element = document.getElementById(componentId);
    
    // If not found, look for a data-component-id attribute
    if (!element) {
      element = this.transitionContainer.querySelector(`[data-component-id="${componentId}"]`);
    }
    
    return element;
  }
  
  /**
   * Clean up active components
   * @returns {Promise<void>}
   * @private
   */
  async _cleanupActiveComponents() {
    // Create an array of promises for each component's beforeDestroy method
    const destroyPromises = [];
    
    for (const [id, component] of this.activeComponents.entries()) {
      // Execute beforeDestroy lifecycle method if it exists
      if (typeof component.beforeDestroy === 'function') {
        destroyPromises.push(Promise.resolve(component.beforeDestroy()));
      }
    }
    
    // Wait for all destroy promises to resolve
    await Promise.all(destroyPromises);
    
    // Clear the active components map
    this.activeComponents.clear();
  }
  
  /**
   * Transition out the current content
   * @param {Object} transition - Transition options
   * @returns {Promise<void>}
   * @private
   */
  _transitionOut(transition) {
    // If transition type is 'none', return immediately
    if (transition.type === 'none') {
      return Promise.resolve();
    }
    
    return new Promise(resolve => {
      // Apply transition effect
      if (transition.type === 'fade') {
        this.transitionContainer.style.opacity = '0';
      } else if (transition.type === 'slide') {
        this.transitionContainer.style.transform = 'translateX(-100%)';
      }
      
      // Wait for transition to complete
      setTimeout(resolve, transition.duration);
    });
  }
  
  /**
   * Transition in the new content
   * @param {Object} transition - Transition options
   * @returns {Promise<void>}
   * @private
   */
  _transitionIn(transition) {
    // If transition type is 'none', return immediately
    if (transition.type === 'none') {
      return Promise.resolve();
    }
    
    return new Promise(resolve => {
      // Reset position for slide transition
      if (transition.type === 'slide') {
        this.transitionContainer.style.transform = 'translateX(100%)';
        
        // Force a reflow to ensure the transform is applied
        this.transitionContainer.offsetHeight;
        
        // Apply transition effect
        this.transitionContainer.style.transform = 'translateX(0)';
      } else if (transition.type === 'fade') {
        // Apply fade in transition
        this.transitionContainer.style.opacity = '1';
      }
      
      // Wait for transition to complete
      setTimeout(resolve, transition.duration);
    });
  }
  
  /**
   * Wait for any ongoing transitions to complete
   * @returns {Promise<void>}
   * @private
   */
  _waitForTransition() {
    return new Promise(resolve => {
      const checkTransition = () => {
        if (!this.isTransitioning) {
          resolve();
        } else {
          setTimeout(checkTransition, 50);
        }
      };
      
      checkTransition();
    });
  }
  
  /**
   * Handle window resize events
   * @private
   */
  _handleResize() {
    // Notify all active components of resize event
    for (const [id, component] of this.activeComponents.entries()) {
      if (typeof component.onResize === 'function') {
        component.onResize(window.innerWidth, window.innerHeight);
      }
    }
  }
  
  /**
   * Generate a unique component ID
   * @returns {string} - Unique ID
   * @private
   */
  _generateComponentId() {
    return 'component_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
  }
  
  /**
   * Generate an error template
   * @param {Error} error - Error object
   * @returns {string} - HTML error template
   * @private
   */
  _generateErrorTemplate(error) {
    return `
      <div class="error-container p-4">
        <h2 class="error-title mb-3">Error Rendering Component</h2>
        <div class="error-message alert alert-danger">
          ${error.message || 'Unknown error'}
        </div>
      </div>
    `;
  }
}

/**
 * BaseComponent - Base class for all page components
 * Provides lifecycle methods and common functionality
 */
export class BaseComponent {
  /**
   * Create a new BaseComponent
   * @param {Object} [props={}] - Component properties
   */
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.id = props.id || null;
    this.elements = {}; // Store references to key DOM elements
  }
  
  /**
   * Lifecycle method: Called before the component is rendered
   * Override this method in your component classes
   */
  beforeRender() {
    // Implementation left to derived classes
  }
  
  /**
   * Render the component
   * Must be implemented by derived classes
   * @returns {string} - HTML content
   */
  render() {
    throw new Error('Component must implement render method');
  }
  
  /**
   * Lifecycle method: Called after the component is rendered
   * Override this method in your component classes
   * @param {HTMLElement} element - The component's root element
   */
  afterRender(element) {
    // Implementation left to derived classes
    
    // Cache important elements for quick access
    this._cacheElements(element);
    
    // Set up event listeners
    this._setupEventListeners();
  }
  
  /**
   * Lifecycle method: Called before the component is updated
   * Override this method in your component classes
   */
  beforeUpdate() {
    // Implementation left to derived classes
  }
  
  /**
   * Lifecycle method: Called after the component is updated
   * Override this method in your component classes
   * @param {HTMLElement} element - The component's root element
   */
  afterUpdate(element) {
    // Implementation left to derived classes
    
    // Refresh cached elements
    this._cacheElements(element);
    
    // Reset event listeners
    this._setupEventListeners();
  }
  
  /**
   * Lifecycle method: Called before the component is destroyed
   * Override this method in your component classes
   */
  beforeDestroy() {
    // Implementation left to derived classes
    
    // Clean up event listeners
    this._removeEventListeners();
  }
  
  /**
   * Lifecycle method: Called when window is resized
   * Override this method in your component classes
   * @param {number} width - Window width
   * @param {number} height - Window height
   */
  onResize(width, height) {
    // Implementation left to derived classes
  }
  
  /**
   * Update component's state and trigger re-render if needed
   * @param {Object} newState - State updates to apply
   * @param {boolean} [shouldRender=true] - Whether to trigger re-render
   */
  setState(newState, shouldRender = true) {
    this.state = { ...this.state, ...newState };
    
    if (shouldRender) {
      // Get the PageRenderer instance
      const renderer = this._getRenderer();
      
      // Update the component
      if (renderer && this.id) {
        renderer.updateComponent(this.id, this.props);
      }
    }
  }
  
  /**
   * Cache important DOM elements for quick access
   * @param {HTMLElement} rootElement - The component's root element
   * @protected
   */
  _cacheElements(rootElement) {
    // Default implementation does nothing
    // Override in derived classes to cache specific elements
  }
  
  /**
   * Set up event listeners
   * @protected
   */
  _setupEventListeners() {
    // Default implementation does nothing
    // Override in derived classes to add event listeners
  }
  
  /**
   * Remove event listeners
   * @protected
   */
  _removeEventListeners() {
    // Default implementation does nothing
    // Override in derived classes to remove event listeners
  }
  
  /**
   * Get the PageRenderer instance
   * @returns {PageRenderer|null} - PageRenderer instance or null
   * @protected
   */
  _getRenderer() {
    return window.pageRenderer || null;
  }
}

// Export the PageRenderer as a class and create a global instance
const pageRenderer = new PageRenderer();
window.pageRenderer = pageRenderer;

export default pageRenderer;