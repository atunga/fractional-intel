/*
  # Create private storage bucket for lead magnet PDF

  1. Storage
    - Creates a private `lead-magnet` bucket for hosting the gated PDF
    - Bucket is NOT public — files can only be accessed via signed URLs generated server-side
    - Only the service role (edge function) can read files from this bucket
    - Public INSERT is disabled — no one can upload directly
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'lead-magnet',
  'lead-magnet',
  false,
  20971520,
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;
