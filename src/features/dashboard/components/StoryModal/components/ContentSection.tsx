import React from 'react';
import ActionButtons from './ActionButtons';
import TabContentRenderer from './TabContentRenderer';
import type { ContentSectionProps } from '../../../types';


const ContentSection: React.FC<ContentSectionProps> = ({
  tabs,
  currentSlide,
  data,
  loading,
  showButtons,
  onDeleteLeave,
  onScroll,
  onAddNew,
  onViewDetails
}) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 w-full bg-white shadow-xl z-10
        h-[calc(100dvh-170px)] overflow-y-auto rounded-t-[2.5rem] -mt-8 touch-pan-y overscroll-contain"
      onPointerDown={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest(".overflow-y-auto")) {
          e.stopPropagation();
        }
      }}
      onScroll={onScroll}
    >
      {/* Content Area */}
      <div className="px-3 pt-6 pb-20 text-sm">
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
    </div>
  );
};

export default ContentSection;
