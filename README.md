# SPEC NEXA
> **Your Specs. Your Budget. Your Perfect Laptop.**

AI-powered laptop discovery, intelligence, comparison, and personalized buying recommendation platform strictly engineered for the Indian market.

---

## 🇮🇳 Target Market & Currency Rules
- **Market:** India ONLY.
- **Currency:** Indian Rupees (₹ INR) exclusively.
- **Retailers:** Amazon India (`amazon.in`), Flipkart (`flipkart.com`), Croma (`croma.com`), Reliance Digital (`reliancedigital.in`), and official Indian brand storefronts.
- **Development Budget:** ₹0 (built using Vite, React, Tailwind CSS, Supabase free tier, and Google Gemini API).

---

## 🚀 Key Features

1. **Intelligent Multi-Step Questionnaire Wizard**
   - 8-step structured assessment: Primary workload, Budget (with strict/flexibility bounds), Processors, RAM & storage upgradeability, Dedicated graphics & CUDA, Display size & refresh rate, and Dynamic importance sliders.
2. **Deterministic Recommendation Engine**
   - Transparent 8-dimensional weighted scoring: Usage compatibility (25%), Performance (20%), Budget suitability (15%), Durability (15%), Battery & portability (10%), Display (5%), Upgradeability (5%), Brand & warranty (5%).
   - Dynamic priority adaptation (e.g., automatically boosting GPU/cooling weights for gaming and CAD workloads).
   - Generates top 10 ranked laptops with honest justifications, pros/cons, and verified Indian retail prices.
3. **Laptop Durability Intelligence**
   - Assesses chassis rigidity, hinge construction, cooling heat pipes, RAM/SSD upgradability, and verified MIL-STD-810H certifications.
4. **Side-by-Side Comparison Engine**
   - Compare up to 4 laptops with spec-by-spec comparison and direct purchase links.
5. **SPEC NEXA AI Assistant**
   - Dual-mode chat advisor powered by Google Gemini API with intelligent local rule-based fallback when offline or without an API key.
6. **Product Catalog & Management**
   - 30+ meticulously compiled Indian retail laptops with realistic INR prices, specifications, and data verification indicators.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Framer Motion
- **State Management & Routing:** React Router v6, React Hot Toast, TanStack Query
- **Backend & Database:** Supabase (PostgreSQL, Row Level Security, Auth)
- **AI Engine:** Google Gemini API (`gemini-1.5-flash`) via Google AI Studio
- **Styling:** Custom dark SaaS design system (Background `#080D18`, Surface `#111827`, Primary `#2563EB`, Secondary `#06B6D4`)

---

## 💻 Local Setup & Execution Guide

### Prerequisites
1. Download and install **Node.js (v18+)** from [nodejs.org](https://nodejs.org/).

### Installation
Open **PowerShell** or your terminal inside the project directory:

```powershell
# 1. Install dependencies
npm install

# 2. Configure environment variables (optional)
Copy-Item .env.example .env

# 3. Start the development server
npm run dev
```

Visit `http://localhost:3000` to interact with SPEC NEXA.

---

## 🌐 Free Tier Deployment (Vercel)

1. Push your repository to **GitHub**.
2. Visit [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Set build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. (Optional) Add your `VITE_GEMINI_API_KEY` and Supabase keys under **Environment Variables**.
6. Click **Deploy**.

---

## 📜 License
MIT License. Built for Indian consumers and tech enthusiasts.
