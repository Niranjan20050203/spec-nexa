// ============================================================
// SPEC NEXA - Formatting Utility Functions
// ============================================================

/**
 * Formats a number as Indian Rupee currency.
 * e.g., 79999 → "₹79,999"
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats weight in kilograms.
 * e.g., 1.8 → "1.8 kg"
 */
export function formatWeight(kg: number): string {
  return `${kg.toFixed(1)} kg`;
}

/**
 * Formats storage in GB or TB.
 * e.g., 512 → "512 GB SSD", 1024 → "1 TB SSD"
 */
export function formatStorage(gb: number): string {
  if (gb >= 1000) {
    const tb = gb / 1000;
    return `${Number.isInteger(tb) ? tb : tb.toFixed(1)} TB SSD`;
  }
  return `${gb} GB SSD`;
}

/**
 * Formats RAM in GB.
 * e.g., 16 → "16 GB"
 */
export function formatRAM(gb: number): string {
  return `${gb} GB`;
}

/**
 * Formats battery life in hours.
 * e.g., 10 → "~10 hours"
 */
export function formatBattery(hours: number): string {
  return `~${hours} hours`;
}

/**
 * Formats display refresh rate in Hz.
 * e.g., 144 → "144 Hz"
 */
export function formatRefreshRate(hz: number): string {
  return `${hz} Hz`;
}

/**
 * Formats a score to 1 decimal place.
 * e.g., 8.756 → "8.8"
 */
export function formatScore(score: number): string {
  return score.toFixed(1);
}

/**
 * Formats an ISO date string to a human-readable date.
 * e.g., "2026-11-03" → "Nov 3, 2026"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Returns a human-readable label and color for a verification status.
 */
export function getVerificationLabel(status: string): { label: string; color: string } {
  switch (status) {
    case 'verified_live':
      return { label: 'Verified Live', color: 'green' };
    case 'recently_verified':
      return { label: 'Recently Verified', color: 'blue' };
    case 'admin_updated':
      return { label: 'Admin Updated', color: 'yellow' };
    case 'sample_data':
      return { label: 'Sample Data', color: 'gray' };
    case 'price_unavailable':
      return { label: 'Price Unavailable', color: 'red' };
    default:
      return { label: 'Unknown', color: 'gray' };
  }
}

/**
 * Returns a human-readable label and color for a durability confidence level.
 */
export function getDurabilityConfidenceLabel(confidence: string): { label: string; color: string } {
  switch (confidence) {
    case 'high':
      return { label: 'High Confidence', color: 'green' };
    case 'medium':
      return { label: 'Medium Confidence', color: 'yellow' };
    case 'low':
      return { label: 'Low Confidence', color: 'orange' };
    case 'insufficient':
      return { label: 'Insufficient Data', color: 'red' };
    default:
      return { label: 'Unknown', color: 'gray' };
  }
}

/**
 * Validates a URL against a list of allowed Indian retailer domains.
 */
export function validateIndianRetailerURL(url: string): boolean {
  const allowedDomains = [
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

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, '');
    const pathname = parsedUrl.pathname;

    return allowedDomains.some((domain) => {
      if (domain.includes('/')) {
        // Domain with path prefix e.g. "asus.com/in"
        const [domainHost, ...pathParts] = domain.split('/');
        const pathPrefix = '/' + pathParts.join('/');
        return (
          (host === domainHost || host === `www.${domainHost}`) &&
          pathname.startsWith(pathPrefix)
        );
      }
      return host === domain || host === `www.${domain}`;
    });
  } catch {
    return false;
  }
}
