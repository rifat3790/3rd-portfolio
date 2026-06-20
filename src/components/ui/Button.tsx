import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  animateHover?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    icon: Icon, 
    iconPosition = 'left', 
    animateHover = true,
    className = '', 
    ...props 
  }, ref) => {
    
    // Base style definitions
    const baseStyle = 'inline-flex items-center justify-center font-display font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
    
    // Variant styles
    const variants = {
      primary: 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/30 hover:shadow-accent/60 hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)] border border-accent/10 relative overflow-hidden group',
      secondary: 'bg-slate-200 hover:bg-slate-350 dark:bg-darkborder dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-300 dark:border-zinc-700/50',
      glass: 'glass-panel hover:bg-slate-100/50 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-350/30 dark:border-white/10 shadow-sm',
      outline: 'bg-transparent hover:bg-accent/5 text-slate-700 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700 hover:border-accent dark:hover:border-accent',
      ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-zinc-400 hover:text-accent dark:hover:text-accent',
    };
    
    // Size styles
    const sizes = {
      sm: 'px-4 py-2 text-xs gap-1.5',
      md: 'px-6 py-3 text-sm gap-2',
      lg: 'px-8 py-4 text-base gap-2.5',
    };

    const hoverClass = animateHover ? 'hover:scale-[1.02] active:scale-[0.97]' : '';
    const componentClass = `${baseStyle} ${variants[variant]} ${sizes[size]} ${hoverClass} ${className}`;

    // Animated glow overlay for primary buttons
    const glowOverlay = variant === 'primary' && (
      <span className="absolute inset-0 w-full h-full -mt-1 transition-all duration-500 ease-in-out rotate-45 translate-x-12 bg-white/20 -translate-y-20 group-hover:translate-y-8 pointer-events-none" />
    );

    return (
      <button ref={ref} className={componentClass} {...props}>
        {glowOverlay}
        {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
        <span className="relative z-10">{children}</span>
        {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
