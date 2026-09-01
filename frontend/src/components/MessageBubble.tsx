import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] px-6 py-4 rounded-3xl ${
          isUser
            ? 'bg-brand-wine text-[#faf9f6] rounded-br-sm shadow-sm'
            : 'bg-white text-gray-800 rounded-bl-sm border border-[#e5e0da] shadow-sm'
        }`}
      >
        <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
};
