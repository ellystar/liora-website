import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Liora collects, uses and protects your information when you visit lioralabs.io.",
};

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" updated="30 June 2026">
      <p>
        This Privacy Policy explains how Liora (&ldquo;Liora&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information when you visit{" "}
        <strong>lioralabs.io</strong>. Liora is operated by{" "}
        <strong>Liora Labs</strong>, based in Bursa, Turkey and working
        globally. We keep data collection to the minimum needed to have a
        conversation with you.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you give us.</strong> When you use the contact
          form or email us, we receive your name, email address, the brand you
          mention and the message you send.
        </li>
        <li>
          <strong>Technical information.</strong> Basic, non-identifying data
          your browser sends (such as device and browser type) and, only with
          your consent, anonymous analytics about how the site is used.
        </li>
      </ul>
      <p>
        We do not ask for, and do not knowingly collect, sensitive personal
        data, and the site is not directed to children under 16.
      </p>

      <h2>How the contact form works</h2>
      <p>
        Our contact form opens your own email application and sends your message
        directly to{" "}
        <a href="mailto:info@lioralabs.io">info@lioralabs.io</a>. We do not run a
        third-party form service and do not store submissions in a database — we
        simply receive your message as an email.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To reply to you and assess whether we are the right partner.</li>
        <li>To operate, maintain and improve the site.</li>
        <li>To meet legal and record-keeping obligations.</li>
      </ul>
      <p>We do not sell or rent your personal data.</p>

      <h2>Cookies &amp; local storage</h2>
      <p>
        The site uses minimal, functional browser storage — for example, to
        remember your cookie choice so we don&rsquo;t ask again. We do not use
        advertising cookies. Any analytics run only after you accept them in the
        cookie banner; if you choose &ldquo;Essential only&rdquo; none are set.
        You can change your choice at any time by clearing this site&rsquo;s data
        in your browser.
      </p>

      <h2>Legal bases (where the GDPR applies)</h2>
      <ul>
        <li>
          <strong>Consent</strong> — for optional analytics.
        </li>
        <li>
          <strong>Legitimate interests / pre-contract steps</strong> — to
          respond to your enquiry and run the site securely.
        </li>
      </ul>

      <h2>Sharing</h2>
      <p>
        We rely on a small number of trusted providers (for example, website
        hosting and email) who process information on our behalf under
        appropriate agreements. We do not sell, rent or trade your personal
        data.
      </p>

      <h2>Retention &amp; international transfers</h2>
      <p>
        We keep enquiry emails only as long as needed for our conversation and
        reasonable record-keeping, then delete them. We operate from Turkey and
        work with people worldwide; where information crosses borders we take
        appropriate safeguards.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct,
        delete, export or object to our use of your information, and to withdraw
        consent. To exercise any of these, email{" "}
        <a href="mailto:info@lioralabs.io">info@lioralabs.io</a> and we will
        respond within a reasonable time.
      </p>

      <h2>Security</h2>
      <p>
        We take reasonable measures to protect information, but no method of
        transmission or storage is completely secure, and we cannot guarantee
        absolute security.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The date above reflects the
        latest version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Write to{" "}
        <a href="mailto:info@lioralabs.io">info@lioralabs.io</a>.
      </p>
    </LegalLayout>
  );
}
