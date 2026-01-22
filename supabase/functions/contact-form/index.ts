import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  revenue?: string;
  message: string;
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

    const formData: ContactFormData = await req.json();

    const { name, company, email, revenue, message } = formData;

    if (!name || !company || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: submission, error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        company,
        email,
        revenue: revenue || null,
        message,
        email_sent: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save submission" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let emailSent = false;

    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "FIC Contact Form <noreply@vendingintelligence.co>",
            to: ["ted@vendingintelligence.co"],
            subject: `New Contact Form Submission from ${company}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Annual Revenue:</strong> ${revenue || "Not provided"}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
              <hr>
              <p><small>Submitted at: ${new Date().toISOString()}</small></p>
            `,
          }),
        });

        if (emailResponse.ok) {
          emailSent = true;
          await supabase
            .from("contact_submissions")
            .update({
              email_sent: true,
              email_sent_at: new Date().toISOString(),
            })
            .eq("id", submission.id);
        } else {
          const errorData = await emailResponse.text();
          console.error("Email sending failed:", errorData);
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    } else {
      console.warn("RESEND_API_KEY not configured - email notification skipped");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Form submitted successfully",
        emailSent,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
