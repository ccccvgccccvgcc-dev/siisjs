import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PAGES, APP_TITLE } from '../constants';
import { Menu, X, ChevronRight, Globe, Rocket, Star, User, Search, Activity, Wifi, Zap, Cpu } from 'lucide-react';
import Starfield from './Starfield';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Filter pages based on search query
  const filteredPages = PAGES.filter(page => {
    const query = searchQuery.toLowerCase();
    return (
      page.title.toLowerCase().includes(query) ||
      page.summary.toLowerCase().includes(query)
    );
  });

  // Group pages for the sidebar
  const categories = {
    'Solar System': filteredPages.filter(p => p.category === 'Solar System'),
    'Deep Space': filteredPages.filter(p => p.category === 'Deep Space'),
    'Humanity': filteredPages.filter(p => p.category === 'Humanity'),
  };

  const CategoryIcon = ({ cat }: { cat: string }) => {
    switch(cat) {
      case 'Solar System': return <Globe size={14} />;
      case 'Deep Space': return <Star size={14} />;
      case 'Humanity': return <User size={14} />;
      default: return <Rocket size={14} />;
    }
  };

  const SearchInput = ({ className = "" }: { className?: string }) => (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-slate-800 rounded-lg leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-600 focus:outline-none focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all duration-200 backdrop-blur-sm"
        placeholder="Search cosmos..."
      />
    </div>
  );

  // Simulated Telemetry Component
  const TelemetryWidget = () => {
    const [stats, setStats] = useState({ cpu: 12, net: 45, pwr: 98 });
    
    useEffect(() => {
      const interval = setInterval(() => {
        setStats({
          cpu: Math.floor(Math.random() * 30) + 10,
          net: Math.floor(Math.random() * 20) + 80,
          pwr: Math.floor(Math.random() * 5) + 95
        });
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 space-y-3 backdrop-blur-md">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-500 font-bold">
          <span>System Status</span>
          <span className="text-green-400 animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Cpu size={12} className="text-indigo-400" />
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-500" 
                animate={{ width: `${stats.cpu}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-mono w-6">{stats.cpu}%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Wifi size={12} className="text-blue-400" />
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500" 
                animate={{ width: `${stats.net}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-mono w-6">{stats.net}%</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap size={12} className="text-amber-400" />
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-amber-500" 
                animate={{ width: `${stats.pwr}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-mono w-6">{stats.pwr}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 overflow-hidden relative selection:bg-indigo-500/30">
      {/* Starfield Background */}
      <Starfield />
      
      {/* Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] animate-pulse duration-[8000ms]" />
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-white/5 bg-slate-950/60 backdrop-blur-xl z-20 h-screen sticky top-0 shadow-2xl shadow-black/50">
        <div className="p-6 border-b border-white/5 relative overflow-hidden group">
          <motion.div 
             className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <NavLink to="/" className="flex items-center gap-3 relative z-10">
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20">
              <Rocket className="text-white" size={24} />
            </div>
            <div>
              <span className="text-xl font-bold font-['Space_Grotesk'] tracking-tight block leading-none">{APP_TITLE}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Frontier</span>
            </div>
          </NavLink>
        </div>

        <div className="px-4 pt-4 pb-2">
          <SearchInput />
        </div>

        <div className="flex-1 overflow-y-auto py-2 px-3 space-y-6 custom-scrollbar">
          {Object.entries(categories).map(([cat, items]) => (
            items.length > 0 && (
              <div key={cat}>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3 flex items-center gap-2 opacity-70">
                  <CategoryIcon cat={cat} /> {cat}
                </h4>
                <div className="space-y-1">
                  {items.map((page) => (
                    <NavLink
                      key={page.id}
                      to={`/${page.id}`}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group relative overflow-hidden ${
                          isActive 
                          ? 'text-white bg-white/5 shadow-[0_0_20px_rgba(99,102,241,0.1)] border border-white/10' 
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                           {isActive && (
                              <motion.div
                                layoutId="activeNavIndicator"
                                className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500"
                              />
                           )}
                           {/* Hover glow effect */}
                           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                           
                          <span className="relative z-10">{page.title}</span>
                          {isActive && (
                            <motion.div 
                              layoutId="activeStar"
                              className="ml-auto"
                            >
                              <Activity size={14} className="text-indigo-400" />
                            </motion.div>
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          ))}
          
          {Object.values(categories).every(items => items.length === 0) && searchQuery && (
            <div className="text-center py-8 text-slate-500 text-sm">
              <p>No results found.</p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-white/5 bg-slate-900/20 backdrop-blur-sm">
            <TelemetryWidget />
            <div className="mt-3 text-[10px] text-slate-600 text-center font-mono">
                SECURE CONNECTION // VER 2.5.0
            </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2">
             <div className="p-1.5 bg-indigo-600 rounded-md">
              <Rocket className="text-white" size={18} />
            </div>
            <span className="text-lg font-bold font-['Space_Grotesk']">{APP_TITLE}</span>
        </NavLink>
        <button onClick={() => setMobileMenuOpen(true)} className="text-slate-300 hover:text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-slate-950 lg:hidden flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b border-white/10">
              <span className="font-bold text-lg">Navigation</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 pb-0">
              <SearchInput />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
               {Object.entries(categories).map(([cat, items]) => (
                items.length > 0 && (
                  <div key={cat}>
                    <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                       {cat}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {items.map((page) => (
                        <NavLink
                          key={page.id}
                          to={`/${page.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `block p-3 rounded-xl border ${
                              isActive 
                              ? 'bg-indigo-600/20 border-indigo-500/50 text-white' 
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`
                          }
                        >
                          {page.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 lg:ml-0 pt-16 lg:pt-0 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;