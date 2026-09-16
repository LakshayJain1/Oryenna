"use client";

import { useCurrency } from "@/context/CurrencyContext";

type PriceProps = {
  usd: number;
  inr?: number | null;
  as?: "price" | "total";
  className?: string;
};

export function Price({ usd, inr, as = "price", className }: PriceProps) {
  const { formatPrice, formatTotal } = useCurrency();
  const text =
    as === "total"
      ? formatTotal(usd, inr)
      : formatPrice(usd, inr);

  return <span className={className}>{text}</span>;
}