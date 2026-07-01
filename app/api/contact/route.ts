import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Where enquiries land, and the verified sending identity.
const TO = "info@lioralabs.io";
const FROM = "Liora Website <hello@lioralabs.io>";

export async function POST(req: Request) {
  let data: {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    company?: unknown;
  };

  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real people leave the hidden "company" field empty; bots fill it.
  // Pretend success so the bot moves on, but send nothing.
  if (typeof data.company === "string" && data.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet (missing env var) — fail clearly, log for us.
    console.error("RESEND_API_KEY is not set — contact form cannot send.");
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `New enquiry — ${name}`,
      text: `${message}\n\n— ${name}\n${email}`,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json({ error: "Could not send." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route failure:", err);
    return NextResponse.json({ error: "Could not send." }, { status: 500 });
  }
}
