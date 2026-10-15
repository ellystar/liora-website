"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Lang, counterpart, localize, mailto } from "@/lib/i18n";

// Imagery — every slot is null until the frames are approved by Kiğılı.
// Drop a path in (e.g. "/kigili-hero.jpg") and the placeholder gives way.
const IMG: { hero: string | null; deniz: string | null; room: string | null } = {
  hero: "/kigili-hero.jpg", // Deniz by the window — the hero mood frame
  deniz: "/kigili-deniz.jpg", // editorial portrait, against the wall
  room: "/kigili-room.jpg", // the empty room, wide — the interactive map sits on it
};

// 03 · The trade-off — a typographic diagram, ten cells standing for fifty.
const TRADE_CELLS = [
  { cells: ["E1", "E2", "E3", "", "", "", "", "", "", ""], tone: "set" },
  { cells: Array(10).fill("A"), tone: "tool" },
  { cells: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"], tone: "lio" },
];

// 04 · The room — interactive map. Zones are where a product group poses;
// the rest is the room itself. Positions are % of public/kigili-room.jpg.
// NOTE: add a zone for every product group Kiğılı briefed.
const ROOM_POS = [
  { x: 53, y: 60, zone: true },
  { x: 82, y: 44, zone: true },
  { x: 50, y: 16 },
  { x: 36, y: 32 },
  { x: 66, y: 76 },
  { x: 24, y: 88 },
];

// 05 · One flow, two kinds of image — a single shirt, all six frames.
const SIX_IMG: (string | null)[] = [null, null, null, null, null, null];

const COPY = {
  en: {
    back: "← Work",
    switchCode: "TR",
    switchLabel: "Türkçe",
    heroAlt: "Kiğılı Signature — Deniz seated by a window, in a long dark coat",
    heroPh: "Hero · editorial in the room · placeholder",
    title: { pre: "Editorial, ", em: "by the batch." },
    quiet: "50 pieces. One room. Three days.",
    client: "Client",
    service: "Service",
    serviceName: "Editorial System",
    scroll: "Scroll",
    feelKick: "01 · The feeling",
    feel: { pre: "A private room, ", em: "not a studio." },
    feel1: "Signature is Kiğılı’s upper line, and it should feel like one the moment a page opens: warm wood, a leather armchair, a navy rug, the quiet of a room someone lives in.",
    feel2: "And a face that belongs to it. Deniz was built for Signature alone, apart from the catalogue cast — shown in references, never described — so he is the same man on every piece.",
    denizAlt: "Deniz — the face of Kiğılı Signature",
    denizPh: "Deniz · portrait · placeholder",
    denizMeta: "34 · The face of Signature",
    tookKick: "02 · What it took",
    struck: ["A set.", "A dressed room.", "A stylist.", "A shoot day."],
    days: { pre: "The pieces arrived on Thursday and Friday. On Monday morning, all 50 went back to Kiğılı — ", em: "editorial and e-commerce, ready to launch." },
    tradeKick: "03 · The trade-off",
    trade: { pre: "Direction, or volume. ", em: "Until now, never both." },
    tradeLead: "On set, editorial is directed one look at a time, so only a few pieces get one. Image tools give you all of them — in the same pose, or in a room that drifts from frame to frame.",
    tradeAria: "Three ways to make editorial for a whole collection",
    tradeRows: [
      { who: "On set", out: "A few get an editorial" },
      { who: "Image tools", out: "All of them, one pose" },
      { who: "Signature", out: "All of them, each its own" },
    ],
    roomKick: "04 · The room",
    room: { pre: "One room. ", em: "A place in it for every group." },
    roomLine: "Kiğılı briefed a pose for each product group — shirts against the wall, knitwear in the armchair. Deniz moves through the room; the armchair, the lamp and the books come into frame only where the brief calls for them.",
    spots: [
      { key: "The armchair", tip: "Knitwear · seated. The armchair, the lamp and the books in frame." },
      { key: "The wall", tip: "Shirts · leaning on the wall. Another corner of the room, nothing else in frame." },
      { key: "Wood", tip: "A warm wooden wall, matched to Kiğılı's own reference." },
      { key: "Lamp", tip: "One warm light, held on every frame of every piece." },
      { key: "Books", tip: "Props that come into frame only where the brief calls for them." },
      { key: "Rug", tip: "A navy rug, matched to Kiğılı's own reference." },
    ],
    roomPh: "The Signature room",
    tap: "Tap a label to explore",
    held: "Held",
    heldV: "The room · the light · Deniz",
    moved: "Moved",
    movedV: "Where he stands · what’s in frame · the pose · the styling",
    flowKick: "05 · One flow",
    flow: { pre: "Editorial and e-commerce, ", em: "from one flow." },
    flowLead: "Every piece comes out with both: editorial frames in the room, styled with accessories Kiğılı chose for the image shoot alone, and a clean e-commerce set without them — one face and one light across all of them. The front e-commerce frame is made first and approved; every frame passes a human eye before it leaves the atelier.",
    six: ["01 · Editorial", "02 · Front", "03 · Back", "04 · Detail", "05 · Portrait", "06 · Editorial, the room"],
    sixAlt: "Kiğılı Signature — one shirt, frame",
    sixCap: "One shirt, all six frames",
    outcomeKick: "06 · Outcome",
    outcomeH2: "The result, in numbers.",
    metrics: [
      ["50", "Pieces"],
      ["3 days", "Thursday to Monday"],
      ["2", "Kinds of image, one flow"],
      ["1", "Room"],
      ["1", "Face, Signature's own"],
      ["0", "Sets built"],
    ],
    knockout: { pre: "Editorial — ", em: "at catalogue scale." },
    afterKick: "07 · And after",
    afterH2: "The room stays. The next drop walks in.",
    afterLead: "Signature stands on Kiğılı’s catalogue season — around 70 pieces over eight batches, where the house learned the brand. The room, the face and the pose briefs remain, ready for what comes next.",
    cta: "Get in touch →",
    next: "Next work →",
    footer: "An AI-native creative systems lab",
  },
  tr: {
    back: "← İşler",
    switchCode: "EN",
    switchLabel: "English",
    heroAlt: "Kiğılı Signature — Deniz pencere kenarında, uzun koyu bir paltoyla oturuyor",
    heroPh: "Hero · odada editoryal kare · yer tutucu",
    title: { pre: "Editoryal, ", em: "seri hâlinde." },
    quiet: "50 parça. Tek oda. Üç gün.",
    client: "Müşteri",
    service: "Hizmet",
    serviceName: "Editoryal Sistem",
    scroll: "Kaydır",
    feelKick: "01 · His",
    feel: { pre: "Bir stüdyo değil, ", em: "özel bir oda." },
    feel1: "Signature, Kiğılı’nın üst segment hattı ve sayfa açıldığı anda bunu hissettirmeli: sıcak ahşap, deri bir koltuk, lacivert bir halı, içinde yaşanan bir odanın sakinliği.",
    feel2: "Ve o odaya ait bir yüz. Deniz yalnızca Signature için kuruldu, katalog kadrosundan ayrı tutuldu. Kimliği kelimelerle tarif edilmedi, referanslarla gösterildi; bu yüzden her parçada aynı adam.",
    denizAlt: "Deniz — Kiğılı Signature’ın yüzü",
    denizPh: "Deniz · portre · yer tutucu",
    denizMeta: "34 · Signature’ın yüzü",
    tookKick: "02 · Gerekenler",
    struck: ["Bir set.", "Döşenmiş bir oda.", "Bir stilist.", "Bir çekim günü."],
    days: { pre: "Parçalar perşembe ve cuma geldi. Pazartesi sabahı 50’si birden Kiğılı’ya teslim edildi — ", em: "editoryal ve e-ticaret görselleriyle, yayına hazır." },
    tradeKick: "03 · İkilem",
    trade: { pre: "Ya yönetmenlik ya hacim. ", em: "Şimdiye dek, ikisi bir arada değil." },
    tradeLead: "Sette editoryal, her look tek tek yönetilerek çekilir; bu yüzden yalnızca birkaç parça bu kareye kavuşur. Görsel üretim araçları ise hepsini verir, ama ya aynı pozda ya da kareden kareye kayan bir odada.",
    tradeAria: "Bütün bir koleksiyon için editoryal üretmenin üç yolu",
    tradeRows: [
      { who: "Sette", out: "Birkaçı editoryal alıyor" },
      { who: "Görsel araçlar", out: "Hepsi, tek bir pozda" },
      { who: "Signature", out: "Hepsi, her biri kendine özgü" },
    ],
    roomKick: "04 · Oda",
    room: { pre: "Tek bir oda. ", em: "Her ürün grubunun içinde bir yeri var." },
    roomLine: "Kiğılı her ürün grubu için bir poz brief’i verdi: gömlekler duvara yaslanarak, trikolar koltukta oturarak. Deniz odanın içinde yer değiştiriyor; koltuk, lamba ve kitaplar yalnızca brief’in istediği karelerde kadraja giriyor.",
    spots: [
      { key: "Koltuk", tip: "Triko · oturarak. Koltuk, lamba ve kitaplar kadrajda." },
      { key: "Duvar", tip: "Gömlek · duvara yaslanarak. Odanın başka bir köşesi; kadrajda başka hiçbir şey yok." },
      { key: "Ahşap", tip: "Sıcak bir ahşap duvar; Kiğılı’nın kendi referansıyla eşleştirildi." },
      { key: "Lamba", tip: "Her parçanın her karesinde aynı kalan tek, sıcak bir ışık." },
      { key: "Kitaplar", tip: "Yalnızca brief’in istediği yerde kadraja giren objeler." },
      { key: "Halı", tip: "Lacivert bir halı; Kiğılı’nın kendi referansıyla eşleştirildi." },
    ],
    roomPh: "Signature odası",
    tap: "Keşfetmek için bir etikete dokunun",
    held: "Sabit",
    heldV: "Oda · ışık · Deniz",
    moved: "Değişen",
    movedV: "Durduğu yer · kadraja giren · poz · styling",
    flowKick: "05 · Tek akış",
    flow: { pre: "Editoryal ve e-ticaret, ", em: "tek bir akıştan." },
    flowLead: "Her parça ikisiyle birlikte çıkıyor: odada, Kiğılı’nın yalnızca imaj çekimi için seçtiği aksesuarlarla giydirilmiş editoryal kareler ve aksesuarsız, temiz bir e-ticaret seti. Hepsinde aynı yüz, aynı ışık. Önce ön e-ticaret karesi üretilip onaylanıyor; her kare atölyeden çıkmadan önce bir insan gözünden geçiyor.",
    six: ["01 · Editoryal", "02 · Ön", "03 · Arka", "04 · Detay", "05 · Portre", "06 · Editoryal, oda"],
    sixAlt: "Kiğılı Signature — tek bir gömlek, kare",
    sixCap: "Tek bir gömlek, altı karenin hepsi",
    outcomeKick: "06 · Sonuç",
    outcomeH2: "Rakamlarla sonuç.",
    metrics: [
      ["50", "Parça"],
      ["3 gün", "Perşembeden pazartesiye"],
      ["2", "Görsel türü, tek akış"],
      ["1", "Oda"],
      ["1", "Yüz, Signature’ın kendi yüzü"],
      ["0", "Kurulan set"],
    ],
    knockout: { pre: "Editoryal — ", em: "katalog ölçeğinde." },
    afterKick: "07 · Sonrası",
    afterH2: "Oda yerinde duruyor. Sıradaki koleksiyon içeri giriyor.",
    afterLead: "Signature, Kiğılı’nın katalog sezonunun üzerinde duruyor: sekiz partide yaklaşık 70 parça, markayı tanıdığımız sezon. Oda, yüz ve poz brief’leri yerinde; sırada ne varsa ona hazır.",
    cta: "İletişime geçin →",
    next: "Sonraki iş →",
    footer: "Yapay zekâ temelli bir yaratıcı sistemler laboratuvarı",
  },
};

/**
 * Kiğılı Signature case study — "Editorial, by the batch."
 * Shares the ADV page's design system and hero, not its flow. Two halves:
 * what Kiğılı's customer feels (the room, the face), then what made it
 * possible (one room mapped by product group, one flow for both kinds of
 * image). Self-contained scroll reveal, reduced-motion safe.
 */
export default function KigiliCase({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  const room = ROOM_POS.map((p, i) => ({ ...p, ...t.spots[i] }));
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const act = room.find((s) => s.key === active);

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
          {IMG.hero ? (
            <Image
              src={IMG.hero}
              alt={t.heroAlt}
              fill
              priority
              quality={90}
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "76% 30%" }}
            />
          ) : (
            <span className="hero-ph">{t.heroPh}</span>
          )}
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
          </div>
        </div>
        <div className="scrollcue">
          <span className="ln" />
          {t.scroll}
        </div>
      </section>

      {/* 01 · THE FEELING — the room and the face, as the customer meets them */}
      <section className="sec dark">
        <div className="wrap">
          <div className="kick reveal">{t.feelKick}</div>
          <div className="feel">
            <div>
              <h2 className="h2 reveal">
                {t.feel.pre}
                <em>{t.feel.em}</em>
              </h2>
              <p className="lead reveal">{t.feel1}</p>
              <p className="lead reveal">{t.feel2}</p>
            </div>
            <figure className="castfig reveal">
              <div className="castfig-img">
                {IMG.deniz ? (
                  <Image
                    src={IMG.deniz}
                    alt={t.denizAlt}
                    fill
                    sizes="(max-width: 760px) 92vw, 480px"
                    quality={90}
                    style={{ objectFit: "cover", objectPosition: "50% 30%" }}
                  />
                ) : (
                  <span className="castfig-ph">{t.denizPh}</span>
                )}
              </div>
              <figcaption className="castfig-cap">
                <h4 className="castfig-name">Deniz</h4>
                {/* NOTE: add a city, as on the ADV cast, if one is chosen. */}
                <p className="castfig-meta">{t.denizMeta}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 02 · WHAT KIĞILI DIDN'T NEED */}
      <section className="sec light">
        <div className="wrap">
          <div className="kick reveal">{t.tookKick}</div>
          <div className="staccato struck reveal">
            {t.struck.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p className="days reveal">
            {t.days.pre}
            <em>{t.days.em}</em>
          </p>
        </div>
      </section>

      {/* 03 · THE TRADE-OFF — typographic */}
      <section className="sec light tight">
        <div className="wrap">
          <div className="kick reveal">{t.tradeKick}</div>
          <h2 className="h2 reveal">
            {t.trade.pre}
            <em>{t.trade.em}</em>
          </h2>
          <p className="lead reveal">{t.tradeLead}</p>
          <div className="trade reveal" role="img" aria-label={t.tradeAria}>
            {TRADE_CELLS.map((r, ri) => (
              <div className={`trade-row ${r.tone}`} key={r.tone}>
                <span className="trade-who">{t.tradeRows[ri].who}</span>
                <span className="trade-cells">
                  {r.cells.map((c, i) => (
                    <span className={`trade-cell${c ? " on" : ""}`} key={i}>
                      {c}
                    </span>
                  ))}
                </span>
                <span className="trade-out">{t.tradeRows[ri].out}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · THE ROOM — interactive map, a place for every product group */}
      <section className="chapter">
        <header className="modhead reveal">
          <span className="modhead-no">{t.roomKick}</span>
          <h3 className="modhead-name">
            {t.room.pre}
            <em>{t.room.em}</em>
          </h3>
          <p className="modhead-line">{t.roomLine}</p>
        </header>
        <div className="studio reveal">
          <div className="studio-stage" onMouseLeave={() => setActive(null)}>
            <div className="studio-clip" aria-hidden="true">
              {IMG.room && (
                <Image
                  className="studio-bg"
                  src={IMG.room}
                  alt=""
                  fill
                  quality={90}
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              )}
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
        <div className="held reveal">
          <div className="held-col">
            <span className="held-k">{t.held}</span>
            <span className="held-v">{t.heldV}</span>
          </div>
          <div className="held-col moved">
            <span className="held-k">{t.moved}</span>
            <span className="held-v">{t.movedV}</span>
          </div>
        </div>
      </section>

      {/* 05 · ONE FLOW, TWO KINDS OF IMAGE */}
      <section className="sec dark">
        <div className="wrap">
          <div className="kick reveal">{t.flowKick}</div>
          <h2 className="h2 reveal">
            {t.flow.pre}
            <em>{t.flow.em}</em>
          </h2>
          <p className="lead reveal">{t.flowLead}</p>
        </div>
        <div className="six reveal">
          {t.six.map((label, i) => (
            <figure className="gtile" key={label}>
              {SIX_IMG[i] ? (
                <Image
                  src={SIX_IMG[i]!}
                  alt={`${t.sixAlt} ${label}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 17vw"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <span className="tile-ph dark">{label}</span>
              )}
            </figure>
          ))}
        </div>
        <p className="gallery-cap reveal">{t.sixCap}</p>
      </section>

      {/* OUTCOME */}
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

      {/* CLOSE */}
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
        .tile-ph,
        .hero-ph {
          position: absolute;
          left: 14px;
          bottom: 12px;
          font-family: var(--mono);
          font-size: 9.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(239, 232, 218, 0.45);
        }
        .hero-ph {
          left: auto;
          bottom: auto;
          top: 88px;
          right: var(--pad);
          color: rgba(239, 232, 218, 0.4);
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
          background: linear-gradient(158deg, #3a2a1e 0%, #1c140e 55%, #0b0806 100%);
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

        /* 01 · the feeling — copy beside Deniz */
        .feel {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(36px, 6vw, 96px);
          align-items: end;
        }
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
        @media (max-width: 760px) {
          .feel {
            grid-template-columns: 1fr;
          }
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
        .staccato.struck span {
          width: fit-content;
          color: var(--tx-mut);
          text-decoration: line-through;
          text-decoration-color: var(--oxblood);
          text-decoration-thickness: 1px;
        }
        .days {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(22px, 2.6vw, 34px);
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: var(--tx);
          max-width: 30ch;
          margin-top: clamp(40px, 5vw, 64px);
        }
        .days em {
          font-style: italic;
          color: var(--oxblood);
        }

        /* 03 · trade-off — typographic diagram */
        .trade {
          margin-top: clamp(40px, 5vw, 64px);
          border-top: 1px solid var(--tx-line);
        }
        .trade-row {
          display: grid;
          grid-template-columns: 140px 1fr 220px;
          gap: clamp(14px, 2.4vw, 32px);
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid var(--tx-line);
        }
        .trade-who,
        .trade-out {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--tx-mut);
        }
        .trade-cells {
          display: grid;
          grid-template-columns: repeat(10, minmax(0, 1fr));
          gap: 6px;
        }
        .trade-cell {
          aspect-ratio: 3 / 4;
          display: flex;
          align-items: flex-end;
          padding: 6px;
          border: 1px dashed var(--stone);
          border-radius: var(--r);
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          color: var(--tx-mut);
        }
        .trade-cell.on {
          border-style: solid;
          background: var(--bone-2);
          color: var(--tx);
        }
        .trade-row.tool .trade-cell.on {
          color: var(--tx-mut);
        }
        .trade-row.lio .trade-who,
        .trade-row.lio .trade-out {
          color: var(--gold);
        }
        .trade-row.lio .trade-cell.on {
          border-color: var(--gold);
          background: rgba(176, 122, 46, 0.08);
          color: var(--gold);
        }
        @media (max-width: 760px) {
          .trade-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .trade-cells {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }
          .trade-cell {
            aspect-ratio: auto;
            height: 34px;
          }
        }

        /* 04 · the room — chapter head + interactive map */
        .chapter {
          background: var(--ink);
          color: var(--on);
          padding-bottom: clamp(64px, 9vw, 120px);
        }
        .modhead {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: clamp(96px, 12vw, 168px) var(--pad) clamp(30px, 4vw, 50px);
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
        .studio-key.zone {
          color: var(--gold);
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
        .held {
          max-width: var(--maxw);
          margin: clamp(26px, 3vw, 40px) auto 0;
          padding: 0 var(--pad);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 3vw, 40px);
        }
        .held-col {
          border-top: 1px solid var(--on-line);
          padding-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .held-k {
          font-family: var(--mono);
          font-size: 10.5px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--on-mut);
        }
        .held-col.moved .held-k {
          color: var(--gold);
        }
        .held-v {
          font-family: var(--display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(17px, 1.8vw, 22px);
          line-height: 1.4;
          color: var(--on);
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
          .held {
            grid-template-columns: 1fr;
          }
        }

        /* 05 · one flow — one shirt's six frames */
        .six {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: clamp(5px, 0.7vw, 10px);
          margin-top: clamp(48px, 6vw, 80px);
          padding: 0 clamp(5px, 0.7vw, 10px);
        }
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
          .six {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 560px) {
          .six {
            grid-template-columns: repeat(2, 1fr);
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
          max-width: 18ch;
        }
        .knockout em {
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
