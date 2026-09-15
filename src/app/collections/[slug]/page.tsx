"use client";

import { client } from "@/sanity/client";
import { COLLECTION_BY_SLUG_QUERY } from "@/sanity/queries";
import type { SanityCollection } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";

type CollectionPageProps = {
  params: { slug: string };
};

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collection: SanityCollection | null = await client.fetch<SanityCollection>(
    COLLECTION_BY_SLUG_QUERY,
    { slug: params.slug }
  );

  if (!collection) {
    return (
      <div className="min-h-screen bg-ory-cream-deep p-8">
        <h1 className="text-ory-ink text-3xl font-serif">Collection not found</h1>
      </div>
    );
  }

  const products = collection.products || [];

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          {/* Collection Header */}
          <div className="border-b border-ory-divider/40 pb-8 mb-8">
            <h2 className="font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
              {collection.name}
            </h2>
            {collection.description && (
              <p className="mt-2 text-[16px] text-ory-body/80">
                {collection.description}
              </p>
            )}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols{4 + ''}">
            {products.length > 0 ? (
              products.map((product: any) => (
                <article key={product._id} className="border border-ory-divider/40 bg-ory-cream p-5 transition-all duration-300 hover:border-ory-divider hover:shadow-[0_8px_24px_rgba(75,58,46,0.06)]">
                  <div className="relative bg-ory-surface/40 overflow-hidden">
                    <div className="relative h-[280px] w-full overflow-hidden">
                      <Image
                        src={product.image?.asset?.url || "/images/products/ember.png"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="80px"
                      />
                    </div>
                    {product.badge && (
                      <span className="absolute left-3 top-3 border border-ory-divider/40 bg-ory-cream/95 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-ory-ink shadow-xs backdrop-blur-md">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h3 className="font-serif text-[20px] font-medium uppercase tracking-[0.14em]">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-[18px] text-ory-ink">${product.price}</p>
                    </div>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ory-accent font-medium">
                      {product.notes}
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-ory-body/90 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-ory-divider/30">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-ory-muted">
                      <span>{product.weight}</span>
                      {product.burnTime && <span>{product.burnTime}</span>}
                    </div>
                    <button
                      type="button"
                      className="flex h-[42px] w-full items-center justify-center border border-ory-divider/60 bg-ory-surface/60 text-[11px] font-medium uppercase tracking-[0.18em] text-ory-ink transition-all duration-200 hover:bg-ory-ink hover:text-white hover:border-ory-ink active:scale-[0.98]"
                    >
                      Add to Bag
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-center text-ory-muted text-sm">No products in this collection yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}