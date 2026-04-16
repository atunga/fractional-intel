/*
  # Fix Security Issues

  1. Storage - Remove broad SELECT policy on lead-magnet bucket
     - The bucket is already public, so authenticated-user-level SELECT policies
       allow clients to list all files in the bucket, which is unintended.
     - Object URLs still work on public buckets without any SELECT policy.
     - Drop "Authenticated users can read lead-magnet objects" to prevent file listing.
     - Keep "Service role can read lead-magnet objects" for server-side operations.

  2. admin_settings - Add RLS policies
     - Table has RLS enabled but zero policies, meaning no one can read or write.
     - The admin edge function uses the service role key, which bypasses RLS.
     - Add explicit policies to restrict access to the service role only,
       documenting intent and preventing accidental exposure to anon/authenticated roles.
*/

DROP POLICY IF EXISTS "Authenticated users can read lead-magnet objects" ON storage.objects;

CREATE POLICY "Service role can insert admin_settings"
  ON public.admin_settings
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can select admin_settings"
  ON public.admin_settings
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update admin_settings"
  ON public.admin_settings
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete admin_settings"
  ON public.admin_settings
  FOR DELETE
  TO service_role
  USING (true);
