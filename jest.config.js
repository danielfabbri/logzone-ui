import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom', // ou 'jest-environment-jsdom'
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
};

export default createJestConfig(customJestConfig);
