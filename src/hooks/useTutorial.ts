
import { useContext } from 'react';
import { ContextoTutorial } from '../context/TutorialContext';

export const usarTutorial = () => {
  const contexto = useContext(ContextoTutorial);
  
  if (contexto === undefined) {
    throw new Error('usarTutorial debe ser usado dentro de un ProveedorTutorial');
  }
  
  return contexto;
};

// Mantenemos el nombre en inglés para compatibilidad hacia atrás
export { usarTutorial as useTutorial };
