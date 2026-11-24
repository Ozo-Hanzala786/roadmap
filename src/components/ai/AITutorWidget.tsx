import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, User, Code2, HelpCircle } from 'lucide-react';
import { AIMessage } from '../../types';

interface AITutorWidgetProps {
  currentTopicTitle?: string;
}

export const AITutorWidget: React.FC<AITutorWidgetProps> = ({ currentTopicTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello! I'm DevBot, your AI Coding Mentor 🚀. How can I help you master programming today? Feel free to paste code errors or ask for simple ELI5 explanations!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSend = (textToSend?: string) => {
    const userText = textToSend || input;
    if (!userText.trim()) return;

    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate intelligent AI mentor response
    setTimeout(() => {
      let aiText = '';
      const lower = userText.toLowerCase();

      if (lower.includes('promises') || lower.includes('async')) {
        aiText = `A **JavaScript Promise** is like ordering coffee at a café ☕. 
You get a receipt (the Promise). The coffee isn't ready immediately (it's Pending). 
When ready, your order is Fulfilled with delicious coffee (data)! If the machine breaks, it's Rejected with an Error. 
Use \`async/await\` to write clean asynchronous code!`;
      } else if (lower.includes('typeerror') || lower.includes('undefined')) {
        aiText = `That infamous \`TypeError: Cannot read properties of undefined\` happens when you try to access a property (like \`user.name\`) on a variable that holds \`undefined\` or \`null\`! 
**Fix Tip**: Check optional chaining: \`user?.name\` or verify that data was fetched before rendering!`;
      } else if (lower.includes('flexbox') || lower.includes('css')) {
        aiText = `To center anything with Flexbox, use 3 magic lines on the parent container:
\`\`\`css
display: flex;
justify-content: center; /* horizontal center */
align-items: center;     /* vertical center */
\`\`\``;
      } else {
        aiText = `Great question! When learning ${currentTopicTitle || 'programming'}, break complex problems down into small steps. Write out pseudo-code first, inspect variable values with \`console.log()\`, and verify syntax line by line. You're doing awesome!`;
      }

      const aiReply: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiReply]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs shadow-2xl shadow-cyan-500/40 hover:scale-105 transition-transform"
      >
        <Bot className="w-5 h-5 text-slate-950" />
        <span className="hidden sm:inline">Ask AI Mentor</span>
      </button>

      {/* Slide-Up Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[520px] glass-panel rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/80 flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100">DevBot AI Tutor</h3>
                <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Context Aware • Online</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-slate-950 border-b border-slate-900 flex space-x-1 overflow-x-auto text-[11px]">
            {[
              'Explain Promises (ELI5)',
              'Fix TypeError undefined',
              'Flexbox centering code'
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 whitespace-nowrap border border-slate-800"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 bg-slate-950 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex space-x-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask DevBot anything..."
              className="flex-1 bg-slate-950 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
