import React, { useState } from "react";
import { Check } from "lucide-react";
import PaymentModal from "../Stripe/PaymentModal";

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

export default function Chooseyourmemoryplan() {
    const [selected, setSelected] = useState("fortnightly_update");
    const [showPayment, setShowPayment] = useState(false);

    const selectedPlan = plans.find((p) => p.id === selected) || plans[1];
    const priceAmount = selectedPlan ? parseFloat(selectedPlan.price.replace("$", "")) : 0;
    const finalAmount = selectedPlan ? (priceAmount * selectedPlan.credits).toFixed(2) : "0.00";

    return (
        <>
            <section id="plans" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16">
                <div className="mb-10 text-center">
                    <h2 className="font-serif text-3xl text-balance sm:text-4xl text-gray-900">Choose your memory plan</h2>
                </div>

                <div className="flex flex-col gap-5">
                    {plans.map((p) => {
                        const isSelected = selected === p.id;
                        const isFamily = p.id === "fortnightly_update";
                        return (
                            <div key={p.id} className="relative">
                                {p.badge && (
                                    <span
                                        className={`absolute -top-3 right-6 z-10 whitespace-nowrap rounded-full px-4 py-1 text-[11px] font-semibold shadow-sm ${isFamily ? "bg-[#fdca17] text-black" : "bg-[#5FAF8E] text-white"
                                            }`}
                                    >
                                        {p.badge}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setSelected(p.id)}
                                    className={`flex w-full items-center justify-between gap-4 rounded-2xl bg-white px-6 py-5 text-left transition-all sm:px-8 sm:py-6 ${isSelected
                                        ? "border-2 border-[#8B6A2B] shadow-[0_20px_50px_-20px_rgba(139,106,43,0.45)]"
                                        : "border border-gray-200 shadow-sm hover:border-[#8B6A2B]/50"
                                        }`}
                                >
                                    <div className="min-w-0">
                                        <h3 className="font-serif text-lg sm:text-xl text-gray-900">{p.name}</h3>
                                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">{p.desc}</p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <div className="flex items-baseline justify-end gap-2">
                                            {p.oldPrice && (
                                                <span className="text-sm text-gray-400 line-through">{p.oldPrice}</span>
                                            )}
                                            <span className="font-serif text-2xl text-gray-900 sm:text-3xl">{p.price}</span>
                                        </div>
                                        <p className="mt-0.5 text-[11px] text-gray-500">{p.unit}</p>
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Master CTA */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    <button
                        onClick={() => setShowPayment(true)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-8 py-5 font-serif text-2xl text-white shadow-[0_18px_40px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] sm:text-3xl"
                    >
                        Get Started Now
                    </button>
                    <p className="inline-flex items-center gap-2 text-sm text-gray-500">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                            <Check className="h-2.5 w-2.5 text-white" />
                        </span>
                        Secure checkout
                    </p>
                    <div className="text-sm text-gray-600 font-extrabold text-center">
                        Prices shown in AUD. <br />Checkout will display your local currency.
                    </div>

                    <div className="flex justify-center gap-3">
                        <img src="/payments.png" className="h-10 sm:h-12 object-contain" alt="Payments" />
                    </div>
                </div>
            </section>

            <section>
                <section className="border-y border-border bg-cream/60 py-8">
                    <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 px-5 text-center sm:px-8">
                        {[
                            { stat: "18,000+", label: "Happy users" },
                            { stat: "98%", label: "Satisfaction" },
                            { stat: "4.8★", label: "Avg rating" },
                        ].map((s) => (
                            <div key={s.label}>
                                <p className="font-serif text-3xl text-primary sm:text-4xl">{s.stat}</p>
                                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </section>

            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                priceId={selectedPlan.price_id}
                planName={selectedPlan.name}
                amount={`$${finalAmount}/${selectedPlan.period.toLowerCase()}`}
                checkoutType="subscription"
            />
        </>
    );
}
