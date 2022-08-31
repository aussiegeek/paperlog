module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["packages/**/?(*.)+(test).ts?(x)"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      rules: { "@typescript-eslint/no-non-null-assertion": ["off"] },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
