import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning';
  icon?: LucideIcon;
}

export function Badge({ children, variant = 'default', icon: Icon }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100/80 text-slate-700',
    success: 'bg-emerald-50/80 text-emerald-600',
    warning: 'bg-amber-50/80 text-amber-600'
  };

  return (
    <span className={`
      inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm
      ${variants[variant]}
    `}>
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {children}
    </span>
  );
}