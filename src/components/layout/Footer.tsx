"use client";

import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import { FOOTER_QUERY } from "@/sanity/queries_footer_navbar";
import Link from "next/link";

export function Footer() {
  const [footerLinks, setFooterLinks] = useState<Array<{
    columnTitle: string
    links: Array<{ label: string; url: string }>
  }>>([]);
  const [brandTagline, setBrandTagline] = useState<string>("");
  const [copyrightText, setCopyrightText] = useState<string>("");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    client.fetch(FOOTER_QUERY).then((data: any) => {
      if (data && data.footerColumns) {
        setFooterLinks(data.footerColumns);
      }
      if (data && data.brandTagline) {
        setBrandTagline(data.brandTagline);
      }
      if (data && data.copyrightText) {
        setCopyrightText(data.copyrightText);
      }
    });
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="border-t border-ory-divider/40 bg-ory-cream-deep px-6 pt-16 pb-12 md:px-16 lg:pt-20">
      <div className="mx-auto max-w-[1152px]">
        {/* Newsletter Section */}
        <div className="border-b border-ory-divider/40 pb-16">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="text-[10px] uppercase tracking-[0.24em] text-ory-accent font-medium">
                Correspondence
              </span>
              <h3 className="mt-2 font-serif text-[28px] uppercase tracking-[0.06em] text-ory-ink sm:text-[34px]">
                {brandTagline || "An Invitation to Slow Down"}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ory-body">
                {brandTagline || "Receive private release notifications, seasonal fragrance journals, and early archive access before public cellar releases."}
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

        {/* Luxury Navigation Columns - from Sanity CMS */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4 lg:gap-12">
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-ory-ink font-semibold">
                {column.columnTitle || "Atelier"}
              </h4>
              <ul className="mt-4 space-y-2.5 text-[12px] text-ory-body">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.url} className="hover:text-ory-ink transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}