# Aubrey's RC Website Plan
(website address: www.aubreysrc.com)

## Vision Statement

Aubreys RC will be a clean, responsive e-commerce website that offers a quality shopping experience for remote control car enthusiasts. The site will feature a professional design with intuitive navigation and straightforward interactions. Our goal is to create a digital presence that reflects the quality and craftsmanship of our custom RC builds while providing customers with an efficient way to browse products, learn about services, and engage with our community. Aubreys RC itself does not host any racing events, but will attend many events in the local/regional area surrounding Iowa and may post related information.

The website will use a traditional HTML-centric approach with separate pages for different sections, ensuring reliability, better SEO, and simpler maintenance.

## Current File Structure

Based on our implementation progress so far, here is the current file structure:

```
/RC
├── index.html           # Homepage
├── cart.html            # Shopping cart page
├── websitePlan.md       # Project planning document
├── assets/              # Static assets folder
│   ├── css/             # CSS styles
│   │   ├── base.css     # Core styles, variables, typography shared across all pages
│   │   ├── cart.css     # Styles specific to cart.html
│   │   ├── footer.css   # Footer component styles
│   │   ├── header.css   # Header component styles
│   │   └── index.css    # Styles specific to index.html
│   ├── images/          # Image assets
│   │   └── cart.svg     # Cart icon
│   └── js/              # JavaScript files
│       ├── cart.js      # Shopping cart functionality
│       ├── footer.js    # Footer functionality
│       └── header.js    # Header functionality
```

## Completed Implementation

### Core Framework
- ✅ Created and implemented base.css with shared styles across all pages
- ✅ Implemented header and footer components with corresponding CSS and JS
- ✅ Converted from inline styling to properly organized CSS files
- ✅ Ensured mobile responsiveness in all completed pages

### Pages Completed
- ✅ Homepage (index.html)
  - Hero section with video background
  - Featured products section
  - About section
  - Services section
- ✅ Shopping Cart (cart.html)
  - Cart item display
  - Quantity adjustment
  - Order summary with calculations
  - Checkout navigation

### Functionality Implemented
- ✅ Shopping cart system using localStorage
- ✅ Add to cart functionality
- ✅ Cart item management (add, remove, update quantity)
- ✅ Responsive navigation
- ✅ Dynamic footer with auto-updating copyright year

## Remaining Pages To Be Implemented

### Pages Still Needed
1. **Products Page (products.html)**
   - Grid layout of product cards
   - Filtering and sorting options
   - Product details with pricing
   - "Add to Cart" buttons

2. **Custom Builds Page (custom.html)**
   - Showcase of custom build projects
   - Process explanation
   - Request form or contact link

3. **Videos Page (videos.html)**
   - Gallery of videos and images
   - Categorized media content
   - Responsive layout for different screen sizes

4. **Racing Events Page (racing.html)**
   - Calendar or list of upcoming events
   - Event details and information
   - Registration links if applicable

5. **Contact Page (contact.html)**
   - Contact form with validation
   - Business information
   - Location information

6. **Checkout Page (checkout.html)**
   - Shipping information form
   - Payment processing with Stripe
   - Order confirmation

## Technical Approach

### HTML-Centric Design
- Each page is a standalone HTML file with complete HTML structure
- Content specific to each page is directly embedded in the HTML
- Common elements (header, footer) are consistently implemented across pages

### CSS Organization
- Flat structure with no subfolders for simpler management
- Each HTML page has its own corresponding CSS file (e.g., index.html → index.css)
- base.css file contains styles shared across all pages
- Separate CSS files for header and footer components
- Page-specific styling handled in individual page CSS files
- Mobile-responsive design using media queries

### JavaScript Implementation
- Minimal JavaScript focused on essential functionality
- Flat structure with no subfolders for easier maintenance
- Dedicated header.js and footer.js files for consistent header/footer functionality
- Core features: cart management, search functionality, form validation
- All pages will function without JavaScript (progressive enhancement)

### Payment Processing
- Stripe integration for secure payment processing (to be implemented)
- Client-side Stripe Elements for payment form UI
- Server-side payment confirmation and order processing
- Secure checkout experience compliant with PCI standards

## Responsive Design Strategy

- Mobile-first approach with responsive breakpoints
- Key breakpoints:
  - Mobile: < 576px
  - Tablet: 576px - 992px
  - Desktop: > 992px
- Flexible layout using CSS Grid and Flexbox
- Touch-friendly UI elements on mobile

## Style Guide

### Colors
- Primary: #FF4D00 (Aubrey's Orange)
- Secondary: #1A1A1A (Near Black)
- Accent: #00B8FF (Blue)
- Background: #FFFFFF (White)
- Text: #333333 (Dark Gray)

### Typography
- Headings: 'Rajdhani', sans-serif
- Body: 'Open Sans', sans-serif

### Spacing
- Base unit: 1rem (16px)
- Scale: 0.25rem, 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem

## Business Information

Business Name: Aubreys RC
Business State: Iowa
Conducts Business: Worldwide
Business Email: orders@aubreysrc.com
Business Address: No Physical Address Posted, business based out of Wellsburg, Iowa
Business Times/Open: No Physical Location for customers, Open 24/7 for orders.
Aubreys RC is owned and operated by Aubrey "Lee" Barnett copyright 2020
Aubreys RC does not currently have a social media presence but will shortly.

Aubrey "Lee" Barnett
Phone Number: 319-595-8656
Email Address: info@aubreysrc.com
Aubrey has been racing RC cars and trucks since the late 1980s and continues today.

---

## Next Implementation Steps

### Phase 1: Remaining Core Pages
1. Implement products.html with product listings
2. Create custom.html for custom builds information
3. Develop videos.html for media gallery
4. Build racing.html for events information
5. Create contact.html with contact form

### Phase 2: Checkout Process
1. Complete checkout.html for the checkout process
2. Integrate Stripe payment processing for secure online payments

### Phase 3: Refinement
1. Enhance styling and mobile responsiveness
2. Add animations and interactive elements
3. Optimize images and assets
4. Ensure cross-browser compatibility

### Phase 4: Testing & Launch
1. Cross-browser testing
2. Mobile testing
3. Performance optimization
4. Content review and final adjustments
5. Launch

This website plan will be updated as development progresses to reflect evolving requirements and implementation decisions.