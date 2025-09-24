import React, { useState, useRef, useEffect, useId } from 'react';
import { motion, useAnimation, useMotionValue, type PanInfo } from 'framer-motion';
import { cn } from '../../../utils';

interface SwipeableCardProps {
  children: React.ReactNode;
  className?: string;
  onDelete?: () => void;
  onCopy?: () => void;
  copyTooltip?: string;
  showActionButtons?: boolean;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  className,
  onDelete,
  onCopy,
  copyTooltip,
  // We don't need deleteThreshold anymore as we're using a fixed small threshold
  showActionButtons = true,
}) => {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const cardId = useId(); // ایجاد شناسه یکتا برای هر کارت
  
  // تنظیم ثابت فاصله بین کارت‌ها
  const CARD_GAP = 8; // فاصله ثابت بین کارت‌ها به پیکسل
  
  // Track drag position in real-time
  useEffect(() => {
    const unsubscribe = x.onChange((value) => {
      // If dragged more than the minimal threshold, open the actions
      if (value < -20 && !isOpen && showActionButtons) {
        setIsOpen(true);
      } else if (value > -10 && isOpen) {
        setIsOpen(false);
      }
    });
    
    return () => unsubscribe();
  }, [x, isOpen, showActionButtons]);

  // Handle drag action
  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Show action buttons even with small drag movements
    if (info.offset.x < -20 && !isOpen && showActionButtons) {
      setIsOpen(true);
      controls.start({ 
        x: -170, 
        transition: { type: "spring", stiffness: 500, damping: 30 } 
      });
    }
  };

  // Handle drag end
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    // More sensitive threshold to reveal actions
    if (info.offset.x < -20 && showActionButtons) {
      // Reveal action buttons with optimized spring animation
      setIsOpen(true);
      controls.start({ 
        x: -170, 
        transition: { 
          type: "spring", 
          stiffness: 500, // Higher stiffness for faster response
          damping: 25,    // Lower damping for more responsive feel
          mass: 0.5       // Lower mass makes it feel lighter/faster
        } 
      });
    } else {
      // Close and snap back with optimized animation
      setIsOpen(false);
      controls.start({ 
        x: 0, 
        transition: { 
          type: "spring", 
          stiffness: 600, 
          damping: 20,
          mass: 0.5
        } 
      });
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      // Set removing state to trigger exit animations and hide action buttons
      setIsRemoving(true);
      setIsOpen(false);
      
      // First, slide the card out to the left
      controls.start({ 
        x: -500, 
        opacity: 0,
        transition: { 
          duration: 0.25, 
          ease: "easeOut" 
        }
      }).then(() => {
        // Then, collapse the height with spring physics for natural gap filling
        controls.start({ 
          height: 0,
          marginBottom: 0, // صراحتاً marginBottom را صفر می‌کنیم
          paddingTop: 0,
          paddingBottom: 0,
          overflow: "hidden",
          transition: { 
            type: "spring",
            stiffness: 800, // افزایش بیشتر سختی فنر
            damping: 35,
            mass: 0.3, // کاهش بیشتر جرم
            duration: 0.2 // کاهش بیشتر زمان انیمیشن
          }
        }).then(() => {
          // Call the onDelete callback after animations complete
          onDelete();
        });
      });
    }
  };
  
  const handleCopy = () => {
    if (onCopy) {
      // Faster, more responsive feedback
      controls.start({ 
        scale: [1, 1.02, 1],
        transition: { duration: 0.2 } 
      }).then(() => {
        onCopy();
        // Return to normal position after copy
        setIsOpen(false);
        controls.start({ x: 0 });
      });
    }
  };

  return (
    <motion.div 
      layout="position"
      layoutId={`card-container-${cardId}`}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        isRemoving ? "overflow-hidden" : ""
      )} 
      ref={constraintsRef}
      style={{ 
        willChange: "transform, opacity, height, margin",
        transformOrigin: "center top",
        marginBottom: isRemoving ? 0 : `${CARD_GAP}px`, // در حالت حذف، margin را صفر می‌کنیم
        transition: "margin-bottom 0.2s ease-out" // انیمیشن نرم برای تغییر margin
      }}
    >
      {/* Action buttons that appear when card is swiped */}
      {showActionButtons && !isRemoving && (
        <motion.div 
          className="absolute top-0 right-0 bottom-0 flex items-center justify-end z-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Copy button */}
          <div className="h-full w-[80px] bg-blue-500 text-white flex items-center justify-center">
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center h-full w-full"
              aria-label="Copy item"
              title={copyTooltip || "Copy"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          
          {/* Delete button */}
          <div className="h-full w-[90px] bg-red-500 text-white flex items-center justify-center">
            <button 
              onClick={handleDelete}
              className="flex items-center justify-center h-full w-full"
              aria-label="Delete item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Card */}
      <motion.div
        layout="position"
        layoutId={`card-content-${cardId}`}
        drag="x"
        dragDirectionLock
        style={{ x }}
        dragConstraints={{ left: showActionButtons ? -170 : 0, right: 0 }}
        dragElastic={0.05}
        dragTransition={{ 
          power: 0.2,
          timeConstant: 0.2,
          modifyTarget: (target) => Math.round(target / 85) * 85,
        }}
        whileDrag={{ cursor: "grabbing" }}
        whileTap={{ scale: 0.98 }}
        animate={controls}
        onDragStart={() => setIsDragging(true)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        transition={{
          layout: { 
            type: "spring", 
            stiffness: 800, // افزایش سختی برای حرکت سریع‌تر و دقیق‌تر
            damping: 35,
            mass: 0.3,
            restDelta: 0.001, // برای دقت بیشتر در موقعیت‌دهی
            duration: 0.2 // کاهش زمان انیمیشن
          }
        }}
        className={cn(
          "bg-secondary rounded-2xl w-full z-10 relative touch-none p-4", 
          isDragging ? "cursor-grabbing" : "cursor-grab",
          isOpen ? "shadow-md" : "",
          isRemoving ? "pointer-events-none" : "",
          className
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default SwipeableCard;
