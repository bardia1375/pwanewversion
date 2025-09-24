import React from 'react';
import { motion } from 'framer-motion';
import CloseButton from './CloseButton';
import TabNavigation from './TabNavigation';
import type { HeaderSectionProps } from '../../../types';


const HeaderSection: React.FC<HeaderSectionProps> = ({
  tabs,
  currentSlide,
  onTabChange,
  onClose
}) => {
  return (
    <motion.div
      className="w-full bg-gradient-to-b from-[#0d2b6b] to-[#6ec6e7] pt-4 px-4 h-60 cursor-grab active:cursor-grabbing relative"
      onPointerDown={() => (document.body.style.cursor = "grabbing")}
      onPointerUp={() => (document.body.style.cursor = "auto")}
    >
      <CloseButton onClose={onClose} />
      <TabNavigation 
        tabs={tabs}
        currentSlide={currentSlide}
        onTabChange={onTabChange}
      />
    </motion.div>
  );
};

export default HeaderSection;
