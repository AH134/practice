import { defineConfig } from "cypress";
import vitePreProcessor from "cypress-vite";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on(
        "file:preprocessor",
        vitePreProcessor({
          configFile: "./vite.config.js",
          mode: "development",
        })
      );
    },
  },
});
