import React from "react";
import Button from "../../Shared/Button";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Star, Play, ArrowRight, BadgeCheck } from "lucide-react";
import sarah from "../../../public/Sarah M..jpg";
import marco from "../../../public/Marco D..jpg";
import liam from "../../../public/Liam G..jpg";
import jonas from "../../../public/Jonas K..jpg";
import hannah from "../../../public/Hannah P..jpg";
import elise from "../../../public/Elise D.jpg";

const testimonials = [
  {
    before: "/review-1.jpg",
    after: "/review-1.jpg",
    video: "/review-1-motion.mp4",
    avatar: sarah,
    stars: 5,
    text: "Seeing my grandfather smile and move again after 40 years… I cried instantly. It felt like a moment I never thought I’d get back.",
    name: "Sarah M.",
    location: "London, UK",
    verified: true,
  },
  {
    before: "/review-2.jpg",
    after: "/review-2.jpg",
    video: "/review-2-motion.mp4",
    avatar: marco,
    stars: 5,
    text: "When the photo of my grandparents came alive, I literally gasped. PureMotion created a moment I didn’t know I needed.",
    name: "Marco D.",
    location: "Florence, Italy",
    verified: true,
  },
  {
    before: "/review-3.jpg",
    after: "/review-3.jpg",
    video: "/review-3-motion.mp4",
    avatar: hannah,
    stars: 5,
    text: "I animated an old photo of my childhood dog, Max. Seeing him move again, that little head tilt, his gentle expression, it brought me to tears. It felt like having a moment with him again.",
    name: "Hannah P.",
    location: "Sydney, Australia",
    verified: true,
  },
  {
    before: "/review-4.jpg",
    after: "/review-4.jpg",
    video: "/review-4-motion.mp4",
    avatar: elise,
    stars: 5,
    text: "I surprised my friend with this to bring their family photo to life. We didn’t expect such an emotional reaction.",
    name: "Elise D.",
    location: "Paris, France",
    verified: true,
  },
  {
    before: "/review-5.jpg",
    after: "/review-5.jpg",
    video: "/review-5-motion.mp4",
    avatar: jonas,
    stars: 5,
    text: "I uploaded a faded childhood photo, and PureMotion made it feel real again. I didn’t expect to get this emotional.",
    name: "Jonas K.",
    location: "Munich, Germany",
    verified: true,
  },
  {
    before: "/review-6.jpg",
    after: "/review-6.jpg",
    video: "/review-6-motion.mp4",
    avatar: liam,
    stars: 5,
    text: "The realism is unbelievable. PureMotion turned a simple photo into something my family will treasure forever.",
    name: "Liam G.",
    location: "Toronto, Canada",
    verified: true,
  },
];

function LovedThousands() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center py-10 sm:py-12 md:py-14 bg-[#fff] px-4 sm:px-8 md:px-24">
      {/* Heading */}
      <div className="w-full flex flex-col items-center mb-8">
        <span className="uppercase tracking-widest text-xs sm:text-sm font-semibold text-[#7A693B] mb-2">
          Testimonials
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
          Loved by Thousands
        </h2>
        <p className="text-gray-700 text-xs sm:text-sm md:text-base text-center max-w-2xl mb-1">
          Thousands have already brought their treasured photos to life with
          gentle, lifelike motion — now it’s your turn.
        </p>
        <span className="text-sm sm:text-md text-gray-500 mb-2">
          Trusted by over{" "}
          <span className="text-[#7A693B] font-semibold">
            60,000+ users worldwide
          </span>
        </span>
      </div>
      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 mb-10 w-full max-w-7xl px-2 md:px-0">
        {testimonials.map((t, i) => (
          <article key={i} className="flex flex-col overflow-hidden rounded-[28px] border border-[#E8D9B8]/80 bg-white shadow-[0_22px_55px_-34px_rgba(43,33,24,0.5)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-38px_rgba(43,33,24,0.62)]">
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
                {[...Array(t.stars)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-[#634910] text-[#634910]" />
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-900">“{t.text}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-gray-200 pt-4">
                <img src={t.avatar} alt={t.name} loading="lazy" className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-white" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-tight text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
                {t.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified user
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Button
        className="w-full sm:w-auto bg-[#7A693B] hover:bg-[#5c522e] text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold flex items-center gap-2 shadow-md"
        onClick={() => navigate("/flashback")}
      >
        <span className="flex items-center gap-3 sm:gap-6">
          {/* <FaArrowRight />  */}
          See What My Photo Could Look Like
        </span>
      </Button>
    </div>
  );
}

export default LovedThousands;
