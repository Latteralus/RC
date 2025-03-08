/**
 * Products Page Template
 * Templates/products.js
 */

/**
 * Generate the products page content
 * @returns {string} HTML content for the products page
 */
export default function render() {
    return `
      <main id="main-content" class="products-page">
        <!-- Loading indicator -->
        <div class="loading-indicator">
          <div class="loader"></div>
        </div>
  
        <section class="product-filters">
          <h1>Shop RC Cars</h1>
          <div class="filter-controls">
            <div class="filter-group">
              <label for="category-filter">Category</label>
              <select id="category-filter" aria-label="Filter by category">
                <option value="all">All Categories</option>
                <option value="cars">Cars</option>
                <option value="trucks">Trucks</option>
                <option value="buggies">Buggies</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="price-filter">Price Range</label>
              <select id="price-filter" aria-label="Filter by price">
                <option value="all">All Prices</option>
                <option value="0-200">Under $200</option>
                <option value="200-500">$200 - $500</option>
                <option value="500+">$500+</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="brand-filter">Brand</label>
              <select id="brand-filter" aria-label="Filter by brand">
                <option value="all">All Brands</option>
                <option value="traxxas">Traxxas</option>
                <option value="arrma">Arrma</option>
                <option value="losi">Losi</option>
              </select>
            </div>
            
            <div class="additional-filters">
              <div class="additional-filter-group">
                <input type="checkbox" id="electric-only" class="additional-filter" data-filter-type="power" value="electric">
                <label for="electric-only">Electric Only</label>
              </div>
              <div class="additional-filter-group">
                <input type="checkbox" id="in-stock" class="additional-filter" data-filter-type="stock" value="true">
                <label for="in-stock">In Stock</label>
              </div>
              <div class="additional-filter-group">
                <input type="checkbox" id="on-sale" class="additional-filter" data-filter-type="sale" value="true">
                <label for="on-sale">On Sale</label>
              </div>
            </div>
          </div>
        </section>
  
        <div class="product-options">
          <div class="product-count">
            Showing <span class="results-count">6</span> <span class="results-text">products</span>
          </div>
          <div class="view-sort-options">
            <select id="sort-by" class="sort-by" aria-label="Sort products">
              <option value="default">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            <div class="view-options">
              <button class="view-option active" data-view="grid" aria-label="Grid view" aria-pressed="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                </svg>
              </button>
              <button class="view-option" data-view="list" aria-label="List view" aria-pressed="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        <section class="products-grid grid-view">
          <div class="product-card" data-id="traxxas-rustler" data-category="trucks" data-brand="traxxas" data-price="299.99" data-power="electric" data-stock="true">
            <div class="product-card-image">
              <img src="/assets/images/products/car1.jpg" alt="Traxxas Rustler" loading="lazy">
              <span class="product-badge bestseller">Bestseller</span>
              <div class="product-actions">
                <button class="action-button quick-view-button" aria-label="Quick view Traxxas Rustler"></button>
                <button class="action-button wishlist-button" aria-label="Add Traxxas Rustler to wishlist"></button>
              </div>
            </div>
            <div class="product-card-content">
              <span class="product-category">Trucks</span>
              <h2>Traxxas Rustler</h2>
              <p>High-performance electric stadium truck</p>
              <ul class="specs">
                <li>Scale: 1/10</li>
                <li>Top Speed: 35+ mph</li>
                <li>Power: Electric</li>
              </ul>
              <span class="price">$299.99</span>
              <div class="add-to-cart-area">
                <button class="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
  
          <div class="product-card" data-id="arrma-kraton" data-category="trucks" data-brand="arrma" data-price="549.99" data-power="electric" data-stock="true">
            <div class="product-card-image">
              <img src="/assets/images/products/car2.jpg" alt="Arrma Kraton" loading="lazy">
              <span class="product-badge new">New</span>
              <div class="product-actions">
                <button class="action-button quick-view-button" aria-label="Quick view Arrma Kraton"></button>
                <button class="action-button wishlist-button" aria-label="Add Arrma Kraton to wishlist"></button>
              </div>
            </div>
            <div class="product-card-content">
              <span class="product-category">Trucks</span>
              <h2>Arrma Kraton</h2>
              <p>1/8 Scale Monster Truck</p>
              <ul class="specs">
                <li>Scale: 1/8</li>
                <li>Top Speed: 50+ mph</li>
                <li>Power: Electric</li>
              </ul>
              <span class="price">$549.99</span>
              <div class="add-to-cart-area">
                <button class="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
  
          <div class="product-card" data-id="losi-mini-t" data-category="trucks" data-brand="losi" data-price="199.99" data-power="electric" data-stock="true" data-sale="true">
            <div class="product-card-image">
              <img src="/assets/images/products/car3.jpg" alt="Losi Mini-T" loading="lazy">
              <span class="product-badge sale">Sale</span>
              <div class="product-actions">
                <button class="action-button quick-view-button" aria-label="Quick view Losi Mini-T"></button>
                <button class="action-button wishlist-button" aria-label="Add Losi Mini-T to wishlist"></button>
              </div>
            </div>
            <div class="product-card-content">
              <span class="product-category">Trucks</span>
              <h2>Losi Mini-T</h2>
              <p>Compact racing truck</p>
              <ul class="specs">
                <li>Scale: 1/18</li>
                <li>Top Speed: 25+ mph</li>
                <li>Power: Electric</li>
              </ul>
              <span class="price"><span class="original-price">$229.99</span> $199.99 <span class="discount-percentage">-13%</span></span>
              <div class="add-to-cart-area">
                <button class="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
  
          <div class="product-card" data-id="traxxas-x-maxx" data-category="trucks" data-brand="traxxas" data-price="899.99" data-power="electric" data-stock="true">
            <div class="product-card-image">
              <img src="/assets/images/products/car4.jpg" alt="Traxxas X-Maxx" loading="lazy">
              <div class="product-actions">
                <button class="action-button quick-view-button" aria-label="Quick view Traxxas X-Maxx"></button>
                <button class="action-button wishlist-button" aria-label="Add Traxxas X-Maxx to wishlist"></button>
              </div>
            </div>
            <div class="product-card-content">
              <span class="product-category">Trucks</span>
              <h2>Traxxas X-Maxx</h2>
              <p>Extreme monster truck</p>
              <ul class="specs">
                <li>Scale: 1/5</li>
                <li>Top Speed: 50+ mph</li>
                <li>Power: Electric</li>
              </ul>
              <span class="price">$899.99</span>
              <div class="add-to-cart-area">
                <button class="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
  
          <div class="product-card" data-id="arrma-typhon" data-category="buggies" data-brand="arrma" data-price="449.99" data-power="electric" data-stock="true" data-sale="true">
            <div class="product-card-image">
              <img src="/assets/images/products/car5.jpg" alt="Arrma Typhon" loading="lazy">
              <span class="product-badge sale">Sale</span>
              <div class="product-actions">
                <button class="action-button quick-view-button" aria-label="Quick view Arrma Typhon"></button>
                <button class="action-button wishlist-button" aria-label="Add Arrma Typhon to wishlist"></button>
              </div>
            </div>
            <div class="product-card-content">
              <span class="product-category">Buggies</span>
              <h2>Arrma Typhon</h2>
              <p>High-speed racing buggy</p>
              <ul class="specs">
                <li>Scale: 1/8</li>
                <li>Top Speed: 65+ mph</li>
                <li>Power: Electric</li>
              </ul>
              <span class="price"><span class="original-price">$499.99</span> $449.99 <span class="discount-percentage">-10%</span></span>
              <div class="add-to-cart-area">
                <button class="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
  
          <div class="product-card" data-id="losi-22s" data-category="trucks" data-brand="losi" data-price="349.99" data-power="electric" data-stock="true">
            <div class="product-card-image">
              <img src="/assets/images/products/car6.jpg" alt="Losi 22S" loading="lazy">
              <div class="product-actions">
                <button class="action-button quick-view-button" aria-label="Quick view Losi 22S"></button>
                <button class="action-button wishlist-button" aria-label="Add Losi 22S to wishlist"></button>
              </div>
            </div>
            <div class="product-card-content">
              <span class="product-category">Trucks</span>
              <h2>Losi 22S</h2>
              <p>Short course racing truck</p>
              <ul class="specs">
                <li>Scale: 1/10</li>
                <li>Top Speed: 40+ mph</li>
                <li>Power: Electric</li>
              </ul>
              <span class="price">$349.99</span>
              <div class="add-to-cart-area">
                <button class="add-to-cart">Add to Cart</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    `;
  }
  
  /**
   * Initialize the products page
   * Called after the page is rendered
   */
  export function init() {
    // Initialize product filtering and sorting
    if (window.Utilities) {
      window.Utilities.hideLoading();
    }
    
    // Initialize filters
    initializeFilters();
    
    // Initialize sort functionality
    initializeSorting();
    
    // Initialize view options (grid/list)
    initializeViewOptions();
    
    // Initialize product interactions
    initializeProductInteractions();
    
    // Update product count
    updateProductCount();
  }
  
  // Helper functions for product page initialization
  
  /**
   * Initialize filter controls
   */
  function initializeFilters() {
    const filterControls = document.querySelectorAll('.filter-controls select, .filter-controls input[type="checkbox"]');
    if (filterControls.length === 0) return;
    
    // Add event listeners to filter controls
    filterControls.forEach(control => {
      control.addEventListener('change', () => {
        filterProducts();
      });
    });
  }
  
  /**
   * Filter products based on selected filters
   */
  function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const brandFilter = document.getElementById('brand-filter');
    
    if (!categoryFilter && !priceFilter && !brandFilter) return;
    
    const productCards = document.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    // Show loading indicator if available
    if (window.Utilities && window.Utilities.showLoading) {
      window.Utilities.showLoading();
    }
    
    // Filter products with slight delay for loading indicator
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
        
        // Additional filters
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
      if (window.Utilities && window.Utilities.hideLoading) {
        window.Utilities.hideLoading();
      }
    }, 300);
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
    // Implementation will be added when the products.js is integrated
    console.log('Sorting products by:', sortOption);
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
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        if (!productCard) return;
        
        // Get product details
        const productId = productCard.dataset.id;
        const productName = productCard.querySelector('h2').textContent;
        const productPrice = parseFloat(productCard.dataset.price);
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
        }
      });
    });
    
    // Quick view buttons
    const quickViewButtons = document.querySelectorAll('.quick-view-button');
    quickViewButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        if (productCard && window.ProductOperations) {
          window.ProductOperations.showQuickView(productCard);
        }
      });
    });
  }