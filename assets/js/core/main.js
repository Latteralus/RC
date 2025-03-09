/**
 * main.js
 * Entry point for Aubrey's RC Cars website
 */

import App from './app.js';

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create and initialize the app
  window.app = new App();
});