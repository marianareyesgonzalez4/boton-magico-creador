
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
    sm: "w-10 h-10",
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
    default: "text-amber-700",
    white: "text-white",
    brown: "text-amber-900"
  };

  const textColorClass = {
    default: "text-amber-800",
    white: "text-white",
    brown: "text-amber-900"
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {/* Logo SVG */}
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("w-full h-full drop-shadow-lg")}
        >
          {/* Fondo circular con patrón de tejido */}
          <circle
            cx="40"
            cy="40"
            r="38"
            fill="url(#backgroundGradient)"
            stroke="url(#borderGradient)"
            strokeWidth="2"
          />
          
          {/* Patrón de tejido tradicional */}
          <path
            d="M20 25 L60 25 M20 35 L60 35 M20 45 L60 45 M20 55 L60 55"
            stroke="url(#patternGradient)"
            strokeWidth="1"
            opacity="0.3"
          />
          
          {/* Hoja de palma central (símbolo del Pacífico) */}
          <path
            d="M40 15 C32 20, 32 30, 40 35 C48 30, 48 20, 40 15 Z"
            fill="url(#leafGradient)"
            stroke="#16a34a"
            strokeWidth="1"
          />
          
          {/* Tallo de la hoja */}
          <path
            d="M40 35 L40 50"
            stroke="#16a34a"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Elementos artesanales - vasija de barro */}
          <ellipse
            cx="40"
            cy="55"
            rx="12"
            ry="8"
            fill="url(#clayGradient)"
            stroke="#92400e"
            strokeWidth="1"
          />
          
          {/* Decoración de la vasija */}
          <path
            d="M30 55 Q35 52, 40 55 Q45 52, 50 55"
            stroke="#451a03"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Puntos decorativos tradicionales */}
          <circle cx="25" cy="30" r="1.5" fill="#d97706" />
          <circle cx="55" cy="30" r="1.5" fill="#d97706" />
          <circle cx="25" cy="50" r="1.5" fill="#d97706" />
          <circle cx="55" cy="50" r="1.5" fill="#d97706" />
          
          {/* Gradientes */}
          <defs>
            <radialGradient id="backgroundGradient" cx="40%" cy="30%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
            
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            
            <linearGradient id="clayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            
            <linearGradient id="patternGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Brillo decorativo */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full blur-sm animate-pulse" />
      </div>

      {/* Texto del logo */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={cn(
            "font-bold leading-tight tracking-tight font-serif",
            textSizeClasses[size],
            textColorClass[variant]
          )}>
            Tesoros<span className="text-green-700">Chocó</span>
          </h1>
          <p className={cn(
            "text-xs font-medium leading-none opacity-90 italic",
            textColorClass[variant],
            size === "sm" ? "text-[10px]" : "text-xs"
          )}>
            Artesanías del Pacífico
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
