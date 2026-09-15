"use client";

import { client } from "@/sanity/client";
import { FAQ_PAGE_QUERY } from "@/sanity/queries";
import type { SanityFaqPage } from "@/sanity/types";

type FaqPageProps = {
  params: { slug: string };
};

export default async function FaqPage({ params }: FaqPageProps) {
  const page: SanityFaqPage | null = await client.fetch<SanityFaqPage>(
    FAQ_PAGE_QUERY,
    { slug: params.slug }
  );

  if (!page) {
    return (
      <div className="min-h-screen bg-ory-cream-deep p-8">
        <h1 className="text-ory-ink text-3xl font-serif">Page not found</h1>
      </div>
    );
  }

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          <h1 className="font-serif text-[36px] uppercase leading-tight tracking-[0.06em] text-ory-ink sm:text-[48px]">
            {page.title}
          </h1>
          <div className="mt-6 space-y-4">
            {page.faqs?.length > 0 && page.faqs.map((faq: any, idx: number) => (
              <div key={idx} className="border-b border-ory-divider/30 py-3">
                <div className="flex items-start justify-between">
                  <p className="font-medium text-ory-ink">{faq.question}</p>
                  <small className="text-ory-muted">Q{idx + 1}</small>
                </div>
                <p className="mt-1 text-ory-body/80 line-clamp-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}