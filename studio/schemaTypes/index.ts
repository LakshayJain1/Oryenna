import { type schemaTypeDefinition } from 'sanity'
import { product } from './product'
import { productInsider } from './productInsider'
import { journalArticle } from './journalArticle'
import { journalInsider } from './journalInsider'
import { navbar } from './navbar'
import { footer } from './footer'
import { homePage } from './homePage'
import { blogPage } from './blogPage'
import { complimentarySample } from './complimentarySample'
import { moodRecommendation } from './moodRecommendation'
import { siteSettings } from './siteSettings'

export const schemaTypes = [
  navbar,
  footer,
  homePage,
  blogPage,
  product,
  productInsider,
  journalArticle,
  journalInsider,
  complimentarySample,
  moodRecommendation,
  siteSettings,
]
