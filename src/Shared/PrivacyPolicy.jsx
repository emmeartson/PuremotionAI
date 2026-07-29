import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";

const PureMotionPrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('glance');

  const tableOfContents = [
    { id: 'glance', title: 'Privacy at a glance' },
    { id: 'sec-1', title: '1. Who we are' },
    { id: 'sec-2', title: '2. Scope and legal framework' },
    { id: 'sec-3', title: '3. Information we collect' },
    { id: 'sec-4', title: '4. How we collect' },
    { id: 'sec-5', title: '5. Why we use information' },
    { id: 'sec-6', title: '6. AI processing and content' },
    { id: 'sec-7', title: '7. Cookies and analytics' },
    { id: 'sec-8', title: '8. When we disclose' },
    { id: 'sec-9', title: '9. Overseas processing' },
    { id: 'sec-10', title: '10. Data retention' },
    { id: 'sec-11', title: '11. Security' },
    { id: 'sec-12', title: '12. Children' },
    { id: 'sec-13', title: '13. Marketing communications' },
    { id: 'sec-14', title: '14. Your privacy rights' },
    { id: 'sec-15', title: '15. Privacy complaints' },
    { id: 'sec-16', title: '16. Data breaches' },
    { id: 'sec-17', title: '17. Changes to this policy' },
  ];

  useEffect(() => {
    const sectionEls = tableOfContents.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    sectionEls.forEach((el) => observer.observe(el));
    return () => sectionEls.forEach((el) => observer.unobserve(el));
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Header />
      <style>{`
        .policy-hero { padding: 64px 24px 48px; }
        .policy-layout { display: flex; flex-direction: row; gap: 32px; max-width: 1200px; margin: 0 auto; padding: 40px 24px 80px; align-items: flex-start; }
        .policy-sidebar { width: 260px; flex-shrink: 0; position: sticky; top: 100px; max-height: calc(100vh - 120px); overflow-y: auto; }
        .policy-sidebar-card { border-radius: 16px; }
        .policy-nav { display: flex; flex-direction: column; gap: 2px; }
        .policy-main { flex: 1; min-width: 0; }
        @media (max-width: 768px) {
          .policy-hero { padding: 36px 16px 28px !important; }
          .policy-layout { flex-direction: column !important; padding: 20px 16px 60px !important; gap: 16px !important; }
          .policy-sidebar { width: 100% !important; position: static !important; max-height: none !important; overflow-y: visible !important; }
          .policy-sidebar-card { border-radius: 12px !important; padding: 14px 16px !important; }
          .policy-nav { flex-direction: row !important; flex-wrap: wrap !important; gap: 6px !important; max-height: none !important; overflow-x: auto !important; padding-bottom: 4px; }
          .policy-main { width: 100% !important; }
          .policy-nav button { font-size: 12px !important; padding: 6px 10px !important; white-space: nowrap; }
        }
      `}</style>
      <div style={styles.page}>
        {/* Hero Banner */}
        <div style={styles.hero} className="policy-hero">
          <div style={styles.heroInner}>
            <div style={styles.heroBadge}>Legal</div>
            <h1 style={styles.heroTitle}>Privacy Policy</h1>
            <p style={styles.heroSub}>AKIAURA PTY LTD (trading as PureMotion) · Last updated 2025</p>
          </div>
        </div>

        <div className="policy-layout">
          {/* Sidebar */}
          <aside className="policy-sidebar">
            <div style={styles.sidebarCard} className="policy-sidebar-card">
              <p style={styles.sidebarLabel}>Contents</p>
              <nav style={styles.nav} className="policy-nav">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    style={{
                      ...styles.navItem,
                      ...(activeSection === item.id ? styles.navItemActive : {}),
                    }}
                  >
                    {activeSection === item.id && <span style={styles.navDot} />}
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="policy-main" style={styles.main}>

            {/* Privacy at a glance */}
            <section id="glance" style={styles.section}>
              <h2 style={styles.sectionTitle}>Privacy at a glance</h2>
              <div style={styles.glanceGrid}>
                {[
                  { bold: 'Your uploaded photos and videos remain yours.', rest: '' },
                  { bold: 'We use uploaded content', rest: ' to provide the photo-to-video service you request.' },
                  { bold: 'We do not sell', rest: ' your uploaded photos or generated videos.' },
                  { bold: 'We do not use customer-uploaded photos', rest: ' to train publicly available AI models without your explicit permission.' },
                  { bold: 'Payments are processed by third-party payment providers;', rest: ' PureMotion does not store full card numbers.' },
                  { bold: 'You can request access, correction or deletion', rest: ' of your personal information, subject to legal requirements.' },
                ].map((item, i) => (
                  <div key={i} style={styles.glanceItem}>
                    <span style={styles.glanceIcon}>✓</span>
                    <span style={styles.glanceText}><strong>{item.bold}</strong>{item.rest}</span>
                  </div>
                ))}
              </div>
              <p style={styles.italic}><em>This summary is for convenience. The full policy below governs how we handle personal information.</em></p>
              <p style={styles.bodyText}>
                <strong>AKIAURA PTY LTD</strong> (ABN 17 693 315 703), trading as <strong>PureMotion</strong>, respects your privacy. This Privacy Policy explains how we collect, hold, use and disclose personal information when you visit <em>https://puremotion.co</em>, use the PureMotion web application or related services, contact us, purchase a plan, or otherwise interact with us (collectively, the <strong>"Services"</strong>).
              </p>
              <p style={styles.bodyText}>
                This policy is intended to be read together with the PureMotion Terms of Service and any collection notice or consent request shown when information is collected.
              </p>
            </section>

            <Section id="sec-1" title="1. Who we are and how to contact us">
              <p style={styles.bodyText}>AKIAURA PTY LTD is an Australian proprietary company with its registered office in Australia. PureMotion is a product and brand operated by AKIAURA PTY LTD.</p>
              <div style={styles.contactCard}>
                <p style={styles.contactName}>AKIAURA PTY LTD</p>
                <a href="mailto:support@puremotion.co" style={styles.contactLink}>support@puremotion.co</a>
                <a href="https://puremotion.co" style={styles.contactLink} target="_blank" rel="noopener noreferrer">https://puremotion.co</a>
              </div>
              <p style={styles.bodyText}>For the purposes of applicable privacy and data protection laws, AKIAURA PTY LTD generally acts as the organisation responsible for the personal information it collects and uses.</p>
            </Section>

            <Section id="sec-2" title="2. Scope and legal framework">
              <p style={styles.bodyText}>This policy applies to personal information handled through the Services, our website, customer accounts, support channels, marketing activities, social media pages, recruitment activities and business relationships.</p>
              <p style={styles.bodyText}>We aim to handle personal information in accordance with applicable Australian privacy laws, including the Privacy Act 1988 (Cth) and the Australian Privacy Principles where they apply to us. Where we offer Services to people in the European Economic Area or the United Kingdom, we also seek to meet applicable requirements of the EU GDPR and UK GDPR.</p>
              <p style={styles.bodyText}>Nothing in this policy limits rights that cannot lawfully be excluded under applicable privacy, consumer or data protection law.</p>
            </Section>

            <Section id="sec-3" title="3. Personal information we collect">
              <p style={styles.bodyText}>The types of personal information we collect depend on how you interact with PureMotion. They may include:</p>

              <SubSection title="3.1 Account and contact information">
                <BulletList items={[
                  'Name, email address, account credentials and account identifiers.',
                  'Contact details and communications with our support team.',
                  'Account preferences, language, region and settings.',
                ]} />
              </SubSection>

              <SubSection title="3.2 Uploaded content and generated content">
                <BulletList items={[
                  'Photos, images and other content you upload.',
                  'Information visible in uploaded content, which may include faces, appearance, clothing, surroundings and contextual details.',
                  'Instructions, prompts, selected animation styles and related preferences.',
                  'Videos, previews and other outputs generated through the Services.',
                ]} />
                <div style={styles.infoBox}>
                  <span style={styles.infoIcon}>ℹ</span>
                  <span>Uploaded content may contain personal information about you or other people. <strong>You are responsible for ensuring that you have the necessary permission or other lawful basis to upload and use content relating to another person.</strong></span>
                </div>
              </SubSection>

              <SubSection title="3.3 Transaction and subscription information">
                <BulletList items={[
                  'Selected plan, purchase history, subscription status, billing interval, credits or usage entitlements, cancellation status and refund information.',
                  'Payment method type, payment status, transaction identifiers, billing country and limited payment metadata provided by our payment processors.',
                ]} />
                <p style={styles.bodyText}>We do not store complete payment card numbers or card security codes on our systems.</p>
              </SubSection>

              <SubSection title="3.4 Usage, device and technical information">
                <BulletList items={[
                  'IP address, browser type, operating system, device type and device identifiers.',
                  'Log-in dates, account activity, pages viewed, clicks, session duration, referral source and approximate location derived from IP address.',
                  'Error logs, crash reports, performance data and security events.',
                  'Cookie identifiers, advertising identifiers and analytics information, subject to your consent where required.',
                ]} />
              </SubSection>

              <SubSection title="3.5 Marketing and communications information">
                <BulletList items={[
                  'Email preferences, newsletter subscriptions and marketing opt-in or opt-out choices.',
                  'Advertising interactions, campaign attribution and engagement with our website, emails or social media pages.',
                  'Survey responses, reviews, testimonials and feedback you choose to provide.',
                ]} />
              </SubSection>

              <SubSection title="3.6 Recruitment and business information">
                <p style={styles.bodyText}>If you apply for work with us or interact with us as a contractor, supplier or business contact, we may collect information reasonably necessary for that relationship, such as contact details, work history, qualifications, portfolio information, payment details and identification documents where required.</p>
              </SubSection>

              <SubSection title="3.7 Sensitive information">
                <p style={styles.bodyText}>PureMotion does not require sensitive information to provide the Services. Uploaded photos may nevertheless reveal information that is treated as sensitive under some laws, such as racial or ethnic origin, health information, religious affiliation or biometric characteristics. We do not use facial images to identify or authenticate people unless we clearly tell you and obtain any consent required by law.</p>
              </SubSection>
            </Section>

            <Section id="sec-4" title="4. How we collect personal information">
              <p style={styles.bodyText}>We may collect personal information:</p>
              <BulletList items={[
                'Directly from you when you create an account, upload content, purchase a plan, contact support, submit a form or communicate with us.',
                'Automatically through cookies, pixels, logs, analytics tools and similar technologies when you use the Services.',
                'From payment processors, fraud-prevention providers, analytics providers, advertising platforms and other service providers.',
                'From public sources or social media platforms when you interact with our pages or content.',
                'From a person acting on your behalf, where they are authorised to do so.',
              ]} />
              <p style={styles.bodyText}>Where practicable, you may browse general website content without identifying yourself.</p>
            </Section>

            <Section id="sec-5" title="5. Why we use personal information">
              <p style={styles.bodyText}>We use personal information for purposes including:</p>
              <BulletList items={[
                'Providing, operating and improving the Services.',
                'Creating photo-to-video animations and delivering generated content.',
                'Creating and administering accounts, subscriptions, credits and purchases.',
                'Processing payments, refunds, cancellations and failed-payment retries.',
                'Providing customer support and responding to enquiries.',
                'Protecting the Services against fraud, misuse, security threats and unauthorised access.',
                'Troubleshooting errors, monitoring performance and maintaining service reliability.',
                'Analysing usage and improving product design, user experience and conversion flows.',
                'Sending service messages, transactional emails and, where permitted, marketing communications.',
                'Measuring advertising effectiveness, attribution and campaign performance.',
                'Complying with legal obligations, enforcing our agreements and resolving disputes.',
                'Conducting recruitment, supplier management and ordinary business administration.',
              ]} />

              <SubSection title="5.1 Legal bases for EEA and UK users">
                <p style={styles.bodyText}>Where the EU GDPR or UK GDPR applies, we rely on one or more of the following legal bases: performance of a contract; steps taken at your request before entering a contract; compliance with legal obligations; our legitimate interests or those of a third party; and consent where required.</p>
                <p style={styles.bodyText}>Where we rely on consent, you may withdraw it at any time. Withdrawal does not affect processing that occurred before consent was withdrawn.</p>
              </SubSection>
            </Section>

            <Section id="sec-6" title="6. AI processing and uploaded content">
              <SubSection title="6.1 How AI is used">
                <p style={styles.bodyText}>PureMotion uses artificial intelligence and machine-learning technologies, including third-party model and infrastructure providers, to transform uploaded images into videos and related outputs. Uploaded content, prompts, settings and technical information may be transmitted to those providers only as reasonably necessary to generate, deliver, secure and improve the requested service.</p>
              </SubSection>

              <SubSection title="6.2 Ownership and licence">
                <p style={styles.bodyText}>You retain your ownership rights in content you upload. We do not claim ownership of your uploaded photos or generated videos. You grant us a limited, non-exclusive licence to host, copy, transmit, modify and process uploaded content only to operate, secure, support and provide the Services.</p>
              </SubSection>

              <SubSection title="6.3 AI training and model improvement">
                <p style={styles.bodyText}>We do not use customer-uploaded photographs or generated videos to train publicly available AI models without your explicit permission. Our service providers may process content to provide the Services under contractual terms and technical controls.</p>
              </SubSection>

              <SubSection title="6.4 Limitations of generated content">
                <p style={styles.bodyText}>AI-generated outputs may be inaccurate, distorted or different from real events, movements or expressions. They should not be treated as an authentic recording of an event.</p>
              </SubSection>
            </Section>

            <Section id="sec-7" title="7. Cookies, analytics and advertising technologies">
              <p style={styles.bodyText}>We use cookies and similar technologies to operate the Services, remember preferences, understand usage, improve performance and measure advertising. These technologies may include:</p>
              <BulletList items={[
                'Strictly necessary technologies required for security, account access, checkout and core functionality.',
                'Preference technologies that remember settings and choices.',
                'Analytics technologies that help us understand traffic, engagement and product performance.',
                'Advertising technologies that measure campaigns, attribute conversions and support relevant advertising.',
              ]} />
              <p style={styles.bodyText}>Our providers may include Google Analytics and Google advertising tools, Meta Pixel and related Meta technologies, and other analytics or advertising providers. Where required by law, optional analytics and advertising technologies are used only after you provide consent.</p>
            </Section>

            <Section id="sec-8" title="8. When we disclose personal information">
              <p style={styles.bodyText}>We may disclose personal information to:</p>
              <BulletList items={[
                'Cloud hosting, storage, content-delivery and security providers.',
                'AI model, media-processing and technical infrastructure providers used to generate content.',
                'Payment processors and payment methods, including Stripe, Apple Pay, Google Pay and Link.',
                'Email, customer-support, analytics, fraud-prevention and communications providers.',
                'Advertising and social media platforms where permitted and subject to consent where required.',
                'Professional advisers, auditors, insurers, contractors and suppliers who need the information to provide services to us.',
                'Government bodies, regulators, courts, law-enforcement agencies or other persons where required or authorised by law.',
                'A buyer, investor or successor in connection with a proposed or completed merger, sale, financing, restructuring or transfer.',
              ]} />
              <div style={styles.highlightBox}>
                <span style={styles.highlightIcon}>🔒</span>
                <span>We do not sell your uploaded photos or generated videos. We do not disclose your contact information to unaffiliated third parties for their own direct marketing without your permission.</span>
              </div>
            </Section>

            <Section id="sec-9" title="9. Overseas processing and cross-border transfers">
              <p style={styles.bodyText}>PureMotion is based in Australia and uses service providers that may process information in Australia and other countries. Depending on the provider and service used, overseas processing may occur in the United States, the United Kingdom, countries in the European Economic Area and other locations where our providers operate data centres or support services.</p>
              <p style={styles.bodyText}>Privacy protections in those countries may differ from those in your country. Where required by applicable law, we use recognised transfer mechanisms or contractual safeguards.</p>
            </Section>

            <Section id="sec-10" title="10. Data retention">
              <p style={styles.bodyText}>We retain personal information only for as long as reasonably necessary for the purposes described in this policy. Typical retention periods are:</p>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHead}>
                      <th style={styles.th}>Information category</th>
                      <th style={styles.th}>Typical retention approach</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Account and profile information', 'While your account is active and generally deleted or anonymised within 30 days after account closure, subject to legal, fraud-prevention and backup requirements.'],
                      ['Uploaded photos and generated videos', 'For as long as needed to provide your account, storage and download features, or until you delete them or request deletion. Temporary copies may remain in backups for a limited period.'],
                      ['Transaction, subscription and tax records', 'Up to 7 years or longer where required by tax, accounting, consumer or other law.'],
                      ['Security, technical and usage logs', 'Generally up to 12 months, unless a longer period is reasonably necessary to investigate fraud, abuse, security incidents or legal claims.'],
                      ['Marketing preferences', 'Until you opt out, withdraw consent or the information is no longer needed, with a suppression record retained to respect your choice.'],
                      ['Anonymised and aggregated information', 'May be retained without a fixed period where it can no longer reasonably identify you.'],
                    ].map(([cat, approach], i) => (
                      <tr key={i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                        <td style={styles.tdBold}>{cat}</td>
                        <td style={styles.td}>{approach}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={styles.bodyText}>Deleting an account does not require us to delete information that we must retain by law or that has been irreversibly anonymised.</p>
            </Section>

            <Section id="sec-11" title="11. Security">
              <p style={styles.bodyText}>We use administrative, technical and organisational safeguards designed to protect personal information against loss, misuse, interference, unauthorised access, modification and disclosure. Measures may include encryption in transit, access controls, authentication, monitoring, secure hosting, payment tokenisation, vendor due diligence and incident-response procedures.</p>
              <p style={styles.bodyText}>Our safeguards are reviewed and adjusted in light of the nature of the information, known risks, available technology and the size and complexity of our operations.</p>
              <div style={styles.warningBox}>
                <span style={styles.warningIcon}>⚠</span>
                <span>No online service can guarantee absolute security. You are responsible for keeping account credentials confidential and for notifying us promptly if you suspect unauthorised access.</span>
              </div>
            </Section>

            <Section id="sec-12" title="12. Children and photos containing children">
              <p style={styles.bodyText}>The Services are intended for people aged 18 years or older, or the age of legal majority in their location. We do not knowingly allow minors to create accounts or purchase Services.</p>
              <p style={styles.bodyText}>An adult may upload a photograph containing a child only where the adult has the right and authority to do so and the use is lawful and appropriate.</p>
              <p style={styles.bodyText}>If you believe a minor has provided personal information to us without appropriate authorisation, contact us so we can investigate and take appropriate action.</p>
            </Section>

            <Section id="sec-13" title="13. Marketing communications">
              <p style={styles.bodyText}>Where permitted by law, we may send marketing communications about PureMotion products, offers and updates. You can unsubscribe at any time using the unsubscribe link in an email, updating available account preferences or contacting <a href="mailto:support@puremotion.co" style={styles.inlineLink}>support@puremotion.co</a>. We may still send essential service, account, security and transaction messages.</p>
            </Section>

            <Section id="sec-14" title="14. Your privacy rights and choices">
              <p style={styles.bodyText}>Depending on your location and applicable law, you may have rights to:</p>
              <BulletList items={[
                'Request access to personal information we hold about you.',
                'Request correction of inaccurate or incomplete information.',
                'Request deletion of personal information, subject to legal exceptions.',
                'Object to or request restriction of certain processing.',
                'Withdraw consent where processing is based on consent.',
                'Receive certain information in a portable format.',
                'Opt out of direct marketing and manage cookie preferences.',
                'Complain to a privacy or data protection regulator.',
              ]} />
              <p style={styles.bodyText}>To exercise a right, email <a href="mailto:support@puremotion.co" style={styles.inlineLink}>support@puremotion.co</a>. We may request information reasonably necessary to verify your identity and protect your information.</p>

              <SubSection title="14.1 Australia">
                <p style={styles.bodyText}>Australian individuals may request access to and correction of personal information under applicable Australian privacy law. You may also make a privacy complaint using the process below.</p>
              </SubSection>

              <SubSection title="14.2 EEA and United Kingdom">
                <p style={styles.bodyText}>Where the EU GDPR or UK GDPR applies, you may have rights of access, rectification, erasure, restriction, objection, portability and withdrawal of consent. You may lodge a complaint with your local supervisory authority or, in the United Kingdom, the Information Commissioner's Office.</p>
              </SubSection>

              <SubSection title="14.3 United States">
                <p style={styles.bodyText}>Depending on your state of residence and whether the relevant law applies to PureMotion, you may have rights to confirm whether we process your personal information, access or obtain a copy of it, correct inaccuracies, request deletion, and opt out of targeted advertising, the sale of personal information or certain forms of sharing.</p>
                <p style={styles.bodyText}>We do not sell personal information for monetary compensation. You may submit an opt-out request through available cookie controls or by emailing <a href="mailto:support@puremotion.co" style={styles.inlineLink}>support@puremotion.co</a>.</p>
              </SubSection>
            </Section>

            <Section id="sec-15" title="15. Privacy complaints">
              <p style={styles.bodyText}>If you believe we have mishandled your personal information, please email <a href="mailto:support@puremotion.co" style={styles.inlineLink}>support@puremotion.co</a> with sufficient details for us to understand and investigate the issue.</p>
              <p style={styles.bodyText}>If you are not satisfied with our response, you may be entitled to contact:</p>
              <BulletList items={[
                'Australia: the Office of the Australian Information Commissioner (OAIC).',
                'United Kingdom: the Information Commissioner\'s Office (ICO).',
                'European Economic Area: the data protection supervisory authority in your country.',
                'Another competent privacy or consumer regulator in your jurisdiction.',
              ]} />
            </Section>

            <Section id="sec-16" title="16. Data breaches">
              <p style={styles.bodyText}>We maintain procedures for responding to suspected data breaches. If a breach is likely to result in serious harm or otherwise triggers a notification requirement, we will notify affected individuals and the relevant regulator as required by applicable law, including the Australian Notifiable Data Breaches scheme where it applies.</p>
            </Section>

            <Section id="sec-17" title="17. Changes to this policy">
              <p style={styles.bodyText}>We may update this Privacy Policy to reflect changes to the Services, technology, providers, business practices or legal requirements. The updated version will be published on the PureMotion website with a revised "Last updated" date.</p>
              <p style={styles.bodyText}>Your continued use of the Services after an updated policy takes effect indicates that you have received the updated notice.</p>
            </Section>

            {/* Footer contact */}
            <div style={styles.footerContact}>
              <p style={styles.footerContactTitle}>Contact PureMotion</p>
              <a href="mailto:support@puremotion.co" style={styles.contactLink}>support@puremotion.co</a>
              <a href="https://puremotion.co" style={styles.contactLink} target="_blank" rel="noopener noreferrer">https://puremotion.co</a>
            </div>

          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

/* ── Sub-components ── */
const Section = ({ id, title, children }) => (
  <section id={id} style={styles.section}>
    {title && <h2 style={styles.sectionTitle}>{title}</h2>}
    {children}
  </section>
);

const SubSection = ({ title, children }) => (
  <div style={styles.subSection}>
    <h3 style={styles.subSectionTitle}>{title}</h3>
    {children}
  </div>
);

const BulletList = ({ items }) => (
  <ul style={styles.bulletList}>
    {items.map((item, i) => (
      <li key={i} style={styles.bulletItem}>
        <span style={styles.bullet} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

/* ── Styles ── */
const BRAND = '#634910';
const BRAND_LIGHT = 'rgba(99,73,16,0.10)';
const BRAND_MID = 'rgba(99,73,16,0.20)';

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f5f4f2',
    color: '#1a1a1a',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  hero: {
    background: `linear-gradient(135deg, #3d2b09 0%, #634910 50%, #4a3410 100%)`,
    borderBottom: `1px solid ${BRAND_MID}`,
    padding: '64px 24px 48px',
  },
  heroInner: { maxWidth: '1200px', margin: '0 auto' },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
    border: `1px solid rgba(255,255,255,0.35)`,
    borderRadius: '20px',
    padding: '4px 14px',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '800',
    color: '#ffffff',
    margin: '0 0 12px',
    letterSpacing: '-0.02em',
  },
  heroSub: { fontSize: '14px', color: 'rgba(255,255,255,0.65)', margin: 0 },
  layout: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px 80px',
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: '260px',
    flexShrink: 0,
    position: 'sticky',
    top: '100px',
    maxHeight: 'calc(100vh - 120px)',
    overflowY: 'auto',
  },
  sidebarCard: {
    background: '#ffffff',
    border: '1px solid #e4ddd4',
    borderRadius: '16px',
    padding: '24px 20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  sidebarLabel: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#8a7060',
    marginBottom: '16px',
  },
  nav: { display: 'flex', flexDirection: 'column', gap: '2px' },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
    fontSize: '13px',
    padding: '8px 10px',
    borderRadius: '8px',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    lineHeight: '1.4',
  },
  navItemActive: {
    background: BRAND_LIGHT,
    color: BRAND,
    fontWeight: '600',
  },
  navDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: BRAND,
    flexShrink: 0,
  },
  main: { flex: 1, minWidth: 0 },
  section: { marginBottom: '48px', scrollMarginTop: '100px' },
  sectionTitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
    fontWeight: '700',
    color: '#0f0f0f',
    margin: '0 0 20px',
    paddingBottom: '14px',
    borderBottom: `1px solid #e4ddd4`,
    letterSpacing: '-0.01em',
  },
  subSection: { marginTop: '20px', marginBottom: '8px' },
  subSectionTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#111',
    marginBottom: '10px',
  },
  bodyText: {
    fontSize: '14.5px',
    lineHeight: '1.8',
    color: '#1a1a1a',
    marginBottom: '14px',
    textAlign: 'justify',
  },
  italic: {
    fontSize: '13.5px',
    lineHeight: '1.7',
    color: '#555',
    fontStyle: 'italic',
    marginBottom: '14px',
    textAlign: 'justify',
  },
  glanceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '12px',
    marginBottom: '20px',
  },
  glanceItem: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    background: '#ffffff',
    border: `1px solid #e4ddd4`,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    borderRadius: '10px',
    padding: '14px 16px',
  },
  glanceIcon: {
    color: BRAND,
    fontWeight: '700',
    fontSize: '14px',
    flexShrink: 0,
  },
  glanceText: { fontSize: '13.5px', color: '#222', lineHeight: '1.6' },
  bulletList: {
    listStyle: 'none',
    margin: '8px 0 16px',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  bulletItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#1a1a1a',
  },
  bullet: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: BRAND,
    flexShrink: 0,
    marginTop: '8px',
  },
  infoBox: {
    display: 'flex',
    gap: '12px',
    background: 'rgba(99,73,16,0.07)',
    border: `1px solid rgba(99,73,16,0.18)`,
    borderRadius: '10px',
    padding: '14px 16px',
    fontSize: '13.5px',
    color: '#5a3e10',
    lineHeight: '1.6',
    marginTop: '12px',
    marginBottom: '8px',
  },
  infoIcon: { flexShrink: 0, color: BRAND },
  highlightBox: {
    display: 'flex',
    gap: '12px',
    background: 'rgba(99,73,16,0.06)',
    border: `1px solid rgba(99,73,16,0.18)`,
    borderLeft: `3px solid ${BRAND}`,
    borderRadius: '10px',
    padding: '14px 16px',
    fontSize: '14px',
    color: '#3d2a0a',
    lineHeight: '1.7',
    marginTop: '12px',
    fontWeight: '500',
  },
  highlightIcon: { flexShrink: 0 },
  warningBox: {
    display: 'flex',
    gap: '12px',
    background: 'rgba(180,120,0,0.06)',
    border: '1px solid rgba(180,120,0,0.25)',
    borderRadius: '10px',
    padding: '14px 16px',
    fontSize: '13.5px',
    color: '#7a5800',
    lineHeight: '1.6',
    marginTop: '12px',
  },
  warningIcon: { flexShrink: 0 },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '12px',
    border: '1px solid #e4ddd4',
    marginBottom: '16px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHead: { background: '#f9f6f2' },
  th: {
    padding: '14px 16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '700',
    color: '#a09080',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    borderBottom: '1px solid #e4ddd4',
  },
  tdBold: {
    padding: '14px 16px',
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#0f0f0f',
    verticalAlign: 'top',
    borderRight: '1px solid #e4ddd4',
    minWidth: '200px',
  },
  td: {
    padding: '14px 16px',
    fontSize: '13.5px',
    color: '#222',
    lineHeight: '1.6',
    verticalAlign: 'top',
  },
  trEven: { background: '#ffffff' },
  trOdd: { background: '#faf8f5' },
  contactCard: {
    background: '#ffffff',
    border: `1px solid #e4ddd4`,
    borderRadius: '12px',
    padding: '18px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
  },
  contactName: { color: '#0f0f0f', fontWeight: '700', fontSize: '15px', margin: 0 },
  contactLink: { color: BRAND, textDecoration: 'none', fontSize: '14px', fontWeight: '600' },
  inlineLink: { color: BRAND, textDecoration: 'none', fontWeight: '600' },
  footerContact: {
    borderTop: '1px solid #e4ddd4',
    marginTop: '48px',
    paddingTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  footerContactTitle: { color: '#0f0f0f', fontWeight: '700', fontSize: '16px', margin: 0 },
};

export default PureMotionPrivacyPolicy;