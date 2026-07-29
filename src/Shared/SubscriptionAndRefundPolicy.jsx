import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const PureMotionSubscriptionRefundPolicy = () => {
    const [activeSection, setActiveSection] = useState('intro');

    const tableOfContents = [
        { id: 'intro', title: 'Important Information' },
        { id: 'sec-1', title: '1. Company and application' },
        { id: 'sec-2', title: '2. Plans, introductory offers and pricing' },
        { id: 'sec-3', title: '3. Automatic renewal and billing' },
        { id: 'sec-4', title: '4. Credits, uses and digital access' },
        { id: 'sec-5', title: '5. Cancellation' },
        { id: 'sec-6', title: '6. Refund policy' },
        { id: 'sec-7', title: '7. Refund requests and disputes' },
        { id: 'sec-8', title: '8. Payment providers and taxes' },
        { id: 'sec-9', title: '9. Changes to this Policy' },
        { id: 'sec-10', title: '10. Contact' },
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
                        <h1 style={styles.heroTitle}>Subscription &amp; Refund Policy</h1>
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

                        {/* Introduction */}
                        <section id="intro" style={styles.section}>
                            <div style={styles.importantBanner}>
                                <div style={styles.importantIcon}>!</div>
                                <div>
                                    <p style={styles.importantTitle}>Important</p>
                                    <p style={styles.importantText}>
                                        Your exact <strong>introductory price</strong>, <strong>renewal price</strong>, <strong>billing frequency</strong>, included credits or uses, and <strong>renewal date</strong> are displayed before purchase and confirmed at checkout. <strong><em>Please review those details carefully before completing payment.</em></strong>
                                    </p>
                                </div>
                            </div>
                            <p style={styles.bodyText}>
                                This Subscription &amp; Refund Policy explains how subscriptions, introductory offers, recurring billing, credits, cancellations and refunds work for PureMotion. It forms part of the PureMotion <em>Terms of Service.</em> Our preferred approach is to resolve service issues quickly through reprocessing, replacement credits, account credits or extended access <strong>before considering a cash refund,</strong> except where applicable law gives you a right to a refund or another remedy.
                            </p>
                        </section>

                        <Section id="sec-1" title="1. Company and application">
                            <Clause n="1.1">PureMotion is operated by AKIAURA PTY LTD (ABN 17 693 315 703), with its registered office in Australia ("PureMotion", "Company", "we", "us" or "our").</Clause>
                            <Clause n="1.2">This Policy applies to purchases made through the PureMotion website, web application and any other checkout or digital platform operated by us.</Clause>
                            <Clause n="1.3">Capitalised terms not defined here have the meaning given in the PureMotion Terms of Service.</Clause>
                            <Clause n="1.4">By purchasing a subscription, introductory offer, credit pack or other paid Service, you agree to this Policy, the Terms of Service and the Privacy Policy.</Clause>
                        </Section>

                        <Section id="sec-2" title="2. Plans, introductory offers and pricing">
                            <Clause n="2.1">PureMotion may offer recurring subscriptions, introductory or promotional access periods, one-time credit packs and other digital products. Available plans, prices and inclusions may change over time.</Clause>
                            <Clause n="2.2">Before purchase, the checkout will show the material terms of your selected offer, including where applicable:</Clause>
                            <BulletList items={[
                                'the amount charged today;',
                                'the length of any introductory or discounted period;',
                                'the regular renewal price after the introductory period;',
                                'the renewal frequency;',
                                'the number of credits, uses or generations included;',
                                'whether unused credits expire or carry over; and',
                                'how to cancel.',
                            ]} />
                            <Clause n="2.3">An introductory offer is <strong>not a free trial</strong> unless it is expressly described as one. If the checkout states that an introductory offer converts into a recurring paid subscription, the subscription will <strong>renew automatically</strong> unless cancelled before the renewal charge is processed.</Clause>
                            <Clause n="2.4">By completing the purchase, you authorise PureMotion and its payment provider to charge the displayed introductory amount and each recurring renewal amount, together with applicable taxes, <strong>until cancellation.</strong></Clause>
                            <Clause n="2.5">Promotional pricing applies <em>only for the period stated at checkout.</em> After that period, the subscription renews at the regular price shown before purchase, unless cancelled.</Clause>
                            <Clause n="2.6">Prices are displayed in the currency shown at checkout. Your bank or payment provider may apply conversion fees, foreign transaction fees or other charges <em>outside PureMotion's control.</em></Clause>
                        </Section>

                        <Section id="sec-3" title="3. Automatic renewal and recurring billing">
                            <Clause n="3.1">Unless the checkout states otherwise, subscriptions automatically renew at the end of each billing period until cancelled.</Clause>
                            <Clause n="3.2">Renewal charges are normally processed on or around the renewal date shown in your account or purchase confirmation.</Clause>
                            <Clause n="3.3">If a payment fails, PureMotion or its payment provider may retry the charge using the payment method on file. Access to paid features may be restricted or suspended while payment remains outstanding.</Clause>
                            <Clause n="3.4">We may update subscription prices. Where required by law, we will provide reasonable advance notice before a new price applies to an existing subscription.</Clause>
                            <div style={styles.warningBox}>
                                <span style={styles.warningIcon}>⚠</span>
                                <span><strong style={{ color: '#e8a800' }}>3.5</strong> — Deleting the web application, not using the Service, unsubscribing from marketing emails, deleting an account request, or removing a saved payment method does <strong>not</strong> automatically cancel an active subscription.</span>
                            </div>
                        </Section>

                        <Section id="sec-4" title="4. Credits, uses and digital access">
                            <Clause n="4.1">Some plans include a set number of credits, uses, previews or generations for each billing period. The applicable allowance is shown at checkout and may vary by plan.</Clause>
                            <Clause n="4.2">Unless expressly stated otherwise, subscription credits:</Clause>
                            <BulletList items={[
                                'are available only while the relevant subscription is active;',
                                'have no cash value and cannot be transferred, sold or exchanged;',
                                'may expire at the end of the applicable billing period;',
                                'do not automatically carry over into a new billing period; and',
                                'may be forfeited if an account is terminated for breach of the Terms of Service.',
                            ]} />
                            <Clause n="4.3">One-time credit packs are governed by the terms shown at purchase. Their expiry, if any, will be disclosed at checkout or in your account.</Clause>
                            <Clause n="4.4">A generation <strong>may consume a credit or use once processing begins,</strong> even if the output does not meet your personal expectations. Where a generation fails because of a <strong>verified technical fault on PureMotion's side</strong> and no usable output is delivered, our usual first remedy is to restore the affected credit, provide a replacement generation, add account credits, or extend access so you can try again <em>at no additional cost.</em></Clause>
                            <Clause n="4.5">AI-generated results are probabilistic and may contain distortions, artefacts, unexpected movement or other imperfections. <em>Dissatisfaction with the creative result alone does not automatically mean the Service failed or create a right to a refund.</em></Clause>
                        </Section>

                        <Section id="sec-5" title="5. Cancellation">
                            <Clause n="5.1">You may cancel an active subscription at any time using the cancellation option in your account, where available, or by contacting <a href="mailto:support@puremotion.co" style={styles.contactLink}>support@puremotion.co</a>.</Clause>
                            <Clause n="5.2"><strong>To avoid the next renewal charge, cancellation must be completed before the renewal payment is processed.</strong> We recommend cancelling <strong>at least 24 hours</strong> before the displayed renewal time.</Clause>
                            <Clause n="5.3">Unless required otherwise by law, cancellation takes effect at the end of the paid billing period. You may continue using the remaining paid access and available credits until that period ends.</Clause>
                            <Clause n="5.4">If you contact customer support for cancellation assistance, the subscription is <em>not treated as cancelled</em> until the request has been processed and cancellation is confirmed. We will not unreasonably delay a valid cancellation request.</Clause>
                            <Clause n="5.5">Cancelling stops future renewal charges but <strong>does not automatically refund charges already paid.</strong></Clause>
                        </Section>

                        <Section id="sec-6" title="6. Refund policy">
                            <Clause n="6.1">Nothing in this Policy excludes, restricts or modifies any consumer guarantee, statutory right or remedy that cannot lawfully be excluded, including rights under the Australian Consumer Law.</Clause>
                            <Clause n="6.2">Except where required by law or expressly provided below, subscription charges, introductory-offer charges, renewals and one-time digital purchases are non-refundable once access has been provided or the Service has begun. PureMotion does not offer refunds merely because a customer changes their mind, forgets to cancel, does not use the Service, or prefers a different creative result.</Clause>

                            <div style={styles.refundGrid}>
                                <div style={styles.refundCard}>
                                    <div style={styles.refundCardHeader}>
                                        <span style={styles.refundCardIcon}>↩</span>
                                        <span style={styles.refundCardTitle}>Resolution-first approach</span>
                                    </div>
                                    <p style={{ ...styles.bodyText, margin: 0, marginBottom: '10px' }}>When a customer reports a genuine service or generation issue, PureMotion will normally first attempt one or more of the following remedies:</p>
                                    <BulletList items={[
                                        'restore the affected generation credit or usage allowance;',
                                        'provide one or more replacement credits or a free re-generation;',
                                        'add bonus account credits as a goodwill resolution;',
                                        'extend the subscription or access period; or',
                                        're-perform or correct the affected Service within a reasonable time.',
                                    ]} />
                                </div>

                                <div style={styles.refundCard}>
                                    <div style={styles.refundCardHeader}>
                                        <span style={styles.refundCardIcon}>💵</span>
                                        <span style={styles.refundCardTitle}>When cash refunds apply</span>
                                    </div>
                                    <p style={{ ...styles.bodyText, margin: 0, marginBottom: '10px' }}>A cash refund will generally be considered only where:</p>
                                    <BulletList items={[
                                        'a duplicate or incorrect charge resulted from a verified billing error;',
                                        'a payment was taken after cancellation had already been validly completed;',
                                        'a material service failure cannot be corrected, re-performed or reasonably resolved through replacement credits;',
                                        'applicable law requires a refund or gives the customer the right to choose a refund; or',
                                        'PureMotion approves a full or partial refund as an exceptional goodwill measure.',
                                    ]} />
                                </div>
                            </div>

                            <div style={styles.noRefundBox}>
                                <p style={styles.noRefundTitle}>Refunds are generally <em>not</em> provided for:</p>
                                <BulletList items={[
                                    'forgetting to cancel before renewal;',
                                    'not using the Service during an active paid period;',
                                    'changing your mind after digital access has been provided;',
                                    'dissatisfaction with an AI-generated output where the Service operated as described;',
                                    'uploading an unsupported, prohibited or unsuitable image;',
                                    'failed generation caused by the user\'s device, internet connection, file format, input or third-party platform; or',
                                    'misunderstanding the offer where the introductory price, renewal price, billing frequency and cancellation terms were clearly displayed before purchase.',
                                ]} />
                            </div>

                            <Clause n="6.6">Any replacement credits, bonus credits, account credits, access extensions or refunds approved outside your mandatory legal rights are discretionary, apply only to that case and do not create a precedent or continuing entitlement. Credits have no cash value and cannot be transferred, sold, exchanged or redeemed for cash.</Clause>
                            <Clause n="6.7">Nothing in this Policy allows PureMotion to replace a refund or other remedy that a customer is legally entitled to choose with credits without the customer's agreement. Our services come with guarantees that cannot be excluded under the Australian Consumer Law.</Clause>
                        </Section>

                        <Section id="sec-7" title="7. Refund requests and billing disputes">
                            <Clause n="7.1">To report a service issue, request replacement credits or ask us to review a billing matter, contact support@puremotion.co as soon as reasonably possible and include:</Clause>
                            <BulletList items={[
                                'the email address used for the purchase;',
                                'the transaction date and amount;',
                                'the reason for the request; and',
                                'any relevant screenshots or supporting information.',
                            ]} />
                            <Clause n="7.2">Unless a longer period is required by law, requests should be submitted within 14 days of the relevant charge or generation issue. Delayed requests may be harder to investigate but will still be considered where required by law.</Clause>
                            <Clause n="7.3">Where we approve a service remedy, it may be provided as restored credits, bonus credits, account credits, a replacement generation, or extended access. Where a cash refund is required by law or otherwise approved, it will be returned to the original payment method where possible.</Clause>
                            <Clause n="7.4">Before initiating a chargeback or payment dispute, please contact us so we can investigate and offer an appropriate remedy. We may provide the payment provider with relevant records, including checkout disclosures, acceptance of terms, account activity, generation history and communications.</Clause>
                            <Clause n="7.5">Fraudulent chargebacks, misuse of refund processes or false claims may result in account suspension or termination, without limiting any rights available to PureMotion.</Clause>
                        </Section>

                        <Section id="sec-8" title="8. Payment providers and taxes">
                            <Clause n="8.1">Payments may be processed through third-party providers such as Stripe and supported payment methods such as Apple Pay, Google Pay or Link. Those providers may apply their own terms and privacy practices.</Clause>
                            <Clause n="8.2">PureMotion does not store complete payment-card details on its own systems.</Clause>
                            <Clause n="8.3">You are responsible for providing accurate billing information, using an authorised payment method and paying applicable taxes, duties or bank charges.</Clause>
                        </Section>

                        <Section id="sec-9" title="9. Changes to this Policy">
                            <Clause n="9.1">We may update this Policy from time to time. The updated version will be published through the System with a revised effective date.</Clause>
                            <Clause n="9.2">Where a change materially affects an existing subscription or is required by law, we will provide additional notice by email, account notice or another reasonable method.</Clause>
                            <Clause n="9.3">Changes do not remove rights already accrued under applicable law.</Clause>
                        </Section>

                        <Section id="sec-10" title="10. Contact">
                            <div style={styles.contactCard}>
                                <p style={styles.contactName}>AKIAURA PTY LTD, Australia</p>
                                <p style={styles.contactDetail}>ABN 17 693 315 703</p>
                                <a href="mailto:support@puremotion.co" style={styles.contactLink}>support@puremotion.co</a>
                                <a href="https://puremotion.co" style={styles.contactLink} target="_blank" rel="noopener noreferrer">https://puremotion.co</a>
                            </div>
                            <p style={styles.bodyText}>Questions about subscriptions, cancellations, credits, service remedies, refunds or billing should be sent to the email above.</p>
                        </Section>

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
        fontSize: 'clamp(1.6rem, 5vw, 3.5rem)',
        fontWeight: '800',
        color: '#ffffff',
        margin: '0 0 12px',
        letterSpacing: '-0.02em',
    },
    heroSub: { fontSize: '14px', color: 'rgba(255,255,255,0.65)', margin: 0 },
    sidebarCard: {
        background: '#ffffff',
        border: '1px solid #e4ddd4',
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
    bodyText: {
        fontSize: '14.5px',
        lineHeight: '1.8',
        color: '#1a1a1a',
        marginBottom: '14px',
        textAlign: 'justify',
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
    importantBanner: {
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        background: 'rgba(99,73,16,0.08)',
        border: `1px solid rgba(99,73,16,0.3)`,
        borderRadius: '14px',
        padding: '20px 24px',
        marginBottom: '20px',
    },
    importantIcon: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: BRAND,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '800',
        fontSize: '16px',
        flexShrink: 0,
    },
    importantTitle: {
        color: BRAND,
        fontWeight: '700',
        fontSize: '15px',
        margin: '0 0 6px',
    },
    importantText: {
        color: '#2e1f05',
        fontSize: '14px',
        lineHeight: '1.7',
        margin: 0,
        textAlign: 'justify',
    },
    warningBox: {
        display: 'flex',
        gap: '12px',
        background: 'rgba(180,120,0,0.06)',
        border: '1px solid rgba(180,120,0,0.25)',
        borderRadius: '10px',
        padding: '14px 16px',
        fontSize: '13.5px',
        color: '#5c4000',
        lineHeight: '1.6',
        marginTop: '8px',
        marginBottom: '14px',
    },
    warningIcon: { flexShrink: 0 },
    refundGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
        margin: '16px 0',
    },
    refundCard: {
        background: '#ffffff',
        border: `1px solid #e4ddd4`,
        borderRadius: '14px',
        padding: '20px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
    },
    refundCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '14px',
    },
    refundCardIcon: { fontSize: '20px' },
    refundCardTitle: {
        fontSize: '15px',
        fontWeight: '700',
        color: '#0f0f0f',
    },
    noRefundBox: {
        background: 'rgba(180,30,30,0.04)',
        border: '1px solid rgba(180,60,60,0.18)',
        borderRadius: '12px',
        padding: '18px 20px',
        margin: '16px 0',
    },
    noRefundTitle: {
        fontSize: '13.5px',
        fontWeight: '700',
        color: '#7a1f1f',
        marginBottom: '10px',
    },
    contactCard: {
        background: '#ffffff',
        border: `1px solid #e4ddd4`,
        borderRadius: '16px',
        padding: '24px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '16px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
    },
    contactName: { color: '#0f0f0f', fontWeight: '700', fontSize: '16px', margin: 0 },
    contactDetail: { color: '#444', fontSize: '14px', margin: 0 },
    contactLink: { color: BRAND, textDecoration: 'none', fontSize: '14px', fontWeight: '600' },
};

export default PureMotionSubscriptionRefundPolicy;