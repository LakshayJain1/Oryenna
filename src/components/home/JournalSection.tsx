import Image from "next/image";
import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { SanityJournalArticle } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";

type JournalSectionProps = {
  journalArticles?: SanityJournalArticle[];
};

export function JournalSection({ journalArticles }: JournalSectionProps) {
  const articles = journalArticles ?? [];


  return (
    <section id="journal" className="border-t border-ory-divider/40 bg-ory-cream px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[1152px]">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>06 / The Journal</SectionEyebrow>
            <h2 className="mt-2 font-serif text-[32px] uppercase leading-tight tracking-[0.08em] text-ory-ink sm:text-[42px]">
              Essays on Slow Living
            </h2>
            <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ory-body">
              Dispatches from our Grasse atelier on scent psychology, domestic sanctuary, and deliberate living.
            </p>
          </div>

          <Link
            href="#journal"
            className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ory-ink font-medium transition-colors hover:text-ory-accent"
          >
            <span>Read All Dispatches</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 4 Article Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => {
            const id = (article as any)._id || (article as any).id;
            const imageUrl =
              typeof article.image === "string"
                ? article.image
                : (article as any).image?.asset?.url ||
                  urlForImage(article.image)?.url() ||
                  "/images/products/ember.png";

            const date = (article as any).publishedAt || (article as any).date || "OCTOBER 14";

            return (
              <article
                key={id}
                className="group flex flex-col border border-ory-divider/40 bg-ory-cream p-4 transition-all duration-300 hover:border-ory-divider hover:shadow-[0_8px_20px_rgba(75,58,46,0.05)]"
              >
                <div className="relative h-[200px] w-full overflow-hidden bg-ory-surface">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 260px"
                  />
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
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-ory-divider/30 pt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-ory-muted">
                    <span>{date}</span>
                    <span className="font-medium text-ory-ink group-hover:translate-x-0.5 transition-transform">
                      Read →
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
