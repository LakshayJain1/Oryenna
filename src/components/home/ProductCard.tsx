"use client";

import Image from "next/image";
import { useState } from "react";
import type { SanityProduct } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: SanityProduct | {
    id?: string;
    _id?: string;
    name: string;
    price: number;
    badge?: string;
    notes: string;
    description: string;
    weight: string;
    burnTime?: string;
    image: any;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Resolve image URL from Sanity image object or local string
  const imageUrl =
    typeof product.image === "string"
      ? product.image
      : product.image?.asset?.url ||
        urlForImage(product.image)?.url() ||
        "/images/products/ember.png";

  const productId = (product as any)._id || (product as any).id || (product as any).slug || product.name.toLowerCase();

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(
      {
        id: productId,
        name: product.name,
        price: product.price,
        weight: product.weight,
        notes: product.notes,
        image: imageUrl,
      },
      1
    );
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <article className="group flex flex-col border border-ory-divider/40 bg-ory-cream transition-all duration-300 hover:border-ory-divider hover:shadow-[0_8px_24px_rgba(75,58,46,0.06)]">
      <div className="relative bg-ory-surface/40 overflow-hidden">
        <div className="relative h-[340px] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${product.name} candle`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 280px"
          />
        </div>
        {product.badge && (
          <span className="absolute left-3 top-3 border border-ory-divider/40 bg-ory-cream/95 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-ory-ink shadow-xs backdrop-blur-md">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-baseline justify-between text-ory-ink">
            <h3 className="font-serif text-[20px] font-medium uppercase tracking-[0.14em]">
              {product.name}
            </h3>
            <p className="font-serif text-[18px] text-ory-ink">${product.price}</p>
          </div>

          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ory-accent font-medium">
            {product.notes}
          </p>

          <p className="mt-2 text-[12px] leading-relaxed text-ory-body/90 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-ory-divider/30">
          <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-[0.18em] text-ory-muted">
            <span>{product.weight}</span>
            {product.burnTime && <span>{product.burnTime}</span>}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex h-[42px] w-full items-center justify-center border border-ory-divider/60 bg-ory-surface/60 text-[11px] font-medium uppercase tracking-[0.18em] text-ory-ink transition-all duration-200 hover:bg-ory-ink hover:text-white hover:border-ory-ink active:scale-[0.98]"
          >
            {isAdding ? "Added to Bag ✓" : "Add to Bag"}
          </button>
        </div>
      </div>
    </article>
  );
}
