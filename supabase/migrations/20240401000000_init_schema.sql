-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create amenities_master table
CREATE TABLE IF NOT EXISTS amenities_master (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50),
  icon VARCHAR(50)
);

-- Seed amenities_master
INSERT INTO amenities_master (name, category, icon) VALUES
('WiFi', 'Connectivity', 'wifi'),
('Parking', 'Convenience', 'parking'),
('Swimming Pool', 'Leisure', 'pool'),
('24/7 Security', 'Safety', 'shield'),
('Housekeeping', 'Service', 'cleaning'),
('Gym', 'Health', 'dumbbell'),
('Garden', 'Leisure', 'flower'),
('Power Backup', 'Utilities', 'battery'),
('Lift', 'Convenience', 'elevator')
ON CONFLICT (name) DO NOTHING;

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(15),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  property_name VARCHAR(200) NOT NULL,
  property_type VARCHAR(20) NOT NULL CHECK (property_type IN ('rent', 'sell', 'pg')),
  location TEXT NOT NULL,
  price DECIMAL(12,2) NOT NULL CHECK (price > 0),
  deposit DECIMAL(12,2),
  bedrooms INTEGER CHECK (bedrooms >= 0),
  bathrooms INTEGER CHECK (bathrooms >= 0),
  area_sqft DECIMAL(10,2) NOT NULL CHECK (area_sqft > 0),
  description TEXT CHECK (char_length(description) <= 1800),
  amenities JSONB,
  landmarks JSONB,
  show_contact BOOLEAN DEFAULT false,
  contact_number VARCHAR(255), -- Encrypted storage intended
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'sold', 'rented')),
  images JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_verified BOOLEAN DEFAULT false
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  lister_user_id UUID REFERENCES profiles(id),
  enquirer_name VARCHAR(100) NOT NULL,
  enquirer_email VARCHAR(255) NOT NULL,
  enquirer_phone VARCHAR(15) NOT NULL,
  message TEXT NOT NULL CHECK (char_length(message) <= 1000),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON properties(user_id);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties USING GIN (location gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_enquiries_property_id ON enquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_lister_user_id ON enquiries(lister_user_id);

-- RLS Policies

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Properties
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active properties are viewable by everyone"
ON properties FOR SELECT
USING (status = 'active');

CREATE POLICY "Users can view their own non-active properties"
ON properties FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own properties"
ON properties FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own properties"
ON properties FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own properties"
ON properties FOR DELETE
USING (auth.uid() = user_id);

-- Enquiries
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Listers can view enquiries for their properties"
ON enquiries FOR SELECT
USING (auth.uid() = lister_user_id);

CREATE POLICY "Anyone can create enquiries"
ON enquiries FOR INSERT
WITH CHECK (true); 

CREATE POLICY "Listers can update enquiry status"
ON enquiries FOR UPDATE
USING (auth.uid() = lister_user_id);

-- Trigger to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
