import { useState } from 'react';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { InputBar } from './components/InputBar';
import type { Message } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        let errText = 'Failed to fetch response';
        try {
           const errData = await response.json();
           if (errData.error) errText = errData.error;
        } catch(e) {}
        throw new Error(errText);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      if (!reader) throw new Error('No readable stream available');

      // Create a placeholder for the assistant's response
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
      setIsLoading(false); // Stop typing indicator, start streaming

      let assistantMessage = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') {
              break;
            }
            if (dataStr) {
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
                if (parsed.text) {
                  assistantMessage += parsed.text;
                  // Update the last message
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: 'assistant',
                      content: assistantMessage,
                    };
                    return updated;
                  });
                }
              } catch (e) {
                console.error('Error parsing stream chunk', e, dataStr);
              }
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen bg-brand-cream text-gray-900 font-jakarta selection:bg-brand-wine/20">
      <Header onClear={handleClear} />
      <ChatWindow messages={messages} isLoading={isLoading} error={error} />
      <InputBar
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
