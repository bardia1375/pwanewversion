import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ActionButtons from './ActionButtons';
import TabContentRenderer from './TabContentRenderer';
import type { ContentSectionProps } from '../../../types';


const ContentSection: React.FC<ContentSectionProps> = ({
  tabs,
  currentSlide,
  data,
  loading,
  showButtons,
  isExpanded,
  onDeleteLeave,
  onScroll,
  onAddNew,
  onViewDetails,
  onExpandToggle
}) => {
  const dragStartY = useRef(0);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartY.current = e.clientY;
    e.preventDefault();
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    
    const deltaY = dragStartY.current - e.clientY;
    const threshold = 80; // minimum drag distance to trigger expand/collapse
    
    if (deltaY > threshold && !isExpanded) {
      onExpandToggle(true);
      isDragging.current = false; // Stop dragging after toggle
    } else if (deltaY < -threshold && isExpanded) {
      onExpandToggle(false);
      isDragging.current = false; // Stop dragging after toggle
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  // Unified pointer down on container: if near top (hit zone) start drag
  const handleContainerPointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    // Ignore interactive controls
    if (target.closest('button, a, input, textarea, [data-ignore-drag]')) return;
    if (target.closest('.drag-handle')) return; // normal handle logic will run
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const yOffset = e.clientY - rect.top;
    // 64px top zone acts as extended drag area
    if (yOffset <= 64) {
      handleDragStart(e);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`absolute bottom-0 left-0 right-0 w-full bg-white shadow-xl z-10
        overflow-y-auto rounded-t-[2.5rem] -mt-8 touch-pan-y overscroll-contain transition-all duration-300 select-none ${
        isExpanded ? 'h-[calc(100dvh-50px)]' : 'h-[calc(100dvh-170px)]'
      }`}
      onPointerDown={handleContainerPointerDown}
      onPointerMove={(e) => {
        if (isDragging.current) handleDragMove(e);
      }}
      onPointerUp={() => {
        if (isDragging.current) handleDragEnd();
      }}
      onPointerCancel={handleDragEnd}
      onScroll={onScroll}
      animate={{
        height: isExpanded ? 'calc(100dvh - 50px)' : 'calc(100dvh - 170px)'
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Draggable Handle */}
      <div
        className="drag-handle relative flex justify-center pt-3 pb-4 cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
      >
        {/* Enlarged invisible hit area */}
        <span className="absolute inset-x-0 -top-2 -bottom-2" />
        <div className={`w-14 h-1.5 rounded-full transition-colors duration-200 ${
          isExpanded ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
        }`} />
      </div>

      {/* Content Area */}
      <div className="px-3 pt-2 pb-20 text-sm">
        {/* Action Buttons */}
        <ActionButtons 
          showButtons={showButtons}
          onAddNew={onAddNew}
          onViewDetails={onViewDetails}
        />

        {/* Tab Content */}
        <TabContentRenderer
          tabs={tabs}
          currentSlide={currentSlide}
          data={data}
          loading={loading}
          onDeleteLeave={onDeleteLeave}
        />
      </div>
    </motion.div>
  );
};

export default ContentSection;
