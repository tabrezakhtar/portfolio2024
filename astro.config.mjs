import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://ornate-lebkuchen-53cfd4.netlify.app/",
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: "material-theme-darker",
    },
  },
});