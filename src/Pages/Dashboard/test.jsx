import React, { useEffect, useState, useRef } from "react";
import { Heart } from "lucide-react";
import { BsFillStarFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import elise from "../../../public/Elise D.jpg";
import liam from "../../../public/Liam G..jpg";

const BASE_URL = "api.puremotion.co";

const Test = ({ onNext, isSubmitting }) => {
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
    <div className="max-w-2xl mx-auto text-center py-8 px-4 sm:px-0 overflow-hidden">
      {/* --- TESTIMONIALS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-16 max-w-3xl mx-auto">
        {/* Card 4 - Elise D. */}
        <div
          className="bg-[#f2ebe2] rounded-2xl shadow p-4 sm:p-5 flex flex-col border border-[#e5e0d6] relative min-h-[420px]"
          style={{ boxShadow: "0 2px 12px 0 rgba(60, 40, 10, 0.07)" }}
        >
          <div className="relative mb-4 flex justify-center">
            <div className="relative w-full">
              <img
                src="/loved4.gif"
                alt="after"
                className="w-full h-64 sm:h-72 rounded-xl object-cover"
              />
            </div>
          </div>
          <div className="flex items-center mb-2 mt-2">
            {[...Array(5)].map((_, idx) => (
              <BsFillStarFill
                key={idx}
                className="text-[#634910] text-base mr-1"
              />
            ))}
          </div>
          <p className="text-gray-800 text-[15px]  mb-4 flex-1">
            "I surprised my friend with this to bring their family photo to
            life. We didn't expect such an emotional reaction."
          </p>
          <div className="border-t border-[#e5e0d6] pt-3 flex items-center gap-3 mt-auto">
            <img
              src={elise}
              alt="Elise D."
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow"
            />
            <div>
              <span className="font-semibold text-gray-900 block leading-tight -ml-8">
                Elise D.
              </span>
              <span className="text-xs text-gray-500 block -ml-4">
                Paris, France
              </span>
              <span className="flex items-center text-xs text-[#1da1f2] mt-1 font-medium">
                <MdVerified className="mr-1 text-base" /> Verified user
              </span>
            </div>
          </div>
        </div>

        {/* Card 6 - Liam G. */}
        <div
          className="bg-[#f2ebe2] rounded-2xl shadow p-4 sm:p-5 flex flex-col border border-[#e5e0d6] relative min-h-[420px]"
          style={{ boxShadow: "0 2px 12px 0 rgba(60, 40, 10, 0.07)" }}
        >
          <div className="relative mb-4 flex justify-center">
            <div className="relative w-full">
              <img
                src="/loved6.gif"
                alt="after"
                className="w-full h-64 sm:h-72 rounded-xl object-cover"
              />
            </div>
          </div>
          <div className="flex items-center mb-2 mt-2">
            {[...Array(5)].map((_, idx) => (
              <BsFillStarFill
                key={idx}
                className="text-[#634910] text-base mr-1"
              />
            ))}
          </div>
          <p className="text-gray-800 text-[15px] mb-4 flex-1">
            "The realism is unbelievable. PureMotion turned a simple photo into
            something my family will treasure forever."
          </p>
          <div className="border-t border-[#e5e0d6] pt-3 flex items-center gap-3 mt-auto">
            <img
              src={liam}
              alt="Liam G."
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow"
            />
            <div>
              <span className="font-semibold text-gray-900 block leading-tight -ml-8">
                Liam G.
              </span>
              <span className="text-xs text-gray-500 block">
                Toronto, Canada
              </span>
              <span className="flex items-center text-xs text-[#1da1f2] mt-1 font-medium">
                <MdVerified className="mr-1 text-base" /> Verified user
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- INFINITE LOOP SPINNER --- */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 mx-auto mb-8 md:mb-12">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full animate-spin"
          style={{ animationDuration: "1.5s" }}
        >
          {/* Circular loader */}
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
      <div className="relative overflow-hidden w-full h-12 sm:h-16 flex items-center bg-gradient-to-r from-transparent via-[#f7efe2] to-transparent rounded-lg px-2 sm:px-0">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm sm:text-lg font-semibold text-[#7c602e] mx-3 sm:mx-8">
            {statusMessage}
          </span>
          <span className="text-sm sm:text-lg font-semibold text-[#7c602e] mx-3 sm:mx-8">
            {statusMessage}
          </span>
          <span className="text-sm sm:text-lg font-semibold text-[#7c602e] mx-3 sm:mx-8">
            {statusMessage}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-marquee {
          display: inline-block;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Test;
