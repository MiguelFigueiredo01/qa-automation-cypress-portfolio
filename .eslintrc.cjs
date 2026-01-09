module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:cypress/recommended", "prettier"],
  plugins: ["cypress"],
  overrides: [
    {
      files: ["cypress/**/*.js"],
      env: { "cypress/globals": true },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script",
  },
  rules: {
    "no-console": "off"
  }
};
