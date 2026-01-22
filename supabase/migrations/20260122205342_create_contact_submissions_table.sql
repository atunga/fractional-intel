/*
  # Create contact_submissions table

  ## Overview
  This migration creates a table to store contact form submissions from the website.
  All form data is captured and timestamped for follow-up and analytics.

  ## New Tables
  
  ### `contact_submissions`
  Stores all contact form submissions from the "Prefer to send us a message" section.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each submission
  - `name` (text, required) - Submitter's full name
  - `company` (text, required) - Company name
  - `email` (text, required) - Contact email address
  - `revenue` (text, optional) - Annual revenue range selection
  - `message` (text, required) - The operational challenge description
  - `created_at` (timestamptz) - Timestamp of submission
  - `email_sent` (boolean) - Flag indicating if notification email was sent successfully
  - `email_sent_at` (timestamptz, optional) - Timestamp when notification email was sent

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the `contact_submissions` table
  - Only authenticated service roles can read submissions (for internal dashboard/admin use)
  - Public users can insert their own submissions but cannot read any data
  
  ### Policies
  1. **"Allow public insert"** - Allows anonymous users to submit the contact form
  2. **"Service role can read all"** - Only service role can query submissions for internal use

  ## Important Notes
  - Table captures all form fields including optional revenue range
  - Email sending status is tracked for monitoring and retry logic
  - No PII is exposed to public users due to restrictive RLS policies
  - Created timestamp uses UTC timezone for consistency
*/

-- Create the contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  revenue text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  email_sent boolean DEFAULT false NOT NULL,
  email_sent_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (submit form)
CREATE POLICY "Allow public insert"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only service role can read submissions
CREATE POLICY "Service role can read all"
  ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- Create an index on created_at for efficient querying by date
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);

-- Create an index on email_sent for filtering unsent emails
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email_sent 
  ON contact_submissions(email_sent) 
  WHERE email_sent = false;