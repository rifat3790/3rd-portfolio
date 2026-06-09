# Rifat | Premium Personal Portfolio & AI Architect

A premium, interactive, SaaS-style portfolio built with **React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion**. Optimized for sub-second loading speeds, responsive screens, accessibility landmarks, and high-fidelity print profiles.

---

## 🚀 Key Features

1.  **ATS Resume & CV Builder:**
    *   Interactive section editing (Info, Jobs, Education, Skills, Projects).
    *   **ATS Score Checker:** Dynamic algorithm checking summaries, metrics, and technical density.
    *   **LinkedIn/CV Parser Simulation:** Instantly populate engineering templates.
    *   **Modern, Corporate, & Minimal Templates:** Dynamically restructured styles.
    *   **Perfect 1-Page PDF Print Engine:** Tailored print styling rules hiding page borders, links, and drawers.
2.  **Floating AI Portfolio Assistant:**
    *   Persistent chatbot drawer with typing simulation.
    *   Context-aware answering on Rifat's history, projects, and pricing.
    *   **Interactive Quote Wizard:** Configures client project parameters and renders pricing details.
    *   **Voice Integration:** HTML5 Text-to-Speech synthesis and Speech Recognition input.
3.  **Protected Admin Console:**
    *   Lock gateway screen (Login credentials: password is `admin`).
    *   **Analytics Panel:** Unique visits tracking, resume generation rates, and chatbot click metrics.
    *   **Interactive Inbox:** Manage and delete client messages from the contact deck.
    *   **SVG Traffic Charts:** Daily visitor interaction bar charts.
    *   **Site Controls:** Toggle Rifat's "Hire Availability" status.
4.  **Premium Global Utilities:**
    *   **Command Palette (⌘K / Ctrl+K):** Sleek search utility to navigate paths, change accents, and reset data.
    *   **Style Customizer:** Select between 5 accent color highlights (Violet, Emerald, Amber, Rose, Cyan) in real-time.
    *   **Achievements & Gamified Badges:** Unlock medals for site exploration, generating CVs, or finding secrets.
    *   **Easter Egg Listener:** Enter the Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`) to unlock a special badge.
    *   **Interactive Particle Background:** Canvas-based interactive repulsion web.

---

## 📂 Project Architecture

```text
portfolio/
├── src/
│   ├── components/         # Reusable global styling elements
│   │   ├── ui/             # Buttons, radial cards, overlays
│   │   └── layout/         # Header/Navbar, Footer, Command Palette, Toasts
│   ├── store/              # Zustand global state configurations
│   │   ├── usePortfolioStore.ts # Core preferences, achievements, analytics
│   │   ├── useResumeStore.ts    # CV editing lists and templates
│   │   └── useChatbotStore.ts   # Chat logs, suggestions, speech synthesis
│   ├── features/           # Modularized feature modules
│   │   ├── hero/           # Hero section, availability badges, canvas particles
│   │   ├── about/          # Stories, personality grids, work accordions
│   │   ├── skills/         # Category search, circular SVG gauges
│   │   ├── projects/       # Filtering tabs, case study overlay detail modals
│   │   ├── services/       # Service rates, process checklists
│   │   ├── contact/        # Confetti success forms, budget sliders, WhatsApp links
│   │   ├── assistant/      # Floating chatbot drawer, voice/suggestion handlers
│   │   ├── resume/         # ATS templates, LinkedIn parser widgets, print panels
│   │   └── admin/          # Authorization login cards, inbox tables, analytics graphs
│   ├── data/               # Static datasets (projects data, markdown blog posts)
│   ├── styles/             # Tailwind base configurations
│   ├── App.tsx             # Route registry and Konami listeners
│   └── main.tsx            # DOM Mounting point
```

---

## ⚙️ Local Development

### Prerequisites
*   Node.js v18+
*   npm or yarn

### Installation
1.  Navigate to workspace directory:
    ```bash
    cd portfolio
    ```
2.  Install packages:
    ```bash
    npm install
    ```
3.  Launch development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build & Compilation
Verify production builds and TypeScript validity:
```bash
npm run build
```

---

## 📦 Deployment Guide

### Vercel / Netlify
1.  Connect your repository (e.g., GitHub) to your Vercel or Netlify account.
2.  Set the build settings:
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
3.  Click **Deploy**.

### GitHub Pages
Since the project utilizes a clean `HashRouter`, it is 100% compatible with GitHub Pages:
1.  Install the deployment package:
    `npm install -D gh-pages`
2.  Add properties to `package.json`:
    *   `"homepage": "https://<your-username>.github.io/<your-repo-name>",`
    *   Add scripts:
        *   `"predeploy": "npm run build",`
        *   `"deploy": "gh-pages -d dist"`
3.  Deploy:
    `npm run deploy`
