import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const faqs = [
  {
    q: "Do I need any technical skills?",
    a: "Not at all! PureMotion is designed for everyone. Simply upload your photo, choose a style, and we handle the rest. The entire process is intuitive and takes less than a minute.",
  },
  {
    q: "How long does it take?",
    a: "Most videos are generated in under 30 seconds with our optimized AI processing. More complex animations may take up to 60 seconds depending on your photo quality and selected style.",
  },
  {
    q: "Can I choose the animation style?",
    a: "Yes! You can choose from cinematic, nostalgic, gentle movement, or natural lifelike motion styles. Each style is designed to respect the emotional value of your photos while bringing them to life.",
  },
  {
    q: "Is my photo safe?",
    a: "Absolutely. Your photos are encrypted during upload and processing. We automatically delete all photos from our servers after 24 hours, and you can manually delete them at any time. Your privacy is our top priority.",
  },
  {
    q: "Can I download/share my video?",
    a: "Yes! Once your video is generated, you can download it in high quality and share it with anyone you love. Your videos are yours to keep forever.",
  },
  {
    q: "Will old photos work?",
    a: "Yes! PureMotion works beautifully with vintage, faded, and even damaged photographs. Our AI is specifically trained to handle old family photos with care and respect.",
  },
  {
    q: "Is it compatible with all devices?",
    a: "Absolutely! PureMotion works on any device — desktop computers, tablets, and mobile phones. Create and view your memory videos anywhere, anytime.",
  },
];

function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center py-12 sm:py-14 bg-white px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 text-sm sm:text-base text-center max-w-7xl mb-8">
        Clear answers to help you feel confident at every step.
      </p>
      <div className="w-full max-w-5xl flex flex-col gap-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`bg-[#fafbfc] rounded-xl border border-[#ececec] transition shadow-sm`}
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 focus:outline-none"
              onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              aria-expanded={openIdx === idx}
            >
              <span className="font-semibold text-lg text-left text-gray-900">
                {faq.q}
              </span>
              <IoIosArrowDown
                className={`text-2xl text-gray-500 transition-transform duration-200 ${
                  openIdx === idx ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIdx === idx && (
              <div className="px-6 pb-4 text-gray-700 text-base animate-fadein">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
