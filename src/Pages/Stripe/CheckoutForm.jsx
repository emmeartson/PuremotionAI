import React, { useState } from 'react';
import {
  PaymentElement,
  ExpressCheckoutElement,
  useCheckoutElements,
} from '@stripe/react-stripe-js/checkout';
import { FaLock, FaShieldAlt } from 'react-icons/fa';

const CheckoutForm = ({ onSuccess, onError }) => {
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkoutState = useCheckoutElements();

  if (checkoutState.type === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-[#856734] animate-spin" />
        <p className="text-xs text-[#856734] font-medium">Preparing checkout...</p>
      </div>
    );
  }

  if (checkoutState.type === 'error') {
    return (
      <div className="py-6 text-center text-red-500 text-xs font-semibold">
        Error loading checkout: {checkoutState.error.message}
      </div>
    );
  }

  const { checkout } = checkoutState;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const confirmResult = await checkout.confirm();

      if (confirmResult.type === 'error') {
        setMessage(confirmResult.error.message);
        onError?.(confirmResult.error);
      } else {
        onSuccess?.();
      }
    } catch (err) {
      console.error('Payment confirmation error:', err);
      setMessage('Failed to process payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="mt-3 sm:mt-4">
      {/* Express Checkout Element (Google Pay / Apple Pay / Link) */}
      <div className="mb-4">
        <ExpressCheckoutElement
          options={{
            buttonHeight: 46,
            buttonTheme: {
              googlePay: 'black',
              applePay: 'black',
            },
          }}
          onConfirm={async () => {
            try {
              const confirmResult = await checkout.confirm();
              if (confirmResult.type === 'error') {
                setMessage(confirmResult.error.message);
              } else {
                onSuccess?.();
              }
            } catch (err) {
              console.error('Express checkout error:', err);
            }
          }}
        />
      </div>

      {/* Divider */}
      <div className="relative flex items-center my-4">
        <div className="flex-grow border-t border-[#E5DFD5]"></div>
        <span className="flex-shrink mx-3 text-[11px] font-bold tracking-widest text-[#8E8880] uppercase">
          OR PAY WITH CARD
        </span>
        <div className="flex-grow border-t border-[#E5DFD5]"></div>
      </div>

      {/* Card Details Box */}
      <div className="rounded-2xl border border-[#E5DFD5] bg-[#FAF8F5]/80 p-4 sm:p-4.5 space-y-3">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-[#8E8880] tracking-wider uppercase mb-1">
          <span>PAYMENT DETAILS</span>
          <span className="flex items-center gap-1">
            <FaLock className="text-[9px]" /> STRIPE
          </span>
        </div>

        {/* Stripe Payment Element for Checkout Session */}
        <PaymentElement
          id="payment-element"
          options={{
            layout: "tabs",
            terms: {
              card: 'never', // Hides "By subscribing, you authorize..."
            },
            wallets: {
              link: "never",
            },
          }}
        />

        <p className='text-center' style={{ fontSize: "12px", color: "#666", margin: "12px 0" }}>
          By completing your purchase, you agree to our{" "}
          <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#856734]">Terms of Service</a> and applicable policies.
        </p>
      </div>

      {/* Error Message */}
      {message && (
        <div
          id="payment-message"
          className="mt-3 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-xl text-xs"
          role="alert"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 101.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {/* Submit CTA Button */}
      <button
        disabled={!checkoutState.checkout?.canConfirm || isSubmitting}
        id="submit-payment"
        type="submit"
        className="w-full mt-5 py-3.5 sm:py-4 px-6 rounded-full font-semibold text-base sm:text-lg
                   bg-[#856734] text-white hover:bg-[#74582B] active:bg-[#634910]
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 shadow-md hover:shadow-lg
                   flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : (
          "Bring My Memory to Life"
        )}
      </button>

      {/* Trust Footer & Card Badges */}
      <div className="mt-4 text-center space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8E8880]">
          <FaShieldAlt className="text-[#10B981] text-[10px]" />
          <span>Payments securely processed by Stripe</span>
        </div>

        {/* Card Brand Badges */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap pt-0.5">
          {(["visa", "mastercard", "amex", "applepay", "googlepay"]).map((name) => {
            const images = {
              visa: "/visa.png",
              mastercard: "/master.png",
              amex: "/amex.png",
              applepay: "/applepay.png",
              googlepay: "/googlepay.webp"
            };
            return (
              <div key={name} className="inline-flex h-7 w-[46px] items-center justify-center rounded-md border border-[#EBE5DC] bg-white shadow-sm overflow-hidden p-1">
                <img src={images[name]} alt={name} className="h-full w-full object-contain" />
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
