import React from 'react';
import { motion } from 'framer-motion';
import CloseButton from './CloseButton';
import TabNavigation from './TabNavigation';
import type { HeaderSectionProps } from '../../../types';


const HeaderSection: React.FC<HeaderSectionProps> = ({
  tabs,
  currentSlide,
  onTabChange,
  onClose,
  isExpanded
}) => {
  const spring = { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 } as const;

  return (
    <motion.div
      className={`w-full bg-gradient-to-b from-[#0d2b6b] to-[#6ec6e7] pt-4 px-4 cursor-grab active:cursor-grabbing relative ${
        isExpanded ? 'h-20' : 'h-60'
      }`}
      onPointerDown={() => (document.body.style.cursor = "grabbing")}
      onPointerUp={() => (document.body.style.cursor = "auto")}
      animate={{ height: isExpanded ? 240 : 240 }}
      transition={spring}
    >
      <CloseButton onClose={onClose} />
      <motion.div
        animate={{
          opacity: isExpanded ? 0.7 : 1,
          scale: isExpanded ? 0.82 : 1, // کمی نرم تر
          y: isExpanded ? -10 : 0
        }}
        transition={spring}
      >
        <TabNavigation
          tabs={tabs}
          currentSlide={currentSlide}
          onTabChange={onTabChange}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeaderSection;
