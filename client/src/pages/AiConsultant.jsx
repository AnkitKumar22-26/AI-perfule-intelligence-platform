import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Loader2, ArrowUpRight } from 'lucide-react';

export default function AiConsultant() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Welcome to Scentelligence Haute Intelligence Core. I am your premium scent architect and data consultant.\n\nAsk me to formulate rare note profiles, decode molecular complex structures like Ambergris & Oud, or track predictive market telemetry for your brand. How shall I assist your curation today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: data.reply || data.text }]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: "Telemetry link broken. Please verify that your Python core server is actively listening on Port 5000." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-[#0D0C0B] text-[#FAF6F0] font-sans flex flex-col overflow-hidden relative w-full">
      
      {/* प्रीमियम एम्बर स्टूडियो लाइट्स ग्लो (लग्जरी फील) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-orange-500/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-gradient-to-t from-amber-600/[0.02] to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* फुल-विड्थ सिमेट्रिकल फ्रेम */}
      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col justify-between border-x border-white/[0.04] bg-[#12100F]/40 backdrop-blur-md relative z-10">
        
        {/* टॉप लग्जरी बार */}
        <div className="border-b border-white/[0.05] px-8 py-5 flex items-center justify-between bg-[#141211]/60">
          <div className="flex items-center space-x-3.5">
            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
            <div>
              <h2 className="font-serif text-xs tracking-[0.3em] uppercase font-light text-[#FAF6F0]">Olfactory Intelligence Engine</h2>
              <p className="text-[8px] text-orange-500/80 tracking-[0.2em] uppercase font-medium mt-0.5">Active Session • Gemini 2.5 Flash</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[8px] tracking-[0.2em] text-[#FAF6F0]/40 border border-white/10 px-3 py-1.5 bg-white/[0.01]">
            <span>SYSTEM HIGH_PRIORITY</span>
            <ArrowUpRight className="w-2.5 h-2.5 text-orange-500" />
          </div>
        </div>

        {/* चैट कन्वर्सेशन हब (फॉन्ट थोड़े बड़े और बोल्डर हैं) */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 scrollbar-none">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`flex flex-col max-w-3xl ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                {/* लेबल */}
                <span className="text-[8px] tracking-[0.25em] uppercase font-semibold mb-2 text-orange-500/60 px-1">
                  {msg.role === 'user' ? '✦ Client Request' : '✦ Core Response'}
                </span>

                {/* मॉडर्न बॉक्स जो खाली नहीं लगेगा */}
                <div className={`text-[13px] sm:text-[14px] leading-relaxed font-light tracking-wide p-5 border shadow-xl w-full transition-all duration-300 ${
                  msg.role === 'user' 
                    ? 'text-orange-400 bg-orange-500/[0.03] border-orange-500/20 shadow-orange-500/[0.01]' 
                    : 'text-[#FAF6F0]/90 bg-[#161413] border-white/[0.05]'
                }`}>
                  <p className="whitespace-pre-line font-normal">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* थिंकिंग लोडर */}
          {isLoading && (
            <div className="flex items-center space-x-3 max-w-md mr-auto bg-white/[0.01] border border-white/[0.03] p-4">
              <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
              <span className="text-[10px] text-[#FAF6F0]/40 tracking-[0.25em] uppercase font-light animate-pulse">
                Analyzing notes & profiles...
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* तैरता हुआ प्रीमियम इनपुट कंसोल */}
        <div className="p-6 bg-[#0D0C0B]/90 border-t border-white/[0.05]">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center border border-white/10 focus-within:border-orange-500/40 bg-[#171514] transition-all duration-300 shadow-2xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire about fragrance matrix, premium alternatives, or composition metrics..."
              disabled={isLoading}
              className="flex-1 bg-transparent px-6 py-4.5 text-xs sm:text-sm text-[#FAF6F0] font-light tracking-wider focus:outline-none placeholder:text-[#FAF6F0]/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="text-[#FAF6F0] hover:text-orange-500 disabled:text-white/10 p-4.5 transition-colors duration-300"
            >
              <Send className="w-4 h-4 stroke-[1.5]" />
            </button>
          </form>
          <div className="flex justify-between items-center max-w-4xl mx-auto mt-3 px-1">
            <p className="text-[7.5px] text-[#FAF6F0]/20 tracking-widest uppercase">
              Scentelligence Neural Grid v2.5
            </p>
            <p className="text-[7.5px] text-orange-500/40 tracking-widest uppercase">
              End-to-End Luxury Encrypted
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}