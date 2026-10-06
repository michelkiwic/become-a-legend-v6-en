import { copyFile } from "node:fs/promises";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Static build for the root of become-a-legend.com; Plesk serves these files.
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    {
      name: "metanet-apache-config",
      async closeBundle() {
        await copyFile("build/metanet.htaccess", "metanet-dist/.htaccess");
      },
    },
  ],
  build: {
    outDir: "metanet-dist",
    emptyOutDir: true,
  },
});
