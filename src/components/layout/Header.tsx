import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Palette } from 'lucide-react';
import { usePortfolioStore, type AccentColor } from '../../store/usePortfolioStore';
import { Button } from '../ui/Button';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const { theme, toggleTheme, accentColor, setAccentColor } = usePortfolioStore();

  // Scroll effect on header bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Setup accent colors
    const ACCENT_MAP: Record<AccentColor, { primary: string; hover: string }> = {
      violet: { primary: '139 92 246', hover: '124 58 237' },
      emerald: { primary: '16 185 129', hover: '5 150 105' },
      amber: { primary: '245 158 11', hover: '217 119 6' },
      rose: { primary: '244 63 94', hover: '225 29 72' },
      cyan: { primary: '6 182 212', hover: '8 145 178' },
    };
    const rgbVals = ACCENT_MAP[accentColor];
    if (rgbVals) {
      const root = document.documentElement;
      root.style.setProperty('--color-accent-rgb', rgbVals.primary);
      root.style.setProperty('--color-accent-hover-rgb', rgbVals.hover);
    }
  }, [theme, accentColor]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Resume Builder', path: '/resume' },
    { label: 'Blog', path: '/blog' },
    { label: 'Dashboard', path: '/admin' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
    // If navigating to home, smooth scroll to top
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeAccentClass = (color: AccentColor) => {
    switch (color) {
      case 'violet': return 'bg-violet-500 hover:bg-violet-600 ring-violet-500/20';
      case 'emerald': return 'bg-emerald-500 hover:bg-emerald-600 ring-emerald-500/20';
      case 'amber': return 'bg-amber-500 hover:bg-amber-600 ring-amber-500/20';
      case 'rose': return 'bg-rose-500 hover:bg-rose-600 ring-rose-500/20';
      case 'cyan': return 'bg-cyan-500 hover:bg-cyan-600 ring-cyan-500/20';
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 no-print ${
        isScrolled 
          ? 'py-4 bg-lightbg/85 dark:bg-darkbg/85 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 shadow-md' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group"
        >
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white transition-transform group-hover:rotate-12 duration-300 shadow-md shadow-accent/20">
            ⚡
          </div>
          <span>REFAYET<span className="text-accent">.</span></span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors cursor-pointer relative py-1 ${
                  isActive 
                    ? 'text-accent font-semibold' 
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Custom Accent Color Palette Picker */}
          <div className="relative">
            <button
              onClick={() => setCustomizerOpen(!customizerOpen)}
              className="p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-accent dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              title="Customize Accent Color"
            >
              <Palette className="w-4.5 h-4.5" />
            </button>
            
            {customizerOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setCustomizerOpen(false)} />
                <div className="absolute right-0 mt-3 p-3.5 w-44 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-darkcard/95 backdrop-blur-md shadow-xl z-20 flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display">
                    Select Accent
                  </span>
                  <div className="flex gap-2.5 flex-wrap justify-between mt-1">
                    {(['violet', 'emerald', 'amber', 'rose', 'cyan'] as AccentColor[]).map((col) => (
                      <button
                        key={col}
                        onClick={() => {
                          setAccentColor(col);
                          setCustomizerOpen(false);
                        }}
                        className={`w-6 h-6 rounded-full cursor-pointer ring-offset-2 dark:ring-offset-darkcard transition-all ${
                          activeAccentClass(col)
                        } ${accentColor === col ? 'ring-2 ring-accent scale-110' : ''}`}
                        title={col}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200/60 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-accent dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            title="Toggle Theme Mode"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Quick search indicator */}
          <kbd className="hidden lg:inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800 border border-slate-200/60 dark:border-zinc-700/50 rounded-lg">
            <span>⌘</span><span>K</span>
          </kbd>

          <Button 
            variant="primary" 
            size="sm"
            onClick={() => {
              navigate('/#contact');
              const contactEl = document.getElementById('contact');
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Hire Me
          </Button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex md:hidden items-center gap-3">
          {/* Custom Accent Picker (Shortcut for mobile) */}
          <button
            onClick={() => setAccentColor(accentColor === 'violet' ? 'emerald' : accentColor === 'emerald' ? 'amber' : accentColor === 'amber' ? 'rose' : accentColor === 'rose' ? 'cyan' : 'violet')}
            className="p-2 rounded-xl text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            <Palette className="w-5 h-5 text-accent" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-full bg-white dark:bg-darkbg border-b border-slate-200/80 dark:border-zinc-800 p-6 shadow-xl z-30 flex flex-col gap-5 md:hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-left text-base font-semibold py-2 transition-colors border-b border-slate-100 dark:border-zinc-900 ${
                  location.pathname === link.path
                    ? 'text-accent'
                    : 'text-slate-700 dark:text-zinc-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <Button 
            variant="primary" 
            className="w-full"
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/#contact');
              setTimeout(() => {
                const contactEl = document.getElementById('contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            Hire Me
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
