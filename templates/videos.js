/**
 * Videos Page Template
 * Templates/videos.js
 */

/**
 * Generate the videos page content
 * @returns {string} HTML content for the videos page
 */
export default function render() {
    return `
      <main id="main-content" class="videos-page">
        <!-- Loading indicator -->
        <div class="loading-indicator">
          <div class="loader"></div>
        </div>
  
        <section class="videos-hero fade-in-section">
          <div class="hero-content">
            <h1>RC Racing Videos</h1>
            <p>Watch exciting races, tutorials, and highlights from our events</p>
          </div>
        </section>
  
        <section class="video-categories fade-in-section">
          <div class="category-search-container">
            <div class="category-tabs" role="tablist" aria-label="Video categories">
              <button class="tab-button active" data-category="all" role="tab" aria-selected="true" aria-controls="all-videos">All Videos</button>
              <button class="tab-button" data-category="races" role="tab" aria-selected="false" aria-controls="race-videos">Race Highlights</button>
              <button class="tab-button" data-category="tutorials" role="tab" aria-selected="false" aria-controls="tutorial-videos">Tutorials</button>
              <button class="tab-button" data-category="reviews" role="tab" aria-selected="false" aria-controls="review-videos">Vehicle Reviews</button>
            </div>
            
            <form class="video-search-form" role="search">
              <input type="search" placeholder="Search videos..." aria-label="Search videos">
              <button type="submit" aria-label="Search">Search</button>
            </form>
          </div>
        </section>
        
        <div class="video-count-info fade-in-section">
          <span>Showing <span class="video-count">6</span> <span class="videos-text">videos</span></span>
        </div>
  
        <div id="all-videos" role="tabpanel" aria-labelledby="all-videos-tab" class="video-grid fade-in-section">
          <div class="video-card" data-category="race-highlights">
            <div class="video-wrapper">
              <img src="/assets/images/videos/thumb1.jpg" alt="Weekend Race Series Highlights thumbnail" class="video-thumbnail">
              <iframe 
                data-src="https://www.youtube.com/embed/VIDEO_ID_1" 
                title="Weekend Race Series Highlights"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
              <button class="play-button" aria-label="Play Weekend Race Series Highlights video"></button>
            </div>
            <h3>Weekend Race Series Highlights</h3>
            <p>Exciting moments from our latest weekend racing event</p>
            <span class="video-category">Race Highlights</span>
            <div class="video-info">
              <div class="video-date">Feb 15, 2025</div>
              <div class="video-views">1.2K views</div>
            </div>
          </div>
  
          <div class="video-card" data-category="tutorials">
            <div class="video-wrapper">
              <img src="/assets/images/videos/thumb2.jpg" alt="RC Car Setup Tutorial thumbnail" class="video-thumbnail">
              <iframe 
                data-src="https://www.youtube.com/embed/VIDEO_ID_2" 
                title="RC Car Setup Tutorial"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
              <button class="play-button" aria-label="Play RC Car Setup Tutorial video"></button>
            </div>
            <h3>RC Car Setup Tutorial</h3>
            <p>Learn how to properly set up your RC car for racing</p>
            <span class="video-category">Tutorials</span>
            <div class="video-info">
              <div class="video-date">Feb 10, 2025</div>
              <div class="video-views">3.5K views</div>
            </div>
          </div>
  
          <div class="video-card" data-category="race-highlights">
            <div class="video-wrapper">
              <img src="/assets/images/videos/thumb3.jpg" alt="Championship Race Finals thumbnail" class="video-thumbnail">
              <iframe 
                data-src="https://www.youtube.com/embed/VIDEO_ID_3" 
                title="Championship Race Finals"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
              <button class="play-button" aria-label="Play Championship Race Finals video"></button>
            </div>
            <h3>Championship Race Finals</h3>
            <p>Full coverage of our monthly championship event</p>
            <span class="video-category">Race Highlights</span>
            <div class="video-info">
              <div class="video-date">Jan 28, 2025</div>
              <div class="video-views">2.8K views</div>
            </div>
          </div>
  
          <div class="video-card" data-category="vehicle-reviews">
            <div class="video-wrapper">
              <img src="/assets/images/videos/thumb4.jpg" alt="Traxxas Rustler Review thumbnail" class="video-thumbnail">
              <iframe 
                data-src="https://www.youtube.com/embed/VIDEO_ID_4" 
                title="Traxxas Rustler Review"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
              <button class="play-button" aria-label="Play Traxxas Rustler Review video"></button>
            </div>
            <h3>Traxxas Rustler Review</h3>
            <p>Detailed review and performance testing</p>
            <span class="video-category">Vehicle Reviews</span>
            <div class="video-info">
              <div class="video-date">Jan 20, 2025</div>
              <div class="video-views">5.2K views</div>
            </div>
          </div>
  
          <div class="video-card" data-category="tutorials">
            <div class="video-wrapper">
              <img src="/assets/images/videos/thumb5.jpg" alt="RC Racing Tips for Beginners thumbnail" class="video-thumbnail">
              <iframe 
                data-src="https://www.youtube.com/embed/VIDEO_ID_5" 
                title="RC Racing Tips for Beginners"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
              <button class="play-button" aria-label="Play RC Racing Tips for Beginners video"></button>
            </div>
            <h3>RC Racing Tips for Beginners</h3>
            <p>Essential tips and tricks for new racers</p>
            <span class="video-category">Tutorials</span>
            <div class="video-info">
              <div class="video-date">Jan 15, 2025</div>
              <div class="video-views">7.1K views</div>
            </div>
          </div>
  
          <div class="video-card" data-category="race-highlights">
            <div class="video-wrapper">
              <img src="/assets/images/videos/thumb6.jpg" alt="Track Day Highlights thumbnail" class="video-thumbnail">
              <iframe 
                data-src="https://www.youtube.com/embed/VIDEO_ID_6" 
                title="Track Day Highlights"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
              <button class="play-button" aria-label="Play Track Day Highlights video"></button>
            </div>
            <h3>Track Day Highlights</h3>
            <p>Best moments from our weekly track day</p>
            <span class="video-category">Race Highlights</span>
            <div class="video-info">
              <div class="video-date">Jan 08, 2025</div>
              <div class="video-views">1.9K views</div>
            </div>
          </div>
        </div>
  
        <section class="load-more fade-in-section">
          <button id="load-more-videos" class="cta-button">Load More Videos</button>
        </section>
      </main>
    `;
  }
  
  /**
   * Initialize the videos page
   * Called after the page is rendered
   */
  export function init() {
    // Initialize tab filtering
    initializeVideoTabs();
    
    // Initialize video lazy loading
    initializeVideoLazyLoading();
    
    // Initialize load more functionality
    initializeLoadMore();
    
    // Initialize video search functionality
    initializeVideoSearch();
    
    // Initialize keyboard navigation
    initializeKeyboardNavigation();
    
    // Initialize animations if available
    if (window.AnimationController) {
      window.AnimationController.initScrollAnimations();
    }
  }
  
  /**
   * Initialize video category tabs
   */
  function initializeVideoTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const videoCards = document.querySelectorAll('.video-card');
    
    if (tabButtons.length === 0 || videoCards.length === 0) return;
    
    let currentCategory = 'all';
    
    /**
     * Filter videos by category
     * @param {string} category - Category to filter by
     */
    const filterVideos = (category) => {
      // Show loading indicator if available
      if (window.Utilities && window.Utilities.showLoading) {
        window.Utilities.showLoading();
      }
      
      setTimeout(() => {
        let visibleCount = 0;
        
        videoCards.forEach(card => {
          const videoCategory = card.querySelector('.video-category').textContent.toLowerCase();
          
          if (category === 'all' || videoCategory.includes(category.toLowerCase())) {
            card.style.display = 'block';
            card.classList.add('fade-in');
            visibleCount++;
          } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
          }
        });
        
        // Update results count
        updateVideoCount(visibleCount);
        
        // Hide loading indicator if available
        if (window.Utilities && window.Utilities.hideLoading) {
          window.Utilities.hideLoading();
        }
        
        // Show/hide no results message
        toggleNoResultsMessage(visibleCount === 0);
      }, 300);
    };
    
    // Tab button click handlers
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Skip if already on this category
        if (currentCategory === button.dataset.category) return;
        
        // Update active tab
        tabButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        
        // Filter videos
        currentCategory = button.dataset.category;
        filterVideos(currentCategory);
        
        // Scroll to video grid if not in view
        const videoGrid = document.querySelector('.video-grid');
        const rect = videoGrid.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
          videoGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
    
    // Check URL for category parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
      // Find matching tab button
      const matchingButton = Array.from(tabButtons).find(
        button => button.dataset.category.toLowerCase() === categoryParam.toLowerCase()
      );
      
      if (matchingButton) {
        matchingButton.click();
      }
    }
  }
  
  /**
   * Initialize lazy loading for video iframes
   */
  function initializeVideoLazyLoading() {
    // Only use IntersectionObserver if available in browser
    if ('IntersectionObserver' in window) {
      const videoObserverOptions = {
        root: null,
        rootMargin: '200px', // Load videos before they come into view
        threshold: 0
      };
      
      const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const videoWrapper = entry.target;
            const iframe = videoWrapper.querySelector('iframe');
            
            // Replace thumbnail with iframe
            if (iframe.dataset.src) {
              iframe.src = iframe.dataset.src;
              iframe.removeAttribute('data-src');
              
              // Add loaded class for animations
              videoWrapper.classList.add('loaded');
            }
            
            observer.unobserve(videoWrapper);
          }
        });
      }, videoObserverOptions);
      
      // Observe all video wrappers
      document.querySelectorAll('.video-wrapper').forEach(wrapper => {
        videoObserver.observe(wrapper);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('.video-wrapper iframe').forEach(iframe => {
        if (iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
          iframe.removeAttribute('data-src');
        }
      });
    }
  }
  
  /**
   * Initialize load more videos functionality
   */
  function initializeLoadMore() {
    const loadMoreButton = document.getElementById('load-more-videos');
    if (!loadMoreButton) return;
    
    loadMoreButton.addEventListener('click', async () => {
      try {
        // Update button state
        loadMoreButton.disabled = true;
        loadMoreButton.innerHTML = '<span class="loading-spinner"></span> Loading...';
        
        // Show loading indicator if available
        if (window.Utilities && window.Utilities.showLoading) {
          window.Utilities.showLoading();
        }
        
        // Simulated API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Example new videos data (in production, would come from API)
        const newVideos = [
          {
            videoId: 'VIDEO_ID_7',
            title: 'Advanced Racing Techniques',
            description: 'Master the art of RC racing with these professional tips',
            category: 'Tutorials',
            thumbnail: '/assets/images/videos/thumb7.jpg'
          },
          {
            videoId: 'VIDEO_ID_8',
            title: 'Traxxas X-Maxx Review',
            description: 'Comprehensive review of the ultimate monster truck',
            category: 'Vehicle Reviews',
            thumbnail: '/assets/images/videos/thumb8.jpg'
          },
          {
            videoId: 'VIDEO_ID_9',
            title: 'Summer Championship Highlights',
            description: 'Best moments from our summer racing championship',
            category: 'Race Highlights',
            thumbnail: '/assets/images/videos/thumb9.jpg'
          }
        ];
        
        // Create and append new video cards
        const videoGrid = document.querySelector('.video-grid');
        
        newVideos.forEach((video, index) => {
          // Create video card with delay for animation
          setTimeout(() => {
            const videoCard = createVideoCard(video);
            videoGrid.appendChild(videoCard);
            
            // Observe for lazy loading
            if ('IntersectionObserver' in window) {
              const videoObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    const iframe = entry.target.querySelector('iframe');
                    if (iframe && iframe.dataset.src) {
                      iframe.src = iframe.dataset.src;
                      iframe.removeAttribute('data-src');
                    }
                    observer.unobserve(entry.target);
                  }
                });
              }, { rootMargin: '200px' });
              
              videoObserver.observe(videoCard.querySelector('.video-wrapper'));
            }
            
            // Add fade-in animation
            setTimeout(() => {
              videoCard.classList.add('fade-in');
            }, 50);
          }, index * 150);
        });
        
        // Hide loading indicator if available
        if (window.Utilities && window.Utilities.hideLoading) {
          window.Utilities.hideLoading();
        }
        
        // Update button state
        loadMoreButton.disabled = false;
        loadMoreButton.textContent = 'Load More Videos';
        
        // Update video count
        updateVideoCount();
        
        // Check if we should hide load more button (example: after 3 pages)
        const currentPage = parseInt(loadMoreButton.dataset.page || '1');
        loadMoreButton.dataset.page = (currentPage + 1).toString();
        
        if (currentPage + 1 >= 3) {
          loadMoreButton.style.display = 'none';
        }
        
      } catch (error) {
        console.error('Error loading more videos:', error);
        
        // Hide loading indicator if available
        if (window.Utilities && window.Utilities.hideLoading) {
          window.Utilities.hideLoading();
        }
        
        // Reset button on error
        loadMoreButton.disabled = false;
        loadMoreButton.textContent = 'Try Again';
      }
    });
  }
  
  /**
   * Create a video card element
   * @param {Object} video - Video data
   * @returns {HTMLElement} - Video card element
   */
  function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.dataset.category = video.category.toLowerCase().replace(/\s+/g, '-');
    
    // Use thumbnail first, then replace with iframe when in view
    const thumbnailHtml = video.thumbnail 
      ? `<img src="${video.thumbnail}" alt="${video.title} thumbnail" class="video-thumbnail" loading="lazy">` 
      : '';
    
    card.innerHTML = `
      <div class="video-wrapper">
        ${thumbnailHtml}
        <iframe 
          data-src="https://www.youtube.com/embed/${video.videoId}" 
          title="${video.title}"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
        <button class="play-button" aria-label="Play ${video.title} video"></button>
      </div>
      <h3>${video.title}</h3>
      <p>${video.description}</p>
      <span class="video-category">${video.category}</span>
      <div class="video-info">
        <div class="video-date">Mar 8, 2025</div>
        <div class="video-views">0 views</div>
      </div>
    `;
    
    // Add event listener to play button
    const playButton = card.querySelector('.play-button');
    if (playButton) {
      playButton.addEventListener('click', () => {
        const wrapper = playButton.closest('.video-wrapper');
        const iframe = wrapper.querySelector('iframe');
        if (iframe && iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
          iframe.removeAttribute('data-src');
        }
        wrapper.classList.add('playing');
      });
    }
    
    return card;
  }
  
  /**
   * Initialize video search functionality
   */
  function initializeVideoSearch() {
    const searchForm = document.querySelector('.video-search-form');
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const searchInput = searchForm.querySelector('input[type="search"]');
      if (!searchInput) return;
      
      const searchTerm = searchInput.value.trim().toLowerCase();
      if (searchTerm === '') return;
      
      searchVideos(searchTerm);
    });
  }
  
  /**
   * Search videos by title, description, or category
   * @param {string} searchTerm - Search term
   */
  function searchVideos(searchTerm) {
    const videoCards = document.querySelectorAll('.video-card');
    if (videoCards.length === 0) return;
    
    // Show loading indicator if available
    if (window.Utilities && window.Utilities.showLoading) {
      window.Utilities.showLoading();
    }
    
    // Clear active tab
    document.querySelectorAll('.tab-button').forEach(button => {
      button.classList.remove('active');
      button.setAttribute('aria-selected', 'false');
    });
    
    // Set "All" tab as active
    const allTab = document.querySelector('.tab-button[data-category="all"]');
    if (allTab) {
      allTab.classList.add('active');
      allTab.setAttribute('aria-selected', 'true');
    }
    
    setTimeout(() => {
      let visibleCount = 0;
      
      videoCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const category = card.querySelector('.video-category').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
          card.style.display = 'block';
          card.classList.add('search-match');
          card.classList.add('fade-in');
          visibleCount++;
        } else {
          card.style.display = 'none';
          card.classList.remove('search-match');
          card.classList.remove('fade-in');
        }
      });
      
      // Update results count
      updateVideoCount(visibleCount);
      
      // Hide loading indicator if available
      if (window.Utilities && window.Utilities.hideLoading) {
        window.Utilities.hideLoading();
      }
      
      // Show/hide no results message
      toggleNoResultsMessage(visibleCount === 0, searchTerm);
      
      // Show search results message
      const searchResultsMessage = document.querySelector('.search-results-message');
      if (searchResultsMessage) {
        searchResultsMessage.textContent = `Found ${visibleCount} ${visibleCount === 1 ? 'result' : 'results'} for "${searchTerm}"`;
        searchResultsMessage.style.display = 'block';
      } else {
        const message = document.createElement('div');
        message.className = 'search-results-message';
        message.textContent = `Found ${visibleCount} ${visibleCount === 1 ? 'result' : 'results'} for "${searchTerm}"`;
        
        const videoGrid = document.querySelector('.video-grid');
        if (videoGrid) {
          videoGrid.insertAdjacentElement('beforebegin', message);
        }
      }
    }, 300);
  }
  
  /**
   * Initialize keyboard navigation for video grid
   */
  function initializeKeyboardNavigation() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
      // Make video cards focusable
      card.setAttribute('tabindex', '0');
      
      // Handle keyboard selection
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          // Play video
          const playButton = card.querySelector('.play-button');
          if (playButton) {
            playButton.click();
          }
        }
      });
    });
  }
  
  /**
   * Update video count display
   * @param {number} count - Number of visible videos
   */
  function updateVideoCount(count) {
    const countElement = document.querySelector('.video-count');
    if (!countElement) return;
    
    if (count === undefined) {
      // Count visible videos
      const visibleVideos = document.querySelectorAll('.video-card[style="display: block;"], .video-card:not([style*="display: none;"])');
      count = visibleVideos.length;
    }
    
    countElement.textContent = count;
    
    // Update text (singular vs plural)
    const videosText = document.querySelector('.videos-text');
    if (videosText) {
      videosText.textContent = count === 1 ? 'video' : 'videos';
    }
  }
  
  /**
   * Toggle no results message
   * @param {boolean} show - Whether to show the message
   * @param {string} searchTerm - Search term (for search results)
   */
  function toggleNoResultsMessage(show, searchTerm = '') {
    let noResults = document.querySelector('.no-results');
    
    if (show) {
      if (!noResults) {
        noResults = document.createElement('div');
        noResults.className = 'no-results';
        
        const videoGrid = document.querySelector('.video-grid');
        if (videoGrid) {
          videoGrid.appendChild(noResults);
        }
      }
      
      if (searchTerm) {
        noResults.innerHTML = `
          <p>No videos found matching "${searchTerm}".</p>
          <button class="reset-search">Clear Search</button>
        `;
        
        noResults.querySelector('.reset-search').addEventListener('click', () => {
          // Reset search
          const searchInput = document.querySelector('.video-search-form input[type="search"]');
          if (searchInput) {
            searchInput.value = '';
          }
          
          // Show all videos and reset tabs
          const allTab = document.querySelector('.tab-button[data-category="all"]');
          if (allTab) {
            allTab.click();
          }
          
          // Hide search results message
          const searchResultsMessage = document.querySelector('.search-results-message');
          if (searchResultsMessage) {
            searchResultsMessage.style.display = 'none';
          }
        });
      } else {
        noResults.innerHTML = `
          <p>No videos found in this category.</p>
          <button class="show-all-videos">Show All Videos</button>
        `;
        
        noResults.querySelector('.show-all-videos').addEventListener('click', () => {
          const allTab = document.querySelector('.tab-button[data-category="all"]');
          if (allTab) {
            allTab.click();
          }
        });
      }
      
      noResults.style.display = 'block';
    } else if (noResults) {
      noResults.style.display = 'none';
    }
  }