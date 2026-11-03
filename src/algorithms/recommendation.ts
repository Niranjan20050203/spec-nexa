import { Laptop, UserPreferences, Recommendation, CategoryScores, RecommendationLabel } from '../types';
import { processorScore, gpuScore, ramScore, storageScore } from './scoring';
import { DEFAULT_SCORING_WEIGHTS, BRAND_RELIABILITY_SCORES, USE_CASE_REQUIREMENTS } from '../utils/constants';

/**
 * Filter laptops based on Indian availability and hard constraints
 */
export function filterLaptops(laptops: Laptop[], preferences: UserPreferences): Laptop[] {
  return laptops.filter((laptop) => {
    // Only available laptops in India
    if (!laptop.is_available) return false;

    // Budget check with flexibility mode
    let maxBudget = preferences.budget_max;
    if (preferences.budget_flexibility === 'flex_5') {
      maxBudget *= 1.05;
    } else if (preferences.budget_flexibility === 'flex_10') {
      maxBudget *= 1.10;
    }
    if (laptop.price_inr > maxBudget) return false;
    if (preferences.budget_min && laptop.price_inr < preferences.budget_min) return false;

    // GPU Dedicated mandatory check
    if (preferences.gpu_dedicated_mandatory && !laptop.gpu_dedicated) {
      return false;
    }

    // CUDA required check
    if (preferences.cuda_required && laptop.gpu_brand !== 'nvidia') {
      return false;
    }

    // Minimum RAM check
    if (preferences.ram_minimum && laptop.ram < preferences.ram_minimum) {
      return false;
    }

    // Minimum Storage check
    if (preferences.storage_minimum && laptop.storage < preferences.storage_minimum) {
      return false;
    }

    // Preferred Brands (if user specified any specific brands)
    if (preferences.preferred_brands && preferences.preferred_brands.length > 0 && !preferences.preferred_brands.includes('No preference')) {
      const matchBrand = preferences.preferred_brands.some(
        (b) => b.toLowerCase() === laptop.brand.toLowerCase()
      );
      if (!matchBrand) return false;
    }

    // Operating System preference
    if (preferences.operating_system && preferences.operating_system.length > 0 && !preferences.operating_system.includes('No preference')) {
      const matchOS = preferences.operating_system.some((os) => {
        const o = os.toLowerCase();
        if (o.includes('mac') && laptop.brand === 'Apple') return true;
        if (o.includes('windows') && laptop.operating_system.toLowerCase().includes('windows')) return true;
        if (o.includes('linux') && (laptop.linux_compatible || laptop.operating_system.toLowerCase().includes('linux'))) return true;
        return false;
      });
      if (!matchOS) return false;
    }

    return true;
  });
}

/**
 * Calculate Usage Compatibility Score (0-100)
 */
export function scoreUsageCompatibility(laptop: Laptop, preferences: UserPreferences): number {
  if (!preferences.usage || preferences.usage.length === 0) return 80;

  let totalScore = 0;
  for (const usage of preferences.usage) {
    const req = USE_CASE_REQUIREMENTS[usage];
    let score = 70;

    // Direct use-case tag match
    if (laptop.use_cases.includes(usage)) {
      score += 20;
    }

    // Check RAM satisfaction
    if (req) {
      if (laptop.ram >= req.recommended_ram) score += 10;
      else if (laptop.ram < req.min_ram) score -= 25;

      // Check GPU requirement
      if (req.gpu_needed) {
        if (laptop.gpu_dedicated) score += 10;
        else score -= 30;
      }

      // Check storage
      if (laptop.storage < req.min_storage) score -= 15;
    }

    totalScore += Math.max(10, Math.min(100, score));
  }

  return Math.round(totalScore / preferences.usage.length);
}

/**
 * Calculate Performance Score (0-100)
 */
export function scorePerformance(laptop: Laptop, preferences: UserPreferences): number {
  const cpu = processorScore(laptop.processor, laptop.processor_tier);
  const gpu = gpuScore(laptop.gpu, laptop.gpu_dedicated, laptop.gpu_vram);
  const ram = ramScore(laptop.ram, laptop.dual_channel, laptop.ram_upgradeable);
  const storage = storageScore(laptop.storage, laptop.storage_upgradeable);

  // If gaming or AI is selected, GPU weight is higher
  const isGpuHeavy = preferences.usage?.some((u) => ['gaming', 'ai_ml', 'video_editing', 'engineering_cad'].includes(u));

  if (isGpuHeavy) {
    return Math.round(cpu * 0.35 + gpu * 0.40 + ram * 0.15 + storage * 0.10);
  }
  return Math.round(cpu * 0.50 + gpu * 0.15 + ram * 0.25 + storage * 0.10);
}

/**
 * Calculate Budget Suitability Score (0-100)
 */
export function scoreBudget(laptop: Laptop, preferences: UserPreferences): number {
  const max = preferences.budget_max;
  if (!max || max <= 0) return 85;

  const ratio = laptop.price_inr / max;
  if (ratio <= 0.85) return 95; // Great savings within budget
  if (ratio <= 1.0) return 90; // Fits well within budget
  if (ratio <= 1.05) return 70; // 5% slight stretch
  if (ratio <= 1.10) return 55; // 10% stretch
  return 30;
}

/**
 * Calculate Durability Score (0-100)
 */
export function scoreDurability(laptop: Laptop): number {
  let score = laptop.durability_score * 10;
  if (laptop.mil_std_810h) score = Math.min(100, score + 5);
  return Math.round(score);
}

/**
 * Calculate Battery and Portability Score (0-100)
 */
export function scoreBatteryPortability(laptop: Laptop, preferences: UserPreferences): number {
  let batteryScore = Math.min(100, (laptop.estimated_battery_life / 14) * 100);
  let weightScore = 50;
  if (laptop.weight <= 1.3) weightScore = 100;
  else if (laptop.weight <= 1.6) weightScore = 85;
  else if (laptop.weight <= 2.0) weightScore = 70;
  else if (laptop.weight <= 2.4) weightScore = 55;
  else weightScore = 40;

  if (preferences.battery_minimum && laptop.estimated_battery_life < preferences.battery_minimum) {
    batteryScore = Math.max(20, batteryScore - 25);
  }

  return Math.round(batteryScore * 0.6 + weightScore * 0.4);
}

/**
 * Calculate Display Score (0-100)
 */
export function scoreDisplay(laptop: Laptop, preferences: UserPreferences): number {
  let score = 60;
  if (laptop.display_panel === 'oled' || laptop.display_panel === 'amoled') score += 25;
  else if (laptop.display_panel === 'mini_led') score += 25;
  else if (laptop.display_panel === 'ips') score += 15;

  if (laptop.refresh_rate >= 144) score += 15;
  else if (laptop.refresh_rate >= 90) score += 10;

  if (laptop.color_accuracy && laptop.color_accuracy >= 99) score += 10;
  return Math.min(100, Math.round(score));
}

/**
 * Calculate Upgradeability Score (0-100)
 */
export function scoreUpgradeability(laptop: Laptop): number {
  let score = 40;
  if (laptop.ram_upgradeable) score += 30;
  if (laptop.storage_upgradeable) score += 20;
  if (laptop.dual_channel) score += 10;
  return Math.min(100, score);
}

/**
 * Calculate Brand and Warranty Score (0-100)
 */
export function scoreBrandWarranty(laptop: Laptop): number {
  const brandScore = BRAND_RELIABILITY_SCORES[laptop.brand] || 75;
  let warrantyBonus = 0;
  if (laptop.warranty.includes('2 Year') || laptop.warranty.includes('3 Year')) warrantyBonus = 10;
  return Math.min(100, brandScore + warrantyBonus);
}

/**
 * Adapt dynamic category weights according to user priorities
 */
export function adaptWeights(preferences: UserPreferences): Record<keyof CategoryScores, number> {
  const weights = { ...DEFAULT_SCORING_WEIGHTS } as unknown as Record<keyof CategoryScores, number>;

  const priorities = preferences.priorities || ({} as any);

  // If gaming is high priority
  if ((priorities.gaming || 0) >= 4) {
    weights.performance += 0.08;
    weights.display += 0.04;
    weights.battery_portability = Math.max(0.05, weights.battery_portability - 0.06);
  }

  // If battery life is high priority
  if ((priorities.battery || 0) >= 4 || (priorities.portability || 0) >= 4) {
    weights.battery_portability += 0.10;
    weights.performance = Math.max(0.12, weights.performance - 0.05);
  }

  // If durability is high priority
  if ((priorities.durability || 0) >= 4) {
    weights.durability += 0.08;
  }

  // Normalize total weights to 1.0
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);
  for (const k of Object.keys(weights) as (keyof CategoryScores)[]) {
    weights[k] = weights[k] / sum;
  }

  return weights;
}

/**
 * Generate human-readable transparent explanation
 */
export function generateExplanation(laptop: Laptop, preferences: UserPreferences, scores: CategoryScores) {
  const why_matches: string[] = [];
  const requirements_met: string[] = [];
  const requirements_not_met: string[] = [];
  const compromises: string[] = [];

  // Match points
  if (scores.usage_compatibility >= 80) {
    why_matches.push(`Optimized architecture for your selected workflow (${preferences.usage.join(', ')})`);
  }
  if (laptop.price_inr <= preferences.budget_max) {
    why_matches.push(`Comfortably fits within your ₹${preferences.budget_max.toLocaleString('en-IN')} budget`);
    requirements_met.push('Budget requirement');
  } else {
    requirements_not_met.push(`Slightly exceeds strict budget by ₹${(laptop.price_inr - preferences.budget_max).toLocaleString('en-IN')}`);
  }

  if (laptop.ram >= preferences.ram_minimum) {
    requirements_met.push(`${laptop.ram}GB RAM requirement met`);
  } else {
    requirements_not_met.push(`Has ${laptop.ram}GB RAM (target was ${preferences.ram_minimum}GB)`);
  }

  if (preferences.gpu_dedicated_mandatory) {
    if (laptop.gpu_dedicated) requirements_met.push(`Dedicated GPU (${laptop.gpu}) available`);
    else compromises.push('Lacks dedicated GPU graphics');
  }

  if (laptop.durability_score >= 8.0) {
    why_matches.push(`Superior structural durability with ${laptop.durability_score}/10 rating`);
  }

  // Compromises
  if (!laptop.ram_upgradeable) {
    compromises.push('Soldered RAM (no future RAM upgrade possible)');
  }
  if (laptop.weight > 2.2) {
    compromises.push(`Heavier build at ${laptop.weight}kg`);
  }
  if (laptop.estimated_battery_life < 6) {
    compromises.push(`Modest battery endurance (~${laptop.estimated_battery_life} hours on standard loads)`);
  }

  const budget_status =
    laptop.price_inr <= preferences.budget_max
      ? ('within' as const)
      : laptop.price_inr <= preferences.budget_max * 1.05
      ? ('slightly_over' as const)
      : ('over' as const);

  const strongest_advantage =
    scores.performance >= 85
      ? `High-performance ${laptop.processor} processor & ${laptop.gpu}`
      : scores.durability >= 85
      ? `Exceptional ${laptop.chassis_material} chassis and build quality`
      : scores.battery_portability >= 85
      ? `Impressive ~${laptop.estimated_battery_life} hr battery life & compact form factor`
      : `Outstanding value for money in the Indian market`;

  const main_weakness =
    compromises.length > 0 ? compromises[0] : 'Relatively standard refresh rate and color gamut';

  return {
    why_matches: why_matches.slice(0, 3),
    requirements_met,
    requirements_not_met,
    compromises,
    budget_status,
    strongest_advantage,
    main_weakness,
  };
}

/**
 * Assign honest recommendation labels
 */
export function assignLabels(recommendations: Recommendation[]): Recommendation[] {
  if (recommendations.length === 0) return recommendations;

  // Best Overall = top score
  recommendations[0].label = 'best_overall';

  // Best Performance
  let topPerfIdx = 0;
  let maxPerf = -1;
  // Best Value
  let topValueIdx = 0;
  let maxValue = -1;
  // Best Battery
  let topBatteryIdx = 0;
  let maxBattery = -1;
  // Best Durability
  let topDurabilityIdx = 0;
  let maxDurability = -1;

  recommendations.forEach((rec, idx) => {
    if (rec.category_scores.performance > maxPerf) {
      maxPerf = rec.category_scores.performance;
      topPerfIdx = idx;
    }
    const valueRatio = rec.match_score / (rec.laptop.price_inr / 10000);
    if (valueRatio > maxValue) {
      maxValue = valueRatio;
      topValueIdx = idx;
    }
    if (rec.category_scores.battery_portability > maxBattery) {
      maxBattery = rec.category_scores.battery_portability;
      topBatteryIdx = idx;
    }
    if (rec.category_scores.durability > maxDurability) {
      maxDurability = rec.category_scores.durability;
      topDurabilityIdx = idx;
    }
  });

  if (topPerfIdx !== 0 && !recommendations[topPerfIdx].label) recommendations[topPerfIdx].label = 'best_performance';
  if (topValueIdx !== 0 && !recommendations[topValueIdx].label) recommendations[topValueIdx].label = 'best_value';
  if (topBatteryIdx !== 0 && !recommendations[topBatteryIdx].label) recommendations[topBatteryIdx].label = 'best_battery';
  if (topDurabilityIdx !== 0 && !recommendations[topDurabilityIdx].label) recommendations[topDurabilityIdx].label = 'best_durability';

  return recommendations;
}

/**
 * Main Algorithm: Computes top 10 ranked recommendations
 */
export function getRecommendations(laptops: Laptop[], preferences: UserPreferences): Recommendation[] {
  // Step 1: Filter out ineligible products
  const eligible = filterLaptops(laptops, preferences);

  // If no strict matches, return empty so UI can provide filter relaxation guidance
  if (eligible.length === 0) return [];

  const weights = adaptWeights(preferences);

  // Step 2: Score each laptop across all 8 dimensions
  const scoredRecommendations: Recommendation[] = eligible.map((laptop) => {
    const category_scores: CategoryScores = {
      usage_compatibility: scoreUsageCompatibility(laptop, preferences),
      performance: scorePerformance(laptop, preferences),
      budget_suitability: scoreBudget(laptop, preferences),
      durability: scoreDurability(laptop),
      battery_portability: scoreBatteryPortability(laptop, preferences),
      display: scoreDisplay(laptop, preferences),
      upgradeability: scoreUpgradeability(laptop),
      brand_warranty: scoreBrandWarranty(laptop),
    };

    const match_score = Math.round(
      category_scores.usage_compatibility * weights.usage_compatibility +
      category_scores.performance * weights.performance +
      category_scores.budget_suitability * weights.budget_suitability +
      category_scores.durability * weights.durability +
      category_scores.battery_portability * weights.battery_portability +
      category_scores.display * weights.display +
      category_scores.upgradeability * weights.upgradeability +
      category_scores.brand_warranty * weights.brand_warranty
    );

    const explanation = generateExplanation(laptop, preferences, category_scores);

    return {
      laptop,
      match_score: Math.min(99, Math.max(30, match_score)),
      category_scores,
      ...explanation,
    };
  });

  // Step 3: Sort descending by match score and take top 10
  scoredRecommendations.sort((a, b) => b.match_score - a.match_score);
  const top10 = scoredRecommendations.slice(0, 10);

  // Step 4: Assign transparent performance/value labels
  return assignLabels(top10);
}
