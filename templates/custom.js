/**
 * Custom Builds Page Template
 * Templates/custom.js
 */

/**
 * Generate the custom builds page content
 * @returns {string} HTML content for the custom builds page
 */
export default function render() {
    return `
      <main class="custom-builds-page">
        <section class="custom-hero fade-in-section">
          <div class="hero-content">
            <h1>Custom RC Builds & Modifications</h1>
            <p>Transform your RC vehicle into a unique masterpiece with our expert customization services</p>
          </div>
        </section>
  
        <section class="services fade-in-section">
          <h2>Our Services</h2>
          <div class="services-grid">
            <div class="service-card">
              <img src="/assets/images/custom/performance.jpg" alt="Performance Upgrades">
              <h3>Performance Upgrades</h3>
              <ul>
                <li>Motor upgrades</li>
                <li>Battery modifications</li>
                <li>Suspension tuning</li>
                <li>Gear ratio optimization</li>
              </ul>
              <a href="/contact" class="cta-button">Get Quote</a>
            </div>
  
            <div class="service-card">
              <img src="/assets/images/custom/visual.jpg" alt="Visual Customization">
              <h3>Visual Customization</h3>
              <ul>
                <li>Custom paint jobs</li>
                <li>Body modifications</li>
                <li>LED lighting systems</li>
                <li>Decal design & application</li>
              </ul>
              <a href="/contact" class="cta-button">Get Quote</a>
            </div>
  
            <div class="service-card">
              <img src="/assets/images/custom/racing.jpg" alt="Racing Preparation">
              <h3>Racing Preparation</h3>
              <ul>
                <li>Race tuning</li>
                <li>Weight reduction</li>
                <li>Aerodynamic modifications</li>
                <li>Competition setup</li>
              </ul>
              <a href="/contact" class="cta-button">Get Quote</a>
            </div>
          </div>
        </section>
  
        <section class="gallery fade-in-section">
          <h2>Custom Build Gallery</h2>
          <div class="gallery-grid">
            <div class="gallery-item">
              <img src="/assets/images/custom/gallery1.jpg" alt="Custom Build 1">
              <div class="gallery-overlay">
                <h3>Monster Truck Build</h3>
                <p>Full performance upgrade package with custom paint</p>
              </div>
            </div>
            <div class="gallery-item">
              <img src="/assets/images/custom/gallery2.jpg" alt="Custom Build 2">
              <div class="gallery-overlay">
                <h3>Racing Buggy</h3>
                <p>Competition-ready with aerodynamic modifications</p>
              </div>
            </div>
            <div class="gallery-item">
              <img src="/assets/images/custom/gallery3.jpg" alt="Custom Build 3">
              <div class="gallery-overlay">
                <h3>Drift Car Setup</h3>
                <p>Specialized drift configuration with LED underglow</p>
              </div>
            </div>
            <div class="gallery-item">
              <img src="/assets/images/custom/gallery4.jpg" alt="Custom Build 4">
              <div class="gallery-overlay">
                <h3>Rock Crawler</h3>
                <p>Enhanced suspension and custom body work</p>
              </div>
            </div>
          </div>
        </section>
  
        <section class="process fade-in-section">
          <h2>Our Custom Build Process</h2>
          <div class="process-steps">
            <div class="step">
              <div class="step-number">1</div>
              <h3>Consultation</h3>
              <p>Discuss your vision and requirements with our experts</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <h3>Design</h3>
              <p>Create detailed plans and specifications for your build</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <h3>Build</h3>
              <p>Expert modification and assembly of your RC vehicle</p>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <h3>Testing</h3>
              <p>Thorough testing and fine-tuning of all modifications</p>
            </div>
          </div>
        </section>
      </main>
    `;
  }
  
  /**
   * Initialize the custom builds page
   * Called after the page is rendered
   */
  export function init() {
    // Initialize gallery item hover effects
    initializeGalleryInteractions();
    
    // Initialize animations if available
    if (window.AnimationController) {
      window.AnimationController.initScrollAnimations();
    }
  }
  
  /**
   * Initialize gallery interactions
   */
  function initializeGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      // Add hover effects on mobile
      item.addEventListener('click', function() {
        if (window.innerWidth < 768) {
          const overlay = this.querySelector('.gallery-overlay');
          if (overlay) {
            const isVisible = overlay.style.transform === 'translateY(0px)';
            if (isVisible) {
              overlay.style.transform = 'translateY(100%)';
            } else {
              overlay.style.transform = 'translateY(0)';
            }
          }
        }
      });
      
      // Add focus handling for accessibility
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          const overlay = this.querySelector('.gallery-overlay');
          if (overlay) {
            const isVisible = overlay.style.transform === 'translateY(0px)';
            if (isVisible) {
              overlay.style.transform = 'translateY(100%)';
            } else {
              overlay.style.transform = 'translateY(0)';
            }
          }
        }
      });
    });
  }