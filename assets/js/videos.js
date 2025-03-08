/**
 * Enhanced Videos Page Functionality
 * Improved video filtering, lazy loading, and responsive video handling
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tab filtering
    initializeVideoTabs();
    
    // Initialize video lazy loading
    initializeVideoLazyLoading();
    
    // Initialize load more functionality
    initializeLoadMore();
    
    // Initialize video search functionality
    initializeVideoSearch();
    
    // Add keyboard navigation for video grid
    initializeKeyboardNavigation();
});

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
        // Show loading indicator
        showLoading();
        
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
            
            // Hide loading indicator
            hideLoading();
            
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
            
            // Update URL with category for bookmarking
            const url = new URL(window.location);
            if (currentCategory === 'all') {
                url.searchParams.delete('category');
            } else {
                url.searchParams.set('category', currentCategory);
            }
            window.history.replaceState({}, '', url);
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
    
    let currentPage = 1;
    const videosPerPage = 6;
    
    loadMoreButton.addEventListener('click', async () => {
        try {
            // Update button state
            loadMoreButton.disabled = true;
            loadMoreButton.innerHTML = '<span class="loading-spinner"></span> Loading...';
            
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
            
            // Update current page
            currentPage++;
            
            // Hide load more button if no more videos (example condition)
            if (currentPage >= 3) {
                loadMoreButton.style.display = 'none';
            } else {
                loadMoreButton.disabled = false;
                loadMoreButton.textContent = 'Load More Videos';
            }
            
            // Filter by current active category
            const activeTab = document.querySelector('.tab-button.active');
            if (activeTab) {
                const category = activeTab.dataset.category;
                if (category !== 'all') {
                    document.querySelectorAll('.video-card').forEach(card => {
                        const videoCategory = card.querySelector('.video-category').textContent.toLowerCase();
                        if (!videoCategory.includes(category.toLowerCase())) {
                            card.style.display = 'none';
                        }
                    });
                }
            }
            
            // Update video count
            updateVideoCount();
            
        } catch (error) {
            console.error('Error loading more videos:', error);
            
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
    
    // Use thumbnail first, then replace with iframe when in view
    const thumbnailHtml = video.thumbnail 
        ? `<img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail" loading="lazy">` 
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
            <button class="play-button" aria-label="Play video">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                    <path fill="#ffffff" d="M8 5v14l11-7z"/>
                </svg>
            </button>
        </div>
        <h3>${video.title}</h3>
        <p>${video.description}</p>
        <span class="video-category">${video.category}</span>
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
    
    // Show loading indicator
    showLoading();
    
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
        
        // Hide loading indicator
        hideLoading();
        
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
 * Show loading indicator
 */
function showLoading() {
    let loader = document.querySelector('.loading-indicator');
    
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'loading-indicator';
        loader.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loader);
    }
    
    loader.classList.add('active');
}

/**
 * Hide loading indicator
 */
function hideLoading() {
    const loader = document.querySelector('.loading-indicator');
    if (loader) {
        loader.classList.remove('active');
    }
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