import React from "react";
import {  type FieldErrors, type UseFormRegister } from "react-hook-form";

interface TextInputProps {
  label: string;
  id: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  required?: boolean | string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: FieldErrors<any>;
  icon?: React.ReactNode;
  showTogglePassword?: boolean;
  onTogglePassword?: () => void;
  isPasswordVisible?: boolean;
}

export default function TextInput({
  label,
  id,
  type = "text",
  register,
  required = false,
  placeholder,
  errors,
  icon,
  showTogglePassword = false,
  onTogglePassword,
  isPasswordVisible = false,
}: TextInputProps) {
  const hasError = errors && errors[id];

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>

      <div className="relative group">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
        
        {/* Input container */}
        <div className="relative">
          {/* Icon on right (for RTL) */}
          {icon && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              {icon}
            </div>
          )}

          <input
            id={id}
            type={showTogglePassword && isPasswordVisible ? "text" : type}
            placeholder={placeholder}
            {...register(id, { required: typeof required === 'string' ? required : (required ? `${label} الزامی است` : false) })}
            className={`
              w-full bg-white/10 border rounded-2xl py-3 sm:py-4 px-4 sm:px-5 
              ${icon ? "pr-12" : ""} ${showTogglePassword ? "pl-12" : ""}
              text-white placeholder-gray-500
              transition-all duration-300
              ${hasError 
                ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
                : "border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              }
              focus:outline-none focus:bg-white/15
              backdrop-blur-sm
            `}
          />

          {/* Password toggle button */}
          {showTogglePassword && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 hover:text-cyan-400 transition duration-300"
              aria-label={isPasswordVisible ? "پنهان کردن رمز" : "نمایش رمز"}
            >
              {isPasswordVisible ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Error message */}
      {hasError && (
        <p className="text-xs sm:text-sm text-red-400 animate-fadeIn">
          {typeof (errors?.[id] as Record<string, unknown>)?.message === 'string' 
            ? String((errors?.[id] as Record<string, unknown>)?.message) 
            : `${label} الزامی است`}
        </p>
      )}
    </div>
  );
}
