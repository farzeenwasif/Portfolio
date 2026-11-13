"use server";

import { escapeHtml, sendToOwner } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v) => (typeof v === "string" ? v.trim() : "");

/**
 * Contact form server action (used with React's useActionState).
 * Returns { status: "idle" | "success" | "error", message?, errors? }.
 */
export async function submitContact(_prev, formData) {
  // Honeypot: real visitors never fill this hidden field.
  if (formData.get("company_website")) {
    return { status: "success", message: "Thanks! Your message has been sent." };
  }

  const data = {
    name: str(formData.get("name")),
    email: str(formData.get("email")),
    message: str(formData.get("message")),
  };

  const errors = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (data.name.length > 100) errors.name = "Your name is too long.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Your message should be at least 10 characters.";
  if (data.message.length > 5000) errors.message = "Your message is too long.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values: data };
  }

  const sent = await sendToOwner({
    subject: `Portfolio message from ${data.name}`,
    replyTo: data.email,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    html: `
      <h2 style="font-family:sans-serif">New message from your portfolio</h2>
      <table style="font-family:sans-serif;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${escapeHtml(data.email)}</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;border-left:3px solid #14827e;padding-left:12px">${escapeHtml(data.message)}</p>
      <p style="font-family:sans-serif;font-size:12px;color:#999">Reply to this email to answer ${escapeHtml(data.name)} directly.</p>`,
  });

  if (!sent.ok) {
    console.error("[contact] email delivery failed:", sent.error);
    return {
      status: "error",
      message:
        "Sorry, your message couldn't be sent right now. Please try again or email me at farzeenwasif15@gmail.com.",
      values: data,
    };
  }

  return {
    status: "success",
    message: "Thanks! Your message has been sent. I'll get back to you soon.",
  };
}
