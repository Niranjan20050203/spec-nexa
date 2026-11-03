import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 font-outfit select-none ${className}`}>
      {/* Futuristic Laptop + AI Circuit Mark */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-xl opacity-20 blur-sm"></div>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-md"
        >
          {/* Laptop Lid Outline */}
          <rect
            x="6"
            y="7"
            width="28"
            height="18"
            rx="2.5"
            stroke="url(#nexa-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Futuristic Screen Bezel Glow */}
          <rect x="9" y="10" width="22" height="12" rx="1.5" fill="#111827" fillOpacity="0.8" />
          
          {/* AI Core Node */}
          <circle cx="20" cy="16" r="3" fill="url(#nexa-grad)" />
          <path d="M20 10V13" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 19V22" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 16H17" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M23 16H26" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Laptop Base */}
          <path
            d="M3 28.5C3 27.6716 3.67157 27 4.5 27H35.5C36.3284 27 37 27.6716 37 28.5C37 29.8807 35.8807 31 34.5 31H5.5C4.11929 31 3 29.8807 3 28.5Z"
            fill="url(#nexa-base-grad)"
            stroke="url(#nexa-grad)"
            strokeWidth="1.5"
          />
          <path d="M17 28.5H23" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

          {/* Gradients */}
          <defs>
            <linearGradient id="nexa-grad" x1="6" y1="7" x2="34" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="nexa-base-grad" x1="3" y1="27" x2="37" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#172235" />
              <stop offset="1" stopColor="#111827" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className={`font-black tracking-wider leading-none text-white ${textSizes[size]}`}>
            SPEC <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">NEXA</span>
          </div>
          <span className="text-[9px] tracking-widest text-slate-400 font-inter uppercase font-semibold mt-0.5">
            Laptop Intelligence
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
