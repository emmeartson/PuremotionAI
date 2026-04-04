import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function PrivacyPolicy() {
  return (
    <section>
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800 leading-relaxed">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          This PureMotion Privacy Policy (the “Privacy Policy”) explains how
          AKIAURA PTY LTD protects user privacy and handles personal information
          when you use any system operated by AKIAURA PTY LTD, or when there is
          a contractual relationship between AKIAURA PTY LTD as a service
          provider and any natural person as a service user.
        </p>

        <p className="mb-6 font-semibold">
          BY USING THIS WEBSITE https://puremotion.app/ (the “Website”), the
          Mosso progressive web app (the “PWA”) OR ANY OTHER SYSTEM / ONLINE
          ECOSYSTEM USED BY AKIAURA PTY LTD TO PROVIDE YOU SERVICES
          (collectively, the “System”), YOU AGREE TO THIS PRIVACY POLICY.
        </p>

        {/* SECTION 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            1. General provisions and definitions
          </h2>

          <p className="mb-3">
            AKIAURA PTY LTD is an Australian proprietary company (ACN 693 315
            703, ABN 17 693 315 703) with its registered office in Hope Island,
            Queensland 4212, Australia (the “Company”, “we”, “us”, or “our”).
          </p>

          <p className="mb-3">
            “PureMotion” is a product and brand operated by AKIAURA PTY LTD.
          </p>

          <p className="mb-3">
            Any person using the Company’s services / systems is considered to
            be a client of the Company (the “Client” / “You”).
          </p>

          <p className="mb-3">
            The Company provides services that include artificial intelligence
            features designed to transform static images into dynamic videos
            using generative AI technology.
          </p>

          <p className="mb-3">
            These services may include, but are not limited to, image-to-video
            transformation powered by AI tools and related features (the
            “Services”).
          </p>

          <p className="mb-3">
            You may optionally provide images or appearance data such as
            photographs or contextual information. This data is processed solely
            to deliver the requested Services.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">2. Applicability</h2>

          <p className="mb-3">
            This Privacy Policy applies to all persons who use the System /
            Services or otherwise interact with the Company.
          </p>

          <p className="mb-3">
            The Company’s services are not intended for individuals under the
            legal age. We do not knowingly collect personal information from
            minors.
          </p>
        </section>

        {/* SECTION 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            3. Controller, obligations and scope
          </h2>

          <p className="mb-3">
            The Company acts as the organisation responsible for collecting and
            handling personal information.
          </p>

          <p className="mb-3">
            Personal information may be stored or processed in Australia or
            other countries where our infrastructure or service providers are
            located.
          </p>

          <p className="mb-3">
            We implement appropriate safeguards for international transfers
            where required by law.
          </p>

          <p className="mb-3">
            If a data breach occurs, we will notify affected users and
            regulators as required under applicable laws.
          </p>
        </section>

        {/* SECTION 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            4. Data categories and sources
          </h2>

          <p className="mb-3">
            We may collect personal information when you use our Services,
            contact support, or interact with our platform.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>Contact data (name, email, phone number)</li>
            <li>Order data related to requested services</li>
            <li>Payment and transaction information</li>
            <li>Log data such as IP address, browser type, and device info</li>
            <li>Marketing data and usage analytics</li>
            <li>Photo, video, and audio data where applicable</li>
            <li>Recruitment data if applying for jobs</li>
          </ul>
        </section>

        {/* SECTION 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            5. Purpose and legal basis
          </h2>

          <p className="mb-3">
            We process personal information to provide services, fulfil legal
            obligations, improve system performance, and ensure security.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>Performance of contractual obligations</li>
            <li>User consent for marketing and analytics</li>
            <li>Compliance with legal requirements</li>
            <li>Protection of legitimate business interests</li>
          </ul>
        </section>

        {/* SECTION 6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            6. Social media, cookies and analytics
          </h2>

          <p className="mb-3">
            We may maintain social media pages to communicate with users and
            provide updates about our services.
          </p>

          <p className="mb-3">
            The System may use cookies and similar technologies to improve
            functionality, measure performance, and support marketing
            activities.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>Google Analytics for usage insights</li>
            <li>Meta Pixel for advertising performance</li>
            <li>Optional cookies requiring user consent</li>
          </ul>
        </section>

        {/* SECTION 7 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">7. Your rights</h2>

          <p className="mb-3">
            Depending on applicable law, you may have the following rights:
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>Right to withdraw consent</li>
            <li>Right to access personal information</li>
            <li>Right to correction of inaccurate data</li>
            <li>Right to request deletion of personal information</li>
            <li>Right to data portability</li>
            <li>Right to restrict processing</li>
            <li>Right to lodge a complaint with regulators</li>
          </ul>

          <p className="mt-4">
            To exercise these rights, please contact:
            <span className="font-semibold"> support@puremotion.com</span>
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-10">Last updated: March 2026</p>
      </div>
      <Footer />
    </section>
  );
}

export default PrivacyPolicy;
