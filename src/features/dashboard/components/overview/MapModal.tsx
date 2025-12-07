import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

interface MapModalProps {
  isOpen: boolean;
  isLoadingLocation: boolean;
  locationChecked: boolean;
  userLocation: [number, number] | null;
  onClose: () => void;
  onCheckLocation: () => void;
  onTakeSelfie: () => void;
}

// Custom icon for office location marker
const createCustomIcon = () => new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// User location marker icon
const createUserLocationIcon = () => new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const OFFICE_LOCATION: [number, number] = [35.7219, 51.3347];

const MapModal: React.FC<MapModalProps> = ({
  isOpen,
  isLoadingLocation,
  locationChecked,
  userLocation,
  onClose,
  onCheckLocation,
  onTakeSelfie
}) => {
  if (!isOpen) return null;

  const customIcon = createCustomIcon();
  const userLocationIcon = createUserLocationIcon();

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1f6bd8] to-[#14419a] rounded-t-3xl p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">
              بررسی موقعیت
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
              aria-label="بستن modal"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {/* Handle bar for visual indication */}
          <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mt-3" />
        </div>

        {/* Map area */}
        <div className="h-80 relative bg-gray-50">
          {isLoadingLocation && (
            <div className="absolute inset-0 z-20 bg-white/90 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1f6bd8] border-t-transparent mx-auto mb-4" />
                <p className="text-gray-600 font-medium">
                  در حال بررسی موقعیت شما...
                </p>
              </div>
            </div>
          )}

          <MapContainer
            center={userLocation || OFFICE_LOCATION}
            zoom={15}
            style={{ height: "100%", width: "100%", zIndex: 1 }}
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              opacity={0.7}
            />
            
            {/* Office location circles - proximity zones */}
            <Circle
              center={OFFICE_LOCATION}
              pathOptions={{
                color: "#4F46E5",
                fillColor: "#4F46E5",
                fillOpacity: 0.05,
                weight: 1,
              }}
              radius={200}
            />
            <Circle
              center={OFFICE_LOCATION}
              pathOptions={{
                color: "#4F46E5",
                fillColor: "#4F46E5",
                fillOpacity: 0.1,
                weight: 1,
              }}
              radius={100}
            />
            <Circle
              center={OFFICE_LOCATION}
              pathOptions={{
                color: "#4F46E5",
                fillColor: "#4F46E5",
                fillOpacity: 0.2,
                weight: 1,
              }}
              radius={50}
            />

            {/* Office marker */}
            <Marker position={OFFICE_LOCATION} icon={customIcon}>
              <Popup>دفتر مرکزی - درب ورودی</Popup>
            </Marker>

            {/* User location marker */}
            {userLocation && locationChecked && (
              <Marker position={userLocation} icon={userLocationIcon}>
                <Popup>موقعیت فعلی شما</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100">
          {!locationChecked ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                برای ثبت حضور، ابتدا موقعیت خود را بررسی کنید
              </p>
              <button
                onClick={onCheckLocation}
                disabled={isLoadingLocation}
                className="w-full bg-[#1f6bd8] text-white py-4 px-6 rounded-xl font-medium transition-all hover:bg-[#14419a] focus:outline-none focus:ring-2 focus:ring-[#1f6bd8] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingLocation ? "در حال بررسی..." : "بررسی موقعیت"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full ml-2" />
                  <p className="text-green-600 font-medium">
                    موقعیت شما تأیید شد
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  شما در محدوده دفتر قرار دارید
                </p>
              </div>

              <button
                onClick={onTakeSelfie}
                className="w-full bg-green-500 text-white py-4 px-6 rounded-xl font-medium transition-all hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                📸 گرفتن سلفی
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapModal;