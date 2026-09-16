"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useCurrency, USD_TO_INR } from "@/context/CurrencyContext";

export type AddToBagProduct = {
  id: string;
  name: string;
  price: number;
  priceINR?: number;
  weight: string;
  notes: string;
  image: string;
};

type AddToBagButtonProps = {
  product: AddToBagProduct;
  label?: string;
  className?: string;
};

export function AddToBagButton({ product, label, className }: AddToBagButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={
        className ||
        "flex h-[42px] w-full items-center justify-center border border-ory-divider/60 bg-ory-surface/60 text-[11px] font-medium uppercase tracking-[0.18em] text-ory-ink transition-all duration-200 hover:bg-ory-ink hover:text-white hover:border-ory-ink active:scale-[0.98]"
      }
    >
      {isAdding
        ? "Added to Bag ✓"
        : label || "Add to Bag"}
    </button>
  );
}

type ProductDetailAddToCartProps = {
  _id: string;
  name: string;
  price: number;
  priceINR?: number;
  weight: string;
  notes: string;
  image: string;
  badge?: string;
  inStock?: boolean;
};

export function ProductDetailAddToCart({
  _id,
  name,
  price,
  priceINR,
  weight,
  notes,
  image,
  inStock,
}: ProductDetailAddToCartProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const standPrice = price;
  const standPriceINR = priceINR ?? Math.round(price * USD_TO_INR);
  const grandePrice = Math.round(price * 1.54);
  const grandePriceINR = Math.round(standPriceINR * 1.54);

  const [selectedSize, setSelectedSize] = useState<"standard" | "grande">("standard");
  const activePrice = selectedSize === "standard" ? standPrice : grandePrice;
  const activePriceINR = selectedSize === "standard" ? standPriceINR : grandePriceINR;
  const activeWeight = selectedSize === "standard" ? weight : "500G / 17.6 OZ";

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(
      {
        id: selectedSize === "standard" ? _id : `${_id}-grande`,
        name: `${name} Candle (${selectedSize === "standard" ? "Standard" : "Grande"})`,
        price: activePrice,
        priceINR: activePriceINR,
        weight: activeWeight,
        notes,
        image,
      },
      quantity
    );
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div className="border border-ory-divider/40 bg-ory-cream p-6">
      {/* Size selector */}
      <div className="space-y-1 text-[10px] uppercase tracking-[0.18em] text-ory-muted">
        <span>Vessel Size</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setSelectedSize("standard")}
          className={`flex items-center justify-between border p-3 text-[11px] uppercase tracking-[0.14em] transition-all ${
            selectedSize === "standard"
              ? "border-ory-ink bg-ory-ink text-white"
              : "border-ory-divider/60 bg-ory-cream text-ory-body hover:border-ory-ink"
          }`}
        >
          <span>290G (Standard)</span>
          <span>{formatPrice(standPrice, standPriceINR)}</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedSize("grande")}
          className={`flex items-center justify-between border p-3 text-[11px] uppercase tracking-[0.14em] transition-all ${
            selectedSize === "grande"
              ? "border-ory-ink bg-ory-ink text-white"
              : "border-ory-divider/60 bg-ory-cream text-ory-body hover:border-ory-ink"
          }`}
        >
          <span>500G (Grande)</span>
          <span>{formatPrice(grandePrice, grandePriceINR)}</span>
        </button>
      </div>

      {/* Quantity + Add to Bag */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-[48px] items-center border border-ory-divider/60 bg-ory-cream">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3.5 text-ory-body hover:text-ory-ink"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-[12px] font-medium text-ory-ink">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3.5 text-ory-body hover:text-ory-ink"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!inStock}
          className="flex h-[48px] flex-1 items-center justify-center border border-ory-ink bg-ory-ink text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-ory-ink/90 active:scale-[0.98] disabled:opacity-50"
        >
          {isAdding
            ? "Added to Bag ✓"
            : `Add to Bag — ${formatPrice(activePrice * quantity, activePriceINR * quantity)}`}
        </button>
      </div>
    </div>
  );
}
