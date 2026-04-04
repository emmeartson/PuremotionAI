import React from "react";
import Button from "../../Shared/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "/whychoose1.png",
    title: "Lightning Fast",
    desc: "Generate videos in under 60 seconds with our optimized AI processing.",
  },
  {
    icon: "/whychoose2.png",
    title: "Privacy First",
    desc: "Your photos are encrypted and automatically deleted after processing.",
  },
  {
    icon: "/whychoose3.png",
    title: "Style Control",
    desc: "Choose from cinematic, nostalgic, or custom motion styles.",
  },
  {
    icon: "/whychoose4.png",
    title: "Emotional Impact",
    desc: "Our AI understands context to create meaningful motion.",
  },
  {
    icon: "/whychoose5.png",
    title: "Restore Old Photos",
    desc: "Works beautifully with vintage and damaged photographs.",
  },
  {
    icon: "/whychoose6.png",
    title: "Works Anywhere",
    desc: "Create videos on any device — desktop, tablet, or mobile.",
  },
];

function WhyChoose() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center py-10 sm:py-12 md:py-14 bg[#FCFAF6]">
      {/* Heading */}
      <div className="w-full flex flex-col items-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
          Why Choose <span className="text-[#634910]">PureMotion</span>
        </h2>
        <p className="text-gray-700 text-base sm:text-lg text-center max-w-xl mb-1">
          Powerful Features &amp; Simple Experience
        </p>
      </div>
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 w-full max-w-7xl px-2 md:px-0">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow p-6 flex flex-col border border-[#ece8e0] min-h-[150px] justify-start items-start transition hover:shadow-lg"
            style={{ boxShadow: "0 2px 8px 0 rgba(60, 40, 10, 0.07)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 flex items-center justify-center bg-[#e7dfd0] rounded-md flex-shrink-0">
                <img
                  src={f.icon}
                  alt={f.title}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      <Button
        className="w-full sm:w-auto bg-[#7A693B] hover:bg-[#5c522e] text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold flex items-center gap-2 shadow-md"
        onClick={() => navigate("/flashback")}
      >
        <span className="flex items-center gap-3 sm:gap-6">
          <FaArrowRightLong /> Try Now — Bring My Photo to Life
        </span>
      </Button>
    </div>
  );
}

export default WhyChoose;
