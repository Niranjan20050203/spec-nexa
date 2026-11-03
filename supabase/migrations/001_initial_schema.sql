-- ============================================================
-- SPEC NEXA - PostgreSQL Database Schema (Supabase)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Laptops Table (Strict Indian Retail Database)
CREATE TABLE IF NOT EXISTS public.laptops (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  exact_configuration TEXT NOT NULL,
  processor TEXT NOT NULL,
  processor_generation TEXT,
  processor_brand TEXT CHECK (processor_brand IN ('intel', 'amd', 'apple')),
  processor_tier TEXT,
  ram INTEGER NOT NULL,
  ram_type TEXT,
  ram_upgradeable BOOLEAN DEFAULT FALSE,
  storage INTEGER NOT NULL,
  storage_type TEXT DEFAULT 'NVMe SSD',
  storage_upgradeable BOOLEAN DEFAULT FALSE,
  dual_channel BOOLEAN DEFAULT FALSE,
  gpu TEXT NOT NULL,
  gpu_brand TEXT CHECK (gpu_brand IN ('nvidia', 'amd', 'intel', 'apple', 'integrated')),
  gpu_vram INTEGER,
  gpu_dedicated BOOLEAN DEFAULT FALSE,
  display_size DECIMAL(4,1) NOT NULL,
  display_resolution TEXT NOT NULL,
  display_panel TEXT CHECK (display_panel IN ('ips', 'oled', 'mini_led', 'tn', 'va', 'amoled')),
  refresh_rate INTEGER DEFAULT 60,
  color_accuracy INTEGER,
  battery_capacity INTEGER,
  estimated_battery_life DECIMAL(4,1),
  weight DECIMAL(4,2),
  chassis_material TEXT,
  cooling_information TEXT,
  durability_score DECIMAL(3,1) CHECK (durability_score >= 0 AND durability_score <= 10),
  durability_confidence TEXT CHECK (durability_confidence IN ('high', 'medium', 'low', 'insufficient')),
  durability_notes TEXT,
  mil_std_810h BOOLEAN DEFAULT FALSE,
  warranty TEXT,
  operating_system TEXT,
  linux_compatible BOOLEAN DEFAULT FALSE,
  virtualization_support BOOLEAN DEFAULT FALSE,
  product_image TEXT,
  retailer TEXT NOT NULL,
  retailer_domain TEXT NOT NULL,
  price_inr INTEGER NOT NULL,
  product_url TEXT NOT NULL,
  data_source TEXT DEFAULT 'admin_entered',
  verification_status TEXT DEFAULT 'sample_data',
  last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  is_available BOOLEAN DEFAULT TRUE,
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  use_cases TEXT[] DEFAULT '{}',
  category_tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. User Saved Laptops
CREATE TABLE IF NOT EXISTS public.saved_laptops (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  laptop_id UUID REFERENCES public.laptops(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, laptop_id)
);

-- 4. User Questionnaire History & Preferences
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  preferences JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Row Level Security Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laptops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_laptops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Laptops: Public can read available laptops; only authenticated admins can write
CREATE POLICY "Public laptops viewable by all" ON public.laptops
  FOR SELECT USING (is_available = true);

-- Profiles: Users can read and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Saved Laptops: Users manage only their own bookmarks
CREATE POLICY "Users manage own saved laptops" ON public.saved_laptops
  FOR ALL USING (auth.uid() = user_id);
