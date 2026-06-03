/**
 * Meta Pixel Helper Utilities
 * Pixel ID: 4505287843124646
 *
 * Centralised wrapper around the fbq() global so every component
 * can import thin helpers instead of touching fbq directly.
 */

const PIXEL_ID = '4505287843124646';

/** Styled console log for Meta Pixel events */
// const logPixelEvent = (eventName, data) => {
//   console.log(
//     `%c🟣 Meta Pixel %c ${eventName} %c fired`,
//     'background: #4267B2; color: white; padding: 2px 6px; border-radius: 3px 0 0 3px; font-weight: bold;',
//     'background: #1877F2; color: white; padding: 2px 6px; font-weight: bold;',
//     'background: #42b72a; color: white; padding: 2px 6px; border-radius: 0 3px 3px 0; font-weight: bold;',
//   );
//   if (data && Object.keys(data).length > 0) {
//     console.table(data);
//   }
// };

/** Safe guard – only call fbq when the snippet has loaded. */
const fbqSafe = (...args) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args);
  } else {
    console.warn('[MetaPixel] fbq not loaded – skipping:', args);
  }
};

/**
 * ViewContent – fire on the main landing / product page.
 */
export const trackViewContent = () => {
  const data = {
    content_name: 'PureMotion AI Animation',
    content_type: 'product',
    content_category: 'AI Animation',
  };
  // logPixelEvent('ViewContent', data);
  fbqSafe('track', 'ViewContent', data);
};

/**
 * AddToCart – fire after a successful image upload / start-order action.
 */
export const trackAddToCart = () => {
  const data = {
    content_name: 'PureMotion AI Animation',
    content_type: 'product',
    content_category: 'AI Animation',
    currency: 'AUD',
    value: 0.0,
  };
  // logPixelEvent('AddToCart', data);
  fbqSafe('track', 'AddToCart', data);
};

/**
 * Lead – fire after the user's email is successfully captured (signup).
 */
export const trackLead = () => {
  const data = {
    content_name: 'Email Submitted',
    content_category: 'AI Animation',
  };
  // logPixelEvent('Lead', data);
  fbqSafe('track', 'Lead', data);
};

/**
 * InitiateCheckout – fire when a checkout session is created.
 * @param {number} value – order value in AUD
 */
export const trackInitiateCheckout = (value = 0) => {
  const data = {
    content_name: 'PureMotion AI Animation',
    content_type: 'product',
    content_category: 'AI Animation',
    currency: 'AUD',
    value: Number(value) || 0,
  };
  // logPixelEvent('InitiateCheckout', data);
  fbqSafe('track', 'InitiateCheckout', data);
};

/**
 * Purchase – fire only after payment is confirmed.
 * @param {number}  value     – order value in AUD
 * @param {string} [eventID]  – Stripe Checkout Session ID (for Zapier dedup)
 */
export const trackPurchase = (value = 0, eventID) => {
  const data = {
    content_name: 'PureMotion AI Animation',
    content_type: 'product',
    content_category: 'AI Animation',
    value: Number(value) || 0,
    currency: 'AUD',
  };
  // logPixelEvent('Purchase', { ...data, ...(eventID ? { eventID } : {}) });

  if (eventID) {
    fbqSafe('track', 'Purchase', data, { eventID });
  } else {
    fbqSafe('track', 'Purchase', data);
  }
};
