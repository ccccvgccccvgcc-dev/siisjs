import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, Variants, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { PAGES } from '../constants';
import { generateFunFact } from '../services/geminiService';
import { ArrowRight, Share2, Database, Layers, Sparkles, BarChart2, Image as ImageIcon, FileText, Zap, Activity } from 'lucide-react';
import AIGuide from './AIGuide';

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

// --- Components ---

const HolographicCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
      {/* Glossy reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
    </motion.div>
  );
};

const TelemetryView = ({ id }: { id: string }) => {
  // Mock telemetry data visualization
  const bars = Array.from({ length: 12 }).map((_, i) => ({
    height: Math.random() * 100,
    color: ['bg-indigo-500', 'bg-purple-500', 'bg-cyan-500'][i % 3]
  }));

  return (
    <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
       <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
         <Activity size={16} /> Orbital & Atmospheric Data
       </h3>
       <div className="flex items-end justify-between h-48 gap-2">
          {bars.map((bar, idx) => (
            <div key={idx} className="w-full bg-slate-800/50 rounded-t-sm relative group overflow-hidden">
               <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${bar.height}%` }}
                  transition={{ duration: 1, delay: idx * 0.1, type: "spring" }}
                  className={`absolute bottom-0 w-full ${bar.color} opacity-60 group-hover:opacity-100 transition-opacity`}
               />
            </div>
          ))}
       </div>
       <div className="grid grid-cols-3 gap-4 mt-6">
          {[1,2,3].map(i => (
             <div key={i} className="bg-slate-950 p-3 rounded border border-white/5">
                <div className="text-[10px] text-slate-500 mb-1">Metric {i}X-Alpha</div>
                <div className="text-lg font-mono text-indigo-400">{(Math.random() * 1000).toFixed(2)}</div>
             </div>
          ))}
       </div>
    </div>
  );
};

const VisualsView = ({ id }: { id: string }) => {
   return (
     <div className="grid grid-cols-2 gap-4">
       {[1, 2, 3, 4].map((i) => (
         <div key={i} className="aspect-video bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden relative group cursor-pointer">
            <div className="absolute inset-0 bg-slate-800 animate-pulse opacity-20" />
            <img 
              src={`https://picsum.photos/400/300?random=${id}-${i}`} 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
              alt="Visual data"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
               <span className="text-[10px] text-white/80 font-mono">IMG_SEQ_00{i}</span>
            </div>
         </div>
       ))}
     </div>
   );
};

const DynamicPage: React.FC = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [funFact, setFunFact] = useState<string>("");
  const [loadingFact, setLoadingFact] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'telemetry' | 'visuals'>('overview');

  const pageData = PAGES.find(p => p.id === (pageId || 'home'));

  // Parallax Effect Hooks
  const { scrollY } = useScroll();
  // Translate the background down as we scroll down (creating a 'slower' movement effect relative to content)
  const yBg = useTransform(scrollY, [0, 1000], [0, 250]);

  useEffect(() => {
    if (!pageData) {
      navigate('/');
      return;
    }
    window.scrollTo(0, 0);
    setFunFact(""); 
    setActiveTab('overview');
  }, [pageId, pageData, navigate]);

  const handleGenerateFact = async () => {
    if (!pageData) return;
    setLoadingFact(true);
    const fact = await generateFunFact(pageData.title);
    setFunFact(fact);
    setLoadingFact(false);
  };

  if (!pageData) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'telemetry', label: 'Telemetry', icon: BarChart2 },
    { id: 'visuals', label: 'Visual Database', icon: ImageIcon },
  ];

  return (
    <>
      <AIGuide topic={pageData.title} />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-h-screen relative overflow-hidden"
      >
        {/* Parallax Background Layer */}
        <motion.div 
          style={{ y: yBg }}
          className="absolute top-[-10%] left-0 right-0 h-[130%] z-0 pointer-events-none opacity-30"
        >
           {/* Overlay to ensure text contrast */}
           <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950 z-10" />
           <img 
             src={pageData.imageUrl} 
             alt="Atmospheric Background" 
             className="w-full h-full object-cover blur-3xl scale-110"
           />
        </motion.div>

        {/* Main Content Container */}
        <div className="relative z-10 p-6 md:p-12 pb-32">
          
          {/* Hero Section */}
          <header className="mb-12 relative perspective-1000">
             <motion.div variants={itemVariants} className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
             
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div className="relative z-10">
                 <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                      {pageData.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="text-slate-500 text-sm uppercase tracking-widest font-mono">ID: {pageData.id.toUpperCase()}</span>
                 </motion.div>

                 <motion.h1 
                  variants={itemVariants}
                  className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-4 font-['Space_Grotesk'] tracking-tighter"
                 >
                   {pageData.title}
                 </motion.h1>

                 <motion.p 
                  variants={itemVariants}
                  className="text-xl text-slate-400 max-w-2xl leading-relaxed"
                 >
                   {pageData.summary}
                 </motion.p>
               </div>

               {/* Action Buttons */}
               <motion.div variants={itemVariants} className="flex gap-3">
                  <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
                    <Share2 className="w-5 h-5 text-slate-400 group-hover:text-white" />
                  </button>
                  <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
                    <Database className="w-5 h-5 text-slate-400 group-hover:text-white" />
                  </button>
               </motion.div>
             </div>
          </header>

          {/* Holographic Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 perspective-1000"
          >
            {pageData.stats.map((stat, idx) => (
              <HolographicCard key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 group backdrop-blur-sm shadow-xl">
                <div className="flex items-start justify-between mb-2">
                   <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">{stat.label}</p>
                   <Zap size={12} className="text-indigo-500/50 group-hover:text-indigo-400 transition-colors" />
                </div>
                <p className="text-lg md:text-2xl font-semibold text-slate-200 font-['Space_Grotesk']">{stat.value}</p>
              </HolographicCard>
            ))}
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="flex gap-6 border-b border-white/10 mb-8 relative">
             {tabs.map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`pb-4 text-sm font-medium flex items-center gap-2 transition-colors relative ${
                   activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                 }`}
               >
                 <tab.icon size={16} />
                 {tab.label}
                 {activeTab === tab.id && (
                   <motion.div 
                     layoutId="activeTab"
                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                   />
                 )}
               </button>
             ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Dynamic Content based on Tabs */}
            <div className="min-h-[400px]">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 transition={{ duration: 0.3 }}
               >
                  {activeTab === 'overview' && (
                     <div className="space-y-8">
                        <div className="prose prose-invert prose-lg max-w-none">
                          <p className="text-slate-300 leading-8 first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-400 first-letter:mr-3 first-letter:float-left">
                            {pageData.content}
                          </p>
                        </div>

                        {/* AI Fact Generator */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 relative overflow-hidden group">
                          <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors" />
                          
                          <h3 className="text-lg font-bold text-indigo-300 mb-3 flex items-center gap-2">
                            <Sparkles size={18} /> AI Analysis
                          </h3>
                          
                          {!funFact && !loadingFact && (
                            <button 
                              onClick={handleGenerateFact}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95"
                            >
                              Analyze Data & Generate Fact
                            </button>
                          )}

                          {loadingFact && (
                             <div className="flex items-center gap-2 text-indigo-300 text-sm">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75" />
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150" />
                                <span>Decrypting cosmic archives...</span>
                             </div>
                          )}

                          {funFact && (
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-slate-200 italic font-medium leading-relaxed border-l-2 border-indigo-500 pl-4"
                            >
                              "{funFact}"
                            </motion.p>
                          )}
                       </div>
                     </div>
                  )}

                  {activeTab === 'telemetry' && <TelemetryView id={pageData.id} />}
                  
                  {activeTab === 'visuals' && <VisualsView id={pageData.id} />}
               </motion.div>
            </div>

            {/* Right Column: Visual Representation (Sticky) */}
            <motion.div variants={itemVariants} className="sticky top-24 space-y-6">
               <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/50 border border-white/10 bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 z-10 pointer-events-none" />
                  
                  {/* Scanner Effect */}
                  <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(99,102,241,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
                  <motion.div 
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-indigo-400/50 z-20 shadow-[0_0_15px_rgba(99,102,241,0.8)]" 
                  />

                  <img 
                    src={pageData.imageUrl} 
                    alt={pageData.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                  />
                  
                  <div className="absolute bottom-6 left-6 z-30">
                     <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white border border-white/10">
                          <Layers size={16} />
                        </div>
                        <span className="text-xs font-bold text-white/80 backdrop-blur-sm px-2 py-1 rounded-md bg-black/40 border border-white/5 uppercase tracking-wider">
                          Primary Visual Feed
                        </span>
                     </div>
                     <p className="text-slate-400 text-xs max-w-xs line-clamp-2">
                       Real-time rendering of {pageData.title} based on available spectroscopic data.
                     </p>
                  </div>
               </div>

               {/* Quick Stats Mini Cards */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-colors">
                     <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Discovery Date</div>
                     <div className="text-slate-200 font-mono">Unknown</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-colors">
                     <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Habitability</div>
                     <div className="text-slate-200 font-mono flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-red-500"></span> Low
                     </div>
                  </div>
               </div>
            </motion.div>

          </div>

          {/* Footer Navigation */}
          <motion.div variants={itemVariants} className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-sm text-slate-500">
             <span className="font-mono">SYS_TIME: {Date.now()}</span>
             <button 
               className="flex items-center gap-2 hover:text-indigo-400 transition-colors group"
               onClick={() => {
                  const currentIndex = PAGES.findIndex(p => p.id === pageData.id);
                  const nextIndex = (currentIndex + 1) % PAGES.length;
                  navigate(`/${PAGES[nextIndex].id}`);
               }}
             >
               Next Entry 
               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </motion.div>
        </div>

      </motion.div>
    </>
  );
};

export default DynamicPage;