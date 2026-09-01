import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import type { Message } from '../types';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, error }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, error]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-4xl mx-auto">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
          <div className="w-12 h-12 rounded-full border border-brand-brass flex items-center justify-center mb-4">
            <span className="font-syne text-2xl text-brand-wine">A</span>
          </div>
          <h2 className="font-syne text-2xl text-gray-800">How can I help you today?</h2>
          <p className="font-mono text-xs max-w-md">
            This conversation is securely processed. Your API key remains safe on the backend.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} />
          ))}
          
          {isLoading && <TypingIndicator />}
          
          {error && (
            <div className="flex w-full justify-center my-4">
              <div className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm flex items-center gap-2">
                <span className="font-mono text-xs font-bold">ERROR</span>
                {error}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};
