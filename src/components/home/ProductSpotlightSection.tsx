"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { SanityProduct } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";
import { useCart } from "@/context/CartContext";

const fallbackGallery = [
  {
    src: "/images/products/ember.png",
    alt: "Amber Candle in mouth-blown glass vessel",
    label: "Studio Vessel",
  },
  {
    src: "/images/hero/candle-linen.jpg",
    alt: "Amber Candle burning in intimate living space",
    label: "Evening Burn",
  },
  {
    src: "/images/products/santal.png",
    alt: "Amber wax blend and organic wick detail",
    label: "Melt Pool",
  },
];

const accordions = [
  {
    id: "scent",
    title: "Olfactory Architecture",
    content:
      "Formulated by master noses in Grasse using fractionated distillation. The top notes of sparkling bergamot fade gracefully after fifteen minutes, opening into a deeply comforting heart of resinous rockrose labdanum and frankincense before settling onto warm smoked cedar and balsamic benzoin.",
  },
  {
    id: "ritual",
    title: "Burn Ritual & Care",
    content:
      "On your first burn, allow the wax pool to reach the full perimeter of the glass vessel (approximately 2–3 hours). This prevents memory tunneling. Always trim the organic cotton wick to 5mm (1/4 inch) before each lighting to eliminate soot and ensure an undisturbed, steady flame.",
  },
  {
    id: "craft",
    title: "Materials & Sustainable Craft",
    content:
      "100% plant-based renewable wax poured without petroleum paraffin, phthalates, synthetic dyes, or chemical binders. Housed in recyclable Tuscan mouth-blown glass with clean unbleached cotton core wicks.",
  },
  {
    id: "delivery",
    title: "Shipping & Complimentary Samples",
    content:
      "Every order is hand-wrapped in tissue paper, tied with unbleached linen cord, and includes two complimentary 2ml Eau de Parfum vials of your choice. Complimentary carbon-neutral courier shipping on orders over $150.",
  },
];

type ProductSpotlightSectionProps = {
  spotlightProduct?: SanityProduct;
};

export function ProductSpotlightSection({ spotlightProduct }: ProductSpotlightSectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<"standard" | "grande">("standard");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("scent");
  const [isAdding, setIsAdding] = useState(false);

  const { addToCart } = useCart();

  const basePrice = spotlightProduct?.price || 78;
  const price = selectedSize === "standard" ? basePrice : Math.round(basePrice * 1.54);
  const weight = selectedSize === "standard" ? (spotlightProduct?.weight || "290G / 10.2 OZ") : "500G / 17.6 OZ";
  const burnTime = selectedSize === "standard" ? (spotlightProduct?.burnTime || "55 Hours") : "90 Hours";
  const productName = spotlightProduct?.name || "Amber";

  const sanityMainImage =
    spotlightProduct?.image?.asset?.url ||
    urlForImage(spotlightProduct?.image)?.url();

  const galleryImages = [
    {
      src: sanityMainImage || fallbackGallery[0].src,
      alt: `${productName} Candle in mouth-blown glass vessel`,
      label: "Studio Vessel",
    },
    fallbackGallery[1],
    fallbackGallery[2],
  ];

  const topNotes = spotlightProduct?.topNotes || "Bergamot & Pink Pepper";
  const heartNotes = spotlightProduct?.heartNotes || "Amber & Labdanum";
  const baseNotes = spotlightProduct?.baseNotes || "Smoked Cedar & Benzoin";
  const story = spotlightProduct?.description || "Inspired by the quiet amber light of late November in Aix-en-Provence. Dry birch logs, golden rockrose resin, and soft ribbons of incense that linger in fabrics long after the wick is snuffed.";

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(
      {
        id: selectedSize === "standard" ? (spotlightProduct?._id || "amber") : `${spotlightProduct?._id || "amber"}-grande`,
        name: `${productName} Candle (${selectedSize === "standard" ? "Standard" : "Grande"})`,
        price,
        weight,
        notes: spotlightProduct?.notes || "Warm Woods · Amber · Smoke",
        image: galleryImages[0].src,
      },
      quantity,
      selectedSize === "standard" ? "290G (STANDARD)" : "500G (GRANDE)"
    );
    setTimeout(() => setIsAdding(false), 800);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Interactive Product Gallery */}
          <div className="flex flex-col lg:col-span-6">
            {/* Main Featured Image */}
            <div className="relative h-[440px] w-full overflow-hidden border border-ory-divider/40 bg-ory-surface/40 sm:h-[520px]">
              <Image
                src={galleryImages[activeImageIndex].src}
                alt={galleryImages[activeImageIndex].alt}
                fill
                className="object-contain p-6 transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
              <span className="absolute left-4 top-4 border border-ory-divider/40 bg-ory-cream/95 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-ory-ink shadow-xs backdrop-blur-md">
                Signature Spotlight
              </span>
            </div>

            {/* Thumbnail selector */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {galleryImages.map((img, idx) => {
                const isSelected = activeImageIndex === idx;
                return (
                  <button
                    key={img.label}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`group relative h-24 overflow-hidden border transition-all ${
                      isSelected
                        ? "border-ory-ink ring-1 ring-ory-ink"
                        : "border-ory-divider/50 hover:border-ory-muted opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-ory-cream/90 py-0.5 text-center text-[9px] uppercase tracking-wider text-ory-ink">
                      {img.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Specifications, Pyramid, Size & Accordion */}
          <div className="flex flex-col lg:col-span-6">
            <SectionEyebrow>05 / Product Deep-Dive</SectionEyebrow>

            <div className="mt-2 flex items-baseline justify-between">
              <h2 className="font-serif text-[34px] uppercase tracking-[0.08em] text-ory-ink sm:text-[42px]">
                {productName} Candle
              </h2>
              <span className="font-serif text-[26px] text-ory-ink">
                ${price}
              </span>
            </div>

            {/* Rating Stars */}
            <div className="mt-2 flex items-center gap-2 text-[12px] text-ory-muted">
              <span className="tracking-widest text-ory-accent">★★★★★</span>
              <span className="font-medium text-ory-ink">4.9</span>
              <span>·</span>
              <span>128 Atelier Reviews</span>
            </div>

            <p className="mt-4 text-[14px] leading-[26px] text-ory-body">
              {story}
            </p>

            {/* Olfactory Pyramid Accord Card */}
            <div className="mt-6 border border-ory-divider/40 bg-ory-cream-deep p-4 sm:p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-ory-accent">
                Olfactory Pyramid
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3 text-left">
                <div className="border-r border-ory-divider/40 pr-2">
                  <span className="text-[9px] uppercase tracking-widest text-ory-muted">Top</span>
                  <p className="mt-1 text-[12px] font-medium text-ory-ink leading-tight">
                    {topNotes}
                  </p>
                </div>
                <div className="border-r border-ory-divider/40 pr-2">
                  <span className="text-[9px] uppercase tracking-widest text-ory-muted">Heart</span>
                  <p className="mt-1 text-[12px] font-medium text-ory-ink leading-tight">
                    {heartNotes}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-ory-muted">Base</span>
                  <p className="mt-1 text-[12px] font-medium text-ory-ink leading-tight">
                    {baseNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-ory-muted">
                <span>Vessel Size</span>
                <span>Burn time: ~{burnTime}</span>
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
                  <span>${basePrice}</span>
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
                  <span>${Math.round(basePrice * 1.54)}</span>
                </button>
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag */}
            <div className="mt-6 flex items-center gap-3">
              {/* Stepper */}
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

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex h-[48px] flex-1 items-center justify-center border border-ory-ink bg-ory-ink text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-ory-ink/90 active:scale-[0.98]"
              >
                {isAdding ? "Added to Bag ✓" : `Add to Bag — $${price * quantity}`}
              </button>
            </div>

            {/* Accordion Tabs */}
            <div className="mt-8 border-t border-ory-divider/40">
              {accordions.map((acc) => {
                const isOpen = openAccordion === acc.id;
                return (
                  <div key={acc.id} className="border-b border-ory-divider/30">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(acc.id)}
                      className="flex w-full items-center justify-between py-4 text-left text-[11px] uppercase tracking-[0.16em] text-ory-ink font-medium transition-colors hover:text-ory-accent"
                    >
                      <span>{acc.title}</span>
                      <span className="text-[16px] leading-none text-ory-muted">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-4 text-[13px] leading-relaxed text-ory-body/90">
                        {acc.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
