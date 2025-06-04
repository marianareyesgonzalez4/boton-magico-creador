
import React from 'react';
import { useTutorial } from '@/hooks/useTutorial';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const TutorialSteps: React.FC = () => {
  const { isActive, startTutorial } = useTutorial();
  
  const handleStartTutorial = () => {
    const demoSteps = [
      {
        id: 'welcome',
        title: 'Bienvenido a Chocó Artesanal',
        description: 'Descubre productos únicos hechos a mano por artesanos del Chocó',
        element: '#hero-section'
      },
      {
        id: 'products',
        title: 'Explora Productos',
        description: 'Navega por nuestra colección de artesanías auténticas',
        element: '#featured-products'
      },
      {
        id: 'cart',
        title: 'Añadir al Carrito',
        description: 'Agrega productos a tu carrito y procede al checkout',
        element: '#cart-button'
      }
    ];
    
    startTutorial(demoSteps);
  };
  
  // No mostrar nada mientras el tutorial está activo
  if (isActive) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button 
        onClick={handleStartTutorial}
        className="bg-action hover:bg-action/90 text-white rounded-full p-3 shadow-lg flex items-center"
        aria-label="Iniciar tour virtual"
      >
        <Info className="mr-2" size={18} />
        <span>Tour Virtual</span>
      </Button>
    </div>
  );
};

export default TutorialSteps;
