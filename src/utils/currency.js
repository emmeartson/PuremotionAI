import { useState, useEffect, useCallback } from "react";

// Country code → currency code mapping
export const COUNTRY_CURRENCY = {
    US: "USD", GB: "GBP", CA: "CAD", AU: "AUD", NZ: "NZD",
    DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR", AT: "EUR",
    IE: "EUR", PT: "EUR", GR: "EUR", FI: "EUR", LU: "EUR", SK: "EUR", SI: "EUR",
    EE: "EUR", LV: "EUR", LT: "EUR", MT: "EUR", CY: "EUR", HR: "EUR",
    JP: "JPY", CN: "CNY", IN: "INR", KR: "KRW",
    BR: "BRL", MX: "MXN", AR: "ARS", CL: "CLP", CO: "COP",
    ZA: "ZAR", NG: "NGN", KE: "KES", EG: "EGP", GH: "GHS",
    AE: "AED", SA: "SAR", QA: "QAR", KW: "KWD", BH: "BHD", OM: "OMR",
    SG: "SGD", MY: "MYR", TH: "THB", PH: "PHP", ID: "IDR", VN: "VND",
    BD: "BDT", PK: "PKR", LK: "LKR", NP: "NPR",
    SE: "SEK", NO: "NOK", DK: "DKK", PL: "PLN", CZ: "CZK", HU: "HUF",
    RO: "RON", BG: "BGN", CH: "CHF", TR: "TRY", RU: "RUB", UA: "UAH",
    IL: "ILS", TW: "TWD", HK: "HKD", PE: "PEN", UY: "UYU",
};

export default function useCurrencyConversion() {
    const [currencyData, setCurrencyData] = useState({ code: "USD", rate: 1, loading: true });

    useEffect(() => {
        let cancelled = false;

        async function detectCurrency() {
            try {
                // Detect user's country (CORS-friendly API)
                const geoRes = await fetch("https://api.country.is/");
                const geoData = await geoRes.json();
                const countryCode = geoData?.country || "US";
                const detectedCurrency = COUNTRY_CURRENCY[countryCode] || "USD";

                if (detectedCurrency === "USD") {
                    if (!cancelled) setCurrencyData({ code: "USD", rate: 1, loading: false });
                    return;
                }

                // Fetch live exchange rate from USD to detected currency
                const rateRes = await fetch("https://open.er-api.com/v6/latest/USD");
                const rateData = await rateRes.json();
                const rate = rateData?.rates?.[detectedCurrency];

                if (!cancelled && rate) {
                    setCurrencyData({ code: detectedCurrency, rate, loading: false });
                } else if (!cancelled) {
                    setCurrencyData({ code: "USD", rate: 1, loading: false });
                }
            } catch {
                if (!cancelled) setCurrencyData({ code: "USD", rate: 1, loading: false });
            }
        }

        detectCurrency();
        return () => { cancelled = true; };
    }, []);

    const convertPrice = useCallback((basePrice) => {
        // Parse numeric value from string like "$1.99" or plain number
        const numericPrice = typeof basePrice === "string"
            ? parseFloat(basePrice.replace(/[^0-9.]/g, ""))
            : basePrice;

        if (isNaN(numericPrice)) return basePrice;

        const converted = numericPrice * currencyData.rate;

        if (currencyData.code === "USD") {
            return `$${converted.toFixed(2)}`;
        }

        if (currencyData.code === "AUD") {
            return `A$${converted.toFixed(2)}`;
        }

        try {
            return new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: currencyData.code,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(converted);
        } catch {
            return `${currencyData.code} ${converted.toFixed(2)}`;
        }
    }, [currencyData]);

    return { ...currencyData, convertPrice };
}
