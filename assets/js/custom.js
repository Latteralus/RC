/**
 * custom.js - Custom builds functionality for Aubrey's RC website
 * Part of the simplified file structure approach for www.aubreysrc.com
 */

class CustomBuilds {
    constructor() {
        // Sample data for custom build showcase
        this.showcaseBuilds = [
            {
                id: "monster-bash",
                title: "Monster Bash Special",
                description: "A high-performance monster truck build designed for extreme terrain and jumps.",
                image: "/assets/images/products/car2.jpg", // Reusing existing image from cards.js
                specs: [
                    "Custom brushless motor system",
                    "Heavy-duty suspension",
                    "Reinforced chassis",
                    "Custom paint job",
                    "LED light kit"
                ],
                basedOn: "Arrma Kraton"
            },
            {
                id: "drift-king",
                title: "Drift King",
                description: "Competition-ready drift car with precision handling and style.",
                image: "/assets/images/products/car5.jpg", // Reusing existing image from cards.js
                specs: [
                    "Modified steering assembly",
                    "Custom gearing for drift setup",
                    "Performance electronics",
                    "Race-inspired body shell",
                    "Upgraded wheels and tires"
                ],
                basedOn: "Tamiya TT-02"
            },
            {
                id: "rock-crawler",
                title: "Rock Dominator",
                description: "Ultra-realistic scale crawler capable of conquering the most challenging terrain.",
                image: "/assets/images/products/car6.jpg", // Reusing existing image from cards.js
                specs: [
                    "High-torque motor",
                    "Full metal drivetrain",
                    "Waterproof electronics",
                    "Scale accessories",
                    "Custom suspension geometry"
                ],
                basedOn: "Axial SCX10 III"
            },
            {
                id: "speed-demon",
                title: "Speed Demon",
                description: "Track-focused speed build optimized for straight-line acceleration and top speed.",
                image: "/assets/images/products/car1.jpg", // Reusing existing image from cards.js
                specs: [
                    "High-KV brushless motor",
                    "Racing ESC with custom settings",
                    "Aerodynamic body modifications",
                    "Lightweight components",
                    "Performance gearing"
                ],
                basedOn: "Traxxas Rustler"
            }
        ];

        // Initialize components
        this.initializeShowcase();
        this.initializeFAQ();
        this.initializeForm();
    }

    // Initialize the showcase carousel
    initializeShowcase() {
        const showcaseContainer = document.getElementById('showcase-carousel');
        if (!showcaseContainer) return;

        // Create carousel structure
        this.createCarouselStructure(showcaseContainer);

        // Render builds
        this.renderShowcaseBuilds();

        // Add navigation functionality
        this.attachCarouselEventListeners();
    }

    // Create carousel structure
    createCarouselStructure(container) {
        const carouselHTML = `
            <div class="carousel-container">
                <button class="carousel-button prev" aria-label="Previous builds">❮</button>
                <div class="carousel-track-container">
                    <div class="carousel-track"></div>
                </div>
                <button class="carousel-button next" aria-label="Next builds">❯</button>
            </div>
            <div class="carousel-nav">
                <div class="carousel-indicators"></div>
            </div>
        `;

        container.innerHTML = carouselHTML;

        // Store references to carousel elements
        this.track = container.querySelector('.carousel-track');
        this.prevButton = container.querySelector('.carousel-button.prev');
        this.nextButton = container.querySelector('.carousel-button.next');
        this.indicators = container.querySelector('.carousel-indicators');

        // Current position in carousel
        this.currentPosition = 0;

        // Number of cards to display at once (will be updated based on screen size)
        this.updateCardsToShow();
    }

    // Update the number of cards to show based on screen width
    updateCardsToShow() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth < 576) {
            this.cardsToShow = 1;
        } else if (windowWidth < 992) {
            this.cardsToShow = 2;
        } else {
            this.cardsToShow = 3;
        }
    }

    // Render build cards
    renderShowcaseBuilds() {
        if (!this.track) return;

        // Clear existing cards
        this.track.innerHTML = '';

        // Create build cards
        this.showcaseBuilds.forEach((build) => {
            const card = this.createBuildCard(build);
            this.track.appendChild(card);
        });

        // Update the indicators
        this.updateIndicators(this.showcaseBuilds.length);

        // Position the track to show current position
        this.updateTrackPosition();
    }

    // Create a single build card
    createBuildCard(build) {
        const card = document.createElement('div');
        card.className = 'build-card';
        
        card.innerHTML = `
            <img src="${build.image}" alt="${build.title}" class="build-image">
            <div class="build-details">
                <h3 class="build-title">${build.title}</h3>
                <p class="build-description">${build.description}</p>
                <div class="build-specs">
                    <h4>Specifications</h4>
                    <ul>
                        ${build.specs.map(spec => `<li>${spec}</li>`).join('')}
                    </ul>
                </div>
                <p><strong>Based on:</strong> ${build.basedOn}</p>
            </div>
        `;
        
        return card;
    }

    // Update carousel indicators
    updateIndicators(totalBuilds) {
        if (!this.indicators) return;

        // Clear existing indicators
        this.indicators.innerHTML = '';

        // Calculate number of pages
        const pages = Math.ceil(totalBuilds / this.cardsToShow);

        // Create indicator for each page
        for (let i = 0; i < pages; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `Go to page ${i + 1}`);
            
            if (Math.floor(this.currentPosition / this.cardsToShow) === i) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                this.currentPosition = i * this.cardsToShow;
                this.updateTrackPosition();
                this.updateIndicatorStatus();
            });
            
            this.indicators.appendChild(indicator);
        }
    }

    // Update which indicator is active
    updateIndicatorStatus() {
        const indicators = this.indicators.querySelectorAll('.carousel-indicator');
        const currentPage = Math.floor(this.currentPosition / this.cardsToShow);
        
        indicators.forEach((indicator, index) => {
            if (index === currentPage) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Update the position of the track to show current cards
    updateTrackPosition() {
        // Get all cards
        const cards = this.track.querySelectorAll('.build-card');
        
        // Calculate maximum position
        const maxPosition = Math.max(0, this.showcaseBuilds.length - this.cardsToShow);
        
        // Ensure current position is valid
        this.currentPosition = Math.min(Math.max(0, this.currentPosition), maxPosition);
        
        // Update cards visibility and position
        cards.forEach((card) => {
            // Calculate card width
            const cardWidth = 100 / this.cardsToShow;
            
            // Apply positioning
            card.style.flex = `0 0 ${cardWidth}%`;
        });
        
        // Set transform to show current cards
        this.track.style.transform = `translateX(-${this.currentPosition * (100 / this.cardsToShow)}%)`;
        
        // Update button states
        this.updateNavigationButtons(maxPosition);
    }

    // Update button enabled/disabled state
    updateNavigationButtons(maxPosition) {
        if (this.currentPosition <= 0) {
            this.prevButton.classList.add('disabled');
        } else {
            this.prevButton.classList.remove('disabled');
        }
        
        if (this.currentPosition >= maxPosition) {
            this.nextButton.classList.add('disabled');
        } else {
            this.nextButton.classList.remove('disabled');
        }
    }

    // Attach carousel event listeners
    attachCarouselEventListeners() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.navigate(-1);
            });
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.navigate(1);
            });
        }
        
        // Add touch support
        if (this.track) {
            let startX = 0;
            let endX = 0;
            
            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            this.track.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                
                // Detect swipe direction
                if (startX - endX > 50) {
                    // Swipe left, go next
                    this.navigate(1);
                } else if (endX - startX > 50) {
                    // Swipe right, go previous
                    this.navigate(-1);
                }
            });
        }
        
        // Add window resize listener to handle responsive changes
        window.addEventListener('resize', () => {
            this.updateCardsToShow();
            this.updateIndicators(this.showcaseBuilds.length);
            this.updateTrackPosition();
        });
    }

    // Navigate the carousel
    navigate(direction) {
        this.currentPosition += direction;
        
        // Calculate maximum position
        const maxPosition = Math.max(0, this.showcaseBuilds.length - this.cardsToShow);
        
        // Ensure position is within bounds
        this.currentPosition = Math.min(Math.max(0, this.currentPosition), maxPosition);
        
        // Update position
        this.updateTrackPosition();
        
        // Update indicators
        this.updateIndicatorStatus();
    }

    // Initialize FAQ accordion
    initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Toggle active state
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqQuestion = faqItem.querySelector('.faq-question');
                    faqQuestion.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    question.classList.add('active');
                }
            });
        });
    }

    // Initialize request form
    initializeForm() {
        const form = document.getElementById('custom-request-form');
        
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate form before submission
            if (this.validateForm(form)) {
                // In a real implementation, you would send the form data to the server here
                this.showSubmissionConfirmation();
            }
        });
    }

    // Validate the request form
    validateForm(form) {
        let isValid = true;
        
        // Get required fields
        const requiredFields = form.querySelectorAll('[required]');
        
        // Check each required field
        requiredFields.forEach(field => {
            // Remove any existing error styling
            field.classList.remove('error');
            
            // Check if the field is empty
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            }
            
            // Additional validation for email field
            if (field.type === 'email' && field.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value)) {
                    field.classList.add('error');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }

    // Show confirmation message after form submission
    showSubmissionConfirmation() {
        const form = document.getElementById('custom-request-form');
        const formContainer = form.closest('.form-container');
        
        // Create confirmation message
        const confirmationMessage = document.createElement('div');
        confirmationMessage.className = 'submission-confirmation';
        confirmationMessage.innerHTML = `
            <h3>Thank You!</h3>
            <p>Your custom build request has been received. We'll contact you within 24-48 hours to discuss your project.</p>
            <p>If you have any immediate questions, feel free to call us at 319-595-8656.</p>
        `;
        
        // Replace form with confirmation
        formContainer.innerHTML = '';
        formContainer.appendChild(confirmationMessage);
        
        // Scroll to confirmation message
        confirmationMessage.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize custom builds functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.customBuilds = new CustomBuilds();
});