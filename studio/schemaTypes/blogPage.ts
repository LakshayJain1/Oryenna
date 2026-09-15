import {defineField, defineType} from 'sanity'

export const blogPage = defineType({
  name: 'blogPage',
  title: 'Blog / Journal Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Journal & Stories',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Section Eyebrow',
      type: 'string',
      initialValue: 'Atelier Chronicles',
    }),
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
      rows: 3,
      initialValue: 'Reflections on slow living, botanical extraction in Grasse, and the architecture of stillness.',
    }),
  ],
})
