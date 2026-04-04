import React from "react";
import {
  Sparkles,
  Wind,
  History,
  Ghost,
  Sun,
  Check,
  Timer,
  PartyPopper,
} from "lucide-react";

const styles = [
  {
    id: 1,
    name: "Memory Match Motion",
    desc: "AI analyzes your photo and picks the perfect animation style automatically.",
    icon: (
      <img
        src="/choosestyle1.png"
        alt="Memory Match Motion"
        className="w-7 h-7 object-contain"
      />
    ),
    recommended: true,
  },
  {
    id: 2,
    name: "Gentle Sway",
    desc: "Subtle movement that breathes life into portraits with soft, natural motion.",
    icon: (
      <img
        src="/choosestyle2.png"
        alt="Gentle Sway"
        className="w-7 h-7 object-contain"
      />
    ),
  },
  {
    id: 3,
    name: "Vintage Film",
    desc: "Classic cinema feel with subtle grain and nostalgic motion effects.",
    icon: (
      <img
        src="/choosestyle3.png"
        alt="Vintage Film"
        className="w-7 h-7 object-contain"
      />
    ),
  },
  {
    id: 4,
    name: "Dreamy Float",
    desc: "Ethereal, cloud-like movement perfect for scenic and landscape memories.",
    icon: (
      <img
        src="/choosestyle4.png"
        alt="Dreamy Float"
        className="w-7 h-7 object-contain"
      />
    ),
  },
  {
    id: 5,
    name: "Warm Glow",
    desc: "Soft lighting shifts that add warmth and depth to cherished moments.",
    icon: (
      <img
        src="/choosestyle5.png"
        alt="Warm Glow"
        className="w-7 h-7 object-contain"
      />
    ),
  },
  {
    id: 6,
    name: "Nature Breeze",
    desc: "Organic motion that brings outdoor scenes to life with gentle wind effects.",
    icon: (
      <img
        src="/choosestyle6.png"
        alt="Nature Breeze"
        className="w-7 h-7 object-contain"
      />
    ),
  },
  {
    id: 7,
    name: "Timeless Fade",
    desc: "Elegant transitions that evoke the passage of time with grace.",
    icon: (
      <img
        src="/choosestyle7.png"
        alt="Timeless Fade"
        className="w-7 h-7 object-contain"
      />
    ),
  },
  {
    id: 8,
    name: "Joyful Pulse",
    desc: "Vibrant energy for celebrations and happy moments full of life.",
    icon: (
      <img
        src="/choosestyle8.png"
        alt="Joyful Pulse"
        className="w-7 h-7 object-contain"
      />
    ),
  },
];

export const Step2_Style = ({ onNext, selectedTheme }) => {
  // If theme is not 'relive', show single default style and auto-proceed
  if (selectedTheme?.id !== "relive") {
    return (
      <div className="max-w-4xl mx-auto text-center animate-in slide-in-from-bottom-4 duration-500 px-2 sm:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-3 mx-auto leading-tight font-semibold">
          {selectedTheme?.name} Theme Selected
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mb-8 sm:mb-12">
          Default style will be applied to your memory
        </p>

        <div className="max-w-md mx-auto mb-12">
          <div
            onClick={() => onNext({ styleName: "Default" })}
            className="p-8 rounded-[1.5rem] border-2 border-[#7c602e] ring-1 ring-[#7c602e] text-center cursor-pointer transition-all hover:shadow-lg bg-[#fdf5e6] relative group"
          >
            <div className="mb-4 p-3 bg-white w-fit rounded-lg mx-auto group-hover:scale-110 transition-transform">
              <img
                src={selectedTheme?.image}
                alt={selectedTheme?.name}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              {selectedTheme?.name} Style
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed font-medium mb-4">
              Optimized animation style for {selectedTheme?.name.toLowerCase()}{" "}
              memories
            </p>
            <div className="inline-flex items-center gap-2 text-[10px] bg-white text-[#7c602e] px-3 py-1.5 rounded-md font-bold uppercase tracking-tight">
              Default Style
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-500 bg-gray-50 px-6 py-2.5 rounded-full border border-gray-100">
          <Check size={14} className="text-green-500 stroke-[3px]" /> Click to
          continue
        </div>
      </div>
    );
  }

  // Show all 8 styles for 'relive' theme
  return (
    <div className="max-w-4xl mx-auto text-center animate-in slide-in-from-bottom-4 duration-500 px-2 sm:px-0">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-3 mx-auto leading-tight font-semibold">
        How would you like to bring your first
        <br className="hidden sm:block" /> photo to life?
      </h1>
      <p className="text-gray-500 text-sm sm:text-base mb-8 sm:mb-12">
        Choose an animation style that feels right for your memory
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-12">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => onNext({ styleName: style.name })}
            className={`p-6 rounded-[1.5rem] border border-gray-200 text-left cursor-pointer transition-all hover:shadow-lg bg-[#f9fafb] relative group ${
              style.recommended
                ? "border-[#7c602e] ring-1 ring-[#7c602e]"
                : "border-gray-100"
            }`}
          >
            {style.recommended && (
              <span className="absolute top-4 right-4 text-[10px] bg-[#fdf5e6] text-[#7c602e] px-2.5 py-1 rounded-md font-bold uppercase tracking-tight">
                Recommended
              </span>
            )}
            <div className="mb-4 p-2 bg-gray-50 w-fit rounded-lg group-hover:scale-110 transition-transform">
              {style.icon}
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{style.name}</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              {style.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-500 bg-gray-50 px-6 py-2.5 rounded-full border border-gray-100">
        <Check size={14} className="text-green-500 stroke-[3px]" /> AI-guided
        animation styles — no guesswork
      </div>
    </div>
  );
};
