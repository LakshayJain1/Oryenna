import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Fragrance Products',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
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
      title: 'Primary Olfactory Notes',
      type: 'string',
      description: 'e.g. Warm Woods · Amber · Smoke',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weight',
      title: 'Vessel Weight',
      type: 'string',
      initialValue: '290G / 10.2 OZ',
    }),
    defineField({
      name: 'burnTime',
      title: 'Burn Time',
      type: 'string',
      initialValue: '55 Hours',
    }),
    defineField({
      name: 'image',
      title: 'Vessel Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accentNotes',
      title: 'Accent Notes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'topNotes',
      title: 'Olfactory Pyramid — Top Notes',
      type: 'string',
      description: 'e.g. Bergamot & Pink Pepper',
    }),
    defineField({
      name: 'heartNotes',
      title: 'Olfactory Pyramid — Heart Notes',
      type: 'string',
      description: 'e.g. Amber & Labdanum',
    }),
    defineField({
      name: 'baseNotes',
      title: 'Olfactory Pyramid — Base Notes',
      type: 'string',
      description: 'e.g. Smoked Cedar & Benzoin',
    }),
    defineField({
      name: 'story',
      title: 'Atelier Scent Story',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'orderRank',
      title: 'Display Order Rank',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'notes',
      media: 'image',
    },
  },
})
