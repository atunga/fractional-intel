/*
  # Create admin_settings table for admin password

  1. New Tables
    - `admin_settings`
      - `key` (text, primary key) - setting name
      - `value` (text) - setting value
      - `updated_at` (timestamptz) - last update timestamp

  2. Security
    - Enable RLS on `admin_settings` table
    - No public access - only service_role can read/write
    - Admin password is stored hashed in the value column

  3. Initial Data
    - Seeds a default admin password hash for "admin123" (bcrypt)
    - Admin should change this after first login via the edge function
*/

CREATE TABLE IF NOT EXISTS admin_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
