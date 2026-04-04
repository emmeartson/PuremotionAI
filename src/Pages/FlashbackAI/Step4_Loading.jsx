import React, { useEffect, useState, useRef } from "react";
import { Heart } from "lucide-react";
import { BsFillStarFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import elise from "../../../public/Elise D.jpg";
import liam from "../../../public/Liam G..jpg";

const BASE_URL = "api.puremotion.co";

export const Step4_Loading = ({ onNext, isSubmitting }) => {
  const [statusMessage, setStatusMessage] = useState(
    "Starting your video generation...",
  );
  const wsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has access_token
    const token = localStorage.getItem("access_token");

    if (!token) {
      // Skip this page if no token
      console.log("Step4_Loading: No access token, skipping loading page");
      onNext();
      return;
    }

    // Connect WebSocket for real-time progress
    const wsUrl = `wss://${BASE_URL}/ws/video-generation-status/?token=${token}`;
    console.log("Step4_Loading: Connecting to WebSocket:", wsUrl);

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Step4_Loading: WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Step4_Loading: Progress update:", data);

        // Handle both old format and new format
        let status, message;

        if (data.type === "send_video_status" && data.status_data) {
          // Old format
          status = data.status_data.status;
          message = data.status_data.message;
        } else if (data.status) {
          // New format - direct status and message
          status = data.status;
          message = data.message;
        }

        // Update status message
        if (message) {
          setStatusMessage(message);
        }

        // If video generation is complete
        if (status === "completed" || status === "playing") {
          setTimeout(() => {
            ws.close();
            navigate("/dashboard");
          }, 1000);
        }
      } catch (error) {
        console.error("Step4_Loading: Error parsing WebSocket data:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("Step4_Loading: WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("Step4_Loading: WebSocket disconnected");
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [onNext]);
  return (
    <div className="w-full text-center animate-in fade-in zoom-in-95 duration-500">
      {/* --- TESTIMONIALS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
        {/* Card - Elise D. */}
        <div
          className="bg-[#f2ebe2] rounded-2xl p-3 sm:p-4 flex flex-col border border-[#e5e0d6]"
          style={{ boxShadow: "0 2px 12px 0 rgba(60, 40, 10, 0.07)" }}
        >
          <div className="mb-2 sm:mb-3">
            <img
              src="/loved4.gif"
              alt="after"
              className="w-full h-36 sm:h-44 md:h-52 rounded-xl object-cover"
            />
          </div>
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, idx) => (
              <BsFillStarFill
                key={idx}
                className="text-[#634910] text-xs sm:text-sm mr-0.5 sm:mr-1"
              />
            ))}
          </div>
          <p className="text-gray-800 text-[12px] sm:text-[13px] md:text-[14px] mb-2 sm:mb-3 flex-1 leading-relaxed text-left">
            "I surprised my friend with this to bring their family photo to
            life. We didn't expect such an emotional reaction."
          </p>
          <div className="border-t border-[#e5e0d6] pt-2 flex items-center gap-2 mt-auto">
            <img
              src={elise}
              alt="Elise D."
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow flex-shrink-0"
            />
            <div className="text-left">
              <span className="font-semibold text-gray-900 block leading-tight text-xs sm:text-sm">
                Elise D.
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 block">
                Paris, France
              </span>
              <span className="flex items-center text-[10px] sm:text-xs text-[#1da1f2] mt-0.5 font-medium">
                <MdVerified className="mr-0.5 text-xs sm:text-sm" /> Verified
                user
              </span>
            </div>
          </div>
        </div>

        {/* Card - Liam G. */}
        <div
          className="bg-[#f2ebe2] rounded-2xl p-3 sm:p-4 flex flex-col border border-[#e5e0d6]"
          style={{ boxShadow: "0 2px 12px 0 rgba(60, 40, 10, 0.07)" }}
        >
          <div className="mb-2 sm:mb-3">
            <img
              src="/loved6.gif"
              alt="after"
              className="w-full h-36 sm:h-44 md:h-52 rounded-xl object-cover"
            />
          </div>
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, idx) => (
              <BsFillStarFill
                key={idx}
                className="text-[#634910] text-xs sm:text-sm mr-0.5 sm:mr-1"
              />
            ))}
          </div>
          <p className="text-gray-800 text-[12px] sm:text-[13px] md:text-[14px] mb-2 sm:mb-3 flex-1 leading-relaxed text-left">
            "The realism is unbelievable. PureMotion turned a simple photo into
            something my family will treasure forever."
          </p>
          <div className="border-t border-[#e5e0d6] pt-2 flex items-center gap-2 mt-auto">
            <img
              src={liam}
              alt="Liam G."
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow flex-shrink-0"
            />
            <div className="text-left">
              <span className="font-semibold text-gray-900 block leading-tight text-xs sm:text-sm">
                Liam G.
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 block">
                Toronto, Canada
              </span>
              <span className="flex items-center text-[10px] sm:text-xs text-[#1da1f2] mt-0.5 font-medium">
                <MdVerified className="mr-0.5 text-xs sm:text-sm" /> Verified
                user
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- SPINNER --- */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 sm:mb-6">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full animate-spin"
          style={{ animationDuration: "1.5s" }}
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#f3f4f6"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#7c602e"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="60 200"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* --- SCROLLING STATUS TEXT --- */}
      <div className="w-full overflow-hidden rounded-lg px-0">
        <div className="animate-marquee whitespace-nowrap inline-block">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="text-xs sm:text-sm font-semibold text-[#7c602e] mx-4 sm:mx-6"
            >
              {statusMessage}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
};
