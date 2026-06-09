import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUp, Heart } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Button } from '../ui/Button';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { addNotification, incrementAnalytics } = usePortfolioStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addNotification('Please provide a valid email address.', 'error', 'Invalid Email');
      return;
    }
    
    // Success subscription simulation
    addNotification('Thanks for subscribing to our newsletter! 🚀', 'success', 'Subscription Saved');
    setEmail('');
  };

  const handleDownloadResume = () => {
    incrementAnalytics('downloads');
    addNotification('CV download started!', 'success', 'CV Downloaded');
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Refayet_Hossen_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-50 dark:bg-black/40 border-t border-slate-200/60 dark:border-zinc-900 pt-16 pb-8 px-6 no-print overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo & Brand statement */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-white text-sm shadow-md shadow-accent/20">
                ⚡
              </div>
              <span>REFAYET<span className="text-accent">.</span></span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-zinc-500 leading-relaxed max-w-sm mt-1">
              Senior Full Stack Architect & Shopify Specialist designing world-class SaaS frontends, headless commerce models, and custom React + TS solutions.
            </p>
            <div className="flex gap-3 mt-2">
              <a 
                href="https://linkedin.com/in/refayet-dev" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a 
                href="https://github.com/refayet-dev" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a 
                href="https://twitter.com/refayet-dev" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1 md:col-span-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display">
                Explore
              </span>
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-left text-xs text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent transition-colors">About Journey</button>
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-left text-xs text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent transition-colors">Skills Matrix</button>
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-left text-xs text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent transition-colors">Portfolio Case Studies</button>
              <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-left text-xs text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent transition-colors">Hire Refayet</button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display">
                Utilities
              </span>
              <Link to="/resume" className="text-xs text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent transition-colors">ATS CV Builder</Link>
              <Link to="/blog" className="text-xs text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent transition-colors">Tech Blog</Link>
              <button onClick={handleDownloadResume} className="text-left text-xs text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent transition-colors">Download CV</button>
              <Link to="/admin" className="text-xs text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent transition-colors">Admin Portal</Link>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display">
              Join Newsletter
            </span>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Get technical insights, web optimization templates, and modern React guidelines straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full mt-1">
              <input
                type="email"
                placeholder="developer@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 focus:outline-none focus:border-accent text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600"
              />
              <Button type="submit" variant="primary" size="sm" className="!py-2">
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        {/* Separator / Copy / Scroll button */}
        <div className="pt-8 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 dark:text-zinc-500 flex items-center gap-1">
            <span>© {new Date().getFullYear()} Refayet Hossen. Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in React & TS.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-200/50 dark:hover:bg-zinc-800/50 transition-all group cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-zinc-800"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
