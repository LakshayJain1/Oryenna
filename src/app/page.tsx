import { client } from "@/sanity/client";
import {
  PRODUCTS_QUERY,
  MOOD_RECOMMENDATIONS_QUERY,
  JOURNAL_ARTICLES_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/queries";
import type {
  SanityProduct,
  SanityMoodRecommendation,
  SanityJournalArticle,
  SanitySiteSettings,
} from "@/sanity/types";

import { HeroSection } from "@/components/home/HeroSection";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { CraftSection } from "@/components/home/CraftSection";
import { ScentFinderSection } from "@/components/home/ScentFinderSection";
import { ProductSpotlightSection } from "@/components/home/ProductSpotlightSection";
import { SanctuarySection } from "@/components/home/SanctuarySection";
import { JournalSection } from "@/components/home/JournalSection";

// Revalidate every 60 seconds (ISR) as per Sanity best practices
export const revalidate = 60;

export default async function Home() {
  // Fetch live structured content from Sanity Content Lake
  let products: SanityProduct[] = [];
  let moods: SanityMoodRecommendation[] = [];
  let articles: SanityJournalArticle[] = [];
  let settings: SanitySiteSettings | null = null;

  try {
    const [fetchedProducts, fetchedMoods, fetchedArticles, fetchedSettings] =
      await Promise.all([
        client.fetch<SanityProduct[]>(PRODUCTS_QUERY),
        client.fetch<SanityMoodRecommendation[]>(MOOD_RECOMMENDATIONS_QUERY),
        client.fetch<SanityJournalArticle[]>(JOURNAL_ARTICLES_QUERY),
        client.fetch<SanitySiteSettings | null>(SITE_SETTINGS_QUERY),
      ]);

    products = fetchedProducts || [];
    moods = fetchedMoods || [];
    articles = fetchedArticles || [];
    settings = fetchedSettings || null;
  } catch (error) {
    console.warn("Sanity fetch encountered an issue, continuing with fallback:", error);
  }

  const spotlightProduct = products.length > 0 ? products[0] : undefined;

  return (
    <>
      <HeroSection settings={settings} />
      <ManifestoSection settings={settings} />
      <FeaturedCollection products={products} />
      <CraftSection settings={settings} />
      <ScentFinderSection moodRecommendations={moods} />
      <ProductSpotlightSection spotlightProduct={spotlightProduct} />
      <SanctuarySection settings={settings} />
      <JournalSection journalArticles={articles} />
    </>
  );
}
