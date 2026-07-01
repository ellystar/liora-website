import Reveal from "./Reveal";
import ContactForm from "./ContactForm";

export default function Close() {
  return (
    <section id="contact" className="scroll-mt-24">
      {/* The quiet invitation + form */}
      <div className="bg-ink">
        <div className="wrap grid grid-cols-1 gap-x-16 gap-y-12 py-[clamp(72px,11vw,140px)] md:grid-cols-2">
          <Reveal stagger={0.1} className="max-w-md">
            <h3 className="d2 text-on-dark">
              Bring us your next chapter.
            </h3>
            <p className="body mt-6 !text-on-dark-mut">
              We take on a small number of brands. Tell us what you&apos;re
              scaling and what you refuse to lose — we&apos;ll tell you whether
              we&apos;re the right partner for it.
            </p>
            <p className="mt-8 font-mono text-[13px] !text-on-dark-mut">
              Or write directly —{" "}
              <a href="mailto:info@lioralabs.io" className="link-inline">
                info@lioralabs.io
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
