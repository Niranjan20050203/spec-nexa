// ============================================================
// SPEC NEXA - Footer Component
// ============================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Twitter, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    Product: [
      { label: 'Find My Laptop', to: '/questionnaire' },
      { label: 'Browse Laptops', to: '/laptops' },
      { label: 'Compare', to: '/compare' },
      { label: 'How It Works', to: '/about#how-it-works' },
    ],
    Company: [
      { label: 'About Us', to: '/about' },
      { label: 'Blog', to: '/blog' },
    ],
    Legal: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  };

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Cpu size={18} className="text-white" />
              </div>
              <span className="font-outfit font-bold text-lg text-white">
                SPEC <span className="text-gradient">NEXA</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Your personal AI laptop expert. Find the perfect laptop for your budget and needs — India's most intelligent laptop recommendation platform.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/40 transition-all duration-200"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/40 transition-all duration-200"
              >
                <Github size={16} />
              </a>
              <a
                href="mailto:hello@specnexa.in"
                className="w-9 h-9 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/40 transition-all duration-200"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-outfit font-semibold text-white mb-4 text-sm">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} SPEC NEXA. Made with ❤️ for India.
          </p>
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>India Only · Prices in INR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
