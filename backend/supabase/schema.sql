-- Snackify Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor to create the tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Snacks table
CREATE TABLE IF NOT EXISTS snacks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  country VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('main', 'snack', 'dessert', 'soup', 'street food')),
  image_url TEXT NOT NULL,
  photographer VARCHAR(200),
  tags TEXT[], -- Array of tags
  base_taste_rating DECIMAL(3,1) DEFAULT 3.0 CHECK (base_taste_rating >= 1 AND base_taste_rating <= 5),
  base_spiciness_rating DECIMAL(3,1) DEFAULT 1.0 CHECK (base_spiciness_rating >= 1 AND base_spiciness_rating <= 5),
  base_uniqueness_rating DECIMAL(3,1) DEFAULT 3.0 CHECK (base_uniqueness_rating >= 1 AND base_uniqueness_rating <= 5),
  base_rating_count INTEGER DEFAULT 1 CHECK (base_rating_count >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  snack_id INTEGER NOT NULL REFERENCES snacks(id) ON DELETE CASCADE,
  taste INTEGER NOT NULL CHECK (taste >= 1 AND taste <= 5),
  spiciness INTEGER NOT NULL CHECK (spiciness >= 1 AND spiciness <= 5),
  uniqueness INTEGER NOT NULL CHECK (uniqueness >= 1 AND uniqueness <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  snack_id INTEGER NOT NULL REFERENCES snacks(id) ON DELETE CASCADE,
  text TEXT NOT NULL CHECK (LENGTH(text) > 0 AND LENGTH(text) <= 1000),
  author VARCHAR(100) DEFAULT 'Anonymous',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ratings_snack_id ON ratings(snack_id);
CREATE INDEX IF NOT EXISTS idx_ratings_created_at ON ratings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_snack_id ON comments(snack_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_snacks_country ON snacks(country);
CREATE INDEX IF NOT EXISTS idx_snacks_type ON snacks(type);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_snacks_updated_at
  BEFORE UPDATE ON snacks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS
ALTER TABLE snacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies: Allow public read access, authenticated write access
-- Snacks: Public read, authenticated write
CREATE POLICY "Snacks are viewable by everyone" ON snacks
  FOR SELECT USING (true);

CREATE POLICY "Snacks are insertable by authenticated users" ON snacks
  FOR INSERT WITH CHECK (true); -- Allow anonymous inserts for now

CREATE POLICY "Snacks are updatable by authenticated users" ON snacks
  FOR UPDATE USING (true); -- Allow anonymous updates for now

-- Ratings: Public read, authenticated write
CREATE POLICY "Ratings are viewable by everyone" ON ratings
  FOR SELECT USING (true);

CREATE POLICY "Ratings are insertable by authenticated users" ON ratings
  FOR INSERT WITH CHECK (true); -- Allow anonymous inserts for now

-- Comments: Public read, authenticated write
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Comments are insertable by authenticated users" ON comments
  FOR INSERT WITH CHECK (true); -- Allow anonymous inserts for now

