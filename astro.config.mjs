// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import { sanityApiVersion, sanityDataset, sanityProjectId, sanityUseCdn } from './sanity.shared.mjs';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  integrations: [
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: sanityUseCdn,
    }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['astro-portabletext', '@sanity/astro', '@sanity/client', '@sanity/image-url'],
    },
    ssr: {
      noExternal: ['astro-portabletext', '@sanity/astro'],
    },
  },
});
