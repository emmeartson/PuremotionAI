import React, { useState } from "react";
import PaymentModal from "../Stripe/PaymentModal";
import { FaCheck } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Mastercard from "../../../public/master.png";
import Visa from "../../../public/visa.png";
import Amex from "../../../public/amex.png";
import Header from "../../Shared/Header";
import AnnouncementBar from "../../Shared/AnnouncementBar";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { subscriptionCheckout } from "../../Redux/Subscription";
import sarah from "../../../public/Sarah M..jpg";
import marco from "../../../public/Marco D..jpg";
import hannah from "../../../public/Hannah P..jpg";

function UpsalePage() {
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpgrade = () => {
    setShowPayment(true);
  };
  return (
    <div className="min-h-screen bg-[#fdfcfb] font-sans">
      <AnnouncementBar />
      {/* Header */}
      <Link to="/">
        <header className="py-5 sm:py-8 text-center border-b border-gray-100 bg-white px-4 sm:px-0">
          <span className="text-xl sm:text-2xl font-serif font-bold text-[#7c602e] tracking-tight">
            PureMotion
          </span>
        </header>
      </Link>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        {/* Hero Image */}
        <div className="mb-10 sm:mb-12 relative">
          <div className="w-64 h-80 sm:w-80 sm:h-96 mx-auto overflow-hidden">
            <img
              src="/upsalehero.png"
              alt="Upsale Hero"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Overlay Text */}
          {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-[2rem] p-6">
            <p className="text-white font-semibold text-lg">
              Brought smiles back to life 💫
            </p>
          </div> */}
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight -mt-16 sm:-mt-24">
          Skin The Line & Relive Sooner!
        </h1>

        {/* Description */}
        <p className="text-black text-base sm:text-lg mb-8 sm:mb-12 font-medium leading-relaxed max-w-lg mx-auto">
          With Priority Processing, your enchanted memory will be created{" "}
          <span className="font-bold">3x faster</span> so you can see the magic
          unfold almost instantly.
        </p>

        {/* Benefits List */}
        <div className="space-y-4 mb-12 max-w-md mx-auto text-left">
          <div className="flex items-center gap-4 p-4  rounded-xl  hover:shadow-md transition-shadow">
            <FaCheck className="text-[#634910] text-xl flex-shrink-0" />
            <span className="text-gray-700 font-semibold">
              Results up to <span className="font-bold">3x faster</span>
            </span>
          </div>
          <div className="flex items-center gap-4 p-4  rounded-xl  hover:shadow-md transition-shadow">
            <FaCheck className="text-[#634910] text-xl flex-shrink-0" />
            <span className="text-gray-700 font-semibold">
              Perfect for last minute gifts or emotional reveals
            </span>
          </div>
          <div className="flex items-center gap-4 p-4  rounded-xl  hover:shadow-md transition-shadow">
            <FaCheck className="text-[#634910] text-xl flex-shrink-0" />
            <span className="text-gray-700 font-semibold">
              Works with every animation style
            </span>
          </div>
        </div>
      </main>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-10">
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="bg-[#7c602e] text-white px-3 py-1 rounded-full text-md font-bold">
              75% OFF
            </span>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl py-6 sm:py-8 px-4 sm:px-6 text-center shadow-sm mt-6">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-1">
              Todays only : <span className="font-bold">$4.99</span>
            </h3>
            <p className="text-gray-400 text-sm sm:text-md mb-4">
              Regular price: $19.96
            </p>

            <p className="font-semibold text-lg sm:text-xl mb-2">
              This exclusive offer is only available now
            </p>
            <p className="text-gray-600 text-base sm:text-xl mb-6">
              Upgrade to skip the line and see your
              <br className="hidden sm:block" /> animated memory come to life up
              to <span className="font-bold">3x faster</span>
              <br className="hidden sm:block" />- no waiting, just instant
              magic.
            </p>

            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="max-w-2xl bg-[#7c602e] text-white px-6 py-3 rounded-full font-semibold text-lg sm:text-xl shadow-md hover:bg-[#6b5127] transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Yes, upgrade me!"}
            </button>

            <Link to="/best-deal">
              <button className="w-full text-[#7c602e] font-semibold text-lg sm:text-xl underline hover:text-[#6b5127] transition-colors py-2">
                No, I'll keep the standard speed
              </button>
            </Link>
          </div>
        </div>

        <p className="text-center mt-8 sm:mt-10 -mb-8 font-bold text-sm sm:text-base">
          {" "}
          <FaCheckCircle className="inline text-green-500 mr-2 " /> Safe
          checkout and 14-day money-back guarantee
        </p>
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 max-w-2xl mx-auto px-4 sm:px-0">
          {/* <img src={Visa} alt="Visa" className="h-10 " />
          <img src={Amex} alt="Amex" className="h-10 " />
          <img src={Mastercard} alt="Mastercard" className="h-10 " /> */}
          <img src="/payments.png" alt="" />
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 sm:mb-12 text-center leading-tight">
          Hear from others who skipped the line and love it
        </h2>

        <div className="space-y-8">
          {/* Testimonial Card 1 - Sarah M. */}
          <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              {/* Profile Image */}
              <img
                src={sarah}
                alt="Sarah M."
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover flex-shrink-0"
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                      Sarah M.
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      London, UK
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <FaCheck className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-gray-600 font-medium">
                        Verified user
                      </span>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-[#634910]" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Seeing my grandfather smile and move again after 40 years… I
                  cried instantly. It felt like a moment I never thought I'd get
                  back.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Card 2 - Marco D. */}
          <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              {/* Profile Image */}
              <img
                src={marco}
                alt="Marco D."
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover flex-shrink-0"
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                      Marco D.
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Florence, Italy
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <FaCheck className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-gray-600 font-medium">
                        Verified user
                      </span>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-[#634910]" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  When the photo of my grandparents came alive, I literally
                  gasped. PureMotion created a moment I didn't know I needed.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Card 3 - Hannah P. */}
          <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              {/* Profile Image */}
              <img
                src={hannah}
                alt="Hannah P."
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover flex-shrink-0"
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                      Hannah P.
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Sydney, Australia
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <FaCheck className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-gray-600 font-medium">
                        Verified user
                      </span>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-[#634910]" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  I animated an old photo of my childhood dog, Max. Seeing him
                  move again, that little head tilt, his gentle expression, it
                  brought me to tears. It felt like having a moment with him
                  again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stripe Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        priceId="price_1TaAjEF9gOu6UGqJkuGba5m1"
        planName="Priority Processing"
        amount="$4.99"
        isExclusive={true}
        checkoutType="subscription"
      />
    </div>
  );
}

export default UpsalePage;
