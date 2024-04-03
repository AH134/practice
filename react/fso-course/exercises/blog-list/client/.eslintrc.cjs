module.exports = {
  env: { browser: true, node: true, es2020: true, "cypress/globals": true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:vitest/recommended",
    "plugin:cypress:recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "vitest", "cypress"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react/prop-types": "off",
    semi: ["error", "always"],
    eqeqeq: "error",
    indent: ["error", 2],
    quotes: ["error", "double"],
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": 0,
  },
};