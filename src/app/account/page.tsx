"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses">("orders");

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ory-cream-deep">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ory-muted">Loading Atelier Profile...</p>
      </div>
    );
  }

  // Read tokenized metadata stored in Clerk unsafeMetadata
  // Format: o: [[id, date, status, total, summary, shippingPin], ...]
  const metadata = (user?.unsafeMetadata || {}) as {
    o?: Array<[string, string, number, number, string, string]>;
    a?: Array<[string, string, string, string]>;
  };

  const orders = metadata.o || [];
  const addresses = metadata.a || [];

  return (
    <div className="min-h-screen bg-ory-cream-deep px-6 py-16 md:px-16 lg:py-24">
      <div className="mx-auto max-w-[1050px]">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-ory-divider/40 pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-ory-accent font-medium">
              Atelier Member Archive
            </span>
            <h1 className="font-serif text-[32px] uppercase tracking-[0.06em] text-ory-ink">
              Welcome, {user?.firstName || "Patron"}
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center border border-ory-divider/60 bg-ory-cream px-4 text-[10px] uppercase tracking-[0.18em] text-ory-ink transition-colors hover:border-ory-ink"
          >
            ← Return to Shop
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-ory-divider/40 text-[11px] uppercase tracking-[0.18em]">
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`pb-3 font-medium transition-colors ${
              activeTab === "orders"
                ? "border-b-2 border-ory-ink text-ory-ink"
                : "text-ory-muted hover:text-ory-ink"
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("addresses")}
            className={`ml-8 pb-3 font-medium transition-colors ${
              activeTab === "addresses"
                ? "border-b-2 border-ory-ink text-ory-ink"
                : "text-ory-muted hover:text-ory-ink"
            }`}
          >
            Saved Addresses ({addresses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`ml-8 pb-3 font-medium transition-colors ${
              activeTab === "profile"
                ? "border-b-2 border-ory-ink text-ory-ink"
                : "text-ory-muted hover:text-ory-ink"
            }`}
          >
            Personal Info
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="font-serif text-[20px] uppercase tracking-[0.06em] text-ory-ink">
                Ongoing &amp; Previous Dispatches
              </h2>
              {orders.length === 0 ? (
                <div className="border border-ory-divider/40 bg-ory-cream p-12 text-center">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-ory-muted">
                    No orders recorded in your archive yet.
                  </p>
                  <Link
                    href="/shop"
                    className="mt-4 inline-flex h-11 items-center justify-center border border-ory-ink bg-ory-ink px-6 text-[10px] uppercase tracking-[0.2em] text-white hover:bg-ory-ink/90"
                  >
                    Explore Collection
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(([id, date, status, total, summary, pin], idx) => {
                    const statusText = status === 0 ? "Processing" : status === 1 ? "Dispatched" : "Delivered";
                    return (
                      <div key={id || idx} className="border border-ory-divider/40 bg-ory-cream p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-serif text-[18px] text-ory-ink">{id}</span>
                            <span className="border border-ory-divider/50 bg-ory-cream-deep px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-ory-accent">
                              {statusText}
                            </span>
                          </div>
                          <p className="mt-1 text-[12px] text-ory-body/80">{summary}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ory-muted">Ordered: {date}</p>
                        </div>
                        <div className="text-right sm:border-l sm:border-ory-divider/40 sm:pl-6">
                          <p className="font-serif text-[20px] text-ory-ink">₹{total.toLocaleString("en-IN")}</p>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-ory-muted">Pin: {pin}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-4">
              <h2 className="font-serif text-[20px] uppercase tracking-[0.06em] text-ory-ink">
                Saved Shipping Addresses
              </h2>
              {addresses.length === 0 ? (
                <div className="border border-ory-divider/40 bg-ory-cream p-12 text-center">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-ory-muted">
                    No addresses saved yet. Addresses are saved automatically upon checkout.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map(([line1, city, state, pin], idx) => (
                    <div key={idx} className="border border-ory-divider/40 bg-ory-cream p-5">
                      <p className="font-serif text-[16px] text-ory-ink">{line1}</p>
                      <p className="mt-1 text-[12px] text-ory-body">{city}, {state} — {pin}</p>
                      <span className="mt-3 inline-block text-[9px] uppercase tracking-[0.18em] text-ory-accent font-medium">Default Dispatch Address</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="border border-ory-divider/40 bg-ory-cream p-8 space-y-6">
              <h2 className="font-serif text-[20px] uppercase tracking-[0.06em] text-ory-ink border-b border-ory-divider/40 pb-4">
                Personal Credentials
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[13px]">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-ory-muted">Full Name</span>
                  <strong className="text-ory-ink font-medium text-[15px]">{user?.fullName || "Not provided"}</strong>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-ory-muted">Primary Email</span>
                  <strong className="text-ory-ink font-medium text-[15px]">{user?.primaryEmailAddress?.emailAddress}</strong>
                </div>
              </div>
              <div className="pt-4 border-t border-ory-divider/30">
                <p className="text-[11px] text-ory-muted">
                  Managed securely via Clerk Authentication. To update password or security settings, use your avatar dropdown menu.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
