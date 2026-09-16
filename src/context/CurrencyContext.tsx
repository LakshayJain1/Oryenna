"use client";

import {
  createContext,
  useSyncExternalStore,
  useContext,
} from "react";

export type CurrencyCode = "USD" | "INR";

const INR_LANGUAGES = ["en-in", "hi", "mr", "bn", "ta", "te", "kn", "ml", "gu", "pa", "ur"];
const INR_TIMEZONES = ["asia/kolkata", "asia/calcutta"];

// Web-side conversion rate used only for line items that have no INR value in Sanity
// (shipping, tax, legacy cart items). Product prices always use the authoritative
// priceINR stored in Sanity.
export const USD_TO_INR = 85;

function detectCurrency(): CurrencyCode {
  if (typeof window === "undefined") return "USD";
  try {
    const lang = (navigator.language || "").toLowerCase();
    if (INR_LANGUAGES.some((l) => lang.startsWith(l))) return "INR";
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").toLowerCase();
    if (INR_TIMEZONES.some((t) => tz === t || tz.includes(t.split("/")[1]))) return "INR";
  } catch {
    // ignore
  }
  return "USD";
}

let cachedCurrency: CurrencyCode | null = null;

function getSnapshot(): CurrencyCode {
  if (cachedCurrency === null) {
    cachedCurrency = detectCurrency();
  }
  return cachedCurrency;
}

function getServerSnapshot(): CurrencyCode {
  return "USD";
}

function subscribe(): () => void {
  return () => {};
}

function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

function formatUSD(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

interface CurrencyContextType {
  currency: CurrencyCode;
  // Formats a product price: uses the Sanity priceINR when in INR mode,
  // falls back to converting the USD price with the web-side rate if missing.
  formatPrice: (usd: number, inr?: number | null) => string;
  // Formats a derived total (shipping/tax/bag totals) — INR computed on the web.
  formatTotal: (usd: number, inr?: number | null) => string;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currency = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const formatPrice = (usd: number, inr?: number | null) => {
    if (currency === "INR") {
      if (typeof inr === "number" && !Number.isNaN(inr)) {
        return formatINR(inr);
      }
      return formatINR(usd * USD_TO_INR);
    }
    return formatUSD(usd);
  };

  const formatTotal = (usd: number, inr?: number | null) => {
    if (currency === "INR") {
      if (typeof inr === "number" && !Number.isNaN(inr)) {
        return formatINR(inr);
      }
      return formatINR(usd * USD_TO_INR);
    }
    return formatUSD(usd);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        formatPrice,
        formatTotal,
        symbol: currency === "INR" ? "₹" : "$",
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}