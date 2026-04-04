import React, { useState } from "react";
import { ChevronLeft, Sparkles, Wind, History, Ghost } from "lucide-react";

export const MomentConfig = ({ onBack }) => {
  const [length, setLength] = useState("5s");
  const [style, setStyle] = useState("match");

  const styles = [
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

  return (
    <div className="flex-1 bg-[#fdfcfb] p-4 sm:p-8 md:p-10 overflow-y-auto animate-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-xs font-bold text-gray-400 mb-6 sm:mb-8 hover:text-gray-900 uppercase tracking-widest"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Preview Card */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-5 sm:p-6 shadow-sm w-full max-w-sm mb-8 sm:mb-12">
          <p className="text-center text-sm font-bold text-gray-900 mb-5">
            Selected image
          </p>
          <div className="aspect-square rounded-[2rem] overflow-hidden mb-5 border-2 border-gray-50">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
              className="w-full h-full object-cover"
              alt="Selected"
            />
          </div>
          <button className="w-full text-xs font-bold text-rose-500 hover:underline">
            Remove
          </button>
        </div>

        {/* Length Toggle */}
        <div className="w-full mb-8 sm:mb-12 text-center">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-5">
            Select moment length
          </p>
          <div className="bg-white p-1 rounded-2xl sm:rounded-full border border-gray-100 inline-flex flex-col sm:flex-row shadow-sm w-full sm:w-auto">
            <button
              onClick={() => setLength("5s")}
              className={`px-6 sm:px-12 py-3 rounded-xl sm:rounded-full text-xs font-bold transition-all ${length === "5s" ? "bg-[#7c602e] text-white" : "text-gray-400"}`}
            >
              4 seconds
            </button>
            <button
              onClick={() => setLength("10s")}
              className={`px-6 sm:px-12 py-3 rounded-xl sm:rounded-full text-xs font-bold transition-all ${length === "10s" ? "bg-[#7c602e] text-white" : "text-gray-400"}`}
            >
              8 seconds (1+ credit)
            </button>
          </div>
        </div>

        {/* Style Selection */}
        <div className="w-full mb-12">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 px-2">
            Select style
          </p>
          <div className="space-y-4">
            {styles.map((s) => (
              <div
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`bg-white p-5 rounded-2xl border cursor-pointer flex items-center gap-4 transition-all ${style === s.id ? "border-[#7c602e] ring-1 ring-[#7c602e]" : "border-gray-100 hover:border-gray-200"}`}
              >
                <div className="p-2 bg-gray-50 rounded-lg">{s.icon}</div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">
                    {s.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 leading-tight font-medium">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-[#7c602e] text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-[#7c602e]/20 transition-all active:scale-[0.98]">
          Create your moment
        </button>
      </div>
    </div>
  );
};
