import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that handles scrolling when the route changes
 * - Scrolls to the specific element if hash is present in the URL
 * - Scrolls to top otherwise
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Check if this is a new page navigation (not just a hash change on the same page)
    const isNewPageNavigation = prevPathRef.current !== pathname;
    prevPathRef.current = pathname;
    
    // Special case for navigation to Home page sections from other pages
    if (isNewPageNavigation && pathname === '/' && hash) {
      // Allow a tiny delay for the component to render
      setTimeout(() => {
        const elementId = hash.substring(1); // Remove the # symbol
        const element = document.getElementById(elementId);
        
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    
    // For new page navigation without hash or not to home page, immediately force scroll to top
    if (isNewPageNavigation && (!hash || pathname !== '/')) {
      // First approach - direct scrollTo
      window.scrollTo(0, 0);
      
      // Second approach - scrollTo with options
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' // Use 'instant' for immediate scroll
        });
      }, 0);
      
      // Third approach - force layout recalculation and scroll again
      document.body.style.display = 'none';
      document.body.offsetHeight; // Force reflow
      document.body.style.display = '';
      
      // Set scroll behavior to auto for more reliable results
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Return early for new pages - don't process hash here
      return;
    }
    
    // For hash navigation on the same page, use a delayed approach
    if (hash && !isNewPageNavigation) {
      // Function to handle scrolling based on hash
      const handleHashScroll = () => {
        if (!hash) return true;
        
        const elementId = hash.substring(1); // Remove the # symbol
        const element = document.getElementById(elementId);
        
        if (element) {
          // Use smooth behavior for same-page hash navigation
          document.documentElement.style.scrollBehavior = 'smooth';
          element.scrollIntoView();
          return true; // Element found and scrolled
        }
        return false; // Element not found
      };
      
      // First attempt with a short delay
      const timeoutId = setTimeout(() => {
        const scrolled = handleHashScroll();
        
        // If the element wasn't found on first try, attempt again with longer delay
        if (!scrolled) {
          const secondTimeoutId = setTimeout(() => {
            handleHashScroll();
          }, 750);
          return () => clearTimeout(secondTimeoutId);
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, hash]); // Run when pathname or hash changes

  return null; // This component doesn't render anything
};

export default ScrollToTop; 