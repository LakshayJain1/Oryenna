import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { SanitySiteSettings } from "@/sanity/types";

type SanctuarySectionProps = {
  settings?: SanitySiteSettings | null;
};

export function SanctuarySection({ settings }: SanctuarySectionProps) {
  const headline =
    settings?.sanctuaryHeadline ?? "We Believe a Home Should Have a Feeling.";
  const quote =
    settings?.sanctuaryQuote ??
    "An object in your home should either serve an indispensable purpose or bring your nervous system back into alignment.";
  const text =
    settings?.sanctuaryText ??
    "We reject industrial high-pressure candle manufacturing. Every batch is measured by hand in our Provence glasshouse, using cold-pressed plant oils and small-batch essential oil distillates that honour the botanical complexity of the Mediterranean seasons.";
  const caption =
    settings?.sanctuaryCaption ??
    "The Glasshouse Atelier — Wild-harvested botanicals dried in Grasse";

  return (
    <section id="about" className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Philosophy Statement */}
          <div className="flex flex-col lg:col-span-6">
            <SectionEyebrow>Manifesto &amp; Terroir</SectionEyebrow>
            <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
              {headline}
            </h2>

            <p className="mt-6 font-display text-[20px] italic leading-relaxed text-ory-body sm:text-[23px]">
              &ldquo;{quote}&rdquo;
            </p>

            <p className="mt-4 text-[14px] leading-[26px] text-ory-body/85">
              {text}
            </p>

            <div className="mt-8 flex items-center gap-6 border-t border-ory-divider/40 pt-6">
              <div>
                <p className="font-serif text-[24px] text-ory-ink">38°N</p>
                <p className="text-[10px] uppercase tracking-widest text-ory-muted">Latitude Sourced</p>
              </div>
              <div className="h-8 w-px bg-ory-divider/50" />
              <div>
                <p className="font-serif text-[24px] text-ory-ink">Zero</p>
                <p className="text-[10px] uppercase tracking-widest text-ory-muted">Petroleum Waxes</p>
              </div>
              <div className="h-8 w-px bg-ory-divider/50" />
              <div>
                <p className="font-serif text-[24px] text-ory-ink">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-ory-muted">Recyclable Glass</p>
              </div>
            </div>
          </div>

          {/* Right Column: Atelier Still Life Photo */}
          <div className="relative lg:col-span-6">
            <div className="relative h-[420px] w-full overflow-hidden border border-ory-divider/40 bg-ory-surface sm:h-[500px]">
              <Image
                src="/images/hero/candle-linen.jpg"
                alt="Apothecary tinctures and glass vessels in the Oryenna glasshouse atelier"
                fill
                className="object-cover filter saturate-[0.8] contrast-[0.95]"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ory-ink/40 via-transparent to-transparent" />
            </div>
            <p className="mt-3 text-right text-[11px] uppercase tracking-[0.16em] text-ory-muted">
              {caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

