import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { SanitySiteSettings } from "@/sanity/types";

const DEFAULT_CRAFT_SPECS = [
  {
    title: "Mouth-Blown Glass",
    subtitle: "Tuscan Artisan Glass",
    desc: "Heavyweight base with soft tactile curves. Reusable as an aperitif glass or keepsake vessel once consumed.",
  },
  {
    title: "Braided Organic Cotton",
    subtitle: "Zero Lead or Zinc",
    desc: "Custom flat-braided wicks designed for an even melt pool without black smoke or mushrooming residue.",
  },
  {
    title: "Wild Botanical Distillates",
    subtitle: "Southern Grasse Terroir",
    desc: "Blended in small batch cold macerations using responsibly foraged pine, wild lavender, and resin tears.",
  },
];

type CraftSectionProps = {
  settings?: SanitySiteSettings | null;
};

export function CraftSection({ settings }: CraftSectionProps) {
  const headline = settings?.craftHeadline ?? "A Ritual, Not Just a Scent.";
  const quote =
    settings?.craftQuote ??
    "We don\u2019t formulate fragrances to overpower a room; we formulate them to inhabit it gently.";
  const quoteAuthor = settings?.craftQuoteAuthor ?? "Atelier Oryenna";
  const quoteLocation = settings?.craftQuoteLocation ?? "Grasse, France";
  const story =
    settings?.craftStory ??
    "Lighting a wick is a quiet threshold. It marks the deliberate boundary between the noise of the day and the sanctuary of the evening. Each candle requires three separate hand-pours over forty-eight hours to achieve a perfectly level, void-free surface. We deliberately refrain from synthetic stabilizers or paraffin wax, allowing our pure botanical wax to breathe and diffuse scent with natural, unhurried subtlety.";
  const craftSpecs =
    settings?.craftSpecs && settings.craftSpecs.length > 0
      ? settings.craftSpecs.map((s) => ({ title: s.title, subtitle: s.subtitle, desc: s.desc }))
      : DEFAULT_CRAFT_SPECS;

  return (
    <section id="ritual" className="border-t border-ory-divider/40 bg-ory-cream px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Atmospheric photo with overlaid quote */}
          <div className="relative lg:col-span-6">
            <div className="relative h-[480px] w-full overflow-hidden border border-ory-divider/40 sm:h-[560px]">
              <Image
                src="/images/hero/candle-linen.jpg"
                alt="Hands gently lighting a hand-poured Oryenna candle"
                fill
                className="object-cover object-center filter saturate-[0.85] contrast-[0.95]"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ory-ink/60 via-ory-ink/10 to-transparent" />

              {/* Quote card badge over image */}
              <div className="absolute bottom-6 left-6 right-6 border border-white/20 bg-ory-cream/95 p-6 backdrop-blur-md shadow-lg sm:bottom-8 sm:left-8 sm:right-8">
                <p className="font-display text-[17px] italic leading-snug text-ory-ink sm:text-[19px]">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-ory-divider/40 pt-2 text-[10px] uppercase tracking-[0.2em] text-ory-muted">
                  <span>{quoteAuthor}</span>
                  <span>{quoteLocation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Storytelling & Craft Specs */}
          <div className="flex flex-col lg:col-span-6">
            <SectionEyebrow>03 / Craft &amp; Ritual</SectionEyebrow>
            <h2 className="mt-2 font-serif text-[36px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
              {headline}
            </h2>

            <p className="mt-6 text-[14px] leading-[26px] text-ory-body/85">
              {story}
            </p>

            {/* 3 craft specs */}
            <div className="mt-10 grid grid-cols-1 gap-5 border-t border-ory-divider/40 pt-8 sm:grid-cols-3">
              {craftSpecs.map((spec) => (
                <div key={spec.title} className="flex flex-col">
                  <span className="font-serif text-[15px] font-medium text-ory-ink">
                    {spec.title}
                  </span>
                  <span className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-ory-accent font-medium">
                    {spec.subtitle}
                  </span>
                  <p className="mt-2 text-[12px] leading-relaxed text-ory-muted">
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

