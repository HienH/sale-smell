---
@fileoverview Defines the UI design principles and rules for the Sale-Smell application, focusing on minimalist design, smooth animations, and consistent user experience patterns.

# 🎨 Sale-Smell UI Rules

## Overview
This document outlines the core UI design principles and rules for the Sale-Smell application, ensuring a consistent, minimalist, and animated user experience across all components and interactions.

---

## 🎯 Core Design Principles

### Minimalism First
- **Purpose:** Clean, uncluttered interface that focuses on content
- **Implementation:**
  - Remove unnecessary elements
  - Use whitespace effectively
  - Limit color palette to essential colors
  - Focus on typography and spacing
  - Reduce cognitive load

### Animation as Enhancement
- **Purpose:** Smooth, purposeful animations that guide user attention
- **Implementation:**
  - Use animations to show state changes
  - Provide feedback for user actions
  - Guide attention to important elements
  - Maintain 60fps performance
  - Respect user motion preferences

### Accessibility by Default
- **Purpose:** Ensure the application is usable by everyone
- **Implementation:**
  - High contrast ratios (4.5:1 minimum)
  - Keyboard navigation support
  - Screen reader compatibility
  - Focus indicators
  - Reduced motion support

---

## 📱 Layout & Structure

### Grid System
- **12-column responsive grid**
- **Breakpoints:** Mobile (320px), Tablet (768px), Desktop (1024px+)
- **Container max-width:** 1200px
- **Gutters:** 16px mobile, 24px tablet, 32px desktop

### Spacing Scale
- **Base unit:** 4px
- **Scale:** 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px
- **Consistent spacing** throughout the application

### Component Hierarchy
- **Primary:** Main content areas
- **Secondary:** Supporting elements
- **Tertiary:** Background elements
- **Clear visual hierarchy** through size and spacing

---

## 🎭 Animation Guidelines

### Animation Principles
- **Duration:** 150ms for micro-interactions, 300ms for state changes
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` for smooth transitions
- **Performance:** Use `transform` and `opacity` for 60fps animations
- **Reduced Motion:** Respect `prefers-reduced-motion` media query

### Animation Types

#### Micro-interactions
- **Hover effects:** Subtle scale (1.02) or color changes
- **Focus states:** Clear visual indicators
- **Button feedback:** Scale down on press (0.98)
- **Loading states:** Smooth spinners and progress indicators

#### Page Transitions
- **Fade in/out:** Smooth opacity transitions
- **Slide transitions:** Horizontal or vertical slides
- **Staggered animations:** Sequential element reveals
- **Loading sequences:** Progressive content loading

#### State Changes
- **Form validation:** Smooth error/success states
- **Data updates:** Gentle fade transitions
- **Modal open/close:** Scale and fade combinations
- **List updates:** Smooth add/remove animations

### Animation Performance
- **GPU acceleration:** Use `transform3d()` for hardware acceleration
- **Will-change:** Apply only when needed
- **Debouncing:** Prevent animation conflicts
- **Cleanup:** Remove animation classes after completion

---

## 🧩 Component Patterns

### Buttons
- **Primary:** Solid background, prominent action
- **Secondary:** Outlined style, supporting action
- **Tertiary:** Text-only, subtle action
- **States:** Default, hover, active, disabled, loading
- **Animation:** Scale on hover, press feedback

### Cards
- **Elevation:** Subtle shadows for depth
- **Hover:** Gentle lift animation
- **Content:** Clear hierarchy with proper spacing
- **Interactive:** Smooth transitions on interaction

### Forms
- **Input states:** Focus, error, success, disabled
- **Validation:** Real-time feedback with animations
- **Progress:** Visual progress indicators
- **Submission:** Loading states and success feedback

### Navigation
- **Breadcrumbs:** Clear path indication
- **Active states:** Clear current location
- **Hover effects:** Subtle feedback
- **Mobile:** Smooth hamburger menu animations

### Data Display
- **Tables:** Clean, scannable layout
- **Charts:** Minimal, focused visualizations
- **Metrics:** Clear number presentation
- **Status indicators:** Color-coded with accessibility

---

## 📊 Dashboard-Specific Rules

### Layout Structure
- **Header:** Fixed navigation with branding
- **Sidebar:** Collapsible for mobile
- **Main content:** Flexible grid system
- **Footer:** Minimal, essential links only

### Content Organization
- **Transcript viewer:** Scrollable, searchable, highlighted
- **Metrics display:** Cards with clear hierarchy
- **Charts:** Minimal, focused on data
- **Actions:** Prominent download buttons

### Interactive Elements
- **File upload:** Drag-and-drop with visual feedback
- **Progress indicators:** Clear status communication
- **Error states:** Helpful, actionable messages
- **Success states:** Confirmation with next steps

---

## 🎨 Visual Hierarchy

### Typography Scale
- **Headings:** Clear hierarchy (h1-h6)
- **Body text:** Readable line height (1.6)
- **Captions:** Smaller, supporting text
- **Code:** Monospace for technical content

### Color Usage
- **Primary:** Brand color for main actions
- **Secondary:** Supporting colors for variety
- **Neutral:** Grays for text and backgrounds
- **Semantic:** Success, warning, error colors

### Iconography
- **Consistent style:** Outlined or filled
- **Meaningful:** Clear, recognizable icons
- **Accessible:** Proper alt text and labels
- **Scalable:** Vector-based for crisp display

---

## 📱 Responsive Design

### Mobile First
- **Touch targets:** Minimum 44px for touch
- **Gesture support:** Swipe, pinch, tap
- **Viewport:** Proper meta tags
- **Performance:** Optimized for mobile networks

### Breakpoint Strategy
- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+
- **Progressive enhancement:** Add features for larger screens

### Content Adaptation
- **Flexible layouts:** Adapt to screen size
- **Content priority:** Most important content first
- **Navigation:** Collapsible for mobile
- **Images:** Responsive with proper sizing

---

## ♿ Accessibility Standards

### WCAG 2.1 Compliance
- **Level AA:** Minimum compliance target
- **Color contrast:** 4.5:1 for normal text
- **Focus management:** Clear focus indicators
- **Keyboard navigation:** Full keyboard support

### Screen Reader Support
- **Semantic HTML:** Proper heading structure
- **Alt text:** Descriptive image descriptions
- **ARIA labels:** Additional context where needed
- **Landmarks:** Proper page structure

### Motion Sensitivity
- **Reduced motion:** Respect user preferences
- **Animation alternatives:** Static alternatives available
- **Performance:** Smooth animations for all users
- **Testing:** Regular accessibility audits

---

## 🧪 Testing & Validation

### Design Review
- **Consistency check:** Regular design audits
- **Accessibility testing:** Automated and manual testing
- **Performance testing:** Animation performance monitoring
- **User testing:** Regular feedback collection

### Implementation Guidelines
- **Component library:** Reusable, consistent components
- **Style guide:** Documented design patterns
- **Code review:** Design implementation review
- **Documentation:** Clear component documentation

---

## 📋 Implementation Checklist

### Setup
- [ ] Configure Tailwind CSS with custom theme
- [ ] Set up animation libraries (Framer Motion)
- [ ] Implement accessibility testing tools
- [ ] Configure responsive breakpoints
- [ ] Set up design token system

### Development
- [ ] Follow component-first approach
- [ ] Implement consistent spacing
- [ ] Add smooth animations
- [ ] Ensure keyboard navigation
- [ ] Test across devices

### Quality Assurance
- [ ] Accessibility audit
- [ ] Performance testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Animation performance

---

## 🔄 Maintenance

### Regular Reviews
- **Monthly:** Design consistency audit
- **Quarterly:** Accessibility compliance check
- **Annually:** Complete design system review
- **Continuous:** User feedback integration

### Updates
- **Component updates:** Maintain consistency
- **Animation refinements:** Performance optimization
- **Accessibility improvements:** Ongoing enhancements
- **User experience:** Continuous iteration 