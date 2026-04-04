import React, { useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  Camera,
  Sparkles,
  Wind,
  History,
  Ghost,
  Square,
  Trash2,
} from "lucide-react";
import FinalResult from "./FinalResult";

// --- MOCK DATA ---
const momentsData = [
  {
    id: 1,
    title: "Playful motion",
    imageUrl: "/moment-1.png",
  },
  {
    id: 2,
    title: "Playful motion",
    imageUrl: "/moment-2.jpg",
  },
  {
    id: 3,
    title: "Playful motion",
    imageUrl: "/moment-3.jpg",
  },
  {
    id: 4,
    title: "Playful motion",
    imageUrl: "/moment-4.jpg",
  },
];

const stylesData = [
  {
    id: "match",
    name: "Memory Match Motion",
    desc: "AI analyzes your photo and picks the perfect animation style automatically.",
    icon: <Sparkles className="text-yellow-500" size={18} />,
  },
  {
    id: "sway",
    name: "Gentle Sway",
    desc: "Subtle movement that breathes life into portraits with soft, natural motion.",
    icon: <Wind className="text-green-500" size={18} />,
  },
  {
    id: "vintage",
    name: "Vintage Film",
    desc: "Classic cinema feel with subtle grain and nostalgic motion effects.",
    icon: <History className="text-blue-500" size={18} />,
  },
  {
    id: "float",
    name: "Dreamy Float",
    desc: "Ethereal, cloud-like movement perfect for scenic and landscape memories.",
    icon: <Ghost className="text-gray-400" size={18} />,
  },
];

// --- SUB-COMPONENTS ---

const UploadBox = ({ onNext }) => (
  <div className="w-full sm:flex-1 border-2 border-dashed border-[#e5d5bc] rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col items-center justify-center bg-white/50 transition-all hover:bg-white hover:border-[#7c602e]/30 group">
    <div className="bg-gray-100 p-4 rounded-xl mb-4 text-gray-400 group-hover:scale-110 transition-transform">
      <Camera size={32} />
    </div>
    <p className="text-sm font-bold text-gray-700 mb-1">
      Drag & drop your photo here
    </p>
    <p className="text-xs text-gray-400 mb-6 font-medium">Or</p>
    <button
      onClick={onNext}
      className="bg-[#7c602e] text-white px-10 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-[#7c602e]/20 active:scale-95 transition-all"
    >
      Browse
    </button>
  </div>
);

// --- MAIN PAGE COMPONENT ---

export const MomentsGallery = () => {
  const [view, setView] = useState("gallery"); // gallery | picker | config
  const [pickerType, setPickerType] = useState("single");
  const [selectedLength, setSelectedLength] = useState("5s");
  const [selectedStyle, setSelectedStyle] = useState("match");

  // Logic: IDs 1 & 3 trigger Single picker, others trigger Double
  const handleStartUpload = (id) => {
    const type = id === 1 || id === 3 ? "single" : "double";
    setPickerType(type);
    setView("picker");
  };

  const handleBack = () => {
    if (view === "picker") setView("gallery");
    if (view === "config") setView("picker");
    if (view === "final_result") setView("config");
  };

  // 1. GALLERY VIEW
  if (view === "gallery") {
    return (
      <div className="flex-1 bg-[#fdfcfb] p-4 sm:p-6 md:p-10 animate-in fade-in duration-500 overflow-y-auto">
        <div className="max-w-[30rem] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
          {momentsData.map((moment) => (
            <div
              key={moment.id}
              onClick={() => handleStartUpload(moment.id)}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-[2.5rem]">
                <img
                  src={moment.imageUrl}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={moment.title}
                />
              </div>
              <div className="px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-800 tracking-tight">
                  {moment.title}
                </span>
                <div className="bg-gray-50 p-2 rounded-full text-gray-400 group-hover:text-[#7c602e] group-hover:bg-[#f2ede4] transition-all">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. PICKER VIEW (Single or Double)
  if (view === "picker") {
    return (
      <div className="flex-1 bg-[#fdfcfb] p-4 sm:p-8 md:p-12 animate-in slide-in-from-right-4 duration-500">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-8 sm:mb-12 hover:text-gray-900 transition-colors uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back
        </button>

        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 min-h-[unset] sm:min-h-[450px]">
          <UploadBox onNext={() => setView("config")} />
          {pickerType === "double" && (
            <>
              <div className="text-gray-300 font-bold text-2xl flex items-center justify-center">
                +
              </div>
              <UploadBox onNext={() => setView("config")} />
            </>
          )}
        </div>
      </div>
    );
  }

  // 3. CONFIGURATION VIEW
  if (view === "config") {
    return (
      <div className="flex-1 bg-[#fdfcfb] p-4 sm:p-8 md:p-12 overflow-y-auto animate-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-6 sm:mb-10 hover:text-gray-900 transition-colors uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back
        </button>

        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Selected Image Card */}
          <div className="bg-white border-gray-100 rounded-[2.5rem] p-5 sm:p-6 shadow-sm w-full max-w-sm mb-8 sm:mb-12 border border-black/5">
            <p className="text-center text-sm font-bold text-gray-900 mb-5">
              Selected image
            </p>
            <div className="aspect-square rounded-[2rem] overflow-hidden mb-5 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
                className="w-full h-full object-cover"
                alt="Selected"
              />
            </div>
            <button className="w-full flex items-center justify-center gap-2 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors">
              <Trash2 size={14} /> Remove
            </button>
          </div>

          {/* Moment Length Toggle */}
          <div className="w-full mb-8 sm:mb-12 text-center">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-5">
              Select moment length
            </p>
            <div className="bg-white p-1 rounded-2xl sm:rounded-full border border-gray-100 inline-flex flex-col sm:flex-row shadow-sm w-full sm:w-auto">
              <button
                onClick={() => setSelectedLength("5s")}
                className={`px-6 sm:px-12 py-3 rounded-xl sm:rounded-full text-xs font-bold transition-all ${
                  selectedLength === "5s"
                    ? "bg-[#7c602e] text-white shadow-md"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                4 seconds
              </button>
              <button
                onClick={() => setSelectedLength("10s")}
                className={`px-6 sm:px-12 py-3 rounded-xl sm:rounded-full text-xs font-bold transition-all ${
                  selectedLength === "10s"
                    ? "bg-[#7c602e] text-white shadow-md"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                8 seconds (1+ credit)
              </button>
            </div>
          </div>

          {/* Style Selection Grid */}
          <div className="w-full mb-12">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 px-2">
              Select style
            </p>
            <div className="space-y-4">
              {stylesData.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`bg-white p-5 rounded-2xl border cursor-pointer flex items-center gap-4 transition-all group ${
                    selectedStyle === style.id
                      ? "border-[#7c602e] ring-1 ring-[#7c602e] shadow-md"
                      : "border-gray-100 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      selectedStyle === style.id ? "bg-[#f2ede4]" : "bg-gray-50"
                    }`}
                  >
                    {style.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">
                      {style.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 leading-tight font-medium">
                      {style.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Submit Button */}
          <button
            onClick={() => setView("final_result")}
            className="w-full bg-[#7c602e] hover:bg-[#634d25] text-white py-4.5 rounded-2xl font-bold text-sm shadow-xl shadow-[#7c602e]/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 py-4"
          >
            Create your moment
          </button>
        </div>
      </div>
    );
  }

  if (view === "final_result") {
    return (
      <div className="flex-1 bg-[#fdfcfb] p-4 sm:p-8 md:p-12 overflow-y-auto animate-in fade-in duration-500">
        <FinalResult />
      </div>
    );
  }
};
