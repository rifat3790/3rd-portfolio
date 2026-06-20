import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { usePortfolioStore } from './usePortfolioStore';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    website: string;
    github: string;
    linkedin: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    role: string;
    location: string;
    duration: string;
    bullets: string[];
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    duration: string;
    grade?: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    name: string;
    description: string;
    techStack: string[];
  }>;
}

interface ResumeState {
  resumeData: ResumeData;
  activeTemplate: 'modern' | 'corporate' | 'minimal';
  atsScore: number;
  atsFeedback: string[];
  isAnalyzing: boolean;
  
  // Actions
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  setTemplate: (template: 'modern' | 'corporate' | 'minimal') => void;
  addExperience: (exp: Omit<ResumeData['experience'][0], 'id'>) => void;
  updateExperience: (id: string, exp: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Omit<ResumeData['education'][0], 'id'>) => void;
  updateEducation: (id: string, edu: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addProject: (proj: Omit<ResumeData['projects'][0], 'id'>) => void;
  updateProject: (id: string, proj: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  runAtsCheck: () => void;
  simulateLinkedinImport: () => void;
  resetResume: () => void;
}

const DEFAULT_RESUME: ResumeData = {
  personalInfo: {
    fullName: 'MD. REFAYET HOSSEN',
    jobTitle: 'Web Developer',
    email: 'mdrifayethossen@gmail.com',
    phone: '01568777237, 01952321390',
    website: 'https://mdrifayet.com',
    github: 'https://github.com/refayet-dev',
    linkedin: 'https://linkedin.com/in/refayet-dev',
    location: 'Dhaka, Bangladesh',
    summary: 'Passionate and detail-focused Full Stack Developer with experience in developing responsive and interactive web applications using HTML, CSS, JavaScript, React, Next.js and Node.js. Skilled in designing modern UI with Tailwind CSS and DaisyUI, managing databases using MySQL, and implementing secure authentication systems with bcrypt. Quick to learn new technologies and committed to continuous skill development.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Sardar IT',
      role: 'Web Developer',
      location: 'Dhaka, Mirpur-2',
      duration: '06/2025 - 10/2025',
      bullets: []
    },
    {
      id: 'exp-2',
      company: 'Softvence Agency',
      role: 'Web Developer and Team Leader',
      location: 'Mohakhali',
      duration: '11/2025 - Present',
      bullets: []
    }
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Green University of Bangladesh',
      degree: 'B.Sc., Computer Science and Engineering',
      duration: '2022 - 2026',
      grade: 'CGPA: 3.75'
    }
  ],
  skills: [
    'HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'DaisyUI',
    'Node.js', 'WordPress', 'Shopify', 'Wix', 'C', 'Java', 'Python', 'PHP', 
    'Mysql', 'MongoDB', 'Git', 'PostMan', 'Firebase'
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Integrated Healthcare Support System (IHSS)',
      description: 'Features: Secure login and registration system, Doctor-wise appointment booking, Digital prescription and test report upload, Face verification with discount feature, Admin dashboard for full system management.',
      techStack: ['NextJs', 'Expressjs', 'Mysql']
    },
    {
      id: 'proj-2',
      name: 'Kitfix',
      description: 'Features: Shopify store build, Liquid coding, Theme customization, Metafields usage, Each category has different filters and color changes. Each product\'s data is obtained from metafields.',
      techStack: ['Shopify']
    }
  ]
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumeData: DEFAULT_RESUME,
      activeTemplate: 'modern',
      atsScore: 78,
      atsFeedback: [
        'Overall structure is solid. Good contact details present.',
        'Tip: Include more metrics (e.g. percentages, Dollar amounts) in your job bullets.',
        'Missing keywords: Add database technologies like "MongoDB" or "Supabase" if applicable.',
      ],
      isAnalyzing: false,

      updatePersonalInfo: (info) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          personalInfo: { ...state.resumeData.personalInfo, ...info }
        }
      })),

      setTemplate: (template) => set({ activeTemplate: template }),

      addExperience: (exp) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          experience: [...state.resumeData.experience, { ...exp, id: Math.random().toString(36).substring(7) }]
        }
      })),

      updateExperience: (id, exp) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.map((e) => e.id === id ? { ...e, ...exp } : e)
        }
      })),

      removeExperience: (id) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.filter((e) => e.id !== id)
        }
      })),

      addEducation: (edu) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          education: [...state.resumeData.education, { ...edu, id: Math.random().toString(36).substring(7) }]
        }
      })),

      updateEducation: (id, edu) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.map((e) => e.id === id ? { ...e, ...edu } : e)
        }
      })),

      removeEducation: (id) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.filter((e) => e.id !== id)
        }
      })),

      addSkill: (skill) => set((state) => {
        const trimmed = skill.trim();
        if (trimmed && !state.resumeData.skills.includes(trimmed)) {
          return {
            resumeData: {
              ...state.resumeData,
              skills: [...state.resumeData.skills, trimmed]
            }
          };
        }
        return {};
      }),

      removeSkill: (skill) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          skills: state.resumeData.skills.filter((s) => s !== skill)
        }
      })),

      addProject: (proj) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          projects: [...state.resumeData.projects, { ...proj, id: Math.random().toString(36).substring(7) }]
        }
      })),

      updateProject: (id, proj) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          projects: state.resumeData.projects.map((p) => p.id === id ? { ...p, ...proj } : p)
        }
      })),

      removeProject: (id) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          projects: state.resumeData.projects.filter((p) => p.id !== id)
        }
      })),

      runAtsCheck: () => {
        set({ isAnalyzing: true });
        
        setTimeout(() => {
          const { resumeData } = get();
          const feedback: string[] = [];
          let score = 50;

          // Compute core grading logic
          // 1. Personal summary strength
          if (resumeData.personalInfo.summary.length > 100) {
            score += 10;
            feedback.push('✔ Summary section is descriptive and well-sized.');
          } else {
            feedback.push('⚠ Summary is too brief. Expand it to 2-3 sentences to outline your value.');
          }

          // 2. Experience density
          if (resumeData.experience.length >= 2) {
            score += 15;
            feedback.push('✔ Work history displays adequate professional progression.');
          } else {
            feedback.push('⚠ Professional history feels scarce. Try listing internships, freelance, or open-source projects.');
          }

          // 3. Bullet points counts & metrics
          let hasMetrics = false;
          let totalBullets = 0;
          resumeData.experience.forEach((exp) => {
            totalBullets += exp.bullets.length;
            exp.bullets.forEach((b) => {
              if (/\b\d+%\b|\b\$\d+|\b\d+\s+hours\b|\b\d+\s+users\b|\b\d+x\b/i.test(b)) {
                hasMetrics = true;
              }
            });
          });

          if (totalBullets > 4) {
            score += 10;
          } else {
            feedback.push('⚠ Add more detailed bullet points describing specific achievements.');
          }

          if (hasMetrics) {
            score += 10;
            feedback.push('✔ Included quantitative performance metrics in experience.');
          } else {
            feedback.push('⚠ Quantify your results. Add metrics like: "Improved speed by 30%" or "managed 5 client accounts".');
          }

          // 4. Skills checklist
          if (resumeData.skills.length >= 8) {
            score += 10;
            feedback.push('✔ Excellent range of technical skills registered.');
          } else {
            feedback.push('⚠ Skill count is low. Add technical tooling, libraries, frameworks, or soft skills.');
          }

          // 5. Keyword scanning
          const textBlob = JSON.stringify(resumeData).toLowerCase();
          const targetKeywords = ['react', 'typescript', 'architecture', 'optimiz', 'shopify', 'api', 'state management'];
          let matchedKeywords = 0;
          targetKeywords.forEach((kw) => {
            if (textBlob.includes(kw)) matchedKeywords++;
          });

          if (matchedKeywords >= 5) {
            score += 5;
            feedback.push('✔ Rich in core technical keywords.');
          } else {
            feedback.push('⚠ Missing key terms like: "State management", "optimization", or "architecture".');
          }

          set({
            atsScore: Math.min(score, 100),
            atsFeedback: feedback,
            isAnalyzing: false
          });
        }, 1200);
      },

      simulateLinkedinImport: () => {
        set({ isAnalyzing: true });
        
        setTimeout(() => {
          set({
            resumeData: {
              personalInfo: {
                fullName: 'Md. Refayet Hossen',
                jobTitle: 'Senior Software Engineer | React, Node.js & Shopify Solutions',
                email: 'mdrifayethossen@gmail.com',
                phone: '01952321390',
                website: 'https://refayet-dev.com',
                github: 'https://github.com/refayet-dev',
                linkedin: 'https://linkedin.com/in/refayet-dev',
                location: 'Dhaka, Bangladesh',
                summary: 'Experienced software engineer focusing on responsive frontend architectures, high-performance Shopify portals, and scalable cloud-based backend components. Confident with automated workflows and clean interfaces.',
              },
              experience: [
                {
                  id: 'exp-li-1',
                  company: 'AppVenture Solutions',
                  role: 'Lead Frontend Developer',
                  location: 'Remote',
                  duration: '2024 - Present',
                  bullets: [
                    'Pioneered complex client-side applications with React and TypeScript.',
                    'Orchestrated UI system migrations resulting in 40% code size reductions.'
                  ]
                },
                {
                  id: 'exp-li-2',
                  company: 'Freelance Architectures',
                  role: 'Full Stack Engineer',
                  location: 'Dhaka',
                  duration: '2020 - 2024',
                  bullets: [
                    'Built modern commerce backends and storefront integrations.',
                    'Optimized legacy relational database structures, reducing API fetch timings.'
                  ]
                }
              ],
              education: [
                {
                  id: 'edu-li-1',
                  school: 'Green University of Bangladesh',
                  degree: 'B.Sc. in Computer Science',
                  duration: '2022 - 2026'
                }
              ],
              skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Shopify API', 'Tailwind CSS', 'Redux', 'AWS'],
              projects: [
                {
                  id: 'proj-li-1',
                  name: 'LinkedIn Sync Dashboard',
                  description: 'Interactive analytics display dashboard mapping profile stats.',
                  techStack: ['React', 'Node.js', 'AWS']
                }
              ]
            },
            isAnalyzing: false
          });
          get().runAtsCheck();
          usePortfolioStore.getState().addNotification('LinkedIn Profile successfully imported!', 'success', 'Import Complete');
        }, 1500);
      },

      resetResume: () => set({ resumeData: DEFAULT_RESUME }),
    }),
    {
      name: 'refayet-portfolio-resume-store-v3',
    }
  )
);
