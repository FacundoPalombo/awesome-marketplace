module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  errorOnDeprecated: false, // Make calling deprecated APIs throw helpful error messages. Useful for easing the upgrade process.
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(module|sass|scss|css)$": "identity-obj-proxy",
    "^components(.*)$": "<rootDir>/src/components/$1",
    "^utils(.*)$": "<rootDir>/src/utils/$1",
    "^container(.*)$": "<rootDir>/src/container/$1",
    "^services(.*)$": "<rootDir>/src/services/$1",
    "^common(.*)$": "<rootDir>/src/common/$1",
    "^root(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "./src/**/*.js(x)?",
    "!./src/index.js",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",
    "!**jest**",
  ],
};
