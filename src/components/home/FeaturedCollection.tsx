import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { SanityProduct } from "@/sanity/types";
import { ProductCard } from "./ProductCard";

type FeaturedCollectionProps = {
  products?: SanityProduct[];
};

export function FeaturedCollection({ products }: FeaturedCollectionProps) {
  const displayProducts = products && products.length > 0 ? products : [];

  return (
    <section id="shop" className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>02 / Signature Pours</SectionEyebrow>
            <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
              Curated Releases
            </h2>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ory-body">
              Four distinct olfactory landscapes poured into mouth-blown glass vessels using European rapeseed and soy waxes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ory-body font-medium">
            <span>Archive Vol. 04</span>
            <span className="h-px w-6 bg-ory-divider" />
            <span className="text-ory-accent">In Stock</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((product) => (
            <ProductCard key={product._id || product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
