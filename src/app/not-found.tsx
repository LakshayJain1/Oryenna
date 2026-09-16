import Link from "next/link";

export default function NotFound() {
  return (
    <section className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 py-28 md:px-16 lg:py-40">
      <div className="mx-auto max-w-[760px] text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-ory-accent font-medium">
          Error 404
        </p>
        <h1 className="mt-4 font-serif text-[44px] uppercase leading-tight tracking-[0.05em] text-ory-ink sm:text-[64px]">
          This Page Has Been Snuffed Out
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ory-body">
          The page you are looking for does not exist, or has moved. Allow us to
          guide you back to the atelier.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="border border-ory-ink bg-ory-ink px-8 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ory-cream transition-colors hover:bg-ory-ink/90"
          >
            Return Home
          </Link>
          <Link
            href="/shop"
            className="border border-ory-divider/60 bg-ory-cream px-8 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ory-ink transition-colors hover:border-ory-ink"
          >
            Explore the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}