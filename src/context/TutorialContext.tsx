
import React, { createContext, useState, useEffect } from 'react';
import { driver, Config, DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css';

export interface PasoTutorial {
  element: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface ContextoTutorialType {
  estaActivo: boolean;
  pasoActual: number;
  pasos: PasoTutorial[];
  iniciarTutorial: () => void;
  finalizarTutorial: () => void;
  siguientePaso: () => void;
  pasoAnterior: () => void;
  saltarTutorial: () => void;
}

export const ContextoTutorial = createContext<ContextoTutorialType | undefined>(undefined);

const TUTORIAL_COMPLETADO_KEY = 'campo-artesano-tutorial-completado';

// Pasos predeterminados del tutorial
const pasosDefault: PasoTutorial[] = [
  {
    element: '.navbar-categories',
    title: '¡Bienvenido a Campo Artesano del Chocó!',
    description: 'Explora las diferentes categorías de productos artesanales de la región del Chocó.',
    position: 'bottom'
  },
  {
    element: '.search-products',
    title: 'Busca productos chocoanos',
    description: 'Encuentra artesanías, productos naturales y gastronomía típica del Chocó.',
    position: 'bottom'
  },
  {
    element: '.featured-products',
    title: 'Productos destacados del Chocó',
    description: 'Descubre nuestra selección de productos artesanales más populares de la región.',
    position: 'top'
  },
  {
    element: '.cart-icon',
    title: 'Tu carrito de compras',
    description: 'Aquí puedes ver los productos que has añadido y proceder al pago.',
    position: 'bottom'
  },
  {
    element: '.artisan-section',
    title: 'Conoce a los artesanos chocoanos',
    description: 'Aprende sobre las personas detrás de cada producto y sus historias en el Chocó.',
    position: 'top'
  }
];

export const ProveedorTutorial: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [estaActivo, setEstaActivo] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);
  const [pasos] = useState<PasoTutorial[]>(pasosDefault);
  const [tutorialCompletado, setTutorialCompletado] = useState<boolean | null>(null);
  const [driverObj, setDriverObj] = useState<ReturnType<typeof driver> | null>(null);
  
  // Verificar si el tutorial se ha completado antes
  useEffect(() => {
    const completado = localStorage.getItem(TUTORIAL_COMPLETADO_KEY) === 'true';
    setTutorialCompletado(completado);
    
    // Iniciar automáticamente el tutorial en la primera visita después de un retraso
    if (!completado) {
      const temporizador = setTimeout(() => {
        iniciarTutorial();
      }, 2000);
      
      return () => clearTimeout(temporizador);
    }
  }, []);

  // Inicializar Driver.js cuando cambie el paso actual o cuando se active/desactive
  useEffect(() => {
    if (!estaActivo) return;

    // Crear una nueva instancia de Driver.js
    const driverConfig: Config = {
      showProgress: true,
      smoothScroll: true,
      stagePadding: 10,
      animate: true,
      showButtons: ['close', 'next', 'previous'],
      steps: pasos.map((paso): DriveStep => ({
        element: paso.element,
        popover: {
          title: paso.title,
          description: paso.description,
          side: paso.position || 'bottom',
        }
      })),
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      doneBtnText: '¡Completado!',
      progressText: '{{current}} de {{total}}',
      onDestroyStarted: () => {
        finalizarTutorial();
      },
      onDestroyed: () => {
        finalizarTutorial();
      },
      onHighlightStarted: (elemento) => {
        // Encontrar el índice del paso actual basado en el elemento
        const indice = pasos.findIndex(paso => 
          document.querySelector(paso.element) === elemento
        );
        if (indice !== -1) {
          setPasoActual(indice);
        }
      }
    };

    const instanciaDriver = driver(driverConfig);
    setDriverObj(instanciaDriver);
    instanciaDriver.drive();

    return () => {
      instanciaDriver.destroy();
    };
  }, [estaActivo, pasos]);
  
  const iniciarTutorial = () => {
    setEstaActivo(true);
    setPasoActual(0);
  };
  
  const finalizarTutorial = () => {
    setEstaActivo(false);
    localStorage.setItem(TUTORIAL_COMPLETADO_KEY, 'true');
    setTutorialCompletado(true);
  };
  
  const siguientePaso = () => {
    if (driverObj && pasoActual < pasos.length - 1) {
      driverObj.moveNext();
    }
  };
  
  const pasoAnterior = () => {
    if (driverObj && pasoActual > 0) {
      driverObj.movePrevious();
    }
  };
  
  const saltarTutorial = () => {
    if (driverObj) {
      driverObj.destroy();
    }
    finalizarTutorial();
  };
  
  return (
    <ContextoTutorial.Provider
      value={{
        estaActivo,
        pasoActual,
        pasos,
        iniciarTutorial,
        finalizarTutorial,
        siguientePaso,
        pasoAnterior,
        saltarTutorial
      }}
    >
      {children}
    </ContextoTutorial.Provider>
  );
};
