import React from "react";

function Result() {
  return (
    <div
      className="max-w-7xl rounded-3xl overflow-hidden my-10 justify-center mx-2 sm:mx-4 md:mx-auto"
      style={{
        backgroundImage: "url(/resultbg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: 420,
      }}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center px-4 sm:px-8 md:px-24 py-10 sm:py-16 md:py-24">
        <h2
          className="text-white text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 text-center md:text-left w-full max-w-7xl"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
        >
          <span className="block">Results That Speak for</span>
          <span className="block text-[#e5d7b2]">Themselves</span>
        </h2>
        <p
          className="text-white text-base sm:text-lg md:text-xl mb-8 w-full max-w-7xl text-center md:text-left"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
        >
          Meaningful reactions, unforgettable moments,{" "}
          <br className="hidden md:block" />
          and memories brought back to life everyday
        </p>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl mt-6">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <span className="text-white text-base md:text-lg mb-1 text-center md:text-left">
              Happy Users Worldwide
            </span>
            <span className="text-3xl sm:text-4xl md:text-6xl text-white">
              18,000+
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <span className="text-white text-base md:text-lg mb-1 text-center md:text-left">
              PureMotion Videos Created Daily
            </span>
            <span className="text-3xl sm:text-4xl md:text-6xl  text-white">
              1,200+
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <span className="text-white text-base md:text-lg mb-1 text-center md:text-left">
              Satisfaction Rate
            </span>
            <span className="text-3xl sm:text-4xl md:text-6xl  text-white">
              98%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
