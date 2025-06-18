
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "brown";
  showText?: boolean;
  className?: string;
}

const Logo = ({ 
  size = "md", 
  variant = "default", 
  showText = true, 
  className 
}: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl"
  };

  const iconColorClass = {
    default: "text-emerald-600",
    white: "text-white",
    brown: "text-amber-900"
  };

  const textColorClass = {
    default: "text-gray-800",
    white: "text-white",
    brown: "text-amber-900"
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {/* Logo SVG representativo del Chocó */}
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("w-full h-full", iconColorClass[variant])}
        >
          {/* Fondo circular con gradiente */}
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="url(#backgroundGradient)"
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* Palma representativa del Pacífico */}
          <path
            d="M32 10L32 54M20 18C24 14 28 12 32 12C36 12 40 14 44 18M18 30C22 26 27 24 32 24C37 24 42 26 46 30M16 42C20 38 26 36 32 36C38 36 44 38 48 42"
            stroke="url(#palmGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Hojas de la palma */}
          <path
            d="M32 12L26 20L32 24L38 20L32 12Z"
            fill="url(#leafGradient)"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M32 24L24 32L32 36L40 32L32 24Z"
            fill="url(#leafGradient)"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M32 36L22 44L32 48L42 44L32 36Z"
            fill="url(#leafGradient)"
            stroke="currentColor"
            strokeWidth="1"
          />
          
          {/* Elementos decorativos tradicionales */}
          <circle cx="20" cy="52" r="2" fill="url(#accentGradient)" />
          <circle cx="32" cy="54" r="2" fill="url(#accentGradient)" />
          <circle cx="44" cy="52" r="2" fill="url(#accentGradient)" />
          
          {/* Gradientes */}
          <defs>
            <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#065f46" />
              <stop offset="50%" stopColor="#047857" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            
            <linearGradient id="palmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Brillo decorativo */}
        <div className="absolute top-1 right-1 w-2 h-2 bg-white/40 rounded-full blur-sm" />
      </div>

      {/* Texto del logo */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            "font-bold leading-tight tracking-tight",
            textSizeClasses[size],
            textColorClass[variant]
          )}>
            TesorosChocó
          </h1>
          <p className={cn(
            "text-xs font-medium leading-none opacity-80",
            textColorClass[variant],
            size === "sm" ? "text-[10px]" : "text-xs"
          )}>
            Tradición del Pacífico
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
