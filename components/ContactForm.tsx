// components/ContactForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
};

export default function ContactForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  // Safely get token from grecaptcha; returns null if not available
  async function getRecaptchaToken(): Promise<string | null> {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return null;

    // if grecaptcha exists on window, use it; otherwise wait up to a short timeout
    if (typeof window === "undefined") return null;

    // Wait for grecaptcha.ready if available
    if (window.grecaptcha?.ready) {
      // wrap ready+execute into promise
      return new Promise((resolve) => {
        try {
          window.grecaptcha!.ready(async () => {
            try {
              const token = await window.grecaptcha!.execute(siteKey, { action: "submit" });
              resolve(token);
            } catch (e) {
              console.error("grecaptcha.execute error:", e);
              resolve(null);
            }
          });
        } catch (e) {
          console.error("grecaptcha.ready error:", e);
          resolve(null);
        }
      });
    }

    // if grecaptcha not present, give up quickly (avoid blocking UI)
    console.warn("grecaptcha not available on window");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email and message.");
      return;
    }

    setLoading(true);

    try {
      const token = await getRecaptchaToken();

      if (!token) {
        // Either recaptcha not loaded or execution failed; show error so user knows
        setError("Security check failed (reCAPTCHA). Please ensure scripts are loaded and try again.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json?.error || "Unable to send message. Please try again later.");
        setLoading(false);
        return;
      }

      // success -> navigate to thank-you
      router.push("/thank-you");
    } catch (err) {
      console.error("Submit error:", err);
      setError("Network error. Please try again.");
      setLoading(false);
    } finally {
      // safety: ensure loading false if not redirected
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Full name" className="border rounded-xl px-3 py-2" />
        <input value={form.email} onChange={e => update("email", e.target.value)} placeholder="Email address" type="email" className="border rounded-xl px-3 py-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="Phone" className="border rounded-xl px-3 py-2" />
        <input value={form.company} onChange={e => update("company", e.target.value)} placeholder="Company (optional)" className="border rounded-xl px-3 py-2" />
      </div>

      <textarea value={form.message} onChange={e => update("message", e.target.value)} placeholder="How can we help?" rows={5} className="border rounded-xl px-3 py-2 w-full" />

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex items-center justify-between gap-4">
        <button type="submit" className="bg-gradient-to-r from-[#19c9fa] to-[#70e84f] px-5 py-2 rounded-2xl shadow disabled:opacity-60" disabled={loading}>
          {loading ? "Sending..." : "Send Request"}
        </button>
        <div className="text-xs text-gray-500">We reply within one business day.</div>
      </div>
    </form>
  );
}
