
import { useContext } from 'react';
import { ContextoTutorial } from '../context/TutorialContext';

// Exportamos primero el hook con el nombre original para mantener compatibilidad
export const useTutorial = () => {
  const contexto = useContext(ContextoTutorial);
  
  if (contexto === undefined) {
    throw new Error('useTutorial debe ser usado dentro de un ProveedorTutorial');
  }
  
  return contexto;
};

// Alias en español (exportamos el mismo hook con otro nombre)
export { useTutorial as usarTutorial };
