import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ilsa.org.co',
  output: 'server',
  adapter: cloudflare({ imageService: 'compile' }),
  image: {
    domains: ["ilsa.org.co", "api.ilsa.org.co"],
    remotePatterns: [{ protocol: "https" }],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});