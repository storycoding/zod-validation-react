/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  ignorePatterns: [
    "build",
    "*.js",
    "*.json",
    "node_modules",
    "infra",
    "app/api_types",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "no-return-await": "warn",
    "no-prototype-builtins": "off",
    eqeqeq: ["warn", "always"],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/ban-types": "off",
  },
};
