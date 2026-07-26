import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Check, Star, Lock, ShieldCheck, BadgeCheck, Sparkles, Clock, LayoutDashboard, ImageIcon, Sliders, Share2, Download } from "lucide-react";
import { getVideoImageFiles } from "../../Redux/VideoUpload";
import PaymentModal from "../Stripe/PaymentModal";
import Footer from "../../Shared/Footer";
import { Link } from "react-router-dom";
import useCurrencyConversion from "../../utils/currency";

import avatar1 from "../../../public/Margaret.jpg";
import avatar2 from "../../../public/Susan.jpg";
import avatar3 from "../../../public/David.jpg";
import avatar4 from "../../../public/Robert.jpg";

const faqs = [
    {
        question: "Will the person in my photo still look like themselves?",
        answer:
            "PureMotion is designed to keep the person recognisable while adding gentle movement and expression. Clear photos with visible faces usually produce the most natural-looking results.",
    },
    {
        question: "Will the movement look natural?",
        answer:
            "PureMotion creates gentle expressions and movements based on your original photo. Every photo is different, but a clear image and suitable movement style will generally produce the best result.",
    },
    {
        question: "Is PureMotion easy to use?",
        answer:
            "Yes. You don't need any technical experience. Simply upload your photo, choose a movement style and PureMotion will guide you through the rest.",
    },
    {
        question: "Can I use PureMotion on my iPhone?",
        answer:
            "Yes. PureMotion works through your phone's web browser, so there's no app to download. You can also use it on an iPad, tablet or computer.",
    },
    {
        question: "What kinds of photos work best?",
        answer:
            "Photos with clear, visible and unobstructed faces generally work best. You can use beloved pet photos, family portraits, wedding photos, childhood memories and older black-and-white photos.",
    },
    {
        question: "Are my family photos kept private?",
        answer:
            "Your photos are handled securely, remain private within your PureMotion account and aren't shared publicly by PureMotion.",
    },
    {
        question: "What if the first result doesn't feel quite right?",
        answer:
            "Different movement styles can produce different results. You can choose another available style and create a new version.",
    },
    {
        question: "Can I download, keep and share my videos?",
        answer:
            "Yes. Download your finished videos in HD without a PureMotion watermark. Keep them on your device, share them with family and friends, or view your stored creations in your PureMotion account.",
    },
];

const Accordion = ({ children, className }) => <div className={className}>{children}</div>;
const AccordionItem = ({ children, className }) => <details className={className + " group"}>{children}</details>;
const FaqTrigger = ({ children }) => (
    <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-semibold text-[#2B2118] text-[17px] sm:text-[19px] [&::-webkit-details-marker]:hidden outline-none">
        {children}
        <span className="transition-transform group-open:rotate-180 text-[#8B6A2B]">
            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
        </span>
    </summary>
);
const FaqContent = ({ children }) => (
    <div className="pb-4 text-[16px] leading-relaxed text-[#5C4A32] sm:text-[17px]">
        {children}
    </div>
);

const plans = [
    {
        id: "weekly_update",
        name: "Starter Package",
        price: "$1.99",
        oldPrice: null,
        badge: null,
        desc: "4 Memories every week",
        unit: "per memory",
        price_id: "price_1TYHxvF9gOu6UGqJWKdchdbY",
        credits: 4,
        period: "Week",
    },
    {
        id: "fortnightly_update",
        name: "Family Package",
        price: "$0.99",
        oldPrice: "$2.48",
        badge: "SPECIAL OFFER 60% OFF",
        desc: "15 Memories every 2 weeks",
        unit: "per memory",
        price_id: "price_1TYHzOF9gOu6UGqJ9A479qAG",
        credits: 15,
        period: "Fortnight",
    },
    {
        id: "monthly_update",
        name: "Premium Package",
        price: "$0.69",
        oldPrice: "$1.38",
        badge: "BEST VALUE",
        desc: "30 Memories every month",
        unit: "per memory",
        price_id: "price_1TYI0FF9gOu6UGqJpAN8lEvp",
        credits: 30,
        period: "Month",
    },
];

export default function UpdatedPricingWholePage() {
    const [selected, setSelected] = useState("fortnightly_update");
    const [showPayment, setShowPayment] = useState(false);
    const [previewImage, setPreviewImage] = useState("/grandfather.jpg");

    useEffect(() => {
        const files = getVideoImageFiles();
        if (files && files.image_one) {
            const objectUrl = URL.createObjectURL(files.image_one);
            setPreviewImage(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, []);

    const { convertPrice, code: currencyCode, loading: currencyLoading } = useCurrencyConversion();

    const selectedPlan = plans.find((p) => p.id === selected) || plans[1];
    const priceAmount = selectedPlan ? parseFloat(selectedPlan.price.replace("$", "")) : 0;
    const finalAmountUsd = selectedPlan ? priceAmount * selectedPlan.credits : 0;
    const finalAmountDisplay = convertPrice(finalAmountUsd);

    const openCheckout = () => setShowPayment(true);
    const scrollToPlans = () =>
        document.getElementById("plans")?.scrollIntoView({ behavior: "smooth", block: "start" });

    return (
        <div className="min-h-screen bg-[#fbf8f3] pb-4 sm:pb-0">
            {/* 1. Sticky urgency bar */}
            <CountdownBar />

            {/* 2. Header */}
            <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/70 backdrop-blur-md">
                <div className="mx-auto flex h-12 max-w-7xl items-center justify-center px-5 sm:h-14">
                    <Link to="/">
                        <img src="/logo.png" alt="PureMotion" className="h-6 w-auto sm:h-7" />
                    </Link>
                </div>
            </header>

            {/* 3. Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-warm-glow pointer-events-none" />
                <div className="relative mx-auto max-w-2xl px-5 pt-6 pb-4 text-center sm:pt-10 sm:pb-6">
                    <h1 className="mx-auto max-w-xl font-serif text-[1.75rem] leading-[1.1] text-balance sm:text-4xl text-gray-900">
                        Your Photo Is{" "}
                        <span className="italic text-[#8B6A2B]">Ready</span>
                    </h1>
                    <p className="mx-auto mt-3 max-w-lg text-[14px] text-gray-500 sm:text-lg">
                        You're one simple step away from turning this treasured photo into a living memory you can download, keep and share.
                    </p>
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={scrollToPlans}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] active:scale-[0.99] sm:text-base"
                        >
                            <Sparkles className="h-4 w-4" /> Bring My Memory To Life
                        </button>
                    </div>
                </div>
            </section>

            {/* 4. User memory preview */}
            <section className="mx-auto max-w-2xl px-5 pt-2 pb-6 sm:pt-4 sm:pb-8">
                <div className="mx-auto max-w-sm">
                    <div className="relative overflow-hidden rounded-[24px] border border-[#E8D9B8] bg-[#2B2118] shadow-[0_24px_50px_-24px_rgba(43,33,24,0.55)]">
                        <div className="relative aspect-[4/5]">
                            <img
                                src={previewImage}
                                alt="Your memory preview"
                                className="absolute inset-0 h-full w-full object-cover blur-[3px] brightness-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/40 backdrop-blur-md">
                                    <Lock className="h-6 w-6" />
                                </span>
                                <p className="mt-3 text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-white/90 whitespace-pre-line">
                                    UPLOAD COMPLETE{"\n"}Scroll down to bring your photo to life.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4a-2. What's Included */}
            <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2118]">
                        What's included?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-[13px] text-gray-500 sm:text-lg">
                        Everything you need to bring your most meaningful photos to life.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            icon: LayoutDashboard,
                            title: "Your PureMotion dashboard",
                            body: "Keep your uploaded photos and finished videos organised in one convenient place.",
                        },
                        {
                            icon: ImageIcon,
                            title: "Photo-to-video animation",
                            body: "Turn a single photo into a short, expressive video with natural movement.",
                        },
                        {
                            icon: Sliders,
                            title: "Multiple movement styles",
                            body: "Choose from available movements and expressions to suit your photo.",
                        },
                        {
                            icon: Share2,
                            title: "Download, keep and share",
                            body: "Save your videos to your device and share them with family and friends.",
                        },
                        {
                            icon: Download,
                            title: "HD, watermark-free downloads",
                            body: "Download high-quality videos without a PureMotion watermark.",
                        },
                        {
                            icon: LayoutDashboard,
                            title: "Free storage and account access",
                            body: "Access your stored photos and finished videos anytime in your PureMotion account at no extra cost.",
                        },
                    ].map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="flex h-full flex-col rounded-2xl border border-[#E7DBC4] bg-white p-5 shadow-[0_2px_10px_-4px_rgba(139,106,43,0.15)] sm:p-6"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D9C39A] bg-[#FBF6EB]">
                                        <Icon className="h-4 w-4 text-[#8B6A2B]" strokeWidth={1.8} />
                                    </span>
                                    <h3 className="font-serif text-base font-bold text-[#2B2118] sm:text-xl">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="mt-2.5 text-[12px] leading-relaxed text-[#5C4A32] sm:text-lg">
                                    {feature.body}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>


            {/* 4b. Social proof */}
            {/* <section className="mx-auto max-w-2xl px-5 pt-2 pb-4">
                <div className="mx-auto max-w-md text-center">
                    <h2 className="font-serif text-lg font-medium text-[#2B2118] sm:text-xl">
                        Trusted by families around the world
                    </h2>
                    <div className="mt-3 flex items-center justify-center gap-3">
                        <div className="flex -space-x-2">
                            {["/Elise D.jpg", "/Hannah P..jpg", "/Jonas K..jpg", "/Marco D..jpg"].map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt=""
                                    loading="lazy"
                                    className="h-8 w-8 rounded-full border-2 border-white object-cover ring-1 ring-[#E8D9B8]"
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="h-3.5 w-3.5 fill-[#C9A227] text-[#C9A227]" />
                                ))}
                            </div>
                            <p className="text-[12px] text-gray-500">
                                4.8/5 · Excellent
                            </p>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* 4c. Pricing intro */}
            <section className="mx-auto max-w-2xl px-5 pt-10 pb-4 text-center">
                <h2 className="font-serif text-[1.65rem] sm:text-3xl font-medium text-[#2B2118]">
                    Choose the package that feels right
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-[13px] text-[#5C4A32] sm:text-lg">
                    PureMotion will guide you through bringing your photo to life, even if you're not confident with technology.
                </p>
            </section>



            {/* 5. Pricing plans */}
            <section id="plans" className="mx-auto max-w-2xl scroll-mt-20 px-5 pt-2 pb-6 sm:pt-4">
                <div className="flex flex-col gap-4">
                    {plans.map((p) => {
                        const isSelected = selected === p.id;
                        const isFamily = p.id === "fortnightly_update";
                        return (
                            <div key={p.id} className={`relative ${isFamily ? "mt-1" : ""}`}>
                                {p.badge && (
                                    <span
                                        className={`absolute -top-2.5 right-5 z-10 whitespace-nowrap rounded-full font-semibold shadow-sm ${isFamily
                                            ? "bg-[#F2C94C] text-[#2B2118] px-3.5 py-1 text-[11px]"
                                            : "border border-green-200 bg-green-100 text-green-700 px-3 py-0.5 text-[10px]"
                                            }`}
                                    >
                                        {p.badge}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setSelected(p.id)}
                                    className={`flex w-full items-center justify-between gap-4 rounded-2xl border-2 text-left transition-all px-4 py-4 sm:px-6 sm:py-5 ${isSelected
                                        ? "border-[#8B6A2B] bg-[#FBF6EA] shadow-[0_18px_45px_-22px_rgba(139,106,43,0.45)]"
                                        : "border-gray-200 bg-white shadow-sm hover:border-[#8B6A2B]/40"
                                        }`}
                                >
                                    {/* Left: name + description */}
                                    <div className="flex min-w-0 items-start gap-3">
                                        <span
                                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected
                                                ? "border-[#8B6A2B] bg-[#8B6A2B] text-white"
                                                : "border-gray-300 bg-white"
                                                }`}
                                            aria-hidden
                                        >
                                            {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                                        </span>
                                        <div className="min-w-0">
                                            <h3 className="font-serif text-lg sm:text-xl text-gray-900">
                                                {p.name}
                                            </h3>
                                            <p className="mt-0.5 text-[11px] text-[#8B6A2B] sm:text-[12px]">
                                                {p.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: price hierarchy */}
                                    <div className="shrink-0 text-right">
                                        <div className="flex items-center gap-1.5 justify-end font-serif text-2xl leading-none text-gray-900 sm:text-3xl">
                                            {p.oldPrice && (
                                                <span className="text-[15px] text-gray-400 line-through sm:text-base">
                                                    {convertPrice(p.oldPrice)}
                                                </span>
                                            )}
                                            <span>{convertPrice(p.price)}</span>
                                        </div>
                                        <p className="mt-1 text-xs font-medium text-[#8B6A2B]">
                                            {p.unit}
                                        </p>
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Primary CTA */}
                <button
                    onClick={openCheckout}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-6 py-4 text-base font-bold text-white shadow-[0_18px_40px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] sm:text-lg"
                >
                    Unlock Your Memory
                </button>

                <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-gray-500">
                    <Check className="h-3 w-3 text-green-500" strokeWidth={3} /> Secure checkout <span>·</span> Cancel anytime <span>·</span> 30-day guarantee
                </p>
            </section>

            {/* 6. Trust / payment row */}
            <section className="mx-auto max-w-2xl px-5 pt-5">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {(["visa", "mastercard", "amex", "applepay", "googlepay"]).map((n) => (
                            <PaymentIcon key={n} name={n} />
                        ))}
                    </div>
                    <p className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
                        <Lock className="h-3 w-3" /> Payments securely processed by Stripe
                    </p>
                </div>
            </section>


            {/* add here */}
            <section className="bg-[#F8F5EF]">
                <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="font-serif text-3xl font-semibold text-[#2B2118] sm:text-4xl">
                            Why families choose PureMotion
                        </h2>
                        <p className="mx-auto mt-3 max-w-lg text-[16px] leading-relaxed text-[#5C4A32] sm:text-lg">
                            Discover the meaningful moments families
                            have created from treasured photos.
                        </p>
                    </div>

                    <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                        {[
                            {
                                name: "Margaret",
                                portrait: avatar1,
                                descriptor: "PureMotion user",
                                quote: "I made this for Mum's birthday using an old photo of her with her parents. When she saw them moving and smiling, she went very quiet and then started crying. She's watched it so many times since. It was such a special gift.",
                            },
                            {
                                name: "Susan",
                                portrait: avatar2,
                                descriptor: "PureMotion user",
                                quote: "I used our wedding photo from 1978. I wasn't sure what to expect, but seeing us both smile and move was incredible. My husband and I watched it over and over. It brought back so many memories.",
                            },
                            {
                                name: "David",
                                portrait: avatar3,
                                descriptor: "PureMotion user",
                                quote: "My wife lost her dad a couple of years ago, so I used one of her favourite photos of him. We watched it together with the grandkids and everyone got emotional. For a few seconds, it really felt like he was there with us again.",
                            },
                            {
                                name: "Robert",
                                portrait: avatar4,
                                descriptor: "PureMotion user",
                                quote: "I used one of my favourite photos of our golden retriever and couldn't believe how lifelike it looked. Seeing his face move and his familiar expression again was incredibly special. I've already shared the video with my whole family, and we'll treasure it for years.",
                            },
                        ].map((t) => (
                            <article
                                key={t.name}
                                className="flex h-full flex-col rounded-2xl border border-[#E7DBC4] bg-white p-6 shadow-[0_4px_16px_-8px_rgba(139,106,43,0.2)] sm:p-7"
                            >
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-[#C9A227] text-[#C9A227]" />
                                    ))}
                                </div>
                                <p className="mt-4 flex-1 text-[17px] leading-[1.65] text-[#2B2118] sm:text-[18px]">
                                    {t.quote}
                                </p>
                                <div className="mt-6 flex items-center gap-3 border-t border-[#EFE7DA] pt-4">
                                    <img
                                        src={t.portrait}
                                        alt={`Portrait of ${t.name}`}
                                        loading="lazy"
                                        className="h-11 w-11 rounded-full border border-[#E8D9B8] object-cover"
                                    />
                                    <div className="min-w-0">
                                        <p className="font-semibold text-[15px] text-[#2B2118]">{t.name}</p>
                                        <p className="text-[13px] text-[#8B6A2B]">{t.descriptor}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8a. FAQ */}
            <section className="bg-[#F8F5EF]">
                <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B6A2B] sm:text-base">
                            FREQUENTLY ASKED QUESTIONS
                        </p>
                        <h2 className="mt-3 font-serif text-[27px] font-semibold leading-tight text-balance text-[#2B2118] sm:text-[36px]">
                            Everything You Need to Know
                        </h2>
                    </div>

                    <div className="mt-9 sm:mt-11">
                        <Accordion
                            type="single"
                            collapsible
                            className="rounded-2xl border border-[#E7DBC4] bg-white p-1 shadow-[0_4px_16px_-8px_rgba(139,106,43,0.15)]"
                        >
                            {faqs.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`faq-${i}`}
                                    className="border-b border-[#EFE7DA] px-4 last:border-b-0 sm:px-6"
                                >
                                    <FaqTrigger>{faq.question}</FaqTrigger>
                                    <FaqContent>{faq.answer}</FaqContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
            {/* 8. Testimonials */}
            {/* <section className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
                <h2 className="text-center font-serif text-2xl sm:text-3xl text-gray-900">Bringing smiles to families around the world  </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                        { name: "Margaret", quote: "I gave this to Mum for her birthday because she never stops talking about her parents. Watching her smile, laugh and quietly wipe away a tear as that old photo came to life is something I'll never forget — it's the most meaningful gift I've ever given her." },
                        { name: "David", quote: "My wife lost her dad two years ago. When we sat the grandkids down and showed them Grandpa in that old holiday photo, everyone was in tears. It felt like he was in the room again." },
                        { name: "Susan", quote: "Our wedding photo from 1978 has sat on the mantelpiece for decades. To see us both young and smiling at each other again, after 47 years — I honestly can't describe it." },
                    ].map((t) => (
                        <article key={t.name} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="h-3.5 w-3.5 fill-[#C9A227] text-[#C9A227]" />
                                ))}
                            </div>
                            <p className="mt-2 text-[13px] leading-relaxed text-gray-900">"{t.quote}"</p>
                            <p className="mt-3 inline-flex items-center gap-1 text-[11px] text-gray-500">
                                <span className="font-semibold text-gray-900">{t.name}</span>
                                <span>·</span>
                                <BadgeCheck className="h-3 w-3 text-green-500" />
                                <span>Verified Customer</span>
                            </p>
                        </article>
                    ))}
                </div>
            </section> */}

            {/* 9. Final CTA */}
            <section className="mx-auto max-w-2xl px-5 pb-4 text-center">
                <h2 className="font-serif text-3xl sm:text-4xl text-gray-900">Your photo is ready
                    for its next chapter!
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[13px] text-gray-500 sm:text-sm">
                    Turn this treasured photo into a living memory you can download, keep and share with the people you love.
                </p>
                {/* <button
                    onClick={openCheckout}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-6 py-4 text-base font-bold text-white shadow-[0_18px_40px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] sm:w-auto sm:px-10 sm:text-lg"
                >
                    Unlock Your Memory
                </button> */}
                <p className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-gray-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-500" /> Secure checkout
                    <span>·</span> Cancel anytime <span>·</span> 30-day guarantee
                </p>
            </section>

            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                priceId={selectedPlan.price_id}
                planName={selectedPlan.name}
                amount={`${finalAmountDisplay}/${selectedPlan.period.toLowerCase()}`}
                checkoutType="subscription"
                memoriesText={`${selectedPlan.credits} memories`}
                unitPrice={`${selectedPlan.price} ${selectedPlan.unit}`}
                billingInterval={`Billed every ${selectedPlan.period === 'Fortnight' ? '2 weeks' : selectedPlan.period.toLowerCase()}`}
            />
            {/* <Footer /> */}
        </div>
    );
}

function useCountdown(durationSec = 30 * 60) {
    const [remaining, setRemaining] = useState(durationSec);
    useEffect(() => {
        const DURATION = durationSec * 1000;
        const DAY = 24 * 60 * 60 * 1000;
        let start;
        try {
            const raw = localStorage.getItem("pm_timer_start");
            const parsed = raw ? parseInt(raw, 10) : 0;
            if (!parsed || Date.now() - parsed > DAY) {
                start = Date.now();
                localStorage.setItem("pm_timer_start", String(start));
            } else {
                start = parsed;
            }
        } catch {
            start = Date.now();
        }
        const tick = () => {
            const left = Math.max(0, Math.floor((start + DURATION - Date.now()) / 1000));
            setRemaining(left);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [durationSec]);
    return remaining;
}

function CountdownBar() {
    const remaining = useCountdown();
    const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
    const ss = String(remaining % 60).padStart(2, "0");
    return (
        <div className="bg-[#2B2118] text-white">
            <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 px-5 py-1.5 text-center text-[12px] sm:text-[13px]">
                <span className="font-medium">❤️ We'll keep your memory ready for</span>
                <span className="font-mono font-bold tracking-wider text-[#F2C94C]">{mm}:{ss}</span>
            </div>
        </div>
    );
}

function PromoTimer() {
    const remaining = useCountdown();
    const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
    const ss = String(remaining % 60).padStart(2, "0");
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8B6A2B] px-2.5 py-1 text-[11px] font-bold text-white">
            <Clock className="h-3 w-3" /> {mm}:{ss}
        </span>
    );
}

function PaymentIcon({ name }) {
    const images = {
        visa: "/visa.png",
        mastercard: "/master.png",
        amex: "/amex.png",
        applepay: "/applepay.png",
        googlepay: "/googlepay.webp"
    };

    const src = images[name];
    if (!src) return null;

    return (
        <div className="inline-flex h-9 w-[58px] items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden p-1">
            <img src={src} alt={name} className="h-full w-full object-contain" />
        </div>
    );
}


