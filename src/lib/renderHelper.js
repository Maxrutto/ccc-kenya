/**
 * Helper function to ensure components are properly rendered
 * This is particularly useful for pages that might have issues with initial rendering
 */

// Force a repaint by triggering browser reflow/layout
export const forceRepaint = () => {
  if (typeof document !== 'undefined') {
    // Reading a property that forces layout/reflow
    document.body.getBoundingClientRect();
  }
};

// Component wrapper to ensure proper rendering
export const ensureRendered = (Component) => {
  return (props) => {
    // Force a repaint when the component mounts
    if (typeof window !== 'undefined') {
      setTimeout(forceRepaint, 0);
      setTimeout(forceRepaint, 50);
      setTimeout(forceRepaint, 100);
    }
    
    return <Component {...props} />;
  };
}; 