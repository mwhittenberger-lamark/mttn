import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(8).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(40).max(220),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'schemaMarkup',
      title: 'Custom schema (JSON-LD)',
      type: 'text',
      rows: 14,
      description:
        'Optional. Paste custom JSON-LD here if this post needs schema beyond the default BlogPosting markup.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta title',
          type: 'string',
          description: 'Optional override for the browser title and default social title.',
          validation: (rule) => rule.max(70),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta description',
          type: 'text',
          rows: 3,
          description: 'Optional override for the page description and default social description.',
          validation: (rule) => rule.max(170),
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Optional canonical override if this post should point somewhere else.',
        }),
        defineField({
          name: 'noIndex',
          title: 'No index',
          type: 'boolean',
          initialValue: false,
          description: 'Prevent search engines from indexing this page.',
        }),
        defineField({
          name: 'ogTitle',
          title: 'Open Graph title',
          type: 'string',
          validation: (rule) => rule.max(95),
        }),
        defineField({
          name: 'ogDescription',
          title: 'Open Graph description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(220),
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'twitterTitle',
          title: 'Twitter title',
          type: 'string',
          validation: (rule) => rule.max(70),
        }),
        defineField({
          name: 'twitterDescription',
          title: 'Twitter description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(200),
        }),
        defineField({
          name: 'twitterImage',
          title: 'Twitter image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'featuredImage',
    },
    prepare({title, subtitle, media}) {
      const published =
        typeof subtitle === 'string'
          ? new Date(subtitle).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : 'Draft'

      return {
        title,
        subtitle: published,
        media,
      }
    },
  },
})
