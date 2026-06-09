import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  suggestions?: string[];
  metadata?: {
    type?: 'quote' | 'projects' | 'resume';
    data?: unknown;
  };
}

interface ChatbotState {
  isOpen: boolean;
  messages: ChatMessage[];
  isSpeechEnabled: boolean;
  isBotTyping: boolean;
  
  // Actions
  toggleChatbot: () => void;
  setOpen: (open: boolean) => void;
  setSpeechEnabled: (enabled: boolean) => void;
  sendMessage: (text: string) => void;
  resetChat: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'bot',
    text: 'Hello! I am Refayet\'s Portfolio Assistant. How can I help you today?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestions: [
      '🚀 Show Projects',
      '💼 Explain Experience',
      '📄 Build Resume',
      '💰 Generate Quote',
    ]
  }
];

// Context awareness response generator
const getBotResponse = (input: string): { text: string; suggestions?: string[]; metadata?: ChatMessage['metadata'] } => {
  const query = input.toLowerCase();

  // 1. Quote generator path
  if (query.includes('quote') || query.includes('pricing') || query.includes('cost') || query.includes('rate')) {
    return {
      text: 'I can help you estimate pricing for your project! Refayet specializes in high-fidelity React applications, custom Shopify architectures, and interactive SaaS frontends. Let\'s build a fast quotation.\n\nWhat is the scope of your project?',
      suggestions: [
        'Shopify eCommerce Store',
        'Custom React SaaS Web App',
        'UI Design & Optimization',
        'Consulting / Code Audit'
      ]
    };
  }

  if (query.includes('shopify ecommerce store')) {
    return {
      text: 'Awesome. For a custom Shopify storefront with performance optimization and headless configurations, rates typically start at $3,500. This includes responsive design, SEO optimization, and analytics setups.\n\nWould you like to book a call to discuss details?',
      suggestions: ['📅 Book a Meeting', '💬 Custom Quote', '⬅ Main Menu']
    };
  }

  if (query.includes('custom react saas web app')) {
    return {
      text: 'SaaS Web Apps (React + TypeScript + Tailwind) range from $5,000 to $12,000 depending on API complexities and state management. Refayet uses production-ready clean architecture.\n\nWould you like to schedule a strategy session?',
      suggestions: ['📅 Book a Meeting', '⬅ Main Menu']
    };
  }

  if (query.includes('ui design & optimization') || query.includes('consulting')) {
    return {
      text: 'Performance audits and visual designs are priced hourly ($75/hr) or as a flat rate starting at $1,500. This guaranteed to boost Lighthouse scores to 95+.\n\nLet\'s set up a conversation!',
      suggestions: ['📅 Book a Meeting', '⬅ Main Menu']
    };
  }

  // 2. Project path
  if (query.includes('project') || query.includes('work') || query.includes('show portfolio')) {
    return {
      text: 'Refayet has delivered 15+ top-tier projects including:\n\n1. **HydroStore Portal** (Headless Shopify)\n2. **SaaS Dashboard Hub** (React + Zustand)\n3. **Decentralized Portfolio Client**\n\nYou can inspect detailed case studies in the **Projects** section of the website.',
      suggestions: ['🔍 Go to Projects', '📄 Build Resume', '⬅ Main Menu']
    };
  }

  // 3. Resume / CV path
  if (query.includes('resume') || query.includes('cv') || query.includes('generate cv') || query.includes('linkedin')) {
    return {
      text: 'You can use Refayet\'s premium **Interactive Resume Builder** right here! You can modify fields, import LinkedIn mock details, run ATS keyword optimization checks, and export print-ready PDFs.',
      suggestions: ['📄 Open Resume Builder', '💼 Explain Experience', '⬅ Main Menu']
    };
  }

  // 4. Experience / background path
  if (query.includes('experience') || query.includes('background') || query.includes('education') || query.includes('history')) {
    return {
      text: 'Refayet Hossen is a Senior Full Stack & Shopify Developer with over 5 years of commercial experience. He has worked with companies like **AppVenture Solutions** and **Shopify Craft Studios**, leading development groups and shipping clean interfaces.',
      suggestions: ['📄 Read About Me', '🚀 Show Projects', '⬅ Main Menu']
    };
  }

  // 5. Calendar / Call Booking
  if (query.includes('book') || query.includes('meeting') || query.includes('call') || query.includes('schedule')) {
    return {
      text: 'Excellent! You can schedule a direct call with Refayet using the calendar scheduling tool located at the bottom of the page in the Contact section, or drop a line via email.',
      suggestions: ['💬 Go to Contact Section', '📨 Send Email', '⬅ Main Menu']
    };
  }

  // 6. Reset or Main Menu
  if (query.includes('main menu') || query.includes('back') || query.includes('hello') || query.includes('hi ')) {
    return {
      text: 'How can I assist you with your business needs today?',
      suggestions: [
        '🚀 Show Projects',
        '💼 Explain Experience',
        '📄 Build Resume',
        '💰 Generate Quote',
      ]
    };
  }

  // Default Fallback
  return {
    text: 'I understand! Refayet is highly skilled in React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Shopify commerce. Would you like to check out some projects or discuss pricing?',
    suggestions: ['🚀 Show Projects', '💰 Generate Quote', '📨 Contact Refayet']
  };
};

export const useChatbotStore = create<ChatbotState>((set, get) => ({
  isOpen: false,
  messages: INITIAL_MESSAGES,
  isSpeechEnabled: false,
  isBotTyping: false,

  toggleChatbot: () => set((state) => ({ isOpen: !state.isOpen })),
  
  setOpen: (open) => set({ isOpen: open }),

  setSpeechEnabled: (enabled) => set({ isSpeechEnabled: enabled }),

  sendMessage: (text) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isBotTyping: true,
    }));

    // Generate responsive speech if enabled and browser support exists
    if (get().isSpeechEnabled && 'speechSynthesis' in window) {
      // Small delay so page reading happens nicely
    }

    // Bot response simulation with artificial typing delay
    setTimeout(() => {
      const responseData = getBotResponse(text);
      const botMessage: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        sender: 'bot',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: responseData.suggestions,
        metadata: responseData.metadata,
      };

      set((state) => ({
        messages: [...state.messages, botMessage],
        isBotTyping: false,
      }));

      // Speak response if Speech is active
      if (get().isSpeechEnabled && 'speechSynthesis' in window) {
        // Strip out markdown symbols for clean read
        const cleanText = responseData.text.replace(/[*#`]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        window.speechSynthesis.speak(utterance);
      }
    }, 1000);
  },

  resetChat: () => set({ messages: INITIAL_MESSAGES }),
}));
