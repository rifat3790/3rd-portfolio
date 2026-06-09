import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, Palette, Monitor, Laptop, RefreshCw, X, ShieldAlert, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useChatbotStore } from '../../store/useChatbotStore';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const navigate = useNavigate();
  const paletteRef = useRef<HTMLDivElement>(null);
  
  const { toggleTheme, setAccentColor, resetAchievements, addNotification } = usePortfolioStore();
  const toggleChatbot = useChatbotStore((state) => state.toggleChatbot);

  // Command items
  const commands = [
    {
      id: 'nav-home',
      title: 'Navigate to Home',
      category: 'Navigation',
      icon: Compass,
      action: () => { navigate('/'); setIsOpen(false); }
    },
    {
      id: 'nav-resume',
      title: 'Navigate to Resume Builder',
      category: 'Navigation',
      icon: Laptop,
      action: () => { navigate('/resume'); setIsOpen(false); }
    },
    {
      id: 'nav-blog',
      title: 'Navigate to Blog',
      category: 'Navigation',
      icon: Compass,
      action: () => { navigate('/blog'); setIsOpen(false); }
    },
    {
      id: 'nav-admin',
      title: 'Open Admin Dashboard',
      category: 'Navigation',
      icon: ShieldAlert,
      action: () => { navigate('/admin'); setIsOpen(false); }
    },
    {
      id: 'theme-toggle',
      title: 'Toggle Theme Mode (Light / Dark)',
      category: 'Preferences',
      icon: Monitor,
      action: () => { toggleTheme(); setIsOpen(false); }
    },
    {
      id: 'color-violet',
      title: 'Set Accent Color to Violet',
      category: 'Theme Accents',
      icon: Palette,
      action: () => { setAccentColor('violet'); setIsOpen(false); }
    },
    {
      id: 'color-emerald',
      title: 'Set Accent Color to Emerald',
      category: 'Theme Accents',
      icon: Palette,
      action: () => { setAccentColor('emerald'); setIsOpen(false); }
    },
    {
      id: 'color-amber',
      title: 'Set Accent Color to Amber',
      category: 'Theme Accents',
      icon: Palette,
      action: () => { setAccentColor('amber'); setIsOpen(false); }
    },
    {
      id: 'color-rose',
      title: 'Set Accent Color to Rose',
      category: 'Theme Accents',
      icon: Palette,
      action: () => { setAccentColor('rose'); setIsOpen(false); }
    },
    {
      id: 'color-cyan',
      title: 'Set Accent Color to Cyan',
      category: 'Theme Accents',
      icon: Palette,
      action: () => { setAccentColor('cyan'); setIsOpen(false); }
    },
    {
      id: 'open-assistant',
      title: 'Launch AI Portfolio Assistant Chat',
      category: 'AI Helper',
      icon: Sparkles,
      action: () => { toggleChatbot(); setIsOpen(false); }
    },
    {
      id: 'reset-badges',
      title: 'Reset Completed Achievements & Badges',
      category: 'System',
      icon: RefreshCw,
      action: () => {
        resetAchievements();
        addNotification('Achievements reset successfully.', 'info', 'System Reset');
        setIsOpen(false);
      }
    }
  ];

  // Hotkey listener: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      // Close on Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter commands
  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );



  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  // Close when clicking outside palette card
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4 no-print"
      onClick={handleBackdropClick}
    >
      <div 
        ref={paletteRef}
        onKeyDown={handleKeyDown}
        className="w-full max-w-xl glass-panel border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-800 dark:text-zinc-200"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200/50 dark:border-white/10">
          <Search className="w-5 h-5 text-slate-400 dark:text-zinc-500" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search sections..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-sm focus:outline-none text-slate-800 dark:text-zinc-100"
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 p-1 rounded hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-[350px] overflow-y-auto p-2">
          {filtered.length > 0 ? (
            <div>
              {/* Group items by categories */}
              {Array.from(new Set(filtered.map(f => f.category))).map((cat) => (
                <div key={cat}>
                  <div className="px-3 py-1.5 text-[10px] font-bold font-display uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                    {cat}
                  </div>
                  {filtered.filter(f => f.category === cat).map((cmd) => {
                    const overallIndex = filtered.indexOf(cmd);
                    const isSelected = overallIndex === selectedIndex;
                    const IconComp = cmd.icon;
                    return (
                      <div
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(overallIndex)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-accent text-white' 
                            : 'hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400 dark:text-zinc-400'}`} />
                        <span className="text-sm font-medium flex-1">{cmd.title}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-slate-400 dark:text-zinc-500'} font-mono`}>
                          {isSelected ? 'Enter' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-slate-400 dark:text-zinc-500">
              No command paths match your search.
            </div>
          )}
        </div>

        {/* Footer shortcuts indicator */}
        <div className="px-4 py-2 bg-slate-50/50 dark:bg-black/20 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
          <div className="flex gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
