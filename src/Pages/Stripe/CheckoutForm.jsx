import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { FaCheckCircle, FaLock, FaShieldAlt } from 'react-icons/fa';

const CheckoutForm = ({ onSuccess, onError, planName, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL after payment confirmation
        return_url: `${window.location.origin}/dashboard`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`.
    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }
      onError?.(error);
    } else {
      onSuccess?.();
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-5">
      {/* Plan Summary */}
      {(planName || amount) && (
        <div className="bg-gradient-to-r from-[#f8f3eb] to-[#fdf8f0] rounded-xl p-4 border border-[#e6d8c4]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#7c602e] font-medium">Selected Plan</p>
              <p className="text-lg font-bold text-[#634910]">{planName}</p>
            </div>
            {amount && (
              <div className="text-right">
                <p className="text-2xl font-bold text-[#634910]">{amount}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stripe Payment Element */}
      <div className="rounded-xl overflow-hidden">
        <PaymentElement
          id="payment-element"
          options={{
            layout: {
              type: 'accordion',
              defaultCollapsed: false,
              radios: true,
              spacedAccordionItems: true,
            },
          }}
        />
      </div>

      {/* Error Message */}
      {message && (
        <div
          id="payment-message"
          className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
          role="alert"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit-payment"
        type="submit"
        className="w-full py-4 px-6 rounded-xl font-bold text-lg uppercase tracking-wide
                   bg-gradient-to-r from-[#7c602e] to-[#a67c3d] text-white
                   hover:from-[#634910] hover:to-[#8b6930]
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 ease-in-out
                   shadow-lg hover:shadow-xl
                   transform hover:-translate-y-0.5 active:translate-y-0"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing Payment...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <FaLock className="text-sm" />
            Pay Now
          </span>
        )}
      </button>

      {/* Trust Indicators */}
      <div className="flex flex-col items-center gap-2 pt-2">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <FaShieldAlt className="text-green-500" />
          <span>Secured by <strong className="text-gray-700">Stripe</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <FaCheckCircle className="text-green-400" />
          <span>256-bit SSL encrypted • PCI DSS compliant</span>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
