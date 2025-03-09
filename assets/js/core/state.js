/**
 * state.js
 * Simple state management system for Aubrey's RC Cars website
 * Implements a pub/sub pattern with localStorage persistence
 */

class StateManager {
    /**
     * Create a new StateManager instance
     */
    constructor() {
      // Initial state
      this.state = {
        // Cart state
        cart: {
          items: [],
          totalItems: 0,
          totalPrice: 0
        },
        
        // User preferences
        preferences: {
          theme: 'light',
          currency: 'USD',
          recentlyViewed: []
        },
        
        // UI state
        ui: {
          mobileMenuOpen: false,
          cartPreviewOpen: false,
          searchOpen: false,
          notifications: []
        },
        
        // Application state
        app: {
          isLoading: false,
          lastUpdated: Date.now(),
          currentRoute: '/'
        }
      };
      
      // Subscribers for state changes
      this.subscribers = {
        // Global subscribers - triggered on any state change
        global: [],
        
        // Path-specific subscribers - triggered only when specified paths change
        paths: new Map()
      };
      
      // Load persisted state from localStorage
      this._loadPersistedState();
      
      // Flag to temporarily disable persistence (useful during batch updates)
      this.persistenceEnabled = true;
      
      // Debug mode flag
      this.debugMode = false;
      
      console.log('StateManager initialized');
    }
    
    /**
     * Get the current state or a specific part of the state
     * @param {string} [path] - Optional dot notation path to get a specific part of the state
     * @returns {*} - Requested state (deep clone to prevent direct mutation)
     */
    get(path = null) {
      if (!path) {
        return this._deepClone(this.state);
      }
      
      return this._deepClone(this._getValueByPath(this.state, path));
    }
    
    /**
     * Update the state
     * @param {string} path - Dot notation path to the property to update
     * @param {*} value - New value to set
     * @param {boolean} [silent=false] - If true, don't trigger subscribers
     * @returns {boolean} - Whether the update was successful
     */
    set(path, value, silent = false) {
      try {
        // Get the old value for comparison
        const oldValue = this._getValueByPath(this.state, path);
        
        // Skip update if value hasn't changed (using JSON.stringify for deep comparison)
        if (JSON.stringify(oldValue) === JSON.stringify(value)) {
          return true;
        }
        
        // Update the value
        this._setValueByPath(this.state, path, this._deepClone(value));
        
        // Update timestamp
        this.state.app.lastUpdated = Date.now();
        
        // Debug log if enabled
        if (this.debugMode) {
          console.log(`State updated at ${path}:`, { oldValue, newValue: value });
        }
        
        // Persist state to localStorage
        if (this.persistenceEnabled) {
          this._persistState();
        }
        
        // Notify subscribers if not silent
        if (!silent) {
          this._notifySubscribers(path);
        }
        
        return true;
      } catch (error) {
        console.error(`Error updating state at ${path}:`, error);
        return false;
      }
    }
    
    /**
     * Batch update multiple state properties at once
     * @param {Object} updates - Object with paths as keys and new values as values
     * @returns {boolean} - Whether all updates were successful
     */
    batchUpdate(updates) {
      // Temporarily disable persistence to avoid multiple saves
      this.persistenceEnabled = false;
      
      let allSuccessful = true;
      
      // Apply all updates silently
      for (const [path, value] of Object.entries(updates)) {
        const success = this.set(path, value, true); // silent update
        allSuccessful = allSuccessful && success;
      }
      
      // Re-enable persistence and save once
      this.persistenceEnabled = true;
      this._persistState();
      
      // Collect unique paths to notify
      const uniquePaths = new Set(Object.keys(updates));
      
      // Notify subscribers for each unique path
      uniquePaths.forEach(path => {
        this._notifySubscribers(path);
      });
      
      return allSuccessful;
    }
    
    /**
     * Subscribe to state changes
     * @param {Function} callback - Function to call when state changes
     * @param {string} [path] - Optional dot notation path to subscribe to specific changes
     * @returns {string} - Subscription ID for unsubscribing
     */
    subscribe(callback, path = null) {
      const subscriptionId = this._generateId();
      
      if (!path) {
        // Subscribe to all state changes
        this.subscribers.global.push({
          id: subscriptionId,
          callback
        });
      } else {
        // Subscribe to specific path changes
        if (!this.subscribers.paths.has(path)) {
          this.subscribers.paths.set(path, []);
        }
        
        this.subscribers.paths.get(path).push({
          id: subscriptionId,
          callback
        });
      }
      
      if (this.debugMode) {
        console.log(`New subscription (${subscriptionId}) added for ${path || 'global'} changes`);
      }
      
      return subscriptionId;
    }
    
    /**
     * Unsubscribe from state changes
     * @param {string} subscriptionId - ID of the subscription to remove
     * @returns {boolean} - Whether unsubscription was successful
     */
    unsubscribe(subscriptionId) {
      // Try to remove from global subscribers first
      const globalIndex = this.subscribers.global.findIndex(sub => sub.id === subscriptionId);
      if (globalIndex !== -1) {
        this.subscribers.global.splice(globalIndex, 1);
        return true;
      }
      
      // Then try path-specific subscribers
      for (const [path, subs] of this.subscribers.paths.entries()) {
        const pathIndex = subs.findIndex(sub => sub.id === subscriptionId);
        if (pathIndex !== -1) {
          subs.splice(pathIndex, 1);
          
          // Clean up empty paths
          if (subs.length === 0) {
            this.subscribers.paths.delete(path);
          }
          
          return true;
        }
      }
      
      return false;
    }
    
    /**
     * Reset the state to its initial value or a specific path to its default
     * @param {string} [path] - Optional dot notation path to reset a specific part
     * @returns {boolean} - Whether the reset was successful
     */
    reset(path = null) {
      try {
        if (!path) {
          // Reset entire state
          localStorage.removeItem('aubreysRCState');
          this._loadPersistedState(true);
          this._notifySubscribers(null); // Notify all subscribers
        } else {
          // Reset specific path
          // Get default value from initial state definition
          const defaultState = new StateManager().state;
          const defaultValue = this._getValueByPath(defaultState, path);
          
          // Update with default value
          this.set(path, defaultValue);
        }
        
        return true;
      } catch (error) {
        console.error(`Error resetting state${path ? ` at ${path}` : ''}:`, error);
        return false;
      }
    }
    
    /**
     * Enable or disable debug mode
     * @param {boolean} enabled - Whether debug mode should be enabled
     */
    setDebugMode(enabled) {
      this.debugMode = enabled;
      console.log(`StateManager debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    /**
     * Load state from localStorage
     * @param {boolean} [forceDefault=false] - Force using default state
     * @private
     */
    _loadPersistedState(forceDefault = false) {
      if (forceDefault) {
        return;
      }
      
      try {
        const savedState = localStorage.getItem('aubreysRCState');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          
          // Merge saved state with default state to ensure we have all required properties
          this.state = this._deepMerge(this.state, parsedState);
          
          if (this.debugMode) {
            console.log('State loaded from localStorage');
          }
        }
      } catch (error) {
        console.error('Error loading state from localStorage:', error);
      }
    }
    
    /**
     * Save state to localStorage
     * @private
     */
    _persistState() {
      try {
        // Only persist cart and preferences - exclude UI and some app state
        const stateToPersist = {
          cart: this.state.cart,
          preferences: this.state.preferences,
          app: {
            lastUpdated: this.state.app.lastUpdated
          }
        };
        
        localStorage.setItem('aubreysRCState', JSON.stringify(stateToPersist));
        
        if (this.debugMode) {
          console.log('State persisted to localStorage');
        }
      } catch (error) {
        console.error('Error persisting state to localStorage:', error);
      }
    }
    
    /**
     * Notify subscribers of state changes
     * @param {string} path - Path that was updated
     * @private
     */
    _notifySubscribers(path) {
      // Get the current state
      const currentState = this.get();
      
      // Always notify global subscribers
      this.subscribers.global.forEach(subscriber => {
        try {
          subscriber.callback(currentState);
        } catch (error) {
          console.error('Error in global state subscriber:', error);
        }
      });
      
      if (path) {
        // Notify direct path subscribers
        if (this.subscribers.paths.has(path)) {
          const pathValue = this._getValueByPath(currentState, path);
          this.subscribers.paths.get(path).forEach(subscriber => {
            try {
              subscriber.callback(pathValue, path, currentState);
            } catch (error) {
              console.error(`Error in state subscriber for ${path}:`, error);
            }
          });
        }
        
        // Notify parent path subscribers
        // E.g., if 'cart.items' changed, also notify 'cart' subscribers
        const pathParts = path.split('.');
        for (let i = 1; i < pathParts.length; i++) {
          const parentPath = pathParts.slice(0, -i).join('.');
          
          if (this.subscribers.paths.has(parentPath)) {
            const parentValue = this._getValueByPath(currentState, parentPath);
            this.subscribers.paths.get(parentPath).forEach(subscriber => {
              try {
                subscriber.callback(parentValue, parentPath, currentState);
              } catch (error) {
                console.error(`Error in state subscriber for ${parentPath}:`, error);
              }
            });
          }
        }
      }
    }
    
    /**
     * Get a value from an object by dot notation path
     * @param {Object} obj - Object to get value from
     * @param {string} path - Dot notation path
     * @returns {*} - Value at the specified path
     * @private
     */
    _getValueByPath(obj, path) {
      const pathArray = path.split('.');
      let value = obj;
      
      for (const key of pathArray) {
        if (value === undefined || value === null) {
          return undefined;
        }
        value = value[key];
      }
      
      return value;
    }
    
    /**
     * Set a value in an object by dot notation path
     * @param {Object} obj - Object to set value in
     * @param {string} path - Dot notation path
     * @param {*} value - Value to set
     * @private
     */
    _setValueByPath(obj, path, value) {
      const pathArray = path.split('.');
      const lastKey = pathArray.pop();
      let current = obj;
      
      for (const key of pathArray) {
        if (current[key] === undefined || current[key] === null) {
          current[key] = {};
        }
        current = current[key];
      }
      
      current[lastKey] = value;
    }
    
    /**
     * Create a deep clone of an object
     * @param {*} value - Value to clone
     * @returns {*} - Deep cloned value
     * @private
     */
    _deepClone(value) {
      return JSON.parse(JSON.stringify(value));
    }
    
    /**
     * Deep merge two objects
     * @param {Object} target - Target object
     * @param {Object} source - Source object
     * @returns {Object} - Merged object
     * @private
     */
    _deepMerge(target, source) {
      // Use a fresh copy of the target to avoid modifying the original
      const result = { ...target };
      
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (
            source[key] instanceof Object && 
            key in target && 
            target[key] instanceof Object
          ) {
            // If property exists in both and is an object, recursively merge
            result[key] = this._deepMerge(target[key], source[key]);
          } else {
            // Otherwise take the new value
            result[key] = source[key];
          }
        }
      }
      
      return result;
    }
    
    /**
     * Generate a unique ID for subscriptions
     * @returns {string} - Unique ID
     * @private
     */
    _generateId() {
      return 'sub_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
    }
  }
  
  // Export a singleton instance
  export default new StateManager();