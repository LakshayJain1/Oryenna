"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  priceINR?: number;
  weight: string;
  notes: string;
  image: string;
  quantity: number;
  size?: string;
}

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  priceINR?: number;
  weight: string;
  notes: string;
  image: string;
}

export interface ScentSample {
  id: string;
  name: string;
  notes: string;
  volume: string;
  description: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartProduct, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  subtotalINR: number;
  freeShippingThreshold: number;
  isFreeShippingEligible: boolean;
  amountToFreeShipping: number;
  
  // Drawer & Modal states
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authTab: "signin" | "register";
  setAuthTab: (tab: "signin" | "register") => void;

  // Checkout additions
  selectedSamples: string[];
  toggleSample: (sampleId: string) => void;
  includeGiftCard: boolean;
  setIncludeGiftCard: (include: boolean) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
  shippingMethod: "standard" | "express";
  setShippingMethod: (method: "standard" | "express") => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 150;

// Default starter items in cart matching Figma screenshot (Amber Candle + Santal Candle)
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "amber",
    name: "Amber Candle",
    price: 78,
    priceINR: 6499,
    weight: "290G / 10.2 OZ",
    notes: "Warm Woods · Amber · Smoke",
    image: "/images/products/ember.png",
    quantity: 1,
    size: "290G (STANDARD)",
  },
  {
    id: "santal",
    name: "Santal Candle",
    price: 78,
    priceINR: 6499,
    weight: "290G / 10.2 OZ",
    notes: "Sandalwood · Vanilla · Cedar",
    image: "/images/products/santal.png",
    quantity: 1,
    size: "290G (STANDARD)",
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "register">("signin");

  // Checkout options
  const [selectedSamples, setSelectedSamples] = useState<string[]>(["sample-hinoki"]);
  const [includeGiftCard, setIncludeGiftCard] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("oryenna_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("oryenna_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (
    product: CartProduct,
    quantity = 1,
    size = "290G (STANDARD)"
  ) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name.includes("Candle") ? product.name : `${product.name} Candle`,
          price: product.price,
          priceINR: product.priceINR,
          weight: product.weight,
          notes: product.notes,
          image: product.image,
          quantity,
          size,
        },
      ];
    });
    setIsBagOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleSample = (sampleId: string) => {
    setSelectedSamples((prev) => {
      if (prev.includes(sampleId)) {
        return prev.filter((id) => id !== sampleId);
      }
      // Max 2 complimentary samples
      if (prev.length >= 2) {
        return [prev[1], sampleId];
      }
      return [...prev, sampleId];
    });
  };

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const subtotalINR = items.reduce(
    (acc, item) =>
      acc +
      ((item.priceINR ?? Math.round(item.price * 85)) as number) * item.quantity,
    0
  );
  const isFreeShippingEligible = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        subtotalINR,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isFreeShippingEligible,
        amountToFreeShipping,
        isBagOpen,
        setIsBagOpen,
        isAuthOpen,
        setIsAuthOpen,
        authTab,
        setAuthTab,
        selectedSamples,
        toggleSample,
        includeGiftCard,
        setIncludeGiftCard,
        giftMessage,
        setGiftMessage,
        shippingMethod,
        setShippingMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
