import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#634910] text-amber-50">
      <div className="max-w-full mx-auto text-center px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-serif mb-4 font-bold">
          PureMotion
        </h2>

        <p className="text-sm max-w-prose mx-auto leading-relaxed text-[#edd796">
          Behind every photograph is a chapter of someone's life. Our mission is
          to honor those chapters by gently restoring their motion and spirit,
          so they can be experienced once more.
        </p>

        <p className="text-sm max-w-prose mx-auto leading-relaxed mt-4 text-white">
          We're grateful you chose to preserve your memories with us.{" "}
          <span className="text-red-600">❤</span>
        </p>

        <hr className="border-gray-400 my-6" />

        <div className="text-xs text-white">
          <div>© 2026 PureMotion. All rights reserved.</div>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
            <span className="border-l border-gray-300 h-3" />
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span className="border-l border-gray-300 h-3" />
            <Link to="/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
