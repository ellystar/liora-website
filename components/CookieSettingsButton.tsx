"use client";

/** Re-opens the cookie consent bar so visitors can change their choice. */
export default function CookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("liora:cookie-settings"))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
