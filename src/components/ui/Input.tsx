// src/components/ui/Input.tsx
"use client";

import {
  forwardRef,
  type InputHTMLAttributes,
  useState,
  type ReactNode,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import { type FieldError } from "react-hook-form";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | FieldError | null;
  helperText?: string;
  icon?: ReactNode;
  togglePassword?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      type = "text",
      togglePassword = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
      togglePassword && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            className={cn(
              "text-sm font-medium",
              error ? "text-red-600" : "text-gray-700",
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-2.5 text-gray-400">{icon}</div>
          )}

          <input
            ref={ref}
            {...props}
            type={inputType}
            className={cn(
              "w-full py-2 px-4 pl-10 pr-10 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2",
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
              className,
            )}
          />

          {togglePassword && type === "password" && (
            <div
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          )}
        </div>

        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-red-600">
            {typeof error === "string" ? error : error?.message}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
