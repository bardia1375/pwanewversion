/**
 * Dashboard Types Documentation
 * 
 * This file contains all TypeScript interfaces and types used in the dashboard feature.
 * Types are organized by component/functionality to avoid naming conflicts.
 */

// ============================================================================
// COMPONENT TYPES GUIDE
// ============================================================================

/**
 * DashboardActionButtonProps
 * Used for: Individual action buttons in the dashboard main area
 * Location: components/common/DashboardActions.tsx
 * 
 * Example:
 * <ActionButton 
 *   icon={<SomeIcon />} 
 *   label="مأموریت‌ها" 
 *   isActive={true}
 *   onClick={handleClick}
 * />
 */

/**
 * ModalActionButtonsProps
 * Used for: Action buttons container inside StoryModal
 * Location: components/StoryModal/components/ActionButtons.tsx
 * 
 * Example:
 * <ActionButtons 
 *   showButtons={true}
 *   onAddNew={handleAdd}
 *   onViewDetails={handleView}
 * />
 */

/**
 * DashboardTabNavigationProps
 * Used for: Day/Month tab switching in dashboard
 * Location: components/common/DashboardTabs.tsx
 * 
 * Example:
 * <TabNavigation 
 *   activeTab="day"
 *   onTabChange={(tab) => setActiveTab(tab)}
 * />
 */

/**
 * ModalTabNavigationProps
 * Used for: Slide-based tab navigation in StoryModal
 * Location: components/StoryModal/components/TabNavigation.tsx
 * 
 * Example:
 * <TabNavigation 
 *   tabs={TABS}
 *   currentSlide={0}
 *   onTabChange={(index) => setCurrentSlide(index)}
 * />
 */

/**
 * NAMING CONVENTION:
 * - Use specific prefixes (Dashboard, Modal, etc.) to avoid conflicts
 * - Single items: "Props" (e.g., DashboardActionButtonProps)
 * - Multiple items/containers: "Props" with plural context (e.g., ModalActionButtonsProps)
 * - Different behaviors: Use clear descriptive names (DashboardTabNavigation vs ModalTabNavigation)
 */
