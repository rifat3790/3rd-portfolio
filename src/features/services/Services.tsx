import { ShoppingBag, Code, Zap, Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '../../data/portfolioData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const Services = () => {

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-accent shrink-0" />;
      case 'Code':
        return <Code className="w-6 h-6 text-accent shrink-0" />;
      default:
        return <Zap className="w-6 h-6 text-accent shrink-0" />;
    }
  };

  const handleServiceSelect = (title: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Dispatch custom event to autofill contact form details
      setTimeout(() => {
        const event = new CustomEvent('autofill-service', { detail: { service: title } });
        window.dispatchEvent(event);
      }, 300);
    }
  };

  return (
    <section id="services" className="py-24 border-t border-slate-200/50 dark:border-zinc-900/60 bg-slate-50 dark:bg-black/10 relative no-print">
      
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="text-xs uppercase tracking-widest font-extrabold text-accent font-display">
            My Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            Solutions Offered & Pricing
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mt-1" />
        </div>

        {/* SERVICES CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((serv) => (
            <Card 
              key={serv.id}
              className="flex flex-col h-full !p-6 bg-white dark:bg-darkcard border-slate-200 dark:border-darkborder text-left"
              glowBorder
              spotlight
              hoverEffect
            >
              {/* Header Icon + Price */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3.5 rounded-2xl bg-accent/10 text-accent">
                  {getServiceIcon(serv.iconName)}
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-mono">Rates from</span>
                  <h3 className="text-xl font-black font-display text-accent mt-0.5">{serv.price}</h3>
                </div>
              </div>

              {/* Service Info */}
              <div className="flex flex-col gap-2.5 mb-6">
                <h4 className="text-base font-bold font-display text-slate-800 dark:text-zinc-100">
                  {serv.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-zinc-500 leading-relaxed">
                  {serv.description}
                </p>
                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 mt-1">
                  Delivery: <strong className="text-slate-600 dark:text-zinc-300">{serv.delivery}</strong>
                </span>
              </div>

              {/* Process Checklist */}
              <div className="flex flex-col gap-3.5 border-t border-slate-100 dark:border-zinc-800/80 pt-5 mb-8 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-display">
                  Working Process
                </span>
                <ul className="flex flex-col gap-2">
                  {serv.process.map((step) => (
                    <li key={step} className="flex gap-2.5 items-start text-xs text-slate-600 dark:text-zinc-400">
                      <Check className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Button
                variant="outline"
                className="w-full mt-auto hover:bg-accent hover:text-white"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => handleServiceSelect(serv.title)}
              >
                Inquire Service
              </Button>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
