"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

type Errors = { name?: string; email?: string; message?: string };

type Status = "idle" | "sending" | "sent" | "error";

const COPY = {
  en: {
    errName: "Tell us who you are.",
    errEmail: "We need a way to reply.",
    errEmailBad: "That email looks incomplete.",
    errMessage: "A line or two is plenty.",
    sentTitle: "Thank you — the conversation is open.",
    sentBody: "We’ve received your note and will be in touch soon. If it’s urgent, write to us directly at",
    name: "Name",
    namePh: "Your name",
    email: "Brand & email",
    emailPh: "you@studio.com",
    message: "What are you scaling?",
    messagePh: "A campaign, a launch, a whole visual system…",
    sending: "Sending…",
    send: "Start the conversation",
    error: "Something went wrong on our side. Please write to us directly at",
  },
  tr: {
    errName: "Bize kim olduğunuzu söyleyin.",
    errEmail: "Size dönebilmemiz için bir e-posta gerekli.",
    errEmailBad: "Bu e-posta adresi eksik görünüyor.",
    errMessage: "Bir iki cümle yeterli.",
    sentTitle: "Teşekkürler, sohbet başladı.",
    sentBody: "Notunuz bize ulaştı, en kısa sürede dönüş yapacağız. Acilse doğrudan şu adrese yazabilirsiniz:",
    name: "Ad soyad",
    namePh: "Adınız",
    email: "Marka ve e-posta",
    emailPh: "ad@markaniz.com",
    message: "Neyi büyütüyorsunuz?",
    messagePh: "Bir kampanya, bir lansman, bütün bir görsel sistem…",
    sending: "Gönderiliyor…",
    send: "Sohbeti başlatın",
    error: "Bizim tarafımızda bir sorun oluştu. Lütfen doğrudan şu adrese yazın:",
  },
};

export default function ContactForm({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [company, setCompany] = useState(""); // honeypot — stays empty for humans
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  // Until React hydrates, a click falls through to a *native* form submission:
  // the browser reloads the page with the fields in the query string and sends
  // nothing, so the visitor sees an empty form and assumes it is broken. Keep
  // the button inert until we are live (this also blocks Enter-to-submit).
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

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
    if (!values.name.trim()) e.name = t.errName;
    if (!values.email.trim()) e.email = t.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = t.errEmailBad;
    if (!values.message.trim()) e.message = t.errMessage;
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
        <p className="d3 text-on-dark">{t.sentTitle}</p>
        <p className="body mt-3 !text-on-dark-mut">
          {t.sentBody}{" "}
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
        label={t.name}
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
          placeholder={t.namePh}
          className="input"
        />
      </Field>

      <Field label={t.email} required error={errors.email} htmlFor="email">
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
          placeholder={t.emailPh}
          className="input"
        />
      </Field>

      <Field
        label={t.message}
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
          placeholder={t.messagePh}
          className="input resize-y"
        />
      </Field>

      {/* Honeypot — hidden from people, tempting to bots. Left empty = human.
          Deliberately NOT named "company"/"organization": browsers and password
          managers autofill those even off-screen, which would silently discard a
          real enquiry. The JSON key stays `company` for the API contract. */}
      <div aria-hidden="true" className="hp-field">
        <label htmlFor="liora-ref">Leave this field empty</label>
        <input
          id="liora-ref"
          name="liora-ref"
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
          disabled={!ready || status === "sending"}
          aria-busy={status === "sending"}
          className={`group/cta inline-flex items-center gap-2.5 rounded-[2px] border border-bone bg-bone px-[22px] py-[14px] font-ui text-sm font-medium leading-none text-ink transition-colors duration-300 ease-liora hover:border-oxblood hover:bg-oxblood hover:text-bone focus-visible:outline-2 ${
            status === "sending" ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          <span>{status === "sending" ? t.sending : t.send}</span>
          <span aria-hidden="true" className="transition-transform duration-300 ease-liora group-hover/cta:translate-x-1">
            →
          </span>
        </button>
      </div>

      {status === "error" && (
        <p role="alert" className="text-[12.5px] text-[var(--oxblood-on-dark)]">
          {t.error}{" "}
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
