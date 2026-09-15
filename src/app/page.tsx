"use client";

import { client } from "@/sanity/client";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import type { SanityHomePage } from "@/sanity/types";
import { SectionRenderer } from "@/components/section-renderer";
import { useEffect, useState } from "react";

export default async function HomePage() {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    client.fetch<SanityHomePage>(HOME_PAGE_QUERY, { slug: "home" }).then((data) => {
      setPage(data);
    });
  }, []);

  if (!page) {
    return (
      <div className="min-h-screen bg-ory-cream-deep p-8">
        <h1 className="text-ory-ink text-3xl font-serif">Loading Homepage...</h1>
      </div>
    );
  }

  const sections = page.sections?.sort((a: any, b: any) => (a.orderRank || 0) - (b.orderRank || 0)) || [];

  return (
    <main className="flex-1">
      <SectionRenderer sections={sections} />
    </main>
  );
}