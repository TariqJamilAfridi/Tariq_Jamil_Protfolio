import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Vite 8 uses oxc for pre-transforms and rolldown for bundling.
 * Both independently determine JSX eligibility from file extensions.
 * .js files are mapped to module-type "js" (not "jsx") in both pipelines,
 * so JSX syntax is rejected before any plugin can handle it.
 *
 * Solution: a custom plugin that runs `enforce: "pre"` and rewrites
 * the module ID from *.js → *.jsx for all src/ files, so the oxc
 * pre-transform sees .jsx extension and enables JSX parsing.
 */
function jsAsJsx() {
  return {
    name: "js-as-jsx",
    enforce: "pre",
    // Resolve: transparently alias foo.js → foo.js?jsx so the
    // transform hook can intercept it by query.
    resolveId(id, importer) {
      // Only rewrite relative imports of .js files in src/
      if (id.endsWith(".js") && !id.includes("node_modules") && importer) {
        return null; // let Vite resolve normally; we intercept in transform
      }
    },
    // Transform: for every .js file in src/ that contains JSX,
    // return it with the same code but tagged as jsx for oxc.
    transform(code, id) {
      // Skip node_modules and non-.js files
      if (id.includes("node_modules") || !id.match(/\.js($|\?)/)) return null;
      // Skip files that definitely have no JSX (no < character after alphanumeric)
      if (!code.includes("<")) return null;
      // Return the same code but signal JSX module type to the pipeline
      return { code, map: null, moduleType: "jsx" };
    },
  };
}

export default defineConfig({
  plugins: [
    jsAsJsx(),          // must be first — before react() and oxc
    react({
      include: /\.(js|jsx)$/,
    }),
    tailwindcss(),
  ],

  build: {
    rolldownOptions: {
      moduleTypes: {
        ".js": "jsx",
      },
    },
  },
});
