import React from 'react';
import { motion } from 'framer-motion';

interface ModalBackdropProps {
  onClose: () => void;
}

const ModalBackdrop: React.FC<ModalBackdropProps> = ({ onClose }) => {
  return (
    <motion.div
      className="absolute inset-0 bg-black/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />
  );
};

export default ModalBackdrop;
