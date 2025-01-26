document.addEventListener('DOMContentLoaded', () => {
    // Video filtering functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const videoCards = document.querySelectorAll('.video-card');
    let currentCategory = 'all';

    const filterVideos = (category) => {
        videoCards.forEach(card => {
            const videoCategory = card.querySelector('.video-category').textContent.toLowerCase();
            if (category === 'all' || videoCategory.includes(category.toLowerCase())) {
                card.style.display = 'block';
                // Add fade-in animation
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });
    };

    // Tab button click handlers
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter videos
            currentCategory = button.dataset.category;
            filterVideos(currentCategory);
        });
    });

    // Load more functionality
    const loadMoreButton = document.getElementById('load-more-videos');
    let currentPage = 1;
    const videosPerPage = 6;

    const loadMoreVideos = async () => {
        try {
            // Simulate loading new videos (in production, this would fetch from an API)
            loadMoreButton.textContent = 'Loading...';
            
            // Simulated API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Example of how to add new videos (would normally come from API)
            const newVideos = [
                {
                    videoId: 'VIDEO_ID_7',
                    title: 'Advanced Racing Techniques',
                    description: 'Master the art of RC racing',
                    category: 'Tutorials'
                },
                // Add more video objects as needed
            ];

            // Create and append new video cards
            newVideos.forEach(video => {
                const videoCard = createVideoCard(video);
                document.querySelector('.video-grid').appendChild(videoCard);
            });

            // Update current page
            currentPage++;

            // Hide load more button if no more videos (example condition)
            if (currentPage >= 3) {
                loadMoreButton.style.display = 'none';
            }

            // Reapply current filter
            filterVideos(currentCategory);
            
            loadMoreButton.textContent = 'Load More Videos';
        } catch (error) {
            console.error('Error loading more videos:', error);
            loadMoreButton.textContent = 'Error Loading Videos';
        }
    };

    // Create video card element
    const createVideoCard = (video) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="video-wrapper">
                <iframe 
                    src="https://www.youtube.com/embed/${video.videoId}" 
                    title="${video.title}"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <span class="video-category">${video.category}</span>
        `;
        return card;
    };

    // Add load more button click handler
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', loadMoreVideos);
    }

    // Initialize Intersection Observer for lazy loading iframes
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                // Only load video when it comes into view
                const videoSrc = iframe.dataset.src;
                if (videoSrc) {
                    iframe.src = videoSrc;
                    iframe.removeAttribute('data-src');
                }
                observer.unobserve(iframe);
            }
        });
    }, observerOptions);

    // Observe all video iframes
    document.querySelectorAll('.video-wrapper iframe').forEach(iframe => {
        // Store the src in data-src and remove the src attribute
        iframe.dataset.src = iframe.src;
        iframe.removeAttribute('src');
        videoObserver.observe(iframe);
    });

    // Add smooth scrolling for category changes
    const scrollToVideos = () => {
        const videoGrid = document.querySelector('.video-grid');
        videoGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', scrollToVideos);
    });
});