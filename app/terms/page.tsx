import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that govern your use of lioralabs.io.",
};

export default function TermsOfUse() {
  return (
    <LegalLayout title="Terms of Use" updated="30 June 2026">
      <p>
        These Terms govern your use of <strong>lioralabs.io</strong> (the
        &ldquo;site&rdquo;), operated by Liora (&ldquo;Liora&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the site you agree to these
        Terms. If you do not agree, please do not use the site.
      </p>

      <h2>About this site</h2>
      <p>
        The site is an editorial presentation of Liora&rsquo;s work, thinking and
        services. Content is provided for general information and may change or
        be removed at any time without notice.
      </p>

      <h2>Using the site</h2>
      <p>
        You may view and share the site for lawful personal or professional
        purposes. You agree not to misuse it — including attempting to disrupt or
        gain unauthorised access to it, scraping it at scale, or
        reverse-engineering any part of it.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The site&rsquo;s text, design, layout, name and marks, and our original
        imagery, are owned by Liora or its licensors and are protected by
        applicable laws. Some placeholder images are public-domain artworks shown
        for illustration only. You may not reproduce, distribute or create
        derivative works from our content without our written permission.
      </p>

      <h2>Enquiries are not a contract</h2>
      <p>
        Contacting us does not create a client relationship. Any engagement
        between you and Liora is governed by a separate written agreement.
      </p>

      <h2>Third-party links</h2>
      <p>
        The site links to external services we do not control (for example,
        social profiles). We are not responsible for their content, policies or
        practices.
      </p>

      <h2>Disclaimer</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo;
        To the fullest extent permitted by law, we make no warranties that it
        will be error-free, uninterrupted, or that its content is complete or
        current.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Liora will not be liable for any
        indirect, incidental or consequential loss arising from your use of, or
        inability to use, the site.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of <strong>Turkey</strong>, and any
        disputes will be subject to the courts of{" "}
        <strong>Bursa, Turkey</strong>.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use of the site
        after changes means you accept the updated Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Write to{" "}
        <a href="mailto:info@lioralabs.io">info@lioralabs.io</a>.
      </p>
    </LegalLayout>
  );
}
