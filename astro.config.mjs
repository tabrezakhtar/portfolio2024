import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://ornate-lebkuchen-53cfd4.netlify.app/",
  integrations: [preact()]
});