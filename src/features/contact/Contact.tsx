import { useState, useEffect } from 'react';
import { Mail, MapPin, Send, MessageSquare, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useTranslation } from '../../hooks/useTranslation';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const BUDGET_OPTIONS = ['<$2k', '$2k - $5k', '$5k - $10k', '$10k+'];
const SERVICE_OPTIONS = [
  'Headless Shopify Commerce',
  'SaaS Web App Development',
  'Lighthouse Page Optimization',
  'Other / Custom Consulting'
];

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { addInquiry, addNotification } = usePortfolioStore();
  const { t, language } = useTranslation();

  const currentServiceOptions = language === 'en' ? SERVICE_OPTIONS : [
    'হেডলেস শপিফাই কমার্স',
    'সাস (SaaS) ওয়েব অ্যাপ ডেভেলপমেন্ট',
    'লাইটহাউস পেজ অপ্টিমাইজেশন',
    'অন্যান্য / কাস্টম কনসাল্টিং'
  ];

  // Autofill service from external events (e.g. Services section clicking)
  useEffect(() => {
    const handleAutofill = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.service) {
        // Match the closest option
        const matched = SERVICE_OPTIONS.find(s => s.toLowerCase().includes(customEvent.detail.service.toLowerCase()));
        if (matched) {
          setService(matched);
        } else {
          setService(SERVICE_OPTIONS[3]); // Other
        }
      }
    };

    window.addEventListener('autofill-service', handleAutofill);
    return () => window.removeEventListener('autofill-service', handleAutofill);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      addNotification('Please fill in all required fields.', 'error', 'Incomplete Fields');
      return;
    }

    setIsSubmitting(true);

    fetch('https://formsubmit.co/ajax/mdrifayethossen@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        name,
        email,
        company: company || 'N/A',
        service,
        budget,
        message,
        _subject: `New Portfolio Inquiry from ${name}`,
        _autoresponse: "Thank you for reaching out! I have received your message and will get back to you within 12 hours. Best regards, Md. Refayet Hossen"
      })
    })
    .then(response => response.json())
    .then(() => {
      // Record inquiry in Zustand
      addInquiry({
        name,
        email,
        company: company || 'N/A',
        service,
        budget,
        message,
      });

      // Confetti burst!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.8 }
      });

      addNotification('Inquiry sent successfully! Refayet will respond shortly.', 'success', 'Message Transmitted');
      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form fields
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
    })
    .catch(() => {
      setIsSubmitting(false);
      addNotification('Failed to send message. Please try again or use direct email.', 'error', 'Transmission Failed');
    });
  };

  const prefilledWhatsappText = encodeURIComponent(
    "Hi Refayet, I visited your creative portfolio and would love to schedule a session to chat about a new project!"
  );

  return (
    <section id="contact" className="py-24 border-t border-slate-200/50 dark:border-zinc-900/60 bg-white dark:bg-darkbg/20 relative no-print">
      
      {/* Background spotlights */}
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent font-display">
            {t('contact.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            {t('contact.title')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-500 max-w-2xl leading-relaxed">
            {t('contact.desc')}
          </p>
          <div className="w-12 h-1 bg-accent rounded-full mt-2" />
        </div>

        {/* CONTENT ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Contact details */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Have a project idea?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                Fill out the form with your goals, budgets, and project description, or reach out directly on WhatsApp or LinkedIn. Let's schedule a call to translate your specifications into clean code.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-4.5 p-4 rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-slate-50/30 dark:bg-zinc-950/20">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-display">Email Address</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200 mt-0.5">mdrifayethossen@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4.5 p-4 rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-slate-50/30 dark:bg-zinc-950/20">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-display">Location</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200 mt-0.5">Dhaka, Bangladesh (GMT+6)</p>
                </div>
              </div>
            </div>

            {/* Quick backup links */}
            <div className="flex flex-col gap-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display">
                Alternative Channels
              </span>
              <div className="flex gap-3">
                <a 
                  href={`https://wa.me/8801952321390?text=${prefilledWhatsappText}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4.5 h-4.5" />
                  <span>WhatsApp Chat</span>
                </a>
                <a 
                  href="https://linkedin.com/in/refayet-dev" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700/60 text-slate-700 dark:text-zinc-200 font-semibold text-xs border border-slate-200 dark:border-zinc-700/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn Mail</span>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Inquiry Form */}
          <div className="col-span-1 lg:col-span-7">
            <Card className="!p-6 bg-slate-50/50 dark:bg-zinc-950/20 border-slate-200 dark:border-zinc-800">
              
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/15 animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white font-display text-base">Transmission Confirmed!</h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 text-center max-w-sm leading-relaxed mt-1">
                    Your request was transmitted to Refayet's dashboard. A response is guaranteed within 12 business hours.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => setSubmitted(false)}>
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-left">
                  
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="relative">
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-2 border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-accent dark:focus:border-accent transition-colors placeholder:text-slate-400"
                      />
                      <label className="absolute left-3 -top-2.5 bg-white dark:bg-zinc-950 px-1 text-[11px] font-bold text-slate-500 dark:text-zinc-400">
                        {language === 'en' ? 'Your Name' : 'আপনার নাম'} <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-2 border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-accent dark:focus:border-accent transition-colors placeholder:text-slate-400"
                      />
                      <label className="absolute left-3 -top-2.5 bg-white dark:bg-zinc-950 px-1 text-[11px] font-bold text-slate-500 dark:text-zinc-400">
                        {language === 'en' ? 'Your Email' : 'আপনার ইমেইল'} <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>

                  {/* Company and Services */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Acme Corp"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-transparent border-2 border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-accent dark:focus:border-accent transition-colors placeholder:text-slate-400"
                      />
                      <label className="absolute left-3 -top-2.5 bg-white dark:bg-zinc-950 px-1 text-[11px] font-bold text-slate-500 dark:text-zinc-400">
                        {language === 'en' ? 'Company Name' : 'কোম্পানির নাম'}
                      </label>
                    </div>
                    <div className="relative">
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-transparent border-2 border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-accent dark:focus:border-accent transition-colors appearance-none"
                      >
                        {currentServiceOptions.map((o) => (
                          <option key={o} value={o} className="bg-white dark:bg-zinc-900">{o}</option>
                        ))}
                      </select>
                      <label className="absolute left-3 -top-2.5 bg-white dark:bg-zinc-950 px-1 text-[11px] font-bold text-slate-500 dark:text-zinc-400">
                        {language === 'en' ? 'Service Required' : 'প্রয়োজনীয় সার্ভিস'} <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>

                  {/* Budget Choice selector pills */}
                  <div className="relative">
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-transparent border-2 border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-accent dark:focus:border-accent transition-colors appearance-none"
                    >
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200">{opt}</option>
                      ))}
                    </select>
                    <label className="absolute left-3 -top-2.5 bg-white dark:bg-zinc-950 px-1 text-[11px] font-bold text-slate-500 dark:text-zinc-400">
                      {language === 'en' ? 'Project Budget' : 'প্রোজেক্ট বাজেট'} <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Message details */}
                  <div className="relative">
                    <textarea
                      required
                      rows={5}
                      placeholder={language === 'en' ? "Describe your project requirements, goals, and any specific technical constraints..." : "আপনার প্রোজেক্টের রিকোয়ারমেন্ট, লক্ষ্য এবং স্পেসিফিক টেকনিক্যাল বিষয়গুলো বিস্তারিত লিখুন..."}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-transparent border-2 border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-accent dark:focus:border-accent transition-colors resize-none placeholder:text-slate-400 dark:placeholder:text-zinc-600"
                    />
                    <label className="absolute left-3 -top-2.5 bg-white dark:bg-zinc-950 px-1 text-[11px] font-bold text-slate-500 dark:text-zinc-400">
                      {language === 'en' ? 'Project Details' : 'প্রোজেক্টের বিস্তারিত'} <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-2"
                    icon={Send}
                    iconPosition="right"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Transmitting Inquiries...' : 'Send Inquiry Message'}
                  </Button>

                </form>
              )}

            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
