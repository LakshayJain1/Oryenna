"use client";

import { useExpect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/image";

type SectionBlock = {
  sectionType: string;
  orderRank: number;
  // We'll spread section-specific data via ...any
  [key: string]: any;
};

/**
 * Renders a section block dynamically based on sectionType.
 * Each sectionType has its own rendering logic.
 */
export function SectionRenderer({ section }: { section: SectionBlock }) {
  const { sectionType } = section;

  switch (sectionType) {
    case "heroSection": {
      return renderHeroSection(section);
    }
    case "productGrid": {
      return renderProductGridSection(section);
    }
    case "collectionGrid": {
      return renderCollectionGridSection(section);
    }
    case "imageText": {
      return renderImageTextSection(section);
    }
    case "editorialSection": {
      return renderEditorialSection(section);
    }
    case "testimonialSection": {
      return renderTestimonialSection(section);
    }
    case "newsletterSection": {
      return renderNewsletterSection(section);
    }
    case "faqSection": {
      return renderFaqSection(section);
    }
    case "richTextSection": {
      return renderRichTextSection(section);
    }
    case "ctaSection": {
      return renderCTASection(section);
    }
    default:
      return <div className="border border-ory-divider/40 bg-ory-cream p-8">Unknown Section Type: {sectionType}</div>;
  }
}

function renderHeroSection(section: any) {
  const { title, subtitle, eyebrow, ctaText, ctaUrl, image, backgroundColor, textColor } = section;

  if (!title) return null;

  const imageUrl = image?.asset?.url ? urlForImage(image).auto('format').fit('max').url() : null;

  return (
    <section className={`border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28 ${backgroundColor || 'ory-cream-deep'} ${textColor || 'ory-ink'}`}>
      <div className="mx-auto max-w-[1152px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
              {title}
            </h2>
            {subtitle && <p className="mt-3 text-[20px] text-ory-body/80 sm:text-[23px]">{subtitle}</p>}
            {eyebrow && <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-ory-accent font-medium">{eyebrow}</p>}
            {ctaText && ctaUrl && (
              <div className="mt-6">
                <Link href={ctaUrl} className="border border-ory-ink bg-ory-ink text-[11px] font-medium uppercase tracking-[0.2em] text-white px-6 py-3 transition-all hover:bg-ory-ink/90 active:scale-[0.98]">
                  {ctaText}
                </Link>
              </div>
            )}
          </div>
          <div className="lg:col-span-6 relative">
            {image && (
              <Image
                src={imageUrl}
                alt={image.alt || title}
                fill
                className="object-cover object-center filter saturate-[0.85] contrast-[0.95]"
                sizes="100vw"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function renderProductGridSection(section: any) {
  const { title, subtitle, productFilter, columns, showVendor, showBadge } = section;

  if (!title && !subtitle) return null;

  const colCount = parseInt(columns) || 4;

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
              {showVendor && <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ory-body font-medium">Archive Vol. 04</div>}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols{lrgint(colCount)} gap-6">
          {/* Products would be fetched by the parent page using the productFilter */}
          {/* This section expects products to be available in context or via a separate query */}
          <p className="text-ory-muted text-sm">Product grid section - configure product filter and see products above</p>
        </div>
      </div>
    </section>
  );
}

function renderCollectionGridSection(section: any) {
  const { title, subtitle, collection, columns, showImage } = section;

  if (!title) return null;

  const colCount = parseInt(columns) || 4;

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
                  {/* Collection info would render here */}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols{lrgint(colCount)} gap-6">
          {collection && collection.products && collection.products.length > 0 ? (
            collection.products.map((product: any) => (
              <div key={product._id} className="border border-ory-divider/40 bg-ory-cream p-4 hover:border-ory-divider transition-colors">
                <h3 className="font-serif text-[20px] text-ory-ink">{product.name}</h3>
                <p className="mt-1 text-ory-body">${product.price}</p>
                {product.notes && <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ory-accent font-medium">{product.notes}</p>)}
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

function renderImageTextSection(section: any) {
  const { title, subtitle, image, text, imageAlignment, textAlignment } = section;

  if (!title && !image) return null;

  const imageUrl = image?.asset?.url ? urlForImage(image).auto('format').fit('max').url() : null;

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="relative flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
          <div className="lg:col-span-6">
            {image && (
              <Image
                src={imageUrl}
                alt={image.alt || title}
                fill
                className="object-cover object-center filter saturate-[0.85] contrast-[0.95]"
                sizes="100vw"
              />
            )}
          </div>
          <div className="lg:col-span-6">
            {title && <h2 className="font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">{title}</h2>}
            {subtitle && <p className="mt-3 text-[20px] text-ory-body/80 sm:text-[23px]">{subtitle}</p>}
            {text && <p className="mt-4 text-[16px] text-ory-body/80 line-clamp-3">{text}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function renderEditorialSection(section: any) {
  const { title, subtitle, image, text, ctaText, ctaUrl } = section;

  if (!title) return null;

  const imageUrl = image?.asset?.url ? urlForImage(image).auto('format').fit('max').url() : null;

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
              {title}
            </h2>
            {subtitle && <p className="mt-3 text-[20px] text-ory-body/80 sm:text-[23px]">{subtitle}</p>}
            {image && (
              <Image
                src={imageUrl}
                alt={image.alt || title}
                fill
                className="object-cover object-center mt-6 md:mt-0 sm:h-[400px] lg:h-[500px]"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            )}
          </div>
          <div className="lg:col-span-6">
            {ctaText && ctaUrl && (
              <div className="mt-4">
                <Link href={ctaUrl} className="border border-ory-ink bg-ory-ink text-[11px] font-medium uppercase tracking-[0.2em] text-white px-6 py-3 transition-all hover:bg-ory-ink/90 active:scale-[0.98]">
                  {ctaText}
                </Link>
              </div>
            )}
            {text && (
              <p className="mt-4 text-[16px] text-ory-body/80 line-clamp-4">
                {text}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function renderTestimonialSection(section: any) {
  const { title, testimonials, showNames } = section;

  if (!title && !testimonials?.length) return null;

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
            {title}
          </h2>
          {testimonials.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((test: any, idx: number) => (
                <div key={idx} className="border border-ory-divider/40 bg-ory-cream p-5 transition-colors hover:border-ory-divider">
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
          ))}
        </div>
      </div>
    </section>
  );
}

function renderNewsletterSection(section: any) {
  const { title, subtitle, ctaText, ctaUrl, showForm, backgroundColor } = section;

  if (!title) return null;

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream ${backgroundColor || 'ory-cream'} px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          <div className="flex flex-col items-start justify-between gap-6">
            <h2 className="font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
              {title}
            </h2>
            {subtitle && <p className="mt-3 text-[20px] text-ory-body/80 sm:text-[23px]">{subtitle}</p>}
            {showForm && ctaText && ctaUrl && (
              <div className="mt-6 border border-ory-divider/40 bg-ory-cream p-4">
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 border border-ory-divider/60 bg-ory-cream p-3 text-[13px] text-ory-ink focus:border-ory-ink focus:outline-none"
                  />
                  <button type="submit" className="border border-ory-ink bg-ory-ink text-[11px] font-medium uppercase tracking-[0.2em] text-white px-6 py-3 transition-all hover:bg-ory-ink/90 active:scale-[0.98]">
                    {ctaText}
                  </button>
                </form>
              </div>
            ))}
            {ctaText && ctaUrl && (
              <div className="mt-6">
                <Link href={ctaUrl} className="border border-ory-ink bg-ory-ink text-[11px] font-medium uppercase tracking-[0.2em] text-white px-6 py-3 transition-all hover:bg-ory-ink/90 active:scale-[0.98]">
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

function renderFaqSection(section: any) {
  const { title, faqs } = section;

  if (!title && !faqs?.length) return null;

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">
            {title}
          </h2>
          {faqs.length > 0 && (
            <div className="mt-6 space-y-4">
              {faqs.map((faq: any, idx: number) => (
                <div key={idx} className="border-b border-ory-divider/30 py-3">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-ory-ink">{faq.question}</p>
                    <small className="text-ory-muted">Q{idx + 1}</small>
                  </div>
                  <p className="mt-1 text-ory-body/80 line-clamp-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderRichTextSection(section: any) {
  const { title, content } = section;

  if (!title && !content?.length) return null;

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          {title && <h2 className="mt-2 font-serif text-[34px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[44px]">{title}</h2>}
          {content && content.length > 0 && (
            <div className="mt-6 prose prose-inherit max-w-none">
              {content.map((block: any, idx: number) => {
                if (block._type === 'block') {
                  const style = block.style || 'normal';
                  const label = style === 'normal' ? '' : `${style.toUpperCase()} `;
                  return (
                    <p key={idx} className="mt-4 text-ory-body/80">
                      {label}{block.children?.map((c: any) => c.text).join(' ')}
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

function lrgint(colCount: number): string {
  if (colCount === 1) return 'grid-cols-1';
  if (colCount === 2) return 'grid-cols-2';
  if (colCount === 3) return 'grid-cols-3';
  if (colCount === 4) return 'grid-cols-4';
  return 'grid-cols-4';
}