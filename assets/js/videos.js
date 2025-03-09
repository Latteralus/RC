/**
 * videos.js - Media gallery functionality for Aubrey's RC website
 * Part of the simplified file structure approach for www.aubreysrc.com
 */

class MediaGallery {
    constructor() {
        // DOM Elements
        this.mediaGrid = document.querySelector('.media-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.videoLightbox = document.getElementById('video-lightbox');
        this.imageLightbox = document.getElementById('image-lightbox');
        this.loadMoreBtn = document.getElementById('load-more-btn');
        
        // Video sources for the demo videos
        this.videoSources = {
            'Iowa RC Speedway Championship': 'https://www.youtube.com/embed/fn02DjC0gok',
            'Custom Build: Monster Truck Modification': 'https://www.youtube.com/embed/fn02DjC0gok',
            'RC Dragstrip Showdown': 'https://www.youtube.com/embed/fn02DjC0gok',
            'Rock Crawler in Action': 'https://www.youtube.com/embed/fn02DjC0gok'
        };
        
        // Pagination variables
        this.itemsPerPage = 6;
        this.currentPage = 1;
        this.totalPages = Math.ceil(document.querySelectorAll('.media-item').length / this.itemsPerPage);
        this.activeFilter = 'all';
        
        // Initialize gallery functionality
        this.initialize();
    }
    
    initialize() {
        // Hide items beyond first page
        this.updateVisibleItems();
        
        // Attach event listeners
        this.attachEventListeners();
        
        // Check if load more button should be visible
        this.updateLoadMoreButton();
    }
    
    attachEventListeners() {
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Apply filter
                this.applyFilter(button.dataset.filter);
            });
        });
        
        // Video items click
        document.querySelectorAll('.video-item .media-thumbnail').forEach(item => {
            item.addEventListener('click', (e) => {
                // Get the video title
                const videoTitle = e.currentTarget.closest('.media-item').querySelector('h3').textContent;
                
                // Open lightbox with the corresponding video
                this.openVideoLightbox(this.videoSources[videoTitle]);
            });
        });
        
        // Image items click
        document.querySelectorAll('.image-item .media-thumbnail').forEach(item => {
            item.addEventListener('click', (e) => {
                // Get the image source
                const imageSource = e.currentTarget.querySelector('img').src;
                
                // Open lightbox with the image
                this.openImageLightbox(imageSource);
            });
        });
        
        // Close lightbox buttons
        document.querySelectorAll('.close-lightbox').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.closeLightboxes();
            });
        });
        
        // Close lightbox on overlay click
        this.videoLightbox.addEventListener('click', (e) => {
            if (e.target === this.videoLightbox) {
                this.closeLightboxes();
            }
        });
        
        this.imageLightbox.addEventListener('click', (e) => {
            if (e.target === this.imageLightbox) {
                this.closeLightboxes();
            }
        });
        
        // Close lightbox on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightboxes();
            }
        });
        
        // Load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadMore();
            });
        }
    }
    
    applyFilter(filter) {
        // Reset pagination
        this.currentPage = 1;
        this.activeFilter = filter;
        
        // Show/hide items based on filter
        const mediaItems = document.querySelectorAll('.media-item');
        
        mediaItems.forEach(item => {
            const categories = item.dataset.category ? item.dataset.category.split(' ') : [];
            
            if (filter === 'all' || categories.includes(filter)) {
                item.style.display = '';
                item.classList.remove('filtered-out');
            } else {
                item.style.display = 'none';
                item.classList.add('filtered-out');
            }
        });
        
        // Update visible items
        this.updateVisibleItems();
        
        // Check if load more button should be visible
        this.updateLoadMoreButton();
    }
    
    updateVisibleItems() {
        // Get all items that match the current filter
        const filteredItems = this.activeFilter === 'all' 
            ? document.querySelectorAll('.media-item')
            : document.querySelectorAll(`.media-item[data-category*="${this.activeFilter}"]`);
        
        // Calculate pagination
        const startIndex = 0;
        const endIndex = this.currentPage * this.itemsPerPage;
        
        // Show/hide items based on pagination
        Array.from(filteredItems).forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    loadMore() {
        this.currentPage++;
        this.updateVisibleItems();
        this.updateLoadMoreButton();
    }
    
    updateLoadMoreButton() {
        // Count visible items after filtering
        const filteredItems = this.activeFilter === 'all' 
            ? document.querySelectorAll('.media-item')
            : document.querySelectorAll(`.media-item[data-category*="${this.activeFilter}"]`);
        
        // Calculate if there are more pages
        const totalItems = filteredItems.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        
        // Show/hide load more button
        if (this.currentPage >= totalPages) {
            this.loadMoreBtn.style.display = 'none';
        } else {
            this.loadMoreBtn.style.display = 'block';
        }
    }
    
    openVideoLightbox(videoSrc) {
        // Create iframe for video
        const iframe = document.createElement('iframe');
        iframe.src = videoSrc;
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('frameborder', '0');
        
        // Clear previous content and add iframe
        const videoContainer = this.videoLightbox.querySelector('.video-container');
        videoContainer.innerHTML = '';
        videoContainer.appendChild(iframe);
        
        // Show lightbox
        this.videoLightbox.classList.add('active');
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }
    
    openImageLightbox(imageSrc) {
        // Create image element
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Full size image';
        
        // Clear previous content and add image
        const imageContainer = this.imageLightbox.querySelector('.image-container');
        imageContainer.innerHTML = '';
        imageContainer.appendChild(img);
        
        // Show lightbox
        this.imageLightbox.classList.add('active');
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }
    
    closeLightboxes() {
        // Hide lightboxes
        this.videoLightbox.classList.remove('active');
        this.imageLightbox.classList.remove('active');
        
        // Clear content after transition
        setTimeout(() => {
            const videoContainer = this.videoLightbox.querySelector('.video-container');
            const imageContainer = this.imageLightbox.querySelector('.image-container');
            
            if (videoContainer) videoContainer.innerHTML = '';
            if (imageContainer) imageContainer.innerHTML = '';
        }, 300);
        
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Initialize media gallery when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.mediaGallery = new MediaGallery();
});