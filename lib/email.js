/**
 * Minimal Resend client (REST API, no SDK) — server only.
 * Docs: https://resend.com/docs/api-reference/emails/send-email
 *
 * Environment variables (see .env.example):
 *  - RESEND_API_KEY      required — https://resend.com/api-keys
 *  - CONTACT_TO_EMAIL    where contact messages are delivered
 *  - RESEND_FROM_EMAIL   sender; defaults to Resend's test sender, which can only
 *                        deliver to your Resend account's email until you verify a domain
 */

const API = "https://api.resend.com";
const DEFAULT_TO = "farzeenwasif15@gmail.com";

function config() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    to: process.env.CONTACT_TO_EMAIL || DEFAULT_TO,
    from: process.env.RESEND_FROM_EMAIL || "Farzeen Portfolio <onboarding@resend.dev>",
  };
}

async function errorMessage(res) {
  try {
    const data = await res.json();
    return data.message || data.name || `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

/** Escapes user input before it is placed inside an HTML email. */
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Sends a notification email to the site owner. */
export async function sendToOwner({ subject, html, text, replyTo }) {
  const { apiKey, to, from } = config();
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY is not set" };

  const res = await fetch(`${API}/emails`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    cache: "no-store",
  });

  return res.ok ? { ok: true } : { ok: false, error: await errorMessage(res) };
}
