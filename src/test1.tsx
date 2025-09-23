
import React, { memo, useMemo } from "react";
import clsx from "clsx";

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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}


const buttonVariant: Record<ButtonVariant, string> = {
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
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
};

const roundedClasses: Record<ButtonRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};


const Button: React.FC<ButtonProps> = memo(
  ({
    variant = "primary",
    size = "md",
    rounded = "md",
    fullWidth = false,
    className = "",
    children,
    isLoading = false,
    disabled,
    ...rest
  }) => {
    const classes = useMemo(
      () =>
        clsx(
          "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed",
          buttonVariant[variant],
          sizeClasses[size],
          roundedClasses[rounded],
          fullWidth && "w-full",
          className
        ),
      [variant, size, rounded, fullWidth, className]
    );

    return (
      <button
        type={rest.type || "button"}
        className={classes}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...rest}
      >
        {isLoading && (
          <span className="flex items-center mr-2" aria-label="Loading" role="status">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
