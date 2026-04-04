import React from "react";
import { Camera, ChevronLeft } from "lucide-react";

const Box = ({ onBrowse }) => (
  <div className="w-full sm:flex-1 border-2 border-dashed border-[#e5d5bc] rounded-[2rem] p-8 sm:p-10 md:p-12 flex flex-col items-center justify-center bg-white/50">
    <div className="bg-gray-100 p-3 sm:p-4 rounded-xl mb-4 text-gray-400">
      <Camera size={28} className="sm:w-8 sm:h-8" />
    </div>
    <p className="text-sm font-bold text-gray-700 mb-1">
      Drag & drop your photo here
    </p>
    <p className="text-xs text-gray-400 mb-6 font-medium">Or</p>
    <button
      onClick={onBrowse}
      className="bg-[#7c602e] text-white px-10 py-2.5 rounded-xl text-xs font-bold hover:bg-[#634d25] transition-all"
    >
      Browse
    </button>
  </div>
);

export const ImagePicker = ({ type, onBack, onNext }) => (
  <div className="flex-1 bg-[#fdfcfb] p-4 sm:p-8 md:p-10 animate-in slide-in-from-right-4 duration-500">
    <button
      onClick={onBack}
      className="flex items-center gap-1 text-xs font-bold text-gray-400 mb-8 sm:mb-12 hover:text-gray-900 uppercase tracking-widest"
    >
      <ChevronLeft size={16} /> Back
    </button>
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 min-h-[unset] sm:min-h-[450px]">
      <Box onBrowse={onNext} />
      {type === "double" && (
        <>
          <span className="text-gray-300 font-bold text-2xl">+</span>
          <Box onBrowse={onNext} />
        </>
      )}
    </div>
  </div>
);
