import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    files: ["layout/**"],
    rules: { "@next/next/no-head-element": "off" },
  },
  globalIgnores([".next/**", "node_modules/**"]),
]);
