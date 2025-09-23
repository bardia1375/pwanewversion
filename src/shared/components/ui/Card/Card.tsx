import React from 'react'
import { cn } from '../../../utils'

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    fullWidth?: boolean;
    padding?: string;
    align?: 'center' | 'start' | 'end' | 'stretch';
}

function Card({ 
  children, 
  className, 
  onClick, 
  fullWidth = true,
  padding = 'p-4',
  align = 'center'
}: CardProps) {
  const alignmentClass = {
    'center': 'items-center',
    'start': 'items-start',
    'end': 'items-end',
    'stretch': 'items-stretch'
  }[align];

  return (
    <div 
      className={cn(
        `bg-secondary rounded-2xl flex flex-col ${alignmentClass} ${padding}`,
        fullWidth ? 'w-full' : '',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card