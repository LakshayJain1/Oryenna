'use client';

import { useAuth, UserButton } from '@clerk/nextjs';
import Image from "next/image";
import Link from "next/link";

export function ClerkAccountTrigger({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/account"
          className="hidden text-[11px] uppercase tracking-[0.18em] text-ory-body transition-colors hover:text-ory-ink sm:inline"
        >
          Account
        </Link>
        <UserButton />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpenAuth}
      className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ory-body transition-colors hover:text-ory-ink"
    >
      <span className="hidden sm:inline">Account</span>
      <div className="flex size-7 items-center justify-center rounded-full border border-ory-divider/60 bg-ory-cream hover:border-ory-ink">
        <Image
          src="/icons/user.svg"
          alt="User profile"
          width={11}
          height={11}
          className="opacity-70"
        />
      </div>
    </button>
  );
}