// src/components/ui/Checkbox.tsx
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
import { cn } from '../../lib/utils';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string | FieldError;
  helperText?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            ref={ref}
            className={cn(
              'h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />
          {label}
        </label>
        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-red-600">
            {typeof error === 'string' ? error : error.message}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
