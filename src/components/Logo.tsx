import React from 'react';
import { Shield } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const cfg = {
    sm: { icon: 20, title: 'text-xl', sub: 'text-xs', gap: 'gap-2.5', pad: 'p-2' },
    md: { icon: 28, title: 'text-2xl', sub: 'text-sm', gap: 'gap-3', pad: 'p-2.5' },
    lg: { icon: 40, title: 'text-4xl', sub: 'text-base', gap: 'gap-4', pad: 'p-3.5' },
  }[size];

  return (
    <div className={`flex items-center ${cfg.gap}`}>
      <div className={`bg-sist-600 rounded-2xl ${cfg.pad} shadow-lg`}>
        <Shield size={cfg.icon} className="text-white" strokeWidth={2} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`${cfg.title} font-extrabold text-sist-800 tracking-tight`}>
          SIST<span className="text-sist-500">79</span>
        </span>
        <span className={`${cfg.sub} font-medium text-sist-500 tracking-widest uppercase`}>
          Prévention &amp; Santé au Travail
        </span>
      </div>
    </div>
  );
}
