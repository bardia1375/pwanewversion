import React from 'react';
import { cn } from '../../../utils';

type VariantType = 'h1' | 'h2' | 'h3' | 'caption' | 'label' | 'text';

interface TypographyProps {
  variant: VariantType;
  children: React.ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant, children, className, ...props }) => {
  const renderElement = () => {
    switch (variant) {
      case 'h1':
        return <h1 className={cn("text-3xl font-bold text-text", className)} {...props}>{children}</h1>;
      case 'h2':
        return <h2 className={cn("text-2xl font-bold text-text", className)} {...props}>{children}</h2>;
      case 'h3':
        return <h3 className={cn("text-xl font-bold text-text", className)} {...props}>{children}</h3>;
      case 'caption':
        return <span className={cn("text-sm text-gray-500", className)} {...props}>{children}</span>;
      case 'label':
        return <label className={cn("text-sm font-semibold text-text", className)} {...props}>{children}</label>;
      case 'text':
      default:
        return <p className={cn("text-base text-text", className)} {...props}>{children}</p>;
    }
  };

  return renderElement();
};

export default Typography;


