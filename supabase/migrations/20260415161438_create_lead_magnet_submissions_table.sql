/*
  # Create lead magnet submissions table

  1. New Tables
    - `lead_magnet_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required) - submitter's full name
      - `company` (text, required) - submitter's company
      - `title` (text, required) - submitter's job title
      - `email` (text, required) - submitter's email address
      - `created_at` (timestamptz) - submission timestamp
      - `downloaded_at` (timestamptz, nullable) - when the signed URL was generated/used
      - `email_sent` (boolean) - whether notification email was sent
      - `email_sent_at` (timestamptz, nullable) - when notification was sent

  2. Security
    - Enable RLS on the table
    - Public can INSERT new leads (gate enforced in edge function validation)
    - Service role has full access for the edge function to read/update records
    - No SELECT policy for public users — leads are private data

  3. Notes
    - The PDF download is gated through the edge function which validates the
      submission and then generates a short-lived signed URL from Supabase Storage
    - Repeat submissions with the same email are allowed (tracked separately)
*/

CREATE TABLE IF NOT EXISTS lead_magnet_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  title text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  downloaded_at timestamptz,
  email_sent boolean DEFAULT false,
  email_sent_at timestamptz
);

ALTER TABLE lead_magnet_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit lead magnet form"
  ON lead_magnet_submissions
  FOR INSERT
  TO public
  WITH CHECK (
    length(trim(name)) >= 2 AND length(trim(name)) <= 200 AND
    length(trim(company)) >= 1 AND length(trim(company)) <= 200 AND
    length(trim(title)) >= 1 AND length(trim(title)) <= 200 AND
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND
    length(trim(email)) <= 255
  );

CREATE INDEX IF NOT EXISTS idx_lead_magnet_email ON lead_magnet_submissions (email);
CREATE INDEX IF NOT EXISTS idx_lead_magnet_created_at ON lead_magnet_submissions (created_at DESC);
