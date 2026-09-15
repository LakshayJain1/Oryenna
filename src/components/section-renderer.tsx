"use client";

import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/image";
import type { SectionBlock } from "@/sanity/types";

function getImageUrl(image: any): string | null {
  if (!image) return null;

  if (image.asset && typeof image.asset.url === "string") {
    return image.asset.url;
  }

  if (image.asset && image.asset._ref) {
    const builder = urlForImage(image);
    if (builder) {
      try {
        return builder.auto("format").fit("max").url();
      } catch {
        return null;
      }
    }
  }

  if (typeof image.url === "string") {
    return image.url;
  }

  return null;
}

function getSectionType(section: SectionBlock): string {
  return section._type || section.sectionType || "unknown";
}

export function SectionRenderer({ sections }: { sections: SectionBlock[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, idx) => (
        <SectionRendererOne key={idx} section={section} />
      ))}
    </>
  );
}

function SectionRendererOne({ section }: { section: SectionBlock }) {
  const sectionType = getSectionType(section);

  switch (sectionType) {
    case "heroSection":
      return renderHeroSection(section);
    case "productGrid":
      return renderProductGridSection(section);
    case "collectionGrid":
      return renderCollectionGridSection(section);
    case "imageText":
      return renderImageTextSection(section);
    case "editorialSection":
      return renderEditorialSection(section);
    case "testimonialSection":
      return renderTestimonialSection(section);
    case "newsletterSection":
      return renderNewsletterSection(section);
    case "faqSection":
      return renderFaqSection(section);
    case "richTextSection":
      return renderRichTextSection(section);
    case "ctaSection":
      return renderCTASection(section);
    default:
      return (
        <div className="border border-ory-divider/40 bg-ory-cream p-8">
          Unknown Section Type: {sectionType}
        </div>
      );
  }
}

function renderHeroSection(section: SectionBlock) {
  const { title, subtitle, eyebrow, ctaText, ctaUrl, image, backgroundColor, textColor } = section;

  if (!title) return null;

  const imageUrl = getImageUrl(image);

  return (
    <section className={`border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28 ${backgroundColor || "ory-cream-deep"} ${textColor || "ory-ink"}`}>
      <div className="mx-auto max-w-[1152px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            {eyebrow && (
              <p className="text-[11px] uppercase tracking-[0.2em] text-ory-accent font-medium">{eyebrow}</p>
            )}
            <h2 className="mt-3 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ory-body">{subtitle}</p>
            )}
            {ctaText && ctaUrl && (
              <Link
                href={ctaUrl}
                className="mt-8 inline-block border border-ory-ink bg-ory-ink px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-ory-ink/90 active:scale-[0.98]"
              >
                {ctaText}
              </Link>
            )}
          </div>
          {imageUrl && (
            <div className="lg:col-span-6">
              <div className="relative h-[320px] w-full overflow-hidden bg-ory-surface/40 sm:h-[440px]">
                <Image
                  src={imageUrl}
                  alt={image.alt || title}
                  fill
                  className="object-cover object-center filter saturate-[0.85] contrast-[0.95]"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function renderProductGridSection(section: SectionBlock) {
  const { title, subtitle, colCount, showVendor } = section;

  if (!title && !subtitle) return null;

  const cols = Number(colCount) || 4;
  const gridClass = lrgint(cols);

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          {title && (
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ory-accent font-medium">Shop the Collection</p>
                <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
                  {title}
                </h2>
                {subtitle && <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ory-body">{subtitle}</p>}
              </div>
              {showVendor && (
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ory-body font-medium">
                  Archive Vol. 04
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:${gridClass}`}>
          <p className="text-ory-muted text-sm">
            Product grid section - connect a product query to render products here.
          </p>
        </div>
      </div>
    </section>
  );
}

function renderCollectionGridSection(section: SectionBlock) {
  const { title, subtitle, collection, colCount } = section;

  if (!title && !collection) return null;

  const cols = Number(colCount) || 4;
  const gridClass = lrgint(cols);
  const products = collection?.products || [];

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          {title && (
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
                  {title}
                </h2>
                {subtitle && <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ory-body">{subtitle}</p>}
              </div>
              {collection && (
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ory-body font-medium">
                  {collection.name}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:${gridClass}`}>
          {products.length > 0 ? (
            products.map((product: any) => (
              <div
                key={product._id}
                className="border border-ory-divider/40 bg-ory-cream p-4 transition-colors hover:border-ory-divider"
              >
                <h3 className="font-serif text-[20px] text-ory-ink">{product.name}</h3>
                <p className="mt-1 text-ory-body">${product.price}</p>
                {product.notes && (
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ory-accent font-medium">
                    {product.notes}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-ory-muted text-sm">No products in this collection</p>
          )}
        </div>
      </div>
    </section>
  );
}

function renderImageTextSection(section: SectionBlock) {
  const { title, subtitle, image, text, imageAlignment, textAlignment } = section;

  if (!title && !image) return null;

  const imageUrl = getImageUrl(image);
  const imageLeft = imageAlignment === "left";

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-6 ${imageLeft ? "lg:order-1" : "lg:order-2"}`}>
            {title && <h2 className="font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">{title}</h2>}
            {subtitle && <p className="mt-3 text-[20px] text-ory-body/80 sm:text-[23px]">{subtitle}</p>}
            {text && <p className="mt-4 text-[16px] text-ory-body/80">{text}</p>}
          </div>
          {imageUrl && (
            <div className={`lg:col-span-6 ${imageLeft ? "lg:order-2" : "lg:order-1"}`}>
              <div className="relative h-[320px] w-full overflow-hidden bg-ory-surface/40 sm:h-[440px]">
                <Image
                  src={imageUrl}
                  alt={image.alt || title}
                  fill
                  className="object-cover object-center filter saturate-[0.85] contrast-[0.95]"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function renderEditorialSection(section: SectionBlock) {
  const { title, subtitle, image, text, ctaText, ctaUrl } = section;

  if (!title) return null;

  const imageUrl = getImageUrl(image);

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
              {title}
            </h2>
            {subtitle && <p className="mt-3 text-[20px] text-ory-body/80 sm:text-[23px]">{subtitle}</p>}
            {imageUrl && (
              <div className="relative mt-6 h-[320px] w-full overflow-hidden bg-ory-surface/40 sm:h-[440px]">
                <Image
                  src={imageUrl}
                  alt={image.alt || title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            )}
          </div>
          <div className="lg:col-span-6">
            {text && (
              <p className="mt-4 text-[16px] text-ory-body/80">{text}</p>
            )}
            {ctaText && ctaUrl && (
              <div className="mt-4">
                <Link
                  href={ctaUrl}
                  className="border border-ory-ink bg-ory-ink text-[11px] font-medium uppercase tracking-[0.2em] text-white px-6 py-3 transition-all hover:bg-ory-ink/90 active:scale-[0.98]"
                >
                  {ctaText}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function renderTestimonialSection(section: SectionBlock) {
  const { title, testimonials, showNames } = section;

  if (!title && !testimonials?.length) return null;

  const items = testimonials || [];

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
            {title}
          </h2>
          {items.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((test: any, idx: number) => (
                <div
                  key={idx}
                  className="border border-ory-divider/40 bg-ory-cream p-5 transition-colors hover:border-ory-divider"
                >
                  <div className="flex items-start gap-3">
                    {showNames && <div className="font-serif text-[18px] text-ory-ink">{test.author}</div>}
                    <div>
                      <p className="mt-1 text-[14px] text-ory-body/80 line-clamp-3">{test.content}</p>
                    </div>
                  </div>
                  {test.rating && (
                    <div className="mt-3">
                      {Array.from({ length: test.rating }, (_, i) => (
                        <span key={i} className="text-ory-accent">★</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function renderNewsletterSection(section: SectionBlock) {
  const { title, subtitle, ctaText, ctaUrl, showForm } = section;

  if (!title) return null;

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          <div className="flex flex-col items-start justify-between gap-6">
            <h2 className="font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
              {title}
            </h2>
            {subtitle && <p className="mt-3 text-[20px] text-ory-body/80 sm:text-[23px]">{subtitle}</p>}
            {showForm && (
              <form className="mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 border border-ory-divider/60 bg-ory-surface/40 p-3 text-[13px] text-ory-ink focus:border-ory-ink focus:outline-none"
                />
                <button
                  type="submit"
                  className="border border-ory-ink bg-ory-ink text-[11px] font-medium uppercase tracking-[0.2em] text-white px-6 py-3 transition-all hover:bg-ory-ink/90 active:scale-[0.98]"
                >
                  {ctaText || "Subscribe"}
                </button>
              </form>
            )}
            {ctaText && ctaUrl && (
              <div className="mt-6">
                <Link
                  href={ctaUrl}
                  className="border border-ory-ink bg-ory-ink text-[11px] font-medium uppercase tracking-[0.2em] text-white px-6 py-3 transition-all hover:bg-ory-ink/90 active:scale-[0.98]"
                >
                  {ctaText}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function renderFaqSection(section: SectionBlock) {
  const { title, faqs } = section;

  if (!title && !faqs?.length) return null;

  const items = faqs || [];

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
            {title}
          </h2>
          {items.length > 0 && (
            <div className="mt-6 space-y-4">
              {items.map((faq: any, idx: number) => (
                <div key={idx} className="border-b border-ory-divider/30 py-3">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-ory-ink">{faq.question}</p>
                    <small className="text-ory-muted">Q{idx + 1}</small>
                  </div>
                  <p className="mt-1 text-ory-body/80 line-clamp-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function renderRichTextSection(section: SectionBlock) {
  const { title, content } = section;

  if (!title && !content?.length) return null;

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          {title && (
            <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
              {title}
            </h2>
          )}
          {content && content.length > 0 && (
            <div className="mt-6 max-w-none">
              {content.map((block: any, idx: number) => {
                if (block._type === "block") {
                  const style = block.style || "normal";
                  const label = style === "normal" ? "" : `${style.toUpperCase()} `;
                  return (
                    <p key={idx} className="mt-4 text-ory-body/80">
                      {label}
                      {block.children?.map((c: any) => c.text).join(" ")}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function renderCTASection(section: SectionBlock) {
  const { title, subtitle, ctaText, ctaUrl } = section;

  if (!title && !subtitle) return null;

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            {title && (
              <h2 className="font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-3 max-w-lg text-[16px] text-ory-body/80">{subtitle}</p>}
          </div>
          {ctaText && ctaUrl && (
            <Link
              href={ctaUrl}
              className="shrink-0 border border-ory-ink bg-ory-ink text-[11px] font-medium uppercase tracking-[0.2em] text-white px-8 py-4 transition-all hover:bg-ory-ink/90 active:scale-[0.98]"
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function lrgint(colCount: number): string {
  if (colCount === 1) return "grid-cols-1";
  if (colCount === 2) return "grid-cols-2";
  if (colCount === 3) return "grid-cols-3";
  return "grid-cols-4";
}