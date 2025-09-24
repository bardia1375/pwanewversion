import React from "react";
import { StoryModal } from "../StoryModal";
import { Button } from "../../../../shared/components/ui";
import type { DashboardActionButtonProps } from "../../types";


const ActionButton: React.FC<DashboardActionButtonProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => (
  <Button
    onClick={onClick}
    className={`group relative flex-1 flex flex-col items-center gap-2 py-3 px-2 
    ${
      isActive
        ? "bg-hover text-text"
        : "bg-white/50 text-[#1a3766] hover:bg-white/70"
    } 
    rounded-2xl transition-all duration-300 ease-out
    hover:transform hover:scale-[1.02]
    border border-white/20 backdrop-blur-sm
    ${
      isActive
        ? ""
        : ""
    }`}
  >
    <div
      className={`relative transition-transform duration-300 group-hover:scale-110 ${
        isActive ? "drop-shadow-[0_0_8px_rgba(110,198,231,0.5)]" : ""
      }`}
    >
      {icon}
    </div>
    <span
      className={`text-sm font-bold transition-all duration-300 ${
        isActive ? "text-text" : "text-[#1a3766] group-hover:text-[#0d2b6b]"
      }`}
    >
      {label}
    </span>
    {/* Hover Effect */}
    <div
      className={`absolute inset-0 rounded-2xl transition-opacity duration-300 
      ${isActive ? "opacity-0" : "opacity-0 group-hover:opacity-10"}
      bg-gradient-to-br from-[#0d2b6b] to-[#6ec6e7]`}
    />
  </Button>
);


export const DashboardActions: React.FC = () => {
  const [activeButton, setActiveButton] = React.useState<string>("missions");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex w-full gap-3 px-3 py-2">
        <ActionButton
          isActive={activeButton === "missions"}
          onClick={() => handleButtonClick("missions")}
          icon={
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                className={`transition-colors duration-300 ${
                  activeButton === "missions" ? "fill-white" : "fill-[#e0b96a]"
                }`}
              />
              <path
                d="M8 12h8M12 8v8"
                stroke={activeButton === "missions" ? "#0d2b6b" : "#1a3766"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          label="مأموریت‌ها"
        />
   
        <ActionButton
          isActive={activeButton === "performance"}
          onClick={() => handleButtonClick("performance")}
          icon={
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                className={`transition-colors duration-300 ${
                  activeButton === "performance"
                    ? "fill-white"
                    : "fill-[#e0b96a]"
                }`}
              />
              <path
                d="M8 12h8"
                stroke={activeButton === "performance" ? "#0d2b6b" : "#1a3766"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          label="کارکرد من"
        />
        <ActionButton
          isActive={activeButton === "leaves"}
          onClick={() => handleButtonClick("leaves")}
          icon={
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                className={`transition-colors duration-300 ${
                  activeButton === "leaves" ? "fill-white" : "fill-[#e0b96a]"
                }`}
              />
              <path
                d="M8 12h8"
                stroke={activeButton === "leaves" ? "#0d2b6b" : "#1a3766"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          label="مرخصی‌ها"
        />
      </div>

      <StoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTab={activeButton}
      />
    </>
  );
};

export default DashboardActions;
