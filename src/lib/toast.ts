// lib/toast.ts
import { toast } from 'react-hot-toast'

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-center',
    duration: 3000,
  })
}

export const showError = (message: string) => {
  toast.error(message, {
    position: 'top-center',
    duration: 4000,
  })
}

export const showMessage = (message: string) => {
  toast(message, {
    position: 'top-center',
  })
}