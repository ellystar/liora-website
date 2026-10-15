"use client";

/** Re-opens the cookie consent bar so visitors can change their choice. */
export default function CookieSettingsButton({
  className,
  label = "Cookie settings",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("liora:cookie-settings"))}
      className={className}
    >
      {label}
    </button>
  );
}
