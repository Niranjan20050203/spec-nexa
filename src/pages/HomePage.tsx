// ============================================================
// SPEC NEXA - HomePage
// ============================================================
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import {
  BrainCircuit,
  IndianRupee,
  Shield,
  Cpu,
  Columns2,
  ShoppingCart,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Star,
  Zap,
  TrendingUp,
} from 'lucide-react';

// ─── Animated counter ────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number | string; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || typeof target !== 'number') return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{typeof target === 'number' ? count : target}{suffix}
    </span>
  );
}

// ─── Floating particle ───────────────────────────────────────
function Particle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/20"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

// ─── Feature Card ────────────────────────────────────────────
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
  span?: boolean;
}

function FeatureCard({ icon, title, description, gradient, delay = 0, span = false }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative group glass-card p-6 overflow-hidden cursor-default ${span ? 'md:col-span-2' : ''}`}
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient}`} />

      <div className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${gradient} border border-white/10`}>
        {icon}
      </div>
      <h3 className="relative z-10 font-outfit font-semibold text-white text-lg mb-2">{title}</h3>
      <p className="relative z-10 text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ─── Step ────────────────────────────────────────────────────
function Step({ number, title, description, delay }: { number: number; title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center relative"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-outfit font-bold text-xl mb-4 shadow-glow-primary">
        {number}
      </div>
      <h3 className="font-outfit font-semibold text-white text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">{description}</p>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────
export default function HomePage() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 6,
    delay: Math.random() * 3,
  }));

  const features = [
    {
      icon: <BrainCircuit size={22} className="text-blue-400" />,
      title: 'AI Laptop Recommendations',
      description: 'Our scoring engine weighs 8 dimensions against your needs to surface only the laptops truly built for you.',
      gradient: 'bg-gradient-to-br from-blue-600/20 to-blue-900/10',
    },
    {
      icon: <IndianRupee size={22} className="text-cyan-400" />,
      title: 'Smart Budget Matching',
      description: 'Enter your budget range in INR. Every recommendation respects your financial boundaries — no surprises.',
      gradient: 'bg-gradient-to-br from-cyan-600/20 to-cyan-900/10',
    },
    {
      icon: <Shield size={22} className="text-green-400" />,
      title: 'Durability Intelligence',
      description: 'We score chassis materials, MIL-STD-810H certification, cooling, and real-world longevity data.',
      gradient: 'bg-gradient-to-br from-green-600/20 to-green-900/10',
    },
    {
      icon: <Cpu size={22} className="text-purple-400" />,
      title: 'Performance Analysis',
      description: 'CPU generation, GPU tier, RAM type, thermal design — all factored into a clear performance score.',
      gradient: 'bg-gradient-to-br from-purple-600/20 to-purple-900/10',
    },
    {
      icon: <Columns2 size={22} className="text-orange-400" />,
      title: 'Side-by-Side Comparison',
      description: 'Compare up to 4 laptops spec by spec. See exactly what you gain and what you trade off.',
      gradient: 'bg-gradient-to-br from-orange-600/20 to-orange-900/10',
    },
    {
      icon: <ShoppingCart size={22} className="text-pink-400" />,
      title: 'Indian Retailer Links',
      description: 'Direct links to Amazon India, Flipkart, Croma, Reliance Digital — wherever the best price lives.',
      gradient: 'bg-gradient-to-br from-pink-600/20 to-pink-900/10',
    },
  ];

  const stats = [
    { value: 30, suffix: '+', label: 'Laptops in Database', icon: <Cpu size={18} className="text-primary" /> },
    { value: 8, suffix: '', label: 'Scoring Dimensions', icon: <Star size={18} className="text-secondary" /> },
    { value: 'India', suffix: ' Only', label: 'Market Focus', icon: <Zap size={18} className="text-green-400" /> },
    { value: 0, suffix: '', prefix: '₹', label: 'Cost to Use', icon: <TrendingUp size={18} className="text-orange-400" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37,99,235,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <Particle key={p.id} x={p.x} y={p.y} size={p.size} delay={p.delay} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <Sparkles size={14} />
              AI-Powered Laptop Recommendations for India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-outfit font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
            >
              Stop Guessing.{' '}
              <span className="text-gradient">Start Choosing</span>{' '}
              Smarter.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
            >
              Your personal AI laptop expert. Tell us what you need, set your budget, and discover the{' '}
              <span className="text-white font-medium">10 best laptops</span> selected specifically for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/questionnaire"
                className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4 group"
              >
                Find My Perfect Laptop
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/laptops"
                className="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                Explore Laptops
                <ChevronRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-6 text-sm text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                No account needed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Completely free
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                India prices only
              </span>
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Laptop mockup */}
              <div className="relative">
                <div className="bg-surface-elevated border border-border rounded-2xl p-6 shadow-2xl shadow-black/50">
                  {/* Screen */}
                  <div className="bg-background rounded-xl aspect-video mb-4 overflow-hidden relative border border-border/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: `linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                      }}
                    />
                    {/* Screen content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                          <Cpu size={12} className="text-white" />
                        </div>
                        <span className="text-white font-outfit font-bold text-sm">SPEC NEXA</span>
                      </div>
                      <div className="w-full bg-surface-elevated rounded-lg p-3 border border-border/50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-slate-400">Match Score</span>
                          <span className="text-sm font-bold text-primary">94/100</span>
                        </div>
                        <div className="w-full bg-border rounded-full h-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '94%' }}
                            transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
                            className="h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {[
                          { label: 'Performance', value: '9.2/10', color: 'text-blue-400' },
                          { label: 'Battery', value: '8.7/10', color: 'text-green-400' },
                          { label: 'Value', value: '9.5/10', color: 'text-yellow-400' },
                          { label: 'Display', value: '8.9/10', color: 'text-purple-400' },
                        ].map((stat) => (
                          <div key={stat.label} className="bg-surface rounded p-1.5 text-center">
                            <div className={`font-bold text-xs ${stat.color}`}>{stat.value}</div>
                            <div className="text-slate-500 text-[9px]">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Keyboard area */}
                  <div className="flex gap-1 mb-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="flex-1 h-3 bg-border/50 rounded-sm" />
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="flex-1 h-3 bg-border/40 rounded-sm" />
                    ))}
                  </div>
                  <div className="mt-2 mx-auto w-16 h-8 bg-border/30 rounded-md" />
                </div>

                {/* Floating match card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-5 -right-8 glass-card p-3 min-w-[140px] shadow-lg shadow-primary/10"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-slate-300 font-medium">Best Overall</span>
                  </div>
                  <div className="text-white text-sm font-bold">Match: 94/100</div>
                  <div className="text-slate-400 text-[10px]">ASUS ROG Zephyrus G14</div>
                </motion.div>

                {/* Floating budget card */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-5 -left-8 glass-card p-3 min-w-[140px] shadow-lg shadow-secondary/10"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <IndianRupee size={12} className="text-secondary" />
                    <span className="text-xs text-slate-300 font-medium">Within Budget</span>
                  </div>
                  <div className="text-white text-sm font-bold">₹89,990</div>
                  <div className="text-green-400 text-[10px]">₹10,010 under limit</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES (BENTO GRID) ─────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4">
            <Zap size={14} />
            What Makes SPEC NEXA Different
          </div>
          <h2 className="section-heading mb-3">Everything You Need to Choose Smarter</h2>
          <p className="section-subheading">
            Six powerful modules work together to deliver recommendations you can actually trust.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <BrainCircuit size={14} />
              Simple 4-Step Process
            </div>
            <h2 className="section-heading mb-3">How It Works</h2>
            <p className="section-subheading">
              From requirements to recommendations in under 3 minutes.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Connecting line (desktop) */}
            <div className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />

            <Step number={1} title="Enter Your Requirements" description="Tell us your use case — coding, gaming, video editing, or everyday tasks." delay={0} />
            <Step number={2} title="Set Your Budget (₹)" description="Specify your INR budget range with strict or flexible tolerance." delay={0.1} />
            <Step number={3} title="AI Analyzes 30+ Laptops" description="Our engine scores every laptop across 8 weighted dimensions against your needs." delay={0.2} />
            <Step number={4} title="Get Your Top 10 Matches" description="Ranked results with match score, explanations, and direct buy links." delay={0.3} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/questionnaire" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base group">
              Try It Now — It's Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-heading mb-3">Built with Transparency</h2>
            <p className="section-subheading">Honest numbers. No inflated claims.</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center group hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex justify-center mb-3">{s.icon}</div>
                <div className="font-outfit font-bold text-4xl text-white mb-1">
                  <AnimatedCounter
                    target={typeof s.value === 'number' ? s.value : s.value}
                    suffix={s.suffix}
                    prefix={s.prefix ?? ''}
                  />
                </div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles size={14} />
            Your perfect laptop is waiting
          </div>
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-white mb-5 leading-tight">
            Find Your Next Laptop{' '}
            <span className="text-gradient">the Smarter Way</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join thousands of Indian buyers who chose smarter with SPEC NEXA. Free, fast, and tailored to you.
          </p>
          <Link
            to="/questionnaire"
            className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-lg group"
          >
            Start Your Free Laptop Search
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-slate-500 text-sm mt-4">No account required · Takes 2 minutes</p>
        </motion.div>
      </section>
    </motion.div>
  );
}
