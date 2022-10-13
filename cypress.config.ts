import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'st2a2e',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000'
  },
});
