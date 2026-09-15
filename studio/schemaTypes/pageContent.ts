import { defineField, defineType } from 'sanity'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Specific Schemas',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Identifier',
      type: 'string',
      description: 'e.g. Homepage, Checkout, Scent Finder',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      options: { source: 'pageTitle', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero / Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading / Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Banner Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'customSections',
      title: 'Custom Page Modules / Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string' }),
            defineField({ name: 'sectionSubtitle', title: 'Section Subtitle', type: 'string' }),
            defineField({ name: 'bodyText', title: 'Body Text', type: 'text', rows: 4 }),
            defineField({ name: 'sectionImage', title: 'Section Image', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
    }),
  ],
})
