Write a blog post for Mike the Tech Ninja and return **only valid JSON**.

Rules:
- Return a JSON array with exactly one post object.
- Do not wrap the JSON in markdown fences.
- Do not include any explanation before or after the JSON.
- The JSON must match this schema exactly.
- Use `bodyBlocks`, not `body`.
- The JSON will be checked with `npm run sanity:validate-posts`, so keep the structure strict.
- Every `bodyBlocks` item must be either:
  - `{ "type": "paragraph", "text": "..." }`
  - `{ "type": "block", "style": "normal|h2|h3", "spans": [{ "text": "...", "marks": ["strong"] }, { "text": "linked text", "link": "/#contact" }] }`
  - `{ "type": "image", "path": "content/images/FILENAME.png", "alt": "...", "caption": "..." }`
- Use `block` items when you need headings, bold text, or linked text.
- Any link with `"link": "/#contact"` will open the lead form modal on the site.
- If you do not have a real image path, still provide a placeholder path in `content/images/...`.
- `schemaMarkup` must be a JSON string, not an object.
- `publishedAt` must be an ISO timestamp.
- Write for small business owners in Raleigh, Cary, Durham, Chapel Hill, Apex, and the Triangle.
- Voice: practical, plainspoken, credible, not hypey.
- Focus on useful advice, not generic marketing filler.
- Avoid em dashes.

Target topic:

7 Must-Have Elements for a High-Converting Small Business Website

Target keyword:

small business website checklist

Suggested angle:

A practical checklist for small business owners who want their website to build trust, explain their value clearly, and turn more visitors into leads before they spend more money on ads, SEO, or a redesign.

Required output shape:

[
  {
    "title": "Post title",
    "slug": "post-slug",
    "excerpt": "Short summary",
    "publishedAt": "2026-05-24T09:00:00.000Z",
    "tags": ["tag one", "tag two", "tag three"],
    "bodyBlocks": [
      {
        "type": "block",
        "style": "h2",
        "spans": [
          { "text": "Section heading" }
        ]
      },
      {
        "type": "paragraph",
        "text": "Opening paragraph."
      },
      {
        "type": "block",
        "style": "normal",
        "spans": [
          { "text": "A sentence with " },
          { "text": "bold emphasis", "marks": ["strong"] },
          { "text": " and a " },
          { "text": "lead form link", "link": "/#contact" },
          { "text": "." }
        ]
      },
      {
        "type": "image",
        "path": "content/images/placeholder-inline-image.png",
        "alt": "Descriptive inline image alt text",
        "caption": "Optional image caption"
      },
      {
        "type": "paragraph",
        "text": "Closing paragraph."
      }
    ],
    "featuredImage": {
      "path": "content/images/placeholder-featured-image.png",
      "alt": "Descriptive featured image alt text"
    },
    "schemaMarkup": "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"BlogPosting\",\n  \"headline\": \"Post title\"\n}",
    "seo": {
      "metaTitle": "SEO title | Mike the Tech Ninja",
      "metaDescription": "SEO description",
      "canonicalUrl": "https://whoisthetechninja.com/blog/post-slug/",
      "noIndex": false,
      "ogTitle": "Open Graph title",
      "ogDescription": "Open Graph description",
      "ogImage": {
        "path": "content/images/placeholder-og-image.png",
        "alt": "Descriptive Open Graph image alt text"
      },
      "twitterTitle": "Twitter title",
      "twitterDescription": "Twitter description",
      "twitterImage": {
        "path": "content/images/placeholder-twitter-image.png",
        "alt": "Descriptive Twitter image alt text"
      }
    }
  }
]
