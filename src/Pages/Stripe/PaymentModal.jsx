import React, { useState, useCallback, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js/pure";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { FaTimes, FaShieldAlt } from "react-icons/fa";
import { BASE_URL, getAuthToken } from "../../Redux/Config";
import logo from "../../../public/logo.png";
import { trackInitiateCheckout, trackPurchase } from "../../utils/metaPixel";

const STRIPE_PK =
  "pk_live_51SyjT0F9gOu6UGqJaCZpoYQVM3uhfnMPl0r6o9DiTZZvgJaOf3FuuIIxBotZchJq5fvbQydek9fkoviI0UgKcYix00umqJ2PlV";

// Lazy-load Stripe only when needed (avoids telemetry beacons on every page)
let stripePromise = null;
const getStripePromise = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PK);
  }
  return stripePromise;
};

function PaymentModal({
  isOpen,
  onClose,
  priceId,
  planName = "",
  amount = "",
  isExclusive = false,
  checkoutType = "subscription", // 'subscription' or 'package'
}) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch client secret when modal opens
  useEffect(() => {
    if (!isOpen || !priceId) return;

    const fetchClientSecret = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getAuthToken();
        if (!token) {
          setError("Please log in to continue with payment.");
          setLoading(false);
          return;
        }

        const endpoint =
          checkoutType === "package"
            ? `${BASE_URL}core/api/package-checkout`
            : `${BASE_URL}core/api/subscription-checkout`;

        console.log(
          "[PaymentModal] checkoutType:",
          checkoutType,
          "→",
          endpoint,
        );

        const body =
          checkoutType === "package"
            ? { price_id: priceId }
            : { price_id: priceId, is_exclusive: isExclusive };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(
            errData.detail ||
            errData.message ||
            "Failed to create checkout session",
          );
        }

        const data = await response.json();

        // The backend returns a Checkout Session client secret (cs_test_...)
        // Try multiple possible field names from the response
        let secret = data.client_secret || data.clientSecret;

        if (!secret) {
          // If backend returns a checkout_url instead, fall back to redirect
          if (data.checkout_url) {
            window.open(data.checkout_url, "_blank");
            onClose?.();
            return;
          }
          throw new Error("No client secret received from server.");
        }

        // Decode URL-encoded characters in the secret (backend may URL-encode it)
        secret = decodeURIComponent(secret);

        setClientSecret(secret);

        // Meta Pixel: InitiateCheckout — checkout session created
        // Parse numeric value from the amount prop (e.g. "$19.92/fortnight" → 19.92)
        const numericValue = parseFloat(String(amount).replace(/[^0-9.]/g, '')) || 0;
        trackInitiateCheckout(numericValue);
      } catch (err) {
        console.error("Payment session error:", err);
        setError(
          err.message || "Failed to initialize payment. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [isOpen, priceId, isExclusive, checkoutType]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setClientSecret("");
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  // Close on Escape key & lock body scroll
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose?.();
    },
    [onClose],
  );

  const handleComplete = useCallback(() => {
    // Meta Pixel: Purchase — checkout completed
    const numericValue = parseFloat(String(amount).replace(/[^0-9.]/g, '')) || 0;
    trackPurchase(numericValue);

    // Called when checkout is complete
    onClose?.();
  }, [onClose, amount]);

  if (!isOpen) return null;

  return (
    <div
      id="payment-modal-overlay"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden
                    animate-[modalSlideUp_0.35s_ease-out]"
        style={{
          maxHeight: "90vh",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#f8f3eb] to-[#fdf8f0] border-b border-[#e6d8c4] px-6 py-4">
          <div className="relative flex justify-center">

            {/* Close Button */}
            <button
              id="close-payment-modal"
              onClick={onClose}
              className="absolute top-0 right-0 p-2 rounded-full hover:bg-[#e6d8c4]/50 transition-colors text-[#7c602e]"
              aria-label="Close payment modal"
            >
              <FaTimes className="text-lg" />
            </button>

            {/* Center Content */}
            <div className="flex flex-col items-center text-center">
              <img src={logo} alt="Logo" className="h-8 mb-2" />

              <h2
                id="payment-modal-title"
                className="text-[28px] sm:text-[34px] text-gray-900 font-serif leading-[1.2]"
              >
                Your Memory Is Ready
                <br />
                To <span className="text-[#967431] italic">Come Alive</span>
              </h2>

              <p className="text-[15px] text-gray-500 mt-4 px-4 max-w-sm">
                Complete your secure checkout to unlock your restored memory.
              </p>

              <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 mt-5 text-[13px] text-gray-500">
                <span className="flex items-center gap-1.5"><span className="text-gray-400">✓</span> Secure checkout</span>
                <span className="flex items-center gap-1.5"><span className="text-gray-400">✓</span> Cancel anytime</span>
                <span className="flex items-center gap-1.5"><span className="text-gray-400">✓</span> Private & encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          className="overflow-y-auto pb-10 pt-5"
          style={{ maxHeight: "calc(90vh - 120px)" }}
        >
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-[#e6d8c4]" />
                <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-[#7c602e] animate-spin" />
              </div>
              <p className="text-[#7c602e] font-medium text-sm">
                Preparing secure checkout...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-12 gap-4 px-6">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-gray-800 font-semibold mb-1">
                  Payment Setup Failed
                </p>
                <p className="text-sm text-gray-500 max-w-xs">{error}</p>
              </div>
              <button
                onClick={() => {
                  setError(null);
                  setClientSecret("");
                  // Re-trigger fetch by toggling loading briefly
                  setLoading(true);
                  setTimeout(() => setLoading(false), 100);
                }}
                className="px-6 py-2.5 bg-[#7c602e] text-white rounded-xl text-sm font-semibold
                                           hover:bg-[#634910] transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Stripe Embedded Checkout */}
          {clientSecret && !loading && !error && (
            <div id="checkout-container">
              <EmbeddedCheckoutProvider
                stripe={getStripePromise()}
                options={{
                  clientSecret,
                  onComplete: handleComplete,
                }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}
        </div>
      </div>

      {/* Custom Animation Keyframes */}
      <style>{`
                @keyframes modalSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(24px) scale(0.96);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
    </div>
  );
}

export default PaymentModal;
