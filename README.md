# Liora — Website

Marketing site for **Liora Labs** — an AI-native creative systems lab for
fashion, beauty and design-led brands.

A single-page homepage plus a full case study (ADV / Orka Holding —
*Launching a brand in 72 hours*).

## Stack

- **Next.js 14** (App Router) · TypeScript
- **Tailwind CSS**
- **GSAP** + ScrollTrigger and **Lenis** for editorial scroll motion
- **next/font** — local Neue Haas Display, plus Newsreader and Spline Sans Mono

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Production

```bash
pnpm build
pnpm start
```

## Structure

```
app/          Routes, layout, metadata, fonts, global styles
              └ work/adv   ADV case study
components/   Homepage sections + the case study
public/       Optimised imagery, wordmarks, favicon, OG image
fonts/        Licensed Neue Haas Display faces
```

## Notes

- Case study: `/work/adv`
- Contact: [info@lioralabs.io](mailto:info@lioralabs.io)
- The `fonts/` directory holds licensed typefaces — keep this repository private
  and do not redistribute them.
- Raw source imagery is kept out of version control (see `.gitignore`); the app
  ships only the optimised assets under `public/`.

---

© Liora Labs. All rights reserved.
