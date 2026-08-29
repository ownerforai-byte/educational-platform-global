
## KEY IMPLEMENTATION NOTES

1. **ResizeObserver Pattern**: Always use ResizeObserver on the container ref, not window resize
2. **Cleanup**: Disconnect ResizeObserver, dispose renderer, remove DOM element, set cancelled flag
3. **Responsive Heights**: Use `clamp(300px, 50vh, 600px)` for all 3D containers
4. **Width**: Use `w-full` on all containers, cards, inputs, buttons
5. **Mobile-First**: Use `flex-col` on mobile, `sm:flex-row` on desktop
6. **Touch Support**: Use pointer events instead of mouse events for 3D interactions
7. **Performance**: Use `Math.min(window.devicePixelRatio, 2)` for pixel ratio
8. **Error Handling**: Wrap Three.js imports in try-catch, check WebGL availability

## CATEGORY COLORS FOR PERIODIC TABLE
