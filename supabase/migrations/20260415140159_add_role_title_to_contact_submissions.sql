/*
  # Add role_title column to contact_submissions

  1. Modified Tables
    - `contact_submissions`
      - Added `role_title` (text, nullable) - Contact's job title/role

  2. Notes
    - New field to capture the visitor's role/title from the updated contact form
    - Nullable since existing records won't have this field
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'role_title'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN role_title text;
  END IF;
END $$;
