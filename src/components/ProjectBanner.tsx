
import { GraduationCap, Code, Heart } from 'lucide-react';

const ProjectBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-b border-blue-200 dark:border-blue-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-full">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="bg-green-600 p-2 rounded-full">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="bg-red-500 p-2 rounded-full">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Proyecto SENA - Análisis y Desarrollo de Software
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-4xl">
              Este es mi proyecto SENA para el programa <strong>Análisis y Desarrollo de Software</strong>. 
              Se basa en una plataforma e-commerce dedicada a la venta de artesanías de forma digital, 
              hechas por campesinos en el departamento del <strong>Chocó</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBanner;
