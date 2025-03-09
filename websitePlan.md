# Aubrey's RC Website Plan
(website address: www.aubreysrc.com)

## Vision Statement

Aubreys RC will be a modern, responsive e-commerce website that offers a premium shopping experience for remote control car enthusiasts. The site will feature a clean, professional design with intuitive navigation and seamless interactions. Our goal is to create a digital presence that reflects the quality and craftsmanship of our custom RC builds while providing customers with an efficient way to browse products, learn about services, and engage with our community. Aubreys RC itself does not host any racing events, but will attend many events in the local/regional area surrounding Iowa and may post related information.

The website will be built as a Single Page Application (SPA) to ensure fast page transitions, responsive interactions, and a native-like user experience. The architecture will be component-based for maintainability and scalability, with clear separation of concerns between UI components, business logic, and routing.

## Reference Design

The site's design and functionality will be inspired by the current implementation (reference example.html), but rebuilt from the ground up with modern web development practices. The reference provides a general look and feel, but the new implementation will focus on improved architecture, performance, and maintainability and allowing the AI discretion on design choices based on the goal and best-practices of a professional, modern and responsive e-commerce site.

## Technical Architecture

### SPA Framework
- Pure JavaScript SPA implementation without external frameworks
- Client-side routing with history API
- Component-based architecture

### Core Components
1. **Router**: Handles URL changes and renders appropriate page components ✅
2. **TopBar**: Navigation, search, and cart management ✅
3. **PageRenderer**: Manages loading and rendering of page templates ✅
4. **CartManager**: Handles shopping cart state and persistence ✅
5. **NotificationSystem**: Manages user feedback and alerts

### State Management
- Simple pub/sub pattern for cross-component communication ✅
- LocalStorage for persistence of cart and user preferences ✅
- Clear data flow with minimal global state ✅

### File Structure
```
/
├── index.html             # SPA entry point ✅
├── assets/
│   ├── css/
│   │   ├── base.css       # Core styles, variables, typography ✅
│   │   ├── components/    # Component-specific styles
│   │   │   ├── topbar.css ✅
│   │   │   ├── cart.css ✅
│   │   │   ├── search.css ✅
│   │   │   ├── footer.css ✅
│   │   │   └── ...
│   │   └── pages/         # Page-specific styles
│   │       ├── home.css
│   │       ├── products.css
│   │       └── ...
│   ├── js/
│   │   ├── core/          # Core application code
│   │   │   ├── app.js     # Main application entry point ✅
│   │   │   ├── router.js  # SPA routing ✅
│   │   │   ├── state.js   # State management ✅
│   │   │   └── PageRenderer.js # Component rendering system ✅
│   │   ├── components/    # Reusable UI components
│   │   │   ├── TopBar.js ✅
│   │   │   ├── CartPreview.js ✅
│   │   │   ├── SearchComponent.js ✅
│   │   │   ├── Footer.js ✅
│   │   │   └── ...
│   │   ├── pages/         # Page templates
│   │   │   ├── HomePage.js
│   │   │   ├── ProductsPage.js
│   │   │   └── ...
│   │   └── utils/         # Utility functions
│   │       ├── api.js     # API interaction
│   │       ├── storage.js # LocalStorage management
│   │       └── ...
│   └── images/            # Image assets
│       ├── products/
│       ├── icons/
│       └── ...
└── example.html           # Reference design (not part of production)
```

## Responsive Design Strategy

- Mobile-first approach with responsive breakpoints
- Key breakpoints:
  - Mobile: < 576px
  - Tablet: 576px - 992px
  - Desktop: > 992px
- Flexible grid system for layout ✅
- Optimized images for different device sizes
- Touch-friendly UI elements on mobile

## Implementation Plan

### Phase 1: Core Architecture Setup ✅
1. **Step 1.1**: Create basic index.html with essential meta tags and stylesheet links ✅
2. **Step 1.2**: Implement base CSS (variables, reset, typography) ✅
3. **Step 1.3**: Create core router implementation ✅
4. **Step 1.4**: Set up state management system ✅
5. **Step 1.5**: Create basic page renderer ✅

### Phase 2: TopBar & Navigation Components ✅
1. **Step 2.1**: Implement TopBar component (HTML structure and styling) ✅
2. **Step 2.2**: Add navigation functionality to TopBar ✅
3. **Step 2.3**: Create cart preview component ✅
4. **Step 2.4**: Implement search functionality ✅
5. **Step 2.5**: Create footer component ✅

### Phase 3: Home Page Implementation
1. **Step 3.1**: Create hero section with video background
2. **Step 3.2**: Implement featured products section
3. **Step 3.3**: Add custom builds showcase
4. **Step 3.4**: Create events section
5. **Step 3.5**: Design and implement footer

### Phase 4: Products Page
1. **Step 4.1**: Create product card component
2. **Step 4.2**: Implement product grid layout
3. **Step 4.3**: Add filtering and sorting functionality
4. **Step 4.4**: Create product quick view modal

### Phase 5: Other Pages
1. **Step 5.1**: Custom builds page implementation
2. **Step 5.2**: Racing page implementation
3. **Step 5.3**: Videos page with lazy-loaded content
4. **Step 5.4**: Contact page with form validation

### Phase 6: Cart & Checkout Flow
1. **Step 6.1**: Complete cart functionality with persistent storage
2. **Step 6.2**: Implement cart page
3. **Step 6.3**: Create checkout flow UI
4. **Step 6.4**: Add form validation for checkout

### Phase 7: Performance & Enhancement
1. **Step 7.1**: Optimize images and assets
2. **Step 7.2**: Implement lazy loading for images and content
3. **Step 7.3**: Add page transitions and animations
4. **Step 7.4**: Create loading states and error handling
5. **Step 7.5**: Add service worker for offline capabilities

### Phase 8: Testing & Launch
1. **Step 8.1**: Cross-browser testing
2. **Step 8.2**: Accessibility audit and improvements
3. **Step 8.3**: Performance optimization
4. **Step 8.4**: SEO implementation
5. **Step 8.5**: Final review and launch

## Progress Summary
- **Phase 1**: Completed ✅ (Core architecture setup including index.html, base.css, router.js, state.js, and PageRenderer.js)
- **Phase 2**: Completed ✅ (TopBar & Navigation Components, Cart Preview, Search Functionality, and Footer)
- **Current Phase**: Phase 3 (Home Page Implementation)
- **Next Step**: Step 3.1 - Create hero section with video background

## Detailed Implementation Steps

### Phase 1: Core Architecture Setup ✅

#### Step 1.1: Create Basic Index.html ✅
- Created index.html with proper HTML5 doctype
- Added meta tags for responsiveness and SEO
- Linked CSS files (initially just base.css)
- Added basic app structure (div#app, main content area, etc.)
- Added script tags for core JavaScript files

#### Step 1.2: Implement Base CSS ✅
- Created CSS variables for colors, fonts, spacing
- Implemented CSS reset/normalize
- Added typography styles
- Created utility classes for common needs
- Implemented grid system

#### Step 1.3: Create Core Router ✅
- Implemented basic router with path matching
- Set up history API integration
- Created route registration mechanism
- Added methods for programmatic navigation
- Implemented event system for route changes

#### Step 1.4: Set Up State Management ✅
- Created simple pub/sub system
- Implemented state container
- Added localStorage persistence
- Created initial state structure
- Added debug helpers for state inspection

#### Step 1.5: Create Basic Page Renderer ✅
- Implemented component class structure
- Created page loader mechanism
- Added template rendering functionality
- Implemented component lifecycle methods
- Created content transition system

### Phase 2: TopBar & Navigation Components ✅

#### Step 2.1: Implement TopBar Component ✅
- Created TopBar class structure
- Implemented HTML template
- Styled TopBar for desktop and mobile
- Added mobile menu toggle
- Ensured responsive behavior

#### Step 2.2: Add Navigation Functionality ✅
- Integrated TopBar with router
- Implemented active page highlighting
- Added event listeners for navigation
- Handled mobile menu interactions
- Ensured keyboard accessibility

#### Step 2.3: Create Cart Preview Component ✅
- Implemented cart preview UI
- Created cart item component
- Added animations for cart interactions
- Implemented cart counter badge
- Connected to state management

#### Step 2.4: Implement Search Functionality ✅
- Created search input and form
- Styled search UI
- Added search toggle behavior
- Implemented search results display
- Added keyboard shortcuts

#### Step 2.5: Create Footer Component ✅
- Implemented footer class structure
- Created responsive footer layout
- Added navigation links and social media icons
- Added contact information
- Ensured proper styling and responsive behavior

### Phase 3: Home Page Implementation

#### Step 3.1: Create Hero Section with Video Background
- Implement hero component
- Add video background with fallback
- Style overlay and content
- Ensure responsive behavior
- Add CTA button

#### Step 3.2: Implement Featured Products Section
- Create product card component
- Implement product grid
- Add "Add to Cart" functionality
- Implement hover effects
- Ensure mobile optimization

#### Step 3.3: Add Custom Builds Showcase
- Create showcase component
- Implement image gallery
- Add section content and styling
- Create CTA for custom services
- Ensure responsive layout

#### Step 3.4: Create Events Section
- Implement events list component
- Create event card design
- Add date formatting
- Link to event details
- Style for all device sizes

#### Step 3.5: Design and Implement Footer
- Create footer component
- Implement column layout
- Add contact information
- Create social media links
- Add copyright and legal links

### Next Steps

After completing the initial phases, subsequent phases will be detailed with similar granularity. Each step is designed to be achievable in a single AI session, focusing on a specific component or functionality while maintaining clear dependencies between steps.

## Component Design Principles

1. **Self-contained**: Each component should manage its own state and DOM manipulation.
2. **Reusable**: Components should be designed for reuse across the application.
3. **Accessible**: Follow WCAG guidelines for all interactive elements.
4. **Performant**: Minimize DOM operations and optimize rendering.
5. **Responsive**: All components should adapt to different screen sizes.

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

### Shadows
- Light: 0 2px 4px rgba(0,0,0,0.05)
- Medium: 0 4px 8px rgba(0,0,0,0.1)
- Heavy: 0 8px 16px rgba(0,0,0,0.1)

### Borders
- Radius: 8px
- Width: 1px
- Style: solid

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance Score: > 90
- Page size: < 1MB (excluding video content)
- HTTP requests: < 20 for initial load

## Accessibility Standards

- WCAG 2.1 AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Proper ARIA attributes
- Color contrast ratios of at least 4.5:1
- Screen reader compatible

Notes for AI:
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
Email Address: 
Aubrey has been racing RC cars and trucks since the late 1980s and continues today.

---

This document will evolve as the project progresses, with updates to reflect design decisions, technical challenges, and additional requirements.