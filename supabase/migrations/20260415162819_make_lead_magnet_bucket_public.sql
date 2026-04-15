/*
  # Make lead-magnet bucket public

  1. Summary
    Updates the lead-magnet storage bucket to be public so that:
    - Files can be accessed and uploaded via the Supabase dashboard
    - The edge function can still generate signed URLs for controlled access

  2. Changes
    - Sets `public = true` on the lead-magnet bucket

  3. Notes
    - This allows the PDF to be uploaded via the dashboard
    - The edge function flow remains unchanged — signed URLs are still used for end users
*/

UPDATE storage.buckets
SET public = true
WHERE id = 'lead-magnet';
