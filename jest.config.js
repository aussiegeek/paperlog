/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  projects: ["<rootDir>", "<rootDir>/packages/*"],
  reporters: ["default", "buildkite-test-collector/jest/reporter"],
  testLocationInResults: true,
};
