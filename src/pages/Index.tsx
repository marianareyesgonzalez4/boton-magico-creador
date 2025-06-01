
import { Button } from "@/components/ui/button";
import { ModernButton } from "@/components/ModernButton";
import { Sparkles, Heart, Zap } from "lucide-react";

const Index = () => {
  const handleClick = () => {
    console.log("¡Botón presionado!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Botón Moderno
          </h1>
          <p className="text-xl text-gray-600">
            Un botón hermoso con efectos y animaciones suaves
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ModernButton 
              onClick={handleClick}
              variant="primary"
              icon={<Sparkles className="w-5 h-5" />}
            >
              Botón Principal
            </ModernButton>
            
            <ModernButton 
              onClick={handleClick}
              variant="secondary"
              icon={<Heart className="w-5 h-5" />}
            >
              Me Gusta
            </ModernButton>
            
            <ModernButton 
              onClick={handleClick}
              variant="accent"
              icon={<Zap className="w-5 h-5" />}
            >
              Acción Rápida
            </ModernButton>
          </div>
          
          <div className="pt-4">
            <p className="text-sm text-gray-500">
              Haz clic en cualquier botón para ver la interacción
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
