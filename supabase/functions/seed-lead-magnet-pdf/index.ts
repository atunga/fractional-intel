import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json().catch(() => ({}));
    const { siteUrl } = body;
    if (!siteUrl) {
      return new Response(
        JSON.stringify({ error: "Missing siteUrl in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const pdfUrl = `${siteUrl}/Find_the_Lever_-_Digital_Edition.pdf`;
    const pdfResponse = await fetch(pdfUrl);
    if (!pdfResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Could not fetch PDF from ${pdfUrl}: ${pdfResponse.status}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const pdfBytes = new Uint8Array(await pdfResponse.arrayBuffer());
    const filename = "Find_the_Lever_-_Digital_Edition.pdf";
    const filePath = `uploads/seed_${filename}`;

    const { error: uploadError } = await supabase
      .storage
      .from("lead-magnet")
      .upload(filePath, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      return new Response(
        JSON.stringify({ error: `Upload failed: ${uploadError.message}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error: dbError } = await supabase
      .from("lead_magnets")
      .insert({ file_path: filePath, original_filename: filename });

    if (dbError) {
      return new Response(
        JSON.stringify({ error: `DB insert failed: ${dbError.message}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, filePath }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Internal error: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
