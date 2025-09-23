export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "gradient"
  | "cyan";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export const buttonVariants = {
  primary:
    "bg-primary text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary/50",
  secondary:
    "bg-text text-white hover:bg-text-600 focus:ring-2 focus:ring-text/50",
  outline:
    "border-2 border-primary text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/50",
  ghost: "text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/50",
  danger:
    "bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500/50",
  success:
    "bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500/50",
  gradient:
    "bg-gradient-to-r from-[#0d2b6b] to-[#6ec6e7] text-white shadow-md hover:opacity-90 focus:ring-2 focus:ring-[#6ec6e7]/50",
  cyan: "bg-cyan text-white shadow-md hover:opacity-90 focus:ring-2 focus:ring-cyan/50",
} as const;

export const buttonSizes = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
} as const;

export const buttonRounded = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const;
