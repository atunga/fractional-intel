/*
  # Fix Security Issues

  ## Overview
  This migration addresses security and performance concerns identified in the contact_submissions table.

  ## Changes Made

  ### 1. Remove Unused Indexes
  - Drop `idx_contact_submissions_created_at` - not currently used by any queries
  - Drop `idx_contact_submissions_email_sent` - not currently used by any queries
  
  **Note:** These indexes can be re-added when admin dashboard queries are implemented.

  ### 2. Strengthen RLS Policy for Public Inserts
  Replace the overly permissive `WITH CHECK (true)` policy with validation checks:
  
  **New Validation Rules:**
  - `name` must be at least 2 characters and not exceed 100 characters
  - `company` must be at least 2 characters and not exceed 100 characters
  - `email` must contain '@' and '.' (basic format validation)
  - `email` must be between 5 and 255 characters
  - `message` must be at least 10 characters and not exceed 5000 characters
  - `revenue` if provided must be between 1 and 50 characters
  
  These checks prevent:
  - Empty or whitespace-only submissions
  - Spam submissions with minimal content
  - Excessively long inputs that could affect storage/performance
  - Invalid email formats

  ## Security Improvements
  - RLS policy now validates input data before allowing inserts
  - Prevents abuse and spam submissions
  - Maintains public access for legitimate form submissions

  ## Important Notes
  - Auth DB Connection Strategy must be configured in Supabase Dashboard (not via SQL)
  - Navigate to Project Settings > Database > Connection Pooling
  - Change from fixed number (10) to percentage-based allocation for better scalability
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_contact_submissions_created_at;
DROP INDEX IF EXISTS idx_contact_submissions_email_sent;

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Allow public insert" ON contact_submissions;

-- Create a new, more restrictive policy with validation
CREATE POLICY "Allow valid public insert"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Validate name: 2-100 characters, not just whitespace
    length(trim(name)) >= 2 
    AND length(name) <= 100
    -- Validate company: 2-100 characters, not just whitespace
    AND length(trim(company)) >= 2 
    AND length(company) <= 100
    -- Validate email: basic format check (contains @ and .)
    AND email ~* '^[^@]+@[^@]+\.[^@]+$'
    AND length(email) >= 5 
    AND length(email) <= 255
    -- Validate message: at least 10 characters, max 5000
    AND length(trim(message)) >= 10 
    AND length(message) <= 5000
    -- Validate revenue if provided: reasonable length
    AND (revenue IS NULL OR (length(revenue) >= 1 AND length(revenue) <= 50))
  );
