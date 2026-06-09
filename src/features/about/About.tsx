import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronDown, Trophy, Zap, Compass, Coffee } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Card } from '../../components/ui/Card';
import { TIMELINE } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const ROADMAP = [
  { term: 'Q3 - Q4 2026', title: 'AI-Agent Integrations', desc: 'Implementing stateful subagents in client web tools using LangChain and custom vector DB retrievals.' },
  { term: 'Q1 - Q2 2027', title: 'Advanced WebGPU Graphics', desc: 'Refactoring 3D portfolio assets using WebGPU shaders and Three.js canvas structures.' }
];

const PERSONALITY = [
  { title: 'Obsessively Optimized', desc: 'I cannot stand slow loading speeds or redundant code libraries. 100/100 Lighthouse is my standard.', icon: Zap },
  { title: 'Product Focused', desc: 'I code with conversion and sales growth metrics in mind, ensuring storefront UI serves the business.', icon: Compass },
  { title: 'Lifelong Learner', desc: 'Constantly absorbing new stacks. Coffee and technical documentation are my fuel.', icon: Coffee }
];

export const About = () => {
  const [expandedTimeline, setExpandedTimeline] = useState<string | null>(null);
  const [selectedTrait, setSelectedTrait] = useState<number | null>(null);
  
  const { achievements } = usePortfolioStore();

  // GSAP ScrollTrigger timeline animations
  useEffect(() => {
    const items = document.querySelectorAll('.timeline-item-reveal');
    gsap.fromTo(items, 
      { opacity: 0, x: -30 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.7, 
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  const handleTimelineToggle = (id: string) => {
    setExpandedTimeline(expandedTimeline === id ? null : id);
    // Achievement unlock check for exploration
    const allTimelineIds = TIMELINE.map((t) => t.id);
    if (id === allTimelineIds[0]) {
      // Small easter trigger
    }
  };

  return (
    <section id="about" className="py-24 border-t border-slate-200/50 dark:border-zinc-900/60 bg-white dark:bg-darkbg/20 relative no-print">
      
      {/* Background gradients */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent font-display">
            My Story
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            Engineering Visual Experiences
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mt-1" />
        </div>

        {/* CORE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Narrative & Personality */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-4 text-left">
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Who is Refayet Hossen?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                I am a passionate software engineer based in Dhaka, specializing in frontend development architectures. Over the past 5 years, I have helped merchants double their checkout conversions by migrating traditional sites into blazing-fast headless Shopify frameworks.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                I enjoy writing responsive interfaces in React and TypeScript, optimizing Web Vitals, and incorporating smooth, physics-based motion transitions that direct user focus.
              </p>
            </div>

            {/* Trait Cards */}
            <div className="flex flex-col gap-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display text-left">
                Personality Traits
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PERSONALITY.map((trait, idx) => {
                  const IconComp = trait.icon;
                  const isSelected = selectedTrait === idx;
                  return (
                    <Card
                      key={trait.title}
                      hoverEffect={false}
                      className={`cursor-pointer !p-4 border transition-all ${
                        isSelected 
                          ? 'border-accent bg-accent/5 dark:bg-accent/5' 
                          : 'border-slate-200 dark:border-zinc-800'
                      }`}
                      onClick={() => setSelectedTrait(isSelected ? null : idx)}
                    >
                      <div className="flex items-center gap-2">
                        <IconComp className="w-4 h-4 text-accent shrink-0" />
                        <h4 className="text-xs font-bold font-display text-slate-800 dark:text-zinc-200 text-left">
                          {trait.title}
                        </h4>
                      </div>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed mt-2 text-left"
                          >
                            {trait.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Future Career Roadmap */}
            <div className="flex flex-col gap-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display text-left">
                Career Roadmap (What I'm Learning Next)
              </span>
              <div className="flex flex-col gap-3">
                {ROADMAP.map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-slate-200/50 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-900/10">
                    <span className="text-xs font-bold text-accent font-mono shrink-0">{item.term}</span>
                    <div className="text-left flex flex-col gap-0.5">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Chronology Timeline Accordion */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-8 text-left">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              Milestones & Timeline
            </h3>

            <div className="relative border-l-2 border-slate-200 dark:border-zinc-800 ml-3.5 pl-6 flex flex-col gap-8">
              {TIMELINE.map((item) => {
                const isOpen = expandedTimeline === item.id;
                return (
                  <div key={item.id} className="relative timeline-item-reveal opacity-0">
                    {/* Circle Node Pin */}
                    <div className={`absolute -left-[32px] top-1.5 w-4.5 h-4.5 rounded-full border-2 transition-colors ${
                      item.type === 'work' 
                        ? 'bg-accent border-accent text-white' 
                        : item.type === 'education'
                        ? 'bg-cyan-500 border-cyan-500 text-white'
                        : 'bg-amber-500 border-amber-500 text-white'
                    }`} />

                    <div 
                      onClick={() => handleTimelineToggle(item.id)}
                      className="cursor-pointer flex flex-col gap-1.5 p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950/20 hover:border-slate-300 dark:hover:border-zinc-700 transition-all shadow-sm"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-bold font-mono text-accent">{item.year}</span>
                          <h4 className="text-sm font-bold font-display text-slate-800 dark:text-zinc-200 mt-0.5">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-zinc-500">{item.subtitle}</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 dark:text-zinc-500 transition-transform ${isOpen ? 'rotate-185' : ''}`} />
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-2 pt-2 border-t border-slate-100 dark:border-zinc-900"
                          >
                            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                              {item.description}
                            </p>
                            {item.tags && (
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {item.tags.map((t) => (
                                  <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certifications Row */}
            <div className="flex flex-col gap-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display">
                Featured Certifications
              </span>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/20">
                  <Award className="w-5 h-5 text-accent shrink-0" />
                  <div className="flex-1 text-xs">
                    <span className="font-semibold text-slate-800 dark:text-zinc-200">Meta Certified Front-End Developer</span>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">Cred ID: META-FED-490321</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/20">
                  <Award className="w-5 h-5 text-cyan-500 shrink-0" />
                  <div className="flex-1 text-xs">
                    <span className="font-semibold text-slate-800 dark:text-zinc-200">Shopify Plus Storefront Developer Cert</span>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">Shopify Academy • 2023</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* GAMIFIED ACHIEVEMENTS PANEL */}
        <div className="mt-8 border-t border-slate-200/50 dark:border-zinc-800/80 pt-12 flex flex-col gap-6 text-left">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-lg font-display text-slate-900 dark:text-white">
              Portfolio Badges & Achievements
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 -mt-3 leading-relaxed max-w-2xl">
            Interact with the site (switch accent colors, complete the ATS CV generator checklist, chat with the AI chatbot, find the Konami Code easter egg) to unlock developer trophies!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-2">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center gap-2 relative ${
                  ach.unlocked
                    ? 'border-accent bg-accent/5 dark:bg-accent/5 shadow-md shadow-accent/5'
                    : 'border-slate-200/80 dark:border-zinc-800 bg-slate-50/30 dark:bg-zinc-900/5 opacity-55 hover:opacity-75'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  ach.unlocked ? 'bg-accent/15 scale-110' : 'bg-slate-200/50 dark:bg-zinc-800/50'
                } transition-all duration-300`}>
                  {ach.icon}
                </div>
                <div>
                  <h4 className={`text-xs font-bold font-display ${ach.unlocked ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-zinc-500'}`}>
                    {ach.title}
                  </h4>
                  <p className="text-[9px] text-slate-400 dark:text-zinc-500 mt-1 leading-normal">
                    {ach.description}
                  </p>
                </div>
                {ach.unlocked && (
                  <span className="absolute bottom-2 text-[8px] font-mono text-emerald-500 dark:text-emerald-400 font-medium">
                    Unlocked {ach.unlockedAt}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
