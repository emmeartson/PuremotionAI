import React from "react";
import {
  Star,
  Sparkles,
  Check,
  CreditCard,
  Download,
  Play,
} from "lucide-react";

function PricingHero() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .marquee-pause:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* ============ COMPACT PRICING HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FDF8F0] pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-5 pt-5 pb-6 text-center sm:px-8 sm:pt-8 sm:pb-8">
          {/* Trust pill */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E8D9B8] bg-white/85 px-3 py-1 shadow-[0_8px_24px_-12px_rgba(139,106,43,0.25)] backdrop-blur-sm">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#C9A227] text-[#C9A227]" />
                ))}
              </span>
              <span className="text-[11px] font-semibold text-gray-900">
                Trusted by <span className="text-[#8B6A2B]">18,000+</span> families
              </span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="mx-auto mt-4 max-w-2xl font-serif text-[1.75rem] leading-[1.1] text-gray-900 sm:text-4xl lg:text-[2.75rem]">
            Your Memories Are Ready To{" "}
            <span className="italic text-[#967431]">Come Alive</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-2.5 max-w-lg text-[14px] text-gray-500 sm:text-base">
            Select the perfect package and start restoring your cherished moments in seconds.
          </p>

          {/* CTA */}
          <div className="mt-5 flex justify-center">
            <a
              href="#plans"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("plans")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] hover:shadow-[0_18px_40px_-12px_rgba(139,106,43,0.7)] active:scale-[0.99] sm:px-9 sm:py-3.5 sm:text-base"
            >
              <Sparkles className="h-4 w-4" /> Bring Your Memory Back To Life
            </a>
          </div>
        </div>
      </section>

      {/* ============ 3 STEPS ============ */}
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl">How It Works</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { icon: Check, title: "Choose your plan", desc: "Pick the package that fits you." },
            { icon: CreditCard, title: "Secure checkout", desc: "Encrypted Stripe payment." },
            { icon: Download, title: "Access & download", desc: "Your memory, ready in minutes." },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(139,106,43,0.3)] transition-all hover:shadow-[0_18px_40px_-18px_rgba(139,106,43,0.45)] sm:flex-col sm:text-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8B6A2B] text-white shadow-sm">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B6A2B]">Step {i + 1}</p>
                <h3 className="font-serif text-lg">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ AI MEMORIES SHOWCASE ============ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <h2 className="font-serif text-3xl leading-[1.1] text-[#2B2118] sm:text-5xl lg:text-[3.25rem]">
            See Memories <span className="italic text-[#8B6A2B]">Come Back To Life</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#5A4A36]/80 sm:text-base">
            Real people. Real moments. Beautifully brought back with AI.
          </p>
          <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#8B6A2B]/50 to-transparent" />
        </div>

        <div className="marquee-pause mt-14 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}>
          <div className="animate-marquee flex gap-6 px-5 sm:gap-8 w-max">
            {(() => {
              const items = [
                { before: "/wedding.jpg", video: "/wedding-motion.mp4", title: "1980s couple memory", bw: true },
                { before: "/grandfather.jpg", video: "/grandfather-motion.mp4", title: "Mother & daughter hug", bw: false },
                { before: "/pet.jpg", video: "/pet-motion.mp4", title: "Dog playing with toy", bw: false },
                { before: "/elder-woman.jpg", video: "/elder-motion.mp4", title: "Grandparent smiling", bw: true },
                { before: "/father-laughing.jpg", video: "/father-motion.mp4", title: "Father laughing", bw: false },
                { before: "/child-bubbles.jpg", video: "/child-bubbles-motion.mp4", title: "Childhood memory", bw: false },
              ];
              return [...items, ...items].map((item, i) => (
                <figure
                  key={i}
                  className="group relative h-[420px] w-[260px] shrink-0 overflow-hidden rounded-[28px] bg-[#2B2118] shadow-[0_30px_60px_-30px_rgba(43,33,24,0.55)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-30px_rgba(43,33,24,0.7)] sm:h-[480px] sm:w-[300px]"
                >
                  <video
                    src={item.video}
                    poster={item.before}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                  {/* subtle bottom gradient for legibility */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* BEFORE badge — top left */}
                  <span className="absolute left-3 top-3 rounded-full bg-[#2B2118]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                    Before
                  </span>
                  {/* AFTER badge — top right */}
                  <span className="absolute right-3 top-3 rounded-full bg-gradient-to-br from-[#C9A227] to-[#8B6A2B] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_4px_12px_rgba(139,106,43,0.45)]">
                    After
                  </span>

                  {/* BEFORE thumbnail — bottom left */}
                  <div className="absolute bottom-3 left-3 h-24 w-24 overflow-hidden rounded-xl border border-white/70 bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
                    <img
                      src={item.before}
                      alt={`${item.title} before`}
                      loading="lazy"
                      className={`h-full w-full rounded-md object-cover ${item.bw ? "grayscale" : ""}`}
                    />
                  </div>

                  {/* Play icon — bottom right */}
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2B2118]/85 text-white shadow-sm backdrop-blur-sm">
                    <Play className="h-4 w-4 translate-x-[1px] fill-white" />
                  </div>
                </figure>
              ));
            })()}
          </div>
        </div>

        {/* Trust strip */}
        <div className="mx-auto mt-14 flex max-w-xl flex-col items-center gap-4 px-5 text-center">
          <p className="text-sm font-semibold text-[#2B2118] sm:text-base">
            Trusted by thousands of happy customers
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-9">
              <img src="/trusted.png" alt="Trusted customers" className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#C9A227] text-[#C9A227]" />
                ))}
              </div>
              <span className="text-xs text-[#5A4A36]/80">4.8/5 18,000+ reviews</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PricingHero;
