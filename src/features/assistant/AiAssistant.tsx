import { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { useChatbotStore } from '../../store/useChatbotStore';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export const AiAssistant = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    isOpen, 
    toggleChatbot, 
    messages, 
    isSpeechEnabled, 
    setSpeechEnabled, 
    sendMessage, 
    isBotTyping, 
    resetChat 
  } = useChatbotStore();

  const { incrementAnalytics, unlockAchievement, addNotification } = usePortfolioStore();

  // Scroll to bottom on message updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
    incrementAnalytics('chatsConducted');
    unlockAchievement('chat_bot');
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleSuggestionClick = (cmd: string) => {
    // If command matches special sections, scroll or route
    if (cmd === '🔍 Go to Projects') {
      toggleChatbot();
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (cmd === '💬 Go to Contact Section') {
      toggleChatbot();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (cmd === '📄 Open Resume Builder') {
      toggleChatbot();
      navigate('/resume');
      window.scrollTo({ top: 0 });
      return;
    }

    // Otherwise, send as message input
    // Strip emojis for queries
    const query = cmd.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '').trim();
    sendMessage(query);
    incrementAnalytics('chatsConducted');
    unlockAchievement('chat_bot');
  };

  // HTML5 Speech Input simulation
  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      addNotification('Speech recognition is not supported in this browser.', 'error', 'API Unsupported');
      return;
    }
    
    setIsRecording(true);
    
    type SpeechRecognitionMock = {
      lang: string;
      interimResults: boolean;
      maxAlternatives: number;
      onresult: ((event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null;
      onerror: (() => void) | null;
      onend: (() => void) | null;
      start: () => void;
    };
    
    const SpeechComp = (window as unknown as Record<string, new () => SpeechRecognitionMock>).SpeechRecognition ||
                       (window as unknown as Record<string, new () => SpeechRecognitionMock>).webkitSpeechRecognition;
    const recognition = new SpeechComp();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
      const speechToText = event.results[0][0].transcript;
      setInputText(speechToText);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] no-print">
      
      {/* FLOATING ACTION TOGGLE BUTTON */}
      <motion.button
        onClick={toggleChatbot}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-13 h-13 rounded-full bg-accent hover:bg-accent-hover text-white shadow-xl flex items-center justify-center cursor-pointer shadow-accent/25 relative border border-white/10"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center relative"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-darkbg flex items-center justify-center" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* CHATBOT DRAWER CONTAINER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="absolute bottom-16 right-0 w-[340px] sm:w-[380px] h-[500px] rounded-3xl border border-slate-200/50 dark:border-zinc-800/80 bg-white/95 dark:bg-darkcard/95 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden text-slate-800 dark:text-zinc-200"
          >
            
            {/* Header Panel */}
            <div className="px-5 py-4 border-b border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-black/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">
                  🤖
                </div>
                <div className="text-left flex flex-col">
                  <span className="text-xs font-bold font-display text-slate-900 dark:text-white">Portfolio AI Assistant</span>
                  <span className="text-[9px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online • Context Aware
                  </span>
                </div>
              </div>

              {/* Chat Controls */}
              <div className="flex gap-1">
                <button
                  onClick={() => setSpeechEnabled(!isSpeechEnabled)}
                  className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors ${
                    isSpeechEnabled ? 'text-accent' : 'text-slate-400 dark:text-zinc-500'
                  }`}
                  title="Toggle voice output"
                >
                  {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={resetChat}
                  className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-zinc-800/80 text-slate-400 hover:text-slate-650 dark:text-zinc-500 dark:hover:text-zinc-350 transition-colors"
                  title="Clear chat history"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Log Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  {/* Bubble content */}
                  <div
                    className={`p-3 text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-accent text-white rounded-2xl rounded-tr-none shadow-md shadow-accent/15'
                        : 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 rounded-2xl rounded-tl-none border border-slate-200/50 dark:border-zinc-800'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[9px] text-slate-400 dark:text-zinc-500 mt-1 font-mono">
                    {msg.timestamp}
                  </span>

                  {/* Dynamic suggestions attached to this specific card */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 w-full">
                      {msg.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSuggestionClick(s)}
                          className="py-1.5 px-3 rounded-full text-[10px] font-semibold bg-white hover:bg-slate-50 dark:bg-zinc-950/20 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:border-slate-350 dark:hover:border-zinc-700 transition-all cursor-pointer"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Bot typing simulation */}
              {isBotTyping && (
                <div className="self-start flex flex-col items-start gap-1">
                  <div className="bg-slate-100 dark:bg-zinc-900 px-4 py-2.5 rounded-2xl rounded-tl-none border border-slate-200/50 dark:border-zinc-800 flex items-center gap-1 h-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-black/10 flex items-center gap-2">
              <button
                onClick={startSpeechRecognition}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  isRecording 
                    ? 'bg-rose-500 text-white animate-pulse' 
                    : 'text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-350 hover:bg-slate-100 dark:hover:bg-zinc-800/80'
                }`}
                title="Speak text input"
              >
                <Mic className="w-4 h-4" />
              </button>
              
              <input
                type="text"
                placeholder="Ask me anything..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:border-accent text-slate-800 dark:text-zinc-200"
              />

              <button
                onClick={handleSend}
                className="p-2 rounded-xl bg-accent hover:bg-accent-hover text-white cursor-pointer transition-colors shadow-md shadow-accent/15"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AiAssistant;
