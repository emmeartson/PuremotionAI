import React from "react";
import { Button } from "./Button";
import AnnouncementBar from "../../Shared/AnnouncementBar";
import { useNavigate } from "react-router-dom";

export const Step_PreviewReady = ({ onNext, imageUrl }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto text-center animate-in fade-in zoom-in-95 duration-700">
      <AnnouncementBar />
      <header className="px-6 md:px-12 py-6 flex items-center justify-center mb-10 border-b border-gray-100 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-serif tracking-tight text-[#7c602e] font-bold">
          PureMotion
        </div>
      </header>
      {/* Header Headline - Note the lowercase 'your' to match image */}
      <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight font-medium">
        your First moment is ready!
      </h1>

      {/* Sub-headline */}
      <p className="text-gray-400 text-sm md:text-base mb-12 max-w-sm mx-auto leading-relaxed font-medium">
        We've brought your photo to life full of movement, emotion, and magic.
      </p>

      {/* Main Image Container */}
      <div className="relative inline-block mb-12">
        {/* Glow effect behind the image */}
        <div className="absolute inset-0 bg-black/50 blur-4xl rounded-[2.5rem] -z-10 transform scale-95"></div>

        <div className="w-[280px] h-[360px] md:w-[320px] md:h-[420px] bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden shadow-6xl border-4 border-white/10 ring-1 ring-black/5">
          {/* Using a placeholder blurred image as seen in your screenshot */}
          <img
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
            }
            alt="Your processed memory"
            className="w-full h-full object-cover opacity-80 mix-blend-screen grayscale blur-[15px]"
          />

          {/* Subtle overlay to enhance the 'portrait' look */}
          <div className="absolute inset-0 bg-gradient-to-t rounded-[2.5rem] from-black/50 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="max-w-xs mx-auto">
        <div onClick={() => navigate("/pricing")}>
          <Button className="w-full py-4 text-sm md:text-base font-semibold tracking-wide shadow-lg">
            See your live movement
          </Button>
        </div>
      </div>
    </div>
  );
};
