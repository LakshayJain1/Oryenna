export interface SanityAsset {
  _id: string
  url: string
}

export interface SanityImage {
  asset?: SanityAsset
  alt?: string
}

export interface SanityProduct {
  _id: string
  name: string
  slug: string
  price: number
  badge?: string
  notes: string
  description: string
  weight: string
  burnTime?: string
  accentNotes?: string[]
  topNotes?: string
  heartNotes?: string
  baseNotes?: string
  image: SanityImage
  inStock?: boolean
}

export interface SanityMoodRecommendation {
  _id: string
  mood: 'quiet' | 'grounded' | 'uplifted' | 'warm'
  label: string
  tagline: string
  description: string
  bestFor: string
  warmth: number
  intensity: number
  clarity: number
  product: {
    _id: string
    name: string
    price: number
    notes: string
    weight: string
    image: SanityImage
  }
}

export interface SanityJournalArticle {
  _id: string
  title: string
  slug: string
  category: string
  readTime: string
  publishedAt?: string
  excerpt: string
  image: SanityImage
}

export interface SanityComplimentarySample {
  _id: string
  name: string
  notes: string
  volume: string
  description: string
}

export interface SanitySiteSettings {
  title?: string
  description?: string
  announcementBar?: string
  heroEyebrow?: string
  heroHeadline?: string
  heroTagline?: string
  heroSubtext?: string
  manifestoEyebrow?: string
  manifestoHeadline?: string
  manifestoQuote?: string
  manifestoMetrics?: Array<{
    value: string
    label: string
    description: string
  }>
  craftHeadline?: string
  craftQuote?: string
  craftQuoteAuthor?: string
  craftQuoteLocation?: string
  craftStory?: string
  craftSpecs?: Array<{
    title: string
    subtitle: string
    desc: string
  }>
  sanctuaryHeadline?: string
  sanctuaryQuote?: string
  sanctuaryText?: string
  sanctuaryCaption?: string
}
