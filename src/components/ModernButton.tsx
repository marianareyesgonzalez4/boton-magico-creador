
import React from "react";
import { cn } from "@/lib/utils";

interface ModernButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  icon,
  disabled = false,
  className,
}) => {
  const baseStyles = "relative group inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden";

  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 focus:ring-blue-500 border border-transparent",
    secondary: "bg-white text-gray-700 shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 focus:ring-gray-500",
    accent: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 focus:ring-emerald-500 border border-transparent",
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
      
      {/* Contenido del botón */}
      <div className="relative flex items-center gap-2">
        {icon && (
          <span className="transition-transform duration-200 group-hover:rotate-12">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </div>
    </button>
  );
};
