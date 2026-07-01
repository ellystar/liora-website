"use client";

import { useRef, useState } from "react";

type Errors = { name?: string; email?: string; message?: string };

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [company, setCompany] = useState(""); // honeypot — stays empty for humans
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Tell us who you are.";
    if (!values.email.trim()) e.email = "We need a way to reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = "That email looks incomplete.";
    if (!values.message.trim()) e.message = "A line or two is plenty.";
    return e;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      const first = (["name", "email", "message"] as const).find((k) => found[k]);
      if (first) refs[first].current?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        className="rounded-[2px] border border-white/15 bg-white/[0.05] p-8"
        role="status"
        aria-live="polite"
      >
        <p className="d3 text-on-dark">Thank you — the conversation is open.</p>
        <p className="body mt-3 !text-on-dark-mut">
          We&apos;ve received your note and will be in touch soon. If it&apos;s
          urgent, write to us directly at{" "}
          <a href="mailto:info@lioralabs.io" className="link-inline">
            info@lioralabs.io
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid max-w-md gap-5">
      <Field
        label="Name"
        required
        error={errors.name}
        htmlFor="name"
      >
        <input
          ref={refs.name}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={set("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-err" : undefined}
          placeholder="Your name"
          className="input"
        />
      </Field>

      <Field label="Brand & email" required error={errors.email} htmlFor="email">
        <input
          ref={refs.email}
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
          placeholder="you@studio.com"
          className="input"
        />
      </Field>

      <Field
        label="What are you scaling?"
        required
        error={errors.message}
        htmlFor="message"
      >
        <textarea
          ref={refs.message}
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
          placeholder="A campaign, a launch, a whole visual system…"
          className="input resize-y"
        />
      </Field>

      {/* Honeypot — hidden from people, tempting to bots. Left empty = human. */}
      <div aria-hidden="true" className="hp-field">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
          className="group/cta inline-flex items-center gap-2.5 rounded-[2px] border border-bone bg-bone px-[22px] py-[14px] font-ui text-sm font-medium leading-none text-ink transition-colors duration-300 ease-liora hover:border-oxblood hover:bg-oxblood hover:text-bone focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{status === "sending" ? "Sending…" : "Start the conversation"}</span>
          <span aria-hidden="true" className="transition-transform duration-300 ease-liora group-hover/cta:translate-x-1">
            →
          </span>
        </button>
      </div>

      {status === "error" && (
        <p role="alert" className="text-[12.5px] text-[var(--oxblood-on-dark)]">
          Something went wrong on our side. Please write to us directly at{" "}
          <a href="mailto:info@lioralabs.io" className="link-inline">
            info@lioralabs.io
          </a>
          .
        </p>
      )}

      <style jsx>{`
        .hp-field {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
        :global(.input) {
          width: 100%;
          border-radius: 2px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.04);
          padding: 12px 14px;
          font-family: var(--font-ui);
          font-size: 15px;
          color: var(--on-dark);
          transition: border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
        }
        :global(.input::placeholder) {
          color: var(--on-dark-mut);
          opacity: 0.7;
        }
        :global(.input:focus) {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 1px var(--gold);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={htmlFor}
        className="font-ui text-[12.5px] font-medium tracking-[0.01em] text-on-dark"
      >
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-err`} role="alert" className="text-[12.5px] text-[var(--oxblood-on-dark)]">
          {error}
        </p>
      )}
    </div>
  );
}
