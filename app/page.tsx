"use client";
import React, { useState } from "react";
import Link from "next/link";

// ── Use env var, never hardcode the URL ──────────────────────────────────────
// Add NEXT_PUBLIC_API_URL=https://hft-engine-2ljd.onrender.com to your
// Vercel environment variables (Settings → Environment Variables)
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://hft-engine-2ljd.onrender.com";

type Status = "idle" | "waking" | "loading" | "success" | "error";

const STATUS_MESSAGES: Record<Status, string> = {
  idle:    "EXECUTE TRANSMISSION",
  waking:  "WAKING ENGINE (30s)...",  // shown during Render cold start
  loading: "UPLOADING...",
  success: "",
  error:   "",
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // ── Cold-start UX: if the request takes > 5s, tell the user the engine
    //    is waking up rather than leaving them on a spinning button.
    const wakingTimer = setTimeout(() => setStatus("waking"), 5000);

    try {
      // AbortController gives a 60s hard timeout (Render cold start ≤ 50s)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60_000);

      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else if (res.status === 429) {
        setStatus("error");
        setErrorMsg("Too many submissions. Try again in an hour.");
      } else {
        setStatus("error");
        setErrorMsg("Transmission failed. Please try again.");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setStatus("error");
        setErrorMsg("Connection timed out. The engine may be starting up — try again in 30s.");
      } else {
        setStatus("error");
        setErrorMsg("Network error. Check your connection and try again.");
      }
    } finally {
      clearTimeout(wakingTimer);
    }
  };

  const isSubmitting = status === "loading" || status === "waking";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative">
      <Link
        href="/"
        className="absolute top-8 left-8 text-zinc-500 hover:text-white duration-200"
      >
        ← Back to Base
      </Link>

      <div className="w-full max-w-md p-8 border border-zinc-800 bg-zinc-900/50 backdrop-blur-md rounded-xl shadow-2xl relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-zinc-100">
          Secure Comms Channel
        </h2>

        {status === "success" ? (
          <div className="text-center py-10 text-green-400 border border-green-500/30 bg-green-500/10 rounded-lg">
            <p>Transmission Successful.</p>
            <p className="text-sm mt-2 text-zinc-400">
              Panth's Engine has received your data.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-xs text-zinc-500 hover:text-white"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                IDENTIFICATION
              </label>
              <input
                type="text"
                required
                minLength={2}
                maxLength={100}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:outline-none focus:border-zinc-400 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                RETURN ADDRESS
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:outline-none focus:border-zinc-400 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                TRANSMISSION DATA
              </label>
              <textarea
                required
                rows={4}
                minLength={5}
                maxLength={2000}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-black border border-zinc-700 rounded-md p-3 text-sm focus:outline-none focus:border-zinc-400 transition-colors resize-none"
                placeholder="Enter your message here..."
              />
              <div className="text-right text-xs text-zinc-600 mt-1">
                {formData.message.length}/2000
              </div>
            </div>

            {status === "error" && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 rounded p-2">
                ⚠ {errorMsg}
              </p>
            )}

            {status === "waking" && (
              <p className="text-yellow-400 text-xs bg-yellow-500/10 border border-yellow-500/30 rounded p-2">
                ⚡ Engine cold-starting on Render — this takes ~30 seconds on the
                first request. Hang tight!
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 bg-white text-black font-semibold py-3 rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {STATUS_MESSAGES[status]}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
