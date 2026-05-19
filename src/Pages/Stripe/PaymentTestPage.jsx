import React, { useState } from 'react';
import PaymentModal from './PaymentModal';

const packages = [
    {
        id: 'weekly',
        name: 'Weekly Package',
        price: '$2.49',
        credits: 4,
        period: 'Week',
        price_id: 'price_1TAkhEF9gOu6UGqJlgUNKTEO',
    },
    {
        id: 'family',
        name: 'Fortnightly Package',
        price: '$1.29',
        credits: 15,
        period: 'Fortnight',
        price_id: 'price_1TAkioF9gOu6UGqJuW3PQWXH',
    },
    {
        id: 'monthly',
        name: 'Monthly Package',
        price: '$0.99',
        credits: 30,
        period: 'Month',
        price_id: 'price_1TAkjDF9gOu6UGqJceuS9xl2',
    },
];

export default function PaymentTestPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPkg, setSelectedPkg] = useState(packages[1]); // default: fortnightly

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f8f3eb] flex flex-col items-center justify-center p-6">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-serif font-bold text-[#634910] mb-2">
                    Payment Modal Test
                </h1>
                <p className="text-[#9c8f73]">
                    Select a package and click the button to preview the payment modal.
                </p>
            </div>

            {/* Package Selector */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
                {packages.map((pkg) => (
                    <button
                        key={pkg.id}
                        onClick={() => setSelectedPkg(pkg)}
                        className={`px-6 py-4 rounded-xl border-2 transition-all text-left min-w-[200px] ${
                            selectedPkg.id === pkg.id
                                ? 'border-[#7c602e] bg-white shadow-lg ring-2 ring-[#7c602e]/20'
                                : 'border-[#e6d8c4] bg-white/60 hover:border-[#a67c3d]'
                        }`}
                    >
                        <p className="font-bold text-[#634910]">{pkg.name}</p>
                        <p className="text-sm text-[#9c8f73]">
                            {pkg.credits} credits / {pkg.period}
                        </p>
                        <p className="text-lg font-bold text-[#7c602e] mt-1">
                            {pkg.price}
                            <span className="text-xs font-normal text-[#9c8f73]"> /video</span>
                        </p>
                    </button>
                ))}
            </div>

            {/* Open Modal Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wide
                           bg-gradient-to-r from-[#7c602e] to-[#a67c3d] text-white
                           hover:from-[#634910] hover:to-[#8b6930]
                           transition-all duration-300 shadow-lg hover:shadow-xl
                           transform hover:-translate-y-0.5 active:translate-y-0"
            >
                Open Payment Modal
            </button>

            {/* The Modal */}
            <PaymentModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                priceId={selectedPkg.price_id}
                planName={selectedPkg.name}
                amount={`${selectedPkg.price}/video`}
            />
        </div>
    );
}
