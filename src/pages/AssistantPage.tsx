import React, { useState } from 'react';
import { chatWithAssistant } from '@/services/gemini';
import { Send, Sparkles, Bot, User, RefreshCw } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am SPEC NEXA AI, your dedicated laptop intelligence advisor for India. Ask me anything regarding hardware specifications, programming workloads, gaming performance, thermal designs, or Indian retail value for money.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await chatWithAssistant(query, {});
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an issue processing your request. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          <span>Indian Laptop Intelligence Advisor</span>
        </div>
        <h1 className="text-3xl font-black font-outfit text-white">SPEC NEXA AI Assistant</h1>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {[
          'Best gaming laptop under ₹80,000?',
          'Is 16GB RAM enough for video editing?',
          'Which laptop has the best durability & cooling?',
          'Intel Core Ultra vs AMD Ryzen AI in India?',
        ].map((q, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-full bg-surface-elevated border border-border hover:border-primary/50 text-slate-300 hover:text-white text-xs transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-surface border border-border rounded-3xl p-6 flex-grow min-h-[450px] max-h-[600px] overflow-y-auto space-y-4 mb-4 shadow-xl">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`p-4 rounded-2xl max-w-lg text-xs sm:text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-surface-elevated border border-border text-slate-200 rounded-tl-none'
              }`}
            >
              {m.content}
            </div>
            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
            <span>SPEC NEXA AI is evaluating specifications...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about laptop specs, brands, processors, or budget recommendations..."
          className="flex-grow bg-surface border border-border rounded-2xl px-5 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary shadow-lg"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-3.5 rounded-2xl bg-primary hover:bg-primary-700 disabled:opacity-50 text-white font-semibold transition-all shadow-lg shadow-primary/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default AssistantPage;
