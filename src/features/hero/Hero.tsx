import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Calendar, ArrowRight, X, Check } from 'lucide-react';
import gsap from 'gsap';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ThreeBgCanvas } from '../../components/ui/ThreeBgCanvas';
import { useTranslation } from '../../hooks/useTranslation';

const SPECIALTIES = {
  en: ['Full Stack Developer', 'Shopify Architect', 'UI Engineer', 'React Developer'],
  bn: ['ফুল স্ট্যাক ডেভেলপার', 'শপিফাই আর্কিটেক্ট', 'ইউআই (UI) ইঞ্জিনিয়ার', 'রিঅ্যাক্ট ডেভেলপার']
};

export const Hero = () => {
  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { incrementAnalytics, addNotification } = usePortfolioStore();
  const { t, language } = useTranslation();

  // Specialty cycler
  useEffect(() => {
    const timer = setInterval(() => {
      setSpecialtyIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // GSAP Title text staggered reveal
  useEffect(() => {
    if (!headingRef.current) return;
    const chars = headingRef.current.querySelectorAll('.char-reveal');
    gsap.fromTo(chars, 
      { opacity: 0, y: 35, rotateX: -40 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.75, stagger: 0.04, ease: 'back.out(1.35)', delay: 0.25 }
    );
  }, []);

  // Magnetic button triggers
  const handleButtonMagnet = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleButtonMagnetReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1.1, 0.4)'
    });
  };

  const handleDownloadCV = () => {
    incrementAnalytics('downloads');
    addNotification('CV download started!', 'success', 'CV Downloaded');
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Md_Refayet_Hossen_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !email.trim()) {
      addNotification('Please choose a date, time slot, and enter your email.', 'error', 'Incomplete Form');
      return;
    }
    
    setIsSubmitting(true);
    
    fetch('https://formsubmit.co/ajax/mdrifayethossen@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        selectedDate,
        selectedTime,
        _subject: `New Meeting Request from ${email}`
      })
    })
    .then(response => response.json())
    .then(() => {
      setBookingConfirmed(true);
      addNotification(`Meeting requested for ${selectedDate} at ${selectedTime}! 📅`, 'success', 'Request Sent');
      setTimeout(() => {
        setSchedulerOpen(false);
        setBookingConfirmed(false);
        setSelectedDate('');
        setSelectedTime('');
        setEmail('');
        setIsSubmitting(false);
      }, 3000);
    })
    .catch(() => {
      setIsSubmitting(false);
      addNotification('Failed to schedule meeting. Please try again or use direct email.', 'error', 'Transmission Failed');
    });
  };

  const handleContactScroll = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectsScroll = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden mesh-bg no-print">
      {/* Interactive 3D background */}
      <ThreeBgCanvas />

      {/* Background spotlights */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT PANEL */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-start text-left gap-6">
          
          {/* Availability Status Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t('hero.badge')}</span>
          </motion.div>

          {/* Heading */}
          <div className="flex flex-col gap-3">
            <motion.h4 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-sm uppercase tracking-widest font-extrabold text-slate-500 dark:text-zinc-500 font-display"
            >
              {t('hero.role')}
            </motion.h4>
            <h1 
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-slate-900 dark:text-white leading-[1.1] [perspective:1000px]"
            >
              <span className="inline-block char-reveal opacity-0 mr-2">{t('hero.greeting')}</span>
              <span className="bg-gradient-to-r from-accent to-cyan-500 bg-clip-text text-transparent inline-block char-reveal opacity-0">
                {t('hero.name')}
              </span>
            </h1>

            {/* Specialty Rotating Text */}
            <div className="h-10 sm:h-12 overflow-hidden flex items-center gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-zinc-300 font-display">{t('hero.specializing')}</span>
              <div className="relative h-full flex-1 min-w-[200px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={specialtyIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-accent text-lg sm:text-xl md:text-2xl font-bold tracking-tight"
                  >
                    {SPECIALTIES[language][specialtyIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed max-w-2xl"
          >
            {t('hero.description')}
          </motion.p>

          {/* Call to actions row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <Button 
              variant="primary" 
              icon={ArrowRight} 
              iconPosition="right" 
              onClick={handleContactScroll}
              onMouseMove={handleButtonMagnet}
              onMouseLeave={handleButtonMagnetReset}
            >
              {t('hero.hireMe')}
            </Button>
            <Button 
              variant="glass" 
              onClick={handleProjectsScroll}
              onMouseMove={handleButtonMagnet}
              onMouseLeave={handleButtonMagnetReset}
            >
              {t('hero.exploreWork')}
            </Button>
            <Button 
              variant="outline" 
              icon={Download} 
              onClick={handleDownloadCV}
              onMouseMove={handleButtonMagnet}
              onMouseLeave={handleButtonMagnetReset}
            >
              {t('hero.downloadCV')}
            </Button>
            <Button 
              variant="secondary" 
              icon={Calendar} 
              onClick={() => setSchedulerOpen(true)}
              onMouseMove={handleButtonMagnet}
              onMouseLeave={handleButtonMagnetReset}
            >
              {t('hero.bookCall')}
            </Button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-slate-200 dark:border-zinc-800/80 pt-8 mt-6 w-full max-w-lg"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">5+</h3>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mt-1">{t('hero.stat.years')}</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">15+</h3>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mt-1">{t('hero.stat.projects')}</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">100%</h3>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mt-1">{t('hero.stat.speed')}</p>
            </div>
          </motion.div>

        </div>

        {/* RIGHT PANEL: 3D Profile Card */}
        <div className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.4 }}
            className="w-full max-w-[340px]"
          >
            <Card className="!p-6 flex flex-col gap-6" glowBorder spotlight hoverEffect>
              
              {/* Premium abstract developer graphic using SVGs */}
              <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-accent/20 to-cyan-500/10 border border-accent/20 flex items-center justify-center overflow-hidden relative group">
                {/* Embedded SVG avatar structure */}
                <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-accent drop-shadow-lg transition-transform group-hover:scale-105 duration-500">
                  <defs>
                    <linearGradient id="avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(var(--color-accent))" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="35" r="20" fill="url(#avatar-grad)" />
                  <path d="M15 85 C 15 55, 85 55, 85 85" fill="none" stroke="url(#avatar-grad)" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="30" cy="30" r="1.5" fill="#fff" />
                  <circle cx="42" cy="30" r="1.5" fill="#fff" />
                </svg>

                {/* Cyber grid overlays */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/40 text-[9px] text-cyan-400 font-mono border border-cyan-500/20">
                  React 19 + TS
                </div>
              </div>

              {/* Card Meta details */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-zinc-100">{t('hero.name')}</h3>
                  <span className="text-[10px] bg-accent/10 text-accent font-semibold px-2 py-0.5 rounded-full">HQ: Dhaka</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-500">
                  {t('hero.developer')}
                </p>
                <div className="flex gap-2 items-center text-[10px] text-slate-400 dark:text-zinc-500 font-mono mt-1">
                  <span>commits: 2.1k+</span>
                  <span>•</span>
                  <span>PRs merged: 340+</span>
                </div>
              </div>

              {/* Tech Stack micro tags */}
              <div className="flex flex-wrap gap-1.5">
                {['React', 'TypeScript', 'Tailwind', 'GraphQL', 'Shopify Liquid', 'Zustand'].map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-slate-100 dark:bg-zinc-800/80 border border-slate-200/50 dark:border-zinc-700/50 text-slate-600 dark:text-zinc-400">
                    {t}
                  </span>
                ))}
              </div>

              {/* Social Link buttons */}
              <div className="flex gap-2 pt-2 border-t border-slate-200/60 dark:border-zinc-800/80">
                <a 
                  href="https://linkedin.com/in/refayet-dev" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700/50 flex items-center justify-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300 font-medium"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/refayet-dev" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-700/50 flex items-center justify-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300 font-medium"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>

            </Card>
          </motion.div>
        </div>

      </div>

      {/* SCHEDULER DIALOG MODAL */}
      <AnimatePresence>
        {schedulerOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-2xl shadow-2xl p-6 text-slate-800 dark:text-zinc-200 text-left relative overflow-hidden"
            >
              {/* Premium Gradient Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-indigo-500 to-purple-600" />

              <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-900 pb-4 mb-4 mt-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent animate-pulse" />
                  <h3 className="font-bold text-lg font-display text-slate-900 dark:text-white">Schedule Strategy Session</h3>
                </div>
                <button
                  onClick={() => setSchedulerOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {bookingConfirmed ? (
                <div className="py-8 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/15 animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white font-display text-base">Strategy Session Scheduled!</h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 text-center max-w-xs leading-relaxed mt-1">
                    An email calendar invite has been sent to your inbox. Let's build something epic!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="flex flex-col gap-4">
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                    Pick an available date and time slot below for a 30-minute discovery call to discuss store optimization or React architectures.
                  </p>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-accent dark:text-accent font-display">
                      Your Email
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      placeholder="john@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-slate-50/50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-850 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-accent dark:focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-accent dark:text-accent font-display">
                      Select Date
                    </label>
                    <input
                      required
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-slate-50/50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-850 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-accent dark:focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all w-full cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-accent dark:text-accent font-display">
                      Available Time Slots (Local Time)
                    </label>
                    <div className="grid grid-cols-2 gap-2.5 mt-1">
                      {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2.5 px-4 text-xs rounded-xl border font-semibold transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                            selectedTime === slot
                              ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                              : 'border-slate-200 dark:border-zinc-850 bg-slate-50/50 hover:bg-slate-100/80 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80 text-slate-755 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="w-full mt-2.5 py-3 font-semibold text-xs tracking-wider uppercase" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending Request...' : 'Confirm Booking'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
