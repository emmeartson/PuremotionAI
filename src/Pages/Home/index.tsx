import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrustBar } from "@/components/TrustBar";
import { Star, ShieldCheck, Sparkles, Heart, Image as ImageIcon, Zap, Lock, Smartphone, ChevronDown, ArrowRight, Upload, Wand2, Download, BadgeCheck, Camera, Play } from "lucide-react";
import { useState } from "react";
import familyImg from "@/assets/family-moment.jpg";
import vintageCouple from "@/assets/vintage-couple.jpg";
import grandfather from "@/assets/grandfather.jpg";
import elderWoman from "@/assets/elder-woman.jpg";
import petImg from "@/assets/pet.jpg";
import wedding from "@/assets/wedding.jpg";
import fatherLaughing from "@/assets/father-laughing.jpg";
import childBubbles from "@/assets/child-bubbles.jpg";
import memoryFrame1 from "@/assets/memory-frames/frame-1.jpg";
import memoryFrame2 from "@/assets/memory-frames/frame-2.jpg";
import memoryFrame3 from "@/assets/memory-frames/frame-3.jpg";
import memoryFrame4 from "@/assets/memory-frames/frame-4.jpg";
import memoryColor1 from "@/assets/memory-frames/frame-1-color.jpg";
import memoryColor2 from "@/assets/memory-frames/frame-2-color.jpg";
import memoryColor3 from "@/assets/memory-frames/frame-3-color.jpg";
import memoryColor4 from "@/assets/memory-frames/frame-4-color.jpg";
import memoryVideo1 from "../../public/videos/memory-1-color.mp4.asset.json";
import memoryVideo2 from "../../public/videos/memory-2-color.mp4.asset.json";
import memoryVideo3 from "../../public/videos/memory-3-color.mp4.asset.json";
import memoryVideo4 from "../../public/videos/memory-4-color.mp4.asset.json";
import review1 from "@/assets/review-1.jpg";
import review1Color from "@/assets/review-1-color.jpg";
import review2 from "@/assets/review-2.jpg";
import review2Color from "@/assets/review-2-color.jpg";
import review3 from "@/assets/review-3.jpg";
import review3Color from "@/assets/review-3-enhanced.jpg";
import review4 from "@/assets/review-4.jpg";
import review5 from "@/assets/review-5.jpg";
import review5Color from "@/assets/review-5-color.jpg";
import review6 from "@/assets/review-6.jpg";
import review6Color from "@/assets/review-6-enhanced.jpg";
import review1Motion from "@/assets/review-1-motion.mp4.asset.json";
import review2Motion from "@/assets/review-2-motion.mp4.asset.json";
import review3Motion from "@/assets/review-3-motion.mp4.asset.json";
import review4Motion from "@/assets/review-4-motion.mp4.asset.json";
import review5Motion from "@/assets/review-5-motion.mp4.asset.json";
import review6Motion from "@/assets/review-6-motion.mp4.asset.json";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PureMotion — Every Photo Has a Story" },
      { name: "description", content: "Turn cherished photos into living memories. We gently animate and restore your most precious moments." },
      { property: "og:title", content: "PureMotion — Every Photo Has a Story" },
      { property: "og:description", content: "Turn cherished photos into living memories." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TrustBar />
      <SiteHeader />
      <Hero />
      <AsSeenIn />
      <ValueStrip />
      <Steps />
      <Testimonials />
      <WhyChoose />
      <Stats />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-glow">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="fade-up">
          <h1 className="font-serif text-5xl leading-[1.05] text-balance text-foreground sm:text-6xl lg:text-7xl">
            Every Photo Has a Story.
            <span className="block text-gradient-gold italic">We Bring It Back to Life.</span>
          </h1>

          {/* Rating pill */}
          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-border bg-cream/80 px-4 py-2 shadow-soft backdrop-blur">
            <div className="flex -space-x-2">
              {[avatar1, avatar2, avatar3].map((a, i) => (
                <div key={i} className="h-7 w-7 overflow-hidden rounded-full ring-2 ring-cream">
                  <img src={a} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">Excellent</span>
            <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />)}</span>
            <span className="text-sm font-semibold text-foreground">4.8</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">2,487</span> Happy Users</span>
          </div>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Turn your cherished photos into living memories. PureMotion gently reanimates the moments you love, bringing you closer to the stories behind every image.
          </p>

          <div className="mt-8">
            <Link to="/theme" className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-medium">
              Bring My Photo To Life
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" />
            <span className="font-semibold text-foreground">100% Private</span> — Encrypted, Secure & Always Yours.
          </p>
        </div>

        {/* Right: small B&W "A Precious Photo" card overlapping larger colour "Brought Gently Back To Life" card */}
        <div className="relative fade-in lg:pl-2">
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-10 -right-6 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />

          <div className="relative mx-auto w-full max-w-xl pb-8 pl-0 pr-0 pt-10">
            {/* Large colour card — bottom right */}
            <div className="relative ml-auto w-[78%] rounded-3xl bg-cream p-3 shadow-elegant ring-1 ring-border">
              <div className="grid aspect-square grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
                {[
                  { video: memoryVideo1.url, poster: memoryColor1 },
                  { video: memoryVideo2.url, poster: memoryColor2 },
                  { video: memoryVideo3.url, poster: memoryColor3 },
                  { video: memoryVideo4.url, poster: memoryColor4 },
                ].map((v, i) => (
                  <video
                    key={i}
                    src={v.video}
                    poster={v.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="h-full w-full rounded-lg object-cover"
                  />
                ))}
              </div>
              <div className="absolute -bottom-3 right-5 inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-elegant ring-2 ring-cream">
                Brought Gently Back To Life <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
            </div>

            {/* Small grayscale card — top left, only corner overlap */}
            <div className="absolute left-0 top-0 z-10 w-[40%] rotate-[-5deg] rounded-2xl bg-cream p-2 shadow-elegant ring-1 ring-border">
              <div className="grid aspect-square grid-cols-2 grid-rows-2 gap-1.5 overflow-hidden rounded-xl">
                {[memoryFrame1, memoryFrame2, memoryFrame3, memoryFrame4].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Memory still ${i + 1}`}
                    width={400}
                    height={400}
                    className="h-full w-full rounded-md object-cover grayscale sepia-[0.1]"
                  />
                ))}
              </div>
              <div className="absolute -bottom-3 left-2 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background shadow-elegant ring-2 ring-cream">
                A Precious Photo <Camera className="h-3 w-3 text-primary" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function AsSeenIn() {
  const items = ["The New York Times", "BBC", "Healthline", "Business Insider", "Forbes"];
  return (
    <section className="border-y border-border bg-cream py-10">
      <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">As seen in</p>
      <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 text-foreground/60">
        {items.map((i) => <span key={i} className="font-serif text-lg italic">{i}</span>)}
      </div>
    </section>
  );
}

function ValueStrip() {
  const items = [
    "Only photos add to your memory journey",
    "Create a video for your most meaningful moments",
    "Designed for everyone — no tech skill needed",
  ];
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-3">
        {items.map((t, i) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
              <Heart className="h-3.5 w-3.5" />
            </div>
            <p>{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    { icon: Upload, badge: "Step 1", title: "Upload Your Photo", desc: "Simply choose a special photo — a grandparent, a child, a wedding, a beloved pet. We accept all common formats.", img: elderWoman },
    { icon: Wand2, badge: "Step 2", title: "Select Your Animation Style", desc: "Pick from cinematic motion styles tailored to your memory. AI gently brings every face and moment to life.", img: vintageCouple },
    { icon: Download, badge: "Step 3", title: "Download & Share the Joy", desc: "In moments, receive a beautifully animated video ready to share with family, friends, and loved ones.", img: familyImg },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">How it works</p>
        <h2 className="mt-3 font-serif text-4xl text-balance sm:text-5xl">Create Your Memory Video in 3 Easy Steps</h2>
        <p className="mt-4 text-muted-foreground">A gentle, guided experience — no learning curve, no overwhelm.</p>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant ${i === 1 ? "md:mt-10" : ""}`}>
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">{s.badge}</span>
            <div className="mt-5 overflow-hidden rounded-2xl">
              <img src={s.img} alt={s.title} loading="lazy" width={1024} height={1280} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            <div className="mt-5 flex items-center gap-2 text-xs text-primary">
              <s.icon className="h-4 w-4" />
              <span>Takes less than a minute</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/theme" className="btn-gold inline-block rounded-full px-7 py-3.5 text-sm font-medium">Create My Memory Video</Link>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Sarah M.", loc: "London, UK", avatar: avatar1,
    text: "Seeing my grandfather smile and move again after 40 years… I cried instantly. It felt like a moment I never thought I'd get back.",
    before: review1, after: review1Color, video: review1Motion.url,
  },
  {
    name: "Marco D.", loc: "Florence, Italy", avatar: avatar2,
    text: "When the photo of my grandparents came alive, I literally gasped. PureMotion created a moment I didn't know I needed.",
    before: review2, after: review2Color, video: review2Motion.url,
  },
  {
    name: "Hannah P.", loc: "Sydney, Australia", avatar: avatar3,
    text: "I animated an old photo of my childhood dog, Max. Seeing him move again, that little head tilt, his gentle expression, it brought me to tears. It felt like having a moment with him again.",
    before: review3, after: review3Color, video: review3Motion.url,
  },
  {
    name: "Elise D.", loc: "Paris, France", avatar: avatar4,
    text: "I surprised my friend with this to bring their family photo to life. We didn't expect such an emotional reaction.",
    before: review4, after: review4, video: review4Motion.url,
  },
  {
    name: "Jonas K.", loc: "Munich, Germany", avatar: avatar5,
    text: "I uploaded a faded childhood photo, and PureMotion made it feel real again. I didn't expect to get this emotional.",
    before: review5, after: review5Color, video: review5Motion.url,
  },
  {
    name: "Liam G.", loc: "Toronto, Canada", avatar: avatar6,
    text: "The realism is unbelievable. PureMotion turned a simple photo into something my family will treasure forever.",
    before: review6, after: review6Color, video: review6Motion.url,
  },
];


function Testimonials() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">Testimonials</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Loved by Thousands</h2>
          <p className="mt-4 text-muted-foreground">
            Thousands have already brought their treasured photos to life with gentle, lifelike motion — now it's your turn.
          </p>
          <p className="mt-2 text-sm text-primary/80">Trusted by over <span className="font-semibold">18,000+</span> users worldwide</p>
        </div>
        <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article key={t.name} className="flex flex-col overflow-hidden rounded-[28px] border border-[#E8D9B8]/80 bg-background shadow-[0_22px_55px_-34px_rgba(43,33,24,0.5)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-38px_rgba(43,33,24,0.62)]">
              <div className="relative bg-[#2B2118] p-3">
                <div className="relative grid grid-cols-2 gap-2">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#2B2118]">
                    <img src={t.before} alt={`${t.name} original memory`} loading="lazy" className="h-full w-full object-cover grayscale" />
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
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
                      <Play className="h-3.5 w-3.5 translate-x-[1px] fill-white" />
                    </span>
                  </div>
                  <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A227] to-[#8B6A2B] text-white shadow-[0_8px_20px_rgba(0,0,0,0.45)] ring-4 ring-[#2B2118]">
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
                    <p className="text-xs text-muted-foreground">{t.loc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-success">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified user
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/theme" className="btn-gold inline-block rounded-full px-7 py-3.5 text-sm font-medium">See What My Photo Could Look Like</Link>
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const items = [
    { icon: Zap, title: "Lightning Fast", desc: "Generate videos in under 60 seconds with our optimized AI pipeline." },
    { icon: Lock, title: "Privacy First", desc: "Your photos are encrypted and automatically deleted after processing." },
    { icon: Sparkles, title: "Style Control", desc: "Choose from cinematic, nostalgic, or custom motion styles." },
    { icon: Heart, title: "Emotional Impact", desc: "Our AI understands context to create meaningful motion." },
    { icon: ImageIcon, title: "Restore Old Photos", desc: "Works beautifully with vintage and damaged photographs." },
    { icon: Smartphone, title: "Works Anywhere", desc: "Create videos on any device — desktop, tablet, or mobile." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="text-center">
        <h2 className="font-serif text-4xl sm:text-5xl">Why Choose <span className="text-gradient-gold italic">PureMotion</span></h2>
        <p className="mt-3 text-muted-foreground">Powerful features. Simple experience.</p>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="group flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-soft">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <it.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl">{it.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/theme" className="btn-gold inline-block rounded-full px-7 py-3.5 text-sm font-medium">Start My Memory</Link>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
      <div className="relative overflow-hidden rounded-3xl shadow-elegant">
        <img src={familyImg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="relative bg-gradient-to-br from-foreground/80 via-foreground/70 to-primary-dark/80 p-10 text-primary-foreground sm:p-16">
          <h2 className="max-w-2xl font-serif text-4xl sm:text-5xl">Results That Speak for Themselves</h2>
          <p className="mt-4 max-w-xl text-primary-foreground/80">Moving heart reactions, unexpected moments, and memories brought back to life every day.</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { n: "18,000+", l: "Happy users worldwide" },
              { n: "1,200+", l: "PureMotion videos created daily" },
              { n: "98%", l: "Satisfaction rate" },
            ].map((s) => (
              <div key={s.n}>
                <p className="font-serif text-5xl">{s.n}</p>
                <p className="mt-1 text-sm uppercase tracking-wider text-primary-foreground/70">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Do I need any tech skill to use it?", a: "Not at all. PureMotion is designed for everyone. If you can upload a photo, you can create a beautiful memory video in under a minute." },
  { q: "How long does it take?", a: "Most videos finish in under 60 seconds. You'll be amazed how fast and effortless it feels." },
  { q: "Can I choose the animation style?", a: "Yes. Pick from 8 cinematic styles — from gentle sway to vintage film to joyful pulse — each tuned for emotional impact." },
  { q: "Is my photo safe?", a: "Always. Uploads are encrypted, used only to create your video, and automatically deleted after processing." },
  { q: "Can I animate old photos?", a: "Yes. PureMotion is especially loved for restoring and animating vintage and damaged photographs." },
  { q: "Will old photos work?", a: "Absolutely — black and white, faded, or scratched photos all become beautifully alive." },
  { q: "Is it compatible with all devices?", a: "Yes — desktop, tablet, and mobile. Most of our users create on their phone in seconds." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="text-center font-serif text-4xl sm:text-5xl">Frequently Asked Questions</h2>
        <p className="mt-3 text-center text-muted-foreground">Gentle answers to help you feel confident.</p>
        <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-background shadow-soft">
          {faqs.map((f, i) => (
            <button key={f.q} onClick={() => setOpen(open === i ? null : i)} className="block w-full px-6 py-5 text-left">
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium text-foreground">{f.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
              </div>
              {open === i && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
            </button>
          ))}
        </div>
        <div className="mt-10 rounded-3xl bg-primary/10 p-8 text-center">
          <h3 className="font-serif text-2xl">Have more questions?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Our team is happy to help — most replies arrive within an hour.</p>
          <button className="mt-5 rounded-full border border-primary bg-background px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Contact Us</button>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-background py-20 text-center sm:py-28">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="font-serif text-4xl text-balance sm:text-5xl">There's a story hidden in every old photo.</h2>
        <p className="mt-4 text-muted-foreground">Want to see yours revived?</p>
        <Link to="/theme" className="btn-gold mt-8 inline-block rounded-full px-9 py-4 text-base font-medium">Bring My Memory Back To Life</Link>
      </div>
    </section>
  );
}
