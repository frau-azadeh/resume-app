import React from 'react'
import type { FieldError } from 'react-hook-form'

interface FormErrorProps {
  error?: string | FieldError;
}

const FormError: React.FC<FormErrorProps> = ({
  error
}) => {
  if (!error) return null;
  return (
    <p className='text-sm text-red-500 mt-1'>
      {typeof error === "string" ? error : error.message || "خطا"}
    </p>
  )
}

export default FormError