import { client } from "@/sanity/client";
import { SHIPPING_PAGE_QUERY } from "@/sanity/queries";
import type { SanityShippingPage } from "@/sanity/types";

export const revalidate = 60;

const SHIPPING_SLUG = "shipping";

export default async function ShippingPage() {
  const page: SanityShippingPage | null = await client.fetch<SanityShippingPage>(
    SHIPPING_PAGE_QUERY,
    { slug: SHIPPING_SLUG }
  );

  if (!page) {
    return (
      <div className="min-h-screen bg-ory-cream-deep p-8">
        <h1 className="text-ory-ink text-3xl font-serif">Page not found</h1>
      </div>
    );
  }

  const content = page.content || [];

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          <h1 className="font-serif text-[36px] uppercase leading-tight tracking-[0.06em] text-ory-ink sm:text-[48px]">
            {page.title}
          </h1>
          <div className="mt-6 text-ory-body/80 max-w-none">
            {content.map((block: any, idx: number) => {
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