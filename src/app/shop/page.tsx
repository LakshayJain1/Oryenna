import { client } from "@/sanity/client";
import { SHOP_PAGE_QUERY } from "@/sanity/queries";
import type { SanityShopPage } from "@/sanity/types";
import { SectionRenderer } from "@/components/section-renderer";

export const revalidate = 60;

const SHOP_SLUG = "shop";

export default async function ShopPage() {
  const page: SanityShopPage | null = await client.fetch<SanityShopPage>(
    SHOP_PAGE_QUERY,
    { slug: SHOP_SLUG }
  );

  if (!page) {
    return (
      <div className="min-h-screen bg-ory-cream-deep p-8">
        <h1 className="text-ory-ink text-3xl font-serif">Page not found</h1>
      </div>
    );
  }

  const sections = page.sections
    ?.sort((a, b) => (a.orderRank || 0) - (b.orderRank || 0)) || [];

  return (
    <main className="flex-1">
      <SectionRenderer sections={sections} />
    </main>
  );
}