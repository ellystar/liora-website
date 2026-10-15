"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Lang, counterpart, localize, mailto } from "@/lib/i18n";

type Model = {
  name: string;
  ethnicity: string;
  age: string;
  city: string;
  img: string | null;
};

const CAST: Record<Lang, Model[]> = {
  en: [
    { name: "Noa Kim", ethnicity: "East Asian", age: "26", city: "Seoul", img: "/noa.jpg" },
    { name: "Jonas Visser", ethnicity: "Dutch", age: "31", city: "Amsterdam", img: "/jonas.jpg" },
  ],
  tr: [
    { name: "Noa Kim", ethnicity: "Doğu Asyalı", age: "26", city: "Seul", img: "/noa.jpg" },
    { name: "Jonas Visser", ethnicity: "Hollandalı", age: "31", city: "Amsterdam", img: "/jonas.jpg" },
  ],
};

// Layer 02 · The Visual Language — interactive "set memory" studio.
type Spot = { key: string; x: number; y: number; tip: string };
const STUDIO: Record<Lang, Spot[]> = {
  en: [
    { key: "Framing", x: 13, y: 20, tip: "Breathing space, negative space, editorial composition." },
    { key: "Background", x: 42, y: 25, tip: "Warm limestone plaster. Minimal architectural texture." },
    { key: "Light", x: 84, y: 27, tip: "Natural afternoon light. Soft directional shadows. No artificial highlights." },
    { key: "Depth", x: 27, y: 48, tip: "Layered planes, and a soft receding back corner." },
    { key: "Contrast", x: 52, y: 54, tip: "Low, even contrast — no hard edges, nothing harsh." },
    { key: "Palette", x: 22, y: 83, tip: "Stone. Sand. Cream. Muted navy." },
    { key: "Mood", x: 60, y: 80, tip: "Quiet luxury. Mediterranean summer. Effortless elegance." },
  ],
  tr: [
    { key: "Kadraj", x: 13, y: 20, tip: "Nefes alan boşluklar, negatif alan, editoryal kompozisyon." },
    { key: "Fon", x: 42, y: 25, tip: "Sıcak kireçtaşı sıva. Yalın, mimari bir doku." },
    { key: "Işık", x: 84, y: 27, tip: "Doğal öğleden sonra ışığı. Yumuşak, yönlü gölgeler. Yapay parlama yok." },
    { key: "Derinlik", x: 27, y: 48, tip: "Katmanlı düzlemler ve geriye doğru yumuşakça açılan bir köşe." },
    { key: "Kontrast", x: 52, y: 54, tip: "Düşük, dengeli kontrast; sert kenar yok, hiçbir şey keskin değil." },
    { key: "Palet", x: 22, y: 83, tip: "Taş. Kum. Krem. Kırık lacivert." },
    { key: "Atmosfer", x: 60, y: 80, tip: "Sessiz lüks. Akdeniz yazı. Zahmetsiz zarafet." },
  ],
};

// Layer 03 · Styling Logic — real styling frames (a sample of 250).
const STYLING_IMG = ["/style-01.jpg", "/style-02.jpg", "/style-03.jpg"];
const STYLING: Record<Lang, { cat: string; note: string }[]> = {
  en: [
    { cat: "Womenswear — Shirt", note: "Casual" },
    { cat: "Womenswear — Dress", note: "Evening" },
    { cat: "Menswear — Linen", note: "Resort" },
  ],
  tr: [
    { cat: "Kadın — Gömlek", note: "Günlük" },
    { cat: "Kadın — Elbise", note: "Akşam" },
    { cat: "Erkek — Keten", note: "Tatil" },
  ],
};

// The output — a full-bleed wall of the best launch-ready frames.
const GALLERY = [
  "/out-man-1.jpg",
  "/out-woman-4.jpg",
  "/out-man-2.jpg",
  "/out-woman-2.jpg",
  "/out-man-3.jpg",
  "/out-woman-3.jpg",
  "/out-man-4.jpg",
  "/out-woman-1.jpg",
];

// Layer 04 · Visual Orchestration — the pose engine as a system (no imagery).
// Every product resolves to three frames; the pose set is decided by gender
// and cut. Same three beats — Establish, Detail, Motion — resolved per category.
type OrchSet = { set: string; beat: string; pose: string };
type OrchCat = { key: string; code: string; label: string; sets: OrchSet[] };
const ORCH: Record<Lang, { gender: string; cats: OrchCat[] }[]> = {
  en: [
    {
      gender: "Womenswear",
      cats: [
        {
          key: "w-tops",
          code: "W·TOP",
          label: "Tops",
          sets: [
            { set: "A", beat: "Establish", pose: "¾ front · torso lead · hands soft" },
            { set: "B", beat: "Detail", pose: "Profile · collar, cuff & seam" },
            { set: "C", beat: "Motion", pose: "Quarter-turn · sleeve in motion" },
          ],
        },
        {
          key: "w-bottoms",
          code: "W·BTM",
          label: "Bottoms",
          sets: [
            { set: "A", beat: "Establish", pose: "Full-length · weight on one hip" },
            { set: "B", beat: "Detail", pose: "¾ back · waistband & pocket" },
            { set: "C", beat: "Motion", pose: "Walk-through · hem released" },
          ],
        },
        {
          key: "w-dresses",
          code: "W·DRS",
          label: "Dresses",
          sets: [
            { set: "A", beat: "Establish", pose: "Full-length front · centred" },
            { set: "B", beat: "Detail", pose: "¾ turn · fabric fall & drape" },
            { set: "C", beat: "Motion", pose: "Sweep · skirt in movement" },
          ],
        },
      ],
    },
    {
      gender: "Menswear",
      cats: [
        {
          key: "m-upper",
          code: "M·UPR",
          label: "Upper",
          sets: [
            { set: "A", beat: "Establish", pose: "¾ front · shoulders square" },
            { set: "B", beat: "Detail", pose: "Profile · lapel, placket & cuff" },
            { set: "C", beat: "Motion", pose: "Turn · fabric catches the light" },
          ],
        },
        {
          key: "m-lower",
          code: "M·LWR",
          label: "Lower",
          sets: [
            { set: "A", beat: "Establish", pose: "Full-length · stance open" },
            { set: "B", beat: "Detail", pose: "¾ back · seat & break" },
            { set: "C", beat: "Motion", pose: "Step · crease in motion" },
          ],
        },
      ],
    },
  ],
  tr: [
    {
      gender: "Kadın giyim",
      cats: [
        {
          key: "w-tops",
          code: "K·ÜST",
          label: "Üst",
          sets: [
            { set: "A", beat: "Giriş", pose: "¾ önden · gövde önde · eller yumuşak" },
            { set: "B", beat: "Detay", pose: "Profil · yaka, manşet ve dikiş" },
            { set: "C", beat: "Hareket", pose: "Çeyrek dönüş · kol hareket hâlinde" },
          ],
        },
        {
          key: "w-bottoms",
          code: "K·ALT",
          label: "Alt",
          sets: [
            { set: "A", beat: "Giriş", pose: "Boydan · ağırlık tek kalçada" },
            { set: "B", beat: "Detay", pose: "¾ arkadan · bel ve cep" },
            { set: "C", beat: "Hareket", pose: "Yürürken · paça serbest" },
          ],
        },
        {
          key: "w-dresses",
          code: "K·ELB",
          label: "Elbise",
          sets: [
            { set: "A", beat: "Giriş", pose: "Boydan önden · ortalı" },
            { set: "B", beat: "Detay", pose: "¾ dönüş · kumaşın düşüşü" },
            { set: "C", beat: "Hareket", pose: "Savrulma · etek hareket hâlinde" },
          ],
        },
      ],
    },
    {
      gender: "Erkek giyim",
      cats: [
        {
          key: "m-upper",
          code: "E·ÜST",
          label: "Üst",
          sets: [
            { set: "A", beat: "Giriş", pose: "¾ önden · omuzlar düz" },
            { set: "B", beat: "Detay", pose: "Profil · yaka, pat ve manşet" },
            { set: "C", beat: "Hareket", pose: "Dönüş · kumaş ışığı yakalıyor" },
          ],
        },
        {
          key: "m-lower",
          code: "E·ALT",
          label: "Alt",
          sets: [
            { set: "A", beat: "Giriş", pose: "Boydan · açık duruş" },
            { set: "B", beat: "Detay", pose: "¾ arkadan · arka ve paça kırımı" },
            { set: "C", beat: "Hareket", pose: "Adım · ütü çizgisi hareket hâlinde" },
          ],
        },
      ],
    },
  ],
};

const COPY = {
  en: {
    back: "← Work",
    switchCode: "TR",
    switchLabel: "Türkçe",
    heroAlt: "ADV — Noa and Jonas, the brand's two signature models",
    title: { pre: "Launching a brand in ", em: "72 hours." },
    quiet: "250 products. Three days. One entirely new brand.",
    client: "Client",
    service: "Service",
    serviceName: "Custom Visual System",
    scroll: "Scroll",
    problemKick: "01 · The problem",
    staccato: ["250 products.", "72 hours.", "No photoshoot."],
    brief1: "ADV was preparing to launch a new fashion brand under Orka Holding. 250 products had to go live within days, not months.",
    brief2: "There was no photoshoot, no models, and no production pipeline. The only inputs were raw phone photos of the garments — front.",
    rawAlt: "Raw product input — a single ADV garment, shot front-on on a phone",
    rawLabel: "Raw product input 01",
    rawSub: "Phone photo · Front only · Unretouched",
    shiftKick: "02 · The shift",
    shift: { pre: "What normally takes weeks. Done in ", em: "days", post: "." },
    cmpL: "Traditional Approach",
    cmpR: "Liora — visual launch system",
    cmpLShort: "Traditional",
    rows: {
      perDay: "~70 products / day",
      products: "250 products",
      hours: "72 hours",
      oneModel: "One booked model",
      twoModels: "Two signature models —",
      names: "Noa & Jonas",
      weeks: "Weeks of preparation",
      reusable: "One reusable visual system",
      logistics: "Models, sets & logistics",
      workflow: "An AI-native production workflow",
    },
    cmpFoot: "Same catalogue. A different order of time.",
    systemKick: "03 · The system",
    spine: { pre: "We designed a visual system that could ", em: "keep producing itself.", post: "" },
    systemLead: "Four interconnected layers turned raw product photos into launch-ready imagery — and made the next collection faster than the first.",
    layer: "Layer",
    castName: "The Cast",
    castLine: "Two signature models, designed for the brand — Noa and Jonas, built for consistency across hundreds of images, collections and campaigns.",
    castAlt: "signature model for the ADV launch",
    portraitPh: "Portrait · placeholder",
    vlName: "The Visual Language",
    vlLine: "A set of rules for light, composition and atmosphere — so every image belongs to the same world.",
    studioPh: "The ADV world — the set, between shots",
    tap: "Tap a label to explore",
    stylingName: "Styling Logic",
    stylingLine: "Each garment, styled on its own terms — because a brand doesn’t sell clothes, it sells taste.",
    stylingKick: "Sample styling categories",
    stylingCount: "3 of 250",
    stylingAlt: "styling for one ADV garment",
    stylingFoot: "Every one of 250 products was styled on its own — one system, endlessly repeatable.",
    orchName: "Visual Orchestration",
    orchLine: "Every product resolves to three frames. The pose set isn’t chosen by hand — it’s decided by gender and cut, the same way, every time.",
    orchOut: "→ 3 frames / product",
    orchAria: "category to frames to pose sets",
    orchHeads: ["CATEGORY", "FRAME", "POSE SET"],
    frame: "FRAME",
    orchFoot: "Six paths, one grammar — the same three beats, multiplied across 250 products.",
    outputKick: "04 · The output",
    outputH2: "The output, at scale.",
    outputLead: "Hundreds of launch-ready images, generated from a repeatable visual system — not one campaign, but a production engine.",
    outputAlt: "ADV — launch-ready output",
    outputCap: "Selected launch frames · one repeatable system",
    outcomeKick: "05 · Outcome",
    outcomeH2: "The result, in numbers.",
    metrics: [
      ["250", "Products"],
      ["72h", "Start to delivery"],
      ["2", "Signature models"],
      ["3", "Frames per product"],
      ["~750", "Final images"],
      // NOTE: confirm the real, defensible figure before publishing.
      ["~70%", "Lower production cost"],
    ],
    knockout: { pre: "Launched on time — ", em: "without a single photoshoot." },
    afterKick: "06 · And after",
    afterH2: "The launch wasn’t a one-off. It became a system the brand keeps building on.",
    afterLead: "The cast, the visual language and the orchestration remain — ready for the next collection, the next drop, the next season. Not a batch of images, but visual infrastructure the brand now owns.",
    cta: "Get in touch →",
    next: "Next work →",
    footer: "An AI-native creative systems lab",
  },
  tr: {
    back: "← İşler",
    switchCode: "EN",
    switchLabel: "English",
    heroAlt: "ADV — markanın iki imza mankeni Noa ve Jonas",
    title: { pre: "Bir marka, ", em: "72 saatte." },
    quiet: "250 ürün. Üç gün. Sıfırdan, yepyeni bir marka.",
    client: "Müşteri",
    service: "Hizmet",
    serviceName: "Özel Görsel Sistem",
    scroll: "Kaydır",
    problemKick: "01 · Sorun",
    staccato: ["250 ürün.", "72 saat.", "Çekim yok."],
    brief1: "ADV, Orka Holding bünyesinde yeni bir moda markasının lansmanına hazırlanıyordu. 250 ürünün aylar içinde değil, günler içinde yayına girmesi gerekiyordu.",
    brief2: "Ne bir çekim vardı ne manken ne de kurulu bir üretim düzeni. Elimizdeki tek girdi, ürünlerin önden çekilmiş ham telefon fotoğraflarıydı.",
    rawAlt: "Ham ürün girdisi — tek bir ADV parçası, telefonla önden çekilmiş",
    rawLabel: "Ham ürün girdisi 01",
    rawSub: "Telefon fotoğrafı · Yalnızca önden · Rötuşsuz",
    shiftKick: "02 · Dönüşüm",
    shift: { pre: "Normalde haftalar süren iş. ", em: "Günler", post: " içinde." },
    cmpL: "Geleneksel yöntem",
    cmpR: "Liora — görsel lansman sistemi",
    cmpLShort: "Geleneksel",
    rows: {
      perDay: "Günde ~70 ürün",
      products: "250 ürün",
      hours: "72 saat",
      oneModel: "Rezerve edilmiş tek bir manken",
      twoModels: "İki imza manken —",
      names: "Noa ve Jonas",
      weeks: "Haftalarca hazırlık",
      reusable: "Tekrar kullanılabilen tek bir görsel sistem",
      logistics: "Mankenler, setler ve lojistik",
      workflow: "Yapay zekâ temelli bir üretim akışı",
    },
    cmpFoot: "Aynı katalog. Bambaşka bir zaman ölçeği.",
    systemKick: "03 · Sistem",
    spine: { pre: "Kendi kendini ", em: "üretmeye devam eden", post: " bir görsel sistem tasarladık." },
    systemLead: "Birbirine bağlı dört katman, ham ürün fotoğraflarını yayına hazır görsellere dönüştürdü ve bir sonraki koleksiyonu ilkinden daha hızlı hale getirdi.",
    layer: "Katman",
    castName: "Kadro",
    castLine: "Markaya özel tasarlanmış iki imza manken: yüzlerce görselde, koleksiyonda ve kampanyada tutarlı kalmaları için kurulan Noa ve Jonas.",
    castAlt: "ADV lansmanının imza mankeni",
    portraitPh: "Portre · yer tutucu",
    vlName: "Görsel Dil",
    vlLine: "Işık, kompozisyon ve atmosfer için bir kurallar bütünü; böylece her görsel aynı dünyaya ait.",
    studioPh: "ADV dünyası — çekimler arasında set",
    tap: "Keşfetmek için bir etikete dokunun",
    stylingName: "Styling Mantığı",
    stylingLine: "Her parça kendi koşullarında giydirildi; çünkü bir marka kıyafet değil, zevk satar.",
    stylingKick: "Örnek styling kategorileri",
    stylingCount: "250'den 3'ü",
    stylingAlt: "bir ADV parçasının styling'i",
    stylingFoot: "250 ürünün her biri ayrı ayrı giydirildi; tek bir sistem, sonsuz kez tekrarlanabilir.",
    orchName: "Görsel Orkestrasyon",
    orchLine: "Her ürün üç kareye dönüşür. Poz seti elle seçilmez; cinsiyete ve kesime göre, her seferinde aynı şekilde belirlenir.",
    orchOut: "→ ürün başına 3 kare",
    orchAria: "kategoriden karelere, karelerden poz setlerine",
    orchHeads: ["KATEGORİ", "KARE", "POZ SETİ"],
    frame: "KARE",
    orchFoot: "Altı yol, tek bir dil bilgisi: aynı üç vuruş, 250 ürün boyunca.",
    outputKick: "04 · Çıktı",
    outputH2: "Ölçeğiyle çıktı.",
    outputLead: "Tekrarlanabilir bir görsel sistemden çıkan yüzlerce yayına hazır görsel: tek bir kampanya değil, üretmeye devam eden bir yapı.",
    outputAlt: "ADV — yayına hazır görsel",
    outputCap: "Seçilmiş lansman kareleri · tekrarlanabilir tek bir sistem",
    outcomeKick: "05 · Sonuç",
    outcomeH2: "Rakamlarla sonuç.",
    metrics: [
      ["250", "Ürün"],
      ["72 sa", "Başlangıçtan teslimata"],
      ["2", "İmza manken"],
      ["3", "Ürün başına kare"],
      ["~750", "Final görsel"],
      // NOTE: confirm the real, defensible figure before publishing.
      ["~%70", "Daha düşük üretim maliyeti"],
    ],
    knockout: { pre: "Zamanında yayında — ", em: "tek bir çekim yapmadan." },
    afterKick: "06 · Sonrası",
    afterH2: "Lansman tek seferlik değildi. Markanın üzerine kurmaya devam ettiği bir sisteme dönüştü.",
    afterLead: "Kadro, görsel dil ve orkestrasyon yerinde duruyor; bir sonraki koleksiyon, bir sonraki drop, bir sonraki sezon için hazır. Bir yığın görsel değil, artık markanın sahip olduğu bir görsel altyapı.",
    cta: "İletişime geçin →",
    next: "Sonraki iş →",
    footer: "Yapay zekâ temelli bir yaratıcı sistemler laboratuvarı",
  },
};

/**
 * ADV / Orka Holding case study — "Launching a brand in 72 hours."
 * Ported from the liora-case-adv prototype into the site: uses the site's tokens
 * + Neue Haas UI font (via var(--ui)), externalised hero image, fixed svh/vh
 * order, the shared --oxblood-on-dark token, dead CSS removed. Self-contained
 * scroll reveal (IntersectionObserver), reduced-motion safe.
 */
// Layer 04 graph geometry — a compact 3-column pipeline (category → frame →
// pose set) drawn once per gender; the two genders stack vertically. The
// viewBox is narrow so it renders ~1:1 (small type stays crisp) and the whole
// diagram reads quietly, well below the section heading.
const GEO = {
  w: 1200,
  catX: 24,
  catW: 216,
  frameX: 312,
  frameW: 156,
  poseX: 520,
  poseW: 656,
  y0: 52,
  frameH: 30,
  frameStep: 36,
  catGap: 44,
};
const CAT_H = 2 * GEO.frameStep + GEO.frameH; // 102 — three frame rows
const CAT_STEP = CAT_H + GEO.catGap;
const catTopY = (ci: number) => GEO.y0 + ci * CAT_STEP;
const frameCy = (ci: number, j: number) =>
  catTopY(ci) + GEO.frameH / 2 + j * GEO.frameStep;
const catCy = (ci: number) => catTopY(ci) + CAT_H / 2;
const geoH = (n: number) => catTopY(n - 1) + CAT_H + 18; // height for n categories
const elbow = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = Math.round((x1 + x2) / 2);
  return `M ${x1} ${y1} H ${mx} V ${y2} H ${x2}`;
};

export default function AdvCase({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  const upper = (s: string) => s.toLocaleUpperCase(lang);
  const studio = STUDIO[lang];
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const act = studio.find((s) => s.key === active);

  // Layer 04 — both genders shown, stacked. Hovering a category traces its
  // branch; at rest everything sits at a quiet, even weight.
  const [orchHover, setOrchHover] = useState<string | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(el.querySelectorAll<HTMLElement>(".reveal"));
    if (reduced) {
      items.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.16 }
    );
    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="advcase" ref={root}>
      <nav className="nav">
        <a className="wm" href={localize(lang, "/")} aria-label="Liora — home">
          LIORA
        </a>
        <span style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <a
            className="back"
            href={counterpart(lang, "/work/adv")}
            hrefLang={t.switchCode.toLowerCase()}
            aria-label={t.switchLabel}
          >
            {t.switchCode}
          </a>
          <a className="back" href={localize(lang, "/#work")}>
            {t.back}
          </a>
        </span>
      </nav>

      {/* 1 · HERO */}
      <section className="chero">
        <div className="media">
          <Image
            src="/adv-hero.jpg"
            alt={t.heroAlt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "50% 24%" }}
          />
        </div>
        <div className="scrim" />
        <div className="content">
          <div className="hkick">2026</div>
          <h1 className="ctitle">
            {t.title.pre}
            <em>{t.title.em}</em>
          </h1>
          <p className="cquiet">{t.quiet}</p>
          <div className="hmeta">
            <div className="it">
              <span>{t.client}</span> &nbsp;ADV, Orka Holding
            </div>
            <div className="sep" />
            <div className="it">
              <span>{t.service}</span> &nbsp;{t.serviceName}
            </div>
          </div>
        </div>
        <div className="scrollcue">
          <span className="ln" />
          {t.scroll}
        </div>
      </section>

      {/* 2 · THE BRIEF */}
      <section className="sec light">
        <div className="wrap">
          <div className="brief-grid">
            <div>
              <div className="kick reveal">{t.problemKick}</div>
              <div className="staccato reveal">
                {t.staccato.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <p className="brief-note reveal">{t.brief1}</p>
              <p className="brief-note reveal">{t.brief2}</p>
            </div>
            <figure className="rawshot reveal">
              <div className="rawshot-img">
                <Image
                  src="/flat-01.jpg"
                  alt={t.rawAlt}
                  fill
                  sizes="(max-width: 900px) 92vw, 600px"
                  style={{
                    objectFit: "cover",
                    filter:
                      "saturate(0.88) contrast(0.96) brightness(1.02) sepia(0.05)",
                  }}
                />
                <div className="rawshot-veil" aria-hidden="true" />
              </div>
              <figcaption className="rawshot-cap">
                <span className="rawshot-label">{t.rawLabel}</span>
                <span className="rawshot-sub">{t.rawSub}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 3 · THE SHIFT */}
      <section className="sec dark">
        <div className="wrap">
          <div className="kick reveal">{t.shiftKick}</div>
          <h2 className="h2 reveal">
            {t.shift.pre}
            <em>{t.shift.em}</em>
            {t.shift.post}
          </h2>
          <div className="cmp reveal">
            <div className="cmp-row head">
              <div className="l">{t.cmpL}</div>
              <div className="r">{t.cmpR}</div>
            </div>
            <div className="cmp-row">
              <div className="l" data-label={t.cmpLShort}>{t.rows.perDay}</div>
              <div className="r" data-label="Liora">
                <b>{t.rows.products}</b> / <span className="ox">{t.rows.hours}</span>
              </div>
            </div>
            <div className="cmp-row">
              <div className="l" data-label={t.cmpLShort}>{t.rows.oneModel}</div>
              <div className="r" data-label="Liora">
                {t.rows.twoModels} <b>{t.rows.names}</b>
              </div>
            </div>
            <div className="cmp-row">
              <div className="l" data-label={t.cmpLShort}>{t.rows.weeks}</div>
              <div className="r" data-label="Liora">{t.rows.reusable}</div>
            </div>
            <div className="cmp-row">
              <div className="l" data-label={t.cmpLShort}>{t.rows.logistics}</div>
              <div className="r" data-label="Liora">{t.rows.workflow}</div>
            </div>
          </div>
          <p className="cmp-foot reveal">{t.cmpFoot}</p>
        </div>
      </section>

      {/* 4 · THE SYSTEM */}
      <section className="sec light">
        <div className="wrap">
          <div className="kick reveal">{t.systemKick}</div>
          <h2 className="spine h2 reveal">
            {t.spine.pre}
            <em>{t.spine.em}</em>
            {t.spine.post}
          </h2>
          <p className="lead reveal">{t.systemLead}</p>
        </div>
      </section>

      {/* Layer 01 — Cast (full-bleed chapter; placeholders until real imagery) */}
      <section className="chapter">
        <header className="modhead reveal">
          <span className="modhead-no">{t.layer} 01</span>
          <h3 className="modhead-name">{t.castName}</h3>
          <p className="modhead-line">{t.castLine}</p>
        </header>
        <div className="castpair">
          {CAST[lang].map((m) => (
            <figure className="castfig reveal" key={m.name}>
              <div className="castfig-img">
                {m.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.img}
                    alt={`${m.name} — ${t.castAlt}`}
                    loading="lazy"
                  />
                ) : (
                  <span className="castfig-ph">{t.portraitPh}</span>
                )}
              </div>
              <figcaption className="castfig-cap">
                <h4 className="castfig-name">{m.name}</h4>
                <p className="castfig-meta">
                  {m.ethnicity} · {m.age} · {m.city}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Layer 02 · The Visual Language — interactive "set memory" studio */}
      <section className="chapter">
        <header className="modhead reveal">
          <span className="modhead-no">{t.layer} 02</span>
          <h3 className="modhead-name">{t.vlName}</h3>
          <p className="modhead-line">{t.vlLine}</p>
        </header>
        <div className="studio reveal">
          <div className="studio-stage" onMouseLeave={() => setActive(null)}>
            <div className="studio-clip" aria-hidden="true">
              <Image
                className="studio-bg"
                src="/visual-language.jpg"
                alt=""
                fill
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div
                className="studio-spot"
                style={{
                  left: `${act ? act.x : 50}%`,
                  top: `${act ? act.y : 45}%`,
                  opacity: act ? 1 : 0,
                }}
              />
              <span className="studio-ph">{t.studioPh}</span>
            </div>
            {studio.map((s) => (
              <div
                className="studio-hot"
                key={s.key}
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                <button
                  type="button"
                  className={`studio-key${active === s.key ? " on" : ""}`}
                  onMouseEnter={() => setActive(s.key)}
                  onClick={() => setActive(s.key)}
                  onFocus={() => setActive(s.key)}
                  onBlur={() => setActive(null)}
                  aria-label={`${s.key} — ${s.tip}`}
                >
                  {s.key}
                </button>
                <span
                  className={`studio-tip${active === s.key ? " on" : ""}${
                    s.y > 64 ? " up" : ""
                  }${s.x < 30 ? " tl" : s.x > 70 ? " tr" : ""}`}
                  role="tooltip"
                >
                  {s.tip}
                </span>
              </div>
            ))}
          </div>
          <p className="studio-tap">{t.tap}</p>
        </div>
      </section>

      {/* Layer 03 · Styling Logic — real styling frames, a sample of 250 */}
      <section className="chapter">
        <header className="modhead reveal">
          <span className="modhead-no">{t.layer} 03</span>
          <h3 className="modhead-name">{t.stylingName}</h3>
          <p className="modhead-line">{t.stylingLine}</p>
        </header>
        <div className="styling reveal">
          <div className="styling-head">
            <span className="styling-kick">{t.stylingKick}</span>
            <span className="styling-count">{t.stylingCount}</span>
          </div>
          <div className="stylegrid">
            {STYLING[lang].map((s, i) => (
              <figure className="stylefig" key={s.cat}>
                <div className="stylefig-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={STYLING_IMG[i]}
                    alt={`${s.cat} — ${t.stylingAlt}`}
                    loading="lazy"
                  />
                </div>
                <figcaption className="stylefig-cap">
                  <span className="stylefig-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="stylefig-cat">{s.cat}</span>
                  <span className="stylefig-note">{s.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="styling-foot">{t.stylingFoot}</p>
        </div>
      </section>

      {/* Layer 04 · Visual Orchestration — the pose engine, as a live system */}
      <section className="chapter">
        <header className="modhead reveal">
          <span className="modhead-no">{t.layer} 04</span>
          <h3 className="modhead-name">{t.orchName}</h3>
          <p className="modhead-line">{t.orchLine}</p>
        </header>

        <div className="orch reveal">
          {ORCH[lang].map((g) => (
            <div className="orx-block" key={g.gender}>
              <div className="orx-glabel">
                <span>{g.gender}</span>
                <span className="orx-glabel-out">{t.orchOut}</span>
              </div>
              <div className="orx-scroll">
                <svg
                  className="orx-svg"
                  viewBox={`0 0 ${GEO.w} ${geoH(g.cats.length)}`}
                  role="img"
                  aria-label={`${g.gender} — ${t.orchAria}`}
                >
                  {/* column headers */}
                  {[
                    [t.orchHeads[0], GEO.catX + GEO.catW / 2],
                    [t.orchHeads[1], GEO.frameX + GEO.frameW / 2],
                    [t.orchHeads[2], GEO.poseX + GEO.poseW / 2],
                  ].map(([h, x]) => (
                    <text
                      key={h as string}
                      className="orx-head"
                      x={x as number}
                      y={26}
                      textAnchor="middle"
                    >
                      {h}
                    </text>
                  ))}

                  {/* connectors */}
                  {g.cats.map((c, j) => {
                    const cls = `orx-link ${
                      orchHover === c.key ? "on" : orchHover ? "off" : "rest"
                    }`;
                    return (
                      <g key={`lk-${c.key}`}>
                        {c.sets.map((_, k) => (
                          <path
                            key={`cf${k}`}
                            className={cls}
                            d={elbow(
                              GEO.catX + GEO.catW,
                              catCy(j),
                              GEO.frameX,
                              frameCy(j, k)
                            )}
                          />
                        ))}
                        {c.sets.map((_, k) => (
                          <path
                            key={`fp${k}`}
                            className={cls}
                            d={elbow(
                              GEO.frameX + GEO.frameW,
                              frameCy(j, k),
                              GEO.poseX,
                              frameCy(j, k)
                            )}
                          />
                        ))}
                      </g>
                    );
                  })}

                  {/* nodes */}
                  {g.cats.map((c, j) => {
                    const st =
                      orchHover === c.key ? "on" : orchHover ? "off" : "rest";
                    return (
                      <g key={c.key}>
                        <g
                          className={`orx-node orx-hit orx-cat ${st}`}
                          tabIndex={0}
                          role="button"
                          aria-label={`${g.gender} ${c.label}`}
                          onMouseEnter={() => setOrchHover(c.key)}
                          onMouseLeave={() => setOrchHover(null)}
                          onFocus={() => setOrchHover(c.key)}
                          onBlur={() => setOrchHover(null)}
                        >
                          <rect
                            className="orx-box"
                            x={GEO.catX}
                            y={catCy(j) - 24}
                            width={GEO.catW}
                            height={48}
                            rx={2}
                          />
                          <text
                            className="orx-cat-t"
                            x={GEO.catX + 16}
                            y={catCy(j) - 4}
                          >
                            {upper(c.label)}
                          </text>
                          <text
                            className="orx-cat-code"
                            x={GEO.catX + 16}
                            y={catCy(j) + 14}
                          >
                            {c.code}
                          </text>
                        </g>

                        {c.sets.map((s, k) => (
                          <g
                            key={`fr${k}`}
                            className={`orx-node orx-frame ${st}`}
                          >
                            <rect
                              className="orx-box"
                              x={GEO.frameX}
                              y={frameCy(j, k) - 15}
                              width={GEO.frameW}
                              height={30}
                              rx={2}
                            />
                            <text
                              className="orx-frame-t"
                              x={GEO.frameX + GEO.frameW / 2}
                              y={frameCy(j, k)}
                              textAnchor="middle"
                              dominantBaseline="central"
                            >
                              {t.frame} 0{k + 1}
                            </text>
                          </g>
                        ))}

                        <g className={`orx-node orx-pose ${st}`}>
                          <rect
                            className="orx-box"
                            x={GEO.poseX}
                            y={catTopY(j)}
                            width={GEO.poseW}
                            height={CAT_H}
                            rx={2}
                          />
                          {c.sets.map((s, k) => (
                            <g key={`ps${k}`}>
                              <text
                                className="orx-pose-beat"
                                x={GEO.poseX + 16}
                                y={frameCy(j, k)}
                                dominantBaseline="central"
                              >
                                {upper(s.beat)}
                              </text>
                              <text
                                className="orx-pose-pose"
                                x={GEO.poseX + 140}
                                y={frameCy(j, k)}
                                dominantBaseline="central"
                              >
                                {s.pose}
                              </text>
                            </g>
                          ))}
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          ))}
        </div>

        <p className="orch-foot reveal">{t.orchFoot}</p>
      </section>

      {/* 4 · THE OUTPUT — full-bleed wall of results */}
      <section className="sec dark">
        <div className="wrap">
          <div className="kick reveal">{t.outputKick}</div>
          <h2 className="h2 reveal">{t.outputH2}</h2>
          <p className="lead reveal">{t.outputLead}</p>
        </div>
        <div className="gallery reveal">
          {GALLERY.map((src, i) => (
            <figure className="gtile" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={t.outputAlt} loading="lazy" />
            </figure>
          ))}
        </div>
        <p className="gallery-cap reveal">{t.outputCap}</p>
      </section>

      {/* 8 · OUTCOME */}
      <section className="sec light">
        <div className="wrap">
          <div className="kick reveal">{t.outcomeKick}</div>
          <h2 className="h2 reveal">{t.outcomeH2}</h2>
          <div className="metrics">
            {t.metrics.map(([num, label]) => (
              <div className="m reveal" key={label}>
                <div className="num">{num}</div>
                <div className="ml">{label}</div>
              </div>
            ))}
          </div>
          <h3 className="knockout reveal">
            {t.knockout.pre}
            <em>{t.knockout.em}</em>
          </h3>
        </div>
      </section>

      {/* 6 · AND AFTER (close) */}
      <section className="sec dark close">
        <div className="wrap">
          <div className="kick reveal">{t.afterKick}</div>
          <h2 className="h2 reveal">{t.afterH2}</h2>
          <p className="lead reveal">{t.afterLead}</p>
          <div className="cta-row reveal">
            <a className="btn solid" href={mailto(lang)}>
              {t.cta}
            </a>
            <a className="btn ghost" href={localize(lang, "/#work")}>
              {t.next}
            </a>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <a className="wm" href={localize(lang, "/")} aria-label="Liora — home">
            LIORA
          </a>
          <div className="c">
            © {new Date().getFullYear()} Liora Labs · {t.footer}
          </div>
        </div>
      </footer>

      <style jsx>{`
        .advcase {
          --tx: var(--text);
          --tx-mut: var(--text-mut);
          --on: var(--on-dark);
          --on-mut: var(--on-dark-mut);
          --on-line: rgba(239, 232, 218, 0.16);
          --bone2: var(--bone-2);
          --ink2: var(--ink-2);
          --display: var(--font-display);
          --ui: var(--font-ui);
          --mono: var(--font-mono);
          background: var(--ink);
          color: var(--on);
          font-family: var(--ui);
          -webkit-font-smoothing: antialiased;
        }
        .wrap {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 0 var(--pad);
        }
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
        }
        .reveal.in {
          opacity: 1;
          transform: none;
        }
        .sec {
          padding: clamp(96px, 12vw, 168px) 0;
        }
        .sec.light {
          background: var(--bone);
          color: var(--tx);
        }
        .sec.dark {
          background: var(--ink);
          color: var(--on);
        }
        .sec.ox {
          background: var(--oxblood);
          color: #f2ede3;
        }
        .kick {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .light .kick {
          color: var(--tx-mut);
        }
        .dark .kick {
          color: var(--on-mut);
        }
        .ox .kick {
          color: rgba(242, 237, 227, 0.6);
        }
        .h2 {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(30px, 4.2vw, 54px);
          line-height: 1.1;
          letter-spacing: -0.016em;
          margin-top: 22px;
        }
        .h2 em {
          font-style: italic;
        }
        .lead {
          font-family: var(--ui);
          font-size: clamp(15px, 1.5vw, 17px);
          line-height: 1.74;
          max-width: 56ch;
          margin-top: 28px;
        }
        .light .lead {
          color: var(--tx-mut);
        }
        .dark .lead {
          color: var(--on-mut);
        }
        .ox .lead {
          color: rgba(242, 237, 227, 0.78);
        }

        /* nav */
        .nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 26px var(--pad) 0;
        }
        .nav .wm {
          font-family: var(--display);
          font-weight: 400;
          font-size: 21px;
          letter-spacing: 0.22em;
          color: var(--on);
          text-decoration: none;
        }
        .nav .back {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          color: var(--on-mut);
          text-decoration: none;
          transition: color 0.3s var(--ease);
        }
        .nav .back:hover {
          color: var(--gold);
        }

        /* hero */
        .chero {
          position: relative;
          width: 100%;
          min-height: 92vh;
          min-height: 92svh;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          background: var(--ink);
        }
        .chero .media {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .chero .media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 24%;
          display: block;
        }
        .chero .scrim {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            to bottom,
            rgba(16, 14, 11, 0.1) 0%,
            rgba(16, 14, 11, 0) 30%,
            rgba(16, 14, 11, 0.3) 60%,
            rgba(16, 14, 11, 0.86) 100%
          );
        }
        .chero .content {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 0 var(--pad) clamp(48px, 6vw, 84px);
        }
        .hkick {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--on-mut);
          opacity: 0;
          animation: rise 0.9s var(--ease) 0.15s forwards;
        }
        .ctitle {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(40px, 6.6vw, 94px);
          line-height: 1.03;
          letter-spacing: -0.02em;
          color: var(--on);
          margin-top: 18px;
          max-width: 16ch;
          opacity: 0;
          animation: rise 1s var(--ease) 0.28s forwards;
        }
        .ctitle em {
          font-style: italic;
        }
        .cquiet {
          font-family: var(--ui);
          font-size: clamp(15px, 1.5vw, 17px);
          color: var(--on-mut);
          margin-top: 26px;
          opacity: 0;
          animation: rise 1s var(--ease) 0.42s forwards;
        }
        .hmeta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px 20px;
          margin-top: 34px;
          opacity: 0;
          animation: rise 1s var(--ease) 0.54s forwards;
        }
        .hmeta .it {
          font-family: var(--mono);
          font-size: 11.5px;
          letter-spacing: 0.06em;
          color: var(--on);
        }
        .hmeta .it span {
          color: var(--on-mut);
        }
        .hmeta .sep {
          width: 1px;
          height: 13px;
          background: var(--on-line);
        }
        .scrollcue {
          position: absolute;
          z-index: 3;
          right: var(--pad);
          bottom: clamp(48px, 6vw, 84px);
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--mono);
          font-size: 10.5px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--on-mut);
          opacity: 0;
          animation: rise 1s var(--ease) 0.7s forwards;
        }
        .scrollcue .ln {
          width: 34px;
          height: 1px;
          background: var(--on-mut);
          position: relative;
          overflow: hidden;
        }
        .scrollcue .ln::after {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--on);
          transform: translateX(-100%);
          animation: sweep 2.4s var(--ease) 1.2s infinite;
        }
        @keyframes rise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hkick,
        .ctitle,
        .cquiet,
        .hmeta,
        .scrollcue {
          transform: translateY(20px);
        }
        @keyframes sweep {
          0% {
            transform: translateX(-100%);
          }
          60% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* placeholder tile */
        .ph {
          position: relative;
          border-radius: var(--r);
          overflow: hidden;
        }
        .ph.lite {
          background: linear-gradient(135deg, #e9e2d5, #c8bca8);
        }
        .ph .t {
          position: absolute;
          left: 12px;
          bottom: 10px;
          font-family: var(--mono);
          font-size: 9.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .lite .t {
          color: #5b513f;
        }

        /* raw product input — a real unretouched phone shot, softened so it
           sits inside the warm palette instead of clashing with it */
        .rawshot {
          margin: 0;
        }
        .rawshot-img {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: var(--r);
          background: var(--bone-2);
        }
        .rawshot-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.88) contrast(0.96) brightness(1.02) sepia(0.05);
        }
        .rawshot-veil {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
              180deg,
              rgba(226, 216, 198, 0.2),
              rgba(226, 216, 198, 0.08)
            ),
            radial-gradient(
              128% 100% at 50% 42%,
              transparent 58%,
              rgba(28, 23, 17, 0.15) 100%
            );
        }
        .rawshot-cap {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 14px;
        }
        .rawshot-label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--tx);
        }
        .rawshot-sub {
          font-family: var(--mono);
          font-size: 10.5px;
          letter-spacing: 0.1em;
          color: var(--tx-mut);
        }

        /* cast — full-bleed signature models */
        .cast {
          background: var(--ink);
        }
        .castcard {
          display: grid;
          grid-template-columns: 1.12fr 0.88fr;
          min-height: 100vh;
          min-height: 100svh;
        }
        .castcard + .castcard {
          border-top: 1px solid var(--on-line);
        }
        .cast-portrait {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: clamp(28px, 4vw, 60px);
          background: linear-gradient(158deg, #2a2017 0%, #150f0a 55%, #0b0806 100%);
        }
        .cast-eyebrow {
          position: absolute;
          top: clamp(24px, 3vw, 44px);
          left: clamp(28px, 4vw, 60px);
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--on-mut);
        }
        .cast-phtag {
          position: absolute;
          top: clamp(24px, 3vw, 44px);
          right: clamp(28px, 4vw, 60px);
          font-family: var(--mono);
          font-size: 9.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(239, 232, 218, 0.4);
        }
        .cast-id {
          position: relative;
          z-index: 2;
        }
        .cast-name {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(40px, 6vw, 88px);
          line-height: 1;
          letter-spacing: -0.022em;
          color: var(--on);
        }
        .cast-role {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--on-mut);
          margin-top: 16px;
        }
        .cast-panel {
          background: var(--bone);
          color: var(--tx);
          padding: clamp(28px, 4vw, 60px);
          display: flex;
          flex-direction: column;
        }
        .cast-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(10px, 1.2vw, 16px);
        }
        .cast-thumb {
          position: relative;
          aspect-ratio: 3 / 4;
          border-radius: var(--r);
          background: linear-gradient(135deg, #e9e2d5, #c8bca8);
        }
        .cast-thumb span {
          position: absolute;
          left: 11px;
          bottom: 9px;
          font-family: var(--mono);
          font-size: 9.5px;
          letter-spacing: 0.16em;
          color: #5b513f;
        }
        .cast-meta {
          margin-top: clamp(28px, 4vw, 44px);
          display: grid;
          gap: 10px;
        }
        .cast-meta .row {
          display: grid;
          grid-template-columns: 96px 1fr;
          border-top: 1px solid var(--stone);
          padding-top: 10px;
        }
        .cast-meta .k,
        .cast-meta .v {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .cast-meta .k {
          color: var(--tx-mut);
        }
        .cast-meta .v {
          color: var(--tx);
        }
        .cast-foot {
          margin-top: auto;
          padding-top: clamp(28px, 3vw, 44px);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 18px;
        }
        .cast-foot .note {
          font-family: var(--mono);
          font-size: 10.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--tx-mut);
          max-width: 22ch;
          line-height: 1.6;
        }
        .cast-mark {
          font-family: var(--display);
          font-size: 18px;
          letter-spacing: 0.18em;
          color: var(--tx);
          text-align: right;
          white-space: nowrap;
        }
        .cast-mark small {
          display: block;
          font-family: var(--mono);
          font-size: 8.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--tx-mut);
          margin-top: 4px;
        }
        @media (max-width: 820px) {
          .castcard {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .cast-portrait {
            min-height: 76svh;
          }
        }

        /* cast — side-by-side (MVP) */
        .castpair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 2vw, 30px);
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 0 var(--pad) clamp(64px, 9vw, 120px);
        }
        .castfig-img {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: var(--r);
          background: linear-gradient(158deg, #2a2017, #0f0b09);
        }
        .castfig-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 28%;
          display: block;
        }
        .castfig-ph {
          position: absolute;
          left: 14px;
          bottom: 12px;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(239, 232, 218, 0.45);
        }
        .castfig-cap {
          margin-top: clamp(16px, 2vw, 24px);
        }
        .castfig-name {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(24px, 2.6vw, 34px);
          line-height: 1.1;
          letter-spacing: -0.015em;
          color: var(--on);
        }
        .castfig-meta {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--on-mut);
          margin-top: 12px;
        }
        @media (max-width: 720px) {
          .castpair {
            grid-template-columns: 1fr;
            gap: clamp(32px, 6vw, 48px);
          }
        }

        /* system chapters + contact sheets */
        .chapter {
          background: var(--ink);
          color: var(--on);
        }
        .modhead {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: clamp(64px, 9vw, 128px) var(--pad) clamp(30px, 4vw, 50px);
        }
        .modhead-no {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--on-mut);
        }
        .modhead-name {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(26px, 3.4vw, 42px);
          line-height: 1.1;
          letter-spacing: -0.016em;
          color: var(--on);
          margin-top: 14px;
        }
        .modhead-line {
          font-family: var(--ui);
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.7;
          color: var(--on-mut);
          max-width: 56ch;
          margin-top: 18px;
        }
        .sheet {
          display: grid;
          gap: clamp(8px, 1vw, 14px);
          padding: 0 var(--pad);
        }
        .sheet-tile {
          aspect-ratio: 3 / 4;
          border-radius: var(--r);
          border: 1px solid var(--on-line);
          background: linear-gradient(150deg, #241a14, #0f0b09);
        }
        .sheet-cap {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: clamp(18px, 2vw, 26px) var(--pad) clamp(64px, 9vw, 120px);
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--on-mut);
        }
        @media (max-width: 760px) {
          .sheet {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        /* orchestration — a compact 3-column pipeline per gender, the two
           genders stacked. Contained + small, quiet beneath the heading. */
        .orch {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: clamp(6px, 1.2vw, 16px) var(--pad) 0;
        }
        .orx-block + .orx-block {
          margin-top: clamp(30px, 4vw, 54px);
        }
        .orx-glabel {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          padding-bottom: 11px;
          margin-bottom: 4px;
          border-bottom: 1px solid var(--on-line);
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .orx-glabel-out {
          color: var(--on-mut);
          letter-spacing: 0.12em;
        }
        .orx-scroll {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
        }
        .orx-svg {
          display: block;
          width: 100%;
          height: auto;
        }
        .orx-head {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 2px;
          fill: var(--on-mut);
        }
        .orx-link {
          fill: none;
          stroke: var(--on-line);
          stroke-width: 1;
          transition: stroke 0.35s var(--ease), opacity 0.35s var(--ease);
        }
        .orx-link.rest {
          opacity: 0.5;
        }
        .orx-link.on {
          stroke: var(--gold);
          opacity: 1;
        }
        .orx-link.off {
          opacity: 0.14;
        }
        .orx-box {
          fill: rgba(239, 232, 218, 0.014);
          stroke: var(--on-line);
          stroke-width: 1;
          transition: stroke 0.35s var(--ease), fill 0.35s var(--ease);
        }
        .orx-node {
          transition: opacity 0.35s var(--ease);
        }
        .orx-node.off {
          opacity: 0.32;
        }
        .orx-node.on .orx-box {
          stroke: var(--gold);
          fill: rgba(176, 122, 46, 0.06);
        }
        .orx-hit {
          cursor: pointer;
        }
        .orx-hit:focus {
          outline: none;
        }
        .orx-hit:focus-visible .orx-box {
          stroke: var(--gold);
          stroke-width: 1.5;
        }
        .orx-cat-t {
          font-family: var(--mono);
          font-size: 15px;
          letter-spacing: 0.5px;
          fill: var(--on);
        }
        .orx-cat-code {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 1px;
          fill: var(--on-mut);
        }
        .orx-node.on .orx-cat-code {
          fill: var(--gold);
        }
        .orx-frame-t {
          font-family: var(--mono);
          font-size: 11.5px;
          letter-spacing: 0.5px;
          fill: var(--on-mut);
        }
        .orx-node.on .orx-frame-t {
          fill: var(--on);
        }
        .orx-pose-beat {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.5px;
          fill: var(--on-mut);
        }
        .orx-node.on .orx-pose-beat {
          fill: var(--gold);
        }
        .orx-pose-pose {
          font-family: var(--mono);
          font-size: 13.5px;
          fill: var(--on);
        }
        .orch-foot {
          max-width: var(--maxw);
          margin: clamp(30px, 4vw, 52px) auto 0;
          padding: 0 var(--pad);
          font-family: var(--display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(18px, 2vw, 25px);
          line-height: 1.4;
          color: var(--on);
        }
        @media (max-width: 720px) {
          .orx-svg {
            min-width: 720px;
          }
        }

        /* styling logic — real frames (Layer 03) */
        .styling {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 0 var(--pad) clamp(64px, 9vw, 120px);
        }
        .styling-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          padding-bottom: clamp(18px, 2.2vw, 28px);
          border-bottom: 1px solid var(--on-line);
          margin-bottom: clamp(20px, 2.4vw, 32px);
        }
        .styling-kick,
        .styling-count {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .styling-kick {
          color: var(--on-mut);
        }
        .styling-count {
          color: var(--oxblood-on-dark);
          white-space: nowrap;
        }
        .stylegrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(14px, 1.6vw, 24px);
        }
        .stylefig {
          margin: 0;
        }
        .stylefig-img {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: var(--r);
          border: 1px solid var(--on-line);
          background: var(--ink-2);
        }
        .stylefig-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.9s var(--ease);
        }
        .stylefig:hover .stylefig-img img {
          transform: scale(1.03);
        }
        .stylefig-cap {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-top: 15px;
        }
        .stylefig-no {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--on-mut);
        }
        .stylefig-cat {
          font-family: var(--ui);
          font-size: clamp(13px, 1.3vw, 15px);
          color: var(--on);
        }
        .stylefig-note {
          margin-left: auto;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--oxblood-on-dark);
        }
        .styling-foot {
          font-family: var(--display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(18px, 2vw, 24px);
          line-height: 1.4;
          color: var(--on);
          max-width: 42ch;
          margin-top: clamp(28px, 3.5vw, 44px);
        }
        @media (max-width: 620px) {
          .stylegrid {
            grid-template-columns: 1fr;
            gap: clamp(22px, 6vw, 34px);
            max-width: 460px;
          }
        }

        /* studio — interactive "set memory" */
        .studio {
          padding: 0 0 clamp(64px, 9vw, 120px);
        }
        .studio-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 2560 / 1429;
        }
        .studio-clip {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 0;
          background: var(--ink-2);
        }
        .studio-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .studio-spot {
          position: absolute;
          width: 42vw;
          height: 42vw;
          max-width: 620px;
          max-height: 620px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 2;
          mix-blend-mode: screen;
          background: radial-gradient(
            circle,
            rgba(255, 238, 210, 0.42) 0%,
            rgba(255, 238, 210, 0.14) 44%,
            transparent 68%
          );
          transition: opacity 0.45s var(--ease), left 0.5s var(--ease),
            top 0.5s var(--ease);
        }
        .studio-ph {
          position: absolute;
          left: 14px;
          bottom: 12px;
          font-family: var(--mono);
          font-size: 9.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(24, 16, 8, 0.5);
        }
        .studio-hot {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 3;
        }
        .studio-key {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 4px;
          background: none;
          border: 0;
          cursor: pointer;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 250, 242, 0.92);
          text-shadow: 0 0 1px rgba(20, 14, 8, 0.7), 0 1px 3px rgba(20, 14, 8, 0.6),
            0 0 12px rgba(20, 14, 8, 0.45);
          transition: color 0.3s var(--ease);
        }
        .studio-key::before {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.7;
          transition: transform 0.3s var(--ease), opacity 0.3s var(--ease);
        }
        .studio-key:hover,
        .studio-key.on {
          color: #fff;
        }
        .studio-key:hover::before,
        .studio-key.on::before {
          transform: scale(1.7);
          opacity: 1;
        }
        .studio-key:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 3px;
        }
        .studio-tip {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translate(-50%, 4px);
          width: max-content;
          max-width: 230px;
          padding: 12px 14px;
          border-radius: var(--r);
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(16, 14, 11, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-family: var(--mono);
          font-size: 11px;
          line-height: 1.65;
          letter-spacing: 0.02em;
          text-transform: none;
          color: var(--on);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
          z-index: 4;
        }
        .studio-tip.up {
          top: auto;
          bottom: calc(100% + 10px);
        }
        /* edge labels: anchor the tip inward so it never leaves the viewport */
        .studio-tip.tl {
          left: 0;
          transform: translate(0, 4px);
        }
        .studio-tip.tr {
          left: auto;
          right: 0;
          transform: translate(0, 4px);
        }
        .studio-tip.on {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, 0);
        }
        .studio-tip.tl.on,
        .studio-tip.tr.on {
          transform: translate(0, 0);
        }
        .studio-tap {
          display: none;
        }
        @media (max-width: 640px) {
          /* keep the interactive labels on the image (tap to reveal). The 16:9
             strip is short but the words stay on the set, not in a flat list. */
          .studio-key {
            font-size: 9.5px;
            letter-spacing: 0.1em;
            padding: 5px 3px;
          }
          .studio-key::before {
            width: 4px;
            height: 4px;
          }
          .studio-tip {
            max-width: 178px;
            font-size: 10.5px;
            padding: 10px 12px;
          }
          .studio-ph {
            font-size: 8.5px;
          }
          .studio-tap {
            display: block;
            padding: 14px var(--pad) 0;
            font-family: var(--mono);
            font-size: 10px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: var(--on-mut);
          }
        }

        /* brief */
        .brief-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(40px, 6vw, 90px);
          align-items: center;
        }
        .staccato {
          margin-top: 26px;
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(30px, 4.4vw, 56px);
          line-height: 1.16;
          letter-spacing: -0.018em;
          color: var(--tx);
        }
        .staccato span {
          display: block;
        }
        .brief-note {
          font-family: var(--ui);
          font-size: clamp(14px, 1.4vw, 16px);
          color: var(--tx-mut);
          margin-top: 22px;
        }
        .pull {
          font-family: var(--display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(20px, 2.2vw, 27px);
          line-height: 1.4;
          color: var(--oxblood);
          border-left: 1px solid var(--oxblood);
          padding-left: 22px;
          margin-top: 38px;
          max-width: 36ch;
        }

        /* constraint / shift */
        .cmp {
          margin-top: 54px;
          border-top: 1px solid var(--on-line);
        }
        .cmp-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--on-line);
        }
        .cmp-row > div {
          padding: 24px 26px;
        }
        .cmp-row .l {
          color: var(--on-mut);
          border-right: 1px solid var(--on-line);
          font-family: var(--ui);
          font-size: 15px;
        }
        .cmp-row .r {
          color: var(--on);
          font-family: var(--ui);
          font-size: 15px;
        }
        .cmp-row.head > div {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding-top: 16px;
          padding-bottom: 16px;
        }
        .cmp-row.head .l {
          color: var(--on-mut);
        }
        .cmp-row.head .r {
          color: var(--gold);
        }
        .cmp-row .r b {
          color: #f2ede3;
          font-weight: 500;
        }
        .cmp-row .r .ox {
          color: var(--oxblood-on-dark);
        }
        .cmp-foot {
          font-family: var(--display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(19px, 2vw, 25px);
          color: var(--on);
          margin-top: 36px;
        }

        /* system */
        .spine {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(28px, 3.6vw, 46px);
          line-height: 1.16;
          letter-spacing: -0.015em;
          max-width: 20ch;
        }
        .spine em {
          font-style: italic;
        }
        .mods {
          margin-top: 64px;
          border-top: 1px solid rgba(26, 22, 17, 0.14);
        }
        .mod {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: clamp(20px, 4vw, 56px);
          align-items: start;
          padding: 34px 0;
          border-bottom: 1px solid rgba(26, 22, 17, 0.14);
        }
        .mod .no {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.1em;
          color: var(--gold);
          padding-top: 6px;
        }
        .mod .mname {
          font-family: var(--display);
          font-weight: 400;
          font-size: clamp(21px, 2vw, 28px);
          letter-spacing: -0.01em;
        }
        .mod .mcopy {
          font-family: var(--ui);
          font-size: 14.5px;
          line-height: 1.66;
          color: var(--tx-mut);
          margin-top: 12px;
          max-width: 48ch;
        }
        .mod .mph {
          width: clamp(120px, 14vw, 190px);
          aspect-ratio: 4 / 5;
        }
        @media (max-width: 760px) {
          .mod {
            grid-template-columns: auto 1fr;
          }
          .mod .mph {
            display: none;
          }
        }

        /* outcome */
        .metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(36px, 4vw, 64px) clamp(28px, 4vw, 60px);
          margin-top: 54px;
        }
        .m .num {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(44px, 5.4vw, 82px);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--tx);
        }
        .m .ml {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--tx-mut);
          margin-top: 14px;
        }

        /* the output — full-bleed wall of results */
        .gallery {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(5px, 0.7vw, 10px);
          margin-top: clamp(38px, 5vw, 66px);
          padding: 0 clamp(5px, 0.7vw, 10px);
        }
        .gtile {
          position: relative;
          margin: 0;
          aspect-ratio: 2 / 3;
          overflow: hidden;
          background: var(--ink-2);
        }
        .gtile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(0.12) contrast(1.02) brightness(0.98);
          transition: transform 0.9s var(--ease), filter 0.6s var(--ease);
        }
        .gtile:hover img {
          transform: scale(1.04);
          filter: none;
        }
        .gallery-cap {
          max-width: var(--maxw);
          margin: clamp(16px, 2vw, 24px) auto 0;
          padding: 0 var(--pad);
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--on-mut);
        }
        @media (max-width: 640px) {
          .gallery {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .knockout {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(30px, 4.4vw, 58px);
          line-height: 1.1;
          letter-spacing: -0.018em;
          color: var(--tx);
          margin-top: 64px;
          max-width: 18ch;
        }
        .knockout em {
          font-style: italic;
          color: var(--oxblood);
        }
        /* outcome / responsive */
        @media (max-width: 680px) {
          .metrics {
            grid-template-columns: 1fr 1fr;
          }
          .brief-grid {
            grid-template-columns: 1fr;
          }
          /* comparison → labelled stacked pairs so before/after stays legible */
          .cmp-row.head {
            display: none;
          }
          .cmp-row {
            grid-template-columns: 1fr;
            padding: 10px 0;
          }
          .cmp-row > div {
            padding: 12px 0 12px 16px;
            border-left: 2px solid var(--on-line);
          }
          .cmp-row .l {
            border-right: none;
          }
          .cmp-row .r {
            border-left-color: var(--gold);
          }
          .cmp-row .l::before,
          .cmp-row .r::before {
            display: block;
            font-family: var(--mono);
            font-size: 9.5px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 7px;
          }
          .cmp-row .l::before {
            content: attr(data-label);
            color: var(--on-mut);
          }
          .cmp-row .r::before {
            content: attr(data-label);
            color: var(--gold);
          }
        }

        /* pivot (oxblood) */
        .pivot {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(34px, 5vw, 70px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #f8f3ea;
          max-width: 18ch;
          margin-top: 24px;
        }
        .pivot em {
          font-style: italic;
        }
        .pivot-why {
          font-family: var(--ui);
          font-size: clamp(16px, 1.7vw, 19px);
          line-height: 1.7;
          color: rgba(242, 237, 227, 0.8);
          max-width: 52ch;
          margin-top: 34px;
        }

        /* close + buttons */
        .ox .h2 {
          color: #f8f3ea;
          max-width: 18ch;
        }
        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 46px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 26px;
          border-radius: var(--r);
          font-family: var(--ui);
          font-size: 14.5px;
          text-decoration: none;
          transition: all 0.3s var(--ease);
        }
        .close .h2 {
          max-width: 20ch;
        }
        .close .btn.solid {
          background: #f2ede3;
          color: var(--ink);
        }
        .close .btn.solid:hover {
          background: #fff;
        }
        .close .btn.ghost {
          border: 1px solid var(--on-line);
          color: var(--on);
        }
        .close .btn.ghost:hover {
          border-color: var(--on);
        }

        /* footer */
        .foot {
          background: var(--ink);
          color: var(--on-mut);
          padding: 48px 0;
          border-top: 1px solid var(--on-line);
        }
        .foot .wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .foot .wm {
          font-family: var(--display);
          font-size: 20px;
          letter-spacing: 0.14em;
          color: var(--on);
          text-decoration: none;
        }
        .foot .c {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.06em;
        }

        @media (max-width: 680px) {
          .scrollcue {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .hkick,
          .ctitle,
          .cquiet,
          .hmeta,
          .scrollcue {
            animation: none;
            opacity: 1;
            transform: none;
          }
          .scrollcue .ln::after {
            animation: none;
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
