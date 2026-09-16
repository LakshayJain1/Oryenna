"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCurrency, USD_TO_INR } from "@/context/CurrencyContext";

export function BagDrawer() {
  const {
    items,
    isBagOpen,
    setIsBagOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    subtotalINR,
    freeShippingThreshold,
    isFreeShippingEligible,
    amountToFreeShipping,
  } = useCart();
  const { formatTotal, formatPrice } = useCurrency();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isBagOpen) {
        setIsBagOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBagOpen, setIsBagOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isBagOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isBagOpen]);

  if (!isBagOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const shippingUSD = isFreeShippingEligible ? 0 : 8;
  const shippingINR = Math.round(shippingUSD * USD_TO_INR);
  const totalUSD = subtotal + shippingUSD;
  const totalINR = subtotalINR + shippingINR;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        onClick={() => setIsBagOpen(false)}
        className="fixed inset-0 bg-ory-ink/40 backdrop-blur-[3px] transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className="relative z-10 flex h-full w-full max-w-[460px] flex-col border-l border-ory-divider/50 bg-ory-cream shadow-2xl transition-transform duration-300 ease-out"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-drawer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ory-divider/40 px-6 py-5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-ory-accent font-medium">
              Atelier Bag
            </span>
            <h2
              id="bag-drawer-title"
              className="font-serif text-[22px] uppercase tracking-[0.06em] text-ory-ink"
            >
              A Considered Purchase.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsBagOpen(false)}
            className="flex size-9 items-center justify-center rounded-full border border-ory-divider/50 text-ory-body transition-colors hover:border-ory-ink hover:text-ory-ink"
            aria-label="Close bag"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="border-b border-ory-divider/30 bg-ory-cream-deep/70 px-6 py-3.5">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-ory-body">
            {isFreeShippingEligible ? (
              <span className="text-ory-accent font-medium">
                ✓ Complimentary white-glove shipping unlocked
              </span>
            ) : (
              <span>
                Add <strong className="text-ory-ink font-semibold">{formatTotal(amountToFreeShipping)}</strong> for complimentary shipping
              </span>
            )}
            <span className="text-[10px] text-ory-muted">{progressPercent}%</span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden bg-ory-divider/30">
            <div
              className="h-full bg-ory-accent transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-serif text-[20px] text-ory-ink">Your bag is empty.</p>
              <p className="mt-1 text-[13px] text-ory-muted">
                Explore our curated releases to inhabit your space with deliberate calm.
              </p>
              <button
                type="button"
                onClick={() => setIsBagOpen(false)}
                className="mt-6 border border-ory-ink bg-ory-ink px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] text-white"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-ory-divider/30 pb-4"
                >
                  {/* Item Image */}
                  <div className="relative size-20 shrink-0 overflow-hidden border border-ory-divider/40 bg-ory-surface">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="font-serif text-[16px] uppercase tracking-[0.04em] text-ory-ink leading-tight">
                          {item.name}
                        </h3>
                        <p className="font-serif text-[15px] text-ory-ink">
                          {formatPrice(
                            item.price * item.quantity,
                            (item.priceINR ?? Math.round(item.price * USD_TO_INR)) * item.quantity
                          )}
                        </p>
                      </div>

                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-ory-accent font-medium">
                        {item.notes}
                      </p>

                      <p className="text-[10px] text-ory-muted">
                        {item.size || item.weight}
                      </p>
                    </div>

                    {/* Quantity controls & Remove */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex h-7 items-center border border-ory-divider/60 bg-ory-cream">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 text-[12px] text-ory-body hover:text-ory-ink"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-[11px] font-medium text-ory-ink">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 text-[12px] text-ory-body hover:text-ory-ink"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] uppercase tracking-widest text-ory-muted hover:text-ory-ink transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout Action */}
        {items.length > 0 && (
          <div className="border-t border-ory-divider/40 bg-ory-cream-deep/60 p-6">
            <div className="space-y-1.5 text-[12px]">
              <div className="flex justify-between text-ory-body">
                <span>Subtotal</span>
                <span className="font-serif text-[16px] text-ory-ink">
                  {formatTotal(subtotal, subtotalINR)}
                </span>
              </div>
              <div className="flex justify-between text-ory-muted text-[11px]">
                <span>Atelier Shipping</span>
                <span>{isFreeShippingEligible ? "Complimentary" : formatTotal(shippingUSD, shippingINR)}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-ory-divider/30 flex justify-between font-serif text-[18px] text-ory-ink">
              <span>Estimated Total</span>
              <span>{formatTotal(totalUSD, totalINR)}</span>
            </div>

            <p className="mt-2 text-[10px] text-ory-muted">
              Includes two complimentary 2ml ritual samples of your choice at checkout.
            </p>

            <Link
              href="/checkout"
              onClick={() => setIsBagOpen(false)}
              className="mt-4 flex h-[48px] w-full items-center justify-center border border-ory-ink bg-ory-ink text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-ory-ink/90 active:scale-[0.98]"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
