import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Features
import { 
  QuickActions, 
  PerformanceAnalytics,
  BottomNavigation,
  MapModal,
  Header,
  FingerprintButton
} from "../components/overview/index";
import { useOverview } from "../hooks/useOverview";
import { GRADIENT_BACKGROUND } from "../constants/index";
import OverviewCard from "../components/overview/OverviewCard";
import { StoryModal } from "../components/StoryModal";

// Fix Leaflet default icon issue
interface IconDefaultType {
  _getIconUrl?: unknown;
}
delete (L.Icon.Default.prototype as IconDefaultType)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function OverView() {
  const isDarkMode = false;
  
  const {
    showMapModal,
    isLoadingLocation,
    locationChecked,
    userLocation,
    activeNavItem,
    overviewData,
    quickActions,
    handleFingerprintClick,
    handleCloseModal,
    handleCheckLocation,
    handleTakeSelfie,
    handleNavItemClick,
    handleQuickActionClick,
    storyModalOpen
  } = useOverview();

  
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: GRADIENT_BACKGROUND }}
      dir="rtl"
    >
      <Header 
        isDarkMode={isDarkMode}
        onMenuClick={() => console.log('Menu clicked')}
        onNotificationClick={() => console.log('Notification clicked')}
        onProfileClick={() => console.log('Profile clicked')}
      />

      <main className="relative z-10 flex-1 flex flex-col -mt-20">
        <div className="relative z-10 bg-white rounded-t-[24px] shadow-xl flex-1 px-4 sm:px-6 pt-16 pb-24 overflow-visible">
          <FingerprintButton onClick={handleFingerprintClick} />

          <div className="text-center ">
          </div>

          <OverviewCard data={overviewData} />

          <QuickActions 
            actions={quickActions.map(action => ({
              ...action,
              onClick: () => handleQuickActionClick()
            }))} 
          />

          <PerformanceAnalytics />
        </div>
      </main>

      <MapModal
        isOpen={showMapModal}
        isLoadingLocation={isLoadingLocation}
        locationChecked={locationChecked}
        userLocation={userLocation}
        onClose={handleCloseModal}
        onCheckLocation={handleCheckLocation}
        onTakeSelfie={handleTakeSelfie}
      />
    <StoryModal isOpen={storyModalOpen} onClose={() => handleQuickActionClick()}/>
      <BottomNavigation
        activeItem={activeNavItem}
        onItemClick={handleNavItemClick}
        onMainAction={handleFingerprintClick}
      />
    </div>
  );
}

export default OverView;