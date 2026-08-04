import React, { useState, useCallback, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js/pure";
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import { FaTimes } from "react-icons/fa";
import { BASE_URL, getAuthToken } from "../../Redux/Config";
import { trackInitiateCheckout, trackPurchase } from "../../utils/metaPixel";
import CheckoutForm from "./CheckoutForm";
import useCurrencyConversion from "../../utils/currency";

const STRIPE_PK =
  "pk_live_51SyjT0F9gOu6UGqJaCZpoYQVM3uhfnMPl0r6o9DiTZZvgJaOf3FuuIIxBotZchJq5fvbQydek9fkoviI0UgKcYix00umqJ2PlV";

// const STRIPE_PK =
//   "pk_test_51SyjT0F9gOu6UGqJ75C0uDkBRZobn10YFNaKJp0cKXSnqqc18dAxuFESsQhvtP5crktUoXoaqL35eewt7nYsMIfl00nnkbamAm";

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
  planName = "Family Package",
  amount = "A$14.85",
  isExclusive = false,
  isImagePackage = false,
  checkoutType = "subscription", // 'subscription' or 'package'
  memoriesText = "15 memories",
  unitPrice = "A$0.99 per memory",
  savingsBadge = "SAVE 60%",
  billingInterval = "Billed every 2 weeks",
}) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { convertPrice } = useCurrencyConversion();

  let derivedMemoriesText = memoriesText;
  let derivedUnitPrice = unitPrice;
  let derivedBillingInterval = billingInterval;

  if (planName?.toLowerCase().includes("starter")) {
    derivedMemoriesText = "4 memories";
    derivedUnitPrice = "$1.99 per memory";
    derivedBillingInterval = "Billed every week";
  } else if (planName?.toLowerCase().includes("premium")) {
    derivedMemoriesText = "30 memories";
    derivedUnitPrice = "$0.69 per memory";
    derivedBillingInterval = "Billed every month";
  } else if (planName?.toLowerCase().includes("family")) {
    derivedMemoriesText = "15 memories";
    derivedUnitPrice = "$0.99 per memory";
    derivedBillingInterval = "Billed every 2 weeks";
  }

  const getDisplayUnitPrice = () => {
    if (typeof derivedUnitPrice === 'string') {
      const match = derivedUnitPrice.match(/^(.*?[\d.]+)(.*)$/);
      if (match) {
        return `${convertPrice(match[1])}${match[2]}`;
      }
      return convertPrice(derivedUnitPrice);
    }
    return derivedUnitPrice;
  };

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
            : { price_id: priceId, is_exclusive: isExclusive, is_image_package: isImagePackage };

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

        let secret = data.client_secret || data.clientSecret;

        if (!secret) {
          if (data.checkout_url) {
            window.open(data.checkout_url, "_blank");
            onClose?.();
            return;
          }
          throw new Error("No client secret received from server.");
        }

        if (typeof secret === "string" && secret.includes("%")) {
          try {
            secret = decodeURIComponent(secret);
          } catch (e) {
            console.warn("Failed to decode secret URI component:", e);
          }
        }

        setClientSecret(secret);

        // Meta Pixel: InitiateCheckout
        const numericValue = parseFloat(String(amount).replace(/[^0-9.]/g, "")) || 0;
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
  }, [isOpen, priceId, isExclusive, checkoutType, amount, onClose]);

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
    // Meta Pixel: Purchase
    const numericValue = parseFloat(String(amount).replace(/[^0-9.]/g, "")) || 0;
    trackPurchase(numericValue);

    onClose?.();
  }, [onClose, amount]);

  if (!isOpen) return null;

  return (
    <div
      id="payment-modal-overlay"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Card Container */}
      <div
        className="relative w-full max-w-[450px] bg-[#FAF8F5] rounded-[24px] sm:rounded-[28px] shadow-2xl overflow-hidden
                   animate-[modalSlideUp_0.35s_ease-out] border border-[#EBE6DF]"
        style={{
          maxHeight: "92vh",
        }}
      >
        {/* Close Button */}
        <button
          id="close-payment-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full hover:bg-black/5 transition-colors text-gray-400 hover:text-gray-600"
          aria-label="Close payment modal"
        >
          <FaTimes className="text-base" />
        </button>

        {/* Scrollable Modal Content */}
        <div
          className="overflow-y-auto p-5 sm:p-6"
          style={{ maxHeight: "calc(92vh - 10px)" }}
        >
          {/* Header */}
          <div className="text-center pt-1">
            <h2
              id="payment-modal-title"
              className="text-2xl sm:text-[28px] text-gray-900 font-serif leading-tight"
            >
              Your Memory Is <span className="font-serif italic font-normal text-[#856734]">Ready</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#78716C] mt-1.5">
              Complete your order to unlock your memory.
            </p>

            {/* <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 mt-3 text-[11px] sm:text-xs text-[#57534E] whitespace-nowrap">
              <span className="flex items-center gap-1">
                <span className="text-[#10B981] font-bold">✓</span> Secure Checkout
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#10B981] font-bold">✓</span> Cancel Anytime
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#10B981] font-bold">✓</span> 30-Day Guarantee
              </span>
            </div> */}
          </div>

          {/* Package Summary Box */}
          <div className="bg-white border border-[#EBE6DF] rounded-2xl p-4 mt-5 shadow-sm">
            <div className="flex items-baseline justify-between">
              <span className="font-bold text-gray-900 text-base">{planName}</span>
              <span className="font-serif font-medium text-gray-900 text-lg">
                {typeof amount === 'string' ? amount.split('/')[0].trim() : amount}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1 text-xs text-[#78716C]">
              {/* <span>{derivedMemoriesText}</span> */}
              <span>7-Day Full Access</span>

            </div>
            <div className="flex items-center justify-between mt-2.5">
              {planName?.toLowerCase().includes("family") ? (
                <span className="bg-[#E6F4EA] text-[#137333] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {savingsBadge}
                </span>
              ) : (
                <span />
              )}
              {/* <span className="text-xs text-[#9CA3AF]">{derivedBillingInterval}</span> */}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-3 border-[#E5DFD5]" />
                <div className="absolute top-0 left-0 w-10 h-10 rounded-full border-3 border-transparent border-t-[#856734] animate-spin" />
              </div>
              <p className="text-[#856734] font-medium text-xs">
                Preparing secure checkout...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-10 gap-3 px-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-400"
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
                <p className="text-gray-800 font-semibold text-sm mb-1">
                  Payment Setup Failed
                </p>
                <p className="text-xs text-gray-500 max-w-xs">{error}</p>
              </div>
              <button
                onClick={() => {
                  setError(null);
                  setClientSecret("");
                  setLoading(true);
                  setTimeout(() => setLoading(false), 100);
                }}
                className="px-5 py-2 bg-[#856734] text-white rounded-xl text-xs font-semibold
                           hover:bg-[#74582B] transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Stripe Custom Checkout Provider */}
          {clientSecret && !loading && !error && (
            <div id="checkout-container">
              <CheckoutElementsProvider
                key={clientSecret}
                stripe={getStripePromise()}
                options={{
                  clientSecret,
                  elementsOptions: {
                    appearance: {
                      theme: "flat",
                      variables: {
                        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                        colorBackground: "#FDFBF7",
                        colorText: "#1C1917",
                        colorDanger: "#EF4444",
                        colorTextPlaceholder: "#9CA3AF",
                        borderRadius: "12px",
                        borderColor: "#968c78",
                        colorPrimary: "#856734",
                      },
                    },
                  },
                }}
              >
                <CheckoutForm
                  onSuccess={handleComplete}
                  onError={(err) => setError(err.message)}
                />
              </CheckoutElementsProvider>
            </div>
          )}
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
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
