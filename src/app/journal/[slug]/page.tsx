import { client } from "@/sanity/client";
import { JOURNAL_ARTICLE_BY_SLUG_QUERY } from "@/sanity/queries";
import type { SanityJournalArticle } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

type JournalArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { slug } = await params;
  const article: SanityJournalArticle | null = await client.fetch<SanityJournalArticle>(
    JOURNAL_ARTICLE_BY_SLUG_QUERY,
    { slug }
  );

  if (!article) {
    return (
      <div className="min-h-screen bg-ory-cream-deep p-8">
        <h1 className="text-ory-ink text-3xl font-serif">Article not found</h1>
      </div>
    );
  }

  const imageUrl =
    typeof article.coverImage === "string"
      ? article.coverImage
      : article.coverImage?.url || null;

  const content = article.content || [];

  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-20 md:px-16 lg:py-28">
      <div className="mx-auto max-w-[760px]">
        <div className="px-6 md:px-0">
          <Link
            href="/journal"
            className="text-[10px] uppercase tracking-[0.2em] text-ory-muted hover:text-ory-ink transition-colors"
          >
            ← Back to the Journal
          </Link>

          <div className="mt-6 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-ory-accent font-medium">
            <span>{article.category}</span>
            <span className="text-ory-divider">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="mt-3 font-serif text-[36px] uppercase leading-tight tracking-[0.05em] text-ory-ink sm:text-[48px]">
            {article.title}
          </h1>

          <p className="mt-3 text-[12px] uppercase tracking-[0.16em] text-ory-muted">
            {article.publishedAt || "Archival"} · {article.author}
          </p>

          {imageUrl && (
            <div className="relative mt-8 h-[340px] w-full overflow-hidden bg-ory-surface sm:h-[420px]">
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 760px) 100vw, 760px"
              />
            </div>
          )}

          {article.summary && (
            <p className="mt-8 font-serif text-[22px] leading-relaxed text-ory-ink">
              {article.summary}
            </p>
          )}

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ory-body/90 max-w-none">
            {content.map((block: any, idx: number) => {
              if (block._type === "block") {
                const text = block.children?.map((c: any) => c.text).join(" ");
                if (block.style === "h2") {
                  return (
                    <h2 key={idx} className="pt-4 font-serif text-[26px] uppercase tracking-[0.04em] text-ory-ink">
                      {text}
                    </h2>
                  );
                }
                return <p key={idx}>{text}</p>;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}