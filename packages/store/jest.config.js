module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [`${__dirname}/src`],
  testMatch: ['**/__tests__/**/*.test.ts'],
};
