import React from "react";
import Button from "../../Shared/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Steps() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center py-8 sm:py-10 md:py-12 bg-[#faf9f5] -mt-10 sm:-mt-16 md:-mt-20">
      <div className="w-full flex flex-col items-center mb-6 sm:mb-8">
        <span className="uppercase tracking-widest text-xs sm:text-md font-bold text-[#7A693B] mb-1 sm:mb-2">
          Simple Process — Everyone Can Do It
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-1 sm:mb-2">
          Create Your Memory Video in 3 Easy Steps
        </h2>
        <p className="text-black text-xs sm:text-sm  md:text-base text-center max-w-xs sm:max-w-md md:max-w-xl">
          Create a beautiful memory video from a single photo — no skills
          needed.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 justify-center mb-6 sm:mb-10">
        {/* Step 1 */}
        <div className="bg-white rounded-2xl shadow-md p-3 sm:p-5 md:p-6 w-full sm:w-[380px] md:w-[480px] h-[420px] sm:h-[600px] md:h-[720px] flex flex-col items-center border border-gray-100">
          <div className="mb-4 sm:mb-6 -mt-8 sm:-mt-10">
            <span className="bg-[#7A693B] text-white text-xs font-semibold px-3 sm:px-4 py-1 rounded-full ">
              STEP 1
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-center">
            Upload Your Photo
          </h3>
          <p className="text-gray-600 text-sm sm:text-md mb-2 sm:mb-4 text-center">
            Simply upload any photo. We support all major image formats — old
            scans, portraits, family pictures, anything meaningful to you.
          </p>
          <img
            src="/step1.png"
            alt="Upload Your Photo"
            className="rounded-xl mb-2 sm:mb-4 w-full h-[180px] sm:h-[320px] md:h-[500px] object-contain sm:object-cover"
          />
          <div className="flex items-center gap-1 sm:gap-2 mt-auto">
            <span className="text-green-600 text-base sm:text-lg">✓</span>
            <span className="text-xs sm:text-md text-gray-700">
              Secure Upload — your photo stays private
            </span>
          </div>
        </div>
        {/* Step 2 */}
        <div className="bg-white rounded-2xl shadow-md p-3 sm:p-5 md:p-6 w-full sm:w-[380px] md:w-[480px] h-[420px] sm:h-[600px] md:h-[720px] flex flex-col items-center border border-gray-100 mt-8 sm:mt-16 md:mt-16">
          <div className="mb-4 sm:mb-6 -mt-8 sm:-mt-10">
            <span className="bg-[#7A693B] text-white text-xs font-semibold px-3 sm:px-4 py-1 rounded-full ">
              STEP 2
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-center">
            Select Your Animation Style
          </h3>
          <p className="text-gray-600 text-sm sm:text-md mb-2 sm:mb-4 text-center">
            Choose the motion style that fits your memory best — gentle
            movement, cinematic storytelling, or natural lifelike motion.
          </p>
          <img
            src="/step2.png"
            alt="Select Your Animation Style"
            className="rounded-xl mb-2 sm:mb-4 w-full h-[180px] sm:h-[320px] md:h-[500px] object-contain sm:object-cover"
          />
          <div className="flex items-center gap-1 sm:gap-2 mt-auto">
            <span className="text-green-600 text-base sm:text-lg">✓</span>
            <span className="text-xs sm:text-md text-gray-700">
              AI-guided animation styles — no guesswork
            </span>
          </div>
        </div>
        {/* Step 3 */}
        <div className="bg-white rounded-2xl shadow-md p-3 sm:p-5 md:p-6 w-full sm:w-[380px] md:w-[480px] h-[440px] sm:h-[620px] md:h-[720px] flex flex-col items-center border border-gray-100 mt-12 sm:mt-24 md:mt-32">
          <div className="mb-4 sm:mb-6 -mt-8 sm:-mt-10">
            <span className="bg-[#7A693B] text-white text-xs font-semibold px-3 sm:px-4 py-1 rounded-full">
              STEP 3
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-center">
            Download & Share the Joy
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4 text-center">
            Save your memory video and share it with the people you love most —
            these moments are meant to be remembered.
          </p>
          <img
            src="/step3.png"
            alt="Select Animation Style"
            className="rounded-xl mb-2 sm:mb-4 w-full h-[200px] sm:h-[340px] md:h-[540px] object-contain sm:object-cover"
          />
          <div className="flex items-center gap-1 sm:gap-2 mt-auto">
            <span className="text-green-600 text-base sm:text-lg">✓</span>
            <span className="text-xs text-gray-700">
              HD download included — yours forever
            </span>
          </div>
        </div>
      </div>

      <Button
        className="w-full sm:w-auto bg-[#7A693B] hover:bg-[#5c522e] text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold flex items-center gap-2 shadow-md"
        onClick={() => navigate("/flashback")}
      >
        <span className="flex items-center gap-3 sm:gap-6">
          <FaArrowRightLong /> Try Now — Bring My Photo to Life
        </span>
      </Button>
    </div>
  );
}

export default Steps;
