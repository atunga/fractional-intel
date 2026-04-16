import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/admin\/?/, "").replace(/^\/functions\/v1\/admin\/?/, "");

    if (path === "login" || path === "") {
      if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

      const { password } = await req.json();
      if (!password) return jsonResponse({ error: "Missing password" }, 400);

      const { data: setting } = await supabase
        .from("admin_settings")
        .select("value")
        .eq("key", "admin_password")
        .maybeSingle();

      const adminPassword = setting?.value ?? Deno.env.get("ADMIN_PASSWORD") ?? "admin123";

      if (password !== adminPassword) {
        return jsonResponse({ error: "Invalid password" }, 401);
      }

      const token = btoa(`admin:${Date.now()}:${Math.random()}`);

      const { error } = await supabase
        .from("admin_settings")
        .upsert({ key: "admin_session", value: token, updated_at: new Date().toISOString() });

      if (error) return jsonResponse({ error: "Session error" }, 500);

      return jsonResponse({ token });
    }

    const authHeader = req.headers.get("x-admin-token");
    if (!authHeader) return jsonResponse({ error: "Unauthorized" }, 401);

    const { data: session } = await supabase
      .from("admin_settings")
      .select("value, updated_at")
      .eq("key", "admin_session")
      .maybeSingle();

    if (!session || session.value !== authHeader) {
      return jsonResponse({ error: "Invalid token" }, 401);
    }

    const sessionAge = Date.now() - new Date(session.updated_at).getTime();
    if (sessionAge > 8 * 60 * 60 * 1000) {
      return jsonResponse({ error: "Session expired" }, 401);
    }

    if (path === "contacts") {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) return jsonResponse({ error: error.message }, 500);
      return jsonResponse({ data });
    }

    if (path === "leads") {
      const { data, error } = await supabase
        .from("lead_magnet_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) return jsonResponse({ error: error.message }, 500);
      return jsonResponse({ data });
    }

    if (path === "articles") {
      if (req.method === "GET") {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ data });
      }

      if (req.method === "POST") {
        const body = await req.json();
        const { title, slug, excerpt, category, featured, published, published_at, content } = body;
        if (!title || !slug || !excerpt || !category) {
          return jsonResponse({ error: "Missing required fields: title, slug, excerpt, category" }, 400);
        }
        const { data, error } = await supabase
          .from("articles")
          .insert({ title, slug, excerpt, category, featured: featured ?? false, published: published ?? false, published_at: published_at ?? null, content: content ?? null })
          .select()
          .single();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ data });
      }

      if (req.method === "PUT") {
        const body = await req.json();
        const { id, ...updates } = body;
        if (!id) return jsonResponse({ error: "Missing article id" }, 400);
        const { data, error } = await supabase
          .from("articles")
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq("id", id)
          .select()
          .single();
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ data });
      }

      if (req.method === "DELETE") {
        const body = await req.json();
        const { id } = body;
        if (!id) return jsonResponse({ error: "Missing article id" }, 400);
        const { error } = await supabase.from("articles").delete().eq("id", id);
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ success: true });
      }
    }

    if (path === "change-password") {
      if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
      const { newPassword } = await req.json();
      if (!newPassword || newPassword.length < 8) {
        return jsonResponse({ error: "Password must be at least 8 characters" }, 400);
      }
      const { error } = await supabase
        .from("admin_settings")
        .upsert({ key: "admin_password", value: newPassword, updated_at: new Date().toISOString() });
      if (error) return jsonResponse({ error: error.message }, 500);
      return jsonResponse({ success: true });
    }

    if (path === "upload-pdf") {
      if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) return jsonResponse({ error: "Missing file" }, 400);

      const filename = file.name || "lead-magnet.pdf";
      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `uploads/${Date.now()}_${safeName}`;

      const bytes = new Uint8Array(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("lead-magnet")
        .upload(filePath, bytes, { contentType: "application/pdf", upsert: false });
      if (uploadError) return jsonResponse({ error: `Upload failed: ${uploadError.message}` }, 500);

      const { error: dbError } = await supabase
        .from("lead_magnets")
        .insert({ file_path: filePath, original_filename: filename });
      if (dbError) return jsonResponse({ error: `DB error: ${dbError.message}` }, 500);

      return jsonResponse({ success: true, filePath, originalFilename: filename });
    }

    if (path === "seed-pdf") {
      if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
      const { siteUrl } = await req.json();
      if (!siteUrl) return jsonResponse({ error: "Missing siteUrl" }, 400);

      const pdfUrl = `${siteUrl}/Find_the_Lever_-_Digital_Edition.pdf`;
      const pdfResponse = await fetch(pdfUrl);
      if (!pdfResponse.ok) return jsonResponse({ error: `Could not fetch PDF: ${pdfResponse.status}` }, 400);

      const pdfBytes = new Uint8Array(await pdfResponse.arrayBuffer());
      const filename = "Find_the_Lever_-_Digital_Edition.pdf";
      const filePath = `uploads/seed_${filename}`;

      const { error: uploadError } = await supabase.storage
        .from("lead-magnet")
        .upload(filePath, pdfBytes, { contentType: "application/pdf", upsert: true });
      if (uploadError) return jsonResponse({ error: `Upload failed: ${uploadError.message}` }, 500);

      const { error: dbError } = await supabase
        .from("lead_magnets")
        .insert({ file_path: filePath, original_filename: filename });
      if (dbError) return jsonResponse({ error: `DB error: ${dbError.message}` }, 500);

      return jsonResponse({ success: true, filePath });
    }

    return jsonResponse({ error: "Not found" }, 404);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Internal error: ${error.message}` }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
