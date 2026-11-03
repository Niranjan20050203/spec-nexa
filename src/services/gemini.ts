import { Laptop, UserPreferences } from '../types';

const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export const isGeminiConfigured = Boolean(GEMINI_API_KEY && GEMINI_API_KEY.length > 5);

/**
 * Generate human-like buying advice using Gemini with rule-based fallback
 */
export async function generateLaptopExplanation(laptop: Laptop, preferences?: Partial<UserPreferences>): Promise<string> {
  if (!isGeminiConfigured) {
    return `The ${laptop.brand} ${laptop.model} is a well-balanced Indian retail choice priced at ₹${laptop.price_inr.toLocaleString('en-IN')}. Powered by ${laptop.processor} with ${laptop.ram}GB RAM and ${laptop.gpu}, it delivers solid performance and durability (${laptop.durability_score}/10) for your workload.`;
  }

  try {
    const prompt = `You are SPEC NEXA's laptop intelligence advisor for India. In 3 concise, highly professional sentences, explain why the ${laptop.brand} ${laptop.model} (priced at ₹${laptop.price_inr.toLocaleString('en-IN')}) with ${laptop.processor}, ${laptop.ram}GB RAM, ${laptop.gpu}, and a durability score of ${laptop.durability_score}/10 fits the user's requirements. Mention value for money in INR. Do not invent unverified features.`;

    const res = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!res.ok) throw new Error(`Gemini status ${res.status}`);
    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidateText || `The ${laptop.brand} ${laptop.model} offers strong specifications for ₹${laptop.price_inr.toLocaleString('en-IN')}.`;
  } catch (err) {
    console.warn('Gemini explanation fallback active:', err);
    return `The ${laptop.brand} ${laptop.model} provides dependable compute capabilities with its ${laptop.processor} and ${laptop.durability_score}/10 chassis design.`;
  }
}

/**
 * Chat with SPEC NEXA AI assistant
 */
export async function chatWithAssistant(
  message: string,
  context: { laptops?: Laptop[]; preferences?: Partial<UserPreferences>; history?: Array<{ role: string; content: string }> }
): Promise<string> {
  if (!isGeminiConfigured) {
    // Helpful rule-based fallback responses for common Indian laptop queries
    const lower = message.toLowerCase();
    if (lower.includes('gaming') && (lower.includes('under') || lower.includes('budget') || lower.includes('1 lakh') || lower.includes('60'))) {
      return `For gaming in India, models equipped with NVIDIA RTX 4050 or RTX 4060 (such as the ASUS TUF F15 or HP Victus 15) provide the best balance of thermal headroom and high-refresh gameplay around ₹65,000 to ₹95,000. Look for at least 16GB dual-channel RAM and 75W+ GPU TGP.`;
    }
    if (lower.includes('programming') || lower.includes('coding') || lower.includes('developer')) {
      return `For software development, prioritize at least 16GB RAM (preferably upgradeable), a multi-core processor (Intel Core i5/i7 H-series or AMD Ryzen 7), and an SSD with at least 512GB NVMe storage. Lenovo ThinkPad E14 and IdeaPad Slim 5 are excellent choices under ₹75,000.`;
    }
    if (lower.includes('ram') || lower.includes('16gb')) {
      return `16GB of RAM is the modern standard for programming, multitasking, and creative workflows in 2026. If you're doing heavy containerization (Docker, Kubernetes) or running virtual machines, check if the laptop has expandable SODIMM slots up to 32GB or 64GB.`;
    }
    if (lower.includes('durability') || lower.includes('build quality') || lower.includes('hinge')) {
      return `Durability depends heavily on chassis composition (aluminum vs polycarbonate) and hinge structure. Laptops with MIL-STD-810H certifications like the ASUS TUF, Lenovo ThinkPad, and Dell XPS line provide significantly better structural rigidity over 3-5 years of Indian commutes.`;
    }
    return `SPEC NEXA AI Advisor: I have analyzed your query based on our Indian laptop database. For accurate recommendations, try filtering by your exact maximum budget in INR and primary workload in the "Find My Laptop" questionnaire.`;
  }

  try {
    const systemPrompt = `You are SPEC NEXA AI, an elite laptop intelligence and smart buyer advisor exclusively for the Indian market. All prices must be in Indian Rupees (₹ INR). Never quote USD or foreign retailers. Ground your answers in real Indian retail availability (Amazon India, Flipkart, Croma, Brand stores). Be honest, concise, and helpful.`;

    const contents = [
      { parts: [{ text: `${systemPrompt}\nUser Question: ${message}` }] },
    ];

    const res = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });

    if (!res.ok) throw new Error('API request failed');
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
  } catch (err) {
    return `SPEC NEXA Advisor: Currently running on local algorithmic intelligence. For detailed recommendations, navigate to the Find My Laptop wizard to see calculated match scores and top 10 rankings.`;
  }
}
