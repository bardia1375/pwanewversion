export interface Tab {
  id: string;
  label: string;
}

export interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string;
}

export interface TabContent {
  missions: unknown[];
  leaves: unknown[];
  performance: unknown[];
}

export type TabId = 'missions' | 'leaves' | 'performance' | 'charts';

// Dashboard ActionButton (single button)
export interface DashboardActionButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

// Modal ActionButtons (multiple buttons container)
export interface ModalActionButtonsProps {
  showButtons: boolean;
  onAddNew: () => void;
  onViewDetails: () => void;
}

// Dashboard TabNavigation (for day/month switching)
export interface DashboardTabNavigationProps {
  activeTab: "day" | "month";
  onTabChange: (tab: "day" | "month") => void;
}

export interface TimeDetailsProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export interface ContentSectionProps {
  tabs: Tab[];
  currentSlide: number;
  data: TabContent;
  loading: boolean;
  showButtons: boolean;
  isExpanded: boolean;
  onDeleteLeave: (id: number) => void;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onAddNew: () => void;
  onViewDetails: () => void;
  onExpandToggle: (expanded: boolean) => void;
  onDragProgress?: (progress: number) => void;
}

export interface HeaderSectionProps {
  tabs: Tab[];
  currentSlide: number;
  onTabChange: (index: number) => void;
  onClose: () => void;
  isExpanded: boolean;
  dragProgress?: number; // 0 = normal, 1 = fully expanded
}

// Modal TabNavigation (for slide-based tab switching)
export interface ModalTabNavigationProps {
  tabs: Tab[];
  currentSlide: number;
  onTabChange: (index: number) => void;
}

export interface LeavesTabProps {
  leaves: unknown[];
  loading: boolean;
  onDeleteLeave: (id: number) => void;
}
export interface MissionsTabProps {
  missions: unknown[];
  loading: boolean;
}
export interface PerformanceTabProps {
  performance: unknown[];
  loading: boolean;
}