import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

const PureMotionTermsOfService = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const tableOfContents = [
    { id: 'intro', title: 'Introduction' },
    { id: 'sec-1', title: '1. About PureMotion and these Terms' },
    { id: 'sec-2', title: '2. Accounts and access' },
    { id: 'sec-3', title: '3. Plans, credits and delivery' },
    { id: 'sec-4', title: '4. Subscriptions and automatic renewal' },
    { id: 'sec-5', title: '5. Pricing, payments and taxes' },
    { id: 'sec-6', title: '6. Cancellation and refunds' },
    { id: 'sec-7', title: '7. Uploaded content' },
    { id: 'sec-8', title: '8. Generated Content and ownership' },
    { id: 'sec-9', title: '9. Acceptable use' },
    { id: 'sec-10', title: '10. AI-specific risks' },
    { id: 'sec-11', title: '11. Third-party services' },
    { id: 'sec-12', title: '12. Intellectual property' },
    { id: 'sec-13', title: '13. Suspension and termination' },
    { id: 'sec-14', title: '14. Availability and force majeure' },
    { id: 'sec-15', title: '15. Consumer guarantees and liability' },
    { id: 'sec-16', title: '16. Indemnity' },
    { id: 'sec-17', title: '17. Governing law and disputes' },
    { id: 'sec-18', title: '18. Changes to these Terms' },
    { id: 'sec-19', title: '19. General provisions' },
    { id: 'sec-20', title: '20. Contact details' },
  ];

  useEffect(() => {
    const observers = [];
    const sectionEls = tableOfContents.map(({ id }) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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
            <h1 style={styles.heroTitle}>Terms of Service</h1>
            <p style={styles.heroSub}>AKIAURA PTY LTD · Trading as PureMotion · Last updated 2025</p>
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
            <Section id="intro">
              <p style={styles.introText}>
                These Terms of Service (the <strong>"Terms"</strong>) form a <strong>legally binding agreement</strong> between AKIAURA PTY LTD,
                trading through the PureMotion brand (<strong>"PureMotion"</strong>, "Company", "we", "us" or "our"), and the person
                who accesses or uses the Services (<strong>"you"</strong> or "Client"). By creating an account, selecting a plan,
                making a purchase, uploading content, or otherwise using the Services, <strong>you agree to these Terms and
                  our Privacy Policy.</strong>
              </p>
            </Section>

            <Section id="sec-1" title="1. About PureMotion and these Terms">
              <Clause n="1.1">PureMotion provides <strong>artificial-intelligence-powered tools</strong> that transform eligible static photographs and images into short generated videos and may provide related editing, storage, preview, download and account features (the <strong>"Services"</strong>). The Services are provided through <em>https://puremotion.co/</em> and any related websites, dashboards, web applications or interfaces operated by the Company (together, the <strong>"System"</strong>).</Clause>
              <Clause n="1.2">The Services are offered only to individuals who are <strong>at least 18 years old</strong> and legally capable of entering into a contract. By using the Services, you represent that you meet these requirements.</Clause>
              <Clause n="1.3">The specific features, plans, usage allowances, credits, billing periods, introductory offers and prices available to you are those displayed in the System and at checkout at the time of purchase.</Clause>
              <Clause n="1.4">If there is a conflict between these Terms and a specific written offer shown at checkout, the checkout disclosure will control only for the price, billing frequency, introductory period, included usage and renewal terms of that offer. These Terms control in all other respects.</Clause>
              <Clause n="1.5">Nothing in these Terms excludes, restricts or modifies any <strong>consumer guarantee, statutory right or remedy</strong> that cannot lawfully be excluded, including rights under the <em>Australian Consumer Law</em> and any mandatory consumer law applicable in your place of residence.</Clause>
            </Section>

            <Section id="sec-2" title="2. Accounts and access">
              <Clause n="2.1">You may need to provide an email address, name, password, payment information or other information requested by the System. You must provide accurate, current and complete information and keep your account details secure.</Clause>
              <Clause n="2.2">You are responsible for activity occurring through your account and must not share login credentials or allow unauthorised access. Contact us promptly if you suspect unauthorised use.</Clause>
              <Clause n="2.3">Accounts and plans are for personal use unless the System or a separate written agreement expressly permits business or commercial use.</Clause>
              <Clause n="2.4">We may use reasonable verification and anti-abuse measures, including CAPTCHA, email verification, payment verification and fraud screening.</Clause>
            </Section>

            <Section id="sec-3" title="3. Plans, credits and delivery of digital services">
              <Clause n="3.1">PureMotion may offer subscriptions, introductory offers, trials, one-time purchases, credit packs or other digital products. Each offer is governed by the information <strong>prominently displayed before you confirm payment.</strong></Clause>
              <Clause n="3.2">Credits or usage allowances represent a limited right to request eligible generations or use specified features. They are <strong>not currency, have no cash value, are not transferable and cannot be resold.</strong></Clause>
              <Clause n="3.3">The number of credits charged, whether a preview or generation uses a credit, whether credits roll over or expire, and any plan limits will be described in the System. Where no rollover is expressly stated, <em>you should not assume unused credits carry into a later billing period.</em></Clause>
              <Clause n="3.4">Access to paid digital Services generally begins after successful payment and account activation. Delivery may be delayed where payment, verification, moderation or technical processing is pending.</Clause>
              <Clause n="3.5">We may restore a credit or provide another reasonable remedy where a generation fails because of a <strong>verified technical fault on our side.</strong> A result that is aesthetically different from what you expected is <em>not, by itself, a technical failure.</em></Clause>
            </Section>

            <Section id="sec-4" title="4. Subscriptions, introductory offers and automatic renewal">
              <Clause n="4.1">Some plans renew automatically. Before purchase, the System will display the introductory price (if any), introductory period, recurring price, billing frequency, included usage and how to cancel.</Clause>
              <Clause n="4.2">By selecting an automatically renewing plan, you authorise the Company and its payment processor to charge the payment method you provide:</Clause>
              <BulletList items={[
                'for the initial or introductory amount shown at checkout;',
                'for the recurring amount shown at checkout when the introductory period ends; and',
                'for each subsequent billing period until you cancel.',
              ]} />
              <Clause n="4.3">Unless the checkout states otherwise, a reduced-price introductory offer <strong>automatically converts to the regular subscription</strong> displayed at checkout when the introductory period ends.</Clause>
              <Clause n="4.4"><strong>You must cancel before the next charge is processed</strong> to avoid the next billing charge. Cancellation stops future renewals but does not normally create a refund for a billing period that has already started, subject to applicable law and Section 6.</Clause>
              <Clause n="4.5">We may send transactional emails concerning purchases, renewals, failed payments, plan changes or cancellation. Where required by applicable law, we will provide additional renewal or reminder notices.</Clause>
              <Clause n="4.6">Deleting the web application, ceasing use, deleting emails, unsubscribing from marketing, removing a saved payment method or failing to log in <strong><em>does not by itself cancel a subscription.</em></strong></Clause>
            </Section>

            <Section id="sec-5" title="5. Pricing, payments and taxes">
              <Clause n="5.1">Prices may be displayed in AUD, USD or another currency depending on your location or offer. The currency and total payable will be displayed before purchase.</Clause>
              <Clause n="5.2">Payments are processed by third-party payment providers, including Stripe and supported wallet providers such as Apple Pay, Google Pay or Link where available. We do not store full payment card numbers on our own systems.</Clause>
              <Clause n="5.3">You represent that you are authorised to use the payment method submitted and authorise applicable charges, taxes and fees disclosed at checkout.</Clause>
              <Clause n="5.4">If a payment fails, we or our payment processor may retry the charge to the extent permitted by law. We may suspend paid access until payment is completed.</Clause>
              <Clause n="5.5">We may change prices or plan structures. Changes do not affect a completed paid period. For an existing subscription, any new recurring price will apply only after notice required by law and will take effect from a future renewal date.</Clause>
            </Section>

            <Section id="sec-6" title="6. Cancellation and refunds">
              <Clause n="6.1">You may cancel through the subscription or billing controls in your account, where available, or by contacting <a href="mailto:support@puremotion.co" style={styles.contactLink}>support@puremotion.co</a>. We will process support-assisted cancellation requests within a reasonable time. <strong>To avoid the next charge, submit the request sufficiently before the renewal date.</strong></Clause>
              <Clause n="6.2">After cancellation, you will generally retain access until the end of the paid period unless we state otherwise or the account is terminated for serious misuse.</Clause>
              <Clause n="6.3">Except where required by law, fees are <strong>generally non-refundable</strong> once the relevant digital Services have been supplied, made available or materially used.</Clause>
              <Clause n="6.4">Refunds or other remedies may be available where:</Clause>
              <BulletList items={[
                'required by applicable consumer law;',
                'you were charged more than once for the same transaction due to a verified billing error;',
                'the paid Services were materially unavailable because of a verified fault on our side and we did not provide a reasonable remedy; or',
                'we approve an exceptional refund as a goodwill decision.',
              ]} />
              <Clause n="6.5">Refunds are <strong>generally not provided</strong> solely because you <em>forgot to cancel</em>, did not use the Services, <em>misunderstood</em> clearly disclosed renewal terms, changed your mind after using the Services, or disliked an AI-generated result that was successfully produced.</Clause>
              <Clause n="6.6">Where the law grants a cooling-off or withdrawal right for digital content or services, you may be asked to expressly request immediate performance.</Clause>
              <Clause n="6.7">Submit billing or refund requests to <a href="mailto:support@puremotion.co" style={styles.contactLink}>support@puremotion.co</a> with the account email, transaction date and relevant details.</Clause>
              <Clause n="6.8">Before initiating a chargeback, we encourage you to contact us so we can investigate.</Clause>
            </Section>

            <Section id="sec-7" title="7. Uploaded content and your responsibilities">
              <Clause n="7.1">"User Content" means photographs, images, prompts, text and other material you upload or submit. You retain any ownership rights you have in your User Content.</Clause>
              <Clause n="7.2">You grant the Company a worldwide, non-exclusive, royalty-free licence, including the right to allow our contracted service providers to act on our behalf, to host, copy, transmit, process, adapt and technically modify User Content only as reasonably necessary to operate, secure, troubleshoot and provide the Services and generate requested outputs.</Clause>
              <Clause n="7.3">You represent and warrant that:</Clause>
              <BulletList items={[
                'you own the User Content or have all permissions and rights needed to upload and process it;',
                'your use will not infringe another person\'s copyright, privacy, publicity, personality or other rights;',
                'you have permission from identifiable people shown in the User Content where permission is legally required;',
                'the User Content does not violate these Terms or applicable law; and',
                'you will not misrepresent AI-generated content as authentic evidence of a real event.',
              ]} />
              <Clause n="7.4">You are responsible for keeping your own copies of important photographs and downloaded outputs. PureMotion is not a permanent archival or backup service.</Clause>
            </Section>

            <Section id="sec-8" title="8. Generated Content and ownership">
              <Clause n="8.1">"Generated Content" means videos, images or other outputs produced through the Services from User Content or instructions.</Clause>
              <Clause n="8.2">Subject to your compliance with these Terms and payment of applicable fees, you may download and use Generated Content for personal, lawful purposes.</Clause>
              <Clause n="8.3">To the extent permitted by applicable law and subject to third-party rights and the underlying User Content, the Company does not claim ownership of the final Generated Content created specifically for you. However, we and our licensors retain all rights in the System, models, software, interfaces, workflows, templates, branding and underlying technology.</Clause>
              <Clause n="8.4">Because AI systems may produce similar or identical elements for different users, we do not guarantee that Generated Content will be unique or that exclusive intellectual-property rights will arise in it.</Clause>
            </Section>

            <Section id="sec-9" title="9. Acceptable use and prohibited content">
              <Clause n="9.1">You must use the Services lawfully and responsibly. <strong>You must not upload, generate, request, store or distribute content that:</strong></Clause>
              <BulletList items={[
                'is illegal, fraudulent, defamatory, threatening, harassing or unlawfully discriminatory;',
                'is sexually explicit, pornographic or exploitative;',
                'depicts, sexualises or otherwise involves a person under 18;',
                'promotes self-harm, serious violence, terrorism or illegal activity;',
                'infringes copyright, trademark, privacy, publicity or other rights;',
                'creates a deceptive deepfake or is intended to mislead, defraud or manipulate;',
                'contains malware, malicious code or material intended to compromise systems; or',
                'violates sanctions, export-control or other applicable laws.',
              ]} />
              <Clause n="9.2">You must not reverse engineer, scrape, probe, overload, bypass access controls, interfere with the System, automate access without permission, resell access, share accounts, circumvent plan limits or use the Services to develop a competing model or service.</Clause>
              <Clause n="9.3">We may use automated or human moderation to detect prohibited use.</Clause>
              <Clause n="9.4">We may preserve and disclose relevant information where reasonably necessary to comply with law, enforce these Terms, or investigate fraud or safety concerns.</Clause>
            </Section>

            <Section id="sec-10" title="10. AI-specific risks and disclaimers">
              <Clause n="10.1">The Services use automated and probabilistic artificial-intelligence systems. Generated Content may contain <em>inaccuracies, distortions, visual artefacts, unexpected motion, incorrect expressions</em> or other results that do not accurately represent reality or the original photograph.</Clause>
              <Clause n="10.2">PureMotion <strong>does not guarantee</strong> that every upload can be processed, that every generation will succeed, or that any output will meet your subjective expectations.</Clause>
              <Clause n="10.3">Generated Content is intended for <strong>personal and entertainment purposes only.</strong> <strong><em>Do not rely on it</em></strong> as factual evidence or for legal, medical, financial, safety-critical, identification or other professional decisions.</Clause>
              <Clause n="10.4"><em>Some outputs may be emotionally unexpected or upsetting,</em> particularly where they depict deceased loved ones or significant memories.</Clause>
              <Clause n="10.5">Beta or experimental features may be changed, suspended or discontinued at any time and may contain additional errors or limitations.</Clause>
            </Section>

            <Section id="sec-11" title="11. Third-party services">
              <Clause n="11.1">We may use third-party providers for AI processing, cloud hosting, storage, payments, analytics, email, customer support, security and other functions. Their services may be subject to separate terms and privacy policies.</Clause>
              <Clause n="11.2">We are responsible for our own obligations but are not responsible for independent third-party websites, services or outages outside our reasonable control. Links do not imply endorsement.</Clause>
            </Section>

            <Section id="sec-12" title="12. Intellectual property in the System">
              <Clause n="12.1">The Company and its licensors own the System and all associated software, design, text, graphics, trademarks, logos, workflows and materials, excluding User Content and rights granted to you in Generated Content.</Clause>
              <Clause n="12.2">We grant you a limited, non-exclusive, non-transferable, revocable right to access and use the System during the period you are entitled to use the Services, solely in accordance with these Terms.</Clause>
              <Clause n="12.3">Feedback is voluntary. You grant us a perpetual, worldwide, royalty-free right to use suggestions and feedback without obligation to you, provided we do not publicly identify you without permission.</Clause>
            </Section>

            <Section id="sec-13" title="13. Suspension, termination and content removal">
              <Clause n="13.1">We may suspend or terminate access, reject content or restrict features where you materially breach these Terms, fail to pay, create legal or security risk, engage in fraud or abuse, or where required by law.</Clause>
              <Clause n="13.2">Where reasonably practicable, we will notify you and may allow an opportunity to remedy the issue.</Clause>
              <Clause n="13.3">You may terminate these Terms by cancelling any active subscription and ceasing use. Provisions that by their nature should survive termination remain effective.</Clause>
              <Clause n="13.4">We may delete inactive accounts and associated content after reasonable notice where practicable.</Clause>
            </Section>

            <Section id="sec-14" title="14. Availability, changes and force majeure">
              <Clause n="14.1">We aim to provide reliable Services but do not guarantee uninterrupted, error-free or permanent availability.</Clause>
              <Clause n="14.2">We may modify, replace or discontinue features. If a change materially reduces a paid Service during a current paid period, we will provide a reasonable remedy where required by law.</Clause>
              <Clause n="14.3">We are not responsible for delay or failure caused by events beyond our reasonable control, including natural disasters, war, civil disturbance, government action, labour disputes, pandemics, power or telecommunications failures, cyberattacks or failures of critical third-party infrastructure.</Clause>
            </Section>

            <Section id="sec-15" title="15. Consumer guarantees, warranties and liability">
              <Clause n="15.1">Nothing in these Terms excludes or limits any guarantee, warranty, condition, right or remedy that cannot lawfully be excluded or limited.</Clause>
              <Clause n="15.2">Subject to Section 15.1, the System and Services are provided on an "as available" basis. To the maximum extent permitted by law, we exclude implied warranties and do not warrant that the Services will be uninterrupted, error-free, secure, unique or suitable for every purpose.</Clause>
              <Clause n="15.3">To the maximum extent permitted by law, neither party is liable to the other for indirect, incidental, special or consequential loss, loss of profit, loss of opportunity, loss of goodwill or loss of data.</Clause>
              <Clause n="15.4">To the maximum extent permitted by law, our aggregate liability arising from the Services or these Terms is limited to the greater of AUD $100 or the total fees you paid to the Company during the 12 months before the event giving rise to the claim.</Clause>
              <Clause n="15.5">Where Australian Consumer Law permits us to limit a remedy for a failure to comply with a consumer guarantee, our liability may be limited, at our option, to resupplying the Services or paying the cost of having the Services supplied again.</Clause>
            </Section>

            <Section id="sec-16" title="16. Indemnity">
              <Clause n="16.1">To the extent permitted by law, you agree to indemnify the Company and its officers, employees and contractors against third-party claims, losses and reasonable costs arising from your unlawful User Content, your infringement of third-party rights, your misuse of Generated Content, or your material breach of these Terms. This indemnity does not apply to the extent the loss was caused by the Company's own unlawful conduct or breach.</Clause>
            </Section>

            <Section id="sec-17" title="17. Governing law and disputes">
              <Clause n="17.1">These Terms are governed by the laws of Queensland, Australia and the laws of Australia applicable in Queensland, without excluding any mandatory consumer protection law that applies to you.</Clause>
              <Clause n="17.2">Before starting formal proceedings, you agree to contact support@puremotion.co and give us a reasonable opportunity to investigate and resolve the dispute informally.</Clause>
              <Clause n="17.3">Subject to any mandatory right to bring a claim elsewhere, the courts and tribunals of Queensland, Australia have non-exclusive jurisdiction.</Clause>
              <Clause n="17.4">To the maximum extent permitted by law, claims must be brought individually and not as part of a class or representative proceeding.</Clause>
            </Section>

            <Section id="sec-18" title="18. Changes to these Terms">
              <Clause n="18.1">We may update these Terms to reflect changes to the Services, law, security or business operations. The updated version will be posted in the System with a revised "Last updated" date.</Clause>
              <Clause n="18.2">Where a change materially affects an existing subscription or your rights, we will provide any advance notice required by law. Continued use after the effective date of an update constitutes acceptance.</Clause>
            </Section>

            <Section id="sec-19" title="19. General provisions">
              <Clause n="19.1">These Terms, the Privacy Policy and any additional terms expressly presented and accepted at checkout form the entire agreement concerning the Services.</Clause>
              <Clause n="19.2">If any provision is invalid or unenforceable, it will be limited or severed to the minimum extent necessary and the remaining provisions will continue.</Clause>
              <Clause n="19.3">A failure to enforce a provision is not a waiver. You may not assign these Terms without our written consent.</Clause>
              <Clause n="19.4">The English version controls where translations differ, to the extent permitted by law.</Clause>
            </Section>

            <Section id="sec-20" title="20. Contact details">
              <div style={styles.contactCard}>
                <p style={styles.contactName}>AKIAURA PTY LTD</p>
                <p style={styles.contactDetail}>ABN 17 693 315 703</p>
                <a href="mailto:support@puremotion.co" style={styles.contactLink}>support@puremotion.co</a>
                <a href="https://puremotion.co/" style={styles.contactLink} target="_blank" rel="noopener noreferrer">https://puremotion.co/</a>
              </div>
            </Section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

/* ── Shared sub-components ── */
const Section = ({ id, title, children }) => (
  <section id={id} style={styles.section}>
    {title && <h2 style={styles.sectionTitle}>{title}</h2>}
    {children}
  </section>
);

const Clause = ({ n, children }) => (
  <p style={styles.clause}>
    <span style={styles.clauseNum}>{n}</span>
    <span>{children}</span>
  </p>
);

const BulletList = ({ items }) => (
  <ul style={styles.bulletList}>
    {items.map((item, i) => (
      <li key={i} style={styles.bulletItem}>
        <span style={styles.bullet} />
        {item}
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
  heroInner: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
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
  heroSub: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.65)',
    margin: 0,
  },
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
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
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
  main: {
    flex: 1,
    minWidth: 0,
  },
  section: {
    marginBottom: '48px',
    scrollMarginTop: '100px',
  },
  sectionTitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
    fontWeight: '700',
    color: '#0f0f0f',
    margin: '0 0 20px',
    paddingBottom: '14px',
    borderBottom: `1px solid #e4ddd4`,
    letterSpacing: '-0.01em',
  },
  introText: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#222',
    background: '#ffffff',
    border: `1px solid #e4ddd4`,
    borderLeft: `3px solid ${BRAND}`,
    borderRadius: '12px',
    padding: '20px 24px',
    margin: 0,
    textAlign: 'justify',
    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
  },
  clause: {
    fontSize: '14.5px',
    lineHeight: '1.8',
    color: '#1a1a1a',
    marginBottom: '14px',
    display: 'flex',
    gap: '12px',
    textAlign: 'justify',
  },
  clauseNum: {
    color: BRAND,
    fontWeight: '700',
    fontSize: '13px',
    flexShrink: 0,
    paddingTop: '2px',
  },
  bulletList: {
    listStyle: 'none',
    margin: '8px 0 16px',
    padding: '0 0 0 24px',
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
    color: '#222',
  },
  bullet: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: BRAND,
    flexShrink: 0,
    marginTop: '8px',
  },
  contactCard: {
    background: '#ffffff',
    border: `1px solid #e4ddd4`,
    borderRadius: '16px',
    padding: '24px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
  },
  contactName: {
    color: '#0f0f0f',
    fontWeight: '700',
    fontSize: '16px',
    margin: 0,
  },
  contactDetail: {
    color: '#555',
    fontSize: '14px',
    margin: 0,
  },
  contactLink: {
    color: BRAND,
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
    fontWeight: '600',
  },
};

export default PureMotionTermsOfService;