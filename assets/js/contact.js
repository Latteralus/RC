document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');

    // Add floating label behavior
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        if (input) {
            // Add active class if field has value
            input.addEventListener('input', () => {
                group.classList.toggle('active', input.value.length > 0);
            });

            // Check initial value
            if (input.value.length > 0) {
                group.classList.add('active');
            }
        }
    });

    // Form validation
    const validateField = (field) => {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.id) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'phone':
                if (value) {
                    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
                    if (!phoneRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                }
                break;

            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a subject';
                }
                break;

            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        // Update UI based on validation
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');
        
        if (!isValid) {
            if (existingError) {
                existingError.textContent = errorMessage;
            } else {
                const errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.textContent = errorMessage;
                formGroup.appendChild(errorElement);
            }
            field.setAttribute('aria-invalid', 'true');
            formGroup.classList.add('error');
        } else {
            if (existingError) {
                existingError.remove();
            }
            field.setAttribute('aria-invalid', 'false');
            formGroup.classList.remove('error');
        }

        return isValid;
    };

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.closest('.form-group').classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission handler
    contactForm.addEventListener('submit', async (e) => {
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
            const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return;
        }

        // Get form data
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        try {
            // Update button state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);

        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Show error message
            const errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            errorElement.textContent = 'There was an error sending your message. Please try again.';
            
            // Insert error at top of form
            contactForm.insertBefore(errorElement, contactForm.firstChild);

            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // Add aria-live region for status messages
    const statusRegion = document.createElement('div');
    statusRegion.setAttribute('aria-live', 'polite');
    statusRegion.className = 'status-region';
    contactForm.appendChild(statusRegion);
});