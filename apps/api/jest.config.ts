import type { Config } from "jest";
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/test"],
  moduleFileExtensions: ["ts","js","json"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!src/main.ts"],
  coverageReporters: ["text", "lcov"],
  coverageThreshold: { global: { branches: 90, functions: 95, lines: 95, statements: 95 } },
};
export default config;
