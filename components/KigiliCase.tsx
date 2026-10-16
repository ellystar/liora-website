"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Lang, counterpart, localize, mailto } from "@/lib/i18n";

const IMG = {
  hero: "/kigili-hero.jpg", // Deniz by the window — the hero mood frame
  deniz: "/kigili-deniz.jpg", // editorial portrait, against the wall
  room: "/kigili-room.jpg", // the empty room, wide — the interactive map sits on it
};

// The collection, live on Kiğılı's own store.
const LIVE_URL = "https://www.kigili.com/collections/signature-style";

// Layer 02 · The set — hotspots on the room. Zones are where a product group
// poses. Positions are % of public/kigili-room.jpg.
// NOTE: add a zone for every product group Kiğılı briefed.
const ROOM_POS = [
  { x: 53, y: 60, zone: true },
  { x: 82, y: 44, zone: true },
  { x: 50, y: 16 },
  { x: 36, y: 32 },
  { x: 66, y: 76 },
  { x: 24, y: 88 },
];

// Layer 03 · Styling — the rules behind the looks, each shown on real frames
// from the live collection.
const RULE_IMG = [
  "/kigili/frame-2.jpg",
  "/kigili/rule-knit.jpg",
  "/kigili/cat-9.jpg",
  "/kigili/rule-suit.jpg",
  "/kigili/cat-3.jpg",
];

// Layer 04 · Orchestration — the real six frames of one piece per group, in
// plan order (two editorial, then e-commerce), shown beside the graph.
const FRAME_IMG = [
  [1, 2, 3, 4, 5, 6].map((k) => `/kigili/shirt-${k}.jpg`),
  [1, 2, 3, 4, 5, 6].map((k) => `/kigili/knit-${k}.jpg`),
  [1, 2, 3, 4, 5, 6].map((k) => `/kigili/trou-${k}.jpg`),
  [1, 2, 3, 4, 5, 6].map((k) => `/kigili/suit-${k}.jpg`),
];

// 03 · The output — editorial frames across groups, as they run live on
// kigili.com/collections/signature-style.
const WALL = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `/kigili/wall-${n}.jpg`);

// Layer 04 graph geometry — group → six frames → set and pose, as on the ADV
// page, narrowed to sit beside the frame it points at.
const GEO = {
  w: 860,
  catX: 0,
  catW: 170,
  frameX: 214,
  frameW: 116,
  poseX: 372,
  poseW: 488,
  y0: 52,
  frameH: 30,
  frameStep: 36,
  catGap: 40,
};
const CAT_H = 5 * GEO.frameStep + GEO.frameH; // six frame rows
const CAT_STEP = CAT_H + GEO.catGap;
const catTopY = (ci: number) => GEO.y0 + ci * CAT_STEP;
const frameCy = (ci: number, j: number) =>
  catTopY(ci) + GEO.frameH / 2 + j * GEO.frameStep;
const catCy = (ci: number) => catTopY(ci) + CAT_H / 2;
const geoH = (n: number) => catTopY(n - 1) + CAT_H + 18;
const elbow = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = Math.round((x1 + x2) / 2);
  return `M ${x1} ${y1} H ${mx} V ${y2} H ${x2}`;
};

type Frame = { set: string; pose: string; moves?: boolean };
type Block = { label: string; out: string; cats: Group[] };
type Group = { key: string; code: string; label: string; frames: Frame[] };

const COPY = {
  en: {
    back: "← Work",
    switchCode: "TR",
    switchLabel: "Türkçe",
    heroAlt: "Kiğılı Signature — Deniz seated by a window, in a long dark coat",
    title: { pre: "Editorial, ", em: "by the batch." },
    quiet: "The face, the set, the styling and the direction of a premium shoot — run as one system. 300 frames, three days.",
    client: "Client",
    service: "Service",
    serviceName: "Editorial System",
    live: "Live",
    liveCta: "See Signature live ↗",
    scroll: "Scroll",

    briefKick: "01 · The brief",
    staccato: ["Kiğılı’s finest line.", "Its finest image."],
    brief1: "Signature is Kiğılı’s upper line, and every piece had to look it — on the product page as much as in the campaign. That usually takes a full premium shoot, so it is kept for a handful of hero looks.",
    brief2: "Image tools turn it into volume, but the direction goes with it: every piece in the same pose, or a set that drifts from frame to frame. Kiğılı needed the direction and the volume, for every piece.",

    systemKick: "02 · The system",
    system: { pre: "Every part of a premium shoot, ", em: "built as a layer." },
    systemLead: "Each was decided once, for Kiğılı — then run on every piece.",
    layer: "Layer",

    faceName: "The Face",
    faceLine: "Deniz was developed for Kiğılı’s brand identity and kept for Signature alone, apart from the catalogue cast.",
    denizAlt: "Deniz — the face of Kiğılı Signature",
    denizMeta: "34",
    faceRows: [
      ["Presence", "Relaxed, self-assured"],
      ["Best in", "Tailoring, knitwear, premium casual"],
    ],

    setName: "The Set",
    setLine: "Three sets, each with one job. The light and the framing never change.",
    spots: [
      { key: "The armchair", tip: "Knitwear · seated. The armchair, the lamp and the books in frame." },
      { key: "The wall", tip: "Shirts · leaning on the wall. Another corner of the room, nothing else in frame." },
      { key: "Wood", tip: "A warm wooden wall." },
      { key: "Lamp", tip: "One warm light, held on every frame of every piece." },
      { key: "Books", tip: "Props that come into frame only where the brief calls for them." },
      { key: "Rug", tip: "A navy rug." },
    ],
    roomPh: "The room — set 03",
    tap: "Tap a label to explore",
    sets: [
      { name: "The brown wall", use: "Editorial · tops, medium", what: "A plain brown wall. No floor, no objects — only the piece." },
      { name: "The light studio", use: "E-commerce · every piece", what: "A clean, even studio, under the same light." },
      { name: "The room", use: "Editorial · full length", what: "Wooden wall, navy rug, leather armchair — matched to Kiğılı’s own reference." },
    ],

    styleName: "Styling Logic",
    styleLine: "Fifty pieces, five rules — decided once, held on every look.",
    rules: [
      {
        title: "A shirt is always finished the same way",
        line: "Fully tucked, the first two buttons open, Kiğılı’s own belt in view.",
        look: "Sky-blue shirt, e-commerce frame",
      },
      {
        title: "Knitwear is always layered",
        line: "A collar, a tee or a check shirt shows beneath every knit.",
        look: "Check shirt under a half-zip knit",
      },
      {
        title: "When the trouser leads, the top steps back",
        line: "A plain knit and a white collar — nothing that competes with the piece.",
        look: "Black knit over light grey trousers",
      },
      {
        title: "Tailoring, dressed down",
        line: "A tee, a chain, sneakers — or a black shirt and sunglasses in hand.",
        look: "Black shirt, sunglasses in hand",
      },
      {
        title: "Accessories stay in the editorial",
        line: "A jacket in hand, a knit over the shoulders, sunglasses. The e-commerce frame always stays clean.",
        look: "Knit over the shoulders",
      },
    ],
    ruleAlt: "Kiğılı Signature —",

    orchName: "Visual Orchestration",
    orchLine: "Six frames per piece, planned by what the piece is. Tops are framed from the waist up: a medium on the brown wall, a full look in the room. Trousers and suits need the floor, so the brown wall gives way to two frames in the room.",
    orchAria: "product group to frames to set and pose",
    orchHeads: ["GROUP", "FRAME", "SET · POSE"],
    frame: "FRAME",
    blocks: [
      {
        label: "Upper",
        out: "→ framed from the waist up",
        cats: [
          {
            key: "shirt",
            code: "SIG·SHIRT",
            label: "Shirts",
            frames: [
              { set: "Brown wall", pose: "Medium · gesture per piece", moves: true },
              { set: "The room", pose: "Full look · per piece", moves: true },
              { set: "Light studio", pose: "Front medium · the anchor" },
              { set: "Light studio", pose: "Detail · collar, placket" },
              { set: "Light studio", pose: "Close-up portrait" },
              { set: "Light studio", pose: "Back medium" },
            ],
          },
          {
            key: "knit",
            code: "SIG·KNIT",
            label: "Knitwear",
            frames: [
              { set: "Brown wall", pose: "Medium · gesture per piece", moves: true },
              { set: "The room", pose: "Full look · per piece", moves: true },
              { set: "Light studio", pose: "Front · the anchor" },
              { set: "Light studio", pose: "Front · a hand at the collar" },
              { set: "Light studio", pose: "Close-up portrait" },
              { set: "Light studio", pose: "Back" },
            ],
          },
        ],
      },
      {
        label: "Lower",
        out: "→ framed full-length",
        cats: [
          {
            key: "trouser",
            code: "SIG·TROUSER",
            label: "Trousers",
            frames: [
              { set: "The room", pose: "Full length · per piece", moves: true },
              { set: "The room", pose: "A second pose, in motion", moves: true },
              { set: "Light studio", pose: "Front, full length · the anchor" },
              { set: "Light studio", pose: "Waist to shoe" },
              { set: "Light studio", pose: "Detail · waistband, pocket" },
              { set: "Light studio", pose: "Back, full length" },
            ],
          },
        ],
      },
      {
        label: "Tailoring",
        out: "→ framed full-length",
        cats: [
          {
            key: "suit",
            code: "SIG·SUIT",
            label: "Suits",
            frames: [
              { set: "The room", pose: "Full length · per piece", moves: true },
              { set: "The room", pose: "A second pose", moves: true },
              { set: "Light studio", pose: "Front, full length · the anchor" },
              { set: "Light studio", pose: "Jacket · medium" },
              { set: "Light studio", pose: "Detail · lapel" },
              { set: "Light studio", pose: "Back, full length" },
            ],
          },
        ],
      },
    ] as Block[],
    flowNote: "The front e-commerce frame is made first and approved; every other frame follows its face and its light. Every frame passes a human eye before it leaves the atelier — seven takes for six final frames.",
    previewAlt: "Kiğılı Signature —",
    orchFoot: "The garment decides the frame. The world stays the same.",

    outputKick: "03 · The output",
    output: { pre: "Different pieces. ", em: "One world." },
    outputLead: "Every frame here is live on Kiğılı’s store today — shirts, knitwear and tailoring alike.",
    wallAlt: "Kiğılı Signature — editorial frame",
    wallCap: "Shirts · knitwear · tailoring",

    outcomeKick: "04 · Outcome",
    outcomeH2: "The result, in numbers.",
    metrics: [
      ["300", "Final frames"],
      ["50", "Pieces"],
      ["3 days", "Thursday to Monday"],
      ["6", "Frames per piece"],
      ["1", "Face, for Signature alone"],
      ["0", "Sets built"],
    ],
    // Shortened from İrem Parlak’s answer; wording approved by Kiğılı.
    quote: "The products were the same, but the story we were telling our customers had completely changed. After the images went live, the rise in sales showed the change paid off commercially, not just visually.",
    quoteName: "İrem Parlak",
    quoteRole: "E-Commerce Category Specialist, Kiğılı",
    knockout: { pre: "A premium shoot — ", em: "at catalogue scale." },

    afterKick: "05 · And after",
    afterH2: "First we solved scale. Then luxury.",
    afterLead: "Signature stands on Kiğılı’s catalogue season — around 70 pieces over eight batches, July to September 2026, where the house learned the brand. The face, the sets and the pose briefs remain, ready for the next drop.",
    cta: "Get in touch →",
    next: "Next work →",
    footer: "An AI-native creative systems lab",
  },
  tr: {
    back: "← İşler",
    switchCode: "EN",
    switchLabel: "English",
    heroAlt: "Kiğılı Signature — Deniz pencere kenarında, uzun koyu bir paltoyla oturuyor",
    title: { pre: "Editoryal, ", em: "seri hâlinde." },
    quiet: "Bir premium çekimin yüzü, seti, styling’i ve yönetmenliği; tek bir sistemde. 300 kare, üç gün.",
    client: "Müşteri",
    service: "Hizmet",
    serviceName: "Editoryal Sistem",
    live: "Yayında",
    liveCta: "Signature’ı yayında görün ↗",
    scroll: "Kaydır",

    briefKick: "01 · Brief",
    staccato: ["Kiğılı’nın en seçkin hattı.", "En seçkin imajı."],
    brief1: "Signature, Kiğılı’nın üst segment hattı; her ürünün de bunu yansıtması gerekiyordu, kampanyada olduğu kadar ürün sayfasında da. Bu genelde eksiksiz bir premium çekim ister; o yüzden birkaç ana look’a ayrılır.",
    brief2: "Görsel üretim araçları bunu hacme çevirir ama yönetmenlik kaybolur: ya her ürün aynı pozda ya da set kareden kareye kayar. Kiğılı’nın her ürün için hem yönetmenliğe hem hacme ihtiyacı vardı.",

    systemKick: "02 · Sistem",
    system: { pre: "Bir premium çekimin her parçası, ", em: "bir katman olarak kuruldu." },
    systemLead: "Her biri Kiğılı için bir kez kararlaştırıldı, sonra her ürüne uygulandı.",
    layer: "Katman",

    faceName: "Yüz",
    faceLine: "Deniz, Kiğılı’nın marka kimliğine göre geliştirildi ve yalnızca Signature’a ayrıldı; katalog kadrosundan ayrı tutuldu.",
    denizAlt: "Deniz — Kiğılı Signature’ın yüzü",
    denizMeta: "34",
    faceRows: [
      ["Duruş", "Rahat, kendinden emin"],
      ["En iyi olduğu yer", "Takım elbise, triko, premium casual"],
    ],

    setName: "Set",
    setLine: "Üç set, her birinin tek bir görevi var. Işık ve kadraj hiç değişmiyor.",
    spots: [
      { key: "Koltuk", tip: "Triko · oturarak. Koltuk, lamba ve kitaplar kadrajda." },
      { key: "Duvar", tip: "Gömlek · duvara yaslanarak. Odanın başka bir köşesi; kadrajda başka hiçbir şey yok." },
      { key: "Ahşap", tip: "Sıcak bir ahşap duvar." },
      { key: "Lamba", tip: "Her parçanın her karesinde aynı kalan tek, sıcak bir ışık." },
      { key: "Kitaplar", tip: "Yalnızca brief’in istediği yerde kadraja giren objeler." },
      { key: "Halı", tip: "Lacivert bir halı." },
    ],
    roomPh: "Oda — set 03",
    tap: "Keşfetmek için bir etikete dokunun",
    sets: [
      { name: "Kahve duvar", use: "Editoryal · üst giyim, medium", what: "Düz kahverengi bir duvar. Zemin yok, obje yok; yalnızca parça." },
      { name: "Açık stüdyo", use: "E-ticaret · her ürün", what: "Temiz, dengeli bir stüdyo; aynı ışığın altında." },
      { name: "Oda", use: "Editoryal · boydan", what: "Ahşap duvar, lacivert halı, deri koltuk; Kiğılı’nın kendi referansıyla eşleştirildi." },
    ],

    styleName: "Styling Mantığı",
    styleLine: "Elli ürün, beş kural; bir kez kararlaştırıldı, her look’ta korundu.",
    rules: [
      {
        title: "Gömlek her zaman aynı şekilde tamamlanır",
        line: "Tamamen içeride, ilk iki düğme açık, Kiğılı’nın kendi kemeri görünür.",
        look: "Açık mavi gömlek, e-ticaret karesi",
      },
      {
        title: "Triko her zaman katmanlı",
        line: "Her trikonun altından bir yaka, bir tişört ya da ekose bir gömlek görünüyor.",
        look: "Fermuarlı triko altında ekose gömlek",
      },
      {
        title: "Pantolon öndeyse üst geri çekilir",
        line: "Düz bir triko ve beyaz bir yaka; ürünle yarışan hiçbir şey yok.",
        look: "Açık gri pantolon üstünde siyah triko",
      },
      {
        title: "Takım, rahatlatılmış",
        line: "Bir tişört, bir zincir, sneaker; ya da siyah gömlek ve elde güneş gözlüğü.",
        look: "Siyah gömlek, elde güneş gözlüğü",
      },
      {
        title: "Aksesuar editoryalde kalır",
        line: "Elde ceket, omuzda triko, güneş gözlüğü. E-ticaret karesi her zaman sade.",
        look: "Omuzda triko",
      },
    ],
    ruleAlt: "Kiğılı Signature —",

    orchName: "Görsel Orkestrasyon",
    orchLine: "Ürün başına altı kare; planı ürünün ne olduğu belirliyor. Üst giyim belden yukarı çekiliyor: kahve duvarda bir medium, odada tam boy. Pantolon ve takım zemini ister; bu yüzden kahve duvarın yerini odada iki kare alıyor.",
    orchAria: "ürün grubundan karelere, karelerden set ve poza",
    orchHeads: ["GRUP", "KARE", "SET · POZ"],
    frame: "KARE",
    blocks: [
      {
        label: "Üst giyim",
        out: "→ belden yukarı",
        cats: [
          {
            key: "shirt",
            code: "SIG·GÖMLEK",
            label: "Gömlek",
            frames: [
              { set: "Kahve duvar", pose: "Medium · parçaya göre jest", moves: true },
              { set: "Oda", pose: "Tam boy · parçaya göre", moves: true },
              { set: "Açık stüdyo", pose: "Önden medium · anchor kare" },
              { set: "Açık stüdyo", pose: "Detay · yaka, pat" },
              { set: "Açık stüdyo", pose: "Yakın plan portre" },
              { set: "Açık stüdyo", pose: "Arkadan medium" },
            ],
          },
          {
            key: "knit",
            code: "SIG·TRİKO",
            label: "Triko",
            frames: [
              { set: "Kahve duvar", pose: "Medium · parçaya göre jest", moves: true },
              { set: "Oda", pose: "Tam boy · parçaya göre", moves: true },
              { set: "Açık stüdyo", pose: "Ön · anchor kare" },
              { set: "Açık stüdyo", pose: "Ön · el yakada" },
              { set: "Açık stüdyo", pose: "Yakın plan portre" },
              { set: "Açık stüdyo", pose: "Arka" },
            ],
          },
        ],
      },
      {
        label: "Alt giyim",
        out: "→ boydan",
        cats: [
          {
            key: "trouser",
            code: "SIG·PANTOLON",
            label: "Pantolon",
            frames: [
              { set: "Oda", pose: "Boydan · parçaya göre", moves: true },
              { set: "Oda", pose: "İkinci poz, hareket hâlinde", moves: true },
              { set: "Açık stüdyo", pose: "Boydan ön · anchor kare" },
              { set: "Açık stüdyo", pose: "Belden ayakkabıya" },
              { set: "Açık stüdyo", pose: "Detay · bel, cep" },
              { set: "Açık stüdyo", pose: "Boydan arka" },
            ],
          },
        ],
      },
      {
        label: "Takım",
        out: "→ boydan",
        cats: [
          {
            key: "suit",
            code: "SIG·TAKIM",
            label: "Takım elbise",
            frames: [
              { set: "Oda", pose: "Boydan · parçaya göre", moves: true },
              { set: "Oda", pose: "İkinci poz", moves: true },
              { set: "Açık stüdyo", pose: "Boydan ön · anchor kare" },
              { set: "Açık stüdyo", pose: "Ceket · medium" },
              { set: "Açık stüdyo", pose: "Detay · yaka" },
              { set: "Açık stüdyo", pose: "Boydan arka" },
            ],
          },
        ],
      },
    ] as Block[],
    flowNote: "Önce ön e-ticaret karesi üretilip onaylanıyor; diğer bütün kareler onun yüzünü ve ışığını izliyor. Her kare atölyeden çıkmadan önce bir insan gözünden geçiyor: altı final kare için yedi çekim.",
    previewAlt: "Kiğılı Signature —",
    orchFoot: "Kadrajı ürün belirliyor. Dünya aynı kalıyor.",

    outputKick: "03 · Çıktı",
    output: { pre: "Farklı parçalar. ", em: "Tek bir dünya." },
    outputLead: "Buradaki her kare bugün Kiğılı’nın mağazasında yayında; gömlek, triko ve takım bir arada.",
    wallAlt: "Kiğılı Signature — editoryal kare",
    wallCap: "Gömlek · triko · takım",

    outcomeKick: "04 · Sonuç",
    outcomeH2: "Rakamlarla sonuç.",
    metrics: [
      ["300", "Final kare"],
      ["50", "Parça"],
      ["3 gün", "Perşembeden pazartesiye"],
      ["6", "Parça başına kare"],
      ["1", "Yüz, yalnızca Signature için"],
      ["0", "Kurulan set"],
    ],
    quote: "Ürünler aynıydı ama müşteriye sunduğumuz hikâye tamamen değişmişti. Görselleri yayına aldıktan sonra satışlarda gördüğümüz artış, bu dönüşümün yalnızca görsel olarak değil, ticari açıdan da karşılık bulduğunu gösterdi.",
    quoteName: "İrem Parlak",
    quoteRole: "E-Ticaret Kategori Uzmanı, Kiğılı",
    knockout: { pre: "Bir premium çekim — ", em: "katalog ölçeğinde." },

    afterKick: "05 · Sonrası",
    afterH2: "Önce ölçeği çözdük. Sonra lüksü.",
    afterLead: "Signature, Kiğılı’nın katalog sezonunun üzerinde duruyor: Temmuz–Eylül 2026 arasında sekiz partide yaklaşık 70 parça, markayı tanıdığımız sezon. Yüz, setler ve poz brief’leri yerinde; sıradaki koleksiyona hazır.",
    cta: "İletişime geçin →",
    next: "Sonraki iş →",
    footer: "Yapay zekâ temelli bir yaratıcı sistemler laboratuvarı",
  },
};

/**
 * Kiğılı Signature case study — "Editorial, by the batch."
 * Shares the ADV page's design system: the claim is that every part of a
 * premium shoot — face, set, styling, direction — became a layer, then ran
 * across 50 pieces. Self-contained scroll reveal, reduced-motion safe.
 */
export default function KigiliCase({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  const upper = (s: string) => s.toLocaleUpperCase(lang);
  const room = ROOM_POS.map((p, i) => ({ ...p, ...t.spots[i] }));
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const act = room.find((s) => s.key === active);

  // Layer 04 — hovering a group traces its branch, as on the ADV page; a
  // frame in the graph and its image below light up together.
  const [orchHover, setOrchHover] = useState<string | null>(null);
  const [frameOn, setFrameOn] = useState<{ g: number; k: number }>({ g: 0, k: 0 });
  const allCats = t.blocks.flatMap((b) => b.cats);
  const orchRef = useRef<HTMLDivElement>(null);

  // Layer 03 — the rule in view; the list on the left switches it.
  const [ruleOn, setRuleOn] = useState(0);

  // Layer 04 — as the graph scrolls past a line just above the middle of
  // the screen, the preview steps through the frames one by one. Pointing at
  // a frame shows it too; the next scroll takes over again.
  useEffect(() => {
    const el = orchRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // every frame gets an equal share of the graph's height, so each step
        // of the wheel moves the preview on by about one frame
        const r = el.getBoundingClientRect();
        if (!r.height) return;
        const frames = FRAME_IMG.length * 6;
        const p = (window.innerHeight * 0.42 - r.top) / r.height;
        const i = Math.min(frames - 1, Math.max(0, Math.floor(p * frames)));
        const next = { g: Math.floor(i / 6), k: i % 6 };
        setFrameOn((f) => (f.g === next.g && f.k === next.k ? f : next));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

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
    <div className="kigcase" ref={root}>
      <nav className="nav">
        <a className="wm" href={localize(lang, "/")} aria-label="Liora — home">
          LIORA
        </a>
        <span style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <a
            className="back"
            href={counterpart(lang, "/work/kigili")}
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

      {/* HERO */}
      <section className="chero">
        <div className="media">
          <Image
            src={IMG.hero}
            alt={t.heroAlt}
            fill
            priority
            quality={90}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "76% 30%" }}
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
              <span>{t.client}</span> &nbsp;Kiğılı, Signature
            </div>
            <div className="sep" />
            <div className="it">
              <span>{t.service}</span> &nbsp;{t.serviceName}
            </div>
            <div className="sep" />
            <a className="it live" href={LIVE_URL} target="_blank" rel="noopener noreferrer">
              <span className="dot" aria-hidden="true" />
              <span>{t.live}</span> &nbsp;kigili.com ↗
            </a>
          </div>
        </div>
        <div className="scrollcue">
          <span className="ln" />
          {t.scroll}
        </div>
      </section>

      {/* 01 · THE BRIEF — what a premium shoot needs, and why it rarely scales */}
      <section className="sec light">
        <div className="wrap">
          <div className="kick reveal">{t.briefKick}</div>
          <div className="brief-grid">
            <div>
              <div className="staccato reveal">
                {t.staccato.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <p className="lead reveal">{t.brief1}</p>
              <p className="lead reveal">{t.brief2}</p>
            </div>
            <figure className="quote reveal">
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <b>{t.quoteName}</b> · {t.quoteRole}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 02 · THE SYSTEM — every part of a shoot, a layer */}
      <section className="sec dark flush">
        <div className="wrap">
          <div className="kick reveal">{t.systemKick}</div>
          <h2 className="h2 reveal">
            {t.system.pre}
            <em>{t.system.em}</em>
          </h2>
          <p className="lead reveal">{t.systemLead}</p>
        </div>
      </section>

      {/* Layer 01 · The Face — portrait left; title, card and proof right */}
      <section className="chapter">
        <div className="face">
          <figure className="face-img reveal">
            <Image
              src={IMG.deniz}
              alt={t.denizAlt}
              fill
              quality={90}
              sizes="(max-width: 760px) 92vw, 600px"
              style={{ objectFit: "cover", objectPosition: "50% 30%" }}
            />
          </figure>
          <div className="face-side">
            <div className="reveal">
              <span className="modhead-no">{t.layer} 01</span>
              <h3 className="modhead-name">{t.faceName}</h3>
              <p className="modhead-line">{t.faceLine}</p>
            </div>
            <div className="face-id reveal">
              <h4 className="castfig-name">Deniz</h4>
              {/* NOTE: add a city, as on the ADV cast, if one is chosen. */}
              <p className="castfig-meta">{t.denizMeta}</p>
            </div>
            <dl className="solo-meta reveal">
              {t.faceRows.map(([k, v]) => (
                <div className="row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Layer 02 · The Set — three sets; the room, interactive */}
      <section className="chapter">
        <header className="modhead reveal">
          <span className="modhead-no">{t.layer} 02</span>
          <h3 className="modhead-name">{t.setName}</h3>
          <p className="modhead-line">{t.setLine}</p>
        </header>
        <div className="studio reveal">
          <div className="studio-stage" onMouseLeave={() => setActive(null)}>
            <div className="studio-clip" aria-hidden="true">
              <Image
                className="studio-bg"
                src={IMG.room}
                alt=""
                fill
                quality={90}
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
              <span className="studio-ph">{t.roomPh}</span>
            </div>
            {room.map((s) => (
              <div
                className="studio-hot"
                key={s.key}
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                <button
                  type="button"
                  className={`studio-key${s.zone ? " zone" : ""}${active === s.key ? " on" : ""}`}
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
        <div className="sets reveal">
          {t.sets.map((s, i) => (
            <div className="set" key={s.name}>
              <span className="set-no">{String(i + 1).padStart(2, "0")}</span>
              <span className="set-name">{s.name}</span>
              <span className="set-use">{s.use}</span>
              <p className="set-what">{s.what}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Layer 03 · Styling Logic — piece by piece, then the finish, marked on the frame */}
      <section className="chapter">
        <header className="modhead reveal">
          <span className="modhead-no">{t.layer} 03</span>
          <h3 className="modhead-name">{t.styleName}</h3>
          <p className="modhead-line">{t.styleLine}</p>
        </header>
        <div className="rules reveal">
          <ol className="rule-list">
            {t.rules.map((r, i) => (
              <li key={r.title}>
                <button
                  type="button"
                  className={`rule${i === ruleOn ? " on" : ""}`}
                  aria-pressed={i === ruleOn}
                  onMouseEnter={() => setRuleOn(i)}
                  onFocus={() => setRuleOn(i)}
                  onClick={() => setRuleOn(i)}
                >
                  <span className="rule-no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rule-title">{r.title}</span>
                  <span className="rule-line">{r.line}</span>
                </button>
              </li>
            ))}
          </ol>
          {/* every rule's frames sit in the DOM (loading as the section nears);
              only the chosen one shows, so switching never waits */}
          <div className="rule-stage" aria-live="polite">
            {RULE_IMG.map((src, ri) => (
              <figure
                className={`rule-look${ri === ruleOn ? " on" : ""}`}
                key={src}
                aria-hidden={ri !== ruleOn}
              >
                <div className="rule-img">
                  <Image
                    src={src}
                    alt={`${t.ruleAlt} ${t.rules[ri].look}`}
                    fill
                    quality={90}
                    sizes="(max-width: 900px) 80vw, 440px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <figcaption>{t.rules[ri].look}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Layer 04 · Visual Orchestration — group → six frames → set and pose */}
      <section className="chapter">
        <header className="modhead reveal">
          <span className="modhead-no">{t.layer} 04</span>
          <h3 className="modhead-name">{t.orchName}</h3>
          <p className="modhead-line">{t.orchLine}</p>
        </header>

        <div className="orch-grid">
        <div className="orch-left">
        <div className="orch reveal" ref={orchRef}>
          {t.blocks.map((b, bi) => {
            const base = t.blocks.slice(0, bi).reduce((n, x) => n + x.cats.length, 0);
            return (
              <div className="orx-block" key={b.label}>
                <div className="orx-glabel">
                  <span>{b.label}</span>
                  <span className="orx-glabel-out">{b.out}</span>
                </div>
                <div className="orx-scroll">
                  <svg
                    className="orx-svg"
                    viewBox={`0 0 ${GEO.w} ${geoH(b.cats.length)}`}
                    role="img"
                    aria-label={`${b.label} — ${t.orchAria}`}
                  >
                    {[
                      [t.orchHeads[0], GEO.catX + GEO.catW / 2],
                      [t.orchHeads[1], GEO.frameX + GEO.frameW / 2],
                      [t.orchHeads[2], GEO.poseX + GEO.poseW / 2],
                    ].map(([h, x]) => (
                      <text key={h as string} className="orx-head" x={x as number} y={26} textAnchor="middle">
                        {h}
                      </text>
                    ))}

                    {/* connectors */}
                    {b.cats.map((g, j) => {
                      const cls = `orx-link ${orchHover === g.key ? "on" : orchHover ? "off" : "rest"}`;
                      return (
                        <g key={`lk-${g.key}`}>
                          {g.frames.map((_, k) => (
                            <path
                              key={`cf${k}`}
                              className={cls}
                              d={elbow(GEO.catX + GEO.catW, catCy(j), GEO.frameX, frameCy(j, k))}
                            />
                          ))}
                          {g.frames.map((_, k) => (
                            <path
                              key={`fp${k}`}
                              className={cls}
                              d={elbow(GEO.frameX + GEO.frameW, frameCy(j, k), GEO.poseX, frameCy(j, k))}
                            />
                          ))}
                        </g>
                      );
                    })}

                    {/* nodes */}
                    {b.cats.map((g, j) => {
                      const gi = base + j;
                      const st = orchHover === g.key ? "on" : orchHover ? "off" : "rest";
                      return (
                        <g key={g.key}>
                          <g
                            data-cat={gi}
                            className={`orx-node orx-hit orx-cat ${st}`}
                            tabIndex={0}
                            role="button"
                            aria-label={`${b.label} ${g.label}`}
                            onMouseEnter={() => setOrchHover(g.key)}
                            onMouseLeave={() => setOrchHover(null)}
                            onFocus={() => setOrchHover(g.key)}
                            onBlur={() => setOrchHover(null)}
                          >
                            <rect className="orx-box" x={GEO.catX} y={catCy(j) - 24} width={GEO.catW} height={48} rx={2} />
                            <text className="orx-cat-t" x={GEO.catX + 16} y={catCy(j) - 4}>
                              {upper(g.label)}
                            </text>
                            <text className="orx-cat-code" x={GEO.catX + 16} y={catCy(j) + 14}>
                              {g.code}
                            </text>
                          </g>

                          {g.frames.map((f, k) => (
                            <g
                              key={`fr${k}`}
                              data-frame={`${gi}-${k}`}
                              className={`orx-node orx-frame orx-hit ${st}${frameOn.g === gi && frameOn.k === k ? " fon" : ""}`}
                              tabIndex={0}
                              role="button"
                              aria-label={`${g.label} ${t.frame} 0${k + 1}`}
                              onMouseEnter={() => setFrameOn({ g: gi, k })}
                              onFocus={() => setFrameOn({ g: gi, k })}
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
                            <rect className="orx-box" x={GEO.poseX} y={catTopY(j)} width={GEO.poseW} height={CAT_H} rx={2} />
                            {g.frames.map((f, k) => (
                              <g key={`ps${k}`}>
                                <text className="orx-pose-beat" x={GEO.poseX + 16} y={frameCy(j, k)} dominantBaseline="central">
                                  {upper(f.set)}
                                </text>
                                <text
                                  className={`orx-pose-pose${f.moves ? " mv" : ""}`}
                                  x={GEO.poseX + 150}
                                  y={frameCy(j, k)}
                                  dominantBaseline="central"
                                >
                                  {f.pose}
                                </text>
                              </g>
                            ))}
                          </g>
                        </g>
                      );
                    })}
                  </svg>
                </div>
                {/* phones: the same plan as a list, each frame with its image */}
                <div className="orl">
                  {b.cats.map((g, j) => (
                    <div className="orl-cat" key={g.key} data-cat={base + j}>
                      <div className="orl-head">
                        <span>{g.label}</span>
                        <span className="orl-code">{g.code}</span>
                      </div>
                      <ol>
                        {g.frames.map((f, k) => (
                          <li className={f.moves ? "mv" : ""} key={k}>
                            <span className="orl-thumb">
                              <Image
                                src={FRAME_IMG[base + j][k]}
                                alt={`${t.previewAlt} ${g.label}, ${t.frame} 0${k + 1}`}
                                fill
                                quality={90}
                                sizes="64px"
                                style={{ objectFit: "cover" }}
                              />
                            </span>
                            <span className="orl-no">0{k + 1}</span>
                            <span className="orl-text">
                              <span className="orl-set">{f.set}</span>
                              <span className="orl-pose">{f.pose}</span>
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

          <p className="flow-note">{t.flowNote}</p>
        </div>
        <figure className="preview reveal">
          <div className="preview-img">
            {/* only the group in view is mounted: six frames, not twenty-four */}
            {FRAME_IMG.map((set, gi) =>
              gi !== frameOn.g ? null : set.map((src, ki) => (
                <div
                  className={`preview-f${frameOn.k === ki ? " on" : ""}`}
                  key={src}
                >
                  <Image
                    src={src}
                    alt={`${t.previewAlt} ${allCats[gi].label}, ${t.frame} 0${ki + 1}`}
                    fill
                    quality={90}
                    sizes="(max-width: 900px) 80vw, 380px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))
            )}
          </div>
          <figcaption>
            <b>{allCats[frameOn.g].label}</b> · {t.frame} 0{frameOn.k + 1} ·{" "}
            {allCats[frameOn.g].frames[frameOn.k].set}
          </figcaption>
        </figure>
        </div>
        <p className="orch-foot reveal">{t.orchFoot}</p>
      </section>

      {/* 03 · THE OUTPUT — editorial across pieces, and the live collection */}
      <section className="sec dark">
        <div className="wrap">
          <div className="kick reveal">{t.outputKick}</div>
          <h2 className="h2 reveal">
            {t.output.pre}
            <em>{t.output.em}</em>
          </h2>
          <p className="lead reveal">{t.outputLead}</p>
        </div>
        <div className="wall reveal">
          {WALL.map((src, i) => (
            <figure className="gtile" key={src}>
              <Image
                src={src}
                alt={`${t.wallAlt} ${String(i + 1).padStart(2, "0")}`}
                fill
                quality={90}
                sizes="(max-width: 640px) 50vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "50% 25%" }}
              />
            </figure>
          ))}
        </div>
        <div className="wall-foot reveal">
          <span className="gallery-cap-inline">{t.wallCap}</span>
          <a className="live-link" href={LIVE_URL} target="_blank" rel="noopener noreferrer">
            {t.liveCta}
          </a>
        </div>
      </section>

      {/* 04 · OUTCOME */}
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

      {/* 05 · AND AFTER (close) */}
      <section className="sec dark close">
        <div className="wrap">
          <div className="kick reveal">{t.afterKick}</div>
          <h2 className="h2 reveal">{t.afterH2}</h2>
          <p className="lead reveal">{t.afterLead}</p>
          <div className="cta-row reveal">
            <a className="btn solid" href={mailto(lang)}>
              {t.cta}
            </a>
            <a className="btn ghost" href={LIVE_URL} target="_blank" rel="noopener noreferrer">
              {t.liveCta}
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
        .kigcase {
          --tx: var(--text);
          --tx-mut: var(--text-mut);
          --on: var(--on-dark);
          --on-mut: var(--on-dark-mut);
          --on-line: rgba(239, 232, 218, 0.16);
          --tx-line: rgba(26, 22, 17, 0.14);
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
        .sec.tight {
          padding-top: 0;
        }
        .sec.light {
          background: var(--bone);
          color: var(--tx);
        }
        .sec.dark {
          background: var(--ink);
          color: var(--on);
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
        .h2 {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(30px, 4.2vw, 54px);
          line-height: 1.1;
          letter-spacing: -0.016em;
          margin-top: 22px;
          max-width: 22ch;
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

        /* placeholders — labelled tiles until the approved frames arrive */

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
        .nav .wm,
        .nav .back {
          text-shadow: 0 1px 3px rgba(20, 14, 8, 0.55), 0 0 14px rgba(20, 14, 8, 0.4);
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
          background: linear-gradient(158deg, #3a2a1e 0%, #1c140e 55%, #0b0806 100%);
        }
        .chero .scrim {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            to bottom,
            rgba(16, 14, 11, 0.5) 0%,
            rgba(16, 14, 11, 0) 22%,
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
        .hmeta a.it {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: color 0.3s var(--ease);
        }
        .hmeta a.it:hover {
          color: var(--gold);
        }
        .hmeta .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
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

        /* 01 · the feeling — copy beside Deniz */
        .castfig {
          margin: 0;
        }
        .castfig-img {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: var(--r);
          background: linear-gradient(158deg, #2a2017, #0f0b09);
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

        /* 02 · what it took — the struck list */
        .staccato {
          margin-top: 26px;
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(30px, 4.4vw, 56px);
          line-height: 1.2;
          letter-spacing: -0.018em;
          color: var(--tx);
        }
        .staccato span {
          display: block;
        }

        /* 04 · the room — chapter head + interactive map */
        .chapter {
          background: var(--ink);
          color: var(--on);
          padding: clamp(72px, 9vw, 128px) 0;
        }
        .chapter + .chapter,
        .chapter + .sec.dark {
          border-top: 1px solid rgba(239, 232, 218, 0.08);
        }
        /* a section right after the layers keeps the layers' rhythm */
        .chapter + .sec.dark {
          padding-top: clamp(72px, 9vw, 128px);
        }
        .modhead {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 0 var(--pad) clamp(30px, 4vw, 50px);
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
          font-size: clamp(30px, 4.2vw, 54px);
          line-height: 1.1;
          letter-spacing: -0.016em;
          color: var(--on);
          margin-top: 22px;
          max-width: 22ch;
        }
        .modhead-name em {
          font-style: italic;
        }
        .modhead-line {
          font-family: var(--ui);
          font-size: clamp(15px, 1.5vw, 17px);
          line-height: 1.74;
          color: var(--on-mut);
          max-width: 56ch;
          margin-top: 28px;
        }
        .studio-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 2752 / 1536;
        }
        .studio-clip {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: linear-gradient(158deg, #4a3524 0%, #2a1d14 52%, #141c2b 100%);
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
          color: rgba(239, 232, 218, 0.45);
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
        .studio-key.zone::before {
          background: var(--gold);
          opacity: 1;
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
          max-width: 240px;
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
          /* keep the labels on the image (tap to reveal) */
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

        /* 05 · one flow — one shirt's six frames */
        .gtile {
          position: relative;
          margin: 0;
          aspect-ratio: 2 / 3;
          overflow: hidden;
          background: linear-gradient(150deg, #241a14, #0f0b09);
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
        @media (max-width: 900px) {
        }
        @media (max-width: 560px) {
        }

        .sec.flush {
          padding-bottom: 0;
        }

        /* layer 03 · styling — the rules on the left, their proof on the right */
        .rules {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 0 var(--pad);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 440px);
          gap: clamp(32px, 6vw, 96px);
          align-items: start;
        }
        .rule-list {
          margin: 0;
          padding: 0;
          list-style: none;
          border-top: 1px solid var(--on-line);
        }
        .rule-list li {
          border-bottom: 1px solid var(--on-line);
        }
        .rule {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 4px 12px;
          width: 100%;
          padding: clamp(16px, 2vw, 22px) 0;
          background: none;
          border: 0;
          text-align: left;
          cursor: pointer;
        }
        .rule-no {
          grid-row: 1 / span 2;
          padding-top: 6px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--on-mut);
          transition: color 0.3s var(--ease);
        }
        .rule-title {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(20px, 2vw, 26px);
          line-height: 1.2;
          color: rgba(239, 232, 218, 0.4);
          transition: color 0.3s var(--ease);
        }
        .rule-line {
          display: grid;
          grid-template-rows: 0fr;
          overflow: hidden;
          font-family: var(--ui);
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--on-mut);
          opacity: 0;
          transition: opacity 0.35s var(--ease);
          max-height: 0;
        }
        .rule:hover .rule-title,
        .rule.on .rule-title {
          color: var(--on);
        }
        .rule.on .rule-no {
          color: var(--gold);
        }
        .rule.on .rule-line {
          opacity: 1;
          max-height: 6em;
          margin-top: 6px;
        }
        .rule:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 2px;
        }
        .rule-stage {
          display: grid;
        }
        .rule-look {
          grid-area: 1 / 1;
          margin: 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(8px);
          transition: opacity 0.45s var(--ease), transform 0.45s var(--ease), visibility 0s 0.45s;
        }
        .rule-look.on {
          opacity: 1;
          visibility: visible;
          transform: none;
          transition: opacity 0.45s var(--ease), transform 0.45s var(--ease), visibility 0s;
        }
        .rule-img {
          position: relative;
          aspect-ratio: 1330 / 1991;
          overflow: hidden;
          border-radius: var(--r);
          background: var(--ink-2);
        }
        .rule-look figcaption {
          margin-top: 10px;
          font-family: var(--mono);
          font-size: 10.5px;
          line-height: 1.5;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--on-mut);
        }
        @media (max-width: 900px) {
          .rules {
            grid-template-columns: 1fr;
          }
          .rule-stage {
            width: min(440px, 100%);
          }
        }

        /* layer 04 · the graph beside the frame it points at */
        .orch-grid {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 0 var(--pad);
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(0, 0.85fr);
          gap: clamp(28px, 4vw, 56px);
          align-items: start;
        }
        .orch-grid .orch {
          padding: 0;
          margin: 0;
          max-width: none;
        }
        .orch-grid .flow-note {
          max-width: 60ch;
          margin: clamp(24px, 3vw, 36px) 0 0;
        }
        .preview {
          margin: 0;
          position: sticky;
          top: 96px;
        }
        .preview-img {
          position: relative;
          aspect-ratio: 2 / 3;
          overflow: hidden;
          border-radius: var(--r);
          background: var(--ink-2);
        }
        .preview-f {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.45s var(--ease);
        }
        .preview-f.on {
          opacity: 1;
        }
        .preview figcaption {
          margin-top: 12px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--on-mut);
        }
        .preview figcaption b {
          font-weight: 400;
          color: var(--gold);
        }
        .orl {
          display: none;
        }
        /* below 900px the graph and its preview can't sit side by side: the
           plan becomes a list with an image on every frame */
        @media (max-width: 900px) {
          .orch-grid {
            grid-template-columns: 1fr;
          }
          .orx-scroll,
          .preview {
            display: none;
          }
          .orl {
            display: grid;
            gap: 26px;
            margin-top: 14px;
          }
          .orl-head {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--on-line);
            font-family: var(--mono);
            font-size: 12px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--on);
          }
          .orl-code {
            font-size: 10px;
            color: var(--on-mut);
          }
          .orl ol {
            margin: 0;
            padding: 0;
            list-style: none;
          }
          .orl li {
            display: grid;
            grid-template-columns: 56px 26px 1fr;
            gap: 12px;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid var(--on-line);
          }
          .orl-thumb {
            position: relative;
            width: 56px;
            aspect-ratio: 2 / 3;
            overflow: hidden;
            border-radius: var(--r);
            background: var(--ink-2);
          }
          .orl-no {
            font-family: var(--mono);
            font-size: 11px;
            color: var(--on-mut);
          }
          .orl-text {
            display: grid;
            gap: 4px;
          }
          .orl-set {
            font-family: var(--mono);
            font-size: 10px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--on-mut);
          }
          .orl-pose {
            font-family: var(--ui);
            font-size: 14.5px;
            color: var(--on);
          }
          .orl li.mv .orl-pose {
            color: var(--gold);
          }
        }

        /* layer 04 · the frame pointed at, lit in the graph */
        .orx-frame.fon .orx-box {
          stroke: var(--gold);
          fill: rgba(176, 122, 46, 0.12);
        }
        .orx-frame.fon .orx-frame-t {
          fill: var(--on);
        }

        /* outcome · the client's words */
        .quote {
          margin: 0;
          padding-left: 22px;
          border-left: 1px solid var(--oxblood);
          max-width: 46ch;
        }
        .quote blockquote {
          margin: 0;
          font-family: var(--display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(20px, 2.2vw, 27px);
          line-height: 1.42;
          color: var(--tx);
        }
        .quote figcaption {
          margin-top: 18px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--tx-mut);
        }
        .quote figcaption b {
          font-weight: 400;
          color: var(--tx);
        }

        /* 01 · brief — staccato beside the two paragraphs */
        .brief-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(32px, 6vw, 96px);
          align-items: center;
        }

        /* layer 01 · the face — portrait left, the title and the proof right */
        .face {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 6vw, 96px);
          align-items: center;
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 0 var(--pad);
        }
        .face-img {
          position: relative;
          margin: 0;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: var(--r);
          background: var(--ink-2);
        }
        .face-side {
          display: flex;
          flex-direction: column;
          gap: clamp(26px, 3vw, 38px);
        }
        .face-id .castfig-name {
          font-size: clamp(30px, 3.2vw, 42px);
        }
        .solo-meta {
          display: grid;
          gap: 12px;
          margin: 0;
        }
        .solo-meta .row {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 16px;
          border-top: 1px solid var(--on-line);
          padding-top: 12px;
        }
        .solo-meta dt {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--on-mut);
        }
        .solo-meta dd {
          margin: 0;
          font-family: var(--ui);
          font-size: 15px;
          color: var(--on);
        }

        /* layer 02 · the set — the three sets, as a quiet row under the room */
        .sets {
          max-width: var(--maxw);
          margin: clamp(26px, 3vw, 40px) auto 0;
          padding: 0 var(--pad);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(16px, 3vw, 40px);
        }
        .set {
          border-top: 1px solid var(--on-line);
          padding-top: 14px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 6px 12px;
          align-items: baseline;
        }
        .set-no {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--on-mut);
        }
        .set-name {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(18px, 1.8vw, 22px);
          color: var(--on);
        }
        .set-use {
          grid-column: 2;
          font-family: var(--mono);
          font-size: 10.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .set-what {
          grid-column: 2;
          margin: 4px 0 0;
          font-family: var(--ui);
          font-size: 14px;
          line-height: 1.6;
          color: var(--on-mut);
        }

        /* layer 04 · orchestration — the ADV graph: group → frames → set, pose */
        .orch {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: clamp(6px, 1.2vw, 16px) var(--pad) 0;
        }
        .orx-block + .orx-block {
          margin-top: clamp(30px, 4vw, 48px);
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
        /* the editorial pose — the one that moves with every piece */
        .orx-pose-pose.mv {
          fill: var(--gold);
        }
        .note-wrap {
          max-width: var(--maxw);
          margin: clamp(30px, 4vw, 48px) auto 0;
          padding: 0 var(--pad);
        }
        .flow-note {
          max-width: 60ch;
          margin: 0;
          font-family: var(--ui);
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.7;
          color: var(--on-mut);
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

        /* 03 · the output — a full-bleed wall, then the live collection */
        .wall {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(5px, 0.7vw, 10px);
          margin-top: clamp(38px, 5vw, 66px);
          padding: 0 clamp(5px, 0.7vw, 10px);
        }
        .wall-foot {
          max-width: var(--maxw);
          margin: clamp(16px, 2vw, 24px) auto 0;
          padding: 0 var(--pad);
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px 24px;
        }
        .gallery-cap-inline {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--on-mut);
        }
        .live-link {
          font-family: var(--ui);
          font-size: 14.5px;
          color: var(--on);
          text-decoration: none;
          border-bottom: 1px solid var(--gold);
          padding-bottom: 2px;
          transition: color 0.3s var(--ease);
        }
        .live-link:hover {
          color: var(--gold);
        }

        @media (max-width: 760px) {
          .brief-grid,
          .face,
          .sets {
            grid-template-columns: 1fr;
          }
          .orx-svg {
            min-width: 720px;
          }
          .wall {
            gap: 4px;
            padding: 0 4px;
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
        .knockout {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(30px, 4.4vw, 58px);
          line-height: 1.1;
          letter-spacing: -0.018em;
          color: var(--tx);
          margin-top: 64px;
          max-width: 22ch;
        }
        .knockout em {
          display: block;
          font-style: italic;
          color: var(--oxblood);
        }
        @media (max-width: 680px) {
          .metrics {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* close + buttons */
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
          .chero .scrim {
            background: linear-gradient(
              to bottom,
              rgba(16, 14, 11, 0.72) 0%,
              rgba(16, 14, 11, 0) 26%,
              rgba(16, 14, 11, 0.35) 55%,
              rgba(16, 14, 11, 0.9) 100%
            );
          }
          .face-side {
            order: -1;
          }
          .studio-ph {
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
