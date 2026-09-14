export type Product = {
  id: string;
  name: string;
  price: number;
  badge?: string;
  notes: string;
  description: string;
  weight: string;
  image: string;
  accentNotes?: string[];
  burnTime?: string;
};

export const featuredProducts: Product[] = [
  {
    id: "amber",
    name: "Amber",
    price: 78,
    badge: "BESTSELLER",
    notes: "Warm Woods · Amber · Smoke",
    description:
      "Evoking dry birch logs glowing quietly on a stone hearth at dusk. Golden labdanum with smoked cedar.",
    weight: "290G / 10.2 OZ",
    image: "/images/products/ember.png",
    burnTime: "55 Hours",
    accentNotes: ["Bergamot", "Golden Amber", "Smoked Cedar"],
  },
  {
    id: "santal",
    name: "Santal",
    price: 78,
    badge: "CLASSIC",
    notes: "Sandalwood · Vanilla · Cedar",
    description:
      "Silky Australian sandalwood with soft crushed vanilla orchid, dry cardamom, and white musk.",
    weight: "290G / 10.2 OZ",
    image: "/images/products/santal.png",
    burnTime: "55 Hours",
    accentNotes: ["Cardamom", "Australian Sandalwood", "Vanilla Orchid"],
  },
  {
    id: "palo-santo",
    name: "Palo Santo",
    price: 82,
    badge: "LIMITED",
    notes: "Palo Santo · Sage · Vetiver",
    description:
      "Wild-harvested sacred wood with cleansing white sage, Haitian vetiver root, and smoky copal resin.",
    weight: "290G / 10.2 OZ",
    image: "/images/products/fig-olive.png",
    burnTime: "55 Hours",
    accentNotes: ["White Sage", "Palo Santo Wood", "Earthy Vetiver"],
  },
  {
    id: "hinoki",
    name: "Hinoki",
    price: 84,
    badge: "ARCHIVE",
    notes: "Hinoki Cypress · Frankincense · Moss",
    description:
      "Japanese mountain cypress and ancient stone temple incense surrounded by dewy cedar needle moss.",
    weight: "290G / 10.2 OZ",
    image: "/images/products/soft-linen.png",
    burnTime: "55 Hours",
    accentNotes: ["Cypress Needles", "Omani Frankincense", "Oakmoss"],
  },
];

export interface MoodRecommendation {
  mood: string;
  label: string;
  tagline: string;
  description: string;
  candleId: string;
  candleName: string;
  price: number;
  weight: string;
  image: string;
  notes: string;
  bestFor: string;
  scentProfile: {
    warmth: number; // 0 to 100
    intensity: number;
    clarity: number;
  };
}

export const moodRecommendations: Record<string, MoodRecommendation> = {
  quiet: {
    mood: "quiet",
    label: "Quiet & Contemplative",
    tagline: "Serene Linen & Whispering Woods",
    description:
      "Formulated for moments of solitude, evening reading, and unwinding mental tension. A delicate veil that cushions background sound.",
    candleId: "santal",
    candleName: "Santal Candle",
    price: 78,
    weight: "290G / 10.2 OZ",
    image: "/images/products/santal.png",
    notes: "Australian Sandalwood · Orris Root · Cardamom Pods",
    bestFor: "Rainy afternoons, mindful reading, bedside wind-down",
    scentProfile: {
      warmth: 65,
      intensity: 45,
      clarity: 85,
    },
  },
  grounded: {
    mood: "grounded",
    label: "Grounded & Earthbound",
    tagline: "Ancient Cypress & Deep Roots",
    description:
      "Anchors chaotic thoughts in physical stillness. Deep roots, mossy temple woods, and meditative resins that settle breathing.",
    candleId: "hinoki",
    candleName: "Hinoki Candle",
    price: 84,
    weight: "290G / 10.2 OZ",
    image: "/images/products/soft-linen.png",
    notes: "Hinoki Cypress · Sacred Frankincense · Wet Forest Moss",
    bestFor: "Morning meditation, creative focus, resetting energy",
    scentProfile: {
      warmth: 60,
      intensity: 70,
      clarity: 80,
    },
  },
  uplifted: {
    mood: "uplifted",
    label: "Uplifted & Luminous",
    tagline: "Crisp Botanicals & Sunlight",
    description:
      "Opens windows in the mind. Sun-warmed Mediterranean fig leaves, wild crushed herbs, and bright morning air that invites vitality.",
    candleId: "palo-santo",
    candleName: "Palo Santo Candle",
    price: 82,
    weight: "290G / 10.2 OZ",
    image: "/images/products/fig-olive.png",
    notes: "Palo Santo · Dalmatian Sage · Haitian Vetiver",
    bestFor: "Midday reset, dining room gatherings, fresh morning air",
    scentProfile: {
      warmth: 50,
      intensity: 60,
      clarity: 95,
    },
  },
  warm: {
    mood: "warm",
    label: "Warm & Enveloping",
    tagline: "Smoky Birch & Golden Amber",
    description:
      "A comforting hearth in the quiet of dusk. Rich golden labdanum melting into dry firewood and sweet lingering benzoin resin.",
    candleId: "amber",
    candleName: "Amber Candle",
    price: 78,
    weight: "290G / 10.2 OZ",
    image: "/images/products/ember.png",
    notes: "Smoked Birch · Golden Labdanum · Benzoin Tears",
    bestFor: "Cold dusk hours, intimate conversations, slow dinners",
    scentProfile: {
      warmth: 95,
      intensity: 75,
      clarity: 60,
    },
  },
};

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
}

export const journalArticles: JournalArticle[] = [
  {
    id: "art-of-evening-reset",
    title: "The Art of the Evening Reset",
    category: "RITUAL",
    readTime: "4 MIN READ",
    date: "OCTOBER 14",
    excerpt:
      "How lowering ambient light, striking a sulfur match, and choosing one singular scent signals the body that labor has ceased.",
    image: "/images/products/ember.png",
  },
  {
    id: "notes-from-grasse",
    title: "Notes from Grasse: The Mimosa Harvest",
    category: "TERROIR",
    readTime: "6 MIN READ",
    date: "SEPTEMBER 28",
    excerpt:
      "Walking the terraced hills of southern France as winter breaks into yellow blossom, sourcing botanical essences at dawn.",
    image: "/images/products/fig-olive.png",
  },
  {
    id: "in-praise-of-negative-space",
    title: "In Praise of Negative Space in the Home",
    category: "SPACES",
    readTime: "5 MIN READ",
    date: "AUGUST 19",
    excerpt:
      "Why the empty corner and unadorned tabletop are as crucial to psychological calm as the objects we choose to display.",
    image: "/images/products/santal.png",
  },
  {
    id: "why-paraffin-has-no-place",
    title: "Why Paraffin Has No Place on Your Nightstand",
    category: "CRAFT",
    readTime: "3 MIN READ",
    date: "JULY 04",
    excerpt:
      "The physiological and environmental case for pure European rapeseed and clean non-GMO soy waxes over petroleum derivatives.",
    image: "/images/products/soft-linen.png",
  },
];

export interface ComplimentarySample {
  id: string;
  name: string;
  notes: string;
  volume: string;
  description: string;
}

export const complimentarySamples: ComplimentarySample[] = [
  {
    id: "sample-hinoki",
    name: "Hinoki Cypress & Cedar",
    notes: "Japanese Cypress · Frankincense · Clean Moss",
    volume: "2ML EAU DE PARFUM VIAL",
    description: "Temple wood smoke meets mountain rain.",
  },
  {
    id: "sample-fig",
    name: "Wild Fig & Olive Leaf",
    notes: "Bruised Fig Leaf · Tuscan Olive Wood · White Musk",
    volume: "2ML EAU DE PARFUM VIAL",
    description: "Sun-drenched Mediterranean afternoon.",
  },
  {
    id: "sample-santal",
    name: "Santal & Orris Root",
    notes: "Australian Sandalwood · Florentine Iris · Cardamom",
    volume: "2ML EAU DE PARFUM VIAL",
    description: "Powdery wood and comforting whisper.",
  },
];
