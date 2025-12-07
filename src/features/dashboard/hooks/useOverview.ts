import React, { useState, useCallback } from 'react';
import type { QuickActionItem } from '../types/overview.js';
import { QUICK_ACTIONS_CONFIG, SAMPLE_OVERVIEW_DATA } from '../constants/index.js';

export const useOverview = () => {
  const [showMapModal, setShowMapModal] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationChecked, setLocationChecked] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [activeNavItem, setActiveNavItem] = useState("fingerprint");
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  // Convert config to actions with actual JSX icons
  const quickActions: QuickActionItem[] = QUICK_ACTIONS_CONFIG.map(action => ({
    ...action,
    icon: React.createElement('svg', {
      viewBox: "0 0 24 24",
      width: "20",
      height: "20",
      fill: "currentColor"
    }, React.createElement('path', { d: action.iconPath })),
  }));

  const handleFingerprintClick = useCallback(() => {
    console.log("salam");
    setShowMapModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowMapModal(false);
    setLocationChecked(false);
    setUserLocation(null);
    setIsLoadingLocation(false);
  }, []);

  const handleCheckLocation = useCallback(() => {
    setIsLoadingLocation(true);

    // Simulate location checking with geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            setUserLocation([
              position.coords.latitude,
              position.coords.longitude,
            ]);
            setIsLoadingLocation(false);
            setLocationChecked(true);
          }, 2000); // 2 second delay for loading animation
        },
        () => {
          // Fallback to a demo location near the office
          setTimeout(() => {
            setUserLocation([35.722, 51.3348]); // Close to office location
            setIsLoadingLocation(false);
            setLocationChecked(true);
          }, 2000);
        }
      );
    } else {
      // Fallback for browsers that don't support geolocation
      setTimeout(() => {
        setUserLocation([35.722, 51.3348]);
        setIsLoadingLocation(false);
        setLocationChecked(true);
      }, 2000);
    }
  }, []);

  const handleTakeSelfie = useCallback(() => {
    alert("دوربین برای گرفتن سلفی باز خواهد شد");
    // Here you would implement camera functionality
  }, []);

  const handleNavItemClick = useCallback((itemId: string) => {
    setActiveNavItem(itemId);
  }, []);

  const handleQuickActionClick = () => {
    console.log("salam");
    
    setStoryModalOpen(!storyModalOpen);
    // Here you would implement navigation to specific features
  }

  return {
    // State
    showMapModal,
    isLoadingLocation,
    locationChecked,
    userLocation,
    activeNavItem,
    storyModalOpen,
    // Data
    overviewData: SAMPLE_OVERVIEW_DATA,
    quickActions,
    
    // Handlers
    handleFingerprintClick,
    handleCloseModal,
    handleCheckLocation,
    handleTakeSelfie,
    handleNavItemClick,
    handleQuickActionClick,
  };
};