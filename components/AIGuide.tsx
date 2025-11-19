import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, MessageSquare, X, Loader2, Settings, Zap, Brain, Cpu, Key, ShieldCheck, ChevronLeft, Lock, Unlock } from 'lucide-react';
import { chatWithCosmos, setGeminiApiKey } from '../services/geminiService';

interface AIGuideProps {
  topic: string;
}

const MODELS = [
  { 
    id: 'gemini-2.5-flash', 
    name: 'Gemini 2.5 Flash', 
    desc: 'Fast, versatile, and responsive.', 
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    gradient: 'from-amber-500/20 to-orange-500/20'
  },
  { 
    id: 'gemini-3-pro-preview', 
    name: 'Gemini 3.0 Pro', 
    desc: 'Advanced reasoning and complex tasks.', 
    icon: Brain,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
    gradient: 'from-purple-500/20 to-indigo-500/20'
  },
  { 
    id: 'gemini-flash-lite-latest', 
    name: 'Gemini Flash Lite', 
    desc: 'Lightweight and highly efficient.', 
    icon: Cpu,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    gradient: 'from-emerald-500/20 to-teal-500/20'
  },
];

const AIGuide: React.FC<AIGuideProps> = ({ topic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'chat' | 'settings'>('chat');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [apiKey, setApiKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [response, loading, view]);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    const answer = await chatWithCosmos(topic, query, selectedModel);
    setResponse(answer);
    setLoading(false);
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    setApiKey(key);
    setGeminiApiKey(key);
  };

  const currentModel = MODELS.find(m => m.id === selectedModel) || MODELS[0];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: 0 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-0.5 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 text-white group"
      >
        <div className="bg-slate-950 rounded-full p-3.5 relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <div className="flex items-center gap-2 relative z-10">
             <Sparkles className="w-5 h-5 text-white animate-pulse" />
             <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap text-sm font-medium">
               Ask AI Guide
             </span>
          </div>
        </div>
      </motion.button>

      {/* Modal Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 md:right-8 z-50 w-[90vw] md:w-96"
          >
            <div className="bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[600px] ring-1 ring-white/10">
              
              {/* Header */}
              <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
                 <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                 />
                 
                 <div className="flex items-center gap-3 relative z-10">
                   {view === 'settings' ? (
                     <motion.button 
                        whileHover={{ x: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setView('chat')}
                        className="text-slate-300 hover:text-white flex items-center gap-1"
                     >
                       <ChevronLeft size={20} />
                       <span className="text-xs font-medium">Back</span>
                     </motion.button>
                   ) : (
                      <motion.div 
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20"
                      >
                        <Sparkles size={14} className="text-white" />
                      </motion.div>
                   )}
                   
                   <div>
                     <h3 className="font-bold text-sm text-white tracking-wide font-['Space_Grotesk']">
                        {view === 'settings' ? 'NEURAL CONFIG' : 'COSMOS GUIDE'}
                     </h3>
                     <div className="flex items-center gap-1.5">
                       <span className={`w-1.5 h-1.5 rounded-full ${view === 'settings' ? 'bg-amber-400' : 'bg-green-400 animate-pulse'}`} />
                       <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                         {view === 'settings' ? 'System Settings' : topic.substring(0, 15)}
                       </span>
                     </div>
                   </div>
                 </div>

                 <div className="flex items-center gap-1 relative z-10">
                    {view === 'chat' && (
                      <motion.button 
                        whileHover={{ rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setView('settings')}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                      >
                        <Settings size={18} />
                      </motion.button>
                    )}
                    <motion.button 
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                    >
                      <X size={18} />
                    </motion.button>
                 </div>
              </div>

              {/* Main Content Area */}
              <div className="relative overflow-hidden" style={{ height: 400 }}>
                <AnimatePresence mode="wait">
                  
                  {/* CHAT VIEW */}
                  {view === 'chat' && (
                    <motion.div 
                      key="chat"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="h-full flex flex-col"
                    >
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                         {!response && !loading && (
                            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 mt-4">
                              <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center ring-1 ring-white/10 relative"
                              >
                                 <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
                                 <MessageSquare className="w-8 h-8 opacity-50 relative z-10" />
                              </motion.div>
                              <div className="text-center space-y-1">
                                <p className="text-sm font-medium text-slate-300 font-['Space_Grotesk']">Awaiting Input</p>
                                <p className="text-xs text-slate-500 max-w-[200px] mx-auto">
                                  Current Model: <span className={currentModel.color}>{currentModel.name}</span>
                                </p>
                              </div>
                            </div>
                          )}

                          {query && response && (
                             <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="flex justify-end"
                             >
                                <div className="bg-indigo-600/20 border border-indigo-500/30 text-slate-200 text-sm px-4 py-2.5 rounded-2xl rounded-tr-none max-w-[85%]">
                                   {query}
                                </div>
                             </motion.div>
                          )}

                          {loading && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex justify-start"
                            >
                              <div className="bg-slate-800/50 border border-white/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-3">
                                 <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                                 <span className="text-xs text-slate-400">Processing neural request...</span>
                              </div>
                            </motion.div>
                          )}

                          {response && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              className="flex justify-start w-full"
                            >
                               <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl rounded-tl-none shadow-sm w-full group relative overflow-hidden">
                                  <div className={`absolute inset-0 bg-gradient-to-br ${currentModel.gradient} opacity-5`} />
                                  <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2 relative z-10">
                                    <div className={`p-1 rounded ${currentModel.bg}`}>
                                       <currentModel.icon size={10} className={currentModel.color} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                      {currentModel.name}
                                    </span>
                                  </div>
                                  <p className="text-sm text-slate-200 leading-relaxed relative z-10">
                                    {response}
                                  </p>
                               </div>
                            </motion.div>
                          )}
                          <div ref={messagesEndRef} />
                      </div>

                      {/* Input Area */}
                      <div className="p-3 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm">
                        <div className="relative group">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg opacity-30 group-focus-within:opacity-100 transition duration-500 blur opacity-0" />
                          <div className="relative flex items-center bg-slate-950 rounded-lg border border-slate-800 group-focus-within:border-transparent transition-colors">
                             <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                                placeholder="Ask a question..."
                                className="w-full bg-transparent py-2.5 pl-3 pr-10 text-sm text-white focus:outline-none placeholder:text-slate-600"
                              />
                              <button
                                onClick={handleAsk}
                                disabled={loading || !query}
                                className="absolute right-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md disabled:opacity-50 disabled:bg-slate-800 transition-all shadow-lg shadow-indigo-500/20"
                              >
                                <Send size={14} />
                              </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SETTINGS VIEW */}
                  {view === 'settings' && (
                    <motion.div 
                      key="settings"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="h-full flex flex-col p-5 overflow-y-auto custom-scrollbar"
                    >
                       <div className="space-y-6">
                          
                          {/* API Key Input Section */}
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="relative group"
                          >
                             <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-1000 group-focus-within:opacity-100" />
                             <div className="relative bg-slate-950 rounded-xl p-4 border border-slate-800">
                                <div className="flex items-center justify-between mb-3">
                                   <div className="flex items-center gap-2">
                                      <div className="p-1.5 bg-indigo-500/10 rounded-md">
                                        <Key className="text-indigo-400" size={16} />
                                      </div>
                                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Gemini API Key</label>
                                   </div>
                                   {apiKey || process.env.API_KEY ? (
                                      <Unlock size={14} className="text-green-500" />
                                   ) : (
                                      <Lock size={14} className="text-slate-600" />
                                   )}
                                </div>
                                <input 
                                   type="password" 
                                   value={apiKey}
                                   onChange={handleKeyChange}
                                   placeholder="Paste your API key here..."
                                   className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-slate-900/80 transition-all"
                                />
                                <div className="flex items-center gap-2 mt-2">
                                   <div className={`w-1.5 h-1.5 rounded-full ${apiKey ? 'bg-green-500' : 'bg-slate-700'}`} />
                                   <p className="text-[10px] text-slate-500">
                                      {apiKey ? 'Custom key active' : 'Using system default if available'}
                                   </p>
                                </div>
                             </div>
                          </motion.div>

                          {/* Model Selection Section */}
                          <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.2 }}
                          >
                             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                                Neural Engine
                                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400 border border-white/5">
                                  Selected: {currentModel.name}
                                </span>
                             </h4>
                             
                             <div className="space-y-2">
                                {MODELS.map((model) => {
                                  const isSelected = selectedModel === model.id;
                                  return (
                                    <motion.button
                                      key={model.id}
                                      onClick={() => setSelectedModel(model.id)}
                                      className={`w-full text-left p-3 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                                        isSelected 
                                          ? `bg-slate-900 border-slate-700` 
                                          : 'bg-slate-900/30 border-white/5 hover:bg-slate-800 hover:border-white/10'
                                      }`}
                                      whileHover={{ scale: 1.02, x: 5 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      {isSelected && (
                                        <motion.div 
                                          layoutId="activeModel"
                                          className={`absolute inset-0 border border-${model.color.split('-')[1]}-500/50 rounded-xl bg-${model.color.split('-')[1]}-500/5`}
                                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        >
                                           <div className={`absolute inset-0 bg-gradient-to-r ${model.gradient} opacity-10`} />
                                        </motion.div>
                                      )}
                                      <div className="flex items-center gap-3 relative z-10">
                                        <div className={`p-2 rounded-lg ${model.bg} ${model.border} border`}>
                                           <model.icon size={18} className={model.color} />
                                        </div>
                                        <div className="flex-1">
                                           <div className="flex items-center justify-between">
                                              <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                                {model.name}
                                              </span>
                                              {isSelected && (
                                                <motion.span 
                                                  initial={{ scale: 0, rotate: -180 }} 
                                                  animate={{ scale: 1, rotate: 0 }}
                                                  className={model.color}
                                                >
                                                  <Sparkles size={12} />
                                                </motion.span>
                                              )}
                                           </div>
                                           <p className="text-[10px] text-slate-500 mt-0.5">{model.desc}</p>
                                        </div>
                                      </div>
                                    </motion.button>
                                  );
                                })}
                             </div>
                          </motion.div>
                          
                          <motion.div
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ delay: 0.4 }}
                             className="pt-4 border-t border-white/5"
                          >
                             <div className="flex items-center justify-between text-[10px] text-slate-600">
                                <span>v2.5.0-beta</span>
                                <div className="flex gap-2">
                                  <ShieldCheck size={12} />
                                  <span>Encrypted Connection</span>
                                </div>
                             </div>
                          </motion.div>

                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIGuide;