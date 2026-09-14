import { groq } from 'next-sanity'

export const PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(orderRank asc, _createdAt asc) {
    _id,
    name,
    "slug": slug.current,
    price,
    badge,
    notes,
    description,
    weight,
    burnTime,
    accentNotes,
    topNotes,
    heartNotes,
    baseNotes,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    inStock
  }
`

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    badge,
    notes,
    description,
    weight,
    burnTime,
    accentNotes,
    topNotes,
    heartNotes,
    baseNotes,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    inStock
  }
`

export const MOOD_RECOMMENDATIONS_QUERY = groq`
  *[_type == "moodRecommendation"] | order(orderRank asc) {
    _id,
    mood,
    label,
    tagline,
    description,
    bestFor,
    warmth,
    intensity,
    clarity,
    "product": product-> {
      _id,
      name,
      price,
      notes,
      weight,
      image {
        asset-> {
          _id,
          url
        },
        alt
      }
    }
  }
`

export const JOURNAL_ARTICLES_QUERY = groq`
  *[_type == "journalArticle"] | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    readTime,
    publishedAt,
    excerpt,
    image {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`

export const COMPLIMENTARY_SAMPLES_QUERY = groq`
  *[_type == "complimentarySample"] | order(orderRank asc, _createdAt asc) {
    _id,
    name,
    notes,
    volume,
    description
  }
`

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    announcementBar,
    heroEyebrow,
    heroHeadline,
    heroTagline,
    heroSubtext,
    manifestoEyebrow,
    manifestoHeadline,
    manifestoQuote,
    manifestoMetrics[] {
      value,
      label,
      description
    },
    craftEyebrow,
    craftHeadline,
    craftQuote,
    craftQuoteAuthor,
    craftQuoteLocation,
    craftStory,
    craftSpecs[] {
      title,
      subtitle,
      desc
    },
    sanctuaryHeadline,
    sanctuaryQuote,
    sanctuaryText,
    sanctuaryCaption
  }
`
