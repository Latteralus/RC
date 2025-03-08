# Top Bar Modularization Architecture Plan

## Current State
The website currently implements the top navigation bar by duplicating HTML markup across all pages. This includes:
- Logo/brand
- Navigation links
- Shopping cart icon with counter

## Proposed Architecture

### 1. Component Structure
Create a new `topbar.js` that will:
- Define the top bar HTML structure as a template
- Handle dynamic insertion into the page
- Manage cart state
- Handle path-aware navigation highlighting

### 2. Implementation Steps

#### Create TopBar Component (`assets/js/topbar.js`)
```javascript
class TopBar {
    constructor() {
        this.cartCount = 0;
        this.template = `
            <header class="main-header">
                <nav class="nav-container">
                    <div class="logo">
                        <h1><a href="/index.html">Aubrey's RC Cars</a></h1>
                    </div>
                    <ul class="nav-links">
                        <li><a href="/products/index.html">Shop</a></li>
                        <li><a href="/custom/index.html">Custom Builds</a></li>
                        <li><a href="/videos.html">Media</a></li>
                        <li><a href="/racing/index.html">Racing</a></li>
                        <li><a href="/contact.html">Contact</a></li>
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
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
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
```

#### Modify HTML Files
Remove the header markup from all HTML files and add:
```html
<script src="/assets/js/topbar.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const topBar = new TopBar();
        topBar.render();
    });
</script>
```

### 3. Existing Functionality Integration

#### Cart System
The current implementation includes:
- Cart count state management
- Visual feedback animations
- Add to cart confirmation messages
- Event handling for cart updates

This functionality will be preserved and enhanced in the TopBar component by:
- Maintaining cart state in the TopBar class
- Providing public methods for cart updates
- Keeping existing animation classes
- Supporting cart interaction events

#### Mobile Navigation
Current mobile navigation features include:
- Responsive breakpoint at 768px
- Dynamic mobile menu toggle creation
- Smooth open/close animations
- Window resize handling

These features are integrated into the TopBar component through:
- Responsive state management
- Automatic mobile navigation creation/cleanup
- Preserved CSS classes for animations
- Efficient resize event handling with cleanup

### 4. Benefits
- Reduced code duplication
- Centralized management of navigation
- Consistent user experience
- Easier maintenance and updates
- Single source of truth for top bar structure
- Improved state management
- Better code organization
- Enhanced maintainability
- Proper cleanup of event listeners

### 5. Implementation Order
1. Create `topbar.js` with basic structure
2. Test on index.html
3. Add dynamic page highlighting
4. Implement cart functionality
5. Update remaining pages
6. Test across all pages
7. Add error handling and loading states

### 6. Technical Considerations
- Use absolute paths in navigation links
- Maintain CSS class names for styling consistency
- Consider adding loading state
- Handle JavaScript disabled gracefully
- Ensure proper event cleanup
- Preserve existing CSS animations and transitions
- Implement proper mobile navigation state management
- Handle edge cases (e.g., deep linking, browser back/forward)

### 7. Future Enhancements
- Add mobile menu functionality
- Implement cart preview dropdown
- Add animation transitions
- Consider using Web Components for better encapsulation
- Add cart persistence across page loads
- Implement cart item preview
- Add accessibility improvements
- Consider adding search functionality to navigation