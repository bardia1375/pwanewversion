import React from 'react';
import { motion } from 'framer-motion';
import type { ModalActionButtonsProps } from '../../../types';

const ActionButtons: React.FC<ModalActionButtonsProps> = ({ 
  showButtons,
  onAddNew,
  onViewDetails 
}) => {
  return (
    <motion.div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20"
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: showButtons ? 0 : 100,
        opacity: showButtons ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <motion.button
        className="w-12 h-12 bg-gradient-to-r from-[#1a3766] to-[#2c4f8f] rounded-full 
          flex items-center justify-center shadow-lg relative group overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddNew}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#264785] to-[#3a62a8] 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="relative z-10"
        >
          <path
            d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
            fill="white"
          />
        </svg>
      </motion.button>
      
      <motion.button
        className="h-10 px-4 bg-white text-[#1a3766] rounded-full
          flex items-center gap-2 group relative overflow-hidden"
        initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 15px -3px rgba(26, 55, 102, 0.3)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onViewDetails}
      >
        {/* Border gradient animation */}
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-[#1a3766] via-[#264785] to-[#1a3766] opacity-80"
          style={{
            WebkitMaskImage:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          }}
        />

        {/* Hover effect gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#1a3766] via-[#264785] to-[#1a3766] 
          opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full"
        />

        {/* Button content */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="font-semibold text-[13px]">
            جزئیات بیشتر
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform duration-300 group-hover:rotate-12"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
              fill="currentColor"
            />
            <path
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 13h-2v-6h2v6zm0-8h-2V7h2v2z"
              fill="currentColor"
              fillOpacity="0.3"
            />
          </svg>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-1000 transition-opacity">
          <div className="absolute inset-0 rotate-180 overflow-hidden rounded-full">
            <div
              className="absolute -left-[100%] top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent transform 
              group-hover:animate-[shine_1.5s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </motion.button>

      {/* Global CSS for shine animation */}
      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ActionButtons;
