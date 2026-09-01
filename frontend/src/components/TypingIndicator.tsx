import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full justify-start mb-6">
      <div className="px-6 py-5 rounded-3xl bg-white rounded-bl-sm border border-[#e5e0da] shadow-sm flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-brass animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-1.5 h-1.5 rounded-full bg-brand-brass animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-1.5 h-1.5 rounded-full bg-brand-brass animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};
