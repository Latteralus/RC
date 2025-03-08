/**
 * Racing Page Template
 * Templates/racing.js
 */

/**
 * Generate the racing page content
 * @returns {string} HTML content for the racing page
 */
export default function render() {
    return `
      <main class="racing-page">
        <section class="racing-hero fade-in-section">
          <div class="hero-content">
            <h1>RC Racing Events & Community</h1>
            <p>Join our thriving RC racing community and experience the excitement of competitive racing</p>
            <div class="hero-buttons">
              <a href="#events" class="cta-button">View Events</a>
              <a href="/videos" class="cta-button secondary">Watch Races</a>
            </div>
          </div>
        </section>
  
        <section id="events" class="upcoming-events fade-in-section">
          <h2>Upcoming Events</h2>
          <div class="events-grid">
            <div class="event-card">
              <div class="event-date">
                <span class="month">FEB</span>
                <span class="day">15</span>
              </div>
              <div class="event-details">
                <h3>Weekend Race Series</h3>
                <p>Weekly racing competition for all skill levels</p>
                <ul>
                  <li>Time: 2:00 PM</li>
                  <li>Categories: Buggy, Truck, Racing</li>
                  <li>Entry Fee: $20</li>
                </ul>
                <a href="/contact" class="register-button">Register Now</a>
              </div>
            </div>
  
            <div class="event-card">
              <div class="event-date">
                <span class="month">FEB</span>
                <span class="day">22</span>
              </div>
              <div class="event-details">
                <h3>Beginner's Workshop</h3>
                <p>Learn racing techniques and vehicle maintenance</p>
                <ul>
                  <li>Time: 11:00 AM</li>
                  <li>Duration: 2 hours</li>
                  <li>Cost: Free</li>
                </ul>
                <a href="/contact" class="register-button">Register Now</a>
              </div>
            </div>
  
            <div class="event-card">
              <div class="event-date">
                <span class="month">MAR</span>
                <span class="day">05</span>
              </div>
              <div class="event-details">
                <h3>Championship Race</h3>
                <p>Monthly championship event with prizes</p>
                <ul>
                  <li>Time: 1:00 PM</li>
                  <li>Categories: All Classes</li>
                  <li>Entry Fee: $35</li>
                </ul>
                <a href="/contact" class="register-button">Register Now</a>
              </div>
            </div>
          </div>
        </section>
  
        <section class="race-classes fade-in-section">
          <h2>Race Classes</h2>
          <div class="classes-grid">
            <div class="class-card">
              <img src="/assets/images/racing/buggy.jpg" alt="Buggy Class">
              <h3>Buggy Class</h3>
              <p>High-speed racing with agile 1/10 scale buggies</p>
            </div>
            <div class="class-card">
              <img src="/assets/images/racing/truck.jpg" alt="Truck Class">
              <h3>Truck Class</h3>
              <p>Intense competition with powerful racing trucks</p>
            </div>
            <div class="class-card">
              <img src="/assets/images/racing/crawler.jpg" alt="Crawler Class">
              <h3>Crawler Class</h3>
              <p>Technical rock crawling and obstacle courses</p>
            </div>
          </div>
        </section>
  
        <section class="track-info fade-in-section">
          <h2>Our Track</h2>
          <div class="track-content">
            <div class="track-image">
              <img src="/assets/images/racing/track.jpg" alt="RC Racing Track">
            </div>
            <div class="track-details">
              <h3>Professional Racing Facility</h3>
              <ul>
                <li>Multiple track layouts</li>
                <li>Electronic lap timing system</li>
                <li>Pit area with power stations</li>
                <li>Spectator viewing area</li>
                <li>On-site parts shop</li>
              </ul>
              <a href="/videos" class="cta-button">View Track Videos</a>
            </div>
          </div>
        </section>
      </main>
    `;
  }
  
  /**
   * Initialize the racing page
   * Called after the page is rendered
   */
  export function init() {
    // Initialize smooth scrolling for anchor links
    initializeSmoothScroll();
    
    // Initialize animations if available
    if (window.AnimationController) {
      window.AnimationController.initScrollAnimations();
    }
    
    // Add event listeners for registration buttons
    initializeRegistrationButtons();
  }
  
  /**
   * Initialize smooth scrolling for anchor links
   */
  function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  /**
   * Initialize registration buttons
   */
  function initializeRegistrationButtons() {
    const registerButtons = document.querySelectorAll('.register-button');
    
    registerButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Get event information for the registration
        const eventCard = button.closest('.event-card');
        if (eventCard) {
          const eventName = eventCard.querySelector('h3').textContent;
          const eventDate = eventCard.querySelector('.event-date').textContent.trim();
          
          // Store event info in sessionStorage for the contact form
          sessionStorage.setItem('registerEvent', eventName);
          sessionStorage.setItem('registerEventDate', eventDate);
          
          // Let the default link behavior work (navigate to contact page)
        }
      });
    });
  }