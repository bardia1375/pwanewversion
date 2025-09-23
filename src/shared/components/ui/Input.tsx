import type { InputHTMLAttributes, FC } from "react";
import { inputVariants } from "../../utils/cn/variants";
import { cn } from "../../utils/cn";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: "default" | "error" | "success";
  size?: "xs" | "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  icon?: React.ReactNode;
}

export const Input: FC<InputProps> = ({
  className,
  variant = "default",
  size = "md",
  rounded = "full",
  icon,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <input
        className={cn(
          inputVariants({ variant, size, rounded }),
          "w-full pr-4 pl-10 bg-white/80 text-[#1a3766] placeholder:text-gray-500 focus:outline-none border-none shadow-sm text-right",
          className
        )}
        {...props}
      />
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
    </div>
  );
};
