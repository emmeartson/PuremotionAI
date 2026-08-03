import React from 'react';
import { Check } from 'lucide-react';
import { IoLockClosedOutline } from "react-icons/io5";

export const plans = [
    {
        id: "image_package",
        name: "3 Photo Animations",
        price: "$2",
        oldPrice: null,
        badge: null,
        desc: "7-Days Access",
        price_id: "price_1TzICLF9gOu6UGqJJ1uJ72gn",
        image_amount: 3,
        period: "Week",
    }
];

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

export default function OfferPackPricingSection({
    selected,
    setSelected,
    convertPrice,
    openCheckout
}) {
    return (
        <>
            {/* 4c. Pricing intro */}
            <section id="pricing-intro" className="mx-auto max-w-2xl scroll-mt-20 px-5 pt-10 pb-4 text-center">
                <h2 className="font-serif text-[1.65rem] sm:text-3xl font-medium text-[#2B2118]">
                    Unlock Your Photo Animation
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-[13px] text-[#5C4A32] sm:text-lg">
                    Get 7-day full access with 3 photo animations.
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
                    Bring my photo to life
                </button>
                {/* 
                <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-gray-500">
                    <Check className="h-3 w-3 text-green-500" strokeWidth={3} /> Secure checkout <span>·</span> Cancel anytime <span>·</span> 30-day guarantee
                </p> */}

                <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-gray-500">
                    <IoLockClosedOutline className="h-3 w-3 text-[#8B6A2B]" strokeWidth={3} /> Safe and secure checkout
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
                    {/* <p className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
                        <Lock className="h-3 w-3" /> Payments securely processed by Stripe
                    </p> */}
                </div>
            </section>
        </>
    );
}
