import { client } from "@/sanity/client";
import { JOURNAL_ARTICLES_QUERY } from "@/sanity/queries";
import type { SanityJournalArticle } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

const slugOf = (article: { slug: any }): string => {
  const s = article.slug;
  return typeof s === "string" ? s : s?.current || "";
};

export default async function JournalPage() {
  const articles: SanityJournalArticle[] = await client.fetch<SanityJournalArticle[]>(
    JOURNAL_ARTICLES_QUERY
  );

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        <div className="px-6 md:px-0">
          {/* Section Header */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-serif text-[32px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[42px]">
                Essays on Slow Living
              </h2>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ory-body">
                Dispatches from our Grasse atelier on scent psychology, domestic sanctuary, and deliberate living.
              </p>
            </div>
          </div>

          {/* 4 Article Cards Grid */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => {
              const imageUrl =
                typeof article.coverImage === "string"
                  ? article.coverImage
                  : article.coverImage?.url || null;

              return (
                <Link
                  key={article._id}
                  href={`/journal/${slugOf(article)}`}
                  className="group flex flex-col border border-ory-divider/40 bg-ory-cream p-4 transition-all duration-300 hover:border-ory-divider hover:shadow-[0_8px_20px_rgba(75,58,46,0.05)]"
                >
                  <div className="relative h-[200px] w-full overflow-hidden bg-ory-surface">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 260px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-ory-muted">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between pt-4">
                    <div>
                      <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-ory-accent font-medium">
                        <span>{article.category}</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="mt-2.5 font-serif text-[18px] uppercase tracking-[0.04em] text-ory-ink leading-snug group-hover:text-ory-accent transition-colors">
                        {article.title}
                      </h3>

                      <p className="mt-2 text-[12px] leading-relaxed text-ory-body/80 line-clamp-3">
                        {article.summary}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-ory-divider/30 pt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-ory-muted">
                      <span>{article.publishedAt || "Archival"}</span>
                      <span className="font-medium text-ory-ink group-hover:translate-x-0.5 transition-transform">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}