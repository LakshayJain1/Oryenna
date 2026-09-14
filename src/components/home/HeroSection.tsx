import Image from "next/image";
import Link from "next/link";
import type { SanitySiteSettings } from "@/sanity/types";

type HeroSectionProps = {
  settings?: SanitySiteSettings | null;
};

export function HeroSection({ settings }: HeroSectionProps) {
  const eyebrow = settings?.heroEyebrow ?? "Atelier de Parfum d'Intérieur";
  const headline = settings?.heroHeadline ?? "Oryenna";
  const tagline = settings?.heroTagline ?? "Light a calmer you.";
  const subtext =
    settings?.heroSubtext ??
    "Scents and spaces designed for slower moments. Poured by hand into mouth-blown glass vessels using European rapeseed and wild botanicals.";

  return (
    <section className="relative flex min-h-[700px] items-center justify-center overflow-hidden bg-ory-cream-deep py-16">
      {/* Background imagery with luxury overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/candle-linen.jpg"
          alt="Oryenna signature candle surrounded by raw linen and olive botanical leaves"
          fill
          priority
          className="object-cover object-center filter saturate-[0.85] contrast-[0.95]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ory-cream/85 via-ory-cream/50 to-ory-cream/95 backdrop-blur-[0.5px]" />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center px-6 pb-16 pt-24 text-center sm:px-16">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-ory-divider" />
          <p className="text-[10px] uppercase tracking-[0.26em] text-ory-accent font-medium">
            {eyebrow}
          </p>
          <span className="h-px w-8 bg-ory-divider" />
        </div>

        <h1 className="font-serif text-[60px] uppercase leading-none tracking-[0.14em] text-ory-ink sm:text-[80px] lg:text-[92px]">
          {headline}
        </h1>

        <p className="mt-3 font-display text-[26px] italic leading-tight tracking-wide text-ory-body sm:text-[32px]">
          {tagline}
        </p>

        <p className="mt-4 max-w-md text-[14px] leading-[26px] tracking-wide text-ory-body/90 sm:text-[15px]">
          {subtext}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#shop"
            className="border border-ory-ink bg-ory-ink px-9 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white shadow-xs transition-all hover:bg-ory-ink/90 active:scale-[0.98]"
          >
            Explore Collection
          </Link>
          <Link
            href="#about"
            className="border border-ory-divider/70 bg-ory-cream/70 px-9 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ory-ink backdrop-blur-sm transition-all hover:border-ory-ink hover:bg-ory-cream active:scale-[0.98]"
          >
            Read Philosophy
          </Link>
        </div>

        <div className="mt-14 flex flex-col items-center gap-2 opacity-70">
          <p className="text-[9px] uppercase tracking-[0.24em] text-ory-muted">
            Scroll to Inhabit
          </p>
          <Image
            src="/icons/scroll-arrow.svg"
            alt=""
            width={11}
            height={15}
            className="h-[14px] w-[10px] animate-bounce opacity-80"
          />
        </div>
      </div>
    </section>
  );
}
