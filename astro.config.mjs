import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ilsa.org.co',
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
    routes: {
      strategy: "auto",
      include: ["/*"],
      exclude: ["/publicaciones/*", "/nosotros/*", "/opinion/*", "/_astro/*", "/assets/*", "/fonts/*", "/icons/*", "/images/*"]
    }
  }),
  image: {
    domains: ["ilsa.org.co", "api.ilsa.org.co"],
    remotePatterns: [{ protocol: "https" }],
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["node:fs", "node:path", "node:crypto"],
    },
    build: {
      rollupOptions: {
        output: {
          banner: `
            if (typeof globalThis.MessageChannel === 'undefined') {
              console.log('Polyfilling MessageChannel for React 19 (Banner)');
              class MessagePortPolyfill extends EventTarget {
                constructor() { super(); this.otherPort = null; this.onmessage = null; }
                postMessage(message) {
                  if (!this.otherPort) return;
                  const event = new MessageEvent('message', { data: message, ports: [this.otherPort] });
                  setTimeout(() => {
                    if (this.otherPort.onmessage) this.otherPort.onmessage(event);
                    this.otherPort.dispatchEvent(event);
                  }, 0);
                }
                start() {}
                close() {}
              }
              class MessageChannelPolyfill {
                constructor() {
                  this.port1 = new MessagePortPolyfill();
                  this.port2 = new MessagePortPolyfill();
                  this.port1.otherPort = this.port2;
                  this.port2.otherPort = this.port1;
                }
              }
              globalThis.MessageChannel = MessageChannelPolyfill;
              globalThis.MessagePort = MessagePortPolyfill;
            }
          `
        }
      }
    }
  },
  integrations: [react(), sitemap()],
});