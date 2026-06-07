import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrustBar } from "@/components/TrustBar";
import { CheckoutModal } from "@/components/CheckoutModal";
import {
  Check, ShieldCheck, Star, Heart, CreditCard, Download, BadgeCheck, Sparkles,
  Zap, Lock, Image as ImageIcon, Smartphone, Play, ArrowRight,
} from "lucide-react";
import { useState } from "react";
import grandfather from "@/assets/grandfather.jpg";
import wedding from "@/assets/wedding.jpg";
import pet from "@/assets/pet.jpg";
import elder from "@/assets/elder-woman.jpg";
import fatherLaughing from "@/assets/father-laughing.jpg";
import childBubbles from "@/assets/child-bubbles.jpg";
import weddingMotion from "@/assets/wedding-motion.mp4.asset.json";
import elderMotion from "@/assets/elder-motion.mp4.asset.json";
import fatherMotion from "@/assets/father-motion.mp4.asset.json";
import grandfatherMotion from "@/assets/grandfather-motion.mp4.asset.json";
import petMotion from "@/assets/pet-motion.mp4.asset.json";
import childBubblesMotion from "@/assets/child-bubbles-motion.mp4.asset.json";
import pmLogo from "@/assets/puremotion-logo.png";
import personSarah from "@/assets/person-sarah.jpg";
import personMarco from "@/assets/person-marco.jpg";
import personHannah from "@/assets/person-hannah.jpg";
import personElise from "@/assets/person-elise.jpg";
import personJonas from "@/assets/person-jonas.jpg";
import personLiam from "@/assets/person-liam.jpg";
import review1 from "@/assets/review-1.jpg";
import review2 from "@/assets/review-2.jpg";
import review3 from "@/assets/review-3.jpg";
import review4 from "@/assets/review-4.jpg";
import review5 from "@/assets/review-5.jpg";
import review6 from "@/assets/review-6.jpg";
import review1Color from "@/assets/review-1-color.jpg";
import review2Color from "@/assets/review-2-color.jpg";
import review5Color from "@/assets/review-5-color.jpg";
import review1Motion from "@/assets/review-1-motion.mp4.asset.json";
import review2Motion from "@/assets/review-2-motion.mp4.asset.json";
import review3Motion from "@/assets/review-3-motion.mp4.asset.json";
import review4Motion from "@/assets/review-4-motion.mp4.asset.json";
import review5Motion from "@/assets/review-5-motion.mp4.asset.json";
import review6Motion from "@/assets/review-6-motion.mp4.asset.json";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Watch Your Photo Come Alive Again — PureMotion" },
      { name: "description", content: "Restore meaningful memories in seconds with cinematic AI motion. 18,000+ happy customers." },
    ],
  }),
  component: PricingPage,
});

type Plan = {
  id: string;
  name: string;
  desc: string;
  price: string;
  oldPrice: string | null;
  unit: string;
  badge: string | null;
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter Package",
    desc: "4 memories every week",
    price: "$2.49",
    oldPrice: null,
    unit: "per memory",
    badge: null,
  },
  {
    id: "family",
    name: "Family Package",
    desc: "15 memories every 2 weeks",
    price: "$1.29",
    oldPrice: "$3.23",
    unit: "per memory",
    badge: "Most Popular · Save 60%",
  },
  {
    id: "premium",
    name: "Premium Package",
    desc: "30 memories every month",
    price: "$0.99",
    oldPrice: "$1.98",
    unit: "per memory",
    badge: "Best Value",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "London, UK",
    avatar: personSarah,
    text: "Seeing my grandfather smile and move again after 40 years… I cried instantly. It felt like a moment I never thought I’d get back.",
    before: review1,
    after: review1Color,
    video: review1Motion.url,
  },
  {
    name: "Marco D.",
    location: "Florence, Italy",
    avatar: personMarco,
    text: "When the photo of my grandparents came alive, I literally gasped. PureMotion created a moment I didn’t know I needed.",
    before: review2,
    after: review2Color,
    video: review2Motion.url,
  },
  {
    name: "Hannah P.",
    location: "Sydney, Australia",
    avatar: personHannah,
    text: "I animated an old photo of my childhood dog, Max. Seeing him move again brought back a memory I thought I’d lost forever.",
    before: review3,
    after: review3,
    video: review3Motion.url,
  },
  {
    name: "Elise D.",
    location: "Paris, France",
    avatar: personElise,
    text: "I surprised my friend with this to bring their family photo to life. We didn’t expect such an emotional reaction.",
    before: review4,
    after: review4,
    video: review4Motion.url,
  },
  {
    name: "Jonas K.",
    location: "Munich, Germany",
    avatar: personJonas,
    text: "I uploaded a faded childhood photo, and PureMotion made it feel real again. I didn’t expect to get this emotional.",
    before: review5,
    after: review5Color,
    video: review5Motion.url,
  },
  {
    name: "Liam G.",
    location: "Toronto, Canada",
    avatar: personLiam,
    text: "The realism is unbelievable. PureMotion turned a simple photo into something my family will treasure forever.",
    before: review6,
    after: review6,
    video: review6Motion.url,
  },
];

function PricingPage() {
  const [selected, setSelected] = useState("family");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const selectedPlan = plans.find((p) => p.id === selected) ?? plans[1];
  const checkoutPlan = {
    id: selectedPlan.id,
    name: selectedPlan.name,
    price: selectedPlan.id === "family" ? "A$14.85" : selectedPlan.id === "premium" ? "A$20.70" : "A$7.96",
    cadence: selectedPlan.id === "premium" ? "every month" : selectedPlan.id === "family" ? "every 14 days" : "every week",
  };
  const choosePlan = (id: string) => {
    setSelected(id);
    setCheckoutOpen(true);
  };
  const openCheckout = () => setCheckoutOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <TrustBar />
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-center px-5 sm:h-16 sm:px-8">
          <img src={pmLogo} alt="PureMotion" className="h-7 w-auto sm:h-8" />
        </div>
      </header>

      {/* ============ COMPACT PRICING HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-warm-glow pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-5 pt-5 pb-6 text-center sm:px-8 sm:pt-8 sm:pb-8">
          {/* Trust pill */}
          <div className="flex justify-center fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E8D9B8] bg-card/85 px-3 py-1 shadow-[0_8px_24px_-12px_rgba(139,106,43,0.25)] backdrop-blur-sm">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#C9A227] text-[#C9A227]" />
                ))}
              </span>
              <span className="text-[11px] font-semibold text-foreground">
                Trusted by <span className="text-[#8B6A2B]">18,000+</span> families
              </span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="mx-auto mt-4 max-w-2xl font-serif text-[1.75rem] leading-[1.1] text-balance sm:text-4xl lg:text-[2.75rem] fade-up">
            Your Memories Are Ready To{" "}
            <span className="italic text-gradient-gold">Come Alive</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-2.5 max-w-lg text-[14px] text-muted-foreground text-balance sm:text-base fade-up">
            Select the perfect package and start restoring your cherished moments in seconds.
          </p>

          {/* CTA */}
          <div className="mt-5 flex justify-center fade-up">
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
          <h2 className="font-serif text-2xl text-balance sm:text-3xl">How It Works</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { icon: Check, title: "Choose your plan", desc: "Pick the package that fits you." },
            { icon: CreditCard, title: "Secure checkout", desc: "Encrypted Stripe payment." },
            { icon: Download, title: "Access & download", desc: "Your memory, ready in minutes." },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-[0_10px_30px_-18px_rgba(139,106,43,0.3)] transition-all hover:shadow-[0_18px_40px_-18px_rgba(139,106,43,0.45)] sm:flex-col sm:text-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground shadow-soft">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Step {i + 1}</p>
                <h3 className="font-serif text-lg">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ AI MEMORIES SHOWCASE ============ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <h2 className="font-serif text-3xl leading-[1.1] text-[#2B2118] text-balance sm:text-5xl lg:text-[3.25rem]">
            See Memories <span className="italic text-[#8B6A2B]">Come Back To Life</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#5A4A36]/80 sm:text-base">
            Real people. Real moments. Beautifully brought back with AI.
          </p>
          <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#8B6A2B]/50 to-transparent" />
        </div>

        <div className="marquee-pause mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="animate-marquee flex gap-6 px-5 sm:gap-8">
            {(() => {
              const items = [
                { before: wedding, video: weddingMotion.url, title: "1980s couple memory", bw: true },
                { before: grandfather, video: grandfatherMotion.url, title: "Mother & daughter hug", bw: false },
                { before: pet, video: petMotion.url, title: "Dog playing with toy", bw: false },
                { before: elder, video: elderMotion.url, title: "Grandparent smiling", bw: true },
                { before: fatherLaughing, video: fatherMotion.url, title: "Father laughing", bw: false },
                { before: childBubbles, video: childBubblesMotion.url, title: "Childhood memory", bw: false },
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
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2B2118]/85 text-white shadow-soft backdrop-blur-sm">
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
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[personSarah, personMarco, personHannah, personElise, personJonas, personLiam].map((src, i) => (
                <div
                  key={i}
                  className="h-9 w-9 overflow-hidden rounded-full border-2 border-[#F8F5EF] shadow-soft"
                >
                  <img src={src} alt="" loading="lazy" width={512} height={512} className="h-full w-full object-cover" />
                </div>
              ))}
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





      {/* ============ PRICING ============ */}
      <section id="plans" className="mx-auto max-w-3xl scroll-mt-24 px-5 pb-12 sm:px-8 sm:pb-16">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl text-balance sm:text-4xl">Choose your memory plan</h2>
        </div>

        <div className="flex flex-col gap-5">
          {plans.map((p) => {
            const isSelected = selected === p.id;
            const isFamily = p.id === "family";
            return (
              <div key={p.id} className="relative">
                {p.badge && (
                  <span
                    className={`absolute -top-3 right-6 z-10 whitespace-nowrap rounded-full px-4 py-1 text-[11px] font-semibold shadow-soft ${
                      isFamily ? "bg-[#F2C94C] text-[#2B2118]" : "bg-success text-foreground"
                    }`}
                  >
                    {p.badge}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setSelected(p.id)}
                  className={`flex w-full items-center justify-between gap-4 rounded-2xl bg-card px-6 py-5 text-left transition-all sm:px-8 sm:py-6 ${
                    isSelected
                      ? "border-2 border-[#8B6A2B] shadow-[0_20px_50px_-20px_rgba(139,106,43,0.45)]"
                      : "border border-border shadow-soft hover:border-[#8B6A2B]/50"
                  }`}
                >
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl">{p.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{p.desc}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="flex items-baseline justify-end gap-2">
                      {p.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">{p.oldPrice}</span>
                      )}
                      <span className="font-serif text-2xl text-foreground sm:text-3xl">{p.price}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{p.unit}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Master CTA */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            onClick={openCheckout}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8B6A2B] px-8 py-5 font-serif text-2xl text-white shadow-[0_18px_40px_-12px_rgba(139,106,43,0.55)] transition-all hover:bg-[#74591F] sm:text-3xl"
          >
            Get Started Now
          </button>
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-success">
              <Check className="h-2.5 w-2.5 text-foreground" />
            </span>
            Secure checkout
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(["visa", "mastercard", "amex", "applepay", "googlepay"] as const).map((n) => (
              <PaymentIcon key={n} name={n} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
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

      {/* ============ WHY CHOOSE PUREMOTION ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="text-center">
          <h2 className="font-serif text-3xl sm:text-4xl">
            Why Choose <span className="text-gradient-gold italic">PureMotion</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">Powerful features. Simple experience.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Generate videos in under 60 seconds with our optimized AI processing." },
            { icon: Lock, title: "Privacy First", desc: "Your photos are encrypted and automatically deleted after processing." },
            { icon: Sparkles, title: "Style Control", desc: "Choose from cinematic, nostalgic, or custom motion styles." },
            { icon: Heart, title: "Emotional Impact", desc: "Our AI understands context to create meaningful motion." },
            { icon: ImageIcon, title: "Restore Old Photos", desc: "Works beautifully with vintage and damaged photographs." },
            { icon: Smartphone, title: "Works Anywhere", desc: "Create videos on any device — desktop, tablet, or mobile." },
          ].map((it) => (
            <div key={it.title} className="group flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-soft">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <it.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl">{it.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS — Loved by Thousands ============ */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">Testimonials</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl">Loved by Thousands</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Real restored memories, real reactions, and emotional moments families keep replaying.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Trusted by over <span className="font-semibold text-[#8B6A2B]">18,000+</span> users worldwide
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <article key={t.name} className="group flex flex-col overflow-hidden rounded-[28px] border border-[#E8D9B8]/80 bg-background shadow-[0_22px_55px_-34px_rgba(43,33,24,0.5)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-38px_rgba(43,33,24,0.62)] fade-up" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="relative bg-[#2B2118] p-3">
                  <div className="relative grid grid-cols-2 gap-2">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#2B2118]">
                      <img src={t.before} alt={`${t.name} original memory`} loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:brightness-110" />
                    </div>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#2B2118]">
                      <video
                        src={t.video}
                        poster={t.after}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] animate-soft-zoom"
                      />
                      <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/55 group-hover:text-white">
                        <Play className="h-3.5 w-3.5 translate-x-[1px] fill-white/90 transition-all duration-300 group-hover:fill-white group-hover:scale-110" />
                      </span>
                    </div>
                    <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A227] to-[#8B6A2B] text-white shadow-[0_8px_20px_rgba(0,0,0,0.45)] ring-4 ring-[#2B2118] animate-gentle-pulse">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">“{t.text}”</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    <img src={t.avatar} alt={t.name} loading="lazy" className="h-10 w-10 rounded-full object-cover shadow-soft ring-2 ring-background" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-tight">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-success">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified user
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} plan={checkoutPlan} />
    </div>
  );
}

function PaymentIcon({ name }: { name: "visa" | "mastercard" | "amex" | "applepay" | "googlepay" }) {
  const wrap = "inline-flex h-7 w-12 items-center justify-center rounded-md border border-border bg-white shadow-sm";
  switch (name) {
    case "visa":
      return (
        <span className={wrap} aria-label="Visa">
          <svg viewBox="0 0 48 16" className="h-3.5" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="13" fontFamily="Helvetica, Arial, sans-serif" fontWeight="900" fontStyle="italic" fontSize="14" fill="#1A1F71">VISA</text>
          </svg>
        </span>
      );
    case "mastercard":
      return (
        <span className={wrap} aria-label="Mastercard">
          <svg viewBox="0 0 32 20" className="h-5" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="10" r="7" fill="#EB001B" />
            <circle cx="20" cy="10" r="7" fill="#F79E1B" />
            <path d="M16 5.2a6.98 6.98 0 0 0 0 9.6 6.98 6.98 0 0 0 0-9.6z" fill="#FF5F00" />
          </svg>
        </span>
      );
    case "amex":
      return (
        <span className={`${wrap} bg-[#1F72CD]`} aria-label="American Express">
          <svg viewBox="0 0 48 16" className="h-3" xmlns="http://www.w3.org/2000/svg">
            <text x="2" y="12" fontFamily="Helvetica, Arial, sans-serif" fontWeight="900" fontSize="11" fill="#fff">AMEX</text>
          </svg>
        </span>
      );
    case "applepay":
      return (
        <span className={wrap} aria-label="Apple Pay">
          <svg viewBox="0 0 60 24" className="h-4" xmlns="http://www.w3.org/2000/svg" fill="#000">
            <path d="M10.5 6.4c.6-.7 1-1.7 1-2.6-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.9 2.5.9.1 1.8-.4 2.3-1.1zm1 1.3c-1.3-.1-2.4.8-3 .8s-1.6-.7-2.6-.7c-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .6 1 1.4 2.1 2.5 2.1 1 0 1.4-.7 2.6-.7s1.5.7 2.6.7c1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4 0 0-2.1-.8-2.1-3.2 0-2 1.6-2.9 1.7-3-1-1.4-2.4-1.6-3-1.6z"/>
            <text x="18" y="17" fontFamily="-apple-system, Helvetica, Arial, sans-serif" fontWeight="600" fontSize="11">Pay</text>
          </svg>
        </span>
      );
    case "googlepay":
      return (
        <span className={wrap} aria-label="Google Pay">
          <svg viewBox="0 0 64 24" className="h-4" xmlns="http://www.w3.org/2000/svg">
            <text x="2" y="17" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="13">
              <tspan fill="#4285F4">G</tspan><tspan fill="#EA4335">o</tspan><tspan fill="#FBBC04">o</tspan><tspan fill="#4285F4">g</tspan><tspan fill="#34A853">l</tspan><tspan fill="#EA4335">e</tspan>
            </text>
            <text x="40" y="17" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="11" fill="#5F6368">Pay</text>
          </svg>
        </span>
      );
  }
}
