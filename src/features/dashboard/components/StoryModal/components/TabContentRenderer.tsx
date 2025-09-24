import React from 'react';
import DiagramsPage from '../../../../diagrams/pages/DiagramsPage';
import MissionsTab from '../tabs/MissionsTab';
import LeavesTab from '../tabs/LeavesTab';
import PerformanceTab from '../tabs/PerformanceTab';
import type { Tab, TabContent } from '../../../types';

interface TabContentRendererProps {
  tabs: Tab[];
  currentSlide: number;
  data: TabContent;
  loading: boolean;
  onDeleteLeave: (id: number) => void;
}

const TabContentRenderer: React.FC<TabContentRendererProps> = ({
  tabs,
  currentSlide,
  data,
  loading,
  onDeleteLeave
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-8 h-8 border-3 border-cyan-200 border-t-cyan-600 rounded-full animate-spin" />
      </div>
    );
  }

  const currentTab = tabs[currentSlide];

  switch (currentTab.id) {
    case "missions":
      return (
        <MissionsTab 
          missions={data.missions} 
          loading={loading}
        />
      );
    case "leaves":
      return (
        <LeavesTab 
          leaves={data.leaves} 
          loading={loading}
          onDeleteLeave={onDeleteLeave}
        />
      );
    case "performance":
      return (
        <PerformanceTab 
          performance={data.performance} 
          loading={loading}
        />
      );
    case "charts":
      return <DiagramsPage />;
    default:
      return null;
  }
};

export default TabContentRenderer;
