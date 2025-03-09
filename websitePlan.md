# Aubrey's RC Website Plan
(website address: www.aubreysrc.com)

## Vision Statement

Aubreys RC will be a clean, responsive e-commerce website that offers a quality shopping experience for remote control car enthusiasts. The site will feature a professional design with intuitive navigation and straightforward interactions. Our goal is to create a digital presence that reflects the quality and craftsmanship of our custom RC builds while providing customers with an efficient way to browse products, learn about services, and engage with our community. Aubreys RC itself does not host any racing events, but will attend many events in the local/regional area surrounding Iowa and may post related information.

The website will use a traditional HTML-centric approach with separate pages for different sections, ensuring reliability, better SEO, and simpler maintenance.

## Simplified File Structure

Based on the need for a more straightforward implementation, we're adopting a flat, simplified file structure with page-specific CSS files:

```
/RC
├── index.html           # Homepage (converted from example.html)
├── products.html        # Products listing page (to be created)
├── custom.html          # Custom builds page (to be created)
├── videos.html          # Media gallery (to be created)
├── racing.html          # Racing events (to be created)
├── contact.html         # Contact page (to be created)
├── cart.html            # Shopping cart (to be created)
├── checkout.html        # Checkout process (to be created)
├── websitePlan.md       # Project planning document
├── assets/              # Static assets folder
│   ├── css/             # CSS styles (flat structure, no subfolders)
│   │   ├── base.css     # Core styles, variables, typography shared across all pages
│   │   ├── header.css   # Header component styles
│   │   ├── footer.css   # Footer component styles
│   │   ├── index.css    # Styles specific to index.html
│   │   ├── products.css # Styles specific to products.html
│   │   ├── custom.css   # Styles specific to custom.html
│   │   ├── videos.css   # Styles specific to videos.html
│   │   ├── racing.css   # Styles specific to racing.html
│   │   ├── contact.css  # Styles specific to contact.html
│   │   ├── cart.css     # Styles specific to cart.html
│   │   └── checkout.css # Styles specific to checkout.html
│   ├── images/          # Image assets
│   │   └── cart.svg     # Cart icon
│   └── js/              # JavaScript (flat structure, no subfolders)
│       ├── header.js    # Header functionality
│       ├── footer.js    # Footer functionality
│       ├── cart.js      # Shopping cart functionality
│       ├── search.js    # Search functionality
│       ├── stripe.js    # Stripe payment processing integration
│       └── common.js    # Shared utilities and functions
```

## Technical Approach

### HTML-Centric Design
- Each page will be a standalone HTML file with complete HTML structure
- Content specific to each page will be directly embedded in the HTML
- Common elements (header, footer) will be consistently implemented across pages

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
- Stripe integration for secure payment processing
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

## Implementation Plan

### Phase 1: Base Setup
1. Start with the existing index.html (converted from example.html)
2. Extract and organize CSS into base.css and page-specific CSS files (index.css)
3. Create header.css and footer.css for component styling
4. Implement header.js and footer.js for consistent header/footer functionality
5. Ensure each page references its own CSS file plus the base.css

### Phase 2: Core Pages
1. Create products.html with product listings
2. Implement custom.html for custom builds information
3. Develop videos.html for media gallery
4. Build racing.html for events information
5. Create contact.html with contact form

### Phase 3: E-commerce Functionality
1. Implement cart.js for shopping cart management
2. Create cart.html for cart review and management
3. Develop checkout.html for the checkout process
4. Integrate Stripe payment processing for secure online payments
5. Add "Add to Cart" functionality on product pages

### Phase 4: Refinement
1. Enhance styling and mobile responsiveness
2. Add animations and interactive elements
3. Optimize images and assets
4. Ensure cross-browser compatibility

### Phase 5: Testing & Launch
1. Cross-browser testing
2. Mobile testing
3. Performance optimization
4. Content review and final adjustments
5. Launch

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

## Page-Specific Implementation Details

### Home Page (index.html)
- Hero section with video background
- Featured products section with "Add to Cart" functionality
- Sections highlighting custom builds and services
- Call-to-action elements

### Products Page (products.html)
- Grid layout of product cards
- Filtering and sorting options
- Product details with pricing
- "Add to Cart" buttons

### Custom Builds Page (custom.html)
- Showcase of custom build projects
- Process explanation
- Request form or contact link

### Videos Page (videos.html)
- Gallery of videos and images
- Categorized media content
- Responsive layout for different screen sizes

### Racing Events Page (racing.html)
- Calendar or list of upcoming events
- Event details and information
- Registration links if applicable

### Contact Page (contact.html)
- Contact form with validation
- Business information
- Location information

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

This website plan will be updated as development progresses to reflect evolving requirements and implementation decisions.