import React, { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Redux/Profile";

export const InviteFriendsPage = () => {
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const { data: profile } = useSelector((state) => state.profile);

  useEffect(() => {
    // Fetch profile data if not already loaded
    if (!profile) {
      dispatch(getProfile());
    }
  }, [dispatch, profile]);

  const referralLink = profile?.referral_link || "Loading...";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#fdfcfb] flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl text-center">
        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight">
          Share The Magic, <br className="md:hidden" /> Earn Together ❤️
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-500 font-medium mb-8 sm:mb-10">
          Invite a friend - both of you get 10 free credits
        </p>

        {/* Description Box */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-5 sm:p-6 md:p-8 mb-8 sm:mb-10 text-left shadow-sm">
          <p className="text-sm text-gray-400 leading-relaxed font-medium">
            Spread the joy of bringing old photos to life. When your friend
            joins, they get 10 free credits to start - and you'll receive 10
            credits as a thank you. A moment shared is a moment remembered.
          </p>
        </div>

        {/* Link & Share Section */}
        <div className="w-full max-w-md mx-auto space-y-4 sm:space-y-6">
          {/* Referral Link Input */}
          <div className="relative flex items-center">
            <div className="w-full bg-white border border-gray-200 rounded-full py-3.5 sm:py-4 px-5 sm:px-6 text-xs sm:text-sm text-gray-400 font-medium flex items-center overflow-hidden">
              <span className="truncate">{referralLink}</span>
            </div>
            <button
              onClick={handleCopy}
              className="absolute right-2 bg-white px-3 sm:px-4 py-2 rounded-full text-xs font-bold text-[#7c602e] hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-500" />
                  Copied
                </>
              ) : (
                "Copy"
              )}
            </button>
          </div>

          {/* Primary Action Button */}
          <button className="w-full bg-[#7c602e] hover:bg-[#634d25] text-white py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-xl shadow-[#7c602e]/20 transition-all active:scale-[0.98]">
            Share Now
          </button>
        </div>
      </div>
    </div>
  );
};
