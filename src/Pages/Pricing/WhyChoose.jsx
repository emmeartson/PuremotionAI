import React from "react";
import { Zap, Lock, Sparkles, Heart, Image as ImageIcon, Smartphone } from "lucide-react";

function WhyChoose() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2118]">
          Why Choose <span className="bg-gradient-to-br from-[#C9A227] to-[#8B6A2B] bg-clip-text text-transparent italic">PureMotion</span>
        </h2>
        <p className="mt-2 text-sm text-[#5A4A36]/80 sm:text-base">Powerful features. Simple experience.</p>
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
          <div key={it.title} className="group flex gap-4 rounded-2xl border border-[#E8D9B8]/80 bg-white p-6 transition-all hover:border-[#8B6A2B]/40 hover:shadow-[0_8px_30px_rgb(139,106,43,0.12)]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8B6A2B]/10 text-[#8B6A2B] transition-colors group-hover:bg-[#8B6A2B] group-hover:text-white">
              <it.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-[#2B2118]">{it.title}</h3>
              <p className="mt-1.5 text-sm text-[#5A4A36]/80">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;
