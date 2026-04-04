import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import Button from "../../Shared/Button";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import sarah from "../../../public/Sarah M..jpg";
import marco from "../../../public/Marco D..jpg";
import liam from "../../../public/Liam G..jpg";
import jonas from "../../../public/Jonas K..jpg";
import hannah from "../../../public/Hannah P..jpg";
import elise from "../../../public/Elise D.jpg";

const testimonials = [
  {
    before: "/loved1.gif",
    after: "/loved1.gif",
    avatar: sarah,
    stars: 5,
    text: "Seeing my grandfather smile and move again after 40 years… I cried instantly. It felt like a moment I never thought I’d get back.",
    name: "Sarah M.",
    location: "London, UK",
    verified: true,
  },
  {
    before: "/loved2.gif",
    after: "/loved2.gif",
    avatar: marco,
    stars: 5,
    text: "When the photo of my grandparents came alive, I literally gasped. PureMotion created a moment I didn’t know I needed.",
    name: "Marco D.",
    location: "Florence, Italy",
    verified: true,
  },
  {
    before: "/loved3.gif",
    after: "/loved3.gif",
    avatar: hannah,
    stars: 5,
    text: "I animated an old photo of my childhood dog, Max. Seeing him move again, that little head tilt, his gentle expression, it brought me to tears. It felt like having a moment with him again.",
    name: "Hannah P.",
    location: "Sydney, Australia",
    verified: true,
  },
  {
    before: "/loved4.gif",
    after: "/loved4.gif",
    avatar: elise,
    stars: 5,
    text: "I surprised my friend with this to bring their family photo to life. We didn’t expect such an emotional reaction.",
    name: "Elise D.",
    location: "Paris, France",
    verified: true,
  },
  {
    before: "/loved5.gif",
    after: "/loved5.gif",
    avatar: jonas,
    stars: 5,
    text: "I uploaded a faded childhood photo, and PureMotion made it feel real again. I didn’t expect to get this emotional.",
    name: "Jonas K.",
    location: "Munich, Germany",
    verified: true,
  },
  {
    before: "/loved6.gif",
    after: "/loved6.gif",
    avatar: liam,
    stars: 5,
    text: "The realism is unbelievable. PureMotion turned a simple photo into something my family will treasure forever.",
    name: "Liam G.",
    location: "Toronto, Canada",
    verified: true,
  },
];

function Testimonials() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center py-10 sm:py-14 bg-[#fff] px-4 sm:px-8 md:px-24">
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
        <span className="text-md text-gray-500 mb-2">
          Trusted by over{" "}
          <span className="text-[#7A693B] font-semibold">
            60,000+ users worldwide
          </span>
        </span>
      </div>
      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10 w-full max-w-7xl px-2 md:px-0">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-[#f2ebe2] rounded-2xl shadow p-5 flex flex-col border border-[#e5e0d6] relative min-h-[420px]"
            style={{ boxShadow: "0 2px 12px 0 rgba(60, 40, 10, 0.07)" }}
          >
            {/* Double image with arrow overlay */}
            <div className="relative mb-4 flex justify-center">
              <div className="relative">
                <img
                  src={t.after}
                  alt="after"
                  className="w-72 h-72 rounded-xl object-cover"
                />
              </div>
            </div>
            {/* Stars */}
            <div className="flex items-center mb-2 mt-2">
              {[...Array(t.stars)].map((_, idx) => (
                <BsFillStarFill
                  key={idx}
                  className="text-[#634910] text-base mr-1"
                />
              ))}
            </div>
            {/* Quote */}
            <p className="text-gray-800 text-[15px]  mb-4 flex-1">{t.text}</p>
            <div className="border-t border-[#e5e0d6] pt-3 flex items-center gap-3 mt-auto">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow"
              />
              <div>
                <span className="font-semibold text-gray-900 block leading-tight">
                  {t.name}
                </span>
                <span className="text-xs text-gray-500 block">
                  {t.location}
                </span>
                {t.verified && (
                  <span className="flex items-center text-xs text-[#1da1f2] mt-1 font-medium">
                    <MdVerified className="mr-1 text-base" /> Verified user
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
