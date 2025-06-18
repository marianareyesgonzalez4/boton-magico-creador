
import { useState, useEffect } from 'react';
import { X, Cookie, GraduationCap, Code, Heart, Award } from 'lucide-react';
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
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-50 via-white to-amber-50 dark:from-gray-800 dark:to-gray-900 border-t-2 border-emerald-500 shadow-2xl z-50 animate-slide-up">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Mensaje Institucional SENA */}
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 border-b border-emerald-200/50 pb-3 sm:pb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-green-600 p-1.5 sm:p-2 rounded-full shadow-lg">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="bg-blue-600 p-1.5 sm:p-2 rounded-full shadow-lg">
                <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="bg-amber-500 p-1.5 sm:p-2 rounded-full shadow-lg">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="bg-red-500 p-1.5 sm:p-2 rounded-full shadow-lg">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-sm sm:text-lg font-bold text-emerald-800 dark:text-white mb-2">
                Proyecto SENA - Análisis y Desarrollo de Software
              </h3>
              <div className="bg-gradient-to-r from-emerald-100 to-amber-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-3 sm:p-4 border border-emerald-200 dark:border-gray-600">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 max-w-4xl">
                  <strong className="text-emerald-700 dark:text-emerald-300">
                    Este proyecto hace parte del programa del SENA en Análisis y Desarrollo de Software, 
                    perteneciente al Grupo 4 de la ficha 2879645.
                  </strong>
                  <br className="sm:hidden" />
                  <span className="mt-1 block sm:inline sm:ml-1">
                    El proyecto consiste en un eCommerce que vende productos artesanales 
                    elaborados por campesinos del departamento del <strong>Chocó</strong>.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Aviso de Cookies */}
          <div className="flex flex-col items-start justify-between gap-4">
            <div className="flex items-start gap-2 sm:gap-3 flex-1">
              <div className="bg-emerald-600 p-1.5 sm:p-2 rounded-full shadow-lg mt-1 flex-shrink-0">
                <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                <p className="mb-2 font-semibold text-emerald-700 dark:text-emerald-300 text-sm sm:text-base">
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
                className="flex-1 border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200 text-xs sm:text-sm"
              >
                Rechazar
              </Button>
              <Button
                onClick={() => handleConsent(true)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105 text-xs sm:text-sm"
                size="sm"
              >
                Aceptar Cookies
              </Button>
            </div>
          </div>
        </div>
        
        {/* Botón de cerrar */}
        <button
          onClick={() => handleConsent(false)}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1 rounded-full hover:bg-emerald-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Cerrar aviso"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 hover:text-emerald-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
