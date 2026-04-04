import React from "react";

export const StatsSection = () => (
  <section className="px-4 sm:px-6 py-10 sm:py-12">
    <div className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden min-h-[360px] sm:min-h-[400px] flex items-center justify-center text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=1200"
          className="w-full h-full object-cover grayscale brightness-50"
          alt="Families"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-4">
          Results That Speak for Themselves
        </h2>
        <p className="text-gray-200 text-xs sm:text-sm md:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto">
          Moving heart-reactions, unexpected moments, and happiness brought back
          into memories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <div className="border-t border-white/20 pt-6">
            <p className="text-4xl font-bold mb-1">18,000+</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              Happy Users Worldwide
            </p>
          </div>
          <div className="border-t border-white/20 pt-6">
            <p className="text-4xl font-bold mb-1">1,200+</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              PureMotion Videos Created Daily
            </p>
          </div>
          <div className="border-t border-white/20 pt-6">
            <p className="text-4xl font-bold mb-1">98%</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              Satisfaction Rate
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
