/**
 * cart.js - Shopping cart functionality for Aubrey's RC website
 * Part of the simplified file structure approach for www.aubreysrc.com
 */

class Cart {
    constructor() {
        // Load cart data from localStorage
        this.items = JSON.parse(localStorage.getItem('aubreysrc_cart')) || [];
        this.subtotal = 0;
        this.tax = 0;
        this.total = 0;
    }
    
    // Add a product to the cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.updateLocalStorage();
        this.updateCartCount();
    }
    
    // Remove a product from the cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateLocalStorage();
        this.updateCartCount();
    }
    
    // Update quantity of a product in the cart
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            item.quantity = parseInt(quantity);
            
            // Remove item if quantity is 0 or less
            if (item.quantity <= 0) {
                this.removeItem(productId);
                return;
            }
        }
        
        this.updateLocalStorage();
        this.updateCartCount();
    }
    
    // Clear all items from the cart
    clearCart() {
        this.items = [];
        this.updateLocalStorage();
        this.updateCartCount();
    }
    
    // Calculate cart totals
    calculateTotals() {
        this.subtotal = this.items.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
        
        // Calculate tax (assuming 7% tax rate)
        this.tax = this.subtotal * 0.07;
        
        // Calculate total
        this.total = this.subtotal + this.tax;
        
        return {
            subtotal: this.subtotal,
            tax: this.tax,
            total: this.total
        };
    }
    
    // Update cart data in localStorage
    updateLocalStorage() {
        localStorage.setItem('aubreysrc_cart', JSON.stringify(this.items));
    }
    
    // Update cart count in the header
    updateCartCount() {
        const count = this.items.reduce((total, item) => total + (item.quantity || 1), 0);
        
        // Update cart count display if element exists
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
        
        // If header instance is available, update its cart count
        if (window.header) {
            window.header.updateCartCount();
        }
    }
    
    // Render cart items in the cart page
    renderCartPage() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;
        
        if (this.items.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty.</p>
                    <a href="/products.html" class="btn btn-primary">Shop Now</a>
                </div>
            `;
            
            // Hide totals section
            const totalsSection = document.getElementById('cart-totals');
            if (totalsSection) {
                totalsSection.style.display = 'none';
            }
            
            return;
        }
        
        // Build HTML for cart items
        let cartHTML = '';
        
        this.items.forEach(item => {
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease">-</button>
                        <input type="number" min="1" value="${item.quantity || 1}" class="quantity-input">
                        <button class="quantity-btn increase">+</button>
                    </div>
                    <div class="cart-item-subtotal">
                        $${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </div>
                    <button class="remove-item-btn">×</button>
                </div>
            `;
        });
        
        cartContainer.innerHTML = cartHTML;
        
        // Update totals
        this.updateCartTotals();
        
        // Add event listeners for quantity changes and removals
        this.attachCartEventListeners();
    }
    
    // Update cart totals in the cart page
    updateCartTotals() {
        const totals = this.calculateTotals();
        
        const subtotalElement = document.getElementById('cart-subtotal');
        const taxElement = document.getElementById('cart-tax');
        const totalElement = document.getElementById('cart-total');
        
        if (subtotalElement) {
            subtotalElement.textContent = `$${totals.subtotal.toFixed(2)}`;
        }
        
        if (taxElement) {
            taxElement.textContent = `$${totals.tax.toFixed(2)}`;
        }
        
        if (totalElement) {
            totalElement.textContent = `$${totals.total.toFixed(2)}`;
        }
        
        // Show totals section
        const totalsSection = document.getElementById('cart-totals');
        if (totalsSection) {
            totalsSection.style.display = 'block';
        }
    }
    
    // Attach event listeners to cart elements
    attachCartEventListeners() {
        // Quantity decrease buttons
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', e => {
                const cartItem = e.target.closest('.cart-item');
                const id = cartItem.dataset.id;
                const input = cartItem.querySelector('.quantity-input');
                const currentVal = parseInt(input.value);
                
                if (currentVal > 1) {
                    input.value = currentVal - 1;
                    this.updateQuantity(id, currentVal - 1);
                    this.updateCartPage();
                }
            });
        });
        
        // Quantity increase buttons
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', e => {
                const cartItem = e.target.closest('.cart-item');
                const id = cartItem.dataset.id;
                const input = cartItem.querySelector('.quantity-input');
                const currentVal = parseInt(input.value);
                
                input.value = currentVal + 1;
                this.updateQuantity(id, currentVal + 1);
                this.updateCartPage();
            });
        });
        
        // Quantity input changes
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', e => {
                const cartItem = e.target.closest('.cart-item');
                const id = cartItem.dataset.id;
                const newVal = parseInt(e.target.value);
                
                if (newVal > 0) {
                    this.updateQuantity(id, newVal);
                    this.updateCartPage();
                } else {
                    // Reset to 1 if invalid value
                    e.target.value = 1;
                    this.updateQuantity(id, 1);
                    this.updateCartPage();
                }
            });
        });
        
        // Remove item buttons
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const cartItem = e.target.closest('.cart-item');
                const id = cartItem.dataset.id;
                
                this.removeItem(id);
                this.updateCartPage();
            });
        });
        
        // Clear cart button
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear your cart?')) {
                    this.clearCart();
                    this.updateCartPage();
                }
            });
        }
    }
    
    // Update the entire cart page (re-render)
    updateCartPage() {
        this.renderCartPage();
    }
}

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
    
    // If we're on the cart page, render it
    if (document.getElementById('cart-items')) {
        window.cart.renderCartPage();
    }
});