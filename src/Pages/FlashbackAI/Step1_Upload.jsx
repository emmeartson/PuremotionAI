import React from "react";
import { Star, Camera, Check } from "lucide-react";

export const Step1_Upload = ({ onNext }) => (
  <div className="max-w-2xl mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
    <h1 className="text-4xl font-serif text-gray-900 mb-3 font-semibold">
      Start with a photo you love
    </h1>
    <p className="text-gray-500 mb-8">
      Uploads a spatial memory to begin the magic
    </p>

    {/* Social Proof Badge */}
    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm mb-8">
      <div className="flex -space-x-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
          />
        ))}
      </div>
      <span className="text-xs font-bold text-gray-600">Excellent</span>
      <div className="flex text-primary gap-2 scale-75">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      <span className="text-xs text-black font-medium">
        4.7 | 2,487 Happy Users
      </span>
    </div>

    {/* Success Stats */}
    <div className="bg-primary/5 rounded-2xl p-6 mb-8 flex items-center gap-6 max-w-sm mx-auto shadow-md text-left ">
      <div className="text-4xl font-serif text-[#7c602e] font-bold">94%</div>
      <div>
        <div className="text-sm font-bold text-gray-800">
          Upload Success Rate
        </div>
        <p className="text-xs text-black leading-tight">
          Most users upload an image on this step
        </p>
      </div>
    </div>

    {/* Upload Area */}
    <div
      onClick={onNext}
      className="border-2 border-dashed border-[#e5d5bc] rounded-[2rem] p-12 mb-8 cursor-pointer hover:bg-[#fdfcfb] transition-all group"
    >
      <div className="bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        <Camera className="text-gray-400" size={28} />
      </div>
      <p className="text-gray-600 font-semibold mb-1">
        Drag & drop your photo here
      </p>
      <p className="text-gray-400 text-sm mb-6 font-medium">Or</p>
      <button className="bg-[#7c602e] text-white px-10 py-2.5 rounded-xl text-sm font-semibold shadow-md">
        Browse
      </button>
    </div>

    <p className="text-[#7c602e] font-bold mb-2">Start With Just One Photo</p>
    <p className="text-xs text-gray-400 mb-8 max-w-xs mx-auto leading-relaxed">
      You can upload many more right after onboarding — this first photo simply
      helps us begin.
    </p>

    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest bg-gray-50/50 py-3 rounded-full border border-gray-100">
      <Check size={14} className="text-green-500 stroke-[3px]" /> Private &
      Secure — Your photo never leaves our encrypted system
    </div>
  </div>
);
