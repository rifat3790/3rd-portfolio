import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Check, ChevronLeft, ChevronRight, Quote, Star, Lock, ShoppingBag, Code2, Cpu, Layers, Globe } from 'lucide-react';
import gsap from 'gsap';
import { PROJECTS, TESTIMONIALS, type Project } from '../../data/portfolioData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

// Inline GitHub SVG since lucide-react version may not export Github
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const filterTabs = [
  { id: 'all', label: 'All Work', icon: Layers },
  { id: 'shopify', label: 'Shopify Stores', icon: ShoppingBag },
  { id: 'react', label: 'React Apps', icon: Code2 },
  { id: 'fullstack', label: 'Full Stack', icon: Globe },
  { id: 'ai', label: 'AI Products', icon: Cpu },
];

/** Determine if the image value is a real path or a CSS gradient */
const isImagePath = (image: string) => image.startsWith('/') || image.startsWith('http');

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP 3D Card Hover Tilt handlers
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 14;
    const rotateY = (x - centerX) / 14;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 800,
      scale: 1.015,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const filteredProjects = PROJECTS.filter((p) =>
    activeCategory === 'all' || p.category === activeCategory
  );

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="projects" className="py-24 border-t border-slate-200/50 dark:border-zinc-900/60 bg-white dark:bg-darkbg/20 relative no-print">

      {/* Background radial overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">

        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent font-display">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            Projects & Case Studies
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-500 max-w-md">
            Real-world projects delivered for clients — from Shopify storefronts to full-stack web applications.
          </p>
          <div className="w-12 h-1 bg-accent rounded-full mt-1" />
        </div>

        {/* GRID FILTER TABS */}
        <div className="flex items-center gap-2 flex-wrap justify-center max-w-2xl mx-auto w-full">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer border ${
                  isActive
                    ? 'btn-active-premium'
                    : 'border-slate-200/50 dark:border-zinc-800/80 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-850 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Project count badge */}
        <div className="flex justify-center -mt-10">
          <span className="text-[11px] text-slate-400 dark:text-zinc-600 font-mono">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* PROJECTS GRID */}
        <div className="w-full" ref={gridRef}>
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={String(project.id)}
                  className="h-full flex cursor-pointer"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Card className="!p-0 flex flex-col w-full bg-white dark:bg-darkcard border-slate-200 dark:border-darkborder" glowBorder spotlight hoverEffect={false}>

                    {/* Project Image / Gradient Panel */}
                    <div
                      className="h-44 w-full relative flex items-center justify-center p-6 overflow-hidden"
                      style={isImagePath(project.image)
                        ? { background: '#0f172a' }
                        : { background: project.image }
                      }
                    >
                      {/* Real image */}
                      {isImagePath(project.image) && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-90"
                          onError={(e) => {
                            // Fallback to gradient if image fails
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            if (target.parentElement) {
                              target.parentElement.style.background = 'linear-gradient(135deg, #96bf48 0%, #5e8e3e 100%)';
                            }
                          }}
                        />
                      )}

                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:10px_10px]" />

                      {/* Dark overlay for image readability */}
                      {isImagePath(project.image) && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      )}

                      {/* Title overlay */}
                      <div className="relative text-white font-display font-black text-base tracking-tight text-center drop-shadow-lg z-10">
                        {project.title}
                      </div>

                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3 bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded text-[9px] font-bold text-white uppercase tracking-wider z-10">
                          Featured
                        </div>
                      )}

                      {/* Category badge */}
                      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[9px] font-semibold text-white/80 uppercase tracking-wider z-10">
                        {project.displayCategory}
                      </div>
                    </div>

                    {/* Project Metadata */}
                    <div className="p-5 flex flex-col flex-grow text-left gap-3">

                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-bold font-display text-slate-800 dark:text-zinc-100">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-zinc-500 leading-relaxed line-clamp-2">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Tech Stack tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-400">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800/80 text-slate-400 dark:text-zinc-500">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-zinc-800/80 pt-3 mt-auto">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="text-left flex flex-col gap-0.5">
                            <span className="text-[8px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-display leading-tight">
                              {m.label}
                            </span>
                            <span className="text-[11px] font-black font-display text-accent">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800/80">
                        <button
                          onClick={() => setActiveCaseStudy(project)}
                          className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700/50 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          Case Study
                        </button>

                        {/* Live link */}
                        {project.demoUrl && project.demoUrl !== '#' && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent transition-all shrink-0"
                            title="Live Site"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {/* GitHub link */}
                        {project.githubUrl && project.githubUrl !== '#' && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent transition-all shrink-0"
                            title="GitHub Repository"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {/* Password indicator */}
                        {project.password && (
                          <div
                            className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-600 shrink-0"
                            title={`Password protected: ${project.password}`}
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                    </div>

                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CLIENT TESTIMONIALS CAROUSEL */}
        <div className="mt-12 border-t border-slate-200/50 dark:border-zinc-800/80 pt-16 flex flex-col gap-8 max-w-4xl mx-auto w-full">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent font-display">
              Client Endorsements
            </span>
            <h3 className="text-2xl font-black font-display text-slate-900 dark:text-white">
              What Clients Say
            </h3>
          </div>

          <div className="relative bg-slate-50 dark:bg-zinc-950/10 border border-slate-200/50 dark:border-zinc-800/60 p-6 sm:p-10 rounded-3xl overflow-hidden flex flex-col gap-6 text-left">
            <Quote className="absolute top-6 right-6 w-20 h-20 text-accent/5 pointer-events-none" />

            <AnimatePresence mode="wait">
              {TESTIMONIALS.map((test, idx) => {
                if (idx !== testimonialIndex) return null;
                return (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 text-amber-500">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 italic leading-relaxed">
                      "{test.feedback}"
                    </p>

                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full border border-white/20 shrink-0"
                        style={{ background: test.avatar }}
                      />
                      <div className="text-left flex flex-col gap-0.5 text-xs">
                        <span className="font-bold text-slate-800 dark:text-zinc-200">
                          {test.name}
                        </span>
                        <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                          {test.role}, {test.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Testimonial dots */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === testimonialIndex
                        ? 'bg-accent w-4'
                        : 'bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-600'
                    }`}
                  />
                ))}
              </div>

              {/* Slide Navigation */}
              <div className="flex gap-2 ml-auto z-10">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-darkcard text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent cursor-pointer transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-darkcard text-slate-500 dark:text-zinc-400 hover:text-accent dark:hover:text-accent cursor-pointer transition-colors shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* CASE STUDY OVERLAY DIALOG */}
      <AnimatePresence>
        {activeCaseStudy && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-left max-h-[85vh]"
            >

              {/* Header - Image or Gradient */}
              <div
                className="h-28 w-full p-6 relative flex items-end overflow-hidden"
                style={isImagePath(activeCaseStudy.image)
                  ? { background: '#0f172a' }
                  : { background: activeCaseStudy.image }
                }
              >
                {isImagePath(activeCaseStudy.image) && (
                  <img
                    src={activeCaseStudy.image}
                    alt={activeCaseStudy.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:10px_10px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="relative z-10 flex items-end justify-between w-full">
                  <h3 className="text-lg sm:text-xl font-black font-display text-white drop-shadow-md">
                    {activeCaseStudy.title}
                  </h3>
                  <span className="text-[9px] font-bold text-white/60 uppercase tracking-wider font-display bg-white/10 px-2 py-0.5 rounded">
                    {activeCaseStudy.displayCategory}
                  </span>
                </div>
              </div>

              {/* Case Study Details - Scrollable */}
              <div className="p-6 overflow-y-auto flex flex-col gap-5 text-left text-xs sm:text-sm leading-relaxed bg-white dark:bg-zinc-950">

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 border-b border-slate-200 dark:border-zinc-800 pb-5">
                  {activeCaseStudy.metrics.map((m) => (
                    <div key={m.label} className="text-left flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-display">
                        {m.label}
                      </span>
                      <span className="text-sm font-black font-display text-accent">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Problem */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent font-display">
                    The Challenge
                  </span>
                  <p className="text-slate-700 dark:text-zinc-200 leading-relaxed">
                    {activeCaseStudy.caseStudy.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="flex flex-col gap-2 border-t border-slate-200 dark:border-zinc-800 pt-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent font-display">
                    The Solution
                  </span>
                  <p className="text-slate-700 dark:text-zinc-200 leading-relaxed">
                    {activeCaseStudy.caseStudy.solution}
                  </p>
                </div>

                {/* Process */}
                <div className="flex flex-col gap-2 border-t border-slate-200 dark:border-zinc-800 pt-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent font-display">
                    Implementation
                  </span>
                  <ul className="flex flex-col gap-2 pl-1">
                    {activeCaseStudy.caseStudy.process.map((step, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-slate-700 dark:text-zinc-200">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Result */}
                <div className="flex flex-col gap-2 border-t border-slate-200 dark:border-zinc-800 pt-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent font-display">
                    Business Impact
                  </span>
                  <p className="font-semibold text-slate-800 dark:text-white leading-relaxed">
                    {activeCaseStudy.caseStudy.result}
                  </p>
                </div>

                {/* Password notice */}
                {activeCaseStudy.password && (
                  <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl px-4 py-3">
                    <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      Password protected — use <strong>{activeCaseStudy.password}</strong> to view live demo
                    </p>
                  </div>
                )}

              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-slate-50 dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-3">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => setActiveCaseStudy(null)}
                >
                  Close
                </Button>
                <div className="flex items-center gap-2">
                  {activeCaseStudy.githubUrl && activeCaseStudy.githubUrl !== '#' && (
                    <a href={activeCaseStudy.githubUrl} target="_blank" rel="noreferrer">
                      <Button variant="glass" size="sm" iconPosition="left">
                        <GithubIcon className="w-3.5 h-3.5 mr-1.5 inline" /> GitHub
                      </Button>
                    </a>
                  )}
                  {activeCaseStudy.demoUrl && activeCaseStudy.demoUrl !== '#' && (
                    <a href={activeCaseStudy.demoUrl} target="_blank" rel="noreferrer">
                      <Button variant="primary" size="sm" icon={ExternalLink} iconPosition="right">
                        Live Site
                      </Button>
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
