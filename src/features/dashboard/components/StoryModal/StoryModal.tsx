import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalBackdrop from "./components/ModalBackdrop";
import HeaderSection from "./components/HeaderSection";
import ContentSection from "./components/ContentSection";

import { createLeaveDeleteHandler } from "../../utils/leaveHandlers";
import { TABS, DEFAULT_TAB } from "../../constants";
import type { StoryModalProps } from "../../types";
import { useBodyScrollLock, useHapticFeedback, useScrollBehavior, useTabData } from "../../hooks";

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  defaultTab = DEFAULT_TAB,
}) => {
  const [currentSlide, setCurrentSlide] = useState(
    TABS.findIndex((tab) => tab.id === defaultTab)
  );

  // Custom hooks
  useBodyScrollLock(isOpen);
  useHapticFeedback(currentSlide, isOpen);
  const { data, loading, setData } = useTabData(isOpen);
  const { showButtons, handleScroll } = useScrollBehavior();

  // Event handlers
  const handleDeleteLeave = createLeaveDeleteHandler(data.leaves, (leaves) => 
    setData(prev => ({ ...prev, leaves }))
  );

  const handleAddNew = () => {
    console.log("Add new");
  };

  const handleViewDetails = () => {
    console.log("View details");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <ModalBackdrop onClose={onClose} />

          {/* Modal Content */}
          <motion.div
            className="relative h-full"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.7}
            dragMomentum={false}
            onDragEnd={(_e, info) => {
              if (info.offset.y > 100) {
                onClose();
              }
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }} /* تغییر جهت خروج به پایین */
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            dragListener={false}
          >
            {/* Header Section */}
            <HeaderSection 
              tabs={TABS}
              currentSlide={currentSlide}
              onTabChange={setCurrentSlide}
              onClose={onClose}
            />

            {/* Content Section */}
            <ContentSection
              tabs={TABS}
              currentSlide={currentSlide}
              data={data}
              loading={loading}
              showButtons={showButtons}
              onDeleteLeave={handleDeleteLeave}
              onScroll={handleScroll}
              onAddNew={handleAddNew}
              onViewDetails={handleViewDetails}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
