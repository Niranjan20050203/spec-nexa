import { Laptop, UserPreferences, CategoryScores } from '../types';

/**
 * Score processor performance based on brand, tier, and generation (0-100)
 */
export function processorScore(processor: string, tier: string): number {
  const normalizedTier = tier?.toLowerCase() || '';
  const tierScores: Record<string, number> = {
    i3: 35,
    r3: 35,
    i5: 60,
    r5: 62,
    ultra5: 70,
    i7: 80,
    r7: 82,
    ultra7: 85,
    i9: 95,
    r9: 95,
    ultra9: 98,
    ryzen_ai: 80,
    m_series: 88,
  };

  let base = tierScores[normalizedTier] || 50;

  // Bonus for modern suffix / architecture
  const pUpper = processor.toUpperCase();
  if (pUpper.includes('HX') || pUpper.includes('M3 MAX') || pUpper.includes('M2 MAX')) {
    base = Math.min(100, base + 8);
  } else if (pUpper.includes('H') || pUpper.includes('HS') || pUpper.includes('M3 PRO') || pUpper.includes('M2 PRO')) {
    base = Math.min(100, base + 4);
  } else if (pUpper.includes('U')) {
    base = Math.max(30, base - 5); // Ultra-low power tuning
  }

  return base;
}

/**
 * Score GPU performance based on dedicated status, VRAM, and tier (0-100)
 */
export function gpuScore(gpu: string, dedicated: boolean, vram?: number): number {
  if (!dedicated) {
    const gpuLower = gpu.toLowerCase();
    if (gpuLower.includes('radeon 780m') || gpuLower.includes('radeon 680m')) return 35;
    if (gpuLower.includes('apple') || gpuLower.includes('m2') || gpuLower.includes('m3')) return 70;
    if (gpuLower.includes('iris xe') || gpuLower.includes('intel arc')) return 28;
    return 20; // Basic integrated
  }

  const gUpper = gpu.toUpperCase();
  let base = 50;

  if (gUpper.includes('4090')) base = 98;
  else if (gUpper.includes('4080')) base = 90;
  else if (gUpper.includes('4070')) base = 82;
  else if (gUpper.includes('4060')) base = 74;
  else if (gUpper.includes('4050')) base = 65;
  else if (gUpper.includes('3050')) base = 52;
  else if (gUpper.includes('2050')) base = 44;

  if (vram && vram >= 12) base = Math.min(100, base + 5);
  else if (vram && vram <= 4 && base > 50) base -= 5;

  return base;
}

/**
 * Score RAM capacity & configuration (0-100)
 */
export function ramScore(ram: number, dualChannel: boolean, upgradeable: boolean): number {
  let score = 40;
  if (ram >= 64) score = 100;
  else if (ram >= 32) score = 90;
  else if (ram >= 24) score = 80;
  else if (ram >= 16) score = 70;
  else if (ram >= 8) score = 45;
  else score = 25;

  if (dualChannel) score = Math.min(100, score + 5);
  if (upgradeable) score = Math.min(100, score + 5);

  return score;
}

/**
 * Score Storage capacity (0-100)
 */
export function storageScore(storage: number, upgradeable: boolean): number {
  let score = 50;
  if (storage >= 2000) score = 100;
  else if (storage >= 1000) score = 85;
  else if (storage >= 512) score = 65;
  else score = 40;

  if (upgradeable) score = Math.min(100, score + 8);
  return score;
}
