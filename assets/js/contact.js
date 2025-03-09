/**
 * contact.js - Contact form functionality for Aubrey's RC website
 * Part of the simplified file structure approach for www.aubreysrc.com
 */

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.formFields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message')
        };
    }
    
    initialize() {
        if (!this.form) return;
        
        // Add form submission validation
        this.form.addEventListener('submit', (e) => {
            // Prevent default form submission
            e.preventDefault();
            
            // Validate form
            if (this.validateForm()) {
                // Show loading indicator
                document.querySelector('.loading-indicator').classList.add('active');
                
                // Submit the form
                this.form.submit();
            }
        });
        
        // Add input validation on blur
        Object.keys(this.formFields).forEach(field => {
            const element = this.formFields[field];
            if (!element) return;
            
            element.addEventListener('blur', () => {
                this.validateField(field, element);
            });
        });
    }
    
    validateForm() {
        let isValid = true;
        
        // Validate each required field
        Object.keys(this.formFields).forEach(field => {
            const element = this.formFields[field];
            if (!element) return;
            
            // Skip validation for optional fields
            if (field === 'phone' && !element.value) return;
            
            if (!this.validateField(field, element)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(fieldName, element) {
        // Remove any existing error messages
        const formGroup = element.closest('.form-group');
        formGroup.classList.remove('error');
        
        // Find or create error message element
        let errorMessage = formGroup.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        
        // Field-specific validation
        let isValid = true;
        let errorText = '';
        
        if (!element.value.trim() && element.required) {
            isValid = false;
            errorText = 'This field is required';
        } else if (fieldName === 'email' && element.value) {
            // Simple email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(element.value)) {
                isValid = false;
                errorText = 'Please enter a valid email address';
            }
        } else if (fieldName === 'phone' && element.value) {
            // Simple phone validation - allow numbers, spaces, parentheses, hyphens
            const phonePattern = /^[\d\s\(\)\-\+]+$/;
            if (!phonePattern.test(element.value)) {
                isValid = false;
                errorText = 'Please enter a valid phone number';
            }
        }
        
        // Update error state
        if (!isValid) {
            formGroup.classList.add('error');
            errorMessage.textContent = errorText;
        }
        
        return isValid;
    }
    
    // Show a success message when the form is submitted successfully
    showSuccessMessage() {
        if (!this.form) return;
        
        this.form.innerHTML = `
            <div class="success-message">
                <h3>Thank you for your message!</h3>
                <p>We'll get back to you as soon as possible.</p>
            </div>
        `;
    }
}

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = new ContactForm();
    contactForm.initialize();
});