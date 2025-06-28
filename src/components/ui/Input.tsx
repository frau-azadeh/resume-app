// src/components/ui/Input.tsx
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | FieldError | null;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            className={cn(
              "text-sm font-medium",
              error ? "text-red-600" : "text-gray-700"
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-red-600">
            {typeof error === "string" ? error : error?.message ?? ""}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
