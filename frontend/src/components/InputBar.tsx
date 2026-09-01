import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface InputBarProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ input, setInput, onSend, isLoading }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSend();
      }
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="p-4 bg-brand-cream/80 backdrop-blur-md border-t border-[#e5e0da]">
      <div className="max-w-4xl mx-auto relative flex items-end bg-white rounded-3xl border border-[#e5e0da] shadow-sm overflow-hidden focus-within:border-brand-wine/50 transition-colors pl-4 pr-2 py-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Aura..."
          disabled={isLoading}
          className="flex-1 max-h-[200px] bg-transparent resize-none outline-none py-2 text-[15px] text-gray-800 placeholder-gray-400 disabled:opacity-50"
          rows={1}
        />
        <button
          onClick={onSend}
          disabled={!input.trim() || isLoading}
          className="ml-2 mb-1 p-2 rounded-full bg-brand-wine text-white disabled:opacity-50 disabled:bg-gray-300 hover:bg-brand-wine-light transition-colors flex-shrink-0"
        >
          <Send size={18} className="translate-x-[1px]" />
        </button>
      </div>
      <div className="text-center mt-2">
        <p className="text-[10px] font-mono text-gray-400">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};
