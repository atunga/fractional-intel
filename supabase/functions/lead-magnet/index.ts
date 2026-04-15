import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadMagnetFormData {
  name: string;
  company: string;
  title: string;
  email: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const formData: LeadMagnetFormData = await req.json();
    const { name, company, title, email } = formData;

    if (!name || !company || !title || !email) {
      return new Response(
        JSON.stringify({ error: "All fields are required: name, company, title, and email." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: submission, error: dbError } = await supabase
      .from("lead_magnet_submissions")
      .insert({
        name: name.trim(),
        company: company.trim(),
        title: title.trim(),
        email: email.trim().toLowerCase(),
        email_sent: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save your information. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await supabase
      .from("lead_magnet_submissions")
      .update({ downloaded_at: new Date().toISOString() })
      .eq("id", submission.id);

    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "FIC Lead Magnet <noreply@vendingintelligence.co>",
            to: ["ted@raizorcrest.ai"],
            subject: `New Lead Magnet Download: ${company} — ${name}`,
            html: `
              <h2>New Lead Magnet Download</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Title:</strong> ${title}</p>
              <p><strong>Email:</strong> ${email}</p>
              <hr>
              <p><small>Downloaded at: ${new Date().toISOString()}</small></p>
            `,
          }),
        });

        if (emailResponse.ok) {
          await supabase
            .from("lead_magnet_submissions")
            .update({ email_sent: true, email_sent_at: new Date().toISOString() })
            .eq("id", submission.id);
        } else {
          console.error("Email sending failed:", await emailResponse.text());
        }
      } catch (emailError) {
        console.error("Error sending notification email:", emailError);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing lead magnet form:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error. Please contact ted@raizorcrest.ai." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
