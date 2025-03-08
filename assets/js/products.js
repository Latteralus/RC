/**
 * Enhanced Products Page Functionality
 * Provides advanced filtering, sorting, and product interaction
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize product filtering
    initializeFilters();
    
    // Initialize sorting functionality
    initializeSorting();
    
    // Initialize product view options (grid/list)
    initializeViewOptions();
    
    // Initialize product interactions (quick view, add to cart)
    initializeProductInteractions();
    
    // Initialize product count display
    updateProductCount();
});

/**
 * Initialize filter controls
 */
function initializeFilters() {
    const filterControls = document.querySelectorAll('.filter-controls select, .filter-controls input[type="checkbox"]');
    if (filterControls.length === 0) return;
    
    // Add data attributes to product cards for filtering
    addProductDataAttributes();
    
    // Add event listeners to filter controls
    filterControls.forEach(control => {
        control.addEventListener('change', () => {
            filterProducts();
        });
    });
    
    // Add reset filters button
    const filtersContainer = document.querySelector('.filter-controls');
    if (filtersContainer) {
        const resetButton = document.createElement('button');
        resetButton.className = 'reset-filters';
        resetButton.textContent = 'Reset Filters';
        resetButton.addEventListener('click', resetFilters);
        filtersContainer.appendChild(resetButton);
    }
    
    // Apply initial filtering (in case there are default selections)
    filterProducts();
}

/**
 * Add data attributes to product cards based on their properties
 */
function addProductDataAttributes() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Set product category
        if (!card.dataset.category) {
            const categoryText = card.querySelector('h3').textContent.toLowerCase();
            if (categoryText.includes('truck')) {
                card.dataset.category = 'trucks';
            } else if (categoryText.includes('buggy')) {
                card.dataset.category = 'buggies';
            } else {
                card.dataset.category = 'cars';
            }
        }
        
        // Set product brand
        if (!card.dataset.brand) {
            const titleText = card.querySelector('h3').textContent.toLowerCase();
            if (titleText.includes('traxxas')) {
                card.dataset.brand = 'traxxas';
            } else if (titleText.includes('arrma')) {
                card.dataset.brand = 'arrma';
            } else if (titleText.includes('losi')) {
                card.dataset.brand = 'losi';
            } else {
                card.dataset.brand = 'other';
            }
        }
        
        // Set product price
        if (!card.dataset.price) {
            const priceText = card.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            card.dataset.price = price;
        }
        
        // Set product ID if not already set
        if (!card.dataset.id) {
            const title = card.querySelector('h3').textContent;
            card.dataset.id = title.toLowerCase().replace(/\s+/g, '-');
        }
    });
}

/**
 * Filter products based on selected filter values
 */
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const brandFilter = document.getElementById('brand-filter');
    
    if (!categoryFilter && !priceFilter && !brandFilter) return;
    
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    // Show loading indicator
    showLoading();
    
    setTimeout(() => {
        productCards.forEach(card => {
            let showProduct = true;
            
            // Category filtering
            if (categoryFilter && categoryFilter.value !== 'all') {
                showProduct = showProduct && (
                    card.dataset.category === categoryFilter.value
                );
            }
            
            // Price filtering
            if (priceFilter && priceFilter.value !== 'all') {
                const price = parseFloat(card.dataset.price);
                
                if (priceFilter.value === '0-200') {
                    showProduct = showProduct && (price < 200);
                } else if (priceFilter.value === '200-500') {
                    showProduct = showProduct && (price >= 200 && price <= 500);
                } else if (priceFilter.value === '500+') {
                    showProduct = showProduct && (price > 500);
                }
            }
            
            // Brand filtering
            if (brandFilter && brandFilter.value !== 'all') {
                showProduct = showProduct && (
                    card.dataset.brand === brandFilter.value
                );
            }
            
            // Additional filters (can be extended as needed)
            const additionalFilters = document.querySelectorAll('.additional-filter:checked');
            additionalFilters.forEach(filter => {
                const filterType = filter.dataset.filterType;
                const filterValue = filter.value;
                
                if (filterType && filterValue) {
                    showProduct = showProduct && (
                        card.dataset[filterType] === filterValue
                    );
                }
            });
            
            // Show or hide product
            if (showProduct) {
                card.style.display = '';
                card.classList.add('fade-in');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });
        
        // Update product count
        updateProductCount(visibleCount);
        
        // Hide loading indicator
        hideLoading();
        
        // Show "no results" message if necessary
        const noResults = document.querySelector('.no-results');
        if (visibleCount === 0) {
            if (!noResults) {
                const productsGrid = document.querySelector('.products-grid');
                const message = document.createElement('div');
                message.className = 'no-results';
                message.innerHTML = `
                    <p>No products match your selected filters.</p>
                    <button class="reset-filters">Reset Filters</button>
                `;
                productsGrid.appendChild(message);
                
                message.querySelector('.reset-filters').addEventListener('click', resetFilters);
            } else {
                noResults.style.display = 'block';
            }
        } else if (noResults) {
            noResults.style.display = 'none';
        }
    }, 300); // Slight delay for loading indicator
}

/**
 * Reset all filters to default values
 */
function resetFilters() {
    const filterControls = document.querySelectorAll('.filter-controls select, .filter-controls input[type="checkbox"]');
    
    filterControls.forEach(control => {
        if (control.tagName === 'SELECT') {
            control.value = 'all';
        } else if (control.type === 'checkbox') {
            control.checked = false;
        }
    });
    
    filterProducts();
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
 * Initialize product sorting functionality
 */
function initializeSorting() {
    const sortSelect = document.getElementById('sort-by');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', () => {
        sortProducts(sortSelect.value);
    });
}

/**
 * Sort products based on selected sorting option
 * @param {string} sortOption - Sorting option
 */
function sortProducts(sortOption) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
    
    // Sort products
    productCards.sort((a, b) => {
        switch (sortOption) {
            case 'price-asc':
                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                
            case 'price-desc':
                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                
            case 'name-asc':
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
                
            case 'name-desc':
                return b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent);
                
            default:
                return 0;
        }
    });
    
    // Show loading indicator
    showLoading();
    
    setTimeout(() => {
        // Remove all product cards
        productCards.forEach(card => {
            card.remove();
        });
        
        // Re-append in sorted order
        productCards.forEach(card => {
            productsGrid.appendChild(card);
        });
        
        // Add animation
        productCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 50);
        });
        
        // Hide loading indicator
        hideLoading();
    }, 300);
}

/**
 * Initialize product view options (grid/list)
 */
function initializeViewOptions() {
    const gridViewButton = document.querySelector('.view-option[data-view="grid"]');
    const listViewButton = document.querySelector('.view-option[data-view="list"]');
    
    if (!gridViewButton || !listViewButton) return;
    
    gridViewButton.addEventListener('click', () => {
        setProductView('grid');
    });
    
    listViewButton.addEventListener('click', () => {
        setProductView('list');
    });
    
    // Check local storage for saved preference
    const savedView = localStorage.getItem('productView');
    if (savedView) {
        setProductView(savedView);
    }
}

/**
 * Set product view (grid or list)
 * @param {string} viewType - View type (grid or list)
 */
function setProductView(viewType) {
    const productsGrid = document.querySelector('.products-grid');
    const gridViewButton = document.querySelector('.view-option[data-view="grid"]');
    const listViewButton = document.querySelector('.view-option[data-view="list"]');
    
    if (!productsGrid || !gridViewButton || !listViewButton) return;
    
    // Update active button
    gridViewButton.classList.toggle('active', viewType === 'grid');
    listViewButton.classList.toggle('active', viewType === 'list');
    
    // Update grid class
    productsGrid.classList.toggle('list-view', viewType === 'list');
    productsGrid.classList.toggle('grid-view', viewType === 'grid');
    
    // Save preference
    localStorage.setItem('productView', viewType);
}

/**
 * Initialize product interactions (quick view, add to cart)
 */
function initializeProductInteractions() {
    // Quick view buttons
    const quickViewButtons = document.querySelectorAll('.quick-view-button');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            if (productCard) {
                showQuickView(productCard);
            }
        });
    });
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            if (!productCard) return;
            
            // Get product details
            const productId = productCard.dataset.id || `product-${Math.random().toString(36).substr(2, 9)}`;
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));
            const productImage = productCard.querySelector('img').src;
            
            // Create product object
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            };
            
            // Add to cart using TopBar's method
            if (window.topBar) {
                window.topBar.addToCart(product);
            } else {
                console.error('TopBar not initialized');
            }
        });
    });
}

/**
 * Show quick view modal for a product
 * @param {HTMLElement} productCard - Product card element
 */
function showQuickView(productCard) {
    if (!productCard) return;
    
    // Get product details
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.price').textContent;
    const productImage = productCard.querySelector('img').src;
    const productDesc = productCard.querySelector('p').textContent;
    const productSpecs = Array.from(productCard.querySelectorAll('.specs li')).map(li => li.textContent);
    
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'product-quick-view';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'quick-view-title');
    
    modal.innerHTML = `
        <div class="quick-view-content">
            <button class="close-quick-view" aria-label="Close quick view">&times;</button>
            <div class="quick-view-image">
                <img src="${productImage}" alt="${productName}" loading="lazy">
            </div>
            <div class="quick-view-details">
                <h3 id="quick-view-title">${productName}</h3>
                <p class="quick-view-desc">${productDesc}</p>
                <div class="quick-view-specs">
                    <h4>Specifications</h4>
                    <ul>
                        ${productSpecs.map(spec => `<li>${spec}</li>`).join('')}
                    </ul>
                </div>
                <div class="quick-view-price">${productPrice}</div>
                <button class="button add-to-cart-quick-view">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Add modal to DOM
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    
    // Focus on modal
    setTimeout(() => {
        modal.classList.add('active');
        modal.querySelector('.close-quick-view').focus();
    }, 10);
    
    // Close button event listener
    modal.querySelector('.close-quick-view').addEventListener('click', () => {
        closeQuickView(modal);
    });
    
    // Add to cart button event listener
    modal.querySelector('.add-to-cart-quick-view').addEventListener('click', () => {
        // Get product details
        const productId = productCard.dataset.id || `product-${Math.random().toString(36).substr(2, 9)}`;
        const productPriceValue = parseFloat(productPrice.replace(/[^0-9.]/g, ''));
        
        // Create product object
        const product = {
            id: productId,
            name: productName,
            price: productPriceValue,
            image: productImage
        };
        
        // Add to cart using TopBar's method
        if (window.topBar) {
            window.topBar.addToCart(product);
        } else {
            console.error('TopBar not initialized');
        }
        
        // Close modal
        closeQuickView(modal);
    });
    
    // Close on ESC key
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            closeQuickView(modal);
        }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeQuickView(modal);
        }
    });
}

/**
 * Close quick view modal
 * @param {HTMLElement} modal - Quick view modal element
 */
function closeQuickView(modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    
    // Remove event listeners
    document.removeEventListener('keydown', handleEscKey);
    
    // Remove modal after animation
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
        }
    }, 300);
}

/**
 * Update product count display
 * @param {number} count - Number of visible products
 */
function updateProductCount(count) {
    const countElement = document.querySelector('.products-count');
    if (!countElement) return;
    
    if (count === undefined) {
        // Count visible products
        const visibleProducts = document.querySelectorAll('.product-card:not([style*="display: none"])');
        count = visibleProducts.length;
    }
    
    countElement.textContent = count;
    
    // Update text (singular vs plural)
    const productsText = document.querySelector('.products-text');
    if (productsText) {
        productsText.textContent = count === 1 ? 'product' : 'products';
    }
}