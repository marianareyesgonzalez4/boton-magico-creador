
import React from 'react';
import { useTutorial } from '@/hooks/useTutorial';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const PasosTutorial: React.FC = () => {
  const { estaActivo, iniciarTutorial } = useTutorial();
  
  // No necesitamos mostrar nada mientras el tutorial está activo, ya que Driver.js maneja la UI
  if (estaActivo) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button 
        onClick={iniciarTutorial}
        className="bg-choco-blue hover:bg-choco-blue/90 text-white rounded-full p-3 shadow-lg flex items-center"
        aria-label="Iniciar tour virtual"
      >
        <Info className="mr-2" size={18} />
        <span>Tour Virtual</span>
      </Button>
    </div>
  );
};

export default PasosTutorial;
