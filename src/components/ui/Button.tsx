import clsx from "clsx";
import { Loader } from "lucide-react";
import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "outline" | "destructive" | "success";
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  variant = "primary",
  icon,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={loading || disabled}
      {...props}
      className={clsx(
        "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
            variant === "primary",
          "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400":
            variant === "outline",
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
            variant === "destructive",
          "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500":
            variant === "success",
          "opacity-50 cursor-not-allowed": loading || disabled,
        },
        className,
      )}
    >
      {loading ? <Loader className="animate-spin w-4 h-4" /> : icon}
      {children}
    </button>
  );
};

export default Button;
