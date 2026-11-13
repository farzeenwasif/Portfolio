"use client";
import { useRef, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { submitContact } from "@/app/actions";
import TitleHeader from "../TitleHeader";
import ContactExperience from "../models/contact/ContactExperience";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // null | { type: "success" | "error", text: string }
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status) setStatus(null);
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent double submits
    setLoading(true);
    setStatus(null);
    setErrors({});

    try {
      // Server action: sends the message through Resend (API key stays on the server)
      const result = await submitContact(null, new FormData(formRef.current));

      if (result.status === "success") {
        setForm({ name: "", email: "", message: "" });
        setStatus({ type: "success", text: result.message });
      } else {
        setErrors(result.errors || {});
        setStatus({ type: "error", text: result.message });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        text: "Sorry, your message couldn't be sent. Please try again or email me at farzeenwasif15@gmail.com.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full px-5 md:px-10 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 md:gap-16">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Form */}
          <div className="lg:col-span-5">
            <div className="flex justify-center items-center border border-gray-500/40 bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
                noValidate
              >
                {/* Honeypot for bots — hidden from people and screen readers */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] w-px h-px opacity-0"
                />
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white mb-2 font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your name?"
                    required
                    autoComplete="name"
                    aria-label="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                  {errors.name && (
                    <p id="name-error" className="pt-1.5 text-sm text-red-300">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white mb-2 font-medium"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email address?"
                    required
                    autoComplete="email"
                    aria-label="Your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                  {errors.email && (
                    <p id="email-error" className="pt-1.5 text-sm text-red-300">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-white mb-2 font-medium"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                    aria-label="Your message"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                  />
                  {errors.message && (
                    <p id="message-error" className="pt-1.5 text-sm text-red-300">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className={`px-4 py-4 text-white rounded-lg bg-white/5 backdrop-blur-lg flex justify-center items-center relative cursor-pointer overflow-hidden group transition-all ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <div
                    className="absolute -right-10 origin-center top-1/2 -translate-y-1/2 
                    w-[120%] h-[120%] group-hover:w-10 group-hover:h-10 group-hover:right-10
                    rounded-full bg-[linear-gradient(135deg,_#6DB5D6,_#2D7373,_#012D2D)] transition-all duration-500"
                  />
                  <p className="z-10">
                    {loading ? "Sending..." : "Send Message"}
                  </p>
                  <div
                    className="group-hover:bg-[#2D7373] size-10 rounded-full text-lg absolute right-10 top-1/2 
                    -translate-y-1/2 flex justify-center items-center overflow-hidden"
                  >
                    {loading ? (
                    <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                  ) : (
                    "→"
                  )}
                  </div>
                </button>

                {/* Inline result message (announced to screen readers) */}
                <div aria-live="polite" role="status">
                  {status && (
                    <p
                      className={`flex items-start gap-2 rounded-lg border px-4 py-3 text-sm leading-relaxed ${
                        status.type === "success"
                          ? "border-[#14827e]/50 bg-[#14827e]/15 text-[#9be3df]"
                          : "border-red-400/40 bg-red-500/10 text-red-200"
                      }`}
                    >
                      {status.type === "success" ? (
                        <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
                      ) : (
                        <AlertCircle className="size-5 shrink-0" aria-hidden="true" />
                      )}
                      <span>{status.text}</span>
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Model */}
          <div className="lg:col-span-7 h-80 sm:h-96 lg:h-auto lg:min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
