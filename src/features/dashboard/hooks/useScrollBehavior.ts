import { useState } from 'react';

/**
 * Custom hook to handle scroll behavior and button visibility
 */
export const useScrollBehavior = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const currentScrollTop = target.scrollTop;
    const scrollingDown = currentScrollTop > lastScrollTop;

    // Calculate total content height and visible height
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    // Check if scrolled to the bottom (with a 20px tolerance)
    const isAtBottom = scrollHeight - (currentScrollTop + clientHeight) < 20;

    if (Math.abs(currentScrollTop - lastScrollTop) > 10) {
      // Show buttons when scrolling up or at the bottom
      setShowButtons(!scrollingDown || isAtBottom);
      setLastScrollTop(currentScrollTop);
    }

    // Always show buttons at the end, even if scrolled less than 10 pixels
    if (isAtBottom) {
      setShowButtons(true);
    }
  };

  return { showButtons, handleScroll };
};
