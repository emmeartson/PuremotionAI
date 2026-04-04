import React from "react";
import { Check } from "lucide-react";
import { Button } from "./Button";
import { Navigate, useNavigate } from "react-router-dom";

export const Step4_Final = ({ onNext }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto text-center animate-in fade-in duration-1000">
      <h1 className="text-4xl font-serif text-gray-900 mb-4 font-semibold">
        Your First Video Is Ready!
      </h1>
      <p className="text-gray-500 mb-10  mx-auto font-medium leading-relaxed">
        Save your memory video and share it with the people you love most —
        these moments are meant to be remembered.
      </p>

      {/* Result Preview */}
      <div className="w-64 h-80 mx-auto rounded-[2rem] overflow-hidden mb-10 shadow-2xl border-4 border-white">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
          alt="Preview Result"
          className="w-full h-full object-cover grayscale brightness-90"
        />
      </div>

      <div className="bg-[#fee6a8] text-[#7c602e] px-6 py-3 rounded-xl inline-flex items-center gap-2 text-sm font-bold mb-10 border border-[#fef08a]">
        <Check size={16} className="stroke-[3px]" /> You're eligible to redeem a
        special offer in the next step
      </div>

      <h2 className="text-2xl font-serif font-semibold mb-10 text-gray-800">
        Save up to{" "}
        <span className="relative">
          60%
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400/60 rounded-full"></span>
        </span>{" "}
        off your order
      </h2>

      <div className=" mx-auto  p-2 rounded-[2.5rem]">
        {/* <h3 className="text-2xl font-serif mb-2 text-gray-900">Enter your email to start bringing your <br /> photos to life</h3> */}
        <p className="text-[11px] text-gray-400 mb-6 font-bold uppercase tracking-wider mt-5">
          Make sure it's correct — your animated memories are delivered <br />{" "}
          securely.
        </p>

        {/* <input 
        type="email" 
        placeholder="Enter your email address" 
        className="w-full px-6 py-4 rounded-full border border-gray-100 bg-gray-50 mb-4 focus:ring-2 focus:ring-[#7c602e]/20 outline-none transition-all font-medium"
      /> */}

        <div onClick={() => navigate("/step-login")}>
          <Button className="w-full mb-6 py-4 text-lg">
            See the live movement now
          </Button>
        </div>

        <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
          We respect your privacy. Your photos and email are always safe with us
          — we never sell or share your data.
        </p>
      </div>
    </div>
  );
};
