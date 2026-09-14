"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { SignIn, SignUp, useUser } from "@clerk/nextjs";

export function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, authTab, setAuthTab } = useCart();
  const { isSignedIn } = useUser();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthOpen) {
        setIsAuthOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthOpen, setIsAuthOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isAuthOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAuthOpen]);

  if (!isAuthOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthOpen(false)}
        className="fixed inset-0 bg-ory-ink/50 backdrop-blur-[4px] transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative z-10 w-full max-w-[950px] overflow-hidden border border-ory-divider/50 bg-ory-cream shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAuthOpen(false)}
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full border border-ory-divider/50 bg-ory-cream/80 text-ory-body transition-colors hover:border-ory-ink hover:text-ory-ink"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left Column: Atmospheric imagery + Client testimonial */}
          <div className="relative hidden md:col-span-5 md:block h-full min-h-[620px]">
            <div className="relative h-full w-full bg-ory-surface">
              <Image
                src="/images/hero/candle-linen.jpg"
                alt="Lighting candle with sulfur match"
                fill
                className="object-cover filter contrast-[0.95] saturate-[0.85]"
                sizes="450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ory-ink/80 via-ory-ink/20 to-transparent" />

              {/* Quote Card */}
              <div className="absolute bottom-8 left-6 right-6 border border-white/20 bg-ory-cream/95 p-5 backdrop-blur-md">
                <p className="font-display text-[15px] italic leading-snug text-ory-ink">
                  &ldquo;The scent fills the room like a quiet mist. It has completely transformed my evening unwind ritual.&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-ory-divider/40 pt-2 text-[9px] uppercase tracking-[0.2em] text-ory-muted">
                  <span>Éléonore V.</span>
                  <span>Paris, 6e</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clerk Auth Components */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7 max-h-[90vh] overflow-y-auto">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-ory-accent font-medium">
                Atelier Account (Clerk Secure)
              </span>
              <h2
                id="auth-modal-title"
                className="mt-1 font-serif text-[28px] uppercase tracking-[0.06em] text-ory-ink"
              >
                Return to Calm.
              </h2>
              <p className="mt-1 text-[13px] text-ory-body/80">
                Access your personalized order archive, rituals, and private releases.
              </p>

              {/* Tabs */}
              <div className="mt-4 flex border-b border-ory-divider/40 text-[11px] uppercase tracking-[0.18em]">
                <button
                  type="button"
                  onClick={() => setAuthTab("signin")}
                  className={`pb-3 font-medium transition-colors ${
                    authTab === "signin"
                      ? "border-b-2 border-ory-ink text-ory-ink"
                      : "text-ory-muted hover:text-ory-ink"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab("register")}
                  className={`ml-8 pb-3 font-medium transition-colors ${
                    authTab === "register"
                      ? "border-b-2 border-ory-ink text-ory-ink"
                      : "text-ory-muted hover:text-ory-ink"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Clerk Widget container */}
              <div className="mt-6 flex justify-center">
                {authTab === "signin" ? (
                  <SignIn
                    routing="hash"
                    appearance={{
                      elements: {
                        rootBox: "w-full shadow-none",
                        card: "bg-transparent shadow-none p-0 w-full",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        formButtonPrimary:
                          "bg-ory-ink hover:bg-ory-ink/90 text-white uppercase tracking-[0.18em] text-[11px] h-11 rounded-none",
                        formFieldInput:
                          "bg-ory-cream-deep border-ory-divider/60 rounded-none text-ory-ink h-11",
                        footerAction: "hidden",
                      },
                    }}
                  />
                ) : (
                  <SignUp
                    routing="hash"
                    appearance={{
                      elements: {
                        rootBox: "w-full shadow-none",
                        card: "bg-transparent shadow-none p-0 w-full",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        formButtonPrimary:
                          "bg-ory-ink hover:bg-ory-ink/90 text-white uppercase tracking-[0.18em] text-[11px] h-11 rounded-none",
                        formFieldInput:
                          "bg-ory-cream-deep border-ory-divider/60 rounded-none text-ory-ink h-11",
                        footerAction: "hidden",
                      },
                    }}
                  />
                )}
              </div>
            </div>

            {/* Member Perks Checklist */}
            <div className="mt-6 border-t border-ory-divider/30 pt-4">
              <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-ory-ink">
                Atelier Member Privileges:
              </p>
              <ul className="mt-1.5 space-y-1 text-[11px] text-ory-muted">
                <li className="flex items-center gap-2">
                  <span className="text-ory-accent">✓</span> Curated archive &amp; early private pour access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-ory-accent">✓</span> Complimentary custom 2ml scent vials with every order
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
