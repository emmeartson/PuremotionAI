import React from "react";
import { Heart, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export const Step5_Final = ({ onNext, previewImage }) => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      <div className="absolute inset-0 bg-warm-glow pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-5 pt-1 pb-8 text-center sm:px-8 sm:pt-2 sm:pb-10">
        <h1 className="font-serif text-4xl text-balance sm:text-6xl text-gray-900 fade-up">
          Your Memory Is <span className="text-[#8B6A2B] italic">Ready</span>
        </h1>

        {/* Preview card with curiosity gap */}
        <div className="relative mx-auto mt-4 w-full max-w-[276px] scale-in sm:max-w-[340px]">
          <div className="absolute -inset-8 rounded-[2.5rem] bg-[#8B6A2B]/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl bg-[#fbf8f3] p-3 ring-1 ring-gray-200 shadow-[0_30px_80px_-30px_rgba(139,106,43,0.35),0_10px_30px_-15px_rgba(43,33,24,0.2)]">
            <div className="relative overflow-hidden rounded-3xl bg-[#2B2118]">
              <img
                src={
                  previewImage ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                }
                alt="Preview Result"
                className="aspect-[4/5] w-full object-cover"
              />

              <div className="absolute inset-0 rounded-3xl backdrop-blur-md">
                <div className="absolute inset-0 bg-[#2B2118]/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/40 backdrop-blur sm:h-14 sm:w-14">
                    <Lock className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                  </div>
                  <p className="px-4 text-sm font-semibold text-white sm:text-base">
                    Continue to unlock your full memory video
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Emotional bridge */}
        <div className="mx-auto mt-8 max-w-xl text-center fade-up">
          <h2 className="font-serif text-3xl text-balance sm:text-4xl text-gray-900">
            Imagine Seeing Them <span className="italic  text-[#8B6A2B]">Smile Again</span>
          </h2>
          <p className="mt-2 text-[14px] text-gray-500 sm:text-base whitespace-pre-line">
            {"Thousands of families have already brought treasured memories back to life.\u00A0\n\nYour full video is one click away."}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col items-center gap-3 fade-up">
          <button
            onClick={() => navigate("/step-login")}
            className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-[#8B6A2B] px-9 py-4 text-lg font-semibold text-white shadow-[0_25px_60px_-20px_rgba(139,106,43,0.30),0_10px_25px_-12px_rgba(43,33,24,0.12)] transition-all hover:bg-[#74591F]"
            style={{ minHeight: 56 }}
          >
            <Heart className="h-5 w-5" /> Unlock My Full Video
          </button>

          {/* <p className="mt-4 text-[10px] text-gray-400 leading-relaxed font-medium max-w-xs mx-auto">
            We respect your privacy. We will never sell, rent or share your email
            address. That's more than a{" "}
            <Link to="/privacy-policy" className="text-blue-600 underline">
              policy
            </Link>
            , it's our personal guarantee.
          </p> */}
        </div>
      </div>
    </section>
  );
};
