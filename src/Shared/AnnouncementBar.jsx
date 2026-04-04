import React from "react";
import { BsStarFill } from "react-icons/bs";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#634910] text-white text-sm topbar-marquee-wrapper">
      <div className="max-w-2xl mx-auto flex sm:flex-row items-center justify-between px-2 sm:px-4 py-0.5 gap-6 sm:gap-0 topbar-marquee">
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <span>3 Easy Steps</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-center mt-1 sm:mt-0">
          <div className="flex items-center text-white space-x-0.5">
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
          </div>
          <span className="hidden xs:inline">Thousands of Happy Customers</span>
          <span className="inline xs:hidden text-xs">
            Thousands of Happy Customers
          </span>
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-1 sm:mt-0">
          <span className="hidden xs:inline">Encrypted &amp; Secure</span>
          <span className="inline xs:hidden text-xs">
            Encrypted &amp; Secure
          </span>
        </div>
      </div>
    </div>
  );
}
