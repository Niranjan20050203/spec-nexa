// ============================================================
// SPEC NEXA - Application Constants
// ============================================================

import { UseCaseTag, PriorityKey } from '../types';

// ---------------------------------------------------------------------------
// Retailer Domains
// ---------------------------------------------------------------------------
export const ALLOWED_RETAILER_DOMAINS: string[] = [
  'amazon.in',
  'flipkart.com',
  'croma.com',
  'reliancedigital.in',
  'asus.com/in',
  'hp.com/in',
  'lenovo.com/in',
  'dell.com/in',
  'acer.com/in',
  'msi.com/in',
  'apple.com/in',
  'samsung.com/in',
];

// ---------------------------------------------------------------------------
// Indian Brands
// ---------------------------------------------------------------------------
export const INDIAN_BRANDS: string[] = [
  'Infinix',
  'Micromax',
  'iBall',
  'HCL',
];

// ---------------------------------------------------------------------------
// Use-Case Labels
// ---------------------------------------------------------------------------
export const USAGE_LABELS: Record<UseCaseTag, string> = {
  programming: 'Programming / Development',
  ai_ml: 'AI / Machine Learning',
  cybersecurity: 'Cybersecurity',
  gaming: 'Gaming',
  video_editing: 'Video Editing',
  graphic_design: 'Graphic Design',
  office: 'Office / Productivity',
  student: 'Student',
  browsing: 'Web Browsing',
  content_creation: 'Content Creation',
  engineering_cad: 'Engineering / CAD',
  data_science: 'Data Science',
  virtual_machines: 'Virtual Machines',
  multi_purpose: 'Multi-Purpose',
};

// ---------------------------------------------------------------------------
// Priority Labels
// ---------------------------------------------------------------------------
export const PRIORITY_LABELS: Record<PriorityKey, string> = {
  performance: 'Performance',
  battery: 'Battery Life',
  durability: 'Build Quality / Durability',
  portability: 'Portability / Weight',
  display: 'Display Quality',
  gaming: 'Gaming Capability',
  cooling: 'Cooling / Thermals',
  upgradeability: 'Upgradeability',
  brand_reliability: 'Brand Reliability',
  after_sales: 'After-Sales / Service',
  value_for_money: 'Value for Money',
};

// ---------------------------------------------------------------------------
// Processor Options
// ---------------------------------------------------------------------------
export const PROCESSOR_OPTIONS: Record<string, string[]> = {
  Intel: [
    'Intel Core i3',
    'Intel Core i5',
    'Intel Core i7',
    'Intel Core i9',
    'Intel Core Ultra 5',
    'Intel Core Ultra 7',
    'Intel Core Ultra 9',
  ],
  AMD: [
    'AMD Ryzen 3',
    'AMD Ryzen 5',
    'AMD Ryzen 7',
    'AMD Ryzen 9',
    'AMD Ryzen AI',
  ],
  Apple: [
    'Apple M1',
    'Apple M2',
    'Apple M3',
    'Apple M1 Pro',
    'Apple M2 Pro',
    'Apple M3 Pro',
    'Apple M2 Max',
    'Apple M3 Max',
  ],
};

// ---------------------------------------------------------------------------
// GPU Options
// ---------------------------------------------------------------------------
export const GPU_OPTIONS: string[] = [
  // NVIDIA
  'NVIDIA RTX 3050',
  'NVIDIA RTX 3050 Ti',
  'NVIDIA RTX 3060',
  'NVIDIA RTX 3070',
  'NVIDIA RTX 3080',
  'NVIDIA RTX 4050',
  'NVIDIA RTX 4060',
  'NVIDIA RTX 4070',
  'NVIDIA RTX 4080',
  'NVIDIA RTX 4090',
  // AMD
  'AMD Radeon RX 6600M',
  'AMD Radeon RX 6700M',
  'AMD Radeon RX 7600M',
  'AMD Radeon RX 7700S',
  // Intel
  'Intel Iris Xe',
  'Intel Arc A370M',
  'Intel Arc A530M',
  // Apple
  'Apple M2 GPU',
  'Apple M3 GPU',
  // Integrated
  'AMD Radeon 610M',
  'AMD Radeon 660M',
  'AMD Radeon 780M',
];

// ---------------------------------------------------------------------------
// Display Panel Labels
// ---------------------------------------------------------------------------
export const DISPLAY_PANEL_LABELS: Record<string, string> = {
  ips: 'IPS LCD',
  oled: 'OLED',
  mini_led: 'Mini-LED',
  tn: 'TN',
  va: 'VA',
  amoled: 'AMOLED',
};

// ---------------------------------------------------------------------------
// Budget Ranges (INR)
// ---------------------------------------------------------------------------
export const BUDGET_RANGES: { label: string; min: number; max: number }[] = [
  { label: 'Ultra Budget (Under ₹30,000)', min: 0, max: 30000 },
  { label: 'Budget (₹30,000 – ₹50,000)', min: 30000, max: 50000 },
  { label: 'Mid-Range (₹50,000 – ₹80,000)', min: 50000, max: 80000 },
  { label: 'Upper Mid-Range (₹80,000 – ₹1,20,000)', min: 80000, max: 120000 },
  { label: 'Premium (₹1,20,000 – ₹1,80,000)', min: 120000, max: 180000 },
  { label: 'Flagship (Above ₹1,80,000)', min: 180000, max: Infinity },
];

// ---------------------------------------------------------------------------
// Default Scoring Weights
// ---------------------------------------------------------------------------
export const SCORING_WEIGHTS: Record<string, number> = {
  usage_compatibility: 0.25,
  performance: 0.20,
  budget_suitability: 0.15,
  durability: 0.10,
  battery_portability: 0.10,
  display: 0.08,
  upgradeability: 0.07,
  brand_warranty: 0.05,
};


// ---------------------------------------------------------------------------
// Scoring Weights & Reliability Aliases
// ---------------------------------------------------------------------------
export const DEFAULT_SCORING_WEIGHTS = SCORING_WEIGHTS;

export const BRAND_RELIABILITY_SCORES: Record<string, number> = {
  Apple: 92,
  Lenovo: 85,
  Dell: 83,
  HP: 80,
  ASUS: 82,
  MSI: 75,
  Samsung: 78,
  Acer: 72,
  Gigabyte: 70,
  Infinix: 55,
};

export const USE_CASE_REQUIREMENTS: Record<UseCaseTag, {
  min_ram: number;
  recommended_ram: number;
  gpu_needed: boolean;
  min_processor_tier_score: number;
  min_storage: number;
  battery_important: boolean;
  portability_important: boolean;
}> = {
  programming: { min_ram: 8, recommended_ram: 16, gpu_needed: false, min_processor_tier_score: 50, min_storage: 256, battery_important: true, portability_important: false },
  ai_ml: { min_ram: 16, recommended_ram: 32, gpu_needed: true, min_processor_tier_score: 65, min_storage: 512, battery_important: false, portability_important: false },
  cybersecurity: { min_ram: 16, recommended_ram: 32, gpu_needed: false, min_processor_tier_score: 55, min_storage: 512, battery_important: true, portability_important: true },
  gaming: { min_ram: 8, recommended_ram: 16, gpu_needed: true, min_processor_tier_score: 55, min_storage: 512, battery_important: false, portability_important: false },
  video_editing: { min_ram: 16, recommended_ram: 32, gpu_needed: true, min_processor_tier_score: 65, min_storage: 512, battery_important: false, portability_important: false },
  graphic_design: { min_ram: 16, recommended_ram: 16, gpu_needed: false, min_processor_tier_score: 55, min_storage: 256, battery_important: false, portability_important: false },
  office: { min_ram: 8, recommended_ram: 16, gpu_needed: false, min_processor_tier_score: 30, min_storage: 256, battery_important: true, portability_important: true },
  student: { min_ram: 8, recommended_ram: 16, gpu_needed: false, min_processor_tier_score: 30, min_storage: 256, battery_important: true, portability_important: true },
  browsing: { min_ram: 4, recommended_ram: 8, gpu_needed: false, min_processor_tier_score: 20, min_storage: 256, battery_important: true, portability_important: true },
  content_creation: { min_ram: 16, recommended_ram: 32, gpu_needed: true, min_processor_tier_score: 60, min_storage: 512, battery_important: false, portability_important: false },
  engineering_cad: { min_ram: 16, recommended_ram: 32, gpu_needed: true, min_processor_tier_score: 65, min_storage: 512, battery_important: false, portability_important: false },
  data_science: { min_ram: 16, recommended_ram: 32, gpu_needed: false, min_processor_tier_score: 55, min_storage: 512, battery_important: false, portability_important: false },
  virtual_machines: { min_ram: 16, recommended_ram: 32, gpu_needed: false, min_processor_tier_score: 55, min_storage: 512, battery_important: false, portability_important: false },
  multi_purpose: { min_ram: 8, recommended_ram: 16, gpu_needed: false, min_processor_tier_score: 45, min_storage: 256, battery_important: true, portability_important: false },
};
