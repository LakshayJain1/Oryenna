"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ClerkAccountTrigger } from "@/components/auth/ClerkAccountTrigger";
import { client } from "@/sanity/client";
import { NAVBAR_QUERY } from "@/sanity/queries_footer_navbar";

export function Header() {
  const [navLinks, setNavLinks] = useState<Array<{ label: string; url: string }>>([]);
  const [announcementText, setAnnouncementText] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsBagOpen, setIsAuthOpen } = useCart();

  useEffect(() => {
    // Fetch navbar data from Sanity on client mount
    client.fetch(NAVBAR_QUERY).then((data: any) => {
      if (data && data.navLinks) {
        setNavLinks(data.navLinks);
      }
      if (data && data.announcementText) {
        setAnnouncementText(data.announcementText);
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Top Announcement Bar - dynamically loaded from Sanity */}
      <div className="bg-ory-ink px-4 py-2 text-center text-[10px] uppercase tracking-[0.24em] text-ory-cream/90 transition-all">
        {announcementText || "Complimentary White-Glove Shipping on Orders Over $150 · Hand-Poured in Provence"}
      </div>

      {/* Main Navigation Bar */}
      <div className="border-b border-ory-divider/40 bg-ory-header backdrop-blur-md transition-all shadow-[0_1px_8px_rgba(75,58,46,0.03)]">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6 md:px-16">
          {/* Left: Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3">
            <span className="font-serif text-[24px] uppercase tracking-[0.16em] text-ory-ink">
              Oryenna
            </span>
          </Link>

          {/* Center: Desktop Navigation Links - from Sanity */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.url}
                className="py-1 text-[11px] uppercase tracking-[0.2em] text-ory-body transition-colors hover:text-ory-ink font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions (Account, Bag, Mobile Toggle) */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Account trigger - shows UserButton when signed in, or opens auth modal */}
            <ClerkAccountTrigger onOpenAuth={() => setIsAuthOpen(true)} />

            {/* Bag trigger - opens the BagDrawer */}
            <button
              type="button"
              onClick={() => setIsBagOpen(true)}
              className="flex items-center gap-2 border border-ory-divider/50 bg-ory-cream-deep/60 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ory-ink transition-all hover:border-ory-ink hover:bg-ory-cream active:scale-[0.97]"
              aria-label={`Shopping bag containing ${totalItemsCount} items`}
            >
              <span>Bag</span>
              <span className="flex size-5 items-center justify-center rounded-full bg-ory-ink text-[10px] font-medium text-white">
                {totalItemsCount}
              </span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex size-8 items-center justify-center text-ory-ink md:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-ory-divider/30 bg-ory-cream px-6 py-6 md:hidden">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[13px] uppercase tracking-[0.18em] text-ory-ink font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                className="pt-2 text-left text-[12px] uppercase tracking-[0.18em] text-ory-accent font-medium"
              >
                Atelier Account →
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}