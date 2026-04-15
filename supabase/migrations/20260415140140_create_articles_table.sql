/*
  # Create articles table for Insights CMS

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text, required) - Article headline
      - `slug` (text, unique, required) - URL-friendly identifier
      - `excerpt` (text, required) - Short preview text for cards
      - `content` (text, required) - Full article body (HTML or markdown)
      - `category` (text, required) - One of: Ghost Employee, Lever Insights, AI Operations, Industry
      - `featured` (boolean) - Whether this is the featured/pinned article
      - `published` (boolean) - Whether the article is visible on the site
      - `published_at` (timestamptz) - Publication date for display
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Last modification timestamp

  2. Security
    - Enable RLS on `articles` table
    - Public can read published articles only
    - Service role has full access for CMS management
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Lever Insights',
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published articles"
  ON articles
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Service role can manage all articles"
  ON articles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles (published_at DESC)
  WHERE published = true;

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles (slug);

CREATE INDEX IF NOT EXISTS idx_articles_category ON articles (category)
  WHERE published = true;
