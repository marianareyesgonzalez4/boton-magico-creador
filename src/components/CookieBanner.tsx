
import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
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
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="mb-2">
                <strong>🍪 Uso de Cookies</strong>
              </p>
              <p>
                Este sitio web utiliza cookies para mejorar tu experiencia de navegación. 
                Las cookies nos ayudan a personalizar el contenido y analizar el tráfico del sitio.
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            <Button
              onClick={rejectCookies}
              variant="outline"
              size="sm"
              className="text-sm"
            >
              Rechazar
            </Button>
            <Button
              onClick={acceptCookies}
              className="bg-[#0cf2a5] hover:bg-[#0ae195] text-white text-sm"
              size="sm"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
