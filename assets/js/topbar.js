class TopBar {
    constructor() {
        this.cartCount = 0;
        this.template = `
            <header class="main-header">
                <nav class="nav-container">
                    <div class="logo">
                        <h1><a href="index.html">Aubrey's RC Cars</a></h1>
                    </div>
                    <ul class="nav-links">
                        <li><a href="products/index.html">Shop</a></li>
                        <li><a href="custom/index.html">Custom Builds</a></li>
                        <li><a href="videos.html">Media</a></li>
                        <li><a href="racing/index.html">Racing</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                    <div class="cart-icon">
                        <span class="cart-count">0</span>
                        <img src="/assets/images/cart.svg" alt="Shopping Cart">
                    </div>
                </nav>
            </header>
        `;
        this.isMobile = window.innerWidth < 768;
        this.handleResize = this.handleResize.bind(this);
    }

    highlightCurrentPage() {
        const currentURL = new URL(window.location.href);
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            const linkURL = new URL(link.href, window.location.origin);
            if (linkURL.pathname === currentURL.pathname) {
                link.classList.add('active');
            }
        });
    }

    updateCartCount(count) {
        this.cartCount = count;
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = this.cartCount;
            cartCountElement.classList.add('cart-update');
            setTimeout(() => {
                cartCountElement.classList.remove('cart-update');
            }, 300);
        }
    }

    createMobileNav() {
        if (this.isMobile && !document.querySelector('.mobile-nav-toggle')) {
            const nav = document.querySelector('.nav-links');
            const mobileNavButton = document.createElement('button');
            mobileNavButton.classList.add('mobile-nav-toggle');
            mobileNavButton.innerHTML = '<span class="hamburger"></span>';
            
            document.querySelector('.nav-container').prepend(mobileNavButton);

            mobileNavButton.addEventListener('click', () => {
                nav.classList.toggle('nav-open');
                mobileNavButton.classList.toggle('nav-open');
            });
        }
    }

    handleResize() {
        const wasNotMobile = !this.isMobile;
        this.isMobile = window.innerWidth < 768;
        
        if (this.isMobile && wasNotMobile) {
            this.createMobileNav();
        } else if (!this.isMobile) {
            const mobileNavButton = document.querySelector('.mobile-nav-toggle');
            if (mobileNavButton) {
                mobileNavButton.remove();
                document.querySelector('.nav-links').classList.remove('nav-open');
            }
        }
    }

    render() {
        // Insert template into page
        document.body.insertAdjacentHTML('afterbegin', this.template);
        
        // Setup event listeners
        window.addEventListener('resize', this.handleResize);
        this.createMobileNav();
        
        // Initialize current page highlight
        this.highlightCurrentPage();
        
        // Setup cart functionality
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', () => {
                // TODO: Implement cart preview/checkout
                console.log('Cart clicked');
            });
        }
    }

    cleanup() {
        // Remove event listeners on cleanup
        window.removeEventListener('resize', this.handleResize);
    }
}