import React, { useState } from "react";
import PaymentModal from "../Stripe/PaymentModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { packageCheckout } from "../../Redux/PackagePurchase";

export default function BestDeal() {
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BEST_DEAL_PRICE_ID = "price_1TImCSF9gOu6UGqJT4WuB6IA";

  const handleUpgrade = () => {
    setShowPayment(true);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/bestdeal.png')" }}
    >
      <div className="max-w-3xl mx-auto text-center pt-20 sm:pt-24 pb-24 sm:pb-32 px-4 sm:px-6">
        <div className="relative max-w-2xl mx-auto">
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/35 via-black/45 to-black/70 sm:hidden"
            aria-hidden="true"
          />
          <div className="relative px-3 py-4 sm:px-0 sm:py-0">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-6 mt-16 sm:mt-20">
              Unlock the Best Deal: 50 Credit
              <br />
              for only $39.00!
            </h1>
            <p className="text-white/90 text-base sm:text-lg font-medium mb-6">
              Upgrade your experience with our best-value credit bundle.
            </p>
            <p className="text-white/80 text-sm max-w-2xl mx-auto mb-8">
              Get 50 Credit for just $39.00 - that's 60% more value compared to
              the smaller pack. Whether you're diving deep or coming back for
              more, this is the smartest way to power up.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="mt-6 bg-white rounded-2xl max-w-xl mx-auto p-5 sm:p-6 shadow-lg">
          <div className="flex justify-center -mt-8">
            <div className="bg-yellow-300 text-xs text-[#774d00] font-bold px-3 py-1 rounded-full">
              Last Chance
            </div>
          </div>

          <div className="text-center mt-3">
            <div className="text-sm text-gray-500 line-through">$97.50</div>
            <div className="text-2xl font-bold text-gray-900">
              $39{" "}
              <span className="text-sm text-red-500 font-semibold">
                60% OFF
              </span>
            </div>
          </div>

          <p className="text-center text-gray-600 text-sm mt-4 mb-6">
            Elevate your experience - get more credit and do more with every
            moment.
          </p>

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="bg-[#7c602e] text-white px-10 py-3 rounded-full font-semibold shadow hover:bg-[#6b5127] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Upgrade & Save Big"}
            </button>
            <Link to="/dashboard">
              <button className="text-sm text-gray-700 underline">
                No, thank you
              </button>
            </Link>
          </div>
        </div>

        {/* Payment icons */}
        <div className="max-w-xl mx-auto bg-white rounded-full mt-8 py-3 sm:py-4 px-4 flex items-center justify-center gap-4 sm:gap-6 shadow">
          {/* <img src="/master.png" alt="master" className="h-6" />
          <img src="/visa.png" alt="visa" className="h-6" />
          <img src="/amex.png" alt="amex" className="h-6" /> */}
          <img src="/payments.png" alt="" className="h-10 sm:h-14" />
          {/* <span className="text-sm text-gray-600">Pay</span> */}
        </div>
      </div>

      {/* Stripe Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        priceId={BEST_DEAL_PRICE_ID}
        planName="Best Deal - 50 Credits"
        amount="$39.00"
        checkoutType="package"
      />
    </div>
  );
}
