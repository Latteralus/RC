/**
 * Contact Page Template
 * Templates/contact.js
 */

/**
 * Generate the contact page content
 * @returns {string} HTML content for the contact page
 */
export default function render() {
    return `
      <main id="main-content" class="contact-page">
        <section class="contact-hero fade-in-section">
          <div class="hero-content">
            <h1>Contact Us</h1>
            <p>Get in touch about products, custom builds, or racing events</p>
          </div>
        </section>
  
        <section class="contact-content fade-in-section">
          <div class="contact-grid">
            <div class="contact-info">
              <h2>Visit Our Shop</h2>
              <div class="info-block address">
                <h3>Address</h3>
                <p>123 RC Drive</p>
                <p>Denver, CO 80202</p>
              </div>
              <div class="info-block hours">
                <h3>Hours</h3>
                <p>Monday - Friday: 10AM - 7PM</p>
                <p>Saturday - Sunday: 9AM - 5PM</p>
              </div>
              <div class="info-block contact">
                <h3>Contact</h3>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@aubreysrc.com</p>
              </div>
              <div class="contact-social-links">
                <h3>Find Us Online</h3>
                <div class="social-links">
                  <a href="#" class="social-link facebook">Facebook</a>
                  <a href="#" class="social-link instagram">Instagram</a>
                  <a href="#" class="social-link youtube">YouTube</a>
                </div>
              </div>
            </div>
  
            <div class="contact-form fade-in-section">
              <h2>Send Us a Message</h2>
              <form id="contactForm" action="#" method="POST" novalidate>
                <div class="form-group floating-label">
                  <input type="text" id="name" name="name" required aria-required="true">
                  <label for="name">Name <span class="required">*</span></label>
                </div>
                <div class="form-group floating-label">
                  <input type="email" id="email" name="email" required aria-required="true">
                  <label for="email">Email <span class="required">*</span></label>
                </div>
                <div class="form-group floating-label">
                  <input type="tel" id="phone" name="phone">
                  <label for="phone">Phone (optional)</label>
                </div>
                <div class="form-group floating-label">
                  <select id="subject" name="subject" required aria-required="true">
                    <option value=""></option>
                    <option value="products">Product Inquiry</option>
                    <option value="custom">Custom Build</option>
                    <option value="racing">Racing Events</option>
                    <option value="other">Other</option>
                  </select>
                  <label for="subject">Subject <span class="required">*</span></label>
                </div>
                <div class="form-group floating-label">
                  <textarea id="message" name="message" rows="5" required aria-required="true"></textarea>
                  <label for="message">Message <span class="required">*</span></label>
                </div>
                <button type="submit" class="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        </section>
  
        <section class="map-section fade-in-section">
          <h2>Find Us</h2>
          <div class="map-container">
            <!-- Replace with actual map embed code in production -->
            <div class="map-placeholder">
              <p>Interactive map will be displayed here</p>
            </div>
          </div>
        </section>
  
        <section class="faq-section fade-in-section">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-grid">
            <div class="faq-item">
              <h3>Do you offer repairs?</h3>
              <p>Yes, we provide repair services for all RC vehicles, whether purchased from us or not. Our expert technicians can handle everything from minor fixes to comprehensive rebuilds.</p>
            </div>
            <div class="faq-item">
              <h3>How long do custom builds take?</h3>
              <p>Custom build times vary depending on complexity, typically ranging from 1-3 weeks. We'll provide you with a detailed timeline during your initial consultation.</p>
            </div>
            <div class="faq-item">
              <h3>Can beginners join races?</h3>
              <p>Absolutely! We have beginner-friendly races and provide guidance for new racers. Our weekend workshops are perfect for those just starting out in RC racing.</p>
            </div>
            <div class="faq-item">
              <h3>Do you ship internationally?</h3>
              <p>Yes, we offer international shipping for most products. Shipping rates and delivery times vary by destination. Contact us for specific details about shipping to your country.</p>
            </div>
          </div>
        </section>
      </main>
    `;
  }
  
  /**
   * Initialize the contact page
   * Called after the page is rendered
   */
  export function init() {
    // Initialize floating labels for form fields
    initializeFloatingLabels();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize form submission
    initializeFormSubmission();
    
    // Initialize map placeholder interaction
    initializeMapPlaceholder();
    
    // Initialize FAQ item interactions
    initializeFAQItems();
    
    // Initialize animations if available
    if (window.AnimationController) {
      window.AnimationController.initScrollAnimations();
    }
  }
  
  /**
   * Show error message after form submission failure
   * @param {HTMLElement} form - Contact form element
   * @param {string} errorMessage - Error message to display
   */
  function showErrorMessage(form, errorMessage) {
    // Remove any existing error message
    const existingError = form.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.setAttribute('role', 'alert');
    errorElement.innerHTML = `
      <div class="error-icon">!</div>
      <p>${errorMessage}</p>
    `;
    
    // Insert error at top of form
    form.insertBefore(errorElement, form.firstChild);
    
    // Scroll to error message
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  /**
   * Initialize map placeholder functionality
   */
  function initializeMapPlaceholder() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    mapContainer.addEventListener('click', () => {
      // In a production version, this would open a modal with an interactive map
      // For this example, we'll just show a notification
      if (window.Utilities && window.Utilities.showNotification) {
        window.Utilities.showNotification('Interactive map will be available in the next update.', 'info');
      } else {
        alert('Interactive map will be available in the next update.');
      }
    });
  }
  
  /**
   * Initialize FAQ item interactions
   */
  function initializeFAQItems() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
      const heading = item.querySelector('h3');
      const content = item.querySelector('p');
      
      // Make headings interactive
      heading.setAttribute('tabindex', '0');
      heading.setAttribute('role', 'button');
      heading.setAttribute('aria-expanded', 'false');
      heading.setAttribute('aria-controls', `faq-content-${index}`);
      
      // Set up content for accessibility
      content.id = `faq-content-${index}`;
      content.setAttribute('aria-hidden', 'true');
      content.style.maxHeight = '0';
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height 0.3s ease, padding 0.3s ease, opacity 0.3s ease';
      content.style.opacity = '0';
      content.style.padding = '0';
      
      // Add indicator for visual cue
      const indicator = document.createElement('span');
      indicator.className = 'faq-indicator';
      indicator.setAttribute('aria-hidden', 'true');
      indicator.innerHTML = '+';
      heading.appendChild(indicator);
      
      // Add event listeners
      heading.addEventListener('click', () => toggleFAQ(heading, content, indicator));
      heading.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFAQ(heading, content, indicator);
        }
      });
    });
  }
  
  /**
   * Toggle FAQ item open/closed
   * @param {HTMLElement} heading - FAQ item heading
   * @param {HTMLElement} content - FAQ item content
   * @param {HTMLElement} indicator - FAQ item indicator
   */
  function toggleFAQ(heading, content, indicator) {
    const isExpanded = heading.getAttribute('aria-expanded') === 'true';
    
    // Toggle aria states
    heading.setAttribute('aria-expanded', !isExpanded);
    content.setAttribute('aria-hidden', isExpanded);
    
    // Toggle visual state
    if (isExpanded) {
      content.style.maxHeight = '0';
      content.style.padding = '0';
      content.style.opacity = '0';
      indicator.innerHTML = '+';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.padding = '0.5rem 0 1rem';
      content.style.opacity = '1';
      indicator.innerHTML = '−';
    }
  }
  
  /**
   * Pre-fill subject if coming from event registration
   */
  function preFillFromEventRegistration() {
    // Check if we have event registration data in sessionStorage
    const eventName = sessionStorage.getItem('registerEvent');
    const eventDate = sessionStorage.getItem('registerEventDate');
    
    if (eventName) {
      // Set subject to "Racing Events"
      const subjectField = document.getElementById('subject');
      if (subjectField) {
        subjectField.value = 'racing';
        subjectField.closest('.form-group').classList.add('active');
      }
      
      // Pre-fill message with event information
      const messageField = document.getElementById('message');
      if (messageField) {
        messageField.value = `I'd like to register for the "${eventName}" event ${eventDate ? 'on ' + eventDate : ''}.`;
        messageField.closest('.form-group').classList.add('active');
      }
      
      // Clear sessionStorage
      sessionStorage.removeItem('registerEvent');
      sessionStorage.removeItem('registerEventDate');
    }
  }
    
    // Pre-fill subject if coming from an event registration
    preFillFromEventRegistration();
  }
  
  /**
   * Initialize floating labels for form fields
   */
  function initializeFloatingLabels() {
    const formGroups = document.querySelectorAll('.form-group.floating-label');
    
    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea, select');
      if (!input) return;
      
      // Set initial state
      if (input.value.length > 0) {
        group.classList.add('active');
      }
      
      // Add event listeners for input changes
      input.addEventListener('input', () => {
        group.classList.toggle('active', input.value.length > 0);
      });
      
      input.addEventListener('focus', () => {
        group.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        group.classList.remove('focused');
      });
    });
  }
  
  /**
   * Initialize form validation
   */
  function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Validate field when focus leaves the input
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });
      
      // Real-time validation when typing in a field with an error
      input.addEventListener('input', () => {
        if (input.closest('.form-group').classList.contains('error')) {
          validateField(input);
        }
      });
    });
  }
  
  /**
   * Validate form field
   * @param {HTMLElement} field - Form field to validate
   * @returns {boolean} - Whether the field is valid
   */
  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Skip validation if field is not required and empty
    if (!field.hasAttribute('required') && value === '') {
      updateFieldValidation(field, true);
      return true;
    }
    
    // Validate based on field type and id
    switch (field.id) {
      case 'name':
        isValid = value.length >= 2;
        errorMessage = 'Name must be at least 2 characters long';
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
        errorMessage = 'Please enter a valid email address';
        break;
        
      case 'phone':
        if (value) {
          const phoneRegex = /^\+?[\d\s-()]{10,}$/;
          isValid = phoneRegex.test(value);
          errorMessage = 'Please enter a valid phone number';
        }
        break;
        
      case 'subject':
        isValid = value !== '';
        errorMessage = 'Please select a subject';
        break;
        
      case 'message':
        isValid = value.length >= 10;
        errorMessage = 'Message must be at least 10 characters long';
        break;
        
      default:
        // For any other fields, check if they're required
        if (field.hasAttribute('required')) {
          isValid = value !== '';
          errorMessage = 'This field is required';
        }
    }
    
    updateFieldValidation(field, isValid, errorMessage);
    return isValid;
  }
  
  /**
   * Update field validation state
   * @param {HTMLElement} field - Form field
   * @param {boolean} isValid - Whether the field is valid
   * @param {string} errorMessage - Error message to display
   */
  function updateFieldValidation(field, isValid, errorMessage = '') {
    const formGroup = field.closest('.form-group');
    
    if (!formGroup) return;
    
    const existingError = formGroup.querySelector('.error-message');
    
    if (!isValid) {
      // Set aria attributes for accessibility
      field.setAttribute('aria-invalid', 'true');
      
      // Show error message
      if (existingError) {
        existingError.textContent = errorMessage;
      } else {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.id = `${field.id}-error`;
        formGroup.appendChild(errorElement);
        
        // Set aria-describedby to link field with error message
        field.setAttribute('aria-describedby', errorElement.id);
      }
      
      formGroup.classList.add('error');
    } else {
      // Remove error state
      field.setAttribute('aria-invalid', 'false');
      
      if (existingError) {
        existingError.remove();
        field.removeAttribute('aria-describedby');
      }
      
      formGroup.classList.remove('error');
    }
  }
  
  /**
   * Initialize form submission handler
   */
  function initializeFormSubmission() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate all fields
      let isFormValid = true;
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        if (!validateField(input)) {
          isFormValid = false;
        }
      });
      
      if (!isFormValid) {
        // Focus first invalid field
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        
        // Show notification if available
        if (window.Utilities && window.Utilities.showNotification) {
          window.Utilities.showNotification('Please correct the errors in the form.', 'error');
        }
        
        return;
      }
      
      // Get form data
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      try {
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
        
        // Show loading indicator if available
        if (window.Utilities && window.Utilities.showLoading) {
          window.Utilities.showLoading();
        }
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Hide loading indicator if available
        if (window.Utilities && window.Utilities.hideLoading) {
          window.Utilities.hideLoading();
        }
        
        // Show success message
        showSuccessMessage(form);
        
        // Show notification if available
        if (window.Utilities && window.Utilities.showNotification) {
          window.Utilities.showNotification('Your message has been sent successfully!', 'success');
        }
        
      } catch (error) {
        console.error('Error submitting form:', error);
        
        // Hide loading indicator if available
        if (window.Utilities && window.Utilities.hideLoading) {
          window.Utilities.hideLoading();
        }
        
        // Show error message
        showErrorMessage(form, 'There was an error sending your message. Please try again.');
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        // Show notification if available
        if (window.Utilities && window.Utilities.showNotification) {
          window.Utilities.showNotification('There was an error sending your message. Please try again.', 'error');
        }
      }
    });
  }
  
  /**
   * Show success message after form submission
   * @param {HTMLElement} form - Contact form element
   */
  function showSuccessMessage(form) {
    // Replace form with success message
    form.innerHTML = `
      <div class="success-message" role="alert">
        <div class="success-icon">✓</div>
        <h3>Thank you for your message!</h3>
        <p>We've received your inquiry and will get back to you soon.</p>
        <button class="button send-another">Send Another Message</button>
      </div>
    `;
    
    form.classList.add('form-success');
    
    // Add event listener to "Send Another Message" button
    const sendAnotherButton = form.querySelector('.send-another');
    if (sendAnotherButton) {
      sendAnotherButton.addEventListener('click', () => {
        // Reload the contact page - use router if available
        if (window.router) {
          window.router.navigate('/contact');
        } else {
          window.location.reload();
        }
      });
    }