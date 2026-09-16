import { client } from "@/sanity/client";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/queries";
import type { SanityProduct } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Price } from "@/components/Price";
import { ProductDetailAddToCart } from "@/components/cart/AddToBag";

export const revalidate = 60;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product: SanityProduct | null = await client.fetch<SanityProduct>(
    PRODUCT_BY_SLUG_QUERY,
    { slug }
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-ory-cream-deep p-8">
        <h1 className="text-ory-ink text-3xl font-serif">Product not found</h1>
      </div>
    );
  }

  const imageUrl = product.image?.url || null;

  const topNotes = product.topNotes || "";
  const heartNotes = product.heartNotes || "";
  const baseNotes = product.baseNotes || "";
  const accentNotes = product.accentNotes || [];

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Product Image & Details */}
          <div className="lg:col-span-6">
            <div className="relative h-[520px] w-full overflow-hidden border border-ory-divider/40 bg-ory-surface/40 sm:h-[600px]">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover object-center filter saturate-[0.85] contrast-[0.95]"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-ory-muted">
                  No image available
                </div>
              )}
              <span className="absolute left-4 top-4 border border-ory-divider/40 bg-ory-cream/95 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-ory-ink shadow-xs backdrop-blur-md">
                Signature Spotlight
              </span>
            </div>

            {/* Thumbnail selector / image gallery */}
            {imageUrl && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="relative aspect-square w-full overflow-hidden border border-ory-divider/40 bg-ory-surface/40">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Product Specs */}
          <div className="lg:col-span-6">
            <SectionEyebrow>Signature Release</SectionEyebrow>

            <h1 className="mt-2 font-serif text-[40px] uppercase leading-tight tracking-[0.04em] text-ory-ink sm:text-[56px]">
              {product.name} Candle
            </h1>

            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-serif text-[30px] text-ory-ink">
                <Price usd={product.price} inr={product.priceINR} />
              </span>
              {product.badge && (
                <span className="border border-ory-divider/40 bg-ory-cream/95 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-ory-accent shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="mt-6">
              <ProductDetailAddToCart
                _id={product._id}
                name={product.name}
                price={product.price}
                priceINR={product.priceINR}
                weight={product.weight}
                notes={product.notes}
                image={imageUrl || ""}
                inStock={product.inStock}
              />
            </div>

            {/* Olfactory Pyramid */}
            <div className="mt-6 border border-ory-divider/40 bg-ory-cream-deep p-4 sm:p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-ory-accent">
                Olfactory Pyramid
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3 text-left">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-ory-muted">Top</span>
                  <p className="mt-1 text-[13px] font-medium text-ory-ink leading-tight">
                    {topNotes}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-ory-muted">Heart</span>
                  <p className="mt-1 text-[13px] font-medium text-ory-ink leading-tight">
                    {heartNotes}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-ory-muted">Base</span>
                  <p className="mt-1 text-[13px] font-medium text-ory-ink leading-tight">
                    {baseNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-ory-body">
                <span>Vessel Size</span>
                <span>{product.weight}</span>
              </div>
              <div className="flex items-center justify-between text-ory-body">
                <span>Burn Time</span>
                <span>{product.burnTime}</span>
              </div>
              {accentNotes.length > 0 && (
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-ory-muted">
                  {accentNotes.map((note: string) => (
                    <span key={note} className="text-[9px] uppercase tracking-widest text-ory-muted">
                      {note}
                    </span>
                  ))}
                </div>
              )}

              {/* In Stock Status */}
              {product.inStock ? (
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ory-accent font-medium">
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ory-muted font-medium">
                  <span>Out of Stock</span>
                </div>
              )}

              {/* Insider Info Link */}
              {product.insiderInfo && (
                <div className="mt-4">
                  <Link
                    href="/product-insider"
                    className="border border-ory-divider/60 bg-ory-cream text-ory-body text-[12px] font-medium uppercase tracking-[0.16em] hover:text-ory-ink hover:border-ory-ink transition-all"
                  >
                    View Insider Information →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}