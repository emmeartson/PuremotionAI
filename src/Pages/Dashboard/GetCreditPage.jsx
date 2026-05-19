import React, { useState } from "react";
import PaymentModal from "../Stripe/PaymentModal";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { packageCheckout } from "../../Redux/PackagePurchase";
const packages = [
  {
    id: "max",
    name: "Max Pack",
    credits: "80 Credits",
    price: "$0.79",
    subtitle: "Per Credit",
    badge: "BEST VALUE",
    badgeColor: "bg-[#5FAF8E]",
    borderColor: "border-gray-200",
    price_id: "price_1TAkfkF9gOu6UGqJoXkoyAWJ",
    icon: "/Max_Pack.png",
  },
  {
    id: "power",
    name: "Power Pack",
    credits: "40 Credits",
    price: "$0.99",
    subtitle: "Per Credit",
    badge: "MOST POPULAR",
    badgeColor: "bg-[#fdca17]",
    borderColor: "border-gray-200",
    price_id: "price_1TAkfEF9gOu6UGqJhHHc1Dbh",
    icon: "/Power_Pack.png",
  },
  {
    id: "value",
    name: "Value Pack",
    credits: "20 Credits",
    price: "$1.49",
    subtitle: "Per Credit",
    borderColor: "border-gray-200",
    price_id: "price_1TAkedF9gOu6UGqJpOiNcBrF",
    icon: "/Value_Pack.png",
  },
  {
    id: "boost",
    name: "Boost Pack",
    credits: "10 Credits",
    price: "$1.79",
    subtitle: "Per Credit",
    borderColor: "border-gray-200",
    price_id: "price_1TAkeBF9gOu6UGqJHMlPhEOO",
    icon: "/Boost_Pack.png",
  },
];

export const GetCreditPage = () => {
  const [selected, setSelected] = useState("max");
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClaimOffer = () => {
    setShowPayment(true);
  };

  return (
    <div className="flex-1 bg-[#fdfcfb] py-8 sm:py-10 md:py-12 px-4 sm:px-6 flex flex-col items-center animate-in fade-in duration-500">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 sm:mb-12 text-center">
        Choose Your Package
      </h1>

      {/* Package Selection List */}
      <div className="w-full max-w-[640px] space-y-3 sm:space-y-4 mb-8 sm:mb-10">
        {packages.map((pkg) => (
          <div key={pkg.id} className="relative group">
            {/* Top Badge */}
            {pkg.badge && (
              <div
                className={`absolute -top-3 right-4 z-10 ${pkg.badgeColor} text-white text-[10px] font-black px-3 py-1 rounded-md shadow-sm`}
              >
                {pkg.badge}
              </div>
            )}

            {/* Package Card */}
            <label
              className={`flex items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all bg-white hover:shadow-md ${
                selected === pkg.id
                  ? "border-[#7c602e] ring-1 ring-[#7c602e]/10"
                  : pkg.borderColor
              }`}
            >
              <input
                type="radio"
                name="coin-package"
                className="hidden"
                checked={selected === pkg.id}
                onChange={() => setSelected(pkg.id)}
              />

              {/* Left: Radio UI & Name */}
              <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selected === pkg.id
                      ? "border-[#5FAF8E] bg-[#5FAF8E]"
                      : "border-gray-300"
                  }`}
                >
                  {selected === pkg.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                    {pkg.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium">
                    {pkg.credits}
                  </p>
                </div>
              </div>

              {/* Center: Coin Visual */}
              <div className="hidden lg:block ml-20">
                <img src={pkg.icon} alt={pkg.name} className="h-16 w-auto" />
              </div>

              {/* Right: Price */}
              <div className="text-right flex-shrink-0">
                <p className="text-lg sm:text-xl font-bold text-gray-900 leading-none">
                  {pkg.price}
                </p>
                <p className="text-[11px] text-gray-400 font-medium  tracking-tight">
                  {pkg.subtitle}
                </p>
              </div>
            </label>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="w-full max-w-[630px] text-center">
        <button
          onClick={handleClaimOffer}
          disabled={loading}
          className="w-full bg-[#7c602e] hover:bg-[#634d25] text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base uppercase tracking-widest shadow-xl shadow-[#7c602e]/20 transition-all active:scale-[0.98] mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "PROCESSING..." : "CLAIM OFFER"}
        </button>

        {/* Trust Line */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 font-bold mb-8 px-2 text-center">
          <CheckCircle2 size={16} className="text-green-500" />
          Safe checkout and 14-day money-back guarantee
        </div>

        {/* Payment Icons */}
        <div className="flex items-center justify-center  hover:grayscale-0 transition-all">
          <img src="/payments.png" alt="" className="h-12 sm:h-16" />
        </div>
      </div>

      {/* Stripe Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        priceId={packages.find((pkg) => pkg.id === selected)?.price_id}
        planName={packages.find((pkg) => pkg.id === selected)?.name}
        amount={packages.find((pkg) => pkg.id === selected)?.price + "/credit"}
        checkoutType="package"
      />
    </div>
  );
};
