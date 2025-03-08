/**
 * TopBar Integration with SPA Router
 * This module initializes the TopBar and integrates it with the Router
 */

/**
 * Initialize the TopBar and integrate with the Router
 * @param {Object} router - The SPA router instance
 */
export function initializeTopBar(router) {
    // Create and render the TopBar
    const topBar = new TopBar();
    topBar.render();
    
    // Store the topBar instance globally for use in components
    window.topBar = topBar;
    
    // Integrate with router if provided
    if (router) {
        integrateWithRouter(topBar, router);
    } else {
        // If no router is provided, set up for hash-based navigation
        setupHashBasedNavigation(topBar);
    }
    
    return topBar;
}

/**
 * Set up hash-based navigation for the TopBar when no router is available
 * @param {TopBar} topBar - The TopBar instance
 */
function setupHashBasedNavigation(topBar) {
    // Listen for hash changes to update the active navigation
    window.addEventListener('hashchange', () => {
        topBar.highlightCurrentPage();
        
        // Close mobile navigation, cart preview, and search if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('nav-open')) {
            navLinks.classList.remove('nav-open');
            const mobileNavButton = document.querySelector('.mobile-nav-toggle');
            if (mobileNavButton) {
                mobileNavButton.classList.remove('nav-open');
                mobileNavButton.setAttribute('aria-expanded', 'false');
            }
        }
        
        if (topBar.isCartOpen) {
            topBar.closeCartPreview();
        }
        
        topBar.closeSearch();
    });
    
    // Override navigation links to use hash-based navigation
    document.querySelectorAll('.nav-links a, .logo a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle internal links
            if (href && (href.startsWith('/') || href === '/')) {
                e.preventDefault();
                
                // Convert path to hash
                const hashPath = href === '/' ? '#/' : `#${href}`;
                window.location.hash = hashPath;
            }
        });
    });
    
    // Handle search form submission with hash-based navigation
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchInput = searchForm.querySelector('input[type="search"]');
            if (searchInput && searchInput.value.trim()) {
                window.location.hash = `#/search?q=${encodeURIComponent(searchInput.value.trim())}`;
                topBar.closeSearch();
            }
        });
    }
}

/**
 * Integrate TopBar with the Router
 * @param {TopBar} topBar - The TopBar instance
 * @param {Object} router - The SPA router instance
 */
function integrateWithRouter(topBar, router) {
    // Subscribe to router navigation events
    if (router.onNavigate) {
        router.onNavigate((route) => {
            // Update the active navigation item
            topBar.highlightCurrentPage();
            
            // Close mobile menu, cart preview, and search when route changes
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('nav-open')) {
                navLinks.classList.remove('nav-open');
                const mobileNavButton = document.querySelector('.mobile-nav-toggle');
                if (mobileNavButton) {
                    mobileNavButton.classList.remove('nav-open');
                    mobileNavButton.setAttribute('aria-expanded', 'false');
                }
            }
            
            // Close cart preview if open
            if (topBar.isCartOpen) {
                topBar.closeCartPreview();
            }
            
            // Close search
            topBar.closeSearch();
        });
    }
    
    // Override the navigation links to use the router
    document.querySelectorAll('.nav-links a, .logo a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle internal links
            if (href && (href.startsWith('/') || href === '/')) {
                e.preventDefault();
                
                // Use router to navigate
                router.navigate(href);
            }
        });
    });
    
    // Handle search form submission with router
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchInput = searchForm.querySelector('input[type="search"]');
            if (searchInput && searchInput.value.trim()) {
                router.navigate(`/search?q=${encodeURIComponent(searchInput.value.trim())}`);
                topBar.closeSearch();
            }
        });
    }
    
    // Make router available to the TopBar
    topBar.router = router;
}