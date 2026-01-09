module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": "warn",
  },
  overrides: [
    {
      files: ["cypress/**/*.js"],
      env: {
        mocha: true,
      },
      plugins: ["cypress"],
      extends: ["plugin:cypress/recommended"],
    },
  ],
};
