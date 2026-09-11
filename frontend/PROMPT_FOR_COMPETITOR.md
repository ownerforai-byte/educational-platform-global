# COMPREHENSIVE PROMPT FOR RECREATING ADVANCED RESPONSIVE LAB COMPONENTS

Create a complete interactive science lab application with the following specifications:

## CORE RESPONSIVE DESIGN REQUIREMENTS

All components MUST implement:
- Auto-adjust to any screen size using CSS clamp() for heights: `clamp(300px, 50vh, 600px)`
- Use ResizeObserver for dynamic container resizing (NOT window resize events)
- Proper cleanup on unmount (disconnect ResizeObserver, dispose Three.js renderer, remove DOM elements)
- Use `w-full` for width responsiveness on all containers, cards, and inputs
- Responsive buttons: `flex-1 min-w-[100px]` on mobile, auto on desktop
- Responsive selects: `w-full sm:w-40` or `w-full sm:w-52`
- Responsive tabs: `flex-1 min-w-[120px]` for even distribution
- Responsive grids: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`
- All 3D containers must have `style={{ height: 'clamp(300px, 50vh, 600px)' }}`

## THREE.JS SCENE SETUP PATTERN

