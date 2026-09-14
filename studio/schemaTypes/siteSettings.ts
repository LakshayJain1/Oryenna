import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Atelier Site Settings & Editorial',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Store Title',
      type: 'string',
      initialValue: "Oryenna — Atelier de Parfum d'Intérieur",
    }),
    defineField({
      name: 'description',
      title: 'Store Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'announcementBar',
      title: 'Top Announcement Bar Text',
      type: 'string',
      initialValue:
        'Complimentary White-Glove Shipping on Orders Over $150 · Hand-Poured in Provence',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: "Atelier de Parfum d'Intérieur",
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Oryenna',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      initialValue: 'Light a calmer you.',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'manifestoEyebrow',
      title: 'Manifesto Eyebrow',
      type: 'string',
      initialValue: '01 / Manifeste',
    }),
    defineField({
      name: 'manifestoHeadline',
      title: 'Manifesto Headline',
      type: 'string',
      initialValue: 'Beauty in a Quieter World.',
    }),
    defineField({
      name: 'manifestoQuote',
      title: 'Manifesto Narrative',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'manifestoMetrics',
      title: 'Manifesto Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string' }),
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'description', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'craftHeadline',
      title: 'Craft Section Headline',
      type: 'string',
      initialValue: 'A Ritual, Not Just a Scent.',
    }),
    defineField({
      name: 'craftQuote',
      title: 'Craft Quote',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'craftStory',
      title: 'Craft Story Narrative',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sanctuaryHeadline',
      title: 'Sanctuary Headline',
      type: 'string',
      initialValue: 'We Believe a Home Should Have a Feeling.',
    }),
    defineField({
      name: 'sanctuaryQuote',
      title: 'Sanctuary Quote',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'sanctuaryText',
      title: 'Sanctuary Text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'craftQuoteAuthor',
      title: 'Craft Quote Author',
      type: 'string',
      initialValue: 'Atelier Oryenna',
    }),
    defineField({
      name: 'craftQuoteLocation',
      title: 'Craft Quote Location',
      type: 'string',
      initialValue: 'Grasse, France',
    }),
    defineField({
      name: 'craftSpecs',
      title: 'Craft Specification Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'subtitle', type: 'string', title: 'Subtitle' }),
            defineField({ name: 'desc', type: 'text', title: 'Description', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'sanctuaryCaption',
      title: 'Sanctuary Photo Caption',
      type: 'string',
      initialValue: 'The Glasshouse Atelier — Wild-harvested botanicals dried in Grasse',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
