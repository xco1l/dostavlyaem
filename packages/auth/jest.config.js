module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [`${__dirname}/src`],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '@/db/(.*)': '<rootDir>/../database-service/src/$1',
  },
  moduleDirectories: ['src', 'node_modules'],
};
