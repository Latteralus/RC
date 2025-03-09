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

### File Structure (Updated to Match Current Implementation)
```
/
├── index.html           # SPA entry point ✅
├── example.html         # Reference design ✅
├── websitePlan.md       # Project planning document ✅
├── assets/              # Static assets folder
│   ├── css/             # CSS styles
│   │   ├── components/  # Component-specific styles
│   │   │   ├── cart.css     # Cart component styles ✅
│   │   │   ├── footer.css   # Footer component styles ✅
│   │   │   ├── search.css   # Search component styles ✅
│   │   │   └── topbar.css   # TopBar component styles ✅
│   │   └── base.css     # Core styles, variables, typography ✅
│   ├── images/          # Image assets
│   │   └── cart.svg     # Cart icon ✅
│   └── js/              # JavaScript code
│       ├── components/  # UI components
│       │   ├── CartPreview.js     # Cart preview component ✅
│       │   ├── Footer.js          # Footer component ✅
│       │   ├── SearchComponent.js # Search component ✅
│       │   └── TopBar.js          # Navigation component ✅
│       ├── core/        # Core application code
│       │   ├── app.js       # Main application entry point ✅
│       │   ├── main.js      # Application initialization ✅
│       │   ├── PageRenderer.js # Component rendering system ✅
│       │   ├── router.js    # SPA routing ✅
│       │   └── state.js     # State management ✅
│       ├── pages/       # Page templates (to be implemented)
│       └── utils/       # Utility functions (to be implemented)
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

### Phase 3: Fix Import/Export Issues ✅
1. **Step 3.1**: Update import paths in component files to use correct relative paths ✅
2. **Step 3.2**: Fix missing imports (such as Footer import in app.js) ✅
3. **Step 3.3**: Update script tags in index.html to match actual file structure ✅
4. **Step 3.4**: Address any circular dependencies ✅
5. **Step 3.5**: Test the application to ensure all components load correctly ✅

### Phase 4: Home Page Implementation (Current Phase)
1. **Step 4.1**: Create hero section with video background ✅
2. **Step 4.2**: Implement featured products section (Partially implemented)
3. **Step 4.3**: Add custom builds showcase
4. **Step 4.4**: Create events section
5. **Step 4.5**: Design and implement footer ✅

### Phase 5: Products Page
1. **Step 5.1**: Create product card component
2. **Step 5.2**: Implement product grid layout
3. **Step 5.3**: Add filtering and sorting functionality
4. **Step 5.4**: Create product quick view modal

### Phase 6: Other Pages
1. **Step 6.1**: Custom builds page implementation
2. **Step 6.2**: Racing page implementation
3. **Step 6.3**: Videos page with lazy-loaded content
4. **Step 6.4**: Contact page with form validation

### Phase 7: Cart & Checkout Flow
1. **Step 7.1**: Complete cart functionality with persistent storage
2. **Step 7.2**: Implement cart page
3. **Step 7.3**: Create checkout flow UI
4. **Step 7.4**: Add form validation for checkout

### Phase 8: Performance & Enhancement
1. **Step 8.1**: Optimize images and assets
2. **Step 8.2**: Implement lazy loading for images and content
3. **Step 8.3**: Add page transitions and animations
4. **Step 8.4**: Create loading states and error handling
5. **Step 8.5**: Add service worker for offline capabilities

### Phase 9: Testing & Launch
1. **Step 9.1**: Cross-browser testing
2. **Step 9.2**: Accessibility audit and improvements
3. **Step 9.3**: Performance optimization
4. **Step 9.4**: SEO implementation
5. **Step 9.5**: Final review and launch

## Progress Summary
- **Phase 1**: Completed ✅ (Core architecture setup including index.html, base.css, router.js, state.js, and PageRenderer.js)
- **Phase 2**: Completed ✅ (TopBar & Navigation Components, Cart Preview, Search Functionality, and Footer)
- **Phase 3**: Completed ✅ (Import/Export Issues Fixed, Application Successfully Loading)
- **Current Phase**: Phase 4 (Home Page Implementation)
- **Next Step**: Step 4.2 - Complete featured products section implementation

## Detailed Implementation Steps

### Phase 4: Home Page Implementation

#### Step 4.1: Create Hero Section with Video Background ✅
- Implemented hero section with full-width video background
- Added text overlay with site tagline and call-to-action
- Ensured video stretches to cover the full width with no black bars
- Added responsive styles for different device sizes

#### Step 4.2: Implement Featured Products Section
- Design product cards with consistent styling
- Add hover effects for better user interaction
- Ensure responsive grid layout for different screen sizes
- Implement "Add to Cart" functionality
- Add pricing and product details

#### Step 4.3: Add Custom Builds Showcase
- Design showcase layout with images and descriptions
- Add testimonials or reviews if available
- Create call-to-action for custom build requests
- Ensure responsive behavior on all devices

#### Step 4.4: Create Events Section
- Design events listing with dates, locations, and descriptions
- Add filtering by date, location, or event type
- Implement "Add to Calendar" functionality
- Create responsive layout for mobile devices

#### Step 4.5: Review and Finalize Footer ✅
- Ensure all links are working correctly
- Add social media links and contact information
- Include copyright notice and legal links
- Test responsiveness on all device sizes

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
Email Address: info@aubreysrc.com
Aubrey has been racing RC cars and trucks since the late 1980s and continues today.

---

This document will evolve as the project progresses, with updates to reflect design decisions, technical challenges, and additional requirements.