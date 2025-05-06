// src/components/ui/FormError.tsx
import React from "react";
import type { FieldError } from "react-hook-form";

interface FormErrorProps {
  error?: string | FieldError;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <p className="text-xs text-red-600 mt-1">
      {typeof error === "string" ? error : error.message}
    </p>
  );
};

export default FormError;
