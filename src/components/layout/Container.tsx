
import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("max-w-[960px] mx-auto px-5", className)}>
      {children}
    </div>
  );
};

export default Container;
