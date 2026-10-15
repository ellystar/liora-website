/**
 * The site speaks English first; Turkish lives under /tr as a second option.
 * Copy stays beside the markup it belongs to (a { en, tr } object at the top
 * of each component); this file only holds what every component shares.
 */
export type Lang = "en" | "tr";

/** Prefix a site path for the given language: "/#work" → "/tr#work". */
export function localize(lang: Lang, path: string): string {
  if (lang === "en") return path;
  if (path === "/") return "/tr";
  if (path.startsWith("/#")) return `/tr${path.slice(1)}`;
  return `/tr${path}`;
}

/** The same page in the other language — used by the language switch. */
export function counterpart(lang: Lang, enPath: string): string {
  return lang === "en" ? localize("tr", enPath) : enPath;
}

/** "Working with Liora" as a mail subject, per language. */
export const MAIL_SUBJECT: Record<Lang, string> = {
  en: "Working%20with%20Liora",
  tr: "Liora%20ile%20%C3%A7al%C4%B1%C5%9Fmak",
};

export const mailto = (lang: Lang) =>
  `mailto:info@lioralabs.io?subject=${MAIL_SUBJECT[lang]}`;
