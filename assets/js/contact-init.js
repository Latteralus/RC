/**
 * Contact Page Initialization
 * This script handles the initialization of the contact page in the SPA
 */

/**
 * Initialize the contact page
 * Sets up all event listeners and functionality
 */
export function initializeContactPage() {
    // Initialize contact service
    const contactService = new ContactService();
    
    // Initialize floating labels
    initializeFloatingLabels();
    
    // Initialize form validation
    initializeFormValidation(contactService);
    
    // Initialize form submission
    initializeFormSubmission(contactService);
    
    // Initialize map placeholder
    initializeMapPlaceholder();
    
    // Initialize FAQ section interactivity
    initializeFAQSection();
    
    // Initialize animations
    initializeAnimations();
    
    // Log initialization
    console.log('Contact page initialized successfully');
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
   * @param {ContactService} contactService - The contact service instance
   */
  function initializeFormValidation(contactService) {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Validate field when focus leaves the input
      input.addEventListener('blur', () => {
        contactService.validateField(input);
      });
      
      // Real-time validation when typing in a field with an error
      input.addEventListener('input', () => {
        if (input.closest('.form-group').classList.contains('error')) {
          contactService.validateField(input);
        }
      });
    });
  }
  
  /**
   * Initialize form submission handler
   * @param {ContactService} contactService - The contact service instance
   */
  function initializeFormSubmission(contactService) {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (event) => {
      // Update UI to show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
      
      // Show loading indicator if available
      if (window.Utilities && window.Utilities.showLoading) {
        window.Utilities.showLoading();
      }
      
      // Process the form submission
      const result = await contactService.processFormSubmission(event);
      
      // Hide loading indicator
      if (window.Utilities && window.Utilities.hideLoading) {
        window.Utilities.hideLoading();
      }
      
      // Handle the result
      if (result.success) {
        // Show success message
        contactService.displaySuccessMessage(form);
        
        // Show notification if available
        if (window.Utilities && window.Utilities.showNotification) {
          window.Utilities.showNotification(result.message, 'success');
        }
      } else {
        // Show error message
        contactService.displayErrorMessage(form, result.message);
        
        // Show notification if available
        if (window.Utilities && window.Utilities.showNotification) {
          window.Utilities.showNotification(result.message, 'error');
        }
      }
    });
  }
  
  /**
   * Initialize map placeholder with interactive elements
   */
  function initializeMapPlaceholder() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    mapContainer.addEventListener('click', () => {
      // In a real implementation, this would open a modal with a full map
      // For this prototype, we'll show a notification
      if (window.Utilities && window.Utilities.showNotification) {
        window.Utilities.showNotification('Interactive map will be available in the next update', 'info', 5000);
      } else {
        alert('Interactive map will be available in the next update');
      }
    });
  }
  
  /**
   * Initialize FAQ section with expand/collapse functionality
   */
  function initializeFAQSection() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('h3');
      const answer = item.querySelector('p');
      
      // Add a button for accessibility
      const expandButton = document.createElement('button');
      expandButton.className = 'faq-toggle';
      expandButton.setAttribute('aria-expanded', 'false');
      expandButton.setAttribute('aria-controls', `faq-answer-${faqItems.indexOf(item)}`);
      expandButton.innerHTML = '<span class="visually-hidden">Toggle answer</span>';
      
      // Set ID for the answer for ARIA support
      answer.id = `faq-answer-${faqItems.indexOf(item)}`;
      
      // Add the button to the question
      question.appendChild(expandButton);
      
      // Add click event to toggle visibility
      question.addEventListener('click', () => {
        const isExpanded = expandButton.getAttribute('aria-expanded') === 'true';
        
        // Toggle the current item
        answer.style.maxHeight = isExpanded ? '0' : `${answer.scrollHeight}px`;
        expandButton.setAttribute('aria-expanded', !isExpanded);
        
        // Add classes for animations
        if (isExpanded) {
          item.classList.remove('expanded');
        } else {
          item.classList.add('expanded');
        }
      });
    });
  }
  
  /**
   * Initialize animations for sections and elements
   */
  function initializeAnimations() {
    // Use the AnimationController if available
    if (window.AnimationController && window.AnimationController.initScrollAnimations) {
      window.AnimationController.initScrollAnimations();
      return;
    }
    
    // Fallback to simple animation if AnimationController is not available
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    // Use IntersectionObserver if available
    if ('IntersectionObserver' in window) {
      const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      fadeElements.forEach(el => fadeObserver.observe(el));
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      fadeElements.forEach(el => el.classList.add('fade-in'));
    }
  }
  
  /**
   * ContactService Class
   * Included inline for demonstration - in production, this would be imported
   */
  class ContactService {
    constructor() {
      this.apiUrl = '/api/contact'; // Would be replaced with actual endpoint
    }
    
    // Validate form and all fields
    validateForm(form) {
      const inputs = form.querySelectorAll('input, textarea, select');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });
      
      return isValid;
    }
    
    // Validate a single field
    validateField(field) {
      const value = field.value.trim();
      let isValid = true;
      let errorMessage = '';
      
      // Skip validation for non-required empty fields
      if (!field.hasAttribute('required') && value === '') {
        this.updateFieldValidation(field, true);
        return true;
      }
      
      // Field-specific validation
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
          if (field.hasAttribute('required')) {
            isValid = value !== '';
            errorMessage = 'This field is required';
          }
      }
      
      this.updateFieldValidation(field, isValid, errorMessage);
      return isValid;
    }
    
    // Update validation UI feedback
    updateFieldValidation(field, isValid, errorMessage = '') {
      const formGroup = field.closest('.form-group');
      if (!formGroup) return;
      
      const existingError = formGroup.querySelector('.error-message');
      
      if (!isValid) {
        field.setAttribute('aria-invalid', 'true');
        
        if (existingError) {
          existingError.textContent = errorMessage;
        } else {
          const errorElement = document.createElement('span');
          errorElement.className = 'error-message';
          errorElement.textContent = errorMessage;
          errorElement.id = `${field.id}-error`;
          formGroup.appendChild(errorElement);
          field.setAttribute('aria-describedby', errorElement.id);
        }
        
        formGroup.classList.add('error');
      } else {
        field.setAttribute('aria-invalid', 'false');
        
        if (existingError) {
          existingError.remove();
          field.removeAttribute('aria-describedby');
        }
        
        formGroup.classList.remove('error');
      }
    }
    
    // Process form submission
    async processFormSubmission(event) {
      event.preventDefault();
      const form = event.target;
      
      if (!this.validateForm(form)) {
        return { 
          success: false, 
          message: 'Please correct the errors in the form.'
        };
      }
      
      const formData = new FormData(form);
      
      try {
        // Simulate API call (replace with actual API call in production)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Log form data that would be sent
        const formValues = {};
        formData.forEach((value, key) => {
          formValues[key] = value;
        });
        console.log('Form submission values:', formValues);
        
        return {
          success: true,
          message: 'Thank you for your message! We\'ll get back to you soon.'
        };
      } catch (error) {
        console.error('Error submitting form:', error);
        
        return {
          success: false,
          message: 'There was an error sending your message. Please try again.'
        };
      }
    }
    
    // Display success message
    displaySuccessMessage(form) {
      form.innerHTML = `
        <div class="success-message" role="alert">
          <div class="success-icon">✓</div>
          <h3>Thank you for your message!</h3>
          <p>We've received your inquiry and will get back to you soon.</p>
          <button class="button send-another">Send Another Message</button>
        </div>
      `;
      
      form.classList.add('form-success');
      
      const sendAnotherButton = form.querySelector('.send-another');
      if (sendAnotherButton) {
        sendAnotherButton.addEventListener('click', () => {
          if (window.location.hash === '#/contact') {
            window.location.reload();
          } else {
            window.location.hash = '#/contact';
          }
        });
      }
    }
    
    // Display error message
    displayErrorMessage(form, errorMessage) {
      const existingError = form.querySelector('.form-error');
      if (existingError) {
        existingError.remove();
      }
      
      const errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      errorElement.setAttribute('role', 'alert');
      errorElement.innerHTML = `
        <div class="error-icon">!</div>
        <p>${errorMessage}</p>
      `;
      
      form.insertBefore(errorElement, form.firstChild);
      
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
      
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }