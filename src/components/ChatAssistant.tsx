import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { explainElectionConcept } from '../services/geminiService';
import Markdown from 'react-markdown';

const SUGGESTED_PROMPTS = [
  "How does voting actually work?",
  "What happens after I vote?",
  "How are votes counted?",
  "What ensures fairness in elections?"
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'model' | 'user', text: string }[]>([
    { role: 'model', text: 'Hello! I am your ElecSys AI Guide. Ask me anything about the election process.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<string>('');

  // Context awareness: Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg = text.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const responseText = await explainElectionConcept(userMsg, currentSection);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'I encountered an error while trying to process your request. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-colors focus:outline-none ${isOpen ? 'bg-white/10 text-white border border-white/20' : 'bg-cyan-500 text-black hover:bg-cyan-400'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-[380px] h-[600px] max-h-[80vh] max-w-[calc(100vw-3rem)] z-40 flex flex-col rounded-2xl overflow-hidden bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_0_1px_rgba(255,255,255,0.2)]"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/[0.02]">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide text-white uppercase flex items-center gap-2">
                  ElecSys Agent <Sparkles className="w-3 h-3 text-cyan-400" />
                </h3>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Deep Learning Module Active</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-cyan-500/10 border border-cyan-500/20 text-slate-200 rounded-tr-sm' : 'bg-white/[0.03] border border-white/5 text-slate-300 rounded-tl-sm'}`}>
                    {msg.role === 'model' && msg.text !== '...' ? (
                      <div className="prose prose-invert prose-sm max-w-none 
                                    prose-headings:text-cyan-400 prose-headings:font-bold prose-headings:mb-2 prose-headings:mt-4 first:prose-headings:mt-0
                                    prose-p:leading-relaxed prose-p:mb-3
                                    prose-ul:my-2 prose-li:my-0.5
                                    prose-strong:text-white">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                   <div className="max-w-[85%] rounded-2xl p-4 bg-white/[0.03] border border-white/5 rounded-tl-sm flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                   </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              {messages.length === 1 && !isTyping && (
                 <div className="mb-4 flex flex-wrap gap-2">
                   {SUGGESTED_PROMPTS.map((prompt, i) => (
                     <button 
                       key={i}
                       onClick={() => handleSendMessage(prompt)}
                       className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-left"
                     >
                       {prompt}
                     </button>
                   ))}
                 </div>
              )}
              
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  placeholder="Ask about the process..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim() || isTyping}
                  className="absolute right-2 p-2 rounded-full text-cyan-400 hover:bg-cyan-500/20 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
