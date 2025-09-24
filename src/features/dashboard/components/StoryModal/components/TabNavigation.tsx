import React from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import type { ModalTabNavigationProps } from '../../../types';


const TabNavigation: React.FC<ModalTabNavigationProps> = ({
  tabs,
  currentSlide,
  onTabChange
}) => {
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    document.body.style.cursor = "auto";
    
    const swipeThreshold = 40;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    if ((offset < -swipeThreshold || velocity < -300) && currentSlide < tabs.length - 1) {
      onTabChange(Math.min(tabs.length - 1, currentSlide + 1));
    } else if ((offset > swipeThreshold || velocity > 300) && currentSlide > 0) {
      onTabChange(Math.max(0, currentSlide - 1));
    }
  };

  const getTabIcon = (tabId: string, isActive: boolean) => {
    const iconColor = isActive ? '#1a3766' : '#fff';
    
    switch (tabId) {
      case 'missions':
        return (
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={iconColor} />
          </svg>
        );
      case 'leaves':
        return (
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" fill={iconColor} />
          </svg>
        );
      case 'performance':
        return (
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill={iconColor} />
          </svg>
        );
      case 'charts':
        return (
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M3 3h2v18H3V3zm16 8h2v10h-2V11zM7 13h2v8H7v-8zm4-6h2v14h-2V7z" fill={iconColor} />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-40 w-full overflow-visible select-none">
      {/* Swipe Layer */}
      <motion.div
        className="absolute inset-0"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.4}
        dragTransition={{ 
          bounceStiffness: 500, 
          bounceDamping: 25
        }}
        whileDrag={{ scale: 0.98 }}
        onDragStart={() => {
          document.body.style.cursor = "grabbing";
        }}
        onDragEnd={handleDragEnd}
      />
      
      {/* Tabs Positioned */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {tabs.map((tab, index) => {
          const diff = Math.abs(index - currentSlide);
          const scale = diff === 0 ? 1 : diff === 1 ? 0.8 : 0.6;
          const opacity = diff > 2 ? 0 : diff === 2 ? 0.35 : 1;
          const translateX = (index - currentSlide) * 120;
          const isActive = index === currentSlide;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(index)}
              className="absolute flex flex-col items-center gap-2 outline-none"
              style={{ pointerEvents: 'auto' }}
              animate={{
                x: translateX,
                scale,
                opacity,
                zIndex: 100 - diff,
              }}
              initial={false}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <motion.div
                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg relative overflow-hidden transition-colors
                  ${isActive ? 'bg-white text-[#1a3766]' : 'bg-white/10 text-white'}
                `}
                whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center gap-2">
                  {getTabIcon(tab.id, isActive)}
                  <span className={`text-xs font-bold ${isActive ? 'text-[#1a3766]' : 'text-white'}`}>
                    {tab.label}
                  </span>
                </div>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full ring-2 ring-white/60"
                    layoutId="activeRing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
