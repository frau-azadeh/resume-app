// src/components/ui/FormError.tsx
import React from 'react';
import type { FieldError } from 'react-hook-form';

interface FormErrorProps {
  error?: string | FieldError;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;
  const message = typeof error === 'string' ? error : error?.message || 'خطا';
  
  return (
    <p className="text-xs text-red-500 mt-1">{message}</p>
  );
};

export default FormError;
