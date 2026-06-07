import React from "react";
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
  { video: "/memory-2-color.mp4", poster: "/frame-2.jpg" },
  { video: "/memory-3-color.mp4", poster: "/frame-3.jpg" },
  { video: "/memory-4-color.mp4", poster: "/frame-4.jpg" },
];

const memoryFrames = [
  "/frame-1.jpg",
  "/frame-2.jpg",
  "/frame-3.jpg",
  "/frame-4.jpg",
];

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-8 sm:py-10 md:py-20">
      <div className="max-w-full mx-2 sm:mx-4 md:mx-12 px-2 sm:px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="space-y-5 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-center md:text-left">
              Every Photo Has a Story.
            </h1>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[#634910] leading-tight text-center md:text-left">
              We Bring It Back to Life.
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
            <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed">
              Turn your cherished photos into living memories. PureMotion gently
              reanimates the moments you love, bringing you closer to the
              stories behind every image.
            </p>

            <div className="pt-2 sm:pt-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto hover:bg-amber-800 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base"
                onClick={() => navigate("/flashback")}
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
          <div className="relative mb-8 md:mb-0 md:mt-0 lg:pl-2">
            {/* Decorative blurred glow circles */}
            <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-10 -right-6 h-60 w-60 rounded-full bg-primary/15 blur-3xl" />

            <div className="relative mx-auto w-full max-w-xl pb-8 pt-10">
              {/* Large colour video card — bottom right */}
              <div
                className="relative ml-auto w-[78%] rounded-3xl p-3 ring-1 ring-gray-200"
                style={{
                  backgroundColor: "#FDF8F0",
                  boxShadow:
                    "0 25px 50px -12px rgba(99, 73, 16, 0.15), 0 12px 24px -8px rgba(99, 73, 16, 0.1)",
                }}
              >
                <div className="grid aspect-square grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
                  {memoryVideos.map((v, i) => (
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
                <div
                  className="absolute -bottom-3 right-5 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white ring-2"
                  style={{
                    backgroundColor: "#1a1a1a",
                    ringColor: "#FDF8F0",
                    boxShadow:
                      "0 25px 50px -12px rgba(99, 73, 16, 0.15), 0 12px 24px -8px rgba(99, 73, 16, 0.1)",
                  }}
                >
                  Brought Gently Back To Life{" "}
                  <HiSparkles className="h-3.5 w-3.5 text-primary" />
                </div>
              </div>

              {/* Small grayscale card — top left, overlapping corner */}
              <div
                className="absolute left-0 top-0 z-10 w-[40%] rounded-2xl p-2 ring-1 ring-gray-200"
                style={{
                  transform: "rotate(-5deg)",
                  backgroundColor: "#FDF8F0",
                  boxShadow:
                    "0 25px 50px -12px rgba(99, 73, 16, 0.15), 0 12px 24px -8px rgba(99, 73, 16, 0.1)",
                }}
              >
                <div className="grid aspect-square grid-cols-2 grid-rows-2 gap-1.5 overflow-hidden rounded-xl">
                  {memoryFrames.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Memory still ${i + 1}`}
                      width={400}
                      height={400}
                      className="h-full w-full rounded-md object-cover grayscale sepia"
                      style={{ filter: "grayscale(1) sepia(0.1)" }}
                    />
                  ))}
                </div>
                <div
                  className="absolute -bottom-3 left-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white ring-2"
                  style={{
                    backgroundColor: "#1a1a1a",
                    ringColor: "#FDF8F0",
                    boxShadow:
                      "0 25px 50px -12px rgba(99, 73, 16, 0.15), 0 12px 24px -8px rgba(99, 73, 16, 0.1)",
                  }}
                >
                  A Precious Photo{" "}
                  <HiCamera className="h-3 w-3 text-primary" />
                </div>
              </div>
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
              className="h-10 sm:h-16 md:h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/bbc.png"
              alt="BBC"
              className="h-10 sm:h-16 md:h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/healthline.png"
              alt="Healthline"
              className="h-10 sm:h-16 md:h-20 object-contain hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/businessinsider.jpg"
              alt="Business Insider"
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
