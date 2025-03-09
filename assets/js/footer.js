/**
 * footer.js - Footer functionality for Aubrey's RC website
 * Part of the simplified file structure approach for www.aubreysrc.com
 * UPDATED: More compact footer layout
 */

class Footer {
    constructor() {
        this.currentYear = new Date().getFullYear();
    }
    
    render() {
        // Only render if there's no footer already on the page
        if (document.querySelector('footer')) {
            this.updateCopyright();
            return;
        }
        
        // Create footer HTML with more compact layout
        const footerHTML = `
            <footer>
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Contact Us</h3>
                        <p>Email: info@aubreysrc.com</p>
                        <p>Phone: 319-595-8656</p>
                    </div>
                    <div class="footer-section">
                        <h3>Business Info</h3>
                        <p>Based in Wellsburg, Iowa</p>
                        <p>Open 24/7 for online orders</p>
                    </div>
                    <div class="footer-section">
                        <h3>About Us</h3>
                        <p>Aubrey "Lee" Barnett has been racing RC cars and trucks since the late 1980s.</p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${this.currentYear} Aubrey's RC. All rights reserved.</p>
                </div>
            </footer>
        `;
        
        // Insert footer at the end of the #app div
        document.getElementById('app').insertAdjacentHTML('beforeend', footerHTML);
    }
    
    // Update copyright year in existing footer
    updateCopyright() {
        const copyrightElement = document.querySelector('.footer-bottom p');
        if (copyrightElement) {
            const copyrightText = copyrightElement.textContent;
            const updatedText = copyrightText.replace(/\d{4}(?= Aubrey's RC)/, this.currentYear);
            copyrightElement.textContent = updatedText;
        }
    }
}

// Initialize footer when DOM is ready if this script is loaded directly
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.footerInitialized === 'undefined') {
        const footer = new Footer();
        footer.render();
        window.footer = footer;
        window.footerInitialized = true;
    }
});