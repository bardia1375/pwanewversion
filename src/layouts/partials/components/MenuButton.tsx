import { memo } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../../shared/utils';

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
}

const MENU_BUTTON_CLASSES = {
  base: cn(
    "rounded-full",
    "transition-all duration-200",
    "active:scale-95",
    
  )
} as const;

export const MenuButton = memo(({ 
  onClick, 
  className, 
  isOpen = false,
  type = "button",
  ...props 
}: MenuButtonProps) => (
  <button 
    type={type}
    onClick={onClick}
    className={cn(MENU_BUTTON_CLASSES.base, className)}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
    {...props}
  >
    <svg 
      width="28" 
      height="28" 
      fill="#4ecdd4" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path 
        fill="#4ecdd4" 
        d="M4 6h16M4 12h16M4 18h16" 
        stroke="#4ecdd4" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  </button>
));

MenuButton.displayName = 'MenuButton';
