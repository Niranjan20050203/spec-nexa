// ============================================================
// SPEC NEXA - TypeScript Type Definitions
// ============================================================

export type VerificationStatus =
  | 'verified_live'
  | 'recently_verified'
  | 'admin_updated'
  | 'sample_data'
  | 'price_unavailable';

export type DurabilityConfidence = 'high' | 'medium' | 'low' | 'insufficient';

export type DataSource =
  | 'brand_official'
  | 'retailer_feed'
  | 'admin_entered'
  | 'user_submitted'
  | 'aggregated';

export interface Laptop {
  id: string;
  brand: string;
  model: string;
  exact_configuration: string;
  processor: string;
  processor_generation: string;
  processor_brand: 'intel' | 'amd' | 'apple';
  processor_tier: 'i3' | 'i5' | 'i7' | 'i9' | 'ultra5' | 'ultra7' | 'ultra9' | 'r3' | 'r5' | 'r7' | 'r9' | 'ryzen_ai' | 'm_series';
  ram: number; // GB
  ram_type: string;
  ram_upgradeable: boolean;
  storage: number; // GB
  storage_type: string;
  storage_upgradeable: boolean;
  dual_channel: boolean;
  gpu: string;
  gpu_brand: 'nvidia' | 'amd' | 'intel' | 'apple' | 'integrated';
  gpu_vram?: number; // GB
  gpu_dedicated: boolean;
  display_size: number; // inches
  display_resolution: string;
  display_panel: 'ips' | 'oled' | 'mini_led' | 'tn' | 'va' | 'amoled';
  refresh_rate: number; // Hz
  color_accuracy?: number; // sRGB %
  battery_capacity: number; // Wh
  estimated_battery_life: number; // hours
  weight: number; // kg
  chassis_material: string;
  cooling_information: string;
  durability_score: number; // 0-10
  durability_confidence: DurabilityConfidence;
  durability_notes: string;
  mil_std_810h: boolean;
  warranty: string;
  operating_system: string;
  linux_compatible: boolean;
  virtualization_support: boolean;
  product_image: string;
  retailer: string;
  retailer_domain: string;
  price_inr: number;
  product_url: string;
  data_source: DataSource;
  verification_status: VerificationStatus;
  last_verified_at: string;
  created_at: string;
  updated_at: string;
  is_available: boolean;
  pros: string[];
  cons: string[];
  use_cases: UseCaseTag[];
  category_tags: string[];
}

export type UseCaseTag =
  | 'programming'
  | 'ai_ml'
  | 'cybersecurity'
  | 'gaming'
  | 'video_editing'
  | 'graphic_design'
  | 'office'
  | 'student'
  | 'browsing'
  | 'content_creation'
  | 'engineering_cad'
  | 'data_science'
  | 'virtual_machines'
  | 'multi_purpose';

export interface UserPreferences {
  usage: UseCaseTag[];
  budget_min: number;
  budget_max: number;
  budget_flexibility: 'strict' | 'flex_5' | 'flex_10';
  processor_preference: string[];
  ram_minimum: number;
  ram_upgradeable_important: boolean;
  storage_minimum: number;
  storage_upgradeable_important: boolean;
  dual_channel_preferred: boolean;
  gpu_preference: string[];
  gpu_dedicated_mandatory: boolean;
  cuda_required: boolean;
  gpu_intensive: boolean;
  display_size_preference: number[];
  display_resolution: string[];
  display_panel: string[];
  refresh_rate_minimum: number;
  color_accuracy_important: boolean;
  priorities: PriorityMap;
  preferred_brands: string[];
  operating_system: string[];
  max_weight?: number;
  battery_minimum: number;
  other_factors: string[];
}

export type PriorityKey =
  | 'performance'
  | 'battery'
  | 'durability'
  | 'portability'
  | 'display'
  | 'gaming'
  | 'cooling'
  | 'upgradeability'
  | 'brand_reliability'
  | 'after_sales'
  | 'value_for_money';

export type PriorityMap = Record<PriorityKey, number>; // 1-5 scale

export interface CategoryScores {
  usage_compatibility: number;
  performance: number;
  budget_suitability: number;
  durability: number;
  battery_portability: number;
  display: number;
  upgradeability: number;
  brand_warranty: number;
}

export interface Recommendation {
  laptop: Laptop;
  match_score: number;
  category_scores: CategoryScores;
  label?: RecommendationLabel;
  why_matches: string[];
  requirements_met: string[];
  requirements_not_met: string[];
  compromises: string[];
  budget_status: 'within' | 'slightly_over' | 'over';
  strongest_advantage: string;
  main_weakness: string;
  ai_explanation?: string;
}

export type RecommendationLabel =
  | 'best_overall'
  | 'best_performance'
  | 'best_value'
  | 'best_durability'
  | 'best_battery'
  | 'best_budget';

export interface ComparisonItem {
  laptop: Laptop;
  scores?: CategoryScores;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  is_admin: boolean;
  created_at: string;
}

export interface SavedLaptop {
  id: string;
  user_id: string;
  laptop_id: string;
  laptop?: Laptop;
  created_at: string;
}

export interface PriceHistory {
  id: string;
  laptop_id: string;
  retailer: string;
  price_inr: number;
  verification_status: VerificationStatus;
  recorded_at: string;
}

export interface ProductSource {
  id: string;
  laptop_id: string;
  source_name: string;
  source_url: string;
  source_type: 'brand' | 'retailer' | 'review' | 'specification_sheet';
  verified_at: string;
}

export interface QuestionnaireState {
  step: number;
  preferences: Partial<UserPreferences>;
  completed: boolean;
}

export interface FilterOptions {
  brands: string[];
  price_min?: number;
  price_max?: number;
  processor_brands: string[];
  gpu_types: string[];
  ram_min?: number;
  storage_min?: number;
  display_sizes: number[];
  refresh_rates: number[];
  use_cases: UseCaseTag[];
  sort_by: SortOption;
}

export type SortOption =
  | 'price_asc'
  | 'price_desc'
  | 'performance'
  | 'value'
  | 'durability'
  | 'battery'
  | 'match_score';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  is_loading?: boolean;
}

export interface ToastOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface AdminStats {
  total_laptops: number;
  available_laptops: number;
  verified_laptops: number;
  brands_count: number;
  last_updated: string;
}
