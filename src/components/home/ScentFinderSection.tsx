"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { SanityMoodRecommendation } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";
import { moodRecommendations as fallbackMoods } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useCurrency, USD_TO_INR } from "@/context/CurrencyContext";

const moods = [
  { id: "quiet", label: "Quiet" },
  { id: "grounded", label: "Grounded" },
  { id: "uplifted", label: "Uplifted" },
  { id: "warm", label: "Warm" },
] as const;

type ScentFinderSectionProps = {
  moodRecommendations?: SanityMoodRecommendation[];
};

export function ScentFinderSection({ moodRecommendations }: ScentFinderSectionProps) {
  const [activeMood, setActiveMood] = useState<string>("quiet");
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Find matching from Sanity or fallback
  const sanityRec = moodRecommendations?.find((m) => m.mood === activeMood);
  const fallbackRec = fallbackMoods[activeMood as keyof typeof fallbackMoods];

  const label = sanityRec?.label || fallbackRec?.label || "Atmosphere";
  const tagline = sanityRec?.tagline || fallbackRec?.tagline || "Curated Scent";
  const description = sanityRec?.description || fallbackRec?.description || "";
  const bestFor = sanityRec?.bestFor || fallbackRec?.bestFor || "";

  const warmth = sanityRec?.warmth ?? fallbackRec?.scentProfile.warmth ?? 60;
  const intensity = sanityRec?.intensity ?? fallbackRec?.scentProfile.intensity ?? 60;
  const clarity = sanityRec?.clarity ?? fallbackRec?.scentProfile.clarity ?? 80;

  const candleName = sanityRec?.product?.name || fallbackRec?.candleName || "Oryenna Candle";
  const candlePrice = sanityRec?.product?.price ?? fallbackRec?.price ?? 78;
  const candlePriceINR =
    sanityRec?.product?.priceINR ?? Math.round(candlePrice * USD_TO_INR);
  const candleWeight = sanityRec?.product?.weight || fallbackRec?.weight || "290G / 10.2 OZ";
  const candleNotes = sanityRec?.product?.notes || fallbackRec?.notes || "";
  const candleId = sanityRec?.product?._id || fallbackRec?.candleId || "candle";
  const { formatPrice } = useCurrency();

  const candleImage =
    sanityRec?.product?.image?.asset?.url ||
    urlForImage(sanityRec?.product?.image)?.url() ||
    fallbackRec?.image ||
    "/images/products/santal.png";

  const handleQuickAdd = () => {
    setIsAdded(true);
    addToCart(
      {
        id: candleId,
        name: candleName,
        price: candlePrice,
        priceINR: candlePriceINR,
        weight: candleWeight,
        notes: candleNotes,
        image: candleImage,
      },
      1
    );
    setTimeout(() => setIsAdded(false), 800);
  };

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <SectionEyebrow>04 / Olfactory Guide</SectionEyebrow>
          <h2 className="mt-2 font-serif text-[32px] uppercase leading-tight tracking-[0.1em] text-ory-ink sm:text-[42px]">
            What Should the Room Feel Like?
          </h2>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ory-body">
            Scent alters the emotional geometry of space. Select the state of mind you wish to invoke:
          </p>

          {/* Mood Selector Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {moods.map((mood) => {
              const isActive = activeMood === mood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setActiveMood(mood.id)}
                  className={`relative px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-200 active:scale-[0.97] ${
                    isActive
                      ? "border border-ory-ink bg-ory-ink text-white shadow-xs"
                      : "border border-ory-divider/60 bg-ory-cream text-ory-body hover:border-ory-ink hover:text-ory-ink"
                  }`}
                >
                  {mood.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Recommendation Card matching Figma */}
        <div className="mt-12 overflow-hidden border border-ory-divider/50 bg-ory-cream shadow-[0_8px_30px_rgba(75,58,46,0.04)]">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            {/* Left Content Side */}
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-7">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ory-accent font-medium">
                  <span>Prescribed Atmosphere</span>
                  <span className="h-px w-6 bg-ory-divider" />
                  <span>{label}</span>
                </div>

                <h3 className="mt-3 font-serif text-[28px] uppercase tracking-[0.06em] text-ory-ink sm:text-[34px]">
                  {tagline}
                </h3>

                <p className="mt-4 text-[14px] leading-[26px] text-ory-body/90">
                  {description}
                </p>

                {/* Scent Profile Meter Bars */}
                <div className="mt-8 space-y-3.5 border-t border-ory-divider/30 pt-6">
                  <div>
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.16em] text-ory-muted">
                      <span>Atmospheric Warmth</span>
                      <span>{warmth}%</span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden bg-ory-divider/30">
                      <div
                        className="h-full bg-ory-accent transition-all duration-500 ease-out"
                        style={{ width: `${warmth}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.16em] text-ory-muted">
                      <span>Projection & Throw</span>
                      <span>{intensity}%</span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden bg-ory-divider/30">
                      <div
                        className="h-full bg-ory-ink transition-all duration-500 ease-out"
                        style={{ width: `${intensity}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.16em] text-ory-muted">
                      <span>Botanical Clarity</span>
                      <span>{clarity}%</span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden bg-ory-divider/30">
                      <div
                        className="h-full bg-ory-accent/80 transition-all duration-500 ease-out"
                        style={{ width: `${clarity}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-2 bg-ory-cream-deep/60 p-3.5 border border-ory-divider/30">
                  <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-ory-ink">
                    Ideal Sanctuary:
                  </span>
                  <span className="text-[12px] text-ory-body">
                    {bestFor}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleQuickAdd}
                  className="flex h-[46px] items-center justify-center border border-ory-ink bg-ory-ink px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-ory-ink/90 active:scale-[0.98]"
                >
                  {isAdded ? "Added to Bag ✓" : `Add ${candleName} — ${formatPrice(candlePrice, candlePriceINR)}`}
                </button>
              </div>
            </div>

            {/* Right Candle Preview Side */}
            <div className="relative flex flex-col items-center justify-center border-t border-ory-divider/40 bg-ory-surface/40 p-8 sm:p-12 lg:col-span-5 lg:border-l lg:border-t-0">
              <div className="relative h-[280px] w-[240px] overflow-hidden drop-shadow-md sm:h-[320px] sm:w-[270px]">
                <Image
                  src={candleImage}
                  alt={candleName}
                  fill
                  className="object-contain transition-transform duration-500"
                  sizes="270px"
                />
              </div>

              <div className="mt-6 text-center">
                <p className="font-serif text-[20px] uppercase tracking-[0.12em] text-ory-ink">
                  {candleName}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ory-accent">
                  {candleNotes}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ory-muted">
                  {candleWeight} · {formatPrice(candlePrice, candlePriceINR)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
