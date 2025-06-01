
import { toast } from "sonner";

export const useToast = () => {
  return {
    toast: (options: { title?: string; description?: string; variant?: "default" | "destructive" }) => {
      if (options.variant === "destructive") {
        toast.error(options.title || "Error", {
          description: options.description,
        });
      } else {
        toast.success(options.title || "Éxito", {
          description: options.description,
        });
      }
    },
    success: (message: string, description?: string) => {
      toast.success(message, { description });
    },
    error: (message: string, description?: string) => {
      toast.error(message, { description });
    },
    info: (message: string, description?: string) => {
      toast.info(message, { description });
    },
  };
};

export { toast };
