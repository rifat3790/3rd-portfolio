import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, AlertCircle, Bookmark, CheckCircle2 } from 'lucide-react';
import { SKILLS } from '../../data/portfolioData';
import { Card } from '../../components/ui/Card';

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Tech' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'shopify', label: 'Shopify' },
    { id: 'database', label: 'Database' },
    { id: 'ai', label: 'AI & Prompts' },
    { id: 'design', label: 'UI/UX Design' }
  ];

  // Filtering criteria
  const filteredSkills = SKILLS.filter((s) => {
    const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // SVG parameters for circular gauge
  const radius = 28;
  const stroke = 3.5;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="skills" className="py-24 border-t border-slate-200/50 dark:border-zinc-900/60 bg-slate-50 dark:bg-black/10 relative no-print">
      
      {/* Background spotlights */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent font-display">
            Expertise Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            Professional Skillset
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mt-1" />
        </div>

        {/* SEARCH AND FILTERS PANEL */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-darkcard border border-slate-200/60 dark:border-zinc-800 p-4.5 rounded-2xl shadow-sm max-w-4xl mx-auto w-full">
          
          {/* Category tabs */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'btn-active-premium'
                    : 'border-slate-200/50 dark:border-zinc-800/80 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-850 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar input */}
          <div className="relative w-full md:w-64 flex items-center border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 bg-slate-50 dark:bg-zinc-950/20">
            <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search skill (e.g. React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs focus:outline-none text-slate-800 dark:text-zinc-200"
            />
          </div>

        </div>

        {/* SKILLS GRID */}
        <div className="max-w-5xl mx-auto w-full">
          <AnimatePresence mode="popLayout">
            {filteredSkills.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
              >
                {filteredSkills.map((skill) => {
                  const strokeDashoffset = circumference - (skill.level / 100) * circumference;
                  const isHovered = hoveredSkill === skill.name;
                  
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="relative"
                    >
                      <Card 
                        className={`!p-5 border transition-all duration-300 flex items-center gap-4.5 ${
                          isHovered ? 'border-accent bg-accent/5' : 'border-slate-200 dark:border-zinc-800 bg-white'
                        }`}
                        hoverEffect={false}
                        spotlight
                        glowBorder
                      >
                        {/* Custom Radial SVG level chart */}
                        <div className="relative w-16 h-16 shrink-0">
                          <svg className="w-full h-full -rotate-90">
                            {/* Background circle track */}
                            <circle
                              cx="32"
                              cy="32"
                              r={radius}
                              stroke="rgba(156, 163, 175, 0.1)"
                              strokeWidth={stroke}
                              fill="transparent"
                            />
                            {/* Accent value line */}
                            <motion.circle
                              cx="32"
                              cy="32"
                              r={radius}
                              stroke="rgb(var(--color-accent))"
                              strokeWidth={stroke}
                              fill="transparent"
                              strokeDasharray={circumference}
                              initial={{ strokeDashoffset: circumference }}
                              animate={{ strokeDashoffset }}
                              transition={{ duration: 1.2, ease: 'easeOut' }}
                              strokeLinecap="round"
                            />
                          </svg>
                          {/* Inner percent counter */}
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-black font-display text-slate-800 dark:text-zinc-200">
                            {skill.level}%
                          </div>
                        </div>

                        {/* Description metadata */}
                        <div className="text-left flex flex-col gap-0.5 flex-1 min-w-0">
                          <h4 className="text-sm font-bold font-display text-slate-800 dark:text-zinc-100 truncate">
                            {skill.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
                            {skill.years} {skill.years === 1 ? 'Year' : 'Years'} Experience
                          </span>
                          
                          {/* Indicator for category */}
                          <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-zinc-500 mt-1 font-display">
                            {skill.category}
                          </span>
                        </div>

                        {/* Certification badge indicator */}
                        {skill.certifications && skill.certifications.length > 0 && (
                          <div className="self-start text-accent">
                            <span title="Certified">
                              <Sparkles className="w-3.5 h-3.5 fill-accent/20" />
                            </span>
                          </div>
                        )}

                      </Card>

                      {/* HOVER TOOLTIP: Projects & Certificates */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            className="absolute bottom-full left-0 right-0 z-20 mb-2 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-darkcard/95 backdrop-blur-md shadow-xl text-left flex flex-col gap-2.5 pointer-events-none"
                          >
                            {/* Projects tag list */}
                            {skill.projectsUsing.length > 0 && (
                              <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display flex items-center gap-1">
                                  <Bookmark className="w-3 h-3" />
                                  <span>Used in Projects</span>
                                </span>
                                <div className="flex flex-wrap gap-1 mt-0.5">
                                  {skill.projectsUsing.map((p) => (
                                    <span key={p} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300">
                                      {p}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Certs detail listing */}
                            {skill.certifications && skill.certifications.length > 0 && (
                              <div className="flex flex-col gap-1 border-t border-slate-100 dark:border-zinc-900 pt-2">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                  <span>Certifications</span>
                                </span>
                                <ul className="flex flex-col gap-0.5 mt-0.5">
                                  {skill.certifications.map((c) => (
                                    <li key={c} className="text-[9.5px] text-slate-600 dark:text-zinc-400 font-medium">
                                      • {c}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Default description summary if nothing else */}
                            {skill.projectsUsing.length === 0 && (!skill.certifications || skill.certifications.length === 0) && (
                              <div className="text-[10px] text-slate-500 dark:text-zinc-400 leading-relaxed">
                                Professional application of {skill.name} in commercial pipelines, maintaining high clean-code standards.
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="py-12 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-2 max-w-md mx-auto text-slate-500 dark:text-zinc-500">
                <AlertCircle className="w-8 h-8 text-slate-400 dark:text-zinc-600" />
                <span className="text-sm font-semibold font-display">No skills found</span>
                <p className="text-xs text-center max-w-xs px-4 mt-0.5">
                  Try refining your search keyword or selecting a different tech category filter tab.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;
