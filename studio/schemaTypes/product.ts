import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Products (Fragrance & Pours)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceINR',
      title: 'Base Price (INR ₹)',
      type: 'number',
      description: 'Base pricing in Indian Rupees (₹). Automatically converted for international visitors ($ USD, € EUR, £ GBP, etc.).',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Tag',
      type: 'string',
      description: 'e.g. BESTSELLER, LIMITED, ARCHIVE, SIGNATURE',
    }),
    defineField({
      name: 'notes',
      title: 'Primary Olfactory Notes Summary',
      type: 'string',
      description: 'e.g. Warm Woods · Amber · Smoke',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'weight',
      title: 'Vessel Weight / Size',
      type: 'string',
      initialValue: '290G / 10.2 OZ',
    }),
    defineField({
      name: 'burnTime',
      title: 'Burn Time / Longevity',
      type: 'string',
      initialValue: '55 Hours',
    }),
    defineField({
      name: 'image',
      title: 'Primary Vessel Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative Text', type: 'string' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'insiderInfo',
      title: 'Product Insider Information (Deep Dive)',
      type: 'reference',
      to: [{ type: 'productInsider' }],
      description: 'Link to detailed product craftsmanship, provenance, and olfactory pyramid.',
    }),
  ],
})
