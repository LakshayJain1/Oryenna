"use client";

import { useState } from "react";
import Link from "next/link";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 pt-16 pb-12 md:px-16 lg:pt-20">
      <div className="mx-auto max-w-[1152px]">
        {/* Newsletter Section: "An Invitation to Slow Down" */}
        <div className="border-b border-ory-divider/40 pb-16">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="text-[10px] uppercase tracking-[0.24em] text-ory-accent font-medium">
                Correspondence
              </span>
              <h3 className="mt-2 font-serif text-[28px] uppercase tracking-[0.06em] text-ory-ink sm:text-[34px]">
                An Invitation to Slow Down
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ory-body">
                Receive private release notifications, seasonal fragrance journals, and early archive access before public cellar releases.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="flex h-12 items-center bg-ory-cream p-4 border border-ory-divider/40 text-[13px] text-ory-accent">
                  ✓ Merci. You have been added to our private atelier ledger.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 flex-1 border border-ory-divider/60 bg-ory-cream px-4 text-[13px] text-ory-ink placeholder:text-ory-muted focus:border-ory-ink focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="h-12 border border-ory-ink bg-ory-ink px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-ory-ink/90 active:scale-[0.98]"
                  >
                    Subscribe
                  </button>
                </form>
              )}
              <p className="mt-2 text-[11px] text-ory-muted">
                Sent infrequently with purpose. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Luxury Navigation Columns */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4 lg:gap-12">
          {/* Column 1: Studio */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-ory-ink font-semibold">
              The Atelier
            </h4>
            <ul className="mt-4 space-y-2.5 text-[12px] text-ory-body">
              <li>
                <Link href="#about" className="hover:text-ory-ink transition-colors">
                  Manifesto
                </Link>
              </li>
              <li>
                <Link href="#ritual" className="hover:text-ory-ink transition-colors">
                  Ritual of the Flame
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-ory-ink transition-colors">
                  Grasse Botanical Terroir
                </Link>
              </li>
              <li>
                <Link href="#journal" className="hover:text-ory-ink transition-colors">
                  The Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Collection */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-ory-ink font-semibold">
              Fragrance Pours
            </h4>
            <ul className="mt-4 space-y-2.5 text-[12px] text-ory-body">
              <li>
                <Link href="#shop" className="hover:text-ory-ink transition-colors">
                  Curated Releases
                </Link>
              </li>
              <li>
                <Link href="#shop" className="hover:text-ory-ink transition-colors">
                  Amber Candle
                </Link>
              </li>
              <li>
                <Link href="#shop" className="hover:text-ory-ink transition-colors">
                  Santal Candle
                </Link>
              </li>
              <li>
                <Link href="#shop" className="hover:text-ory-ink transition-colors">
                  Cellar Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Inquiries */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-ory-ink font-semibold">
              Client Care
            </h4>
            <ul className="mt-4 space-y-2.5 text-[12px] text-ory-body">
              <li>
                <span className="cursor-pointer hover:text-ory-ink transition-colors">
                  Shipping &amp; Returns
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-ory-ink transition-colors">
                  Complimentary Samples
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-ory-ink transition-colors">
                  Wick Care Guide
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-ory-ink transition-colors">
                  Contact the Atelier
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Sanctuary Locations */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-ory-ink font-semibold">
              Flagships
            </h4>
            <div className="mt-4 space-y-3 text-[12px] text-ory-body">
              <div>
                <p className="font-medium text-ory-ink">Grasse Studio</p>
                <p className="text-ory-muted text-[11px]">14 Rue des Parfumeurs, 06130</p>
              </div>
              <div>
                <p className="font-medium text-ory-ink">London Sanctuary</p>
                <p className="text-ory-muted text-[11px]">28 Mount Street, Mayfair</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-ory-divider/40 pt-8 text-[11px] text-ory-muted gap-4">
          <p>© {new Date().getFullYear()} ORYENNA ATELIER DE PARFUM. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-ory-ink cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-ory-ink cursor-pointer">Terms of Service</span>
            <span className="text-ory-accent font-medium">Provence &amp; London</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
