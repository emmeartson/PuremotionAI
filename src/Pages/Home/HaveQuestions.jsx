import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Button from "../../Shared/Button";
import { Link } from "react-router-dom";

function HaveQuestions() {
  return (
    <div>
      <div className="w-full mt-12 flex justify-center">
        <div className="w-full max-w-5xl bg-[#eaddcf] rounded-2xl flex flex-col items-center py-8 sm:py-10 px-4 sm:px-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">
            Have more questions?
          </h3>
          <p className="text-gray-700 text-sm sm:text-base text-center mb-5 max-w-xl">
            Questions, comments, or suggestions? Simply fill in the form
            <br /> and we&apos;ll be in touch shortly.
          </p>
          <Link to="/contact">
            <button className="border border-[#7A693B] text-[#7A693B] font-semibold rounded-full px-6 py-2 flex items-center gap-2 hover:bg-[#ece3d1] transition text-base">
              Contact us <FaArrowRightLong className="ml-1" />
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col items-center py-12 sm:py-16 bg-[#faf9f5] mt-16 sm:mt-24 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
          There’s a story hidden in
          <br />
          every old photo.
        </h2>
        <div className="text-xl sm:text-2xl font-bold text-center mb-6 text-[#7A693B]">
          Want to see yours revived?
        </div>
        <Link to="/flashback">
          <button className="bg-[#eaddcf] hover:bg-[#e0d3be] text-gray-900 font-semibold rounded-full px-6 py-2 flex items-center gap-2 transition text-base border border-[#eaddcf]">
            Bring My Memory Back To Life
            {/* <FaArrowRightLong className="ml-1" /> */}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HaveQuestions;
