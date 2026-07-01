import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // core neutrals
        bone: "#F2EDE3",
        "bone-2": "#E9E2D5",
        stone: "#C8BCA8",
        ink: "#100E0B",
        "ink-2": "#1C1813",
        // text
        text: "#1A1611",
        "text-mut": "#6E665A",
        "on-dark": "#EFE8DA",
        "on-dark-mut": "#A99C86",
        // accents — two jobs, never interchangeable
        gold: "#B07A2E",
        oxblood: "#5C1F29",
      },
      fontFamily: {
        // Newsreader (display) · Neue Haas Display (ui) · Spline Sans Mono (mono)
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        ui: ["var(--font-ui)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      maxWidth: {
        wrap: "1180px",
        prose: "65ch",
      },
      borderRadius: {
        // editorial, near-square
        DEFAULT: "2px",
        seam: "2px",
      },
      letterSpacing: {
        wordmark: "0.22em",
        eyebrow: "0.2em",
        meta: "0.1em",
      },
      transitionTimingFunction: {
        liora: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        reveal: "800ms",
      },
      spacing: {
        // 4px base rhythm extensions used by the institution
        "18": "4.5rem",
        "30": "7.5rem",
        "38": "9.5rem",
        "50": "12.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
