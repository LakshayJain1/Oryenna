import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-ory-cream-deep px-6 py-16 md:px-16 lg:py-24">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8 flex items-center justify-between border-b border-ory-divider/40 pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-ory-accent font-medium">
              Atelier Dashboard
            </span>
            <h1 className="font-serif text-[32px] uppercase tracking-[0.06em] text-ory-ink">
              Your Account &amp; Archives
            </h1>
          </div>
          <Link
            href="/"
            className="border border-ory-divider/60 bg-ory-cream px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-ory-ink transition-colors hover:border-ory-ink"
          >
            ← Return Home
          </Link>
        </div>

        <div className="flex justify-center">
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full shadow-none",
                card: "border border-ory-divider/40 bg-ory-cream shadow-sm rounded-none w-full",
                navbar: "border-r border-ory-divider/40 bg-ory-cream-deep/40",
                pageScrollBox: "bg-ory-cream",
                formButtonPrimary:
                  "bg-ory-ink hover:bg-ory-ink/90 text-white uppercase tracking-[0.18em] text-[11px] h-11 rounded-none",
                formFieldInput:
                  "bg-ory-cream-deep border-ory-divider/60 rounded-none text-ory-ink h-11",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
