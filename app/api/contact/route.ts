// app/api/contact/route.ts
import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

type RecaptchaResp = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

async function verifyRecaptcha(token: string): Promise<RecaptchaResp | null> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return null;

  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);

  const resp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!resp.ok) {
    console.error("reCAPTCHA verification HTTP error", resp.status);
    return null;
  }

  const json = await resp.json();
  return json as RecaptchaResp;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, token } = body || {};

    if (!name || !email || !message || !token) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Verify reCAPTCHA
    const rc = await verifyRecaptcha(token);
    if (!rc || !rc.success) {
      console.warn("reCAPTCHA failed or couldn't verify", rc);
      return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 403 });
    }

    // Optional: check score threshold (v3) and action match
    const minScore = typeof process.env.RECAPTCHA_MIN_SCORE !== "undefined" ? Number(process.env.RECAPTCHA_MIN_SCORE) : 0.5;
    if (typeof rc.score === "number" && rc.score < minScore) {
      console.warn("reCAPTCHA score too low", rc.score);
      return NextResponse.json({ error: "reCAPTCHA score too low." }, { status: 403 });
    }

    // SendGrid template config
    const to = process.env.EMAIL_TO;
    const from = process.env.EMAIL_FROM;
    const templateId = process.env.SENDGRID_TEMPLATE_ID;

    if (!to || !from || !templateId) {
      console.error("Missing email environment variables");
      return NextResponse.json({ error: "Email not configured." }, { status: 500 });
    }

    // Use dynamic template for internal notification
    const companyMsg = {
      to,
      from,
      templateId,
      dynamic_template_data: {
        subject: `New message from ${name}`,
        name,
        email,
        phone: phone || "—",
        company: company || "—",
        message,
        submitted_at: new Date().toISOString(),
      },
    };

    // Auto-reply to user (you can create a separate SendGrid template ID for reply or reuse the same)
    const userMsg = {
      to: email,
      from,
      templateId,
      dynamic_template_data: {
        subject: `Thanks for contacting IOT ENGINEERING`,
        name,
        email,
        phone: phone || "—",
        company: company || "—",
        message,
        submitted_at: new Date().toISOString(),
      },
    };

    // Send both, but handle partial failures gracefully
    const results = await Promise.allSettled([
      sendgrid.send(companyMsg),
      sendgrid.send(userMsg),
    ]);

    // Inspect results for logging
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`SendGrid send #${i} failed:`, (r as PromiseRejectedResult).reason);
      }
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
