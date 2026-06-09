import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AccentColor = 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  icon: string;
}

interface PortfolioState {
  theme: 'dark' | 'light';
  accentColor: AccentColor;
  notifications: Notification[];
  inquiries: ContactInquiry[];
  isAdminAuthenticated: boolean;
  analytics: {
    visits: number;
    downloads: number;
    resumesGenerated: number;
    chatsConducted: number;
  };
  achievements: Achievement[];
  
  // Actions
  toggleTheme: () => void;
  setAccentColor: (color: AccentColor) => void;
  addNotification: (message: string, type?: Notification['type'], title?: string) => void;
  removeNotification: (id: string) => void;
  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'timestamp' | 'isRead'>) => void;
  markInquiryRead: (id: string) => void;
  deleteInquiry: (id: string) => void;
  setAdminAuthenticated: (auth: boolean) => void;
  incrementAnalytics: (key: keyof PortfolioState['analytics']) => void;
  unlockAchievement: (id: string) => void;
  resetAchievements: () => void;
}

const ACCENT_MAP: Record<AccentColor, { primary: string; hover: string }> = {
  violet: { primary: '139 92 246', hover: '124 58 237' },
  emerald: { primary: '16 185 129', hover: '5 150 105' },
  amber: { primary: '245 158 11', hover: '217 119 6' },
  rose: { primary: '244 63 94', hover: '225 29 72' },
  cyan: { primary: '6 182 212', hover: '8 145 178' },
};

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      accentColor: 'violet',
      notifications: [],
      inquiries: [
        {
          id: '1',
          name: 'Sarah Connor',
          email: 'sarah@cyberdyne.com',
          company: 'Cyberdyne Systems',
          service: 'SaaS Web App Development',
          budget: '$5k - $10k',
          message: 'Looking to hire a Shopify and React engineer to build out our high-security portal dashboard. Love your clean designs!',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleString(),
          isRead: false,
        },
        {
          id: '2',
          name: 'John Doe',
          email: 'john@acme.org',
          company: 'Acme Corp',
          service: 'Headless Shopify Commerce',
          budget: '$10k+',
          message: 'Can you integrate our custom API with Shopify headless commerce using React + TS?',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toLocaleString(),
          isRead: true,
        }
      ],
      isAdminAuthenticated: false,
      analytics: {
        visits: 42,
        downloads: 7,
        resumesGenerated: 3,
        chatsConducted: 12,
      },
      achievements: [
        { id: 'explore_all', title: 'Grand Explorer', description: 'Visited all core sections of the portfolio.', unlocked: false, icon: '🧭' },
        { id: 'cv_builder', title: 'Resume Creator', description: 'Generated a personalized CV using the ATS CV builder.', unlocked: false, icon: '📄' },
        { id: 'chat_bot', title: 'Conversationalist', description: 'Interacted with the AI Chatbot and generated a quote.', unlocked: false, icon: '🤖' },
        { id: 'easter_egg', title: 'Retro Gamer', description: 'Activated the Konami Code secret easter egg.', unlocked: false, icon: '🎮' },
        { id: 'accent_change', title: 'Stylist', description: 'Customized the portfolio accent color theme.', unlocked: false, icon: '🎨' },
      ],

      toggleTheme: () => set((state) => {
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme: nextTheme };
      }),

      setAccentColor: (color) => {
        const rgbVals = ACCENT_MAP[color];
        if (rgbVals) {
          const root = document.documentElement;
          root.style.setProperty('--color-accent-rgb', rgbVals.primary);
          root.style.setProperty('--color-accent-hover-rgb', rgbVals.hover);
        }
        set({ accentColor: color });
        get().unlockAchievement('accent_change');
        get().addNotification(`Accent color updated to ${color}!`, 'success', 'Theme Customized');
      },

      addNotification: (message, type = 'info', title) => {
        const id = Math.random().toString(36).substring(7);
        set((state) => ({
          notifications: [...state.notifications, { id, message, type, title }],
        }));
        setTimeout(() => {
          get().removeNotification(id);
        }, 4000);
      },

      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      })),

      addInquiry: (inquiry) => set((state) => ({
        inquiries: [
          {
            ...inquiry,
            id: Math.random().toString(36).substring(7),
            timestamp: new Date().toLocaleString(),
            isRead: false,
          },
          ...state.inquiries,
        ],
      })),

      markInquiryRead: (id) => set((state) => ({
        inquiries: state.inquiries.map((inq) => inq.id === id ? { ...inq, isRead: true } : inq),
      })),

      deleteInquiry: (id) => set((state) => ({
        inquiries: state.inquiries.filter((inq) => inq.id !== id),
      })),

      setAdminAuthenticated: (auth) => set({ isAdminAuthenticated: auth }),

      incrementAnalytics: (key) => set((state) => ({
        analytics: {
          ...state.analytics,
          [key]: state.analytics[key] + 1,
        },
      })),

      unlockAchievement: (id) => set((state) => {
        let unlockedAny = false;
        const nextAchievements = state.achievements.map((ach) => {
          if (ach.id === id && !ach.unlocked) {
            unlockedAny = true;
            return { ...ach, unlocked: true, unlockedAt: new Date().toLocaleDateString() };
          }
          return ach;
        });

        if (unlockedAny) {
          // Trigger notification
          const achName = nextAchievements.find((a) => a.id === id)?.title;
          setTimeout(() => {
            get().addNotification(
              `Unlocked Achievement: "${achName}"!`,
              'success',
              'Achievement Unlocked 🏆'
            );
          }, 300);
          return { achievements: nextAchievements };
        }
        return {};
      }),

      resetAchievements: () => set((state) => ({
        achievements: state.achievements.map((ach) => ({ ...ach, unlocked: false, unlockedAt: undefined })),
      })),
    }),
    {
      name: 'refayet-portfolio-store',
      partialize: (state) => ({
        theme: state.theme,
        accentColor: state.accentColor,
        inquiries: state.inquiries,
        analytics: state.analytics,
        achievements: state.achievements,
      }),
    }
  )
);
