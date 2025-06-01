
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getImageFallback(categoryName: string): string {
  const fallbackImages = {
    'Tejidos': 'https://images.unsplash.com/photo-1604782206219-3b9b64d6e689?q=80&w=1974&auto=format&fit=crop',
    'Cerámicas': 'https://images.unsplash.com/photo-1565193298357-c1c8799bf104?q=80&w=2070&auto=format&fit=crop',
    'Alimentos': 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=2070&auto=format&fit=crop',
    'Joyería': 'https://images.unsplash.com/photo-1589128777148-a954bbcad65a?q=80&w=2070&auto=format&fit=crop',
    'Decoración': 'https://images.unsplash.com/photo-1493244040629-496f6d136e28?q=80&w=2070&auto=format&fit=crop',
    'Madera': 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?q=80&w=2071&auto=format&fit=crop',
    'default': 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=2073&auto=format&fit=crop'
  };
  
  return fallbackImages[categoryName as keyof typeof fallbackImages] || fallbackImages.default;
}
