import {defineField, defineType} from 'sanity'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Specific Schemas',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Identifier (e.g. Homepage, Journal, Sanctuary)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'pageTitle', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
  ],
})
