import React from 'react';
import { Trash2 } from 'lucide-react';

interface HeaderProps {
  onClear: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClear }) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-brand-cream/80 backdrop-blur-md border-b border-[#e5e0da]">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-brand-wine"></div>
        <h1 className="font-syne font-bold text-xl tracking-tight text-gray-900">
          AURA
        </h1>
      </div>
      <button
        onClick={onClear}
        className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-brand-wine transition-colors group"
        title="Clear chat"
      >
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">CLEAR</span>
        <Trash2 size={16} />
      </button>
    </header>
  );
};
