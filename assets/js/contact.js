/**
 * Enhanced contact form functionality
 * Includes real-time validation, accessibility improvements, and better UX
 */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formGroups = document.querySelectorAll('.form-group');
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    // Add floating label behavior
    initializeFloatingLabels(formGroups);
    
    // Add real-time validation
    initializeValidation(inputs);
    
    // Form submission handler
    initializeFormSubmission(contactForm, inputs);
    
    // Add aria-live region for status messages
    const statusRegion = document.createElement('div');
    statusRegion.setAttribute('aria-live', 'polite');
    statusRegion.className = 'status-region visually-hidden';
    contactForm.appendChild(statusRegion);
});

/**
 * Initialize floating labels for form fields
 * @param {NodeList} formGroups - Form group elements
 */
function initializeFloatingLabels(formGroups) {
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (!input) return;
        
        // Add floating label class to form group
        group.classList.add('floating-label');
        
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
 * @param {NodeList} inputs - Form input elements
 */
function initializeValidation(inputs) {
    inputs.forEach(input => {
        // Add event listeners for validation
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.closest('.form-group').classList.contains('error')) {
                validateField(input);
            }
        });
        
        // Add role and aria attributes for accessibility
        if (input.hasAttribute('required')) {
            const label = input.closest('.form-group').querySelector('label');
            if (label) {
                label.innerHTML += ' <span class="required" aria-hidden="true">*</span>';
            }
        }
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
 * @param {HTMLElement} form - Contact form element
 * @param {NodeList} inputs - Form input elements
 */
function initializeFormSubmission(form, inputs) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
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
            
            // Update status region
            updateStatusRegion('Please correct the errors in the form.');
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
            updateStatusRegion('Sending your message...');
            
            // Simulate form submission (replace with actual API call)
            await simulateFormSubmission(formData);
            
            // Show success message
            showSuccessMessage(form);
            updateStatusRegion('Your message has been sent successfully. We will get back to you soon.');
            
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Show error message
            showErrorMessage(form);
            updateStatusRegion('There was an error sending your message. Please try again.');
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

/**
 * Simulate form submission (replace with actual API call)
 * @param {FormData} formData - Form data to submit
 * @returns {Promise} - Promise that resolves after delay
 */
function simulateFormSubmission(formData) {
    // Convert FormData to object for logging
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    console.log('Form data to submit:', formObject);
    
    // Simulate network delay
    return new Promise(resolve => setTimeout(resolve, 1500));
}

/**
 * Show success message after form submission
 * @param {HTMLElement} form - Contact form element
 */
function showSuccessMessage(form) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.setAttribute('role', 'alert');
    
    successMessage.innerHTML = `
        <div class="success-icon">✓</div>
        <h3>Thank you for your message!</h3>
        <p>We've received your inquiry and will get back to you soon.</p>
        <button class="button send-another">Send Another Message</button>
    `;
    
    // Replace form with success message
    form.innerHTML = '';
    form.appendChild(successMessage);
    form.classList.add('form-success');
    
    // Add event listener to "Send Another Message" button
    const sendAnotherButton = form.querySelector('.send-another');
    if (sendAnotherButton) {
        sendAnotherButton.addEventListener('click', () => {
            // Reload the page to reset the form
            window.location.reload();
        });
    }
}

/**
 * Show error message after form submission failure
 * @param {HTMLElement} form - Contact form element
 */
function showErrorMessage(form) {
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
        <p>There was an error sending your message. Please try again.</p>
    `;
    
    // Insert error at top of form
    form.insertBefore(errorElement, form.firstChild);
    
    // Scroll to error message
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Update status region for screen readers
 * @param {string} message - Status message
 */
function updateStatusRegion(message) {
    const statusRegion = document.querySelector('.status-region');
    if (statusRegion) {
        statusRegion.textContent = message;
    }
}