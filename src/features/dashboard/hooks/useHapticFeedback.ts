import { useEffect, useRef } from 'react';
import { TABS } from '../constants';
import type { TabId } from '../types';

/**
 * Custom hook to handle haptic feedback when changing tabs
 */
export const useHapticFeedback = (currentSlide: number, isOpen: boolean) => {
  const prevSlideRef = useRef<number | null>(null);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    
    const prevIndex = prevSlideRef.current;
    prevSlideRef.current = currentSlide;
    
    if (!isOpen) return;
    if (prevIndex == null) return;
    
    const prevId = TABS[prevIndex]?.id as TabId;
    const newId = TABS[currentSlide]?.id as TabId;
    
    if (!prevId || !newId) return;

    // Fire haptic only when moving away from 'leaves' (مرخصی) to any other tab
    if (prevId === 'leaves' && newId !== 'leaves') {
      try {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          // Pattern: subtle double-tap style (if supported); fallback single
          const vibrated = navigator.vibrate?.([14, 30, 12]) || false;
          if (!vibrated) navigator.vibrate?.(20);
        }
      } catch {
        // ignore silently
      }
    }
  }, [currentSlide, isOpen]);
};
