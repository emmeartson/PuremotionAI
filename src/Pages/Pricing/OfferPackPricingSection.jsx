import React from 'react';
import { IoLockClosedOutline } from "react-icons/io5";

// Both plans kept for payment modal / data purposes.
// Only the trial plan (image_package) is shown as the card.
export const plans = [
    {
        id: "image_package",
        name: "3 Photo Animations",
        price: "$4.99",
        oldPrice: null,
        badge: null,
        desc: "7-Day Full Access",
        unit: "then $34.99/mo",
        price_id: "price_1UE90MF9gOu6UGqJ16IUe5kg",
        image_amount: 3,
        period: "Week",
    },
    {
        id: "image_package_monthly",
        name: "15 Photo Animations",
        price: "$34.99",
        oldPrice: null,
        badge: null,
        desc: "Monthly Subscription",
        unit: "per month",
        price_id: "price_1UE918F9gOu6UGqJIK81fsuM",
        image_amount: 15,
        period: "Month",
    },
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
    const trialPlan = plans[0];

    return (
        <>
            {/* Pricing intro */}
            <section id="pricing-intro" className="mx-auto max-w-2xl scroll-mt-20 px-5 pt-10 pb-4 text-center">
                <h2 className="font-serif text-[1.65rem] sm:text-3xl font-medium text-[#2B2118]">
                    Unlock Your Photo Animation
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-[13px] text-[#5C4A32] sm:text-base">
                    Get 7-day full access with 3 photo animations.
                </p>
            </section>

            {/* Single plan card + CTA */}
            <section id="plans" className="mx-auto max-w-2xl scroll-mt-20 px-5 pt-2 pb-6 sm:pt-4">

                {/* Card */}
                <div className="flex w-full items-center rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    {/* Left: name + desc */}
                    <div className="flex-1 px-5 py-5 sm:px-7 sm:py-6">
                        <p className="font-serif font-bold text-[17px] sm:text-[19px] text-[#2B2118]">
                            {trialPlan.name}
                        </p>
                        <p className="mt-1 text-[13px] font-medium text-[#8B6A2B]">
                            {trialPlan.desc}
                        </p>
                    </div>

                    {/* Vertical divider */}
                    {/* <div className="w-px self-stretch bg-gray-200" /> */}

                    {/* Right: price */}
                    <div className="shrink-0 px-5 py-5 sm:px-7 sm:py-6 text-right">
                        <p className="font-serif text-[1.75rem] sm:text-[2rem] leading-none text-[#2B2118]">
                            {convertPrice(trialPlan.price)}
                        </p>
                    </div>
                </div>

                {/* Monthly footnote */}
                <p className="mt-3 text-center text-[12px] sm:text-[13px] text-[#8B6A2B]">
                    Then {convertPrice("$34.99")}/month · Includes 15 photo animations
                </p>

                {/* Primary CTA */}
                <button
                    onClick={openCheckout}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-6 py-4 text-base font-bold text-white shadow-[0_18px_40px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] active:scale-[0.99] sm:text-lg"
                >
                    Bring my photo to life
                </button>

                {/* Trust line */}
                <p className="mt-3 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[12px] text-gray-500">
                    <IoLockClosedOutline className="h-3.5 w-3.5 text-gray-400" />
                    Secure checkout · Cancel anytime
                </p>
            </section>

            {/* Payment icons */}
            <section className="mx-auto max-w-2xl px-5 pt-5">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {(["visa", "mastercard", "amex", "applepay", "googlepay"]).map((n) => (
                            <PaymentIcon key={n} name={n} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
