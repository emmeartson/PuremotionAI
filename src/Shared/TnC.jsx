import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function TnC() {
  return (
    <section>
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800 leading-relaxed">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-6">
          These PureMotion Terms of Service (the “Agreement”) govern the
          contractual relationship between AKIAURA PTY LTD as a service provider
          and any natural person as a service user.
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
            The Company provides services that include artificial intelligence
            tools designed to transform static images into dynamic videos using
            advanced generative AI technology.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Services may include AI-powered image-to-video transformation.
            </li>
            <li>
              The services are accessible via the website
              https://puremotion.app/ and related systems.
            </li>
            <li>
              Content generated through the platform may be referred to as
              “Generated Content”.
            </li>
          </ul>

          <p className="mt-3">
            By using the Services, you confirm that you have read and understood
            this Agreement and agree to be legally bound by it.
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            2. Access to Services / Creating an Account
          </h2>

          <p className="mb-3">
            To access the Services, users must create an account through the
            System and follow the instructions provided.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>Name</li>
            <li>Email address</li>
            <li>Unique password</li>
            <li>Acceptance of the Terms of Service and Privacy Policy</li>
          </ul>

          <p className="mt-3">
            The Client confirms that all information provided is accurate,
            complete, and up to date.
          </p>
        </section>

        {/* SECTION 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            3. Suspension of Services and Account Access
          </h2>

          <p className="mb-3">
            The Company may suspend access to the System or Services if:
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>The Client breaches this Agreement.</li>
            <li>The Client fails to make required payments.</li>
            <li>The Client violates applicable laws or regulations.</li>
            <li>
              The Client’s activity poses security, reputational, or financial
              risks to the Company or other users.
            </li>
          </ul>
        </section>

        {/* SECTION 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            4. Payments and Refunds
          </h2>

          <p className="mb-3">
            Services are offered on a paid basis, typically through subscription
            plans. Prices and plan details are displayed in the System during
            checkout.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>Prices are displayed in USD unless otherwise stated.</li>
            <li>Subscriptions automatically renew unless cancelled.</li>
            <li>
              Payments are processed via third-party providers such as Stripe.
            </li>
          </ul>

          <p className="mt-3 font-semibold">Refund policy:</p>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Refunds may be requested within 14 days if no credits have been
              used.
            </li>
            <li>
              Refunds may be issued if services fail due to Company fault.
            </li>
            <li>
              Exceptional refunds may be granted at the Company’s discretion.
            </li>
          </ul>
        </section>

        {/* SECTION 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            5. License to Access and Use the System
          </h2>

          <p className="mb-3">
            The Company grants a limited, non-exclusive, non-transferable
            license to use the System solely for personal and lawful purposes.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>Users must not republish or resell system materials.</li>
            <li>Users must not copy or modify platform content.</li>
            <li>Users must not damage or disrupt system functionality.</li>
          </ul>
        </section>

        {/* SECTION 6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">6. Risks</h2>

          <p className="mb-3">
            The Services rely on artificial intelligence and generated outputs
            may not always be accurate or realistic.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>Generated outputs may differ from expectations.</li>
            <li>Service availability may be affected by technical issues.</li>
            <li>Users must ensure they have permission to upload content.</li>
          </ul>
        </section>

        {/* SECTION 7 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            7. Third-Party Services
          </h2>

          <p>
            The Company may rely on third-party services such as payment
            processing, hosting, or analytics. These providers operate under
            their own policies and terms.
          </p>
        </section>

        {/* SECTION 8 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">8. Indemnification</h2>

          <p>
            The Client agrees to indemnify and hold harmless the Company and its
            affiliates against claims resulting from misuse of the Services or
            violation of this Agreement.
          </p>
        </section>

        {/* SECTION 9 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            9. Termination of the Agreement
          </h2>

          <p>
            Clients may terminate their subscription by cancelling their plan.
            Termination takes effect at the end of the paid period.
          </p>
        </section>

        {/* SECTION 10 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>

          <p>
            This Agreement is governed by the laws of Queensland, Australia,
            subject to applicable consumer protection laws.
          </p>
        </section>

        {/* SECTION 11 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">11. Miscellaneous</h2>

          <p className="mb-3">
            The Company may update this Agreement from time to time. Continued
            use of the Services indicates acceptance of the updated terms.
          </p>

          <p>
            For inquiries, please contact:
            <span className="font-semibold"> support@puremotion.com</span>
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-10">Last updated: March 2026</p>
      </div>
      <Footer />
    </section>
  );
}

export default TnC;
