import { forwardRef } from "react";
import { cn } from "../../../utils";
import { LoadingSpinner } from "../LoadingSpinner";
import {
  type ButtonVariant,
  type ButtonSize,
  type ButtonRounded,
  buttonVariants,
  buttonSizes,
  buttonRounded,
} from "./button-variants";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  fullWidth?: boolean;
  className?: string;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = "primary",
  size = "md",
  rounded = "md",
  fullWidth = false,
  className = "",
  children,
  isLoading = false,
  disabled,
  type = "button",
  ...rest
}, ref) => {
  const classes = cn(
    // Base styles
    "inline-flex items-center justify-center transition-all duration-200",
    "focus:outline-none focus:ring-offset-2",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    // Variant, size and rounded styles
    buttonVariants[variant],
    buttonSizes[size],
    buttonRounded[rounded],
    // Conditional styles
    {
      "w-full": fullWidth,
      "gap-2": isLoading,
    },
    className
  );

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <LoadingSpinner />}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
