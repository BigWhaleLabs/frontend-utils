import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    preact(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ui",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["preact", "react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
