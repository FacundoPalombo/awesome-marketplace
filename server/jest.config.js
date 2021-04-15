module.exports = {
  testEnvironment: "node",
  setupFiles: ["./jest.setup.js"],
  errorOnDeprecated: false, // Make calling deprecated APIs throw helpful error messages. Useful for easing the upgrade process.
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  collectCoverageFrom: [
    "**/*.js",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",
    "!**jest**",
    "!**/schemas/**",
  ],
};
