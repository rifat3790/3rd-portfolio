import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { usePortfolioStore } from './store/usePortfolioStore';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CommandPalette from './components/layout/CommandPalette';
import NotificationProvider from './components/layout/NotificationProvider';

// Feature components
import Hero from './features/hero/Hero';
import About from './features/about/About';
import Skills from './features/skills/Skills';
import Projects from './features/projects/Projects';
import Services from './features/services/Services';
import Contact from './features/contact/Contact';

import ResumeBuilder from './features/resume/ResumeBuilder';
import Blog from './features/blog/Blog';
import BlogPostView from './features/blog/BlogPostView';
import Dashboard from './features/admin/Dashboard';
import AiAssistant from './features/assistant/AiAssistant';

// Scroll to top helper on route transitions
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Analytics Visited-Section Tracker
const SectionObserver = () => {
  const { unlockAchievement } = usePortfolioStore();
  
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'services', 'contact'];
    const visited = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visited.add(entry.target.id);
            if (visited.size === sections.length) {
              unlockAchievement('explore_all');
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [unlockAchievement]);

  return null;
};

// Main Single Landing Page Assembly
const Home = () => {
  return (
    <>
      <SectionObserver />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
    </>
  );
};

export function App() {
  const { incrementAnalytics, unlockAchievement, addNotification } = usePortfolioStore();

  // Log site visit on mount
  useEffect(() => {
    incrementAnalytics('visits');
  }, [incrementAnalytics]);

  // Konami Code Secret Listener
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiSequence[index]) {
        index++;
        if (index === konamiSequence.length) {
          unlockAchievement('easter_egg');
          // Add custom retro look/toast
          addNotification('Retro Gaming Mode Activated! 👾', 'success', 'Easter Egg Unlocked');
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addNotification, unlockAchievement]);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-lightbg dark:bg-darkbg text-slate-800 dark:text-zinc-200 transition-colors duration-300">
        
        {/* Navigation Head */}
        <Header />

        {/* Global Floating Elements */}
        <CommandPalette />
        <NotificationProvider />
        <AiAssistant />

        {/* Routes Body */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostView />} />
            <Route path="/admin" element={<Dashboard />} />
            
            {/* Catch-all Redirect */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
