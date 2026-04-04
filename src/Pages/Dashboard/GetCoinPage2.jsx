import React from "react";
import Button from "../../Shared/Button";

function GetCoinPage2() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-gray-900 mb-2">
            Your credits are ready!
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Thank you — your payment was successful and your credits are now
            available.
          </p>
          <p className="text-xs text-gray-400 mb-6">
            A confirmation email is on its way
          </p>

          <Button href="/dashboard" variant="secondary" size="md">
            Return to home page
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GetCoinPage2;
