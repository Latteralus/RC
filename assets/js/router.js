/**
 * Router Class
 * Handles SPA (Single Page Application) routing for Aubrey's RC Cars website
 */
class Router {
    constructor() {
        // Define routes and their corresponding templates and metadata
        this.routes = {
            '/': { 
                title: 'Home',
                description: 'Aubrey\'s RC Cars offers high-quality remote control cars, custom builds, racing events, and expert advice for RC enthusiasts of all levels.',
                template: '/templates/home.js',
                scripts: ['/assets/js/main.js'],
                activeNav: 'home'
            },
            '/products': {
                title: 'Shop RC Cars, Trucks & Buggies',
                description: 'Shop for high-quality RC cars, trucks, and buggies at Aubrey\'s RC Cars. Wide selection of brands including Traxxas, Arrma, and Losi.',
                template: '/templates/products.js',
                scripts: ['/assets/js/main.js', '/assets/js/products.js'],
                activeNav: 'shop'
            },
            '/custom': {
                title: 'Custom RC Builds',
                description: 'Custom RC car building services from Aubrey\'s RC Cars. Get your personalized, high-performance remote control vehicle built by experts.',
                template: '/templates/custom.js',
                scripts: ['/assets/js/main.js'],
                activeNav: 'custom'
            },
            '/videos': {
                title: 'RC Racing Videos',
                description: 'Watch RC racing videos, tutorials, and highlights from Aubrey\'s RC Cars events and competitions.',
                template: '/templates/videos.js',
                scripts: ['/assets/js/main.js', '/assets/js/videos.js'],
                activeNav: 'media'
            },
            '/racing': {
                title: 'RC Racing Events',
                description: 'Join our RC racing events and competitions. Find schedule, tracks, and rules for remote control car racing.',
                template: '/templates/racing.js',
                scripts: ['/assets/js/main.js'],
                activeNav: 'racing'
            },
            '/contact': {
                title: 'Contact Us',
                description: 'Contact Aubrey\'s RC Cars for information about products, custom builds, or racing events. Visit our shop or send us a message.',
                template: '/templates/contact.js',
                scripts: ['/assets/js/main.js', '/assets/js/contact.js'],
                activeNav: 'contact'
            }
        };
        
        // Keep track of currently loaded scripts to avoid duplicates
        this.loadedScripts = new Set();
        
        // Store current route
        this.currentRoute = null;
    }
    
    /**
     * Initialize the router
     */
    init() {
        // Handle browser back/forward navigation
        window.addEventListener('popstate', () => this.render());
        
        // Intercept link clicks for SPA navigation
        document.addEventListener('click', e => {
            // Find closest anchor tag if the click was on a child element
            const anchor = e.target.closest('a');
            
            if (!anchor) return;
            
            // Only intercept links to our own domain that aren't external links
            const isSameDomain = anchor.href.startsWith(window.location.origin);
            const isExternalLink = anchor.hasAttribute('target') && anchor.getAttribute('target') === '_blank';
            const isDownload = anchor.hasAttribute('download');
            
            if (isSameDomain && !isExternalLink && !isDownload) {
                e.preventDefault();
                
                // Get the path from the href
                const url = new URL(anchor.href);
                const path = url.pathname;
                
                // Only navigate if it's a different path
                if (path !== window.location.pathname) {
                    window.history.pushState({}, '', path);
                    this.render();
                }
            }
        });
        
        // Initial render based on current URL
        this.render();
    }
    
    /**
     * Render the current route
     */
    async render() {
        // Get the current path
        const path = window.location.pathname;
        
        // Find the matching route or default to home
        let route = this.routes[path];
        
        // Handle routes with parameters or nested routes
        if (!route) {
            // Check for parent routes (e.g., /products/category would match /products)
            for (const [routePath, routeData] of Object.entries(this.routes)) {
                if (path.startsWith(routePath) && routePath !== '/') {
                    route = {...routeData};
                    break;
                }
            }
            
            // If still no match, use home as fallback
            if (!route) {
                route = this.routes['/'];
            }
        }
        
        // Update the page title and meta description
        document.title = `Aubrey's RC Cars - ${route.title}`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', route.description);
        }
        
        // Show loading indicator
        const contentArea = document.getElementById('content');
        contentArea.innerHTML = `
            <div class="page-loading">
                <div class="loader"></div>
                <p>Loading...</p>
            </div>
        `;
        
        try {
            // Load and render the template
            const templateModule = await this.loadTemplate(route.template);
            
            // Update the content
            contentArea.innerHTML = templateModule.default();
            
            // Update navigation highlight
            this.updateActiveNavigation(route.activeNav);
            
            // Load page-specific scripts
            if (route.scripts && route.scripts.length > 0) {
                await this.loadScripts(route.scripts);
            }
            
            // Run the template's initialization code if it exists
            if (templateModule.init) {
                templateModule.init();
            }
            
            // Scroll to top of page (or to anchor if specified in the URL)
            const hash = window.location.hash;
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({behavior: 'smooth'});
                } else {
                    window.scrollTo(0, 0);
                }
            } else {
                window.scrollTo(0, 0);
            }
            
            // Store current route
            this.currentRoute = route;
            
        } catch (error) {
            console.error('Error loading page:', error);
            contentArea.innerHTML = `
                <div class="error-container">
                    <h1>Page Not Found</h1>
                    <p>Sorry, the page you requested could not be found.</p>
                    <a href="/" class="cta-button">Return to Home</a>
                </div>
            `;
        }
    }
    
    /**
     * Update navigation highlight based on active route
     * @param {string} activeNav - The active navigation item key
     */
    updateActiveNavigation(activeNav) {
        // Clear existing active classes
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        
        // Set active class for current page
        if (activeNav) {
            const activeLink = document.querySelector(`.nav-links a[href^="/${activeNav === 'home' ? '' : activeNav}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.setAttribute('aria-current', 'page');
            }
        }
    }
    
    /**
     * Dynamically load a template module
     * @param {string} templatePath - Path to the template JS file
     * @returns {Promise<Object>} - The imported template module
     */
    async loadTemplate(templatePath) {
        try {
            // Dynamic import for the template
            return await import(templatePath);
        } catch (error) {
            console.error(`Failed to load template: ${templatePath}`, error);
            throw new Error(`Template not found: ${templatePath}`);
        }
    }
    
    /**
     * Load scripts needed for the current page
     * @param {Array<string>} scripts - Array of script paths to load
     * @returns {Promise<void>}
     */
    async loadScripts(scripts) {
        const promises = [];
        
        for (const scriptPath of scripts) {
            // Skip already loaded scripts
            if (this.loadedScripts.has(scriptPath)) {
                continue;
            }
            
            // Create a promise for script loading
            const promise = new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = scriptPath;
                script.async = true;
                
                script.onload = () => {
                    this.loadedScripts.add(scriptPath);
                    resolve();
                };
                
                script.onerror = () => {
                    reject(new Error(`Failed to load script: ${scriptPath}`));
                };
                
                document.body.appendChild(script);
            });
            
            promises.push(promise);
        }
        
        // Wait for all scripts to load
        await Promise.all(promises);
    }
}