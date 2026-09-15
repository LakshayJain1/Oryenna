import { type schemaTypeDefinition } from 'sanity'
import { product } from './product'
import { productInsider } from './productInsider'
import { journalArticle } from './journalArticle'
import { journalInsider } from './journalInsider'
import { navbar } from './navbar'
import { footer } from './footer'
import { pageContent } from './pageContent'
import { complimentarySample } from './complimentarySample'
import { moodRecommendation } from './moodRecommendation'
import { siteSettings } from './siteSettings'

export const schemaTypes = [
  navbar,
  footer,
  product,
  productInsider,
  journalArticle,
  journalInsider,
  pageContent,
  complimentarySample,
  moodRecommendation,
  siteSettings,
]
