module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["prettier", "eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: ["use", "import"],
  },
  plugins: ["prettier"],
  rules: {
    "linebreak-style": "off",
    "prettier/prettier": "error",
    "no-trailing-spaces": ["error", { skipBlankLines: false }],
    camelcase: "on",
  },
};
