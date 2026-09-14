import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { SanitySiteSettings } from "@/sanity/types";

const DEFAULT_METRICS = [
  {
    value: "100%",
    label: "Botanical Wax Blend",
    description: "European rapeseed & clean soy without petroleum paraffin.",
  },
  {
    value: "55+ Hrs",
    label: "Clean Slow Burn",
    description: "Double unbleached organic cotton core wick.",
  },
  {
    value: "Small Batch",
    label: "Handcrafted Atelier",
    description: "Numbered pours made in southern Grasse & Provence.",
  },
];

type ManifestoSectionProps = {
  settings?: SanitySiteSettings | null;
};

export function ManifestoSection({ settings }: ManifestoSectionProps) {
  const eyebrow = settings?.manifestoEyebrow ?? "01 / Manifeste";
  const headline = settings?.manifestoHeadline ?? "Beauty in a Quieter World.";
  const quote =
    settings?.manifestoQuote ??
    "Oryenna was founded on the belief that scent is an invisible architecture — shaping the energy, stillness, and emotional landscape of the rooms we inhabit. Hand-poured with pure renewable botanical wax and wild distillates, each vessel is an invitation to pause, exhale, and arrive fully in the present.";
  const metrics =
    settings?.manifestoMetrics && settings.manifestoMetrics.length > 0
      ? settings.manifestoMetrics
      : DEFAULT_METRICS;

  return (
    <section className="bg-ory-cream px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1152px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
            {headline}
          </h2>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-8">
          <p className="font-display text-[20px] italic leading-relaxed tracking-wide text-ory-body sm:text-[23px]">
            {quote}
          </p>

          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className="border border-ory-divider/40 bg-ory-cream-deep/70 p-5 transition-colors hover:border-ory-divider"
              >
                <p className="font-serif text-[26px] text-ory-ink">
                  {metric.value}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-ory-accent font-medium">
                  {metric.label}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-ory-muted">
                  {metric.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

