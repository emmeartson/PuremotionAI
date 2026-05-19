import React, { useState, useCallback, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { FaTimes, FaShieldAlt } from 'react-icons/fa';
import { BASE_URL, getAuthToken } from '../../Redux/Config';

const STRIPE_PK = 'pk_test_51SyjT0F9gOu6UGqJ75C0uDkBRZobn10YFNaKJp0cKXSnqqc18dAxuFESsQhvtP5crktUoXoaqL35eewt7nYsMIfl00nnkbamAm';

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
    planName = '',
    amount = '',
    isExclusive = false,
    checkoutType = 'subscription', // 'subscription' or 'package'
}) {
    const [clientSecret, setClientSecret] = useState('');
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
                    setError('Please log in to continue with payment.');
                    setLoading(false);
                    return;
                }

                const endpoint = checkoutType === 'package'
                    ? `${BASE_URL}core/api/package-checkout`
                    : `${BASE_URL}core/api/subscription-checkout`;

                console.log('[PaymentModal] checkoutType:', checkoutType, '→', endpoint);

                const body = checkoutType === 'package'
                    ? { price_id: priceId }
                    : { price_id: priceId, is_exclusive: isExclusive };

                const response = await fetch(
                    endpoint,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(body),
                    }
                );

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(
                        errData.detail || errData.message || 'Failed to create checkout session'
                    );
                }

                const data = await response.json();

                // The backend returns a Checkout Session client secret (cs_test_...)
                // Try multiple possible field names from the response
                let secret = data.client_secret || data.clientSecret;

                if (!secret) {
                    // If backend returns a checkout_url instead, fall back to redirect
                    if (data.checkout_url) {
                        window.open(data.checkout_url, '_blank');
                        onClose?.();
                        return;
                    }
                    throw new Error('No client secret received from server.');
                }

                // Decode URL-encoded characters in the secret (backend may URL-encode it)
                secret = decodeURIComponent(secret);

                setClientSecret(secret);
            } catch (err) {
                console.error('Payment session error:', err);
                setError(err.message || 'Failed to initialize payment. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchClientSecret();
    }, [isOpen, priceId, isExclusive, checkoutType]);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setClientSecret('');
            setError(null);
            setLoading(false);
        }
    }, [isOpen]);

    // Close on Escape key & lock body scroll
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = useCallback(
        (e) => {
            if (e.target === e.currentTarget) onClose?.();
        },
        [onClose]
    );

    const handleComplete = useCallback(() => {
        // Called when checkout is complete
        onClose?.();
    }, [onClose]);

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
                    maxHeight: '90vh',
                }}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-gradient-to-r from-[#f8f3eb] to-[#fdf8f0] border-b border-[#e6d8c4] px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2
                                id="payment-modal-title"
                                className="text-xl font-bold text-[#634910] font-serif"
                            >
                                Complete Payment
                            </h2>
                            <p className="text-sm text-[#9c8f73] mt-0.5 flex items-center gap-1.5">
                                <FaShieldAlt className="text-green-500 text-xs" />
                                Secure payment powered by Stripe
                            </p>
                        </div>
                        <button
                            id="close-payment-modal"
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-[#e6d8c4]/50 transition-colors text-[#7c602e]"
                            aria-label="Close payment modal"
                        >
                            <FaTimes className="text-lg" />
                        </button>
                    </div>

                    {/* Plan Summary */}
                    {(planName || amount) && (
                        <div className="mt-3 bg-white/70 rounded-xl p-3 border border-[#e6d8c4]/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-[#9c8f73] font-medium">Selected Plan</p>
                                    <p className="text-sm font-bold text-[#634910]">{planName}</p>
                                </div>
                                {amount && (
                                    <p className="text-lg font-bold text-[#7c602e]">{amount}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Body */}
                <div
                    className="overflow-y-auto"
                    style={{ maxHeight: 'calc(90vh - 120px)' }}
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
                                    setClientSecret('');
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