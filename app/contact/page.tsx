"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Get in touch
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            If you have questions, feedback, or suggestions for new tools, feel
            free to reach out.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
              <Mail className="h-5 w-5 text-slate-900" />
            </div>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight">
              Contact details
            </h2>

            <p className="mt-4 text-slate-600 leading-7">
              Use the form to send a message directly.
            </p>

            <div className="mt-8 rounded-3xl bg-slate-100 p-4">
              <p className="text-sm font-medium text-slate-900">
                Typical topics
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Feedback on tools</li>
                <li>• Suggestions for new calculators</li>
                <li>• General questions about the site</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Send a message
            </h2>

            {status === "success" ? (
              <div className="mt-6 rounded-3xl bg-slate-100 p-5">
                <p className="text-lg font-semibold text-slate-900">
                  Message sent
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Thanks — your message has been sent successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4 text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-300 px-4 text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>

                {status === "error" ? (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Send message"}
                  <Send className="ml-2 h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
