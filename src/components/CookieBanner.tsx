
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

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary-background to-white dark:from-gray-800 dark:to-gray-900 border-t-2 border-primary-action shadow-2xl z-50 animate-slide-up">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Proyecto SENA Header */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 border-b border-primary-action/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-full shadow-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="bg-green-600 p-2 rounded-full shadow-lg">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div className="bg-red-500 p-2 rounded-full shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-primary-text dark:text-white mb-1">
                Proyecto SENA - Análisis y Desarrollo de Software
              </h3>
              <p className="text-sm text-primary-secondary dark:text-gray-300 max-w-3xl">
                Plataforma e-commerce para artesanías digitales del <strong>Chocó</strong> - 
                Conectando tradición con tecnología
              </p>
            </div>
          </div>

          {/* Cookie Notice */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="bg-primary-action p-2 rounded-full shadow-lg mt-1 flex-shrink-0">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm text-primary-text dark:text-gray-200">
                <p className="mb-2 font-semibold text-primary-action">
                  🍪 Uso de Cookies - TesorosChocó
                </p>
                <p className="leading-relaxed">
                  Este sitio web utiliza cookies para mejorar tu experiencia de navegación 
                  y personalizar el contenido. Las cookies nos ayudan a analizar el tráfico 
                  del sitio y optimizar la plataforma para nuestros artesanos chocoanos.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
              <Button
                onClick={rejectCookies}
                variant="outline"
                size="sm"
                className="flex-1 md:flex-none border-primary-secondary text-primary-secondary hover:bg-primary-secondary hover:text-white transition-all duration-200"
              >
                Rechazar
              </Button>
              <Button
                onClick={acceptCookies}
                className="flex-1 md:flex-none bg-primary-action hover:bg-primary-action/90 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
                size="sm"
              >
                Aceptar Cookies
              </Button>
            </div>
          </div>
        </div>
        
        {/* Close button */}
        <button
          onClick={rejectCookies}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-primary-action/10 transition-colors"
          aria-label="Cerrar aviso"
        >
          <X className="w-4 h-4 text-primary-secondary hover:text-primary-action" />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
