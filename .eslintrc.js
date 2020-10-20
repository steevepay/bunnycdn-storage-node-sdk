module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true
  },
  extends: ["eslint:recommended", "prettier", "plugin:node/recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
