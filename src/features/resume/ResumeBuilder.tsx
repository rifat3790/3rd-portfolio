/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { 
  FileText, CheckCircle2, AlertTriangle, ArrowDown, Award, Trash2, 
  Plus, User, Briefcase, GraduationCap, Code, Sparkles, X 
} from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { AnimatePresence, motion } from 'framer-motion';
// Helper functions for client-side LinkedIn PDF Parsing
const loadPdfJS = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).pdfjsLib) {
      resolve((window as any).pdfjsLib);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      const pdfjsLib = (window as any)['pdfjs-dist/build/pdf'] || (window as any).pdfjsLib;
      if (pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        (window as any).pdfjsLib = pdfjsLib;
        resolve(pdfjsLib);
      } else {
        reject(new Error('PDFJS not found on window object'));
      }
    };
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
};

const extractTextFromPdf = async (file: File, onProgress: (step: string, percent: number) => void): Promise<string> => {
  onProgress('Loading PDF Engine...', 15);
  const pdfjsLib = await loadPdfJS();
  
  onProgress('Reading PDF File...', 35);
  const arrayBuffer = await file.arrayBuffer();
  
  onProgress('Decrypting document structure...', 55);
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  
  let fullText = '';
  const totalPages = pdf.numPages;
  
  for (let i = 1; i <= totalPages; i++) {
    onProgress(`Scanning page ${i} of ${totalPages}...`, 55 + Math.floor((i / totalPages) * 35));
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join('\n');
    fullText += pageText + '\n';
  }
  
  onProgress('Mapping data schemas...', 95);
  return fullText;
};

const parseResumeText = (text: string) => {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  const personalInfo = {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    website: '',
    github: '',
    linkedin: '',
    location: '',
    summary: ''
  };

  const experience: any[] = [];
  const education: any[] = [];
  let skills: string[] = [];

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+?\d{1,4}[-.\s]??\d{1,10}[-.\s]??\d{1,10}[-.\s]??\d{1,10})/;
  
  const emailMatch = text.match(emailRegex);
  if (emailMatch) personalInfo.email = emailMatch[0];

  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) personalInfo.phone = phoneMatch[0];

  const liUrlMatch = text.match(/(https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+)/);
  if (liUrlMatch) personalInfo.linkedin = liUrlMatch[0];

  if (lines.length > 0) {
    personalInfo.fullName = lines[0];
  }
  if (lines.length > 1) {
    if (!lines[1].includes('@') && !lines[1].includes('linkedin.com')) {
      personalInfo.jobTitle = lines[1];
    }
  }

  let currentSection = '';
  const sectionLines: Record<string, string[]> = {
    summary: [],
    experience: [],
    education: [],
    skills: []
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase().replace(/[^a-z]/g, '');

    if (lowerLine === 'summary' || lowerLine === 'about' || lowerLine === 'profile') {
      currentSection = 'summary';
      continue;
    } else if (lowerLine === 'experience' || lowerLine === 'workhistory' || lowerLine === 'employment') {
      currentSection = 'experience';
      continue;
    } else if (lowerLine === 'education' || lowerLine === 'studies' || lowerLine === 'academic') {
      currentSection = 'education';
      continue;
    } else if (lowerLine === 'skills' || lowerLine === 'topskills' || lowerLine === 'competencies') {
      currentSection = 'skills';
      continue;
    } else if (['languages', 'projects', 'certifications', 'honors', 'publications'].includes(lowerLine)) {
      currentSection = '';
      continue;
    }

    if (currentSection) {
      sectionLines[currentSection].push(line);
    }
  }

  if (sectionLines.summary.length > 0) {
    personalInfo.summary = sectionLines.summary.join(' ');
  } else {
    personalInfo.summary = 'Senior professional focused on responsive architectures and clean interfaces.';
  }

  if (sectionLines.skills.length > 0) {
    sectionLines.skills.forEach(line => {
      if (line.includes('•')) {
        skills.push(...line.split('•').map(s => s.trim()).filter(Boolean));
      } else if (line.includes(',')) {
        skills.push(...line.split(',').map(s => s.trim()).filter(Boolean));
      } else if (line.length < 30) {
        skills.push(line);
      }
    });
  }
  skills = Array.from(new Set(skills)).filter(s => s.length > 1);
  if (skills.length === 0) {
    skills = ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git'];
  }

  const expLines = sectionLines.experience;
  let j = 0;
  while (j < expLines.length) {
    const line = expLines[j];
    const isDuration = /((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\s*-\s*(?:Present|\w+\s+\d{4})|\d{4}\s*-\s*(?:Present|\d{4}))/i.test(line);

    if (isDuration && j >= 1) {
      const duration = line;
      let company = 'Company Name';
      let role: string;
      
      if (j >= 2) {
        company = expLines[j - 2];
        role = expLines[j - 1];
      } else {
        role = expLines[j - 1];
      }

      let location = '';
      let nextIdx = j + 1;
      if (nextIdx < expLines.length && !expLines[nextIdx].startsWith('•') && !expLines[nextIdx].startsWith('-') && !/((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\s*-\s*(?:Present|\w+\s+\d{4})|\d{4}\s*-\s*(?:Present|\d{4}))/i.test(expLines[nextIdx])) {
        location = expLines[nextIdx];
        nextIdx++;
      }

      const bullets: string[] = [];
      while (nextIdx < expLines.length) {
        const nextLine = expLines[nextIdx];
        if (nextLine.startsWith('•') || nextLine.startsWith('-') || nextLine.startsWith('*')) {
          bullets.push(nextLine.replace(/^[•\-*\s]+/, ''));
          nextIdx++;
        } else if (nextIdx + 1 < expLines.length && (expLines[nextIdx + 1].startsWith('•') || expLines[nextIdx + 1].startsWith('-') || expLines[nextIdx + 1].startsWith('*'))) {
          bullets.push(nextLine);
          nextIdx++;
        } else {
          break;
        }
      }

      experience.push({
        id: `exp-parsed-${experience.length}`,
        company,
        role,
        location: location || 'Remote',
        duration,
        bullets: bullets.length > 0 ? bullets : ['Key responsibility and achievements.']
      });

      j = nextIdx;
    } else {
      j++;
    }
  }

  const eduLines = sectionLines.education;
  let k = 0;
  while (k < eduLines.length) {
    const line = eduLines[k];
    const isDuration = /\b(19\d\d|20\d\d)\s*-\s*(19\d\d|20\d\d|Present)\b/.test(line);

    if (isDuration && k >= 1) {
      const duration = line;
      const school = eduLines[k - 1];
      let degree = 'Bachelor\'s Degree';

      if (k >= 2 && !/\b(19\d\d|20\d\d)\s*-\s*(19\d\d|20\d\d|Present)\b/.test(eduLines[k - 2])) {
        degree = eduLines[k - 2];
      } else if (k + 1 < eduLines.length && !/\b(19\d\d|20\d\d)\s*-\s*(19\d\d|20\d\d|Present)\b/.test(eduLines[k + 1])) {
        degree = eduLines[k + 1];
      }

      education.push({
        id: `edu-parsed-${education.length}`,
        school,
        degree,
        duration
      });
      k += 2;
    } else {
      k++;
    }
  }

  if (experience.length === 0) {
    experience.push({
      id: 'exp-parsed-0',
      company: 'AppVenture Solutions',
      role: 'Lead Frontend Developer',
      location: 'Remote',
      duration: '2024 - Present',
      bullets: ['Developed high-performance React architectures.', 'Optimized web vitals resulting in faster page loads.']
    });
  }
  if (education.length === 0) {
    education.push({
      id: 'edu-parsed-0',
      school: 'University of Engineering and Technology',
      degree: 'B.Sc. in Computer Science',
      duration: '2018 - 2022'
    });
  }

  return {
    personalInfo,
    experience,
    education,
    skills,
    projects: [
      {
        id: 'proj-parsed-0',
        name: 'Personal Portfolio Project',
        description: 'Premium responsive SaaS web application highlighting experiences.',
        techStack: ['React', 'TypeScript', 'Tailwind CSS']
      }
    ]
  };
};

export const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'ats'>('personal');
  const [isExporting, setIsExporting] = useState(false);
  
  // LinkedIn simulated import states
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState('https://www.linkedin.com/in/refayet-hossen');
  const [importStep, setImportStep] = useState<'idle' | 'login' | 'oauth' | 'fetching' | 'mapping' | 'success'>('idle');
  const [importProgress, setImportProgress] = useState(0);
  const [linkedinEmail, setLinkedinEmail] = useState('refayet.hossen@example.com');
  const [linkedinPassword, setLinkedinPassword] = useState('••••••••••••');

  // Parsing status states
  const [parsingStep, setParsingStep] = useState('');
  const [parsedSummary, setParsedSummary] = useState<{ jobs: number; edus: number; skills: number } | null>(null);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      usePortfolioStore.getState().addNotification('Please select a valid PDF file.', 'error', 'Invalid File');
      return;
    }

    setImportStep('oauth');
    setImportProgress(10);
    setParsingStep('Initializing parser environment...');
    
    try {
      const text = await extractTextFromPdf(file, (step, percent) => {
        setImportProgress(percent);
        setParsingStep(step);
      });
      
      setImportStep('mapping');
      setImportProgress(85);
      setParsingStep('Parsing profile nodes and sections...');
      
      const parsedData = parseResumeText(text);
      
      setTimeout(() => {
        useResumeStore.setState({ resumeData: parsedData });
        useResumeStore.getState().runAtsCheck();
        
        setParsedSummary({
          jobs: parsedData.experience.length,
          edus: parsedData.education.length,
          skills: parsedData.skills.length
        });
        
        setImportStep('success');
        setImportProgress(100);
        setParsingStep('Import completed successfully!');
        
        usePortfolioStore.getState().addNotification('LinkedIn PDF profile parsed successfully!', 'success', 'Import Completed');
      }, 1500);
      
    } catch (err: any) {
      console.error(err);
      usePortfolioStore.getState().addNotification('Failed to read PDF. Make sure it is not password-protected.', 'error', 'Import Failed');
      setImportStep('idle');
    }
  };
  
  const { 
    resumeData, 
    activeTemplate, 
    atsScore, 
    atsFeedback, 
    isAnalyzing,
    updatePersonalInfo, 
    setTemplate, 
    addExperience, 
    updateExperience, 
    removeExperience,
    addEducation, 
    updateEducation, 
    removeEducation,
    addSkill, 
    removeSkill,
    addProject, 
    updateProject, 
    removeProject,
    runAtsCheck, 
    simulateLinkedinImport
  } = useResumeStore();

  const { incrementAnalytics, unlockAchievement } = usePortfolioStore();

  useEffect(() => {
    runAtsCheck();
  }, [resumeData, runAtsCheck]);

  const handlePrint = () => {
    setIsExporting(true);
    incrementAnalytics('resumesGenerated');
    unlockAchievement('cv_builder');
    
    // Simulate compilation delay then trigger print
    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 1500);
  };

  const handleAddExp = () => {
    addExperience({
      company: 'New Company',
      role: 'Software Engineer',
      location: 'City, Country',
      duration: '2026 - Present',
      bullets: ['Describe your core achievements (use metrics where possible).']
    });
  };

  const handleAddEdu = () => {
    addEducation({
      school: 'New University',
      degree: 'Degree / Major',
      duration: '2022 - 2026'
    });
  };

  const handleAddProj = () => {
    addProject({
      name: 'New Project',
      description: 'Describe the problem statement and technical tools used.',
      techStack: ['React', 'TypeScript']
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-darkbg/40 text-slate-800 dark:text-zinc-200">
      
      {/* Background spot overlays */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none no-print" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-zinc-800 pb-6 no-print text-left">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-accent/10 text-accent">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black font-display text-slate-900 dark:text-white">
                ATS Resume & CV Builder
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
                Customize, test against ATS keyword scanning algorithms, and print high-fidelity PDF documents.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 flex-wrap">
            <Button variant="glass" size="sm" icon={Sparkles} onClick={() => { setIsLinkedInModalOpen(true); setImportStep('idle'); setImportProgress(0); }} disabled={isAnalyzing}>
              {isAnalyzing ? 'Parsing...' : 'Import LinkedIn Profile'}
            </Button>
            <Button variant="primary" size="sm" icon={ArrowDown} onClick={handlePrint} disabled={isExporting}>
              {isExporting ? 'Compiling PDF...' : 'Print / Save PDF'}
            </Button>
          </div>
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Editor Controls */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 no-print text-left">
            
            {/* Template Selector pills */}
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display">
                  Select Layout Template
                </span>
                <span className="text-[9px] font-bold text-accent/90 font-display animate-pulse lg:hidden shrink-0">
                  Swipe preview horizontally to view ↔
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['modern', 'corporate', 'minimal'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize cursor-pointer transition-all ${
                      activeTemplate === t
                        ? 'btn-active-premium'
                        : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-darkcard hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-350'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB SELECTION ROW */}
            <div className="flex border-b border-slate-200 dark:border-zinc-800 overflow-x-auto gap-2 py-1">
              {[
                { id: 'personal', label: 'Info', icon: User },
                { id: 'experience', label: 'Jobs', icon: Briefcase },
                { id: 'education', label: 'Grads', icon: GraduationCap },
                { id: 'skills', label: 'Techs', icon: Code },
                { id: 'ats', label: `ATS (${atsScore})`, icon: Award }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'personal' | 'experience' | 'education' | 'skills' | 'ats')}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all border cursor-pointer shrink-0 ${
                      isActive
                        ? 'tab-active-premium'
                        : 'border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800/80'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT EDITORS */}
            <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm min-h-[350px] flex flex-col gap-4">
              
              {/* 1. PERSONAL INFO TAB */}
              {activeTab === 'personal' && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold font-display text-sm text-slate-900 dark:text-white">Contact & Profile Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Full Name</label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                        className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-accent text-slate-800 dark:text-zinc-200"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Job Title</label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.jobTitle}
                        onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
                        className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-accent text-slate-800 dark:text-zinc-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Email</label>
                      <input
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                        className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-accent text-slate-800 dark:text-zinc-200"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Phone</label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                        className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-accent text-slate-800 dark:text-zinc-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Location</label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                        className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-accent text-slate-800 dark:text-zinc-200"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Website / Link</label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.website}
                        onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                        className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-accent text-slate-800 dark:text-zinc-200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Summary (ATS Analyzed)</label>
                    <textarea
                      rows={4}
                      value={resumeData.personalInfo.summary}
                      onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                      className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-accent text-slate-850 dark:text-zinc-200 resize-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* 2. EXPERIENCE TAB */}
              {activeTab === 'experience' && (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold font-display text-sm text-slate-900 dark:text-white">Work History</h3>
                    <button onClick={handleAddExp} className="text-xs font-bold text-accent flex items-center gap-1 cursor-pointer">
                      <Plus className="w-3.5 h-3.5" /> Add Job
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="p-3 border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/20 rounded-xl flex flex-col gap-2">
                        <div className="flex justify-between items-center gap-3">
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                            className="font-bold text-xs bg-transparent border-b border-transparent focus:border-accent focus:outline-none text-slate-800 dark:text-zinc-200"
                          />
                          <button onClick={() => removeExperience(exp.id)} className="text-rose-500 hover:bg-rose-500/10 p-1 rounded">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                            placeholder="Role"
                            className="text-[11px] bg-transparent border-b border-transparent focus:border-accent focus:outline-none text-slate-600 dark:text-zinc-400"
                          />
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => updateExperience(exp.id, { duration: e.target.value })}
                            placeholder="Duration"
                            className="text-[11px] bg-transparent border-b border-transparent focus:border-accent focus:outline-none text-slate-500 dark:text-zinc-500 text-right"
                          />
                        </div>
                        
                        {/* Bullets editor */}
                        <div className="flex flex-col gap-1.5 mt-1">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-zinc-500">Key achievements (One per line)</span>
                          <textarea
                            rows={3}
                            value={exp.bullets.join('\n')}
                            onChange={(e) => updateExperience(exp.id, { bullets: e.target.value.split('\n') })}
                            className="p-2 text-[10px] rounded-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 resize-none leading-normal"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. EDUCATION TAB */}
              {activeTab === 'education' && (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold font-display text-sm text-slate-900 dark:text-white">Education History</h3>
                    <button onClick={handleAddEdu} className="text-xs font-bold text-accent flex items-center gap-1 cursor-pointer">
                      <Plus className="w-3.5 h-3.5" /> Add School
                    </button>
                  </div>

                  <div className="flex flex-col gap-3.5 max-h-[300px] overflow-y-auto pr-1">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="p-3 border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/20 rounded-xl flex flex-col gap-2">
                        <div className="flex justify-between items-center gap-3">
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                            className="font-bold text-xs bg-transparent border-b border-transparent focus:border-accent focus:outline-none text-slate-800 dark:text-zinc-200"
                          />
                          <button onClick={() => removeEducation(edu.id)} className="text-rose-500 hover:bg-rose-500/10 p-1 rounded">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                            placeholder="Degree"
                            className="text-[11px] bg-transparent border-b border-transparent focus:border-accent focus:outline-none text-slate-600 dark:text-zinc-400"
                          />
                          <input
                            type="text"
                            value={edu.duration}
                            onChange={(e) => updateEducation(edu.id, { duration: e.target.value })}
                            placeholder="Duration"
                            className="text-[11px] bg-transparent border-b border-transparent focus:border-accent focus:outline-none text-slate-500 dark:text-zinc-500 text-right"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. SKILLS & PROJECTS TAB */}
              {activeTab === 'skills' && (
                <div className="flex flex-col gap-4 text-left">
                  {/* Skills Editor */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold font-display text-sm text-slate-900 dark:text-white">Technical Skills</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add skill (e.g. Next.js)..."
                        id="new-skill-input"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.currentTarget;
                            addSkill(input.value);
                            input.value = '';
                          }
                        }}
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-accent text-slate-800 dark:text-zinc-200"
                      />
                      <Button variant="secondary" size="sm" onClick={() => {
                        const el = document.getElementById('new-skill-input') as HTMLInputElement;
                        if (el && el.value.trim()) {
                          addSkill(el.value);
                          el.value = '';
                        }
                      }}>Add</Button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-1 max-h-[110px] overflow-y-auto p-1 border border-slate-100 dark:border-zinc-900 rounded-xl bg-slate-50/20 dark:bg-zinc-950/10">
                      {resumeData.skills.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold">
                          <span>{s}</span>
                          <button onClick={() => removeSkill(s)} className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-100">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects Editor */}
                  <div className="flex flex-col gap-2 border-t border-slate-100 dark:border-zinc-850 pt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold font-display text-sm text-slate-900 dark:text-white">Featured Projects</h3>
                      <button onClick={handleAddProj} className="text-xs font-bold text-accent flex items-center gap-1 cursor-pointer">
                        <Plus className="w-3.5 h-3.5" /> Add Project
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 max-h-[150px] overflow-y-auto pr-1">
                      {resumeData.projects.map((proj) => (
                        <div key={proj.id} className="p-2.5 border border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/20 rounded-xl flex flex-col gap-1.5">
                          <div className="flex justify-between items-center">
                            <input
                              type="text"
                              value={proj.name}
                              onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                              className="font-bold text-xs bg-transparent border-b border-transparent focus:border-accent focus:outline-none text-slate-800 dark:text-zinc-200"
                            />
                            <button onClick={() => removeProject(proj.id)} className="text-rose-500 hover:bg-rose-500/10 p-0.5 rounded">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={proj.description}
                            onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                            placeholder="Description"
                            className="text-[10px] bg-transparent border-b border-transparent focus:border-accent focus:outline-none text-slate-600 dark:text-zinc-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. ATS SCORER AUDIT TAB */}
              {activeTab === 'ats' && (
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-4.5 bg-slate-50 dark:bg-zinc-950/30 p-4 rounded-2xl border border-slate-100 dark:border-zinc-850">
                    
                    {/* Dial graph */}
                    <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="rgba(156, 163, 175, 0.1)" strokeWidth="4" fill="transparent" />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke={atsScore >= 80 ? '#10b981' : atsScore >= 65 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 28}
                          strokeDashoffset={2 * Math.PI * 28 - (atsScore / 100) * 2 * Math.PI * 28}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-black font-display text-sm text-slate-800 dark:text-zinc-200">
                        {atsScore}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs font-display text-slate-800 dark:text-zinc-250">ATS Readability Grade</h4>
                      <p className="text-[10px] text-slate-500 dark:text-zinc-500 mt-1 max-w-[200px]">
                        Calculated by checking profile summary density, metrics usage, and technical keyword listings.
                      </p>
                    </div>

                  </div>

                  <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display">Optimization Checklist</span>
                    {atsFeedback.map((fb, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs p-2.5 rounded-xl border border-slate-100 dark:border-zinc-850/50 bg-slate-50/20">
                        {fb.startsWith('✔') ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <span className="text-[11px] leading-relaxed text-slate-600 dark:text-zinc-400">
                          {fb.replace(/^✔|^⚠|^✔\s*|^⚠\s*/, '')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Warning Info */}
            <div className="flex gap-2.5 p-3.5 border border-amber-500/20 bg-amber-500/5 rounded-2xl text-[10.5px] text-slate-600 dark:text-amber-300 leading-normal">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <span>
                To print your CV perfectly aligned to <strong>1 standard letter page</strong>, make sure the print configuration layout has <strong>margins set to None</strong> and <strong>headers/footers unchecked</strong>.
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: Live Paper Preview sheet */}
          <div className="col-span-1 lg:col-span-7 w-full min-w-0 overflow-x-auto pb-4 scrollbar-thin">
            <div className="min-w-[800px] max-w-[800px] mx-auto">
              <Card className="!p-0 w-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-darkcard overflow-hidden shadow-2xl relative">
              
              {/* Paper overlay controls for web (hides on print) */}
              <div className="flex justify-between items-center bg-slate-100 dark:bg-zinc-900 border-b border-slate-250 dark:border-zinc-800 px-4 py-2.5 no-print">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-display">
                  Live preview: 1 Page alignment
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">
                  {resumeData.personalInfo.fullName.split(' ')[0]}'s Resume
                </span>
              </div>

              {/* SHEET BODY */}
              <div 
                id="resume-printable-area"
                className={`resume-paper p-8 text-left bg-white text-slate-900 min-h-[840px] font-sans ${
                  activeTemplate === 'corporate' 
                    ? 'font-serif border-t-8 border-slate-800' 
                    : activeTemplate === 'minimal'
                    ? 'font-sans' 
                    : 'font-sans border-t-8 border-purple-600'
                }`}
                style={{ color: '#111827' }}
              >
                
                {/* 1. MODERN TEMPLATE */}
                {activeTemplate === 'modern' && (
                  <div className="flex flex-col gap-6">
                    {/* Header Row */}
                    <div className="flex justify-between items-start gap-4 border-b pb-4">
                      <div>
                        <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {resumeData.personalInfo.fullName}
                        </h1>
                        <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mt-0.5">
                          {resumeData.personalInfo.jobTitle}
                        </p>
                      </div>
                      
                      {/* Contacts detail */}
                      <div className="text-right text-[10px] text-slate-600 flex flex-col gap-0.5">
                        <span>{resumeData.personalInfo.email}</span>
                        <span>{resumeData.personalInfo.phone}</span>
                        <span>{resumeData.personalInfo.location}</span>
                        <span>{resumeData.personalInfo.website}</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="flex flex-col gap-1">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 font-display">
                        Profile Summary
                      </h4>
                      <p className="text-[11px] text-slate-700 leading-relaxed">
                        {resumeData.personalInfo.summary}
                      </p>
                    </div>

                    {/* Split details body */}
                    <div className="grid grid-cols-12 gap-6 items-start">
                      
                      {/* Left body - Jobs, projects */}
                      <div className="col-span-8 flex flex-col gap-5">
                        
                        {/* Jobs */}
                        <div className="flex flex-col gap-3">
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 border-b pb-1">
                            Professional Experience
                          </h4>
                          {resumeData.experience.map((exp) => (
                            <div key={exp.id} className="flex flex-col gap-1 text-[11px]">
                              <div className="flex justify-between items-baseline">
                                <span className="font-bold text-slate-900">{exp.company}</span>
                                <span className="text-[10px] text-slate-500 font-medium">{exp.duration}</span>
                              </div>
                              <div className="flex justify-between items-baseline text-[10px] text-slate-600 italic">
                                <span>{exp.role}</span>
                                <span>{exp.location}</span>
                              </div>
                              <ul className="list-disc pl-3.5 mt-1 flex flex-col gap-1 text-slate-700 text-[10.5px]">
                                {exp.bullets.map((b, idx) => (
                                  <li key={idx} className="leading-relaxed">{b}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Projects */}
                        {resumeData.projects.length > 0 && (
                          <div className="flex flex-col gap-3">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 border-b pb-1">
                              Projects Highlighted
                            </h4>
                            {resumeData.projects.map((proj) => (
                              <div key={proj.id} className="text-[11px] flex flex-col gap-0.5">
                                <span className="font-bold text-slate-900">{proj.name}</span>
                                <p className="text-[10px] text-slate-700 leading-relaxed">{proj.description}</p>
                                <span className="text-[9px] text-purple-600 font-mono mt-0.5">Stack: {proj.techStack.join(', ')}</span>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>

                      {/* Right body - Education, skills */}
                      <div className="col-span-4 flex flex-col gap-5 border-l pl-5">
                        
                        {/* Technical skills */}
                        <div className="flex flex-col gap-2.5">
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 border-b pb-1">
                            Expertise
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {resumeData.skills.map((s) => (
                              <span key={s} className="text-[9px] font-semibold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Education */}
                        <div className="flex flex-col gap-2.5">
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 border-b pb-1">
                            Education
                          </h4>
                          {resumeData.education.map((edu) => (
                            <div key={edu.id} className="text-[10px] flex flex-col gap-0.5">
                              <span className="font-bold text-slate-800">{edu.school}</span>
                              <span className="text-slate-600">{edu.degree}</span>
                              <span className="text-slate-500 mt-0.5">{edu.duration}</span>
                              {edu.grade && <span className="text-purple-600 font-medium font-mono mt-0.5">{edu.grade}</span>}
                            </div>
                          ))}
                        </div>

                      </div>

                    </div>
                  </div>
                )}

                {/* 2. CORPORATE TEMPLATE */}
                {activeTemplate === 'corporate' && (
                  <div className="flex flex-col gap-5 text-center">
                    {/* Header */}
                    <div className="flex flex-col gap-1 pb-4 border-b">
                      <h1 className="text-2xl font-black uppercase tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                        {resumeData.personalInfo.fullName}
                      </h1>
                      <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                        {resumeData.personalInfo.jobTitle}
                      </p>
                      <div className="flex justify-center gap-3 text-[10px] text-slate-500 font-mono flex-wrap mt-1">
                        <span>{resumeData.personalInfo.email}</span>
                        <span>•</span>
                        <span>{resumeData.personalInfo.phone}</span>
                        <span>•</span>
                        <span>{resumeData.personalInfo.location}</span>
                        <span>•</span>
                        <span>{resumeData.personalInfo.website}</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="text-left flex flex-col gap-1.5">
                      <h4 className="text-[10.5px] font-bold uppercase tracking-widest border-b pb-0.5 text-slate-900 font-serif">
                        Executive Profile
                      </h4>
                      <p className="text-[10.5px] text-slate-800 leading-relaxed font-serif">
                        {resumeData.personalInfo.summary}
                      </p>
                    </div>

                    {/* Experience */}
                    <div className="text-left flex flex-col gap-3">
                      <h4 className="text-[10.5px] font-bold uppercase tracking-widest border-b pb-0.5 text-slate-900 font-serif">
                        Employment Chronicles
                      </h4>
                      {resumeData.experience.map((exp) => (
                        <div key={exp.id} className="flex flex-col gap-1 text-[10.5px]">
                          <div className="flex justify-between items-baseline font-serif">
                            <span className="font-bold text-slate-900">{exp.company}</span>
                            <span className="text-[10px] text-slate-600">{exp.duration}</span>
                          </div>
                          <div className="flex justify-between items-baseline text-[9.5px] text-slate-500 italic">
                            <span>{exp.role}</span>
                            <span>{exp.location}</span>
                          </div>
                          <ul className="list-disc pl-4 mt-1 flex flex-col gap-0.5 text-slate-800 text-[10.5px]">
                            {exp.bullets.map((b, idx) => (
                              <li key={idx} className="leading-relaxed">{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Core Skills */}
                    <div className="text-left flex flex-col gap-2">
                      <h4 className="text-[10.5px] font-bold uppercase tracking-widest border-b pb-0.5 text-slate-900 font-serif">
                        Competencies & Technologies
                      </h4>
                      <p className="text-[10.5px] text-slate-800 leading-relaxed">
                        {resumeData.skills.join(' • ')}
                      </p>
                    </div>

                    {/* Education */}
                    <div className="text-left flex flex-col gap-2.5">
                      <h4 className="text-[10.5px] font-bold uppercase tracking-widest border-b pb-0.5 text-slate-900 font-serif">
                        Education
                      </h4>
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} className="text-[10px] flex flex-col gap-0.5">
                          <div className="flex justify-between font-serif">
                            <span className="font-bold text-slate-900">{edu.school}</span>
                            <span className="text-slate-500">{edu.duration}</span>
                          </div>
                          <div className="text-[9.5px] text-slate-600">{edu.degree} {edu.grade ? `(${edu.grade})` : ''}</div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* 3. MINIMAL TEMPLATE */}
                {activeTemplate === 'minimal' && (
                  <div className="flex flex-col gap-5">
                    {/* Header */}
                    <div className="flex flex-col gap-1 pb-2 border-b">
                      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        {resumeData.personalInfo.fullName}
                      </h1>
                      <div className="flex justify-between items-baseline mt-0.5">
                        <span className="text-xs text-slate-500 italic">{resumeData.personalInfo.jobTitle}</span>
                        <div className="text-right text-[9px] text-slate-600 flex gap-2">
                          <span>{resumeData.personalInfo.email}</span>
                          <span>|</span>
                          <span>{resumeData.personalInfo.phone}</span>
                          <span>|</span>
                          <span>{resumeData.personalInfo.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Profile */}
                    <p className="text-[10px] text-slate-700 leading-relaxed">
                      {resumeData.personalInfo.summary}
                    </p>

                    {/* Experience */}
                    <div className="flex flex-col gap-3">
                      <span className="text-[9.5px] font-bold uppercase tracking-widest text-slate-500">Experience</span>
                      {resumeData.experience.map((exp) => (
                        <div key={exp.id} className="text-[10px] flex flex-col gap-1">
                          <div className="flex justify-between items-baseline font-semibold">
                            <span className="text-slate-900">{exp.company} — {exp.role}</span>
                            <span className="text-[9px] text-slate-400 font-normal">{exp.duration}</span>
                          </div>
                          <ul className="list-disc pl-3 flex flex-col gap-0.5 text-slate-700">
                            {exp.bullets.map((b, idx) => (
                              <li key={idx} className="leading-relaxed">{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[9.5px] font-bold uppercase tracking-widest text-slate-500">Skills</span>
                      <p className="text-[10px] text-slate-700 leading-relaxed">
                        {resumeData.skills.join(', ')}
                      </p>
                    </div>

                    {/* Education */}
                    <div className="flex flex-col gap-2.5">
                      <span className="text-[9.5px] font-bold uppercase tracking-widest text-slate-500">Education</span>
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} className="text-[10px] flex justify-between">
                          <div>
                            <span className="font-semibold text-slate-900">{edu.school}</span>
                            <span className="text-slate-500"> — {edu.degree}</span>
                          </div>
                          <span className="text-[9px] text-slate-400">{edu.duration}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

              </div>

              </Card>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isLinkedInModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white dark:bg-zinc-955 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 text-slate-800 dark:text-zinc-200 text-left relative"
            >
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0a66c2] animate-pulse" />
                  <h3 className="font-bold text-lg font-display text-slate-900 dark:text-white">Import from LinkedIn</h3>
                
                  <button
                    onClick={() => setIsLinkedInModalOpen(false)}
                    disabled={importStep !== 'idle' && importStep !== 'login' && importStep !== 'success'}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 disabled:opacity-50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {importStep === 'idle' && (
                <div className="flex flex-col gap-5 font-sans">
                  
                  {/* OPTION 1: Real PDF Import */}
                  <div className="flex flex-col gap-3 p-4 rounded-2xl bg-accent/5 border border-accent/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
                        1
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Import Actual LinkedIn Profile (Recommended)</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
                      Download your structured CV PDF from LinkedIn in 1 click (go to your profile ➔ click <strong>More</strong> ➔ <strong>Save to PDF</strong>) and upload it below. We will parse all jobs, education, and skills.
                    </p>
                    
                    <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-dashed border-accent/30 hover:border-accent bg-white dark:bg-zinc-900 text-accent text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow">
                      <FileText className="w-4 h-4" />
                      <span>Upload LinkedIn Profile PDF</span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-[1px] bg-slate-200 dark:bg-zinc-800 flex-1" />
                    <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-550 uppercase tracking-widest">or</span>
                    <div className="h-[1px] bg-slate-200 dark:bg-zinc-800 flex-1" />
                  </div>

                  {/* OPTION 2: Simulated Auth Link */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center text-[#0a66c2] text-xs font-bold font-sans">
                        2
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Connect via LinkedIn Sign-In (Simulation)</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
                      Enter your LinkedIn profile URL below and authenticate via a simulated OAuth pop-up login interface.
                    </p>
                    
                    <div className="flex flex-col gap-1.5 mt-0.5">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-550 font-display">
                        LinkedIn Profile URL
                      </label>
                      <input
                        required
                        type="url"
                        placeholder="https://www.linkedin.com/in/refayet-hossen"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-accent w-full font-sans"
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (!linkedinUrl.includes('linkedin.com/')) {
                          usePortfolioStore.getState().addNotification('Please enter a valid LinkedIn URL.', 'error', 'Invalid Link');
                          return;
                        }
                        setImportStep('login');
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-bold transition-all duration-300 shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Connect via LinkedIn API Mock</span>
                    </button>
                  </div>

                </div>
              )}

              {importStep === 'login' && (
                <div className="flex flex-col gap-4 font-sans">
                  <div className="flex flex-col items-center justify-center py-2">
                    <div className="w-10 h-10 rounded bg-[#0a66c2] flex items-center justify-center text-white font-black text-xl select-none shadow-md shadow-blue-500/10">
                      in
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-2 font-medium">
                      Sign in to authenticate secure data exchange
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-display">
                        Email or Phone
                      </label>
                      <input
                        required
                        type="email"
                        value={linkedinEmail}
                        onChange={(e) => setLinkedinEmail(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-accent w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-550 font-display">
                        Password
                      </label>
                      <input
                        required
                        type="password"
                        value={linkedinPassword}
                        onChange={(e) => setLinkedinPassword(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-accent w-full"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!linkedinEmail || !linkedinPassword) {
                        usePortfolioStore.getState().addNotification('Please enter credentials.', 'error', 'Error');
                        return;
                      }
                      setImportStep('oauth');
                      setImportProgress(10);
                      
                      setTimeout(() => {
                        setImportStep('fetching');
                        setImportProgress(45);
                        
                        setTimeout(() => {
                          setImportStep('mapping');
                          setImportProgress(80);
                          
                          setTimeout(() => {
                            setImportStep('success');
                            setImportProgress(100);
                            simulateLinkedinImport();
                          }, 1200);
                        }, 1200);
                      }, 1000);
                    }}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-bold transition-all duration-300 shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Sign In & Authorize</span>
                  </button>

                  <button
                    onClick={() => setImportStep('idle')}
                    className="w-full py-2 px-4 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-505 hover:text-slate-800 dark:hover:text-zinc-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all cursor-pointer text-center"
                  >
                    Back
                  </button>
                </div>
              )}

              {importStep !== 'idle' && importStep !== 'login' && (
                <div className="py-6 flex flex-col items-center justify-center gap-4 text-center font-sans">
                  {importStep === 'success' ? (
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/15 animate-bounce">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                  ) : (
                    <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="rgba(10, 102, 194, 0.1)" strokeWidth="3" fill="transparent" />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="#0a66c2"
                          strokeWidth="3"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 20}
                          strokeDashoffset={2 * Math.PI * 20 - (importProgress / 100) * 2 * Math.PI * 20}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#0a66c2]">
                        {importProgress}%
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold text-slate-900 dark:text-white font-display text-sm">
                      {importStep === 'oauth' && (parsingStep || 'Redirecting to LinkedIn Authentication...')}
                      {importStep === 'fetching' && (parsingStep || 'Extracting Profile Information...')}
                      {importStep === 'mapping' && (parsingStep || 'Structuring CV Sections...')}
                      {importStep === 'success' && (parsedSummary ? 'LinkedIn Profile Data Parsed!' : 'LinkedIn Import Completed!')}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-500 max-w-xs leading-normal">
                      {importStep === 'oauth' && !parsingStep && 'Setting up secure handshakes and token authorization.'}
                      {importStep === 'fetching' && !parsingStep && 'Retrieving work milestones, education history, and skills list.'}
                      {importStep === 'mapping' && !parsingStep && 'Parsing fields into your live A4 printable layout.'}
                      {importStep === 'success' && (
                        parsedSummary 
                          ? `Extracted ${parsedSummary.jobs} work milestones, ${parsedSummary.edus} academic records, and ${parsedSummary.skills} skills successfully.`
                          : 'Your resume builder inputs have been successfully pre-populated.'
                      )}
                      {parsingStep && importStep !== 'success' && 'Processing document stream in the client browser environment.'}
                    </p>
                  </div>

                  {importStep === 'success' && (
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => {
                        setIsLinkedInModalOpen(false);
                        setParsedSummary(null);
                        setParsingStep('');
                      }}
                    >
                      Done
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeBuilder;
