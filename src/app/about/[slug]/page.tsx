"use client";

import { client } from "@/sanity/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries";
import type { SanityAboutPage } from "@/sanity/types";
import { SectionRenderer } from "@/components/section-renderer";

type AboutPageProps = {
  params: { slug: string };
};

export default async function AboutPage({ params }: AboutPageProps) {
  const page: SanityAboutPage | null = await client.fetch<SanityAboutPage>(
    ABOUT_PAGE_QUERY,
    { slug: params.slug }
  );

  if (!page) {
    return (
      <div className="min-h-screen bg-ory-cream-deep p-8">
        <h1 className="text-ory-ink text-3xl font-serif">Page not found</h1>
      </div>
    );
  }

  const sections = page.sections
    ?.sort((a: any, b: any) => (a.orderRank || 0) - (b.orderRank || 0)) || [];

  return (
    <main className="flex-1">
      <SectionRenderer sections={sections} />
    </main>
  );
}