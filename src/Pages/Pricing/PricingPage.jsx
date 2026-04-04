import React from "react";
import { PricingSection } from "./PricingSection";
import { StatsSection } from "./StatsSection";
import WhyChoose from "./WhyChoose";
import AnnouncementBar from "../../Shared/AnnouncementBar";
import Footer from "../../Shared/Footer";
import Testimonials from "./Testimonials";
import { Link } from "react-router-dom";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fdfcfb] font-sans">
      <AnnouncementBar />
      {/* Branding Header (as per design) */}
      <Link to="/">
        <header className="py-5 sm:py-8 text-center border-b border-gray-100 bg-white px-4 sm:px-0">
          <span className="text-xl sm:text-2xl font-serif font-bold text-[#7c602e] tracking-tight">
            PureMotion
          </span>
        </header>
      </Link>

      <main>
        <PricingSection />
        <StatsSection />
        <WhyChoose />
        <Testimonials />
      </main>

      {/* Simple Mini-Footer as seen in design */}
      <Footer />
    </div>
  );
}
