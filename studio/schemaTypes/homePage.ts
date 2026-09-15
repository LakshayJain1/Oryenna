import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Homepage',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'Atelier de Parfum d\'Intérieur',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Silence. Light. Scent.',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      initialValue: 'Hand-poured candles and quiet room fragrances crafted in Provence from wild botanicals and organic beeswax.',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Button Text',
      type: 'string',
      initialValue: 'Explore Winter Solstice Release',
    }),
  ],
})
