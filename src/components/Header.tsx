import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

interface HeaderProps {
  subtitle?: string;
}

export default function Header({ subtitle }: HeaderProps) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <header className="flex items-center justify-between px-10 py-5 bg-white border-b border-teal-100 shadow-sm relative">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-teal-600 rounded-2xl p-2.5 shadow-lg">
          <Shield size={28} className="text-white" strokeWidth={2} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-2xl font-extrabold text-teal-900 tracking-tight">
            SIST<span className="text-teal-500">79</span>
          </span>
          <span className="text-sm font-medium text-teal-500 tracking-widest uppercase">
            Prévention &amp; Santé au Travail
          </span>
        </div>
      </div>

      {subtitle && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <p className="text-lg font-semibold text-teal-700 tracking-wide uppercase">
            {subtitle}
          </p>
        </div>
      )}

      <div className="text-right">
        <p className="text-2xl font-bold text-teal-900 tabular-nums">{time}</p>
        <p className="text-sm text-teal-500 capitalize">{date}</p>
      </div>
    </header>
  );
}
