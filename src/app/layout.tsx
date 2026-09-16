import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, EB_Garamond } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BagDrawer } from "@/components/cart/BagDrawer";
import { AuthModal } from "@/components/auth/AuthModal";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Oryenna — Atelier de Parfum d'Intérieur",
  description:
    "Scents and spaces designed for slower moments. Hand-poured candles from wild botanicals in Grasse and Aix-en-Provence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${dmSans.variable} ${ebGaramond.variable} ${cormorant.variable} h-full antialiased`}
      >
        <body className="flex min-h-full flex-col bg-ory-cream font-sans text-ory-body">
          <CurrencyProvider>
            <CartProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <BagDrawer />
              <AuthModal />
            </CartProvider>
          </CurrencyProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
