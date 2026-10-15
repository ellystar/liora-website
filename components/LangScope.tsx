"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";

/**
 * Marks a page's language. The wrapper's lang attribute is there from the
 * first paint, so CSS uppercase renders Turkish İ correctly; the effect also
 * sets <html lang> for screen readers, and restores it when the page leaves.
 */
export default function LangScope({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.lang;
    html.lang = lang;
    return () => {
      html.lang = prev;
    };
  }, [lang]);

  return <div lang={lang}>{children}</div>;
}
