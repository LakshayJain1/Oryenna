import { client } from "@/sanity/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries";
import type { SanityAboutPage } from "@/sanity/types";
import { SectionRenderer } from "@/components/section-renderer";

export const revalidate = 60;

const ABOUT_SLUG = "about";

export default async function AboutPage() {
  const page: SanityAboutPage | null = await client.fetch<SanityAboutPage>(
    ABOUT_PAGE_QUERY,
    { slug: ABOUT_SLUG }
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