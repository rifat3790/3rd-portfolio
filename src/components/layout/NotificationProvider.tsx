import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export const NotificationProvider = () => {
  const { notifications, removeNotification } = usePortfolioStore();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-sky-500 shrink-0" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/30 bg-emerald-50/90 dark:bg-emerald-950/20';
      case 'error':
        return 'border-rose-500/30 bg-rose-50/90 dark:bg-rose-950/20';
      case 'warning':
        return 'border-amber-500/30 bg-amber-50/90 dark:bg-amber-950/20';
      default:
        return 'border-sky-500/30 bg-sky-50/90 dark:bg-sky-950/20';
    }
  };

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-[90%] pointer-events-none no-print">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex gap-3 p-4 rounded-xl border glass-panel shadow-lg ${getBorderColor(
              notif.type
            )}`}
          >
            {getAlertIcon(notif.type)}
            
            <div className="flex-1">
              {notif.title && (
                <h4 className="text-sm font-semibold font-display text-slate-900 dark:text-zinc-100">
                  {notif.title}
                </h4>
              )}
              <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">
                {notif.message}
              </p>
            </div>
            
            <button
              onClick={() => removeNotification(notif.id)}
              className="text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 self-start p-0.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationProvider;
