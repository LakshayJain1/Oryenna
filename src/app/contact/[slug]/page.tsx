"use client";

import { client } from "@/sanity/client";
import { CONTACT_PAGE_QUERY } from "@/sanity/queries";
import type { SanityContactPage } from "@/sanity/types";
import { SectionRenderer } from "@/components/section-renderer";

type ContactPageProps = {
  params: { slug: string };
};

export default async function ContactPage({ params }: ContactPageProps) {
  const page: SanityContactPage | null = await client.fetch<SanityContactPage>(
    CONTACT_PAGE_QUERY,
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