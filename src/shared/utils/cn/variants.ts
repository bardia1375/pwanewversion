import { createVariants } from './index';

export interface ButtonVariantTypes {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'| 'gradient'| 'cyan';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'full';
  fullWidth: boolean;
}

/**
 * Shared button variants configuration
 */
export const buttonVariants = createVariants({
  variant: {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary/50',
    secondary: 'bg-text text-white hover:bg-text-600 focus:ring-2 focus:ring-text/50',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/50',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/50',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500/50',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500/50',
    gradient: 'bg-gradient-to-r from-[#0d2b6b] to-[#6ec6e7] text-white shadow-md hover:opacity-90 focus:ring-2 focus:ring-[#6ec6e7]/50',
    cyan: 'bg-cyan text-white shadow-md hover:opacity-90 focus:ring-2 focus:ring-cyan/50',
  },
  size: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    full: 'rounded-full'
  },
  fullWidth: {
    true: 'w-full',
    false: ''
  }
});

/**
 * Shared input variants configuration
 */
export const inputVariants = createVariants({
  variant: {
    default: 'border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/50',
    error: 'border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 text-red-900 placeholder-red-300',
    success: 'border-2 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/50'
  },
  size: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    full: 'rounded-full'
  },
  fullWidth: {
    true: 'w-full',
    false: 'w-auto'
  }
});

/**
 * Shared card variants configuration
 */
export const cardVariants = createVariants({
  variant: {
    default: 'bg-white shadow border border-gray-100',
    elevated: 'bg-white shadow-md hover:shadow-lg transition-shadow duration-200',
    bordered: 'bg-white border-2 border-primary/20',
    ghost: 'bg-primary/5'
  },
  padding: {
    none: '',
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }
});
