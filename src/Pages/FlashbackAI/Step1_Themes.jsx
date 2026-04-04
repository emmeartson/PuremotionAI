import React from "react";
import { Check } from "lucide-react";
import ReliveImg from "../../../public/ReliveMoment.gif";
import Agesightimg from "../../../public/AgeShift.gif";
import CartoonImg from "../../../public/Cartoon_Moment.gif";
import PolaroidImg from "../../../public/polaroid.jpg";
import FutureBabyImg from "../../../public/TurnDrawingAlive.gif";
import WeddingImg from "../../../public/WeddingMoment.gif";
import ValentineImg from "../../../public/ValentineMoment.gif";
import DogVideoImg from "../../../public/PetMoment.gif";

const themes = [
  {
    id: "relive",
    name: "Relive",
    subtitle: "8 Styles",
    image: ReliveImg,
    badge: "New",
  },
  {
    id: "age-shift",
    name: "Age Shift",
    subtitle: "1 Default Style",
    image: Agesightimg,
  },
  {
    id: "cartoon",
    name: "Cartoon",
    subtitle: "1 Default Style",
    image: CartoonImg,
  },
  {
    id: "polaroid",
    name: "Polaroid Style Video",
    subtitle: "Upload 2 Images",
    image: PolaroidImg,
    requiresTwoImages: true,
  },
  {
    id: "drawing_to_live",
    name: "Drawing to live",
    subtitle: "1 Default Style",
    image: FutureBabyImg,
  },
  {
    id: "wedding",
    name: "Wedding",
    subtitle: "Upload 2 Images",
    image: WeddingImg,
    requiresTwoImages: true,
  },
  {
    id: "valentine",
    name: "Valentine",
    subtitle: "Upload 2 Images",
    image: ValentineImg,
    requiresTwoImages: true,
  },
  {
    id: "dog-video",
    name: "Dog Video",
    subtitle: "1 Default Style",
    image: DogVideoImg,
  },
];

export const Step1_Themes = ({ onSelectTheme }) => (
  <div className="max-w-4xl mx-auto text-center animate-in fade-in zoom-in-95 duration-500 px-2 sm:px-0">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-3 font-semibold">
      Choose Your Memory Theme
    </h1>
    <p className="text-gray-500 text-sm sm:text-base mb-8 sm:mb-12">
      Select a theme to bring your photos to life
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
      {themes.map((theme) => (
        <div
          key={theme.id}
          onClick={() => onSelectTheme(theme)}
          className="relative rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-xl group bg-gray-100 aspect-[3/4]"
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80">
            <img
              src={theme.image}
              alt={theme.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Badge */}
          {theme.badge && (
            <span className="absolute top-3 right-3 text-[10px] bg-green-500 text-white px-2.5 py-1 rounded-md font-bold uppercase tracking-tight">
              {theme.badge}
            </span>
          )}

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
            <h3 className="font-bold text-white text-lg mb-1">{theme.name}</h3>
            <p className="text-xs text-white/80 font-medium">
              {theme.subtitle}
            </p>
          </div>

          {/* Hover Arrow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-500 bg-gray-50 px-6 py-2.5 rounded-full border border-gray-100">
      <Check size={14} className="text-green-500 stroke-[3px]" /> AI-powered
      themes — bring any memory to life
    </div>
  </div>
);
