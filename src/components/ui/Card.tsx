import React, { useState } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  spotlight?: boolean;
  glass?: boolean;
  glowBorder?: boolean;
}

export const Card = ({
  children,
  hoverEffect = true,
  spotlight = true,
  glass = true,
  glowBorder = true,
  className = '',
  ...props
}: CardProps) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Build element classes
  const classes = [
    'relative rounded-2xl overflow-hidden transition-all duration-300 border group',
    glass 
      ? 'glass-panel' 
      : 'bg-white dark:bg-darkcard border-slate-200 dark:border-darkborder',
    glowBorder ? 'glow-card' : '',
    hoverEffect ? 'hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/30 hover:scale-[1.005]' : '',
    className
  ].join(' ');

  // Dynamic spotlight layer
  const spotlightLayer = spotlight && isHovered && (
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
      style={{
        background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(var(--color-accent-rgb), 0.08), transparent 80%)`,
      }}
    />
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={classes}
      {...props}
    >
      {spotlightLayer}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default Card;
