
import { useState, useEffect } from 'react';
import { X, Cookie, GraduationCap, Code, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary-background to-white dark:from-gray-800 dark:to-gray-900 border-t-2 border-primary-action shadow-2xl z-50 animate-slide-up">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Proyecto SENA Header */}
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 border-b border-primary-action/20 pb-3 sm:pb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-blue-600 p-1.5 sm:p-2 rounded-full shadow-lg">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="bg-green-600 p-1.5 sm:p-2 rounded-full shadow-lg">
                <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="bg-red-500 p-1.5 sm:p-2 rounded-full shadow-lg">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-sm sm:text-lg font-bold text-primary-text dark:text-white mb-1">
                Proyecto SENA - Análisis y Desarrollo de Software
              </h3>
              <p className="text-xs sm:text-sm text-primary-secondary dark:text-gray-300 max-w-3xl px-2">
                Plataforma e-commerce para artesanías digitales del <strong>Chocó</strong> - 
                Conectando tradición con tecnología
              </p>
            </div>
          </div>

          {/* Cookie Notice */}
          <div className="flex flex-col items-start justify-between gap-4">
            <div className="flex items-start gap-2 sm:gap-3 flex-1">
              <div className="bg-primary-action p-1.5 sm:p-2 rounded-full shadow-lg mt-1 flex-shrink-0">
                <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-xs sm:text-sm text-primary-text dark:text-gray-200">
                <p className="mb-2 font-semibold text-primary-action text-sm sm:text-base">
                  🍪 Uso de Cookies - TesorosChocó
                </p>
                <p className="leading-relaxed">
                  Este sitio web utiliza cookies para mejorar tu experiencia de navegación 
                  y personalizar el contenido. Las cookies nos ayudan a analizar el tráfico 
                  del sitio y optimizar la plataforma para nuestros artesanos chocoanos.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
              <Button
                onClick={() => handleConsent(false)}
                variant="outline"
                size="sm"
                className="flex-1 border-primary-secondary text-primary-secondary hover:bg-primary-secondary hover:text-white transition-all duration-200 text-xs sm:text-sm"
              >
                Rechazar
              </Button>
              <Button
                onClick={() => handleConsent(true)}
                className="flex-1 bg-primary-action hover:bg-primary-action/90 text-white shadow-lg transition-all duration-200 transform hover:scale-105 text-xs sm:text-sm"
                size="sm"
              >
                Aceptar Cookies
              </Button>
            </div>
          </div>
        </div>
        
        {/* Close button */}
        <button
          onClick={() => handleConsent(false)}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1 rounded-full hover:bg-primary-action/10 transition-colors"
          aria-label="Cerrar aviso"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4 text-primary-secondary hover:text-primary-action" />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
