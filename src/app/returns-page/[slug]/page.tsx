"use client";

import { client } from "@/sanity/client";
import { RETURNS_PAGE_QUERY } from "@/sanity/queries";
import type { SanityReturnsPage } from "@/sanity/types";

type ReturnsPageProps = {
  params: { slug: string };
};

export default async function ReturnsPage({ params }: ReturnsPageProps) {
  const page: SanityReturnsPage | null = await client.fetch<SanityReturnsPage>(
    RETURNS_PAGE_QUERY,
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
          <div className="mt-6 text-ory-body/80 prose prose-inherit max-w-none">
            {page.content?.length > 0 && page.content.map((block: any, idx: number) => {
              if (block._type === 'block') {
                return (
                  <p key={idx} className="mt-4">
                    {block.children?.map((c: any) => c.text).join(' ')}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}