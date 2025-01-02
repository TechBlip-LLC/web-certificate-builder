import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`
      bg-white/80 backdrop-blur-sm
      shadow-sm hover:shadow-md
      rounded-2xl p-6
      border border-slate-200/60
      transition-all duration-200
      ${className}
    `}>
      {children}
    </div>
  );
}