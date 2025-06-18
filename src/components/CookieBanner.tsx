
import { useState, useEffect } from 'react';
import { X, Cookie, GraduationCap, Code, Heart, Award, Users } from 'lucide-react';
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
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 border-t-4 border-amber-500 shadow-2xl z-50 animate-slide-up">
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col gap-6">
          {/* Mensaje SENA destacado */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 sm:p-6 rounded-xl shadow-lg">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                  <Code className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="bg-white/20 p-2 rounded-full">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
              
              <div>
                <h2 className="text-lg sm:text-2xl font-bold mb-2">
                  🎓 Proyecto Académico SENA
                </h2>
                <div className="text-sm sm:text-base leading-relaxed space-y-2">
                  <p className="font-semibold">
                    Análisis y Desarrollo de Software - Grupo 4
                  </p>
                  <p className="text-white/90">
                    <strong>Ficha:</strong> 2879645 | <strong>Institución:</strong> SENA Colombia
                  </p>
                  <p className="text-white/90 max-w-4xl mx-auto">
                    Este eCommerce forma parte de nuestro proyecto de formación, enfocado en crear 
                    una plataforma digital que conecte a los <strong>artesanos del departamento del Chocó</strong> 
                    con el mundo, preservando sus tradiciones y promoviendo el desarrollo económico local.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Impacto Social</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>Cultura Chocoana</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Code className="w-4 h-4" />
                    <span>Tecnología</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de cookies */}
          <div className="flex flex-col items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="bg-amber-500 p-2 rounded-full shadow-lg mt-1 flex-shrink-0">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm text-gray-800 dark:text-gray-200">
                <p className="mb-2 font-semibold text-amber-700 dark:text-amber-400 text-base">
                  🍪 Política de Cookies - TesorosChocó
                </p>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  Utilizamos cookies para mejorar tu experiencia de navegación, personalizar el contenido 
                  y analizar el tráfico del sitio. Esto nos ayuda a optimizar nuestra plataforma para 
                  mejor servir a nuestros artesanos chocoanos y usuarios.
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Al continuar navegando, aceptas el uso de cookies según nuestra política de privacidad.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                onClick={() => handleConsent(false)}
                variant="outline"
                size="sm"
                className="flex-1 border-gray-400 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Rechazar Cookies
              </Button>
              <Button
                onClick={() => handleConsent(true)}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
                size="sm"
              >
                Aceptar y Continuar
              </Button>
            </div>
          </div>
        </div>
        
        {/* Botón de cerrar */}
        <button
          onClick={() => handleConsent(false)}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Cerrar aviso"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" />
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
