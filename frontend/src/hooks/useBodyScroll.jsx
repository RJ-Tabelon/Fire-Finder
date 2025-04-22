import { useEffect } from 'react';

export function useBodyScroll(allowScroll = true) {
  useEffect(() => {
    // Save the original values
    const originalStyle = document.body.style.cssText;
    const originalOverflow = document.documentElement.style.overflow;
    
    if (allowScroll) {
      // Enable scrolling on both body and html elements
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.documentElement.style.overflow = 'auto';
    } else {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    
    // Clean up function
    return () => {
      // Restore original styles
      document.body.style.cssText = originalStyle;
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [allowScroll]);
}