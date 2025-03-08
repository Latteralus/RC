/**
 * Contact Service
 * Handles form submission and API integration for the contact page
 */

/**
 * ContactService class for handling contact form operations
 */
class ContactService {
    constructor() {
      // Base API URL (replace with actual API endpoint in production)
      this.apiUrl = '/api/contact';
      
      // Default headers for API requests
      this.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
    }
    
    /**
     * Submit contact form data to the API
     * @param {FormData} formData - Form data from the contact form
     * @returns {Promise} - Promise resolving to the API response
     */
    async submitContactForm(formData) {
      // In the SPA implementation, we simulate the API call
      // This would be replaced with an actual fetch call in production
      
      // Convert FormData to a plain object
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      // Log the form data that would be sent to the API
      console.log('Submitting form data to API:', formObject);
      
      // Simulate API delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate successful submission (90% chance of success)
          if (Math.random() < 0.9) {
            resolve({
              success: true,
              message: 'Form submitted successfully',
              id: 'msg_' + Date.now()
            });
          } else {
            // Simulate API error
            reject(new Error('Network error: Unable to submit form. Please try again.'));
          }
        }, 1500); // Simulate network delay
      });
    }
    
    /**
     * Validate all form fields before submission
     * @param {HTMLFormElement} form - The contact form element
     * @returns {boolean} - Whether all fields are valid
     */
    validateForm(form) {
      const inputs = form.querySelectorAll('input, textarea, select');
      let isValid = true;
      
      // Validate each field
      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });
      
      // Focus the first invalid field for better UX
      if (!isValid) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
      
      return isValid;
    }
    
    /**
     * Validate an individual form field
     * @param {HTMLElement} field - The form field to validate
     * @returns {boolean} - Whether the field is valid
     */
    validateField(field) {
      const value = field.value.trim();
      let isValid = true;
      let errorMessage = '';
      
      // Skip validation for non-required empty fields
      if (!field.hasAttribute('required') && value === '') {
        this.updateFieldValidation(field, true);
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
      
      this.updateFieldValidation(field, isValid, errorMessage);
      return isValid;
    }
    
    /**
     * Update field validation state with visual feedback
     * @param {HTMLElement} field - The form field
     * @param {boolean} isValid - Whether the field is valid
     * @param {string} errorMessage - Error message to display
     */
    updateFieldValidation(field, isValid, errorMessage = '') {
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
     * Process form submission
     * @param {Event} event - Form submission event
     * @returns {Promise} - Promise resolving to the result of form submission
     */
    async processFormSubmission(event) {
      event.preventDefault();
      
      const form = event.target;
      
      // Validate the form
      if (!this.validateForm(form)) {
        return { 
          success: false, 
          message: 'Please correct the errors in the form.'
        };
      }
      
      // Get form data
      const formData = new FormData(form);
      
      try {
        // Submit form data to API
        const response = await this.submitContactForm(formData);
        
        return {
          success: true,
          message: 'Thank you for your message! We\'ll get back to you soon.',
          ...response
        };
      } catch (error) {
        console.error('Error submitting form:', error);
        
        return {
          success: false,
          message: error.message || 'There was an error sending your message. Please try again.'
        };
      }
    }
    
    /**
     * Display success message after successful form submission
     * @param {HTMLFormElement} form - The contact form element
     */
    displaySuccessMessage(form) {
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
          // Reload the contact form
          this.reloadContactForm();
        });
      }
    }
    
    /**
     * Display error message after failed form submission
     * @param {HTMLFormElement} form - The contact form element
     * @param {string} errorMessage - Error message to display
     */
    displayErrorMessage(form, errorMessage) {
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
      
      // Reset submit button
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
      
      // Scroll to error message
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    /**
     * Reload the contact form
     * Uses the router to reload the current page
     */
    reloadContactForm() {
      // If we have a router, use it to reload the contact page
      if (window.router) {
        window.router.navigate('/contact');
      } else {
        // Fallback to reloading the page
        window.location.reload();
      }
    }
  }