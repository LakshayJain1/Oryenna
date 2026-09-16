import { client } from "@/sanity/client";
import { COLLECTION_BY_SLUG_QUERY } from "@/sanity/queries";
import type { SanityCollection } from "@/sanity/types";
import { ProductCard } from "@/components/home/ProductCard";

export const revalidate = 60;

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection: SanityCollection | null = await client.fetch<SanityCollection>(
    COLLECTION_BY_SLUG_QUERY,
    { slug }
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.length > 0 ? (
              products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
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