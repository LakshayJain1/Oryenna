import { defineField, defineType } from 'sanity'

export const complimentarySample = defineType({
  name: 'complimentarySample',
  title: 'Complimentary Ritual Samples',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Sample Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'string',
      initialValue: '2ML EAU DE PARFUM VIAL',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'string',
    }),
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'notes',
    },
  },
})
