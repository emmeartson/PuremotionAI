import React, { useEffect, useRef, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import Button from "../../Shared/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoShieldHalfSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { HiSparkles } from "react-icons/hi2";
import { HiCamera } from "react-icons/hi2";
import trusted from "../../../public/trusted.png";

const memoryVideos = [
  { video: "/memory-1-color.mp4", poster: "/frame-1.jpg" },
  { video: "/wedding-motion.mp4", poster: "/wedding.jpg" },
  { video: "/child-bubbles-motion.mp4", poster: "/child-bubbles.jpg" },
  { video: "/pet-motion.mp4", poster: "/pet.jpg" },
];

const memoryFrames = [
  "/frame-1.jpg",
  "/wedding.jpg",
  "/child-bubbles.jpg",
  "/pet.jpg",
];

function Hero() {
  const navigate = useNavigate();
  const [videosReady, setVideosReady] = useState(false);

  // Defer video loading until after initial paint
  useEffect(() => {
    const timer = setTimeout(() => setVideosReady(true), 150);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="bg-white py-8 sm:py-10 md:py-20">
      <div className="max-w-full mx-2 sm:mx-4 md:mx-12 px-2 sm:px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="space-y-5 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-7xl  text-gray-900 leading-tight text-center md:text-left">
              Turn Any Photo Into A
            </h1>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl  text-[#634910] leading-tight text-center md:text-left italic">
              Living Memory
            </h1>

            <div className="flex flex-row flex-nowrap items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full w-full sm:w-fit border-2 border-[#E6D8C4] justify-center sm:justify-start md:justify-start overflow-x-auto sm:overflow-x-visible">
              <img
                src={trusted}
                alt="Trusted"
                className="w-20 sm:w-20 sm:h-auto"
              />
              <div className="flex items-center gap-2 sm:gap-3 flex-nowrap whitespace-nowrap justify-center sm:justify-start md:justify-start">
                <span className="text-xs sm:text-sm font-medium text-[#634910]">
                  Excellent
                </span>
                <div className="flex items-center text-amber-400 gap-0.5 sm:gap-1">
                  <BsStarFill className="text-xs text-[#634910]" />
                  <BsStarFill className="text-xs text-[#634910]" />
                  <BsStarFill className="text-xs text-[#634910]" />
                  <BsStarFill className="text-xs text-[#634910]" />
                  <BsStarFill className="text-xs text-[#634910]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#634910]">
                  4.7
                </span>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <span className="text-xs sm:text-sm text-[#634910] hidden sm:inline">
                  2,487 Happy Users
                </span>
              </div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed">
              Upload a photo and watch it come alive with realistic motion, restored detail, and emotional moments you'll treasure forever.
            </p>

            <div className="pt-2 sm:pt-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto hover:bg-amber-800 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base"
                onClick={() => navigate("/quiz")}
              >
                <span className="mr-2">Bring My Photo to Life</span>
                <span className="inline-flex items-center justify-center bg-amber-900/20 rounded-full p-1 text-sm">
                  <FaArrowRightLong className="font-bold" />
                </span>
              </Button>
            </div>
            <div className="flex items-center text-xs sm:text-base mt-2">
              <IoShieldHalfSharp className="inline-block mr-2 text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
              <p>100% Private — Encrypted, Secure & Always Yours.</p>
            </div>
          </div>

          {/* Right side: Overlapping photo/video cards */}
          <div className="relative fade-in mb-8 md:mb-0 md:mt-0 lg:pl-2">
            <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-10 -right-6 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-2.5 sm:max-w-xl sm:gap-4">
              {memoryVideos.map((v, i) => (
                <figure key={i} className="relative overflow-hidden rounded-[22px] bg-[#2B2118] p-[5px] shadow-elegant ring-1 ring-black/10 sm:rounded-[26px] sm:p-[8px]">
                  <div className="relative overflow-hidden rounded-[18px] sm:rounded-[20px]">
                    <video
                      src={videosReady ? v.video : undefined}
                      poster={v.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload={videosReady ? "auto" : "none"}
                      className="block aspect-[3/4] w-full object-cover"
                    />
                    {/* AFTER badge */}
                    <span className="absolute left-2 top-2 rounded-full bg-gradient-to-br from-[#C9A227] to-[#8B6A2B] px-2 py-[3px] text-[8.5px] font-bold uppercase tracking-[0.2em] text-white shadow-md sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
                      After
                    </span>
                    {/* BEFORE thumbnail */}
                    <div className="absolute bottom-2 left-2 overflow-hidden rounded-[8px] ring-[1.5px] ring-white shadow-[0_6px_14px_rgba(0,0,0,0.45)] sm:bottom-3 sm:left-3 sm:rounded-[10px]">
                      <div className="relative h-[50px] w-[38px] sm:h-[68px] sm:w-[52px]">
                        <img src={memoryFrames[i]} alt={`Memory before ${i + 1}`} className="absolute inset-0 h-full w-full object-cover grayscale" loading="eager" />
                        <span className="absolute inset-x-0 bottom-0 bg-black/70 py-[2px] text-center text-[6.5px] font-bold uppercase tracking-[0.14em] text-white sm:py-[3px] sm:text-[8px]">
                          Before
                        </span>
                      </div>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 md:mt-24 border-t pt-8 sm:pt-10 md:pt-12">
          <p className="text-center text-lg sm:text-md font-bold text-[#634910] mb-4 sm:mb-6 uppercase tracking-wider">
            As seen on
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            <img
              src="/newyork.png"
              alt="New York"
              loading="lazy"
              width="200"
              height="80"
              className="h-10 sm:h-16 md:h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/bbc.png"
              alt="BBC"
              loading="lazy"
              width="200"
              height="80"
              className="h-10 sm:h-16 md:h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/healthline.png"
              alt="Healthline"
              loading="lazy"
              width="200"
              height="80"
              className="h-10 sm:h-16 md:h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/businessinsider.jpg"
              alt="Business Insider"
              loading="lazy"
              width="200"
              height="80"
              className="h-10 sm:h-16 md:h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#634910] py-8 sm:py-10 md:py-16 mt-8 sm:mt-10 md:mt-12">
        <div className="max-w-full mx-2 sm:mx-4 md:mx-12 px-2 sm:px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-4">
              <img
                src="/heroicon1.png"
                alt="Fast"
                className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
              />
              <p className="text-base sm:text-lg font-semibold text-gray-900 text-center">
                Only 60 seconds to begin your memory journey
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-4">
              <img
                src="/heroicon2.png"
                alt="Love"
                className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
              />
              <p className="text-base sm:text-lg font-semibold text-gray-900 text-center">
                Created with love for your most meaningful moments
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-4">
              <img
                src="/heroicon3.png"
                alt="Easy"
                className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
              />
              <p className="text-base sm:text-lg font-semibold text-gray-900 text-center">
                Designed for everyone, no tech skills needed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
