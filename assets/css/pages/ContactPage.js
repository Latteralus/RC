/**
 * ContactPage.js
 * Contact page component for Aubrey's RC Cars website
 */

import { BaseComponent } from '../core/PageRenderer.js';

class ContactPage extends BaseComponent {
  /**
   * Create a new ContactPage instance
   * @param {Object} props - Component properties
   */
  constructor(props = {}) {
    super(props);
    
    // Form state
    this.state = {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      },
      validationErrors: {},
      submitted: false,
      submitSuccess: false,
      submitError: null
    };
    
    // Bind methods
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }
  
  /**
   * Lifecycle method: Called before the component is rendered
   */
  beforeRender() {
    // Initialize form state
    this.state = {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      },
      validationErrors: {},
      submitted: false,
      submitSuccess: false,
      submitError: null
    };
  }
  
  /**
   * Render the contact page
   * @returns {string} - HTML content
   */
  render() {
    return `
      <div class="container py-5">
        <div class="row">
          <div class="col-12">
            <h1 class="text-center mb-5">Contact Us</h1>
            <p class="lead text-center mb-5">Have questions about our RC cars, custom builds, or racing events? We'd love to hear from you!</p>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-4 mb-5">
            <div class="contact-info">
              <h3>Contact Information</h3>
              <div class="contact-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>(319) 595-8656</span>
              </div>
              <div class="contact-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>orders@aubreysrc.com</span>
              </div>
              <div class="contact-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Wellsburg, Iowa</span>
              </div>
              <div class="contact-info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>24/7 for online orders</span>
              </div>
            </div>
            
            <div class="social-links mt-4">
              <h3>Connect With Us</h3>
              <p>Our social media channels are coming soon!</p>
            </div>
          </div>
          
          <div class="col-md-8">
            ${this._renderContactForm()}
          </div>
        </div>
        
        <div class="row mt-5">
          <div class="col-12">
            <h2 class="text-center mb-4">Find Us</h2>
            <div class="contact-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11773.010820887789!2d-92.93040835!3d42.5046297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f34505b76301e1%3A0x5f3f64a7b7d25363!2sWellsburg%2C%20IA%2050680!5e0!3m2!1sen!2sus!4v1709923735317!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Render the contact form
   * @returns {string} - Form HTML
   * @private
   */
  _renderContactForm() {
    const { form, validationErrors, submitted, submitSuccess, submitError } = this.state;
    
    // Show success message if form was submitted successfully
    if (submitted && submitSuccess) {
      return `
        <div class="contact-form">
          <div class="alert alert-success">
            <h4>Thank you for contacting us!</h4>
            <p>Your message has been sent. We'll get back to you as soon as possible.</p>
            <button type="button" class="btn btn-primary mt-3" id="reset-form-btn">Send Another Message</button>
          </div>
        </div>
      `;
    }
    
    // Show error message if form submission failed
    const errorAlert = submitError ? `
      <div class="alert alert-danger">
        <h4>Error sending message</h4>
        <p>${submitError}</p>
      </div>
    ` : '';
    
    return `
      <form class="contact-form" id="contact-form" novalidate>
        ${errorAlert}
        
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="name" class="form-label">Name *</label>
            <input 
              type="text" 
              class="form-control ${validationErrors.name ? 'is-invalid' : ''}" 
              id="name" 
              name="name" 
              placeholder="Your Name" 
              value="${form.name}"
              required
            >
            ${validationErrors.name ? `<div class="invalid-feedback">${validationErrors.name}</div>` : ''}
          </div>
          
          <div class="form-group col-md-6">
            <label for="email" class="form-label">Email *</label>
            <input 
              type="email" 
              class="form-control ${validationErrors.email ? 'is-invalid' : ''}" 
              id="email" 
              name="email" 
              placeholder="Your Email" 
              value="${form.email}"
              required
            >
            ${validationErrors.email ? `<div class="invalid-feedback">${validationErrors.email}</div>` : ''}
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="phone" class="form-label">Phone</label>
            <input 
              type="tel" 
              class="form-control ${validationErrors.phone ? 'is-invalid' : ''}" 
              id="phone" 
              name="phone" 
              placeholder="Your Phone (optional)" 
              value="${form.phone}"
            >
            ${validationErrors.phone ? `<div class="invalid-feedback">${validationErrors.phone}</div>` : ''}
          </div>
          
          <div class="form-group col-md-6">
            <label for="subject" class="form-label">Subject *</label>
            <select 
              class="form-control ${validationErrors.subject ? 'is-invalid' : ''}" 
              id="subject" 
              name="subject"
              required
            >
              <option value="" ${form.subject === '' ? 'selected' : ''}>Select a subject...</option>
              <option value="general" ${form.subject === 'general' ? 'selected' : ''}>General Inquiry</option>
              <option value="products" ${form.subject === 'products' ? 'selected' : ''}>Product Question</option>
              <option value="custom" ${form.subject === 'custom' ? 'selected' : ''}>Custom Build Request</option>
              <option value="racing" ${form.subject === 'racing' ? 'selected' : ''}>Racing Events</option>
              <option value="support" ${form.subject === 'support' ? 'selected' : ''}>Technical Support</option>
            </select>
            ${validationErrors.subject ? `<div class="invalid-feedback">${validationErrors.subject}</div>` : ''}
          </div>
        </div>
        
        <div class="form-group">
          <label for="message" class="form-label">Message *</label>
          <textarea 
            class="form-control ${validationErrors.message ? 'is-invalid' : ''}" 
            id="message" 
            name="message" 
            rows="5" 
            placeholder="Your Message"
            required
          >${form.message}</textarea>
          ${validationErrors.message ? `<div class="invalid-feedback">${validationErrors.message}</div>` : ''}
        </div>
        
        <div class="form-group form-check">
          <input 
            type="checkbox" 
            class="form-check-input" 
            id="newsletter" 
            name="newsletter"
            ${form.newsletter ? 'checked' : ''}
          >
          <label class="form-check-label" for="newsletter">Subscribe to our newsletter</label>
        </div>
        
        <div class="text-center mt-4">
          <button type="submit" class="btn btn-primary btn-lg" id="submit-form-btn">Send Message</button>
        </div>
      </form>
    `;
  }
  
  /**
   * Lifecycle method: Called after the component is rendered
   * @param {HTMLElement} element - The component's root element
   */
  afterRender(element) {
    // Cache form elements
    this._cacheElements(element);
    
    // Set up event listeners
    this._setupEventListeners();
  }
  
  /**
   * Cache important DOM elements for quick access
   * @param {HTMLElement} rootElement - The component's root element
   * @private
   */
  _cacheElements(rootElement) {
    this.elements = {
      form: rootElement.querySelector('#contact-form'),
      submitBtn: rootElement.querySelector('#submit-form-btn'),
      resetBtn: rootElement.querySelector('#reset-form-btn'),
      formInputs: rootElement.querySelectorAll('.form-control'),
      formCheckboxes: rootElement.querySelectorAll('.form-check-input')
    };
  }
  
  /**
   * Set up event listeners
   * @private
   */
  _setupEventListeners() {
    // Form submission
    if (this.elements.form) {
      this.elements.form.addEventListener('submit', this.handleSubmit);
      
      // Form inputs
      this.elements.formInputs.forEach(input => {
        input.addEventListener('input', this.handleInputChange);
        input.addEventListener('blur', () => this.validateField(input.name, input.value));
      });
      
      // Checkboxes
      this.elements.formCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', this.handleCheckboxChange);
      });
    }
    
    // Reset form button
    if (this.elements.resetBtn) {
      this.elements.resetBtn.addEventListener('click', this.resetForm);
    }
  }
  
  /**
   * Handle input change events
   * @param {Event} event - Input event
   */
  handleInputChange(event) {
    const { name, value } = event.target;
    
    // Update form state
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    }, false);
  }
  
  /**
   * Handle checkbox change events
   * @param {Event} event - Change event
   */
  handleCheckboxChange(event) {
    const { name, checked } = event.target;
    
    // Update form state
    this.setState({
      form: {
        ...this.state.form,
        [name]: checked
      }
    }, false);
  }
  
  /**
   * Handle form submission
   * @param {Event} event - Submit event
   */
  handleSubmit(event) {
    event.preventDefault();
    
    // Validate the form
    const isValid = this.validateForm();
    
    if (isValid) {
      // Show loading state
      if (this.elements.submitBtn) {
        this.elements.submitBtn.disabled = true;
        this.elements.submitBtn.innerHTML = `
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Sending...
        `;
      }
      
      // Simulate sending the form (in a real app, this would be an API call)
      setTimeout(() => {
        // In a real app, this would be a fetch or axios API call
        // For this example, we'll just simulate a successful submission
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
          // Show success state
          this.setState({
            submitted: true,
            submitSuccess: true,
            submitError: null
          });
          
          // Send form data to server (simulated)
          console.log('Form submitted successfully:', this.state.form);
        } else {
          // Show error state
          this.setState({
            submitted: true,
            submitSuccess: false,
            submitError: 'There was an error sending your message. Please try again or contact us directly by phone.'
          });
          
          // Reset button state
          if (this.elements.submitBtn) {
            this.elements.submitBtn.disabled = false;
            this.elements.submitBtn.innerHTML = 'Send Message';
          }
        }
      }, 1500); // Simulate network delay
    }
  }
  
  /**
   * Validate the entire form
   * @returns {boolean} - Whether the form is valid
   */
  validateForm() {
    const { form } = this.state;
    const errors = {};
    
    // Validate name
    if (!form.name.trim()) {
      errors.name = 'Name is required';
    }
    
    // Validate email
    if (!form.email.trim()) {
      errors.email = 'Email is required';
    } else if (!this._isValidEmail(form.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate phone (optional, but must be valid if provided)
    if (form.phone.trim() && !this._isValidPhone(form.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    // Validate subject
    if (!form.subject) {
      errors.subject = 'Please select a subject';
    }
    
    // Validate message
    if (!form.message.trim()) {
      errors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    // Update validation errors state
    this.setState({
      validationErrors: errors
    });
    
    // Form is valid if there are no errors
    return Object.keys(errors).length === 0;
  }
  
  /**
   * Validate a specific field
   * @param {string} name - Field name
   * @param {string} value - Field value
   */
  validateField(name, value) {
    const { validationErrors } = this.state;
    let error = null;
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!this._isValidEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
        
      case 'phone':
        if (value.trim() && !this._isValidPhone(value)) {
          error = 'Please enter a valid phone number';
        }
        break;
        
      case 'subject':
        if (!value) {
          error = 'Please select a subject';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;
        
      default:
        break;
    }
    
    // Update only this field's error
    this.setState({
      validationErrors: {
        ...validationErrors,
        [name]: error
      }
    });
    
    return !error;
  }
  
  /**
   * Check if an email is valid
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether the email is valid
   * @private
   */
  _isValidEmail(email) {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Check if a phone number is valid
   * @param {string} phone - Phone number to validate
   * @returns {boolean} - Whether the phone number is valid
   * @private
   */
  _isValidPhone(phone) {
    // Allow various formats like (123) 456-7890, 123-456-7890, 123.456.7890, etc.
    const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phoneRegex.test(phone);
  }
  
  /**
   * Reset the form to its initial state
   */
  resetForm() {
    this.setState({
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      },
      validationErrors: {},
      submitted: false,
      submitSuccess: false,
      submitError: null
    });
  }
  
  /**
   * Remove event listeners
   * @protected
   */
  _removeEventListeners() {
    // Form submission
    if (this.elements.form) {
      this.elements.form.removeEventListener('submit', this.handleSubmit);
      
      // Form inputs
      this.elements.formInputs.forEach(input => {
        input.removeEventListener('input', this.handleInputChange);
        input.removeEventListener('blur', () => this.validateField(input.name, input.value));
      });
      
      // Checkboxes
      this.elements.formCheckboxes.forEach(checkbox => {
        checkbox.removeEventListener('change', this.handleCheckboxChange);
      });
    }
    
    // Reset form button
    if (this.elements.resetBtn) {
      this.elements.resetBtn.removeEventListener('click', this.resetForm);
    }
  }
  
  /**
   * Lifecycle method: Called before the component is destroyed
   */
  beforeDestroy() {
    this._removeEventListeners();
  }
}

export default ContactPage;