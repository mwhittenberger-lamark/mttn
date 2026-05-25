# Mike the Tech Ninja

Astro marketing site with a Sanity Studio for blog content.

## Commands

- `npm run dev` starts the Astro site
- `npm run build` builds the Astro site
- `npm run studio` starts the Sanity Studio in `studio-mike-the-tech-ninja`
- `npm run studio:build` builds the Sanity Studio
- `npm run sanity:create-post -- --title "..." --excerpt "..." --body "..."` creates a Sanity post with the write token from `.env`
- `npm run sanity:import-posts -- --file content/posts.example.json` imports multiple Sanity posts from JSON
- `npm run sanity:update-posts -- --file content/posts.example.json` updates existing Sanity posts by slug

## Sanity env setup

Copy `.env.example` to `.env` and fill in the write token:

```bash
cp .env.example .env
```

Required values:

```bash
SANITY_PROJECT_ID=npynfyx8
SANITY_DATASET=production
SANITY_API_VERSION=2026-05-25
SANITY_USE_CDN=true
SANITY_API_WRITE_TOKEN=your_sanity_write_token_here
```

`SANITY_API_WRITE_TOKEN` is server-side only. Do not expose it in browser code.

## Create a post from the CLI

Example:

```bash
npm run sanity:create-post -- \
  --title "How Triangle Businesses Can Use AI Without Wasting Money" \
  --excerpt "A practical look at where AI helps small businesses and where it just adds noise." \
  --body "Most small businesses do not need an AI strategy deck.

They need one useful workflow that saves time or improves follow-up." \
  --tags "ai, small business, marketing"
```

This script creates a `post` document in Sanity with:

- title
- slug
- excerpt
- published date
- tags
- Portable Text body

For images, featured media, SEO fields, and custom schema, use the Sanity Studio.

## Bulk import posts from JSON

Use the example file in `content/posts.example.json` as the template:

```bash
npm run sanity:import-posts -- --file content/posts.example.json
```

Expected JSON shape:

```json
[
  {
    "title": "Post title",
    "excerpt": "Short summary",
    "body": "Paragraph one\n\nParagraph two",
    "featuredImage": {
      "path": "content/images/hero.jpg",
      "alt": "Descriptive alt text"
    },
    "bodyBlocks": [
      {"type": "paragraph", "text": "Opening paragraph"},
      {"type": "image", "path": "content/images/inline.png", "alt": "Inline image alt", "caption": "Optional caption"}
    ],
    "slug": "optional-custom-slug",
    "publishedAt": "2026-05-25T12:00:00.000Z",
    "tags": ["seo", "ai", "websites"],
    "schemaMarkup": "{\"@context\":\"https://schema.org\"}",
    "seo": {
      "metaTitle": "Optional SEO title",
      "metaDescription": "Optional SEO description",
      "canonicalUrl": "https://whoisthetechninja.com/blog/post-slug/",
      "noIndex": false,
      "ogTitle": "Optional OG title",
      "ogDescription": "Optional OG description",
      "ogImage": {"path": "content/images/og.jpg", "alt": "OG alt"},
      "twitterTitle": "Optional Twitter title",
      "twitterDescription": "Optional Twitter description",
      "twitterImage": {"path": "content/images/twitter.jpg", "alt": "Twitter alt"}
    }
  }
]
```

Notes:

- Use either `body` or `bodyBlocks`
- `body` is easiest for plain text imports
- `bodyBlocks` lets you mix paragraphs and inline images
- image descriptors can use either `path` or `url`
- `featuredImage`, `seo.ogImage`, and `seo.twitterImage` are uploaded into Sanity automatically
- `schemaMarkup` is imported into the post’s custom JSON-LD field
- `seo` maps to the post SEO fields in the Sanity Studio

You can still keep refining content in the Sanity Studio after import.

## Update existing posts in Sanity

Use the same JSON shape as the importer, but make sure each post includes the slug of the existing post you want to update:

```bash
npm run sanity:update-posts -- --file content/seven-website-must-haves.json
```

Behavior:

- matches existing posts by `slug`
- replaces the matched Sanity document with the JSON content
- fails if no post exists for that slug

If you want the updater to create missing posts too:

```bash
npm run sanity:update-posts -- --file content/posts.json --create-if-missing
```

Recommended workflow:

1. Validate the JSON
2. Run the update command
3. Review the post in the Sanity Studio

## AI to JSON workflow

If you want an AI to write a post in import-ready JSON:

1. Open `prompts/ai-blog-json-prompt.md`
2. Replace:
   - `TOPIC_GOES_HERE`
   - `TARGET_KEYWORD_GOES_HERE`
   - `ANGLE_GOES_HERE`
3. Paste the prompt into ChatGPT or another model
4. Save the returned JSON to a file such as `content/ai-post.json`
5. Validate it:

```bash
npm run sanity:validate-posts -- --file content/ai-post.json
```

6. Import it:

```bash
npm run sanity:import-posts -- --file content/ai-post.json
```

Reference files:

- `prompts/ai-blog-json-prompt.md` gives the AI strict output instructions
- `content/ai-post-template.json` is a ready-to-copy import template
- `content/images/placeholder-*.png` are bundled starter images so the template validates immediately

Recommended workflow:

- Generate the JSON with the AI
- Run the validator
- Quickly sanity-check title, slug, excerpt, and SEO fields
- Add real image files under `content/images/` if the JSON references them
- Run the importer
- Review the post in the Sanity Studio
