// src/components/ui/TextArea.tsx
import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import { cn } from "../../lib/utils";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | FieldError;
  helperText?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "border rounded-md px-3 py-2 text-sm shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            className,
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-red-600">
            {typeof error === "string" ? error : error.message}
          </p>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
